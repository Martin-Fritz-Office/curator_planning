<?php
?><!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Branchen-Story: Kunst, Geschlecht, Teilzeit und Einkommen</title>
  <link rel="stylesheet" href="style.css" />
  <script defer src="onace_story_table.js"></script>
</head>
<body data-lang="de">
  <div class="page">
    <header class="header">
      <div>
        <h1>Branchen-Story vor dem Berufseinstieg</h1>
        <p class="muted">Für sozial interessierte Kunststudierende: So hängen Einkommen, Frauenanteil und Teilzeitquote in Österreichs Branchen zusammen.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index_soziales.php">Zurück</a>
      </div>
    </header>

    <main class="stack">
      <section class="card">
        <div class="card-head">
          <h2>Die Story in zwei Sätzen</h2>
        </div>
        <div class="card-body stack">
          <p id="storyArtPosition" class="small"></p>
          <p id="storyPattern" class="small"></p>
          <p class="small muted">Hinweis: Die Werte sind gerundete Näherungen aus der gezeigten Statistik-Abbildung, damit sie digital filterbar und vergleichbar sind.</p>
        </div>
      </section>

      <section class="card">
        <div class="card-head">
          <h2>Onlinetabelle (wie Salary-Explorer)</h2>
        </div>
        <div class="card-body">
          <div class="qgrid">
            <label class="q">
              <span>Suche (Code/Branche)</span>
              <input id="onaceSearch" type="text" placeholder="z.B. R, Kunst, Gesundheit" />
            </label>
            <label class="q">
              <span>Frauenanteil ab (%)</span>
              <input id="onaceWomenMin" type="number" min="0" max="100" step="1" value="0" />
            </label>
            <label class="q">
              <span>Teilzeitquote ab (%)</span>
              <input id="onacePartTimeMin" type="number" min="0" max="100" step="1" value="0" />
            </label>
            <label class="q">
              <span>Max. Bruttojahreseinkommen (€)</span>
              <input id="onaceIncomeMax" type="number" min="0" step="500" value="100000" />
            </label>
          </div>
          <p id="onaceCount" class="small muted"></p>
          <div class="table-wrap">
            <table class="salary-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>ÖNACE-Abschnitt</th>
                  <th>Mittleres Bruttojahreseinkommen</th>
                  <th>Frauenanteil</th>
                  <th>Vollzeitanteil</th>
                  <th>Teilzeitquote</th>
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
