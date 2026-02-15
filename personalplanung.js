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
    groupExamples: document.getElementById("groupExamples"),
    jobTitle: document.getElementById("jobTitle"),
    jobGroup: document.getElementById("jobGroup"),
    jobYears: document.getElementById("jobYears"),
    jobHours: document.getElementById("jobHours"),
    addJobBtn: document.getElementById("addJobBtn"),
    planTable: document.getElementById("planTable"),
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

  function renderScaleTable() {
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

  function renderExamples() {
    nodes.groupExamples.innerHTML = SALARY_SCALE.map((group) => {
      const examples = GROUP_EXAMPLES[group.bg] || [];
      return `
        <article class="example-block">
          <h3>BG ${group.bg}: ${group.name}</h3>
          <ul>
            ${examples.map((example) => `<li>${example}</li>`).join("")}
          </ul>
        </article>
      `;
    }).join("");
  }

  function buildGroupSelect() {
    nodes.jobGroup.innerHTML = SALARY_SCALE.map(
      (group) => `<option value="${group.bg}">BG ${group.bg} – ${group.name}</option>`
    ).join("");
  }

  function stageLabelByYears(years) {
    return STAGES[yearsToStageIndex(years)].label;
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

  function renderPlanTable() {
    if (!planRows.length) {
      nodes.planTable.innerHTML = `
        <thead>
          <tr>
            <th>Jobtitel</th><th>BG</th><th>Berufsjahre</th><th>Stufe</th><th>Wochenstunden</th><th>VZ-Gehalt</th><th>Ist-Gehalt</th><th></th>
          </tr>
        </thead>
        <tbody><tr><td colspan="8" class="muted">Noch keine Stellen erfasst.</td></tr></tbody>
      `;
      nodes.teamSummary.innerHTML = "";
      return;
    }

    nodes.planTable.innerHTML = `
      <thead>
        <tr>
          <th>Jobtitel</th>
          <th>BG</th>
          <th>Berufsjahre</th>
          <th>Stufe</th>
          <th>Wochenstunden</th>
          <th>VZ-Gehalt (Monat)</th>
          <th>Ist-Gehalt (Monat)</th>
          <th>Aktion</th>
        </tr>
      </thead>
      <tbody>
        ${planRows
          .map(
            (row, index) => `
          <tr>
            <td>${row.title}</td>
            <td>BG ${row.group}</td>
            <td>${row.years}</td>
            <td>${row.stage}</td>
            <td>${row.hours.toFixed(1)} h</td>
            <td>${EUR(row.fullTimeSalary)}</td>
            <td><strong>${EUR(row.actualSalary)}</strong></td>
            <td><button type="button" class="btn btn-outline" data-remove-index="${index}">Entfernen</button></td>
          </tr>`
          )
          .join("")}
      </tbody>
    `;

    const totalActual = planRows.reduce((sum, row) => sum + row.actualSalary, 0);
    const totalFullTime = planRows.reduce((sum, row) => sum + row.fullTimeSalary, 0);
    const totalHours = planRows.reduce((sum, row) => sum + row.hours, 0);

    nodes.teamSummary.innerHTML = `
      <div class="row"><span>Gesamte Wochenstunden</span><strong>${totalHours.toFixed(1)} h</strong></div>
      <div class="row"><span>Summe Vollzeit-Monatsgehälter (laut Skala)</span><strong>${EUR(totalFullTime)}</strong></div>
      <div class="row"><span>Summe Ist-Monatsgehälter (Stufengehalt ÷ 38 × Stunden)</span><strong>${EUR(totalActual)}</strong></div>
    `;

    nodes.planTable.querySelectorAll("[data-remove-index]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.getAttribute("data-remove-index"));
        if (!Number.isNaN(idx)) {
          planRows.splice(idx, 1);
          renderPlanTable();
        }
      });
    });
  }

  function addJob() {
    const title = (nodes.jobTitle.value || "").trim() || "Unbenannte Stelle";
    const group = Number(nodes.jobGroup.value || 1);
    const years = Math.max(1, Number(nodes.jobYears.value || 1));
    const hours = Math.max(0, Number(nodes.jobHours.value || 0));
    const salary = salaryFor(group, years, hours);

    planRows.push({
      title,
      group,
      years,
      stage: `${salary.stage} (${stageLabelByYears(years)})`,
      hours,
      fullTimeSalary: salary.fullTime,
      actualSalary: salary.actual,
    });

    nodes.jobTitle.value = "";
    renderPlanTable();
  }

  function init() {
    renderScaleTable();
    renderExamples();
    buildGroupSelect();
    renderPlanTable();
    nodes.addJobBtn.addEventListener("click", addJob);
  }

  init();
})();
