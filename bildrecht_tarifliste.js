(function () {
  'use strict';

  const nodes = {
    search: document.getElementById('tarifSearch'),
    category: document.getElementById('tarifCategory'),
    min: document.getElementById('tarifMin'),
    count: document.getElementById('tarifCount'),
    table: document.getElementById('tarifTableBody'),
  };

  if (!nodes.table) return;

  const MONEY = new Intl.NumberFormat('de-AT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 });

  function fillSelect(select, values) {
    select.innerHTML = ['<option value="">Alle</option>']
      .concat(values.map((v) => `<option value="${v}">${v}</option>`))
      .join('');
  }

  function parseAmount(raw) {
    const cleaned = String(raw || '').replace(/\./g, '').replace(',', '.');
    const match = cleaned.match(/\d+(?:\.\d+)?/);
    return match ? Number(match[0]) : 0;
  }

  function renderTable(rows) {
    nodes.table.innerHTML = rows.map((r) => `
      <tr>
        <td><strong>${r.kategorie}</strong></td>
        <td>${r.abschnitt || '—'}</td>
        <td>${r.eintrag}</td>
        <td>${r.betrag_num > 0 ? MONEY.format(r.betrag_num) : (r.betrag_eur || '—')}</td>
        <td>${r.einheit || '—'}</td>
        <td class="sources-cell"><a href="${r.quelle}" target="_blank" rel="noopener noreferrer">Link</a></td>
      </tr>
    `).join('');
  }

  function setup(data) {
    const rows = data.rows.map((r) => ({ ...r, betrag_num: parseAmount(r.betrag_eur) }));
    const categories = [...new Set(rows.map((r) => r.kategorie).filter(Boolean))].sort();
    fillSelect(nodes.category, categories);

    function apply() {
      const q = nodes.search.value.trim().toLowerCase();
      const category = nodes.category.value;
      const min = Number(nodes.min.value || 0);

      const filtered = rows.filter((r) => {
        const hay = `${r.kategorie} ${r.abschnitt} ${r.eintrag}`.toLowerCase();
        return (!q || hay.includes(q))
          && (!category || r.kategorie === category)
          && (r.betrag_num >= min || (min === 0 && r.betrag_num === 0));
      });

      nodes.count.textContent = `${filtered.length} Einträge` + (data.generated_at ? ` · aktualisiert: ${data.generated_at}` : '');
      renderTable(filtered);
    }

    [nodes.search, nodes.category, nodes.min].forEach((el) => {
      el.addEventListener('input', apply);
      el.addEventListener('change', apply);
    });

    apply();
  }

  fetch('bildrecht_tarif_data.php')
    .then((r) => r.json())
    .then(setup)
    .catch(() => {
      nodes.count.textContent = 'Tarifdaten konnten nicht geladen werden.';
    });
})();
