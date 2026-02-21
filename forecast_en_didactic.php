<?php
?><!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Forecast (Didactic Layout) | Curator</title>
  <link rel="stylesheet" href="style.css" />
  <script defer src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
  <script defer src="calc_core.js"></script>
  <script defer src="app_en.js"></script>
</head>
<body>
  <div class="page didactic-page">
    <header class="header didactic-header">
      <div>
        <h1>Annual Revenue & Profit Forecast (Didactic Layout)</h1>
        <p class="muted">Same calculation logic as the standard tool, with a guided flow and easier-to-read interface.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index_en.php">Home</a>
        <a class="btn btn-outline" href="forecast_didactic.php">Deutsch</a>
      </div>
    </header>

    <main class="didactic-main">
      <section class="card didactic-intro">
        <div class="card-head"><h2>How to use this version</h2></div>
        <div class="card-body didactic-steps">
          <article><strong>1) Answer the questions</strong><p class="small muted">Questions are grouped by topic. One answer per question is enough.</p></article>
          <article><strong>2) Read the result</strong><p class="small muted">The right side shows revenue, cost, available income, and gap immediately.</p></article>
          <article><strong>3) Save scenarios</strong><p class="small muted">Store alternatives with names and compare them side by side later.</p></article>
        </div>
      </section>

      <section class="card didactic-controls">
        <div class="card-head"><h2>Save & load scenarios</h2></div>
        <div class="card-body">
          <div class="header-actions didactic-toolbar">
            <button id="saveBtn" class="btn" type="button">Save responses</button>
            <input id="scenarioName" class="input-inline" type="text" maxlength="120" placeholder="Scenario name" aria-label="Scenario name" />
            <div id="saveStatus" class="pill" aria-live="polite">Not saved</div>
            <select id="scenarioList" class="input-inline" aria-label="Saved scenarios">
              <option value="">Load scenario …</option>
            </select>
            <button id="loadScenarioBtn" class="btn btn-outline" type="button">Load</button>
            <button id="resetBtn" class="btn btn-outline" type="button">Reset</button>
            <div class="pill">Type: <span id="typologyLabel" class="pill-strong">–</span></div>
            <div class="pill">Median available income: <span id="medianAvailableIncome" class="pill-strong">loading …</span></div>
          </div>
        </div>
      </section>

      <section class="didactic-layout">
        <section class="card">
          <div class="card-head"><h2>1. Questionnaire</h2></div>
          <div class="card-body">
            <div id="questionGrid" class="qgrid"></div>
          </div>
        </section>

        <section class="stack">
          <section class="card">
            <div class="card-head"><h2>2. Forecast result</h2></div>
            <div class="card-body">
              <div class="sheet" id="sheet"></div>
            </div>
          </section>

          <section class="grid2">
            <section class="card">
              <div class="card-head"><h2>Income Sources (Pie)</h2></div>
              <div class="card-body">
                <div class="chartBox"><canvas id="incomeChart"></canvas></div>
                <div id="incomeEmpty" class="muted small" style="display:none">No income data.</div>
              </div>
            </section>
            <section class="card">
              <div class="card-head"><h2>Cost Structure (Pie)</h2></div>
              <div class="card-body">
                <div class="chartBox"><canvas id="costChart"></canvas></div>
                <div id="costEmpty" class="muted small" style="display:none">No cost data.</div>
              </div>
            </section>
          </section>
        </section>
      </section>

      <section class="card">
        <div class="card-head"><h2>3. Scenario comparison</h2></div>
        <div class="card-body">
          <p class="small muted">Pick one or more saved scenarios. Your current draft is always shown as the baseline.</p>
          <div class="comparison-controls">
            <select id="compareScenarioList" class="input-inline" aria-label="Choose scenarios for comparison" multiple size="5"></select>
            <div class="comparison-actions">
              <button id="compareSelectedBtn" class="btn btn-outline" type="button">Compare selected</button>
              <button id="clearCompareBtn" class="btn btn-outline" type="button">Clear</button>
            </div>
          </div>
          <div class="comparison-table-wrap">
            <table class="comparison-table" id="comparisonTable">
              <thead>
                <tr>
                  <th>Scenario</th>
                  <th>Available income</th>
                  <th>Δ vs current</th>
                  <th>Gap</th>
                  <th>Revenue</th>
                  <th>Profit after tax</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody id="compareTableBody"></tbody>
            </table>
            <p id="compareEmpty" class="small muted">Save scenarios and compare them against your current draft.</p>
          </div>
        </div>
      </section>
    </main>
  </div>
  <footer class="site-footer" role="contentinfo">
    Die artbackstage Toolsammlung ist in laufender BETA-Entwicklung als Teil des Lehrauftrags "Kunst im Kontext (Recht, Geld und Fairness) an der Kunstuniversität Linz. Es werden keine personalisierten Daten gespeichert. Teilweise KI generiert. Keine Haftung.
  </footer>
</body>
</html>
