# artbackstage API Documentation

Complete API reference for artbackstage.onrender.com backend.

## Overview

The artbackstage backend provides semantic search and recommendation services powered by Claude AI, integrated with auditing recommendation databases (STRH, BRH).

### Base URL
- **Production**: `https://artbackstage.onrender.com`
- **Staging**: `https://artbackstage-staging.onrender.com`
- **Development**: `http://localhost:5000`

### Authentication
Currently no authentication required. CORS is configured for allowed origins defined in `ALLOWED_ORIGINS` environment variable.

### Response Format
All endpoints return JSON responses with consistent structure.

---

## Endpoints

### 1. Health Check

**Endpoint**: `GET /health`

**Description**: Check backend service health and API client availability.

**Response** (200 OK):
```json
{
  "status": "healthy",
  "openai_ready": true,
  "anthropic_ready": true,
  "supabase_ready": true
}
```

**Example**:
```javascript
const client = new ArtbackstageAPI('https://artbackstage.onrender.com');
const health = await client.health();
console.log(health.status); // "healthy"
```

---

### 2. Ask - Semantic Search

**Endpoint**: `POST /ask`

**Description**: Search recommendations and get AI-powered answer using Claude. Returns Server-Sent Events (SSE) stream.

**Request Body**:
```json
{
  "question": "Wie sollten Compliance-Anforderungen implementiert werden?",
  "expertise_level": "beginner",
  "search_source": "strh",
  "model": "haiku"
}
```

**Parameters**:
- `question` (string, required): Question in German
- `expertise_level` (string, optional): `"beginner"` or `"expert"` (default: `"beginner"`)
  - `beginner`: Simple language, explanations, practical focus
  - `expert`: Technical detail, variations, exceptions, best practices
- `search_source` (string, optional): Which database to search
  - `"strh"` (default): Stadtrechnungshof recommendations
  - `"brh"`: Bundesrechnungshof recommendations
  - `"all"`: Both databases
- `model` (string, optional): Which Claude model to use
  - `"haiku"` (default): Faster, cheaper, suitable for most tasks
  - `"sonnet"`: More capable, better for complex analysis

**Response**: Server-Sent Events (text/event-stream)

**Event Types**:

#### sources
Immediately sent with relevant recommendations found.
```json
{
  "type": "sources",
  "sources": [
    {
      "empfehlung": "Dokumentation aller Prozesse durchführen",
      "quelldatei": "STRH_2023_Report.pdf",
      "adressiert_an": "Management",
      "similarity": 0.8234,
      "search_link": "https://www.google.com/search?q=..."
    }
  ]
}
```

#### zentrale_aussage
Key finding/central statement from Claude.
```json
{
  "type": "zentrale_aussage",
  "text": "Die Implementierung von Compliance-Anforderungen erfordert..."
}
```

#### text
Streamed answer text chunks.
```json
{
  "type": "text",
  "text": "...ein strukturiertes Vorgehen..."
}
```

#### done
Signals end of stream.
```json
{
  "type": "done"
}
```

#### error
Error message.
```json
{
  "type": "error",
  "error": "Too many requests. Please try again later."
}
```

**Rate Limiting**: 10 requests per 60 seconds per IP

**Timeout**: 90 seconds per request

**Example**:
```javascript
const client = new ArtbackstageAPI();

try {
  const stream = await client.ask({
    question: "Wie implementiere ich Compliance-Anforderungen?",
    expertise_level: "beginner",
    search_source: "strh",
    model: "haiku"
  });

  for await (const event of stream) {
    switch(event.type) {
      case 'sources':
        console.log('Found sources:', event.sources);
        break;
      case 'zentrale_aussage':
        console.log('Key finding:', event.text);
        break;
      case 'text':
        console.log('Answer:', event.text);
        break;
      case 'error':
        console.error('Error:', event.error);
        break;
      case 'done':
        console.log('Stream complete');
        break;
    }
  }
} catch (error) {
  console.error('Request failed:', error);
}
```

---

### 3. Get Themes

**Endpoint**: `GET /themes`

**Description**: Get all available themes from recommendations database.

**Response** (200 OK):
```json
{
  "themes": [
    {
      "id": 1,
      "theme": "Finanzberichterstattung",
      "description": "Anforderungen und Best Practices für Finanzberichterstattung",
      "frequency": "sehr häufig"
    },
    {
      "id": 2,
      "theme": "Interne Kontrollen",
      "description": "Aufbau und Überwachung von internen Kontrollen",
      "frequency": "häufig"
    }
  ]
}
```

**Caching**: Response is cached for 24 hours

**Example**:
```javascript
const client = new ArtbackstageAPI();
const themes = await client.getThemes();
console.log(themes); // Array of theme objects
```

---

### 4. Get Theme Questions

**Endpoint**: `POST /theme-questions`

**Description**: Get guided questions for a specific theme to help users explore that area.

**Request Body**:
```json
{
  "theme": "Finanzberichterstattung"
}
```

**Parameters**:
- `theme` (string, required): Theme name from `/themes` endpoint

**Response** (200 OK):
```json
{
  "theme": "Finanzberichterstattung",
  "questions": [
    {
      "id": 1,
      "question": "Wie sollte der Jahresabschluss strukturiert werden?",
      "helptext": "Dies betrifft die formale Struktur von Finanzberichten"
    },
    {
      "id": 2,
      "question": "Welche Offenlegungen sind erforderlich?",
      "helptext": "Informationen die explizit offengelegt werden müssen"
    }
  ]
}
```

**Caching**: Response is cached for 1 hour per theme

**Example**:
```javascript
const client = new ArtbackstageAPI();
const questions = await client.getThemeQuestions({
  theme: "Finanzberichterstattung"
});
console.log(questions.questions); // Array of questions
```

---

## Error Handling

### Common HTTP Status Codes

| Status | Meaning | Example |
|--------|---------|---------|
| 200 | Success | Request processed successfully |
| 400 | Bad Request | Missing required parameters |
| 429 | Rate Limited | Too many requests from IP |
| 503 | Service Unavailable | API clients not initialized |
| 500 | Server Error | Unexpected server error |

### Error Response Format

```json
{
  "error": "Description of what went wrong",
  "timestamp": "2024-03-27T10:30:00Z",
  "request_id": "abc123def456"
}
```

---

## Integration Examples

### Example 1: Simple Question and Answer

```html
<div id="search-form">
  <input id="question-input" type="text" placeholder="Ask your question...">
  <button id="search-btn">Search</button>
  <div id="results"></div>
</div>

<script src="api-client.js"></script>
<script>
  const client = new ArtbackstageAPI('https://artbackstage.onrender.com');

  document.getElementById('search-btn').addEventListener('click', async () => {
    const question = document.getElementById('question-input').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<p>Loading...</p>';

    try {
      const stream = await client.ask({
        question: question,
        expertise_level: 'beginner'
      });

      let sources = '';
      let answer = '';

      for await (const event of stream) {
        if (event.type === 'sources') {
          sources = event.sources.map(s =>
            `<p><strong>${s.empfehlung}</strong><br/>Ähnlichkeit: ${(s.similarity * 100).toFixed(1)}%</p>`
          ).join('');
        } else if (event.type === 'zentrale_aussage') {
          answer += `<strong>${event.text}</strong><br/>`;
        } else if (event.type === 'text') {
          answer += event.text;
        }
      }

      resultsDiv.innerHTML = `
        <div class="sources">${sources}</div>
        <div class="answer">${answer}</div>
      `;
    } catch (error) {
      resultsDiv.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
  });
</script>
```

### Example 2: Theme Browser

```javascript
async function loadThemeBrowser() {
  const client = new ArtbackstageAPI('https://artbackstage.onrender.com');

  // Load themes
  const themes = await client.getThemes();

  // Display themes
  const themesList = document.getElementById('themes-list');
  for (const theme of themes) {
    const button = document.createElement('button');
    button.textContent = theme.theme;
    button.onclick = () => loadThemeQuestions(theme.theme);
    themesList.appendChild(button);
  }
}

async function loadThemeQuestions(themeName) {
  const client = new ArtbackstageAPI('https://artbackstage.onrender.com');

  const result = await client.getThemeQuestions({ theme: themeName });

  // Display questions
  const questionsList = document.getElementById('questions-list');
  questionsList.innerHTML = '';
  for (const question of result.questions) {
    const div = document.createElement('div');
    div.innerHTML = `<h4>${question.question}</h4><p>${question.helptext}</p>`;
    questionsList.appendChild(div);
  }
}
```

### Example 3: With Error Handling and Retry

```javascript
const client = new ArtbackstageAPI(
  'https://artbackstage.onrender.com',
  {
    timeout: 30000,
    retryAttempts: 3,
    retryDelay: 1000,
    onError: (error) => {
      console.error('API error:', error);
      // Send to monitoring service
      sendToMonitoring({
        service: 'artbackstage-api',
        error: error.message,
        endpoint: error.endpoint
      });
    },
    onSuccess: (endpoint, data) => {
      console.log('API success:', endpoint);
    }
  }
);

// Use client...
```

---

## Environment Variables

### Backend (.env)

```bash
# API Keys
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-key

# CORS
ALLOWED_ORIGINS=http://localhost:3000,https://artbackstage.info

# Server
FLASK_ENV=production
PORT=5000
```

### Frontend Configuration

Set in HTML `<head>`:
```html
<script>
  window.ARTBACKSTAGE_API_URL = 'https://artbackstage.onrender.com';
  window.ARTBACKSTAGE_API_TIMEOUT = 30000;
  window.ARTBACKSTAGE_ENV = 'production';
</script>
```

Or in environment files:
```bash
REACT_APP_API_URL=https://artbackstage.onrender.com
VUE_APP_API_URL=https://artbackstage.onrender.com
```

---

## Performance Considerations

### Caching

- `/themes` responses cached for 24 hours
- `/theme-questions` responses cached for 1 hour per theme
- Question embeddings cached for 10 minutes

Clear cache if needed:
```javascript
client.clearCache();
```

### Rate Limiting

- `/ask`: 10 requests per 60 seconds per IP
- Returns 429 status when exceeded
- Implement exponential backoff on client

### Streaming

- `/ask` returns Server-Sent Events for real-time updates
- Chunks arrive as they're generated
- More responsive UX than waiting for full response

### Timeout

- Default timeout: 30 seconds
- Claude inference: up to 90 seconds
- OpenAI embeddings: up to 10 seconds

---

## Security

### CORS

Only requests from `ALLOWED_ORIGINS` are accepted. Set in environment:
```
ALLOWED_ORIGINS=http://localhost:3000,https://artbackstage.info,https://www.artbackstage.info
```

### Headers

Backend sets security headers:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security: max-age=31536000`
- `Content-Security-Policy: default-src 'self'`

### Input Validation

- Question length limited to 5000 characters
- Invalid parameters rejected with 400 error

---

## Support

For issues or questions about the API:
1. Check the examples above
2. Review server logs: `artbackstage.onrender.com logs`
3. Open an issue on GitHub
4. Contact: martin@artbackstage.info
