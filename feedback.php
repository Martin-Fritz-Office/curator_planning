<?php declare(strict_types=1); ?><!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Feedback &amp; Beratung – artbackstage</title>
  <link rel="icon" type="image/svg+xml" href="favicon.svg" />
  <link rel="stylesheet" href="style.css" />
  <script src="https://8x8.vc/vpaas-magic-cookie-217700227dd14fdc85d66af17ebfa727/external_api.js" async></script>
  <style>
    .feedback-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--gap);
      align-items: start;
    }
    @media (max-width: 820px) {
      .feedback-grid { grid-template-columns: 1fr; }
    }
    .vc-wrapper {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow);
    }
    .vc-setup {
      padding: 24px;
      border-bottom: 1px solid var(--border-soft);
      background: var(--surface-tinted);
    }
    .vc-setup h2 {
      margin: 0 0 6px;
      font-size: 1.05rem;
      color: var(--headline);
    }
    .vc-setup p {
      margin: 0 0 16px;
      color: var(--muted);
      font-size: 14px;
    }
    .vc-room-row {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    .vc-room-row input {
      flex: 1;
      min-width: 160px;
      padding: 9px 13px;
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      font-family: var(--font);
      font-size: 14px;
      background: var(--surface);
      color: var(--text);
      outline: none;
      transition: border-color .15s;
    }
    .vc-room-row input:focus {
      border-color: var(--accent);
      box-shadow: var(--focus-ring);
    }
    #vc-container {
      width: 100%;
      height: 520px;
      background: #111;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #aaa;
      font-size: 14px;
    }
    #vc-container.active {
      height: 520px;
    }
    .vc-placeholder {
      text-align: center;
      padding: 32px;
    }
    .vc-placeholder svg {
      display: block;
      margin: 0 auto 14px;
      color: var(--border);
      opacity: .7;
    }
    .info-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 24px;
      box-shadow: var(--shadow-soft);
    }
    .info-card h2 {
      margin: 0 0 10px;
      font-size: 1.05rem;
      color: var(--headline);
    }
    .info-card p, .info-card li {
      font-size: 14px;
      color: var(--muted);
      line-height: 1.7;
    }
    .info-card ul {
      padding-left: 18px;
      margin: 8px 0;
    }
    .info-card + .info-card {
      margin-top: var(--gap);
    }
    .how-step {
      display: flex;
      gap: 12px;
      align-items: flex-start;
      margin: 12px 0;
    }
    .how-step-num {
      flex-shrink: 0;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: var(--accent-light);
      color: var(--accent-dark);
      font-weight: 700;
      font-size: 13px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .how-step-text {
      font-size: 14px;
      color: var(--muted);
      line-height: 1.6;
      padding-top: 2px;
    }
    .badge-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 14px;
    }
    .badge {
      background: var(--accent-light);
      color: var(--accent-dark);
      font-size: 12px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 999px;
    }
    .copy-link-row {
      display: flex;
      gap: 8px;
      margin-top: 10px;
      flex-wrap: wrap;
    }
    .copy-link-row input {
      flex: 1;
      min-width: 160px;
      padding: 7px 11px;
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      font-size: 13px;
      background: var(--surface-tinted);
      color: var(--muted);
      font-family: monospace;
    }
    #copy-status {
      font-size: 12px;
      color: var(--accent-dark);
      margin-top: 4px;
      min-height: 16px;
    }
    .lang-switch {
      font-size: 13px;
      color: var(--muted);
    }
    .lang-switch a {
      color: var(--accent-dark);
      text-decoration: none;
      font-weight: 600;
    }
    .occupancy-badge {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: var(--surface, #fff);
      border: 1px solid var(--border, #e5e7eb);
      border-radius: 999px;
      padding: 5px 14px 5px 10px;
      font-size: 13px;
      font-weight: 600;
      color: var(--headline, #134d30);
      box-shadow: 0 1px 4px rgba(0,0,0,.06);
    }
    .occupancy-badge .dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: #9ca3af;
      flex-shrink: 0;
      transition: background .4s;
    }
    .occupancy-badge .dot.active {
      background: #1a9e57;
      box-shadow: 0 0 0 3px rgba(26,158,87,.2);
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% { box-shadow: 0 0 0 3px rgba(26,158,87,.2); }
      50%       { box-shadow: 0 0 0 6px rgba(26,158,87,.05); }
    }
    .occupancy-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px;
    }
  </style>
</head>
<body data-lang="de">
  <a href="#main-content" class="skip-link">Zum Hauptinhalt springen</a>
  <div class="page">

    <header class="header">
      <div>
        <h1>artbackstage Feedback</h1>
        <p>Videogespräch direkt im Browser – kein Download, kein Konto erforderlich.</p>
      </div>
      <div class="header-actions">
        <span class="lang-switch"><a href="feedback_en.php">English</a></span>
        <a class="btn btn-outline" href="index.php">Startseite</a>
      </div>
    </header>

    <main id="main-content">
      <div class="feedback-grid">

        <!-- Left: Video call area -->
        <div class="vc-wrapper">
          <div class="vc-setup">
            <div class="occupancy-row">
              <h2 style="margin:0">Videoraum beitreten</h2>
              <span class="occupancy-badge" id="occupancy-badge" aria-live="polite" aria-label="Personen im Raum" hidden>
                <span class="dot" id="occupancy-dot"></span>
                <span id="occupancy-label">Verbinde…</span>
              </span>
            </div>
            <p style="margin-top:10px">Raumcode eingeben oder einen neuen Raum erstellen und auf „Beitreten" klicken.</p>
            <div class="vc-room-row">
              <input
                type="text"
                id="room-input"
                placeholder="z. B. artbackstage-beratung"
                maxlength="80"
                autocomplete="off"
                aria-label="Raumname eingeben"
              />
              <button class="btn btn-primary" id="join-btn" onclick="joinRoom()">Beitreten</button>
              <button class="btn btn-outline" id="random-btn" onclick="randomRoom()" title="Zufälligen Raumnamen erstellen">Neuer Raum</button>
            </div>
            <div class="copy-link-row" id="copy-row" hidden>
              <input type="text" id="share-url" readonly aria-label="Teilnahme-Link" />
              <button class="btn btn-outline" onclick="copyLink()" style="font-size:13px">Link kopieren</button>
            </div>
            <p id="copy-status" aria-live="polite"></p>
          </div>
          <div id="vc-container">
            <div class="vc-placeholder" id="vc-placeholder">
              <svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15.75 10.5l4.72-4.72v12.44l-4.72-4.72M4.5 18.75h10.5a2.25 2.25 0 002.25-2.25V7.5A2.25 2.25 0 0015 5.25H4.5A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"/>
              </svg>
              <p style="margin:0;color:#666">Raum beitreten, um das Videogespräch zu starten.</p>
            </div>
          </div>
        </div>

        <!-- Right: Info -->
        <div>
          <div class="info-card">
            <h2>So funktioniert es</h2>
            <div class="how-step">
              <span class="how-step-num">1</span>
              <span class="how-step-text">Termin per E-Mail vereinbaren: <a href="mailto:office@artbackstage.net" style="color:var(--accent-dark)">office@artbackstage.net</a></span>
            </div>
            <div class="how-step">
              <span class="how-step-num">2</span>
              <span class="how-step-text">Raumcode vom artbackstage-Team erhalten oder einen eigenen Raumnamen eingeben.</span>
            </div>
            <div class="how-step">
              <span class="how-step-num">3</span>
              <span class="how-step-text">„Beitreten" klicken – fertig. Kein Download, kein Konto, kein Plugin nötig.</span>
            </div>
            <div class="how-step">
              <span class="how-step-num">4</span>
              <span class="how-step-text">Den generierten Link mit anderen Teilnehmer:innen teilen.</span>
            </div>
            <div class="badge-row">
              <span class="badge">Kein Download</span>
              <span class="badge">Kein Konto</span>
              <span class="badge">Open Source</span>
              <span class="badge">Ende-zu-Ende-verschlüsselt</span>
            </div>
          </div>

          <div class="info-card">
            <h2>Datenschutz &amp; Technik</h2>
            <ul>
              <li>Videogespräche werden über <strong>Jitsi as a Service (JaaS)</strong> von <strong>8×8, Inc.</strong> abgewickelt – auf Basis des quelloffenen Jitsi-Projekts. 8×8, Inc. hat seinen Sitz in den USA.</li>
              <li>artbackstage speichert keine Gesprächsinhalte oder Aufzeichnungen.</li>
              <li>Durch den Beitritt zu einem Videoraum werden Ihre IP-Adresse und Verbindungsdaten an 8×8, Inc. übertragen. Die Übertragung erfolgt auf Grundlage des EU–US Data Privacy Frameworks sowie der Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO). Es gelten die <a href="https://www.8x8.com/privacy-policy" target="_blank" rel="noopener noreferrer" style="color:var(--accent-dark)">Datenschutzbestimmungen von 8×8</a>.</li>
              <li>Wähle einen nicht-erratbaren Raumnamen, um ungewollten Zutritt zu vermeiden.</li>
              <li>Weitere Informationen: <a href="datenschutz.php" style="color:var(--accent-dark)">Datenschutzerklärung artbackstage</a>.</li>
            </ul>
          </div>

          <div class="info-card">
            <h2>Kontakt</h2>
            <p>Für Terminvereinbarungen und Fragen:<br>
              <a href="mailto:office@artbackstage.net" style="color:var(--accent-dark);font-weight:600">office@artbackstage.net</a>
            </p>
          </div>
        </div>

      </div>
    </main>
  </div>

<?php require_once __DIR__ . '/site_footer.php'; render_site_footer(); ?>

<script>
  const JAAS_DOMAIN = '8x8.vc';
  const JAAS_COOKIE = 'vpaas-magic-cookie-217700227dd14fdc85d66af17ebfa727';

  let api = null;

  function showToast(msg) {
    var t = document.createElement('div');
    t.textContent = msg;
    t.style.cssText = 'position:fixed;bottom:24px;right:24px;background:#1a1a2e;color:#fff;padding:12px 18px;border-radius:8px;font-size:14px;box-shadow:0 4px 16px rgba(0,0,0,.3);z-index:9999;transition:opacity .4s';
    document.body.appendChild(t);
    setTimeout(function () { t.style.opacity = '0'; setTimeout(function () { t.remove(); }, 400); }, 4000);
  }

  function notifyParticipant(displayName) {
    var name = displayName || 'Jemand';
    var msg = name + ' ist dem Raum beigetreten.';
    showToast('\u{1F464} ' + msg);
    if (Notification.permission === 'granted') {
      new Notification('artbackstage | Feedback', { body: msg, icon: 'favicon.svg' });
    }
  }

  function updateOccupancy(count) {
    var label = document.getElementById('occupancy-label');
    var dot   = document.getElementById('occupancy-dot');
    if (!label || !dot) return;
    if (count === 0) {
      label.textContent = 'Niemand im Raum';
      dot.classList.remove('active');
    } else if (count === 1) {
      label.textContent = '1 Person im Raum';
      dot.classList.add('active');
    } else {
      label.textContent = count + ' Personen im Raum';
      dot.classList.add('active');
    }
    document.getElementById('occupancy-badge').setAttribute('aria-label', label.textContent);
  }

  function sanitizeRoom(name) {
    // Jitsi room names: letters, digits, hyphens, no spaces or special chars
    return name.trim().replace(/[^a-zA-Z0-9\-_]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'artbackstage-feedback';
  }

  function randomRoom() {
    const adj = ['gruen','offen','fair','frei','klar','neu','direkt','aktuell'];
    const noun = ['raum','studio','talk','check','meet','board','kreis','forum'];
    const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const id = Math.random().toString(36).slice(2, 6);
    document.getElementById('room-input').value = `artbackstage-${rand(adj)}-${rand(noun)}-${id}`;
  }

  function joinRoom() {
    if (typeof JitsiMeetExternalAPI === 'undefined') {
      document.getElementById('vc-container').innerHTML =
        '<p style="color:#aaa;padding:20px;font-family:sans-serif">Die Videokonferenz konnte nicht geladen werden. Bitte Seite neu laden.</p>';
      return;
    }

    const raw = document.getElementById('room-input').value;
    const roomName = sanitizeRoom(raw);
    if (!roomName) return;

    document.getElementById('room-input').value = roomName;

    // Destroy previous session if any
    if (api) { api.dispose(); api = null; }

    // Reset occupancy badge
    var badge = document.getElementById('occupancy-badge');
    var occupancyLabel = document.getElementById('occupancy-label');
    var occupancyDot   = document.getElementById('occupancy-dot');
    if (badge) { badge.hidden = false; }
    if (occupancyLabel) { occupancyLabel.textContent = 'Verbinde…'; }
    if (occupancyDot)   { occupancyDot.classList.remove('active'); }

    const placeholder = document.getElementById('vc-placeholder');
    if (placeholder) placeholder.remove();

    const container = document.getElementById('vc-container');
    container.classList.add('active');
    container.innerHTML = '';

    api = new JitsiMeetExternalAPI(JAAS_DOMAIN, {
      roomName: JAAS_COOKIE + '/' + roomName,
      parentNode: container,
      width: '100%',
      height: 520,
      lang: 'de',
      configOverwrite: {
        startWithAudioMuted: true,
        startWithVideoMuted: false,
        disableDeepLinking: true,
        prejoinPageEnabled: true,
        enableClosePage: false,
      },
      interfaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
        TOOLBAR_BUTTONS: [
          'microphone', 'camera', 'desktop', 'chat',
          'raisehand', 'tileview', 'fullscreen', 'hangup'
        ],
      },
    });

    var participantCount = 0;

    api.addEventListener('videoConferenceJoined', function () {
      participantCount = 1;
      updateOccupancy(participantCount);
    });

    api.addEventListener('participantJoined', function (event) {
      participantCount += 1;
      updateOccupancy(participantCount);
      notifyParticipant(event.displayName);
    });

    api.addEventListener('participantLeft', function () {
      participantCount = Math.max(0, participantCount - 1);
      updateOccupancy(participantCount);
    });

    api.addEventListener('videoConferenceLeft', function () {
      participantCount = 0;
      updateOccupancy(participantCount);
    });

    // Show share link
    const shareUrl = `${location.origin}${location.pathname}?room=${encodeURIComponent(roomName)}`;
    const shareInput = document.getElementById('share-url');
    shareInput.value = shareUrl;
    document.getElementById('copy-row').hidden = false;
  }

  function copyLink() {
    const input = document.getElementById('share-url');
    navigator.clipboard.writeText(input.value).then(() => {
      document.getElementById('copy-status').textContent = 'Link in die Zwischenablage kopiert!';
      setTimeout(() => { document.getElementById('copy-status').textContent = ''; }, 3000);
    }).catch(() => {
      input.select();
      document.execCommand('copy');
      document.getElementById('copy-status').textContent = 'Link kopiert.';
    });
  }

  // Request notification permission up front
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }

  // Auto-join if ?room= param is present
  (function () {
    const params = new URLSearchParams(location.search);
    const room = params.get('room');
    if (room) {
      document.getElementById('room-input').value = room;
      joinRoom();
    }
  })();

  // Allow Enter key to join
  document.getElementById('room-input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') joinRoom();
  });
</script>
</body>
</html>
