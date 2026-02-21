<?php
$landingPage = [
  'lang' => 'de',
  'page_title' => 'artbackstage | Soziales',
  'subtitle' => 'Soziale Absicherung im Kulturbereich: Fokus auf Einkommen, Gender und Teilzeit.',
  'home' => ['href' => 'index.php', 'label' => 'Bereichsauswahl'],
  'language_switch' => ['href' => 'index_en.php', 'label' => 'English'],
  'story_intro_title' => 'Sozialer Überblick',
  'story_intro' => 'Hier findest du ausschließlich die Branchen-Tabelle zu Einkommen, Frauenanteil und Teilzeitquote.',
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
  ],
  'section_title' => 'Tool im Bereich Soziales',
  'footer' => 'Die artbackstage Toolsammlung ist in laufender BETA-Entwicklung als Teil des Lehrauftrags "Kunst im Kontext (Recht, Geld und Fairness)" an der Kunstuniversität Linz. Es werden keine personalisierten Daten gespeichert. Teilweise KI generiert. Keine Haftung.',
  'tools' => [
    ['href' => 'onace_story_table.php', 'title' => 'Branchen-Story: Einkommen, Gender & Teilzeit', 'description' => 'Interaktive ÖNACE-Tabelle zu Einkommen, Frauenanteil und Teilzeitquote inkl. Story für Berufseinsteiger*innen.', 'icon' => '<path d="M4.5 18.5h15"></path><path d="M7.5 15V8"></path><path d="M12 15v-5"></path><path d="M16.5 15V6"></path><circle cx="7.5" cy="6" r="1.1"></circle><circle cx="12" cy="8" r="1.1"></circle><circle cx="16.5" cy="4" r="1.1"></circle>'],
  ],
];

require __DIR__ . '/landing_page_template.php';
