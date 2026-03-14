<?php
// TEMP DEBUG FILE — DELETE FROM SERVER AFTER USE

$config = require __DIR__ . '/db_config.php';
$hash   = trim((string) ($config['admin_password_hash'] ?? ''));
$pw     = $_GET['pw'] ?? '';

echo '<pre>';
echo 'Hash length  : ' . strlen($hash) . "\n";
echo 'Hash starts  : ' . substr($hash, 0, 7) . "\n";
echo 'Hash algo    : ' . (password_get_info($hash)['algoName'] ?? 'unknown') . "\n";
echo 'Hash valid   : ' . (password_get_info($hash)['algo'] ? 'YES' : 'NO') . "\n";

if ($pw !== '') {
    $match = password_verify($pw, $hash);
    echo 'pw_verify    : ' . ($match ? 'YES ✓' : 'NO ✗') . "\n";

    // Also test without trim — simulates OLD faq_admin.php
    $hashRaw = (string) ($config['admin_password_hash'] ?? '');
    echo 'pw_verify (no trim): ' . (password_verify($pw, $hashRaw) ? 'YES ✓' : 'NO ✗') . "\n";

    // Show hex of first/last 3 bytes of stored hash to detect hidden chars
    echo 'Hash hex prefix  : ' . bin2hex(substr($hashRaw, 0, 3)) . "\n";
    echo 'Hash hex suffix  : ' . bin2hex(substr($hashRaw, -3)) . "\n";
} else {
    echo "\nAdd ?pw=yourpassword to the URL to test.\n";
}
echo '</pre>';
