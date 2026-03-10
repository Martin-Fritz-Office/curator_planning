<?php
?><!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>artbackstage | SVS Leistungsübersicht – Sozialleistungen für Selbstständige</title>
  <link rel="icon" type="image/svg+xml" href="favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" />
  <link rel="stylesheet" href="style.css" />
  <style>
    /* ── SVS Benefits Page ── */
    .source-banner {
      background: var(--surface-tinted);
      border: 1.5px solid var(--border);
      border-radius: var(--radius);
      padding: 14px 20px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 14px;
      flex-wrap: wrap;
    }
    .source-banner-text {
      flex: 1;
      min-width: 200px;
      font-size: 0.875rem;
      color: var(--muted);
      line-height: 1.5;
    }
    .source-banner-text strong { color: var(--text); }
    .source-banner-actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    /* ── Filter bar ── */
    .filter-bar {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 24px;
    }
    .filter-btn {
      padding: 7px 16px;
      border-radius: 100px;
      border: 1.5px solid var(--border);
      background: var(--surface);
      cursor: pointer;
      font-family: var(--font);
      font-size: 0.84rem;
      font-weight: 500;
      color: var(--text);
      transition: background 0.15s, border-color 0.15s, color 0.15s;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .filter-btn:hover { background: var(--surface-soft); border-color: var(--accent); }
    .filter-btn.active {
      background: var(--accent);
      border-color: var(--accent);
      color: #fff;
    }
    .filter-btn .dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      display: inline-block;
    }

    /* ── Benefit cards ── */
    .benefits-list { display: flex; flex-direction: column; gap: 10px; }
    .benefit-card {
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-radius: var(--radius);
      overflow: hidden;
      transition: box-shadow 0.15s;
    }
    .benefit-card:hover { box-shadow: var(--shadow-soft); }

    .benefit-card-header {
      padding: 16px 20px;
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      user-select: none;
      min-height: 0;
    }
    .benefit-card-header:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; }

    .cat-badge {
      font-size: 0.68rem;
      font-weight: 700;
      padding: 3px 9px;
      border-radius: 100px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .cat-krankheit  { background: #d1f0e0; color: #158045; }
    .cat-mutterschaft { background: #ede9fe; color: #6d28d9; }
    .cat-familie    { background: #dbeafe; color: #1d4ed8; }
    .cat-pension    { background: #fef3c7; color: #92400e; }
    .cat-unfall     { background: #fee2e2; color: #b91c1c; }

    .benefit-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--headline);
      flex: 1;
      line-height: 1.3;
    }
    .amount-badge {
      background: var(--surface-soft);
      border: 1px solid var(--border);
      color: var(--accent-dark);
      padding: 4px 11px;
      border-radius: 100px;
      font-size: 0.8rem;
      font-weight: 600;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .chevron-icon {
      flex-shrink: 0;
      color: var(--muted);
      transition: transform 0.2s;
    }
    .benefit-card.expanded .chevron-icon { transform: rotate(180deg); }

    .benefit-lead {
      padding: 0 20px 14px;
      font-size: 0.9rem;
      color: var(--muted);
      line-height: 1.5;
      border-bottom: 1px solid var(--border-soft);
    }

    .benefit-details {
      padding: 18px 20px 20px;
    }
    .benefit-details[hidden] { display: none; }
    .detail-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 14px;
      margin-bottom: 16px;
    }
    .detail-item {}
    .detail-label {
      font-size: 0.73rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      color: var(--muted);
      margin-bottom: 3px;
    }
    .detail-value {
      font-size: 0.9rem;
      color: var(--text);
      line-height: 1.5;
    }
    .detail-value strong { color: var(--headline); }

    .benefit-conditions {
      background: var(--surface-tinted);
      border-radius: var(--radius-sm);
      padding: 12px 16px;
      margin-bottom: 14px;
    }
    .benefit-conditions h4 {
      font-size: 0.78rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--muted);
      margin: 0 0 8px;
    }
    .benefit-conditions ul {
      margin: 0;
      padding-left: 18px;
      font-size: 0.88rem;
      color: var(--text);
      line-height: 1.6;
    }

    .benefit-footer-links {
      display: flex;
      gap: 10px;
      align-items: center;
      flex-wrap: wrap;
      padding-top: 4px;
    }
    .link-arrow {
      font-size: 0.82rem;
      color: var(--accent-dark);
      text-decoration: none;
      font-weight: 500;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .link-arrow:hover { text-decoration: underline; }

    /* No-results state */
    .no-results {
      text-align: center;
      padding: 40px 20px;
      color: var(--muted);
      font-size: 0.95rem;
      display: none;
    }
    .no-results.visible { display: block; }

    /* Quick overview table */
    .overview-card { margin-bottom: 20px; }
    .overview-table { width: 100%; border-collapse: collapse; font-size: 0.88rem; }
    .overview-table th {
      text-align: left;
      padding: 8px 12px;
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      color: var(--muted);
      border-bottom: 1.5px solid var(--border);
    }
    .overview-table td {
      padding: 9px 12px;
      border-bottom: 1px solid var(--border-soft);
      vertical-align: middle;
      line-height: 1.4;
    }
    .overview-table tr:last-child td { border-bottom: none; }
    .overview-table tr { cursor: pointer; transition: background 0.1s; }
    .overview-table tr:hover td { background: var(--surface-soft); }
    .overview-table .jump-link { color: var(--accent-dark); font-weight: 500; }

    @media (max-width:700px) {
      .benefit-card-header { flex-wrap: wrap; }
      .amount-badge { font-size: 0.75rem; }
      .overview-table { display: none; } /* hide table on mobile */
    }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Zum Hauptinhalt springen</a>
  <div class="page">

    <header class="header">
      <div>
        <p class="eyebrow brand-mark">
          <span class="brand-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="img" focusable="false">
              <rect x="2.5" y="2.5" width="19" height="19" rx="5"></rect>
              <circle cx="9" cy="9" r="1.6"></circle>
              <path d="M5.8 17.3h12.4l-4.1-4.7-2.8 2.9-2-2.1z"></path>
            </svg>
          </span>
          <span>artbackstage</span>
        </p>
        <h1>SVS Leistungsübersicht: Sozialleistungen für Selbstständige</h1>
        <p class="muted">Interaktive Übersicht der wichtigsten SVS-Leistungen für Gewerbetreibende und Neue Selbstständige (GSVG) – Krankheit, Mutterschaft, Familie, Pension und Unfall.<span data-footnote="Quelle: SVS – Sozialversicherung der Selbständigen, Broschüre „Sozialleistungen für Selbstständige" (Stand: Jänner 2022). Angaben ohne Gewähr; aktuelle Werte immer auf svs.at prüfen."></span></p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index_soziales.php">Zurück zu Soziales</a>
        <a class="btn btn-outline" href="svs_sozialleistungen_2022.pdf" download="SVS_Sozialleistungen_2022.pdf" aria-label="SVS-Broschüre als PDF herunterladen">PDF herunterladen ↓</a>
      </div>
    </header>

    <!-- Source attribution banner -->
    <div class="source-banner" role="note" aria-label="Quellenangabe">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-dark)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" flex-shrink="0" style="flex-shrink:0">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <p class="source-banner-text">
        <strong>Quelle: SVS-Broschüre „Sozialleistungen für Selbstständige" (Stand: Jänner 2022).</strong>
        Gilt für Gewerbetreibende und Neue Selbstständige (GSVG). Betragsangaben ändern sich jährlich –
        aktuelle Werte immer direkt auf <a href="https://www.svs.at" target="_blank" rel="noopener noreferrer">svs.at</a> prüfen.
      </p>
      <div class="source-banner-actions">
        <a class="btn btn-outline" href="https://www.svs.at/cdscontent/load?contentid=10008.763400&version=1641806109" target="_blank" rel="noopener noreferrer" style="font-size:0.82rem;padding:6px 12px">Quelle öffnen ↗</a>
        <a class="btn btn-outline" href="svs_sozialleistungen_2022.pdf" download="SVS_Sozialleistungen_2022.pdf" style="font-size:0.82rem;padding:6px 12px">PDF ↓</a>
      </div>
    </div>

    <main id="main-content">

      <!-- Quick overview table -->
      <div class="card overview-card">
        <div class="card-head">
          <h2>Überblick aller Leistungen</h2>
        </div>
        <div class="card-body" style="padding-top:0">
          <table class="overview-table" role="table" aria-label="Schnellübersicht SVS-Leistungen">
            <thead>
              <tr>
                <th scope="col">Leistung</th>
                <th scope="col">Bereich</th>
                <th scope="col">Schlüssel-Info</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr onclick="openAndScrollTo('card-kv')" title="Details anzeigen">
                <td><strong>Krankenversicherung</strong></td>
                <td><span class="cat-badge cat-krankheit">Krankheit</span></td>
                <td>Pflichtversicherung · Arzt, Medikamente, Spital</td>
                <td><span class="jump-link">↓ Details</span></td>
              </tr>
              <tr onclick="openAndScrollTo('card-kg')" title="Details anzeigen">
                <td><strong>Krankengeld</strong></td>
                <td><span class="cat-badge cat-krankheit">Krankheit</span></td>
                <td>60% der Beitragsgrundlage · freiwillig · ab Tag 4</td>
                <td><span class="jump-link">↓ Details</span></td>
              </tr>
              <tr onclick="openAndScrollTo('card-ul')" title="Details anzeigen">
                <td><strong>Unterstützungsleistung</strong></td>
                <td><span class="cat-badge cat-krankheit">Krankheit</span></td>
                <td>Pflichtleistung · ab 42 Tagen · max. 20 Wochen</td>
                <td><span class="jump-link">↓ Details</span></td>
              </tr>
              <tr onclick="openAndScrollTo('card-bh')" title="Details anzeigen">
                <td><strong>Betriebshilfe (Krankheit)</strong></td>
                <td><span class="cat-badge cat-krankheit">Krankheit</span></td>
                <td>Ersatzkraft für den Betrieb · max. 20 Wochen</td>
                <td><span class="jump-link">↓ Details</span></td>
              </tr>
              <tr onclick="openAndScrollTo('card-wg')" title="Details anzeigen">
                <td><strong>Wochengeld</strong></td>
                <td><span class="cat-badge cat-mutterschaft">Mutterschaft</span></td>
                <td>€ 61,25/Tag (2022) · 8+8 Wochen</td>
                <td><span class="jump-link">↓ Details</span></td>
              </tr>
              <tr onclick="openAndScrollTo('card-mbh')" title="Details anzeigen">
                <td><strong>Mutterschaftsbetriebshilfe</strong></td>
                <td><span class="cat-badge cat-mutterschaft">Mutterschaft</span></td>
                <td>Alternative zum Wochengeld · Betriebsersatzkraft</td>
                <td><span class="jump-link">↓ Details</span></td>
              </tr>
              <tr onclick="openAndScrollTo('card-kbg')" title="Details anzeigen">
                <td><strong>Kinderbetreuungsgeld</strong></td>
                <td><span class="cat-badge cat-familie">Familie</span></td>
                <td>Pauschal oder einkommensabh. · auch für Selbstständige</td>
                <td><span class="jump-link">↓ Details</span></td>
              </tr>
              <tr onclick="openAndScrollTo('card-pv')" title="Details anzeigen">
                <td><strong>Pensionsversicherung</strong></td>
                <td><span class="cat-badge cat-pension">Pension</span></td>
                <td>18,5% GSVG / 20% FSVG der Beitragsgrundlage</td>
                <td><span class="jump-link">↓ Details</span></td>
              </tr>
              <tr onclick="openAndScrollTo('card-sv')" title="Details anzeigen">
                <td><strong>Selbständigenvorsorge</strong></td>
                <td><span class="cat-badge cat-pension">Pension</span></td>
                <td>1,53% der Beitragsgrundlage · wie Abfertigung</td>
                <td><span class="jump-link">↓ Details</span></td>
              </tr>
              <tr onclick="openAndScrollTo('card-uv')" title="Details anzeigen">
                <td><strong>Unfallversicherung</strong></td>
                <td><span class="cat-badge cat-unfall">Unfall</span></td>
                <td>Pflichtversicherung · fixer Jahresbeitrag</td>
                <td><span class="jump-link">↓ Details</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Category filter -->
      <div role="group" aria-label="Leistungen filtern" style="margin-bottom:6px">
        <p class="muted" style="font-size:0.83rem;margin:0 0 10px">Nach Bereich filtern:</p>
        <div class="filter-bar">
          <button class="filter-btn active" data-filter="all">
            Alle Leistungen
          </button>
          <button class="filter-btn" data-filter="krankheit">
            <span class="dot" style="background:#158045"></span> Krankheit
          </button>
          <button class="filter-btn" data-filter="mutterschaft">
            <span class="dot" style="background:#6d28d9"></span> Mutterschaft
          </button>
          <button class="filter-btn" data-filter="familie">
            <span class="dot" style="background:#1d4ed8"></span> Familie
          </button>
          <button class="filter-btn" data-filter="pension">
            <span class="dot" style="background:#92400e"></span> Pension &amp; Vorsorge
          </button>
          <button class="filter-btn" data-filter="unfall">
            <span class="dot" style="background:#b91c1c"></span> Unfall
          </button>
        </div>
      </div>

      <p class="no-results" id="noResults">Keine Leistungen für diesen Filter gefunden.</p>

      <!-- ── Benefit cards ── -->
      <div class="benefits-list" id="benefitsList">

        <!-- 1: Krankenversicherung -->
        <article class="benefit-card" data-category="krankheit" id="card-kv">
          <div class="benefit-card-header" role="button" tabindex="0" aria-expanded="false" onclick="toggleCard(this)" onkeydown="if(event.key==='Enter'||event.key===' ')toggleCard(this)">
            <span class="cat-badge cat-krankheit">Krankheit</span>
            <span class="benefit-title">Krankenversicherung</span>
            <span class="amount-badge">Pflichtversicherung</span>
            <svg class="chevron-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <p class="benefit-lead">Alle nach GSVG versicherten Gewerbetreibenden und Neuen Selbstständigen sind in der Krankenversicherung pflichtversichert. Im Krankheitsfall übernimmt die SVS Kosten für ärztliche Behandlung, Medikamente und Spital – mit Selbstbehalt.</p>
          <div class="benefit-details" hidden>
            <div class="detail-grid">
              <div class="detail-item">
                <div class="detail-label">Art der Versicherung</div>
                <div class="detail-value"><strong>Pflichtversicherung</strong> (kein gesonderter Antrag nötig)</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Sachleistungsberechtigung</div>
                <div class="detail-value">Einkommen ≤ Sachleistungsgrenze (2022: € 69.857,09 Jahreseinkommen)</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Selbstbehalt</div>
                <div class="detail-value"><strong>20 %</strong> bei ärztlicher Leistung</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Leistungen umfassen</div>
                <div class="detail-value">Ärztliche Hilfe, Medikamente, Heilbehelfe, Zahnbehandlung, Krankenhauspflege, Rehabilitation</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Mehrfachversicherung möglich</div>
                <div class="detail-value">Ja – gleichzeitig nach ASVG, GSVG, BSVG möglich</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Beitragssatz KV (2022)</div>
                <div class="detail-value"><strong>6,8 %</strong> der Beitragsgrundlage</div>
              </div>
            </div>
            <div class="benefit-footer-links">
              <a class="link-arrow" href="https://www.svs.at/cdscontent/?contentid=10007.849620&portal=svsportal" target="_blank" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                Krankenversicherung auf svs.at
              </a>
            </div>
          </div>
        </article>

        <!-- 2: Krankengeld -->
        <article class="benefit-card" data-category="krankheit" id="card-kg">
          <div class="benefit-card-header" role="button" tabindex="0" aria-expanded="false" onclick="toggleCard(this)" onkeydown="if(event.key==='Enter'||event.key===' ')toggleCard(this)">
            <span class="cat-badge cat-krankheit">Krankheit</span>
            <span class="benefit-title">Krankengeld (freiwillige Zusatzversicherung)</span>
            <span class="amount-badge">60 % der Beitragsgrundlage</span>
            <svg class="chevron-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <p class="benefit-lead">Selbstständige können eine freiwillige Zusatzversicherung abschließen, die bei längerer Arbeitsunfähigkeit ein tägliches Krankengeld auszahlt. Der Beitrag ist als Betriebsausgabe steuerlich absetzbar.</p>
          <div class="benefit-details" hidden>
            <div class="benefit-conditions">
              <h4>Voraussetzungen</h4>
              <ul>
                <li>GSVG-krankenversichert (Gewerbetreibende oder Neue Selbstständige)</li>
                <li>Antrag <strong>vor Vollendung des 60. Lebensjahres</strong> möglich (Schutz gilt danach weiter)</li>
                <li>Wartezeit: <strong>6 Monate</strong> nach Abschluss (entfällt bei Arbeitsunfall)</li>
                <li>Freiwillige Anmeldung bei der SVS erforderlich</li>
              </ul>
            </div>
            <div class="detail-grid">
              <div class="detail-item">
                <div class="detail-label">Beitrag</div>
                <div class="detail-value"><strong>2,5 %</strong> der KV-Beitragsgrundlage<br>Mindestbeitrag: € 30,77/Monat (2022)</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Leistungshöhe</div>
                <div class="detail-value"><strong>60 %</strong> der täglichen Beitragsgrundlage<br>(Mindesttagesatz gem. SVS-Wert)</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Beginn der Leistung</div>
                <div class="detail-value">Ab dem <strong>4. Tag</strong> der Arbeitsunfähigkeit</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Maximale Dauer</div>
                <div class="detail-value"><strong>26 Wochen</strong> pro Krankheitsfall<br>Nach 26 Wochen Pause: neuer Anspruch möglich</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Meldepflicht</div>
                <div class="detail-value">Arbeitsunfähigkeit: innerhalb von <strong>7 Tagen</strong> melden<br>Fortbestand: alle <strong>14 Tage</strong> ärztlich bestätigen (binnen 7 Tage einreichen)</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Steuerliches</div>
                <div class="detail-value">Beiträge <strong>voll als Betriebsausgabe</strong> absetzbar<br>Krankengeld ist als Betriebseinnahme zu versteuern</div>
              </div>
            </div>
            <div class="benefit-footer-links">
              <a class="link-arrow" href="https://www.svs.at/cdscontent/?contentid=10007.816735" target="_blank" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                Krankengeld auf svs.at
              </a>
            </div>
          </div>
        </article>

        <!-- 3: Unterstützungsleistung -->
        <article class="benefit-card" data-category="krankheit" id="card-ul">
          <div class="benefit-card-header" role="button" tabindex="0" aria-expanded="false" onclick="toggleCard(this)" onkeydown="if(event.key==='Enter'||event.key===' ')toggleCard(this)">
            <span class="cat-badge cat-krankheit">Krankheit</span>
            <span class="benefit-title">Unterstützungsleistung bei längerer Krankheit</span>
            <span class="amount-badge">Tagsatz · ab 42 Tagen</span>
            <svg class="chevron-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <p class="benefit-lead">Ohne extra Versicherung – wer länger als 42 Tage arbeitsunfähig ist, hat rückwirkend ab dem 4. Krankheitstag Anspruch auf diese Pflichtleistung. Sie richtet sich an Selbstständige, bei denen der Betrieb von ihrer persönlichen Arbeit abhängt.</p>
          <div class="benefit-details" hidden>
            <div class="benefit-conditions">
              <h4>Voraussetzungen (alle müssen zutreffen)</h4>
              <ul>
                <li>Selbstständig erwerbstätig und nach <strong>GSVG krankenversichert</strong></li>
                <li>Weniger als <strong>25 Mitarbeiter:innen</strong> regelmäßig beschäftigt</li>
                <li>Aufrechterhaltung des Betriebs hängt von der <strong>persönlichen Arbeitsleistung</strong> ab</li>
                <li>Ärztlich festgestellte <strong>Arbeitsunfähigkeit</strong> wegen Krankheit</li>
                <li>Krankenstand dauert <strong>mehr als 42 Tage</strong> ununterbrochen</li>
              </ul>
            </div>
            <div class="detail-grid">
              <div class="detail-item">
                <div class="detail-label">Leistungshöhe</div>
                <div class="detail-value">Tagsatz gemäß SVS-Jahreswert<br>(2026: € 40,04/Tag; 2022-Wert lt. Broschüre)</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Beginn (rückwirkend)</div>
                <div class="detail-value">Ab dem <strong>4. Krankheitstag</strong> – aber erst wenn der Krankenstand > 42 Tage dauert</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Maximale Dauer</div>
                <div class="detail-value"><strong>20 Wochen</strong> pro Erkrankung<br>Gleiche Erkrankung innerhalb 26 Wochen: Zeiten werden addiert</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Antragsfrist</div>
                <div class="detail-value">Krankmeldung innerhalb von <strong>2 Wochen</strong> nach ärztlicher Feststellung<br>Ärztliche Bestätigung rückdatierbar um bis zu 4 Wochen</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Nachweispflicht</div>
                <div class="detail-value">Alle <strong>14 Tage</strong> ärztliche Bestätigung, innerhalb 7 Tage einreichen</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Kombination mit Krankengeld</div>
                <div class="detail-value">Kann gleichzeitig zum Krankengeld aus der freiwilligen Zusatzversicherung bezogen werden</div>
              </div>
            </div>
            <div class="benefit-footer-links">
              <a class="link-arrow" href="https://www.svs.at/cdscontent/?contentid=10007.816734&portal=svsportal" target="_blank" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                Unterstützungsleistung auf svs.at
              </a>
            </div>
          </div>
        </article>

        <!-- 4: Betriebshilfe bei Krankheit -->
        <article class="benefit-card" data-category="krankheit" id="card-bh">
          <div class="benefit-card-header" role="button" tabindex="0" aria-expanded="false" onclick="toggleCard(this)" onkeydown="if(event.key==='Enter'||event.key===' ')toggleCard(this)">
            <span class="cat-badge cat-krankheit">Krankheit</span>
            <span class="benefit-title">Betriebshilfe bei Krankheit</span>
            <span class="amount-badge">Betriebsersatzkraft</span>
            <svg class="chevron-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <p class="benefit-lead">Wer aus Krankheitsgründen den Betrieb nicht weiterführen kann, kann eine Betriebshilfe beantragen: Die SVS stellt oder finanziert eine Ersatzkraft, die die unaufschiebbaren betrieblichen Aufgaben übernimmt.</p>
          <div class="benefit-details" hidden>
            <div class="benefit-conditions">
              <h4>Voraussetzungen</h4>
              <ul>
                <li>Gleiche Voraussetzungen wie bei der Unterstützungsleistung (GSVG, &lt; 25 MA, persönliche Arbeitsleistung, ärztlich bestätigte Arbeitsunfähigkeit)</li>
                <li>Betriebshilfe und Unterstützungsleistung können <strong>gleichzeitig</strong> in Anspruch genommen werden</li>
              </ul>
            </div>
            <div class="detail-grid">
              <div class="detail-item">
                <div class="detail-label">Art der Leistung</div>
                <div class="detail-value">SVS stellt Ersatzkraft oder übernimmt (anteilig) die Kosten einer selbst organisierten Aushilfe</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Maximale Dauer</div>
                <div class="detail-value"><strong>20 Wochen</strong> pro Krankheitsfall</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Antrag</div>
                <div class="detail-value">Direkt bei der SVS bzw. beim zuständigen Betriebshilfeverein; Antrag so früh wie möglich stellen</div>
              </div>
            </div>
            <div class="benefit-footer-links">
              <a class="link-arrow" href="https://www.svs.at/cdscontent/?contentid=10007.816736&portal=svsportal" target="_blank" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                Betriebshilfe auf svs.at
              </a>
            </div>
          </div>
        </article>

        <!-- 5: Wochengeld -->
        <article class="benefit-card" data-category="mutterschaft" id="card-wg">
          <div class="benefit-card-header" role="button" tabindex="0" aria-expanded="false" onclick="toggleCard(this)" onkeydown="if(event.key==='Enter'||event.key===' ')toggleCard(this)">
            <span class="cat-badge cat-mutterschaft">Mutterschaft</span>
            <span class="benefit-title">Wochengeld</span>
            <span class="amount-badge">€ 61,25 / Tag (2022)</span>
            <svg class="chevron-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <p class="benefit-lead">Selbstständige Schwangere erhalten das gleiche Wochengeld wie Angestellte. Es wird 8 Wochen vor bis 8 Wochen nach der Geburt ausbezahlt – als Einkommensersatz, wenn der Betrieb ruht oder eine Aushilfe eingesetzt wird.</p>
          <div class="benefit-details" hidden>
            <div class="benefit-conditions">
              <h4>Voraussetzungen</h4>
              <ul>
                <li>GSVG-krankenversichert in den <strong>6 Monaten</strong> vor Beginn des Mutterschutzes</li>
                <li>Betrieb während des Mutterschutzes <strong>ruhend gemeldet</strong> oder Ersatzkraft beschäftigt (<strong>mind. 4 Tage/Woche</strong> bzw. 20+ Std./Woche)</li>
                <li>Ausnahme: wenn Betrieb/Berufszulassung keine Aushilfe erlaubt</li>
              </ul>
            </div>
            <div class="detail-grid">
              <div class="detail-item">
                <div class="detail-label">Betrag (Stand: 2022)</div>
                <div class="detail-value"><strong>€ 61,25 pro Tag</strong><br>(Betrag wird jährlich valorisiert)</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Zeitraum Standardfall</div>
                <div class="detail-value"><strong>8 Wochen vor</strong> dem errechneten Geburtstermin bis <strong>8 Wochen nach</strong> der Geburt</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Verlängerter Schutz</div>
                <div class="detail-value"><strong>12 Wochen nach</strong> der Geburt bei Mehrlingsgeburten, Frühgeburten oder Kaiserschnitt</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Frühzeitiger Schutz</div>
                <div class="detail-value">Bei ärztlichem Attest (Gesundheitsgefährdung) kann der Mutterschutz früher beginnen</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Antrag</div>
                <div class="detail-value">Schwangerschaft der SVS <strong>spätestens 3 Monate vor</strong> dem errechneten Geburtstermin melden; online auf svs.at</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Auszahlung</div>
                <div class="detail-value">Rückwirkend in bis zu 3 Teilbeträgen oder auf Wunsch monatlich, direkt auf Konto</div>
              </div>
            </div>
            <div class="benefit-footer-links">
              <a class="link-arrow" href="https://www.svs.at/cdscontent/?contentid=10007.816826&viewmode=content" target="_blank" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                Wochengeld auf svs.at
              </a>
            </div>
          </div>
        </article>

        <!-- 6: Mutterschaftsbetriebshilfe -->
        <article class="benefit-card" data-category="mutterschaft" id="card-mbh">
          <div class="benefit-card-header" role="button" tabindex="0" aria-expanded="false" onclick="toggleCard(this)" onkeydown="if(event.key==='Enter'||event.key===' ')toggleCard(this)">
            <span class="cat-badge cat-mutterschaft">Mutterschaft</span>
            <span class="benefit-title">Mutterschaftsbetriebshilfe</span>
            <span class="amount-badge">Alternative zum Wochengeld</span>
            <svg class="chevron-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <p class="benefit-lead">Statt Wochengeld kann eine Betriebsersatzkraft beantragt werden, die während des Mutterschutzes die unaufschiebbaren Betriebsaufgaben übernimmt. Wochengeld und Betriebshilfe schließen sich gegenseitig aus.</p>
          <div class="benefit-details" hidden>
            <div class="benefit-conditions">
              <h4>Wichtige Hinweise</h4>
              <ul>
                <li><strong>Ausschlussprinzip:</strong> Während die Betriebshilfe genutzt wird, entfällt das Wochengeld für diesen Zeitraum</li>
                <li>Die Dauer eines Wochengeld-Bezugs wird <strong>nicht</strong> auf die max. Dauer der Unterstützungsleistung angerechnet (seit 31.12.2021)</li>
                <li>Antrag: direkt beim zuständigen <strong>Betriebshilfeverein</strong> (Gewerbetreibende/Neue Selbstständige) oder <strong>Maschinenring</strong> (Bäuerinnen)</li>
              </ul>
            </div>
            <div class="detail-grid">
              <div class="detail-item">
                <div class="detail-label">Art der Leistung</div>
                <div class="detail-value">SVS bzw. Betriebshilfeverein stellt eine Ersatzkraft für den Betrieb zur Verfügung</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Zeitraum</div>
                <div class="detail-value">Entspricht dem Wochengeld-Zeitraum: 8+8 Wochen (bzw. 12 Wochen bei Komplikationen)</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Antragsstelle</div>
                <div class="detail-value">Betriebshilfevereine in den Bundesländern (Gewerbetreibende/Neue Selbstständige) · Maschinenringe (Bäuerinnen)</div>
              </div>
            </div>
            <div class="benefit-footer-links">
              <a class="link-arrow" href="https://www.svs.at/cdscontent/?contentid=10007.816826&viewmode=content" target="_blank" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                Mutterschaftsbetriebshilfe auf svs.at
              </a>
            </div>
          </div>
        </article>

        <!-- 7: Kinderbetreuungsgeld -->
        <article class="benefit-card" data-category="familie" id="card-kbg">
          <div class="benefit-card-header" role="button" tabindex="0" aria-expanded="false" onclick="toggleCard(this)" onkeydown="if(event.key==='Enter'||event.key===' ')toggleCard(this)">
            <span class="cat-badge cat-familie">Familie</span>
            <span class="benefit-title">Kinderbetreuungsgeld</span>
            <span class="amount-badge">Pauschal oder einkommensabh.</span>
            <svg class="chevron-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <p class="benefit-lead">Das Kinderbetreuungsgeld steht auch Selbstständigen zu – nach dem Wochengeld bzw. direkt ab der Geburt. Es kann pauschal (mehrere Modelle) oder einkommensabhängig bezogen werden.</p>
          <div class="benefit-details" hidden>
            <div class="detail-grid">
              <div class="detail-item">
                <div class="detail-label">Pauschales KBG – Modelle</div>
                <div class="detail-value">
                  Vier Varianten je nach Bezugsdauer (Hauptbezieher + Partner):<br>
                  <strong>KBG 20+4</strong>, <strong>15+3</strong>, <strong>12+2</strong>, <strong>24+6</strong> Monate<br>
                  Tagessätze 2022 je nach Modell: ca. € 14,53 – € 33,88/Tag
                </div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Einkommensabhängiges KBG</div>
                <div class="detail-value">
                  <strong>80 %</strong> des zuletzt maßgeblichen Nettoeinkommens<br>
                  Max. € 66,- /Tag (2022-Wert), mind. 12 Monate<br>
                  Antrag binnen 91 Tagen nach Geburt
                </div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Zuverdienstgrenze</div>
                <div class="detail-value">Beim pauschalen KBG: € 16.200/Jahr (2022)<br>Beim einkommensabhängigen KBG: € 6.800/Jahr</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Antragstelle</div>
                <div class="detail-value">Nicht SVS – sondern beim zuständigen <strong>Krankenversicherungsträger</strong> (SVS, ÖGK etc.) oder online über <strong>Familienbeihilfe Online (FABIAN)</strong></div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Beginn</div>
                <div class="detail-value">Im Anschluss an das Wochengeld oder ab Geburt (wenn kein Wochengeld)</div>
              </div>
            </div>
            <div class="benefit-footer-links">
              <a class="link-arrow" href="https://www.oesterreich.gv.at/themen/familie_und_partnerschaft/geburt/3/Seite.3280007.html" target="_blank" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                Kinderbetreuungsgeld auf oesterreich.gv.at
              </a>
            </div>
          </div>
        </article>

        <!-- 8: Pensionsversicherung -->
        <article class="benefit-card" data-category="pension" id="card-pv">
          <div class="benefit-card-header" role="button" tabindex="0" aria-expanded="false" onclick="toggleCard(this)" onkeydown="if(event.key==='Enter'||event.key===' ')toggleCard(this)">
            <span class="cat-badge cat-pension">Pension</span>
            <span class="benefit-title">Pensionsversicherung</span>
            <span class="amount-badge">18,5 % GSVG / 20 % FSVG</span>
            <svg class="chevron-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <p class="benefit-lead">Die Pensionsversicherung ist der größte Einzelposten der Sozialversicherungsbeiträge. Selbstständige nach GSVG zahlen 18,5 %, freiberuflich Selbstständige nach FSVG 20 % ihrer Beitragsgrundlage.</p>
          <div class="benefit-details" hidden>
            <div class="detail-grid">
              <div class="detail-item">
                <div class="detail-label">Beitragssatz (2022)</div>
                <div class="detail-value">
                  <strong>18,5 %</strong> für Gewerbetreibende/Neue Selbstständige (GSVG)<br>
                  <strong>20 %</strong> für freiberuflich Selbstständige (FSVG)
                </div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Beitragsgrundlage 2022</div>
                <div class="detail-value">
                  Mindestbeitragsgrundlage: <strong>€ 485,85/Monat</strong><br>
                  Höchstbeitragsgrundlage: <strong>€ 6.090/Monat</strong>
                </div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Leistungen</div>
                <div class="detail-value">Alterspension, Invaliditätspension/Erwerbsunfähigkeitspension, Hinterbliebenenpension, Rehabilitationsgeld</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Vorläufige Beiträge</div>
                <div class="detail-value">In den ersten drei Jahren: vorläufige Berechnung auf Basis der Mindestbeitragsgrundlage; spätere Nachbemessung nach Einkommenssteuerbescheid</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Pensionsantrittsalter</div>
                <div class="detail-value">Regelpensionsalter: <strong>65 Jahre</strong> (Männer); <strong>60 → 65 Jahre</strong> (Frauen, Angleichung bis 2033)</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Hinweis für Kulturberufe</div>
                <div class="detail-value">Niedrige Beitragsgrundlagen bedeuten niedrige Pensionsansprüche – besonders relevant bei Mehrfachbeschäftigung und Projektarbeit</div>
              </div>
            </div>
            <div class="benefit-footer-links">
              <a class="link-arrow" href="https://www.svs.at/cdscontent/?contentid=10007.816695&portal=svsportal" target="_blank" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                Pensionsversicherung auf svs.at
              </a>
            </div>
          </div>
        </article>

        <!-- 9: Selbständigenvorsorge -->
        <article class="benefit-card" data-category="pension" id="card-sv">
          <div class="benefit-card-header" role="button" tabindex="0" aria-expanded="false" onclick="toggleCard(this)" onkeydown="if(event.key==='Enter'||event.key===' ')toggleCard(this)">
            <span class="cat-badge cat-pension">Pension</span>
            <span class="benefit-title">Selbständigenvorsorge</span>
            <span class="amount-badge">1,53 % der Beitragsgrundlage</span>
            <svg class="chevron-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <p class="benefit-lead">Die Selbständigenvorsorge funktioniert wie die Abfertigung für Angestellte. Beiträge fließen automatisch in eine Betriebliche Vorsorgekasse (BV-Kasse) und können bei Beendigung der Tätigkeit oder in der Pension ausgezahlt werden.</p>
          <div class="benefit-details" hidden>
            <div class="detail-grid">
              <div class="detail-item">
                <div class="detail-label">Beitragssatz</div>
                <div class="detail-value"><strong>1,53 %</strong> der vorläufigen KV-Beitragsgrundlage</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Verwaltung</div>
                <div class="detail-value">SVS überweist Beiträge direkt an die gewählte <strong>Betriebliche Vorsorgekasse (BV-Kasse)</strong></div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Auszahlung möglich</div>
                <div class="detail-value">Bei Beendigung der Selbstständigkeit, ab 7 Jahren Einzahlungsdauer, oder bei Antritt der Alterspension</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Steuerliches</div>
                <div class="detail-value">Beiträge sind <strong>Betriebsausgabe</strong>; Auszahlung beim Pensionsantritt unter Umständen steuerfrei oder begünstigt</div>
              </div>
            </div>
            <div class="benefit-footer-links">
              <a class="link-arrow" href="https://www.svs.at/cdscontent/?contentid=10007.816708&portal=svsportal" target="_blank" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                Selbständigenvorsorge auf svs.at
              </a>
            </div>
          </div>
        </article>

        <!-- 10: Unfallversicherung -->
        <article class="benefit-card" data-category="unfall" id="card-uv">
          <div class="benefit-card-header" role="button" tabindex="0" aria-expanded="false" onclick="toggleCard(this)" onkeydown="if(event.key==='Enter'||event.key===' ')toggleCard(this)">
            <span class="cat-badge cat-unfall">Unfall</span>
            <span class="benefit-title">Unfallversicherung</span>
            <span class="amount-badge">Fixer Jahresbeitrag</span>
            <svg class="chevron-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <p class="benefit-lead">Die Unfallversicherung ist für alle Selbstständigen Pflicht und wird mit einem fixen Jahresbetrag unabhängig vom Einkommen berechnet. Sie deckt Arbeitsunfälle, Wegunfälle und Berufskrankheiten ab.</p>
          <div class="benefit-details" hidden>
            <div class="detail-grid">
              <div class="detail-item">
                <div class="detail-label">Art der Versicherung</div>
                <div class="detail-value"><strong>Pflichtversicherung</strong>, fixer Betrag unabhängig vom Einkommen</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Beitrag (2022)</div>
                <div class="detail-value">Jährlicher Fixbetrag gem. SVS-Broschüre 2022 (quartalsweise verrechnet)</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Versicherte Ereignisse</div>
                <div class="detail-value">Arbeitsunfälle, Wegunfälle, Berufskrankheiten</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Leistungen</div>
                <div class="detail-value">Ärztliche Heilbehandlung, Rehabilitation, Unfallrente bei Erwerbsminderung, Hinterbliebenenversorgung, Sterbegeld</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Beitragsgrundlage</div>
                <div class="detail-value">Kein Einkommensbezug – gilt für alle Selbstständigen gleich</div>
              </div>
            </div>
            <div class="benefit-footer-links">
              <a class="link-arrow" href="https://www.svs.at/cdscontent/?contentid=10007.816809&portal=svsportal" target="_blank" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                Unfallversicherung auf svs.at
              </a>
            </div>
          </div>
        </article>

      </div><!-- /benefits-list -->

      <!-- Context note for cultural sector -->
      <div class="card" style="margin-top:24px">
        <div class="card-head">
          <h2>Relevanz für Kulturberufe</h2>
        </div>
        <div class="card-body">
          <p>Freischaffende Kuratorinnen und Kuratoren sowie andere Kulturschaffende sind häufig als Neue Selbstständige nach GSVG pflichtversichert. Dabei gelten folgende Besonderheiten:</p>
          <ul>
            <li><strong>Einkommensschwankungen</strong> – SVS-Beiträge werden vorläufig auf Basis der Mindestbeitragsgrundlage berechnet; nach dem Einkommenssteuerbescheid folgt eine Nachbemessung. Bei niedrigem Einkommen kann die endgültige Beitragsgrundlage unter der Mindestgrenze liegen.</li>
            <li><strong>Niedrige Pensionsansprüche</strong> – Projektbasierte Arbeit mit wechselnden Einkommensphasen führt zu geringeren Beitragszeiten und niedrigeren Pensionsgrundlagen. Langfristige Vorsorge ist besonders wichtig.</li>
            <li><strong>Keine automatische Absicherung bei Krankheit</strong> – Das Krankengeld (freiwillige Zusatzversicherung) muss aktiv beantragt werden. Ohne diese Absicherung gibt es erst ab 42 Tagen Krankenstand eine Leistung (Unterstützungsleistung).</li>
            <li><strong>Mehrfachbeschäftigung</strong> – Bei gleichzeitiger ASVG-Pflichtversicherung (z.B. als Angestellte:r) und GSVG-Versicherung können Doppelversicherungen entstehen; manche Leistungen sind dann nicht kumulierbar.</li>
          </ul>
          <p style="margin-top:14px">
            <a class="link-arrow" href="gender_report_summary.php">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>
              Gender Report: Einkommens- und Absicherungsmuster im Kulturbereich
            </a>
          </p>
        </div>
      </div>

    </main>
  </div>

<?php require_once __DIR__ . '/site_footer.php'; render_site_footer(); ?>

  <script>
    // ── Accordion toggle ──
    function toggleCard(trigger) {
      const card = trigger.closest('.benefit-card');
      const details = card.querySelector('.benefit-details');
      const isExpanded = card.classList.contains('expanded');
      card.classList.toggle('expanded', !isExpanded);
      trigger.setAttribute('aria-expanded', String(!isExpanded));
      if (details) details.hidden = isExpanded;
    }

    // ── Category filter ──
    const filterBtns = document.querySelectorAll('.filter-btn');
    const benefitCards = document.querySelectorAll('.benefit-card');
    const noResults = document.getElementById('noResults');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filter = this.dataset.filter;
        let visible = 0;
        benefitCards.forEach(card => {
          const match = filter === 'all' || card.dataset.category === filter;
          card.hidden = !match;
          if (match) visible++;
        });
        noResults.classList.toggle('visible', visible === 0);
      });
    });

    // ── Quick overview table jump ──
    function openAndScrollTo(cardId) {
      const card = document.getElementById(cardId);
      if (!card) return;
      // Ensure the card is visible (reset filter to 'all' if needed)
      const cat = card.dataset.category;
      const activeFilter = document.querySelector('.filter-btn.active');
      if (activeFilter && activeFilter.dataset.filter !== 'all' && activeFilter.dataset.filter !== cat) {
        // Switch to 'all'
        filterBtns.forEach(b => b.classList.remove('active'));
        document.querySelector('[data-filter="all"]').classList.add('active');
        benefitCards.forEach(c => c.hidden = false);
      }
      // Expand the card
      const header = card.querySelector('.benefit-card-header');
      if (!card.classList.contains('expanded')) {
        toggleCard(header);
      }
      // Scroll to it
      setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    }
  </script>
</body>
</html>
