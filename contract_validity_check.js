(function () {
  "use strict";

  const questions = [
    {
      id: "angebot",
      label: "1) Wurde ein konkretes Angebot gemacht?",
      explanation: "Ein Vertrag setzt ein bestimmtes Angebot voraus, das Vertragspartner, Leistung und wesentliche Bedingungen benennt.",
      legal: "§ 861 ABGB / § 145 BGB",
      tip: "Ein Angebot muss so bestimmt sein, dass es durch ein einfaches „Ja" angenommen werden kann.",
      critical: true,
    },
    {
      id: "annahme",
      label: "2) Wurde das Angebot vollständig und rechtzeitig angenommen?",
      explanation: "Die Annahme muss dem Angebot vorbehaltlos entsprechen und innerhalb der gesetzlichen oder vereinbarten Frist erfolgen.",
      legal: "§ 862 ABGB / § 147 BGB",
      tip: "Eine verspätete oder inhaltlich abweichende Annahme gilt als neues Angebot, nicht als Vertragsschluss.",
      critical: true,
    },
    {
      id: "konsens",
      label: "3) Sind sich beide Parteien über die wesentlichen Vertragspunkte einig?",
      explanation: "Konsens über Leistung, Gegenleistung und Vertragsgegenstand ist Grundvoraussetzung. Bei offenen wesentlichen Punkten kommt kein Vertrag zustande.",
      legal: "§ 869 ABGB / §§ 154–155 BGB",
      tip: "Wesentliche Punkte sind mindestens: Was wird geleistet? Für wen? Zu welchem Preis?",
      critical: true,
    },
    {
      id: "geschaeftsfaehigkeit",
      label: "4) Sind beide Parteien voll geschäftsfähig?",
      explanation: "Minderjährige oder Personen unter Sachwalterschaft/Betreuung können Verträge nur eingeschränkt abschließen. Fehlende Geschäftsfähigkeit macht den Vertrag nichtig oder schwebend unwirksam.",
      legal: "§ 865 ABGB / §§ 104–113 BGB",
      tip: "Handelt eine juristische Person, muss die vertretende Person vertretungsbefugt sein (→ Frage 5).",
      critical: true,
    },
    {
      id: "vertretungsmacht",
      label: "5) Hatte die handelnde Person Vollmacht oder Vertretungsbefugnis?",
      explanation: "Handelt jemand als Vertreter einer Organisation oder Person, muss eine ausdrückliche oder zumindest stillschweigende Vollmacht vorliegen. Ohne Vollmacht bindet der Vertrag die Vertretene grundsätzlich nicht.",
      legal: "§§ 1002–1009 ABGB / §§ 164–177 BGB",
      tip: "Bei Vereinen, GmbHs und anderen juristischen Personen: Wer ist laut Satzung/Handelsregister zeichnungsberechtigt?",
      critical: false,
    },
    {
      id: "form",
      label: "6) Wurde eine gesetzlich oder vertraglich vorgeschriebene Form eingehalten?",
      explanation: "Bestimmte Verträge sind nur bei Schriftform, Notariatsakt oder anderer Formvorschrift gültig (z. B. Grundstückskauf, Bürgschaft, bestimmte Arbeitsverträge). Fehlt die Form, ist der Vertrag nichtig.",
      legal: "§ 883 ABGB / § 125 BGB",
      tip: "Wenn keine besondere Formvorschrift gilt, reicht mündliche Einigung. Schriftlichkeit ist aber stets empfehlenswert.",
      critical: false,
    },
    {
      id: "rechtmaessigkeit",
      label: "7) Ist der Vertragsinhalt rechtlich erlaubt und nicht sittenwidrig?",
      explanation: "Verträge, die gegen ein gesetzliches Verbot oder die guten Sitten verstoßen, sind absolut nichtig. Daran ändert auch beidseitiges Einverständnis nichts.",
      legal: "§ 879 ABGB / §§ 134, 138 BGB",
      tip: "Typische Nichtigkeit: Vereinbarungen zur Umgehung von Steuer- oder Sozialversicherungspflichten, Knebelungsverträge, Wuchergeschäfte.",
      critical: true,
    },
    {
      id: "ernstlichkeit",
      label: "8) Wurde die Willenserklärung ernstlich und ohne mentalen Vorbehalt abgegeben?",
      explanation: "Scherzerklärungen oder Erklärungen unter einem geheimen Vorbehalt (der anderen Seite erkennbar) begründen keinen Vertrag. Echter Geschäftswille beider Parteien ist erforderlich.",
      legal: "§ 869 ABGB / § 118 BGB",
      tip: "Scheingeschäfte – z. B. zur Täuschung Dritter – sind ebenfalls unwirksam (§ 916 BGB / § 916 ABGB).",
      critical: false,
    },
    {
      id: "willensmangel",
      label: "9) War die Willenserklärung frei von wesentlichem Irrtum, Täuschung oder Drohung?",
      explanation: "Ein Vertrag ist anfechtbar, wenn er durch arglistige Täuschung, widerrechtliche Drohung oder einen wesentlichen Irrtum über den Vertragsinhalt zustande kam. Die Anfechtung muss rechtzeitig erklärt werden.",
      legal: "§§ 870–874 ABGB / §§ 119–123 BGB",
      tip: "Irrtum über Kalkulationsgrundlagen oder Motive (bloßer Motivirrtum) berechtigt grundsätzlich nicht zur Anfechtung.",
      critical: false,
    },
    {
      id: "bedingung",
      label: "10) Steht der Vertrag nicht unter einer noch nicht erfüllten aufschiebenden Bedingung?",
      explanation: "Haben die Parteien die Wirksamkeit von einem zukünftigen ungewissen Ereignis abhängig gemacht (z. B. „Vertrag gilt nur bei Förderzusage"), tritt die Wirkung erst mit Eintritt dieser Bedingung ein.",
      legal: "§ 696 ABGB / § 158 BGB",
      tip: "Prüfe, ob der Vertrag Formulierungen wie „vorbehaltlich", „sofern", „unter der Bedingung" enthält.",
      critical: false,
    },
  ];

  const state = { step: 0, answers: new Array(questions.length).fill(null) };

  const stage = document.getElementById("carouselStage");
  const progressLabel = document.getElementById("progressLabel");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const compute = () => {
    let yesCount = 0;
    let criticalNo = [];
    questions.forEach((q, i) => {
      if (state.answers[i] === "yes") {
        yesCount++;
      } else if (state.answers[i] === "no" && q.critical) {
        criticalNo.push(q);
      }
    });
    return { yesCount, criticalNo };
  };

  const renderQuestion = (q, index) => {
    const current = state.answers[index];
    stage.innerHTML = `
      <article class="didactic-step">
        <h3>${q.label}</h3>
        <p class="small muted">${q.explanation}</p>
        <p class="small"><em>Rechtsgrundlage:</em> ${q.legal}</p>
        <fieldset class="carousel-question radio-group">
          <legend class="sr-only">Antwort wählen</legend>
          <label class="radio-option${current === "yes" ? " selected" : ""}">
            <input type="radio" name="answer" value="yes"${current === "yes" ? " checked" : ""} />
            Ja
          </label>
          <label class="radio-option${current === "no" ? " selected" : ""}">
            <input type="radio" name="answer" value="no"${current === "no" ? " checked" : ""} />
            Nein
          </label>
        </fieldset>
        <p class="small muted tip-text">💡 ${q.tip}</p>
      </article>`;

    stage.querySelectorAll('input[name="answer"]').forEach((input) => {
      input.addEventListener("change", (e) => {
        state.answers[index] = e.target.value;
        stage.querySelectorAll(".radio-option").forEach((label) => {
          label.classList.toggle("selected", label.querySelector("input").checked);
        });
      });
    });
  };

  const renderResult = () => {
    const { yesCount, criticalNo } = compute();
    const total = questions.length;
    const unanswered = state.answers.filter((a) => a === null).length;

    let verdict, verdictClass, verdictDetail;
    if (unanswered > 0) {
      verdict = "Nicht alle Fragen beantwortet";
      verdictClass = "muted";
      verdictDetail = `${unanswered} Frage(n) noch offen. Bitte gehe zurück und beantworte alle Fragen für eine verlässliche Einschätzung.`;
    } else if (criticalNo.length > 0) {
      verdict = "Kein wirksamer Vertrag";
      verdictClass = "neg";
      verdictDetail = `Mindestens eine vertragswesentliche Voraussetzung ist nicht erfüllt: <strong>${criticalNo.map((q) => q.id).join(", ")}</strong>. Ein Vertragsschluss ist unter diesen Umständen nicht zustande gekommen oder der Vertrag ist nichtig.`;
    } else if (yesCount === total) {
      verdict = "Vertrag sehr wahrscheinlich wirksam";
      verdictClass = "pos";
      verdictDetail = "Alle zehn Voraussetzungen sind erfüllt. Nach dieser Selbstprüfung spricht nichts gegen einen wirksamen Vertragsschluss. Bei erheblichem wirtschaftlichem Risiko ist dennoch rechtliche Beratung empfehlenswert.";
    } else if (yesCount >= 8) {
      verdict = "Vertrag wahrscheinlich wirksam – Einzelfragen prüfen";
      verdictClass = "";
      verdictDetail = `${total - yesCount} nicht-kritische Punkt(e) wurden mit Nein beantwortet. Der Vertrag ist wahrscheinlich wirksam, die offenen Punkte sollten aber vor Leistungsbeginn geklärt werden.`;
    } else if (yesCount >= 5) {
      verdict = "Erhebliche Zweifel – rechtliche Beratung empfohlen";
      verdictClass = "warn";
      verdictDetail = `${total - yesCount} Punkt(e) wurden mit Nein beantwortet. Es bestehen deutliche Unsicherheiten über die Wirksamkeit. Eine rechtliche Einschätzung ist dringend anzuraten.`;
    } else {
      verdict = "Schwerwiegende Mängel – kein sicherer Vertragsschluss";
      verdictClass = "neg";
      verdictDetail = `Nur ${yesCount} von ${total} Voraussetzungen sind erfüllt. Ein wirksamer Vertrag ist unter diesen Umständen sehr unwahrscheinlich. Bitte suche rechtliche Beratung.`;
    }

    const questionSummary = questions.map((q, i) => {
      const ans = state.answers[i];
      const icon = ans === "yes" ? "✓" : ans === "no" ? "✗" : "–";
      const rowClass = ans === "no" && q.critical ? " critical" : "";
      return `<div class="row${rowClass}"><span>${q.label.replace(/^\d+\) /, "")}</span><strong>${icon}</strong></div>`;
    }).join("");

    stage.innerHTML = `
      <article class="didactic-step">
        <h3 class="${verdictClass}">Ergebnis: ${verdict}</h3>
        <p class="small">${verdictDetail}</p>
        <div class="sheet" style="margin-top:1rem;">${questionSummary}</div>
        <p class="small muted" style="margin-top:1rem;">
          <strong>Hinweis:</strong> Diese Selbstprüfung ersetzt keine Rechtsberatung. Sie dient ausschließlich der ersten Orientierung.
          Für eine verbindliche Einschätzung wende dich an eine Rechtsanwältin, einen Rechtsanwalt oder eine Rechtsberatungsstelle.
        </p>
        <div class="next-step-suggestion">
          <p>Vertrag geschlossen? Jetzt alle 25 Vertragspunkte der Checkliste durchgehen.</p>
          <a href="agreement_checklist.php">25-Punkte-Vertrags-Checkliste →</a>
        </div>
      </article>`;
  };

  const render = () => {
    const onResult = state.step === questions.length;
    progressLabel.textContent = onResult
      ? "Ergebnis"
      : `Frage ${state.step + 1} von ${questions.length}`;
    prevBtn.disabled = state.step === 0;
    nextBtn.textContent = onResult ? "Von vorne" : "Weiter";
    if (onResult) {
      renderResult();
    } else {
      renderQuestion(questions[state.step], state.step);
    }
  };

  prevBtn.addEventListener("click", () => {
    if (state.step > 0) { state.step -= 1; render(); }
  });

  nextBtn.addEventListener("click", () => {
    if (state.step < questions.length) {
      state.step += 1;
    } else {
      state.step = 0;
      state.answers = new Array(questions.length).fill(null);
    }
    render();
  });

  render();
})();
