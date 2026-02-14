<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

$configPath = __DIR__ . '/db_config.php';
if (!file_exists($configPath)) {
    echo json_encode([
        'ok' => true,
        'count' => 0,
        'medianAvailableIncome' => null,
        'formattedMedianAvailableIncome' => null,
    ]);
    exit;
}

$config = require $configPath;
if (!is_array($config)) {
    echo json_encode([
        'ok' => true,
        'count' => 0,
        'medianAvailableIncome' => null,
        'formattedMedianAvailableIncome' => null,
    ]);
    exit;
}

foreach (['host', 'port', 'database', 'user', 'password'] as $requiredKey) {
    if (!array_key_exists($requiredKey, $config)) {
        echo json_encode([
            'ok' => true,
            'count' => 0,
            'medianAvailableIncome' => null,
            'formattedMedianAvailableIncome' => null,
        ]);
        exit;
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
            'formattedMedianAvailableIncome' => null,
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
        $offsetB = $count / 2;

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
        'formattedMedianAvailableIncome' => number_format($medianValue, 2, ',', '.') . ' €',
    ]);
} catch (Throwable $e) {
    echo json_encode([
        'ok' => true,
        'count' => 0,
        'medianAvailableIncome' => null,
        'formattedMedianAvailableIncome' => null,
    ]);
}
