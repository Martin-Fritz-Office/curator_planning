<?php
?><!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Project Dimensions Calculator</title>
  <link rel="icon" type="image/svg+xml" href="favicon.svg" />
  <link rel="stylesheet" href="style.css" />
</head>
<body data-lang="en">
  <div class="page">
    <header class="header">
      <div>
        <p class="eyebrow">Project assessment tool</p>
        <h1>Project Dimensions Calculator</h1>
        <p class="muted">Rate each dimension from 1 to 100 and inspect the radar diagram to see whether a project is balanced and feasible for you.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index_en.php">Back to calculators</a>
      </div>
    </header>

    <main class="grid">
      <section class="card">
        <div class="card-head">
          <h2>Dimension scores (1–100)</h2>
        </div>
        <div class="card-body qgrid" id="spark-inputs">
          <label class="q q-full">Financial dimension (is it paid sufficiently?)
            <input type="range" min="1" max="100" value="60" data-key="financial" />
            <span class="hint" data-value="financial">60</span>
          </label>
          <label class="q q-full">Reputational dimension (will it help my development/career?)
            <input type="range" min="1" max="100" value="55" data-key="reputational" />
            <span class="hint" data-value="reputational">55</span>
          </label>
          <label class="q q-full">Collaborative dimension (am I working with interesting people?)
            <input type="range" min="1" max="100" value="70" data-key="collaborative" />
            <span class="hint" data-value="collaborative">70</span>
          </label>
          <label class="q q-full">Professional dimension (will it be challenging and/or satisfactory?)
            <input type="range" min="1" max="100" value="65" data-key="professional" />
            <span class="hint" data-value="professional">65</span>
          </label>
          <label class="q q-full">Ethical dimension (is it a worthy cause?)
            <input type="range" min="1" max="100" value="75" data-key="ethical" />
            <span class="hint" data-value="ethical">75</span>
          </label>
          <label class="q q-full">Capacity dimension (can I realistically deliver this with my current time and resources?)
            <input type="range" min="1" max="100" value="50" data-key="capacity" />
            <span class="hint" data-value="capacity">50</span>
          </label>
        </div>
      </section>

      <section class="card spark-results-card">
        <div class="card-head">
          <h2>Radar diagram + recommendation</h2>
        </div>
        <div class="card-body">
          <svg id="spark-diagram" class="spark-diagram" viewBox="0 0 340 340" role="img" aria-label="Project dimensions radar diagram with capacity axis">
            <g id="spark-rings"></g>
            <g id="spark-axes"></g>
            <polygon id="spark-shape" points="" class="spark-shape"></polygon>
            <g id="spark-points"></g>
            <g id="spark-labels"></g>
          </svg>

          <div class="spark-summary">
            <p class="spark-score-line">Overall fit score: <strong id="spark-score">0</strong> / 100</p>
            <p class="hint">Lowest dimension: <strong id="spark-lowest">-</strong></p>
            <p id="spark-message">Move the sliders to generate your assessment.</p>
          </div>
        </div>
      </section>
    </main>
  </div>

  <script src="fun_calculator.js"></script>
  <footer class="site-footer" role="contentinfo">
    Die artbackstage Toolsammlung ist in laufender BETA-Entwicklung als Teil des Lehrauftrags "Kunst im Kontext (Recht, Geld und Fairness) an der Kunstuniversität Linz. Es werden keine personalisierten Daten gespeichert.
  </footer>
</body>
</html>
