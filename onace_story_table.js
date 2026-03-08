(function () {
  'use strict';

  const lang = document.body?.dataset?.lang === 'en' ? 'en' : 'de';

  const copy = lang === 'en'
    ? {
      countPattern: (n, total) => `${n} of ${total} sectors visible`,
      loadError: 'Could not load sector data.',
      storyArt: (income, rank, total, womenPct, partPct) =>
        `In the Arts, Entertainment and Recreation sector (R), the median gross annual income is ${income}. This is rank ${rank} of ${total} — artistic work is socially vital but financially often at the bottom of the sector distribution. The share of women is ${womenPct}% and the part-time rate is ${partPct}%.`,
      storyPattern: (highIncome, highPart, lowIncome, lowPart) =>
        `A recurring pattern is visible: sectors with a higher share of women tend to have higher part-time rates and lower median annual incomes. In sectors with ≥55% women, the median income is around ${highIncome}, with a part-time rate of about ${highPart}%. In male-dominated sectors (<35% women), income is around ${lowIncome}, with a part-time rate of about ${lowPart}%.`,
    }
    : {
      countPattern: (n, total) => `${n} von ${total} Branchen sichtbar`,
      loadError: 'Die ÖNACE-Daten konnten nicht geladen werden.',
      storyArt: (income, rank, total, womenPct, partPct) =>
        `Im Feld Kunst, Unterhaltung und Erholung (R) liegt das mittlere Bruttojahreseinkommen bei ${income}. Das entspricht Rang ${rank} von ${total} und zeigt: künstlerische Arbeit ist gesellschaftlich zentral, aber finanziell oft am unteren Ende der Branchenverteilung. Gleichzeitig liegt der Frauenanteil bei ${womenPct}% und die Teilzeitquote bei ${partPct}%.`,
      storyPattern: (highIncome, highPart, lowIncome, lowPart) =>
        `Im aktuellen Ausschnitt zeigt sich ein wiederkehrendes Muster: Bereiche mit höherem Frauenanteil haben häufiger höhere Teilzeitquoten und geringere mittlere Jahreseinkommen. Bei Branchen mit ≥55% Frauen liegt das mittlere Einkommen bei rund ${highIncome}, die Teilzeitquote bei etwa ${highPart}%. In männerdominierten Bereichen (<35% Frauen) liegt das Einkommen bei rund ${lowIncome}, mit einer Teilzeitquote von etwa ${lowPart}%.`,
    };

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

  const eur = new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'de-AT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

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

    if (art && nodes.storyArt) {
      nodes.storyArt.textContent = copy.storyArt(eur.format(art.income_eur), incomeRank, allRows.length, art.women_pct, art.parttime_pct);
    }

    const highWomen = rows.filter((r) => r.women_pct >= 55);
    const lowWomen = rows.filter((r) => r.women_pct < 35);
    const avg = (arr, key) => arr.length ? Math.round(arr.reduce((sum, item) => sum + item[key], 0) / arr.length) : 0;

    if (nodes.storyPattern) {
      nodes.storyPattern.textContent = copy.storyPattern(
        eur.format(avg(highWomen, 'income_eur')), avg(highWomen, 'parttime_pct'),
        eur.format(avg(lowWomen, 'income_eur')), avg(lowWomen, 'parttime_pct')
      );
    }
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

      nodes.count.textContent = copy.countPattern(filtered.length, rows.length);
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
      nodes.count.textContent = copy.loadError;
    });
})();
