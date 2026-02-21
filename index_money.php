<?php
$landingPage = [
  'lang' => 'de',
  'subtitle' => 'Einfacher Einstieg: Situationen verstehen, passende Rechner wählen, sichere Entscheidungen treffen.',
  'home' => ['href' => 'index.php', 'label' => 'Bereichsauswahl'],
  'language_switch' => ['href' => 'index_en.php', 'label' => 'English'],
  'story_intro_title' => 'Dein Einstieg in die Tool-Sammlung',
  'story_intro' => 'Wähle zuerst deine Situation, folge danach dem empfohlenen Ablauf und springe anschließend direkt in die passenden Tools.',
  'situations_title' => 'Typische Situationen und direkte Tool-Empfehlungen',
  'situations' => [
    [
      'title' => 'Ich starte gerade in die Selbstständigkeit',
      'description' => 'Du willst schnell wissen, ob dein Setup tragfähig ist und welcher Stundensatz realistisch ist.',
      'icon' => '<path d="M12 3.8v4.7"></path><path d="M7.1 7.1 4.6 4.6"></path><path d="M16.9 7.1l2.5-2.5"></path><circle cx="12" cy="13" r="5"></circle><path d="M12 11.3v3.1l2 1.2"></path>',
      'tools' => [
        ['href' => 'forecast_didactic.php', 'label' => 'Jahresprognose (didaktisch)'],
        ['href' => 'forecast.php', 'label' => 'Jahresumsatz- & Gewinnprognose'],
        ['href' => 'hourly_rate.php', 'label' => 'Stundensatz-Rechner'],
      ],
    ],
    [
      'title' => 'Ich plane Angebote, Leistungen und laufende Arbeit',
      'description' => 'Du musst Aufgaben in klare Services übersetzen, Aufwand bewerten und Einnahmen mit Netto-Bedarf abgleichen.',
      'icon' => '<rect x="4" y="5" width="16" height="14" rx="3"></rect><path d="M8 9h8"></path><path d="M8 12h5"></path><path d="M8 15h3"></path><circle cx="17" cy="14.8" r="2.4"></circle><path d="M17 13.8v1.1l.8.6"></path>',
      'tools' => [
        ['href' => 'freelance_services_calculator.php', 'label' => 'Freelance-Service-Rechner'],
        ['href' => 'net_income_carousel.php', 'label' => 'Jahresnettoeinkommen Schritt für Schritt'],
        ['href' => 'fun_calculator.php', 'label' => 'Project Dimensions Calculator'],
      ],
    ],
    [
      'title' => 'Ich entscheide über Projekte und Verträge',
      'description' => 'Du willst vor Zusagen Risiken, Verhandlungsspielräume und finanzielle Folgen schnell prüfen.',
      'icon' => '<path d="M8 4.5h6l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V6a1.5 1.5 0 0 1 1.5-1.5z"></path><path d="M14 4.5V9h4"></path><path d="m9.2 15 2.1 2.1 3.8-4"></path>',
      'tools' => [
        ['href' => 'curator_viability_carousel.php', 'label' => 'Projekt-Check für freie Kurator*innen'],
        ['href' => 'agreement_checklist.php', 'label' => 'Abgemacht? 25-Punkte-Checkliste'],
        ['href' => 'gallery_contract_reality_check.php', 'label' => 'Gallery Contract Reality Check'],
      ],
    ],
    [
      'title' => 'Ich plane faire Budgets für Künstler*innen und Teams',
      'description' => 'Du brauchst belastbare Richtwerte für Honorare, Gehälter und Rollen in Kulturprojekten.',
      'icon' => '<circle cx="12" cy="12" r="7.8"></circle><path d="M12 7.8v8.4"></path><path d="M8.7 10.2c0-1.1 1.3-2 3.3-2s3.3.9 3.3 2-1.3 2-3.3 2-3.3.9-3.3 2 1.3 2 3.3 2 3.3-.9 3.3-2"></path>',
      'tools' => [
        ['href' => 'honorarium_questionnaire.php', 'label' => 'Honorar-Fragebogen (Leitfaden 2026)'],
        ['href' => 'personalplanung.php', 'label' => 'Personalplanung (FAIR PAY 2026)'],
        ['href' => 'salary_data_en.php', 'label' => 'Gehalts- & Honorar-Daten Explorer'],
        ['href' => 'onace_story_table.php', 'label' => 'Branchen-Story: Kunst, Teilzeit & Gender'],
        ['href' => 'bildrecht_tarifliste.php', 'label' => 'Bildrecht Tarifliste Explorer'],
      ],
    ],
  ],
  'guide_title' => 'Empfohlener Ablauf',
  'guide_intro' => 'Wenn du nicht weißt, wo du anfangen sollst: Gehe diese vier Blöcke nacheinander durch. So deckst du Orientierung, Kalkulation, Projektentscheidung und Vertrags-/Fairnessfragen ab.',
  'guide_steps' => [
    [
      'badge' => 'Block 1 · Finanzrahmen',
      'title' => 'Erst Überblick schaffen',
      'description' => 'Starte mit einer Jahresprognose und übersetze den Zielwert in einen realistischen Stundensatz.',
      'tools' => [
        ['href' => 'forecast_didactic.php', 'label' => 'Jahresprognose (didaktisch)'],
        ['href' => 'forecast.php', 'label' => 'Jahresumsatz- & Gewinnprognose'],
        ['href' => 'hourly_rate.php', 'label' => 'Stundensatz-Rechner'],
      ],
    ],
    [
      'badge' => 'Block 2 · Angebot & Machbarkeit',
      'title' => 'Leistungen konkret machen',
      'description' => 'Formuliere Services, plane Aufwände und prüfe, wie sich Projektentscheidungen auf dein Netto auswirken.',
      'tools' => [
        ['href' => 'freelance_services_calculator.php', 'label' => 'Freelance-Service-Rechner'],
        ['href' => 'net_income_carousel.php', 'label' => 'Jahresnettoeinkommen Schritt für Schritt'],
        ['href' => 'fun_calculator.php', 'label' => 'Project Dimensions Calculator'],
      ],
    ],
    [
      'badge' => 'Block 3 · Zusage oder Nachverhandlung',
      'title' => 'Projekte und Verträge absichern',
      'description' => 'Beurteile Projektviabilität und sichere zentrale Vertragsklauseln vor der Zusage.',
      'tools' => [
        ['href' => 'curator_viability_carousel.php', 'label' => 'Projekt-Check für freie Kurator*innen'],
        ['href' => 'agreement_checklist.php', 'label' => 'Abgemacht? 25-Punkte-Checkliste'],
        ['href' => 'gallery_contract_reality_check.php', 'label' => 'Gallery Contract Reality Check'],
      ],
    ],
    [
      'badge' => 'Block 4 · Fair Pay & Teamplanung',
      'title' => 'Faire Vergütung belastbar planen',
      'description' => 'Nutze Honorar- und Gehaltswerkzeuge, wenn du Budgets, Rollen oder Teamgrößen planst.',
      'tools' => [
        ['href' => 'honorarium_questionnaire.php', 'label' => 'Honorar-Fragebogen (Leitfaden 2026)'],
        ['href' => 'personalplanung.php', 'label' => 'Personalplanung (FAIR PAY 2026)'],
        ['href' => 'salary_data_en.php', 'label' => 'Gehalts- & Honorar-Daten Explorer'],
        ['href' => 'onace_story_table.php', 'label' => 'Branchen-Story: Kunst, Teilzeit & Gender'],
        ['href' => 'bildrecht_tarifliste.php', 'label' => 'Bildrecht Tarifliste Explorer'],
      ],
    ],
  ],
  'section_title' => 'Alle Rechner im Überblick',
  'footer' => 'Die artbackstage Toolsammlung ist in laufender BETA-Entwicklung als Teil des Lehrauftrags "Kunst im Kontext (Recht, Geld und Fairness) an der Kunstuniversität Linz. Verwendet werden unter anderem Materialien der IG Bildende Kunst, der KUPF Oberösterreich und aus dem Fair Pay Prozess der IG Kultur. Es werden keine personalisierten Daten gespeichert. Teilweise KI generiert. Keine Haftung.',
  'tools' => [
    ['href' => 'forecast.php', 'title' => 'Jahresumsatz- & Gewinnprognose', 'description' => 'Vollständige Prognose mit Fragen, Sheet und Diagrammen.', 'icon' => '<path d="M4 19.5h16"></path><path d="M6 16l3.2-3.2 2.7 2.6 5-5"></path><circle cx="17" cy="8" r="1.2"></circle>'],
    ['href' => 'forecast_didactic.php', 'title' => 'Jahresumsatz- & Gewinnprognose (didaktisch)', 'description' => 'Alternative Oberfläche mit geführter, verständlicher Reihenfolge.', 'icon' => '<rect x="4" y="4" width="16" height="16" rx="2.5"></rect><path d="M8 9.2h8"></path><path d="M8 12h8"></path><path d="M8 14.8h5.2"></path>'],
    ['href' => 'hourly_rate.php', 'title' => 'Stundensatz-Rechner', 'description' => 'Berechne ein tragfähiges Stundenhonorar in 7 Fragen.', 'icon' => '<circle cx="12" cy="12" r="7.5"></circle><path d="M12 8v4.2l3 1.7"></path>'],
    ['href' => 'freelance_services_calculator.php', 'title' => 'Freelance-Service-Rechner', 'description' => 'Leistungen wählen, Stunden kalkulieren und als CSV exportieren.', 'icon' => '<path d="M4.5 6.5h15"></path><path d="M4.5 12h15"></path><path d="M4.5 17.5h9"></path><circle cx="18.5" cy="17.5" r="1.3"></circle>'],
    ['href' => 'net_income_carousel.php', 'title' => 'Jahresnettoeinkommen Schritt für Schritt', 'description' => 'Didaktische Serie zur nachvollziehbaren Netto-Berechnung.', 'icon' => '<rect x="4" y="5" width="16" height="14" rx="2.5"></rect><path d="M4 10.5h16"></path><path d="M8 14h2"></path><path d="M12 14h4"></path>'],
    ['href' => 'curator_viability_carousel.php', 'title' => 'Projekt-Check für freie Kurator*innen', 'description' => '13 Fragen für die Entscheidung: zusagen, nachverhandeln oder absagen.', 'icon' => '<path d="M9.2 12.2l1.8 1.8 3.8-4"></path><circle cx="12" cy="12" r="8"></circle>'],
    ['href' => 'honorarium_questionnaire.php', 'title' => 'Honorar-Fragebogen (Leitfaden 2026)', 'description' => 'Ermittelt einen fairen Richtwert für künstlerische Honorare.', 'icon' => '<path d="M12 3.8 4.8 7.1v4.8c0 4.3 2.9 7.5 7.2 8.7 4.3-1.2 7.2-4.4 7.2-8.7V7.1z"></path><path d="M9.3 12.2h5.4"></path><path d="M12 9.5v5.4"></path>'],
    ['href' => 'gallery_contract_reality_check.php', 'title' => 'Gallery Contract Reality Check', 'description' => '12 Fragen zum finanziellen Realitätscheck von Galerieverträgen.', 'icon' => '<path d="M8 4.5h6l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 7 19V6a1.5 1.5 0 0 1 1-1.4"></path><path d="M14 4.5V9h4"></path><path d="M9.5 13h5"></path><path d="M9.5 16h5"></path>'],
    ['href' => 'salary_data_en.php', 'title' => 'Gehalts- & Honorar-Daten Explorer', 'description' => 'Durchsuche 100 Kunst-/Museumsrollen inkl. Gehalt, Tagessatz, Projektfee und Quellenlinks.', 'icon' => '<path d="M5 18h14"></path><path d="M7.5 15V9"></path><path d="M12 15V6"></path><path d="M16.5 15v-3"></path>'],
    ['href' => 'onace_story_table.php', 'title' => 'Branchen-Story: Kunst, Teilzeit & Gender', 'description' => 'Interaktive ÖNACE-Tabelle zu Einkommen, Frauenanteil, Vollzeit- und Teilzeitquote inkl. Story für Berufseinsteiger*innen.', 'icon' => '<path d="M4.5 18.5h15"></path><path d="M7.5 15V8"></path><path d="M12 15v-5"></path><path d="M16.5 15V6"></path><circle cx="7.5" cy="6" r="1.1"></circle><circle cx="12" cy="8" r="1.1"></circle><circle cx="16.5" cy="4" r="1.1"></circle>'],
    ['href' => 'bildrecht_tarifliste.php', 'title' => 'Bildrecht Tarifliste Explorer', 'description' => 'Durchsuche die aktuellen Bildrecht-Tarife nach Kategorie, Abschnitt und Gebührenzeilen.', 'icon' => '<path d="M5 7h14"></path><path d="M5 12h14"></path><path d="M5 17h9"></path><circle cx="17.5" cy="17" r="1.5"></circle>'],
    ['href' => 'personalplanung.php', 'title' => 'Personalplanung (FAIR PAY 2026)', 'description' => 'Beschäftigungsgruppen, Beispiele und Gehaltsplanung mit individuellen Stunden.', 'icon' => '<path d="M4.5 19.5h15"></path><path d="M6 7.5h12"></path><path d="M8.5 12h2"></path><path d="M13.5 12h2"></path><path d="M8.5 15.5h7"></path>'],
    ['href' => 'agreement_checklist.php', 'title' => 'Abgemacht? 25-Punkte-Checkliste', 'description' => 'Interaktiver 25-Punkte-Fragebogen mit Detail-Check, Kontext-Popups und Zusammenfassung.', 'icon' => '<path d="M6 5.5h12"></path><path d="M6 10h12"></path><path d="M6 14.5h8"></path><path d="m17.2 17.6 1.8 1.8 3-3"></path>'],
    ['href' => 'fun_calculator.php', 'title' => 'Project Dimensions Calculator', 'description' => 'Radarbasierte Projektbewertung über 6 Dimensionen (1–100).', 'icon' => '<path d="M12 4.5v3"></path><path d="M12 16.5v3"></path><path d="m6.3 6.3 2.1 2.1"></path><path d="m15.6 15.6 2.1 2.1"></path><path d="M4.5 12h3"></path><path d="M16.5 12h3"></path><circle cx="12" cy="12" r="3.5"></circle>'],
  ],
];

require __DIR__ . '/landing_page_template.php';
