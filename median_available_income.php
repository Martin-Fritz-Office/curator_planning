<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

function logApiError(string $code, Throwable $e): void
{
    error_log(sprintf('[median_available_income] code=%s message=%s', $code, $e->getMessage()));
}

function fail(int $statusCode, string $code, string $message): void
{
    http_response_code($statusCode);
    echo json_encode([
        'ok' => false,
        'error' => $message,
        'code' => $code,
    ]);
    exit;
}

$configPath = __DIR__ . '/db_config.php';
if (!file_exists($configPath)) {
    fail(500, 'missing_db_config', 'Missing db_config.php');
}

$config = require $configPath;
if (!is_array($config)) {
    fail(500, 'invalid_db_config', 'Invalid db config');
}

foreach (['host', 'port', 'database', 'user', 'password'] as $requiredKey) {
    if (!array_key_exists($requiredKey, $config)) {
        fail(500, 'invalid_db_config', 'Invalid db config');
    }
}

$dsn = sprintf(
    'mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4',
    $config['host'],
    (int) $config['port'],
    $config['database']
);

try {
    $pdo = new PDO(
        $dsn,
        (string) $config['user'],
        (string) $config['password'],
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );

    $countStmt = $pdo->query('SELECT COUNT(*) AS value_count FROM survey_submissions WHERE available_income IS NOT NULL');
    $count = (int) ($countStmt->fetch()['value_count'] ?? 0);

    if ($count === 0) {
        echo json_encode([
            'ok' => true,
            'count' => 0,
            'medianAvailableIncome' => null,
        ]);
        exit;
    }

    if ($count % 2 === 1) {
        $offset = intdiv($count, 2);
        $medianStmt = $pdo->prepare(
            'SELECT available_income FROM survey_submissions WHERE available_income IS NOT NULL ORDER BY available_income LIMIT 1 OFFSET :offset'
        );
        $medianStmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $medianStmt->execute();
        $medianValue = (float) ($medianStmt->fetch()['available_income'] ?? 0);
    } else {
        $offsetA = ($count / 2) - 1;

        $evenStmt = $pdo->prepare(
            'SELECT available_income FROM survey_submissions WHERE available_income IS NOT NULL ORDER BY available_income LIMIT 2 OFFSET :offset'
        );
        $evenStmt->bindValue(':offset', (int) $offsetA, PDO::PARAM_INT);
        $evenStmt->execute();
        $rows = $evenStmt->fetchAll();

        if (count($rows) < 2) {
            throw new RuntimeException('Could not determine even median rows.');
        }

        $medianValue = (((float) $rows[0]['available_income']) + ((float) $rows[1]['available_income'])) / 2;
    }

    echo json_encode([
        'ok' => true,
        'count' => $count,
        'medianAvailableIncome' => $medianValue,
    ]);
} catch (Throwable $e) {
    logApiError('database_error', $e);
    fail(500, 'database_error', 'Could not load median available income');
}
