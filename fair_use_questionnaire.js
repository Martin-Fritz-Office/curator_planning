(function () {
  "use strict";

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
      label: "1) Welche Leistung soll honoriert werden?",
      help: "Die Basissätze decken nur Arbeitskosten (Unternehmer*innenlohn), nicht Spesen oder Produktion neuer Werke.",
      options: [
        { value: "exhibitionSolo", label: "Einzelausstellung (Basissatz 1.875 €)" },
        { value: "exhibition2to3", label: "Ausstellung mit 2–3 Künstler*innen (1.000 € pro Person)" },
        { value: "exhibition4to7", label: "Ausstellung mit 4–7 Künstler*innen (650 € pro Person)" },
        { value: "exhibition8plus", label: "Ausstellung mit 8+ Künstler*innen (450 € pro Person)" },
        { value: "performanceOnce", label: "Solo-Performance, einmalige Aufführung (450 €)" },
        { value: "lecture", label: "Artist Lecture bis 90 Minuten (450 €)" },
        { value: "talk", label: "Artist Talk/Führung bis 90 Minuten (275 €)" },
        { value: "moderationEditorial", label: "Moderation inkl. inhaltlicher Gestaltung bis 90 Minuten (450 €)" },
        { value: "moderationCoordination", label: "Moderation: Koordination/Begleitung bis 90 Minuten (325 €)" },
      ],
    },
    {
      key: "collective",
      type: "select",
      label: "2) Erfolgt die Ausstellungsbeteiligung als Kollektiv?",
      help: "Für Künstler*innenkollektive wird mindestens das 1,5-Fache empfohlen.",
      options: [
        { value: "no", label: "Nein" },
        { value: "yes", label: "Ja, Kollektiv" },
      ],
    },
    {
      key: "effort",
      type: "select",
      label: "3) Wie aufwändig ist das Projekt im Vergleich zum Mindestaufwand?",
      help: "Basissätze sind Ausgangspunkt. Höherer Aufwand sollte deutlich höher vergütet werden.",
      options: [
        { value: "lower", label: "Ungewöhnlich geringer Aufwand" },
        { value: "minimum", label: "Mindestaufwand (Basissatz passt)" },
        { value: "higher", label: "Erhöhter Aufwand" },
        { value: "muchHigher", label: "Deutlich erhöhter Aufwand" },
      ],
    },
    {
      key: "duration",
      type: "select",
      label: "4) Welche geplante Dauer hat das Format?",
      help: "Lecture/Talk/Moderation-Basissätze beziehen sich auf bis zu 90 Minuten.",
      options: [
        { value: "upTo90", label: "Bis 90 Minuten" },
        { value: "upTo180", label: "91 bis 180 Minuten" },
        { value: "more", label: "Mehr als 180 Minuten" },
      ],
    },
    {
      key: "extraPerformances",
      type: "number",
      label: "5) Wie viele zusätzliche Performance-Termine am selben Ort (andere Termine) sind geplant?",
      help: "Jeder weitere Termin wird mit 325 € empfohlen (nur relevant bei Performance).",
      min: 0,
      step: 1,
    },
    {
      key: "variableCosts",
      type: "number",
      label: "6) Welche variablen Kosten kommen voraussichtlich hinzu (in €)?",
      help: "Zum Beispiel Material, Transport, Reise, Lizenzen, anlassbezogene Kinderbetreuung.",
      min: 0,
      step: 50,
    },
    {
      key: "cancellationCoverage",
      type: "select",
      label: "7) Soll ein Ausfallshonorar vertraglich abgesichert werden?",
      help: "Empfohlen: je nach Absagezeitpunkt 50 % bzw. 100 %.",
      options: [
        { value: "none", label: "Noch nicht geklärt" },
        { value: "half", label: "Ja, mindestens 50 % bei früher Absage" },
        { value: "full", label: "Ja, 100 % bei kurzfristiger Absage" },
        { value: "both", label: "Ja, gestaffelt 50 % / 100 %" },
      ],
    },
    {
      key: "rightsUsage",
      type: "select",
      label: "8) Werden Werknutzung oder Verwertungsrechte zusätzlich eingeräumt?",
      help: "Rechtevergütungen kommen zusätzlich zum Honorar hinzu.",
      options: [
        { value: "no", label: "Nein" },
        { value: "yes", label: "Ja" },
      ],
    },
  ];

  const effortMultiplier = { lower: 0.8, minimum: 1, higher: 1.3, muchHigher: 1.6 };
  const durationMultiplier = { upTo90: 1, upTo180: 1.25, more: 1.5 };

  const stage = document.getElementById("carouselStage");
  const progressLabel = document.getElementById("progressLabel");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

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
      notes.push("Ausfallshonorar: mindestens 50 % bei rechtzeitiger Absage vertraglich vorsehen.");
    }
    if (state.values.cancellationCoverage === "full" || state.values.cancellationCoverage === "both") {
      notes.push("Ausfallshonorar: 100 % bei kurzfristiger Absage vertraglich vorsehen.");
    }
    if (state.values.rightsUsage === "yes") {
      notes.push("Vergütungen für Werknutzung/Verwertung zusätzlich zum Honorar verhandeln.");
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

  const euro = (value) => new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);

  const renderResult = () => {
    const result = evaluate();

    stage.innerHTML = `
      <article class="didactic-step">
        <h3>Empfehlung für ein faires Honorar</h3>
        <div class="sheet">
          <div class="row"><span>Basissatz laut Leitfaden</span><strong>${euro(result.base)}</strong></div>
          <div class="row"><span>Anpassung Kollektiv / Aufwand / Dauer</span><strong>x ${result.collectiveFactor.toFixed(2)} / ${result.effortFactor.toFixed(2)} / ${result.durationFactor.toFixed(2)}</strong></div>
          <div class="row"><span>Zusätzliche Performance-Termine</span><strong>${euro(result.extraPerformanceFee)}</strong></div>
          <div class="row"><span>Empfohlenes Arbeits-Honorar</span><strong>${euro(result.laborFee)}</strong></div>
          <div class="row"><span>+ Variable Kosten</span><strong>${euro(result.variableCosts)}</strong></div>
          <div class="row"><span>Zwischensumme (exkl. USt.)</span><strong>${euro(result.subtotal)}</strong></div>
        </div>
        <p class="small muted">Hinweis: Die Werte sind unverbindliche Orientierung für Verhandlungen und ersetzen keine individuelle Kalkulation (Fixkosten, Steuern, Rechte, Risikoaufschläge).</p>
        <ul>${result.notes.map((note) => `<li>${note}</li>`).join("") || "<li>Prüfe zusätzlich schriftliche Vereinbarungen zu Ausfallshonorar und Rechten.</li>"}</ul>
      </article>
    `;
  };

  const render = () => {
    const onResult = state.step === questions.length;

    progressLabel.textContent = onResult ? "Ergebnis" : `Frage ${state.step + 1} von ${questions.length}`;
    prevBtn.disabled = state.step === 0;
    nextBtn.textContent = onResult ? "Neu starten" : "Weiter";

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
})();
