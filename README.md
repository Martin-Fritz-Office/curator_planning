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
- `index.php` (German)
- `index_en.php` (English)

Use the **Save responses** / **Antworten speichern** button in the header.
The app sends a JSON payload to `submit_survey.php`, which inserts into `survey_submissions`.

## Files added for persistence

- `submit_survey.php` — POST endpoint that validates payload and inserts into MySQL.
- `schema.sql` — table schema for saved survey submissions.
- `db_config.php.example` — template config for DB connection.
