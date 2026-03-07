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
      effectiveTaxMultiplier: "Effektiver Steuermultiplikator",
      monthlyNeedNet: "Monatlicher Bedarf privat netto",
      monthlyNeedGross: "Monatlicher Bedarf privat brutto",
      monthlyTarget: "Monatliches Ziel (Bedarf privat brutto + Betriebskosten)",
      recommendedHourly: "Mindestsatz (empfohlenes Stundenhonorar)",
      negotiationTarget: "Verhandlungsziel (+20 % Risikopuffer)",
      info: "Formel: Bedarf brutto = Nettobedarf × Multiplikator; verrechenbare Stunden = (Jahresstunden − Urlaub/Krankheit) × (1 − Akquise/Verwaltungsanteil); Mindestsatz = (Bedarf brutto + Kosten) ÷ verrechenbare Stunden/Monat.",
    },
    en: {
      yearlyHours: "Yearly hours (weekly hours × 52)",
      workingHours: "Working hours after vacation/sickness",
      billableHoursYear: "Billable hours per year",
      billableHoursMonth: "Billable hours per month",
      effectiveTaxMultiplier: "Effective tax multiplier",
      monthlyNeedNet: "Monthly private net need",
      monthlyNeedGross: "Monthly private gross need",
      monthlyTarget: "Monthly target (gross private need + costs)",
      recommendedHourly: "Minimum rate (recommended hourly rate)",
      negotiationTarget: "Negotiation target (+20% risk buffer)",
      info: "Formula: Gross need = net need × multiplier; billable hours = (yearly hours − vacation/sickness) × (1 − acquisition/admin share); minimum rate = (gross need + costs) ÷ monthly billable hours.",
    },
  };

  const inputIds = [
    "monthlyNeed",
    "professionalCosts",
    "taxMultiplier",
    "weeklyHours",
    "adminShare",
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
    const taxMultiplier = Math.min(2.5, Math.max(1.0, n("taxMultiplier") || 1.6));
    const weeklyHours = Math.max(1, n("weeklyHours"));
    const adminShare = Math.min(0.8, Math.max(0, (n("adminShare") || 0) / 100));
    const vacationWeeks = n("vacationWeeks");
    const sickWeeks = n("sickWeeks");

    const yearlyHours = weeklyHours * 52;
    const workingHours = Math.max(
      0,
      yearlyHours - vacationWeeks * weeklyHours - sickWeeks * weeklyHours
    );
    const billableHoursYear = Math.max(1, workingHours * (1 - adminShare));
    const billableHoursMonth = Math.max(1, billableHoursYear / 12);
    const monthlyNeedGross = monthlyNeedNet * taxMultiplier;
    const monthlyTarget = monthlyNeedGross + professionalCosts;
    const hourlyRate = monthlyTarget / billableHoursMonth;
    const negotiationRate = hourlyRate * 1.2;

    const nextStep = lang === "de"
      ? `<div class="next-step-suggestion"><p>Stundensatz berechnet. Jetzt nutze ihn, um dein Jahreseinkommen zu prognostizieren.</p><a href="forecast.php">Jahresprognose →</a></div>`
      : `<div class="next-step-suggestion"><p>Your rate is set. Now use it to project your annual income.</p><a href="forecast_en.php">Annual Forecast →</a></div>`;

    sheet.innerHTML = `
      <div class="row"><span>${labels[lang].yearlyHours}</span><strong>${yearlyHours.toFixed(0)} h</strong></div>
      <div class="row"><span>${labels[lang].workingHours}</span><strong>${workingHours.toFixed(0)} h</strong></div>
      <div class="row"><span>${labels[lang].billableHoursYear}</span><strong>${billableHoursYear.toFixed(0)} h</strong></div>
      <div class="row"><span>${labels[lang].billableHoursMonth}</span><strong>${billableHoursMonth.toFixed(1)} h</strong></div>
      <div class="row"><span>${labels[lang].effectiveTaxMultiplier}</span><strong>${taxMultiplier.toFixed(2)}</strong></div>
      <div class="row"><span>${labels[lang].monthlyNeedNet}</span><strong>${EUR(monthlyNeedNet)}</strong></div>
      <div class="row"><span>${labels[lang].monthlyNeedGross}</span><strong>${EUR(monthlyNeedGross)}</strong></div>
      <div class="row"><span>${labels[lang].monthlyTarget}</span><strong>${EUR(monthlyTarget)}</strong></div>
      <div class="row"><span>${labels[lang].recommendedHourly}</span><strong>${EUR(hourlyRate)}</strong></div>
      <div class="row"><span>${labels[lang].negotiationTarget}</span><strong>${EUR(negotiationRate)}</strong></div>
      <p class="small muted">${labels[lang].info}</p>
      ${nextStep}
    `;
  }

  for (const id of inputIds) {
    inputs[id]?.addEventListener("input", recalc);
  }

  recalc();
})();
