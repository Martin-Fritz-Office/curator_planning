<?php
?><!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Hourly Rate Calculator (Freelance Curator)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" />
  <link rel="stylesheet" href="style.css" />
  <script defer src="hourly_rate.js"></script>
</head>
<body data-lang="en">
  <a href="#main-content" class="skip-link">Zum Hauptinhalt springen</a>
  <div class="page">
    <header class="header">
      <div>
        <h1>Hourly Rate Calculator (Freelance Curator)</h1>
        <p class="muted">7 questions to estimate a sustainable freelance hourly rate.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index_money_en.php">Home</a>
        <a class="btn btn-outline" href="hourly_rate.php">Deutsch</a>
      </div>
    </header>

    <main id="main-content" class="grid">
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
              <span>3) Which multiplier do you use for social insurance &amp; taxes? (e.g. 1.6 for average income)</span>
              <input id="taxMultiplier" type="number" min="1.0" max="2.5" step="0.05" value="1.6" />
            </label>
            <label class="q">
              <span>4) How many hours per week can you work?</span>
              <input id="weeklyHours" type="number" min="1" step="1" value="35" />
            </label>
            <label class="q">
              <span>5) What percentage of your working time goes to acquisition &amp; admin (non-billable)?</span>
              <input id="adminShare" type="number" min="0" max="80" step="5" value="20" />
            </label>
            <label class="q">
              <span>6) How many weeks per year do you want to take off?</span>
              <input id="vacationWeeks" type="number" min="0" max="52" step="1" value="5" />
            </label>
            <label class="q">
              <span>7) How many weeks per year are you sick?</span>
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
          <p class="small muted">Note: Gross need = net need × multiplier; billable hours = (yearly hours − vacation/sickness) × (1 − acquisition/admin share); minimum rate = (gross need + costs) ÷ monthly billable hours.</p>
        </div>
      </section>
    </main>
  </div>
<?php require_once __DIR__ . '/site_footer.php'; render_site_footer(); ?>
</body>
</html>
