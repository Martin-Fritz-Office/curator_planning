<?php
$landingPage = [
  'lang' => 'de',
  'page_title' => 'artbackstage | Soziales',
  'subtitle' => 'Soziale Absicherung im Kulturbereich: Fokus auf Einkommen, Gender und Teilzeit.',
  'home' => ['href' => 'index.php', 'label' => 'Bereichsauswahl'],
  'language_switch' => ['href' => 'index_en.php', 'label' => 'English'],
  'story_intro_title' => 'Sozialer Überblick',
  'story_intro' => 'Hier findest du die Branchen-Tabelle zu Einkommen, Frauenanteil und Teilzeitquote sowie eine kompakte Gender-Report-Zusammenfassung mit Originalquellen.',
  'situations_title' => 'Direkter Einstieg',
  'situations' => [
    [
      'title' => 'Branchenvergleich: Einkommen, Gender und Teilzeit',
      'description' => 'Nutze die interaktive ÖNACE-Tabelle, um soziale Muster über Branchen hinweg zu vergleichen.',
      'icon' => '<path d="M4.5 18.5h15"></path><path d="M7.5 15V8"></path><path d="M12 15v-5"></path><path d="M16.5 15V6"></path><circle cx="7.5" cy="6" r="1.1"></circle><circle cx="12" cy="8" r="1.1"></circle><circle cx="16.5" cy="4" r="1.1"></circle>',
      'tools' => [
        ['href' => 'onace_story_table.php', 'label' => 'Branchen-Story: Einkommen, Gender & Teilzeit'],
      ],
    ],
    [
      'title' => 'Gender Report 2017–2021 (Kurzfassung)',
      'description' => 'Lies eine zweitseitige Zusammenfassung mit direkten Links zur offiziellen deutschen und englischen Quelle.',
      'icon' => '<path d="M8 4.5h6l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V6A1.5 1.5 0 0 1 7.5 4.5z"></path><path d="M14 4.5V9h4"></path><path d="M9 12h6"></path><path d="M9 15h6"></path>',
      'tools' => [
        ['href' => 'gender_report_summary.php', 'label' => 'Gender Report Zusammenfassung (DE/EN)'],
      ],
    ],
  ],
  'section_title' => 'Tool im Bereich Soziales',
  'footer' => 'Die artbackstage Toolsammlung ist in laufender BETA-Entwicklung als Teil des Lehrauftrags "Kunst im Kontext (Recht, Geld und Fairness)" an der Kunstuniversität Linz. Es werden keine personalisierten Daten gespeichert. Teilweise KI generiert. Keine Haftung.',
  'tools' => [
    ['href' => 'onace_story_table.php', 'title' => 'Branchen-Story: Einkommen, Gender & Teilzeit', 'description' => 'Interaktive ÖNACE-Tabelle zu Einkommen, Frauenanteil und Teilzeitquote inkl. Story für Berufseinsteiger*innen.', 'icon' => '<path d="M4.5 18.5h15"></path><path d="M7.5 15V8"></path><path d="M12 15v-5"></path><path d="M16.5 15V6"></path><circle cx="7.5" cy="6" r="1.1"></circle><circle cx="12" cy="8" r="1.1"></circle><circle cx="16.5" cy="4" r="1.1"></circle>'],
    ['href' => 'gender_report_summary.php', 'title' => 'Gender Report Zusammenfassung 2017–2021', 'description' => 'Zweiseitige Zusammenfassung mit klarer Quellenangabe und Direktlinks zu den offiziellen PDF-Versionen (Deutsch/English).', 'icon' => '<path d="M8 4.5h6l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V6A1.5 1.5 0 0 1 7.5 4.5z"></path><path d="M14 4.5V9h4"></path><path d="M9 12h6"></path><path d="M9 15h6"></path>'],
  ],
];

require __DIR__ . '/landing_page_template.php';
