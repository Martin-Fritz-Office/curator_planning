<?php

declare(strict_types=1);

// Load a random FAQ entry from the database
$faqEntry  = null;
$faqTotal  = 0;
$dbError   = false;

$configPath = __DIR__ . '/db_config.php';
if (is_file($configPath)) {
    $config = require $configPath;
    if (is_array($config)) {
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
            $countStmt = $pdo->query('SELECT COUNT(*) FROM faq');
            $faqTotal  = (int) $countStmt->fetchColumn();
            if ($faqTotal > 0) {
                $offset  = random_int(0, $faqTotal - 1);
                $stmt    = $pdo->prepare('SELECT id, category, question, answer, votes_positive, votes_negative FROM faq LIMIT 1 OFFSET :offset');
                $stmt->execute([':offset' => $offset]);
                $faqEntry = $stmt->fetch();
            }
        } catch (Exception $e) {
            error_log('[faq] ' . $e->getMessage());
            $dbError = true;
        }
    }
}

?><!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <?php
    require_once __DIR__ . '/seo_meta.php';
    generate_seo_meta([
      'title' => 'FAQ – Häufig gestellte Fragen bei artbackstage',
      'description' => 'Antworten auf die häufigsten Fragen zu Honorar, Urheberrecht, Sozialversicherung und fairer Bezahlung für Kulturschaffende.',
      'lang' => 'de',
      'og_image' => 'https://artbackstage.at/og-image.png',
      'alternate_lang' => 'en',
      'alternate_url' => 'https://artbackstage.at/faq_en.php',
      'schema' => get_site_schema('FAQ', 'Häufig gestellte Fragen'),
    ]);
  ?>
  <link rel="icon" type="image/svg+xml" href="favicon.svg" />
  <link rel="stylesheet" href="style.css" />
  <style>
    .faq-hero {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 36px 40px 30px;
      margin-bottom: var(--gap);
      box-shadow: var(--shadow-soft);
      text-align: center;
    }
    .faq-hero h1 {
      margin: 0 0 8px;
      font-size: clamp(1.3rem, 1rem + 1vw, 1.9rem);
      color: var(--headline);
    }
    .faq-hero .eyebrow {
      display: inline-block;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: .08em;
      text-transform: uppercase;
      color: var(--accent-dark);
      background: var(--accent-light);
      padding: 3px 10px;
      border-radius: 999px;
      margin-bottom: 14px;
    }
    .faq-hero p {
      color: var(--muted);
      font-size: 15px;
      margin: 0;
    }
    .faq-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 32px 36px 28px;
      box-shadow: var(--shadow-soft);
      margin-bottom: var(--gap);
    }
    .faq-card-meta {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 18px;
      flex-wrap: wrap;
    }
    .faq-category {
      display: inline-block;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: .06em;
      text-transform: uppercase;
      color: var(--accent-dark);
      background: var(--accent-light);
      padding: 3px 10px;
      border-radius: 999px;
    }
    .faq-counter {
      font-size: 12px;
      color: var(--muted);
    }
    .faq-question {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--headline);
      margin: 0 0 18px;
      line-height: 1.45;
    }
    .faq-answer {
      font-size: 15px;
      color: var(--text);
      line-height: 1.75;
      white-space: pre-wrap;
      margin: 0 0 28px;
    }
    .faq-vote-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding-top: 20px;
      border-top: 1px solid var(--border);
      flex-wrap: wrap;
    }
    .faq-vote-label {
      font-size: 13px;
      color: var(--muted);
      flex: 1;
    }
    .vote-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      border: 1px solid var(--border);
      border-radius: 999px;
      background: var(--surface);
      color: var(--text);
      font-size: 14px;
      font-weight: 600;
      padding: 7px 16px;
      cursor: pointer;
      transition: background .15s, border-color .15s, color .15s;
      font-family: var(--font);
    }
    .vote-btn:hover:not(:disabled) {
      border-color: var(--accent);
      color: var(--accent-dark);
      background: var(--accent-light);
    }
    .vote-btn:disabled {
      opacity: .55;
      cursor: default;
    }
    .vote-btn.voted-pos {
      background: #d1fae5;
      border-color: #059669;
      color: #065f46;
    }
    .vote-btn.voted-neg {
      background: #fee2e2;
      border-color: #dc2626;
      color: #991b1b;
    }
    .vote-count {
      font-size: 13px;
      color: var(--muted);
    }
    .faq-next-row {
      display: flex;
      justify-content: center;
      margin-bottom: var(--gap);
    }
    .faq-empty {
      background: var(--surface-tinted);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 40px;
      text-align: center;
      color: var(--muted);
      font-size: 15px;
      margin-bottom: var(--gap);
    }
    .faq-contact {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 28px 36px;
      box-shadow: var(--shadow-soft);
      text-align: center;
    }
    .faq-contact h2 {
      margin: 0 0 8px;
      font-size: 1.05rem;
      color: var(--headline);
    }
    .faq-contact p {
      font-size: 14px;
      color: var(--muted);
      margin: 0 0 16px;
      line-height: 1.65;
    }
    .faq-contact a.mail-link {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: var(--accent);
      color: #fff;
      font-weight: 700;
      font-size: 14px;
      padding: 10px 22px;
      border-radius: 999px;
      text-decoration: none;
      transition: background .15s;
    }
    .faq-contact a.mail-link:hover {
      background: var(--accent-dark);
    }
    .vote-feedback {
      font-size: 13px;
      color: var(--accent-dark);
      font-weight: 600;
      min-height: 20px;
    }
    .lang-switch {
      font-size: 13px;
      color: var(--muted);
    }
    .lang-switch a {
      color: var(--accent-dark);
      text-decoration: none;
      font-weight: 600;
    }
  </style>
</head>
<body data-lang="de">
  <a href="#main-content" class="skip-link">Zum Hauptinhalt springen</a>
  <div class="page">

    <header class="header">
      <div>
        <h1>artbackstage | FAQ</h1>
        <p>Fragen und Antworten aus der Kulturpraxis</p>
      </div>
      <div class="header-actions">
        <span class="lang-switch"><a href="faq_en.php">English</a></span>
        <a class="btn btn-outline" href="index.php">Startseite</a>
      </div>
    </header>

    <main id="main-content">

      <!-- Hero -->
      <div class="faq-hero">
        <span class="eyebrow">FAQ</span>
        <h1>artbackstage antwortet auf eure Fragen</h1>
        <p>Hier findet ihr Antworten auf häufig gestellte Fragen rund um Finanzen, Recht und soziale Absicherung in der Kulturpraxis.</p>
      </div>

      <!-- FAQ card -->
<?php if ($dbError): ?>
      <div class="faq-empty">
        <p>Die FAQ konnten gerade nicht geladen werden. Bitte versuche es später erneut.</p>
      </div>
<?php elseif ($faqEntry === null || $faqEntry === false): ?>
      <div class="faq-empty">
        <p>Noch keine Fragen und Antworten vorhanden. Schau bald wieder vorbei!</p>
      </div>
<?php else:
  $faqId      = (int) $faqEntry['id'];
  $category   = htmlspecialchars((string) $faqEntry['category'], ENT_QUOTES, 'UTF-8');
  $question   = htmlspecialchars((string) $faqEntry['question'], ENT_QUOTES, 'UTF-8');
  $answer     = htmlspecialchars((string) $faqEntry['answer'], ENT_QUOTES, 'UTF-8');
  $votesPos   = (int) $faqEntry['votes_positive'];
  $votesNeg   = (int) $faqEntry['votes_negative'];
?>
      <div class="faq-card" id="faq-card">
        <div class="faq-card-meta">
          <?php if ($category !== ''): ?>
          <span class="faq-category"><?= $category ?></span>
          <?php endif; ?>
          <?php if ($faqTotal > 1): ?>
          <span class="faq-counter"><?= $faqTotal ?> Fragen insgesamt</span>
          <?php endif; ?>
        </div>
        <p class="faq-question"><?= $question ?></p>
        <div class="faq-answer"><?= $answer ?></div>

        <div class="faq-vote-row" id="vote-row">
          <span class="faq-vote-label">War diese Antwort hilfreich?</span>
          <button class="vote-btn" id="btn-pos" onclick="castVote(<?= $faqId ?>, 'positive')" aria-label="Ja, hilfreich">
            <span aria-hidden="true">+</span> Ja
            <span class="vote-count" id="count-pos">(<?= $votesPos ?>)</span>
          </button>
          <button class="vote-btn" id="btn-neg" onclick="castVote(<?= $faqId ?>, 'negative')" aria-label="Nicht hilfreich">
            <span aria-hidden="true">−</span> Nein
            <span class="vote-count" id="count-neg">(<?= $votesNeg ?>)</span>
          </button>
          <span class="vote-feedback" id="vote-feedback" aria-live="polite"></span>
        </div>
      </div>

      <?php if ($faqTotal > 1): ?>
      <div class="faq-next-row">
        <a class="btn btn-outline" href="faq.php">Andere Frage anzeigen ↺</a>
      </div>
      <?php endif; ?>

<?php endif; ?>

      <!-- Contact / submit your question -->
      <div class="faq-contact">
        <h2>Deine Frage ist nicht dabei?</h2>
        <p>Schick uns deine Frage – wir versprechen eine kurze Antwort in den nächsten Tagen.</p>
        <a class="mail-link" href="mailto:office@artbackstage.net?subject=FAQ-Frage">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
          office@artbackstage.net
        </a>
      </div>

    </main>
  </div>

<?php require_once __DIR__ . '/site_footer.php'; render_site_footer(); ?>

<script>
(function () {
  var faqId = <?= $faqEntry !== null && $faqEntry !== false ? $faqId : 0 ?>;
  if (!faqId) return;

  var key = 'faq_voted_' + faqId;
  var prev = sessionStorage.getItem(key);

  function applyVotedState(direction) {
    var btnPos = document.getElementById('btn-pos');
    var btnNeg = document.getElementById('btn-neg');
    if (!btnPos || !btnNeg) return;
    btnPos.disabled = true;
    btnNeg.disabled = true;
    if (direction === 'positive') {
      btnPos.classList.add('voted-pos');
    } else {
      btnNeg.classList.add('voted-neg');
    }
  }

  if (prev) {
    applyVotedState(prev);
  }

  window.castVote = function (id, direction) {
    if (sessionStorage.getItem('faq_voted_' + id)) return;

    var btnPos = document.getElementById('btn-pos');
    var btnNeg = document.getElementById('btn-neg');
    var fb     = document.getElementById('vote-feedback');
    if (btnPos) btnPos.disabled = true;
    if (btnNeg) btnNeg.disabled = true;

    fetch('faq_vote.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id, vote: direction })
    })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (data.ok) {
        sessionStorage.setItem('faq_voted_' + id, direction);
        var posEl = document.getElementById('count-pos');
        var negEl = document.getElementById('count-neg');
        if (posEl) posEl.textContent = '(' + data.votes_positive + ')';
        if (negEl) negEl.textContent = '(' + data.votes_negative + ')';
        applyVotedState(direction);
        if (fb) fb.textContent = 'Danke für dein Feedback!';
      }
    })
    .catch(function () {
      if (btnPos) btnPos.disabled = false;
      if (btnNeg) btnNeg.disabled = false;
      if (fb) fb.textContent = 'Ups, das hat nicht geklappt. Bitte nochmal versuchen.';
    });
  };
}());
</script>
</body>
</html>
