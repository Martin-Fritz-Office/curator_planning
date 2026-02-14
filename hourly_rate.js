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
      billableHoursYear: "Verrechenbare Stunden/Jahr",
      billableHoursMonth: "Verrechenbare Stunden/Monat",
      billableRatio: "Verrechenbarkeitsquote",
      monthlyNeedNet: "Monatlicher Bedarf privat netto",
      monthlyNeedGross: "Monatlicher Bedarf privat brutto",
      monthlyTarget: "Monatliches Ziel (Bedarf privat brutto + Betriebskosten)",
      recommendedHourly: "Empfohlener Stundenhonorar-Satz",
      info: "Formel: Bedarf brutto = Bedarf privat netto × Multiplikator; Stundenhonorar = (Bedarf brutto + monatliche Kosten) ÷ verrechenbare Stunden pro Monat.",
    },
    en: {
      yearlyHours: "Yearly hours (weekly hours × 52)",
      workingHours: "Working hours after vacation/sickness",
      billableHoursYear: "Billable hours per year",
      billableHoursMonth: "Billable hours per month",
      billableRatio: "Billable share",
      monthlyNeedNet: "Monthly private net need",
      monthlyNeedGross: "Monthly private gross need",
      monthlyTarget: "Monthly target (gross private need + costs)",
      recommendedHourly: "Recommended hourly rate",
      info: "Formula: Gross need = private net need × multiplier; Hourly rate = (gross monthly need + monthly costs) ÷ billable monthly hours.",
    },
  };

  const inputIds = [
    "monthlyNeed",
    "professionalCosts",
    "taxMultiplier",
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
    const monthlyNeedNet = n("monthlyNeed");
    const professionalCosts = n("professionalCosts");
    const taxMultiplier = Math.min(1.8, Math.max(1.5, n("taxMultiplier") || 1.6));
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
    const billableHoursYear = Math.max(1, workingHours * billableRatio);
    const billableHoursMonth = Math.max(1, billableHoursYear / 12);
    const monthlyNeedGross = monthlyNeedNet * taxMultiplier;
    const monthlyTarget = monthlyNeedGross + professionalCosts;
    const hourlyRate = monthlyTarget / billableHoursMonth;

    sheet.innerHTML = `
      <div class="row"><span>${labels[lang].yearlyHours}</span><strong>${yearlyHours.toFixed(0)} h</strong></div>
      <div class="row"><span>${labels[lang].workingHours}</span><strong>${workingHours.toFixed(0)} h</strong></div>
      <div class="row"><span>${labels[lang].billableHoursYear}</span><strong>${billableHoursYear.toFixed(0)} h</strong></div>
      <div class="row"><span>${labels[lang].billableHoursMonth}</span><strong>${billableHoursMonth.toFixed(1)} h</strong></div>
      <div class="row"><span>${labels[lang].billableRatio}</span><strong>${(billableRatio * 100).toFixed(1)}%</strong></div>
      <div class="row"><span>${labels[lang].monthlyNeedNet}</span><strong>${EUR(monthlyNeedNet)}</strong></div>
      <div class="row"><span>${labels[lang].monthlyNeedGross}</span><strong>${EUR(monthlyNeedGross)}</strong></div>
      <div class="row"><span>${labels[lang].monthlyTarget}</span><strong>${EUR(monthlyTarget)}</strong></div>
      <div class="row"><span>${labels[lang].recommendedHourly}</span><strong>${EUR(hourlyRate)}</strong></div>
      <p class="small muted">${labels[lang].info}</p>
    `;
  }

  for (const id of inputIds) {
    inputs[id]?.addEventListener("input", recalc);
  }

  recalc();
})();
