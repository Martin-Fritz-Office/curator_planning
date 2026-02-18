(function () {
  "use strict";

  const points = [
    {
      question: "Wer ist mein Gegenüber und wer trägt tatsächlich Verantwortung?",
      help: "Kläre früh, ob dein Gegenüber selbst entscheiden kann oder für Dritte handelt (z. B. Sponsor*in, Agentur, Sammler*in)."
    },
    {
      question: "Welche Termine gelten bis zur finalen Abwicklung nach Projektende?",
      help: "Projektende ist nicht die Eröffnung: Rückgabe, Rechnungen, Doku, Katalog und Abrechnung gehören zeitlich mitvereinbart."
    },
    {
      question: "Was wird konkret erwartet (Medium, Umfang, Aufwand, Nutzung)?",
      help: "Formuliere Erwartungen zu Medium, Technik, Größe und Verwendungen klar. Jede zusätzliche Nutzung sollte separat vereinbart und ggf. honoriert werden."
    },
    {
      question: "Wie hoch sind Produktionsbudget und Honorar?",
      help: "Unterscheide Produktionskosten und Honorar. Wenn das Gesamtbudget unsicher ist, vereinbare Mindesthöhe oder variable Bandbreite."
    },
    {
      question: "Was will ich in diesem Projekt wirklich machen – und was nicht?",
      help: "Definiere Prioritäten und Grenzen: künstlerisch, ethisch, politisch und ökonomisch. Das hilft bei Zu- oder Absage."
    },
    {
      question: "Welche Kosten müssen aus dem Projektbudget gedeckt werden?",
      help: "Kläre genau, welche Posten enthalten sind (z. B. Werbung, Reise, institutionelle Fixkosten), um spätere Konflikte zu vermeiden."
    },
    {
      question: "Welche Nutzungs- und Verwertungsrechte werden übertragen?",
      help: "Physisches Eigentum und Verwertungsrechte sind getrennt. Rechte nur zweckbezogen einräumen und Sondernutzungen explizit regeln."
    },
    {
      question: "Was passiert bei zusätzlicher Förderung des Projekts?",
      help: "Vereinbare vorab, ob eine Förderung dein Budget erhöht oder bereits in der bestehenden Kalkulation eingerechnet war."
    },
    {
      question: "Wer organisiert und bezahlt Hin- und Rücktransport der Arbeiten?",
      help: "Lege Zuständigkeiten, Transportstandard, Fristen und Versicherung für beide Richtungen fest."
    },
    {
      question: "Wer trägt Reise-, Aufenthalts- und ggf. Betreuungskosten?",
      help: "Kläre Verkehrsmittel, Kostenlimits, Unterkunft, Tagesgelder und ob Begleitung/Kind mitgedacht werden kann."
    },
    {
      question: "Wie und auf wessen Kosten wird kommuniziert/geworben?",
      help: "Bestimme Maßnahmen, Budgets und deine Mitwirkung bei Einladung, Versand, Social Media und weiteren Kanälen."
    },
    {
      question: "Welche Mindestvoraussetzungen brauche ich vor Ort unbedingt?",
      help: "Definiere Must-haves für Qualität (Installation, Technik, Personal, Raum) und gib klare Pläne/Anweisungen weiter."
    },
    {
      question: "Welche personelle Unterstützung brauche ich – und wie wird sie bezahlt?",
      help: "Plane Assistenz früh ein und vereinbare Entlohnung. Berücksichtige auch deine Verantwortung gegenüber Kollaborateur*innen."
    },
    {
      question: "Welcher Versicherungsschutz gilt für Transport, Aufbau und Laufzeit?",
      help: "Prüfe Umfang und Werte der Versicherung. Beachte, dass manche Kontexte (z. B. öffentlicher Raum) schwer versicherbar sind."
    },
    {
      question: "Habe ich selbst alle nötigen Rechte/Freigaben für Materialien?",
      help: "Sichere Urheberrechte, Co-Autor*innenschaft, Genehmigungen, Quellen und korrekte Nennungen aller Beteiligten."
    },
    {
      question: "Welche weiteren Bedingungen sind mir wichtig?",
      help: "Halte zusätzliche Bedingungen ausdrücklich fest, auch wenn sie nicht direkt die eigene Leistung betreffen."
    },
    {
      question: "Was passiert nach Projektende mit der produzierten Arbeit?",
      help: "Regle Eigentum, mögliche Zerstörung, Lebensdauer, Wartung und Folgen bei dauerhaftem Verbleib oder spätem Verkauf."
    },
    {
      question: "Wie wird ein möglicher Verkauf geregelt (Beteiligungen, Fristen)?",
      help: "Vereinbare, ob und wann Beteiligungen fällig werden, auch bei Verkäufen nach Ausstellungsende."
    },
    {
      question: "Wie wird dokumentiert und archiviert – auch online?",
      help: "Kläre Formate, Verantwortungen, Kosten und ob Materialien dauerhaft online bleiben sollen."
    },
    {
      question: "Wer wird wie genannt (Credits, Kollaborateur*innen, Dauer)?",
      help: "Lege Nennungen präzise fest: Funktionen, Orte und Dauer der Credits (auch nach Projektabschluss)."
    },
    {
      question: "Wie viele Belegexemplare bekomme ich kostenfrei?",
      help: "Bestimme Anzahl kostenloser Exemplare (Kataloge, Drucke, DVDs etc.) und Preise für zusätzliche Stücke."
    },
    {
      question: "Wer erstellt Texte/Fotos/Videos und mit welchen Freigaben?",
      help: "Regle Zuständigkeit, Freigabeprozesse vor Veröffentlichung und Nutzungsrechte an Foto-/Video-/Textmaterial."
    },
    {
      question: "Ist Langzeitarchivierung geplant und unter welchen Bedingungen?",
      help: "Entscheide, ob dauerhafte digitale Verfügbarkeit gewünscht ist und ob zeitlich unbefristete Rechte eingeräumt werden."
    },
    {
      question: "Gibt es weitere Gegenleistungen gegenüber Dritten?",
      help: "Prüfe Verpflichtungen gegenüber Sponsor*innen, Finanziers, Rechteeigner*innen oder Unterkunftgeber*innen."
    },
    {
      question: "Wie soll das Projekt in einem Jahr bilanziert werden?",
      help: "Definiere gewünschte Ergebnisse vorab: Einkommen, Wirkung, Besitzverhältnisse, Nennungen und spätere Einnahmen."
    }
  ];

  const STORAGE_KEY = "agreementChecklistState";

  const state = {
    showOnlyOpen: false,
    items: points.map((point) => ({
      question: point.question,
      help: point.help,
      status: "open",
      note: "",
    })),
  };

  const listEl = document.getElementById("agreementList");
  const progressEl = document.getElementById("agreementProgress");
  const showOpenBtn = document.getElementById("showOpenBtn");
  const copySummaryBtn = document.getElementById("copySummaryBtn");
  const contextModal = document.getElementById("contextModal");
  const contextModalTitle = document.getElementById("contextModalTitle");
  const contextModalBody = document.getElementById("contextModalBody");
  const contextModalCloseBtn = document.getElementById("contextModalCloseBtn");

  const escapeHtml = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");

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


  const openContextModal = (index) => {
    const item = state.items[index];
    if (!item) return;
    contextModalTitle.textContent = `${index + 1}) ${item.question}`;
    contextModalBody.textContent = item.help;
    contextModal.hidden = false;
    document.body.classList.add("modal-open");
    contextModalCloseBtn.focus();
  };

  const closeContextModal = () => {
    contextModal.hidden = true;
    document.body.classList.remove("modal-open");
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
            <h3>${index + 1}) ${escapeHtml(item.question)}</h3>
            <div class="agreement-head-actions">
              <span class="agreement-tooltip" tabindex="0" title="Kurzinfo: ${escapeHtml(item.help)}" aria-label="Kurzinfo zu Punkt ${index + 1}: ${escapeHtml(item.help)}">ⓘ</span>
              <button type="button" class="btn btn-outline agreement-context-btn" data-context-index="${index}" aria-label="Mehr Kontext zu Punkt ${index + 1}">Mehr Kontext</button>
              <span class="pill">${getLabelForStatus(item.status)}</span>
            </div>
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
            <textarea data-note-index="${index}" rows="2" placeholder="z. B. bis wann klären, mit wem, welche Formulierung im Vertrag nötig ist">${escapeHtml(item.note)}</textarea>
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

    listEl.querySelectorAll("button[data-context-index]").forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = Number(event.currentTarget.getAttribute("data-context-index"));
        openContextModal(index);
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

  contextModalCloseBtn.addEventListener("click", closeContextModal);

  contextModal.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement && event.target.getAttribute("data-close-modal") === "true") {
      closeContextModal();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !contextModal.hidden) {
      closeContextModal();
    }
  });

  copySummaryBtn.addEventListener("click", async () => {
    const lines = state.items.map((item, index) => {
      const notePart = item.note.trim() ? ` – Notiz: ${item.note.trim()}` : "";
      return `${index + 1}) [${getLabelForStatus(item.status)}] ${item.question}${notePart}`;
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
