(function () {
  "use strict";

  const state = {
    step: 0,
    values: {
      transformativePurpose: "yes",
      mostlyCommercial: "no",
      amountUsedIsLimited: "yes",
      usesCoreHeart: "no",
      sourceWasPublished: "yes",
      marketSubstitutionRisk: "no",
      creditAndContextProvided: "yes",
    },
  };

  const options = [
    { value: "yes", label: "Yes" },
    { value: "unsure", label: "Not sure" },
    { value: "no", label: "No" },
  ];

  const questions = [
    {
      key: "transformativePurpose",
      label: "1) Are you adding new meaning, message, or purpose (transformative use)?",
      help: "Transformative uses generally support fair use.",
      riskScore: { yes: 0, unsure: 1, no: 2 },
    },
    {
      key: "mostlyCommercial",
      label: "2) Is your use primarily commercial (e.g., direct sales/ads) rather than educational or commentary?",
      help: "Purely commercial use can increase legal risk.",
      riskScore: { yes: 2, unsure: 1, no: 0 },
    },
    {
      key: "amountUsedIsLimited",
      label: "3) Are you only using the minimum amount needed from the original work?",
      help: "Using less than necessary can weigh in favor of fair use.",
      riskScore: { yes: 0, unsure: 1, no: 2 },
    },
    {
      key: "usesCoreHeart",
      label: "4) Are you avoiding the most recognizable or central part (the \"heart\") of the original work?",
      help: "Using the core/most memorable part can weigh against fair use.",
      riskScore: { yes: 0, unsure: 1, no: 2 },
    },
    {
      key: "sourceWasPublished",
      label: "5) Is the source material already published publicly?",
      help: "Use of unpublished work may carry higher risk.",
      riskScore: { yes: 0, unsure: 1, no: 2 },
    },
    {
      key: "marketSubstitutionRisk",
      label: "6) Could your use replace the original in the market or harm licensing opportunities?",
      help: "If your work substitutes for the original, risk is usually higher.",
      riskScore: { yes: 2, unsure: 1, no: 0 },
    },
    {
      key: "creditAndContextProvided",
      label: "7) Are you giving clear attribution and context about why material is included?",
      help: "Credit alone is not a defense, but context can support your intent.",
      riskScore: { yes: 0, unsure: 1, no: 1 },
    },
  ];

  const stage = document.getElementById("carouselStage");
  const progressLabel = document.getElementById("progressLabel");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const evaluate = () => {
    const totalRisk = questions.reduce((sum, question) => sum + question.riskScore[state.values[question.key]], 0);
    const maxRisk = questions.length * 2;
    const fairUseIndex = Math.max(0, Math.min(100, Math.round(((maxRisk - totalRisk) / maxRisk) * 100)));

    let verdict = "Unclear — get legal advice";
    if (totalRisk <= 4) verdict = "Potentially fair use";
    else if (totalRisk >= 9) verdict = "Likely high-risk use";

    return { totalRisk, fairUseIndex, verdict };
  };

  const renderQuestion = (question) => {
    const selected = state.values[question.key];
    stage.innerHTML = `
      <article class="didactic-step">
        <h3>${question.label}</h3>
        <p class="small muted">${question.help}</p>
        <label class="q carousel-question" for="questionInput">
          <select id="questionInput">
            ${options
              .map((option) => `<option value="${option.value}" ${selected === option.value ? "selected" : ""}>${option.label}</option>`)
              .join("")}
          </select>
        </label>
      </article>
    `;

    const input = document.getElementById("questionInput");
    input.addEventListener("input", (event) => {
      state.values[question.key] = event.target.value;
    });
  };

  const renderResult = () => {
    const result = evaluate();

    stage.innerHTML = `
      <article class="didactic-step">
        <h3>Result: ${result.verdict}</h3>
        <div class="sheet">
          <div class="row"><span>Fair use index</span><strong>${result.fairUseIndex} / 100</strong></div>
          <div class="row"><span>Risk points</span><strong>${result.totalRisk} (lower is better)</strong></div>
        </div>
        <p class="small muted">This questionnaire is educational and not legal advice. If risk is medium or high, consult an IP lawyer before publishing.</p>
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
