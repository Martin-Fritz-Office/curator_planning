<?php
// Simple single-file entry point. Works on any basic PHP hosting.
?><!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Jahresumsatz- & Gewinnprognose (Curator)</title>
  <link rel="stylesheet" href="style.css" />
  <script defer src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
  <script defer src="calc_core.js"></script>
  <script defer src="app.js"></script>
</head>
<body>
  <div class="page">
    <header class="header">
      <div>
        <h1>Jahresumsatz- & Gewinnprognose (Freelance Curator)</h1>
        <p class="muted">Pie-Charts zeigen Prozentanteile (Tooltip). Werte sind Brutto-Heuristiken.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index.php">Startseite</a>
        <a class="btn btn-outline" href="forecast_en.php">English</a>
        <button id="saveBtn" class="btn" type="button">Antworten speichern</button>
        <input id="scenarioName" class="input-inline" type="text" maxlength="120" placeholder="Szenario-Name" aria-label="Szenario-Name" />
        <div id="saveStatus" class="pill" aria-live="polite">Nicht gespeichert</div>
        <select id="scenarioList" class="input-inline" aria-label="Gespeicherte Szenarien">
          <option value="">Szenario laden …</option>
        </select>
        <button id="loadScenarioBtn" class="btn btn-outline" type="button">Laden</button>
        <div class="pill">Typ: <span id="typologyLabel" class="pill-strong">–</span></div>
        <div class="pill">Median verfügbares Einkommen: <span id="medianAvailableIncome" class="pill-strong">lädt …</span></div>
        <button id="resetBtn" class="btn btn-outline" type="button">Reset</button>
      </div>
    </header>

    <main class="grid">
      <section class="card">
        <div class="card-head">
          <h2>Fragebogen</h2>
        </div>
        <div class="card-body">
          <div id="questionGrid" class="qgrid"></div>

          <hr class="sep" />

          <p class="small muted">
            Kurzlogik: Projekte×Honorar (mit Stabilitätsfaktor) + Texte + Beratung + Förderungen = Umsatz. Unterstützung und Nettoeinkommen aus der Anstellung werden erst beim verfügbaren Jahreseinkommen addiert.
            Fixkosten + variable Projektkosten (Reiseanteil) + SV/Vorsorge (26% vom Gewinn vor Steuern) + Einkommensteuer Österreich (Tarif 2025: 0–13.308 € 0%, 13.309–21.617 € 20%, 21.618–35.836 € 30%, 35.837–69.166 € 40%, 69.167–103.072 € 48%, 103.073–1 Mio. € 50%, über 1 Mio. € 55%) = Kosten.
            Rücklagenquote hängt am Risikoprofil.
          </p>
        </div>
      </section>

      <section class="stack">
        <section class="card">
          <div class="card-head">
            <h2>Prognose (Sheet)</h2>
          </div>
          <div class="card-body">
            <div class="sheet" id="sheet"></div>
          </div>
        </section>

        <section class="card" id="scenarioComparison">
          <div class="card-head">
            <h2>Szenariovergleich</h2>
          </div>
          <div class="card-body">
            <p class="small muted">Hinweis: Der Vergleich erscheint hier, sobald mindestens ein Szenario gespeichert wurde.</p>
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
              <p id="compareEmpty" class="small muted">Speichere Szenarien und wähle eine oder mehrere Varianten, um sie mit deinem aktuellen Entwurf zu vergleichen.</p>
            </div>
          </div>
        </section>

        <section class="grid2">
          <section class="card">
            <div class="card-head">
              <h2>Einkommensquellen (Pie)</h2>
            </div>
            <div class="card-body">
              <div class="chartBox">
                <canvas id="incomeChart"></canvas>
              </div>
              <div id="incomeEmpty" class="muted small" style="display:none">Keine Einkommensdaten.</div>
            </div>
          </section>

          <section class="card">
            <div class="card-head">
              <h2>Kostenstruktur (Pie)</h2>
            </div>
            <div class="card-body">
              <div class="chartBox">
                <canvas id="costChart"></canvas>
              </div>
              <div id="costEmpty" class="muted small" style="display:none">Keine Kostendaten.</div>
            </div>
          </section>
        </section>
      </section>
    </main>

    <footer class="footer small muted">
      Hinweis: Dieses Tool ist eine vereinfachte Heuristik und ersetzt keine Steuer-/Sozialversicherungsberatung.
    </footer>
  </div>
<?php require_once __DIR__ . '/site_footer.php'; render_site_footer(); ?>
</body>
</html>
