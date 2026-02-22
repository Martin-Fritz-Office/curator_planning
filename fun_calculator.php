<?php
?><!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Project Dimensions Calculator</title>
  <link rel="icon" type="image/svg+xml" href="favicon.svg" />
  <link rel="stylesheet" href="style.css" />
</head>
<body data-lang="de">
  <div class="page">
    <header class="header">
      <div>
        <p class="eyebrow">Projektbewertungstool</p>
        <h1>Projekt-Dimensionen-Rechner</h1>
        <p class="muted">Bewerte jede Dimension von 1 bis 100 und nutze das Radardiagramm, um zu sehen, ob ein Projekt für dich ausgewogen und machbar ist.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index.php">Startseite</a>
        <a class="btn btn-outline" href="fun_calculator_en.php">English</a>
      </div>
    </header>

    <main class="grid">
      <section class="card">
        <div class="card-head">
          <h2>Dimensionswerte (1–100)</h2>
        </div>
        <div class="card-body qgrid" id="spark-inputs">
          <label class="q q-full">Finanzielle Dimension (wird es ausreichend bezahlt?)
            <input type="range" min="1" max="100" value="60" data-key="financial" />
            <span class="hint" data-value="financial">60</span>
          </label>
          <label class="q q-full">Reputations-Dimension (hilft es meiner Entwicklung/Karriere?)
            <input type="range" min="1" max="100" value="55" data-key="reputational" />
            <span class="hint" data-value="reputational">55</span>
          </label>
          <label class="q q-full">Kollaborative Dimension (arbeite ich mit interessanten Menschen?)
            <input type="range" min="1" max="100" value="70" data-key="collaborative" />
            <span class="hint" data-value="collaborative">70</span>
          </label>
          <label class="q q-full">Professionelle Dimension (wird es herausfordernd und/oder zufriedenstellend?)
            <input type="range" min="1" max="100" value="65" data-key="professional" />
            <span class="hint" data-value="professional">65</span>
          </label>
          <label class="q q-full">Ethische Dimension (ist es eine sinnvolle Sache?)
            <input type="range" min="1" max="100" value="75" data-key="ethical" />
            <span class="hint" data-value="ethical">75</span>
          </label>
          <label class="q q-full">Kapazitäts-Dimension (kann ich das mit meiner aktuellen Zeit und Ressourcen realistisch liefern?)
            <input type="range" min="1" max="100" value="50" data-key="capacity" />
            <span class="hint" data-value="capacity">50</span>
          </label>
        </div>
      </section>

      <section class="card spark-results-card">
        <div class="card-head">
          <h2>Radardiagramm + Empfehlung</h2>
        </div>
        <div class="card-body">
          <svg id="spark-diagram" class="spark-diagram" viewBox="0 0 340 340" role="img" aria-label="Radardiagramm der Projektdimensionen mit Kapazitätsachse">
            <g id="spark-rings"></g>
            <g id="spark-axes"></g>
            <polygon id="spark-shape" points="" class="spark-shape"></polygon>
            <g id="spark-points"></g>
            <g id="spark-labels"></g>
          </svg>

          <div class="spark-summary">
            <p class="spark-score-line">Gesamt-Fit-Score: <strong id="spark-score">0</strong> / 100</p>
            <p class="hint">Niedrigste Dimension: <strong id="spark-lowest">-</strong></p>
            <p id="spark-message">Bewege die Regler, um deine Bewertung zu erzeugen.</p>
          </div>
        </div>
      </section>
    </main>
  </div>

  <script src="fun_calculator.js"></script>
<?php require_once __DIR__ . '/site_footer.php'; render_site_footer(); ?>
</body>
</html>
