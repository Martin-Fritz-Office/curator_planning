<?php
$page_title = "100 Tipps für Vereinsorganisation";
$page_description = "100 Empfehlungen für Vereinsvorstände - Zusammengestellt aus Prüfberichten des Stadtrechnungshofes Wien und des Kontrollamts Wien";
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
            max-width: 1200px;
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

        header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            font-weight: 700;
        }

        header p {
            font-size: 1.1rem;
            opacity: 0.95;
            font-weight: 300;
        }

        .source {
            margin-top: 15px;
            font-size: 0.9rem;
            opacity: 0.85;
            font-style: italic;
        }

        .controls-section {
            padding: 30px 20px;
            background: #f8f9fa;
            border-bottom: 1px solid #e9ecef;
        }

        .controls-wrapper {
            max-width: 1200px;
            margin: 0 auto;
        }

        .search-box {
            margin-bottom: 25px;
        }

        .search-box label {
            display: block;
            font-weight: 600;
            margin-bottom: 8px;
            color: #333;
        }

        .search-box input {
            width: 100%;
            padding: 12px 16px;
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

        .filter-section h3 {
            font-size: 0.95rem;
            font-weight: 600;
            color: #333;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .filter-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 15px;
        }

        .filter-btn {
            padding: 8px 16px;
            border: 2px solid #ddd;
            background: white;
            border-radius: 25px;
            cursor: pointer;
            font-size: 0.9rem;
            font-weight: 500;
            color: #555;
            transition: all 0.3s ease;
            white-space: nowrap;
        }

        .filter-btn:hover {
            border-color: #667eea;
            color: #667eea;
            background: #f0f3ff;
        }

        .filter-btn.active {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-color: transparent;
            color: white;
        }

        .reset-btn {
            padding: 10px 20px;
            background: #e9ecef;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            color: #555;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        }

        .reset-btn:hover {
            background: #dee2e6;
            color: #333;
        }

        .results-header {
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
            border-bottom: 1px solid #e9ecef;
            color: #666;
            font-weight: 500;
        }

        .results-header span {
            color: #667eea;
            font-weight: 700;
        }

        .content-section {
            padding: 30px 20px;
            max-width: 1200px;
            margin: 0 auto;
        }

        #tipps-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 20px;
            animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .tipp-card {
            background: white;
            border: 1px solid #e9ecef;
            border-radius: 10px;
            padding: 20px;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .tipp-card:hover {
            border-color: #667eea;
            box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
            transform: translateY(-4px);
        }

        .tipp-number {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 700;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .tipp-title {
            font-size: 1.25rem;
            font-weight: 700;
            color: #333;
            margin-bottom: 12px;
            line-height: 1.4;
        }

        .tipp-description {
            font-size: 0.95rem;
            color: #555;
            margin-bottom: 16px;
            line-height: 1.6;
        }

        .tipp-categories {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .category-badge {
            display: inline-block;
            background: #f0f3ff;
            color: #667eea;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.3px;
        }

        .no-results {
            text-align: center;
            padding: 60px 20px;
            color: #999;
            font-size: 1.1rem;
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
                font-size: 1.8rem;
            }

            #tipps-container {
                grid-template-columns: 1fr;
            }

            .filter-buttons {
                gap: 8px;
            }

            .filter-btn {
                padding: 6px 12px;
                font-size: 0.85rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1><?php echo htmlspecialchars($page_title); ?></h1>
            <p>Empfehlungen für Vereinsvorstände</p>
            <div class="source">
                <p>Zusammengestellt aus Prüfberichten des Stadtrechnungshofes Wien und des Kontrollamts Wien</p>
            </div>
        </header>

        <div class="controls-section">
            <div class="controls-wrapper">
                <div class="search-box">
                    <label for="search-tipps">🔍 Tipps durchsuchen</label>
                    <input type="text" id="search-tipps" placeholder="Suchbegriff eingeben (z.B. 'Statut', 'Dokumentation')...">
                </div>

                <div class="filter-section">
                    <h3>Nach Kategorie filtern</h3>
                    <div class="filter-buttons">
                        <button class="filter-btn" data-category-filter="Governance & Statuten">Governance & Statuten</button>
                        <button class="filter-btn" data-category-filter="Generalversammlung & Protokolle">Generalversammlung & Protokolle</button>
                        <button class="filter-btn" data-category-filter="Vorstand & Vertretung">Vorstand & Vertretung</button>
                        <button class="filter-btn" data-category-filter="Internes Kontrollsystem">Internes Kontrollsystem</button>
                        <button class="filter-btn" data-category-filter="In-sich-Geschäfte">In-sich-Geschäfte</button>
                        <button class="filter-btn" data-category-filter="Rechnungsprüfung">Rechnungsprüfung</button>
                        <button class="filter-btn" data-category-filter="Buchführung & Jahresabschluss">Buchführung & Jahresabschluss</button>
                        <button class="filter-btn" data-category-filter="Kassaführung">Kassaführung</button>
                        <button class="filter-btn" data-category-filter="Honorarnoten & Belege">Honorarnoten & Belege</button>
                        <button class="filter-btn" data-category-filter="Beschaffung & Vergabe">Beschaffung & Vergabe</button>
                        <button class="filter-btn" data-category-filter="Förderungsabwicklung">Förderungsabwicklung</button>
                        <button class="filter-btn" data-category-filter="Mitgliedschaft & Beiträge">Mitgliedschaft & Beiträge</button>
                        <button class="filter-btn" data-category-filter="Personalangelegenheiten">Personalangelegenheiten</button>
                        <button class="filter-btn" data-category-filter="Vermögen & Veranlagung">Vermögen & Veranlagung</button>
                        <button class="filter-btn" data-category-filter="Kooperationen">Kooperationen</button>
                        <button class="filter-btn" data-category-filter="Vertragsmanagement">Vertragsmanagement</button>
                        <button class="filter-btn" data-category-filter="Inventar & Anlagevermögen">Inventar & Anlagevermögen</button>
                        <button class="filter-btn" data-category-filter="Transparenz & Öffentlichkeit">Transparenz & Öffentlichkeit</button>
                    </div>
                    <button class="reset-btn" id="reset-filters">🔄 Filter zurücksetzen</button>
                </div>
            </div>
        </div>

        <div class="results-header">
            <span id="results-count">100 Tipps gefunden</span>
        </div>

        <div class="content-section">
            <div id="tipps-container"></div>
        </div>

        <footer>
            <p>&copy; 2024 | Quelle: Prüfberichte des Stadtrechnungshofes Wien (StRH) und des Kontrollamts Wien (KA)</p>
        </footer>
    </div>

    <script src="vereinstipps.js"></script>
</body>
</html>
