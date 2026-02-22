<?php
?><!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Jahresumsatz-Rechner</title>
  <link rel="icon" type="image/svg+xml" href="favicon.svg" />
  <link rel="stylesheet" href="style.css" />
  <script defer src="yearly_turnover_calculator.js"></script>
</head>
<body data-lang="de">
  <div class="page planning-wide freelance-page">
    <header class="header">
      <div>
        <h1>Jahresumsatz-Rechner</h1>
        <p class="muted">Wie beim Freelance-Service-Rechner: Leistungen als Zeilen eintragen, jährlich kalkulieren und den Gesamtumsatz sofort sehen.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index_money.php">Money-Übersicht</a>
        <a class="btn btn-outline" href="yearly_turnover_calculator_en.php">English</a>
      </div>
    </header>

    <main class="grid planning-grid freelance-grid">
      <section class="card planning-card-wide freelance-card-wide">
        <div class="card-head">
          <h2>Leistungen & Jahresumsatz</h2>
        </div>
        <div class="card-body">
          <p class="small muted">Trage ein, was du anbietest, die Verrechnungseinheit, den Preis pro Einheit und wie oft du die Leistung pro Jahr erbringst.</p>
          <div class="comparison-table-wrap">
            <table class="comparison-table" id="turnoverTable">
              <thead>
                <tr>
                  <th>Leistung / Angebot</th>
                  <th>Verrechnungseinheit</th>
                  <th>Preis pro Einheit (€)</th>
                  <th>Anzahl pro Jahr</th>
                  <th>Jahresumsatz (€)</th>
                  <th>Aktion</th>
                </tr>
              </thead>
              <tbody id="turnoverRows"></tbody>
              <tfoot>
                <tr>
                  <th colspan="4">Jährlicher Gesamtumsatz</th>
                  <th id="yearlyTotal">0,00</th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          </div>
          <div class="footer">
            <button class="btn btn-outline" id="addTurnoverRowBtn" type="button">Neue Zeile hinzufügen</button>
          </div>
        </div>
      </section>
    </main>
  </div>
<?php require_once __DIR__ . '/site_footer.php'; render_site_footer(); ?>
</body>
</html>
