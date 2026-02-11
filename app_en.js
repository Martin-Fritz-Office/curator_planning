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
    if (s < 0.33) return { label: "precarious", score: s };
    if (s < 0.66) return { label: "stable", score: s };
    return { label: "highly professionalized", score: s };
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

  // -------------------- DOM --------------------
  const questionGrid = document.getElementById("questionGrid");
  const sheetEl = document.getElementById("sheet");
  const resetBtn = document.getElementById("resetBtn");
  const typologyLabelEl = document.getElementById("typologyLabel");

  const incomeEmpty = document.getElementById("incomeEmpty");
  const costEmpty = document.getElementById("costEmpty");

  // -------------------- render questions --------------------
  function renderQuestions() {
    questionGrid.innerHTML = "";
    for (const q of QUESTIONS) {
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
        const key = e.target.getAttribute("data-key");
        answers[key] = e.target.value;
        updateAll();
      });

      wrap.appendChild(sel);
      questionGrid.appendChild(wrap);
    }
  }

  // -------------------- calc --------------------
  function calcAll(a) {
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
    const available = availableBeforeSupport + support;

    const targetNet = mapTargetNet(a.q19);
    const gap = available - targetNet;

    const typ = scoreTypology(a);

    const incomePie = [
      { name: "Curatorial fees", value: Math.max(0, curatorial) },
      { name: "Texts & publications", value: Math.max(0, texts) },
      { name: "Consulting / jury", value: Math.max(0, consulting) },
      { name: "Teaching", value: Math.max(0, teaching) },
      { name: "Grants / scholarships", value: Math.max(0, grants) },
      { name: "Support", value: Math.max(0, support) },
    ].filter((d) => d.value > 0);

    const costPie = [
      { name: "Fixed costs", value: Math.max(0, fixAnnual) },
      { name: "Variable project costs", value: Math.max(0, varAnnual) },
      { name: "Social insurance & provision", value: Math.max(0, svAnnual) },
      { name: "Taxes", value: Math.max(0, taxes) },
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
  }

  // -------------------- reset --------------------
  resetBtn.addEventListener("click", () => {
    answers = { ...DEFAULT };
    // update selects
    document.querySelectorAll("select[data-key]").forEach((sel) => {
      const key = sel.getAttribute("data-key");
      sel.value = answers[key];
    });
    updateAll();
  });

  // -------------------- init --------------------
  function init() {
    renderQuestions();
    updateAll();
  }

  // Wait for Chart.js from CDN
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
