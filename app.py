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
  "Adressiert an" text,
  "Quelldatei" text,
  similarity float
)
LANGUAGE sql AS $$
  SELECT
    id,
    "Empfehlung",
    "Adressiert an",
    "Quelldatei",
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
  "Adressiert an" text,
  "Quelldatei" text,
  similarity float
)
LANGUAGE sql AS $$
  SELECT
    id,
    "Empfehlung",
    "Adressiert an",
    "Quelldatei",
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
  "Adressiert an" text,
  "Quelldatei" text,
  similarity float
)
LANGUAGE sql AS $$
  SELECT
    id,
    "Empfehlung",
    "Adressiert an",
    "Quelldatei",
    1 - (embedding <=> query_embedding) AS similarity
  FROM (
    SELECT id, "Empfehlung", "Adressiert an", "Quelldatei", embedding FROM "STRH"
    UNION ALL
    SELECT id, "Empfehlung", "Adressiert an", "Quelldatei", embedding FROM "BRH"
  ) AS combined
  WHERE embedding IS NOT NULL
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;

-- Performance optimization: Create vector similarity indexes
-- These MUST be created for optimal vector search performance
CREATE INDEX IF NOT EXISTS ix_strh_embedding ON "STRH" USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
CREATE INDEX IF NOT EXISTS ix_brh_embedding ON "BRH" USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
"""

import os
import traceback
import hashlib
import time
import json
import logging
import signal
import threading
from urllib.parse import quote
from datetime import datetime, timedelta
from flask import Flask, request, jsonify, Response, stream_with_context
from flask_cors import CORS
from dotenv import load_dotenv
from openai import OpenAI
from anthropic import Anthropic
from supabase import create_client, Client
from collections import Counter, defaultdict
import uuid

# Load environment variables
load_dotenv()

# Configure logging for production
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)

# Configure CORS with domain restrictions
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
CORS(app, resources={
    r"/ask": {"origins": allowed_origins},
    r"/themes": {"origins": allowed_origins},
    r"/theme-questions": {"origins": allowed_origins},
    r"/health": {"origins": allowed_origins}
}, supports_credentials=True)

# Request ID generation
def generate_request_id():
    """Generate unique request ID for tracking"""
    return str(uuid.uuid4())


# Inject request ID into request context
@app.before_request
def before_request():
    """Add request ID to all requests for tracking"""
    request.request_id = generate_request_id()


# Security headers
@app.after_request
def set_security_headers(response):
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains; preload'
    response.headers['Content-Security-Policy'] = "default-src 'self'"
    # Add request ID to response headers for tracking
    if hasattr(request, 'request_id'):
        response.headers['X-Request-ID'] = request.request_id
    return response


# Rate limiting
class RateLimiter:
    def __init__(self, max_requests=10, window_seconds=60):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.requests = defaultdict(list)

    def is_allowed(self, identifier):
        """Check if request is allowed, clean old entries"""
        now = datetime.now()
        cutoff = now - timedelta(seconds=self.window_seconds)

        # Clean old requests
        self.requests[identifier] = [
            req_time for req_time in self.requests[identifier]
            if req_time > cutoff
        ]

        # Check limit
        if len(self.requests[identifier]) >= self.max_requests:
            return False

        self.requests[identifier].append(now)
        return True

# Rate limiter: max 10 requests per IP per 60 seconds for /ask endpoint
ask_limiter = RateLimiter(max_requests=10, window_seconds=60)

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


embedding_cache = EmbeddingCache(ttl_seconds=3600)  # Increased to 1 hour for better cache hits

# Search result cache for vector search queries
class SearchResultCache:
    def __init__(self, ttl_seconds=1800):  # 30 minutes TTL
        self.cache = {}
        self.ttl = ttl_seconds

    def get_key(self, embedding_hash, source):
        """Generate cache key from embedding hash and search source"""
        return f"search_{embedding_hash}_{source}"

    def get(self, embedding_hash, source):
        """Get cached search results if valid"""
        key = self.get_key(embedding_hash, source)
        if key in self.cache:
            results, timestamp = self.cache[key]
            if time.time() - timestamp < self.ttl:
                return results
            else:
                del self.cache[key]
        return None

    def set(self, embedding_hash, source, results):
        """Cache search results with timestamp"""
        key = self.get_key(embedding_hash, source)
        self.cache[key] = (results, time.time())

search_result_cache = SearchResultCache(ttl_seconds=1800)

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


def supabase_rpc_with_timeout(rpc_function, params, timeout_seconds=15):
    """Execute Supabase RPC call with timeout"""
    result_container = [None]
    exception_container = [None]

    def execute_rpc():
        try:
            result_container[0] = supabase.rpc(rpc_function, params).execute()
        except Exception as e:
            exception_container[0] = e

    thread = threading.Thread(target=execute_rpc, daemon=True)
    thread.start()
    thread.join(timeout=timeout_seconds)

    if thread.is_alive():
        raise TimeoutError(f"Supabase RPC call '{rpc_function}' timed out after {timeout_seconds} seconds")

    if exception_container[0]:
        raise exception_container[0]

    return result_container[0]


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
    # Get request ID for tracking
    request_id = getattr(request, 'request_id', None)

    # Rate limiting
    client_ip = request.remote_addr
    if not ask_limiter.is_allowed(client_ip):
        logger.warning(f"Rate limit exceeded for IP: {client_ip}", extra={"request_id": request_id})
        return jsonify({
            "error": {
                "message": "Too many requests. Please try again later.",
                "code": 429,
                "request_id": request_id,
                "timestamp": datetime.utcnow().isoformat() + "Z"
            }
        }), 429

    if not openai_client or not anthropic_client or not supabase:
        logger.error("API clients not initialized", extra={"request_id": request_id})
        return jsonify({
            "error": {
                "message": "Service temporarily unavailable",
                "code": 503,
                "request_id": request_id,
                "timestamp": datetime.utcnow().isoformat() + "Z"
            }
        }), 503

    data = request.json
    if not data or "question" not in data:
        return jsonify({
            "error": {
                "message": "Invalid request: missing 'question' field",
                "code": 400,
                "request_id": request_id,
                "timestamp": datetime.utcnow().isoformat() + "Z"
            }
        }), 400

    question = data["question"].strip() if isinstance(data.get("question"), str) else ""
    if not question:
        return jsonify({
            "error": {
                "message": "Question cannot be empty",
                "code": 400,
                "request_id": request_id,
                "timestamp": datetime.utcnow().isoformat() + "Z"
            }
        }), 400

    # Limit question length to prevent abuse
    if len(question) > 5000:
        return jsonify({
            "error": {
                "message": "Question too long (maximum 5000 characters)",
                "code": 400,
                "request_id": request_id,
                "timestamp": datetime.utcnow().isoformat() + "Z"
            }
        }), 400

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

            # Step 2: Vector search (with result caching)
            embedding_hash = hashlib.md5(str(question_embedding).encode()).hexdigest()

            # Try to get cached search result first
            cached_search_result = search_result_cache.get(embedding_hash, search_source)
            if cached_search_result is not None:
                search_result = type('obj', (object,), {'data': cached_search_result})()
            else:
                rpc_function = "match_empfehlungen"
                if search_source == "brh":
                    rpc_function = "match_brh"
                elif search_source == "all":
                    rpc_function = "match_all_empfehlungen"

                try:
                    search_result = supabase_rpc_with_timeout(
                        rpc_function,
                        {"query_embedding": question_embedding, "match_count": 3},
                        timeout_seconds=15
                    )
                    # Cache the search results
                    if search_result.data:
                        search_result_cache.set(embedding_hash, search_source, search_result.data)
                except Exception as e:
                    error_details = {
                        'type': 'error',
                        'error': 'Die Suche hat zu lange gedauert. Bitte versuchen Sie es später erneut.',
                        'request_id': request_id,
                        'timestamp': datetime.utcnow().isoformat() + 'Z'
                    }
                    print(f"Search error: {e}")
                    yield f"data: {json.dumps(error_details)}\n\n"
                    return

            if not search_result.data:
                error_details = {
                    'type': 'error',
                    'error': 'Es wurden keine passenden Empfehlungen gefunden.',
                    'request_id': request_id,
                    'timestamp': datetime.utcnow().isoformat() + 'Z'
                }
                yield f"data: {json.dumps(error_details)}\n\n"
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
                    if search_source == "brh":
                        source_item["search_link"] = f"https://www.google.com/search?q=Rechnungshof%20and%20{quote(quelldatei)}"
                    else:
                        source_item["search_link"] = f"https://www.google.com/search?q={quote(quelldatei)}"
                sources.append(source_item)

            yield f"data: {json.dumps({'type': 'sources', 'sources': sources})}\n\n"

            # Step 4: Prepare context and prompt
            context = "Folgende Empfehlungen könnten relevant sein:\n\n"
            for i, rec in enumerate(recommendations, 1):
                context += f"{i}. {rec['Empfehlung']}\n"
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
            logger.error(f"Error in ask endpoint: {str(e)}", exc_info=True)
            yield f"data: {json.dumps({'type': 'error', 'error': 'An error occurred while processing your request'})}\n\n"

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
    """Health check endpoint - returns status of all services"""
    services_ready = {
        "openai": openai_client is not None,
        "anthropic": anthropic_client is not None,
        "supabase": supabase is not None
    }

    # Overall status is healthy only if all services are ready
    all_ready = all(services_ready.values())
    status = "healthy" if all_ready else "degraded"

    response_data = {
        "status": status,
        "services": services_ready,
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "version": "1.0.0"
    }

    http_status = 200 if all_ready else 503

    if hasattr(request, 'request_id'):
        response_data["request_id"] = request.request_id

    return jsonify(response_data), http_status


def _fetch_all_recommendations(source="strh", limit=500):
    """Fetch all recommendations from Supabase"""
    try:
        if source == "strh":
            response = supabase.table("STRH").select('"Empfehlung","Adressiert an","Quelldatei"').limit(limit).execute()
        elif source == "brh":
            response = supabase.table("BRH").select('"Empfehlung","Adressiert an","Quelldatei"').limit(limit).execute()
        else:  # all - use single optimized query instead of two separate queries
            response = supabase.table("STRH").select('"Empfehlung","Adressiert an","Quelldatei"').limit(limit).execute()
            if response.data:
                brh_response = supabase.table("BRH").select('"Empfehlung","Adressiert an","Quelldatei"').limit(limit).execute()
                response.data.extend(brh_response.data or [])

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


def _extract_themes_fallback(recommendations):
    """Fallback theme extraction from recommendations without Claude"""
    if not recommendations:
        return []

    # Return empty themes as category data is no longer available
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
        f"- {rec.get('Empfehlung', '')}"
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
            return _extract_themes_fallback(recommendations)

        # Extract JSON from response (handle markdown code blocks)
        if response_text.startswith("```"):
            # Remove markdown code block wrapper
            response_text = response_text.split("```")[1]
            if response_text.startswith("json"):
                response_text = response_text[4:]
            response_text = response_text.strip()

        themes = _parse_json_response(response_text)
        if themes is None:
            return _extract_themes_fallback(recommendations)

        return themes[:50] if isinstance(themes, list) else _extract_themes_fallback(recommendations)
    except Exception as e:
        logger.error(f"Error extracting themes with Claude: {str(e)}", exc_info=True)
        print(f"Error extracting themes: {e}")
        traceback.print_exc()
        # Fall back to simple theme extraction
        return _extract_themes_fallback(recommendations)


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


def _generate_theme_questions_fallback(theme_name, theme_description):
    """Fallback: Generate generic questions and checklist for a theme when Claude unavailable"""
    return {
        "questions": [
            f"Was sind die Hauptrisiken bezüglich {theme_name}?",
            f"Wie können wir {theme_name} in unserer Organisation verbessern?",
            f"Welche Best Practices gibt es für {theme_name}?",
            f"Wie überprüfen wir die Compliance bei {theme_name}?",
            f"Welche Ressourcen werden für {theme_name} benötigt?"
        ],
        "checklist": [
            f"Überprüfung: Ist eine klare {theme_name}-Richtlinie dokumentiert?",
            f"Überprüfung: Werden regelmäßig {theme_name}-Audits durchgeführt?",
            f"Überprüfung: Ist Personal für {theme_name} geschult?",
            f"Überprüfung: Gibt es ein Monitoring-System für {theme_name}?",
            f"Überprüfung: Werden Verbesserungen bei {theme_name} durchgeführt?"
        ]
    }


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
        return result if isinstance(result, dict) else _generate_theme_questions_fallback(theme_name, theme_description)
    except Exception as e:
        logger.error(f"Error generating theme questions: {str(e)}", exc_info=True)
        print(f"Error generating theme questions: {e}")
        # Fall back to generic questions
        return _generate_theme_questions_fallback(theme_name, theme_description)


@app.route("/themes", methods=["GET"])
def themes():
    """
    GET /themes endpoint
    Returns top themes from recommendations with caching
    Query params:
    - source: "strh" (default), "brh", or "all"
    - query: optional search query to get related themes
    """
    request_id = getattr(request, 'request_id', None)

    if not supabase or not anthropic_client:
        return jsonify({
            "error": {
                "message": "Service temporarily unavailable",
                "code": 503,
                "request_id": request_id,
                "timestamp": datetime.utcnow().isoformat() + "Z"
            }
        }), 503

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
                return jsonify({
                    "error": {
                        "message": "No recommendations found for the selected source",
                        "code": 404,
                        "request_id": request_id,
                        "timestamp": datetime.utcnow().isoformat() + "Z"
                    }
                }), 404

            base_themes = _extract_themes(recommendations)
            # If theme extraction fails completely, we'll still cache empty list
            # but the fallback in _extract_themes should prevent this
            if base_themes:
                theme_cache.set(base_cache_key, base_themes)
            else:
                logger.warning(f"No themes extracted for source: {source}", extra={"request_id": request_id})
                # Return empty themes list rather than 500 error
                return jsonify({
                    "themes": [],
                    "cached": False,
                    "source": source,
                    "message": "No themes available at this time"
                })

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
        logger.error(f"Error in themes endpoint: {str(e)}", exc_info=True, extra={"request_id": request_id})
        error_msg = str(e).lower()
        error_code = 504 if "timeout" in error_msg or "read timed out" in error_msg else 500
        error_message = "Request timed out. Please try again." if error_code == 504 else "An error occurred while processing your request"

        return jsonify({
            "error": {
                "message": error_message,
                "code": error_code,
                "request_id": request_id,
                "timestamp": datetime.utcnow().isoformat() + "Z"
            }
        }), error_code


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
    request_id = getattr(request, 'request_id', None)

    if not anthropic_client:
        return jsonify({
            "error": {
                "message": "Service temporarily unavailable",
                "code": 503,
                "request_id": request_id,
                "timestamp": datetime.utcnow().isoformat() + "Z"
            }
        }), 503

    try:
        data = request.json
        if not data or "theme_name" not in data:
            return jsonify({
                "error": {
                    "message": "Missing required field: 'theme_name'",
                    "code": 400,
                    "request_id": request_id,
                    "timestamp": datetime.utcnow().isoformat() + "Z"
                }
            }), 400

        theme_name = data["theme_name"].strip() if isinstance(data.get("theme_name"), str) else ""
        theme_description = data.get("theme_description", "").strip() if isinstance(data.get("theme_description"), str) else ""
        expertise_level = data.get("expertise_level", "beginner").lower()

        if not theme_name:
            return jsonify({
                "error": {
                    "message": "Theme name cannot be empty",
                    "code": 400,
                    "request_id": request_id,
                    "timestamp": datetime.utcnow().isoformat() + "Z"
                }
            }), 400

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
        return jsonify({
            "error": {
                "message": "Invalid request parameters",
                "code": 400,
                "request_id": request_id,
                "timestamp": datetime.utcnow().isoformat() + "Z"
            }
        }), 400
    except Exception as e:
        logger.error(f"Error in theme-questions endpoint: {str(e)}", exc_info=True, extra={"request_id": request_id})
        error_msg = str(e).lower()
        error_code = 504 if "timeout" in error_msg or "read timed out" in error_msg else 500
        error_message = "Request timed out. Please try again." if error_code == 504 else "An error occurred while processing your request"

        return jsonify({
            "error": {
                "message": error_message,
                "code": error_code,
                "request_id": request_id,
                "timestamp": datetime.utcnow().isoformat() + "Z"
            }
        }), error_code


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    debug_mode = os.getenv("FLASK_ENV", "production") == "development"

    # Ensure production defaults
    if not debug_mode:
        app.config['PROPAGATE_EXCEPTIONS'] = False
        app.config['TRAP_HTTP_EXCEPTIONS'] = False

    app.run(debug=debug_mode, host="0.0.0.0", port=port)
