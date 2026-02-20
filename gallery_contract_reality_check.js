(function () {
  "use strict";

  const lang = document.body?.dataset?.lang === "de" ? "de" : "en";
  const locale = lang === "de" ? "de-AT" : "en-IE";
  const tr = {
    en: {
      q: "Question", of: "of", result: "Result", next: "Next", reset: "Start over",
      renegotiate: "Renegotiate terms", pause: "Pause / decline", proceed: "Proceed with caution",
      labels: {
        grossRevenue: "Projected gross revenue",
        totalCosts: "Total projected costs",
        netAfterCosts: "Projected net after costs",
        netAfterCommission: "Net after gallery commission",
        cashflowRisk: "Cashflow risk penalty",
        leverageScore: "Negotiation leverage score",
        decisionScore: "Decision score"
      },
      tip: "Tip: before signing, ask for written payment schedule, production cost cap, and a minimum guaranteed amount."
    },
    de: {
      q: "Frage", of: "von", result: "Ergebnis", next: "Weiter", reset: "Von vorne",
      renegotiate: "Konditionen nachverhandeln", pause: "Pausieren / absagen", proceed: "Vorsichtig zusagen",
      labels: {
        grossRevenue: "Erwarteter Bruttoumsatz",
        totalCosts: "Gesamte erwartete Kosten",
        netAfterCosts: "Erwartetes Netto nach Kosten",
        netAfterCommission: "Netto nach Galerieprovision",
        cashflowRisk: "Cashflow-Risikoabzug",
        leverageScore: "Verhandlungshebel-Score",
        decisionScore: "Entscheidungs-Score"
      },
      tip: "Tipp: Bitte vor der Unterschrift um schriftlichen Zahlungsplan, Kostendeckel für Produktion und einen garantierten Mindestbetrag."
    }
  }[lang];

  const EUR = (n) => new Intl.NumberFormat(locale, { style: "currency", currency: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(n) || 0);

  const state = { step: 0, values: { expectedSales: 32000, galleryCommissionPct: 50, productionCosts: 9000, transportInsurance: 1800, travelAccommodation: 1200, paymentDelayDays: 60, exclusivityMonths: 12, contractClarity: 6, returnPolicyStrength: 5, artistBrandFit: 7, followOnOpportunity: 40, minimumNetThreshold: 8000 } };

  const questions = lang === "de" ? [
    { key: "expectedSales", label: "1) Erwarteter Bruttoumsatz aus Verkäufen (€)", min: 0, step: 100 },
    { key: "galleryCommissionPct", label: "2) Galerieprovision (%)", min: 0, max: 100, step: 1 },
    { key: "productionCosts", label: "3) Produktionskosten (€)", min: 0, step: 50 },
    { key: "transportInsurance", label: "4) Transport- und Versicherungskosten (€)", min: 0, step: 50 },
    { key: "travelAccommodation", label: "5) Reise-/Unterbringungskosten (€)", min: 0, step: 50 },
    { key: "paymentDelayDays", label: "6) Tage bis zur Auszahlung durch die Galerie", min: 0, max: 365, step: 1 },
    { key: "exclusivityMonths", label: "7) Exklusivitätsdauer (Monate)", min: 0, max: 60, step: 1 },
    { key: "contractClarity", label: "8) Vertragsklarheit (1–10)", min: 1, max: 10, step: 1 },
    { key: "returnPolicyStrength", label: "9) Absicherung bei Rückgabe/Storno (1–10)", min: 1, max: 10, step: 1 },
    { key: "artistBrandFit", label: "10) Strategische Passung mit Galerie (1–10)", min: 1, max: 10, step: 1 },
    { key: "followOnOpportunity", label: "11) Wahrscheinlichkeit von Folgechancen (%)", min: 0, max: 100, step: 1 },
    { key: "minimumNetThreshold", label: "12) Mindest-Nettoerlös, den du brauchst (€)", min: 0, step: 100 },
  ] : [
    { key: "expectedSales", label: "1) Projected gross sales revenue (€)", min: 0, step: 100 },
    { key: "galleryCommissionPct", label: "2) Gallery commission (%)", min: 0, max: 100, step: 1 },
    { key: "productionCosts", label: "3) Production costs (€)", min: 0, step: 50 },
    { key: "transportInsurance", label: "4) Transport and insurance costs (€)", min: 0, step: 50 },
    { key: "travelAccommodation", label: "5) Travel/accommodation costs (€)", min: 0, step: 50 },
    { key: "paymentDelayDays", label: "6) Days until gallery pays out", min: 0, max: 365, step: 1 },
    { key: "exclusivityMonths", label: "7) Exclusivity duration (months)", min: 0, max: 60, step: 1 },
    { key: "contractClarity", label: "8) Contract clarity (1–10)", min: 1, max: 10, step: 1 },
    { key: "returnPolicyStrength", label: "9) Return/cancellation protection strength (1–10)", min: 1, max: 10, step: 1 },
    { key: "artistBrandFit", label: "10) Strategic fit with gallery (1–10)", min: 1, max: 10, step: 1 },
    { key: "followOnOpportunity", label: "11) Follow-on opportunities probability (%)", min: 0, max: 100, step: 1 },
    { key: "minimumNetThreshold", label: "12) Minimum net proceeds you need (€)", min: 0, step: 100 },
  ];

  const stage = document.getElementById("carouselStage");
  const progressLabel = document.getElementById("progressLabel");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const compute = () => {
    const grossRevenue = state.values.expectedSales;
    const totalCosts = state.values.productionCosts + state.values.transportInsurance + state.values.travelAccommodation;
    const netAfterCosts = grossRevenue - totalCosts;
    const netAfterCommission = netAfterCosts * (1 - state.values.galleryCommissionPct / 100);
    const cashflowRisk = Math.min(30, state.values.paymentDelayDays / 5 + state.values.exclusivityMonths * 0.8);
    const leverageScore = state.values.contractClarity * 3 + state.values.returnPolicyStrength * 2 + state.values.artistBrandFit * 2 + state.values.followOnOpportunity * 0.25;
    const thresholdGap = netAfterCommission - state.values.minimumNetThreshold;
    const decisionScore = Math.max(0, Math.min(100, 50 + thresholdGap / Math.max(1, state.values.minimumNetThreshold) * 55 + leverageScore - cashflowRisk));

    let recommendation = tr.renegotiate;
    if (decisionScore < 40) recommendation = tr.pause;
    else if (decisionScore >= 65) recommendation = tr.proceed;

    return { grossRevenue, totalCosts, netAfterCosts, netAfterCommission, cashflowRisk, leverageScore, decisionScore, recommendation };
  };

  const renderQuestion = (question) => {
    stage.innerHTML = `<article class="didactic-step"><h3>${question.label}</h3><label class="q carousel-question" for="questionInput"><input id="questionInput" type="number" min="${question.min}" ${question.max !== undefined ? `max="${question.max}"` : ""} step="${question.step}" value="${state.values[question.key]}" /></label></article>`;
    document.getElementById("questionInput").addEventListener("input", (event) => { state.values[question.key] = Number(event.target.value) || 0; });
  };

  const renderResult = () => {
    const r = compute();
    stage.innerHTML = `<article class="didactic-step"><h3>${tr.result}: ${r.recommendation}</h3><div class="sheet"><div class="row"><span>${tr.labels.grossRevenue}</span><strong>${EUR(r.grossRevenue)}</strong></div><div class="row"><span>${tr.labels.totalCosts}</span><strong>${EUR(r.totalCosts)}</strong></div><div class="row"><span>${tr.labels.netAfterCosts}</span><strong>${EUR(r.netAfterCosts)}</strong></div><div class="row"><span>${tr.labels.netAfterCommission}</span><strong>${EUR(r.netAfterCommission)}</strong></div><div class="row"><span>${tr.labels.cashflowRisk}</span><strong>${r.cashflowRisk.toFixed(1)}</strong></div><div class="row"><span>${tr.labels.leverageScore}</span><strong>${r.leverageScore.toFixed(1)}</strong></div><div class="row"><span>${tr.labels.decisionScore}</span><strong>${r.decisionScore.toFixed(1)} / 100</strong></div></div><p class="small muted">${tr.tip}</p></article>`;
  };

  const render = () => {
    const onResult = state.step === questions.length;
    progressLabel.textContent = onResult ? tr.result : `${tr.q} ${state.step + 1} ${tr.of} ${questions.length}`;
    prevBtn.disabled = state.step === 0;
    nextBtn.textContent = onResult ? tr.reset : tr.next;
    onResult ? renderResult() : renderQuestion(questions[state.step]);
  };

  prevBtn.addEventListener("click", () => { if (state.step > 0) { state.step -= 1; render(); } });
  nextBtn.addEventListener("click", () => { state.step = state.step < questions.length ? state.step + 1 : 0; render(); });

  render();
})();
