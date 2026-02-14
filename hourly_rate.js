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
      yearlyHours: "Jahresstunden (Wochenstunden × 52)",
      workingHours: "Arbeitsstunden nach Urlaub/Krankheit",
      billableHours: "Verrechenbare Stunden/Jahr",
      billableRatio: "Verrechenbarkeitsquote",
      annualNeed: "Jahresbedarf (Monat × 12)",
      recommendedHourly: "Empfohlener Stundenhonorar-Satz",
      info: "Formel: Jahresstunden = Wochenstunden × 52; Arbeitsstunden = Jahresstunden − freie Wochen − Krankenwochen; Verrechenbare Stunden = Arbeitsstunden × (verrechenbare Stunden/Wochenstunden).",
    },
    en: {
      yearlyHours: "Yearly hours (weekly hours × 52)",
      workingHours: "Working hours after vacation/sickness",
      billableHours: "Billable hours per year",
      billableRatio: "Billable share",
      annualNeed: "Annual need (monthly × 12)",
      recommendedHourly: "Recommended hourly rate",
      info: "Formula: Yearly hours = weekly hours × 52; Working hours = yearly hours − vacation weeks − sick weeks; Billable hours = working hours × (billable weekly hours/weekly hours).",
    },
  };

  const inputIds = [
    "monthlyNeed",
    "professionalCosts",
    "weeklyHours",
    "billableWeeklyHours",
    "vacationWeeks",
    "sickWeeks",
  ];

  const inputs = Object.fromEntries(
    inputIds.map((id) => [id, document.getElementById(id)])
  );
  const sheet = document.getElementById("hourlySheet");

  function n(id) {
    return Math.max(0, Number(inputs[id]?.value || 0));
  }

  function recalc() {
    const monthlyNeed = n("monthlyNeed");
    const professionalCosts = n("professionalCosts");
    const weeklyHours = Math.max(1, n("weeklyHours"));
    const billableWeeklyHours = Math.min(n("billableWeeklyHours"), weeklyHours);
    const vacationWeeks = n("vacationWeeks");
    const sickWeeks = n("sickWeeks");

    const yearlyHours = weeklyHours * 52;
    const workingHours = Math.max(
      0,
      yearlyHours - vacationWeeks * weeklyHours - sickWeeks * weeklyHours
    );
    const billableRatio = weeklyHours > 0 ? billableWeeklyHours / weeklyHours : 0;
    const billableHours = Math.max(1, workingHours * billableRatio);
    const annualNeed = (monthlyNeed + professionalCosts) * 12;
    const hourlyRate = annualNeed / billableHours;

    sheet.innerHTML = `
      <div class="row"><span>${labels[lang].yearlyHours}</span><strong>${yearlyHours.toFixed(0)} h</strong></div>
      <div class="row"><span>${labels[lang].workingHours}</span><strong>${workingHours.toFixed(0)} h</strong></div>
      <div class="row"><span>${labels[lang].billableHours}</span><strong>${billableHours.toFixed(0)} h</strong></div>
      <div class="row"><span>${labels[lang].billableRatio}</span><strong>${(billableRatio * 100).toFixed(1)}%</strong></div>
      <div class="row"><span>${labels[lang].annualNeed}</span><strong>${EUR(annualNeed)}</strong></div>
      <div class="row"><span>${labels[lang].recommendedHourly}</span><strong>${EUR(hourlyRate)}</strong></div>
      <p class="small muted">${labels[lang].info}</p>
    `;
  }

  for (const id of inputIds) {
    inputs[id]?.addEventListener("input", recalc);
  }

  recalc();
})();
