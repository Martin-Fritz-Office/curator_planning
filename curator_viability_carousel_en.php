<?php
?><!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>artbackstage | Curator Freelance Project Viability</title>
  <link rel="stylesheet" href="style.css" />
  <script defer src="curator_viability_carousel.js"></script>
</head>
<body data-lang="en">
  <div class="page">
    <header class="header">
      <div>
        <h1>Curator Freelance Project Viability</h1>
        <p class="muted">13 guided questions to decide whether to go, renegotiate, or decline a project.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index_money_en.php">Home</a>
        <a class="btn btn-outline" href="curator_viability_carousel.php">Deutsch</a>
      </div>
    </header>

    <main class="card tutorial-card">
      <div class="card-head">
        <h2>Viability Carousel</h2>
      </div>
      <div class="card-body">
        <div class="carousel-progress">
          <span id="progressLabel" class="pill">Question 1 of 13</span>
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
