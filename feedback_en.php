<?php declare(strict_types=1); ?><!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Feedback &amp; Consultation – artbackstage</title>
  <link rel="icon" type="image/svg+xml" href="favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" />
  <link rel="stylesheet" href="style.css" />
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
  </style>
</head>
<body data-lang="en">
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <div class="page">

    <header class="header">
      <div>
        <h1>artbackstage Feedback</h1>
        <p>Video consultation directly in your browser — no download, no account required.</p>
      </div>
      <div class="header-actions">
        <span class="lang-switch"><a href="feedback.php">Deutsch</a></span>
        <a class="btn btn-outline" href="index_en.php">Home</a>
      </div>
    </header>

    <main id="main-content">
      <div class="feedback-grid">

        <!-- Left: Video call area -->
        <div class="vc-wrapper">
          <div class="vc-setup">
            <h2>Join a video room</h2>
            <p>Enter a room code or create a new room, then click "Join".</p>
            <div class="vc-room-row">
              <input
                type="text"
                id="room-input"
                placeholder="e.g. artbackstage-consultation"
                maxlength="80"
                autocomplete="off"
                aria-label="Enter room name"
              />
              <button class="btn btn-primary" id="join-btn" onclick="joinRoom()">Join</button>
              <button class="btn btn-outline" id="random-btn" onclick="randomRoom()" title="Generate a random room name">New room</button>
            </div>
            <div class="copy-link-row" id="copy-row" hidden>
              <input type="text" id="share-url" readonly aria-label="Join link" />
              <button class="btn btn-outline" onclick="copyLink()" style="font-size:13px">Copy link</button>
            </div>
            <p id="copy-status" aria-live="polite"></p>
          </div>
          <div id="vc-container">
            <div class="vc-placeholder" id="vc-placeholder">
              <svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15.75 10.5l4.72-4.72v12.44l-4.72-4.72M4.5 18.75h10.5a2.25 2.25 0 002.25-2.25V7.5A2.25 2.25 0 0015 5.25H4.5A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"/>
              </svg>
              <p style="margin:0;color:#666">Join a room to start the video call.</p>
            </div>
          </div>
        </div>

        <!-- Right: Info -->
        <div>
          <div class="info-card">
            <h2>How it works</h2>
            <div class="how-step">
              <span class="how-step-num">1</span>
              <span class="how-step-text">Schedule a session by email: <a href="mailto:office@artbackstage.net" style="color:var(--accent-dark)">office@artbackstage.net</a></span>
            </div>
            <div class="how-step">
              <span class="how-step-num">2</span>
              <span class="how-step-text">Receive a room code from the artbackstage team, or enter your own room name.</span>
            </div>
            <div class="how-step">
              <span class="how-step-num">3</span>
              <span class="how-step-text">Click "Join" — that's it. No download, no account, no plugin needed.</span>
            </div>
            <div class="how-step">
              <span class="how-step-num">4</span>
              <span class="how-step-text">Share the generated link with other participants.</span>
            </div>
            <div class="badge-row">
              <span class="badge">No download</span>
              <span class="badge">No account</span>
              <span class="badge">Open source</span>
              <span class="badge">End-to-end encrypted</span>
            </div>
          </div>

          <div class="info-card">
            <h2>Privacy &amp; Technology</h2>
            <ul>
              <li>Video calls are powered by <strong>Jitsi Meet</strong> (meet.jit.si) — a free, open-source video conferencing system.</li>
              <li>artbackstage does not store any call content or recordings.</li>
              <li>Room connections are handled by Jitsi's servers (operated by 8×8, Inc.). Their <a href="https://jitsi.org/security/" target="_blank" rel="noopener" style="color:var(--accent-dark)">privacy policy</a> applies.</li>
              <li>Choose a non-guessable room name to prevent uninvited guests.</li>
            </ul>
          </div>

          <div class="info-card">
            <h2>Contact</h2>
            <p>To schedule a session or for questions:<br>
              <a href="mailto:office@artbackstage.net" style="color:var(--accent-dark);font-weight:600">office@artbackstage.net</a>
            </p>
          </div>
        </div>

      </div>
    </main>
  </div>

<?php require_once __DIR__ . '/site_footer.php'; render_site_footer('en'); ?>

<script src="https://meet.jit.si/external_api.js"></script>
<script>
  let api = null;

  function sanitizeRoom(name) {
    return name.trim().replace(/[^a-zA-Z0-9\-_]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'artbackstage-feedback';
  }

  function randomRoom() {
    const adj = ['open','fair','free','clear','new','direct','current','green'];
    const noun = ['room','studio','talk','check','meet','board','circle','forum'];
    const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const id = Math.random().toString(36).slice(2, 6);
    document.getElementById('room-input').value = `artbackstage-${rand(adj)}-${rand(noun)}-${id}`;
  }

  function joinRoom() {
    const raw = document.getElementById('room-input').value;
    const roomName = sanitizeRoom(raw);
    if (!roomName) return;

    document.getElementById('room-input').value = roomName;

    if (api) { api.dispose(); api = null; }

    const placeholder = document.getElementById('vc-placeholder');
    if (placeholder) placeholder.remove();

    const container = document.getElementById('vc-container');
    container.classList.add('active');
    container.innerHTML = '';

    api = new JitsiMeetExternalAPI('meet.jit.si', {
      roomName: roomName,
      parentNode: container,
      width: '100%',
      height: 520,
      lang: 'en',
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

    const shareUrl = `${location.origin}${location.pathname}?room=${encodeURIComponent(roomName)}`;
    const shareInput = document.getElementById('share-url');
    shareInput.value = shareUrl;
    document.getElementById('copy-row').hidden = false;
  }

  function copyLink() {
    const input = document.getElementById('share-url');
    navigator.clipboard.writeText(input.value).then(() => {
      document.getElementById('copy-status').textContent = 'Link copied to clipboard!';
      setTimeout(() => { document.getElementById('copy-status').textContent = ''; }, 3000);
    }).catch(() => {
      input.select();
      document.execCommand('copy');
      document.getElementById('copy-status').textContent = 'Link copied.';
    });
  }

  (function () {
    const params = new URLSearchParams(location.search);
    const room = params.get('room');
    if (room) {
      document.getElementById('room-input').value = room;
      joinRoom();
    }
  })();

  document.getElementById('room-input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') joinRoom();
  });
</script>
</body>
</html>
