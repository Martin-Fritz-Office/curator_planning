(function(){
  const services = [
    { id:'s1', group:1, name:'Tätigkeiten ohne besondere Vorkenntnisse', details:'Flyer/Folder verteilen, Veranstaltungsbetreuung (Buffet, Garderobe, Empfang)', minRate:26, maxRate:40 },
    { id:'s2', group:4, name:'(Technische) Vorbereitung und Betreuung von Veranstaltungen', details:'Einfache Auf- und Abbauarbeiten, Ausstellungsaufsicht, einfache technische Betreuung', minRate:34, maxRate:64 },
    { id:'s3', group:5, name:'Durchführung von Recherchen, Dokumentation', details:'Materialrecherche, Raumsuche, Eigentumsverhältnisse, Social Media, Artist Talk Vorbereitung', minRate:37, maxRate:71 },
    { id:'s4', group:6, name:'Ausstellungsaufbau, Ausstellungsdisplay', details:'Aufbau komplexer Arbeiten, Art Handling, Produktion Ausstellungsarchitektur/-display', minRate:42, maxRate:81 },
    { id:'s5', group:6, name:'Komplexe Tätigkeiten, Projektumsetzung', details:'Ausstellungsproduktion, (Re-)Produktion, Jurytätigkeit, rechtliche Abwicklung, Konzepte', minRate:42, maxRate:81 },
    { id:'s6', group:6, name:'Öffentlichkeitsarbeit, Community Outreach', details:'PR-/Bildpolitik-Konzepte, Veranstaltungsplanung, Social Media Management', minRate:42, maxRate:81 },
    { id:'s7', group:7, name:'Künstlerische Konzeptarbeit, Programmierung Kunst- und Kulturprogramm', details:'Konzeption und Ausführung neuer Arbeiten, Kuratieren, Programmierung von Projekten', minRate:51, maxRate:97 },
    { id:'s8', group:8, name:'(Künstlerische) Projektleitung und Finanzmanagement', details:'Künstlerische Leitung inkl. Finanzverantwortung, Projektsteuerung inkl. Auftragsvergaben', minRate:59, maxRate:107 }
  ];

  const categorySelect = document.getElementById('serviceCategory');
  const serviceList = document.getElementById('serviceList');
  const resultBody = document.querySelector('#resultTable tbody');
  const grandTotalCell = document.getElementById('grandTotal');
  const downloadBtn = document.getElementById('downloadCsvBtn');

  const state = Object.fromEntries(services.map((service) => [service.id, {
    selected: false,
    persons: 0,
    hoursPerPerson: 0,
    rate: getDefaultRate(service)
  }]));

  function euro(value){
    return Number(value || 0).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function getDefaultRate(service){
    return Math.round((service.minRate + service.maxRate) / 2);
  }

  function buildCategoryOptions(){
    const uniqueGroups = [...new Set(services.map((service) => service.group))].sort((a, b) => a - b);
    const options = ['<option value="all">Alle Gruppen</option>']
      .concat(uniqueGroups.map((group) => `<option value="${group}">Gruppe ${group}</option>`));
    categorySelect.innerHTML = options.join('');
  }

  function renderServiceList(){
    const selectedGroup = categorySelect.value;
    const visibleServices = services.filter((service) => selectedGroup === 'all' || String(service.group) === selectedGroup);

    serviceList.innerHTML = visibleServices.map((service) => {
      const serviceState = state[service.id];
      const checked = serviceState.selected ? 'checked' : '';
      const disabled = serviceState.selected ? '' : 'disabled';
      return `
        <div class="q-section">
          <label class="q">
            <span>
              <input type="checkbox" data-id="${service.id}" class="service-toggle" ${checked} />
              <strong>${service.name}</strong> (Gruppe ${service.group}, Richtwert: ${service.minRate}–${service.maxRate} €/h)
            </span>
            <span class="hint">${service.details}</span>
          </label>
          <div class="qgrid">
            <label class="q">
              <span>Personen</span>
              <input type="number" min="0" step="1" data-persons-id="${service.id}" value="${serviceState.persons}" ${disabled} />
            </label>
            <label class="q">
              <span>Stunden pro Person</span>
              <input type="number" min="0" step="0.5" data-hours-per-person-id="${service.id}" value="${serviceState.hoursPerPerson}" ${disabled} />
            </label>
            <label class="q">
              <span>Stundensatz (€)</span>
              <input type="number" min="${service.minRate}" max="${service.maxRate}" step="1" data-rate-id="${service.id}" value="${serviceState.rate}" ${disabled} />
            </label>
          </div>
        </div>`;
    }).join('');
  }

  function renderResult(){
    const selectedRows = services
      .filter((service) => state[service.id].selected)
      .map((service) => {
        const entry = state[service.id];
        const hours = entry.persons * entry.hoursPerPerson;
        const total = hours * entry.rate;
        return { service, persons: entry.persons, hoursPerPerson: entry.hoursPerPerson, hours, rate: entry.rate, total };
      });

    resultBody.innerHTML = selectedRows.length
      ? selectedRows.map((row) => `
        <tr>
          <td>${row.service.name}</td>
          <td>${row.service.group}</td>
          <td>${euro(row.persons)}</td>
          <td>${euro(row.hoursPerPerson)}</td>
          <td>${euro(row.hours)}</td>
          <td>${euro(row.rate)}</td>
          <td>${euro(row.total)}</td>
        </tr>
      `).join('')
      : '<tr><td colspan="7" class="muted">Noch keine Services ausgewählt.</td></tr>';

    const grandTotal = selectedRows.reduce((sum, row) => sum + row.total, 0);
    grandTotalCell.textContent = euro(grandTotal);
  }

  function parseInputNumber(value){
    const numeric = Number(value);
    return Number.isFinite(numeric) && numeric >= 0 ? numeric : 0;
  }

  function handleListChange(event){
    const toggle = event.target.closest('.service-toggle');
    if (toggle) {
      const serviceId = toggle.getAttribute('data-id');
      state[serviceId].selected = toggle.checked;
      if (!toggle.checked) {
        state[serviceId].persons = 0;
        state[serviceId].hoursPerPerson = 0;
      }
      renderServiceList();
      renderResult();
      return;
    }

    const personsId = event.target.getAttribute('data-persons-id');
    if (personsId) {
      state[personsId].persons = parseInputNumber(event.target.value);
      renderResult();
      return;
    }

    const hoursPerPersonId = event.target.getAttribute('data-hours-per-person-id');
    if (hoursPerPersonId) {
      state[hoursPerPersonId].hoursPerPerson = parseInputNumber(event.target.value);
      renderResult();
      return;
    }

    const rateId = event.target.getAttribute('data-rate-id');
    if (rateId) {
      const service = services.find((item) => item.id === rateId);
      const value = parseInputNumber(event.target.value);
      state[rateId].rate = Math.min(service.maxRate, Math.max(service.minRate, value));
      event.target.value = state[rateId].rate;
      renderResult();
    }
  }

  function buildCsv(){
    const header = ['Leistung', 'Gruppe', 'Personen', 'Stunden_pro_Person', 'Stunden_gesamt', 'Stundensatz_EUR', 'Gesamt_EUR'];
    const rows = services
      .filter((service) => state[service.id].selected)
      .map((service) => {
        const entry = state[service.id];
        const hours = entry.persons * entry.hoursPerPerson;
        const total = hours * entry.rate;
        return [
          service.name,
          service.group,
          entry.persons.toFixed(2),
          entry.hoursPerPerson.toFixed(2),
          hours.toFixed(2),
          entry.rate.toFixed(2),
          total.toFixed(2)
        ];
      });

    const sum = rows.reduce((acc, row) => acc + Number(row[6]), 0);
    rows.push(['SUMME', '', '', '', '', '', sum.toFixed(2)]);

    return [header].concat(rows)
      .map((cols) => cols.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(';'))
      .join('\n');
  }

  function downloadCsv(){
    const csv = buildCsv();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'freelance_services_kalkulation.csv';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  categorySelect.addEventListener('change', renderServiceList);
  serviceList.addEventListener('input', handleListChange);
  serviceList.addEventListener('change', handleListChange);
  downloadBtn.addEventListener('click', downloadCsv);

  buildCategoryOptions();
  categorySelect.value = 'all';
  renderServiceList();
  renderResult();
})();
