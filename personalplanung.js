(function () {
  "use strict";

  const STAGES = [
    { key: "A", label: "Stufe A (1-2 Jahre)" },
    { key: "B", label: "Stufe B (3-4 Jahre)" },
    { key: "C", label: "Stufe C (5-6 Jahre)" },
    { key: "D", label: "Stufe D (7-8 Jahre)" },
    { key: "E", label: "Stufe E (9-10 Jahre)" },
    { key: "F", label: "Stufe F (11-12 Jahre)" },
    { key: "G", label: "Stufe G (13-14 Jahre)" },
    { key: "H", label: "Stufe H (15-16 Jahre)" },
    { key: "I", label: "Stufe I (17-18 Jahre)" },
    { key: "J", label: "Stufe J (19+ Jahre)" },
  ];

  const SALARY_SCALE = [
    { bg: 1, name: "Tätigkeiten ohne besondere Kenntnisse", salaries: [2166, 2205, 2264, 2330, 2394, 2458, 2527, 2599, 2673, 2746] },
    { bg: 2, name: "Einfache Tätigkeiten bzw. Assistenztätigkeiten unter Aufsicht/Anleitung", salaries: [2335, 2435, 2533, 2638, 2748, 2859, 2967, 3074, 3188, 3300] },
    { bg: 3, name: "Tätigkeiten bzw. Assistenztätigkeiten mit Grundkenntnissen unter Aufsicht/Anleitung", salaries: [2516, 2627, 2749, 2870, 2986, 3108, 3226, 3346, 3466, 3587] },
    { bg: 4, name: "Organisatorische und technische Tätigkeiten mit entsprechenden Kenntnissen", salaries: [2838, 2986, 3141, 3294, 3445, 3594, 3745, 3898, 4049, 4201] },
    { bg: 5, name: "Tätigkeiten mit Ausbildung und/oder Erfahrung in Eigenverantwortung", salaries: [3150, 3322, 3489, 3657, 3829, 4000, 4170, 4339, 4507, 4679] },
    { bg: 6, name: "Bereichs-/Abteilungsleitungen oder Projektleitungen mit Personal- und/oder Finanzverantwortung", salaries: [3573, 3764, 3951, 4145, 4334, 4528, 4715, 4909, 5100, 5292] },
    { bg: 7, name: "Koordinierende leitende Funktion, Gesamtkoordination", salaries: [4301, 4534, 4764, 4996, 5229, 5458, 5688, 5921, 6151, 6380] },
    { bg: 8, name: "Letztverantwortliche Leitungsfunktionen bei Vereinen", salaries: [5008, 5243, 5486, 5722, 5963, 6208, 6444, 6685, 6924, 7163] },
  ];

  const GROUP_EXAMPLES = {
    1: ["Mithilfe bei Massenaussendungen", "Flyer verteilen", "Einlasspersonal", "Garderobendienst", "Stage Hands", "Aushilfen"],
    2: ["Ablagetätigkeiten", "Telefondienst", "Front Office/Empfang", "Organisation von Reisen und Unterkünften", "Ticketverkauf", "Saaldienst"],
    3: ["Allgemeine Büroarbeit", "Technisches Personal mit Grundkenntnissen", "Technische Assistenzen"],
    4: ["Abendkassa mit Ticketing", "Vorbuchhaltung", "Einfache Öffentlichkeitsarbeit", "Büroadministration", "Servicebüro"],
    5: ["Organisation von Veranstaltungen", "Ausstellungsorganisation", "Operative Workshopleitung", "Redaktionelle Arbeit", "Mitgliederadministration"],
    6: ["Leitung Presseabteilung", "Leitung Öffentlichkeitsarbeit", "Technische Produktionsleitung", "Controlling", "Stellvertretende Geschäftsführung"],
    7: ["Koordinierende Führung der Tagesgeschäfte", "Führungsfunktionen in Vorstandsteams", "Leitung großer Bereiche mit eigener Personal- und Finanzverantwortung"],
    8: ["Kaufmännische Leitung", "Künstlerische Gesamtleitung"],
  };

  const EUR = (n) =>
    new Intl.NumberFormat("de-AT", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(Math.round(Number(n) || 0));

  const nodes = {
    salaryScaleTable: document.getElementById("salaryScaleTable"),
    livePlanTable: document.getElementById("livePlanTable"),
    addRowBtn: document.getElementById("addRowBtn"),
    teamSummary: document.getElementById("teamSummary"),
  };

  const planRows = [];

  function yearsToStageIndex(years) {
    const y = Math.max(1, Number(years) || 1);
    if (y <= 2) return 0;
    if (y <= 4) return 1;
    if (y <= 6) return 2;
    if (y <= 8) return 3;
    if (y <= 10) return 4;
    if (y <= 12) return 5;
    if (y <= 14) return 6;
    if (y <= 16) return 7;
    if (y <= 18) return 8;
    return 9;
  }

  function salaryFor(groupNo, years, hours) {
    const group = SALARY_SCALE.find((item) => item.bg === groupNo);
    if (!group) return { fullTime: 0, actual: 0, stage: "-" };
    const stageIndex = yearsToStageIndex(years);
    const fullTimeSalary = group.salaries[stageIndex];
    const actualSalary = (fullTimeSalary / 38) * Math.max(0, Number(hours) || 0);

    return {
      fullTime: fullTimeSalary,
      actual: actualSalary,
      stage: STAGES[stageIndex].key,
    };
  }

  function groupOptions(selectedBg) {
    return SALARY_SCALE.map(
      (group) => `<option value="${group.bg}" ${group.bg === selectedBg ? "selected" : ""}>BG ${group.bg}</option>`
    ).join("");
  }

  function exampleOptions(groupNo, selectedExample) {
    const examples = GROUP_EXAMPLES[groupNo] || [];
    return ["", ...examples]
      .map((example) => {
        const label = example || "Beispiel wählen";
        return `<option value="${example}" ${example === selectedExample ? "selected" : ""}>${label}</option>`;
      })
      .join("");
  }

  function renderScaleTable() {
    if (!nodes.salaryScaleTable) return;

    const head = `
      <thead>
        <tr>
          <th>BG</th>
          <th>Tätigkeit</th>
          ${STAGES.map((stage) => `<th>${stage.key}</th>`).join("")}
        </tr>
      </thead>
    `;

    const body = SALARY_SCALE.map((row) => `
      <tr>
        <td><strong>${row.bg}</strong></td>
        <td>${row.name}</td>
        ${row.salaries.map((salary) => `<td>${EUR(salary)}</td>`).join("")}
      </tr>
    `).join("");

    nodes.salaryScaleTable.innerHTML = `${head}<tbody>${body}</tbody>`;
  }

  function renderLiveTable() {
    const rowsHtml = planRows
      .map((row, index) => {
        const salary = salaryFor(row.group, row.years, row.hours);
        const yearlyCosts = salary.actual * 18.01;

        return `
          <tr>
            <td>
              <select data-field="group" data-index="${index}">
                ${groupOptions(row.group)}
              </select>
            </td>
            <td>
              <select data-field="example" data-index="${index}">
                ${exampleOptions(row.group, row.example)}
              </select>
            </td>
            <td>
              <input type="text" data-field="title" data-index="${index}" value="${row.title}" placeholder="Eigener Jobtitel" />
            </td>
            <td>
              <input type="number" min="1" step="1" data-field="years" data-index="${index}" value="${row.years}" />
            </td>
            <td>
              <input type="number" min="0" step="0.5" data-field="hours" data-index="${index}" value="${row.hours}" />
            </td>
            <td><strong>${salary.stage}</strong></td>
            <td>${EUR(salary.fullTime)}</td>
            <td><strong>${EUR(salary.actual)}</strong></td>
            <td><strong>${EUR(yearlyCosts)}</strong></td>
            <td><button class="btn btn-outline" type="button" data-remove-index="${index}">×</button></td>
          </tr>
        `;
      })
      .join("");

    nodes.livePlanTable.innerHTML = `
      <thead>
        <tr>
          <th>BG</th>
          <th>Beispiel-Funktion</th>
          <th>Eigener Titel</th>
          <th>Jahre</th>
          <th>Stunden/Woche</th>
          <th>Stufe</th>
          <th>Vollzeit-Gehalt</th>
          <th>Ist-Gehalt</th>
          <th>Jahresgesamtkosten</th>
          <th></th>
        </tr>
      </thead>
      <tbody>${rowsHtml}</tbody>
    `;

    bindRowEvents();
    renderSummary();
  }

  function rowLabel(row) {
    return (row.title || row.example || "Unbenannte Stelle").trim();
  }

  function renderSummary() {
    const totals = planRows.reduce(
      (acc, row) => {
        const salary = salaryFor(row.group, row.years, row.hours);
        acc.hours += Math.max(0, Number(row.hours) || 0);
        acc.fullTime += salary.fullTime;
        acc.actual += salary.actual;
        return acc;
      },
      { hours: 0, fullTime: 0, actual: 0 }
    );

    const yearly = totals.actual * 18.01;

    const compactRows = planRows
      .map((row) => {
        const salary = salaryFor(row.group, row.years, row.hours);
        return `<div class="row"><span>${rowLabel(row)} (BG ${row.group})</span><strong>${EUR(salary.actual)} / Monat</strong></div>`;
      })
      .join("");

    nodes.teamSummary.innerHTML = `
      <div class="row"><span>Gesamte Wochenstunden</span><strong>${totals.hours.toFixed(1)} h</strong></div>
      <div class="row"><span>Summe Vollzeit-Monatsgehälter</span><strong>${EUR(totals.fullTime)}</strong></div>
      <div class="row"><span>Summe Ist-Monatsgehälter</span><strong>${EUR(totals.actual)}</strong></div>
      <div class="row"><span>Jahresgesamtkosten gesamt</span><strong>${EUR(yearly)}</strong></div>
      <hr class="sep" />
      ${compactRows}
    `;
  }

  function bindRowEvents() {
    nodes.livePlanTable.querySelectorAll("[data-field]").forEach((input) => {
      input.addEventListener("input", onFieldChange);
      input.addEventListener("change", onFieldChange);
    });

    nodes.livePlanTable.querySelectorAll("[data-remove-index]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.getAttribute("data-remove-index"));
        if (Number.isNaN(idx)) return;
        planRows.splice(idx, 1);
        renderLiveTable();
      });
    });
  }

  function onFieldChange(event) {
    const field = event.target.getAttribute("data-field");
    const index = Number(event.target.getAttribute("data-index"));
    if (!field || Number.isNaN(index) || !planRows[index]) return;

    const row = planRows[index];

    if (field === "group") {
      row.group = Math.max(1, Math.min(8, Number(event.target.value) || 1));
      const availableExamples = GROUP_EXAMPLES[row.group] || [];
      if (!availableExamples.includes(row.example)) {
        row.example = "";
      }
    } else if (field === "years") {
      row.years = Math.max(1, Number(event.target.value) || 1);
    } else if (field === "hours") {
      row.hours = Math.max(0, Number(event.target.value) || 0);
    } else if (field === "title") {
      row[field] = event.target.value || "";
      renderSummary();
      return;
    } else {
      row[field] = event.target.value || "";
    }

    renderLiveTable();
  }

  function addRow() {
    planRows.push({ group: 1, example: "", title: "", years: 1, hours: 38.5 });
    renderLiveTable();
  }

  function init() {
    planRows.push({ group: 1, example: "", title: "", years: 1, hours: 38.5 });
    renderScaleTable();
    renderLiveTable();
    nodes.addRowBtn.addEventListener("click", addRow);
  }

  init();
})();
