<?php
?><!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>artbackstage | Fair Use Check for Artists</title>
  <link rel="stylesheet" href="style.css" />
  <script defer src="fair_use_questionnaire.js"></script>
</head>
<body data-lang="en">
  <div class="page">
    <header class="header">
      <div>
        <h1>Fair Use Check for Artists</h1>
        <p class="muted">Seven guided questions to estimate whether your artwork use may qualify as fair use.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index_en.php">Home</a>
      </div>
    </header>

    <main class="card tutorial-card">
      <div class="card-head">
        <h2>Fair Use Questionnaire</h2>
      </div>
      <div class="card-body">
        <div class="carousel-progress">
          <span id="progressLabel" class="pill">Question 1 of 7</span>
        </div>

        <section class="carousel-stage" id="carouselStage" aria-live="polite"></section>

        <div class="carousel-actions">
          <button type="button" id="prevBtn" class="btn btn-outline">Back</button>
          <button type="button" id="nextBtn" class="btn">Next</button>
        </div>
      </div>
    </main>
  </div>
</body>
</html>
