<?php
// TEMP DEBUG & RESET FILE — DELETE FROM SERVER AFTER USE
declare(strict_types=1);

$config     = require __DIR__ . '/db_config.php';
$configPath = __DIR__ . '/db_config.php';
$hash       = trim((string) ($config['admin_password_hash'] ?? ''));
$msg        = '';
$msgType    = '';

// ── Action: verify password ───────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {

    if ($_POST['action'] === 'verify') {
        $pw = (string) ($_POST['pw'] ?? '');
        if ($pw === '') {
            $msg = 'Please enter a password.';
            $msgType = 'warn';
        } elseif (password_verify($pw, $hash)) {
            $msg = '✓ Password matches! The login will work.';
            $msgType = 'ok';
        } else {
            $msg = '✗ Password does NOT match the stored hash.';
            $msgType = 'err';
        }
    }

    // ── Action: set new password ──────────────────────────────────────────────
    if ($_POST['action'] === 'reset') {
        $pw1 = (string) ($_POST['pw1'] ?? '');
        $pw2 = (string) ($_POST['pw2'] ?? '');
        if ($pw1 === '') {
            $msg = 'Please enter a new password.';
            $msgType = 'warn';
        } elseif ($pw1 !== $pw2) {
            $msg = 'Passwords do not match.';
            $msgType = 'warn';
        } elseif (strlen($pw1) < 8) {
            $msg = 'Password must be at least 8 characters.';
            $msgType = 'warn';
        } else {
            $newHash    = password_hash($pw1, PASSWORD_DEFAULT);
            $raw        = file_get_contents($configPath);
            $updated    = preg_replace(
                "/'admin_password_hash'\s*=>\s*'[^']*'/",
                "'admin_password_hash' => '" . addslashes($newHash) . "'",
                (string) $raw
            );
            if ($updated !== null && $updated !== $raw) {
                file_put_contents($configPath, $updated);
                $hash    = $newHash;
                $msg     = '✓ New password saved to db_config.php. You can now log in.';
                $msgType = 'ok';
            } else {
                $msg     = 'Could not update db_config.php automatically. Hash: ' . htmlspecialchars($newHash, ENT_QUOTES, 'UTF-8');
                $msgType = 'warn';
            }
        }
    }
}
?><!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>FAQ Admin – Password Tool</title>
  <style>
    body { font-family: sans-serif; max-width: 480px; margin: 40px auto; padding: 0 16px; }
    h2   { margin-top: 32px; }
    input[type=password] { width: 100%; box-sizing: border-box; padding: 8px; font-size: 15px; margin: 6px 0 12px; }
    button { padding: 9px 20px; font-size: 14px; cursor: pointer; }
    .ok   { background: #d1fae5; border: 1px solid #059669; color: #065f46; padding: 10px; border-radius: 6px; }
    .err  { background: #fee2e2; border: 1px solid #dc2626; color: #991b1b; padding: 10px; border-radius: 6px; }
    .warn { background: #fef3c7; border: 1px solid #d97706; color: #92400e; padding: 10px; border-radius: 6px; }
    pre   { background: #f3f4f6; padding: 10px; font-size: 13px; overflow-x: auto; }
    hr    { margin: 32px 0; }
  </style>
</head>
<body>

<h1>Password Debug &amp; Reset</h1>
<p><strong>Remember: delete this file from the server when you are done.</strong></p>

<pre>Hash length : <?= strlen($hash) ?>
Hash starts : <?= htmlspecialchars(substr($hash, 0, 7), ENT_QUOTES, 'UTF-8') ?>
Hash algo   : <?= htmlspecialchars(password_get_info($hash)['algoName'] ?? 'unknown', ENT_QUOTES, 'UTF-8') ?>
Hash valid  : <?= password_get_info($hash)['algo'] ? 'YES' : 'NO' ?></pre>

<?php if ($msg !== ''): ?>
<p class="<?= $msgType ?>"><?= htmlspecialchars($msg, ENT_QUOTES, 'UTF-8') ?></p>
<?php endif; ?>

<hr>
<h2>1 · Test your password</h2>
<p>Type your password below and submit — uses POST, so all special characters are safe.</p>
<form method="post">
  <input type="hidden" name="action" value="verify">
  <label>Password<br>
    <input type="password" name="pw" autocomplete="off" autofocus>
  </label>
  <button type="submit">Test password</button>
</form>

<hr>
<h2>2 · Set a new password</h2>
<p>If the test above fails, set a fresh password here. It will be saved directly into <code>db_config.php</code>.</p>
<form method="post">
  <input type="hidden" name="action" value="reset">
  <label>New password<br>
    <input type="password" name="pw1" autocomplete="new-password">
  </label>
  <label>Repeat new password<br>
    <input type="password" name="pw2" autocomplete="new-password">
  </label>
  <button type="submit">Save new password</button>
</form>

</body>
</html>
