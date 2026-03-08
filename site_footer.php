<?php

if (!function_exists('render_site_footer')) {
    function render_site_footer(?string $lang = null): void
    {
        $scriptName = basename((string) ($_SERVER['SCRIPT_NAME'] ?? ''));
        $isEnglishPage = $lang === 'en' || ($lang === null && str_contains($scriptName, '_en'));

        if ($isEnglishPage) {
            $ariaLabel = 'Site disclaimer and footnotes';
            $disclaimer = 'The artbackstage tool collection is in ongoing BETA development as part of the teaching assignment “Art in Context (Law, Money and Fairness)” at Kunstuniversität Linz. No personalized data is stored for these scenarios. Partly AI-generated. No liability.';
            $sourcesHref = 'sources_en.php';
            $sourcesLabel = 'Sources';
            $notesTitle = 'Sources &amp; notes';
            $impressumLabel = 'Impressum';
        } else {
            $ariaLabel = 'Seitenhinweis und Fußnoten';
            $disclaimer = 'Die artbackstage Toolsammlung ist in laufender BETA-Entwicklung als Teil des Lehrauftrags „Kunst im Kontext (Recht, Geld und Fairness)” an der Kunstuniversität Linz. Für die Szenarios werden keine personalisierten Daten gespeichert. Teilweise KI-generiert. Keine Haftung.';
            $sourcesHref = 'sources.php';
            $sourcesLabel = 'Quellen';
            $notesTitle = 'Quellen &amp; Hinweise';
            $impressumLabel = 'Impressum';
        }
        $moneyHref = $isEnglishPage ? 'index_money_en.php' : 'index_money.php';
        $lawHref   = 'index_law.php';
        $socialHref = 'index_soziales.php';
        $isMoneyPage  = str_contains($scriptName, 'money') || str_contains($scriptName, 'forecast') || str_contains($scriptName, 'hourly') || str_contains($scriptName, 'freelance') || str_contains($scriptName, 'turnover') || str_contains($scriptName, 'personalplanung') || str_contains($scriptName, 'gallery_contract') || str_contains($scriptName, 'agreement') || str_contains($scriptName, 'honorarium');
        $isLawPage    = str_contains($scriptName, 'law') || str_contains($scriptName, 'vgg') || str_contains($scriptName, 'bildrecht') || str_contains($scriptName, 'fair_use');
        $isSocialPage = str_contains($scriptName, 'soziales') || str_contains($scriptName, 'onace') || str_contains($scriptName, 'gender');
        $hubNavLabel  = $isEnglishPage ? 'artbackstage sections' : 'artbackstage Bereiche';
        $hubMoney     = $isEnglishPage ? 'Money' : 'Geld';
        $hubLaw       = $isEnglishPage ? 'Law' : 'Recht';
        $hubSocial    = $isEnglishPage ? 'Social' : 'Soziales';
        ?>
  <footer class="site-footer unified-site-footer" role="contentinfo" aria-label="<?= htmlspecialchars($ariaLabel, ENT_QUOTES, 'UTF-8') ?>">
    <nav class="hub-nav" aria-label="<?= htmlspecialchars($hubNavLabel, ENT_QUOTES, 'UTF-8') ?>">
      <span class="hub-nav-label">artbackstage</span>
      <a class="hub-nav-link<?= $isMoneyPage ? ' hub-nav-active' : '' ?>" href="<?= htmlspecialchars($moneyHref, ENT_QUOTES, 'UTF-8') ?>"><?= htmlspecialchars($hubMoney, ENT_QUOTES, 'UTF-8') ?></a>
      <a class="hub-nav-link<?= $isLawPage ? ' hub-nav-active' : '' ?>" href="<?= htmlspecialchars($lawHref, ENT_QUOTES, 'UTF-8') ?>"><?= htmlspecialchars($hubLaw, ENT_QUOTES, 'UTF-8') ?></a>
      <a class="hub-nav-link<?= $isSocialPage ? ' hub-nav-active' : '' ?>" href="<?= htmlspecialchars($socialHref, ENT_QUOTES, 'UTF-8') ?>"><?= htmlspecialchars($hubSocial, ENT_QUOTES, 'UTF-8') ?></a>
    </nav>
    <p>
      <?= htmlspecialchars($disclaimer, ENT_QUOTES, 'UTF-8') ?>
      <a href="<?= htmlspecialchars($sourcesHref, ENT_QUOTES, 'UTF-8') ?>"><?= htmlspecialchars($sourcesLabel, ENT_QUOTES, 'UTF-8') ?></a>
      · <a href="impressum.php"><?= htmlspecialchars($impressumLabel, ENT_QUOTES, 'UTF-8') ?></a>
    </p>
    <section class="global-footnotes" id="globalFootnotes" hidden>
      <h2><?= $notesTitle ?></h2>
      <ol id="globalFootnoteList"></ol>
    </section>
  </footer>
  <script defer src="footnotes.js"></script>
        <?php
    }
}
