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
  <a href="#main-content" class="skip-link">Zum Hauptinhalt springen</a>
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
        <?php if (!empty($landingPage['credibility_badge'])): $cb = $landingPage['credibility_badge']; ?>
          <p class="credibility-badge">
            <?= $e($cb['text']) ?> · <a href="<?= $e($cb['sources_href']) ?>"><?= $e($cb['sources_label']) ?></a>
          </p>
        <?php endif; ?>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="<?= $e($landingPage['home']['href']) ?>"><?= $e($landingPage['home']['label']) ?></a>
        <a class="btn btn-outline" href="<?= $e($landingPage['language_switch']['href']) ?>"><?= $e($landingPage['language_switch']['label']) ?></a>
      </div>
    </header>

    <main id="main-content" class="card landing-card">
      <?php if (!empty($landingPage['onboarding_block'])): $ob = $landingPage['onboarding_block']; ?>
        <div class="onboarding-block" role="note">
          <p><?= $e($ob['text']) ?></p>
          <a class="btn-cta" href="<?= $e($ob['cta_href']) ?>"><?= $e($ob['cta_label']) ?></a>
        </div>
      <?php endif; ?>

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

      <?php if (!empty($landingPage['planning_checklist'])): $pc = $landingPage['planning_checklist']; ?>
        <div class="planning-checklist" id="planningChecklist">
          <div class="planning-checklist-head">
            <h3><?= $e($pc['title']) ?></h3>
            <button class="checklist-reset" type="button" id="checklistReset"><?= $e($pc['reset_label']) ?></button>
          </div>
          <div class="planning-checklist-body">
            <?php foreach ($pc['items'] as $item): ?>
              <div class="checklist-item" id="ci_<?= $e($item['id']) ?>">
                <input type="checkbox" id="<?= $e($item['id']) ?>" name="<?= $e($item['id']) ?>" />
                <label for="<?= $e($item['id']) ?>"><a href="<?= $e($item['href']) ?>"><?= $e($item['label']) ?></a></label>
              </div>
            <?php endforeach; ?>
          </div>
        </div>
      <?php endif; ?>

      <div class="card-head">
        <h2><?= $e($landingPage['section_title']) ?></h2>
      </div>
      <?php
        $toolCount = count($landingPage['tools']);
        $toggleLabel = !empty($landingPage['tools_toggle_label']) ? $landingPage['tools_toggle_label'] : "Browse all {$toolCount} tools";
      ?>
      <button class="btn btn-outline tools-toggle-btn" id="toolsToggleBtn" type="button"><?= $e($toggleLabel) ?> &#9660;</button>
      <div class="card-body landing-links tools-hidden" id="landingLinksGrid">
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
