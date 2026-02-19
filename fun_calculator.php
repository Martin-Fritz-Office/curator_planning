<?php
?><!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Creative Spark Calculator</title>
  <link rel="icon" type="image/svg+xml" href="favicon.svg" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="page">
    <header class="header">
      <div>
        <p class="eyebrow">Playful tool</p>
        <h1>Creative Spark Calculator</h1>
        <p class="muted">Dial in your project mood and get a playful recommendation with a live constellation diagram.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index_en.php">Back to calculators</a>
      </div>
    </header>

    <main class="grid">
      <section class="card">
        <div class="card-head">
          <h2>Your inputs</h2>
        </div>
        <div class="card-body qgrid" id="spark-inputs">
          <label class="q q-full">Creative energy
            <input type="range" min="0" max="100" value="70" data-key="energy" />
            <span class="hint" data-value="energy">70</span>
          </label>
          <label class="q q-full">Risk appetite
            <input type="range" min="0" max="100" value="55" data-key="risk" />
            <span class="hint" data-value="risk">55</span>
          </label>
          <label class="q q-full">Time available
            <input type="range" min="0" max="100" value="65" data-key="time" />
            <span class="hint" data-value="time">65</span>
          </label>
          <label class="q q-full">Collaborator support
            <input type="range" min="0" max="100" value="40" data-key="support" />
            <span class="hint" data-value="support">40</span>
          </label>
        </div>
      </section>

      <section class="card spark-results-card">
        <div class="card-head">
          <h2>Fancy diagram + suggestion</h2>
        </div>
        <div class="card-body">
          <svg id="spark-diagram" class="spark-diagram" viewBox="0 0 320 320" role="img" aria-label="Creative spark constellation diagram">
            <circle cx="160" cy="160" r="120" class="spark-grid"></circle>
            <circle cx="160" cy="160" r="80" class="spark-grid"></circle>
            <circle cx="160" cy="160" r="40" class="spark-grid"></circle>
            <polygon id="spark-shape" points="" class="spark-shape"></polygon>
            <g id="spark-points"></g>
          </svg>

          <div class="spark-summary">
            <p class="spark-score-line">Spark score: <strong id="spark-score">0</strong> / 100</p>
            <p id="spark-message">Tune the sliders to reveal your next experiment.</p>
          </div>
        </div>
      </section>
    </main>
  </div>

  <script src="fun_calculator.js"></script>
</body>
</html>
