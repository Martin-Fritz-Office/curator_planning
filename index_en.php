<?php
$landingPage = [
  'lang' => 'en',
  'subtitle' => 'Choose a calculator to plan your finances',
  'language_switch' => ['href' => 'index.php', 'label' => 'Deutsch'],
  'primary_cta' => ['href' => 'beginner_path_en.php', 'label' => "I'm just starting — guide me"],
  'secondary_cta' => ['href' => 'how_can_i_use_this_site.php', 'label' => 'How can I use this site'],
  'section_title' => 'Choose a calculator',
  'footer' => 'Die artbackstage Toolsammlung ist in laufender BETA-Entwicklung als Teil des Lehrauftrags "Kunst im Kontext (Recht, Geld und Fairness) an der Kunstuniversität Linz. Es werden keine personalisierten Daten gespeichert.',
  'tools' => [
    ['href' => 'beginner_path_en.php', 'title' => 'New here? Start with the 4-step beginner path', 'description' => 'A clear route for sustainability, pricing confidence, project decisions, and contract safety.', 'highlight' => true, 'icon' => '<path d="M12 4.5v15"></path><path d="m6.5 10.5 5.5-6 5.5 6"></path>'],
    ['href' => 'forecast_en.php', 'title' => 'Annual Revenue & Profit Forecast', 'description' => 'Full forecast with questionnaire, result sheet, and charts.', 'icon' => '<path d="M4 19.5h16"></path><path d="M6 16l3.2-3.2 2.7 2.6 5-5"></path><circle cx="17" cy="8" r="1.2"></circle>'],
    ['href' => 'forecast_en_didactic.php', 'title' => 'Annual Revenue & Profit Forecast (didactic)', 'description' => 'Alternative UI with a guided and easier-to-follow flow.', 'icon' => '<rect x="4" y="4" width="16" height="16" rx="2.5"></rect><path d="M8 9.2h8"></path><path d="M8 12h8"></path><path d="M8 14.8h5.2"></path>'],
    ['href' => 'hourly_rate_en.php', 'title' => 'Hourly Rate Calculator', 'description' => 'Estimate a sustainable hourly fee with 7 questions.', 'icon' => '<circle cx="12" cy="12" r="7.5"></circle><path d="M12 8v4.2l3 1.7"></path>'],
    ['href' => 'freelance_services_calculator.php', 'title' => 'Freelance Service Calculator', 'description' => 'Select services, set hours, and download a CSV cost summary.', 'icon' => '<path d="M4.5 6.5h15"></path><path d="M4.5 12h15"></path><path d="M4.5 17.5h9"></path><circle cx="18.5" cy="17.5" r="1.3"></circle>'],
    ['href' => 'net_income_carousel.php', 'title' => 'Step-by-step yearly net income', 'description' => 'Interactive walkthrough to understand the net-income calculation.', 'icon' => '<rect x="4" y="5" width="16" height="14" rx="2.5"></rect><path d="M4 10.5h16"></path><path d="M8 14h2"></path><path d="M12 14h4"></path>'],
    ['href' => 'curator_viability_carousel.php', 'title' => 'Curator Freelance Project Viability', 'description' => '13 questions to decide: go, renegotiate, or decline.', 'icon' => '<path d="M9.2 12.2l1.8 1.8 3.8-4"></path><circle cx="12" cy="12" r="8"></circle>'],
    ['href' => 'gallery_contract_reality_check.php', 'title' => 'Gallery Contract Reality Check', 'description' => '12 questions to stress-test gallery deal terms.', 'icon' => '<path d="M8 4.5h6l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 7 19V6a1.5 1.5 0 0 1 1-1.4"></path><path d="M14 4.5V9h4"></path><path d="M9.5 13h5"></path><path d="M9.5 16h5"></path>'],
    ['href' => 'honorarium_questionnaire_en.php', 'title' => 'Honorarium Questionnaire', 'description' => 'Guided questionnaire in English for estimating fair artist honoraria.', 'icon' => '<circle cx="12" cy="12" r="8"></circle><path d="M9.3 9.7a2.7 2.7 0 1 1 5.1 1.4c-.6.9-1.5 1.3-1.9 2.3"></path><circle cx="12" cy="16.9" r=".8"></circle>'],
    ['href' => 'personalplanung_en.php', 'title' => 'Staff planning tool (FAIR PAY 2026)', 'description' => 'View scale groups/examples and calculate actual salaries by custom hours.', 'icon' => '<path d="M4.5 19.5h15"></path><path d="M6 7.5h12"></path><path d="M8.5 12h2"></path><path d="M13.5 12h2"></path><path d="M8.5 15.5h7"></path>'],
    ['href' => 'agreement_checklist_en.php', 'title' => 'Agreement Checklist (25 points)', 'description' => 'Interactive 25-point questionnaire with answer quality tracking and full-context popups.', 'icon' => '<path d="M6 5.5h12"></path><path d="M6 10h12"></path><path d="M6 14.5h8"></path><path d="m17.2 17.6 1.8 1.8 3-3"></path>'],
    ['href' => 'fun_calculator.php', 'title' => 'Project Dimensions Calculator', 'description' => 'A radar-based project assessment across 6 dimensions (1–100).', 'icon' => '<path d="M12 4.5v3"></path><path d="M12 16.5v3"></path><path d="m6.3 6.3 2.1 2.1"></path><path d="m15.6 15.6 2.1 2.1"></path><path d="M4.5 12h3"></path><path d="M16.5 12h3"></path><circle cx="12" cy="12" r="3.5"></circle>'],
  ],
];

require __DIR__ . '/landing_page_template.php';
