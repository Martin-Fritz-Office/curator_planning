<?php
?><!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>artbackstage | Exhibition Questionnaire (25 points)</title>
  <link rel="stylesheet" href="style.css" />
  <script defer src="agreement_checklist.js"></script>
</head>
<body data-lang="en">
  <div class="page">
    <header class="header">
      <div>
        <h1>Exhibition Questionnaire (25 points)</h1>
        <p class="muted">Interactive questionnaire based on Martin Fritz's 25 points: prepare exhibition agreements and track how many answers are already detailed enough.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index_money_en.php">Home</a>
        <a class="btn btn-outline" href="agreement_checklist.php">Deutsch</a>
      </div>
    </header>

    <main class="card tutorial-card">
      <div class="card-head">
        <h2>Checklist with detail check</h2>
      </div>
      <div class="card-body">
        <div class="agreement-toolbar">
          <span id="agreementProgress" class="pill">0 / 25 answered in enough detail</span>
          <button type="button" id="showIncompleteBtn" class="btn btn-outline">Show only incomplete answers</button>
          <button type="button" id="copySummaryBtn" class="btn">Copy summary</button>
        </div>

        <section class="agreement-visual" aria-live="polite">
          <div class="agreement-bars" id="agreementBars"></div>
          <p id="agreementLegend" class="muted">No answers yet.</p>
        </section>

        <section id="agreementList" class="agreement-list" aria-live="polite"></section>
      </div>
    </main>
  </div>

  <dialog id="contextDialog" class="agreement-dialog">
    <form method="dialog" class="agreement-dialog-form">
      <h3 id="contextDialogTitle">More context</h3>
      <p id="contextDialogText"></p>
      <div class="agreement-dialog-actions">
        <button class="btn" value="close">Close</button>
      </div>
    </form>
  </dialog>
<?php require_once __DIR__ . '/site_footer.php'; render_site_footer(); ?>
</body>
</html>
