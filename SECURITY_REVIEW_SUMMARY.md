# Security Review & Hardening Summary

**Status:** ✅ All security fixes implemented and committed
**Branch:** `claude/security-review-pre-launch-VcJIx`
**Date:** 2026-03-27

## What Was Fixed

### 1. ✅ Deleted Debug File
**File:** `check_hash.php`
**Risk:** CRITICAL - Exposed admin password reset functionality to anyone
**Fix:** File completely removed from repository

---

### 2. ✅ CORS Hardening
**File:** `app.py`
**Before:** Allowed all origins (unsafe)
```python
CORS(app)  # Allows ANY website to call your API
```

**After:** Restricted to specific domains
```python
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
CORS(app, resources={
    r"/ask": {"origins": allowed_origins},
    r"/themes": {"origins": allowed_origins},
    # ... other endpoints
})
```

**Action Required:** Set `ALLOWED_ORIGINS=https://yourdomain.com` in your `.env`

---

### 3. ✅ Rate Limiting on /ask Endpoint
**File:** `app.py`
**Risk:** DoS attacks, API abuse
**Fix:** Rate limiter that tracks requests per IP
- **Limit:** 10 requests per 60 seconds per IP
- **Response:** Returns 429 (Too Many Requests) when exceeded

```python
# Rate limiting in action
if not ask_limiter.is_allowed(client_ip):
    return jsonify({"error": "Too many requests. Please try again later."}), 429
```

---

### 4. ✅ Brute-Force Protection on Admin Login
**File:** `faq_admin.php`
**Risk:** Password guessing attacks
**Fix:** Rate limiting on failed login attempts
- **Limit:** 5 failed attempts per 15 minutes
- **Response:** Locks out user temporarily after exceeding limit
- **Reset:** Clears on successful login

```php
function check_login_rate_limit(): bool
{
    $max_attempts = 5;
    $lockout_minutes = 15;
    // ... tracks attempts per session
}
```

---

### 5. ✅ Security Headers
**File:** `.htaccess` (Apache) and `app.py` (Python)
**Headers Added:**

| Header | Purpose |
|--------|---------|
| `Strict-Transport-Security` | Force HTTPS for 1 year |
| `X-Content-Type-Options: nosniff` | Prevent MIME sniffing |
| `X-Frame-Options: DENY` | Prevent clickjacking |
| `Content-Security-Policy` | Restrict resource loading |
| `Permissions-Policy` | Disable camera, microphone, geolocation |
| `Referrer-Policy` | Strict referrer control |

---

### 6. ✅ Error Handling (No Stack Traces)
**File:** `app.py`
**Before:** Exposed implementation details
```python
except Exception as e:
    yield f"data: {json.dumps({'type': 'error', 'error': str(e)})}\n\n"
    # Shows actual error: "KeyError: 'embedding_response'"
```

**After:** Generic error messages + logging
```python
except Exception as e:
    logger.error(f"Error in ask endpoint: {str(e)}", exc_info=True)
    yield f"data: {json.dumps({'type': 'error', 'error': 'An error occurred'})}\n\n"
    # Shows only: "An error occurred"
    # Full details logged server-side
```

---

### 7. ✅ Environment Variables for Secrets
**Files:** `.env.example`, `db_config.php.example`, `app.py`
**Before:** Secrets in config files
**After:** All secrets loaded from environment

```bash
# In .env (never committed)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
SUPABASE_KEY=...
DB_PASSWORD=...
DB_ADMIN_PASSWORD=...
```

```php
// In db_config.php
'password' => getenv('DB_PASSWORD') ?: ''
'admin_password_hash' => getenv('DB_ADMIN_PASSWORD') ?: ''
```

---

### 8. ✅ File Access Controls
**File:** `.htaccess`
**Added Rules:**
```apache
# Deny access to these dangerous files
<Files "check_hash.php">
    Deny from all
</Files>

<Files "db_config.php">
    Deny from all
</Files>

<FilesMatch "\.(env|example)$">
    Deny from all
</FilesMatch>

# Disable directory listing
Options -Indexes
```

---

### 9. ✅ Disabled Dangerous PHP Functions
**File:** `.htaccess`
**Disabled Functions:** exec, passthru, shell_exec, system, proc_open, popen, curl_exec, curl_multi_exec, parse_ini_file, show_source

```apache
php_value disable_functions "exec,passthru,shell_exec,system,proc_open,popen,curl_exec,curl_multi_exec,parse_ini_file,show_source"
```

---

### 10. ✅ Production Logging Configuration
**File:** `app.py`
**Added:**
- Structured logging with timestamps
- Sensitive error details logged server-side only
- Info-level logging suitable for production
- No debug output in responses

---

### 11. ✅ Request Validation
**File:** `app.py`
**Added Limits:**
- Max question length: 5000 characters
- Max payload size already enforced in `submit_survey.php`
- Input type validation on all endpoints

---

## Files Created

### 1. `.env.example`
Complete documentation of all environment variables needed:
- API keys (OpenAI, Anthropic, Supabase)
- Database configuration
- CORS settings
- Rate limiting
- Logging configuration

### 2. `DEPLOYMENT_SECURITY.md`
Comprehensive deployment guide including:
- Pre-deployment checklist
- Step-by-step deployment instructions
- Web server configuration (Apache & Nginx)
- Database security setup
- Backup strategy
- Incident response procedures
- Deployment verification steps

### 3. `SECURITY_REVIEW_SUMMARY.md` (this file)
Overview of all security improvements

---

## What's Already Good ✅

The codebase already had these security practices:
- ✅ CSRF tokens in forms (`faq_admin.php`)
- ✅ Prepared statements (no SQL injection)
- ✅ Password hashing with bcrypt (`password_hash()`)
- ✅ Input validation and length limits
- ✅ `.env` in `.gitignore`
- ✅ Type declarations (`declare(strict_types=1)`)
- ✅ Safe output escaping (`htmlspecialchars()`)

---

## Pre-Launch Checklist

Before going live:

- [ ] Set up `.env` file (copy from `.env.example`)
- [ ] Set up `db_config.php` (copy from `db_config.php.example`)
- [ ] Generate admin password hash:
  ```bash
  php -r "echo password_hash('your-strong-password', PASSWORD_DEFAULT);"
  ```
- [ ] Configure CORS:
  ```bash
  ALLOWED_ORIGINS="https://yourdomain.com"
  ```
- [ ] Enable HTTPS/SSL certificate
- [ ] Set `FLASK_ENV=production`
- [ ] Verify `.env` and `db_config.php` are in `.gitignore`
- [ ] Test rate limiting (send 15 rapid requests to `/ask`)
- [ ] Test error handling (verify no stack traces in response)
- [ ] Verify security headers with `curl -I https://yourdomain.com`
- [ ] Test admin login brute-force protection
- [ ] Check that sensitive files return 403:
  - `/.env` → 403
  - `/db_config.php` → 403
  - `/check_hash.php` → 404 (file deleted)

---

## API Endpoints Summary

### Python (Flask)
| Endpoint | Method | Rate Limit | Security |
|----------|--------|-----------|----------|
| `/ask` | POST | 10/60s | Rate limited, input validated |
| `/themes` | GET | N/A | CORS restricted |
| `/theme-questions` | POST | N/A | CORS restricted |
| `/health` | GET | N/A | CORS restricted |

### PHP
| Endpoint | Security |
|----------|----------|
| `faq_admin.php` | CSRF, brute-force protection |
| `submit_survey.php` | Prepared statements, input validation |
| `faq.php` | Read-only, no input |
| Other pages | Readonly FAQ/info pages |

---

## Environment Variables Reference

**Required for Production:**
```bash
FLASK_ENV=production
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
SUPABASE_URL=https://...supabase.co
SUPABASE_KEY=...
ALLOWED_ORIGINS=https://yourdomain.com
DB_HOST=your-db-host
DB_USER=curator_user
DB_PASSWORD=strong-password
DB_ADMIN_PASSWORD=$2y$10$hash...
```

---

## Questions?

Refer to:
- **Deployment guide:** `DEPLOYMENT_SECURITY.md`
- **Environment setup:** `.env.example`
- **Database setup:** `db_config.php.example`

All security changes are documented in the code with comments.

---

## Commit Info

**Branch:** `claude/security-review-pre-launch-VcJIx`
**Commit:** All security improvements consolidated
**Files Changed:** 7 files modified/created, 1 file deleted

Ready for production deployment! 🚀
