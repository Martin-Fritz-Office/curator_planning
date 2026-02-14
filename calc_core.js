(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
    return;
  }
  root.CuratorCalcCore = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const DEFAULT_ANSWERS = {
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

  const MAP = {
    projects: { A: 4, B: 6, C: 8, D: 11 },
    paidShare: { A: 1.0, B: 0.85, C: 0.7, D: 0.55 },
    feePerProject: { A: 2500, B: 4000, C: 6500, D: 9000 },
    textIncome: { A: 0, B: 1200, C: 4000, D: 8000 },
    consultCount: { A: 0, B: 1.5, C: 4, D: 7.5 },
    dayRate: { A: 250, B: 375, C: 550, D: 750 },
    teachingAssignments: { A: 0, B: 1.5, C: 3.5, D: 5.5 },
    teachingFee: { A: 400, B: 750, C: 1500, D: 2500 },
    grants: { A: 0, B: 2500, C: 10000, D: 20000 },
    supportIncome: { A: 0, B: 3600, C: 6000, D: 12000 },
    fixMonthly: { A: 200, B: 450, C: 800, D: 1200 },
    varPerProject: { A: 150, B: 350, C: 750, D: 1200 },
    travelCostShare: { A: 1.0, B: 0.6, C: 0.3, D: 0.1 },
    stabilityFactor: { A: 0.82, B: 0.9, C: 0.95, D: 1.0 },
    targetNet: { A: 18000, B: 26000, C: 37500, D: 52000 },
    reserveRate: { A: 0.15, B: 0.12, C: 0.1, D: 0.08 },
    typologyStabilityScore: { A: 0.1, B: 0.35, C: 0.7, D: 1.0 },
  };

  const DEFAULT_LABELS = {
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

  const sum = (rows) => rows.reduce((acc, r) => acc + (Number(r.value) || 0), 0);
  const clamp01 = (n) => Math.max(0, Math.min(1, n));

  function calculateAustrianIncomeTax2025(income) {
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

  function scoreTypology(answers, labels) {
    const v =
      (MAP.feePerProject[answers.q3] / 9000) * 0.35 +
      MAP.typologyStabilityScore[answers.q11] * 0.35 +
      (MAP.projects[answers.q2] / 11) * 0.2 +
      (MAP.consultCount[answers.q6] / 7.5) * 0.1;

    const s = clamp01(v);
    if (s < 0.33) return { label: labels.precarious, score: s };
    if (s < 0.66) return { label: labels.stable, score: s };
    return { label: labels.highlyProfessionalized, score: s };
  }

  function calculateForecast(answersInput, employmentIncomeInput, options = {}) {
    const answers = { ...DEFAULT_ANSWERS, ...(answersInput || {}) };
    const labels = {
      income: options.labels && Array.isArray(options.labels.income) ? options.labels.income : DEFAULT_LABELS.income,
      costs: options.labels && Array.isArray(options.labels.costs) ? options.labels.costs : DEFAULT_LABELS.costs,
      typology: options.labels && options.labels.typology ? options.labels.typology : DEFAULT_LABELS.typology,
    };

    const employmentIncome = Math.max(0, Number(employmentIncomeInput) || 0);
    const projects = MAP.projects[answers.q2];
    const paidProjects = Math.max(0, projects * MAP.paidShare[answers.q12]);

    const feePerProject = MAP.feePerProject[answers.q3];

    const stability = MAP.stabilityFactor[answers.q11];
    const curatorial = paidProjects * feePerProject * stability;

    const texts = MAP.textIncome[answers.q5] * stability;

    const consultCount = MAP.consultCount[answers.q6];
    const dayRate = MAP.dayRate[answers.q7];
    const consulting = consultCount * dayRate * stability;

    const teachingAssignments = MAP.teachingAssignments[answers.q17];
    const teachingFee = MAP.teachingFee[answers.q18];
    const teaching = teachingAssignments * teachingFee * stability;

    const grants = MAP.grants[answers.q10];
    const support = MAP.supportIncome[answers.q21];

    const revenue = curatorial + texts + consulting + teaching + grants;

    const fixAnnual = MAP.fixMonthly[answers.q15] * 12;

    const travelShare = MAP.travelCostShare[answers.q9];
    const varAnnual = paidProjects * MAP.varPerProject[answers.q16] * travelShare;

    const profitBeforeSv = revenue - fixAnnual - varAnnual;
    const svAnnual = Math.max(0, profitBeforeSv) * 0.26;

    const taxableProfit = profitBeforeSv - svAnnual;
    const taxes = calculateAustrianIncomeTax2025(taxableProfit);

    const operatingCosts = fixAnnual + varAnnual;
    const totalCosts = operatingCosts + svAnnual + taxes;
    const profitAfterTax = profitBeforeSv - svAnnual - taxes;

    const reserveRate = MAP.reserveRate[answers.q20];
    const reserves = Math.max(0, profitAfterTax) * reserveRate;
    const availableBeforeSupport = profitAfterTax - reserves;
    const available = availableBeforeSupport + support + employmentIncome;

    const targetNet = MAP.targetNet[answers.q19];
    const gap = available - targetNet;

    const typ = scoreTypology(answers, labels.typology);

    const incomePie = [
      { name: labels.income[0], value: Math.max(0, curatorial) },
      { name: labels.income[1], value: Math.max(0, texts) },
      { name: labels.income[2], value: Math.max(0, consulting) },
      { name: labels.income[3], value: Math.max(0, teaching) },
      { name: labels.income[4], value: Math.max(0, grants) },
      { name: labels.income[5], value: Math.max(0, support) },
    ].filter((d) => d.value > 0);

    const costPie = [
      { name: labels.costs[0], value: Math.max(0, fixAnnual) },
      { name: labels.costs[1], value: Math.max(0, varAnnual) },
      { name: labels.costs[2], value: Math.max(0, svAnnual) },
      { name: labels.costs[3], value: Math.max(0, taxes) },
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

  return {
    DEFAULT_ANSWERS,
    calculateAustrianIncomeTax2025,
    calculateForecast,
  };
});
