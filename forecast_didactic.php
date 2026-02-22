<?php
?><!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Prognose (Didaktisches Layout) | Curator</title>
  <link rel="stylesheet" href="style.css" />
  <script defer src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
  <script defer src="calc_core.js"></script>
  <script defer src="app.js"></script>
</head>
<body>
  <div class="page didactic-page">
    <header class="header didactic-header">
      <div>
        <h1>Jahresumsatz- & Gewinnprognose (Didaktisches Layout)</h1>
        <p class="muted">Gleiche Berechnungslogik wie im Standard-Tool, aber mit geführter Reihenfolge und vereinfachter Oberfläche.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index.php">Startseite</a>
        <a class="btn btn-outline" href="forecast_en_didactic.php">English</a>
      </div>
    </header>

    <main class="didactic-main">
      <section class="card didactic-intro">
        <div class="card-head"><h2>So nutzt du diese Version</h2></div>
        <div class="card-body didactic-steps">
          <article><strong>1) Fragen beantworten</strong><p class="small muted">Der Fragebogen ist in Themenblöcke gruppiert. Eine Antwort pro Frage reicht.</p></article>
          <article><strong>2) Ergebnis lesen</strong><p class="small muted">Rechts siehst du sofort Umsatz, Kosten, verfügbares Einkommen und Gap.</p></article>
          <article><strong>3) Szenarien speichern</strong><p class="small muted">Speichere Varianten mit Namen und vergleiche sie später nebeneinander.</p></article>
        </div>
      </section>

      <section class="card didactic-controls">
        <div class="card-head"><h2>Szenario speichern & laden</h2></div>
        <div class="card-body">
          <div class="header-actions didactic-toolbar">
            <button id="saveBtn" class="btn" type="button">Antworten speichern</button>
            <input id="scenarioName" class="input-inline" type="text" maxlength="120" placeholder="Szenario-Name" aria-label="Szenario-Name" />
            <div id="saveStatus" class="pill" aria-live="polite">Nicht gespeichert</div>
            <select id="scenarioList" class="input-inline" aria-label="Gespeicherte Szenarien">
              <option value="">Szenario laden …</option>
            </select>
            <button id="loadScenarioBtn" class="btn btn-outline" type="button">Laden</button>
            <button id="resetBtn" class="btn btn-outline" type="button">Reset</button>
            <div class="pill">Typ: <span id="typologyLabel" class="pill-strong">–</span></div>
            <div class="pill">Median verfügbares Einkommen: <span id="medianAvailableIncome" class="pill-strong">lädt …</span></div>
          </div>
        </div>
      </section>

      <section class="didactic-layout">
        <section class="card">
          <div class="card-head"><h2>1. Fragebogen</h2></div>
          <div class="card-body">
            <div id="questionGrid" class="qgrid"></div>
          </div>
        </section>

        <section class="stack">
          <section class="card">
            <div class="card-head"><h2>2. Prognose-Ergebnis</h2></div>
            <div class="card-body">
              <div class="sheet" id="sheet"></div>
            </div>
          </section>

          <section class="grid2">
            <section class="card">
              <div class="card-head"><h2>Einkommensquellen (Pie)</h2></div>
              <div class="card-body">
                <div class="chartBox"><canvas id="incomeChart"></canvas></div>
                <div id="incomeEmpty" class="muted small" style="display:none">Keine Einkommensdaten.</div>
              </div>
            </section>
            <section class="card">
              <div class="card-head"><h2>Kostenstruktur (Pie)</h2></div>
              <div class="card-body">
                <div class="chartBox"><canvas id="costChart"></canvas></div>
                <div id="costEmpty" class="muted small" style="display:none">Keine Kostendaten.</div>
              </div>
            </section>
          </section>
        </section>
      </section>

      <section class="card">
        <div class="card-head"><h2>3. Szenariovergleich</h2></div>
        <div class="card-body">
          <p class="small muted">Wähle ein oder mehrere gespeicherte Szenarien. Die aktuelle Eingabe wird immer als Referenz gezeigt.</p>
          <div class="comparison-controls">
            <select id="compareScenarioList" class="input-inline" aria-label="Szenarien für Vergleich auswählen" multiple size="5"></select>
            <div class="comparison-actions">
              <button id="compareSelectedBtn" class="btn btn-outline" type="button">Auswahl vergleichen</button>
              <button id="clearCompareBtn" class="btn btn-outline" type="button">Leeren</button>
            </div>
          </div>
          <div class="comparison-table-wrap">
            <table class="comparison-table" id="comparisonTable">
              <thead>
                <tr>
                  <th>Szenario</th>
                  <th>Verfügbares Einkommen</th>
                  <th>Δ vs aktuell</th>
                  <th>Gap</th>
                  <th>Umsatz</th>
                  <th>Gewinn nach Steuer</th>
                  <th>Typ</th>
                </tr>
              </thead>
              <tbody id="compareTableBody"></tbody>
            </table>
            <p id="compareEmpty" class="small muted">Speichere Szenarien und vergleiche sie mit deinem aktuellen Entwurf.</p>
          </div>
        </div>
      </section>
    </main>
  </div>
<?php require_once __DIR__ . '/site_footer.php'; render_site_footer(); ?>
</body>
</html>
