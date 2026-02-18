(function () {
  "use strict";

  const points = [
    "Wer ist mein Gegenüber und wer trägt tatsächlich Verantwortung?",
    "Welche Termine gelten bis zur finalen Abwicklung nach Projektende?",
    "Was wird konkret erwartet (Medium, Umfang, Aufwand, Nutzung)?",
    "Wie hoch sind Produktionsbudget und Honorar?",
    "Was will ich in diesem Projekt wirklich machen – und was nicht?",
    "Welche Kosten müssen aus dem Projektbudget gedeckt werden?",
    "Welche Nutzungs- und Verwertungsrechte werden übertragen?",
    "Was passiert bei zusätzlicher Förderung des Projekts?",
    "Wer organisiert und bezahlt Hin- und Rücktransport der Arbeiten?",
    "Wer trägt Reise-, Aufenthalts- und ggf. Betreuungskosten?",
    "Wie und auf wessen Kosten wird kommuniziert/geworben?",
    "Welche Mindestvoraussetzungen brauche ich vor Ort unbedingt?",
    "Welche personelle Unterstützung brauche ich – und wie wird sie bezahlt?",
    "Welcher Versicherungsschutz gilt für Transport, Aufbau und Laufzeit?",
    "Habe ich selbst alle nötigen Rechte/Freigaben für Materialien?",
    "Welche weiteren Bedingungen sind mir wichtig?",
    "Was passiert nach Projektende mit der produzierten Arbeit?",
    "Wie wird ein möglicher Verkauf geregelt (Beteiligungen, Fristen)?",
    "Wie wird dokumentiert und archiviert – auch online?",
    "Wer wird wie genannt (Credits, Kollaborateur*innen, Dauer)?",
    "Wie viele Belegexemplare bekomme ich kostenfrei?",
    "Wer erstellt Texte/Fotos/Videos und mit welchen Freigaben?",
    "Ist Langzeitarchivierung geplant und unter welchen Bedingungen?",
    "Gibt es weitere Gegenleistungen gegenüber Dritten?",
    "Wie soll das Projekt in einem Jahr bilanziert werden?"
  ];

  const STORAGE_KEY = "agreementChecklistState";

  const state = {
    showOnlyOpen: false,
    items: points.map((label) => ({
      label,
      status: "open",
      note: "",
    })),
  };

  const listEl = document.getElementById("agreementList");
  const progressEl = document.getElementById("agreementProgress");
  const showOpenBtn = document.getElementById("showOpenBtn");
  const copySummaryBtn = document.getElementById("copySummaryBtn");

  const load = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return;
      parsed.forEach((saved, index) => {
        if (!state.items[index]) return;
        state.items[index].status = ["open", "done", "risk", "n_a"].includes(saved.status) ? saved.status : "open";
        state.items[index].note = typeof saved.note === "string" ? saved.note : "";
      });
    } catch (_) {
      // ignore corrupted local storage
    }
  };

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  };

  const getLabelForStatus = (status) => {
    if (status === "done") return "geklärt";
    if (status === "risk") return "kritisch";
    if (status === "n_a") return "nicht relevant";
    return "offen";
  };

  const updateProgress = () => {
    const cleared = state.items.filter((item) => item.status === "done" || item.status === "n_a").length;
    const critical = state.items.filter((item) => item.status === "risk").length;
    progressEl.textContent = `${cleared} / ${state.items.length} geklärt · ${critical} kritisch`;
  };

  const render = () => {
    updateProgress();

    const visibleItems = state.items
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => !state.showOnlyOpen || item.status === "open" || item.status === "risk");

    listEl.innerHTML = visibleItems
      .map(({ item, index }) => `
        <article class="agreement-item agreement-status-${item.status}">
          <div class="agreement-head">
            <h3>${index + 1}) ${item.label}</h3>
            <span class="pill">${getLabelForStatus(item.status)}</span>
          </div>
          <div class="agreement-controls" role="radiogroup" aria-label="Status für Punkt ${index + 1}">
            ${[
              ["open", "Offen"],
              ["done", "Geklärt"],
              ["risk", "Kritisch"],
              ["n_a", "Nicht relevant"],
            ]
              .map(
                ([value, label]) => `
              <label class="agreement-option">
                <input type="radio" name="status-${index}" value="${value}" ${item.status === value ? "checked" : ""} />
                <span>${label}</span>
              </label>
            `
              )
              .join("")}
          </div>
          <label class="q">
            <span class="hint">Notizen / nächste Schritte</span>
            <textarea data-note-index="${index}" rows="2" placeholder="z. B. bis wann klären, mit wem, welche Formulierung im Vertrag nötig ist">${item.note.replace(/</g, "&lt;")}</textarea>
          </label>
        </article>
      `)
      .join("");

    listEl.querySelectorAll('input[type="radio"]').forEach((input) => {
      input.addEventListener("change", (event) => {
        const match = event.target.name.match(/status-(\d+)/);
        if (!match) return;
        const index = Number(match[1]);
        state.items[index].status = event.target.value;
        save();
        render();
      });
    });

    listEl.querySelectorAll("textarea[data-note-index]").forEach((textarea) => {
      textarea.addEventListener("input", (event) => {
        const index = Number(event.target.getAttribute("data-note-index"));
        state.items[index].note = event.target.value;
        save();
      });
    });

    showOpenBtn.textContent = state.showOnlyOpen ? "Alle Punkte zeigen" : "Nur offene Punkte zeigen";
  };

  showOpenBtn.addEventListener("click", () => {
    state.showOnlyOpen = !state.showOnlyOpen;
    render();
  });

  copySummaryBtn.addEventListener("click", async () => {
    const lines = state.items.map((item, index) => {
      const notePart = item.note.trim() ? ` – Notiz: ${item.note.trim()}` : "";
      return `${index + 1}) [${getLabelForStatus(item.status)}] ${item.label}${notePart}`;
    });

    const payload = `Projektvereinbarungs-Checkliste (25 Punkte)\n\n${lines.join("\n")}`;

    try {
      await navigator.clipboard.writeText(payload);
      copySummaryBtn.textContent = "Zusammenfassung kopiert";
    } catch (_) {
      copySummaryBtn.textContent = "Kopieren nicht möglich";
    }

    window.setTimeout(() => {
      copySummaryBtn.textContent = "Zusammenfassung kopieren";
    }, 1600);
  });

  load();
  render();
})();
