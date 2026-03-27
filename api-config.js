/**
 * API Configuration for artbackstage
 *
 * Manages API endpoints for different environments.
 * Automatically detects environment and uses appropriate endpoints.
 */

const API_CONFIG = {
  // Development environment (local testing)
  development: {
    api_url: 'http://localhost:5000',
    api_timeout: 30000,
    debug: true,
    enable_cache: true
  },

  // Staging environment
  staging: {
    api_url: 'https://artbackstage-staging.onrender.com',
    api_timeout: 30000,
    debug: false,
    enable_cache: true
  },

  // Production environment
  production: {
    api_url: 'https://artbackstage.onrender.com',
    api_timeout: 30000,
    debug: false,
    enable_cache: true
  }
};

/**
 * Detect current environment
 * @returns {string} environment name
 */
function detectEnvironment() {
  // Check if running in Node.js
  if (typeof process !== 'undefined' && process.env.NODE_ENV) {
    return process.env.NODE_ENV;
  }

  // Check if running in browser
  if (typeof window !== 'undefined') {
    // Check for custom environment variable in window
    if (window.ARTBACKSTAGE_ENV) {
      return window.ARTBACKSTAGE_ENV;
    }

    // Detect from hostname
    const hostname = window.location.hostname;

    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'development';
    }

    if (hostname.includes('staging')) {
      return 'staging';
    }

    // Default to production for unknown hosts
    return 'production';
  }

  // Default fallback
  return 'production';
}

/**
 * Get configuration for current environment
 * @param {string} [env] - Optional environment override
 * @returns {Object} Configuration object
 */
function getConfig(env = null) {
  const environment = env || detectEnvironment();
  const config = API_CONFIG[environment] || API_CONFIG.production;

  // Allow environment variables to override config
  if (typeof process !== 'undefined') {
    return {
      ...config,
      api_url: process.env.REACT_APP_API_URL || process.env.VUE_APP_API_URL || config.api_url,
      api_timeout: parseInt(process.env.API_TIMEOUT || config.api_timeout, 10)
    };
  }

  if (typeof window !== 'undefined') {
    return {
      ...config,
      api_url: window.ARTBACKSTAGE_API_URL || config.api_url,
      api_timeout: window.ARTBACKSTAGE_API_TIMEOUT || config.api_timeout
    };
  }

  return config;
}

/**
 * Initialize API client with config
 * @param {Function} APIClientClass - The API client class (ArtbackstageAPI)
 * @returns {Object} Initialized API client
 */
function initializeAPI(APIClientClass) {
  const config = getConfig();

  return new APIClientClass(config.api_url, {
    timeout: config.api_timeout,
    retryAttempts: config.debug ? 1 : 3,
    retryDelay: 1000,
    onError: (error) => {
      if (config.debug) {
        console.error('[API Error]', error);
      }
    },
    onSuccess: (endpoint, data) => {
      if (config.debug) {
        console.log('[API Success]', endpoint, data);
      }
    }
  });
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    API_CONFIG,
    detectEnvironment,
    getConfig,
    initializeAPI
  };
}
