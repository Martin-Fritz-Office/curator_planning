<?php
?><!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Stundensatz-Rechner (Freelance Curator)</title>
  <link rel="stylesheet" href="style.css" />
  <script defer src="hourly_rate.js"></script>
</head>
<body data-lang="de">
  <div class="page">
    <header class="header">
      <div>
        <h1>Stundensatz-Rechner (Freelance Curator)</h1>
        <p class="muted">7 Fragen zur Abschätzung eines tragfähigen Stundenhonorars.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="hourly_rate_en.php">English</a>
        <a class="btn btn-outline" href="index.php">Zur Prognose</a>
      </div>
    </header>

    <main class="grid">
      <section class="card">
        <div class="card-head">
          <h2>Fragen</h2>
        </div>
        <div class="card-body">
          <div class="qgrid hourly-grid">
            <label class="q">
              <span>1) Wie viel Geld brauchst du im Monat zum Leben? (€)</span>
              <input id="monthlyNeed" type="number" min="0" step="100" value="3000" />
            </label>
            <label class="q">
              <span>2) Wie hoch sind deine beruflichen Kosten pro Monat? (€)</span>
              <input id="professionalCosts" type="number" min="0" step="50" value="1000" />
            </label>
            <label class="q">
              <span>3) Welchen Multiplikator nutzt du für Sozialversicherung &amp; Steuern? (1,5 bis 1,8)</span>
              <input id="taxMultiplier" type="number" min="1.5" max="1.8" step="0.1" value="1.6" />
            </label>
            <label class="q">
              <span>4) Wie viele Stunden in der Woche kannst du arbeiten?</span>
              <input id="weeklyHours" type="number" min="1" step="1" value="35" />
            </label>
            <label class="q">
              <span>5) Wie viele dieser Stunden kannst du im Durchschnitt verrechnen?</span>
              <input id="billableWeeklyHours" type="number" min="0" step="1" value="24" />
            </label>
            <label class="q">
              <span>6) Wie viele Wochen im Jahr willst du frei haben?</span>
              <input id="vacationWeeks" type="number" min="0" max="52" step="1" value="5" />
            </label>
            <label class="q">
              <span>7) Wie viele Wochen im Jahr bist du krank?</span>
              <input id="sickWeeks" type="number" min="0" max="52" step="1" value="2" />
            </label>
          </div>
        </div>
      </section>

      <section class="card">
        <div class="card-head">
          <h2>Ergebnis</h2>
        </div>
        <div class="card-body">
          <div class="sheet" id="hourlySheet"></div>
          <p class="small muted">Hinweis: Monatlicher Bedarf brutto = monatlicher Bedarf privat netto × Multiplikator; Stundenhonorar = (Bedarf brutto + Kosten) ÷ verrechenbare Stunden pro Monat.</p>
        </div>
      </section>
    </main>
  </div>
</body>
</html>
