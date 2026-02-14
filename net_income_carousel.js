(function () {
  "use strict";

  const EUR = (n) =>
    new Intl.NumberFormat("de-AT", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(n) || 0);

  const TAX_BRACKETS = [
    { upTo: 13308, rate: 0 },
    { upTo: 21617, rate: 0.2 },
    { upTo: 35836, rate: 0.3 },
    { upTo: 69166, rate: 0.4 },
    { upTo: 103072, rate: 0.48 },
    { upTo: 1000000, rate: 0.5 },
    { upTo: Number.POSITIVE_INFINITY, rate: 0.55 },
  ];

  const state = {
    step: 0,
    revenue: 0,
    costs: 0,
  };

  const stage = document.getElementById("carouselStage");
  const progressLabel = document.getElementById("progressLabel");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const socials = (profitBeforeSocials) => {
    const base = Math.max(0, profitBeforeSocials);
    const health = base * 0.068;
    const pension = base * 0.185;
    const retirement = base * 0.0153;
    const accident = 12.95 * 12;
    return { health, pension, retirement, accident, total: health + pension + retirement + accident };
  };

  const incomeTax = (taxableIncome) => {
    const income = Math.max(0, taxableIncome);
    let tax = 0;
    let previousLimit = 0;

    for (const bracket of TAX_BRACKETS) {
      const amountInBracket = Math.max(0, Math.min(income, bracket.upTo) - previousLimit);
      tax += amountInBracket * bracket.rate;
      previousLimit = bracket.upTo;

      if (income <= bracket.upTo) {
        break;
      }
    }

    return tax;
  };

  const renderTaxTable = () => `
    <table class="tax-table">
      <thead>
        <tr>
          <th>Einkommen in EUR (Tarifstufen)</th>
          <th>Grenzsteuersatz 2025</th>
          <th>Steuerbetrag (höchstens) pro Kategorie in EUR</th>
          <th>Steuerbetrag aufsummiert in EUR</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>0 – 13.308</td><td>0%</td><td>0,00</td><td>0,00</td></tr>
        <tr><td>13.309 – 21.617</td><td>20%</td><td>1.661,60</td><td>1.661,60</td></tr>
        <tr><td>21.618 – 35.836</td><td>30%</td><td>4.265,40</td><td>5.927,00</td></tr>
        <tr><td>35.837 – 69.166</td><td>40%</td><td>13.331,60</td><td>19.258,60</td></tr>
        <tr><td>69.167 – 103.072</td><td>48%</td><td>16.274,40</td><td>35.533,00</td></tr>
        <tr><td>103.073 – 1 Mio.</td><td>50%</td><td>448.463,50</td><td>483.399,50</td></tr>
      </tbody>
    </table>
  `;

  const renderStep = () => {
    const profitBeforeSocials = state.revenue - state.costs;
    const social = socials(profitBeforeSocials);
    const profitBeforeTax = profitBeforeSocials - social.total;
    const tax = incomeTax(profitBeforeTax);
    const yearlyNet = profitBeforeTax - tax;

    const steps = [
      `
        <h3>1) Einnahmen eingeben</h3>
        <p>Gib hier alle Einnahmen aus deiner selbständigen Tätigkeit ein.</p>
        <label for="revenueInput" class="small muted">Gesamteinnahmen pro Jahr (EUR)</label>
        <input id="revenueInput" type="number" min="0" step="100" value="${state.revenue}" />
      `,
      `
        <h3>2) Berufliche Kosten eingeben</h3>
        <p>Und hier alle deine beruflichen Kosten aus demselben Jahr.</p>
        <label for="costInput" class="small muted">Gesamtkosten pro Jahr (EUR)</label>
        <input id="costInput" type="number" min="0" step="100" value="${state.costs}" />
      `,
      `
        <h3>3) Danke</h3>
        <p>Danke. Ich zeige dir jetzt, wie du dein Netto-Einkommen berechnen kannst.</p>
      `,
      `
        <h3>4) Umsatz</h3>
        <p>Deine Gesamteinnahmen sind <strong>${EUR(state.revenue)}</strong>. Das ist dein Umsatz.</p>
      `,
      `
        <h3>5) Kosten abziehen</h3>
        <p>Davon ziehst du deine Kosten von <strong>${EUR(state.costs)}</strong> ab.</p>
      `,
      `
        <h3>6) Gewinn vor Sozialversicherung und Steuern</h3>
        <p>Das Ergebnis ist dein Gewinn vor Sozialversicherung und Steuern: <strong>${EUR(profitBeforeSocials)}</strong>.</p>
      `,
      `
        <h3>7) Abzüge für Sozialversicherung</h3>
        <p>Davon werden folgende Beträge abgezogen:</p>
        <ul>
          <li>Krankenversicherung: 6,8% = <strong>${EUR(social.health)}</strong></li>
          <li>Pensionsversicherung: 18,5% = <strong>${EUR(social.pension)}</strong></li>
          <li>Selbständigenvorsorge: 1,53% = <strong>${EUR(social.retirement)}</strong></li>
          <li>Unfallversicherung: 12,95 Euro pro Monat = <strong>${EUR(social.accident)}</strong></li>
        </ul>
      `,
      `
        <h3>8) Gesamte Sozialabgaben</h3>
        <p>Das sind insgesamt: <strong>${EUR(social.total)}</strong>.</p>
      `,
      `
        <h3>9) Gewinn vor Steuern</h3>
        <p>Dein Gewinn vor Steuern ist also: <strong>${EUR(profitBeforeTax)}</strong>.</p>
      `,
      `
        <h3>10) Steuerberechnung</h3>
        <p>Davon wird die Steuer nach den Tarifstufen berechnet:</p>
        ${renderTaxTable()}
      `,
      `
        <h3>11) Steuerhöhe</h3>
        <p>Deine Steuerhöhe beträgt also ca. <strong>${EUR(tax)}</strong>.</p>
      `,
      `
        <h3>12) Jahresnettoeinkommen</h3>
        <p>Somit beträgt dein Jahresnettoeinkommen: <strong>${EUR(yearlyNet)}</strong>.</p>
        <p>Von deinem Umsatz <strong>${EUR(state.revenue)}</strong> bleiben dir also <strong>${EUR(yearlyNet / 12)}</strong> pro Monat für deinen Lebensunterhalt.</p>
      `,
    ];

    stage.innerHTML = `<article class="didactic-step">${steps[state.step]}</article>`;
    progressLabel.textContent = `Schritt ${state.step + 1} von ${steps.length}`;
    prevBtn.disabled = state.step === 0;
    nextBtn.textContent = state.step === steps.length - 1 ? "Von vorne" : "Weiter";

    const revenueInput = document.getElementById("revenueInput");
    if (revenueInput) {
      revenueInput.addEventListener("input", (event) => {
        state.revenue = Number(event.target.value) || 0;
      });
    }

    const costInput = document.getElementById("costInput");
    if (costInput) {
      costInput.addEventListener("input", (event) => {
        state.costs = Number(event.target.value) || 0;
      });
    }
  };

  prevBtn.addEventListener("click", () => {
    if (state.step > 0) {
      state.step -= 1;
      renderStep();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (state.step < 11) {
      state.step += 1;
    } else {
      state.step = 0;
    }
    renderStep();
  });

  renderStep();
})();
