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
      <!-- Animated birds -->
      <div class="hero-bird" aria-hidden="true">
        <!-- Main swallow -->
        <svg class="hero-bird-svg hero-bird-svg--main" viewBox="0 0 60 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- upper wings -->
          <path class="wing-top" d="M30 14 C24 8, 14 5, 2 9 C10 11, 17 13, 22 14 C17 12, 10 9, 2 9" fill="currentColor"/>
          <path class="wing-top" d="M30 14 C36 8, 46 5, 58 9 C50 11, 43 13, 38 14 C43 12, 50 9, 58 9" fill="currentColor"/>
          <!-- body -->
          <ellipse cx="30" cy="14.5" rx="4" ry="2.5" fill="currentColor"/>
          <!-- tail fork -->
          <path class="wing-bottom" d="M27 16 C24 20, 20 24, 16 28" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>
          <path class="wing-bottom" d="M33 16 C36 20, 40 24, 44 28" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>
        </svg>
        <!-- Small companion bird -->
        <svg class="hero-bird-svg hero-bird-svg--small" viewBox="0 0 60 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="wing-top" d="M30 14 C24 8, 14 5, 2 9 C10 11, 17 13, 22 14 C17 12, 10 9, 2 9" fill="currentColor"/>
          <path class="wing-top" d="M30 14 C36 8, 46 5, 58 9 C50 11, 43 13, 38 14 C43 12, 50 9, 58 9" fill="currentColor"/>
          <ellipse cx="30" cy="14.5" rx="4" ry="2.5" fill="currentColor"/>
          <path class="wing-bottom" d="M27 16 C24 20, 20 24, 16 28" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>
          <path class="wing-bottom" d="M33 16 C36 20, 40 24, 44 28" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>
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
