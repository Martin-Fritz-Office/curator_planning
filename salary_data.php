<?php
?><!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Kunst-/Museums-Gehalts-Explorer</title>
  <link rel="stylesheet" href="style.css" />
  <script defer src="salary_data.js"></script>
</head>
<body data-lang="de">
  <div class="page">
    <header class="header">
      <div>
        <h1>Kunst- &amp; Museums-Gehalts-Explorer</h1>
        <p class="muted">Durchsuche 100 Berufsbezeichnungen, vergleiche Gehalts-/Honorarkorridore und sieh eine Gehaltspyramide vom höchsten bis zum niedrigsten erwarteten Einkommen.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index.php">Startseite</a>
      </div>
    </header>

    <main class="stack">
      <section class="card">
        <div class="card-head">
          <h2>Suche und Filter</h2>
        </div>
        <div class="card-body">
          <div class="qgrid">
            <label class="q">
              <span>Berufsbezeichnung oder Quelle suchen</span>
              <input id="salarySearch" type="text" placeholder="z. B. Kurator*in, Konservator*in, Digital" />
            </label>
            <label class="q">
              <span>Kategorie</span>
              <select id="salaryCategory"></select>
            </label>
            <label class="q">
              <span>Vertragsart</span>
              <select id="salaryContract"></select>
            </label>
            <label class="q">
              <span>Mindestens oberes Gehalt (€ / Jahr)</span>
              <input id="salaryMin" type="number" min="0" step="5000" value="0" />
            </label>
          </div>
          <p id="salaryCount" class="small muted"></p>
        </div>
      </section>

      <section class="grid salary-grid">
        <article class="card">
          <div class="card-head">
            <h2>Gehaltspyramide (hoch nach niedrig)</h2>
          </div>
          <div class="card-body">
            <div id="salaryPyramid" class="salary-pyramid" aria-live="polite"></div>
          </div>
        </article>

        <article class="card">
          <div class="card-head">
            <h2>Durchsuchbare Rollentabelle</h2>
          </div>
          <div class="card-body">
            <div class="table-wrap">
              <table class="salary-table">
                <thead>
                  <tr>
                    <th>Berufsbezeichnung</th>
                    <th>Kategorie</th>
                    <th>Vertrag</th>
                    <th>Gehaltsspanne</th>
                    <th>Tagessatz</th>
                    <th>Projektpauschale</th>
                    <th>Quellen</th>
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
<?php require_once __DIR__ . '/site_footer.php'; render_site_footer(); ?>
</body>
</html>
