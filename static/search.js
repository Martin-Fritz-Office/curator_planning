const question = document.getElementById('question');
const searchBtn = document.getElementById('searchBtn');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const result = document.getElementById('result');
const summaryEl = document.getElementById('summary');
const zentraleAussageEl = document.getElementById('zentraleAussage');
const sourcesEl = document.getElementById('sources');
const themesSection = document.getElementById('themesSection');
const themesContainer = document.getElementById('themesContainer');
const themesLoading = document.getElementById('themesLoading');
const themesHeading = document.getElementById('themesHeading');

function getExpertiseLevel() {
    const selected = document.querySelector('input[name="expertise"]:checked');
    return selected ? selected.value : 'beginner';
}

function getSearchSource() {
    const selected = document.querySelector('input[name="search-source"]:checked');
    return selected ? selected.value : 'strh';
}

function getModel() {
    const selected = document.querySelector('input[name="model"]:checked');
    return selected ? selected.value : 'haiku';
}

function showError(msg) {
    error.textContent = msg;
    error.classList.add('show');
    result.classList.remove('show');
    setTimeout(() => error.classList.remove('show'), 5000);
}

function hideError() {
    error.classList.remove('show');
}

async function search() {
    const q = question.value.trim();
    if (!q) {
        showError('Bitte geben Sie eine Frage ein');
        return;
    }

    hideError();
    loading.classList.add('show');
    result.classList.remove('show');
    summaryEl.textContent = '';
    zentraleAussageEl.textContent = '';
    sourcesEl.innerHTML = '';
    searchBtn.disabled = true;

    try {
        const response = await fetch('/ask', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                question: q,
                expertise_level: getExpertiseLevel(),
                search_source: getSearchSource(),
                model: getModel()
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Fehler bei der Suche');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let sseBuffer = '';
        let resultShown = false;

        while (true) {
            const {done, value} = await reader.read();
            if (done) break;

            sseBuffer += decoder.decode(value, {stream: true});
            const lines = sseBuffer.split('\n');
            sseBuffer = lines.pop();

            for (const line of lines) {
                if (!line.startsWith('data: ')) continue;
                const event = JSON.parse(line.slice(6));

                if (event.type === 'sources') {
                    displaySources(event.sources);
                    if (!resultShown) {
                        loading.classList.remove('show');
                        result.classList.add('show');
                        resultShown = true;
                    }
                } else if (event.type === 'zentrale_aussage') {
                    zentraleAussageEl.textContent = event.text;
                    if (!resultShown) {
                        loading.classList.remove('show');
                        result.classList.add('show');
                        resultShown = true;
                    }
                } else if (event.type === 'text') {
                    summaryEl.textContent += event.text;
                } else if (event.type === 'error') {
                    throw new Error(event.error);
                } else if (event.type === 'done') {
                    themesLoading.classList.add('show');
                    loadThemes(q);
                }
            }
        }
    } catch (err) {
        showError('Fehler: ' + err.message);
    } finally {
        loading.classList.remove('show');
        searchBtn.disabled = false;
    }
}

function displaySources(sources) {
    sourcesEl.innerHTML = '';
    if (sources && sources.length > 0) {
        sources.forEach((source, index) => {
            const card = document.createElement('div');
            card.className = 'source-card';
            const searchLinkHtml = source.search_link
                ? `<a href="${source.search_link}" target="_blank" rel="noopener noreferrer" class="search-link">🔍 Google-Suche: ${source.quelldatei}</a>`
                : (source.quelldatei ? `<span class="source-filename">📄 ${source.quelldatei}</span>` : '');

            card.innerHTML = `
                <div class="source-title">${index + 1}. ${source.empfehlung}</div>
                <div class="source-meta">
                    <div class="source-meta-item">
                        <span class="source-meta-label">Quelldatei</span>
                        <span class="source-meta-value">${source.quelldatei || 'N/A'}</span>
                    </div>
                    <div class="source-meta-item">
                        <span class="source-meta-label">Adressiert an</span>
                        <span class="source-meta-value">${source.adressiert_an}</span>
                    </div>
                </div>
                ${searchLinkHtml}
                <span class="similarity-badge">Ähnlichkeit: ${(source.similarity * 100).toFixed(1)}%</span>
            `;
            sourcesEl.appendChild(card);
        });
    }
}

function displayResults(data) {
    summaryEl.textContent = data.summary || '';
    zentraleAussageEl.textContent = data.zentrale_aussage || '';
    displaySources(data.sources);
    result.classList.add('show');
}

async function loadThemes(query = '') {
    try {
        const source = getSearchSource();
        const url = query
            ? `/themes?source=${source}&query=${encodeURIComponent(query)}`
            : `/themes?source=${source}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Fehler beim Laden der Themen');
        }

        const data = await response.json();
        themesSection.classList.add('show');
        if (data.related && data.query) {
            themesHeading.textContent = `🔗 Verwandte Themen: „${data.query}"`;
        } else {
            themesHeading.textContent = '🎯 Empfohlene Themen';
        }
        displayThemes(data.themes);
    } catch (err) {
        console.error('Error loading themes:', err);
        themesSection.classList.remove('show');
    } finally {
        themesLoading.classList.remove('show');
    }
}

function displayThemes(themes) {
    themesContainer.innerHTML = '';

    themes.slice(0, 12).forEach((theme) => {
        const card = document.createElement('div');
        card.className = 'theme-card';
        card.innerHTML = `
            <div class="theme-card-header">
                <h3>${theme.theme}</h3>
                <span class="theme-frequency">${theme.frequency}</span>
            </div>
            <p class="theme-description">${theme.description}</p>
            <button class="theme-expand-btn" data-theme-id="${theme.id}">
                Fragen & Checkliste anzeigen
            </button>
            <div class="theme-questions-container hidden" id="questions-${theme.id}">
                <div class="theme-loading">
                    <div class="spinner"></div>
                </div>
            </div>
        `;

        card.querySelector('.theme-expand-btn').addEventListener('click', async (e) => {
            e.preventDefault();
            const container = document.getElementById(`questions-${theme.id}`);
            const btn = e.target;

            if (container.classList.contains('hidden')) {
                container.classList.remove('hidden');
                if (!container.dataset.loaded) {
                    await loadThemeQuestions(theme, container);
                }
                btn.textContent = 'Verbergen';
            } else {
                container.classList.add('hidden');
                btn.textContent = 'Fragen & Checkliste anzeigen';
            }
        });

        themesContainer.appendChild(card);
    });
}

async function loadThemeQuestions(theme, container) {
    try {
        const response = await fetch('/theme-questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                theme_name: theme.theme,
                theme_description: theme.description,
                expertise_level: getExpertiseLevel()
            })
        });

        if (!response.ok) {
            throw new Error('Fehler beim Laden der Fragen');
        }

        const data = await response.json();
        displayThemeContent(container, data.content);
        container.dataset.loaded = 'true';
    } catch (err) {
        console.error('Error loading theme questions:', err);
        container.innerHTML = '<p class="theme-error">Fehler beim Laden der Fragen</p>';
    }
}

function displayThemeContent(container, content) {
    const questionsHtml = content.questions.map((q, idx) =>
        `<li class="theme-question" data-question-index="${idx}">
            ${q}
        </li>`
    ).join('');

    const checklistHtml = content.checklist.map(item =>
        `<li class="theme-checklist-item">
            <input type="checkbox" id="check-${Math.random()}">
            <label>${item}</label>
        </li>`
    ).join('');

    container.innerHTML = `
        <div class="theme-content">
            <div class="theme-questions">
                <h4>💭 Häufig gestellte Fragen</h4>
                <ul>${questionsHtml}</ul>
            </div>
            <div class="theme-checklist">
                <h4>✓ Checkliste</h4>
                <ul>${checklistHtml}</ul>
            </div>
        </div>
    `;

    // Add event listeners to questions
    container.querySelectorAll('.theme-question').forEach((li, idx) => {
        li.addEventListener('click', () => {
            searchQuestion(content.questions[idx]);
        });
    });
}

function searchQuestion(q) {
    question.value = q;
    question.focus();
    search();
}

// Allow Enter key to search
question.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        search();
    }
});

// Load themes on page load
document.addEventListener('DOMContentLoaded', () => {
    question.focus();
    loadThemes();
});

// Reload themes when search source changes
document.querySelectorAll('input[name="search-source"]').forEach(radio => {
    radio.addEventListener('change', () => {
        themesLoading.classList.add('show');
        loadThemes();
    });
});
