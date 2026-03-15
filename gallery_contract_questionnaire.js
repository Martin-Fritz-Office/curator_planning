(function () {
  "use strict";

  const lang = document.body?.dataset?.lang === "de" ? "de" : "en";

  const state = {
    step: 0,
    info: { artist: "", gallery: "", title: "", startDate: "", endDate: "" },
    answers: Array(8).fill(null),
  };

  const tr = {
    en: {
      stepLabel: "Question", of: "of", infoStep: "Exhibition details",
      result: "Confirmation letter", next: "Next", back: "Back", reset: "Start over",
      copyBtn: "Copy letter text", copied: "Copied!",
      infoLabels: { artist: "Artist name", gallery: "Gallery name", title: "Exhibition title", startDate: "Opening date", endDate: "Closing date" },
      infoHint: "Fill in the details below. These will appear in the generated confirmation letter.",
      letterTitle: "Exhibition Agreement – Confirmation Letter",
      letterIntro: (i) => `Dear ${i.gallery || "[Gallery]"},\n\nThis letter confirms the terms agreed for the solo exhibition "${i.title || "[Exhibition title]"}" at ${i.gallery || "[Gallery name]"}, scheduled from ${i.startDate || "[opening date]"} to ${i.endDate || "[closing date]"}.\n\nArtist: ${i.artist || "[Artist name]"}\n`,
      letterClose: (i) => `Both parties confirm these terms as the basis for their collaboration on this exhibition.\n\nSigned:\n\n_________________________        _________________________\n${i.artist || "[Artist name]"}             Gallery Representative\n\nDate: ____________________       Date: ____________________`,
      nextStepSuggestion: "Check all 25 contract points before signing",
      nextStepLink: "agreement_checklist_en.php",
      nextStepLabel: "25-point Agreement Checklist →",
      unansweredHint: "Please answer all questions before viewing the letter.",
      questions: [
        {
          id: "commission",
          label: "1) Gallery commission on sales",
          hint: "The percentage of each sale price that the gallery retains.",
          options: [
            { value: "a", label: "30%", desc: "Artist-favorable rate" },
            { value: "b", label: "40%", desc: "Reduced Common standard rate" },
            { value: "c", label: "50%", desc: "Common standard rate Typical for primary galleries" },
          ],
          letter: {
            heading: "1. Gallery Commission",
            a: "The gallery will receive 30% commission on all sales completed during or within the agreed post-exhibition sales period.",
            b: "The gallery will receive 40% commission on all sales completed during or within the agreed post-exhibition sales period.",
            c: "The gallery will receive 50% commission on all sales completed during or within the agreed post-exhibition sales period.",
          },
        },
        {
          id: "transport",
          label: "2) Transport costs (delivery and return of works)",
          hint: "Who pays for shipping the works to the gallery and back.",
          options: [
            { value: "a", label: "Gallery pays all", desc: "Gallery covers delivery and return" },
            { value: "b", label: "Split equally", desc: "Costs shared 50/50 between gallery and artist" },
            { value: "c", label: "Artist pays all", desc: "Artist covers all transport costs" },
          ],
          letter: {
            heading: "2. Transport Costs",
            a: "The gallery covers all transport costs for the works to and from the gallery.",
            b: "Transport costs (delivery and return) are split equally between gallery and artist.",
            c: "The artist is responsible for all transport costs for delivering and returning the works.",
          },
        },
        {
          id: "insurance",
          label: "3) Insurance of works during the exhibition",
          hint: "Who insures the artworks against loss or damage while in the gallery.",
          options: [
            { value: "a", label: "Gallery insures at full value", desc: "Gallery's expense, full replacement value" },
            { value: "b", label: "Gallery insures, artist co-pays", desc: "Gallery arranges, artist contributes to premium" },
            { value: "c", label: "Artist insures own works", desc: "Artist's own responsibility throughout" },
          ],
          letter: {
            heading: "3. Insurance",
            a: "The gallery insures all exhibited works at their full replacement value at no cost to the artist.",
            b: "The gallery arranges insurance for all exhibited works; the artist contributes to the insurance premium.",
            c: "The artist is responsible for insuring their own works for the full duration of the exhibition.",
          },
        },
        {
          id: "payment",
          label: "4) Payment timeline after a sale",
          hint: "How quickly the artist receives payment once a work is sold.",
          options: [
            { value: "a", label: "Within 30 days of sale", desc: "Fast payout per individual sale" },
            { value: "b", label: "Within 60 days of sale", desc: "Standard payout per individual sale" },
            { value: "c", label: "One payment after exhibition closes", desc: "All proceeds paid in a single transfer" },
          ],
          letter: {
            heading: "4. Payment Timeline",
            a: "Payment for sold works will be made to the artist within 30 days of each individual sale.",
            b: "Payment for sold works will be made to the artist within 60 days of each individual sale.",
            c: "All proceeds from sales will be paid in a single payment within 30 days after the exhibition closes.",
          },
        },
        {
          id: "production",
          label: "5) Production and installation costs",
          hint: "Costs for building, installing, and removing the exhibition.",
          options: [
            { value: "a", label: "Gallery pays all", desc: "Gallery covers production, installation, and de-installation" },
            { value: "b", label: "Split equally", desc: "Costs shared 50/50" },
            { value: "c", label: "Artist pays all", desc: "Artist covers all production and installation" },
          ],
          letter: {
            heading: "5. Production and Installation Costs",
            a: "The gallery covers all costs related to production, installation, and de-installation of the exhibition.",
            b: "Production, installation, and de-installation costs are split equally between gallery and artist.",
            c: "The artist covers all costs related to production, installation, and de-installation.",
          },
        },
        {
          id: "exclusivity",
          label: "6) Exclusivity after the exhibition closes",
          hint: "Whether the artist may show or sell these works elsewhere during an agreed period.",
          options: [
            { value: "a", label: "No exclusivity", desc: "Artist is free to show or sell works immediately" },
            { value: "b", label: "3-month regional exclusivity", desc: "Works not to be shown in same region for 3 months" },
            { value: "c", label: "6-month full exclusivity", desc: "Works not to be shown or sold anywhere for 6 months" },
          ],
          letter: {
            heading: "6. Exclusivity",
            a: "No exclusivity agreement applies. The artist is free to exhibit or sell the shown works at any time after the opening.",
            b: "A 3-month regional exclusivity applies to the works shown: the artist agrees not to exhibit these works in the same region for 3 months after the exhibition closes.",
            c: "A 6-month full exclusivity (worldwide) applies to the works shown: the artist agrees not to exhibit or sell these works elsewhere for 6 months after the exhibition closes.",
          },
        },
        {
          id: "rights",
          label: "7) Reproduction rights for exhibition documentation",
          hint: "How the gallery may use photographs of the exhibited works.",
          options: [
            { value: "a", label: "Publicity only", desc: "Press, social media, invitations for this show only" },
            { value: "b", label: "Including catalogue and archive", desc: "Printed catalogue and online archive permitted" },
            { value: "c", label: "Broad usage rights (2 years)", desc: "Extensive digital and print rights for 2 years" },
          ],
          letter: {
            heading: "7. Reproduction Rights",
            a: "The gallery may use photographic documentation of the exhibited works solely for publicity purposes for this exhibition (press, social media, invitations).",
            b: "The gallery may use photographic documentation of the exhibited works for exhibition publicity and in a printed exhibition catalogue and online archive.",
            c: "The gallery holds broad digital and print usage rights for photographic documentation of the exhibited works for a period of 2 years after the exhibition opens.",
          },
        },
        {
          id: "return",
          label: "8) Return of unsold works after the exhibition",
          hint: "Who organises and pays for shipping unsold works back to the artist.",
          options: [
            { value: "a", label: "Gallery ships back at own expense", desc: "Full return cost covered by gallery" },
            { value: "b", label: "Return costs split equally", desc: "Shared 50/50" },
            { value: "c", label: "Artist collects or arranges return", desc: "Artist's responsibility and expense" },
          ],
          letter: {
            heading: "8. Return of Unsold Works",
            a: "The gallery will arrange and cover the cost of returning all unsold works to the artist after the exhibition closes.",
            b: "The cost of returning unsold works will be split equally between gallery and artist.",
            c: "The artist is responsible for collecting or arranging the return transport of unsold works at their own expense.",
          },
        },
      ],
    },
    de: {
      stepLabel: "Frage", of: "von", infoStep: "Ausstellungsdetails",
      result: "Bestätigungsschreiben", next: "Weiter", back: "Zurück", reset: "Von vorne",
      copyBtn: "Text kopieren", copied: "Kopiert!",
      infoLabels: { artist: "Name der Künstlerin / des Künstlers", gallery: "Galeriename", title: "Ausstellungstitel", startDate: "Eröffnungsdatum", endDate: "Schlussdatum" },
      infoHint: "Trage die Angaben ein. Sie erscheinen automatisch im generierten Bestätigungsschreiben.",
      letterTitle: "Ausstellungsvereinbarung – Bestätigungsschreiben",
      letterIntro: (i) => `Sehr geehrte Damen und Herren,\n\nhiermit werden die vereinbarten Konditionen für die Einzelausstellung „${i.title || "[Ausstellungstitel]"}" in ${i.gallery || "[Galerie]"} vom ${i.startDate || "[Eröffnungsdatum]"} bis ${i.endDate || "[Schlussdatum]"} bestätigt.\n\nKünstlerin / Künstler: ${i.artist || "[Name]"}\n`,
      letterClose: (i) => `Beide Parteien bestätigen diese Konditionen als Grundlage ihrer Zusammenarbeit für diese Ausstellung.\n\nUnterschriften:\n\n_________________________        _________________________\n${i.artist || "[Künstler*in]"}             Galerievertreter*in\n\nDatum: ___________________       Datum: ___________________`,
      nextStepSuggestion: "Vor der Unterschrift alle 25 Vertragspunkte der Checkliste durchgehen.",
      nextStepLink: "agreement_checklist.php",
      nextStepLabel: "25-Punkte-Vertrags-Checkliste →",
      unansweredHint: "Bitte beantworte alle Fragen, bevor du das Schreiben anzeigst.",
      questions: [
        {
          id: "commission",
          label: "1) Galerieprovision auf Verkäufe",
          hint: "Der Prozentsatz, den die Galerie von jedem Verkaufspreis einbehält.",
          options: [
            { value: "a", label: "30 %", desc: "Künstlerfreundlicher Satz" },
            { value: "b", label: "40 %", desc: "Reduzierter Branchenüblicher Standardsatz" },
            { value: "c", label: "50 %", desc: "Branchenüblicher Standardsatz bei Primärgalerien" },
          ],
          letter: {
            heading: "1. Galerieprovision",
            a: "Die Galerie erhält 30 % Provision auf alle Verkäufe, die während der Ausstellung oder innerhalb der vereinbarten Nachverkaufszeit abgeschlossen werden.",
            b: "Die Galerie erhält 40 % Provision auf alle Verkäufe, die während der Ausstellung oder innerhalb der vereinbarten Nachverkaufszeit abgeschlossen werden.",
            c: "Die Galerie erhält 50 % Provision auf alle Verkäufe, die während der Ausstellung oder innerhalb der vereinbarten Nachverkaufszeit abgeschlossen werden.",
          },
        },
        {
          id: "transport",
          label: "2) Transportkosten (Lieferung und Rücktransport der Werke)",
          hint: "Wer bezahlt den Transport der Werke zur Galerie und zurück.",
          options: [
            { value: "a", label: "Galerie übernimmt alles", desc: "Galerie bezahlt Hin- und Rücktransport" },
            { value: "b", label: "Kosten werden geteilt", desc: "50/50 zwischen Galerie und Künstler*in" },
            { value: "c", label: "Künstler*in übernimmt alles", desc: "Alle Transportkosten trägt die Künstlerin / der Künstler" },
          ],
          letter: {
            heading: "2. Transportkosten",
            a: "Die Galerie übernimmt alle Transportkosten für die Werke zur Galerie und zurück.",
            b: "Die Transportkosten (Hin- und Rücktransport) werden zu gleichen Teilen zwischen Galerie und Künstler*in aufgeteilt.",
            c: "Die Künstlerin / der Künstler trägt alle Transportkosten für die Lieferung und den Rücktransport der Werke.",
          },
        },
        {
          id: "insurance",
          label: "3) Versicherung der Werke während der Ausstellung",
          hint: "Wer versichert die Werke gegen Verlust oder Beschädigung in der Galerie.",
          options: [
            { value: "a", label: "Galerie versichert zum Vollwert", desc: "Auf Kosten der Galerie, voller Wiederbeschaffungswert" },
            { value: "b", label: "Galerie versichert, Künstler*in beteiligt sich", desc: "Galerie schließt ab, Künstler*in zahlt Prämienanteil" },
            { value: "c", label: "Künstler*in versichert selbst", desc: "Eigene Verantwortung der Künstlerin / des Künstlers" },
          ],
          letter: {
            heading: "3. Versicherung",
            a: "Die Galerie versichert alle ausgestellten Werke zu ihrem vollen Wiederbeschaffungswert auf eigene Kosten.",
            b: "Die Galerie schließt eine Versicherung für alle ausgestellten Werke ab; die Künstlerin / der Künstler beteiligt sich an der Versicherungsprämie.",
            c: "Die Künstlerin / der Künstler ist für die Versicherung ihrer / seiner Werke während der gesamten Ausstellungsdauer selbst verantwortlich.",
          },
        },
        {
          id: "payment",
          label: "4) Auszahlungsfrist nach einem Verkauf",
          hint: "Wie schnell der Erlös nach einem Verkauf an die Künstlerin / den Künstler überwiesen wird.",
          options: [
            { value: "a", label: "Innerhalb von 30 Tagen", desc: "Schnelle Auszahlung je Einzelverkauf" },
            { value: "b", label: "Innerhalb von 60 Tagen", desc: "Standardfrist je Einzelverkauf" },
            { value: "c", label: "Sammelzahlung nach Ausstellungsende", desc: "Alle Erlöse in einer Überweisung" },
          ],
          letter: {
            heading: "4. Auszahlungsfrist",
            a: "Die Auszahlung für verkaufte Werke erfolgt innerhalb von 30 Tagen nach jedem Einzelverkauf.",
            b: "Die Auszahlung für verkaufte Werke erfolgt innerhalb von 60 Tagen nach jedem Einzelverkauf.",
            c: "Alle Verkaufserlöse werden in einer Sammelzahlung innerhalb von 30 Tagen nach Ausstellungsende überwiesen.",
          },
        },
        {
          id: "production",
          label: "5) Produktions- und Aufbaukosten",
          hint: "Kosten für Herstellung, Aufbau und Abbau der Ausstellung.",
          options: [
            { value: "a", label: "Galerie übernimmt alles", desc: "Galerie bezahlt Produktion, Aufbau und Abbau" },
            { value: "b", label: "Kosten werden geteilt", desc: "50/50" },
            { value: "c", label: "Künstler*in übernimmt alles", desc: "Alle Produktions- und Aufbaukosten trägt die Künstlerin / der Künstler" },
          ],
          letter: {
            heading: "5. Produktions- und Aufbaukosten",
            a: "Die Galerie übernimmt alle Kosten für Produktion, Aufbau und Abbau der Ausstellung.",
            b: "Produktions-, Aufbau- und Abbaukosten werden zu gleichen Teilen zwischen Galerie und Künstler*in aufgeteilt.",
            c: "Die Künstlerin / der Künstler übernimmt alle Kosten für Produktion, Aufbau und Abbau der Ausstellung.",
          },
        },
        {
          id: "exclusivity",
          label: "6) Exklusivität nach Ausstellungsende",
          hint: "Ob die Künstlerin / der Künstler die gezeigten Werke in einem bestimmten Zeitraum anderswo zeigen oder verkaufen darf.",
          options: [
            { value: "a", label: "Keine Exklusivität", desc: "Künstler*in kann Werke sofort anderswo zeigen" },
            { value: "b", label: "3 Monate regionale Exklusivität", desc: "Werke dürfen 3 Monate lang nicht in derselben Region gezeigt werden" },
            { value: "c", label: "6 Monate vollständige Exklusivität", desc: "Werke dürfen 6 Monate lang nirgendwo gezeigt oder verkauft werden" },
          ],
          letter: {
            heading: "6. Exklusivität",
            a: "Es besteht keine Exklusivitätsvereinbarung. Die Künstlerin / der Künstler kann die gezeigten Werke ab der Eröffnung jederzeit anderswo ausstellen oder verkaufen.",
            b: "Für die gezeigten Werke gilt eine 3-monatige regionale Exklusivität: Die Künstlerin / der Künstler verpflichtet sich, diese Werke für 3 Monate nach Ausstellungsende nicht in derselben Region auszustellen.",
            c: "Für die gezeigten Werke gilt eine 6-monatige vollständige Exklusivität (weltweit): Die Künstlerin / der Künstler verpflichtet sich, diese Werke für 6 Monate nach Ausstellungsende weder auszustellen noch zu verkaufen.",
          },
        },
        {
          id: "rights",
          label: "7) Bildrechte für die Ausstellungsdokumentation",
          hint: "Wie die Galerie fotografische Dokumentation der ausgestellten Werke nutzen darf.",
          options: [
            { value: "a", label: "Nur für Ausstellungswerbung", desc: "Presse, Social Media, Einladungen für diese Ausstellung" },
            { value: "b", label: "Inkl. Katalog und Archiv", desc: "Gedruckter Katalog und Online-Archiv erlaubt" },
            { value: "c", label: "Umfassende Nutzungsrechte (2 Jahre)", desc: "Breite digitale und Print-Rechte für 2 Jahre" },
          ],
          letter: {
            heading: "7. Bildrechte",
            a: "Die Galerie darf die fotografische Dokumentation der ausgestellten Werke ausschließlich für die Werbung dieser Ausstellung nutzen (Presse, Social Media, Einladungen).",
            b: "Die Galerie darf die fotografische Dokumentation der ausgestellten Werke für die Ausstellungswerbung sowie in einem gedruckten Katalog und einem Online-Archiv verwenden.",
            c: "Die Galerie erhält umfassende digitale und Print-Nutzungsrechte an der fotografischen Dokumentation der ausgestellten Werke für einen Zeitraum von 2 Jahren ab der Ausstellungseröffnung.",
          },
        },
        {
          id: "return",
          label: "8) Rückgabe unverkaufter Werke nach der Ausstellung",
          hint: "Wer den Rücktransport unverkaufter Werke organisiert und bezahlt.",
          options: [
            { value: "a", label: "Galerie sendet auf eigene Kosten zurück", desc: "Alle Rücktransportkosten trägt die Galerie" },
            { value: "b", label: "Rücktransportkosten werden geteilt", desc: "50/50" },
            { value: "c", label: "Künstler*in holt ab oder organisiert Rücktransport", desc: "Verantwortung und Kosten trägt die Künstlerin / der Künstler" },
          ],
          letter: {
            heading: "8. Rückgabe unverkaufter Werke",
            a: "Die Galerie organisiert und übernimmt die Kosten für den Rücktransport aller unverkauften Werke nach Ausstellungsende.",
            b: "Die Kosten für den Rücktransport unverkaufter Werke werden zu gleichen Teilen zwischen Galerie und Künstler*in aufgeteilt.",
            c: "Die Künstlerin / der Künstler ist für die Abholung oder den Rücktransport der unverkauften Werke auf eigene Kosten verantwortlich.",
          },
        },
      ],
    },
  }[lang];

  const stage = document.getElementById("carouselStage");
  const progressLabel = document.getElementById("progressLabel");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const totalSteps = 1 + tr.questions.length; // 0 = info, 1..8 = questions, 9 = letter

  const renderInfo = () => {
    const i = state.info;
    stage.innerHTML = `
      <article class="didactic-step">
        <p class="small muted">${tr.infoHint}</p>
        <div class="qgrid" style="margin-top:12px;">
          <label class="q">
            <span>${tr.infoLabels.artist}</span>
            <input type="text" id="infoArtist" class="input-info" value="${esc(i.artist)}" autocomplete="name" />
          </label>
          <label class="q">
            <span>${tr.infoLabels.gallery}</span>
            <input type="text" id="infoGallery" class="input-info" value="${esc(i.gallery)}" />
          </label>
          <label class="q q-full">
            <span>${tr.infoLabels.title}</span>
            <input type="text" id="infoTitle" class="input-info" value="${esc(i.title)}" />
          </label>
          <label class="q">
            <span>${tr.infoLabels.startDate}</span>
            <input type="text" id="infoStart" class="input-info" value="${esc(i.startDate)}" placeholder="e.g. 12 April 2025" />
          </label>
          <label class="q">
            <span>${tr.infoLabels.endDate}</span>
            <input type="text" id="infoEnd" class="input-info" value="${esc(i.endDate)}" placeholder="e.g. 15 June 2025" />
          </label>
        </div>
      </article>`;

    stage.querySelector("#infoArtist").addEventListener("input", (e) => { state.info.artist = e.target.value; });
    stage.querySelector("#infoGallery").addEventListener("input", (e) => { state.info.gallery = e.target.value; });
    stage.querySelector("#infoTitle").addEventListener("input", (e) => { state.info.title = e.target.value; });
    stage.querySelector("#infoStart").addEventListener("input", (e) => { state.info.startDate = e.target.value; });
    stage.querySelector("#infoEnd").addEventListener("input", (e) => { state.info.endDate = e.target.value; });
  };

  const renderQuestion = (qIndex) => {
    const q = tr.questions[qIndex];
    const current = state.answers[qIndex];
    const opts = q.options.map((opt) =>
      `<label class="radio-option${current === opt.value ? " selected" : ""}">
        <input type="radio" name="answer" value="${opt.value}"${current === opt.value ? " checked" : ""} />
        <span><strong>${opt.label}</strong> – ${opt.desc}</span>
      </label>`
    ).join("");
    stage.innerHTML = `
      <article class="didactic-step">
        <h3>${q.label}</h3>
        <p class="small muted">${q.hint}</p>
        <fieldset class="radio-group" style="flex-direction:column;margin-top:10px;">
          <legend class="sr-only">${q.label}</legend>
          ${opts}
        </fieldset>
      </article>`;
    stage.querySelectorAll('input[name="answer"]').forEach((input) => {
      input.addEventListener("change", (e) => {
        state.answers[qIndex] = e.target.value;
        stage.querySelectorAll(".radio-option").forEach((lbl) => {
          lbl.classList.toggle("selected", lbl.querySelector("input").checked);
        });
      });
    });
  };

  const buildLetterText = () => {
    const i = state.info;
    const lines = [tr.letterIntro(i)];
    tr.questions.forEach((q, idx) => {
      const ans = state.answers[idx];
      lines.push(`${q.letter.heading}\n${ans ? q.letter[ans] : "–"}`);
    });
    lines.push(tr.letterClose(i));
    return lines.join("\n\n");
  };

  const renderLetter = () => {
    const unanswered = state.answers.filter((a) => a === null).length;
    if (unanswered > 0) {
      stage.innerHTML = `<article class="didactic-step"><p class="muted">${tr.unansweredHint} (${unanswered} ${unanswered === 1 ? (lang === "de" ? "offene Frage" : "unanswered question") : (lang === "de" ? "offene Fragen" : "unanswered questions")})</p></article>`;
      return;
    }
    const letterText = buildLetterText();
    const letterHtml = letterText
      .split("\n\n")
      .map((block) => `<p>${block.replace(/\n/g, "<br>")}</p>`)
      .join("");

    stage.innerHTML = `
      <article class="didactic-step">
        <h3>${tr.letterTitle}</h3>
        <div class="letter-output">${letterHtml}</div>
        <div class="proposal-actions" style="margin-top:14px;">
          <button type="button" id="copyLetterBtn" class="btn btn-primary">${tr.copyBtn}</button>
        </div>
        <div class="next-step-suggestion" style="margin-top:14px;">
          <p>${tr.nextStepSuggestion}</p>
          <a href="${tr.nextStepLink}">${tr.nextStepLabel}</a>
        </div>
      </article>`;

    document.getElementById("copyLetterBtn").addEventListener("click", function () {
      navigator.clipboard.writeText(letterText).then(() => {
        this.textContent = tr.copied;
        setTimeout(() => { this.textContent = tr.copyBtn; }, 2000);
      }).catch(() => {
        const ta = document.createElement("textarea");
        ta.value = letterText;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        this.textContent = tr.copied;
        setTimeout(() => { this.textContent = tr.copyBtn; }, 2000);
      });
    });
  };

  const render = () => {
    const onLetter = state.step === totalSteps;
    if (onLetter) {
      progressLabel.textContent = tr.result;
    } else if (state.step === 0) {
      progressLabel.textContent = tr.infoStep;
    } else {
      progressLabel.textContent = `${tr.stepLabel} ${state.step} ${tr.of} ${tr.questions.length}`;
    }
    prevBtn.disabled = state.step === 0;
    nextBtn.textContent = onLetter ? tr.reset : tr.next;

    if (onLetter) {
      renderLetter();
    } else if (state.step === 0) {
      renderInfo();
    } else {
      renderQuestion(state.step - 1);
    }
  };

  const esc = (str) => String(str || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

  prevBtn.addEventListener("click", () => { if (state.step > 0) { state.step -= 1; render(); } });
  nextBtn.addEventListener("click", () => { state.step = state.step < totalSteps ? state.step + 1 : 0; render(); });

  render();
})();
