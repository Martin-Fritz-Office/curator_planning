<?php
?><!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>artbackstage | Vereinbarungs-Checkliste (25 Punkte)</title>
  <link rel="stylesheet" href="style.css" />
  <script defer src="agreement_checklist.js"></script>
</head>
<body data-lang="de">
  <div class="page">
    <header class="header">
      <div>
        <h1>Vereinbarungs-Checkliste (25 Punkte)</h1>
        <p class="muted">Interaktive Version der 25 Punkte aus Martin Fritz' Handout – zum Durchgehen, Priorisieren und Teilen vor Projektstart.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index.php">Home</a>
      </div>
    </header>

    <main class="card tutorial-card">
      <div class="card-head">
        <h2>Abgemacht? Projektvereinbarung Schritt für Schritt</h2>
      </div>
      <div class="card-body">
        <div class="agreement-toolbar">
          <span id="agreementProgress" class="pill">0 / 25 geklärt</span>
          <button type="button" id="showOpenBtn" class="btn btn-outline">Nur offene Punkte zeigen</button>
          <button type="button" id="copySummaryBtn" class="btn">Zusammenfassung kopieren</button>
        </div>

        <section id="agreementList" class="agreement-list" aria-live="polite"></section>
      </div>
    </main>
  </div>

  <div id="contextModal" class="agreement-modal" hidden>
    <div class="agreement-modal__backdrop" data-close-modal="true"></div>
    <article class="agreement-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="contextModalTitle" aria-describedby="contextModalBody">
      <header class="agreement-modal__header">
        <h3 id="contextModalTitle">Mehr Kontext</h3>
        <button type="button" id="contextModalCloseBtn" class="btn btn-outline">Schließen</button>
      </header>
      <p id="contextModalBody" class="agreement-modal__body"></p>
    </article>
  </div>
</body>
</html>
