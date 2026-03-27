# artbackstage Integration - Quick Start Guide

Get up and running with the enhanced artbackstage integration in 5 minutes.

---

## Option 1: Interactive Demo (2 minutes)

**No setup required!**

1. Open `integration-examples.html` in your web browser
2. You'll see a live dashboard with:
   - API health status
   - Search interface
   - Theme browser
   - Configuration options
3. Try the examples:
   - Click "Check Health" to test the backend
   - Ask a question in German
   - Browse available themes
   - Test error handling

**That's it!** You now understand how the API works.

---

## Option 2: Add to Your HTML Page (2 minutes)

Copy this into your HTML file's `<head>` section:

```html
<!-- Configure API endpoint (optional, auto-detects production) -->
<script>
  window.ARTBACKSTAGE_API_URL = 'https://artbackstage.onrender.com';
  window.ARTBACKSTAGE_ENV = 'production';
</script>

<!-- Include API client library -->
<script src="/path/to/api-client.js"></script>
```

Then use in your JavaScript:

```javascript
// Initialize client (auto-configured based on environment)
const client = new ArtbackstageAPI();

// Check health
const health = await client.health();
console.log('Backend status:', health.status);

// Ask a question
const stream = await client.ask({
  question: "Was sind Best Practices für Datenschutz?",
  expertise_level: "beginner"
});

for await (const event of stream) {
  if (event.type === 'text') {
    document.getElementById('answer').textContent += event.text;
  }
}

// Get themes
const themes = await client.getThemes();
console.log('Available themes:', themes);
```

---

## Option 3: React Integration (3 minutes)

```javascript
import ArtbackstageAPI from './api-client.js';
import { useEffect, useState } from 'react';

export function SearchWidget() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const client = new ArtbackstageAPI(
    process.env.REACT_APP_API_URL
  );

  const handleSearch = async () => {
    setLoading(true);
    setAnswer('');

    try {
      const stream = await client.ask({
        question,
        expertise_level: 'beginner'
      });

      for await (const event of stream) {
        if (event.type === 'text') {
          setAnswer(prev => prev + event.text);
        }
      }
    } catch (error) {
      setAnswer(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="Ask in German..."
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Loading...' : 'Search'}
      </button>
      <div>{answer}</div>
    </div>
  );
}
```

---

## Option 4: Vue 3 Integration (3 minutes)

```vue
<template>
  <div class="search-widget">
    <input
      v-model="question"
      placeholder="Ask in German..."
      @keyup.enter="search"
    />
    <button @click="search" :disabled="loading">
      {{ loading ? 'Loading...' : 'Search' }}
    </button>
    <div class="answer">{{ answer }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ArtbackstageAPI from '@/api-client.js';

const question = ref('');
const answer = ref('');
const loading = ref(false);
const client = new ArtbackstageAPI(
  import.meta.env.VITE_API_URL
);

const search = async () => {
  loading.value = true;
  answer.value = '';

  try {
    const stream = await client.ask({
      question: question.value,
      expertise_level: 'beginner'
    });

    for await (const event of stream) {
      if (event.type === 'text') {
        answer.value += event.text;
      }
    }
  } catch (error) {
    answer.value = `Error: ${error.message}`;
  } finally {
    loading.value = false;
  }
};
</script>
```

---

## Option 5: PHP Backend Integration (3 minutes)

```php
<?php
// Get API URL from environment
$apiUrl = getenv('ARTBACKSTAGE_API_URL')
    ?: 'https://artbackstage.onrender.com';

// Helper function to call backend
function callArtbackstageAPI($endpoint, $method = 'GET', $data = null) {
    global $apiUrl;

    $curl = curl_init($apiUrl . $endpoint);

    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($curl, CURLOPT_TIMEOUT, 30);
    curl_setopt($curl, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json'
    ]);

    if ($data) {
        curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));
    }

    $response = curl_exec($curl);
    $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);

    return [
        'status' => $httpCode,
        'data' => json_decode($response, true)
    ];
}

// Check health
$health = callArtbackstageAPI('/health');
if ($health['status'] === 200) {
    echo "Backend is healthy: " . $health['data']['status'];
} else {
    echo "Backend error: " . $health['status'];
}

// Get themes
$themes = callArtbackstageAPI('/themes');
if ($themes['status'] === 200) {
    foreach ($themes['data']['themes'] as $theme) {
        echo $theme['theme'] . "\n";
    }
}
?>
```

---

## Configuration Quick Reference

### Development (localhost)
```html
<script>
  window.ARTBACKSTAGE_API_URL = 'http://localhost:5000';
  window.ARTBACKSTAGE_ENV = 'development';
</script>
```

### Staging
```html
<script>
  window.ARTBACKSTAGE_API_URL = 'https://artbackstage-staging.onrender.com';
  window.ARTBACKSTAGE_ENV = 'staging';
</script>
```

### Production
```html
<script>
  window.ARTBACKSTAGE_API_URL = 'https://artbackstage.onrender.com';
  window.ARTBACKSTAGE_ENV = 'production';
</script>
```

Or use environment variables:
```bash
REACT_APP_API_URL=https://artbackstage.onrender.com
VUE_APP_API_URL=https://artbackstage.onrender.com
```

---

## Common Tasks

### 1. Ask a Question and Get Streamed Response

```javascript
const client = new ArtbackstageAPI();

const stream = await client.ask({
  question: "Wie schreibe ich einen Auditoriumsbericht?",
  expertise_level: "expert",
  search_source: "strh",
  model: "sonnet"
});

for await (const event of stream) {
  switch(event.type) {
    case 'sources':
      console.log('Sources:', event.sources);
      break;
    case 'zentrale_aussage':
      console.log('Key point:', event.text);
      break;
    case 'text':
      console.log('Answer:', event.text);
      break;
    case 'error':
      console.error('Error:', event.error);
      break;
  }
}
```

### 2. Browse Themes and Get Questions

```javascript
const client = new ArtbackstageAPI();

// Get all themes
const themes = await client.getThemes();

// Pick one and get its questions
const questions = await client.getThemeQuestions({
  theme: themes[0]  // or any theme from the list
});

console.log('Questions for this theme:', questions);
```

### 3. Check API Health

```javascript
const client = new ArtbackstageAPI();

const health = await client.health();

if (health.status === 'healthy') {
  console.log('All systems ready:');
  console.log('- OpenAI:', health.services.openai);
  console.log('- Anthropic:', health.services.anthropic);
  console.log('- Supabase:', health.services.supabase);
} else {
  console.log('Some services are degraded');
}
```

### 4. Handle Errors Gracefully

```javascript
const client = new ArtbackstageAPI(
  'https://artbackstage.onrender.com',
  {
    timeout: 30000,
    retryAttempts: 3,
    onError: (error) => {
      console.error('API Error:', {
        endpoint: error.endpoint,
        message: error.message,
        timestamp: error.timestamp
      });
      // Send to monitoring service
      sendToMonitoring(error);
    }
  }
);
```

### 5. Implement Search with Fallback

```javascript
async function smartSearch(question, attempts = 0) {
  const client = new ArtbackstageAPI();

  try {
    // Try STRH first (most common)
    const stream = await client.ask({
      question,
      search_source: 'strh'
    });

    // Process stream...

  } catch (error) {
    if (attempts < 2) {
      // Try BRH if STRH failed
      return smartSearch(question, attempts + 1);
    } else {
      console.error('Search failed:', error);
    }
  }
}
```

---

## Testing Your Integration

### Step 1: Verify API is Accessible
```javascript
const client = new ArtbackstageAPI();
const health = await client.health();
console.log('API Status:', health.status);  // Should print "healthy"
```

### Step 2: Test Streaming
```javascript
const stream = await client.ask({
  question: "Test question"
});

let eventCount = 0;
for await (const event of stream) {
  console.log(`Event ${++eventCount}:`, event.type);
}
console.log(`Received ${eventCount} events`);
```

### Step 3: Verify Caching
```javascript
// First call (not cached)
console.time('first');
await client.getThemes();
console.timeEnd('first');  // Should take ~100-500ms

// Second call (cached)
console.time('second');
await client.getThemes();
console.timeEnd('second');  // Should take <5ms
```

---

## Next Steps

1. **Read the full documentation**: See `API_DOCUMENTATION.md` for detailed endpoint specs
2. **Explore the examples**: Open `integration-examples.html` to see all features
3. **Check the summary**: Review `INTEGRATION_ENHANCEMENT_SUMMARY.md` for architecture details
4. **Implement in your app**: Use one of the examples above to add to your codebase

---

## Need Help?

- **API Questions**: Check `API_DOCUMENTATION.md`
- **Code Examples**: See `integration-examples.html`
- **Architecture**: Read `INTEGRATION_ENHANCEMENT_SUMMARY.md`
- **Debugging**: Enable debug mode with `onError` and `onSuccess` callbacks
- **Backend Issues**: Check request IDs in server logs

---

## Performance Tips

1. **Use Caching**: The client automatically caches responses (default 5 minutes)
2. **Filter Results**: Use `search_source` parameter to query only needed database
3. **Choose Right Model**: Use `haiku` for speed, `sonnet` for accuracy
4. **Stream Responses**: Don't wait for full response, process chunks as they arrive
5. **Implement Retry**: Use client's built-in retry logic for transient failures

---

**You're ready! Choose an option above and start building.** 🚀
