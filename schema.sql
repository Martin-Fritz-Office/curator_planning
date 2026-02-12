CREATE TABLE IF NOT EXISTS survey_submissions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    locale VARCHAR(8) NOT NULL DEFAULT 'de',
    answers_json JSON NOT NULL,
    employment_net_income DECIMAL(12,2) NOT NULL DEFAULT 0,
    available_income DECIMAL(12,2) NOT NULL DEFAULT 0,
    target_income DECIMAL(12,2) NOT NULL DEFAULT 0,
    income_gap DECIMAL(12,2) NOT NULL DEFAULT 0,
    typology_label VARCHAR(64) NOT NULL DEFAULT '',
    typology_score DECIMAL(5,4) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_created_at (created_at),
    INDEX idx_locale_created_at (locale, created_at)
);
