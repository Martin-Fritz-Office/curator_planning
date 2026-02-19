<?php
?><!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Freelance-Service-Rechner</title>
  <link rel="stylesheet" href="style.css" />
  <script defer src="freelance_services_calculator.js"></script>
</head>
<body>
  <div class="page planning-wide freelance-page">
    <header class="header">
      <div>
        <h1>Freelance-Service-Rechner</h1>
        <p class="muted">Wähle Tätigkeiten, trage Stunden ein und exportiere die Kosten als CSV.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index.php">Startseite</a>
      </div>
    </header>

    <main class="grid planning-grid freelance-grid">
      <section class="card planning-card-wide freelance-card-wide">
        <div class="card-head">
          <h2>Leistungen auswählen</h2>
        </div>
        <div class="card-body">
          <div class="qgrid">
            <label class="q">
              <span>Kategorie / Gruppe</span>
              <select id="serviceCategory"></select>
            </label>
          </div>
          <hr class="sep" />
          <div id="serviceList" class="sheet"></div>
        </div>
      </section>

      <section class="card planning-card-wide freelance-card-wide">
        <div class="card-head">
          <h2>Ergebnis</h2>
        </div>
        <div class="card-body">
          <div class="comparison-table-wrap">
            <table class="comparison-table" id="resultTable">
              <thead>
                <tr>
                  <th>Leistung</th>
                  <th>Gruppe</th>
                  <th>Personen</th>
                  <th>Stunden pro Person</th>
                  <th>Stunden</th>
                  <th>Stundensatz (€)</th>
                  <th>Gesamt (€)</th>
                </tr>
              </thead>
              <tbody></tbody>
              <tfoot>
                <tr>
                  <th colspan="6">Summe aller Services</th>
                  <th id="grandTotal">0,00</th>
                </tr>
              </tfoot>
            </table>
          </div>
          <div class="footer">
            <button class="btn" id="downloadCsvBtn" type="button">CSV downloaden</button>
          </div>
          <p class="small muted">Richtwerte: Euro exkl. USt. aus dem Fair-Pay-Schema für Kulturarbeit; die vorgeschlagenen Stundensätze sind als Mittelwert der jeweiligen Bandbreite vorbelegt und anpassbar.</p>
        </div>
      </section>

      <section class="card proposal-card planning-card-wide freelance-card-wide">
        <div class="card-head">
          <h2>Angebot & Proposal Builder</h2>
        </div>
        <div class="card-body">
          <div class="qgrid">
            <label class="q">
              <span>Projektname</span>
              <input type="text" id="proposalProjectName" placeholder="z. B. Ausstellungskonzept 2026" />
            </label>
            <label class="q">
              <span>Kund:in / Auftraggeber:in</span>
              <input type="text" id="proposalClientName" placeholder="z. B. Kunstverein Musterstadt" />
            </label>
            <label class="q">
              <span>Projektstart</span>
              <input type="date" id="proposalStartDate" />
            </label>
            <label class="q">
              <span>Projektende</span>
              <input type="date" id="proposalEndDate" />
            </label>
          </div>
          <hr class="sep" />
          <div class="qgrid">
            <label class="q q-full">
              <span>Timeline / Meilensteine</span>
              <textarea id="proposalTimeline" rows="4" placeholder="z. B. Woche 1: Kick-off & Briefing&#10;Woche 2–4: Recherche, Künstler:innen-Auswahl&#10;Woche 5: Produktionsplanung"></textarea>
            </label>
            <label class="q q-full">
              <span>Deliverables</span>
              <textarea id="proposalDeliverables" rows="4" placeholder="z. B. Kuratorisches Konzept, Budgetentwurf, Produktionsfahrplan"></textarea>
            </label>
            <label class="q q-full">
              <span>Annahmen / Scope</span>
              <textarea id="proposalAssumptions" rows="4" placeholder="z. B. Max. 2 Feedbackschleifen, Materialkosten exkl., Reisekosten nach Aufwand"></textarea>
            </label>
          </div>
          <hr class="sep" />
          <div class="qgrid">
            <div class="q q-full">
              <span>Zahlungsplan</span>
              <p class="small muted">Erfasse Zahlungstermine über Datum und/oder Meilenstein plus Anteil am Gesamthonorar. Diese Angaben werden im PDF ausgewiesen.</p>
              <div id="paymentPlanList" class="sheet"></div>
              <div class="footer">
                <button class="btn btn-outline" id="addPaymentPlanRowBtn" type="button">Zahlungsposition hinzufügen</button>
              </div>
            </div>
          </div>
          <div class="footer proposal-actions">
            <button class="btn" id="copyShareLinkBtn" type="button">Shareable Link kopieren</button>
            <button class="btn" id="downloadProposalPdfBtn" type="button">Proposal als PDF exportieren</button>
          </div>
          <p class="small muted" id="proposalStatus">Der Proposal-Entwurf übernimmt ausgewählte Services, Stunden und Stundensätze automatisch.</p>
        </div>
      </section>
    </main>
  </div>
</body>
</html>
