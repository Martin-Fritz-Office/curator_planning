<?php
// Simple single-file entry point. Works on any basic PHP hosting.
?><!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Annual Revenue & Profit Forecast (Curator)</title>
  <link rel="stylesheet" href="style.css" />
  <script defer src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
  <script defer src="calc_core.js"></script>
  <script defer src="app_en.js"></script>
</head>
<body>
  <div class="page">
    <header class="header">
      <div>
        <h1>Annual Revenue & Profit Forecast (Freelance Curator)</h1>
        <p class="muted">Pie charts show percentage shares (tooltip). Values are gross heuristics.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index_en.php">Home</a>
        <a class="btn btn-outline" href="forecast.php">Deutsch</a>
        <a class="btn btn-outline" href="hourly_rate_en.php">Hourly rate calculator</a>
        <a class="btn btn-outline" href="net_income_carousel.php">Net income step by step</a>
        <a class="btn btn-outline" href="forecast_en_didactic.php">Didactic layout</a>
        <button id="saveBtn" class="btn" type="button">Save responses</button>
        <input id="scenarioName" class="input-inline" type="text" maxlength="120" placeholder="Scenario name" aria-label="Scenario name" />
        <div id="saveStatus" class="pill" aria-live="polite">Not saved</div>
        <select id="scenarioList" class="input-inline" aria-label="Saved scenarios">
          <option value="">Load scenario …</option>
        </select>
        <button id="loadScenarioBtn" class="btn btn-outline" type="button">Load</button>
        <div class="pill">Type: <span id="typologyLabel" class="pill-strong">–</span></div>
        <div class="pill">Median available income: <span id="medianAvailableIncome" class="pill-strong">loading …</span></div>
        <button id="resetBtn" class="btn btn-outline" type="button">Reset</button>
      </div>
    </header>

    <main class="grid">
      <section class="card">
        <div class="card-head">
          <h2>Questionnaire</h2>
        </div>
        <div class="card-body">
          <div id="questionGrid" class="qgrid"></div>

          <hr class="sep" />

          <p class="small muted">
            Short logic: Projects×Fee (with stability factor) + Texts + Consulting + Grants = Revenue. Support and net income from employment are added only to the available annual income.
            Fixed costs + variable project costs (travel share) + social insurance/provision (26% of pre-tax profit) + Austrian income tax (2025 brackets: 0–13,308 € 0%, 13,309–21,617 € 20%, 21,618–35,836 € 30%, 35,837–69,166 € 40%, 69,167–103,072 € 48%, 103,073–1 million € 50%, above 1 million € 55%) = costs.
            Reserve rate depends on risk profile.
          </p>
        </div>
      </section>

      <section class="stack">
        <section class="card">
          <div class="card-head">
            <h2>Forecast (Sheet)</h2>
          </div>
          <div class="card-body">
            <div class="sheet" id="sheet"></div>
          </div>
        </section>

        <section class="card">
          <div class="card-head">
            <h2>Scenario comparison</h2>
          </div>
          <div class="card-body">
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
              <p id="compareEmpty" class="small muted">Save scenarios and select one or more entries to compare them with your current draft.</p>
            </div>
          </div>
        </section>

        <section class="grid2">
          <section class="card">
            <div class="card-head">
              <h2>Income Sources (Pie)</h2>
            </div>
            <div class="card-body">
              <div class="chartBox">
                <canvas id="incomeChart"></canvas>
              </div>
              <div id="incomeEmpty" class="muted small" style="display:none">No income data.</div>
            </div>
          </section>

          <section class="card">
            <div class="card-head">
              <h2>Cost Structure (Pie)</h2>
            </div>
            <div class="card-body">
              <div class="chartBox">
                <canvas id="costChart"></canvas>
              </div>
              <div id="costEmpty" class="muted small" style="display:none">No cost data.</div>
            </div>
          </section>
        </section>
      </section>
    </main>

    <footer class="footer small muted">
      Note: This tool is a simplified heuristic and does not replace tax/social-insurance advice.
    </footer>
  </div>
  <footer class="site-footer" role="contentinfo">
    Die artbackstage Toolsammlung ist in laufender BETA-Entwicklung als Teil des Lehrauftrags "Kunst im Kontext (Recht, Geld und Fairness) an der Kunstuniversität Linz. Es werden keine personalisierten Daten gespeichert.
  </footer>
</body>
</html>
