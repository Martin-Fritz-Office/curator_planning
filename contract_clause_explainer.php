<?php
?><!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>artbackstage | Vertragsklausel-Erklärer</title>
  <link rel="icon" type="image/svg+xml" href="favicon.svg" />
  <link rel="stylesheet" href="style.css" />
  <script defer src="contract_clause_explainer.js"></script>
</head>
<body data-lang="de">
  <a href="#main-content" class="skip-link">Zum Hauptinhalt springen</a>
  <div class="page">
    <header class="header">
      <div>
        <h1>Vertragsklausel-Erklärer</h1>
        <p class="muted">Ein fiktiver Kuratorinnen-Vertrag mit kommentierten Klauseln. Fahre über die markierten Stellen – oder klicke sie an – um zu sehen, was sie bedeuten und worauf du achten solltest.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index_law.php">Zu Law</a>
        <a class="btn btn-outline" href="index.php">Startseite</a>
      </div>
    </header>

    <main id="main-content" class="stack">

      <section class="card">
        <div class="card-head">
          <h2>Legende &amp; Hinweis</h2>
        </div>
        <div class="card-body">
          <div class="clause-legend">
            <div class="clause-legend-item">
              <span class="clause-legend-swatch clause-legend-swatch--info"></span>
              <span>Information – gut zu wissen</span>
            </div>
            <div class="clause-legend-item">
              <span class="clause-legend-swatch clause-legend-swatch--warning"></span>
              <span>Hinweis – prüfen und verhandeln</span>
            </div>
            <div class="clause-legend-item">
              <span class="clause-legend-swatch clause-legend-swatch--danger"></span>
              <span>Risiko – kritische Klausel</span>
            </div>
          </div>
          <p class="small muted">Dieser Vertrag ist <strong>fiktiv</strong> und dient ausschließlich Bildungszwecken. Er ersetzt keine Rechtsberatung. Die Formulierungen orientieren sich an typischen – nicht mustergültigen – Verträgen im österreichischen Kulturbetrieb.</p>
        </div>
      </section>

      <section class="card">
        <div class="card-head">
          <h2>Beispielvertrag: Kuratorisches Dienstleistungshonorar</h2>
        </div>
        <div class="card-body">
          <div class="contract-doc" id="contractDoc">

            <h2>HONORARVERTRAG</h2>
            <p class="contract-subtitle">für kuratorische Dienstleistungen</p>

            <div class="contract-parties">
              <p><strong>Auftraggeber:</strong> Kunsthaus Beispiel GmbH, Musterstraße 1, 1010 Wien (nachfolgend „Auftraggeber")</p>
              <p><strong>Auftragnehmer*in:</strong> Maria Muster, freie Kuratorin, Beispielgasse 7, 8010 Graz (nachfolgend „Auftragnehmer*in")</p>
              <p><strong>Datum:</strong> 1. Februar 2026</p>
            </div>

            <div class="contract-section">
              <h3>§ 1 Vertragsgegenstand</h3>
              <p>
                Die Auftragnehmer*in wird beauftragt, <span class="clause clause--warning" data-clause="scope" tabindex="0" role="button" aria-label="Klausel erklären: Vager Leistungsumfang">die kuratorische Leitung der Ausstellung „Neue Räume" zu übernehmen sowie alle damit zusammenhängenden Aufgaben zu erfüllen</span>. Die Ausstellung findet im Haupthaus des Auftraggebers statt.
              </p>
            </div>

            <div class="contract-section">
              <h3>§ 2 Leistungszeitraum</h3>
              <p>
                Die Leistungserbringung beginnt am 1. März 2026 und endet mit dem vollständigen Abbau der Ausstellung, voraussichtlich am 15. September 2026.
              </p>
            </div>

            <div class="contract-section">
              <h3>§ 3 Honorar</h3>
              <p>
                Das Honorar für die vereinbarten Leistungen beträgt <span class="clause clause--warning" data-clause="lowFee" tabindex="0" role="button" aria-label="Klausel erklären: Honorarhöhe">€ 3.500,– brutto</span> (in Worten: dreitausendfünfhundert Euro). Die Auftragnehmer*in ist für die Abführung etwaiger Steuern und Sozialversicherungsbeiträge selbst verantwortlich.
              </p>
            </div>

            <div class="contract-section">
              <h3>§ 4 Zahlungsbedingungen</h3>
              <p>
                <span class="clause clause--warning" data-clause="latePayment" tabindex="0" role="button" aria-label="Klausel erklären: Zahlungsfrist">Die Auszahlung des Honorars erfolgt nach vollständigem Projektabschluss und ordnungsgemäßer Rechnungslegung innerhalb von 60 Tagen.</span>
              </p>
            </div>

            <div class="contract-section">
              <h3>§ 5 Nutzungsrechte</h3>
              <p>
                <span class="clause clause--danger" data-clause="fullRights" tabindex="0" role="button" aria-label="Klausel erklären: Vollständige Rechteübertragung">Die Auftragnehmer*in überträgt dem Auftraggeber unwiderruflich, zeitlich und räumlich unbegrenzt sowie unentgeltlich sämtliche Nutzungsrechte</span> an allen im Rahmen dieses Vertrags erstellten Werken, Texten, Konzepten, Bildmaterialien und sonstigen Inhalten.
              </p>
            </div>

            <div class="contract-section">
              <h3>§ 6 Ausschließlichkeit</h3>
              <p>
                <span class="clause clause--warning" data-clause="nonCompete" tabindex="0" role="button" aria-label="Klausel erklären: Konkurrenzklausel">Während der gesamten Vertragslaufzeit ist die Auftragnehmer*in verpflichtet, keine vergleichbaren kuratorischen Tätigkeiten für Einrichtungen auszuüben, die in einem direkten Wettbewerbsverhältnis zum Auftraggeber stehen.</span>
              </p>
            </div>

            <div class="contract-section">
              <h3>§ 7 Kündigung</h3>
              <p>
                <span class="clause clause--danger" data-clause="unilateralTermination" tabindex="0" role="button" aria-label="Klausel erklären: Einseitiges Kündigungsrecht">Der Auftraggeber ist berechtigt, diesen Vertrag jederzeit und ohne Angabe von Gründen durch schriftliche Mitteilung zu beenden.</span> In diesem Fall erhält die Auftragnehmer*in ein Ausfallhonorar in Höhe von 25 % des vereinbarten Honorars, sofern noch keine Leistungen erbracht wurden, bzw. einen angemessenen Anteil bei bereits erbrachten Leistungen nach freiem Ermessen des Auftraggebers.
              </p>
            </div>

            <div class="contract-section">
              <h3>§ 8 Haftung</h3>
              <p>
                <span class="clause clause--danger" data-clause="unlimitedLiability" tabindex="0" role="button" aria-label="Klausel erklären: Unbeschränkte Haftung">Die Auftragnehmer*in haftet gegenüber dem Auftraggeber für alle Schäden, die durch ihre Tätigkeit oder Unterlassung im Rahmen dieses Vertrags unmittelbar oder mittelbar entstehen.</span>
              </p>
            </div>

            <div class="contract-section">
              <h3>§ 9 Versicherung</h3>
              <p>
                <span class="clause clause--info" data-clause="insuranceObligation" tabindex="0" role="button" aria-label="Klausel erklären: Versicherungspflicht">Die Auftragnehmer*in ist verpflichtet, für die Dauer des Vertragsverhältnisses eine Berufshaftpflichtversicherung mit einer Mindestdeckungssumme von € 500.000 auf eigene Kosten abzuschließen und dem Auftraggeber auf Verlangen nachzuweisen.</span>
              </p>
            </div>

            <div class="contract-section">
              <h3>§ 10 Gerichtsstand und anwendbares Recht</h3>
              <p>
                Für alle Streitigkeiten aus diesem Vertrag gilt ausschließlich österreichisches Recht. <span class="clause clause--info" data-clause="jurisdiction" tabindex="0" role="button" aria-label="Klausel erklären: Gerichtsstand">Als ausschließlicher Gerichtsstand wird Wien vereinbart.</span>
              </p>
            </div>

            <div class="contract-section">
              <h3>§ 11 Schriftform</h3>
              <p>
                <span class="clause clause--info" data-clause="writtenForm" tabindex="0" role="button" aria-label="Klausel erklären: Schriftformklausel">Änderungen und Ergänzungen dieses Vertrages bedürfen der Schriftform und der Unterzeichnung durch beide Parteien. Mündliche Nebenabreden bestehen nicht und gelten nicht.</span>
              </p>
            </div>

            <div class="contract-section">
              <h3>§ 12 Schlussbestimmungen</h3>
              <p>
                <span class="clause clause--danger" data-clause="unilateralModification" tabindex="0" role="button" aria-label="Klausel erklären: Einseitiges Änderungsrecht">Der Auftraggeber behält sich das Recht vor, einzelne Vertragsbestandteile bei wesentlichen Änderungen der organisatorischen oder finanziellen Rahmenbedingungen einseitig anzupassen.</span> Sollten einzelne Bestimmungen dieses Vertrages unwirksam sein, bleibt der Vertrag im Übrigen wirksam.
              </p>
            </div>

            <div class="contract-section contract-signatures">
              <p>Wien, den _______________</p>
              <div class="contract-sig-grid">
                <div>
                  <div class="contract-sig-line"></div>
                  <p class="small muted">Auftraggeber</p>
                </div>
                <div>
                  <div class="contract-sig-line"></div>
                  <p class="small muted">Auftragnehmer*in</p>
                </div>
              </div>
            </div>

          </div><!-- /.contract-doc -->
        </div>
      </section>

      <section class="card">
        <div class="card-head">
          <h2>Alle Klauseln im Überblick</h2>
        </div>
        <div class="card-body">
          <div id="clauseIndex" class="clause-index"></div>
        </div>
      </section>

    </main>
  </div>
<?php require_once __DIR__ . '/site_footer.php'; render_site_footer(); ?>
</body>
</html>
