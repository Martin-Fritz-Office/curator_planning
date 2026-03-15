<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store, max-age=0');
header('Referrer-Policy: no-referrer');

function fail(int $status, string $code, string $message): void
{
    http_response_code($status);
    echo json_encode(['ok' => false, 'code' => $code, 'error' => $message]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    fail(405, 'method_not_allowed', 'Method not allowed');
}

$configPath = __DIR__ . '/db_config.php';
if (!is_file($configPath)) {
    fail(500, 'missing_db_config', 'Missing db_config.php');
}

$config = require $configPath;
if (!is_array($config)) {
    fail(500, 'invalid_db_config', 'Invalid db config');
}

$raw = file_get_contents('php://input');
if ($raw === false || strlen($raw) > 512) {
    fail(400, 'invalid_payload', 'Invalid request body');
}

$data = json_decode($raw, true);
if (!is_array($data)) {
    fail(400, 'invalid_json', 'Invalid JSON payload');
}

$id   = isset($data['id'])   ? (int) $data['id']   : 0;
$vote = isset($data['vote']) ? (string) $data['vote'] : '';

if ($id <= 0) {
    fail(400, 'invalid_id', 'Invalid faq id');
}

if (!in_array($vote, ['positive', 'negative'], true)) {
    fail(400, 'invalid_vote', 'Vote must be "positive" or "negative"');
}

try {
    $dsn = sprintf(
        'mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4',
        $config['host'] ?? '127.0.0.1',
        (int) ($config['port'] ?? 3306),
        $config['database'] ?? ''
    );
    $pdo = new PDO($dsn, $config['user'] ?? '', $config['password'] ?? '', [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);
} catch (PDOException $e) {
    error_log('[faq_vote] DB connect: ' . $e->getMessage());
    fail(500, 'db_error', 'Database connection failed');
}

try {
    $col = $vote === 'positive' ? 'votes_positive' : 'votes_negative';
    // $col is safe: only 'votes_positive' or 'votes_negative'
    $stmt = $pdo->prepare("UPDATE faq SET {$col} = {$col} + 1 WHERE id = :id");
    $stmt->execute([':id' => $id]);

    if ($stmt->rowCount() === 0) {
        fail(404, 'not_found', 'FAQ entry not found');
    }

    $row = $pdo->prepare('SELECT votes_positive, votes_negative FROM faq WHERE id = :id');
    $row->execute([':id' => $id]);
    $result = $row->fetch();

    echo json_encode([
        'ok'             => true,
        'votes_positive' => (int) ($result['votes_positive'] ?? 0),
        'votes_negative' => (int) ($result['votes_negative'] ?? 0),
    ]);
} catch (PDOException $e) {
    error_log('[faq_vote] query: ' . $e->getMessage());
    fail(500, 'db_error', 'Database query failed');
}
