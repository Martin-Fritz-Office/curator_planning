<?php
?><!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Yearly Turnover Calculator</title>
  <link rel="icon" type="image/svg+xml" href="favicon.svg" />
  <link rel="stylesheet" href="style.css" />
  <script defer src="yearly_turnover_calculator.js"></script>
</head>
<body data-lang="en">
  <div class="page planning-wide freelance-page">
    <header class="header">
      <div>
        <h1>Yearly Turnover Calculator</h1>
        <p class="muted">Built in the same spirit as the Freelance Service Calculator: add service rows, estimate yearly quantity, and track your total turnover instantly.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index_en.php">Home</a>
        <a class="btn btn-outline" href="yearly_turnover_calculator.php">Deutsch</a>
      </div>
    </header>

    <main class="grid planning-grid freelance-grid">
      <section class="card planning-card-wide freelance-card-wide">
        <div class="card-head">
          <h2>Services & yearly turnover</h2>
        </div>
        <div class="card-body">
          <p class="small muted">Add what you offer, select billing unit, enter price per unit, and how often you can deliver/sell it per year.</p>
          <div class="comparison-table-wrap">
            <table class="comparison-table" id="turnoverTable">
              <thead>
                <tr>
                  <th>Service / Offer</th>
                  <th>Billing unit</th>
                  <th>Price per unit (€)</th>
                  <th>Quantity per year</th>
                  <th>Yearly turnover (€)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody id="turnoverRows"></tbody>
              <tfoot>
                <tr>
                  <th colspan="4">Total yearly turnover</th>
                  <th id="yearlyTotal">0.00</th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          </div>
          <div class="footer">
            <button class="btn btn-outline" id="addTurnoverRowBtn" type="button">Add new row</button>
          </div>
        </div>
      </section>
    </main>
  </div>
<?php require_once __DIR__ . '/site_footer.php'; render_site_footer(); ?>
</body>
</html>
