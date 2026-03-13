<?php

declare(strict_types=1);

/**
 * FAQ CSV Import Script
 *
 * Usage: php import_faq.php path/to/faq.csv
 *
 * Expected CSV format (with header row):
 *   category,question,answer
 *
 * The delimiter is auto-detected (comma or semicolon).
 */

if (PHP_SAPI !== 'cli') {
    echo "This script must be run from the command line.\n";
    exit(1);
}

if ($argc < 2) {
    echo "Usage: php import_faq.php <path-to-csv>\n";
    exit(1);
}

$csvPath = $argv[1];

if (!is_file($csvPath)) {
    echo "Error: File not found: $csvPath\n";
    exit(1);
}

// --- DB connection -----------------------------------------------------------

$configPath = __DIR__ . '/db_config.php';
if (!is_file($configPath)) {
    echo "Error: Missing db_config.php\n";
    exit(1);
}

$config = require $configPath;
if (!is_array($config)) {
    echo "Error: Invalid db_config.php\n";
    exit(1);
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
} catch (PDOException $e) {
    echo "DB connection failed: " . $e->getMessage() . "\n";
    exit(1);
}

// --- Read CSV ----------------------------------------------------------------

$handle = fopen($csvPath, 'r');
if ($handle === false) {
    echo "Error: Cannot open file: $csvPath\n";
    exit(1);
}

// Detect delimiter from first line
$firstLine = fgets($handle);
if ($firstLine === false) {
    echo "Error: CSV file is empty.\n";
    fclose($handle);
    exit(1);
}
$delimiter = substr_count($firstLine, ';') >= substr_count($firstLine, ',') ? ';' : ',';
rewind($handle);

// Read header row
$header = fgetcsv($handle, 0, $delimiter);
if ($header === false || $header === null) {
    echo "Error: Could not read CSV header.\n";
    fclose($handle);
    exit(1);
}

// Normalise header names
$header = array_map(fn(string $h) => strtolower(trim($h)), $header);

$colCategory = array_search('category', $header, true);
$colQuestion = array_search('question', $header, true);
$colAnswer   = array_search('answer', $header, true);

if ($colCategory === false || $colQuestion === false || $colAnswer === false) {
    echo "Error: CSV must have columns: category, question, answer\n";
    echo "Found columns: " . implode(', ', $header) . "\n";
    fclose($handle);
    exit(1);
}

// --- Insert ------------------------------------------------------------------

$stmt = $pdo->prepare(
    'INSERT INTO faq (category, question, answer) VALUES (:category, :question, :answer)'
);

$inserted = 0;
$skipped  = 0;
$row      = 1; // header already consumed

$pdo->beginTransaction();

try {
    while (($data = fgetcsv($handle, 0, $delimiter)) !== false) {
        $row++;

        $category = trim((string) ($data[$colCategory] ?? ''));
        $question = trim((string) ($data[$colQuestion] ?? ''));
        $answer   = trim((string) ($data[$colAnswer] ?? ''));

        if ($category === '' || $question === '' || $answer === '') {
            echo "  Skipping row $row: empty category, question, or answer\n";
            $skipped++;
            continue;
        }

        $stmt->execute([
            ':category' => $category,
            ':question' => $question,
            ':answer'   => $answer,
        ]);

        $inserted++;
    }

    $pdo->commit();
} catch (Throwable $e) {
    $pdo->rollBack();
    fclose($handle);
    echo "Error on row $row: " . $e->getMessage() . "\n";
    exit(1);
}

fclose($handle);

echo "Done. Inserted: $inserted row(s), skipped: $skipped row(s).\n";
