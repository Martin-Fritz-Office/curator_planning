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
        <p class="muted">6 questions to estimate a sustainable freelance hourly rate.</p>
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
              <span>1) How much money do you need per month to live? (€)</span>
              <input id="monthlyNeed" type="number" min="0" step="100" value="3000" />
            </label>
            <label class="q">
              <span>2) What are your monthly professional costs? (€)</span>
              <input id="professionalCosts" type="number" min="0" step="50" value="1000" />
            </label>
            <label class="q">
              <span>3) How many hours per week can you work?</span>
              <input id="weeklyHours" type="number" min="1" step="1" value="35" />
            </label>
            <label class="q">
              <span>4) How many of those hours can you bill on average?</span>
              <input id="billableWeeklyHours" type="number" min="0" step="1" value="24" />
            </label>
            <label class="q">
              <span>5) How many weeks per year do you want to take off?</span>
              <input id="vacationWeeks" type="number" min="0" max="52" step="1" value="5" />
            </label>
            <label class="q">
              <span>6) How many weeks per year are you sick?</span>
              <input id="sickWeeks" type="number" min="0" max="52" step="1" value="2" />
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
          <p class="small muted">Note: Monthly living needs and monthly costs are converted to an annual target and divided by annual billable hours.</p>
        </div>
      </section>
    </main>
  </div>
</body>
</html>
