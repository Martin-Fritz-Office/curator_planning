/**
 * Unified API Client for artbackstage integration
 *
 * Provides consistent interface for calling artbackstage.onrender.com backend
 * from artbackstage.info frontend.
 *
 * Usage:
 *   const client = new ArtbackstageAPI('https://artbackstage.onrender.com');
 *   const response = await client.ask({ question: 'My question' });
 */

class ArtbackstageAPI {
  constructor(baseURL = null, options = {}) {
    // Use provided URL or fallback to environment variable or relative path
    this.baseURL = baseURL ||
      (typeof process !== 'undefined' && process.env.REACT_APP_API_URL) ||
      (typeof window !== 'undefined' && window.ARTBACKSTAGE_API_URL) ||
      'https://artbackstage.onrender.com';

    this.timeout = options.timeout || 30000;
    this.retryAttempts = options.retryAttempts || 3;
    this.retryDelay = options.retryDelay || 1000;
    this.onError = options.onError || null;
    this.onSuccess = options.onSuccess || null;
    this.cache = new Map();
    this.cacheExpiry = options.cacheExpiry || 300000; // 5 minutes default
  }

  /**
   * Health check endpoint
   * @returns {Promise<Object>} Health status
   */
  async health() {
    return this._request('/health', { method: 'GET' });
  }

  /**
   * Ask endpoint - semantic search with Claude
   * @param {Object} params
   * @param {string} params.question - The question in German
   * @param {string} [params.expertise_level='beginner'] - 'beginner' or 'expert'
   * @param {string} [params.search_source='strh'] - 'strh', 'brh', or 'all'
   * @param {string} [params.model='haiku'] - 'haiku' or 'sonnet'
   * @returns {Promise<AsyncIterable>} Server-sent events stream
   */
  async ask(params) {
    const payload = {
      question: params.question,
      expertise_level: params.expertise_level || 'beginner',
      search_source: params.search_source || 'strh',
      model: params.model || 'haiku'
    };

    return this._requestStream('/ask', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  /**
   * Get all available themes
   * @returns {Promise<Array>} List of themes
   */
  async getThemes() {
    const cacheKey = 'themes';
    const cached = this._getFromCache(cacheKey);
    if (cached) return cached;

    const result = await this._request('/themes', { method: 'GET' });
    this._setCache(cacheKey, result);
    return result;
  }

  /**
   * Get questions for a theme
   * @param {Object} params
   * @param {string} params.theme - Theme name
   * @returns {Promise<Object>} Theme questions
   */
  async getThemeQuestions(params) {
    const cacheKey = `theme_questions_${params.theme}`;
    const cached = this._getFromCache(cacheKey);
    if (cached) return cached;

    const result = await this._request('/theme-questions', {
      method: 'POST',
      body: JSON.stringify(params)
    });
    this._setCache(cacheKey, result);
    return result;
  }

  /**
   * Stream responses from /ask endpoint using EventSource
   * @private
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Fetch options
   * @returns {Promise<AsyncIterable>} Event stream
   */
  async _requestStream(endpoint, options) {
    const url = this._buildURL(endpoint);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: this._getHeaders(options.headers)
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // Return async iterable for streaming
      return this._streamResponse(response);
    } catch (error) {
      clearTimeout(timeoutId);
      this._handleError(error, endpoint, options);
      throw error;
    }
  }

  /**
   * Parse Server-Sent Events stream
   * @private
   * @param {Response} response - Fetch response
   * @returns {AsyncIterable} Event objects
   */
  async *_streamResponse(response) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop(); // Keep last incomplete line

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const event = JSON.parse(line.slice(6));
              yield event;
            } catch (e) {
              console.error('Failed to parse SSE event:', e, line);
            }
          }
        }
      }

      // Process any remaining buffer
      if (buffer.startsWith('data: ')) {
        try {
          const event = JSON.parse(buffer.slice(6));
          yield event;
        } catch (e) {
          console.error('Failed to parse final SSE event:', e, buffer);
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  /**
   * Generic request method with retry logic
   * @private
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Fetch options
   * @param {number} [attempt=0] - Current retry attempt
   * @returns {Promise<Object>} Response data
   */
  async _request(endpoint, options, attempt = 0) {
    const url = this._buildURL(endpoint);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: this._getHeaders(options.headers)
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (this.onSuccess) this.onSuccess(endpoint, data);
      return data;
    } catch (error) {
      clearTimeout(timeoutId);

      // Retry logic
      if (attempt < this.retryAttempts) {
        await this._delay(this.retryDelay * Math.pow(2, attempt));
        return this._request(endpoint, options, attempt + 1);
      }

      this._handleError(error, endpoint, options);
      throw error;
    }
  }

  /**
   * Build full URL from endpoint
   * @private
   */
  _buildURL(endpoint) {
    const baseURL = this.baseURL.endsWith('/')
      ? this.baseURL.slice(0, -1)
      : this.baseURL;
    return `${baseURL}${endpoint}`;
  }

  /**
   * Get headers for request
   * @private
   */
  _getHeaders(customHeaders = {}) {
    return {
      'Content-Type': 'application/json',
      ...customHeaders
    };
  }

  /**
   * Cache utilities
   * @private
   */
  _getFromCache(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  _setCache(key, data) {
    this.cache.set(key, {
      data,
      expiry: Date.now() + this.cacheExpiry
    });
  }

  clearCache() {
    this.cache.clear();
  }

  /**
   * Error handling
   * @private
   */
  _handleError(error, endpoint, options) {
    const errorInfo = {
      endpoint,
      message: error.message,
      timestamp: new Date().toISOString()
    };

    console.error('API Error:', errorInfo);

    if (this.onError) {
      this.onError(errorInfo);
    }
  }

  /**
   * Utility: delay for retry
   * @private
   */
  _delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ArtbackstageAPI;
}
