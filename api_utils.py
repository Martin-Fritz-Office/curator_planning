"""
Utility functions for artbackstage API
Provides standardized response formats, request tracking, and error handling
"""

import uuid
from datetime import datetime
from flask import jsonify
import logging

logger = logging.getLogger(__name__)

# API Version
API_VERSION = "1.0.0"


def generate_request_id():
    """Generate unique request ID for tracking"""
    return str(uuid.uuid4())


def error_response(message, status_code=400, request_id=None, details=None):
    """
    Create standardized error response

    Args:
        message: Error message
        status_code: HTTP status code
        request_id: Optional request ID for tracking
        details: Optional additional error details
    """
    response = {
        "error": {
            "message": message,
            "code": status_code,
            "timestamp": datetime.utcnow().isoformat() + "Z"
        }
    }

    if request_id:
        response["error"]["request_id"] = request_id

    if details:
        response["error"]["details"] = details

    return jsonify(response), status_code


def success_response(data, status_code=200, request_id=None, metadata=None):
    """
    Create standardized success response

    Args:
        data: Response data
        status_code: HTTP status code
        request_id: Optional request ID for tracking
        metadata: Optional metadata about the response
    """
    response = {
        "data": data,
        "success": True,
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }

    if request_id:
        response["request_id"] = request_id

    if metadata:
        response["metadata"] = metadata

    return jsonify(response), status_code


def stream_event(event_type, content, request_id=None):
    """
    Create Server-Sent Event JSON object

    Args:
        event_type: Type of event (e.g., 'sources', 'text', 'error')
        content: Event content
        request_id: Optional request ID

    Returns:
        JSON string for SSE
    """
    import json

    event = {
        "type": event_type,
        "timestamp": datetime.utcnow().isoformat() + "Z",
        **content
    }

    if request_id:
        event["request_id"] = request_id

    return json.dumps(event)


class APILogger:
    """Structured logging for API requests"""

    @staticmethod
    def log_request(endpoint, method, params=None, request_id=None):
        """Log incoming request"""
        logger.info(
            f"API Request",
            extra={
                "endpoint": endpoint,
                "method": method,
                "request_id": request_id,
                "params": params
            }
        )

    @staticmethod
    def log_response(endpoint, status_code, duration_ms=None, request_id=None):
        """Log response"""
        logger.info(
            f"API Response",
            extra={
                "endpoint": endpoint,
                "status": status_code,
                "duration_ms": duration_ms,
                "request_id": request_id
            }
        )

    @staticmethod
    def log_error(endpoint, error_msg, status_code=500, request_id=None, exc_info=False):
        """Log error"""
        logger.error(
            f"API Error: {error_msg}",
            extra={
                "endpoint": endpoint,
                "status": status_code,
                "request_id": request_id
            },
            exc_info=exc_info
        )


# HTTP Status Code Constants
STATUS_OK = 200
STATUS_CREATED = 201
STATUS_BAD_REQUEST = 400
STATUS_UNAUTHORIZED = 401
STATUS_FORBIDDEN = 403
STATUS_NOT_FOUND = 404
STATUS_RATE_LIMITED = 429
STATUS_SERVER_ERROR = 500
STATUS_SERVICE_UNAVAILABLE = 503
STATUS_GATEWAY_TIMEOUT = 504


# Error Message Templates
ERROR_MESSAGES = {
    "invalid_request": "Invalid request parameters",
    "missing_field": "Missing required field: {field}",
    "invalid_field": "Invalid value for field: {field}",
    "rate_limited": "Too many requests. Please try again later.",
    "service_unavailable": "Service temporarily unavailable. Please try again later.",
    "timeout": "Request timed out. Please try again.",
    "internal_error": "An unexpected error occurred. Please try again later.",
    "api_client_error": "API client not initialized: {client}",
    "database_error": "Database connection error",
    "search_error": "Search operation failed",
    "generation_error": "Content generation failed"
}


def get_error_message(key, **kwargs):
    """Get error message template and format with kwargs"""
    template = ERROR_MESSAGES.get(key, "An error occurred")
    return template.format(**kwargs) if kwargs else template
