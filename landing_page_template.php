<?php
if (!isset($landingPage) || !is_array($landingPage)) {
  throw new RuntimeException('Missing $landingPage configuration.');
}

$e = static fn(string $value): string => htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
?><!doctype html>
<html lang="<?= $e($landingPage['lang']) ?>">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>artbackstage | Money</title>
  <link rel="icon" type="image/svg+xml" href="favicon.svg" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="page landing-page">
    <header class="header landing-header">
      <div>
        <p class="eyebrow brand-mark">
          <span class="brand-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="img" focusable="false">
              <rect x="2.5" y="2.5" width="19" height="19" rx="5"></rect>
              <circle cx="9" cy="9" r="1.6"></circle>
              <path d="M5.8 17.3h12.4l-4.1-4.7-2.8 2.9-2-2.1z"></path>
            </svg>
          </span>
          <span>artbackstage</span>
        </p>
        <h1>artbackstage | Money</h1>
        <p class="muted"><?= $e($landingPage['subtitle']) ?></p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="<?= $e($landingPage['language_switch']['href']) ?>"><?= $e($landingPage['language_switch']['label']) ?></a>
        <a class="btn" href="<?= $e($landingPage['primary_cta']['href']) ?>"><?= $e($landingPage['primary_cta']['label']) ?></a>
        <a class="btn btn-outline" href="<?= $e($landingPage['secondary_cta']['href']) ?>"><?= $e($landingPage['secondary_cta']['label']) ?></a>
      </div>
    </header>

    <main class="card landing-card">
      <div class="card-head">
        <h2><?= $e($landingPage['section_title']) ?></h2>
      </div>
      <div class="card-body landing-links">
        <?php foreach ($landingPage['tools'] as $tool): ?>
          <a class="tool-link<?= !empty($tool['highlight']) ? ' tool-link-highlight' : '' ?>" href="<?= $e($tool['href']) ?>">
            <span class="tool-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="img" focusable="false">
                <?= $tool['icon'] ?>
              </svg>
            </span>
            <span class="tool-link-content">
              <h3><?= $e($tool['title']) ?></h3>
              <p><?= $e($tool['description']) ?></p>
            </span>
          </a>
        <?php endforeach; ?>
      </div>
    </main>
  </div>
  <footer class="site-footer" role="contentinfo">
    <?= $e($landingPage['footer']) ?>
  </footer>
</body>
</html>
