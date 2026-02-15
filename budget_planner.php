<?php
?><!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Budget- & Personalplaner</title>
  <link rel="stylesheet" href="style.css" />
  <script defer src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
  <script defer src="app_budget.js"></script>
</head>
<body>
  <div class="page">
    <header class="header">
      <div>
        <h1>Budget- & Personalplaner</h1>
        <p class="muted">Neues Tool für Raum-, Personal- und Szenario-Planung.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index.php">Startseite</a>
        <button id="btnSave" class="btn" type="button">Speichern</button>
        <button id="btnLoad" class="btn btn-outline" type="button">Laden</button>
        <button id="btnCsv" class="btn btn-outline" type="button">CSV Export</button>
        <button id="btnCsvPersonalplanung" class="btn btn-outline" type="button">CSV Personalplanung</button>
        <button id="btnReset" class="btn btn-outline" type="button">Reset</button>
      </div>
    </header>

    <main class="grid">
      <section class="card">
        <div class="card-head"><h2>Kosten</h2></div>
        <div class="card-body">
          <div id="costQuestions" class="qgrid"></div>
        </div>
      </section>

      <section class="card">
        <div class="card-head"><h2>Zukunftsparameter</h2></div>
        <div class="card-body">
          <div id="futureCostQuestions" class="qgrid"></div>
        </div>
      </section>

      <section class="card">
        <div class="card-head"><h2>Einnahmen</h2></div>
        <div class="card-body">
          <div id="revQuestions" class="qgrid"></div>
        </div>
      </section>

      <section class="card">
        <div class="card-head"><h2>Personalplanung</h2></div>
        <div class="card-body">
          <div class="row" style="display:flex; gap:8px; align-items:end; margin-bottom:12px;">
            <div>
              <div class="label">Voreinstellung Funktion</div>
              <select id="staffFunctionPreset" class="select"></select>
            </div>
            <div>
              <div class="label">Dienstgeber*innen-Faktor</div>
              <input id="dgFactor" class="input" inputmode="decimal" value="1,35" />
            </div>
            <button id="btnAddStaff" class="btn" type="button">Stelle hinzufügen</button>
          </div>
          <div id="staffList"></div>
          <div class="sumrow" style="margin-top:12px;"><span>Personal gesamt</span><strong id="staffTotal">0 €</strong></div>
        </div>
      </section>

      <section class="card">
        <div class="card-head"><h2>Ergebnis</h2></div>
        <div class="card-body">
          <div class="sumrow"><span>Gesamtkosten</span><strong id="totalCosts">0 €</strong></div>
          <div class="sumrow"><span>Personalkosten</span><strong id="totalStaff">0 €</strong></div>
          <div class="sumrow"><span>Gesamteinnahmen</span><strong id="totalRevs">0 €</strong></div>
          <div class="sumrow"><span id="netLabel">Saldo</span><strong id="netValue">0 €</strong></div>
          <p id="publicShare" class="small muted">Öffentlicher Anteil: 0%</p>

          <hr class="sep" />
          <div class="sumrow"><span>Tickets</span><strong id="revTickets">0 €</strong></div>
          <div class="sumrow"><span>Basisförderung</span><strong id="revBase">0 €</strong></div>
          <div class="sumrow"><span>Projektförderung</span><strong id="revProject">0 €</strong></div>
          <div class="sumrow"><span>Sponsoring/Spenden</span><strong id="revSpons">0 €</strong></div>
          <div class="sumrow"><span>Bar/Gastro</span><strong id="revBar">0 €</strong></div>
          <div class="sumrow"><span>Raumvermietung</span><strong id="revSpace">0 €</strong></div>
        </div>
      </section>

      <section class="card">
        <div class="card-head"><h2>Kostenaufschlüsselung</h2></div>
        <div class="card-body">
          <div id="costBreakdown"></div>
          <div class="chartBox" style="margin-top:16px;"><canvas id="pie"></canvas></div>
        </div>
      </section>
    </main>
  </div>
</body>
</html>
