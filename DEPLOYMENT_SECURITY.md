# Deployment & Security Guide

This guide covers security configurations required before deploying artbackstage to production.

## Pre-Deployment Checklist

### 1. Environment Variables ✓
- [ ] Copy `.env.example` to `.env` (this file is in `.gitignore`)
- [ ] Set all required API keys in `.env`:
  - `OPENAI_API_KEY`
  - `ANTHROPIC_API_KEY`
  - `SUPABASE_URL` and `SUPABASE_KEY`
- [ ] Set `FLASK_ENV=production`
- [ ] Configure `ALLOWED_ORIGINS` with your actual domain(s)
- [ ] **NEVER commit `.env` to version control**

### 2. Database Configuration ✓
- [ ] Copy `db_config.php.example` to `db_config.php`
- [ ] Use environment variables for all credentials:
  ```bash
  export DB_HOST="your-db-host"
  export DB_USER="curator_user"
  export DB_PASSWORD="strong-password-here"
  export DB_NAME="curator_planning"
  ```
- [ ] Generate secure admin password hash:
  ```bash
  php -r "echo password_hash('your-strong-password', PASSWORD_DEFAULT);"
  ```
- [ ] Store the hash in environment: `export DB_ADMIN_PASSWORD="<hash>"`
- [ ] **NEVER commit `db_config.php` to version control**

### 3. File Permissions ✓
```bash
# Restrict access to sensitive files
chmod 600 db_config.php              # Owner read/write only
chmod 600 .env                        # Owner read/write only
chmod 644 .htaccess                   # Owner read/write, others read

# Ensure PHP files are readable but not executable
chmod 644 *.php
chmod 644 *.js
chmod 644 *.css
```

### 4. Web Server Configuration ✓

#### Apache Requirements
- Ensure `mod_rewrite` is enabled:
  ```bash
  a2enmod rewrite
  ```
- Ensure `mod_headers` is enabled:
  ```bash
  a2enmod headers
  ```
- Enable HTTPS and redirect HTTP to HTTPS
- Set correct document root

#### Nginx Configuration
If using Nginx, configure security headers in the server block:
```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    # Security Headers
    add_header X-Content-Type-Options "nosniff";
    add_header X-Frame-Options "DENY";
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload";
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' https://8x8.vc https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.openai.com https://api.anthropic.com https://*.supabase.co; frame-src 'self' https://8x8.vc";
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()";

    # Disable dangerous PHP features
    php_admin_value[disable_functions] = exec,passthru,shell_exec,system,proc_open,popen,curl_exec,curl_multi_exec,parse_ini_file,show_source;
    php_admin_flag[display_errors] = off;

    # Prevent access to sensitive files
    location ~ /\.env {
        deny all;
    }
    location ~ /db_config\.php {
        deny all;
    }
    location ~ /\. {
        deny all;
    }
}
```

### 5. HTTPS/TLS Configuration ✓
- [ ] Install SSL certificate (use Let's Encrypt for free certificates)
- [ ] Enable HSTS preloading
- [ ] Test at https://www.ssllabs.com/ssltest/
- [ ] Redirect all HTTP traffic to HTTPS in web server config

### 6. Python Application (Flask) ✓
The following security measures are already configured:

**Enabled:**
- ✅ CORS restrictions (set via `ALLOWED_ORIGINS`)
- ✅ Security headers (X-Content-Type-Options, X-Frame-Options, HSTS, CSP)
- ✅ Rate limiting on `/ask` endpoint (10 requests per 60 seconds per IP)
- ✅ Request size limits (max 5000 chars for questions)
- ✅ Secure error handling (no stack traces in production)
- ✅ Production mode logging

**Running in production:**
```bash
FLASK_ENV=production python app.py
# OR use Gunicorn:
gunicorn -w 4 -b 0.0.0.0:5000 --timeout 120 app:app
```

### 7. PHP Application Security ✓
The following security measures are already configured:

**Enabled:**
- ✅ CSRF protection on all forms (`faq_admin.php`)
- ✅ Brute-force protection on admin login (5 attempts per 15 minutes)
- ✅ Prepared statements (prevent SQL injection)
- ✅ Input validation and length limits
- ✅ Proper password hashing (bcrypt via `password_hash()`)
- ✅ Security headers via `.htaccess`
- ✅ Disabled dangerous PHP functions
- ✅ No error display in browser (logged to file instead)

### 8. Database Security ✓
- [ ] Create dedicated read-only user for search operations (if possible):
  ```sql
  CREATE USER 'curator_search'@'localhost' IDENTIFIED BY 'strong-password';
  GRANT SELECT ON curator_planning.* TO 'curator_search'@'localhost';
  ```
- [ ] Restrict database user permissions:
  - Survey submission user: SELECT, INSERT on survey_submissions
  - FAQ admin user: SELECT, INSERT, UPDATE, DELETE on faq
- [ ] Enable database backups and test restore process
- [ ] Set strong passwords for all database accounts
- [ ] Disable remote access if not needed

### 9. Logging & Monitoring ✓
- [ ] Configure Python logging to file:
  ```bash
  mkdir -p /var/log/artbackstage
  chmod 750 /var/log/artbackstage
  export LOG_FILE="/var/log/artbackstage/app.log"
  ```
- [ ] Configure PHP error logging:
  ```php
  error_log=/var/log/php-errors.log
  ```
- [ ] Monitor logs for suspicious activity
- [ ] Set up log rotation to prevent disk space issues

### 10. API Key Security ✓
- [ ] Keep API keys in environment variables only
- [ ] Rotate API keys periodically
- [ ] Monitor API usage and set spending limits
- [ ] Use key restrictions if available:
  - OpenAI: Restrict to specific endpoints
  - Anthropic: Use least-privilege API keys
  - Supabase: Enable RLS (Row Level Security) on tables

### 11. Backup Strategy
- [ ] Set up automated daily backups of database
- [ ] Store backups in secure location (separate server)
- [ ] Test restore process monthly
- [ ] Backup and secure `.env` and `db_config.php` files

### 12. Monitoring & Alerts
- [ ] Set up 404/500 error monitoring
- [ ] Monitor rate limit hits
- [ ] Alert on multiple failed login attempts
- [ ] Monitor API quota usage
- [ ] Set up uptime monitoring

## Production Deployment Steps

### Step 1: Prepare Server
```bash
# Update system packages
apt-get update && apt-get upgrade -y

# Install dependencies
apt-get install -y apache2 php php-mysql python3 python3-pip
a2enmod rewrite headers ssl

# Create application user (non-root)
useradd -m -s /bin/bash artbackstage
```

### Step 2: Deploy Code
```bash
cd /var/www
git clone https://github.com/martin-fritz-office/artbackstage.git
cd artbackstage
git checkout main  # or your release branch

# Install Python dependencies
pip install -r requirements.txt
```

### Step 3: Configure Environment
```bash
# Set up .env file
cp .env.example .env
# Edit .env with your production values
nano .env

# Set up db_config.php
cp db_config.php.example db_config.php
# Edit db_config.php or set environment variables
nano db_config.php
```

### Step 4: Set Permissions
```bash
chown -R www-data:www-data /var/www/artbackstage
chmod 750 /var/www/artbackstage
chmod 600 /var/www/artbackstage/.env
chmod 600 /var/www/artbackstage/db_config.php
```

### Step 5: Start Services
```bash
# Start Flask app (use Gunicorn in production)
systemctl start artbackstage-flask

# Restart Apache
systemctl restart apache2
```

## Deployment Verification

After deployment, verify security:

1. **HTTPS/TLS:**
   ```bash
   curl -I https://yourdomain.com
   # Should show 301 redirect or 200 with security headers
   ```

2. **Security Headers:**
   ```bash
   curl -I https://yourdomain.com | grep -i "strict-transport-security\|x-content-type-options\|x-frame-options"
   ```

3. **Sensitive Files Blocked:**
   ```bash
   curl -I https://yourdomain.com/.env
   curl -I https://yourdomain.com/db_config.php
   curl -I https://yourdomain.com/check_hash.php
   # All should return 403/404
   ```

4. **Rate Limiting:**
   ```bash
   # Send 15 requests to /ask in 60 seconds
   # Last 5+ should return 429 (Too Many Requests)
   ```

5. **Error Handling:**
   ```bash
   curl -X POST https://yourdomain.com/ask -d '{invalid json}'
   # Should NOT expose file paths or stack traces
   ```

## Incident Response

If you suspect a security breach:

1. **Immediately rotate API keys**
   - Generate new OpenAI API key
   - Generate new Anthropic API key
   - Rotate Supabase service role key

2. **Review logs for suspicious activity**
   - Check Python error logs
   - Check PHP error logs
   - Check web server access logs

3. **Reset admin password**
   - Generate new password hash
   - Update `db_config.php` or env variable

4. **Check database for unauthorized changes**
   - Review FAQ entries (faq_admin.php audit)
   - Check survey submissions for anomalies

5. **Monitor for data exfiltration**
   - Review API usage logs
   - Check for unusual data queries

## Security Headers Reference

| Header | Purpose |
|--------|---------|
| `Strict-Transport-Security` | Force HTTPS |
| `X-Content-Type-Options` | Prevent MIME type sniffing |
| `X-Frame-Options` | Prevent clickjacking |
| `Content-Security-Policy` | Control resource loading |
| `Permissions-Policy` | Restrict browser features |
| `Referrer-Policy` | Control referrer information |

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Secure Coding Practices](https://cheatsheetseries.owasp.org/)
- [Let's Encrypt](https://letsencrypt.org/)
- [PHP Security Best Practices](https://www.php.net/manual/en/security.php)
- [Flask Security](https://flask.palletsprojects.com/en/security/)

## Support

For security issues, contact the development team immediately.
For other deployment questions, refer to the main README.md.
