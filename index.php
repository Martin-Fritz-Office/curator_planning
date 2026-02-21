<?php
$landingPage = [
  'lang' => 'de',
  'subtitle' => 'Wähle ein Tool für deine Finanzplanung.',
  'language_switch' => ['href' => 'index_en.php', 'label' => 'English'],
  'primary_cta' => ['href' => 'index_situationen.php', 'label' => 'Geführter Einstieg nach Situation'],
  'secondary_cta' => ['href' => 'index_situationen.php', 'label' => 'Einstiegs-Guide & Tool-Kompass'],
  'alternate_cta' => ['href' => 'index_situationen.php', 'label' => 'Alle Situationen im Überblick'],
  'section_title' => 'Rechner auswählen',
  'footer' => 'Die artbackstage Toolsammlung ist in laufender BETA-Entwicklung als Teil des Lehrauftrags "Kunst im Kontext (Recht, Geld und Fairness) an der Kunstuniversität Linz. Es werden keine personalisierten Daten gespeichert.',
  'tools' => [
    ['href' => 'index_situationen.php', 'title' => 'Neu hier? Starte mit dem geführten Einstieg', 'description' => 'Szenarien, Startklar-Pfad und Nutzungsanleitung auf einer Seite vereint.', 'highlight' => true, 'icon' => '<path d="M12 4.5v15"></path><path d="m6.5 10.5 5.5-6 5.5 6"></path>'],
    ['href' => 'forecast.php', 'title' => 'Jahresumsatz- & Gewinnprognose', 'description' => 'Vollständige Prognose mit Fragen, Sheet und Diagrammen.', 'icon' => '<path d="M4 19.5h16"></path><path d="M6 16l3.2-3.2 2.7 2.6 5-5"></path><circle cx="17" cy="8" r="1.2"></circle>'],
    ['href' => 'forecast_didactic.php', 'title' => 'Jahresumsatz- & Gewinnprognose (didaktisch)', 'description' => 'Alternative Oberfläche mit geführter, verständlicher Reihenfolge.', 'icon' => '<rect x="4" y="4" width="16" height="16" rx="2.5"></rect><path d="M8 9.2h8"></path><path d="M8 12h8"></path><path d="M8 14.8h5.2"></path>'],
    ['href' => 'hourly_rate.php', 'title' => 'Stundensatz-Rechner', 'description' => 'Berechne ein tragfähiges Stundenhonorar in 7 Fragen.', 'icon' => '<circle cx="12" cy="12" r="7.5"></circle><path d="M12 8v4.2l3 1.7"></path>'],
    ['href' => 'freelance_services_calculator.php', 'title' => 'Freelance-Service-Rechner', 'description' => 'Leistungen wählen, Stunden kalkulieren und als CSV exportieren.', 'icon' => '<path d="M4.5 6.5h15"></path><path d="M4.5 12h15"></path><path d="M4.5 17.5h9"></path><circle cx="18.5" cy="17.5" r="1.3"></circle>'],
    ['href' => 'net_income_carousel.php', 'title' => 'Jahresnettoeinkommen Schritt für Schritt', 'description' => 'Didaktische Serie zur nachvollziehbaren Netto-Berechnung.', 'icon' => '<rect x="4" y="5" width="16" height="14" rx="2.5"></rect><path d="M4 10.5h16"></path><path d="M8 14h2"></path><path d="M12 14h4"></path>'],
    ['href' => 'curator_viability_carousel.php', 'title' => 'Projekt-Check für freie Kurator*innen', 'description' => '13 Fragen für die Entscheidung: zusagen, nachverhandeln oder absagen.', 'icon' => '<path d="M9.2 12.2l1.8 1.8 3.8-4"></path><circle cx="12" cy="12" r="8"></circle>'],
    ['href' => 'honorarium_questionnaire.php', 'title' => 'Honorar-Fragebogen (Leitfaden 2026)', 'description' => 'Ermittelt einen fairen Richtwert für künstlerische Honorare.', 'icon' => '<path d="M12 3.8 4.8 7.1v4.8c0 4.3 2.9 7.5 7.2 8.7 4.3-1.2 7.2-4.4 7.2-8.7V7.1z"></path><path d="M9.3 12.2h5.4"></path><path d="M12 9.5v5.4"></path>'],
    ['href' => 'gallery_contract_reality_check.php', 'title' => 'Gallery Contract Reality Check', 'description' => '12 Fragen zum finanziellen Realitätscheck von Galerieverträgen.', 'icon' => '<path d="M8 4.5h6l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 7 19V6a1.5 1.5 0 0 1 1-1.4"></path><path d="M14 4.5V9h4"></path><path d="M9.5 13h5"></path><path d="M9.5 16h5"></path>'],
    ['href' => 'salary_data_en.php', 'title' => 'Gehalts- & Honorar-Daten Explorer', 'description' => 'Durchsuche 100 Kunst-/Museumsrollen inkl. Gehalt, Tagessatz, Projektfee und Quellenlinks.', 'icon' => '<path d="M5 18h14"></path><path d="M7.5 15V9"></path><path d="M12 15V6"></path><path d="M16.5 15v-3"></path>'],
    ['href' => 'personalplanung.php', 'title' => 'Personalplanung (FAIR PAY 2026)', 'description' => 'Beschäftigungsgruppen, Beispiele und Gehaltsplanung mit individuellen Stunden.', 'icon' => '<path d="M4.5 19.5h15"></path><path d="M6 7.5h12"></path><path d="M8.5 12h2"></path><path d="M13.5 12h2"></path><path d="M8.5 15.5h7"></path>'],
    ['href' => 'agreement_checklist.php', 'title' => 'Abgemacht? 25-Punkte-Checkliste', 'description' => 'Interaktiver 25-Punkte-Fragebogen mit Detail-Check, Kontext-Popups und Zusammenfassung.', 'icon' => '<path d="M6 5.5h12"></path><path d="M6 10h12"></path><path d="M6 14.5h8"></path><path d="m17.2 17.6 1.8 1.8 3-3"></path>'],
    ['href' => 'fun_calculator.php', 'title' => 'Project Dimensions Calculator', 'description' => 'Radarbasierte Projektbewertung über 6 Dimensionen (1–100).', 'icon' => '<path d="M12 4.5v3"></path><path d="M12 16.5v3"></path><path d="m6.3 6.3 2.1 2.1"></path><path d="m15.6 15.6 2.1 2.1"></path><path d="M4.5 12h3"></path><path d="M16.5 12h3"></path><circle cx="12" cy="12" r="3.5"></circle>'],
  ],
];

require __DIR__ . '/landing_page_template.php';
