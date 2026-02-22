<?php
?><!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Bildrecht Tarifliste Explorer</title>
  <link rel="stylesheet" href="style.css" />
  <script defer src="bildrecht_tarifliste.js"></script>
</head>
<body data-lang="de">
  <div class="page">
    <header class="header">
      <div>
        <h1>Bildrecht Tarifliste Explorer</h1>
        <p class="muted">Durchsuche die Tarife der Bildrecht-Website nach Kategorie, Abschnitt und Gebühren.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index_money.php">Zurück</a>
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
              <span>Suche (Kategorie, Abschnitt, Auflage/Einheit)</span>
              <input id="tarifSearch" type="text" placeholder="z.B. Online, Werbung, 1. Monat" />
            </label>
            <label class="q">
              <span>Kategorie</span>
              <select id="tarifCategory"></select>
            </label>
            <label class="q">
              <span>Gebühr ab (€)</span>
              <input id="tarifMin" type="number" min="0" step="10" value="0" />
            </label>
          </div>
          <p id="tarifCount" class="small muted"></p>
        </div>
      </section>

      <section class="card">
        <div class="card-head">
          <h2>Tarifliste</h2>
        </div>
        <div class="card-body">
          <div class="table-wrap">
            <table class="salary-table">
              <thead>
                <tr>
                  <th>Kategorie</th>
                  <th>Abschnitt</th>
                  <th>Auflage/Einheit</th>
                  <th>Betrag (€)</th>
                  <th>Einheit</th>
                  <th>Quelle/Details</th>
                </tr>
              </thead>
              <tbody id="tarifTableBody"></tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  </div>
<?php require_once __DIR__ . '/site_footer.php'; render_site_footer(); ?>
</body>
</html>
