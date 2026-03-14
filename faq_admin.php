<?php

declare(strict_types=1);

session_start();

// ── Configuration ─────────────────────────────────────────────────────────────

$configPath = __DIR__ . '/db_config.php';
$config     = is_file($configPath) ? require $configPath : null;

$passwordHash = is_array($config) ? (string) ($config['admin_password_hash'] ?? '') : '';
$isSetup      = ($passwordHash === '');

// ── CSRF helper ───────────────────────────────────────────────────────────────

function csrf_token(): string
{
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function csrf_verify(): void
{
    $token = $_POST['csrf_token'] ?? '';
    if (!hash_equals($_SESSION['csrf_token'] ?? '', $token)) {
        http_response_code(403);
        die('CSRF validation failed.');
    }
}

// ── Auth ──────────────────────────────────────────────────────────────────────

$isLoggedIn = !empty($_SESSION['faq_admin_auth']);

if (isset($_POST['action']) && $_POST['action'] === 'login') {
    csrf_verify();
    $submitted = (string) ($_POST['password'] ?? '');
    if (!$isSetup && password_verify($submitted, $passwordHash)) {
        $_SESSION['faq_admin_auth'] = true;
        header('Location: faq_admin.php');
        exit;
    }
    $loginError = 'Falsches Passwort. Bitte erneut versuchen.';
}

if (isset($_POST['action']) && $_POST['action'] === 'logout') {
    csrf_verify();
    session_destroy();
    header('Location: faq_admin.php');
    exit;
}

// ── Database ──────────────────────────────────────────────────────────────────

$pdo    = null;
$dbError = null;

if ($isLoggedIn && is_array($config)) {
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
        error_log('[faq_admin] DB: ' . $e->getMessage());
        $dbError = 'Datenbankverbindung fehlgeschlagen: ' . htmlspecialchars($e->getMessage(), ENT_QUOTES, 'UTF-8');
    }
}

// ── Admin actions (add / edit / delete) ───────────────────────────────────────

$actionMsg   = null;
$editEntry   = null;
$formError   = null;

if ($isLoggedIn && $pdo !== null && $_SERVER['REQUEST_METHOD'] === 'POST') {

    $action = (string) ($_POST['action'] ?? '');

    if ($action === 'add' || $action === 'update') {
        csrf_verify();

        $category = trim((string) ($_POST['category'] ?? ''));
        $question = trim((string) ($_POST['question'] ?? ''));
        $answer   = trim((string) ($_POST['answer']   ?? ''));
        $editId   = (int) ($_POST['edit_id'] ?? 0);

        if ($question === '') {
            $formError = 'Die Frage darf nicht leer sein.';
        } elseif ($answer === '') {
            $formError = 'Die Antwort darf nicht leer sein.';
        } elseif (mb_strlen($answer) > 5000) {
            $formError = 'Die Antwort darf maximal 5.000 Zeichen lang sein.';
        } else {
            try {
                if ($action === 'add') {
                    $stmt = $pdo->prepare(
                        'INSERT INTO faq (category, question, answer) VALUES (:cat, :q, :a)'
                    );
                    $stmt->execute([':cat' => $category, ':q' => $question, ':a' => $answer]);
                    $actionMsg = 'Neuer Eintrag gespeichert.';
                } else {
                    $stmt = $pdo->prepare(
                        'UPDATE faq SET category = :cat, question = :q, answer = :a WHERE id = :id'
                    );
                    $stmt->execute([':cat' => $category, ':q' => $question, ':a' => $answer, ':id' => $editId]);
                    $actionMsg = 'Eintrag aktualisiert.';
                }
            } catch (PDOException $e) {
                error_log('[faq_admin] save: ' . $e->getMessage());
                $formError = 'Speichern fehlgeschlagen: ' . htmlspecialchars($e->getMessage(), ENT_QUOTES, 'UTF-8');
            }
        }
    }

    if ($action === 'delete') {
        csrf_verify();
        $deleteId = (int) ($_POST['delete_id'] ?? 0);
        if ($deleteId > 0) {
            try {
                $stmt = $pdo->prepare('DELETE FROM faq WHERE id = :id');
                $stmt->execute([':id' => $deleteId]);
                $actionMsg = 'Eintrag gelöscht.';
            } catch (PDOException $e) {
                error_log('[faq_admin] delete: ' . $e->getMessage());
                $formError = 'Löschen fehlgeschlagen.';
            }
        }
    }
}

// ── Load entry for editing (GET request) ──────────────────────────────────────

if ($isLoggedIn && $pdo !== null && isset($_GET['edit'])) {
    $editId = (int) $_GET['edit'];
    if ($editId > 0) {
        try {
            $stmt = $pdo->prepare('SELECT * FROM faq WHERE id = :id');
            $stmt->execute([':id' => $editId]);
            $editEntry = $stmt->fetch() ?: null;
        } catch (PDOException $e) {
            error_log('[faq_admin] edit load: ' . $e->getMessage());
        }
    }
}

// ── Load all FAQs ─────────────────────────────────────────────────────────────

$allFaqs = [];
if ($isLoggedIn && $pdo !== null && $dbError === null) {
    try {
        $allFaqs = $pdo->query('SELECT id, category, question, answer, votes_positive, votes_negative, created_at FROM faq ORDER BY created_at DESC')->fetchAll();
    } catch (PDOException $e) {
        error_log('[faq_admin] list: ' . $e->getMessage());
        $dbError = 'Einträge konnten nicht geladen werden.';
    }
}

// ── HTML helpers ──────────────────────────────────────────────────────────────

function h(string $s): string
{
    return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
}

$csrf = csrf_token();

?><!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>FAQ Admin – artbackstage</title>
  <link rel="icon" type="image/svg+xml" href="favicon.svg" />
  <link rel="stylesheet" href="style.css" />
  <style>
    .admin-login {
      max-width: 400px;
      margin: 80px auto;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 36px 40px;
      box-shadow: var(--shadow-soft);
    }
    .admin-login h1 {
      margin: 0 0 6px;
      font-size: 1.3rem;
      color: var(--headline);
    }
    .admin-login p.sub {
      margin: 0 0 22px;
      font-size: 14px;
      color: var(--muted);
    }
    .form-row {
      margin-bottom: 14px;
    }
    .form-row label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: var(--headline);
      margin-bottom: 5px;
    }
    .form-row input[type="password"],
    .form-row input[type="text"],
    .form-row textarea {
      width: 100%;
      box-sizing: border-box;
      padding: 9px 13px;
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      font-family: var(--font);
      font-size: 14px;
      background: var(--surface);
      color: var(--text);
      outline: none;
      transition: border-color .15s;
      resize: vertical;
    }
    .form-row input:focus,
    .form-row textarea:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 3px rgba(45,125,154,.15);
    }
    .form-row .char-count {
      font-size: 12px;
      color: var(--muted);
      margin-top: 4px;
      text-align: right;
    }
    .form-row .char-count.warn {
      color: var(--warning);
    }
    .form-row .char-count.over {
      color: var(--danger);
      font-weight: 700;
    }
    .alert {
      padding: 12px 16px;
      border-radius: var(--radius-sm);
      font-size: 14px;
      margin-bottom: 16px;
    }
    .alert-error {
      background: #fee2e2;
      color: #991b1b;
      border: 1px solid #fca5a5;
    }
    .alert-success {
      background: #d1fae5;
      color: #065f46;
      border: 1px solid #6ee7b7;
    }
    .alert-info {
      background: var(--accent-light);
      color: var(--accent-dark);
      border: 1px solid var(--accent);
    }
    .admin-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
      flex-wrap: wrap;
      gap: 12px;
    }
    .admin-header h1 {
      margin: 0;
      font-size: 1.4rem;
      color: var(--headline);
    }
    .faq-form-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 28px 32px;
      box-shadow: var(--shadow-soft);
      margin-bottom: 28px;
    }
    .faq-form-card h2 {
      margin: 0 0 20px;
      font-size: 1.05rem;
      color: var(--headline);
    }
    .form-actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 6px;
    }
    table.faq-table {
      width: 100%;
      border-collapse: collapse;
      background: var(--surface);
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-soft);
      border: 1px solid var(--border);
      font-size: 14px;
    }
    table.faq-table thead tr {
      background: var(--surface-tinted);
    }
    table.faq-table th {
      text-align: left;
      padding: 11px 14px;
      font-weight: 700;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: .05em;
      color: var(--muted);
      border-bottom: 1px solid var(--border);
    }
    table.faq-table td {
      padding: 11px 14px;
      border-bottom: 1px solid var(--border);
      vertical-align: top;
      color: var(--text);
      line-height: 1.55;
    }
    table.faq-table tr:last-child td {
      border-bottom: none;
    }
    table.faq-table tr:hover td {
      background: var(--surface-tinted);
    }
    .faq-table .q-cell {
      max-width: 320px;
    }
    .faq-table .a-cell {
      max-width: 380px;
    }
    .faq-table .q-text, .faq-table .a-text {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      white-space: pre-wrap;
    }
    .cat-badge {
      display: inline-block;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .06em;
      text-transform: uppercase;
      color: var(--accent-dark);
      background: var(--accent-light);
      padding: 2px 8px;
      border-radius: 999px;
    }
    .vote-pills {
      display: flex;
      gap: 6px;
      align-items: center;
      white-space: nowrap;
    }
    .vote-pill-pos {
      font-size: 12px;
      font-weight: 700;
      color: #065f46;
      background: #d1fae5;
      padding: 2px 8px;
      border-radius: 999px;
    }
    .vote-pill-neg {
      font-size: 12px;
      font-weight: 700;
      color: #991b1b;
      background: #fee2e2;
      padding: 2px 8px;
      border-radius: 999px;
    }
    .table-actions {
      display: flex;
      gap: 6px;
      flex-wrap: nowrap;
    }
    .btn-sm {
      font-size: 12px;
      padding: 5px 12px;
    }
    .btn-danger {
      background: #dc2626;
      color: #fff;
      border: none;
      border-radius: var(--radius-sm);
      cursor: pointer;
      font-family: var(--font);
      font-weight: 600;
      transition: background .15s;
    }
    .btn-danger:hover {
      background: #b91c1c;
    }
    .no-entries {
      text-align: center;
      padding: 40px;
      color: var(--muted);
      font-size: 14px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
    }
    .setup-notice {
      background: var(--surface);
      border: 2px solid var(--accent);
      border-radius: var(--radius-lg);
      padding: 28px 32px;
      max-width: 600px;
      margin: 60px auto;
    }
    .setup-notice h2 { margin: 0 0 12px; color: var(--accent-dark); }
    .setup-notice pre {
      background: #1c1812;
      color: #f0ebe4;
      padding: 12px 16px;
      border-radius: var(--radius-sm);
      font-size: 13px;
      overflow-x: auto;
    }
    .setup-notice p { font-size: 14px; color: var(--muted); line-height: 1.7; }
    @media (max-width: 820px) {
      table.faq-table { display: block; overflow-x: auto; }
      .faq-form-card { padding: 20px; }
    }
  </style>
</head>
<body data-lang="de">
  <a href="#main-content" class="skip-link">Zum Hauptinhalt springen</a>
  <div class="page">

<?php if ($isSetup): ?>
  <!-- ── Setup notice ── -->
  <main id="main-content">
    <div class="setup-notice">
      <h2>Admin-Passwort noch nicht konfiguriert</h2>
      <p>Bitte trage einen <code>admin_password_hash</code> in deine <code>db_config.php</code> ein.
      Generiere den Hash mit folgendem Befehl (auf dem Server):</p>
      <pre>php -r "echo password_hash('dein-passwort', PASSWORD_DEFAULT);"</pre>
      <p>Füge dann den generierten Hash in <code>db_config.php</code> ein:</p>
      <pre>'admin_password_hash' => '<em>der-generierte-hash</em>',</pre>
      <p style="margin-top:16px"><a href="index.php" style="color:var(--accent-dark);font-weight:600">← Zur Startseite</a></p>
    </div>
  </main>

<?php elseif (!$isLoggedIn): ?>
  <!-- ── Login form ── -->
  <main id="main-content">
    <div class="admin-login">
      <h1>artbackstage FAQ Admin</h1>
      <p class="sub">Nur für authorisierte Personen.</p>

      <?php if (isset($loginError)): ?>
      <div class="alert alert-error" role="alert"><?= h($loginError) ?></div>
      <?php endif; ?>

      <form method="post" action="faq_admin.php">
        <input type="hidden" name="csrf_token" value="<?= h($csrf) ?>" />
        <input type="hidden" name="action"     value="login" />
        <div class="form-row">
          <label for="password">Passwort</label>
          <input type="password" id="password" name="password" autocomplete="current-password" autofocus />
        </div>
        <button type="submit" class="btn btn-primary" style="width:100%">Anmelden</button>
      </form>

      <p style="margin-top:16px;font-size:13px;text-align:center">
        <a href="faq.php" style="color:var(--accent-dark)">← Zur FAQ-Seite</a>
      </p>
    </div>
  </main>

<?php else: ?>
  <!-- ── Admin dashboard ── -->
  <main id="main-content">

    <div class="admin-header">
      <div>
        <h1>FAQ Admin</h1>
        <p style="margin:0;font-size:14px;color:var(--muted)">Fragen &amp; Antworten verwalten</p>
      </div>
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
        <a class="btn btn-outline btn-sm" href="faq.php" target="_blank">FAQ-Seite ↗</a>
        <form method="post" action="faq_admin.php" style="margin:0">
          <input type="hidden" name="csrf_token" value="<?= h($csrf) ?>" />
          <input type="hidden" name="action"     value="logout" />
          <button type="submit" class="btn btn-outline btn-sm">Abmelden</button>
        </form>
      </div>
    </div>

    <?php if ($dbError !== null): ?>
    <div class="alert alert-error" role="alert"><?= $dbError ?></div>
    <?php endif; ?>

    <?php if ($actionMsg !== null): ?>
    <div class="alert alert-success" role="alert"><?= h($actionMsg) ?></div>
    <?php endif; ?>

    <?php if ($formError !== null): ?>
    <div class="alert alert-error" role="alert"><?= h($formError) ?></div>
    <?php endif; ?>

    <!-- Add / Edit form -->
    <div class="faq-form-card">
      <h2><?= $editEntry !== null ? 'Eintrag bearbeiten' : 'Neuen Eintrag hinzufügen' ?></h2>

      <form method="post" action="faq_admin.php" id="faq-form">
        <input type="hidden" name="csrf_token" value="<?= h($csrf) ?>" />
        <input type="hidden" name="action"     value="<?= $editEntry !== null ? 'update' : 'add' ?>" />
        <?php if ($editEntry !== null): ?>
        <input type="hidden" name="edit_id" value="<?= (int) $editEntry['id'] ?>" />
        <?php endif; ?>

        <div class="form-row">
          <label for="category">Kategorie</label>
          <input
            type="text"
            id="category"
            name="category"
            maxlength="120"
            placeholder="z. B. Honorar, Vertrag, Soziale Absicherung …"
            value="<?= $editEntry !== null ? h((string) $editEntry['category']) : '' ?>"
          />
        </div>

        <div class="form-row">
          <label for="question">Frage <span style="color:var(--danger)">*</span></label>
          <input
            type="text"
            id="question"
            name="question"
            maxlength="500"
            placeholder="Wie berechne ich mein Honorar?"
            value="<?= $editEntry !== null ? h((string) $editEntry['question']) : '' ?>"
            required
          />
        </div>

        <div class="form-row">
          <label for="answer">Antwort <span style="color:var(--danger)">*</span></label>
          <textarea
            id="answer"
            name="answer"
            rows="10"
            maxlength="5000"
            placeholder="Ausführliche Antwort … (max. 5.000 Zeichen)"
            required
            oninput="updateCharCount(this)"
          ><?= $editEntry !== null ? h((string) $editEntry['answer']) : '' ?></textarea>
          <div class="char-count" id="char-count">0 / 5.000</div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary">
            <?= $editEntry !== null ? 'Speichern' : 'Hinzufügen' ?>
          </button>
          <?php if ($editEntry !== null): ?>
          <a class="btn btn-outline" href="faq_admin.php">Abbrechen</a>
          <?php endif; ?>
        </div>
      </form>
    </div>

    <!-- FAQ list -->
    <?php if (empty($allFaqs)): ?>
    <div class="no-entries">
      <p>Noch keine FAQ-Einträge vorhanden. Füge den ersten Eintrag oben hinzu.</p>
    </div>
    <?php else: ?>
    <h2 style="font-size:1rem;margin:0 0 12px;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:.06em">
      <?= count($allFaqs) ?> Einträge
    </h2>
    <table class="faq-table" aria-label="FAQ-Einträge">
      <thead>
        <tr>
          <th>#</th>
          <th>Kategorie</th>
          <th>Frage</th>
          <th>Antwort</th>
          <th>Bewertungen</th>
          <th>Erstellt</th>
          <th>Aktionen</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($allFaqs as $row): ?>
        <tr>
          <td><?= (int) $row['id'] ?></td>
          <td>
            <?php if ((string) $row['category'] !== ''): ?>
            <span class="cat-badge"><?= h((string) $row['category']) ?></span>
            <?php else: ?>
            <span style="color:var(--muted);font-size:12px">–</span>
            <?php endif; ?>
          </td>
          <td class="q-cell">
            <div class="q-text"><?= h((string) $row['question']) ?></div>
          </td>
          <td class="a-cell">
            <div class="a-text"><?= h((string) $row['answer']) ?></div>
          </td>
          <td>
            <div class="vote-pills">
              <span class="vote-pill-pos">+&thinsp;<?= (int) $row['votes_positive'] ?></span>
              <span class="vote-pill-neg">−&thinsp;<?= (int) $row['votes_negative'] ?></span>
            </div>
          </td>
          <td style="white-space:nowrap;font-size:12px;color:var(--muted)">
            <?= h(substr((string) $row['created_at'], 0, 10)) ?>
          </td>
          <td>
            <div class="table-actions">
              <a class="btn btn-outline btn-sm" href="faq_admin.php?edit=<?= (int) $row['id'] ?>#faq-form">
                Bearbeiten
              </a>
              <form method="post" action="faq_admin.php" style="margin:0" onsubmit="return confirm('Diesen Eintrag wirklich löschen?')">
                <input type="hidden" name="csrf_token" value="<?= h($csrf) ?>" />
                <input type="hidden" name="action"     value="delete" />
                <input type="hidden" name="delete_id"  value="<?= (int) $row['id'] ?>" />
                <button type="submit" class="btn btn-danger btn-sm">Löschen</button>
              </form>
            </div>
          </td>
        </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
    <?php endif; ?>

  </main>
<?php endif; ?>

  </div>
<?php require_once __DIR__ . '/site_footer.php'; render_site_footer(); ?>

<script>
function updateCharCount(textarea) {
  var len   = textarea.value.length;
  var max   = 5000;
  var el    = document.getElementById('char-count');
  if (!el) return;
  el.textContent = len.toLocaleString('de-AT') + ' / ' + max.toLocaleString('de-AT');
  el.className   = 'char-count' + (len > max ? ' over' : len > 4000 ? ' warn' : '');
}

// Init char count on page load
(function () {
  var ta = document.getElementById('answer');
  if (ta) updateCharCount(ta);
})();
</script>
</body>
</html>
