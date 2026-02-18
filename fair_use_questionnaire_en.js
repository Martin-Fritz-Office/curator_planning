(function () {
  "use strict";

  const init = () => {

  const activityRates = {
    exhibitionSolo: 1875,
    exhibition2to3: 1000,
    exhibition4to7: 650,
    exhibition8plus: 450,
    performanceOnce: 450,
    lecture: 450,
    talk: 275,
    moderationEditorial: 450,
    moderationCoordination: 325,
  };

  const state = {
    step: 0,
    values: {
      activityType: "exhibitionSolo",
      collective: "no",
      effort: "minimum",
      duration: "upTo90",
      extraPerformances: 0,
      variableCosts: 0,
      cancellationCoverage: "none",
      rightsUsage: "no",
    },
  };

  const questions = [
    {
      key: "activityType",
      type: "select",
      label: "1) Which service should be paid?",
      help: "Base rates cover labor only (self-employed wage), not expenses or production of new works.",
      options: [
        { value: "exhibitionSolo", label: "Solo exhibition (base rate €1,875)" },
        { value: "exhibition2to3", label: "Exhibition with 2–3 artists (€1,000 per person)" },
        { value: "exhibition4to7", label: "Exhibition with 4–7 artists (€650 per person)" },
        { value: "exhibition8plus", label: "Exhibition with 8+ artists (€450 per person)" },
        { value: "performanceOnce", label: "Solo performance, single show (€450)" },
        { value: "lecture", label: "Artist lecture up to 90 minutes (€450)" },
        { value: "talk", label: "Artist talk/tour up to 90 minutes (€275)" },
        { value: "moderationEditorial", label: "Moderation incl. editorial preparation up to 90 minutes (€450)" },
        { value: "moderationCoordination", label: "Moderation: coordination/facilitation up to 90 minutes (€325)" },
      ],
    },
    {
      key: "collective",
      type: "select",
      label: "2) Is the exhibition participation as a collective?",
      help: "For artist collectives, at least a 1.5x factor is recommended.",
      options: [
        { value: "no", label: "No" },
        { value: "yes", label: "Yes, collective" },
      ],
    },
    {
      key: "effort",
      type: "select",
      label: "3) How demanding is the project compared to minimum effort?",
      help: "Base rates are only a starting point. Higher effort should be paid significantly higher.",
      options: [
        { value: "lower", label: "Unusually low effort" },
        { value: "minimum", label: "Minimum effort (base rate fits)" },
        { value: "higher", label: "Higher effort" },
        { value: "muchHigher", label: "Much higher effort" },
      ],
    },
    {
      key: "duration",
      type: "select",
      label: "4) What is the planned duration of the format?",
      help: "Lecture/talk/moderation base rates apply to up to 90 minutes.",
      options: [
        { value: "upTo90", label: "Up to 90 minutes" },
        { value: "upTo180", label: "91 to 180 minutes" },
        { value: "more", label: "More than 180 minutes" },
      ],
    },
    {
      key: "extraPerformances",
      type: "number",
      label: "5) How many additional performance dates at the same venue are planned?",
      help: "Each additional date is recommended at €325 (performance only).",
      min: 0,
      step: 1,
    },
    {
      key: "variableCosts",
      type: "number",
      label: "6) Which variable costs are expected in addition (in €)?",
      help: "For example: material, transport, travel, licenses, event-specific childcare.",
      min: 0,
      step: 50,
    },
    {
      key: "cancellationCoverage",
      type: "select",
      label: "7) Should a cancellation fee be secured contractually?",
      help: "Recommended: 50% and/or 100% depending on cancellation timing.",
      options: [
        { value: "none", label: "Not clarified yet" },
        { value: "half", label: "Yes, at least 50% for early cancellation" },
        { value: "full", label: "Yes, 100% for short-notice cancellation" },
        { value: "both", label: "Yes, tiered 50% / 100%" },
      ],
    },
    {
      key: "rightsUsage",
      type: "select",
      label: "8) Are usage or exploitation rights granted in addition?",
      help: "Rights remuneration should be negotiated on top of the honorarium.",
      options: [
        { value: "no", label: "No" },
        { value: "yes", label: "Yes" },
      ],
    },
  ];

  const effortMultiplier = { lower: 0.8, minimum: 1, higher: 1.3, muchHigher: 1.6 };
  const durationMultiplier = { upTo90: 1, upTo180: 1.25, more: 1.5 };

  const stage = document.getElementById("carouselStage");
  const progressLabel = document.getElementById("progressLabel");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (!stage || !progressLabel || !prevBtn || !nextBtn) return;

  const shouldUseDuration = (activityType) =>
    activityType === "lecture" || activityType === "talk" || activityType === "moderationEditorial" || activityType === "moderationCoordination";

  const evaluate = () => {
    const base = activityRates[state.values.activityType] || 0;
    const collectiveFactor = state.values.collective === "yes" && state.values.activityType.startsWith("exhibition") ? 1.5 : 1;
    const effortFactor = effortMultiplier[state.values.effort] || 1;
    const durationFactor = shouldUseDuration(state.values.activityType) ? durationMultiplier[state.values.duration] || 1 : 1;

    const extraPerformanceFee = state.values.activityType === "performanceOnce" ? Math.max(0, Number(state.values.extraPerformances) || 0) * 325 : 0;

    const laborFee = Math.round(base * collectiveFactor * effortFactor * durationFactor + extraPerformanceFee);
    const variableCosts = Math.max(0, Number(state.values.variableCosts) || 0);
    const subtotal = laborFee + variableCosts;

    const notes = [];
    if (state.values.cancellationCoverage === "half" || state.values.cancellationCoverage === "both") {
      notes.push("Cancellation fee: include at least 50% for early cancellation in the contract.");
    }
    if (state.values.cancellationCoverage === "full" || state.values.cancellationCoverage === "both") {
      notes.push("Cancellation fee: include 100% for short-notice cancellation in the contract.");
    }
    if (state.values.rightsUsage === "yes") {
      notes.push("Negotiate remuneration for usage/exploitation rights in addition to the honorarium.");
    }

    return { base, collectiveFactor, effortFactor, durationFactor, extraPerformanceFee, laborFee, variableCosts, subtotal, notes };
  };

  const renderQuestion = (question) => {
    const value = state.values[question.key];

    const fieldHtml = question.type === "number"
      ? `<input id="questionInput" type="number" min="${question.min ?? 0}" step="${question.step ?? 1}" value="${value}" />`
      : `<select id="questionInput">${question.options
          .map((option) => `<option value="${option.value}" ${value === option.value ? "selected" : ""}>${option.label}</option>`)
          .join("")}</select>`;

    stage.innerHTML = `
      <article class="didactic-step">
        <h3>${question.label}</h3>
        <p class="small muted">${question.help}</p>
        <label class="q carousel-question" for="questionInput">${fieldHtml}</label>
      </article>
    `;

    const input = document.getElementById("questionInput");
    input.addEventListener("input", (event) => {
      state.values[question.key] = question.type === "number" ? Number(event.target.value) || 0 : event.target.value;
    });
  };

  const euro = (value) => new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);

  const renderResult = () => {
    const result = evaluate();

    stage.innerHTML = `
      <article class="didactic-step">
        <h3>Recommended fair honorarium</h3>
        <div class="sheet">
          <div class="row"><span>Base rate from guideline</span><strong>${euro(result.base)}</strong></div>
          <div class="row"><span>Collective / effort / duration adjustment</span><strong>x ${result.collectiveFactor.toFixed(2)} / ${result.effortFactor.toFixed(2)} / ${result.durationFactor.toFixed(2)}</strong></div>
          <div class="row"><span>Additional performance dates</span><strong>${euro(result.extraPerformanceFee)}</strong></div>
          <div class="row"><span>Recommended labor honorarium</span><strong>${euro(result.laborFee)}</strong></div>
          <div class="row"><span>+ Variable costs</span><strong>${euro(result.variableCosts)}</strong></div>
          <div class="row"><span>Subtotal (excl. VAT)</span><strong>${euro(result.subtotal)}</strong></div>
        </div>
        <p class="small muted">Note: These values are non-binding guidance for negotiations and do not replace an individual calculation (overheads, taxes, rights, risk premiums).</p>
        <ul>${result.notes.map((note) => `<li>${note}</li>`).join("") || "<li>Also confirm written terms for cancellation fees and rights.</li>"}</ul>
      </article>
    `;
  };

  const render = () => {
    const onResult = state.step === questions.length;

    progressLabel.textContent = onResult ? "Result" : `Question ${state.step + 1} of ${questions.length}`;
    prevBtn.disabled = state.step === 0;
    nextBtn.textContent = onResult ? "Start again" : "Next";

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
    if (state.step < questions.length) state.step += 1;
    else state.step = 0;

    render();
  });

  render();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
