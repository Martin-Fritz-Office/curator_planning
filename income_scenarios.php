<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$configPath = __DIR__ . '/db_config.php';
if (!is_file($configPath)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Missing db_config.php']);
    exit;
}

$config = require $configPath;
if (!is_array($config)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Invalid db config']);
    exit;
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
            $name = 'Szenario #' . (string) ($row['id'] ?? '');
        }

        $totalIncome = (float) ($row['available_income'] ?? 0);
        $scenarios[] = [
            'id' => (int) ($row['id'] ?? 0),
            'name' => $name,
            'totalIncome' => $totalIncome,
            'totalIncomeFormatted' => number_format($totalIncome, 2, ',', '.') . ' €',
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
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Database error']);
}
