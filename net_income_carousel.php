<?php
?><!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Didaktische Serie: Jahresnettoeinkommen</title>
  <link rel="stylesheet" href="style.css" />
  <script defer src="net_income_carousel.js"></script>
</head>
<body>
  <div class="page">
    <header class="header">
      <div>
        <h1>Jahresnettoeinkommen Schritt für Schritt</h1>
        <p class="muted">Interaktive Lernserie zur Berechnung deines Jahresnettoeinkommens als Selbständige*r.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index.php">Zurück zum Haupttool</a>
      </div>
    </header>

    <main class="card tutorial-card">
      <div class="card-head">
        <h2>Interaktive Didaktik-Serie</h2>
      </div>
      <div class="card-body">
        <div class="carousel-progress">
          <span id="progressLabel" class="pill">Schritt 1 von 12</span>
        </div>

        <section class="carousel-stage" id="carouselStage" aria-live="polite"></section>

        <div class="carousel-actions">
          <button type="button" id="prevBtn" class="btn btn-outline">Zurück</button>
          <button type="button" id="nextBtn" class="btn">Weiter</button>
        </div>
      </div>
    </main>
  </div>
</body>
</html>
