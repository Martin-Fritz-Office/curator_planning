(function () {
  'use strict';

  const nodes = {
    search: document.getElementById('onaceSearch'),
    women: document.getElementById('onaceWomenMin'),
    partTime: document.getElementById('onacePartTimeMin'),
    incomeMax: document.getElementById('onaceIncomeMax'),
    count: document.getElementById('onaceCount'),
    table: document.getElementById('onaceTableBody'),
    storyArt: document.getElementById('storyArtPosition'),
    storyPattern: document.getElementById('storyPattern'),
  };

  if (!nodes.table) return;

  const eur = new Intl.NumberFormat('de-AT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

  function renderTable(rows) {
    nodes.table.innerHTML = rows.map((r) => `
      <tr>
        <td><strong>${r.code}</strong></td>
        <td>${r.section}</td>
        <td>${eur.format(r.income_eur)}</td>
        <td>${r.women_pct} %</td>
        <td>${r.fulltime_pct} %</td>
        <td>${r.parttime_pct} %</td>
      </tr>
    `).join('');
  }

  function updateStory(rows, allRows) {
    const art = allRows.find((r) => r.code === 'R');
    const incomeRank = [...allRows].sort((a, b) => b.income_eur - a.income_eur).findIndex((r) => r.code === 'R') + 1;

    if (art) {
      nodes.storyArt.textContent = `Im Feld Kunst, Unterhaltung und Erholung (R) liegt das mittlere Bruttojahreseinkommen bei ${eur.format(art.income_eur)}. Das entspricht Rang ${incomeRank} von ${allRows.length} und zeigt: künstlerische Arbeit ist gesellschaftlich zentral, aber finanziell oft am unteren Ende der Branchenverteilung. Gleichzeitig liegt der Frauenanteil bei ${art.women_pct}% und die Teilzeitquote bei ${art.parttime_pct}%.`;
    }

    const highWomen = rows.filter((r) => r.women_pct >= 55);
    const lowWomen = rows.filter((r) => r.women_pct < 35);
    const avg = (arr, key) => arr.length ? Math.round(arr.reduce((sum, item) => sum + item[key], 0) / arr.length) : 0;

    const text = `Im aktuellen Ausschnitt zeigt sich ein wiederkehrendes Muster: Bereiche mit höherem Frauenanteil haben häufiger höhere Teilzeitquoten und geringere mittlere Jahreseinkommen. Bei Branchen mit ≥55% Frauen liegt das mittlere Einkommen bei rund ${eur.format(avg(highWomen, 'income_eur'))}, die Teilzeitquote bei etwa ${avg(highWomen, 'parttime_pct')}%. In männerdominierten Bereichen (<35% Frauen) liegt das Einkommen bei rund ${eur.format(avg(lowWomen, 'income_eur'))}, mit einer Teilzeitquote von etwa ${avg(lowWomen, 'parttime_pct')}%.`;
    nodes.storyPattern.textContent = text;
  }

  function setup(data) {
    const rows = data.rows.map((r) => ({ ...r, parttime_pct: Math.max(0, 100 - Number(r.fulltime_pct || 0)) }));

    function apply() {
      const query = nodes.search.value.trim().toLowerCase();
      const womenMin = Number(nodes.women.value || 0);
      const partMin = Number(nodes.partTime.value || 0);
      const incomeMax = Number(nodes.incomeMax.value || 999999);

      const filtered = rows.filter((r) => {
        const hay = `${r.code} ${r.section}`.toLowerCase();
        return (!query || hay.includes(query))
          && r.women_pct >= womenMin
          && r.parttime_pct >= partMin
          && r.income_eur <= incomeMax;
      });

      nodes.count.textContent = `${filtered.length} von ${rows.length} Branchen sichtbar`;
      renderTable(filtered);
      updateStory(filtered, rows);
    }

    [nodes.search, nodes.women, nodes.partTime, nodes.incomeMax].forEach((el) => {
      el.addEventListener('input', apply);
      el.addEventListener('change', apply);
    });

    apply();
  }

  fetch('data/onace_income_gender_fulltime_2023.json')
    .then((r) => r.json())
    .then(setup)
    .catch(() => {
      nodes.count.textContent = 'Die ÖNACE-Daten konnten nicht geladen werden.';
    });
})();
