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
  const DEFAULT = {
    q1: "B",
    q2: "B",
    q3: "C",
    q4: "B",
    q5: "B",
    q6: "B",
    q7: "C",
    q8: "B",
    q9: "B",
    q10: "B",
    q11: "B",
    q12: "B",
    q13: "C",
    q14: "B",
    q15: "B",
    q16: "B",
    q17: "B",
    q18: "B",
    q19: "C",
    q20: "B",
    q21: "A",
  };

  const DEFAULT_EMPLOYMENT_NET = 0;

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

  // -------------------- mapping --------------------
  const mapProjects = (o) => ({ A: 4, B: 6, C: 8, D: 11 })[o];
  const mapPaidShare = (o) => ({ A: 1.0, B: 0.85, C: 0.7, D: 0.55 })[o];

  const mapFeePerProject = (o) => ({ A: 2500, B: 4000, C: 6500, D: 9000 })[o];
  const mapTextIncome = (o) => ({ A: 0, B: 1200, C: 4000, D: 8000 })[o];

  const mapConsultCount = (o) => ({ A: 0, B: 1.5, C: 4, D: 7.5 })[o];
  const mapDayRate = (o) => ({ A: 250, B: 375, C: 550, D: 750 })[o];
  const mapTeachingAssignments = (o) => ({ A: 0, B: 1.5, C: 3.5, D: 5.5 })[o];
  const mapTeachingFee = (o) => ({ A: 400, B: 750, C: 1500, D: 2500 })[o];

  const mapGrants = (o) => ({ A: 0, B: 2500, C: 10000, D: 20000 })[o];
  const mapSupportIncome = (o) => ({ A: 0, B: 3600, C: 6000, D: 12000 })[o];

  const mapFixMonthly = (o) => ({ A: 200, B: 450, C: 800, D: 1200 })[o];
  const mapVarPerProject = (o) => ({ A: 150, B: 350, C: 750, D: 1200 })[o];
  const mapTravelCostShare = (o) => ({ A: 1.0, B: 0.6, C: 0.3, D: 0.1 })[o];

  const mapStabilityFactor = (o) => ({ A: 0.82, B: 0.9, C: 0.95, D: 1.0 })[o];

  const mapTargetNet = (o) => ({ A: 18000, B: 26000, C: 37500, D: 52000 })[o];

  const mapReserveRate = (o) => ({ A: 0.15, B: 0.12, C: 0.1, D: 0.08 })[o];

  const clamp01 = (n) => Math.max(0, Math.min(1, n));

  const scoreTypology = (a) => {
    const v =
      (mapFeePerProject(a.q3) / 9000) * 0.35 +
      ({ A: 0.1, B: 0.35, C: 0.7, D: 1.0 })[a.q11] * 0.35 +
      (mapProjects(a.q2) / 11) * 0.2 +
      (mapConsultCount(a.q6) / 7.5) * 0.1;

    const s = clamp01(v);
    if (s < 0.33) return { label: "prekär", score: s };
    if (s < 0.66) return { label: "stabil", score: s };
    return { label: "hochprofessionalisiert", score: s };
  };

  const sum = (rows) => rows.reduce((acc, r) => acc + (Number(r.value) || 0), 0);

  function calcAustrianIncomeTax2025(income) {
    const taxableIncome = Math.max(0, Number(income) || 0);
    const brackets = [
      { lower: 0, upper: 13308, rate: 0 },
      { lower: 13308, upper: 21617, rate: 0.2 },
      { lower: 21617, upper: 35836, rate: 0.3 },
      { lower: 35836, upper: 69166, rate: 0.4 },
      { lower: 69166, upper: 103072, rate: 0.48 },
      { lower: 103072, upper: 1000000, rate: 0.5 },
      { lower: 1000000, upper: Number.POSITIVE_INFINITY, rate: 0.55 },
    ];

    let tax = 0;
    for (const b of brackets) {
      if (taxableIncome <= b.lower) continue;
      const taxablePart = Math.min(taxableIncome, b.upper) - b.lower;
      tax += taxablePart * b.rate;
    }
    return tax;
  }

  // -------------------- state --------------------
  /** @type {Record<string, Opt>} */
  let answers = { ...DEFAULT };
  let employmentNetIncome = DEFAULT_EMPLOYMENT_NET;
  let selectedScenarioId = "";

  // -------------------- DOM --------------------
  const questionGrid = document.getElementById("questionGrid");
  const sheetEl = document.getElementById("sheet");
  const resetBtn = document.getElementById("resetBtn");
  const saveBtn = document.getElementById("saveBtn");
  const saveStatusEl = document.getElementById("saveStatus");
  const scenarioNameInput = document.getElementById("scenarioName");
  const scenarioListEl = document.getElementById("scenarioList");
  const loadScenarioBtn = document.getElementById("loadScenarioBtn");
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

      medianAvailableIncomeEl.textContent = data.formattedMedianAvailableIncome || EUR(data.medianAvailableIncome || 0);
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

      const placeholder = document.createElement("option");
      placeholder.value = "";
      placeholder.textContent = "Szenario laden …";
      scenarioListEl.appendChild(placeholder);

      for (const scenario of data.scenarios || []) {
        const opt = document.createElement("option");
        opt.value = String(scenario.id);
        opt.textContent = `${scenario.name} (${scenario.totalIncomeFormatted || EUR(scenario.totalIncome || 0)})`;
        opt.dataset.answers = JSON.stringify(scenario.answers || {});
        opt.dataset.employmentNetIncome = String(scenario.employmentNetIncome || 0);
        scenarioListEl.appendChild(opt);
      }

      scenarioListEl.value = selectedScenarioId;
    } catch (err) {
      scenarioListEl.innerHTML = '<option value="">Szenarien konnten nicht geladen werden</option>';
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
      selectedScenarioId = selectedOption.value;

      document.querySelectorAll("select[data-key]").forEach((sel) => {
        const key = sel.getAttribute("data-key");
        sel.value = answers[key] || DEFAULT[key];
      });

      const employmentInput = document.getElementById("employmentNetIncome");
      if (employmentInput) employmentInput.value = String(employmentNetIncome);

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
    const employmentIncome = Math.max(0, Number(employmentNetIncome) || 0);
    const projects = mapProjects(a.q2);
    const paidProjects = Math.max(0, projects * mapPaidShare(a.q12));

    const feePerProject = mapFeePerProject(a.q3);

    const stability = mapStabilityFactor(a.q11);
    const curatorial = paidProjects * feePerProject * stability;

    const texts = mapTextIncome(a.q5) * stability;

    const consultCount = mapConsultCount(a.q6);
    const dayRate = mapDayRate(a.q7);
    const consulting = consultCount * dayRate * stability;

    const teachingAssignments = mapTeachingAssignments(a.q17);
    const teachingFee = mapTeachingFee(a.q18);
    const teaching = teachingAssignments * teachingFee * stability;

    const grants = mapGrants(a.q10);
    const support = mapSupportIncome(a.q21);

    const revenue = curatorial + texts + consulting + teaching + grants;

    const fixAnnual = mapFixMonthly(a.q15) * 12;

    const travelShare = mapTravelCostShare(a.q9);
    const varAnnual = paidProjects * mapVarPerProject(a.q16) * travelShare;

    const profitBeforeSv = revenue - fixAnnual - varAnnual;
    const svAnnual = Math.max(0, profitBeforeSv) * 0.26;

    const taxableProfit = profitBeforeSv - svAnnual;
    const taxes = calcAustrianIncomeTax2025(taxableProfit);

    const operatingCosts = fixAnnual + varAnnual;
    const totalCosts = operatingCosts + svAnnual + taxes;
    const profitAfterTax = profitBeforeSv - svAnnual - taxes;

    const reserveRate = mapReserveRate(a.q20);
    const reserves = Math.max(0, profitAfterTax) * reserveRate;
    const availableBeforeSupport = profitAfterTax - reserves;
    const available = availableBeforeSupport + support + employmentIncome;

    const targetNet = mapTargetNet(a.q19);
    const gap = available - targetNet;

    const typ = scoreTypology(a);

    const incomePie = [
      { name: "Kuratorische Honorare", value: Math.max(0, curatorial) },
      { name: "Texte & Publikationen", value: Math.max(0, texts) },
      { name: "Beratung / Jury", value: Math.max(0, consulting) },
      { name: "Lehre", value: Math.max(0, teaching) },
      { name: "Förderungen / Stipendien", value: Math.max(0, grants) },
      { name: "Unterstützung", value: Math.max(0, support) },
    ].filter((d) => d.value > 0);

    const costPie = [
      { name: "Fixkosten", value: Math.max(0, fixAnnual) },
      { name: "Variable Projektkosten", value: Math.max(0, varAnnual) },
      { name: "SV & Vorsorge", value: Math.max(0, svAnnual) },
      { name: "Steuern", value: Math.max(0, taxes) },
    ].filter((d) => d.value > 0);

    return {
      projects,
      paidProjects,
      feePerProject,
      stability,
      curatorial,
      texts,
      consulting,
      teaching,
      grants,
      support,
      employmentIncome,
      revenue,
      fixAnnual,
      varAnnual,
      operatingCosts,
      profitBeforeSv,
      svAnnual,
      taxes,
      totalCosts,
      profitAfterTax,
      reserves,
      availableBeforeSupport,
      available,
      targetNet,
      gap,
      typ,
      incomePie,
      costPie,
      reserveRate,
      incomeTotal: sum(incomePie),
      costTotal: sum(costPie),
    };
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
    setSaveStatus("Nicht gespeichert", null);
  }

  if (saveBtn) {
    saveBtn.addEventListener("click", submitSurvey);
  }

  if (loadScenarioBtn) {
    loadScenarioBtn.addEventListener("click", loadSelectedScenario);
  }

  // -------------------- reset --------------------
  resetBtn.addEventListener("click", () => {
    answers = { ...DEFAULT };
    employmentNetIncome = DEFAULT_EMPLOYMENT_NET;
    selectedScenarioId = "";
    // update selects
    document.querySelectorAll("select[data-key]").forEach((sel) => {
      const key = sel.getAttribute("data-key");
      sel.value = answers[key];
    });
    const employmentInput = document.getElementById("employmentNetIncome");
    if (employmentInput) employmentInput.value = String(employmentNetIncome);
    if (scenarioNameInput) scenarioNameInput.value = "";
    if (scenarioListEl) scenarioListEl.value = "";
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
