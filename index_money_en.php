<?php
$landingPage = [
  'lang' => 'en',
  'page_title' => 'artbackstage | Money – Financial Planning Tools for Curators',
  'meta_description' => 'Annual forecast, hourly rate calculator, fair pay tools and more – everything freelance curators need for financial planning and sustainable practice.',
  'alternate_lang' => 'de',
  'alternate_url' => 'https://artbackstage.at/index_money.php',
  'subtitle' => 'Know your numbers. Protect your time. Work sustainably.',
  'home' => ['href' => 'index_en.php', 'label' => 'Section selection'],
  'language_switch' => ['href' => 'index_money.php', 'label' => 'Deutsch'],
  'credibility_badge' => [
    'text' => 'Built on Austrian tax law (2025), FAIR PAY 2026 & KU Linz research',
    'sources_href' => 'sources_en.php',
    'sources_label' => 'View sources',
  ],
  'onboarding_block' => [
    'text' => 'New to artbackstage? Start with the Annual Forecast — 22 questions that reveal whether your current setup is financially viable.',
    'cta_label' => 'Start here →',
    'cta_href' => 'forecast_en.php',
  ],
  'planning_checklist' => [
    'title' => 'Your planning progress',
    'reset_label' => 'Reset',
    'items' => [
      ['id' => 'fc_forecast', 'label' => 'Annual forecast complete', 'href' => 'forecast_en.php'],
      ['id' => 'fc_hourly',   'label' => 'Hourly rate calculated',  'href' => 'hourly_rate_en.php'],
      ['id' => 'fc_services', 'label' => 'Services priced',         'href' => 'freelance_services_calculator.php'],
      ['id' => 'fc_contract', 'label' => 'Contract reviewed',       'href' => 'agreement_checklist_en.php'],
    ],
  ],
  'story_intro_title' => 'Start from your current situation',
  'story_intro' => 'Most cultural practitioners undercharge, overdeliver, and sign contracts they later regret. These tools are built to change that — one decision at a time.',
  'situations_title' => 'Professional situations and best-fit tools',
  'situations' => [
    [
      'title' => 'First independent project after graduation',
      'description' => 'Your first paid project is exciting — and exposing. Get clarity on what your time is actually worth before you commit.',
      'icon' => '<path d="M12 3.8v4.7"></path><path d="M7.1 7.1 4.6 4.6"></path><path d="M16.9 7.1l2.5-2.5"></path><circle cx="12" cy="13" r="5"></circle><path d="M12 11.3v3.1l2 1.2"></path>',
      'tools' => [
        ['href' => 'hourly_rate_en.php', 'label' => 'Hourly Rate Calculator'],
        ['href' => 'forecast_en.php', 'label' => 'Annual Revenue & Profit Forecast'],
      ],
    ],
    [
      'title' => 'Too many asks, not enough paid hours',
      'description' => 'Every "quick call" and unpaid admin hour erodes your income. Define your services and protect what you actually get paid for.',
      'icon' => '<rect x="4" y="5" width="16" height="14" rx="3"></rect><path d="M8 9h8"></path><path d="M8 12h5"></path><path d="M8 15h3"></path><circle cx="17" cy="14.8" r="2.4"></circle><path d="M17 13.8v1.1l.8.6"></path>',
      'tools' => [
        ['href' => 'freelance_services_calculator.php', 'label' => 'Freelance Service Calculator'],
        ['href' => 'yearly_turnover_calculator_en.php', 'label' => 'Yearly Turnover Calculator'],
        ['href' => 'fun_calculator_en.php', 'label' => 'Project Dimensions Calculator'],
      ],
    ],
    [
      'title' => 'A promising project, but risky deal terms',
      'description' => 'Institutions have lawyers. You should have a checklist. Stress-test the deal before you say yes.',
      'icon' => '<path d="M8 4.5h6l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V6a1.5 1.5 0 0 1 1.5-1.5z"></path><path d="M14 4.5V9h4"></path><path d="m9.2 15 2.1 2.1 3.8-4"></path>',
      'tools' => [
        ['href' => 'agreement_checklist_en.php', 'label' => 'Agreement Checklist (25 points)'],
        ['href' => 'gallery_contract_reality_check_en.php', 'label' => 'Gallery Contract Reality Check'],
      ],
    ],
    [
      'title' => 'Trying to pay artists and collaborators fairly',
      'description' => 'Paying fairly is not just ethical — it is how the sector stays liveable. Use data-backed benchmarks to build a budget you can defend.',
      'icon' => '<circle cx="12" cy="12" r="7.8"></circle><path d="M12 7.8v8.4"></path><path d="M8.7 10.2c0-1.1 1.3-2 3.3-2s3.3.9 3.3 2-1.3 2-3.3 2-3.3.9-3.3 2 1.3 2 3.3 2 3.3-.9 3.3-2"></path>',
      'tools' => [
        ['href' => 'honorarium_questionnaire_en.php', 'label' => 'Honorarium Questionnaire'],
        ['href' => 'personalplanung_en.php', 'label' => 'Staff planning tool (FAIR PAY 2026)'],
      ],
    ],
  ],
  'section_title' => 'All calculators',
  'tools_toggle_label' => 'Browse all 12 tools',
  'footer' => 'The artbackstage tool collection is in ongoing BETA development as part of the teaching assignment "Art in Context (Law, Money and Fairness)" at Kunstuniversität Linz. No personalized data is stored. Teilweise KI generiert. Keine Haftung.',
  'tools' => [
    ['href' => 'forecast_en.php', 'title' => 'Annual Revenue & Profit Forecast', 'description' => 'Full forecast with questionnaire, result sheet, and charts.', 'icon' => '<path d="M4 19.5h16"></path><path d="M6 16l3.2-3.2 2.7 2.6 5-5"></path><circle cx="17" cy="8" r="1.2"></circle>'],
    ['href' => 'hourly_rate_en.php', 'title' => 'Hourly Rate Calculator', 'description' => 'Estimate a sustainable hourly fee with 7 questions.', 'icon' => '<circle cx="12" cy="12" r="7.5"></circle><path d="M12 8v4.2l3 1.7"></path>'],
    ['href' => 'freelance_services_calculator.php', 'title' => 'Freelance Service Calculator', 'description' => 'Select services, set hours, and download a CSV cost summary.', 'icon' => '<path d="M4.5 6.5h15"></path><path d="M4.5 12h15"></path><path d="M4.5 17.5h9"></path><circle cx="18.5" cy="17.5" r="1.3"></circle>'],
    ['href' => 'yearly_turnover_calculator_en.php', 'title' => 'Yearly Turnover Calculator', 'description' => 'Add your own service rows and see an instant yearly turnover total.', 'icon' => '<path d="M5 6.5h14"></path><path d="M5 11h14"></path><path d="M5 15.5h10"></path><path d="M16.5 15.5h2"></path><path d="M16.5 18.5v-6"></path>'],
    ['href' => 'net_income_carousel_en.php', 'title' => 'Step-by-step yearly net income', 'description' => 'Interactive walkthrough to understand the net-income calculation.', 'icon' => '<rect x="4" y="5" width="16" height="14" rx="2.5"></rect><path d="M4 10.5h16"></path><path d="M8 14h2"></path><path d="M12 14h4"></path>'],
    ['href' => 'curator_viability_carousel_en.php', 'title' => 'Curator Freelance Project Viability', 'description' => '13 questions to decide: go, renegotiate, or decline.', 'icon' => '<path d="M9.2 12.2l1.8 1.8 3.8-4"></path><circle cx="12" cy="12" r="8"></circle>'],
    ['href' => 'gallery_contract_reality_check_en.php', 'title' => 'Gallery Contract Reality Check', 'description' => '12 questions to stress-test gallery deal terms.', 'icon' => '<path d="M8 4.5h6l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 7 19V6a1.5 1.5 0 0 1 1-1.4"></path><path d="M14 4.5V9h4"></path><path d="M9.5 13h5"></path><path d="M9.5 16h5"></path>'],
    ['href' => 'honorarium_questionnaire_en.php', 'title' => 'Honorarium Questionnaire', 'description' => 'Guided questionnaire in English for estimating fair artist honoraria.', 'icon' => '<circle cx="12" cy="12" r="8"></circle><path d="M9.3 9.7a2.7 2.7 0 1 1 5.1 1.4c-.6.9-1.5 1.3-1.9 2.3"></path><circle cx="12" cy="16.9" r=".8"></circle>'],
    ['href' => 'salary_data_en.php', 'title' => 'Salary & Fee Data Explorer', 'description' => 'Search 100 art/museum roles and compare salary, day-rate, and project-fee ranges with source links.', 'icon' => '<path d="M5 18h14"></path><path d="M7.5 15V9"></path><path d="M12 15V6"></path><path d="M16.5 15v-3"></path>'],
    ['href' => 'personalplanung_en.php', 'title' => 'Staff planning tool (FAIR PAY 2026)', 'description' => 'View scale groups/examples and calculate actual salaries by custom hours.', 'icon' => '<path d="M4.5 19.5h15"></path><path d="M6 7.5h12"></path><path d="M8.5 12h2"></path><path d="M13.5 12h2"></path><path d="M8.5 15.5h7"></path>'],
    ['href' => 'agreement_checklist_en.php', 'title' => 'Agreement Checklist (25 points)', 'description' => 'Interactive 25-point checklist with response-quality tracking and contextual pop-ups.', 'icon' => '<path d="M6 5.5h12"></path><path d="M6 10h12"></path><path d="M6 14.5h8"></path><path d="m17.2 17.6 1.8 1.8 3-3"></path>'],
    ['href' => 'fun_calculator_en.php', 'title' => 'Project Dimensions Calculator', 'description' => 'A radar-based project assessment across 6 dimensions (1–100).', 'icon' => '<path d="M12 4.5v3"></path><path d="M12 16.5v3"></path><path d="m6.3 6.3 2.1 2.1"></path><path d="m15.6 15.6 2.1 2.1"></path><path d="M4.5 12h3"></path><path d="M16.5 12h3"></path><circle cx="12" cy="12" r="3.5"></circle>'],
  ],
];

require __DIR__ . '/landing_page_template.php';
