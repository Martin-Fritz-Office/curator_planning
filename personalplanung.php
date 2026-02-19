<?php
?><!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Personalplanung (FAIR PAY 2026)</title>
  <link rel="stylesheet" href="style.css" />
  <script defer src="personalplanung.js"></script>
</head>
<body>
  <div class="page planning-wide">
    <header class="header">
      <div>
        <h1>Personalplanungstool (Alternative Ansicht)</h1>
        <p class="muted">Beschäftigungsgruppe links wählen, Funktion aus Beispielen auswählen, eigenen Titel und Stunden ergänzen – Gehälter und Jahresgesamtkosten werden sofort berechnet.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index.php">Startseite</a>
      </div>
    </header>

    <main class="grid planning-grid">
      <section class="card planning-card-wide">
        <div class="card-head">
          <h2>Live-Planung nach Beschäftigungsgruppe</h2>
        </div>
        <div class="card-body">
          <p class="small muted">Teilzeitberechnung: Stufengehalt ÷ 38 × Wochenstunden. Jahresgesamtkosten: Ist-Monatsgehalt × 18,01.</p>
          <div class="comparison-table-wrap">
            <table class="comparison-table planning-live-table" id="livePlanTable"></table>
          </div>
          <div class="footer">
            <button class="btn" id="addRowBtn" type="button">Zeile hinzufügen</button>
          </div>
          <div class="sheet team-summary" id="teamSummary"></div>
        </div>
      </section>

    </main>
  </div>
  <footer class="site-footer" role="contentinfo">
    Die artbackstage Toolsammlung ist in laufender BETA-Entwicklung als Teil des Lehrauftrags "Kunst im Kontext (Recht, Geld und Fairness) an der Kunstuniversität Linz. Es werden keine personalisierten Daten gespeichert.
  </footer>
</body>
</html>
