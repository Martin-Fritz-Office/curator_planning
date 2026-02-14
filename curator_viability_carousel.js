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
      feeOffered: 5000,
      scopeClarity: 7,
      prepHours: 30,
      productionHours: 45,
      travelAdminHours: 20,
      subcontractorCosts: 900,
      taxMultiplier: 1.6,
      paymentDelayDays: 45,
      cancellationCoverage: 40,
      networkUpside: 7,
      followOnProbability: 35,
      stressRisk: 5,
      minAcceptableNet: 2800,
    },
  };

  const questions = [
    { key: "feeOffered", label: "1) Fee offered for this project (€)", min: 0, step: 100 },
    { key: "scopeClarity", label: "2) Scope clarity (1 = vague, 10 = crystal clear)", min: 1, max: 10, step: 1 },
    { key: "prepHours", label: "3) Estimated prep hours", min: 0, step: 1 },
    { key: "productionHours", label: "4) Estimated production / coordination hours", min: 0, step: 1 },
    { key: "travelAdminHours", label: "5) Estimated travel + admin hours", min: 0, step: 1 },
    { key: "subcontractorCosts", label: "6) Subcontractor and external costs (€)", min: 0, step: 50 },
    { key: "taxMultiplier", label: "7) Tax/social multiplier (e.g. 1.5–1.8)", min: 1.1, max: 2.5, step: 0.1 },
    { key: "paymentDelayDays", label: "8) Payment schedule: days until full payment", min: 0, max: 365, step: 1 },
    { key: "cancellationCoverage", label: "9) Cancellation terms: % of fee covered if cancelled", min: 0, max: 100, step: 1 },
    { key: "networkUpside", label: "10) Reputation / network upside (1–10)", min: 1, max: 10, step: 1 },
    { key: "followOnProbability", label: "11) Follow-on opportunity probability (%)", min: 0, max: 100, step: 1 },
    { key: "stressRisk", label: "12) Burnout / stress risk (1 low – 10 high)", min: 1, max: 10, step: 1 },
    { key: "minAcceptableNet", label: "13) Minimum acceptable net income for this project (€)", min: 0, step: 100 },
  ];

  const stage = document.getElementById("carouselStage");
  const progressLabel = document.getElementById("progressLabel");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const metrics = () => {
    const totalHours = state.values.prepHours + state.values.productionHours + state.values.travelAdminHours;
    const grossAfterCosts = Math.max(0, state.values.feeOffered - state.values.subcontractorCosts);
    const netAfterTax = grossAfterCosts / Math.max(1, state.values.taxMultiplier);
    const netHourly = totalHours > 0 ? netAfterTax / totalHours : 0;
    const thresholdGap = netAfterTax - state.values.minAcceptableNet;

    const delayPenalty = Math.min(25, state.values.paymentDelayDays / 4);
    const cancellationPenalty = (100 - state.values.cancellationCoverage) * 0.12;
    const stressPenalty = state.values.stressRisk * 3;

    const opportunityBoost = state.values.networkUpside * 2 + state.values.followOnProbability * 0.25 + state.values.scopeClarity * 1.5;
    const financialScore = Math.max(0, Math.min(100, 50 + thresholdGap / Math.max(1, state.values.minAcceptableNet) * 50));
    const viabilityScore = Math.max(0, Math.min(100, financialScore + opportunityBoost - delayPenalty - cancellationPenalty - stressPenalty));

    let recommendation = "Decline";
    if (viabilityScore >= 65) recommendation = "Go";
    else if (viabilityScore >= 45) recommendation = "Renegotiate";

    return { totalHours, grossAfterCosts, netAfterTax, netHourly, thresholdGap, viabilityScore, recommendation };
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
          <div class="row"><span>Total planned hours</span><strong>${m.totalHours.toFixed(1)} h</strong></div>
          <div class="row"><span>Gross after external costs</span><strong>${EUR(m.grossAfterCosts)}</strong></div>
          <div class="row"><span>Estimated net after tax/socials</span><strong>${EUR(m.netAfterTax)}</strong></div>
          <div class="row"><span>Estimated net hourly</span><strong>${EUR(m.netHourly)}</strong></div>
          <div class="row"><span>Gap vs. minimum acceptable net</span><strong class="${m.thresholdGap >= 0 ? '' : 'neg'}">${EUR(m.thresholdGap)}</strong></div>
          <div class="row"><span>Viability score</span><strong>${m.viabilityScore.toFixed(1)} / 100</strong></div>
        </div>
        <p class="small muted">Tip: if recommendation is <strong>Renegotiate</strong>, ask for a higher fee, shorter payment delay, and stronger cancellation compensation.</p>
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
