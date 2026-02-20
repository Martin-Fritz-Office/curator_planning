(function () {
  "use strict";

  const lang = document.body?.dataset?.lang === "de" ? "de" : "en";
  const locale = lang === "de" ? "de-AT" : "en-IE";

  const t = {
    en: {
      question: "Question",
      of: "of",
      result: "Result",
      startOver: "Start over",
      next: "Next",
      decline: "Decline",
      go: "Go",
      renegotiate: "Renegotiate",
      resultTitle: "Result",
      tip: "Tip: if recommendation is <strong>Renegotiate</strong>, ask for a higher fee, shorter payment delay, and stronger cancellation compensation.",
      labels: {
        totalHours: "Total planned hours",
        grossAfterCosts: "Gross after external costs",
        netAfterTax: "Estimated net after tax/socials",
        netHourly: "Estimated net hourly",
        thresholdGap: "Gap vs. minimum acceptable net",
        viabilityScore: "Viability score"
      }
    },
    de: {
      question: "Frage",
      of: "von",
      result: "Ergebnis",
      startOver: "Von vorne",
      next: "Weiter",
      decline: "Absagen",
      go: "Zusage",
      renegotiate: "Nachverhandeln",
      resultTitle: "Ergebnis",
      tip: "Tipp: Wenn die Empfehlung <strong>Nachverhandeln</strong> lautet, fordere ein höheres Honorar, kürzere Zahlungsziele und besseren Ausfallersatz.",
      labels: {
        totalHours: "Geplante Gesamtstunden",
        grossAfterCosts: "Brutto nach externen Kosten",
        netAfterTax: "Geschätztes Netto nach Steuer/Abgaben",
        netHourly: "Geschätztes Netto pro Stunde",
        thresholdGap: "Abstand zum Mindest-Netto",
        viabilityScore: "Tragfähigkeits-Score"
      }
    }
  }[lang];

  const EUR = (n) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(n) || 0);

  const state = { step: 0, values: { feeOffered: 5000, scopeClarity: 7, prepHours: 30, productionHours: 45, travelAdminHours: 20, subcontractorCosts: 900, taxMultiplier: 1.6, paymentDelayDays: 45, cancellationCoverage: 40, networkUpside: 7, followOnProbability: 35, stressRisk: 5, minAcceptableNet: 2800 } };

  const questions = lang === "de" ? [
    { key: "feeOffered", label: "1) Angebotene Vergütung für dieses Projekt (€)", min: 0, step: 100 },
    { key: "scopeClarity", label: "2) Klarheit des Auftrags (1 = vage, 10 = glasklar)", min: 1, max: 10, step: 1 },
    { key: "prepHours", label: "3) Geschätzte Vorbereitungsstunden", min: 0, step: 1 },
    { key: "productionHours", label: "4) Geschätzte Produktions-/Koordinationsstunden", min: 0, step: 1 },
    { key: "travelAdminHours", label: "5) Geschätzte Reise- + Administrationsstunden", min: 0, step: 1 },
    { key: "subcontractorCosts", label: "6) Subunternehmer- und externe Kosten (€)", min: 0, step: 50 },
    { key: "taxMultiplier", label: "7) Steuer-/Abgabenfaktor (z. B. 1,5–1,8)", min: 1.1, max: 2.5, step: 0.1 },
    { key: "paymentDelayDays", label: "8) Zahlungsziel: Tage bis zur vollständigen Zahlung", min: 0, max: 365, step: 1 },
    { key: "cancellationCoverage", label: "9) Ausfallregelung: % des Honorars bei Absage", min: 0, max: 100, step: 1 },
    { key: "networkUpside", label: "10) Reputation-/Netzwerk-Nutzen (1–10)", min: 1, max: 10, step: 1 },
    { key: "followOnProbability", label: "11) Wahrscheinlichkeit von Folgeaufträgen (%)", min: 0, max: 100, step: 1 },
    { key: "stressRisk", label: "12) Burnout-/Stressrisiko (1 niedrig – 10 hoch)", min: 1, max: 10, step: 1 },
    { key: "minAcceptableNet", label: "13) Mindest-Nettoeinkommen für dieses Projekt (€)", min: 0, step: 100 },
  ] : [
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

    let recommendation = t.decline;
    if (viabilityScore >= 65) recommendation = t.go;
    else if (viabilityScore >= 45) recommendation = t.renegotiate;

    return { totalHours, grossAfterCosts, netAfterTax, netHourly, thresholdGap, viabilityScore, recommendation };
  };

  const renderQuestion = (question) => {
    stage.innerHTML = `<article class="didactic-step"><h3>${question.label}</h3><label class="q carousel-question" for="questionInput"><input id="questionInput" type="number" min="${question.min}" ${question.max !== undefined ? `max="${question.max}"` : ""} step="${question.step}" value="${state.values[question.key]}" /></label></article>`;
    document.getElementById("questionInput").addEventListener("input", (event) => { state.values[question.key] = Number(event.target.value) || 0; });
  };

  const renderResult = () => {
    const m = metrics();
    stage.innerHTML = `<article class="didactic-step"><h3>${t.resultTitle}: ${m.recommendation}</h3><div class="sheet"><div class="row"><span>${t.labels.totalHours}</span><strong>${m.totalHours.toFixed(1)} h</strong></div><div class="row"><span>${t.labels.grossAfterCosts}</span><strong>${EUR(m.grossAfterCosts)}</strong></div><div class="row"><span>${t.labels.netAfterTax}</span><strong>${EUR(m.netAfterTax)}</strong></div><div class="row"><span>${t.labels.netHourly}</span><strong>${EUR(m.netHourly)}</strong></div><div class="row"><span>${t.labels.thresholdGap}</span><strong class="${m.thresholdGap >= 0 ? '' : 'neg'}">${EUR(m.thresholdGap)}</strong></div><div class="row"><span>${t.labels.viabilityScore}</span><strong>${m.viabilityScore.toFixed(1)} / 100</strong></div></div><p class="small muted">${t.tip}</p></article>`;
  };

  const render = () => {
    const onResult = state.step === questions.length;
    progressLabel.textContent = onResult ? t.result : `${t.question} ${state.step + 1} ${t.of} ${questions.length}`;
    prevBtn.disabled = state.step === 0;
    nextBtn.textContent = onResult ? t.startOver : t.next;
    onResult ? renderResult() : renderQuestion(questions[state.step]);
  };

  prevBtn.addEventListener("click", () => { if (state.step > 0) { state.step -= 1; render(); } });
  nextBtn.addEventListener("click", () => { state.step = state.step < questions.length ? state.step + 1 : 0; render(); });

  render();
})();
