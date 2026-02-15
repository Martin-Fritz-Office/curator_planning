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
  <div class="page">
    <header class="header">
      <div>
        <h1>Personalplanungstool (FAIR PAY 2026)</h1>
        <p class="muted">Zeigt Beschäftigungsgruppen, Tätigkeiten und Beispiele. Ergänze eigene Jobtitel, Wochenstunden und Berufsjahre für die Gehaltsberechnung.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index.php">Startseite</a>
      </div>
    </header>

    <main class="grid">
      <section class="card">
        <div class="card-head">
          <h2>FAIR PAY Gehaltsschema (ab 1.1.2026)</h2>
        </div>
        <div class="card-body">
          <p class="small muted">Mindestbruttogehalt für Vollzeit (14 Gehälter). Vollzeit laut Vorgabe: 38,5 Stunden/Woche. Berechnung für Teilzeit im Tool: Stufengehalt ÷ 38 × tatsächliche Stunden.</p>
          <div class="comparison-table-wrap">
            <table class="comparison-table" id="salaryScaleTable"></table>
          </div>
        </div>
      </section>

      <section class="card">
        <div class="card-head">
          <h2>Beschäftigungsgruppen: Tätigkeiten &amp; Beispiele</h2>
        </div>
        <div class="card-body" id="groupExamples"></div>
      </section>

      <section class="card">
        <div class="card-head">
          <h2>Stelle hinzufügen</h2>
        </div>
        <div class="card-body">
          <div class="qgrid">
            <label class="q">
              <span>Jobtitel (frei wählbar)</span>
              <input id="jobTitle" type="text" placeholder="z. B. Produktionsleitung" />
            </label>
            <label class="q">
              <span>Beschäftigungsgruppe</span>
              <select id="jobGroup"></select>
            </label>
            <label class="q">
              <span>Berufsjahre</span>
              <input id="jobYears" type="number" min="1" step="1" value="1" />
            </label>
            <label class="q">
              <span>Wochenstunden (individuell)</span>
              <input id="jobHours" type="number" min="1" step="0.5" value="38.5" />
            </label>
          </div>
          <div class="footer">
            <button class="btn" id="addJobBtn" type="button">Zur Planung hinzufügen</button>
          </div>
        </div>
      </section>

      <section class="card">
        <div class="card-head">
          <h2>Teamplanung</h2>
        </div>
        <div class="card-body">
          <div class="comparison-table-wrap">
            <table class="comparison-table" id="planTable"></table>
          </div>
          <div class="sheet team-summary" id="teamSummary"></div>
        </div>
      </section>
    </main>
  </div>
</body>
</html>
