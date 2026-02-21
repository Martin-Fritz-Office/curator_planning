<?php
?><!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>artbackstage | Ausstellungs-Fragebogen (25 Punkte)</title>
  <link rel="stylesheet" href="style.css" />
  <script defer src="agreement_checklist.js"></script>
</head>
<body data-lang="de">
  <div class="page">
    <header class="header">
      <div>
        <h1>Ausstellungs-Fragebogen (25 Punkte)</h1>
        <p class="muted">Interaktiver Fragebogen nach Martin Fritz: Beantworte alle Punkte für die Vorbereitung einer Ausstellung und prüfe, wie viele Antworten bereits ausreichend detailliert sind.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index.php">Home</a>
        <a class="btn btn-outline" href="agreement_checklist_en.php">English</a>
      </div>
    </header>

    <main class="card tutorial-card">
      <div class="card-head">
        <h2>Checkliste mit Detail-Check</h2>
      </div>
      <div class="card-body">
        <div class="agreement-toolbar">
          <span id="agreementProgress" class="pill">0 / 25 ausreichend detailliert</span>
          <button type="button" id="showIncompleteBtn" class="btn btn-outline">Nur unvollständige Antworten</button>
          <button type="button" id="copySummaryBtn" class="btn">Zusammenfassung kopieren</button>
        </div>

        <section class="agreement-visual" aria-live="polite">
          <div class="agreement-bars" id="agreementBars"></div>
          <p id="agreementLegend" class="muted">Noch keine Antworten.</p>
        </section>

        <section id="agreementList" class="agreement-list" aria-live="polite"></section>
      </div>
    </main>
  </div>

  <dialog id="contextDialog" class="agreement-dialog">
    <form method="dialog" class="agreement-dialog-form">
      <h3 id="contextDialogTitle">Mehr Kontext</h3>
      <p id="contextDialogText"></p>
      <div class="agreement-dialog-actions">
        <button class="btn" value="close">Schließen</button>
      </div>
    </form>
  </dialog>
  <footer class="site-footer" role="contentinfo">
    Die artbackstage Toolsammlung ist in laufender BETA-Entwicklung als Teil des Lehrauftrags "Kunst im Kontext (Recht, Geld und Fairness) an der Kunstuniversität Linz. Es werden keine personalisierten Daten gespeichert.
  </footer>
</body>
</html>
