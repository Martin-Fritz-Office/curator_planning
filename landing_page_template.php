<?php
if (!isset($landingPage) || !is_array($landingPage)) {
  throw new RuntimeException('Missing $landingPage configuration.');
}

require_once __DIR__ . '/seo_meta.php';

$e = static fn(string $value): string => htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
?><!doctype html>
<html lang="<?= $e($landingPage['lang']) ?>">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <?php
    $seo_config = [
      'title' => $landingPage['page_title'] ?? 'artbackstage',
      'description' => $landingPage['meta_description'] ?? '',
      'lang' => $landingPage['lang'] ?? 'en',
      'og_image' => 'https://artbackstage.at/og-image.png',
      'alternate_lang' => $landingPage['alternate_lang'] ?? null,
      'alternate_url' => $landingPage['alternate_url'] ?? null,
      'schema' => !empty($landingPage['schema']) ? $landingPage['schema'] : get_site_schema(),
    ];
    generate_seo_meta($seo_config);
  ?>
  <link rel="icon" type="image/svg+xml" href="favicon.svg" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <a href="#main-content" class="skip-link">Zum Hauptinhalt springen</a>
  <div class="page landing-page<?= !empty($landingPage['section_theme']) ? ' theme-'.$e($landingPage['section_theme']) : '' ?>">
    <div class="landing-hero">
      <div class="landing-hero-inner">
        <span class="landing-hero-eyebrow">
          <span class="landing-hero-dot" aria-hidden="true"></span>
          artbackstage · BETA
        </span>
        <h1><?= $e($landingPage['page_title'] ?? 'artbackstage | Money') ?></h1>
        <p><?= $e($landingPage['subtitle']) ?></p>
        <div class="landing-hero-actions">
          <a class="btn btn-hero-ghost" href="<?= $e($landingPage['home']['href']) ?>"><?= $e($landingPage['home']['label']) ?></a>
          <a class="btn btn-hero-ghost" href="<?= $e($landingPage['language_switch']['href']) ?>"><?= $e($landingPage['language_switch']['label']) ?></a>
        </div>
      </div>
    </div>

    <main>
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
          <div class="landing-section-header">
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
        <section aria-labelledby="guide-title" style="margin-bottom:28px">
          <div class="landing-section-header">
            <h2 id="guide-title"><?= $e($landingPage['guide_title'] ?? 'Geführter Ablauf') ?></h2>
            <?php if (!empty($landingPage['guide_intro'])): ?>
              <p><?= $e($landingPage['guide_intro']) ?></p>
            <?php endif; ?>
          </div>
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
        </section>
      <?php endif; ?>

      <div class="landing-section-header">
        <h2><?= $e($landingPage['section_title']) ?></h2>
      </div>
      <div class="landing-links">
        <?php foreach ($landingPage['tools'] as $tool): ?>
          <a class="tool-link<?= !empty($landingPage['section_theme']) ? ' tool-link-'.$e($landingPage['section_theme']) : '' ?><?= !empty($tool['highlight']) ? ' tool-link-highlight' : '' ?>" href="<?= $e($tool['href']) ?>">
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
<?php require_once __DIR__ . '/site_footer.php'; render_site_footer(); ?>
<?php if (!empty($landingPage['planning_checklist'])): ?>
<script>
(function(){
  var items = <?= json_encode(array_column($landingPage['planning_checklist']['items'], 'id')) ?>;
  var KEY = 'artbackstage_checklist';
  function load(){ try{ return JSON.parse(localStorage.getItem(KEY)||'{}'); }catch(e){ return {}; } }
  function save(state){ try{ localStorage.setItem(KEY, JSON.stringify(state)); }catch(e){} }
  function apply(){
    var state = load();
    items.forEach(function(id){
      var cb = document.getElementById(id);
      var ci = document.getElementById('ci_'+id);
      if(!cb||!ci) return;
      cb.checked = !!state[id];
      ci.classList.toggle('done', !!state[id]);
    });
  }
  apply();
  items.forEach(function(id){
    var cb = document.getElementById(id);
    if(!cb) return;
    cb.addEventListener('change', function(){
      var state = load(); state[id] = cb.checked; save(state);
      var ci = document.getElementById('ci_'+id);
      if(ci) ci.classList.toggle('done', cb.checked);
    });
  });
  var reset = document.getElementById('checklistReset');
  if(reset) reset.addEventListener('click', function(){ save({}); apply(); });
})();
</script>
<?php endif; ?>
<script>
(function(){
  var btn = document.getElementById('toolsToggleBtn');
  var grid = document.getElementById('landingLinksGrid');
  if(!btn||!grid) return;
  var showLabel = btn.textContent;
  var hideLabel = btn.textContent.replace('\u25bc', '\u25b2').replace('Browse all', 'Hide');
  btn.addEventListener('click', function(){
    var hidden = grid.classList.toggle('tools-hidden');
    btn.innerHTML = (hidden ? showLabel : hideLabel);
  });
})();
</script>
</body>
</html>
