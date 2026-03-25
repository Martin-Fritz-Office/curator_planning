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
from flask import Flask, request, jsonify
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

# Initialize API clients with lazy initialization for Supabase
try:
    openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
except Exception as e:
    print(f"Warning: OpenAI client initialization failed: {e}")
    openai_client = None

try:
    anthropic_client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
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
    POST /ask endpoint
    Request body: {
        "question": "user question in German",
        "expertise_level": "beginner" or "expert",
        "search_source": "strh" (default), "brh", or "all"
    }
    Response: JSON object with answer, summary, and sources
    """
    # Check if required clients are initialized
    if not openai_client or not anthropic_client or not supabase:
        return jsonify({"error": "Service unavailable: API clients not initialized"}), 503

    try:
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

        # Step 1: Get or create embedding (with caching)
        question_embedding = embedding_cache.get(question)
        if question_embedding is None:
            embedding_response = openai_client.embeddings.create(
                model="text-embedding-3-small",
                input=question
            )
            question_embedding = embedding_response.data[0].embedding
            embedding_cache.set(question, question_embedding)

        # Step 2: Search Supabase for similar recommendations
        # Select appropriate RPC function based on search_source
        rpc_function = "match_empfehlungen"  # default: STRH
        if search_source == "brh":
            rpc_function = "match_brh"
        elif search_source == "all":
            rpc_function = "match_all_empfehlungen"

        try:
            search_result = supabase.rpc(
                rpc_function,
                {
                    "query_embedding": question_embedding,
                    "match_count": 10
                }
            ).execute()
        except Exception as e:
            print(f"Search error: {e}")
            return jsonify({
                "error": "Die Suche hat zu lange gedauert. Bitte versuchen Sie es später erneut."
            }), 504

        if not search_result.data:
            return jsonify({
                "answer": "Es wurden keine passenden Empfehlungen gefunden.",
                "summary": "Es wurden keine passenden Empfehlungen gefunden.",
                "sources": []
            })

        # Step 3: Prepare context from search results
        recommendations = search_result.data
        context = "Folgende Empfehlungen könnten relevant sein:\n\n"
        for i, rec in enumerate(recommendations, 1):
            context += f"{i}. {rec['Empfehlung']}\n"
            context += f"   Ordner: {rec['Unterordner']}\n"
            context += f"   Adressiert an: {rec['Adressiert an']}\n"
            context += f"   Ähnlichkeit: {rec['similarity']:.2%}\n\n"

        # Step 4: Build expertise-specific system prompt
        expertise_prompt = _get_expertise_prompt(expertise_level, question, context)

        # Step 5: Get Claude's response
        try:
            response = anthropic_client.messages.create(
                model="claude-sonnet-4-6",
                max_tokens=1024,
                messages=[
                    {
                        "role": "user",
                        "content": expertise_prompt
                    }
                ]
            )

            answer = response.content[0].text

            # Step 6: Format and return sources
            sources = []
            for rec in recommendations:
                quelldatei = rec.get("Quelldatei") or rec.get("quelldatei", "")
                source_item = {
                    "empfehlung": rec["Empfehlung"],
                    "quelldatei": quelldatei,
                    "adressiert_an": rec["Adressiert an"],
                    "similarity": round(rec["similarity"], 4)
                }
                # Add search link if quelldatei is available
                if quelldatei:
                    source_item["search_link"] = f"https://www.google.com/search?q={quote(quelldatei)}"
                sources.append(source_item)

            return jsonify({
                "zentrale_aussage": _generate_zentrale_aussage(answer),
                "summary": _generate_summary(answer),
                "sources": sources
            })

        except Exception as e:
            traceback.print_exc()
            return jsonify({"error": f"Fehler bei der Antwortgenerierung: {str(e)}"}), 500

    except ValueError as e:
        return jsonify({"error": f"Invalid request: {str(e)}"}), 400
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": f"Server error: {str(e)}"}), 500


def _get_expertise_prompt(expertise_level, question, context):
    """Build expertise-specific system prompt"""
    base_instruction = f"""Du bist ein hilfreicher Assistent für Prüfungsempfehlungen.

Benutzer-Frage: {question}

Basierend auf den folgenden Empfehlungen aus der Datenbank, bitte antworte klar und prägnant:

{context}

Antworte NUR basierend auf den oben genannten Empfehlungen. Wenn keine der Empfehlungen relevant ist, teile dies mit."""

    if expertise_level == "expert":
        return base_instruction + """\n\nDer Benutzer ist ein Experte. Antworte auf detaillierte, technische Weise. Nutze Fachbegriffe und gehe in die Tiefe. Diskutiere auch mögliche Variationen, Ausnahmen und Best Practices."""
    else:  # beginner
        return base_instruction + """\n\nDer Benutzer ist Anfänger und kennt sich mit diesem Thema nicht gut aus. Verwende einfache, verständliche Sprache. Erkläre Fachbegriffe. Konzentriere dich auf die wichtigsten praktischen Punkte."""


def _generate_zentrale_aussage(answer):
    """Generate a poignant, serious one-sentence central statement from the answer"""
    try:
        response = anthropic_client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=150,
            messages=[
                {
                    "role": "user",
                    "content": f"""Basierend auf dieser Antwort, generiere eine einzige ernsthafte und prägnante "Zentrale Aussage" - einen Kernsatz, der die wichtigste Erkenntnis oder Empfehlung zusammenfasst. Die Aussage soll kurz, prägnant und nachdenklich stimmend sein.

Antwort:
{answer}

Antworte NUR mit der einen Zentrale Aussage, ohne weitere Erklärungen."""
                }
            ]
        )
        return response.content[0].text.strip()
    except Exception as e:
        # Fallback to first sentence if generation fails
        return answer.split('.')[0] + '.' if '.' in answer else answer[:100]


def _generate_summary(answer):
    """Return the answer as the summary without truncation for flexible length"""
    return answer


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
            response = supabase.table("STRH").select("Empfehlung,Unterordner,Adressiert an,Quelldatei").limit(limit).execute()
        elif source == "brh":
            response = supabase.table("BRH").select("Empfehlung,Unterordner,Adressiert an,Quelldatei").limit(limit).execute()
        else:  # all
            strh_data = supabase.table("STRH").select("Empfehlung,Unterordner,Adressiert an,Quelldatei").limit(limit).execute()
            brh_data = supabase.table("BRH").select("Empfehlung,Unterordner,Adressiert an,Quelldatei").limit(limit).execute()
            response = type('obj', (object,), {'data': (strh_data.data or []) + (brh_data.data or [])})()

        return response.data or []
    except Exception as e:
        print(f"Error fetching recommendations: {e}")
        return []


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
            ]
        )

        response_text = response.content[0].text.strip()
        if not response_text:
            print("Error: Claude returned empty response")
            return []

        # Extract JSON from response
        themes = json.loads(response_text)
        return themes[:50]  # Limit to top 50
    except Exception as e:
        print(f"Error extracting themes: {e}")
        traceback.print_exc()
        return []


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
            ]
        )

        response_text = response.content[0].text.strip()
        return json.loads(response_text)
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

        cache_key = f"themes_{source}"

        # Check cache first
        cached_themes = theme_cache.get(cache_key)
        if cached_themes:
            return jsonify({
                "themes": cached_themes,
                "cached": True,
                "source": source
            })

        # Fetch recommendations
        recommendations = _fetch_all_recommendations(source)
        if not recommendations:
            return jsonify({
                "error": "Keine Empfehlungen gefunden"
            }), 404

        # Extract themes
        themes_list = _extract_themes(recommendations)

        if not themes_list:
            return jsonify({
                "error": "Themenerkennung fehlgeschlagen"
            }), 500

        # Cache the result
        theme_cache.set(cache_key, themes_list)

        return jsonify({
            "themes": themes_list,
            "cached": False,
            "source": source,
            "total_recommendations": len(recommendations)
        })

    except Exception as e:
        traceback.print_exc()
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
        return jsonify({"error": f"Server error: {str(e)}"}), 500


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(debug=False, host="0.0.0.0", port=port)
