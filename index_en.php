<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <?php
    require_once __DIR__ . '/seo_meta.php';
    generate_seo_meta([
      'title' => 'artbackstage – Money, Law & Social Tools for Cultural Practitioners',
      'description' => 'Choose from three sections: financial planning, copyright basics, and social security for independent artists and curators. Free calculators and checklists.',
      'lang' => 'en',
      'og_image' => 'https://artbackstage.at/og-image.png',
      'alternate_lang' => 'de',
      'alternate_url' => 'https://artbackstage.at/index.php',
      'schema' => get_site_schema('artbackstage', 'Money, Law & Social Tools for Cultural Practitioners'),
    ]);
  ?>
  <link rel="icon" type="image/svg+xml" href="favicon.svg" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <div class="page landing-page">
    <header class="header landing-header">
      <div>
        <p class="eyebrow brand-mark">artbackstage</p>
        <h1>Choose your starting point</h1>
        <p class="muted">Three sections, one toolbox: money, law, and social topics for artistic and cultural practice.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index.php" lang="de">Deutsch</a>
      </div>
    </header>

    <main id="main-content" class="card landing-card">
      <section class="story-intro" aria-labelledby="areas-title">
        <h2 id="areas-title">Sections</h2>
        <p>Select the section you would like to explore first.</p>
      </section>

      <div class="card-body landing-links">
        <a class="tool-link" href="index_money_en.php">
          <span class="tool-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="img" focusable="false">
              <circle cx="12" cy="12" r="7.8"></circle><path d="M12 7.8v8.4"></path><path d="M8.7 10.2c0-1.1 1.3-2 3.3-2s3.3.9 3.3 2-1.3 2-3.3 2-3.3.9-3.3 2 1.3 2 3.3 2 3.3-.9 3.3-2"></path>
            </svg>
          </span>
          <span class="tool-link-content">
            <h3>artbackstage | Money</h3>
            <p>Overview page for budgeting, pricing, and fair-pay calculators.</p>
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
            <p>Overview page for copyright basics and legal support tools.</p>
          </span>
        </a>

        <a class="tool-link" href="index_soziales_en.php">
          <span class="tool-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="img" focusable="false">
              <circle cx="12" cy="8.2" r="3"></circle><path d="M5.5 18.8a6.5 6.5 0 0 1 13 0"></path><path d="M12 12.8v5.7"></path>
            </svg>
          </span>
          <span class="tool-link-content">
            <h3>artbackstage | Social</h3>
            <p>Overview page with scenario-based guidance on social security, income, and fair-pay planning.</p>
          </span>
        </a>

        <a class="tool-link tool-link-faq" href="faq_en.php">
          <span class="tool-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="img" focusable="false">
              <circle cx="12" cy="12" r="8.5"></circle><path d="M12 16.5v.5"></path><path d="M12 13.5c0-1.5 2-2 2-3.5a2 2 0 1 0-4 0"></path>
            </svg>
          </span>
          <span class="tool-link-content">
            <h3>artbackstage | FAQ</h3>
            <p>Frequently asked questions on fees, law, and social security for cultural practitioners.</p>
          </span>
        </a>
      </div>
    </main>
  </div>
<?php require_once __DIR__ . '/site_footer.php'; render_site_footer(); ?>
</body>
</html>
