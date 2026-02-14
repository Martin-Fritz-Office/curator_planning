(function () {
  "use strict";

  const lang = document.body?.dataset?.lang === "de" ? "de" : "en";
  const EUR = (n) =>
    new Intl.NumberFormat(lang === "de" ? "de-AT" : "en-US", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(Math.round(Number(n) || 0));

  const labels = {
    de: {
      netToGross: "Nettoziel × SV/Steuerfaktor",
      requiredTurnover: "Benötigter Jahresumsatz",
      recommendedHourly: "Empfohlener Stundenhonorar-Satz",
      billability: "Verrechenbarkeitsquote",
      workingDays: "Arbeitstage nach Urlaub/Puffer",
      info: "Annahme: 8 h/Arbeitstag; Verrechenbarkeit via billable/non-billable Stunden.",
    },
    en: {
      netToGross: "Net target × social/tax factor",
      requiredTurnover: "Required annual turnover",
      recommendedHourly: "Recommended hourly rate",
      billability: "Billable share",
      workingDays: "Working days after vacation/buffer",
      info: "Assumption: 8 h/working day; billability derived from billable/non-billable hours.",
    },
  };

  const inputIds = [
    "targetNetIncome",
    "taxSocialFactor",
    "fixedCosts",
    "variableCosts",
    "billableHours",
    "nonBillableHours",
    "vacationWeeks",
    "bufferDays",
    "profitMargin",
    "riskMargin",
  ];

  const inputs = Object.fromEntries(
    inputIds.map((id) => [id, document.getElementById(id)])
  );
  const sheet = document.getElementById("hourlySheet");

  function n(id) {
    return Math.max(0, Number(inputs[id]?.value || 0));
  }

  function recalc() {
    const targetNetIncome = n("targetNetIncome");
    const taxSocialFactor = Math.max(1, n("taxSocialFactor"));
    const fixedCosts = n("fixedCosts");
    const variableCosts = n("variableCosts");
    const billableHours = Math.max(1, n("billableHours"));
    const nonBillableHours = n("nonBillableHours");
    const vacationWeeks = n("vacationWeeks");
    const bufferDays = n("bufferDays");
    const profitMargin = n("profitMargin") / 100;
    const riskMargin = n("riskMargin") / 100;

    const netToGrossIncome = targetNetIncome * taxSocialFactor;
    const baseRevenueNeed = netToGrossIncome + fixedCosts + variableCosts;
    const requiredTurnover = baseRevenueNeed * (1 + profitMargin) * (1 + riskMargin);
    const hourlyRate = requiredTurnover / billableHours;

    const totalHours = billableHours + nonBillableHours;
    const billability = totalHours > 0 ? billableHours / totalHours : 0;
    const workingDays = Math.max(0, 260 - vacationWeeks * 5 - bufferDays);

    sheet.innerHTML = `
      <div class="row"><span>${labels[lang].netToGross}</span><strong>${EUR(netToGrossIncome)}</strong></div>
      <div class="row"><span>${labels[lang].requiredTurnover}</span><strong>${EUR(requiredTurnover)}</strong></div>
      <div class="row"><span>${labels[lang].recommendedHourly}</span><strong>${EUR(hourlyRate)}</strong></div>
      <div class="row"><span>${labels[lang].billability}</span><strong>${(billability * 100).toFixed(1)}%</strong></div>
      <div class="row"><span>${labels[lang].workingDays}</span><strong>${workingDays}</strong></div>
      <p class="small muted">${labels[lang].info}</p>
    `;
  }

  for (const id of inputIds) {
    inputs[id]?.addEventListener("input", recalc);
  }

  recalc();
})();
