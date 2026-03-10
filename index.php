<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>artbackstage</title>
  <link rel="icon" type="image/svg+xml" href="favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <a href="#main-content" class="skip-link">Zum Hauptinhalt springen</a>
  <div class="page landing-page">

    <!-- Hero -->
    <div class="landing-hero">
      <div class="landing-hero-inner">
        <span class="landing-hero-eyebrow">
          <span class="landing-hero-dot" aria-hidden="true"></span>
          artbackstage · BETA
        </span>
        <h1>Wähle deinen&nbsp;Einstieg</h1>
        <p>Drei Bereiche, ein Werkzeugkasten: Finanzen, Urheberrecht und Soziales für Kunst- und Kulturpraxis.</p>
        <div class="landing-hero-actions">
          <a class="btn btn-hero-ghost" href="index_en.php" lang="en">English version</a>
        </div>
      </div>
    </div>

    <!-- Area cards -->
    <main>
      <div class="landing-section-header">
        <h2>Bereiche</h2>
        <p>Wähle den Bereich, mit dem du starten möchtest.</p>
      </div>

      <div class="landing-links">
        <a class="tool-link" href="index_money.php">
          <span class="tool-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="img" focusable="false">
              <circle cx="12" cy="12" r="7.8"></circle><path d="M12 7.8v8.4"></path><path d="M8.7 10.2c0-1.1 1.3-2 3.3-2s3.3.9 3.3 2-1.3 2-3.3 2-3.3.9-3.3 2 1.3 2 3.3 2 3.3-.9 3.3-2"></path>
            </svg>
          </span>
          <span class="tool-link-content">
            <h3>artbackstage | Geld</h3>
            <p>Finanz-, Angebots- und Fair-Pay-Rechner für die freie Kulturpraxis.</p>
            <p style="margin-top:6px"><a href="yearly_turnover_calculator.php" style="color:var(--accent-dark);font-weight:600;font-size:13px">Neu: Direkt zum Jahresumsatz-Rechner →</a></p>
          </span>
        </a>

        <a class="tool-link" href="index_law.php">
          <span class="tool-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="img" focusable="false">
              <path d="M8 4.5h6l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V6a1.5 1.5 0 0 1 1.5-1.5z"></path><path d="M14 4.5V9h4"></path><path d="M9 13h6"></path><path d="M9 16h4"></path>
            </svg>
          </span>
          <span class="tool-link-content">
            <h3>artbackstage | Recht</h3>
            <p>UrhG-Quiz, Vertrags-Checklisten und Rechtsgrundlagen für in der Kultur Tätige.</p>
          </span>
        </a>

        <a class="tool-link" href="index_soziales.php">
          <span class="tool-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="img" focusable="false">
              <circle cx="12" cy="8.2" r="3"></circle><path d="M5.5 18.8a6.5 6.5 0 0 1 13 0"></path><path d="M12 12.8v5.7"></path>
            </svg>
          </span>
          <span class="tool-link-content">
            <h3>artbackstage | Soziales</h3>
            <p>Soziale Absicherung, Studien und Inforamtionen für Kulturarbeit.</p>
          </span>
        </a>

        <a class="tool-link" href="jitsi_consultation.php">
          <span class="tool-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="img" focusable="false">
              <path d="M15 10l4.553-2.276A1 1 0 0 1 21 8.723v6.554a1 1 0 0 1-1.447.894L15 14v-4z"></path><rect x="3" y="7" width="12" height="10" rx="2"></rect>
            </svg>
          </span>
          <span class="tool-link-content">
            <h3>artbackstage | Videoberatung</h3>
            <p>Live-Beratungsraum für Kunst- und Kulturschaffende direkt im Browser.</p>
          </span>
        </a>
      </div>
    </main>
  </div>
<?php require_once __DIR__ . '/site_footer.php'; render_site_footer(); ?>
</body>
</html>
