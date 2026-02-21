<?php
$landingPage = [
  'lang' => 'de',
  'page_title' => 'artbackstage | Soziales',
  'subtitle' => 'Soziale Absicherung, Einkommen und faire Planung im Kulturbereich verständlich machen.',
  'home' => ['href' => 'index.php', 'label' => 'Bereichsauswahl'],
  'language_switch' => ['href' => 'index_en.php', 'label' => 'English'],
  'story_intro_title' => 'Deine Story zuerst',
  'story_intro' => 'Starte mit der sozialen Frage, die viele zuerst haben: Reicht mein Einkommen für ein tragfähiges Leben und faire Arbeit?',
  'situations_title' => 'Story-basierter Einstieg',
  'situations' => [
    [
      'title' => 'Story 1 · Ich brauche Klarheit über soziale Absicherung',
      'description' => 'Du willst einschätzen, wie stabil dein verfügbares Einkommen ist und welche nächsten Schritte für eine realistische Planung sinnvoll sind.',
      'icon' => '<circle cx="12" cy="8.2" r="3"></circle><path d="M5.5 18.8a6.5 6.5 0 0 1 13 0"></path><path d="M12 12.8v5.7"></path>',
      'tools' => [
        ['href' => 'forecast_didactic.php', 'label' => 'Jahresprognose (didaktisch)'],
        ['href' => 'net_income_carousel.php', 'label' => 'Jahresnettoeinkommen Schritt für Schritt'],
        ['href' => 'personalplanung.php', 'label' => 'Personalplanung (FAIR PAY 2026)'],
      ],
    ],
    [
      'title' => 'Story 2 · Ich plane faire Honorare und Teamrollen',
      'description' => 'Du kalkulierst Honorare, Gehälter und Arbeitszeit für Projekte, damit soziale Realität und Budget zusammenpassen.',
      'icon' => '<path d="M4.5 19.5h15"></path><path d="M6 7.5h12"></path><path d="M8.5 12h2"></path><path d="M13.5 12h2"></path><path d="M8.5 15.5h7"></path>',
      'tools' => [
        ['href' => 'honorarium_questionnaire.php', 'label' => 'Honorar-Fragebogen (Leitfaden 2026)'],
        ['href' => 'salary_data_en.php', 'label' => 'Gehalts- & Honorar-Daten Explorer'],
        ['href' => 'freelance_services_calculator.php', 'label' => 'Freelance-Service-Rechner'],
      ],
    ],
  ],
  'section_title' => 'Alle Tools im Bereich Soziales',
  'footer' => 'Die artbackstage Toolsammlung ist in laufender BETA-Entwicklung als Teil des Lehrauftrags "Kunst im Kontext (Recht, Geld und Fairness)" an der Kunstuniversität Linz. Es werden keine personalisierten Daten gespeichert. Teilweise KI generiert. Keine Haftung.',
  'tools' => [
    ['href' => 'forecast_didactic.php', 'title' => 'Jahresprognose (didaktisch)', 'description' => 'Geführter Einstieg in Einnahmen, Kosten und Spielräume.', 'icon' => '<rect x="4" y="4" width="16" height="16" rx="2.5"></rect><path d="M8 9.2h8"></path><path d="M8 12h8"></path><path d="M8 14.8h5.2"></path>'],
    ['href' => 'net_income_carousel.php', 'title' => 'Jahresnettoeinkommen Schritt für Schritt', 'description' => 'Nachvollziehbare Netto-Berechnung für den Alltag.', 'icon' => '<rect x="4" y="5" width="16" height="14" rx="2.5"></rect><path d="M4 10.5h16"></path><path d="M8 14h2"></path><path d="M12 14h4"></path>'],
    ['href' => 'personalplanung.php', 'title' => 'Personalplanung (FAIR PAY 2026)', 'description' => 'Plane Rollen, Stunden und Gehälter mit Fair-Pay-Bezug.', 'icon' => '<path d="M4.5 19.5h15"></path><path d="M6 7.5h12"></path><path d="M8.5 12h2"></path><path d="M13.5 12h2"></path><path d="M8.5 15.5h7"></path>'],
    ['href' => 'honorarium_questionnaire.php', 'title' => 'Honorar-Fragebogen (Leitfaden 2026)', 'description' => 'Leitfaden für faire künstlerische Honorare.', 'icon' => '<path d="M12 3.8 4.8 7.1v4.8c0 4.3 2.9 7.5 7.2 8.7 4.3-1.2 7.2-4.4 7.2-8.7V7.1z"></path><path d="M9.3 12.2h5.4"></path><path d="M12 9.5v5.4"></path>'],
    ['href' => 'salary_data_en.php', 'title' => 'Gehalts- & Honorar-Daten Explorer', 'description' => 'Richtwerte für Rollen, Tagessätze und Projektfees recherchieren.', 'icon' => '<path d="M5 18h14"></path><path d="M7.5 15V9"></path><path d="M12 15V6"></path><path d="M16.5 15v-3"></path>'],
  ],
];

require __DIR__ . '/landing_page_template.php';
