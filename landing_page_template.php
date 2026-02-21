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
  <title><?= $e($landingPage['page_title'] ?? 'artbackstage | Money') ?></title>
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
        <h1><?= $e($landingPage['page_title'] ?? 'artbackstage | Money') ?></h1>
        <p class="muted"><?= $e($landingPage['subtitle']) ?></p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="<?= $e($landingPage['home']['href']) ?>"><?= $e($landingPage['home']['label']) ?></a>
        <a class="btn btn-outline" href="<?= $e($landingPage['language_switch']['href']) ?>"><?= $e($landingPage['language_switch']['label']) ?></a>
      </div>
    </header>

    <main class="card landing-card">
      <?php if (!empty($landingPage['story_intro_title']) || !empty($landingPage['story_intro'])): ?>
        <section class="story-intro" aria-labelledby="story-intro-title">
          <?php if (!empty($landingPage['story_intro_title'])): ?>
            <h2 id="story-intro-title"><?= $e($landingPage['story_intro_title']) ?></h2>
          <?php endif; ?>
          <?php if (!empty($landingPage['story_intro'])): ?>
            <p><?= $e($landingPage['story_intro']) ?></p>
          <?php endif; ?>
        </section>
      <?php endif; ?>

      <?php if (!empty($landingPage['situations']) && is_array($landingPage['situations'])): ?>
        <section class="situation-section" aria-labelledby="situation-title">
          <div class="card-head">
            <h2 id="situation-title"><?= $e($landingPage['situations_title'] ?? 'Situations') ?></h2>
          </div>
          <div class="situation-grid">
            <?php foreach ($landingPage['situations'] as $situation): ?>
              <article class="situation-card">
                <span class="tool-icon situation-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="img" focusable="false">
                    <?= $situation['icon'] ?? '' ?>
                  </svg>
                </span>
                <h3><?= $e($situation['title'] ?? '') ?></h3>
                <p><?= $e($situation['description'] ?? '') ?></p>
                <?php if (!empty($situation['tools']) && is_array($situation['tools'])): ?>
                  <ul class="situation-tools">
                    <?php foreach ($situation['tools'] as $situationTool): ?>
                      <li>
                        <a href="<?= $e($situationTool['href'] ?? '#') ?>"><?= $e($situationTool['label'] ?? '') ?></a>
                      </li>
                    <?php endforeach; ?>
                  </ul>
                <?php endif; ?>
              </article>
            <?php endforeach; ?>
          </div>
        </section>
      <?php endif; ?>

      <?php if (!empty($landingPage['guide_steps']) && is_array($landingPage['guide_steps'])): ?>
        <section class="guide-section" aria-labelledby="guide-title">
          <div class="card-head">
            <h2 id="guide-title"><?= $e($landingPage['guide_title'] ?? 'Geführter Ablauf') ?></h2>
          </div>
          <div class="card-body">
            <?php if (!empty($landingPage['guide_intro'])): ?>
              <p class="muted"><?= $e($landingPage['guide_intro']) ?></p>
            <?php endif; ?>
            <div class="beginner-steps">
              <?php foreach ($landingPage['guide_steps'] as $step): ?>
                <article class="beginner-step">
                  <?php if (!empty($step['badge'])): ?><p class="step-badge"><?= $e($step['badge']) ?></p><?php endif; ?>
                  <h3><?= $e($step['title'] ?? '') ?></h3>
                  <p><?= $e($step['description'] ?? '') ?></p>
                  <?php if (!empty($step['tools']) && is_array($step['tools'])): ?>
                    <ul class="situation-tools">
                      <?php foreach ($step['tools'] as $stepTool): ?>
                        <li><a href="<?= $e($stepTool['href'] ?? '#') ?>"><?= $e($stepTool['label'] ?? '') ?></a></li>
                      <?php endforeach; ?>
                    </ul>
                  <?php endif; ?>
                </article>
              <?php endforeach; ?>
            </div>
          </div>
        </section>
      <?php endif; ?>

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
