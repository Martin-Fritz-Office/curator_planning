<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <?php
    require_once __DIR__ . '/seo_meta.php';
    generate_seo_meta([
      'title' => 'artbackstage – Finanz-, Rechts- und Sozial-Tools für Kulturarbeit',
      'description' => 'Wähle aus drei Bereichen: Finanzen, Urheberrecht und Soziales für freie Kunst- und Kulturpraxis. Kostenlose Rechner und Checklisten für Kuratoren.',
      'lang' => 'de',
      'og_image' => 'https://artbackstage.at/og-image.png',
      'alternate_lang' => 'en',
      'alternate_url' => 'https://artbackstage.at/index_en.php',
      'schema' => get_site_schema('artbackstage', 'Finanz-, Rechts- und Sozial-Tools für Kulturarbeit'),
    ]);
  ?>
  <link rel="icon" type="image/svg+xml" href="favicon.svg" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <a href="#main-content" class="skip-link">Zum Hauptinhalt springen</a>
  <div class="page landing-page">

    <!-- Hero -->
    <div class="landing-hero">
      <!-- Animated satellite & parabolic antenna -->
      <div class="hero-space" aria-hidden="true">
        <!-- Orbiting satellite -->
        <svg class="hero-sat-svg hero-sat-svg--satellite" viewBox="0 0 80 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Left solar panel -->
          <rect x="0" y="9" width="24" height="12" rx="2" fill="currentColor" opacity=".75"/>
          <line x1="8" y1="9" x2="8" y2="21" stroke="white" stroke-width=".8" opacity=".4"/>
          <line x1="16" y1="9" x2="16" y2="21" stroke="white" stroke-width=".8" opacity=".4"/>
          <line x1="0" y1="15" x2="24" y2="15" stroke="white" stroke-width=".8" opacity=".4"/>
          <!-- Body -->
          <rect x="26" y="5" width="28" height="20" rx="3" fill="currentColor"/>
          <!-- Right solar panel -->
          <rect x="56" y="9" width="24" height="12" rx="2" fill="currentColor" opacity=".75"/>
          <line x1="64" y1="9" x2="64" y2="21" stroke="white" stroke-width=".8" opacity=".4"/>
          <line x1="72" y1="9" x2="72" y2="21" stroke="white" stroke-width=".8" opacity=".4"/>
          <line x1="56" y1="15" x2="80" y2="15" stroke="white" stroke-width=".8" opacity=".4"/>
          <!-- Small dish antenna on body -->
          <line x1="40" y1="0" x2="40" y2="5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <circle cx="40" cy="0" r="2" fill="currentColor"/>
        </svg>
        <!-- Parabolic ground antenna -->
        <svg class="hero-sat-svg hero-sat-svg--antenna" viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Dish (parabola opening upper-left, aimed at satellite) -->
          <path d="M6 44 Q2 18 28 8" stroke="currentColor" stroke-width="3" stroke-linecap="round" fill="none"/>
          <!-- Dish rim -->
          <line x1="6" y1="44" x2="28" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity=".5"/>
          <!-- Feed arm to focal point -->
          <line x1="17" y1="26" x2="28" y2="14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          <circle cx="28" cy="14" r="2.5" fill="currentColor"/>
          <!-- Stand pole -->
          <line x1="17" y1="26" x2="17" y2="54" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
          <!-- Base -->
          <line x1="7" y1="56" x2="27" y2="56" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="landing-hero-inner">
        <span class="landing-hero-eyebrow">
          <span class="landing-hero-dot" aria-hidden="true"></span>
          artbackstage · BETA
        </span>
        <h1>Recht, Geld, Soziales</h1>
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
        <a class="tool-link tool-link-geld" href="index_money.php">
          <span class="tool-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="img" focusable="false">
              <circle cx="12" cy="12" r="7.8"></circle><path d="M12 7.8v8.4"></path><path d="M8.7 10.2c0-1.1 1.3-2 3.3-2s3.3.9 3.3 2-1.3 2-3.3 2-3.3.9-3.3 2 1.3 2 3.3 2 3.3-.9 3.3-2"></path>
            </svg>
          </span>
          <span class="tool-link-content">
            <h3>artbackstage | Geld</h3>
            <p>Finanz-, Angebots- und Fair-Pay-Rechner für die freie Kulturpraxis.</p>
          </span>
        </a>

        <a class="tool-link tool-link-recht" href="index_law.php">
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

        <a class="tool-link tool-link-soziales" href="index_soziales.php">
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

        <a class="tool-link tool-link-organisation" href="vereinstipps.php">
          <span class="tool-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="img" focusable="false">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"></path>
            </svg>
          </span>
          <span class="tool-link-content">
            <h3>artbackstage | Organisation</h3>
            <p>50 Tipps für Vereinsvorstände und Organisationsmanagement.</p>
          </span>
        </a>

        <a class="tool-link tool-link-faq" href="faq.php">
          <span class="tool-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="img" focusable="false">
              <circle cx="12" cy="12" r="8.5"></circle><path d="M12 16.5v.5"></path><path d="M12 13.5c0-1.5 2-2 2-3.5a2 2 0 1 0-4 0"></path>
            </svg>
          </span>
          <span class="tool-link-content">
            <h3>artbackstage | FAQ</h3>
            <p>Häufig gestellte Fragen zu Honorar, Recht und sozialer Absicherung.</p>
          </span>
        </a>
      </div>
    </main>
  </div>
<?php require_once __DIR__ . '/site_footer.php'; render_site_footer(); ?>
</body>
</html>
