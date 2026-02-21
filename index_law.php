<?php
$landingPage = [
  'lang' => 'de',
  'page_title' => 'artbackstage | Law',
  'subtitle' => 'Urheberrecht verstehen, typische Nutzungssituationen prüfen und zentrale Begriffe mit dem Quiz trainieren.',
  'home' => ['href' => 'index.php', 'label' => 'Bereichsauswahl'],
  'language_switch' => ['href' => 'index_money.php', 'label' => 'Zu Money'],
  'story_intro_title' => 'Dein Einstieg in artbackstage | Law',
  'story_intro' => 'Starte mit dem UrhG-Quiz und nutze danach die Gesetzesquelle für Vertiefung und Prüfung im Kontext deiner Praxis.',
  'situations_title' => 'Typische Situationen im Rechtskontext',
  'situations' => [
    [
      'title' => 'Ich brauche Grundbegriffe des Urheberrechts und zu Verwertungsgesellschaften',
      'description' => 'Du willst Grundbegriffe wie Werk, Bearbeitung, Zitat oder freie Werknutzung sicher unterscheiden können.',
      'icon' => '<path d="M8 4.5h6l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V6a1.5 1.5 0 0 1 1.5-1.5z"></path><path d="M14 4.5V9h4"></path><path d="M9.2 15 11.3 17.1 15.1 13.1"></path>',
      'tools' => [
        ['href' => 'law_quiz.php', 'label' => 'Urheberrechtsgesetz-Quiz (20 Fragen)'],
        ['href' => 'vgg_quiz.php', 'label' => 'Verwertungsgesellschaftengesetz Quiz'],
        ['href' => 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10001848', 'label' => 'UrhG im RIS (Quelle)'],
        ['href' => 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=20009532', 'label' => 'Gesetz 20009532 im RIS (Quelle)'],
      ],
    ],
  ],
  'guide_title' => 'Empfohlener Ablauf',
  'guide_intro' => 'Wenn du schnell Sicherheit gewinnen willst: zuerst Quiz, dann Gesetzesquelle im Detail lesen und anschließend auf konkrete Projekte anwenden.',
  'guide_steps' => [
    [
      'badge' => 'Block 1 · Begriffe klären',
      'title' => 'Quiz absolvieren',
      'description' => 'Prüfe dein Wissen zu UrhG und ergänzend zur kollektiven Rechtewahrnehmung (Gesetzesnr. 20009532).',
      'tools' => [
        ['href' => 'law_quiz.php', 'label' => 'UrhG-Quiz (20 Fragen)'],
        ['href' => 'vgg_quiz.php', 'label' => 'Verwertungsgesellschaftengesetz-Quiz'],
      ],
    ],
    [
      'badge' => 'Block 2 · Orientierung',
      'title' => 'Verwertungsgesellschaften verstehen',
      'description' => 'Sieh nach, welche Gesellschaft für Musik, Bild, Text oder audiovisuelle Werke zuständig ist.',
      'tools' => [
        ['href' => 'verwertungsgesellschaften_at.php', 'label' => 'Überblick Verwertungsgesellschaften'],
      ],
    ],
    [
      'badge' => 'Block 3 · Vertiefen',
      'title' => 'Gesetzestext nachlesen',
      'description' => 'Nutze die RIS-Fassungen, um Details und Ausnahmen nachzuvollziehen.',
      'tools' => [
        ['href' => 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10001848', 'label' => 'UrhG im RIS'],
        ['href' => 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=20009532', 'label' => 'Verwertungsgesellschaftengesetz im RIS'],
      ],
    ],
  ],
  'section_title' => 'Alle Law-Tools im Überblick',
  'footer' => 'Die artbackstage Toolsammlung ist in laufender BETA-Entwicklung als Teil des Lehrauftrags "Kunst im Kontext (Recht, Geld und Fairness)" an der Kunstuniversität Linz. Es werden keine personalisierten Daten gespeichert.',
  'tools' => [
    ['href' => 'law_quiz.php', 'title' => 'UrhG-Quiz (Deutsch)', 'description' => '20 Fragen zu zentralen Begriffen und Paragraphen des österreichischen Urheberrechtsgesetzes.', 'highlight' => true, 'icon' => '<path d="M8 4.5h6l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V6a1.5 1.5 0 0 1 1.5-1.5z"></path><path d="M14 4.5V9h4"></path><path d="M9 13h6"></path><path d="M9 16h4"></path>'],
    ['href' => 'vgg_quiz.php', 'title' => 'Quiz zur Gesetzesnummer 20009532', 'description' => 'Lernquiz analog zum UrhG-Format mit Fokus auf kollektive Rechtewahrnehmung und Transparenz.', 'highlight' => false, 'icon' => '<path d="M8 4.5h6l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V6a1.5 1.5 0 0 1 1.5-1.5z"></path><path d="M14 4.5V9h4"></path><path d="M9.3 12.2h5.4"></path><path d="M12 9.5v5.4"></path>'],
  ],
];

require __DIR__ . '/landing_page_template.php';
