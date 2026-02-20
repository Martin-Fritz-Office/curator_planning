(function () {
  const lang = document.body?.dataset?.lang === 'en' ? 'en' : 'de';
  const locale = lang === 'en' ? 'en-IE' : 'de-AT';
  const t = {
    de: {
      step: 'Schritt', of: 'von', next: 'Weiter', restart: 'Von vorne',
      tableHead: ['Einkommen in EUR (Tarifstufen)', 'Grenzsteuersatz 2025', 'Steuerbetrag (höchstens) pro Kategorie in EUR', 'Steuerbetrag aufsummiert in EUR'],
      rows: ['0 – 13.308','13.309 – 21.617','21.618 – 35.836','35.837 – 69.166','69.167 – 103.072','103.073 – 1 Mio.'],
      steps: (s)=>[
        `<h3>1) Einnahmen eingeben</h3><p>Gib hier alle Einnahmen aus deiner selbständigen Tätigkeit ein.</p><label for="revenueInput" class="small muted">Gesamteinnahmen pro Jahr (EUR)</label><input id="revenueInput" type="number" min="0" step="100" value="${s.revenue}" />`,
        `<h3>2) Berufliche Kosten eingeben</h3><p>Und hier alle deine beruflichen Kosten aus demselben Jahr.</p><label for="costInput" class="small muted">Gesamtkosten pro Jahr (EUR)</label><input id="costInput" type="number" min="0" step="100" value="${s.costs}" />`,
        `<h3>3) Danke</h3><p>Danke. Ich zeige dir jetzt, wie du dein Netto-Einkommen berechnen kannst.</p>`,
        `<h3>4) Umsatz</h3><p>Deine Gesamteinnahmen sind <strong>${EUR(s.revenue)}</strong>. Das ist dein Umsatz.</p>`,
        `<h3>5) Kosten abziehen</h3><p>Davon ziehst du deine Kosten von <strong>${EUR(s.costs)}</strong> ab.</p>`,
        `<h3>6) Gewinn vor Sozialversicherung und Steuern</h3><p>Das Ergebnis ist dein Gewinn vor Sozialversicherung und Steuern: <strong>${EUR(s.pbs)}</strong>.</p>`,
        `<h3>7) Abzüge für Sozialversicherung</h3><ul><li>Krankenversicherung: 6,8% = <strong>${EUR(s.social.health)}</strong></li><li>Pensionsversicherung: 18,5% = <strong>${EUR(s.social.pension)}</strong></li><li>Selbständigenvorsorge: 1,53% = <strong>${EUR(s.social.retirement)}</strong></li><li>Unfallversicherung: 12,95 Euro pro Monat = <strong>${EUR(s.social.accident)}</strong></li></ul>`,
        `<h3>8) Gesamte Sozialabgaben</h3><p>Das sind insgesamt: <strong>${EUR(s.social.total)}</strong>.</p>`,
        `<h3>9) Gewinn vor Steuern</h3><p>Dein Gewinn vor Steuern ist also: <strong>${EUR(s.pbt)}</strong>.</p>`,
        `<h3>10) Steuerberechnung</h3><p>Davon wird die Steuer nach den Tarifstufen berechnet:</p>${renderTaxTable()}`,
        `<h3>11) Steuerhöhe</h3><p>Deine Steuerhöhe beträgt also ca. <strong>${EUR(s.tax)}</strong>.</p>`,
        `<h3>12) Jahresnettoeinkommen</h3><p>Somit beträgt dein Jahresnettoeinkommen: <strong>${EUR(s.net)}</strong>.</p><p>Von deinem Umsatz <strong>${EUR(s.revenue)}</strong> bleiben dir also <strong>${EUR(s.net/12)}</strong> pro Monat.</p>`
      ]
    },
    en: {
      step: 'Step', of: 'of', next: 'Next', restart: 'Start over',
      tableHead: ['Income in EUR (tax brackets)', 'Marginal tax rate 2025', 'Max tax amount per bracket in EUR', 'Cumulative tax amount in EUR'],
      rows: ['0 – 13,308','13,309 – 21,617','21,618 – 35,836','35,837 – 69,166','69,167 – 103,072','103,073 – 1M'],
      steps: (s)=>[
        `<h3>1) Enter revenue</h3><p>Enter your total freelance revenue for the year.</p><label for="revenueInput" class="small muted">Total yearly revenue (EUR)</label><input id="revenueInput" type="number" min="0" step="100" value="${s.revenue}" />`,
        `<h3>2) Enter professional costs</h3><p>Now add all professional costs for the same year.</p><label for="costInput" class="small muted">Total yearly costs (EUR)</label><input id="costInput" type="number" min="0" step="100" value="${s.costs}" />`,
        `<h3>3) Thanks</h3><p>Great. Next, we'll calculate your net income step by step.</p>`,
        `<h3>4) Revenue</h3><p>Your total revenue is <strong>${EUR(s.revenue)}</strong>.</p>`,
        `<h3>5) Subtract costs</h3><p>Subtract your costs of <strong>${EUR(s.costs)}</strong>.</p>`,
        `<h3>6) Profit before social contributions and tax</h3><p>Result: <strong>${EUR(s.pbs)}</strong>.</p>`,
        `<h3>7) Social contributions</h3><ul><li>Health insurance: 6.8% = <strong>${EUR(s.social.health)}</strong></li><li>Pension insurance: 18.5% = <strong>${EUR(s.social.pension)}</strong></li><li>Self-employed provision: 1.53% = <strong>${EUR(s.social.retirement)}</strong></li><li>Accident insurance: EUR 12.95 per month = <strong>${EUR(s.social.accident)}</strong></li></ul>`,
        `<h3>8) Total social contributions</h3><p>Total: <strong>${EUR(s.social.total)}</strong>.</p>`,
        `<h3>9) Profit before tax</h3><p>Your profit before tax is <strong>${EUR(s.pbt)}</strong>.</p>`,
        `<h3>10) Tax calculation</h3><p>Income tax is calculated by bracket:</p>${renderTaxTable()}`,
        `<h3>11) Tax amount</h3><p>Your estimated tax is <strong>${EUR(s.tax)}</strong>.</p>`,
        `<h3>12) Yearly net income</h3><p>Your yearly net income is <strong>${EUR(s.net)}</strong>.</p><p>From total revenue <strong>${EUR(s.revenue)}</strong>, about <strong>${EUR(s.net/12)}</strong> remains per month.</p>`
      ]
    }
  }[lang];

  const state = { step: 0, revenue: 36000, costs: 9000 };
  const TAX_BRACKETS = [
    { upTo: 13308, rate: 0 }, { upTo: 21617, rate: 0.2 }, { upTo: 35836, rate: 0.3 }, { upTo: 69166, rate: 0.4 }, { upTo: 103072, rate: 0.48 }, { upTo: 1000000, rate: 0.5 }
  ];

  const stage = document.getElementById('carouselStage');
  const progressLabel = document.getElementById('progressLabel');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const EUR = (n) => new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(n) || 0);

  const socials = (baseProfit) => {
    const base = Math.max(0, baseProfit);
    const health = base * 0.068, pension = base * 0.185, retirement = base * 0.0153, accident = 12.95 * 12;
    return { health, pension, retirement, accident, total: health + pension + retirement + accident };
  };

  const incomeTax = (incomeRaw) => {
    const income = Math.max(0, incomeRaw);
    let tax = 0, previous = 0;
    for (const b of TAX_BRACKETS) {
      const amount = Math.max(0, Math.min(income, b.upTo) - previous);
      tax += amount * b.rate;
      previous = b.upTo;
      if (income <= b.upTo) break;
    }
    return tax;
  };

  function renderTaxTable() {
    const rates = ['0%','20%','30%','40%','48%','50%'];
    const maxTax = ['0,00','1.661,60','4.265,40','13.331,60','16.274,40','448.463,50'];
    const sums = ['0,00','1.661,60','5.927,00','19.258,60','35.533,00','483.399,50'];
    return `<table class="tax-table"><thead><tr>${t.tableHead.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${t.rows.map((r,i)=>`<tr><td>${r}</td><td>${rates[i]}</td><td>${maxTax[i]}</td><td>${sums[i]}</td></tr>`).join('')}</tbody></table>`;
  }

  function renderStep() {
    const pbs = state.revenue - state.costs;
    const social = socials(pbs);
    const pbt = pbs - social.total;
    const tax = incomeTax(pbt);
    const net = pbt - tax;
    const steps = t.steps({ ...state, pbs, pbt, social, tax, net });

    stage.innerHTML = `<article class="didactic-step">${steps[state.step]}</article>`;
    progressLabel.textContent = `${t.step} ${state.step + 1} ${t.of} ${steps.length}`;
    prevBtn.disabled = state.step === 0;
    nextBtn.textContent = state.step === steps.length - 1 ? t.restart : t.next;

    const revenueInput = document.getElementById('revenueInput');
    if (revenueInput) revenueInput.addEventListener('input', (e) => { state.revenue = Number(e.target.value) || 0; });
    const costInput = document.getElementById('costInput');
    if (costInput) costInput.addEventListener('input', (e) => { state.costs = Number(e.target.value) || 0; });
  }

  prevBtn.addEventListener('click', () => { if (state.step > 0) { state.step -= 1; renderStep(); } });
  nextBtn.addEventListener('click', () => { state.step = state.step < 11 ? state.step + 1 : 0; renderStep(); });
  renderStep();
})();
