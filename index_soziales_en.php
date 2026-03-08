<?php
$landingPage = [
  'lang' => 'en',
  'page_title' => 'artbackstage | Social',
  'subtitle' => 'Social context in the cultural sector: focus on income, gender, and part-time work.',
  'home' => ['href' => 'index_en.php', 'label' => 'Section selection'],
  'language_switch' => ['href' => 'index_soziales.php', 'label' => 'Deutsch'],
  'story_intro_title' => 'Social overview',
  'story_intro' => 'Here you find the sector table on income, share of women, and part-time rates, plus a concise Gender Report summary with original source links.',
  'situations_title' => 'Direct entry points',
  'situations' => [
    [
      'title' => 'Sector comparison: income, gender and part-time',
      'description' => 'Use the interactive ÖNACE table to compare social patterns across industry sectors.',
      'icon' => '<path d="M4.5 18.5h15"></path><path d="M7.5 15V8"></path><path d="M12 15v-5"></path><path d="M16.5 15V6"></path><circle cx="7.5" cy="6" r="1.1"></circle><circle cx="12" cy="8" r="1.1"></circle><circle cx="16.5" cy="4" r="1.1"></circle>',
      'tools' => [
        ['href' => 'onace_story_table_en.php', 'label' => 'Sector story: income, gender & part-time'],
      ],
    ],
    [
      'title' => 'Gender Report 2017–2021 (summary)',
      'description' => 'Read a two-page summary with direct links to the official German and English source documents.',
      'icon' => '<path d="M8 4.5h6l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V6A1.5 1.5 0 0 1 7.5 4.5z"></path><path d="M14 4.5V9h4"></path><path d="M9 12h6"></path><path d="M9 15h6"></path>',
      'tools' => [
        ['href' => 'gender_report_summary_en.php', 'label' => 'Gender Report summary (EN/DE)'],
      ],
    ],
  ],
  'section_title' => 'Tools in the Social section',
  'footer' => 'The artbackstage tool collection is in ongoing BETA development as part of the teaching assignment "Art in Context (Law, Money and Fairness)" at Kunstuniversität Linz. No personalized data is stored. Teilweise KI generiert. Keine Haftung.',
  'tools' => [
    ['href' => 'onace_story_table_en.php', 'title' => 'Sector story: income, gender & part-time', 'description' => 'Interactive ÖNACE table on income, share of women, and part-time rates — including a narrative for students entering the field.', 'icon' => '<path d="M4.5 18.5h15"></path><path d="M7.5 15V8"></path><path d="M12 15v-5"></path><path d="M16.5 15V6"></path><circle cx="7.5" cy="6" r="1.1"></circle><circle cx="12" cy="8" r="1.1"></circle><circle cx="16.5" cy="4" r="1.1"></circle>'],
    ['href' => 'gender_report_summary_en.php', 'title' => 'Gender Report summary 2017–2021', 'description' => 'Two-page summary with clear source attribution and direct links to the official PDF versions (German/English).', 'icon' => '<path d="M8 4.5h6l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V6A1.5 1.5 0 0 1 7.5 4.5z"></path><path d="M14 4.5V9h4"></path><path d="M9 12h6"></path><path d="M9 15h6"></path>'],
  ],
];

require __DIR__ . '/landing_page_template.php';
