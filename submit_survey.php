<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store, max-age=0');
header('Referrer-Policy: no-referrer');

const MAX_PAYLOAD_BYTES = 200000;
const MAX_SCENARIO_NAME_LENGTH = 120;
const MAX_COMPUTED_KEYS = 50;
const MAX_PROGNOSIS_LINES = 60;
const MAX_QUESTIONNAIRE_QUESTIONS = 30;

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

/**
 * @return array<string, bool>
 */
function getExistingColumns(PDO $pdo, string $tableName): array
{
    $stmt = $pdo->prepare(
        'SELECT COLUMN_NAME
         FROM information_schema.COLUMNS
         WHERE TABLE_SCHEMA = DATABASE()
           AND TABLE_NAME = :table_name'
    );
    $stmt->execute([':table_name' => $tableName]);

    $columns = [];
    foreach ($stmt->fetchAll(PDO::FETCH_COLUMN) as $columnName) {
        if (is_string($columnName) && $columnName !== '') {
            $columns[$columnName] = true;
        }
    }

    return $columns;
}

function logApiError(string $code, Throwable $e): void
{
    error_log(sprintf('[submit_survey] code=%s message=%s', $code, $e->getMessage()));
}

function parseNumericField(array $data, string $key, bool $allowNegative = false): float
{
    if (!array_key_exists($key, $data) || !is_numeric($data[$key])) {
        fail(400, 'invalid_numeric_field', sprintf('Field %s must be numeric', $key));
    }

    $value = (float) $data[$key];
    if (!is_finite($value)) {
        fail(400, 'invalid_numeric_field', sprintf('Field %s must be finite', $key));
    }

    if (!$allowNegative && $value < 0) {
        fail(400, 'invalid_numeric_field', sprintf('Field %s must be >= 0', $key));
    }

    return $value;
}

/**
 * @param array<string, mixed> $extra
 */
function fail(int $statusCode, string $code, string $message, array $extra = []): void
{
    http_response_code($statusCode);
    echo json_encode(array_merge([
        'ok' => false,
        'error' => $message,
        'code' => $code,
    ], $extra));
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
if ($raw === false) {
    fail(400, 'invalid_payload', 'Invalid request body');
}

if (strlen($raw) > MAX_PAYLOAD_BYTES) {
    fail(413, 'payload_too_large', 'Payload exceeds maximum size', ['maxBytes' => MAX_PAYLOAD_BYTES]);
}

$data = json_decode($raw, true);
if (!is_array($data)) {
    fail(400, 'invalid_json', 'Invalid JSON payload');
}

$locale = isset($data['locale']) ? strtolower(trim((string) $data['locale'])) : 'de';
if (!in_array($locale, ['de', 'en'], true)) {
    fail(400, 'invalid_locale', 'Locale must be one of: de, en');
}

$scenarioName = trim((string) ($data['scenarioName'] ?? $data['scenario_name'] ?? ''));
if (mb_strlen($scenarioName) > MAX_SCENARIO_NAME_LENGTH) {
    fail(400, 'scenario_name_too_long', 'Scenario name exceeds maximum length');
}

$answers = $data['answers'] ?? null;
if (!is_array($answers)) {
    fail(400, 'missing_answers', 'Missing answers object');
}

$allowedAnswerKeys = [];
for ($i = 1; $i <= 21; $i++) {
    $allowedAnswerKeys['q' . $i] = true;
}

foreach ($answers as $key => $value) {
    if (!is_string($key) || !isset($allowedAnswerKeys[$key])) {
        fail(400, 'invalid_answers_shape', 'Answers contain unsupported question keys');
    }

    if (!is_string($value) || !in_array($value, ['A', 'B', 'C', 'D'], true)) {
        fail(400, 'invalid_answer_value', 'Answers must use A/B/C/D values');
    }
}

$requiredAnswerCount = count($allowedAnswerKeys);
if (count($answers) !== $requiredAnswerCount) {
    fail(400, 'invalid_answers_count', 'Answers must contain all questionnaire keys');
}

$employmentNetIncome = parseNumericField($data, 'employmentNetIncome');
$availableIncome = parseNumericField($data, 'availableIncome');
$targetIncome = parseNumericField($data, 'targetIncome');
$gap = parseNumericField($data, 'gap', true);

$questionnaire = normalizeJsonArray(pickFirst($data, ['questionnaire', 'questionnaire_json', 'questionnaireJson'])) ?? [];
if (count($questionnaire) > MAX_QUESTIONNAIRE_QUESTIONS) {
    fail(400, 'questionnaire_too_large', 'Questionnaire payload too large');
}

$computed = isset($data['computed']) && is_array($data['computed']) ? $data['computed'] : [];
if (count($computed) > MAX_COMPUTED_KEYS) {
    fail(400, 'computed_too_large', 'Computed payload too large');
}

$prognosisLines = normalizeJsonArray(
    pickFirst(
        $data,
        ['prognosisLines', 'prognosis_lines', 'prognosis', 'prognosis_json', 'prognosisJson']
    )
) ?? [];
if (count($prognosisLines) > MAX_PROGNOSIS_LINES) {
    fail(400, 'prognosis_too_large', 'Prognosis payload too large');
}

$typologyLabel = '';
$typologyScore = null;
if (isset($data['typology']) && is_array($data['typology'])) {
    $typologyLabel = trim((string) ($data['typology']['label'] ?? ''));
    if (mb_strlen($typologyLabel) > 64) {
        fail(400, 'typology_label_too_long', 'Typology label exceeds maximum length');
    }

    if (isset($data['typology']['score'])) {
        if (!is_numeric($data['typology']['score'])) {
            fail(400, 'invalid_typology_score', 'Typology score must be numeric');
        }

        $typologyScore = (float) $data['typology']['score'];
        if ($typologyScore < 0 || $typologyScore > 1) {
            fail(400, 'invalid_typology_score', 'Typology score must be between 0 and 1');
        }
    }
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
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    $columnValues = [
        ':locale' => $locale,
        ':scenario_name' => $scenarioName,
        ':answers_json' => json_encode($answers, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR),
        ':employment_net_income' => $employmentNetIncome,
        ':available_income' => $availableIncome,
        ':target_income' => $targetIncome,
        ':income_gap' => $gap,
        ':typology_label' => $typologyLabel,
        ':typology_score' => $typologyScore,
        ':questionnaire_json' => json_encode($questionnaire, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR),
        ':computed_json' => json_encode($computed, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR),
        ':prognosis_lines_json' => json_encode($prognosisLines, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR),
    ];

    $existingColumns = getExistingColumns($pdo, 'survey_submissions');
    $insertColumns = [];
    $insertPlaceholders = [];
    $insertValues = [];

    foreach ($columnValues as $placeholder => $value) {
        $columnName = substr($placeholder, 1);
        if (!isset($existingColumns[$columnName])) {
            continue;
        }

        $insertColumns[] = $columnName;
        $insertPlaceholders[] = $placeholder;
        $insertValues[$placeholder] = $value;
    }

    if ($insertColumns === []) {
        throw new RuntimeException('No matching columns available for insert');
    }

    $stmt = $pdo->prepare(
        sprintf(
            'INSERT INTO survey_submissions (%s) VALUES (%s)',
            implode(', ', $insertColumns),
            implode(', ', $insertPlaceholders)
        )
    );

    $stmt->execute($insertValues);

    echo json_encode([
        'ok' => true,
        'id' => (int) $pdo->lastInsertId(),
    ]);
} catch (Throwable $e) {
    logApiError('database_error', $e);
    fail(500, 'database_error', 'Database error');
}
