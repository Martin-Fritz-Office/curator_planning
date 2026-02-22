<?php
?><!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>artbackstage | Money – Yearly Net Income</title>
  <link rel="stylesheet" href="style.css" />
  <script defer src="net_income_carousel.js"></script>
</head>
<body data-lang="en">
  <div class="page">
    <header class="header">
      <div>
        <h1>Step-by-step yearly net income</h1>
        <p class="muted">Interactive learning sequence to calculate your yearly net income as a freelancer.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index_money_en.php">Home</a>
        <a class="btn btn-outline" href="net_income_carousel.php">Deutsch</a>
      </div>
    </header>

    <main class="card tutorial-card">
      <div class="card-head">
        <h2>Interactive didactic sequence</h2>
      </div>
      <div class="card-body">
        <div class="carousel-progress">
          <span id="progressLabel" class="pill">Step 1 of 12</span>
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
