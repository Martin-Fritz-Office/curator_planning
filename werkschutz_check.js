(function () {
  "use strict";

  const questions = [
    {
      id: "menschlich",
      label: "1) Ist das Werk das Ergebnis menschlicher Tätigkeit?",
      explanation: "Rein maschinell oder zufällig entstandene Erzeugnisse ohne menschlichen Gestaltungswillen sind nicht schutzfähig. KI-generierte Inhalte ohne menschliche kreative Steuerung fallen grundsätzlich nicht unter den Werkbegriff.",
      legal: "§ 1 UrhG AT / § 2 UrhG DE",
      tip: "Auch bei KI-Unterstützung kann Schutz bestehen, wenn ein Mensch die maßgeblichen kreativen Entscheidungen trifft (z. B. Auswahl, Anordnung, Nachbearbeitung).",
      judikatur: "EuGH C‑5/08 <em>Infopaq</em> (2009): Nur Werke, die Ausdruck der geistigen Schöpfung des Urhebers sind, genießen Schutz.",
      requiredAnswer: "yes",
    },
    {
      id: "schoepfungshoehe",
      label: "2) Weist das Werk eine individuelle geistige Schöpfung auf (Schöpfungshöhe)?",
      explanation: "Bloße Routine, Handwerk oder rein technische Leistung ohne gestalterischen Spielraum genügen nicht. Es muss ein individueller, von persönlichen Fähigkeiten und der Persönlichkeit des Urhebers geprägter Gestaltungsspielraum genutzt worden sein.",
      legal: "§ 1 UrhG AT / § 2 Abs. 2 UrhG DE",
      tip: "AT: Die Rechtsprechung stellt auf die 'Eigentümlichkeit' des Werks ab. DE: Die 'kleine Münze' senkt die Schutzuntergrenze, gilt aber nicht für alle Werkarten gleich.",
      judikatur: "EuGH C‑145/10 <em>Painer</em> (2011): Auch Fotografien genießen Schutz, wenn gestalterische Freiheiten ausgeübt wurden. – OGH 4 Ob 191/01: Schöpfungshöhe erfordert eine über das Durchschnittliche hinausgehende gestalterische Eigenart.",
      requiredAnswer: "yes",
    },
    {
      id: "werkart",
      label: "3) Fällt das Werk in eine der gesetzlich anerkannten Werkarten?",
      explanation: "Das Gesetz nennt beispielhaft Sprachwerke, Bühnenwerke, Musikwerke, Filmwerke, Werke der bildenden Kunst (einschließlich Lichtbildwerke), Datenbankwerke u. a. Die Aufzählung ist nicht abschließend.",
      legal: "§ 1 Abs. 1 UrhG AT / § 2 UrhG DE",
      tip: "Software ist als Sprachwerk (Computerprogramm) geschützt. Auch Werke der angewandten Kunst (Design, Mode) können schutzfähig sein, wenn die Schöpfungshöhe erreicht wird.",
      judikatur: "BGH I ZR 143/12 <em>Geburtstagszug</em> (2014): Angewandte Kunst genießt im DE-Recht denselben Schutz wie zweckfreie Kunst, sofern die Gestaltungshöhe erreicht wird.",
      requiredAnswer: "yes",
    },
    {
      id: "schutzfrist",
      label: "4) Ist die Schutzfrist noch nicht abgelaufen?",
      explanation: "Die Grundregel lautet 70 Jahre post mortem auctoris (pma) – gerechnet ab dem 1. Januar des dem Todesjahr folgenden Jahres. Bei anonymen/pseudonymen Werken beginnt die Frist mit der Veröffentlichung.",
      legal: "§§ 60 ff. UrhG AT / §§ 64 ff. UrhG DE",
      tip: "Nach Ablauf der Schutzfrist werden Werke gemeinfrei. Sonderregeln gelten für Filmwerke (70 Jahre ab letztem Mitwirkenden), nachgelassene Werke (§ 76c UrhG AT) und Leistungsschutzrechte.",
      judikatur: "EuGH C‑277/10 <em>Luksan</em> (2012): Schutzfristen für Filmwerke sind unionsrechtlich harmonisiert (Richtlinie 2006/116/EG).",
      requiredAnswer: "yes",
    },
    {
      id: "amtlich",
      label: "5) Handelt es sich um ein amtliches Werk (Gesetz, Verordnung, Gerichtsentscheidung)?",
      explanation: "Gesetze, Verordnungen, amtliche Erlässe, Gerichtsentscheidungen und andere amtliche Werke sind vom Urheberrechtsschutz ausgenommen und gemeinfrei. Damit soll der ungehinderte Zugang zu staatlichem Recht sichergestellt werden.",
      legal: "§ 7 UrhG AT / § 5 UrhG DE",
      tip: "Kommentare, Erläuterungen und redaktionelle Bearbeitungen amtlicher Texte können dagegen eigenständig schutzfähig sein.",
      judikatur: "OGH 4 Ob 18/86: Die amtliche Natur eines Werks richtet sich nach dem Inhalt und Zweck, nicht nach der Behördeneigenschaft des Verfassers.",
      requiredAnswer: "no",
    },
    {
      id: "idee",
      label: "6) Wurde das Werk ausschließlich als Idee, Methode oder Konzept formuliert – ohne konkrete Ausformung?",
      explanation: "Ideen, Konzepte, Methoden, Prinzipien und Entdeckungen sind als solche nicht schutzfähig (Idee-Ausdruck-Dichotomie). Nur die konkrete individuelle Formgebung – der 'Ausdruck' – genießt Schutz.",
      legal: "Allgemeines Urheberrechtsprinzip; Art. 9 Abs. 2 TRIPS / Art. 2 WCT",
      tip: "Ein Romanplot ist nicht schutzfähig, die ausgeformte Erzählung schon. Eine Kompositionsmethode ist frei, die nach ihr geschaffene Komposition nicht.",
      judikatur: "BGH I ZR 168/06 <em>TV Total</em> (2008): Schutz besteht nur für die konkrete Formgestaltung, nicht für die dahinterliegende Idee oder Methode.",
      requiredAnswer: "no",
    },
    {
      id: "fakten",
      label: "7) Handelt es sich um eine bloße Faktenzusammenstellung ohne eigene Struktur oder Auswahl (z. B. reine Datenliste)?",
      explanation: "Reine Faktensammlungen ohne individuelle Auswahl oder Anordnung sind nicht schutzfähig. Datenbanken können eigenständigen Datenbankschutz (§ 76d UrhG AT / § 87a UrhG DE) oder Urheberrechtsschutz genießen, wenn Auswahl oder Anordnung eine individuelle Schöpfung darstellt.",
      legal: "§ 6 UrhG AT / § 4 UrhG DE (Sammelwerke); §§ 76c, 76d UrhG AT / §§ 87a ff. UrhG DE (Datenbankschutz)",
      tip: "Telefonbücher, Fahrpläne oder Preislisten ohne individuelle Gestaltung sind nicht urheberrechtlich geschützt. Der sui-generis-Datenbankschutz kann aber greifen, wenn eine wesentliche Investition in die Erstellung nachweisbar ist.",
      judikatur: "EuGH C‑46/02 <em>Fixtures Marketing</em> (2004): Der Datenbankschutz sui generis erfordert eine wesentliche Investition, schützt aber nicht die Daten selbst.",
      requiredAnswer: "no",
    },
  ];

  const SOURCES = `
    <div class="sources-block">
      <h4>Quellen &amp; Rechtsgrundlagen</h4>
      <ul class="sources-list">
        <li><strong>UrhG AT:</strong> Österreichisches Urheberrechtsgesetz, BGBl. Nr. 111/1936 idgF –
          <a href="https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&amp;Gesetzesnummer=10001848" target="_blank" rel="noopener">RIS-Quelle</a></li>
        <li><strong>UrhG DE:</strong> Deutsches Urheberrechtsgesetz vom 9. September 1965 idgF –
          <a href="https://www.gesetze-im-internet.de/urhg/" target="_blank" rel="noopener">gesetze-im-internet.de</a></li>
        <li><strong>TRIPS:</strong> Übereinkommen über handelsbezogene Aspekte der Rechte des geistigen Eigentums, Art. 9 Abs. 2 (Idee-Ausdruck-Dichotomie)</li>
        <li><strong>WCT:</strong> WIPO Copyright Treaty (1996), Art. 2</li>
        <li><strong>InfoSoc-RL:</strong> Richtlinie 2001/29/EG zur Harmonisierung bestimmter Aspekte des Urheberrechts</li>
        <li><strong>Schutzdauer-RL:</strong> Richtlinie 2006/116/EG über die Schutzdauer des Urheberrechts</li>
        <li><strong>Datenbank-RL:</strong> Richtlinie 96/9/EG über den rechtlichen Schutz von Datenbanken</li>
      </ul>
      <h4>Zentrale Judikatur</h4>
      <ul class="sources-list">
        <li>EuGH C‑5/08 <em>Infopaq International</em> (2009): Werkbegriff und Mindestanforderungen an die individuelle geistige Schöpfung</li>
        <li>EuGH C‑145/10 <em>Eva-Maria Painer</em> (2011): Schutzfähigkeit von Lichtbildwerken bei gestalterischen Entscheidungen</li>
        <li>EuGH C‑403/08 &amp; C‑429/08 <em>Football Association Premier League</em> (2011): Werkbegriff und Schutzuntergrenze</li>
        <li>EuGH C‑46/02 <em>Fixtures Marketing</em> (2004): Sui-generis-Datenbankschutz, Investitionsbegriff</li>
        <li>EuGH C‑277/10 <em>Luksan</em> (2012): Urheberrecht am Filmwerk, unionsrechtliche Harmonisierung</li>
        <li>BGH I ZR 143/12 <em>Geburtstagszug</em> (2014): Schöpfungshöhe angewandte Kunst im DE-Recht</li>
        <li>BGH I ZR 168/06 <em>TV Total</em> (2008): Idee-Ausdruck-Dichotomie, Schutz nur für Formgestaltung</li>
        <li>OGH 4 Ob 191/01: Eigentümlichkeit und Schöpfungshöhe im österreichischen Urheberrecht</li>
        <li>OGH 4 Ob 18/86: Abgrenzung amtlicher Werke nach § 7 UrhG AT</li>
      </ul>
    </div>`;

  const state = { step: 0, answers: new Array(questions.length).fill(null) };

  const stage = document.getElementById("carouselStage");
  const progressLabel = document.getElementById("progressLabel");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const compute = () => {
    let allAnswered = true;
    let correctCount = 0;
    const wrongQuestions = [];

    questions.forEach((q, i) => {
      const ans = state.answers[i];
      if (ans === null) {
        allAnswered = false;
      } else if (ans === q.requiredAnswer) {
        correctCount++;
      } else {
        wrongQuestions.push({ q, ans });
      }
    });

    const unanswered = state.answers.filter((a) => a === null).length;
    return { allAnswered, correctCount, wrongQuestions, unanswered };
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
        <p class="small muted" style="margin-top:0.5rem;"><em>⚖️ ${q.judikatur}</em></p>
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
    const { allAnswered, correctCount, wrongQuestions, unanswered } = compute();
    const total = questions.length;

    let verdict, verdictClass, verdictDetail;

    if (!allAnswered) {
      verdict = "Nicht alle Fragen beantwortet";
      verdictClass = "muted";
      verdictDetail = `${unanswered} Frage(n) noch offen. Bitte gehe zurück und beantworte alle Fragen für eine verlässliche Einschätzung.`;
    } else if (correctCount === total) {
      verdict = "Das Werk ist urheberrechtlich schutzfähig";
      verdictClass = "pos";
      verdictDetail = `Alle sieben Voraussetzungen sind erfüllt. Das Werk erfüllt die Anforderungen des Urheberrechtsschutzes nach österreichischem und deutschem Recht.
        <br><br><strong>Wichtig:</strong> Schutzfähigkeit bedeutet nicht automatisch, dass alle Nutzungen verboten sind – gesetzliche Ausnahmen (freie Werknutzungen, Zitatrecht, Panoramafreiheit u. a.) können eingreifen.`;
    } else {
      const wrongList = wrongQuestions.map(({ q, ans }) => {
        const ansLabel = ans === "yes" ? "Ja" : "Nein";
        const neededLabel = q.requiredAnswer === "yes" ? "Ja" : "Nein";
        return `<div class="no-detail">
          <p class="small"><strong>✗ ${q.label}</strong></p>
          <p class="small muted">Ihre Antwort: <strong>${ansLabel}</strong> – für Schutzfähigkeit erforderlich: <strong>${neededLabel}</strong></p>
          <p class="small muted">${q.explanation}</p>
          <p class="small muted tip-text">💡 ${q.tip}</p>
          <p class="small muted"><em>⚖️ ${q.judikatur}</em></p>
        </div>`;
      }).join("");

      verdict = "Das Werk ist (in diesem Punkt) nicht schutzfähig";
      verdictClass = "neg";
      verdictDetail = `${wrongQuestions.length} Voraussetzung(en) nicht erfüllt. Das Werk genießt keinen urheberrechtlichen Schutz, solange diese Mängel bestehen.
        <br><br><strong>Nicht erfüllte Voraussetzungen:</strong>${wrongList}`;
    }

    const questionSummary = questions.map((q, i) => {
      const ans = state.answers[i];
      const correct = ans === q.requiredAnswer;
      const icon = ans === null ? "–" : correct ? "✓" : "✗";
      const rowClass = ans !== null && !correct ? " critical" : "";
      return `<div class="row${rowClass}"><span>${q.label.replace(/^\d+\) /, "")}</span><strong>${icon}</strong></div>`;
    }).join("");

    stage.innerHTML = `
      <article class="didactic-step">
        <h3 class="${verdictClass}">Ergebnis: ${verdict}</h3>
        <p class="small">${verdictDetail}</p>
        <div class="sheet" style="margin-top:1rem;">${questionSummary}</div>
        <p class="small muted" style="margin-top:1rem;">
          <strong>Hinweis:</strong> Diese Selbstprüfung ersetzt keine Rechtsberatung. Sie dient ausschließlich der ersten Orientierung.
          Für eine verbindliche Einschätzung wende dich an eine Rechtsanwältin, einen Rechtsanwalt oder eine auf Urheberrecht spezialisierte Beratungsstelle.
        </p>
        ${SOURCES}
        <div class="next-step-suggestion">
          <p>Weiteres Urheberrecht-Wissen aufbauen?</p>
          <a href="law_quiz.php">UrhG-Quiz (20 Fragen) →</a>
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
