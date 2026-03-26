"""
Semantic Search Web App with Claude AI
Searches auditing recommendations from Supabase using semantic search.

SQL Functions to create in Supabase before running this app:

-- Search only STRH (Stadtrechnungshof)
CREATE OR REPLACE FUNCTION match_empfehlungen(
  query_embedding vector(1536),
  match_count int default 5
)
RETURNS TABLE(
  id bigint,
  "Empfehlung" text,
  "Unterordner" text,
  "Adressiert an" text,
  "quelldatei" text,
  similarity float
)
LANGUAGE sql AS $$
  SELECT
    id,
    "Empfehlung",
    "Unterordner",
    "Adressiert an",
    "quelldatei",
    1 - (embedding <=> query_embedding) AS similarity
  FROM "STRH"
  WHERE embedding IS NOT NULL
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;

-- Search only BRH (Bundesrechnungshof)
CREATE OR REPLACE FUNCTION match_brh(
  query_embedding vector(1536),
  match_count int default 5
)
RETURNS TABLE(
  id bigint,
  "Empfehlung" text,
  "Unterordner" text,
  "Adressiert an" text,
  "quelldatei" text,
  similarity float
)
LANGUAGE sql AS $$
  SELECT
    id,
    "Empfehlung",
    "Unterordner",
    "Adressiert an",
    "quelldatei",
    1 - (embedding <=> query_embedding) AS similarity
  FROM "BRH"
  WHERE embedding IS NOT NULL
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;

-- Search both STRH and BRH
CREATE OR REPLACE FUNCTION match_all_empfehlungen(
  query_embedding vector(1536),
  match_count int default 5
)
RETURNS TABLE(
  id bigint,
  "Empfehlung" text,
  "Unterordner" text,
  "Adressiert an" text,
  "quelldatei" text,
  similarity float
)
LANGUAGE sql AS $$
  SELECT
    id,
    "Empfehlung",
    "Unterordner",
    "Adressiert an",
    "quelldatei",
    1 - (embedding <=> query_embedding) AS similarity
  FROM (
    SELECT id, "Empfehlung", "Unterordner", "Adressiert an", "quelldatei", embedding FROM "STRH"
    UNION ALL
    SELECT id, "Empfehlung", "Unterordner", "Adressiert an", "quelldatei", embedding FROM "BRH"
  ) AS combined
  WHERE embedding IS NOT NULL
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;
"""

import os
import traceback
import hashlib
import time
import json
from urllib.parse import quote
from flask import Flask, request, jsonify, Response, stream_with_context
from flask_cors import CORS
from dotenv import load_dotenv
from openai import OpenAI
from anthropic import Anthropic
from supabase import create_client, Client
from collections import Counter

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)


# Embedding cache with TTL (10 minutes)
class EmbeddingCache:
    def __init__(self, ttl_seconds=600):
        self.cache = {}
        self.ttl = ttl_seconds

    def get_key(self, text):
        """Generate cache key from text"""
        return hashlib.sha256(text.encode()).hexdigest()

    def get(self, text):
        """Get cached embedding if valid"""
        key = self.get_key(text)
        if key in self.cache:
            embedding, timestamp = self.cache[key]
            if time.time() - timestamp < self.ttl:
                return embedding
            else:
                del self.cache[key]
        return None

    def set(self, text, embedding):
        """Cache embedding with timestamp"""
        key = self.get_key(text)
        self.cache[key] = (embedding, time.time())


embedding_cache = EmbeddingCache(ttl_seconds=600)

# Theme cache with longer TTL (24 hours)
class ThemeCache:
    def __init__(self, ttl_seconds=86400):
        self.cache = {}
        self.ttl = ttl_seconds

    def get(self, key):
        """Get cached theme data if valid"""
        if key in self.cache:
            data, timestamp = self.cache[key]
            if time.time() - timestamp < self.ttl:
                return data
            else:
                del self.cache[key]
        return None

    def set(self, key, data):
        """Cache theme data with timestamp"""
        self.cache[key] = (data, time.time())

theme_cache = ThemeCache(ttl_seconds=86400)
related_theme_cache = ThemeCache(ttl_seconds=3600)  # 1h TTL for query-specific themes

# Initialize API clients with lazy initialization for Supabase
try:
    openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
except Exception as e:
    print(f"Warning: OpenAI client initialization failed: {e}")
    openai_client = None

try:
    anthropic_client = Anthropic(
        api_key=os.getenv("ANTHROPIC_API_KEY"),
        timeout=90.0  # 90 second timeout for API calls
    )
except Exception as e:
    print(f"Warning: Anthropic client initialization failed: {e}")
    anthropic_client = None

# Initialize Supabase client with error handling
supabase: Client = None
try:
    supabase = create_client(
        os.getenv("SUPABASE_URL"),
        os.getenv("SUPABASE_KEY")
    )
except Exception as e:
    print(f"Warning: Supabase client initialization failed: {e}")


@app.route("/ask", methods=["POST"])
def ask():
    """
    POST /ask endpoint — streams response via SSE
    Request body: {
        "question": "user question in German",
        "expertise_level": "beginner" or "expert",
        "search_source": "strh" (default), "brh", or "all"
    }
    Response: text/event-stream with typed SSE events
    """
    if not openai_client or not anthropic_client or not supabase:
        return jsonify({"error": "Service unavailable: API clients not initialized"}), 503

    data = request.json
    if not data or "question" not in data:
        return jsonify({"error": "Missing 'question' field"}), 400

    question = data["question"].strip()
    if not question:
        return jsonify({"error": "Question cannot be empty"}), 400

    expertise_level = data.get("expertise_level", "beginner").lower()
    if expertise_level not in ["beginner", "expert"]:
        expertise_level = "beginner"

    search_source = data.get("search_source", "strh").lower()
    if search_source not in ["strh", "brh", "all"]:
        search_source = "strh"

    model_choice = data.get("model", "haiku").lower()
    model_id = "claude-sonnet-4-6" if model_choice == "sonnet" else "claude-haiku-4-5-20251001"

    def generate():
        try:
            # Step 1: Embedding (cached)
            question_embedding = embedding_cache.get(question)
            if question_embedding is None:
                embedding_response = openai_client.embeddings.create(
                    model="text-embedding-3-small",
                    input=question
                )
                question_embedding = embedding_response.data[0].embedding
                embedding_cache.set(question, question_embedding)

            # Step 2: Vector search
            rpc_function = "match_empfehlungen"
            if search_source == "brh":
                rpc_function = "match_brh"
            elif search_source == "all":
                rpc_function = "match_all_empfehlungen"

            try:
                search_result = supabase.rpc(
                    rpc_function,
                    {"query_embedding": question_embedding, "match_count": 5}
                ).execute()
            except Exception as e:
                print(f"Search error: {e}")
                yield f"data: {json.dumps({'type': 'error', 'error': 'Die Suche hat zu lange gedauert. Bitte versuchen Sie es später erneut.'})}\n\n"
                return

            if not search_result.data:
                yield f"data: {json.dumps({'type': 'error', 'error': 'Es wurden keine passenden Empfehlungen gefunden.'})}\n\n"
                return

            recommendations = search_result.data

            # Step 3: Build and send sources immediately (before Claude responds)
            sources = []
            for rec in recommendations:
                quelldatei = rec.get("Quelldatei") or rec.get("quelldatei", "")
                source_item = {
                    "empfehlung": rec["Empfehlung"],
                    "quelldatei": quelldatei,
                    "adressiert_an": rec["Adressiert an"],
                    "similarity": round(rec["similarity"], 4)
                }
                if quelldatei:
                    source_item["search_link"] = f"https://www.google.com/search?q={quote(quelldatei)}"
                sources.append(source_item)

            yield f"data: {json.dumps({'type': 'sources', 'sources': sources})}\n\n"

            # Step 4: Prepare context and prompt
            context = "Folgende Empfehlungen könnten relevant sein:\n\n"
            for i, rec in enumerate(recommendations, 1):
                context += f"{i}. {rec['Empfehlung']}\n"
                context += f"   Ordner: {rec['Unterordner']}\n"
                context += f"   Adressiert an: {rec['Adressiert an']}\n"
                context += f"   Ähnlichkeit: {rec['similarity']:.2%}\n\n"

            expertise_prompt = _get_expertise_prompt(expertise_level, question, context)

            # Step 5: Stream Claude response
            buffer = ""
            answer_started = False

            with anthropic_client.messages.stream(
                model=model_id,
                max_tokens=1000,
                messages=[{"role": "user", "content": expertise_prompt}],
                timeout=90.0
            ) as stream:
                for text in stream.text_stream:
                    if not answer_started:
                        buffer += text
                        if "ANTWORT:" in buffer:
                            parts = buffer.split("ANTWORT:", 1)
                            za = parts[0].replace("ZENTRALE AUSSAGE:", "").strip()
                            yield f"data: {json.dumps({'type': 'zentrale_aussage', 'text': za})}\n\n"
                            answer_part = parts[1]
                            if answer_part:
                                yield f"data: {json.dumps({'type': 'text', 'text': answer_part})}\n\n"
                            answer_started = True
                            buffer = ""
                    else:
                        yield f"data: {json.dumps({'type': 'text', 'text': text})}\n\n"

            # Fallback if format markers were not found
            if not answer_started and buffer:
                za = buffer.split('.')[0] + '.' if '.' in buffer else buffer[:150]
                yield f"data: {json.dumps({'type': 'zentrale_aussage', 'text': za})}\n\n"
                yield f"data: {json.dumps({'type': 'text', 'text': buffer})}\n\n"

            yield f"data: {json.dumps({'type': 'done'})}\n\n"

        except Exception as e:
            traceback.print_exc()
            yield f"data: {json.dumps({'type': 'error', 'error': str(e)})}\n\n"

    return Response(
        stream_with_context(generate()),
        content_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"}
    )


def _get_expertise_prompt(expertise_level, question, context):
    """Build expertise-specific system prompt"""
    format_instruction = """

Formatiere deine Antwort exakt so:
ZENTRALE AUSSAGE: [Ein einziger prägnanter Kernsatz, der die wichtigste Erkenntnis zusammenfasst]

ANTWORT: [Deine ausführliche Antwort hier]"""

    base_instruction = f"""Du bist ein hilfreicher Assistent für Prüfungsempfehlungen.

Benutzer-Frage: {question}

Basierend auf den folgenden Empfehlungen aus der Datenbank, bitte antworte klar und prägnant:

{context}

Antworte NUR basierend auf den oben genannten Empfehlungen. Wenn keine der Empfehlungen relevant ist, teile dies mit."""

    if expertise_level == "expert":
        return base_instruction + """\n\nDer Benutzer ist ein Experte. Antworte auf detaillierte, technische Weise. Nutze Fachbegriffe und gehe in die Tiefe. Diskutiere auch mögliche Variationen, Ausnahmen und Best Practices.""" + format_instruction
    else:  # beginner
        return base_instruction + """\n\nDer Benutzer ist Anfänger und kennt sich mit diesem Thema nicht gut aus. Verwende einfache, verständliche Sprache. Erkläre Fachbegriffe. Konzentriere dich auf die wichtigsten praktischen Punkte.""" + format_instruction


def _parse_answer_sections(raw_answer):
    """Parse structured Claude response into zentrale_aussage and answer sections"""
    zentrale_aussage = ""
    answer = raw_answer

    if "ZENTRALE AUSSAGE:" in raw_answer and "ANTWORT:" in raw_answer:
        parts = raw_answer.split("ANTWORT:", 1)
        answer = parts[1].strip()
        za_part = parts[0].replace("ZENTRALE AUSSAGE:", "").strip()
        zentrale_aussage = za_part
    elif "ZENTRALE AUSSAGE:" in raw_answer:
        zentrale_aussage = raw_answer.replace("ZENTRALE AUSSAGE:", "").strip()
        answer = raw_answer
    else:
        # Fallback: use first sentence as zentrale_aussage
        zentrale_aussage = answer.split('.')[0] + '.' if '.' in answer else answer[:150]

    return zentrale_aussage, answer


@app.route("/", methods=["GET"])
def index():
    """Serve the frontend"""
    from flask import render_template
    return render_template("index.html")


@app.route("/health", methods=["GET", "HEAD"])
def health():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "openai_ready": openai_client is not None,
        "anthropic_ready": anthropic_client is not None,
        "supabase_ready": supabase is not None
    }), 200


def _fetch_all_recommendations(source="strh", limit=500):
    """Fetch all recommendations from Supabase"""
    try:
        if source == "strh":
            response = supabase.table("STRH").select('"Empfehlung","Unterordner","Adressiert an","Quelldatei"').limit(limit).execute()
        elif source == "brh":
            response = supabase.table("BRH").select('"Empfehlung","Unterordner","Adressiert an","Quelldatei"').limit(limit).execute()
        else:  # all
            strh_data = supabase.table("STRH").select('"Empfehlung","Unterordner","Adressiert an","Quelldatei"').limit(limit).execute()
            brh_data = supabase.table("BRH").select('"Empfehlung","Unterordner","Adressiert an","Quelldatei"').limit(limit).execute()
            response = type('obj', (object,), {'data': (strh_data.data or []) + (brh_data.data or [])})()

        return response.data or []
    except Exception as e:
        print(f"Error fetching recommendations: {e}")
        return []


def _parse_json_response(response_text):
    """Parse JSON response with error recovery for malformed JSON"""
    try:
        return json.loads(response_text)
    except json.JSONDecodeError as e:
        print(f"Initial JSON parse failed: {e}")
        print(f"Attempting to repair JSON...")

        # Try multiple repair strategies
        repair_attempts = []

        # Attempt 1: Remove trailing commas
        repaired = response_text.rstrip()
        if repaired.endswith(',]'):
            repaired = repaired[:-2] + ']'
        if repaired.endswith(',}'):
            repaired = repaired[:-2] + '}'
        repair_attempts.append(("trailing comma removal", repaired))

        # Attempt 2: Extract just the JSON array/object part (remove any text before/after)
        for start_char, end_char in [('[', ']'), ('{', '}')]:
            try:
                start_idx = response_text.find(start_char)
                if start_char == '[':
                    # For arrays, find matching closing bracket
                    brace_count = 0
                    for i in range(start_idx, len(response_text)):
                        if response_text[i] == '{':
                            brace_count += 1
                        elif response_text[i] == '}':
                            brace_count -= 1
                        elif response_text[i] == ']' and brace_count == 0:
                            extracted = response_text[start_idx:i+1]
                            repair_attempts.append((f"array extraction with brace matching", extracted))
                            break
            except:
                pass

        # Attempt 3: Find complete JSON objects and reconstruct array
        try:
            start_idx = response_text.find('[')
            if start_idx != -1:
                # Try to find complete objects {..} within the array
                objects = []
                i = start_idx + 1
                obj_start = -1
                brace_depth = 0
                in_string = False
                escape_next = False

                while i < len(response_text):
                    char = response_text[i]

                    if escape_next:
                        escape_next = False
                    elif char == '\\':
                        escape_next = True
                    elif char == '"' and not escape_next:
                        in_string = not in_string
                    elif not in_string:
                        if char == '{':
                            if brace_depth == 0:
                                obj_start = i
                            brace_depth += 1
                        elif char == '}':
                            brace_depth -= 1
                            if brace_depth == 0 and obj_start != -1:
                                obj_text = response_text[obj_start:i+1]
                                try:
                                    obj = json.loads(obj_text)
                                    objects.append(obj)
                                except:
                                    pass
                                obj_start = -1

                    i += 1

                if objects:
                    repair_attempts.append((f"complete object extraction ({len(objects)} objects found)", objects))
        except Exception as e:
            print(f"Object extraction attempt failed: {e}")

        # Try each repair strategy
        for strategy_name, repaired_item in repair_attempts:
            try:
                if isinstance(repaired_item, list):
                    # Already parsed as objects
                    return repaired_item
                result = json.loads(repaired_item)
                print(f"JSON repair succeeded using strategy: {strategy_name}")
                return result
            except json.JSONDecodeError as repair_error:
                print(f"Strategy '{strategy_name}' failed: {repair_error}")
                continue
            except Exception as repair_error:
                print(f"Strategy '{strategy_name}' failed with exception: {repair_error}")
                continue

        # All repairs failed
        print(f"JSON repair failed completely. Response text (first 500 chars): {response_text[:500]}")
        return None


def _extract_themes(recommendations):
    """Extract top 100 themes from recommendations using Claude"""
    if not recommendations:
        return []

    # Sample up to 100 recommendations for analysis
    sample_size = min(100, len(recommendations))
    sample = recommendations[:sample_size]

    # Prepare context for Claude
    recommendation_text = "\n".join([
        f"- {rec.get('Empfehlung', '')} (Bereich: {rec.get('Unterordner', '')})"
        for rec in sample
    ])

    try:
        response = anthropic_client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=2000,
            messages=[
                {
                    "role": "user",
                    "content": f"""Analysiere die folgenden {len(sample)} Empfehlungen und extrahiere die TOP 50 THEMEN/KATEGORIEN, die am häufigsten vorkommen.

Empfehlungen:
{recommendation_text}

Antworte mit einem JSON Array mit max. 50 Objekten im Format:
[
  {{
    "id": 1,
    "theme": "Themaname (auf Deutsch)",
    "description": "Kurze Beschreibung des Themas",
    "frequency": "Häufigkeit (häufig/sehr häufig/regelmäßig)"
  }}
]

Antworte NUR mit dem JSON Array, ohne zusätzliche Erklärungen."""
                }
            ],
            timeout=90.0
        )

        response_text = response.content[0].text.strip()
        if not response_text:
            print("Error: Claude returned empty response")
            return []

        # Extract JSON from response (handle markdown code blocks)
        if response_text.startswith("```"):
            # Remove markdown code block wrapper
            response_text = response_text.split("```")[1]
            if response_text.startswith("json"):
                response_text = response_text[4:]
            response_text = response_text.strip()

        themes = _parse_json_response(response_text)
        if themes is None:
            return []

        return themes[:50] if isinstance(themes, list) else []
    except Exception as e:
        print(f"Error extracting themes: {e}")
        traceback.print_exc()
        return []


def _rerank_themes_for_query(themes, query, top_n=8):
    """Re-rank cached themes by relevance to a search query using Claude"""
    if not themes or not query:
        return themes[:top_n]

    themes_text = "\n".join([
        f"{i+1}. {t['theme']}: {t['description']}"
        for i, t in enumerate(themes)
    ])

    try:
        response = anthropic_client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=400,
            messages=[
                {
                    "role": "user",
                    "content": f"""Du bekommst eine Suchanfrage und eine Liste von Themen aus Prüfungsempfehlungen.
Wähle die {top_n} Themen aus, die am relevantesten für die Suchanfrage sind.

Suchanfrage: "{query}"

Themen:
{themes_text}

Antworte NUR mit einem JSON Array der Nummern der relevantesten Themen, z.B.: [3, 7, 1, 12, 5, 8, 2, 9]
Genau {top_n} Nummern, sortiert nach Relevanz (relevantestes zuerst)."""
                }
            ],
            timeout=20.0
        )

        response_text = response.content[0].text.strip()
        if response_text.startswith("```"):
            response_text = response_text.split("```")[1]
            if response_text.startswith("json"):
                response_text = response_text[4:]
            response_text = response_text.strip()

        indices = _parse_json_response(response_text)
        if not isinstance(indices, list):
            return themes[:top_n]

        result = []
        seen = set()
        for idx in indices:
            i = int(idx) - 1
            if 0 <= i < len(themes) and i not in seen:
                result.append(themes[i])
                seen.add(i)

        # Fill up to top_n if Claude returned fewer
        for i, t in enumerate(themes):
            if len(result) >= top_n:
                break
            if i not in seen:
                result.append(t)

        return result[:top_n]
    except Exception as e:
        print(f"Error reranking themes: {e}")
        return themes[:top_n]


def _generate_theme_questions(theme_name, theme_description):
    """Generate preconfigured questions and checklist items for a theme"""
    try:
        response = anthropic_client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=1500,
            messages=[
                {
                    "role": "user",
                    "content": f"""Generiere für das folgende Thema aus Prüfungsempfehlungen:

Thema: {theme_name}
Beschreibung: {theme_description}

Erstelle:
1. 5 relevante Fragen, die ein Benutzer stellen könnte
2. 5 praktische Checklist-Items, die überprüft werden sollten

Antworte mit einem JSON Objekt im Format:
{{
  "questions": [
    "Frage 1",
    "Frage 2",
    ...
  ],
  "checklist": [
    "Checklist Item 1",
    "Checklist Item 2",
    ...
  ]
}}

Antworte NUR mit dem JSON Objekt, ohne zusätzliche Erklärungen."""
                }
            ],
            timeout=90.0
        )

        response_text = response.content[0].text.strip()

        # Extract JSON from response (handle markdown code blocks)
        if response_text.startswith("```"):
            # Remove markdown code block wrapper
            response_text = response_text.split("```")[1]
            if response_text.startswith("json"):
                response_text = response_text[4:]
            response_text = response_text.strip()

        result = _parse_json_response(response_text)
        return result if isinstance(result, dict) else {"questions": [], "checklist": []}
    except Exception as e:
        print(f"Error generating theme questions: {e}")
        return {"questions": [], "checklist": []}


@app.route("/themes", methods=["GET"])
def themes():
    """
    GET /themes endpoint
    Returns top 100 themes from recommendations with caching
    Query params:
    - source: "strh" (default), "brh", or "all"
    """
    if not supabase or not anthropic_client:
        return jsonify({"error": "Service unavailable: API clients not initialized"}), 503

    try:
        source = request.args.get("source", "strh").lower()
        if source not in ["strh", "brh", "all"]:
            source = "strh"

        query = request.args.get("query", "").strip()

        base_cache_key = f"themes_{source}"

        # Always ensure the base theme list is available (cached)
        base_themes = theme_cache.get(base_cache_key)
        if not base_themes:
            recommendations = _fetch_all_recommendations(source)
            if not recommendations:
                return jsonify({"error": "Keine Empfehlungen gefunden"}), 404

            base_themes = _extract_themes(recommendations)
            if not base_themes:
                return jsonify({"error": "Themenerkennung fehlgeschlagen"}), 500

            theme_cache.set(base_cache_key, base_themes)

        # If a query is provided, rerank themes by relevance
        if query:
            query_cache_key = f"related_{source}_{query[:100]}"
            cached_related = related_theme_cache.get(query_cache_key)
            if cached_related:
                return jsonify({
                    "themes": cached_related,
                    "cached": True,
                    "source": source,
                    "query": query,
                    "related": True
                })

            related = _rerank_themes_for_query(base_themes, query)
            related_theme_cache.set(query_cache_key, related)
            return jsonify({
                "themes": related,
                "cached": False,
                "source": source,
                "query": query,
                "related": True
            })

        return jsonify({
            "themes": base_themes,
            "cached": True,
            "source": source
        })

    except Exception as e:
        traceback.print_exc()
        error_msg = str(e).lower()
        if "timeout" in error_msg or "read timed out" in error_msg:
            return jsonify({"error": "Die Themenerkennung hat zu lange gedauert. Bitte versuchen Sie es später erneut."}), 504
        return jsonify({"error": f"Server error: {str(e)}"}), 500


@app.route("/theme-questions", methods=["POST"])
def theme_questions():
    """
    POST /theme-questions endpoint
    Generates questions and checklist for a specific theme
    Request body: {
        "theme_name": "string",
        "theme_description": "string",
        "expertise_level": "beginner" or "expert" (optional)
    }
    """
    if not anthropic_client:
        return jsonify({"error": "Service unavailable: AI client not initialized"}), 503

    try:
        data = request.json
        if not data or "theme_name" not in data:
            return jsonify({"error": "Missing 'theme_name' field"}), 400

        theme_name = data["theme_name"].strip()
        theme_description = data.get("theme_description", "").strip()
        expertise_level = data.get("expertise_level", "beginner").lower()

        if not theme_name:
            return jsonify({"error": "Theme name cannot be empty"}), 400

        if expertise_level not in ["beginner", "expert"]:
            expertise_level = "beginner"

        # Generate questions and checklist
        content = _generate_theme_questions(theme_name, theme_description)

        # Enhance content based on expertise level
        if expertise_level == "expert":
            content["expertise_note"] = "Fortgeschrittene Perspektive - Diese Fragen und Checklisten sind auf tiefgehendes Verständnis ausgerichtet."
        else:
            content["expertise_note"] = "Anfänger-freundlich - Diese Fragen und Checklisten sind leicht verständlich und praktisch."

        return jsonify({
            "theme_name": theme_name,
            "theme_description": theme_description,
            "expertise_level": expertise_level,
            "content": content
        })

    except ValueError as e:
        return jsonify({"error": f"Invalid request: {str(e)}"}), 400
    except Exception as e:
        traceback.print_exc()
        error_msg = str(e).lower()
        if "timeout" in error_msg or "read timed out" in error_msg:
            return jsonify({"error": "Die Generierung hat zu lange gedauert. Bitte versuchen Sie es später erneut."}), 504
        return jsonify({"error": f"Server error: {str(e)}"}), 500


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(debug=False, host="0.0.0.0", port=port)
