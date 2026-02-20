(function () {
  'use strict';

  const nodes = {
    search: document.getElementById('salarySearch'),
    category: document.getElementById('salaryCategory'),
    contract: document.getElementById('salaryContract'),
    min: document.getElementById('salaryMin'),
    count: document.getElementById('salaryCount'),
    table: document.getElementById('salaryTableBody'),
    pyramid: document.getElementById('salaryPyramid'),
  };

  if (!nodes.table) return;

  const EUR = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(Number(n) || 0);

  function parseCSV(text) {
    const rows = [];
    let row = [];
    let cell = '';
    let inQuotes = false;

    for (let i = 0; i < text.length; i += 1) {
      const ch = text[i];
      const next = text[i + 1];

      if (ch === '"') {
        if (inQuotes && next === '"') {
          cell += '"';
          i += 1;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === ',' && !inQuotes) {
        row.push(cell);
        cell = '';
      } else if ((ch === '\n' || ch === '\r') && !inQuotes) {
        if (ch === '\r' && next === '\n') i += 1;
        row.push(cell);
        if (row.some((value) => value.trim() !== '')) rows.push(row);
        row = [];
        cell = '';
      } else {
        cell += ch;
      }
    }

    if (cell.length || row.length) {
      row.push(cell);
      rows.push(row);
    }

    const header = rows[0] || [];
    return rows.slice(1).map((r) => {
      const out = {};
      header.forEach((h, idx) => {
        out[h] = (r[idx] || '').trim();
      });
      return out;
    });
  }

  function maxFromRange(range) {
    const parts = String(range || '').split('-').map((x) => Number(x.trim())).filter(Boolean);
    return parts.length ? Math.max(...parts) : 0;
  }

  function parseSources(links) {
    return String(links || '')
      .split('|')
      .map((x) => x.trim())
      .filter(Boolean);
  }

  function fillSelect(select, values) {
    select.innerHTML = ['<option value="">All</option>']
      .concat(values.map((v) => `<option value="${v}">${v}</option>`))
      .join('');
  }

  function renderTable(rows) {
    nodes.table.innerHTML = rows.map((r) => {
      const links = parseSources(r.recommended_source_links)
        .map((url, idx) => `<a href="${url}" target="_blank" rel="noopener noreferrer">Source ${idx + 1}</a>`)
        .join(' · ');
      return `
        <tr>
          <td><strong>${r.job_title}</strong></td>
          <td>${r.category}</td>
          <td>${r.typical_contract}</td>
          <td>${r.gross_salary_eur_per_year_range}</td>
          <td>${r.freelance_day_rate_eur_range}</td>
          <td>${r.project_fee_eur_range}</td>
          <td class="sources-cell">${links}</td>
        </tr>
      `;
    }).join('');
  }

  function renderPyramid(rows) {
    const sorted = [...rows]
      .sort((a, b) => maxFromRange(b.gross_salary_eur_per_year_range) - maxFromRange(a.gross_salary_eur_per_year_range));
    const top = sorted.slice(0, 12);
    const maxSalary = maxFromRange(top[0]?.gross_salary_eur_per_year_range || 0) || 1;

    nodes.pyramid.innerHTML = top.map((r, idx) => {
      const salaryMax = maxFromRange(r.gross_salary_eur_per_year_range);
      const width = Math.max(24, Math.round((salaryMax / maxSalary) * 100));
      return `
        <div class="pyramid-row" style="width:${width}%">
          <span class="pyramid-rank">${idx + 1}</span>
          <span class="pyramid-title">${r.job_title}</span>
          <span class="pyramid-salary">${EUR(salaryMax)}</span>
        </div>
      `;
    }).join('');
  }

  function setup(data) {
    const categories = [...new Set(data.map((r) => r.category))].sort();
    const contracts = [...new Set(data.map((r) => r.typical_contract))].sort();
    fillSelect(nodes.category, categories);
    fillSelect(nodes.contract, contracts);

    function apply() {
      const q = nodes.search.value.trim().toLowerCase();
      const category = nodes.category.value;
      const contract = nodes.contract.value;
      const min = Number(nodes.min.value || 0);

      const filtered = data.filter((r) => {
        const haystack = `${r.job_title} ${r.category} ${r.recommended_sources}`.toLowerCase();
        return (!q || haystack.includes(q))
          && (!category || r.category === category)
          && (!contract || r.typical_contract === contract)
          && (maxFromRange(r.gross_salary_eur_per_year_range) >= min);
      });

      nodes.count.textContent = `${filtered.length} matching roles`;
      renderTable(filtered);
      renderPyramid(filtered.length ? filtered : data);
    }

    [nodes.search, nodes.category, nodes.contract, nodes.min].forEach((el) => {
      el.addEventListener('input', apply);
      el.addEventListener('change', apply);
    });

    apply();
  }

  fetch('data/art_museum_salary_fee_search_list.csv')
    .then((r) => r.text())
    .then(parseCSV)
    .then(setup)
    .catch(() => {
      nodes.count.textContent = 'Could not load salary dataset.';
    });
})();
