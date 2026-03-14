CREATE TABLE IF NOT EXISTS survey_submissions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    locale VARCHAR(8) NOT NULL DEFAULT 'de',
    scenario_name VARCHAR(120) NOT NULL DEFAULT '',
    answers_json JSON NOT NULL,
    employment_net_income DECIMAL(12,2) NOT NULL DEFAULT 0,
    available_income DECIMAL(12,2) NOT NULL DEFAULT 0,
    target_income DECIMAL(12,2) NOT NULL DEFAULT 0,
    income_gap DECIMAL(12,2) NOT NULL DEFAULT 0,
    typology_label VARCHAR(64) NOT NULL DEFAULT '',
    typology_score DECIMAL(5,4) NULL,
    questionnaire_json JSON NULL,
    computed_json JSON NULL,
    prognosis_lines_json JSON NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_created_at (created_at),
    INDEX idx_locale_created_at (locale, created_at),
    INDEX idx_available_income (available_income)
);

CREATE TABLE IF NOT EXISTS faq (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(120) NOT NULL DEFAULT '',
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    votes_positive INT UNSIGNED NOT NULL DEFAULT 0,
    votes_negative INT UNSIGNED NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_category (category)
);

-- Migration for existing installations (run once if faq table already exists):
-- ALTER TABLE faq ADD COLUMN votes_positive INT UNSIGNED NOT NULL DEFAULT 0;
-- ALTER TABLE faq ADD COLUMN votes_negative INT UNSIGNED NOT NULL DEFAULT 0;
