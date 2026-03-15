<?php
?><!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>artbackstage | Galerievertrag-Fragebogen für Ausstellungen</title>
  <link rel="stylesheet" href="style.css" />
  <script defer src="gallery_contract_questionnaire.js"></script>
</head>
<body data-lang="de">
  <a href="#main-content" class="skip-link">Zum Hauptinhalt springen</a>
  <div class="page">
    <header class="header">
      <div>
        <h1>Galerievertrag-Fragebogen für Ausstellungen</h1>
        <p class="muted">8 Multiple-Choice-Fragen zu den wichtigsten Konditionen eines Ausstellungsvertrags – erstellt ein fertiges Bestätigungsschreiben.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index.php">Startseite</a>
        <a class="btn btn-outline" href="gallery_contract_questionnaire_en.php">English</a>
      </div>
    </header>

    <main id="main-content" class="card tutorial-card">
      <div class="card-head">
        <h2>Ausstellungsvereinbarung – Schritt für Schritt</h2>
      </div>
      <div class="card-body">
        <div class="carousel-progress">
          <span id="progressLabel" class="pill">Ausstellungsdetails</span>
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
