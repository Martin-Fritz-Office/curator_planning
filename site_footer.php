<?php

if (!function_exists('render_site_footer')) {
    function render_site_footer(): void
    {
        ?>
  <footer class="site-footer unified-site-footer" role="contentinfo" aria-label="Site disclaimer and footnotes">
    <p>
      Die artbackstage Toolsammlung ist in laufender BETA-Entwicklung als Teil des Lehrauftrags „Kunst im Kontext (Recht, Geld und Fairness)“ an der Kunstuniversität Linz.
      Für die Szenarios werden keine personalisierten Daten gespeichert. Teilweise KI-generiert. Keine Haftung. 
    </p>
    <section class="global-footnotes" id="globalFootnotes" hidden>
      <h2>Sources &amp; notes</h2>
      <ol id="globalFootnoteList"></ol>
    </section>
  </footer>
  <script defer src="footnotes.js"></script>
        <?php
    }
}
