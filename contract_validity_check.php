<?php
?><!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>artbackstage | Habe ich einen gültigen Vertrag geschlossen?</title>
  <link rel="icon" type="image/svg+xml" href="favicon.svg" />
  <link rel="stylesheet" href="style.css" />
  <script defer src="contract_validity_check.js"></script>
</head>
<body data-lang="de">
  <a href="#main-content" class="skip-link">Zum Hauptinhalt springen</a>
  <div class="page">
    <header class="header">
      <div>
        <h1>Habe ich einen gültigen Vertrag geschlossen?</h1>
        <p class="muted">10 geführte Ja/Nein-Fragen zu den Voraussetzungen eines wirksamen Vertragsschlusses nach österreichischem und deutschem Recht (ABGB / BGB).</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index_law.php">Zu Law</a>
        <a class="btn btn-outline" href="index.php">Startseite</a>
      </div>
    </header>

    <main id="main-content" class="card tutorial-card">
      <div class="card-head">
        <h2>Vertragsschluss-Check</h2>
      </div>
      <div class="card-body">
        <div class="carousel-progress">
          <span id="progressLabel" class="pill">Frage 1 von 10</span>
        </div>

        <section class="carousel-stage" id="carouselStage" aria-live="polite"></section>

        <div class="carousel-actions">
          <button type="button" id="prevBtn" class="btn btn-outline">Zurück</button>
          <button type="button" id="nextBtn" class="btn">Weiter</button>
        </div>
      </div>
    </main>
  </div>
<?php require_once __DIR__ . '/site_footer.php'; render_site_footer(); ?>
</body>
</html>
