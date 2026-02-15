<?php
?><!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Freelance-Service-Rechner</title>
  <link rel="stylesheet" href="style.css" />
  <script defer src="freelance_services_calculator.js"></script>
</head>
<body>
  <div class="page">
    <header class="header">
      <div>
        <h1>Freelance-Service-Rechner</h1>
        <p class="muted">Wähle Tätigkeiten, trage Stunden ein und exportiere die Kosten als CSV.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index.php">Startseite</a>
      </div>
    </header>

    <main class="grid">
      <section class="card">
        <div class="card-head">
          <h2>Leistungen auswählen</h2>
        </div>
        <div class="card-body">
          <div class="qgrid">
            <label class="q">
              <span>Kategorie / Gruppe</span>
              <select id="serviceCategory"></select>
            </label>
          </div>
          <hr class="sep" />
          <div id="serviceList" class="sheet"></div>
        </div>
      </section>

      <section class="card">
        <div class="card-head">
          <h2>Ergebnis</h2>
        </div>
        <div class="card-body">
          <div class="comparison-table-wrap">
            <table class="comparison-table" id="resultTable">
              <thead>
                <tr>
                  <th>Leistung</th>
                  <th>Gruppe</th>
                  <th>Stunden</th>
                  <th>Stundensatz (€)</th>
                  <th>Gesamt (€)</th>
                </tr>
              </thead>
              <tbody></tbody>
              <tfoot>
                <tr>
                  <th colspan="4">Summe aller Services</th>
                  <th id="grandTotal">0,00</th>
                </tr>
              </tfoot>
            </table>
          </div>
          <div class="footer">
            <button class="btn" id="downloadCsvBtn" type="button">CSV downloaden</button>
          </div>
          <p class="small muted">Richtwerte: Euro exkl. USt. aus dem Fair-Pay-Schema für Kulturarbeit; die vorgeschlagenen Stundensätze sind als Mittelwert der jeweiligen Bandbreite vorbelegt und anpassbar.</p>
        </div>
      </section>
    </main>
  </div>
</body>
</html>
