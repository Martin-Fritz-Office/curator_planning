<?php
$landingPage = [
  'lang' => 'en',
  'subtitle' => 'A scenario-based guide for early-career art professionals',
  'language_switch' => ['href' => 'index.php', 'label' => 'Deutsch'],
  'primary_cta' => ['href' => 'beginner_path_en.php', 'label' => "I'm just starting — guide me"],
  'secondary_cta' => ['href' => 'index_en.php', 'label' => 'Back to standard tool overview'],
  'story_intro_title' => 'A different way to start: pick the situation that feels like your week',
  'story_intro' => 'You are a young curator-producer balancing unstable gig income, new collaborations, and pressure to stay fair to yourself and your team. Start from your real situation and jump straight into tools that help.',
  'situations_title' => 'Professional situations and best-fit tools',
  'situations' => [
    [
      'title' => 'First independent project after graduation',
      'description' => 'You have your first paid project, but your quote still feels like a guess and you are unsure if the total budget can cover your time.',
      'icon' => '<path d="M12 3.8v4.7"></path><path d="M7.1 7.1 4.6 4.6"></path><path d="M16.9 7.1l2.5-2.5"></path><circle cx="12" cy="13" r="5"></circle><path d="M12 11.3v3.1l2 1.2"></path>',
      'tools' => [
        ['href' => 'hourly_rate_en.php', 'label' => 'Hourly Rate Calculator'],
        ['href' => 'forecast_en_didactic.php', 'label' => 'Annual Forecast (didactic)'],
      ],
    ],
    [
      'title' => 'Too many asks, not enough paid hours',
      'description' => 'You are juggling artist support, admin, production calls, and social posts. You need to scope tasks and protect your paid time.',
      'icon' => '<rect x="4" y="5" width="16" height="14" rx="3"></rect><path d="M8 9h8"></path><path d="M8 12h5"></path><path d="M8 15h3"></path><circle cx="17" cy="14.8" r="2.4"></circle><path d="M17 13.8v1.1l.8.6"></path>',
      'tools' => [
        ['href' => 'freelance_services_calculator.php', 'label' => 'Freelance Service Calculator'],
        ['href' => 'fun_calculator_en.php', 'label' => 'Project Dimensions Calculator'],
      ],
    ],
    [
      'title' => 'A promising project, but risky deal terms',
      'description' => 'An institution or gallery invites you in, but contract language, rights, and payment timing feel unclear. You want a confident response.',
      'icon' => '<path d="M8 4.5h6l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V6a1.5 1.5 0 0 1 1.5-1.5z"></path><path d="M14 4.5V9h4"></path><path d="m9.2 15 2.1 2.1 3.8-4"></path>',
      'tools' => [
        ['href' => 'agreement_checklist_en.php', 'label' => 'Agreement Checklist (25 points)'],
        ['href' => 'gallery_contract_reality_check_en.php', 'label' => 'Gallery Contract Reality Check'],
      ],
    ],
    [
      'title' => 'Trying to pay artists and collaborators fairly',
      'description' => 'You care about fair remuneration but need concrete fee logic and staff-cost clarity before confirming your proposal.',
      'icon' => '<circle cx="12" cy="12" r="7.8"></circle><path d="M12 7.8v8.4"></path><path d="M8.7 10.2c0-1.1 1.3-2 3.3-2s3.3.9 3.3 2-1.3 2-3.3 2-3.3.9-3.3 2 1.3 2 3.3 2 3.3-.9 3.3-2"></path>',
      'tools' => [
        ['href' => 'honorarium_questionnaire_en.php', 'label' => 'Honorarium Questionnaire'],
        ['href' => 'personalplanung_en.php', 'label' => 'Staff planning tool (FAIR PAY 2026)'],
      ],
    ],
  ],
  'section_title' => 'Choose a calculator',
  'footer' => 'The artbackstage tool collection is in ongoing BETA development as part of the teaching assignment "Art in Context (Law, Money and Fairness)" at Kunstuniversität Linz. No personalized data is stored.',
  'tools' => [
    ['href' => 'beginner_path_en.php', 'title' => 'New here? Start with the 4-step beginner path', 'description' => 'A clear route for sustainability, pricing confidence, project decisions, and contract safety.', 'highlight' => true, 'icon' => '<path d="M12 4.5v15"></path><path d="m6.5 10.5 5.5-6 5.5 6"></path>'],
    ['href' => 'forecast_en.php', 'title' => 'Annual Revenue & Profit Forecast', 'description' => 'Full forecast with questionnaire, result sheet, and charts.', 'icon' => '<path d="M4 19.5h16"></path><path d="M6 16l3.2-3.2 2.7 2.6 5-5"></path><circle cx="17" cy="8" r="1.2"></circle>'],
    ['href' => 'forecast_en_didactic.php', 'title' => 'Annual Revenue & Profit Forecast (didactic)', 'description' => 'Alternative UI with a guided and easier-to-follow flow.', 'icon' => '<rect x="4" y="4" width="16" height="16" rx="2.5"></rect><path d="M8 9.2h8"></path><path d="M8 12h8"></path><path d="M8 14.8h5.2"></path>'],
    ['href' => 'hourly_rate_en.php', 'title' => 'Hourly Rate Calculator', 'description' => 'Estimate a sustainable hourly fee with 7 questions.', 'icon' => '<circle cx="12" cy="12" r="7.5"></circle><path d="M12 8v4.2l3 1.7"></path>'],
    ['href' => 'freelance_services_calculator.php', 'title' => 'Freelance Service Calculator', 'description' => 'Select services, set hours, and download a CSV cost summary.', 'icon' => '<path d="M4.5 6.5h15"></path><path d="M4.5 12h15"></path><path d="M4.5 17.5h9"></path><circle cx="18.5" cy="17.5" r="1.3"></circle>'],
    ['href' => 'net_income_carousel_en.php', 'title' => 'Step-by-step yearly net income', 'description' => 'Interactive walkthrough to understand the net-income calculation.', 'icon' => '<rect x="4" y="5" width="16" height="14" rx="2.5"></rect><path d="M4 10.5h16"></path><path d="M8 14h2"></path><path d="M12 14h4"></path>'],
    ['href' => 'curator_viability_carousel_en.php', 'title' => 'Curator Freelance Project Viability', 'description' => '13 questions to decide: go, renegotiate, or decline.', 'icon' => '<path d="M9.2 12.2l1.8 1.8 3.8-4"></path><circle cx="12" cy="12" r="8"></circle>'],
    ['href' => 'gallery_contract_reality_check_en.php', 'title' => 'Gallery Contract Reality Check', 'description' => '12 questions to stress-test gallery deal terms.', 'icon' => '<path d="M8 4.5h6l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 7 19V6a1.5 1.5 0 0 1 1-1.4"></path><path d="M14 4.5V9h4"></path><path d="M9.5 13h5"></path><path d="M9.5 16h5"></path>'],
    ['href' => 'honorarium_questionnaire_en.php', 'title' => 'Honorarium Questionnaire', 'description' => 'Guided questionnaire in English for estimating fair artist honoraria.', 'icon' => '<circle cx="12" cy="12" r="8"></circle><path d="M9.3 9.7a2.7 2.7 0 1 1 5.1 1.4c-.6.9-1.5 1.3-1.9 2.3"></path><circle cx="12" cy="16.9" r=".8"></circle>'],
    ['href' => 'personalplanung_en.php', 'title' => 'Staff planning tool (FAIR PAY 2026)', 'description' => 'View scale groups/examples and calculate actual salaries by custom hours.', 'icon' => '<path d="M4.5 19.5h15"></path><path d="M6 7.5h12"></path><path d="M8.5 12h2"></path><path d="M13.5 12h2"></path><path d="M8.5 15.5h7"></path>'],
    ['href' => 'agreement_checklist_en.php', 'title' => 'Agreement Checklist (25 points)', 'description' => 'Interactive 25-point questionnaire with answer quality tracking and full-context popups.', 'icon' => '<path d="M6 5.5h12"></path><path d="M6 10h12"></path><path d="M6 14.5h8"></path><path d="m17.2 17.6 1.8 1.8 3-3"></path>'],
    ['href' => 'fun_calculator_en.php', 'title' => 'Project Dimensions Calculator', 'description' => 'A radar-based project assessment across 6 dimensions (1–100).', 'icon' => '<path d="M12 4.5v3"></path><path d="M12 16.5v3"></path><path d="m6.3 6.3 2.1 2.1"></path><path d="m15.6 15.6 2.1 2.1"></path><path d="M4.5 12h3"></path><path d="M16.5 12h3"></path><circle cx="12" cy="12" r="3.5"></circle>'],
  ],
];

require __DIR__ . '/landing_page_template.php';
