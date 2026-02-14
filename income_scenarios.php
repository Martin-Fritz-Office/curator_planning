<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

function logApiError(string $code, Throwable $e): void
{
    error_log(sprintf('[income_scenarios] code=%s message=%s', $code, $e->getMessage()));
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

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
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

$dsn = sprintf(
    'mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4',
    $config['host'] ?? '127.0.0.1',
    (int) ($config['port'] ?? 3306),
    $config['database'] ?? ''
);

try {
    $pdo = new PDO($dsn, (string) ($config['user'] ?? ''), (string) ($config['password'] ?? ''), [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    $stmt = $pdo->query(
        'SELECT id, scenario_name, available_income, employment_net_income, answers_json, created_at
         FROM survey_submissions
         ORDER BY created_at DESC
         LIMIT 100'
    );

    $rows = $stmt->fetchAll();
    $scenarios = [];
    foreach ($rows as $row) {
        $answers = json_decode((string) ($row['answers_json'] ?? '{}'), true);
        if (!is_array($answers)) {
            $answers = [];
        }

        $name = trim((string) ($row['scenario_name'] ?? ''));
        if ($name === '') {
            $name = 'Scenario #' . (string) ($row['id'] ?? '');
        }

        $totalIncome = (float) ($row['available_income'] ?? 0);
        $scenarios[] = [
            'id' => (int) ($row['id'] ?? 0),
            'name' => $name,
            'totalIncome' => $totalIncome,
            'employmentNetIncome' => (float) ($row['employment_net_income'] ?? 0),
            'answers' => $answers,
            'createdAt' => (string) ($row['created_at'] ?? ''),
        ];
    }

    echo json_encode([
        'ok' => true,
        'count' => count($scenarios),
        'scenarios' => $scenarios,
    ]);
} catch (Throwable $e) {
    logApiError('database_error', $e);
    fail(500, 'database_error', 'Could not load scenarios');
}
