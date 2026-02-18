# curator_planning

A lightweight PHP + vanilla JS planning tool for freelance curators.

## New: store survey submissions in MySQL

This repository now includes a built-in save flow that stores questionnaire submissions (answers + key income outputs) in MySQL.

### 1) Create the table

Run the SQL in `schema.sql` against your MySQL database.

### 2) Add database credentials

Copy `db_config.php.example` to `db_config.php` and fill in your connection values:

```bash
cp db_config.php.example db_config.php
```

### 3) Ensure PDO MySQL is available

Your PHP runtime needs `pdo_mysql` enabled.

### 4) Save from the UI

Open either:
- `forecast.php` (German forecast tool)
- `forecast_en.php` (English forecast tool)
- `forecast_didactic.php` (German didactic layout, same logic/data)
- `forecast_en_didactic.php` (English didactic layout, same logic/data)

Entry pages are now:
- `index.php` (German landing page)
- `index_en.php` (English landing page)

Additional learning carousels:
- `curator_viability_carousel.php` — 13-question project viability check for freelance curators.
- `gallery_contract_reality_check.php` — 12-question gallery contract reality check.
- `honorarium_questionnaire.php` — German guided honorarium questionnaire (Leitfaden 2026).
- `personalplanung.php` — Personalplanungstool mit FAIR PAY 2026 Gehaltsschema, BG-Beispielen und individueller Stundenberechnung.
- `agreement_checklist.php` — Interaktive 25-Punkte-Checkliste (nach Martin Fritz) für Vertrags- und Projektvereinbarungen mit Notizen und Status.
- `fair_use_questionnaire.php` — legacy URL that redirects to `index_en.php` to preserve the English flow.

Use the **Save responses** / **Antworten speichern** button in the header.
The app sends a JSON payload to `submit_survey.php`, which inserts into `survey_submissions`.
You can now assign a scenario name and load saved scenarios from a list that shows scenario name + total available income.

## Files added for persistence

- `submit_survey.php` — POST endpoint that validates payload and inserts into MySQL.
- `income_scenarios.php` — GET endpoint returning saved scenario names, total income, and answer payload for reloading.

- `median_available_income.php` — GET endpoint that reads `available_income` values and returns the median for display in the UI.
- `schema.sql` — table schema for saved survey submissions.
- `db_config.php.example` — template config for DB connection.
