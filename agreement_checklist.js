(function () {
  "use strict";

  const points = [
    {
      question: "Wer?",
      help: "Klären Sie frühzeitig, mit wem Sie es zu tun haben. Führen Sie – wenn notwendig – Recherchen durch. Finden Sie heraus, ob die Person für die Einhaltung der Zusagen selbst verantwortlich sein wird, oder ob Ihr Gegenüber für jemand anderen (Sammler/in, Programmbetreiber/in, Sponsor/in, Agentur etc.) handelt."
    },
    {
      question: "Wann?",
      help: "Klären Sie alle terminlichen Rahmenbedingungen. Beachten Sie, dass das Projekt nicht mit der Eröffnung abgeschlossen sein wird, sondern erst mit der Rückgabe der Arbeiten, der Fertigstellung des Katalogs, der Bezahlung aller Rechnungen, der Abrechnung, der Übergabe der Dokumentation oder anderer notwendiger Nachbearbeitungen abgeschlossen ist."
    },
    {
      question: "Was?",
      help: "Was wird von mir erwartet? Künstlerische Arbeit kann beschrieben werden. Auch wenn es sich um neue Arbeiten handelt, empfiehlt es sich, die gegenseitigen Vorstellungen über Medium, Technik, Größe und Aufwand in den Verhandlungen abzuklären, um unrealistischen Erwartungen frühzeitig entgegenzuwirken. Hier spielen auch Verwertungsrechte eine Rolle: Soll nur ausgestellt werden oder auch für Werbung, Folder, Grußkarten, Poster, Souvenirs usw. genutzt werden? Jede Nutzung sollte separat und ausdrücklich vereinbart – und gegebenenfalls honoriert – werden."
    },
    {
      question: "Wie viel?",
      help: "Klären Sie, ob ein Produktionsbudget zur Verfügung steht. Wird – unabhängig von Produktionskosten – ein Honorar bezahlt? Wenn ja, wie hoch ist dieses? Vereinbaren Sie eine Mindestgrößenordnung oder eine variable Summe, wenn das Gesamtbudget wegen laufender Finanzierungsbemühungen noch nicht feststeht."
    },
    {
      question: "Was will ich machen?",
      help: "Reflektieren Sie regelmäßig Ihre eigenen Projekt- und Produktionsprioritäten. Welche Vorhaben könnten im Rahmen der aktuellen Einladung sinnvoll realisiert werden? Verfügen Sie über unrealisierte Konzepte in verschiedenen Größenordnungen? Reflektieren Sie die künstlerischen, konzeptuellen, ethischen, politischen und ökonomischen Rahmenbedingungen Ihrer Arbeit und definieren Sie Grenzen dessen, was Sie bereit sind zu tun."
    },
    {
      question: "Was muss mit dem Produktions-/Projektbudget bezahlt werden?",
      help: "Geben Sie sich nicht mit der bloßen Nennung eines Budgets zufrieden. Besprechen Sie, welche Kosten damit bestritten werden müssen. Dieser Punkt führt häufig zu Konflikten, da manchmal auch institutionelle Fixkosten, Werbekosten, Reise- und Aufenthaltskosten in das Projektbudget eingerechnet werden."
    },
    {
      question: "Nutzungen / Verwertungsrechte?",
      help: "Wer verfügt nach Abschluss des Projekts über welche Verwertungsrechte? Verwertungsrechte und physisches Eigentum können in verschiedenen Händen liegen; mit einem Verkauf werden nicht automatisch sämtliche Rechte übertragen. Im Zweifel gelten nur jene Rechte als übertragen, die für den jeweiligen Zweck notwendig sind. Verhandeln Sie diesen Punkt besonders sorgfältig, insbesondere bei reproduzierbaren Werken, und weisen Sie auf Mitgliedschaften bei Verwertungsgesellschaften hin (z. B. Bildrecht)."
    },
    {
      question: "Was passiert, wenn das Projekt gefördert wird?",
      help: "Klären Sie vorab, ob eine projektspezifische Förderung zu einer Erhöhung des Produktionsbudgets führt, oder ob diese Förderung bereits Grundlage für das vereinbarte Budget war. Häufig liegen den Kalkulationen der Veranstalter/innen bereits Förderungserwartungen zugrunde."
    },
    {
      question: "Wie kommen meine Arbeiten hin? Wie kommen meine Arbeiten zurück?",
      help: "Wer organisiert und bezahlt den Transport der vereinbarten Arbeiten zum Ausstellungsort und zurück? Welche Standards gelten (Kunsttransport, Kurierdienste, Privattransport, Mitnahme durch Kolleg/innen)? Bis wann erfolgt der Rücktransport? Besteht für Hin- und Rücktransport ausreichender Versicherungsschutz? Kann die Rückstellung an einen anderen Ort verlangt werden – und zu welchen Kosten?"
    },
    {
      question: "Wie komme(n) ich/wir hin? Wo werde(n) ich/wir wohnen?",
      help: "Übernimmt der Veranstalter / die Veranstalterin die Reisekosten? Welche Verkehrsmittel und Kostenlimits gelten? In welchem Umfang werden Übernachtungs- und Aufenthaltskosten übernommen? Sind Begleitpersonen/Kinder mitgedacht? Gibt es vor Ort Kinderbetreuung? Werden Taggelder bezahlt?"
    },
    {
      question: "Wird für die Veranstaltung geworben?",
      help: "In welcher Form und auf wessen Kosten wird geworben? Wird eine Einladungskarte gedruckt, Postversand geplant, Social Media bespielt? Welche weiteren Werbe- und Informationsmaßnahmen sind geplant? Welche Mitwirkung wird vom Künstler / von der Künstlerin erwartet?"
    },
    {
      question: "Was brauche ich unbedingt?",
      help: "Definieren Sie die für die künstlerische Qualität unabdingbaren Voraussetzungen: korrekte Installation, Raum, Equipment, technische/personelle Ausstattung, Werkzeuge, Licht-/Tonanlagen usw. Besonders wichtig, wenn Sie nicht selbst aufbauen können oder vor Ort wenig Anpassungszeit besteht. Erstellen Sie klare Pläne, Skizzen und Installationsanweisungen."
    },
    {
      question: "Muss ich alles alleine machen?",
      help: "Klären Sie frühzeitig, welche Unterstützung Sie benötigen und welche Ressourcen dafür zur Verfügung stehen. Besprechen Sie, ob und in welcher Höhe Entlohnung für Assistent/innen, Freund/innen oder Helfer/innen vorgesehen ist. Beachten Sie, dass Sie auch für eigene Kollaborateur/innen Verantwortung tragen."
    },
    {
      question: "Welcher Versicherungsschutz besteht?",
      help: "Sind die Arbeiten während Transport, Aufbau und Ausstellung versichert? In welchem Umfang und mit welchem Versicherungswert? Beachten Sie, dass es auch nicht versicherbare Situationen geben kann (z. B. öffentlicher Raum, Benützbarkeit, schwierige Orte)."
    },
    {
      question: "Habe ich selbst alle Rechte?",
      help: "Verfügen Sie über alle Rechte, die Sie benötigen? Verwenden Sie geschützte Materialien? Gibt es Co-Autor/innen? Haben Sie alle Beteiligten korrekt genannt? Liegen notwendige Genehmigungen/Freigaben vor? Gehören Ihnen die verwendeten Materialien?"
    },
    {
      question: "Welche anderen Bedingungen sind mir wichtig?",
      help: "Deklarieren Sie weitere Bedingungen ausdrücklich – auch wenn sie sich nicht direkt auf die eigene Beteiligung beziehen. Welche spezifischen Erwartungen haben Sie an den Veranstalter / die Veranstalterin?"
    },
    {
      question: "Was passiert danach mit der Arbeit?",
      help: "Hier entstehen häufig Konflikte. Neu geschaffene Arbeiten können unter Umständen bereits im Eigentum des Veranstalters / der Veranstalterin stehen, wenn Material direkt dort bestellt und bezahlt wurde. Vereinbaren Sie klar, ob bzw. zu welchen Bedingungen die Arbeit nach Projektabschluss in Ihr Eigentum übergeht. Regeln Sie bei Bedarf Zerstörung, Lebensdauer, Wartungs-/Reparaturpflichten sowie Folgen bei späterem Verkauf (z. B. Rückerstattung von Produktionskosten, Honorarerhöhung bei dauerhaftem Verbleib)."
    },
    {
      question: "Was passiert, wenn ein Verkauf zustande kommt?",
      help: "Besprechen und vereinbaren Sie, ob und in welcher Höhe eine Beteiligung des Veranstalters / der Veranstalterin an Verkäufen vorgesehen ist – auch bei Verkäufen nach Abschluss der Ausstellung."
    },
    {
      question: "Wie wird die Veranstaltung dokumentiert / archiviert?",
      help: "In welcher Form ist Dokumentation geplant? Wird ein Katalog gedruckt – und auf wessen Kosten? Wer trägt inhaltliche und gestalterische Verantwortung? Welche Onlineaktivitäten sind geplant? Soll die Dokumentation dauerhaft online verfügbar sein, und wenn ja, zu welchen Bedingungen?"
    },
    {
      question: "Wer wird wo und wie genannt?",
      help: "Vereinbaren Sie die Nennung aller Beteiligten möglichst präzise inklusive Funktionsbezeichnungen. Beachten Sie, dass Sie auch für die Nennung Ihrer Kollaborateur/innen Verantwortung tragen. Klären Sie, ob Nennungen auch nach Projektabschluss (z. B. Videocredits) erfolgen müssen oder sollen."
    },
    {
      question: "Belegexemplare?",
      help: "Wie viele Exemplare von DVDs, Drucksorten oder Katalogen erhalten Sie kostenfrei? Welcher Preis gilt für zusätzliche Exemplare?"
    },
    {
      question: "Texte? Fotos? Videos? Online etc.?",
      help: "Wer verfasst zu welchen Bedingungen die notwendigen Texte? Müssen Texte vor Abdruck vorgelegt werden? Wer übernimmt Foto-/Video-Dokumentation? Wem stehen Aufnahmen zu welchen Bedingungen zur Verfügung? Werden Materialien vollständig oder nur teilweise übergeben? Welche Verpflichtungen bestehen über die Projektdauer hinaus gegenüber Fotograf/innen, Filmemacher/innen oder anderen Beteiligten?"
    },
    {
      question: "Archivierung?",
      help: "Ist eine dauerhafte Verwendung im Internet oder eine andere Form der (digitalen) Langzeitarchivierung vorgesehen? Sind Sie damit einverstanden? Ist es Ihnen wichtig, Materialien auszuwählen und nachbearbeiten zu können? Sollen Verwertungsrechte dafür zeitlich unbefristet eingeräumt werden?"
    },
    {
      question: "Wer erwartet noch eine Gegenleistung?",
      help: "Gibt es weitere Projektbeteiligte (Finanziers, Sponsor/innen, Rechteinhaber/innen), gegenüber denen Verpflichtungen bestehen? Diese Frage stellt sich etwa bei Artist-in-Residence-Programmen, wenn auch Unterkunftgeber/innen eine künstlerische Gegenleistung erwarten."
    },
    {
      question: "Und dann?",
      help: "Überlegen Sie, wie Sie nach einem Jahr auf das Projekt zurückblicken wollen: Wo sollen Ihre Arbeiten dann sein? Wie viel Geld wollen Sie verdient haben? Welche künstlerischen/kritischen Erfolge sollen eingetreten sein? In welchem Besitz sollen neue Werke sein? Welche Nennungen und Einnahmen erwarten Beteiligte auch künftig? Definieren Sie diese Erwartungen und besprechen Sie sie offen und klar."
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
