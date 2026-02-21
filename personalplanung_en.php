<?php
?><!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Staff planning (FAIR PAY 2026)</title>
  <link rel="stylesheet" href="style.css" />
  <script defer src="personalplanung_en.js"></script>
</head>
<body>
  <div class="page planning-wide">
    <header class="header">
      <div>
        <h1>Staff planning tool (alternative view)</h1>
        <p class="muted">Choose the pay scale group on the left, select a sample role, and add your own title and weekly hours. Salaries and annual total costs update instantly.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index_en.php">Home</a>
        <a class="btn btn-outline" href="personalplanung.php">Deutsch</a>
      </div>
    </header>

    <main class="grid planning-grid">
      <section class="card planning-card-wide">
        <div class="card-head">
          <h2>Live planning by pay scale group</h2>
        </div>
        <div class="card-body">
          <p class="small muted">Part-time calculation: stage salary ÷ 38 × weekly hours. Annual total cost: actual monthly salary × 18.01.</p>
          <div class="comparison-table-wrap">
            <table class="comparison-table planning-live-table" id="livePlanTable"></table>
          </div>
          <div class="footer">
            <button class="btn" id="addRowBtn" type="button">Add row</button>
          </div>
          <div class="sheet team-summary" id="teamSummary"></div>
        </div>
      </section>

    </main>
  </div>
  <footer class="site-footer" role="contentinfo">
    Die artbackstage Toolsammlung ist in laufender BETA-Entwicklung als Teil des Lehrauftrags "Kunst im Kontext (Recht, Geld und Fairness) an der Kunstuniversität Linz. Es werden keine personalisierten Daten gespeichert. Teilweise KI generiert. Keine Haftung.
  </footer>
</body>
</html>
