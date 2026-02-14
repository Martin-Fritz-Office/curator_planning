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
        <p class="muted">10 Fragen zur Abschätzung eines tragfähigen Stundenhonorars.</p>
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
              <span>1) Gewünschtes Jahresnettoeinkommen (€)</span>
              <input id="targetNetIncome" type="number" min="0" step="100" value="36000" />
            </label>
            <label class="q">
              <span>2) Faktor für SV + Steuern (bei Netto-Basis)</span>
              <input id="taxSocialFactor" type="number" min="1" step="0.01" value="1.65" />
              <span class="hint">Typisch oft 1,5–1,9 je nach Land/Situation.</span>
            </label>
            <label class="q">
              <span>3) Jährliche Fixkosten (€)</span>
              <input id="fixedCosts" type="number" min="0" step="100" value="7200" />
            </label>
            <label class="q">
              <span>4) Jährliche variable Kosten (€)</span>
              <input id="variableCosts" type="number" min="0" step="100" value="4800" />
            </label>
            <label class="q">
              <span>5) Verrechenbare Stunden pro Jahr</span>
              <input id="billableHours" type="number" min="1" step="10" value="900" />
            </label>
            <label class="q">
              <span>6) Nicht-verrechenbare Stunden pro Jahr</span>
              <input id="nonBillableHours" type="number" min="0" step="10" value="550" />
            </label>
            <label class="q">
              <span>7) Urlaubswochen pro Jahr</span>
              <input id="vacationWeeks" type="number" min="0" max="20" step="1" value="5" />
            </label>
            <label class="q">
              <span>8) Puffer für Krankheit/Leerlauf (Tage/Jahr)</span>
              <input id="bufferDays" type="number" min="0" step="1" value="12" />
            </label>
            <label class="q">
              <span>9) Gewinn-/Rücklagenaufschlag (%)</span>
              <input id="profitMargin" type="number" min="0" step="1" value="10" />
            </label>
            <label class="q">
              <span>10) Risikoaufschlag für Ausfälle/Skonto (%)</span>
              <input id="riskMargin" type="number" min="0" step="1" value="5" />
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
          <p class="small muted">Hinweis: Wenn du das Jahresziel auf Netto-Basis eingibst, wird es mit dem Faktor für SV/Steuer auf ein notwendiges Umsatzniveau hochgerechnet.</p>
        </div>
      </section>
    </main>
  </div>
</body>
</html>
