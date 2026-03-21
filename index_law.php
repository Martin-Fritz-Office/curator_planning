<?php
$landingPage = [
  'lang' => 'de',
  'section_theme' => 'recht',
  'page_title' => 'artbackstage | Law',
  'subtitle' => 'Urheberrecht verstehen, typische Nutzungssituationen prüfen und zentrale Begriffe mit dem Quiz trainieren.',
  'home' => ['href' => 'index.php', 'label' => 'Bereichsauswahl'],
  'language_switch' => ['href' => 'index_money.php', 'label' => 'Zu Money'],
  'story_intro_title' => 'Dein Einstieg in artbackstage | Law',
  'story_intro' => 'Starte mit dem UrhG-Quiz und nutze danach die Gesetzesquelle für Vertiefung und Prüfung im Kontext deiner Praxis.',
  'situations_title' => 'Typische Situationen im Rechtskontext',
  'situations' => [
    [
      'title' => 'Ich will wissen, ob mein Werk urheberrechtlich geschützt ist',
      'description' => 'Du willst prüfen, ob ein konkretes Werk die Schutzvoraussetzungen des Urheberrechts erfüllt – von der menschlichen Schöpfung über die Schöpfungshöhe bis zur Schutzfrist.',
      'icon' => '<path d="M8 4.5h6l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V6a1.5 1.5 0 0 1 1.5-1.5z"></path><path d="M14 4.5V9h4"></path><circle cx="12" cy="13.5" r="2.5"></circle>',
      'tools' => [
        ['href' => 'werkschutz_check.php', 'label' => 'Werkschutz-Check (7 Fragen, AT/DE)'],
      ],
    ],
    [
      'title' => 'Ich bin unsicher, ob ich einen gültigen Vertrag geschlossen habe',
      'description' => 'Du willst prüfen, ob alle Voraussetzungen eines wirksamen Vertragsschlusses erfüllt sind – z. B. Angebot, Annahme, Geschäftsfähigkeit und Formvorschriften.',
      'icon' => '<path d="M8 4.5h6l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V6a1.5 1.5 0 0 1 1.5-1.5z"></path><path d="M14 4.5V9h4"></path><path d="M9.2 15 11.3 17.1 15.1 13.1"></path>',
      'tools' => [
        ['href' => 'contract_validity_check.php', 'label' => 'Vertragsschluss-Check (10 Fragen)'],
        ['href' => 'agreement_checklist.php', 'label' => '25-Punkte-Vertrags-Checkliste'],
      ],
    ],
    [
      'title' => 'Ich brauche Grundbegriffe des Urheberrechts und zu Verwertungsgesellschaften',
      'description' => 'Du willst Grundbegriffe wie Werk, Bearbeitung, Zitat oder freie Werknutzung sicher unterscheiden können.',
      'icon' => '<path d="M8 4.5h6l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V6a1.5 1.5 0 0 1 1.5-1.5z"></path><path d="M14 4.5V9h4"></path><path d="M9.2 15 11.3 17.1 15.1 13.1"></path>',
      'tools' => [
        ['href' => 'law_quiz.php', 'label' => 'Urheberrechtsgesetz-Quiz (20 Fragen)'],
        ['href' => 'vgg_quiz.php', 'label' => 'Verwertungsgesellschaftengesetz Quiz'],
        ['href' => 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10001848', 'label' => 'UrhG im RIS (Quelle)'],
        ['href' => 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=20009532', 'label' => 'Verwertungsgesellschaftengesetz im RIS (Quelle)'],
      ],
    ],
    [
      'title' => 'Ich will prüfen, ob ich ein fremdes Bild verwenden darf',
      'description' => 'Du willst ein Bild nutzen und prüfen, ob du dafür eine Erlaubnis brauchst oder eine gesetzliche Ausnahme greift.',
      'icon' => '<path d="M8 4.5h6l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V6a1.5 1.5 0 0 1 1.5-1.5z"></path><path d="M14 4.5V9h4"></path><path d="M9.2 15 11.3 17.1 15.1 13.1"></path>',
      'tools' => [
        ['href' => 'bildrecht_checklist.php', 'label' => 'Bild-Urheberrecht: 10-Punkte-Checkliste (AT/DE/CH)'],
      ],
    ],
    [
      'title' => 'Ich will verstehen, was typische Vertragsklauseln bedeuten',
      'description' => 'Du hast einen Vertrag erhalten und willst einzelne Formulierungen in Alltagssprache erklärt bekommen – mit Hinweisen, was kritisch ist und wie bessere Alternativen aussehen.',
      'icon' => '<path d="M8 4.5h6l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V6a1.5 1.5 0 0 1 1.5-1.5z"></path><path d="M14 4.5V9h4"></path><circle cx="12" cy="14" r="1"></circle><path d="M12 11v0"></path>',
      'tools' => [
        ['href' => 'contract_clause_explainer.php', 'label' => 'Vertragsklausel-Erklärer (fiktiver Mustervertrag)'],
      ],
    ],
    [
      'title' => 'Ich stelle Werke in einer Galerie aus und brauche eine schriftliche Vereinbarung',
      'description' => 'Du willst die wichtigsten Konditionen eines Ausstellungsvertrags mit einer Galerie schriftlich festhalten – z. B. Laufzeit, Provision, Transport und Haftung.',
      'icon' => '<path d="M8 4.5h6l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V6a1.5 1.5 0 0 1 1.5-1.5z"></path><path d="M14 4.5V9h4"></path><path d="M9.2 15 11.3 17.1 15.1 13.1"></path>',
      'tools' => [
        ['href' => 'gallery_contract_questionnaire.php', 'label' => 'Galerievertrag-Fragebogen (8 Fragen)'],
      ],
    ],
  ],
  'guide_title' => 'Empfohlener Ablauf',
  'guide_intro' => 'Wenn du schnell Sicherheit gewinnen willst: zuerst Quiz, dann Gesetzesquelle im Detail lesen und anschließend auf konkrete Projekte anwenden.',
  'guide_steps' => [
    [
      'badge' => 'Block 0 · Werkschutz prüfen',
      'title' => 'Ist mein Werk geschützt?',
      'description' => 'Prüfe in 7 Ja/Nein-Fragen, ob ein Werk die Schutzvoraussetzungen erfüllt: menschliche Tätigkeit, Schöpfungshöhe, Werkart, Schutzfrist, Ausschlussgründe (UrhG AT / UrhG DE) – mit Quellenangaben und zentraler Judikatur.',
      'tools' => [
        ['href' => 'werkschutz_check.php', 'label' => 'Werkschutz-Check (7 Fragen)'],
      ],
    ],
    [
      'badge' => 'Block 1 · Vertragsschluss prüfen',
      'title' => 'Vertragsschluss-Check',
      'description' => 'Prüfe in 10 Ja/Nein-Fragen, ob alle Voraussetzungen eines wirksamen Vertrags erfüllt sind (ABGB / BGB).',
      'tools' => [
        ['href' => 'contract_validity_check.php', 'label' => 'Vertragsschluss-Check (10 Fragen)'],
        ['href' => 'agreement_checklist.php', 'label' => '25-Punkte-Vertrags-Checkliste'],
      ],
    ],
    [
      'badge' => 'Block 2 · Begriffe klären',
      'title' => 'Quiz absolvieren',
      'description' => 'Prüfe dein Wissen zu UrhG und ergänzend zur kollektiven Rechtewahrnehmung (Gesetzesnr. 20009532).',
      'tools' => [
        ['href' => 'law_quiz.php', 'label' => 'UrhG-Quiz (20 Fragen)'],
        ['href' => 'vgg_quiz.php', 'label' => 'Verwertungsgesellschaftengesetz-Quiz'],
      ],
    ],
    [
      'badge' => 'Block 3 · Orientierung',
      'title' => 'Verwertungsgesellschaften verstehen',
      'description' => 'Sieh nach, welche Gesellschaft für Musik, Bild, Text oder audiovisuelle Werke zuständig ist.',
      'tools' => [
        ['href' => 'verwertungsgesellschaften_at.php', 'label' => 'Überblick Verwertungsgesellschaften'],
      ],
    ],
    [
      'badge' => 'Block 4 · Bildrechte prüfen',
      'title' => 'Darf ich dieses Bild verwenden?',
      'description' => 'Prüfe anhand von 10 Punkten, ob ein Bild frei genutzt werden kann – Gemeinfreiheit, Panoramafreiheit, Zitat, Lizenz und mehr (AT/DE/CH).',
      'tools' => [
        ['href' => 'bildrecht_checklist.php', 'label' => 'Bild-Urheberrecht: 10-Punkte-Checkliste'],
      ],
    ],
    [
      'badge' => 'Block 5 · Galerievertrag',
      'title' => 'Ausstellungsvereinbarung erstellen',
      'description' => 'Beantworte 8 Multiple-Choice-Fragen zu Laufzeit, Provision, Transport und Haftung – und erhalte ein fertiges Bestätigungsschreiben für deinen Galerievertrag.',
      'tools' => [
        ['href' => 'gallery_contract_questionnaire.php', 'label' => 'Galerievertrag-Fragebogen (8 Fragen)'],
      ],
    ],
    [
      'badge' => 'Block 6 · Vertiefen',
      'title' => 'Gesetzestext nachlesen',
      'description' => 'Nutze die RIS-Fassungen, um Details und Ausnahmen nachzuvollziehen.',
      'tools' => [
        ['href' => 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10001848', 'label' => 'UrhG im RIS'],
        ['href' => 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=20009532', 'label' => 'Verwertungsgesellschaftengesetz im RIS'],
      ],
    ],
  ],
  'section_title' => 'Alle Law-Tools im Überblick',
  'footer' => 'Die artbackstage Toolsammlung ist in laufender BETA-Entwicklung als Teil des Lehrauftrags "Kunst im Kontext (Recht, Geld und Fairness)" an der Kunstuniversität Linz. Es werden keine personalisierten Daten gespeichert. Teilweise KI generiert. Keine Haftung.',
  'tools' => [
    ['href' => 'werkschutz_check.php', 'title' => 'Ist mein Werk urheberrechtlich geschützt?', 'description' => '7 Ja/Nein-Fragen zur Schutzfähigkeit eines Werks nach UrhG AT / UrhG DE – mit Quellenangaben und zentraler Judikatur.', 'highlight' => true, 'icon' => '<path d="M8 4.5h6l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V6a1.5 1.5 0 0 1 1.5-1.5z"></path><path d="M14 4.5V9h4"></path><circle cx="12" cy="13.5" r="2.5"></circle><path d="M12 11v0"></path>'],
    ['href' => 'contract_validity_check.php', 'title' => 'Habe ich einen gültigen Vertrag geschlossen?', 'description' => '10 Ja/Nein-Fragen zu den Voraussetzungen eines wirksamen Vertragsschlusses nach ABGB und BGB.', 'highlight' => true, 'icon' => '<path d="M8 4.5h6l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V6a1.5 1.5 0 0 1 1.5-1.5z"></path><path d="M14 4.5V9h4"></path><path d="M9.2 15 11.3 17.1 15.1 13.1"></path>'],
    ['href' => 'law_quiz.php', 'title' => 'UrhG-Quiz (Deutsch)', 'description' => '20 Fragen zu zentralen Begriffen und Paragraphen des österreichischen Urheberrechtsgesetzes.', 'highlight' => false, 'icon' => '<path d="M8 4.5h6l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V6a1.5 1.5 0 0 1 1.5-1.5z"></path><path d="M14 4.5V9h4"></path><path d="M9 13h6"></path><path d="M9 16h4"></path>'],
    ['href' => 'vgg_quiz.php', 'title' => 'Verwertungsgesellschaftengesetz-Quiz', 'description' => 'Lernquiz analog zum UrhG-Format mit Fokus auf kollektive Rechtewahrnehmung und Transparenz.', 'highlight' => false, 'icon' => '<path d="M8 4.5h6l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V6a1.5 1.5 0 0 1 1.5-1.5z"></path><path d="M14 4.5V9h4"></path><path d="M9.3 12.2h5.4"></path><path d="M12 9.5v5.4"></path>'],
    ['href' => 'bildrecht_checklist.php', 'title' => 'Bild-Urheberrecht: 10-Punkte-Checkliste', 'description' => 'Schritt-für-Schritt-Prüfung, ob ein Bild frei nutzbar ist: Gemeinfreiheit, Panoramafreiheit, Zitatrecht, Lizenz u. v. m. (AT/DE/CH).', 'highlight' => true, 'icon' => '<path d="M8 4.5h6l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V6a1.5 1.5 0 0 1 1.5-1.5z"></path><path d="M14 4.5V9h4"></path><path d="M9.2 15 11.3 17.1 15.1 13.1"></path>'],
    ['href' => 'gallery_contract_questionnaire.php', 'title' => 'Galerievertrag-Fragebogen', 'description' => '8 Multiple-Choice-Fragen zu den wichtigsten Konditionen eines Ausstellungsvertrags – erstellt ein fertiges Bestätigungsschreiben.', 'highlight' => true, 'icon' => '<path d="M8 4.5h6l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V6a1.5 1.5 0 0 1 1.5-1.5z"></path><path d="M14 4.5V9h4"></path><path d="M9.2 15 11.3 17.1 15.1 13.1"></path>'],
    ['href' => 'contract_clause_explainer.php', 'title' => 'Vertragsklausel-Erklärer', 'description' => 'Fiktiver Kuratorinnen-Vertrag mit 11 kommentierten Klauseln. Hover oder Klick zeigt Erklärung, Risiken und bessere Formulierungen.', 'highlight' => true, 'icon' => '<path d="M8 4.5h6l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V6a1.5 1.5 0 0 1 1.5-1.5z"></path><path d="M14 4.5V9h4"></path><circle cx="12" cy="14" r="1"></circle>'],
  ],
];

require __DIR__ . '/landing_page_template.php';
