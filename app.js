/* Framework-free implementation of the Curator Prognosis Tool
   - Renders the questionnaire (A–D)
   - Computes revenue/cost/profit heuristics
   - Shows two pie charts via Chart.js (CDN)
*/

(function () {
  "use strict";

  const EUR = (n) =>
    new Intl.NumberFormat("de-AT", {
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
      title: "Dein primärer Tätigkeitsfokus?",
      options: [
        { k: "A", label: "Kuratieren von Ausstellungen (Institutionen)" },
        { k: "B", label: "Kuratieren + Text/Essay" },
        { k: "C", label: "Kuratieren + Projektmanagement" },
        { k: "D", label: "Kuratieren + Beratung/Strategie" },
      ],
    },
    {
      key: "q2",
      title: "Wie viele kuratorische Projekte pro Jahr realistisch?",
      options: [
        { k: "A", label: "3–4" },
        { k: "B", label: "5–6" },
        { k: "C", label: "7–9" },
        { k: "D", label: "10+" },
      ],
    },
    {
      key: "q3",
      title: "Durchschnittliches Honorar pro Projekt (brutto)?",
      options: [
        { k: "A", label: "unter 3.000 €" },
        { k: "B", label: "3.000–5.000 €" },
        { k: "C", label: "5.000–8.000 €" },
        { k: "D", label: "über 8.000 €" },
      ],
    },
    {
      key: "q4",
      title: "Wie oft arbeitest du mit öffentlichen Institutionen?",
      options: [
        { k: "A", label: "fast nie" },
        { k: "B", label: "gelegentlich" },
        { k: "C", label: "überwiegend" },
        { k: "D", label: "ausschließlich" },
      ],
      hint: "Indikator für Stabilität/Planbarkeit (keine harte Euro-Logik).",
    },
    {
      key: "q5",
      title: "Zusätzliche Einnahmen durch Texte (Kataloge, Essays)?",
      options: [
        { k: "A", label: "keine" },
        { k: "B", label: "bis 2.000 €/Jahr" },
        { k: "C", label: "2.000–6.000 €/Jahr" },
        { k: "D", label: "über 6.000 €/Jahr" },
      ],
    },
    {
      key: "q6",
      title: "Beratungs- oder Juror*innentätigkeiten?",
      options: [
        { k: "A", label: "nein" },
        { k: "B", label: "1–2/Jahr" },
        { k: "C", label: "3–5/Jahr" },
        { k: "D", label: "regelmäßig (>5)" },
      ],
    },
    {
      key: "q7",
      title: "Tagessatz bei Beratung/Jury (brutto)?",
      options: [
        { k: "A", label: "unter 300 €" },
        { k: "B", label: "300–450 €" },
        { k: "C", label: "450–650 €" },
        { k: "D", label: "über 650 €" },
      ],
    },
    {
      key: "q8",
      title: "Internationale Projekte (inkl. Reisen)?",
      options: [
        { k: "A", label: "keine" },
        { k: "B", label: "1/Jahr" },
        { k: "C", label: "2–3/Jahr" },
        { k: "D", label: "4+/Jahr" },
      ],
      hint: "Treiber für variable Kosten und Risikopuffer.",
    },
    {
      key: "q9",
      title: "Wer trägt Reisekosten?",
      options: [
        { k: "A", label: "meist ich selbst" },
        { k: "B", label: "geteilt" },
        { k: "C", label: "meist Auftraggeber*in" },
        { k: "D", label: "immer Auftraggeber*in" },
      ],
    },
    {
      key: "q10",
      title: "Förderungen/Stipendien pro Jahr?",
      options: [
        { k: "A", label: "keine" },
        { k: "B", label: "bis 5.000 €" },
        { k: "C", label: "5.000–15.000 €" },
        { k: "D", label: "über 15.000 €" },
      ],
    },
    {
      key: "q11",
      title: "Wie stabil ist deine Auftragslage?",
      options: [
        { k: "A", label: "stark schwankend" },
        { k: "B", label: "eher unsicher" },
        { k: "C", label: "relativ stabil" },
        { k: "D", label: "sehr stabil" },
      ],
      hint: "Beeinflusst den Sicherheitsabschlag (Konservativitätsfaktor).",
    },
    {
      key: "q12",
      title: "Wie viele unbezahlte Projekte pro Jahr?",
      options: [
        { k: "A", label: "0" },
        { k: "B", label: "1–2" },
        { k: "C", label: "3–4" },
        { k: "D", label: "5+" },
      ],
      hint: "Reduziert bezahlten Projektumfang.",
    },
    {
      key: "q13",
      title: "Arbeitszeit pro Woche (Ø)?",
      options: [
        { k: "A", label: "unter 25 h" },
        { k: "B", label: "25–35 h" },
        { k: "C", label: "35–45 h" },
        { k: "D", label: "über 45 h" },
      ],
    },
    {
      key: "q14",
      title: "Anteil Administratives/Buchhaltung?",
      options: [
        { k: "A", label: "<10 %" },
        { k: "B", label: "10–20 %" },
        { k: "C", label: "20–30 %" },
        { k: "D", label: ">30 %" },
      ],
    },
    {
      key: "q15",
      title: "Fixkosten pro Monat (Miete, Büro, Software)?",
      options: [
        { k: "A", label: "<300 €" },
        { k: "B", label: "300–600 €" },
        { k: "C", label: "600–1.000 €" },
        { k: "D", label: ">1.000 €" },
      ],
    },
    {
      key: "q16",
      title: "Variable Kosten pro Projekt (Reisen, Material)?",
      options: [
        { k: "A", label: "<200 €" },
        { k: "B", label: "200–500 €" },
        { k: "C", label: "500–1.000 €" },
        { k: "D", label: ">1.000 €" },
      ],
    },
    {
      key: "q17",
      title: "Wie viele Lehraufträge hast du pro Jahr?",
      options: [
        { k: "A", label: "0" },
        { k: "B", label: "1–2" },
        { k: "C", label: "3–4" },
        { k: "D", label: "5+" },
      ],
    },
    {
      key: "q18",
      title: "Durchschnittliches Honorar pro Lehrauftrag (brutto)?",
      options: [
        { k: "A", label: "unter 500 €" },
        { k: "B", label: "500–1.000 €" },
        { k: "C", label: "1.000–2.000 €" },
        { k: "D", label: "über 2.000 €" },
      ],
    },
    {
      key: "q19",
      title: "Gewünschtes Jahresnettoeinkommen?",
      options: [
        { k: "A", label: "<20.000 €" },
        { k: "B", label: "20.000–30.000 €" },
        { k: "C", label: "30.000–45.000 €" },
        { k: "D", label: ">45.000 €" },
      ],
      hint: "Nur für Gap-Analyse, nicht als Input für Umsatzberechnung.",
    },
    {
      key: "q20",
      title: "Risikobereitschaft für Akquise/Investitionen?",
      options: [
        { k: "A", label: "sehr gering" },
        { k: "B", label: "moderat" },
        { k: "C", label: "hoch" },
        { k: "D", label: "sehr hoch" },
      ],
      hint: "Beeinflusst empfohlene Rücklagenquote.",
    },
    {
      key: "q21",
      title: "Wirst du von jemandem anderen unterstützt?",
      options: [
        { k: "A", label: "nein" },
        { k: "B", label: "mit 3.600 €/Jahr" },
        { k: "C", label: "mit 6.000 €/Jahr" },
        { k: "D", label: "mit 12.000 €/Jahr" },
      ],
      hint: "Zusätzliche private oder institutionelle Unterstützung pro Jahr.",
    },
  ];

  const QUESTION_GROUPS = [
    {
      title: "Profil & Ausrichtung",
      description: "Grundausrichtung deiner kuratorischen Arbeit.",
      keys: ["q1", "q2", "q3", "q4"],
    },
    {
      title: "Einnahmenquellen",
      description: "Zusätzliche Erlösströme neben der klassischen Projektarbeit.",
      keys: ["q5", "q6", "q7", "q10", "q17", "q18", "q21"],
    },
    {
      title: "Auslastung & Planbarkeit",
      description: "Wie stabil und planbar dein Jahr ist.",
      keys: ["q8", "q9", "q11", "q12", "q13", "q14"],
    },
    {
      title: "Kosten, Risiko & Ziel",
      description: "Kostenstruktur, Risikoprofil und Einkommensziel.",
      keys: ["q15", "q16", "q19", "q20"],
    },
  ];

  // -------------------- shared calc core --------------------
  const calcCore = window.CuratorCalcCore;
  const CALC_LABELS = {
    income: [
      "Kuratorische Honorare",
      "Texte & Publikationen",
      "Beratung / Jury",
      "Lehre",
      "Förderungen / Stipendien",
      "Unterstützung",
    ],
    costs: ["Fixkosten", "Variable Projektkosten", "SV & Vorsorge", "Steuern"],
    typology: {
      precarious: "prekär",
      stable: "stabil",
      highlyProfessionalized: "hochprofessionalisiert",
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
      name: rawScenario.name || `Szenario ${rawScenario.id}`,
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
        name: "Aktueller Entwurf",
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
        medianAvailableIncomeEl.textContent = "Keine Daten";
        return;
      }

      medianAvailableIncomeEl.textContent = EUR(data.medianAvailableIncome || 0);
    } catch (err) {
      medianAvailableIncomeEl.textContent = "Fehler";
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
      placeholder.textContent = "Szenario laden …";
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
      scenarioListEl.innerHTML = '<option value="">Szenarien konnten nicht geladen werden</option>';
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
      setSaveStatus("Szenario geladen", "save-status-ok");
    } catch (err) {
      setSaveStatus("Szenario konnte nicht geladen werden", "save-status-error");
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
      { label: "Kuratorische Honorare", value: c.curatorial, formatted: EUR(c.curatorial) },
      { label: "Texte & Publikationen", value: c.texts, formatted: EUR(c.texts) },
      { label: "Beratung / Jury", value: c.consulting, formatted: EUR(c.consulting) },
      { label: "Lehre", value: c.teaching, formatted: EUR(c.teaching) },
      { label: "Förderungen / Stipendien", value: c.grants, formatted: EUR(c.grants) },
      { label: "Gesamtumsatz", value: c.revenue, formatted: EUR(c.revenue) },
      { label: "Fixkosten (jährlich)", value: c.fixAnnual, formatted: EUR(c.fixAnnual) },
      { label: "Variable Projektkosten", value: c.varAnnual, formatted: EUR(c.varAnnual) },
      { label: "Kosten (Fixkosten + variable Projektkosten)", value: c.operatingCosts, formatted: EUR(c.operatingCosts) },
      {
        label: "Gewinn vor Steuern und Sozialversicherung",
        value: c.profitBeforeSv,
        formatted: EUR(c.profitBeforeSv),
      },
      {
        label: "Sozialversicherung & Vorsorge (26% vom Gewinn vor Steuern)",
        value: c.svAnnual,
        formatted: EUR(c.svAnnual),
      },
      {
        label: "Gewinn nach Sozialversicherung vor Steuer",
        value: c.revenue - c.operatingCosts - c.svAnnual,
        formatted: EUR(c.revenue - c.operatingCosts - c.svAnnual),
      },
      {
        label:
          "Einkommensteuer Österreich (0–13.308 €: 0%, 13.309–21.617 €: 20%, 21.618–35.836 €: 30%, 35.837–69.166 €: 40%, 69.167–103.072 €: 48%, 103.073–1 Mio. €: 50%, über 1 Mio. €: 55%)",
        value: c.taxes,
        formatted: EUR(c.taxes),
      },
      {
        label: "Gewinn nach Steuern und Sozialversicherung",
        value: c.profitAfterTax,
        formatted: EUR(c.profitAfterTax),
      },
      { label: `Rücklagen (${Math.round(c.reserveRate * 100)}%)`, value: c.reserves, formatted: EUR(c.reserves) },
      {
        label: "Verfügbar vor Unterstützung",
        value: c.availableBeforeSupport,
        formatted: EUR(c.availableBeforeSupport),
      },
      { label: "Nettoeinkommen aus der Anstellung", value: c.employmentIncome, formatted: EUR(c.employmentIncome) },
      { label: "Zusätzliche Unterstützung", value: c.support, formatted: EUR(c.support) },
      { label: "Verfügbares Jahreseinkommen", value: c.available, formatted: EUR(c.available) },
      { label: "Ziel-Netto", value: c.targetNet, formatted: EUR(c.targetNet) },
      { label: "Gap (verfügbar − Ziel)", value: c.gap, formatted: EUR(c.gap) },
    ];
  }

  function buildSurveyPayload(c) {
    return {
      locale: "de",
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
    setSaveStatus("Speichert …", "save-status-pending");
    if (saveBtn) saveBtn.disabled = true;

    try {
      const res = await fetch("submit_survey.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildSurveyPayload(c)),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        const msg = data && data.error ? data.error : "Speichern fehlgeschlagen";
        throw new Error(msg);
      }
      setSaveStatus(`Gespeichert (#${data.id})`, "save-status-ok");
      await loadMedianAvailableIncome();
      await loadIncomeScenarios();
    } catch (err) {
      setSaveStatus(`Fehler: ${err.message || "Speichern fehlgeschlagen"}`, "save-status-error");
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
      "Bist du irgendwo fest angestellt? Wenn ja, wie hoch ist dein Nettojahreseinkommen?";
    employmentWrap.appendChild(employmentLabel);

    const employmentHint = document.createElement("div");
    employmentHint.className = "hint";
    employmentHint.textContent =
      "Bitte Zahl eingeben. Dieser Betrag wird nur separat ausgewiesen (kein Umsatz, keine Sozialversicherung, keine Steuerlogik).";
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
    householdLabel.textContent = "Für wie viele Personen soll gerechnet werden?";
    householdWrap.appendChild(householdLabel);

    const householdHint = document.createElement("div");
    householdHint.className = "hint";
    householdHint.textContent = "Optional für deine Dokumentation im Fragebogen (ohne Einfluss auf die Berechnung).";
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
    employmentTitle.textContent = "Anstellung";
    employmentHead.appendChild(employmentTitle);

    const employmentDescription = document.createElement("p");
    employmentDescription.textContent = "Optionaler Zusatzbetrag außerhalb der Selbstständigkeit.";
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

    sheetEl.appendChild(sheetRow("Kuratorische Honorare", EUR(c.curatorial)));
    sheetEl.appendChild(sheetRow("Texte & Publikationen", EUR(c.texts)));
    sheetEl.appendChild(sheetRow("Beratung / Jury", EUR(c.consulting)));
    sheetEl.appendChild(sheetRow("Lehre", EUR(c.teaching)));
    sheetEl.appendChild(sheetRow("Förderungen / Stipendien", EUR(c.grants)));

    sheetEl.appendChild(document.createElement("hr")).className = "sep";

    sheetEl.appendChild(sheetRow("Gesamtumsatz", EUR(c.revenue), { strong: true }));

    const sep2 = document.createElement("hr");
    sep2.className = "sep";
    sep2.style.marginTop = "10px";
    sheetEl.appendChild(sep2);

    sheetEl.appendChild(sheetRow("Fixkosten (jährlich)", EUR(c.fixAnnual)));
    sheetEl.appendChild(sheetRow("Variable Projektkosten", EUR(c.varAnnual)));
    sheetEl.appendChild(sheetRow("Kosten (Fixkosten + variable Projektkosten)", EUR(c.operatingCosts), { strong: true }));
    sheetEl.appendChild(sheetRow("Gewinn vor Steuern und Sozialversicherung", EUR(c.profitBeforeSv), { strong: true }));
    sheetEl.appendChild(
      sheetRow("Sozialversicherung & Vorsorge (26% vom Gewinn vor Steuern)", EUR(c.svAnnual)),
    );
    sheetEl.appendChild(
      sheetRow(
        "Gewinn nach Sozialversicherung vor Steuer",
        EUR(c.revenue - c.operatingCosts - c.svAnnual),
        { strong: true },
      ),
    );
    sheetEl.appendChild(
      sheetRow(
        "Einkommensteuer Österreich (0–13.308 €: 0%, 13.309–21.617 €: 20%, 21.618–35.836 €: 30%, 35.837–69.166 €: 40%, 69.167–103.072 €: 48%, 103.073–1 Mio. €: 50%, über 1 Mio. €: 55%)",
        EUR(c.taxes),
      ),
    );

    sheetEl.appendChild(sheetRow("Gewinn nach Steuern und Sozialversicherung", EUR(c.profitAfterTax), { strong: true }));
    sheetEl.appendChild(sheetRow(`Rücklagen (${Math.round(c.reserveRate * 100)}%)`, EUR(c.reserves)));
    sheetEl.appendChild(sheetRow("Verfügbar vor Unterstützung", EUR(c.availableBeforeSupport), { strong: true }));
    sheetEl.appendChild(sheetRow("Nettoeinkommen aus der Anstellung", EUR(c.employmentIncome)));
    sheetEl.appendChild(sheetRow("Zusätzliche Unterstützung", EUR(c.support)));

    sheetEl.appendChild(sheetRow("Verfügbares Jahreseinkommen", EUR(c.available), { strong: true }));

    sheetEl.appendChild(document.createElement("hr")).className = "sep";

    sheetEl.appendChild(sheetRow("Ziel-Netto", EUR(c.targetNet)));
    sheetEl.appendChild(sheetRow("Gap (verfügbar − Ziel)", EUR(c.gap), { strong: true, neg: c.gap < 0 }));
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
    setSaveStatus("Nicht gespeichert", null);
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
    setSaveStatus("Nicht gespeichert", null);
    if (medianAvailableIncomeEl) medianAvailableIncomeEl.textContent = "lädt …";
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
