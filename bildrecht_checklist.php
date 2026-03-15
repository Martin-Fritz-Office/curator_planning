<?php
$checklistItems = [
  [
    'title'       => 'Ist das Bild dein eigenes Werk?',
    'short'       => 'Eigenes Werk',
    'result'      => 'frei',
    'explanation' => 'Wenn du das Bild selbst fotografiert, gezeichnet oder anderweitig geschaffen hast, bist du Urheber:in und hast alle Verwertungsrechte inne. Du kannst es frei nutzen – beachte aber Rechte abgebildeter Personen (Recht am eigenen Bild) und urheberrechtlich geschützte Objekte im Bild.',
    'legal'       => '§ 1, § 10 UrhG AT; § 1, § 7 UrhG DE; Art. 6 URG CH',
    'tip'         => 'Sind Personen erkennbar abgebildet, braucht es deren Einwilligung für eine Veröffentlichung (§ 78 UrhG AT / § 22 KUG DE).',
  ],
  [
    'title'       => 'Ist die Schutzfrist abgelaufen (Gemeinfreiheit)?',
    'short'       => 'Gemeinfreiheit',
    'result'      => 'frei',
    'explanation' => 'Werke werden gemeinfrei, wenn die Schutzfrist abgelaufen ist. In AT, DE und CH gilt für Werkfotos und künstlerische Bilder: 70 Jahre nach dem Tod der Urheber:in. Für einfache Lichtbilder (bloße Aufnahmen ohne persönliche Schöpfungshöhe) gilt eine kürzere Frist: 50 Jahre nach Aufnahme oder erster Veröffentlichung.',
    'legal'       => '§ 60, § 74 Abs. 6 UrhG AT; § 64, § 72 Abs. 3 UrhG DE; Art. 29, 39 URG CH',
    'tip'         => 'Prüfe das Todesjahr der Urheber:in; bei unbekannten Urheber:innen gelten Sonderregeln. Gemeinfreiheit in einem Land bedeutet nicht automatisch Gemeinfreiheit weltweit.',
  ],
  [
    'title'       => 'Trägt das Bild eine freie Lizenz (z. B. Creative Commons)?',
    'short'       => 'Freie Lizenz',
    'result'      => 'bedingt',
    'explanation' => 'Viele Urheber:innen geben ihre Werke unter einer freien Lizenz frei (z. B. CC0, CC BY, CC BY-SA). Solche Lizenzen erlauben die Nutzung unter bestimmten Bedingungen – etwa Namensnennung oder Weitergabe unter gleicher Lizenz. Freie Lizenzen sind in AT, DE und CH vor Gericht durchsetzbar.',
    'legal'       => 'Creative-Commons-Lizenzen sind lizenzrechtliche Nutzungseinräumungen gem. § 24 ff UrhG AT / §§ 31 ff UrhG DE.',
    'tip'         => 'Lies die Lizenzbedingungen genau: CC BY verlangt Namensnennung, CC NC verbietet kommerzielle Nutzung, CC ND verbietet Bearbeitungen. CC0 bedeutet vollständiger Rechtsverzicht.',
  ],
  [
    'title'       => 'Gilt die Panoramafreiheit? (Werk dauerhaft im öffentlichen Raum)',
    'short'       => 'Panoramafreiheit',
    'result'      => 'bedingt',
    'explanation' => 'Werke – z. B. Skulpturen, Wandbilder oder Bauwerke –, die dauerhaft an öffentlich zugänglichen Plätzen, Wegen oder Straßen aufgestellt sind, dürfen fotografiert und die Aufnahmen verbreitet werden. In Österreich gilt die Panoramafreiheit auch für öffentlich zugängliche Innenräume (Kirchen, Museen). In der Schweiz und Deutschland nur für Außenbereiche.',
    'legal'       => '§ 54 Abs. 1 Z 5 UrhG AT (auch Innenräume); § 59 UrhG DE (nur Außen); Art. 27 Abs. 1 URG CH',
    'tip'         => 'Nicht erlaubt: Drohnenaufnahmen über Zäune, Aufnahmen auf privatem Gelände oder bei Veranstaltungen mit Eintrittspflicht. Das Werk muss dauerhaft – nicht nur vorübergehend – aufgestellt sein.',
  ],
  [
    'title'       => 'Handelt es sich um ein erlaubtes Zitat (Bildzitat)?',
    'short'       => 'Zitatrecht',
    'result'      => 'bedingt',
    'explanation' => 'Das Zitatrecht erlaubt die Übernahme eines fremden Werkes zur Erläuterung, Diskussion oder Veranschaulichung. Beim Bildzitat muss: (1) das Zitat dem Belegzweck dienen (nicht bloß schmückende Illustration), (2) der Umfang durch den Zweck gerechtfertigt sein, (3) Quelle und Urheber:in genannt werden. Thumbnails oder niedrige Auflösungen reichen meistens.',
    'legal'       => '§ 42f UrhG AT; § 51 UrhG DE; Art. 25 URG CH',
    'tip'         => 'Das Zitat muss in einen eigenen inhaltlichen Kontext eingebettet sein – das bloße Hochladen eines Bildes mit Quellenangabe ist kein Zitat und nicht erlaubt.',
  ],
  [
    'title'       => 'Ist die Nutzung rein privat und nicht öffentlich?',
    'short'       => 'Privatgebrauch',
    'result'      => 'bedingt',
    'explanation' => 'Vervielfältigungen zum rein persönlichen Gebrauch (ausdrucken, offline speichern) sind grundsätzlich erlaubt, sofern sie nicht zu gewerblichen Zwecken dienen. Achtung: Veröffentlichungen im Internet – auch auf sozialen Medien oder in geschlossenen Gruppen – gelten nicht als Privatgebrauch.',
    'legal'       => '§ 42 Abs. 1 UrhG AT; § 53 UrhG DE; Art. 19 URG CH',
    'tip'         => 'Das Hochladen auf Plattformen wie Instagram, Facebook, Pinterest oder in Newslettern ist kein Privatgebrauch, selbst wenn keine Monetarisierung stattfindet.',
  ],
  [
    'title'       => 'Ist das Bild nur unwesentliches Beiwerk (akzessorisch)?',
    'short'       => 'Beiwerk',
    'result'      => 'bedingt',
    'explanation' => 'Wenn ein urheberrechtlich geschütztes Werk zufällig und als völlig nebensächlicher Bestandteil auf einem Foto erscheint – z. B. ein Poster im Hintergrund eines Gruppenfotos –, ist die Nutzung erlaubt. Das Werk darf dabei keine inhaltliche Bedeutung für das Gesamtbild haben und muss problemlos austauschbar oder ersetzbar sein.',
    'legal'       => '§ 57 UrhG DE; sinngemäß in AT über § 54 UrhG AT bzw. Verhältnismäßigkeit',
    'tip'         => 'Diese Ausnahme ist eng auszulegen: Wird das Werk bewusst gezeigt, kommt es gestalterisch zum Einsatz oder hat es eine kommunikative Funktion, greift die Beiwerksregelung nicht.',
  ],
  [
    'title'       => 'Liegt eine Parodie, Karikatur oder Pastiche vor?',
    'short'       => 'Parodie / Pastiche',
    'result'      => 'bedingt',
    'explanation' => 'Parodien, Karikaturen und Pastiches, die eine erkennbare inhaltliche Auseinandersetzung mit dem Originalwerk darstellen, sind grundsätzlich erlaubt – auch ohne Zustimmung der Urheber:in. Entscheidend ist, dass sich das neue Werk deutlich vom Original absetzt und eine eigene künstlerische Aussage transportiert.',
    'legal'       => '§ 51a UrhG DE (seit 2021 explizit); § 5 Abs. 2 Z 1a UrhG AT; Art. 11 Abs. 3 URG CH',
    'tip'         => 'Bloßes Kopieren mit kleinen Änderungen ist keine Parodie. Die Grenze zwischen erlaubter Parodie und unerlaubter Bearbeitung ist fließend – im Zweifel juristischen Rat einholen.',
  ],
  [
    'title'       => 'Ist das Bild Werbung für eine Ausstellung des abgebildeten Originals?',
    'short'       => 'Ausstellungswerbung',
    'result'      => 'bedingt',
    'explanation' => 'Veranstalter:innen öffentlicher Ausstellungen dürfen die ausgestellten Werke für die Bewerbung der Ausstellung vervielfältigen und verbreiten – z. B. auf Einladungskarten, Plakaten oder der Website. Diese Schranke gilt nur für die direkte Ausstellungswerbung, nicht für Merchandising, Kalender oder eigenständige Produktionen.',
    'legal'       => '§ 54 Abs. 1 Z 4 UrhG AT; § 58 UrhG DE',
    'tip'         => 'Postkarten, Poster-Editionen oder Shop-Produkte mit dem Werk sind selbst dann nicht erlaubt, wenn das Werk ausgestellt wird. Die Ausnahme gilt nur für den Bewerbungszweck.',
  ],
  [
    'title'       => 'Hast du eine ausdrückliche Erlaubnis (Lizenz) der Rechteinhaber:innen eingeholt?',
    'short'       => 'Lizenz / Erlaubnis',
    'result'      => 'frei',
    'explanation' => 'Wenn keiner der oben genannten Punkte zutrifft, ist eine ausdrückliche Lizenz oder schriftliche Einwilligung der Rechteinhaber:innen erforderlich. In AT und DE ist das Urheberrecht nicht übertragbar, aber Nutzungsrechte können für bestimmte Zwecke, Territorien und Zeiträume eingeräumt werden. Die Lizenz sollte schriftlich und möglichst präzise formuliert sein. Lizenzen können auch über Verwertungsgesellschaften erworben werden – diese verwalten kollektiv die Rechte vieler Urheber:innen und vergeben Nutzungslizenzen für bestimmte Werkarten (z. B. Bildrechte über Bildrecht GmbH).',
    'legal'       => '§ 24 ff UrhG AT; §§ 31 ff UrhG DE; Art. 16 URG CH (in CH ist eine vollständige Übertragung möglich)',
    'tip'         => 'Bei Stockfoto-Plattformen genau die Lizenzart prüfen (Redaktionell vs. Kommerziell, Reichweite, Territorialität). Im Zweifel gilt: kein Bild ohne klare Lizenz verwenden.',
    'link'        => ['href' => 'verwertungsgesellschaften_at.php', 'label' => 'Mehr zu Verwertungsgesellschaften in Österreich auf artbackstage'],
  ],
];

$resultLabels = [
  'frei'     => 'Nutzung möglich',
  'bedingt'  => 'Bedingt möglich – Bedingungen prüfen',
  'gesperrt' => 'Nicht erlaubt',
];
$resultClasses = [
  'frei'     => 'result-ok',
  'bedingt'  => 'result-conditional',
  'gesperrt' => 'result-blocked',
];
?><!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>artbackstage | Bild-Urheberrecht: 10-Punkte-Checkliste</title>
  <link rel="icon" type="image/svg+xml" href="favicon.svg" />
  <link rel="stylesheet" href="style.css" />
  <style>
    .checklist-badge {
      display: inline-block;
      font-size: 0.72rem;
      font-weight: 600;
      padding: 0.15em 0.55em;
      border-radius: 99px;
      margin-bottom: 0.35rem;
      letter-spacing: 0.02em;
    }
    .result-ok        { background: #d1fadf; color: #166534; }
    .result-conditional { background: #fef9c3; color: #854d0e; }
    .result-blocked   { background: #fee2e2; color: #991b1b; }
    .checklist-item { margin-bottom: 0.1rem; }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Zum Hauptinhalt springen</a>
  <div class="page landing-page law-page">
    <header class="header landing-header">
      <div>
        <p class="eyebrow brand-mark">artbackstage</p>
        <h1>Darf ich dieses Bild verwenden?</h1>
        <p class="muted">10-Punkte-Checkliste zum Urheberrecht für Bilder – gültig für Österreich, Deutschland und die Schweiz.</p>
      </div>
      <div class="header-actions">
        <a class="btn btn-outline" href="index_law.php">Zur Law-Startseite</a>
      </div>
    </header>

    <main id="main-content" class="card landing-card">
      <section class="story-intro" aria-labelledby="checklist-intro">
        <h2 id="checklist-intro">Urheberrecht bei Bildern: Wann ist eine Nutzung erlaubt?</h2>
        <p>
          Im deutschsprachigen Raum sind Bilder grundsätzlich urheberrechtlich geschützt, sobald sie eine persönliche geistige Schöpfung darstellen –
          und das unabhängig von einer Registrierung oder einem Copyright-Vermerk. Diese Checkliste hilft dabei, die wichtigsten Ausnahmen
          und Freiheiten zu prüfen, bevor ein fremdes Bild verwendet wird.
        </p>
        <p class="small muted">
          Rechtsgrundlagen: UrhG AT
          (<a href="https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10001848" target="_blank" rel="noopener noreferrer">RIS</a>),
          UrhG DE
          (<a href="https://www.gesetze-im-internet.de/englisch_urhg/englisch_urhg.html" target="_blank" rel="noopener noreferrer">gesetze-im-internet.de</a>),
          URG CH
          (<a href="https://www.fedlex.admin.ch/eli/cc/1993/1798_1798_1798/de" target="_blank" rel="noopener noreferrer">fedlex.admin.ch</a>).
          Keine Rechtsberatung.
        </p>
      </section>

      <section class="law-quiz" aria-label="10-Punkte-Checkliste Bild-Urheberrecht">
        <?php foreach ($checklistItems as $index => $item): ?>
          <article class="law-question checklist-item">
            <span class="checklist-badge <?= $resultClasses[$item['result']] ?>">
              <?= htmlspecialchars($resultLabels[$item['result']], ENT_QUOTES, 'UTF-8') ?>
            </span>
            <h3><?= ($index + 1) ?>. <?= htmlspecialchars($item['title'], ENT_QUOTES, 'UTF-8') ?></h3>
            <details>
              <summary>Details &amp; rechtliche Grundlage</summary>
              <p><?= htmlspecialchars($item['explanation'], ENT_QUOTES, 'UTF-8') ?></p>
              <p><strong>Rechtsgrundlage:</strong> <?= htmlspecialchars($item['legal'], ENT_QUOTES, 'UTF-8') ?></p>
              <p><em>Praxistipp:</em> <?= htmlspecialchars($item['tip'], ENT_QUOTES, 'UTF-8') ?></p>
              <?php if (!empty($item['link'])): ?>
                <p><a href="<?= htmlspecialchars($item['link']['href'], ENT_QUOTES, 'UTF-8') ?>"><?= htmlspecialchars($item['link']['label'], ENT_QUOTES, 'UTF-8') ?></a></p>
              <?php endif; ?>
            </details>
          </article>
        <?php endforeach; ?>
      </section>

      <section class="story-intro" aria-labelledby="checklist-summary">
        <h2 id="checklist-summary">Kurzlogik der Checkliste</h2>
        <p>
          Gehe die Punkte der Reihe nach durch. Sobald ein Punkt zutrifft und alle genannten Bedingungen erfüllt sind,
          ist die Nutzung in dem beschriebenen Rahmen erlaubt. Trifft keiner der Punkte zu,
          ist eine ausdrückliche Lizenz der Rechteinhaber:innen notwendig (Punkt 10).
        </p>
        <ol class="law-options">
          <li><strong>Punkte 1–2:</strong> Frei nutzbar ohne weitere Bedingungen (eigenes Werk / Gemeinfreiheit).</li>
          <li><strong>Punkte 3–9:</strong> Bedingt nutzbar – die jeweiligen Voraussetzungen müssen vollständig erfüllt sein.</li>
          <li><strong>Punkt 10:</strong> Auffangregel – immer möglich, wenn eine gültige Lizenz vorliegt.</li>
        </ol>
        <p class="small muted">
          Hinweis: Diese Checkliste orientiert sich an den gesetzlichen Schrankenbestimmungen des österreichischen UrhG,
          des deutschen UrhG und des Schweizer URG. Da die Gesetze in Details abweichen, sollten bei grenzüberschreitender
          Nutzung die jeweiligen nationalen Regelungen geprüft werden. Diese Übersicht ersetzt keine Rechtsberatung.
        </p>
      </section>
    </main>
  </div>
<?php require_once __DIR__ . '/site_footer.php'; render_site_footer(); ?>
</body>
</html>
