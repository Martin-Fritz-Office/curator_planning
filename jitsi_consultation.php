<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>artbackstage | Videoberatung</title>
  <link rel="icon" type="image/svg+xml" href="favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" />
  <link rel="stylesheet" href="style.css" />
  <script src="https://8x8.vc/vpaas-magic-cookie-217700227dd14fdc85d66af17ebfa727/external_api.js" async></script>
  <style>
    .consultation-layout {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .consultation-info {
      background: var(--card-bg, #fff);
      border: 1px solid var(--border, #e5e7eb);
      border-radius: 10px;
      padding: 20px 24px;
    }
    .consultation-info h2 {
      margin: 0 0 8px;
      font-size: 1.1rem;
      font-weight: 700;
    }
    .consultation-info p {
      margin: 0 0 12px;
      color: var(--muted, #6b7280);
      font-size: 14px;
      line-height: 1.6;
    }
    .consultation-info p:last-child {
      margin-bottom: 0;
    }
    #jaas-container {
      width: 100%;
      height: 600px;
      border-radius: 10px;
      overflow: hidden;
      border: 1px solid var(--border, #e5e7eb);
      background: #000;
    }
    @media (max-width: 600px) {
      #jaas-container { height: 400px; }
    }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Zum Hauptinhalt springen</a>
  <div class="page">
    <header style="margin-bottom:24px">
      <a href="index.php" style="font-size:13px;color:var(--muted);text-decoration:none">← artbackstage</a>
      <h1 style="margin:8px 0 4px;font-size:1.5rem">Videoberatung</h1>
      <p style="margin:0;color:var(--muted);font-size:14px">Live-Beratungsraum für Kunst- und Kulturschaffende</p>
    </header>

    <main id="main-content" class="consultation-layout">
      <div class="consultation-info">
        <h2>Hinweise zur Nutzung</h2>
        <p>Dieser Raum steht für offene Beratungsgespräche zur Verfügung. Du benötigst keine Installation – der Raum öffnet direkt im Browser. Mikrofon und Kamera werden beim Beitreten abgefragt.</p>
        <p>Bitte teile den Raumnamen mit deiner Beratungsperson, damit ihr euch im gleichen Raum trefft. Der Raum ist passwortfrei zugänglich.</p>
      </div>

      <div id="jaas-container"></div>
    </main>
  </div>

<?php require_once __DIR__ . '/site_footer.php'; render_site_footer(); ?>

<script>
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
  showToast('👤 ' + msg);
  if (Notification.permission === 'granted') {
    new Notification('artbackstage | Videoberatung', { body: msg, icon: 'favicon.svg' });
  }
}

window.addEventListener('load', function () {
  if (typeof JitsiMeetExternalAPI === 'undefined') {
    document.getElementById('jaas-container').innerHTML =
      '<p style="color:#fff;padding:20px;font-family:sans-serif">Die Videokonferenz konnte nicht geladen werden. Bitte Seite neu laden.</p>';
    return;
  }

  // Request browser notification permission up front
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }

  var api = new JitsiMeetExternalAPI('8x8.vc', {
    roomName: 'vpaas-magic-cookie-217700227dd14fdc85d66af17ebfa727/ArtbackstageBeratung',
    parentNode: document.getElementById('jaas-container'),
    lang: 'de',
    configOverwrite: {
      startWithAudioMuted: true,
      startWithVideoMuted: false,
    },
    interfaceConfigOverwrite: {
      SHOW_JITSI_WATERMARK: false,
      SHOW_WATERMARK_FOR_GUESTS: false,
    },
  });

  api.addEventListener('participantJoined', function (event) {
    notifyParticipant(event.displayName);
  });
});
</script>
</body>
</html>
