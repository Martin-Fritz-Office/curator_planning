<?php
?><!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Sector story: arts, gender, part-time and income</title>
  <link rel="stylesheet" href="style.css" />
  <script defer src="onace_story_table.js"></script>
</head>
<body data-lang="en">
  <a href="#main-content" class="skip-link">Zum Hauptinhalt springen</a>
  <div class="page">
    <header class="header">
      <div>
        <h1>Sector story before entering the field</h1>
        <p class="muted">For socially aware arts students: how income, share of women, and part-time rates relate across Austrian industry sectors.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index_soziales_en.php">Back</a>
        <a class="btn btn-outline" href="onace_story_table.php">Deutsch</a>
      </div>
    </header>

    <main id="main-content" class="stack">
      <section class="card">
        <div class="card-head">
          <h2>The story in two sentences</h2>
        </div>
        <div class="card-body stack">
          <p id="storyArtPosition" class="small"></p>
          <p id="storyPattern" class="small"></p>
          <p class="small muted">Note: Values are rounded approximations from the source chart, to make them filterable and digitally comparable.</p>
        </div>
      </section>

      <section class="card">
        <div class="card-head">
          <h2>Interactive table (sector explorer)</h2>
        </div>
        <div class="card-body">
          <div class="qgrid">
            <label class="q">
              <span>Search (code/sector)</span>
              <input id="onaceSearch" type="text" placeholder="e.g. R, Arts, Health" />
            </label>
            <label class="q">
              <span>Minimum share of women (%)</span>
              <input id="onaceWomenMin" type="number" min="0" max="100" step="1" value="0" />
            </label>
            <label class="q">
              <span>Minimum part-time rate (%)</span>
              <input id="onacePartTimeMin" type="number" min="0" max="100" step="1" value="0" />
            </label>
            <label class="q">
              <span>Max. gross annual income (€)</span>
              <input id="onaceIncomeMax" type="number" min="0" step="500" value="100000" />
            </label>
          </div>
          <p id="onaceCount" class="small muted"></p>
          <div class="table-wrap">
            <table class="salary-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>ÖNACE sector</th>
                  <th>Median gross annual income</th>
                  <th>Share of women</th>
                  <th>Full-time rate</th>
                  <th>Part-time rate</th>
                </tr>
              </thead>
              <tbody id="onaceTableBody"></tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  </div>
<?php require_once __DIR__ . '/site_footer.php'; render_site_footer(); ?>
</body>
</html>
