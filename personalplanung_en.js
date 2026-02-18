(function () {
  "use strict";

  const STAGES = [
    { key: "A", label: "Level A (1-2 years)" },
    { key: "B", label: "Level B (3-4 years)" },
    { key: "C", label: "Level C (5-6 years)" },
    { key: "D", label: "Level D (7-8 years)" },
    { key: "E", label: "Level E (9-10 years)" },
    { key: "F", label: "Level F (11-12 years)" },
    { key: "G", label: "Level G (13-14 years)" },
    { key: "H", label: "Level H (15-16 years)" },
    { key: "I", label: "Level I (17-18 years)" },
    { key: "J", label: "Level J (19+ years)" },
  ];

  const SALARY_SCALE = [
    { bg: 1, name: "Tasks without specific qualifications", salaries: [2166, 2205, 2264, 2330, 2394, 2458, 2527, 2599, 2673, 2746] },
    { bg: 2, name: "Simple tasks or assistant tasks under supervision/guidance", salaries: [2335, 2435, 2533, 2638, 2748, 2859, 2967, 3074, 3188, 3300] },
    { bg: 3, name: "Tasks or assistant tasks with basic knowledge under supervision/guidance", salaries: [2516, 2627, 2749, 2870, 2986, 3108, 3226, 3346, 3466, 3587] },
    { bg: 4, name: "Organizational and technical tasks with relevant expertise", salaries: [2838, 2986, 3141, 3294, 3445, 3594, 3745, 3898, 4049, 4201] },
    { bg: 5, name: "Tasks requiring training and/or experience with own responsibility", salaries: [3150, 3322, 3489, 3657, 3829, 4000, 4170, 4339, 4507, 4679] },
    { bg: 6, name: "Department/project leadership with people and/or budget responsibility", salaries: [3573, 3764, 3951, 4145, 4334, 4528, 4715, 4909, 5100, 5292] },
    { bg: 7, name: "Coordinating leadership function, overall coordination", salaries: [4301, 4534, 4764, 4996, 5229, 5458, 5688, 5921, 6151, 6380] },
    { bg: 8, name: "Executive leadership roles in associations", salaries: [5008, 5243, 5486, 5722, 5963, 6208, 6444, 6685, 6924, 7163] },
  ];

  const GROUP_EXAMPLES = {
    1: ["Support with bulk mailings", "Distributing flyers", "Entrance staff", "Cloakroom service", "Stage hands", "Temporary support"],
    2: ["Filing tasks", "Telephone service", "Front office/reception", "Organizing travel and accommodation", "Ticket sales", "Audience services"],
    3: ["General office work", "Technical staff with basic knowledge", "Technical assistance"],
    4: ["Evening box office with ticketing", "Pre-accounting", "Basic public relations", "Office administration", "Service office"],
    5: ["Event organization", "Exhibition organization", "Operational workshop facilitation", "Editorial work", "Member administration"],
    6: ["Head of press department", "Head of public relations", "Technical production management", "Controlling", "Deputy executive management"],
    7: ["Coordinating day-to-day operations", "Leadership roles in board teams", "Leading major departments with own staff and budget responsibility"],
    8: ["Commercial management", "Overall artistic direction"],
  };

  const EUR = (n) =>
    new Intl.NumberFormat("en-US", {
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

  function parseNumericInput(value) {
    if (typeof value === "number") return value;
    if (typeof value !== "string") return Number(value);
    return Number(value.trim().replace(",", "."));
  }

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
        const label = example || "Select sample";
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
          <th>Activity</th>
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
              <input type="text" data-field="title" data-index="${index}" value="${row.title}" placeholder="Custom job title" />
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
          <th>Sample role</th>
          <th>Custom title</th>
          <th>Years</th>
          <th>Hours/week</th>
          <th>Level</th>
          <th>Full-time salary</th>
          <th>Actual salary</th>
          <th>Annual total cost</th>
          <th></th>
        </tr>
      </thead>
      <tbody>${rowsHtml}</tbody>
    `;

    bindRowEvents();
    renderSummary();
  }

  function rowLabel(row) {
    return (row.title || row.example || "Untitled position").trim();
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
        return `<div class="row"><span>${rowLabel(row)} (BG ${row.group})</span><strong>${EUR(salary.actual)} / month</strong></div>`;
      })
      .join("");

    nodes.teamSummary.innerHTML = `
      <div class="row"><span>Total weekly hours</span><strong>${totals.hours.toFixed(1)} h</strong></div>
      <div class="row"><span>Total full-time monthly salaries</span><strong>${EUR(totals.fullTime)}</strong></div>
      <div class="row"><span>Total actual monthly salaries</span><strong>${EUR(totals.actual)}</strong></div>
      <div class="row"><span>Total annual cost</span><strong>${EUR(yearly)}</strong></div>
      <hr class="sep" />
      ${compactRows}
    `;
  }

  function bindRowEvents() {
    nodes.livePlanTable.querySelectorAll("[data-field]").forEach((input) => {
      input.addEventListener("change", onFieldChange);

      if (input.getAttribute("data-field") === "title") {
        input.addEventListener("input", onFieldChange);
      }
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
      row.group = Math.max(1, Math.min(8, parseNumericInput(event.target.value) || 1));
      const availableExamples = GROUP_EXAMPLES[row.group] || [];
      if (!availableExamples.includes(row.example)) {
        row.example = "";
      }
    } else if (field === "years") {
      row.years = Math.max(1, parseNumericInput(event.target.value) || 1);
    } else if (field === "hours") {
      row.hours = Math.max(0, parseNumericInput(event.target.value) || 0);
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
