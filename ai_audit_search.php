<?php
$page_title = "KI-gestützte Prüfungsempfehlungs-Suche";
$page_description = "Semantische Suche über 22.000 Auditing-Empfehlungen mit Claude AI";
?>
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?php echo htmlspecialchars($page_description); ?>">
    <title><?php echo htmlspecialchars($page_title); ?></title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            overflow: hidden;
        }

        header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
        }

        .back-link {
            display: inline-block;
            color: white;
            text-decoration: none;
            font-size: 0.95rem;
            margin-bottom: 20px;
            padding: 8px 0;
            opacity: 0.9;
            transition: opacity 0.3s ease;
        }

        .back-link:hover {
            opacity: 1;
            text-decoration: underline;
        }

        header h1 {
            font-size: 2.2rem;
            margin-bottom: 12px;
            font-weight: 700;
        }

        header p {
            font-size: 1rem;
            opacity: 0.95;
            font-weight: 300;
        }

        .source {
            margin-top: 15px;
            font-size: 0.9rem;
            opacity: 0.85;
            font-style: italic;
        }

        .search-section {
            padding: 40px 20px;
            max-width: 1000px;
            margin: 0 auto;
        }

        .search-box {
            margin-bottom: 20px;
        }

        .search-box label {
            display: block;
            font-weight: 600;
            margin-bottom: 12px;
            color: #333;
            font-size: 1.05rem;
        }

        .search-input-wrapper {
            display: flex;
            gap: 10px;
        }

        .search-box input {
            flex: 1;
            padding: 14px 16px;
            font-size: 1rem;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            transition: all 0.3s ease;
        }

        .search-box input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .search-btn {
            padding: 14px 28px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            font-size: 1rem;
            transition: all 0.3s ease;
        }

        .search-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .search-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        .loading {
            display: none;
            text-align: center;
            padding: 40px;
            color: #667eea;
            font-weight: 600;
        }

        .loading.show {
            display: block;
        }

        .spinner {
            display: inline-block;
            width: 24px;
            height: 24px;
            border: 3px solid rgba(102, 126, 234, 0.3);
            border-radius: 50%;
            border-top-color: #667eea;
            animation: spin 0.8s linear infinite;
            margin-right: 10px;
            vertical-align: middle;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        .results {
            margin-top: 30px;
        }

        .answer-box {
            background: white;
            border: 2px solid #667eea;
            border-radius: 10px;
            padding: 25px;
            margin-bottom: 25px;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.1);
        }

        .answer-box h3 {
            color: #667eea;
            margin-bottom: 15px;
            font-size: 1.1rem;
        }

        .answer-text {
            color: #333;
            line-height: 1.7;
            font-size: 0.95rem;
            white-space: pre-wrap;
        }

        .sources {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
        }

        .sources h4 {
            color: #555;
            font-size: 0.9rem;
            margin-bottom: 12px;
            text-transform: uppercase;
            font-weight: 600;
            letter-spacing: 0.5px;
        }

        .source-item {
            background: #f8f9fa;
            padding: 14px;
            margin-bottom: 12px;
            border-radius: 6px;
            border-left: 3px solid #667eea;
            font-size: 0.9rem;
        }

        .source-empfehlung {
            color: #333;
            font-weight: 500;
            margin-bottom: 8px;
        }

        .source-meta {
            color: #666;
            font-size: 0.85rem;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
        }

        .source-meta-item {
            display: flex;
            flex-direction: column;
        }

        .source-meta-label {
            color: #999;
            font-weight: 500;
            margin-bottom: 2px;
        }

        .source-meta-value {
            color: #333;
        }

        .source-similarity {
            background: #e8f0ff;
            color: #667eea;
            padding: 4px 10px;
            border-radius: 4px;
            font-weight: 600;
            display: inline-block;
            margin-top: 8px;
        }

        .error {
            background: #ffe8e8;
            border: 2px solid #ff6b6b;
            border-radius: 10px;
            padding: 20px;
            color: #cc0000;
            margin-top: 20px;
            display: none;
        }

        .error.show {
            display: block;
        }

        .no-results {
            text-align: center;
            padding: 40px;
            color: #999;
            font-size: 1rem;
        }

        footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            color: #666;
            font-size: 0.9rem;
            border-top: 1px solid #e9ecef;
        }

        @media (max-width: 768px) {
            header h1 {
                font-size: 1.6rem;
            }

            .search-input-wrapper {
                flex-direction: column;
            }

            .search-btn {
                width: 100%;
            }

            .source-meta {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <a href="index_organisation.php" class="back-link">← Zurück zu artbackstage | Organisation</a>
            <h1>🤖 KI-gestützte Prüfungsempfehlungs-Suche</h1>
            <p>Durchsuche 22.000 Auditing-Empfehlungen mit semantischer Suche und Claude AI</p>
            <div class="source">
                <p>Basierend auf Prüfberichten des Stadtrechnungshofes Wien und des Kontrollamts Wien</p>
            </div>
        </header>

        <div class="search-section">
            <div class="search-box">
                <label for="search-input">Stelle deine Frage zu Vereinsprüfungen und Governance</label>
                <div class="search-input-wrapper">
                    <input
                        type="text"
                        id="search-input"
                        placeholder="z.B. 'Wie dokumentieren wir Vorstandsbeschlüsse?' oder 'Was ist das Vieraugenprinzip?'"
                        autocomplete="off"
                    >
                    <button class="search-btn" id="search-button">Suchen</button>
                </div>
            </div>

            <div class="loading" id="loading">
                <div class="spinner"></div>
                Durchsuche Empfehlungen...
            </div>

            <div class="error" id="error"></div>

            <div class="results" id="results"></div>
        </div>

        <footer>
            <p>&copy; 2024 | Quelle: Prüfberichte des Stadtrechnungshofes Wien (StRH) und des Kontrollamts Wien (KA)</p>
        </footer>
    </div>

    <script>
        const searchInput = document.getElementById('search-input');
        const searchButton = document.getElementById('search-button');
        const loading = document.getElementById('loading');
        const error = document.getElementById('error');
        const resultsContainer = document.getElementById('results');

        const API_BASE_URL = 'https://artbackstage.onrender.com';

        function showError(message) {
            error.textContent = message;
            error.classList.add('show');
            resultsContainer.innerHTML = '';
        }

        function hideError() {
            error.classList.remove('show');
        }

        function showLoading() {
            loading.classList.add('show');
            resultsContainer.innerHTML = '';
            hideError();
        }

        function hideLoading() {
            loading.classList.remove('show');
        }

        async function performSearch() {
            const question = searchInput.value.trim();

            if (!question) {
                showError('Bitte geben Sie eine Frage ein.');
                return;
            }

            showLoading();
            searchButton.disabled = true;

            try {
                const response = await fetch(`${API_BASE_URL}/ask`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ question })
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.error || `Fehler bei der Suche (${response.status})`);
                }

                const data = await response.json();
                displayResults(data);
            } catch (err) {
                console.error('Search error:', err);
                showError('Fehler: ' + err.message);
            } finally {
                hideLoading();
                searchButton.disabled = false;
            }
        }

        function displayResults(data) {
            hideError();

            if (data.error) {
                showError(data.error);
                return;
            }

            let html = '<div class="answer-box">';
            html += '<h3>KI-Antwort</h3>';
            html += `<div class="answer-text">${escapeHtml(data.answer)}</div>`;

            if (data.sources && data.sources.length > 0) {
                html += '<div class="sources">';
                html += '<h4>Relevante Empfehlungen</h4>';

                data.sources.forEach((source, idx) => {
                    html += '<div class="source-item">';
                    html += `<div class="source-empfehlung">${idx + 1}. ${escapeHtml(source.empfehlung)}</div>`;
                    html += '<div class="source-meta">';
                    html += `<div class="source-meta-item"><span class="source-meta-label">Ordner:</span><span class="source-meta-value">${escapeHtml(source.unterordner)}</span></div>`;
                    html += `<div class="source-meta-item"><span class="source-meta-label">Adressiert an:</span><span class="source-meta-value">${escapeHtml(source.adressiert_an)}</span></div>`;
                    html += '</div>';
                    html += `<span class="source-similarity">Ähnlichkeit: ${(source.similarity * 100).toFixed(1)}%</span>`;
                    html += '</div>';
                });

                html += '</div>';
            } else if (!data.sources || data.sources.length === 0) {
                html += '<div class="no-results">Keine Empfehlungen gefunden.</div>';
            }

            html += '</div>';
            resultsContainer.innerHTML = html;
        }

        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        // Event listeners
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // Focus on input on page load
        searchInput.focus();
    </script>
</body>
</html>
