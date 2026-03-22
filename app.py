"""
Semantic Search Web App with Claude AI
Searches 22,000 auditing recommendations from Supabase using semantic search.

SQL Function to create in Supabase before running this app:

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
"""

import os
import traceback
import hashlib
import time
from concurrent.futures import ThreadPoolExecutor
import concurrent.futures
from urllib.parse import quote
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from openai import OpenAI
from anthropic import Anthropic
from supabase import create_client, Client

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
    Request body: {"question": "user question in German", "expertise_level": "beginner" or "expert"}
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
        try:
            with ThreadPoolExecutor(max_workers=1) as executor:
                future = executor.submit(lambda: supabase.rpc(
                    "match_empfehlungen",
                    {
                        "query_embedding": question_embedding,
                        "match_count": 10
                    }
                ).execute())
                search_result = future.result(timeout=25)
        except concurrent.futures.TimeoutError:
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
                model="claude-sonnet-4-20250514",
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
                "answer": answer,
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


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(debug=False, host="0.0.0.0", port=port)
