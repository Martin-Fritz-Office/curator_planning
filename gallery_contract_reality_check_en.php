<?php
?><!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>artbackstage | Gallery Contract Reality Check</title>
  <link rel="stylesheet" href="style.css" />
  <script defer src="gallery_contract_reality_check.js"></script>
</head>
<body data-lang="en">
  <div class="page">
    <header class="header">
      <div>
        <h1>Gallery Contract Reality Check</h1>
        <p class="muted">12 guided questions to stress-test whether a gallery agreement is financially viable.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index_en.php">Home</a>
        <a class="btn btn-outline" href="gallery_contract_reality_check.php">Deutsch</a>
      </div>
    </header>

    <main class="card tutorial-card">
      <div class="card-head">
        <h2>Contract Check Carousel</h2>
      </div>
      <div class="card-body">
        <div class="carousel-progress">
          <span id="progressLabel" class="pill">Question 1 of 12</span>
        </div>

        <section class="carousel-stage" id="carouselStage" aria-live="polite"></section>

        <div class="carousel-actions">
          <button type="button" id="prevBtn" class="btn btn-outline">Back</button>
          <button type="button" id="nextBtn" class="btn">Next</button>
        </div>
      </div>
    </main>
  </div>
  <footer class="site-footer" role="contentinfo">
    The artbackstage tool collection is in ongoing BETA development as part of the teaching assignment "Art in Context (Law, Money and Fairness)" at Kunstuniversität Linz. No personalized data is stored. Teilweise KI generiert. Keine Haftung.
  </footer>
</body>
</html>
