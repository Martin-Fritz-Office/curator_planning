<?php
?><!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>artbackstage | Honorarium Questionnaire</title>
  <link rel="stylesheet" href="style.css" />
  <script defer src="fair_use_questionnaire_en.js"></script>
</head>
<body data-lang="en">
  <div class="page">
    <header class="header">
      <div>
        <h1>Honorarium questionnaire for fair pay</h1>
        <p class="muted">Guided questions based on the 2026 guideline to estimate a fair artist fee.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index_money_en.php">Home</a>
        <a class="btn btn-outline" href="honorarium_questionnaire.php">Deutsch</a>
      </div>
    </header>

    <main class="card tutorial-card">
      <div class="card-head">
        <h2>Questionnaire: Fair honorarium estimate</h2>
      </div>
      <div class="card-body">
        <div class="carousel-progress">
          <span id="progressLabel" class="pill">Question 1 of 8</span>
        </div>

        <section class="carousel-stage" id="carouselStage" aria-live="polite"></section>

        <div class="carousel-actions">
          <button type="button" id="prevBtn" class="btn btn-outline">Back</button>
          <button type="button" id="nextBtn" class="btn">Next</button>
        </div>
      </div>
    </main>
  </div>
<?php require_once __DIR__ . '/site_footer.php'; render_site_footer(); ?>
</body>
</html>
