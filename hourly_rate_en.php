<?php
?><!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Hourly Rate Calculator (Freelance Curator)</title>
  <link rel="stylesheet" href="style.css" />
  <script defer src="hourly_rate.js"></script>
</head>
<body data-lang="en">
  <div class="page">
    <header class="header">
      <div>
        <h1>Hourly Rate Calculator (Freelance Curator)</h1>
        <p class="muted">10 questions to estimate a sustainable freelance hourly rate.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="hourly_rate.php">Deutsch</a>
        <a class="btn btn-outline" href="index_en.php">Back to forecast</a>
      </div>
    </header>

    <main class="grid">
      <section class="card">
        <div class="card-head">
          <h2>Questions</h2>
        </div>
        <div class="card-body">
          <div class="qgrid hourly-grid">
            <label class="q">
              <span>1) Target annual net income (€)</span>
              <input id="targetNetIncome" type="number" min="0" step="100" value="36000" />
            </label>
            <label class="q">
              <span>2) Social security + tax factor (for net basis)</span>
              <input id="taxSocialFactor" type="number" min="1" step="0.01" value="1.65" />
              <span class="hint">Often around 1.5–1.9 depending on country and setup.</span>
            </label>
            <label class="q">
              <span>3) Annual fixed costs (€)</span>
              <input id="fixedCosts" type="number" min="0" step="100" value="7200" />
            </label>
            <label class="q">
              <span>4) Annual variable costs (€)</span>
              <input id="variableCosts" type="number" min="0" step="100" value="4800" />
            </label>
            <label class="q">
              <span>5) Billable hours per year</span>
              <input id="billableHours" type="number" min="1" step="10" value="900" />
            </label>
            <label class="q">
              <span>6) Non-billable hours per year</span>
              <input id="nonBillableHours" type="number" min="0" step="10" value="550" />
            </label>
            <label class="q">
              <span>7) Vacation weeks per year</span>
              <input id="vacationWeeks" type="number" min="0" max="20" step="1" value="5" />
            </label>
            <label class="q">
              <span>8) Buffer for sickness/downtime (days/year)</span>
              <input id="bufferDays" type="number" min="0" step="1" value="12" />
            </label>
            <label class="q">
              <span>9) Profit/reserve margin (%)</span>
              <input id="profitMargin" type="number" min="0" step="1" value="10" />
            </label>
            <label class="q">
              <span>10) Risk margin for write-offs/discounts (%)</span>
              <input id="riskMargin" type="number" min="0" step="1" value="5" />
            </label>
          </div>
        </div>
      </section>

      <section class="card">
        <div class="card-head">
          <h2>Result</h2>
        </div>
        <div class="card-body">
          <div class="sheet" id="hourlySheet"></div>
          <p class="small muted">Note: If your income target is entered on a net basis, the social/tax factor inflates it to required turnover before costs and safety margins.</p>
        </div>
      </section>
    </main>
  </div>
</body>
</html>
