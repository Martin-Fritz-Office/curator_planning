(function () {
  "use strict";

  const EUR = (n) =>
    new Intl.NumberFormat("en-IE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(n) || 0);

  const state = {
    step: 0,
    values: {
      expectedSales: 40000,
      galleryCommission: 50,
      productionShareArtist: 60,
      productionRatio: 18,
      shippingReturnsCost: 2600,
      insuranceCost: 800,
      avgDiscountRate: 8,
      discountAbsorbedByArtist: 50,
      vatRate: 13,
      paymentDelayDays: 60,
      marketingCost: 1200,
      exclusivityOpportunityCost: 3000,
    },
  };

  const questions = [
    { key: "expectedSales", label: "1) Expected annual gross sales through this gallery (€)", min: 0, step: 500 },
    { key: "galleryCommission", label: "2) Gallery commission share (%)", min: 0, max: 100, step: 1 },
    { key: "productionShareArtist", label: "3) Artist share of production costs (%)", min: 0, max: 100, step: 1 },
    { key: "productionRatio", label: "4) Typical production cost ratio of sales (%)", min: 0, max: 100, step: 1 },
    { key: "shippingReturnsCost", label: "5) Annual shipping + returns costs paid by artist (€)", min: 0, step: 100 },
    { key: "insuranceCost", label: "6) Annual insurance costs paid by artist (€)", min: 0, step: 50 },
    { key: "avgDiscountRate", label: "7) Average discount given to buyers (%)", min: 0, max: 100, step: 1 },
    { key: "discountAbsorbedByArtist", label: "8) Share of discount absorbed by artist (%)", min: 0, max: 100, step: 1 },
    { key: "vatRate", label: "9) VAT / tax rate on artist proceeds (%)", min: 0, max: 100, step: 1 },
    { key: "paymentDelayDays", label: "10) Typical payment delay after sale (days)", min: 0, max: 365, step: 1 },
    { key: "marketingCost", label: "11) Annual marketing obligation paid by artist (€)", min: 0, step: 50 },
    { key: "exclusivityOpportunityCost", label: "12) Exclusivity opportunity cost per year (€)", min: 0, step: 100 },
  ];

  const stage = document.getElementById("carouselStage");
  const progressLabel = document.getElementById("progressLabel");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const metrics = () => {
    const sales = state.values.expectedSales;
    const grossAfterCommission = sales * (1 - state.values.galleryCommission / 100);
    const productionCost = sales * (state.values.productionRatio / 100) * (state.values.productionShareArtist / 100);
    const discountCost = sales * (state.values.avgDiscountRate / 100) * (state.values.discountAbsorbedByArtist / 100);
    const taxableBase = Math.max(0, grossAfterCommission - productionCost - discountCost);
    const vatTax = taxableBase * (state.values.vatRate / 100);
    const fixedCosts = state.values.shippingReturnsCost + state.values.insuranceCost + state.values.marketingCost + state.values.exclusivityOpportunityCost;

    const cashflowPenalty = Math.min(0.2, state.values.paymentDelayDays / 365 * 0.1) * taxableBase;
    const annualNet = grossAfterCommission - productionCost - discountCost - vatTax - fixedCosts - cashflowPenalty;

    const contractScore = Math.max(0, Math.min(100, 50 + (annualNet / Math.max(1, sales)) * 120 - state.values.paymentDelayDays * 0.08));
    const recommendation = contractScore >= 65 ? "Looks viable" : contractScore >= 45 ? "Renegotiate terms" : "High risk";

    return { grossAfterCommission, productionCost, discountCost, vatTax, fixedCosts, cashflowPenalty, annualNet, contractScore, recommendation };
  };

  const renderQuestion = (question) => {
    stage.innerHTML = `
      <article class="didactic-step">
        <h3>${question.label}</h3>
        <label class="q carousel-question" for="questionInput">
          <input id="questionInput" type="number" min="${question.min}" ${question.max !== undefined ? `max="${question.max}"` : ""} step="${question.step}" value="${state.values[question.key]}" />
        </label>
      </article>
    `;

    const input = document.getElementById("questionInput");
    input.addEventListener("input", (event) => {
      state.values[question.key] = Number(event.target.value) || 0;
    });
  };

  const renderResult = () => {
    const m = metrics();
    stage.innerHTML = `
      <article class="didactic-step">
        <h3>Result: ${m.recommendation}</h3>
        <div class="sheet">
          <div class="row"><span>Artist gross after commission</span><strong>${EUR(m.grossAfterCommission)}</strong></div>
          <div class="row"><span>Production costs (artist share)</span><strong class="neg">-${EUR(m.productionCost)}</strong></div>
          <div class="row"><span>Discounts absorbed by artist</span><strong class="neg">-${EUR(m.discountCost)}</strong></div>
          <div class="row"><span>VAT / taxes</span><strong class="neg">-${EUR(m.vatTax)}</strong></div>
          <div class="row"><span>Fixed obligations + exclusivity</span><strong class="neg">-${EUR(m.fixedCosts)}</strong></div>
          <div class="row"><span>Cashflow penalty (slow payments)</span><strong class="neg">-${EUR(m.cashflowPenalty)}</strong></div>
          <div class="row"><span>Estimated annual net income</span><strong class="${m.annualNet >= 0 ? '' : 'neg'}">${EUR(m.annualNet)}</strong></div>
          <div class="row"><span>Contract score</span><strong>${m.contractScore.toFixed(1)} / 100</strong></div>
        </div>
        <p class="small muted">Renegotiation levers: commission split, discount policy, payment timing, and exclusivity scope.</p>
      </article>
    `;
  };

  const render = () => {
    const onResult = state.step === questions.length;
    progressLabel.textContent = onResult ? "Result" : `Question ${state.step + 1} of ${questions.length}`;
    prevBtn.disabled = state.step === 0;
    nextBtn.textContent = onResult ? "Start over" : "Next";

    if (onResult) renderResult();
    else renderQuestion(questions[state.step]);
  };

  prevBtn.addEventListener("click", () => {
    if (state.step > 0) {
      state.step -= 1;
      render();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (state.step < questions.length) {
      state.step += 1;
    } else {
      state.step = 0;
    }
    render();
  });

  render();
})();
