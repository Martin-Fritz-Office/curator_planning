<?php
// Simple single-file entry point. Works on any basic PHP hosting.
?><!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Jahresumsatz- & Gewinnprognose (Curator)</title>
  <link rel="stylesheet" href="style.css" />
  <script defer src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
  <script defer src="app.js"></script>
</head>
<body>
  <div class="page">
    <header class="header">
      <div>
        <h1>Jahresumsatz- & Gewinnprognose (Freelance Curator)</h1>
        <p class="muted">Pie-Charts zeigen Prozentanteile (Tooltip). Werte sind Brutto-Heuristiken.</p>
      </div>
      <div class="header-actions">
        <div class="pill">Typ: <span id="typologyLabel" class="pill-strong">–</span></div>
        <button id="resetBtn" class="btn btn-outline" type="button">Reset</button>
      </div>
    </header>

    <main class="grid">
      <section class="card">
        <div class="card-head">
          <h2>Fragebogen</h2>
        </div>
        <div class="card-body">
          <div id="questionGrid" class="qgrid"></div>

          <hr class="sep" />

          <p class="small muted">
            Kurzlogik: Projekte×Honorar (mit Stabilitätsfaktor) + Texte + Beratung + Förderungen + Unterstützung = Umsatz.
            Fixkosten + variable Projektkosten (Reiseanteil) + SV/Vorsorge (26% vom Gewinn vor Steuern) + heuristische Steuerquote = Kosten.
            Rücklagenquote hängt am Risikoprofil.
          </p>
        </div>
      </section>

      <section class="stack">
        <section class="card">
          <div class="card-head">
            <h2>Prognose (Sheet)</h2>
          </div>
          <div class="card-body">
            <div class="sheet" id="sheet"></div>
          </div>
        </section>

        <section class="grid2">
          <section class="card">
            <div class="card-head">
              <h2>Einkommensquellen (Pie)</h2>
            </div>
            <div class="card-body">
              <div class="chartBox">
                <canvas id="incomeChart"></canvas>
              </div>
              <div id="incomeEmpty" class="muted small" style="display:none">Keine Einkommensdaten.</div>
            </div>
          </section>

          <section class="card">
            <div class="card-head">
              <h2>Kostenstruktur (Pie)</h2>
            </div>
            <div class="card-body">
              <div class="chartBox">
                <canvas id="costChart"></canvas>
              </div>
              <div id="costEmpty" class="muted small" style="display:none">Keine Kostendaten.</div>
            </div>
          </section>
        </section>
      </section>
    </main>

    <footer class="footer small muted">
      Hinweis: Dieses Tool ist eine vereinfachte Heuristik und ersetzt keine Steuer-/Sozialversicherungsberatung.
    </footer>
  </div>
</body>
</html>
