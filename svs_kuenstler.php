<?php
?><!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>artbackstage | SVS Selbstcheck: Versicherung für Kunstschaffende</title>
  <link rel="icon" type="image/svg+xml" href="favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" />
  <link rel="stylesheet" href="style.css" />
  <style>
    .step { display: none; }
    .step.active { display: block; }

    .info-box {
      background: var(--surface-tinted);
      border: 1px solid var(--border-soft);
      border-radius: var(--radius-sm);
      padding: 14px 18px;
      margin: 14px 0;
      font-size: 14px;
      color: var(--muted);
      line-height: 1.6;
    }
    .info-box strong { color: var(--text); }

    .warn-box {
      background: #fffbeb;
      border: 1px solid #fcd34d;
      border-radius: var(--radius-sm);
      padding: 14px 18px;
      margin: 14px 0;
      font-size: 14px;
      color: #92400e;
      line-height: 1.6;
    }

    .result-box {
      background: var(--accent-light);
      border: 1px solid var(--accent);
      border-radius: var(--radius);
      padding: 20px 24px;
      margin: 16px 0;
    }
    .result-box h3 { margin: 0 0 10px; color: var(--headline); font-size: 1.05rem; }
    .result-box p { margin: 0 0 8px; font-size: 14px; line-height: 1.65; }
    .result-box p:last-child { margin-bottom: 0; }

    .contrib-table {
      width: 100%;
      border-collapse: collapse;
      margin: 14px 0;
      font-size: 14px;
    }
    .contrib-table th {
      text-align: left;
      padding: 8px 12px;
      background: var(--surface-soft);
      border: 1px solid var(--border-soft);
      color: var(--headline);
      font-weight: 600;
    }
    .contrib-table td {
      padding: 8px 12px;
      border: 1px solid var(--border-soft);
      vertical-align: top;
    }
    .contrib-table tr:nth-child(even) td {
      background: var(--surface-tinted);
    }

    .answer-group { display: flex; flex-direction: column; gap: 10px; margin: 18px 0; }
    .answer-btn {
      display: block;
      width: 100%;
      text-align: left;
      padding: 13px 18px;
      border: 1.5px solid var(--border);
      border-radius: var(--radius-sm);
      background: var(--surface);
      cursor: pointer;
      font-size: 15px;
      color: var(--text);
      font-family: var(--font);
      transition: border-color .15s, background .15s;
      line-height: 1.45;
    }
    .answer-btn:hover { border-color: var(--accent); background: var(--surface-tinted); }
    .answer-btn.selected { border-color: var(--accent); background: var(--accent-light); font-weight: 600; }

    .input-row { margin: 14px 0; }
    .input-row label { display: block; font-size: 14px; color: var(--muted); margin-bottom: 6px; font-weight: 500; }
    .input-row input[type=number] {
      width: 100%;
      max-width: 240px;
      padding: 10px 14px;
      border: 1.5px solid var(--border);
      border-radius: var(--radius-sm);
      font-size: 15px;
      font-family: var(--font);
      color: var(--text);
      background: var(--surface);
    }
    .input-row input[type=number]:focus { outline: none; border-color: var(--accent); box-shadow: var(--focus-ring); }

    .step-nav { display: flex; gap: 12px; margin-top: 22px; align-items: center; flex-wrap: wrap; }

    .progress-bar-wrap {
      background: var(--border-soft);
      border-radius: 999px;
      height: 6px;
      margin-bottom: 20px;
      overflow: hidden;
    }
    .progress-bar-fill {
      background: var(--accent);
      height: 100%;
      border-radius: 999px;
      transition: width .3s ease;
    }

    .check-list { list-style: none; padding: 0; margin: 10px 0; }
    .check-list li { padding: 5px 0 5px 26px; position: relative; font-size: 14px; line-height: 1.5; }
    .check-list li::before { content: '✓'; position: absolute; left: 0; color: var(--accent); font-weight: 700; }

    .source-note {
      font-size: 12px;
      color: var(--muted);
      margin-top: 20px;
      padding-top: 14px;
      border-top: 1px solid var(--border-soft);
    }
    .source-note a { color: var(--accent-dark); }

    #incomeDisplay, #incomeBaseDisplay { font-weight: 700; color: var(--accent-dark); }
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
        <h1>SVS Selbstcheck: Sozialversicherung für Kunstschaffende</h1>
        <p class="muted">Interaktiver Selbstcheck auf Basis des SVS-Infoblatts „Versicherung &amp; Beitrag für Kunstschaffende" (Stand 2026). Beantworte einige Fragen und erhalte eine persönliche Übersicht deiner Versicherungssituation.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index_soziales.php">← Soziales</a>
        <a class="btn btn-outline" href="index.php">Home</a>
      </div>
    </header>

    <main id="main-content" class="card">
      <div class="card-head">
        <h2>Selbstcheck: Bin ich als Kunstschaffende*r versichert?</h2>
      </div>
      <div class="card-body">

        <div class="progress-bar-wrap" aria-hidden="true">
          <div class="progress-bar-fill" id="progressFill" style="width:0%"></div>
        </div>
        <p class="pill" id="stepLabel" style="display:inline-block;margin-bottom:16px;">Schritt 1 von 6</p>

        <!-- Step 1: Tätigkeitsstatus -->
        <div class="step active" id="step-1">
          <h3>Übst du eine freiberufliche künstlerische Tätigkeit aus?</h3>
          <p style="color:var(--muted);font-size:14px;">Freiberuflich tätige Kunstschaffende sind grundsätzlich bei der SVS in der Pensions-, Kranken- und Unfallversicherung pflichtversichert.</p>
          <div class="answer-group" role="group" aria-label="Antwortmöglichkeiten">
            <button class="answer-btn" data-step="1" data-val="yes">Ja, ich bin freiberuflich als Künstler*in tätig</button>
            <button class="answer-btn" data-step="1" data-val="no">Nein, ich bin angestellt oder anderweitig tätig</button>
            <button class="answer-btn" data-step="1" data-val="both">Ja, neben einer anderen Beschäftigung (z. B. auch angestellt)</button>
          </div>
          <div class="step-nav">
            <button class="btn" id="next-1" onclick="goStep(2)" disabled>Weiter</button>
          </div>
        </div>

        <!-- Step 2: Einkommensgrenze -->
        <div class="step" id="step-2">
          <h3>Wie hoch schätzt du deine Einkünfte aus künstlerischer Tätigkeit in diesem Jahr?</h3>
          <p style="color:var(--muted);font-size:14px;">Die Versicherungsgrenze beträgt <strong>6.613,20 € (2026)</strong>. Sie gilt unabhängig davon, ob du haupt- oder nebenberuflich tätig bist.</p>
          <div class="answer-group" role="group" aria-label="Einkommensbereich">
            <button class="answer-btn" data-step="2" data-val="below">Unter 6.613,20 € – ich liege wahrscheinlich darunter</button>
            <button class="answer-btn" data-step="2" data-val="above">Über 6.613,20 € – ich erwarte, darüber zu liegen</button>
            <button class="answer-btn" data-step="2" data-val="unsure">Ich bin unsicher / weiß es noch nicht</button>
          </div>
          <div class="info-box">
            <strong>Hinweis:</strong> Wenn du keine Erklärung abgibst, prüft die SVS dein Einkommen erst im Nachhinein anhand des Einkommensteuerbescheids. Bei Überschreitung der Grenze werden Beiträge rückwirkend inkl. 9,3&nbsp;% Beitragszuschlag vorgeschrieben.
          </div>
          <div class="step-nav">
            <button class="btn btn-outline" onclick="goStep(1)">Zurück</button>
            <button class="btn" id="next-2" onclick="goStep(3)" disabled>Weiter</button>
          </div>
        </div>

        <!-- Step 3: Meldung -->
        <div class="step" id="step-3">
          <h3>Hast du die Überschreitung der Versicherungsgrenze bereits bei der SVS gemeldet?</h3>
          <p style="color:var(--muted);font-size:14px;">Du kannst den Beginn der Pflichtversicherung selbst auslösen, indem du eine Erklärung abgibst. Das vermeidet den 9,3&nbsp;% Beitragszuschlag.</p>
          <div class="answer-group" role="group" aria-label="Meldestatus">
            <button class="answer-btn" data-step="3" data-val="yes">Ja, ich habe mich bereits gemeldet</button>
            <button class="answer-btn" data-step="3" data-val="no">Nein, noch nicht – ich warte auf meinen Steuerbescheid</button>
            <button class="answer-btn" data-step="3" data-val="na">Trifft nicht zu (mein Einkommen liegt unter der Grenze)</button>
          </div>
          <div class="step-nav">
            <button class="btn btn-outline" onclick="goStep(2)">Zurück</button>
            <button class="btn" id="next-3" onclick="goStep(4)" disabled>Weiter</button>
          </div>
        </div>

        <!-- Step 4: Berufsanfänger -->
        <div class="step" id="step-4">
          <h3>Bist du in den ersten drei Kalenderjahren deiner selbständigen Tätigkeit?</h3>
          <p style="color:var(--muted);font-size:14px;">Als Berufseinsteiger*in werden deine Beiträge in der Pensions- und Krankenversicherung vorläufig von der Mindestbeitragsgrundlage berechnet – unabhängig vom tatsächlichen Einkommen.</p>
          <div class="answer-group" role="group" aria-label="Berufsanfänger">
            <button class="answer-btn" data-step="4" data-val="yes">Ja, ich starte (innerhalb der ersten 3 Kalenderjahre)</button>
            <button class="answer-btn" data-step="4" data-val="no">Nein, ich bin bereits länger als 3 Kalenderjahre selbständig</button>
          </div>
          <div class="step-nav">
            <button class="btn btn-outline" onclick="goStep(3)">Zurück</button>
            <button class="btn" id="next-4" onclick="goStep(5)" disabled>Weiter</button>
          </div>
        </div>

        <!-- Step 5: K-SVFG Zuschuss -->
        <div class="step" id="step-5">
          <h3>Möchtest du prüfen, ob du Zuschüsse vom Künstler-Sozialversicherungsfonds (K-SVFG) erhalten kannst?</h3>
          <p style="color:var(--muted);font-size:14px;">Als Künstler*in im Sinne des K-SVFG kannst du unter Umständen bis zu <strong>158 € monatlich</strong> Zuschuss zu deinen Sozialversicherungsbeiträgen erhalten.</p>
          <div class="answer-group" role="group" aria-label="K-SVFG Zuschuss">
            <button class="answer-btn" data-step="5" data-val="yes">Ja, ich möchte die Voraussetzungen prüfen</button>
            <button class="answer-btn" data-step="5" data-val="no">Nein, das ist für mich nicht relevant</button>
          </div>
          <div class="step-nav">
            <button class="btn btn-outline" onclick="goStep(4)">Zurück</button>
            <button class="btn" id="next-5" onclick="goStep(6)" disabled>Weiter</button>
          </div>
        </div>

        <!-- Step 6: Mehrfachversicherung -->
        <div class="step" id="step-6">
          <h3>Bist du neben deiner künstlerischen Tätigkeit noch anderweitig versichert?</h3>
          <p style="color:var(--muted);font-size:14px;">Wenn du z. B. auch angestellt bist, eine Pension beziehst oder eine Landwirtschaft betreibst, bist du mehrfachversichert und zahlst in jede Versicherung Beiträge. Die Gesamtbelastung ist durch die Höchstbeitragsgrundlage gedeckelt.</p>
          <div class="answer-group" role="group" aria-label="Mehrfachversicherung">
            <button class="answer-btn" data-step="6" data-val="yes">Ja, ich bin auch anderweitig (z. B. als Angestellte*r) versichert</button>
            <button class="answer-btn" data-step="6" data-val="no">Nein, die SVS ist meine einzige Versicherung</button>
          </div>
          <div class="step-nav">
            <button class="btn btn-outline" onclick="goStep(5)">Zurück</button>
            <button class="btn" id="next-6" onclick="showResult()" disabled>Ergebnis anzeigen</button>
          </div>
        </div>

        <!-- Result -->
        <div class="step" id="step-result">
          <h3>Deine persönliche SVS-Übersicht</h3>
          <div id="resultContent"></div>
          <div class="source-note">
            Quelle: SVS Infoblatt „Versicherung &amp; Beitrag – Informationen für Kunstschaffende" (VS-008_N, Stand 2026).
            <a href="https://www.svs.at/cdscontent/load?contentid=10008.763400&amp;version=1641806109" target="_blank" rel="noopener noreferrer">Originalquelle (PDF)</a> ·
            Künstler-Sozialversicherungsfonds: <a href="mailto:office@ksvf.at">office@ksvf.at</a>, Tel. (01) 586 71 85.
            <br>Diese Übersicht ersetzt keine Rechtsberatung. Keine Haftung. Bitte prüfe alle Angaben direkt mit der SVS.
          </div>
          <div class="step-nav">
            <button class="btn btn-outline" onclick="resetTool()">Nochmal starten</button>
            <a class="btn btn-outline" href="index_soziales.php">Zurück zu Soziales</a>
          </div>
        </div>

      </div>
    </main>

    <!-- Info panel: always visible below -->
    <section class="card" style="margin-top:18px;">
      <div class="card-head">
        <h2>Beitragssätze &amp; Werte 2026 auf einen Blick</h2>
      </div>
      <div class="card-body">
        <table class="contrib-table" aria-label="Beitragssätze 2026">
          <thead>
            <tr>
              <th>Versicherungszweig</th>
              <th>Beitragssatz</th>
              <th>Mindestbeitragsgrundlage (mtl.)</th>
              <th>Mindestbeitrag (vierteljährlich)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Pensionsversicherung</td>
              <td>18,5 %</td>
              <td>551,10 €</td>
              <td>305,85 €</td>
            </tr>
            <tr>
              <td>Krankenversicherung</td>
              <td>6,8 %</td>
              <td>551,10 €</td>
              <td>112,44 €</td>
            </tr>
            <tr>
              <td>Unfallversicherung</td>
              <td>Pauschalbetrag</td>
              <td>—</td>
              <td>38,85 € (12,95 € × 3)</td>
            </tr>
          </tbody>
        </table>
        <p class="info-box" style="margin-top:10px;">
          <strong>Versicherungsgrenze 2026:</strong> 6.613,20 € Jahreseinkommen aus selbständiger künstlerischer Tätigkeit.<br>
          <strong>Höchstbeitragsgrundlage 2026:</strong> 97.020 € jährlich (Deckelung bei Mehrfachversicherung).<br>
          <strong>K-SVFG Zuschuss:</strong> max. 158 € monatlich · Einkommensobergrenze: 35.821,50 €/Jahr.<br>
          <strong>Beitragszuschlag bei verspäteter Meldung:</strong> 9,3 % der rückwirkenden Beiträge.
        </p>
      </div>
    </section>

  </div>
<?php require_once __DIR__ . '/site_footer.php'; render_site_footer(); ?>

<script>
  const answers = {};

  // Attach answer button listeners
  document.querySelectorAll('.answer-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const step = this.dataset.step;
      const val = this.dataset.val;
      answers[step] = val;
      // Deselect siblings
      document.querySelectorAll(`.answer-btn[data-step="${step}"]`).forEach(b => b.classList.remove('selected'));
      this.classList.add('selected');
      // Enable next button
      const nextBtn = document.getElementById(`next-${step}`);
      if (nextBtn) nextBtn.disabled = false;
    });
  });

  const TOTAL_STEPS = 6;

  function goStep(n) {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.getElementById(`step-${n}`).classList.add('active');
    // Update progress
    const pct = Math.round(((n - 1) / TOTAL_STEPS) * 100);
    document.getElementById('progressFill').style.width = pct + '%';
    document.getElementById('stepLabel').textContent = `Schritt ${n} von ${TOTAL_STEPS}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function showResult() {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.getElementById('step-result').classList.add('active');
    document.getElementById('progressFill').style.width = '100%';
    document.getElementById('stepLabel').textContent = 'Ergebnis';

    const a1 = answers['1']; // freelance status
    const a2 = answers['2']; // income vs threshold
    const a3 = answers['3']; // registration
    const a4 = answers['4']; // beginner
    const a5 = answers['5']; // ksvf subsidy
    const a6 = answers['6']; // multiple insurance

    let html = '';

    // ── Block 1: Versicherungspflicht ──────────────────────────────────────
    html += `<div class="result-box">`;
    html += `<h3>📋 Versicherungspflicht</h3>`;

    if (a1 === 'no') {
      html += `<p>Du übst keine freiberufliche künstlerische Tätigkeit aus. Eine GSVG-Pflichtversicherung über die SVS als Kunstschaffende*r trifft dich in dieser Konstellation nicht.</p>`;
    } else if (a2 === 'below') {
      html += `<p>Deine Einkünfte liegen voraussichtlich <strong>unter der Versicherungsgrenze von 6.613,20 €</strong>. Eine Pflichtversicherung greift dann nicht automatisch – die SVS prüft dies aber rückwirkend anhand deines Einkommensteuerbescheids.</p>`;
      html += `<p>Wichtig: Auch wenn keine Pflichtversicherung besteht, kannst du freiwillig eine GSVG-Versicherung beantragen.</p>`;
    } else if (a2 === 'above') {
      html += `<p>Deine Einkünfte übersteigen die Versicherungsgrenze von <strong>6.613,20 €</strong>. Du bist damit bei der SVS in der <strong>Pensions-, Kranken- und Unfallversicherung pflichtversichert</strong>.</p>`;
      if (a3 === 'no') {
        html += `<p class="warn-box" style="margin:0;">⚠️ Du hast die Überschreitung noch nicht gemeldet. Wenn dein Steuerbescheid vorliegt, können Beiträge rückwirkend inkl. <strong>9,3&nbsp;% Beitragszuschlag</strong> vorgeschrieben werden. Melde die Überschreitung innerhalb von <strong>8 Wochen nach Ausstellung des Einkommensteuerbescheids</strong>, um diesen Zuschlag zu vermeiden.</p>`;
      } else if (a3 === 'yes') {
        html += `<p>✅ Du hast dich bereits gemeldet – gut! Der Beginn deiner Pflichtversicherung ist damit festgestellt und du vermeidest den 9,3&nbsp;% Beitragszuschlag.</p>`;
      }
    } else {
      // unsure
      html += `<p>Du bist unsicher über deine Einkünfte. Die SVS prüft rückwirkend anhand des Einkommensteuerbescheids, ob die Versicherungsgrenze von 6.613,20 € überschritten wurde. Du kannst den Beginn der Pflichtversicherung auch proaktiv selbst auslösen, indem du erklärst, dass du über der Grenze liegen wirst.</p>`;
    }
    html += `</div>`;

    // ── Block 2: Beitragsberechnung ────────────────────────────────────────
    if (a1 !== 'no' && (a2 === 'above' || a2 === 'unsure')) {
      html += `<div class="result-box" style="margin-top:14px;">`;
      html += `<h3>💶 Deine voraussichtlichen Beiträge</h3>`;

      if (a4 === 'yes') {
        html += `<p>Als <strong>Berufseinsteiger*in</strong> (erste 3 Kalenderjahre) werden deine Pensions- und Krankenversicherungsbeiträge vorläufig von der <strong>Mindestbeitragsgrundlage (551,10 €/Monat)</strong> berechnet, bis dein Steuerbescheid für das jeweilige Jahr vorliegt.</p>`;
      } else {
        html += `<p>Deine Beiträge richten sich nach deinen Einkünften des drittvorangegangenen Jahres (vorläufige Beitragsgrundlage) und werden nach Vorliegen des Steuerbescheids endgültig festgestellt.</p>`;
      }

      html += `<table class="contrib-table" style="margin-top:10px;">
        <thead>
          <tr><th>Versicherungszweig</th><th>Beitragssatz</th><th>Mindestbeitrag (pro Quartal)</th></tr>
        </thead>
        <tbody>
          <tr><td>Pensionsversicherung</td><td>18,5 %</td><td>305,85 €</td></tr>
          <tr><td>Krankenversicherung</td><td>6,8 %</td><td>112,44 €</td></tr>
          <tr><td>Unfallversicherung</td><td>Pauschale</td><td>38,85 € (12,95 €/Monat)</td></tr>
        </tbody>
      </table>`;
      html += `<p style="font-size:13px;color:var(--muted);margin-top:8px;">Beiträge werden vierteljährlich vorgeschrieben. Auch für den Startmonat ist ein voller Monatsbeitrag fällig.</p>`;
      html += `</div>`;
    }

    // ── Block 3: K-SVFG Zuschuss ──────────────────────────────────────────
    if (a5 === 'yes') {
      html += `<div class="result-box" style="margin-top:14px;">`;
      html += `<h3>🎨 Künstler-Sozialversicherungsfonds (K-SVFG)</h3>`;
      html += `<p>Du kannst beim <strong>Künstler-Sozialversicherungsfonds</strong> einen Zuschuss zu deinen SVS-Beiträgen beantragen. Voraussetzungen:</p>`;
      html += `<ul class="check-list">
        <li>Antrag auf Zuschüsse an SVS bzw. den Fonds wurde gestellt</li>
        <li>Einkünfte aus künstlerischer Tätigkeit ≥ 6.613,20 € (Wert 2026; Erleichterungen möglich)</li>
        <li>Gesamteinkünfte nicht über 35.821,50 € jährlich (Wert 2026)</li>
        <li>Anerkennung als Künstler*in im Sinne des K-SVFG durch den Fonds</li>
      </ul>`;
      html += `<p><strong>Maximaler Zuschuss: 158 € monatlich.</strong> Der Zuschuss wird direkt bei der Beitragsvorschreibung berücksichtigt. Nach Vorliegen des Steuerbescheids erfolgt eine rückwirkende Prüfung.</p>`;
      html += `<p style="font-size:13px;">Kontakt: <a href="mailto:office@ksvf.at">office@ksvf.at</a> · Tel. (01) 586 71 85 · 1010 Wien, Goethegasse 1, Stiege II, 4. Stock</p>`;
      html += `</div>`;
    }

    // ── Block 4: Mehrfachversicherung ──────────────────────────────────────
    if (a6 === 'yes' || a1 === 'both') {
      html += `<div class="result-box" style="margin-top:14px;">`;
      html += `<h3>🔀 Mehrfachversicherung</h3>`;
      html += `<p>Du bist mehrfachversichert (z. B. als Angestellte*r und als freiberufliche*r Künstler*in). Das bedeutet, du zahlst in jede Versicherung Beiträge. Die Gesamtbelastung ist durch die <strong>Höchstbeitragsgrundlage (97.020 €/Jahr, Wert 2026)</strong> gedeckelt.</p>`;
      html += `<p>Bei Mehrfachversicherung kann auch die GSVG-Mindestbeitragsgrundlage unterschritten werden. Weitere Infos findest du in den SVS-Infoblättern „Mehrfachversicherung Pensionsversicherung" und „Mehrfachversicherung Krankenversicherung" auf <a href="https://www.svs.at" target="_blank" rel="noopener noreferrer">svs.at</a>.</p>`;
      html += `</div>`;
    }

    // ── Block 5: Nächste Schritte ──────────────────────────────────────────
    html += `<div class="result-box" style="margin-top:14px;">`;
    html += `<h3>✅ Empfohlene nächste Schritte</h3>`;
    html += `<ul class="check-list">`;
    if (a2 === 'above' && a3 === 'no') {
      html += `<li>Überschreitung der Versicherungsgrenze proaktiv bei der SVS melden (innerhalb 8 Wochen nach Steuerbescheid)</li>`;
    }
    if (a5 === 'yes') {
      html += `<li>Antrag auf K-SVFG-Zuschuss stellen (Kontakt: <a href="mailto:office@ksvf.at">office@ksvf.at</a>)</li>`;
    }
    html += `<li>Vierteljährliche SVS-Beitragsvorschreibungen im Blick behalten und rechtzeitig bezahlen</li>`;
    html += `<li>Nach Erhalt des Einkommensteuerbescheids Nachbemessung durch die SVS abwarten</li>`;
    if (a6 === 'yes' || a1 === 'both') {
      html += `<li>SVS-Infoblätter zur Mehrfachversicherung lesen: <a href="https://www.svs.at/info" target="_blank" rel="noopener noreferrer">svs.at/info</a></li>`;
    }
    html += `<li>Alle relevanten Themen (Selbständigenvorsorge, Arbeitslosenversicherung, Optionen in der GSVG-Krankenversicherung) im eigenen SVS-Infoblatt nachlesen</li>`;
    html += `</ul>`;
    html += `</div>`;

    document.getElementById('resultContent').innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function resetTool() {
    Object.keys(answers).forEach(k => delete answers[k]);
    document.querySelectorAll('.answer-btn').forEach(b => b.classList.remove('selected'));
    document.querySelectorAll('[id^="next-"]').forEach(b => b.disabled = true);
    document.getElementById('resultContent').innerHTML = '';
    goStep(1);
  }
</script>
</body>
</html>
