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
  const copyShareLinkBtn = document.getElementById('copyShareLinkBtn');
  const downloadProposalPdfBtn = document.getElementById('downloadProposalPdfBtn');
  const proposalStatus = document.getElementById('proposalStatus');
  const paymentPlanList = document.getElementById('paymentPlanList');
  const addPaymentPlanRowBtn = document.getElementById('addPaymentPlanRowBtn');

  const proposalFields = {
    projectName: document.getElementById('proposalProjectName'),
    clientName: document.getElementById('proposalClientName'),
    startDate: document.getElementById('proposalStartDate'),
    endDate: document.getElementById('proposalEndDate'),
    timeline: document.getElementById('proposalTimeline'),
    deliverables: document.getElementById('proposalDeliverables'),
    assumptions: document.getElementById('proposalAssumptions')
  };

  const state = Object.fromEntries(services.map((service) => [service.id, {
    selected: false,
    persons: 0,
    hoursPerPerson: 0,
    rate: getDefaultRate(service)
  }]));

  const paymentPlanRows = [];

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

  function collectSelectedRows(){
    return services
      .filter((service) => state[service.id].selected)
      .map((service) => {
        const entry = state[service.id];
        const hours = entry.persons * entry.hoursPerPerson;
        const total = hours * entry.rate;
        return { service, persons: entry.persons, hoursPerPerson: entry.hoursPerPerson, hours, rate: entry.rate, total };
      });
  }

  function renderResult(){
    const selectedRows = collectSelectedRows();

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
      const isCommitEvent = event.type === 'change';
      state[rateId].rate = isCommitEvent
        ? Math.min(service.maxRate, Math.max(service.minRate, value))
        : value;
      if (isCommitEvent) {
        event.target.value = state[rateId].rate;
      }
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

  function collectProposalMeta(){
    return Object.fromEntries(Object.entries(proposalFields).map(([key, input]) => [key, input.value.trim()]));
  }

  function normalizePaymentEntry(entry){
    const data = entry || {};
    return {
      date: typeof data.date === 'string' ? data.date : '',
      milestone: typeof data.milestone === 'string' ? data.milestone : '',
      percentage: parseInputNumber(data.percentage)
    };
  }

  function hasPaymentEntryContent(entry){
    return Boolean(entry.date || entry.milestone || entry.percentage > 0);
  }

  function renderPaymentPlanRows(){
    if (!paymentPlanList) return;

    paymentPlanList.innerHTML = paymentPlanRows.map((entry, index) => `
      <div class="q-section">
        <div class="qgrid">
          <label class="q">
            <span>Datum</span>
            <input type="date" data-payment-date-index="${index}" value="${esc(entry.date)}" />
          </label>
          <label class="q">
            <span>Meilenstein</span>
            <input type="text" data-payment-milestone-index="${index}" value="${esc(entry.milestone)}" placeholder="z. B. Freigabe Konzept" />
          </label>
          <label class="q">
            <span>Anteil (%)</span>
            <input type="number" min="0" max="100" step="0.1" data-payment-percentage-index="${index}" value="${entry.percentage}" />
          </label>
        </div>
        <div class="footer">
          <button class="btn btn-outline" type="button" data-remove-payment-index="${index}">Entfernen</button>
        </div>
      </div>
    `).join('');
  }

  function addPaymentPlanRow(entry){
    paymentPlanRows.push(normalizePaymentEntry(entry));
    renderPaymentPlanRows();
  }

  function collectPaymentPlanEntries(){
    return paymentPlanRows
      .map((entry) => normalizePaymentEntry(entry))
      .filter((entry) => hasPaymentEntryContent(entry));
  }

  function setPaymentPlanRows(entries){
    paymentPlanRows.splice(0, paymentPlanRows.length);
    const normalized = Array.isArray(entries) ? entries.map((entry) => normalizePaymentEntry(entry)) : [];
    if (normalized.length) {
      normalized.forEach((entry) => paymentPlanRows.push(entry));
    } else {
      paymentPlanRows.push(normalizePaymentEntry({}));
    }
    renderPaymentPlanRows();
  }

  function handlePaymentPlanChange(event){
    const removeButton = event.target.closest('[data-remove-payment-index]');
    if (removeButton) {
      const removeIndex = Number(removeButton.getAttribute('data-remove-payment-index'));
      if (Number.isFinite(removeIndex) && paymentPlanRows.length > 1) {
        paymentPlanRows.splice(removeIndex, 1);
      } else if (Number.isFinite(removeIndex) && paymentPlanRows.length === 1) {
        paymentPlanRows[0] = normalizePaymentEntry({});
      }
      renderPaymentPlanRows();
      setStatus('Proposal aktualisiert. Du kannst jetzt Link oder PDF exportieren.');
      return;
    }

    const dateIndex = event.target.getAttribute('data-payment-date-index');
    if (dateIndex !== null) {
      paymentPlanRows[Number(dateIndex)].date = event.target.value;
      setStatus('Proposal aktualisiert. Du kannst jetzt Link oder PDF exportieren.');
      return;
    }

    const milestoneIndex = event.target.getAttribute('data-payment-milestone-index');
    if (milestoneIndex !== null) {
      paymentPlanRows[Number(milestoneIndex)].milestone = event.target.value;
      setStatus('Proposal aktualisiert. Du kannst jetzt Link oder PDF exportieren.');
      return;
    }

    const percentageIndex = event.target.getAttribute('data-payment-percentage-index');
    if (percentageIndex !== null) {
      const value = parseInputNumber(event.target.value);
      paymentPlanRows[Number(percentageIndex)].percentage = Math.min(100, value);
      if (event.type === 'change') {
        event.target.value = paymentPlanRows[Number(percentageIndex)].percentage;
      }
      setStatus('Proposal aktualisiert. Du kannst jetzt Link oder PDF exportieren.');
    }
  }

  function getProposalPayload(){
    return {
      meta: collectProposalMeta(),
      paymentPlan: collectPaymentPlanEntries(),
      items: services.reduce((acc, service) => {
        const entry = state[service.id];
        if (entry.selected) {
          acc[service.id] = {
            persons: entry.persons,
            hoursPerPerson: entry.hoursPerPerson,
            rate: entry.rate
          };
        }
        return acc;
      }, {})
    };
  }

  function applyProposalPayload(payload){
    const meta = payload && payload.meta ? payload.meta : {};
    Object.entries(proposalFields).forEach(([key, input]) => {
      input.value = typeof meta[key] === 'string' ? meta[key] : '';
    });

    const items = payload && payload.items ? payload.items : {};
    services.forEach((service) => {
      const incoming = items[service.id];
      if (!incoming) {
        state[service.id].selected = false;
        state[service.id].persons = 0;
        state[service.id].hoursPerPerson = 0;
        state[service.id].rate = getDefaultRate(service);
        return;
      }

      state[service.id].selected = true;
      state[service.id].persons = parseInputNumber(incoming.persons);
      state[service.id].hoursPerPerson = parseInputNumber(incoming.hoursPerPerson);
      const safeRate = parseInputNumber(incoming.rate);
      state[service.id].rate = Math.min(service.maxRate, Math.max(service.minRate, safeRate || getDefaultRate(service)));
    });

    setPaymentPlanRows(payload && Array.isArray(payload.paymentPlan) ? payload.paymentPlan : []);
  }

  function encodePayload(payload){
    const json = JSON.stringify(payload);
    return btoa(unescape(encodeURIComponent(json)));
  }

  function decodePayload(encoded){
    const json = decodeURIComponent(escape(atob(encoded)));
    return JSON.parse(json);
  }

  function buildShareableLink(){
    const encoded = encodePayload(getProposalPayload());
    return `${window.location.origin}${window.location.pathname}#proposal=${encoded}`;
  }

  function setStatus(message){
    proposalStatus.textContent = message;
  }

  function esc(text){
    return String(text || '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[char]));
  }

  function listFromMultiline(text){
    const lines = text.split('\n').map((line) => line.trim()).filter(Boolean);
    if (!lines.length) {
      return '<li>Keine Angabe</li>';
    }
    return lines.map((line) => `<li>${esc(line)}</li>`).join('');
  }

  function buildProposalHtml(){
    const rows = collectSelectedRows();
    const total = rows.reduce((sum, row) => sum + row.total, 0);
    const meta = collectProposalMeta();
    const paymentPlan = collectPaymentPlanEntries();

    const serviceRows = rows.length
      ? rows.map((row) => `
          <tr>
            <td>${esc(row.service.name)}</td>
            <td>${row.service.group}</td>
            <td>${euro(row.persons)}</td>
            <td>${euro(row.hoursPerPerson)}</td>
            <td>${euro(row.hours)}</td>
            <td>${euro(row.rate)}</td>
            <td>${euro(row.total)}</td>
          </tr>
        `).join('')
      : '<tr><td colspan="7">Keine Leistungen ausgewählt.</td></tr>';

    const paymentPlanRowsHtml = paymentPlan.length
      ? paymentPlan.map((entry) => {
        const descriptor = [entry.date, entry.milestone].filter(Boolean).join(' · ') || 'Ohne Terminangabe';
        const amount = total * (entry.percentage / 100);
        return `
          <tr>
            <td>${esc(descriptor)}</td>
            <td>${euro(entry.percentage)} %</td>
            <td>${euro(amount)}</td>
          </tr>
        `;
      }).join('')
      : '<tr><td colspan="3">Kein Zahlungsplan hinterlegt.</td></tr>';

    return `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <title>Angebot – ${esc(meta.projectName || 'Projekt')}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 32px; color: #111; }
    h1 { margin-bottom: 0; }
    .muted { color: #555; margin-top: 6px; }
    .meta { margin: 20px 0; }
    .meta p { margin: 4px 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 12px; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; vertical-align: top; }
    th { background: #f5f5f5; }
    tfoot th { text-align: right; }
    section { margin-top: 20px; }
  </style>
</head>
<body>
  <h1>Angebot / Proposal</h1>
  <p class="muted">Projekt: ${esc(meta.projectName || '–')} · Kund:in: ${esc(meta.clientName || '–')}</p>

  <div class="meta">
    <p><strong>Projektzeitraum:</strong> ${esc(meta.startDate || '–')} bis ${esc(meta.endDate || '–')}</p>
  </div>

  <h2>Kalkulation</h2>
  <table>
    <thead>
      <tr>
        <th>Leistung</th>
        <th>Gruppe</th>
        <th>Personen</th>
        <th>Std./Person</th>
        <th>Stunden</th>
        <th>Stundensatz (€)</th>
        <th>Gesamt (€)</th>
      </tr>
    </thead>
    <tbody>${serviceRows}</tbody>
    <tfoot>
      <tr>
        <th colspan="6">Gesamthonorar (exkl. USt.)</th>
        <th>${euro(total)}</th>
      </tr>
    </tfoot>
  </table>

  <section>
    <h2>Zahlungsplan</h2>
    <table>
      <thead>
        <tr>
          <th>Termin / Meilenstein</th>
          <th>Anteil (%)</th>
          <th>Betrag (€)</th>
        </tr>
      </thead>
      <tbody>${paymentPlanRowsHtml}</tbody>
    </table>
  </section>

  <section>
    <h2>Timeline</h2>
    <ul>${listFromMultiline(meta.timeline)}</ul>
  </section>

  <section>
    <h2>Deliverables</h2>
    <ul>${listFromMultiline(meta.deliverables)}</ul>
  </section>

  <section>
    <h2>Annahmen / Scope</h2>
    <ul>${listFromMultiline(meta.assumptions)}</ul>
  </section>
</body>
</html>`;
  }

  async function copyShareLink(){
    const link = buildShareableLink();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(link);
      } else {
        window.prompt('Link kopieren:', link);
      }
      setStatus('Shareable Link erstellt und in die Zwischenablage kopiert.');
    } catch (error) {
      setStatus('Shareable Link konnte nicht kopiert werden. Bitte manuell kopieren.');
      window.prompt('Link kopieren:', link);
    }
  }

  function downloadProposalPdf(){
    const popup = window.open('', '_blank');
    if (!popup) {
      setStatus('Popup blockiert: Bitte Popups erlauben, um den PDF-Export zu starten.');
      return;
    }
    popup.document.open();
    popup.document.write(buildProposalHtml());
    popup.document.close();
    popup.focus();
    setTimeout(() => popup.print(), 250);
    setStatus('Druckansicht geöffnet. Wähle im Browser „Als PDF speichern“.');
  }

  function loadFromHash(){
    const match = window.location.hash.match(/proposal=([^&]+)/);
    if (!match) return;
    try {
      const payload = decodePayload(match[1]);
      applyProposalPayload(payload);
      setStatus('Daten aus Share-Link geladen.');
    } catch (_error) {
      setStatus('Share-Link konnte nicht geladen werden.');
    }
  }

  categorySelect.addEventListener('change', renderServiceList);
  serviceList.addEventListener('input', handleListChange);
  serviceList.addEventListener('change', handleListChange);
  paymentPlanList.addEventListener('input', handlePaymentPlanChange);
  paymentPlanList.addEventListener('change', handlePaymentPlanChange);
  paymentPlanList.addEventListener('click', handlePaymentPlanChange);
  addPaymentPlanRowBtn.addEventListener('click', () => {
    addPaymentPlanRow({});
    setStatus('Zahlungsposition hinzugefügt.');
  });
  downloadBtn.addEventListener('click', downloadCsv);
  copyShareLinkBtn.addEventListener('click', copyShareLink);
  downloadProposalPdfBtn.addEventListener('click', downloadProposalPdf);

  Object.values(proposalFields).forEach((input) => {
    input.addEventListener('input', () => setStatus('Proposal aktualisiert. Du kannst jetzt Link oder PDF exportieren.'));
  });

  buildCategoryOptions();
  setPaymentPlanRows([]);
  loadFromHash();
  categorySelect.value = 'all';
  renderServiceList();
  renderResult();
})();
