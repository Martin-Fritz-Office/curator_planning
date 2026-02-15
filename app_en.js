/* Framework-free implementation of the Curator Prognosis Tool
   - Renders the questionnaire (A–D)
   - Computes revenue/cost/profit heuristics
   - Shows two pie charts via Chart.js (CDN)
*/

(function () {
  "use strict";

  const EUR = (n) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(Math.round(Number(n) || 0));

  /** @typedef {"A"|"B"|"C"|"D"} Opt */

  /** @type {Record<string, Opt>} */
  const DEFAULT = { ...window.CuratorCalcCore.DEFAULT_ANSWERS };

  const DEFAULT_EMPLOYMENT_NET = 0;
  const DEFAULT_HOUSEHOLD_PERSONS = 1;

  /** @type {{key:string,title:string,options:{k:Opt,label:string}[],hint?:string}[]} */
  const QUESTIONS = [
    {
      key: "q1",
      title: "Your primary focus of work?",
      options: [
        { k: "A", label: "Curating exhibitions (institutions)" },
        { k: "B", label: "Curating + writing/essay" },
        { k: "C", label: "Curating + project management" },
        { k: "D", label: "Curating + consulting/strategy" },
      ],
    },
    {
      key: "q2",
      title: "How many curatorial projects per year are realistic?",
      options: [
        { k: "A", label: "3–4" },
        { k: "B", label: "5–6" },
        { k: "C", label: "7–9" },
        { k: "D", label: "10+" },
      ],
    },
    {
      key: "q3",
      title: "Average fee per project (gross)?",
      options: [
        { k: "A", label: "under €3,000" },
        { k: "B", label: "€3,000–€5,000" },
        { k: "C", label: "€5,000–€8,000" },
        { k: "D", label: "over €8,000" },
      ],
    },
    {
      key: "q4",
      title: "How often do you work with public institutions?",
      options: [
        { k: "A", label: "almost never" },
        { k: "B", label: "occasionally" },
        { k: "C", label: "mostly" },
        { k: "D", label: "exclusively" },
      ],
      hint: "Indicator for stability/plannability (not a strict euro formula).",
    },
    {
      key: "q5",
      title: "Additional income from texts (catalogs, essays)?",
      options: [
        { k: "A", label: "none" },
        { k: "B", label: "up to €2,000/year" },
        { k: "C", label: "€2,000–€6,000/year" },
        { k: "D", label: "over €6,000/year" },
      ],
    },
    {
      key: "q6",
      title: "Consulting or jury work?",
      options: [
        { k: "A", label: "no" },
        { k: "B", label: "1–2/year" },
        { k: "C", label: "3–5/year" },
        { k: "D", label: "regularly (>5)" },
      ],
    },
    {
      key: "q7",
      title: "Day rate for consulting/jury (gross)?",
      options: [
        { k: "A", label: "under €300" },
        { k: "B", label: "300–450 €" },
        { k: "C", label: "450–650 €" },
        { k: "D", label: "over €650" },
      ],
    },
    {
      key: "q8",
      title: "International projects (incl. travel)?",
      options: [
        { k: "A", label: "none" },
        { k: "B", label: "1/year" },
        { k: "C", label: "2–3/year" },
        { k: "D", label: "4+/year" },
      ],
      hint: "Driver for variable costs and risk buffer.",
    },
    {
      key: "q9",
      title: "Who covers travel costs?",
      options: [
        { k: "A", label: "mostly me" },
        { k: "B", label: "shared" },
        { k: "C", label: "mostly the client" },
        { k: "D", label: "always the client" },
      ],
    },
    {
      key: "q10",
      title: "Grants/scholarships per year?",
      options: [
        { k: "A", label: "none" },
        { k: "B", label: "up to €5,000" },
        { k: "C", label: "€5,000–€15,000" },
        { k: "D", label: "over €15,000" },
      ],
    },
    {
      key: "q11",
      title: "How stable is your pipeline?",
      options: [
        { k: "A", label: "highly volatile" },
        { k: "B", label: "rather uncertain" },
        { k: "C", label: "relatively stable" },
        { k: "D", label: "very stable" },
      ],
      hint: "Affects the safety discount (conservatism factor).",
    },
    {
      key: "q12",
      title: "How many unpaid projects per year?",
      options: [
        { k: "A", label: "0" },
        { k: "B", label: "1–2" },
        { k: "C", label: "3–4" },
        { k: "D", label: "5+" },
      ],
      hint: "Reduces paid project volume.",
    },
    {
      key: "q13",
      title: "Working hours per week (avg)?",
      options: [
        { k: "A", label: "under 25 h" },
        { k: "B", label: "25–35 h" },
        { k: "C", label: "35–45 h" },
        { k: "D", label: "over 45 h" },
      ],
    },
    {
      key: "q14",
      title: "Share of admin/accounting?",
      options: [
        { k: "A", label: "<10 %" },
        { k: "B", label: "10–20 %" },
        { k: "C", label: "20–30 %" },
        { k: "D", label: ">30 %" },
      ],
    },
    {
      key: "q15",
      title: "Fixed monthly costs (rent, office, software)?",
      options: [
        { k: "A", label: "<€300" },
        { k: "B", label: "€300–€600" },
        { k: "C", label: "€600–€1,000" },
        { k: "D", label: ">€1,000" },
      ],
    },
    {
      key: "q16",
      title: "Variable costs per project (travel, materials)?",
      options: [
        { k: "A", label: "<€200" },
        { k: "B", label: "€200–€500" },
        { k: "C", label: "€500–€1,000" },
        { k: "D", label: ">€1,000" },
      ],
    },
    {
      key: "q17",
      title: "How many teaching assignments do you have per year?",
      options: [
        { k: "A", label: "0" },
        { k: "B", label: "1–2" },
        { k: "C", label: "3–4" },
        { k: "D", label: "5+" },
      ],
    },
    {
      key: "q18",
      title: "Average fee per teaching assignment (gross)?",
      options: [
        { k: "A", label: "under €500" },
        { k: "B", label: "€500–€1,000" },
        { k: "C", label: "€1,000–€2,000" },
        { k: "D", label: "over €2,000" },
      ],
    },
    {
      key: "q19",
      title: "Desired annual net income?",
      options: [
        { k: "A", label: "<€20,000" },
        { k: "B", label: "€20,000–€30,000" },
        { k: "C", label: "€30,000–€45,000" },
        { k: "D", label: ">€45,000" },
      ],
      hint: "Only for gap analysis, not an input for revenue calculation.",
    },
    {
      key: "q20",
      title: "Risk appetite for acquisition/investments?",
      options: [
        { k: "A", label: "very low" },
        { k: "B", label: "moderate" },
        { k: "C", label: "high" },
        { k: "D", label: "very high" },
      ],
      hint: "Affects recommended reserve rate.",
    },
    {
      key: "q21",
      title: "Do you receive support from someone else?",
      options: [
        { k: "A", label: "no" },
        { k: "B", label: "with €3,600/year" },
        { k: "C", label: "with €6,000/year" },
        { k: "D", label: "with €12,000/year" },
      ],
      hint: "Additional private or institutional support per year.",
    },
  ];

  const QUESTION_GROUPS = [
    {
      title: "Profile & positioning",
      description: "Your core setup as an independent curator.",
      keys: ["q1", "q2", "q3", "q4"],
    },
    {
      title: "Income streams",
      description: "Additional revenue sources besides project fees.",
      keys: ["q5", "q6", "q7", "q10", "q17", "q18", "q21"],
    },
    {
      title: "Workload & predictability",
      description: "How stable and plannable your year is.",
      keys: ["q8", "q9", "q11", "q12", "q13", "q14"],
    },
    {
      title: "Costs, risk & target",
      description: "Cost structure, risk profile, and your target income.",
      keys: ["q15", "q16", "q19", "q20"],
    },
  ];

  // -------------------- shared calc core --------------------
  const calcCore = window.CuratorCalcCore;
  const CALC_LABELS = {
    income: [
      "Curatorial fees",
      "Texts & publications",
      "Consulting / jury",
      "Teaching",
      "Grants / scholarships",
      "Support",
    ],
    costs: ["Fixed costs", "Variable project costs", "Social insurance & provision", "Taxes"],
    typology: {
      precarious: "precarious",
      stable: "stable",
      highlyProfessionalized: "highly professionalized",
    },
  };

  // -------------------- state --------------------
  /** @type {Record<string, Opt>} */
  let answers = { ...DEFAULT };
  let employmentNetIncome = DEFAULT_EMPLOYMENT_NET;
  let householdPersons = DEFAULT_HOUSEHOLD_PERSONS;
  let selectedScenarioId = "";
  let scenariosCache = [];

  // -------------------- DOM --------------------
  const questionGrid = document.getElementById("questionGrid");
  const sheetEl = document.getElementById("sheet");
  const resetBtn = document.getElementById("resetBtn");
  const saveBtn = document.getElementById("saveBtn");
  const saveStatusEl = document.getElementById("saveStatus");
  const scenarioNameInput = document.getElementById("scenarioName");
  const scenarioListEl = document.getElementById("scenarioList");
  const compareScenarioListEl = document.getElementById("compareScenarioList");
  const loadScenarioBtn = document.getElementById("loadScenarioBtn");
  const compareSelectedBtn = document.getElementById("compareSelectedBtn");
  const clearCompareBtn = document.getElementById("clearCompareBtn");
  const compareTableBodyEl = document.getElementById("compareTableBody");
  const compareEmptyEl = document.getElementById("compareEmpty");
  const typologyLabelEl = document.getElementById("typologyLabel");
  const medianAvailableIncomeEl = document.getElementById("medianAvailableIncome");

  const incomeEmpty = document.getElementById("incomeEmpty");
  const costEmpty = document.getElementById("costEmpty");

  function setSaveStatus(text, tone) {
    if (!saveStatusEl) return;
    saveStatusEl.textContent = text;
    saveStatusEl.classList.remove("save-status-ok", "save-status-error", "save-status-pending");
    if (tone) saveStatusEl.classList.add(tone);
  }

  function formatDelta(value) {
    const n = Number(value) || 0;
    if (n === 0) return `±${EUR(0)}`;
    return `${n > 0 ? "+" : "−"}${EUR(Math.abs(n))}`;
  }

  function getScenarioMetrics(rawScenario) {
    const loadedAnswers = { ...DEFAULT, ...(rawScenario.answers || {}) };
    const loadedEmploymentIncome = Math.max(0, Number(rawScenario.employmentNetIncome || 0));
    const c = calcCore.calculateForecast(loadedAnswers, loadedEmploymentIncome, { labels: CALC_LABELS });

    return {
      id: String(rawScenario.id),
      name: rawScenario.name || `Scenario ${rawScenario.id}`,
      calc: c,
    };
  }

  function renderScenarioComparison() {
    if (!compareTableBodyEl || !compareEmptyEl) return;

    compareTableBodyEl.innerHTML = "";
    const current = calcAll(answers);

    const selectedIds = compareScenarioListEl
      ? Array.from(compareScenarioListEl.selectedOptions).map((opt) => opt.value).filter(Boolean)
      : [];

    const rows = [
      {
        name: "Current draft",
        calc: current,
      },
    ];

    for (const selectedId of selectedIds) {
      const scenario = scenariosCache.find((item) => item.id === selectedId);
      if (scenario) rows.push(scenario);
    }

    if (rows.length === 1) {
      compareEmptyEl.style.display = "block";
      return;
    }

    compareEmptyEl.style.display = "none";

    for (const rowData of rows) {
      const tr = document.createElement("tr");
      const deltaAvailable = rowData.calc.available - current.available;

      const cells = [
        rowData.name,
        EUR(rowData.calc.available),
        formatDelta(deltaAvailable),
        EUR(rowData.calc.gap),
        EUR(rowData.calc.revenue),
        EUR(rowData.calc.profitAfterTax),
        rowData.calc.typ.label,
      ];

      cells.forEach((value, idx) => {
        const td = document.createElement("td");
        td.textContent = value;
        if (idx === 2 && deltaAvailable < 0) td.className = "neg";
        tr.appendChild(td);
      });

      compareTableBodyEl.appendChild(tr);
    }
  }

  async function loadMedianAvailableIncome() {
    if (!medianAvailableIncomeEl) return;

    try {
      const res = await fetch("median_available_income.php");
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error((data && data.error) || "Failed to load median");
      }

      if (!data.count) {
        medianAvailableIncomeEl.textContent = "No data";
        return;
      }

      medianAvailableIncomeEl.textContent = EUR(data.medianAvailableIncome || 0);
    } catch (err) {
      medianAvailableIncomeEl.textContent = "Error";
    }
  }

  async function loadIncomeScenarios() {
    if (!scenarioListEl) return;

    try {
      const res = await fetch("income_scenarios.php");
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error((data && data.error) || "Failed to load scenarios");
      }

      scenarioListEl.innerHTML = "";
      if (compareScenarioListEl) compareScenarioListEl.innerHTML = "";
      scenariosCache = (data.scenarios || []).map(getScenarioMetrics);

      const placeholder = document.createElement("option");
      placeholder.value = "";
      placeholder.textContent = "Load scenario …";
      scenarioListEl.appendChild(placeholder);

      for (const scenario of data.scenarios || []) {
        const opt = document.createElement("option");
        opt.value = String(scenario.id);
        opt.textContent = `${scenario.name} (${EUR(scenario.totalIncome || 0)})`;
        opt.dataset.answers = JSON.stringify(scenario.answers || {});
        opt.dataset.employmentNetIncome = String(scenario.employmentNetIncome || 0);
        scenarioListEl.appendChild(opt);

        if (compareScenarioListEl) {
          const compareOpt = document.createElement("option");
          compareOpt.value = String(scenario.id);
          compareOpt.textContent = `${scenario.name} (${EUR(scenario.totalIncome || 0)})`;
          compareScenarioListEl.appendChild(compareOpt);
        }
      }

      scenarioListEl.value = selectedScenarioId;
      renderScenarioComparison();
    } catch (err) {
      scenarioListEl.innerHTML = '<option value="">Scenarios could not be loaded</option>';
      if (compareScenarioListEl) compareScenarioListEl.innerHTML = "";
      scenariosCache = [];
      renderScenarioComparison();
    }
  }

  function loadSelectedScenario() {
    if (!scenarioListEl) return;
    const selectedOption = scenarioListEl.options[scenarioListEl.selectedIndex];
    if (!selectedOption || !selectedOption.value) return;

    try {
      const loadedAnswers = JSON.parse(selectedOption.dataset.answers || "{}");
      const mergedAnswers = { ...DEFAULT, ...loadedAnswers };
      answers = mergedAnswers;
      employmentNetIncome = Math.max(0, Number(selectedOption.dataset.employmentNetIncome || 0));
      householdPersons = DEFAULT_HOUSEHOLD_PERSONS;
      selectedScenarioId = selectedOption.value;

      document.querySelectorAll("select[data-key]").forEach((sel) => {
        const key = sel.getAttribute("data-key");
        sel.value = answers[key] || DEFAULT[key];
      });

      const employmentInput = document.getElementById("employmentNetIncome");
      if (employmentInput) employmentInput.value = String(employmentNetIncome);

      const householdInput = document.getElementById("householdPersons");
      if (householdInput) householdInput.value = String(householdPersons);

      if (scenarioNameInput) scenarioNameInput.value = selectedOption.textContent.split(" (")[0] || "";

      updateAll();
      setSaveStatus("Scenario loaded", "save-status-ok");
    } catch (err) {
      setSaveStatus("Scenario could not be loaded", "save-status-error");
    }
  }

  function getSelectedQuestionnaireData() {
    return QUESTIONS.map((q) => {
      const selectedKey = answers[q.key];
      const selectedOption = q.options.find((opt) => opt.k === selectedKey) || null;
      return {
        key: q.key,
        title: q.title,
        hint: q.hint || "",
        selectedKey,
        selectedLabel: selectedOption ? selectedOption.label : "",
        options: q.options,
      };
    });
  }

  function buildPrognosisLines(c) {
    return [
      { label: "Curatorial fees", value: c.curatorial, formatted: EUR(c.curatorial) },
      { label: "Texts & publications", value: c.texts, formatted: EUR(c.texts) },
      { label: "Consulting / jury", value: c.consulting, formatted: EUR(c.consulting) },
      { label: "Teaching", value: c.teaching, formatted: EUR(c.teaching) },
      { label: "Grants / scholarships", value: c.grants, formatted: EUR(c.grants) },
      { label: "Total revenue", value: c.revenue, formatted: EUR(c.revenue) },
      { label: "Fixed costs (annual)", value: c.fixAnnual, formatted: EUR(c.fixAnnual) },
      { label: "Variable project costs", value: c.varAnnual, formatted: EUR(c.varAnnual) },
      { label: "Costs (fixed + variable project costs)", value: c.operatingCosts, formatted: EUR(c.operatingCosts) },
      {
        label: "Profit before tax and social security",
        value: c.profitBeforeSv,
        formatted: EUR(c.profitBeforeSv),
      },
      {
        label: "Social security & retirement (26% of pre-tax profit)",
        value: c.svAnnual,
        formatted: EUR(c.svAnnual),
      },
      {
        label: "Profit after social security, before tax",
        value: c.revenue - c.operatingCosts - c.svAnnual,
        formatted: EUR(c.revenue - c.operatingCosts - c.svAnnual),
      },
      {
        label:
          "Austrian income tax (0–€13,308: 0%, €13,309–€21,617: 20%, €21,618–€35,836: 30%, €35,837–€69,166: 40%, €69,167–€103,072: 48%, €103,073–€1M: 50%, above €1M: 55%)",
        value: c.taxes,
        formatted: EUR(c.taxes),
      },
      {
        label: "Profit after tax and social security",
        value: c.profitAfterTax,
        formatted: EUR(c.profitAfterTax),
      },
      { label: `Reserves (${Math.round(c.reserveRate * 100)}%)`, value: c.reserves, formatted: EUR(c.reserves) },
      {
        label: "Available before support",
        value: c.availableBeforeSupport,
        formatted: EUR(c.availableBeforeSupport),
      },
      { label: "Net income from employment", value: c.employmentIncome, formatted: EUR(c.employmentIncome) },
      { label: "Additional support", value: c.support, formatted: EUR(c.support) },
      { label: "Available annual income", value: c.available, formatted: EUR(c.available) },
      { label: "Target net income", value: c.targetNet, formatted: EUR(c.targetNet) },
      { label: "Gap (available − target)", value: c.gap, formatted: EUR(c.gap) },
    ];
  }

  function buildSurveyPayload(c) {
    return {
      locale: "en",
      scenarioName: scenarioNameInput ? scenarioNameInput.value.trim() : "",
      answers,
      questionnaire: {
        employmentNetIncome,
        householdPersons,
        questions: getSelectedQuestionnaireData(),
      },
      employmentNetIncome,
      typology: c.typ,
      availableIncome: c.available,
      targetIncome: c.targetNet,
      gap: c.gap,
      computed: {
        revenue: c.revenue,
        profitAfterTax: c.profitAfterTax,
        reserves: c.reserves,
        support: c.support,
        employmentIncome: c.employmentIncome,
      },
      prognosisLines: buildPrognosisLines(c),
    };
  }

  async function submitSurvey() {
    const c = calcAll(answers);
    setSaveStatus("Saving …", "save-status-pending");
    if (saveBtn) saveBtn.disabled = true;

    try {
      const res = await fetch("submit_survey.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildSurveyPayload(c)),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        const msg = data && data.error ? data.error : "Save failed";
        throw new Error(msg);
      }
      setSaveStatus(`Saved (#${data.id})`, "save-status-ok");
      await loadMedianAvailableIncome();
      await loadIncomeScenarios();
    } catch (err) {
      setSaveStatus(`Error: ${err.message || "Save failed"}`, "save-status-error");
    } finally {
      if (saveBtn) saveBtn.disabled = false;
    }
  }

  // -------------------- render questions --------------------
  function renderQuestions() {
    questionGrid.innerHTML = "";

    const questionByKey = Object.fromEntries(QUESTIONS.map((q) => [q.key, q]));

    const employmentWrap = document.createElement("div");
    employmentWrap.className = "q";

    const employmentLabel = document.createElement("label");
    employmentLabel.setAttribute("for", "employmentNetIncome");
    employmentLabel.textContent =
      "Are you permanently employed somewhere? If yes, what is your annual net income?";
    employmentWrap.appendChild(employmentLabel);

    const employmentHint = document.createElement("div");
    employmentHint.className = "hint";
    employmentHint.textContent =
      "Please enter a number. This amount is shown separately only (not revenue, not social insurance, not tax logic).";
    employmentWrap.appendChild(employmentHint);

    const employmentInput = document.createElement("input");
    employmentInput.type = "number";
    employmentInput.id = "employmentNetIncome";
    employmentInput.min = "0";
    employmentInput.step = "100";
    employmentInput.value = String(employmentNetIncome);
    employmentInput.addEventListener("input", (e) => {
      const raw = Number(e.target.value);
      employmentNetIncome = Number.isFinite(raw) ? Math.max(0, raw) : 0;
      updateAll();
    });
    employmentWrap.appendChild(employmentInput);

    const householdWrap = document.createElement("div");
    householdWrap.className = "q";

    const householdLabel = document.createElement("label");
    householdLabel.setAttribute("for", "householdPersons");
    householdLabel.textContent = "How many people should this questionnaire cover?";
    householdWrap.appendChild(householdLabel);

    const householdHint = document.createElement("div");
    householdHint.className = "hint";
    householdHint.textContent = "Optional for your questionnaire documentation only (does not affect calculations).";
    householdWrap.appendChild(householdHint);

    const householdInput = document.createElement("input");
    householdInput.type = "number";
    householdInput.id = "householdPersons";
    householdInput.min = "1";
    householdInput.step = "1";
    householdInput.value = String(householdPersons);
    householdInput.addEventListener("input", (e) => {
      const raw = Number(e.target.value);
      householdPersons = Number.isFinite(raw) ? Math.max(1, Math.round(raw)) : DEFAULT_HOUSEHOLD_PERSONS;
      updateAll();
    });
    householdWrap.appendChild(householdInput);

    const employmentSection = document.createElement("section");
    employmentSection.className = "q-section q-section-full";

    const employmentHead = document.createElement("div");
    employmentHead.className = "q-section-head";

    const employmentTitle = document.createElement("h3");
    employmentTitle.textContent = "Employment";
    employmentHead.appendChild(employmentTitle);

    const employmentDescription = document.createElement("p");
    employmentDescription.textContent = "Optional amount outside your self-employed work.";
    employmentHead.appendChild(employmentDescription);

    employmentSection.appendChild(employmentHead);
    employmentSection.appendChild(employmentWrap);
    employmentSection.appendChild(householdWrap);
    questionGrid.appendChild(employmentSection);

    for (const group of QUESTION_GROUPS) {
      const groupSection = document.createElement("section");
      groupSection.className = "q-section q-section-full";

      const groupHead = document.createElement("div");
      groupHead.className = "q-section-head";

      const groupTitle = document.createElement("h3");
      groupTitle.textContent = group.title;
      groupHead.appendChild(groupTitle);

      const groupDescription = document.createElement("p");
      groupDescription.textContent = group.description;
      groupHead.appendChild(groupDescription);

      groupSection.appendChild(groupHead);

      const groupGrid = document.createElement("div");
      groupGrid.className = "q-group-grid";

      for (const key of group.keys) {
        const q = questionByKey[key];
        if (!q) continue;

        const wrap = document.createElement("div");
        wrap.className = "q";

        const label = document.createElement("label");
        label.textContent = q.title;

        wrap.appendChild(label);

        if (q.hint) {
          const hint = document.createElement("div");
          hint.className = "hint";
          hint.textContent = q.hint;
          wrap.appendChild(hint);
        }

        const sel = document.createElement("select");
        sel.setAttribute("data-key", q.key);

        for (const opt of q.options) {
          const o = document.createElement("option");
          o.value = opt.k;
          o.textContent = `(${opt.k}) ${opt.label}`;
          sel.appendChild(o);
        }

        sel.value = answers[q.key];

        sel.addEventListener("change", (e) => {
          const selectedKey = e.target.getAttribute("data-key");
          answers[selectedKey] = e.target.value;
          updateAll();
        });

        wrap.appendChild(sel);
        groupGrid.appendChild(wrap);
      }

      groupSection.appendChild(groupGrid);
      questionGrid.appendChild(groupSection);
    }
  }

  // -------------------- calc --------------------
  function calcAll(a) {
    return calcCore.calculateForecast(a, employmentNetIncome, { labels: CALC_LABELS });
  }

  // -------------------- sheet --------------------
  function sheetRow(label, value, opts = {}) {
    const row = document.createElement("div");
    row.className = "row";

    const l = document.createElement("span");
    l.textContent = label;

    const r = document.createElement("span");
    if (opts.strong) r.style.fontWeight = "700";
    if (opts.neg) r.className = "neg";
    r.textContent = value;

    row.appendChild(l);
    row.appendChild(r);
    return row;
  }

  function renderSheet(c) {
    sheetEl.innerHTML = "";

    sheetEl.appendChild(sheetRow("Curatorial fees", EUR(c.curatorial)));
    sheetEl.appendChild(sheetRow("Texts & publications", EUR(c.texts)));
    sheetEl.appendChild(sheetRow("Consulting / jury", EUR(c.consulting)));
    sheetEl.appendChild(sheetRow("Teaching", EUR(c.teaching)));
    sheetEl.appendChild(sheetRow("Grants / scholarships", EUR(c.grants)));

    sheetEl.appendChild(document.createElement("hr")).className = "sep";

    sheetEl.appendChild(sheetRow("Total revenue", EUR(c.revenue), { strong: true }));

    const sep2 = document.createElement("hr");
    sep2.className = "sep";
    sep2.style.marginTop = "10px";
    sheetEl.appendChild(sep2);

    sheetEl.appendChild(sheetRow("Fixed costs (annual)", EUR(c.fixAnnual)));
    sheetEl.appendChild(sheetRow("Variable project costs", EUR(c.varAnnual)));
    sheetEl.appendChild(sheetRow("Costs (fixed costs + variable project costs)", EUR(c.operatingCosts), { strong: true }));
    sheetEl.appendChild(sheetRow("Profit before taxes and social insurance", EUR(c.profitBeforeSv), { strong: true }));
    sheetEl.appendChild(
      sheetRow("Social insurance & provision (26% of profit before taxes)", EUR(c.svAnnual)),
    );
    sheetEl.appendChild(
      sheetRow(
        "Profit after social insurance, before tax",
        EUR(c.revenue - c.operatingCosts - c.svAnnual),
        { strong: true },
      ),
    );
    sheetEl.appendChild(
      sheetRow(
        "Austrian income tax (0–€13,308: 0%, €13,309–€21,617: 20%, €21,618–€35,836: 30%, €35,837–€69,166: 40%, €69,167–€103,072: 48%, €103,073–€1m: 50%, above €1m: 55%)",
        EUR(c.taxes),
      ),
    );

    sheetEl.appendChild(sheetRow("Profit after taxes and social insurance", EUR(c.profitAfterTax), { strong: true }));
    sheetEl.appendChild(sheetRow(`Reserves (${Math.round(c.reserveRate * 100)}%)`, EUR(c.reserves)));
    sheetEl.appendChild(sheetRow("Available before support", EUR(c.availableBeforeSupport), { strong: true }));
    sheetEl.appendChild(sheetRow("Annual net income from employment", EUR(c.employmentIncome)));
    sheetEl.appendChild(sheetRow("Additional support", EUR(c.support)));

    sheetEl.appendChild(sheetRow("Available annual income", EUR(c.available), { strong: true }));

    sheetEl.appendChild(document.createElement("hr")).className = "sep";

    sheetEl.appendChild(sheetRow("Target net", EUR(c.targetNet)));
    sheetEl.appendChild(sheetRow("Gap (available − target)", EUR(c.gap), { strong: true, neg: c.gap < 0 }));
  }

  // -------------------- charts --------------------
  let incomeChart = null;
  let costChart = null;

  function makePie(ctx, labels, values) {
    return new Chart(ctx, {
      type: "pie",
      data: {
        labels,
        datasets: [
          {
            data: values,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom" },
          tooltip: {
            callbacks: {
              label: function (context) {
                const v = Number(context.parsed) || 0;
                const total = context.dataset.data.reduce((a, b) => a + (Number(b) || 0), 0) || 1;
                const share = Math.round((v / total) * 100);
                return `${context.label}: ${EUR(v)} (${share}%)`;
              },
            },
          },
        },
      },
    });
  }

  function renderCharts(c) {
    const incomeLabels = c.incomePie.map((r) => r.name);
    const incomeValues = c.incomePie.map((r) => r.value);

    const costLabels = c.costPie.map((r) => r.name);
    const costValues = c.costPie.map((r) => r.value);

    // income
    if (incomeValues.length === 0) {
      incomeEmpty.style.display = "block";
      if (incomeChart) {
        incomeChart.destroy();
        incomeChart = null;
      }
    } else {
      incomeEmpty.style.display = "none";
      const ctx = document.getElementById("incomeChart").getContext("2d");
      if (incomeChart) incomeChart.destroy();
      incomeChart = makePie(ctx, incomeLabels, incomeValues);
    }

    // cost
    if (costValues.length === 0) {
      costEmpty.style.display = "block";
      if (costChart) {
        costChart.destroy();
        costChart = null;
      }
    } else {
      costEmpty.style.display = "none";
      const ctx = document.getElementById("costChart").getContext("2d");
      if (costChart) costChart.destroy();
      costChart = makePie(ctx, costLabels, costValues);
    }
  }

  // -------------------- update --------------------
  function updateAll() {
    const c = calcAll(answers);
    typologyLabelEl.textContent = c.typ.label;
    renderSheet(c);
    renderCharts(c);
    renderScenarioComparison();
    setSaveStatus("Not saved", null);
  }

  if (saveBtn) {
    saveBtn.addEventListener("click", submitSurvey);
  }

  if (loadScenarioBtn) {
    loadScenarioBtn.addEventListener("click", loadSelectedScenario);
  }

  if (compareSelectedBtn) {
    compareSelectedBtn.addEventListener("click", renderScenarioComparison);
  }

  if (compareScenarioListEl) {
    compareScenarioListEl.addEventListener("change", renderScenarioComparison);
  }

  if (clearCompareBtn && compareScenarioListEl) {
    clearCompareBtn.addEventListener("click", () => {
      Array.from(compareScenarioListEl.options).forEach((opt) => {
        opt.selected = false;
      });
      renderScenarioComparison();
    });
  }

  // -------------------- reset --------------------
  resetBtn.addEventListener("click", () => {
    answers = { ...DEFAULT };
    employmentNetIncome = DEFAULT_EMPLOYMENT_NET;
    householdPersons = DEFAULT_HOUSEHOLD_PERSONS;
    selectedScenarioId = "";
    // update selects
    document.querySelectorAll("select[data-key]").forEach((sel) => {
      const key = sel.getAttribute("data-key");
      sel.value = answers[key];
    });
    const employmentInput = document.getElementById("employmentNetIncome");
    if (employmentInput) employmentInput.value = String(employmentNetIncome);
    const householdInput = document.getElementById("householdPersons");
    if (householdInput) householdInput.value = String(householdPersons);
    if (scenarioNameInput) scenarioNameInput.value = "";
    if (scenarioListEl) scenarioListEl.value = "";
    if (compareScenarioListEl) {
      Array.from(compareScenarioListEl.options).forEach((opt) => {
        opt.selected = false;
      });
    }
    updateAll();
  });

  // -------------------- init --------------------
  function init() {
    renderQuestions();
    setSaveStatus("Not saved", null);
    if (medianAvailableIncomeEl) medianAvailableIncomeEl.textContent = "loading …";
    updateAll();
    loadMedianAvailableIncome();
    loadIncomeScenarios();
  }

  // Wait for Chart.js from CDN
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
