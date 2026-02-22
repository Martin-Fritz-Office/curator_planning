<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>artbackstage</title>
  <link rel="icon" type="image/svg+xml" href="favicon.svg" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="page landing-page">
    <header class="header landing-header">
      <div>
        <p class="eyebrow brand-mark">artbackstage</p>
        <h1>Wähle deinen Einstieg</h1>
        <p class="muted">Ein Werkzeugkasten: Finanzen, Urheberrecht und Soziales für Kunst- und Kulturpraxis.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index_en.php" lang="en">English</a>
      </div>
    </header>

    <main class="card landing-card">
      <section class="story-intro" aria-labelledby="areas-title">
        <h2 id="areas-title">Bereiche</h2>
        <p>Wähle den Bereich, mit dem du starten möchtest.</p>
      </section>

      <div class="card-body landing-links">
        <a class="tool-link" href="index_money.php">
          <span class="tool-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="img" focusable="false">
              <circle cx="12" cy="12" r="7.8"></circle><path d="M12 7.8v8.4"></path><path d="M8.7 10.2c0-1.1 1.3-2 3.3-2s3.3.9 3.3 2-1.3 2-3.3 2-3.3.9-3.3 2 1.3 2 3.3 2 3.3-.9 3.3-2"></path>
            </svg>
          </span>
          <span class="tool-link-content">
            <h3>artbackstage | Money</h3>
            <p>Landingpage mit allen Finanz-, Angebots- und Fair-Pay-Rechnern.</p>
          </span>
        </a>

        <a class="tool-link" href="index_law.php">
          <span class="tool-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="img" focusable="false">
              <path d="M8 4.5h6l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V6a1.5 1.5 0 0 1 1.5-1.5z"></path><path d="M14 4.5V9h4"></path><path d="M9 13h6"></path><path d="M9 16h4"></path>
            </svg>
          </span>
          <span class="tool-link-content">
            <h3>artbackstage | Law</h3>
            <p>Landingpage mit Einstieg ins UrhG-Quiz und Rechtsgrundlagen.</p>
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
            <p>Landingpage mit Story-Einstieg zu sozialer Absicherung, Einkommen und Fair-Pay-Planung.</p>
          </span>
        </a>
      </div>
    </main>
  </div>
<?php require_once __DIR__ . '/site_footer.php'; render_site_footer(); ?>
</body>
</html>
