<?php
?><!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Art/Museum Salary Explorer</title>
  <link rel="stylesheet" href="style.css" />
  <script defer src="salary_data.js"></script>
</head>
<body data-lang="en">
  <div class="page">
    <header class="header">
      <div>
        <h1>Art & Museum Salary Explorer</h1>
        <p class="muted">Search 100 job titles, compare salary/fee ranges, and view a salary pyramid from highest to lowest expected pay.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index_en.php">Home</a>
      </div>
    </header>

    <main class="stack">
      <section class="card">
        <div class="card-head">
          <h2>Search and filter</h2>
        </div>
        <div class="card-body">
          <div class="qgrid">
            <label class="q">
              <span>Search job title or source</span>
              <input id="salarySearch" type="text" placeholder="e.g. Curator, Conservator, Digital" />
            </label>
            <label class="q">
              <span>Category</span>
              <select id="salaryCategory"></select>
            </label>
            <label class="q">
              <span>Contract type</span>
              <select id="salaryContract"></select>
            </label>
            <label class="q">
              <span>Minimum top salary (€ / year)</span>
              <input id="salaryMin" type="number" min="0" step="5000" value="0" />
            </label>
          </div>
          <p id="salaryCount" class="small muted"></p>
        </div>
      </section>

      <section class="grid salary-grid">
        <article class="card">
          <div class="card-head">
            <h2>Salary pyramid (highest to lowest)</h2>
          </div>
          <div class="card-body">
            <div id="salaryPyramid" class="salary-pyramid" aria-live="polite"></div>
          </div>
        </article>

        <article class="card">
          <div class="card-head">
            <h2>Searchable role table</h2>
          </div>
          <div class="card-body">
            <div class="table-wrap">
              <table class="salary-table">
                <thead>
                  <tr>
                    <th>Job title</th>
                    <th>Category</th>
                    <th>Contract</th>
                    <th>Salary range</th>
                    <th>Day rate</th>
                    <th>Project fee</th>
                    <th>Sources</th>
                  </tr>
                </thead>
                <tbody id="salaryTableBody"></tbody>
              </table>
            </div>
          </div>
        </article>
      </section>
    </main>
  </div>
  <footer class="site-footer" role="contentinfo">
    The artbackstage tool collection is in ongoing BETA development as part of the teaching assignment "Art in Context (Law, Money and Fairness)" at Kunstuniversität Linz.
  </footer>
</body>
</html>
