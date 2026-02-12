<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
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

$raw = file_get_contents('php://input');
$data = json_decode($raw ?: '', true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid JSON payload']);
    exit;
}

/**
 * @param array<string, mixed> $payload
 * @param string[] $keys
 * @return mixed
 */
function pickFirst(array $payload, array $keys)
{
    foreach ($keys as $key) {
        if (array_key_exists($key, $payload)) {
            return $payload[$key];
        }
    }

    return null;
}

/**
 * @param mixed $value
 * @return array<mixed>|null
 */
function normalizeJsonArray($value): ?array
{
    if (is_array($value)) {
        return $value;
    }

    if (is_string($value)) {
        $decoded = json_decode($value, true);
        if (is_array($decoded)) {
            return $decoded;
        }
    }

    return null;
}

$locale = isset($data['locale']) ? (string) $data['locale'] : 'de';
$answers = $data['answers'] ?? null;
$employmentNetIncome = (float) ($data['employmentNetIncome'] ?? 0);
$availableIncome = (float) ($data['availableIncome'] ?? 0);
$targetIncome = (float) ($data['targetIncome'] ?? 0);
$gap = (float) ($data['gap'] ?? 0);
$questionnaire = normalizeJsonArray(pickFirst($data, ['questionnaire', 'questionnaire_json', 'questionnaireJson'])) ?? [];
$computed = isset($data['computed']) && is_array($data['computed']) ? $data['computed'] : [];
$prognosisLines = normalizeJsonArray(
    pickFirst(
        $data,
        ['prognosisLines', 'prognosis_lines', 'prognosis', 'prognosis_json', 'prognosisJson']
    )
) ?? [];
$typologyLabel = '';
$typologyScore = null;

if (isset($data['typology']) && is_array($data['typology'])) {
    $typologyLabel = (string) ($data['typology']['label'] ?? '');
    if (isset($data['typology']['score']) && is_numeric($data['typology']['score'])) {
        $typologyScore = (float) $data['typology']['score'];
    }
}

if (!is_array($answers)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Missing answers object']);
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

    $stmt = $pdo->prepare(
        'INSERT INTO survey_submissions (
            locale,
            answers_json,
            employment_net_income,
            available_income,
            target_income,
            income_gap,
            typology_label,
            typology_score,
            questionnaire_json,
            computed_json,
            prognosis_lines_json
        ) VALUES (
            :locale,
            :answers_json,
            :employment_net_income,
            :available_income,
            :target_income,
            :income_gap,
            :typology_label,
            :typology_score,
            :questionnaire_json,
            :computed_json,
            :prognosis_lines_json
        )'
    );

    $stmt->execute([
        ':locale' => $locale,
        ':answers_json' => json_encode($answers, JSON_UNESCAPED_UNICODE),
        ':employment_net_income' => $employmentNetIncome,
        ':available_income' => $availableIncome,
        ':target_income' => $targetIncome,
        ':income_gap' => $gap,
        ':typology_label' => $typologyLabel,
        ':typology_score' => $typologyScore,
        ':questionnaire_json' => json_encode($questionnaire, JSON_UNESCAPED_UNICODE),
        ':computed_json' => json_encode($computed, JSON_UNESCAPED_UNICODE),
        ':prognosis_lines_json' => json_encode($prognosisLines, JSON_UNESCAPED_UNICODE),
    ]);

    echo json_encode([
        'ok' => true,
        'id' => (int) $pdo->lastInsertId(),
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Database error']);
}
