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
        } else {
            $ariaLabel = 'Seitenhinweis und Fußnoten';
            $disclaimer = 'Die artbackstage Toolsammlung ist in laufender BETA-Entwicklung als Teil des Lehrauftrags „Kunst im Kontext (Recht, Geld und Fairness)“ an der Kunstuniversität Linz. Für die Szenarios werden keine personalisierten Daten gespeichert. Teilweise KI-generiert. Keine Haftung.';
            $sourcesHref = 'sources.php';
            $sourcesLabel = 'Quellen';
            $notesTitle = 'Quellen &amp; Hinweise';
        }
        ?>
  <footer class="site-footer unified-site-footer" role="contentinfo" aria-label="<?= htmlspecialchars($ariaLabel, ENT_QUOTES, 'UTF-8') ?>">
    <p>
      <?= htmlspecialchars($disclaimer, ENT_QUOTES, 'UTF-8') ?>
      <a href="<?= htmlspecialchars($sourcesHref, ENT_QUOTES, 'UTF-8') ?>"><?= htmlspecialchars($sourcesLabel, ENT_QUOTES, 'UTF-8') ?></a>
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
