(function () {
  "use strict";

  const language = document.body.getAttribute("data-lang") === "en" ? "en" : "de";

  const dictionary = {
    de: {
      minDetailedLength: 180,
      storageKey: "agreementChecklistQuestionnaireV3_de",
      progressLabel: (detailed, total) => `${detailed} / ${total} ausreichend detailliert`,
      detailedRule: (min) => `Als "ausreichend detailliert" zählt aktuell eine Antwort mit mindestens ${min} Zeichen.`,
      showIncomplete: "Nur unvollständige Antworten",
      showAll: "Alle Fragen zeigen",
      copySummary: "Zusammenfassung kopieren",
      copied: "Zusammenfassung kopiert",
      copyFailed: "Kopieren nicht möglich",
      moreContext: "Mehr Kontext",
      close: "Schließen",
      noAnswer: "(keine Antwort)",
      answerLabel: "Deine Antwort / Vereinbarung",
      answerPlaceholder: "Formuliere hier konkret: Zuständigkeiten, Budget, Fristen, Rechte, Bedingungen …",
      statusDetailed: "Ausreichend detailliert",
      statusStarted: "Teilweise beantwortet",
      statusOpen: "Noch offen",
      barDetailed: "Ausreichend detailliert",
      barStarted: "Teilweise beantwortet",
      barOpen: "Noch offen",
      summaryTitle: "Ausstellungs-Fragebogen (25 Punkte)",
      summaryStatus: "Status",
      summaryAnswer: "Antwort",
      charUnit: "Zeichen",
      contextTitleSuffix: "Mehr Kontext",
      points: [
        ["Wer?", "Mit wem habe ich es konkret zu tun und wer entscheidet tatsächlich?", "Klären Sie frühzeitig mit wem Sie es zu tun haben. Führen Sie – wenn notwendig – Recherchen durch. Finden Sie heraus, ob die Person für die Einhaltung der Zusagen selbst verantwortlich sein wird, oder ob Ihr Gegenüber für jemand anderen (Sammler/in, Programmbetreiber/in, Sponsor/in, Agentur etc.) handelt."],
        ["Wann?", "Welche zeitlichen Rahmenbedingungen gelten bis zum echten Projektabschluss?", "Klären Sie alle terminlichen Rahmenbedingungen. Beachten Sie, dass das Projekt nicht mit der Eröffnung abgeschlossen sein wird, sondern erst mit der Rückgabe der Arbeiten, der Fertigstellung des Katalogs, der Bezahlung aller Rechnungen, der Abrechnung, der Übergabe der Dokumentation oder anderer notwendiger Nachbearbeitungen abgeschlossen ist."],
        ["Was?", "Was wird von mir erwartet und welche Nutzungen sind vorgesehen?", "Was wird von mir erwartet? Künstlerische Arbeit kann beschrieben werden. Auch wenn es sich um neue Arbeiten handelt, empfiehlt es sich, die gegenseitigen Vorstellungen über Medium, Technik, Größe und Aufwand in den Verhandlungen abzuklären, um etwaigen unrealistischen Erwartungen bereits frühzeitig entgegenwirken zu können. Hier spielen auch zum ersten Mal Verwertungsrechte eine Rolle. Will der Veranstalter / die Veranstalterin Ihre Arbeiten „nur“ ausstellen oder auch für andere Zwecke (Werbung, Imagefolder, Grußkarten, Poster, Souvenirs etc. etc.) nutzen. Theoretisch muss jede Nutzung separat und ausdrücklich vereinbart – und gegebenenfalls honoriert – werden."],
        ["Wie viel?", "Wie hoch sind Produktionsbudget und Honorar?", "Klären Sie, ob ein Produktionsbudget zur Verfügung steht oder nicht. Wird – unabhängig von etwaigen Produktionskosten – ein Honorar bezahlt? Wenn ja, wie hoch ist dieses? Vereinbaren Sie eine Mindestgrößenordnung oder eine variable Summe, wenn das Gesamtbudget wegen laufender Finanzierungsbemühungen noch nicht feststeht."],
        ["Was will ich machen?", "Was möchte ich im Rahmen des Projekts realisieren und wo liegen meine Grenzen?", "Reflektieren Sie regelmäßig ihre eigenen Projekt- und Produktionsprioritäten. Welche Vorhaben könnten im Rahmen der aktuellen Ausstellung / des aktuellen Projekts sinnvoll realisiert werden? Verfügen Sie über unrealisierte Konzepte in verschiedenen Größenordnungen, mit denen Sie auf die jeweilige Einladung reagieren können? Reflektieren Sie regelmäßig die künstlerischen, konzeptuellen, ethischen, politischen und ökonomischen Rahmenbedingungen ihrer Arbeit. Definieren Sie die Grenzen dessen, was Sie bereit sind zu tun, bzw. welchen Situationen Sie sich lieber nicht aussetzen würden."],
        ["Budgetumfang", "Welche Kosten müssen aus dem Produktions-/Projektbudget bezahlt werden?", "Geben Sie sich nicht mit der Nennung eines Produktionsbudgets zufrieden, ohne zu besprechen, welche Kosten mit dem genannten Betrag bestritten werden müssen. Dieser Punkt führt häufig zu Konflikten, da manchmal auch institutionelle Fixkosten, Werbekosten, Reise- und Aufenthaltskosten in das Projektbudget eingerechnet werden."],
        ["Nutzungen / Verwertungsrechte", "Welche Verwertungsrechte werden wann und wofür übertragen?", "Wer verfügt nach Abschluss des Projekts über welche Verwertungsrechte? Beachten Sie, dass Verwertungsrechte und physisches Eigentum in verschiedenen Händen liegen können, und dass mit einem Verkauf nicht automatisch sämtliche Verwertungsrechte übertragen werden. Im Zweifel gelten nur jene Rechte als übertragen, die für den jeweiligen Zweck notwendig sind. Stellen Sie also etwa Fotos „für den Katalog“ zur Verfügung, so können diese nicht automatisch für Merchandisingartikel verwendet werden. Verhandeln Sie diesen Punkt insbesondere bei reproduzierbaren Werken besonders sorgfältig. Weisen Sie den Veranstalter / die Veranstalterin auf eine etwaige Mitgliedschaft bei einer Verwertungsgesellschaft (z.B.: Bildrecht) hin."],
        ["Förderung", "Was passiert, wenn das Projekt gefördert wird?", "Klären Sie vorab, ob eine projektspezifische Förderung zu einer Erhöhung des Produktionsbudgets führt, oder ob diese Förderung bereits Grundlage für das vereinbarte Produktionsbudget gewesen ist. Häufig liegen den Projektkalkulationen der Veranstalter/innen bereits Förderungserwartungen zu Grunde."],
        ["Transport Werke", "Wer organisiert und bezahlt Hin- und Rücktransport meiner Arbeiten?", "Wer organisiert und bezahlt den Transport der vereinbarten Arbeiten zum Ausstellungsort und wieder zurück? Welche Standards gelten dafür als vereinbart (Kunsttransport?, Kurierdienste?, Privattransporte?, Mitnahme durch Kolleg/innen? Bis zu welchem Datum erfolgt der Rücktransport? Besteht sowohl für den Hin- wie auch für den Rücktransport ausreichender Versicherungsschutz? Kann verlangt werden, die Arbeiten an einen anderen als den Abholort zurückzustellen? Wenn ja, zu welchen Kosten? Auf wessen Rechnung?"],
        ["Reise & Aufenthalt", "Wie komme ich hin, wo wohne ich und was wird übernommen?", "Übernimmt der Veranstalter / die Veranstalterin die Reisekosten zum Veranstaltungsort und zurück? Welche Verkehrsmittel können dafür verwendet werden? Welche Kostenlimits bestehen? In welchem Umfang werden Übernachtungs- und Aufenthaltskosten am Veranstaltungsort übernommen? Kann mein Partner mit dem Kind mitkommen? Privatunterkunft? Hotel? Pension? Wohnung? Wohngemeinschaft? Besteht vor Ort eine Möglichkeit zur Kinderbetreuung? Werden Taggelder zur Bestreitung des erhöhten Verpflegungsaufwands bezahlt?"],
        ["Werbung", "Wie wird die Veranstaltung beworben und wer trägt die Kosten?", "In welcher Form und auf wessen Kosten wird für die Veranstaltung geworben? Wird eine Einladungskarte gedruckt? Ist ein Postversand geplant? Wenn ja, auf wessen Kosten und an wie viele Adressen? Wer übernimmt die Bewerbung der Veranstaltung in Social-Media Kanälen? Welche anderen Werbe- und Informationsmaßnahmen sind geplant? Welche Erwartungen bestehen seitens des Veranstalters / der Veranstalterin hinsichtlich der Mitwirkung des Künstlers/ der Künstlerin an diesen Maßnahmen?"],
        ["Mindestvoraussetzungen", "Was brauche ich unbedingt für die künstlerische Qualität?", "Definieren Sie eindeutig die wichtigsten – für die künstlerische Qualität Ihres Vorhabens unabdingbaren – Voraussetzungen: Korrekte Installation, Raum, Equipment, technische und personelle Ausstattung, räumliche Gegebenheiten, Werkzeuge, Bühnen-, Licht- und Tonanlagen und andere Voraussetzungen. Legen Sie besonderen Wert auf diesen Punkt, wenn Sie selbst nicht am Aufbau beteiligt sein können, oder wenn ein enger Zeitplan vor Ort keine Möglichkeit zur Anpassung der Gegebenheiten bietet. Erstellen Sie für diese Punkte möglichst eindeutige und leicht verständliche Pläne, Skizzen und Installationsanweisungen."],
        ["Unterstützung", "Welche Unterstützung brauche ich und wie wird sie bezahlt?", "Klären Sie frühzeitig welche Unterstützung Sie benötigen und welche Ressourcen für diese Unterstützung zur Verfügung stehen. Besprechen Sie, ob und in welcher Höhe eine Entlohnung für die von Ihnen oder Ihren Assistent/innen, Freund/innen oder Helfer/innen geleistete Arbeit vorgesehen ist. Beachten Sie, dass Sie auch selbst für Ihre eigenen Kollaborateur/innen Verantwortung tragen."],
        ["Versicherung", "Welcher Versicherungsschutz besteht während Transport, Aufbau und Ausstellung?", "Sind die ausgestellten Arbeiten während des Transports, des Aufbaus und während der Ausstellung versichert? Wenn ja, in welchem Umfang und mit welchem Versicherungswert? Beachten Sie, dass es auch nicht versicherbare Situationen gibt. (Öffentlicher Raum, bei Benützbarkeit, an „schwierigen“ Orten u.ä.)."],
        ["Eigene Rechte", "Habe ich selbst alle erforderlichen Rechte und Freigaben?", "Verfügen Sie selbst über alle Rechte, die Sie benötigen? Verwenden Sie geschützte Materialien? Haben Sie die Idee alleine entwickelt oder gibt es Co-Autor/innen? Haben Sie selbst alle Beteiligten korrekt genannt? Verfügen Sie über die notwendigen Genehmigungen und Freigaben? Gehören Ihnen die verwendeten Materialien?"],
        ["Weitere Bedingungen", "Welche anderen Bedingungen sind mir wichtig?", "Deklarieren Sie etwaige andere Bedingungen, auch wenn sich diese nicht direkt auf ihre eigene Beteiligung beziehen. Welche spezifische Erwartungen bestehen an den Veranstalter/ die Veranstalterin?"],
        ["Nach Projektende", "Was passiert danach mit der produzierten Arbeit?", "Häufig entstehen Konflikte über das Schicksal von neu produzierten Arbeiten. Beachten Sie, dass neu geschaffene Arbeiten unter Umständen bereits im Eigentum des Veranstalters / der Veranstalterin stehen, wenn das Material direkt vom Veranstalter / der Veranstalterin bestellt und bezahlt wurde. Vereinbaren Sie unbedingt, ob bzw. zu welchen Bedingungen die Arbeit nach Abschluss des Projekts in ihr Eigentum übergeht. Vereinbaren Sie die Zerstörung der Arbeit, wenn Sie verhindern wollen, dass eine Arbeit gegen ihren Willen dauerhaft präsentiert wird, oder wenn Sie befürchten, dass damit unerwünschter Handel betrieben werden könnte. Ebenso gut können Sie jedoch eine bestimmte „Lebensdauer“ mit entsprechenden Wartungs- und Reparaturpflichten vereinbaren. Klären Sie, ob für den Fall eines späteren Verkaufs eine (teilweise) Rückerstattung der Produktionskosten erwartet wird. Klären Sie, ob ihr Honorar erhöht wird, wenn die Arbeit dauerhaft verbleibt. Für diese Szenarien eignen sich einfache „Wenn-Dann“ Formulierungen."],
        ["Verkauf", "Was passiert, wenn ein Verkauf zustande kommt?", "Besprechen und vereinbaren Sie, ob und in welcher Höhe eine Beteiligung des Veranstalters / der Veranstalterin an erfolgten Verkäufen vorgesehen ist. Klären Sie, ob dies auch der Fall ist, wenn die Arbeit nach Abschluss der Ausstellung verkauft wird."],
        ["Dokumentation / Archiv", "Wie wird die Veranstaltung dokumentiert und archiviert?", "In welcher Form ist eine Dokumentation geplant? Wird ein Katalog gedruckt? Wenn ja, auf wessen Kosten? Wer übernimmt dafür die inhaltliche und gestalterische Verantwortung? Welche anderen Dokumentationsformate sind geplant? Welche Onlineaktivitäten sind geplant? Ist geplant, die Dokumentation dauerhaft online verfügbar zu machen. Wenn ja, wollen Sie das oder wollen Sie das nicht? Zu welchen Bedingungen? Wollen Sie dafür alle Verwertungsrechte zeitlich unbefristet einräumen?"],
        ["Nennung", "Wer wird wo und wie genannt?", "Vereinbaren Sie möglichst präzise die Nennung aller Beteiligten mit einer genauen Bezeichnung ihrer Funktionen. Beachten Sie, dass Sie als Künstler/in auch für die Nennung ihrer Kollaborateur/innen Verantwortung tragen. Klären Sie, ob diese Nennungen auch nach Abschluss des Projekts (z.B. als Videocredits) erfolgen müssen oder erfolgen sollen."],
        ["Belegexemplare", "Wie viele Belegexemplare erhalte ich kostenfrei?", "Wie viele Exemplare der für das Projekt produzierten DVDs, Drucksorten oder Kataloge bekommen Sie kostenfrei? Welcher Preis wird für zusätzliche Exemplare vereinbart?"],
        ["Texte/Fotos/Videos/Online", "Wer erstellt Materialien und mit welchen Freigaben/Nutzungsrechten?", "Wer verfasst zu welchen Bedingungen die für das Projekt notwendigen Texte? Vereinbaren Sie, ob ihnen sämtliche Texte vor Abdruck vorgelegt werden müssen oder nicht. Wer übernimmt die fotografische oder audiovisuelle Dokumentation des Projekts? Wem stehen die dabei gemachten Aufnahmen zu welchen Bedingungen zur Verfügung? Werden alle Materialien kostenfrei übergeben oder nur eine Auswahl? Welche Verpflichtungen bestehen über die Projektdauer hinaus gegenüber Fotograf/innen, Filmemacher/innen oder anderen Beteiligten?"],
        ["Langzeitarchivierung", "Ist dauerhafte (digitale) Archivierung geplant und akzeptiert?", "Ist eine dauerhafte Verwendung des Materials im Internet oder eine andere Form von (digitaler) Langzeitarchivierung vorgesehen? Bin ich damit einverstanden? Ist es mir wichtig, diese Materialien auszuwählen und nachbearbeiten zu können? Wollen Sie dafür alle Verwertungsrechte zeitlich unbefristet einräumen?"],
        ["Weitere Gegenleistungen", "Wer erwartet noch eine Gegenleistung?", "Gibt es andere Projektbeteiligte (Finanziers, Sponsor/innen, Rechteinhaber/innen) gegenüber denen Verpflichtungen bestehen? Diese Frage stellt sich zum Beispiel hin und wieder bei Artist in Residence Programmen, wenn sich neben dem Veranstalter / der Veranstalterin auch Unterkunftgeber/innen eine künstlerische Gegenleistung erwarten."],
        ["Und dann?", "Wie möchte ich in einem Jahr auf das Projekt zurückblicken?", "Last but not least: Überlegen Sie sich, wie Sie nach einem Jahr auf das Projekt zurückblicken wollen. Wo sollen ihre Arbeiten idealerweise zu diesem Zeitpunkt sein? Wie viel Geld wollen Sie mit dem Projekt verdient haben? Welche künstlerischen oder kritischen „Erfolge“ sollten eingetreten sein? In welchem Besitz sollen neu geschaffene Werke sein? Welche Nennungen und welche Einnahmen erwarten sich die Beteiligten auch in Zukunft? Definieren Sie Ihre diesbezüglichen Erwartungen und besprechen Sie diese möglichst offen und klar mit ihrem Gegenüber. Tauschen Sie sich mit über diese Fragen und ihre Erfahrungen regelmäßig mit KollegInnen, aber auch mit GaleristInnen, KuratorInnen, VeranstalterInnen und anderen Beteiligten aus."]
      ]
    },
    en: {
      minDetailedLength: 180,
      storageKey: "agreementChecklistQuestionnaireV3_en",
      progressLabel: (detailed, total) => `${detailed} / ${total} answered in enough detail`,
      detailedRule: (min) => `Currently, an answer counts as "detailed enough" when it contains at least ${min} characters.`,
      showIncomplete: "Show only incomplete answers",
      showAll: "Show all questions",
      copySummary: "Copy summary",
      copied: "Summary copied",
      copyFailed: "Copy not available",
      moreContext: "More context",
      close: "Close",
      noAnswer: "(no answer)",
      answerLabel: "Your answer / agreement",
      answerPlaceholder: "Write concrete terms: responsibilities, budget, deadlines, rights, conditions …",
      statusDetailed: "Detailed enough",
      statusStarted: "Partially answered",
      statusOpen: "Still open",
      barDetailed: "Detailed enough",
      barStarted: "Partially answered",
      barOpen: "Still open",
      summaryTitle: "Exhibition Preparation Questionnaire (25 points)",
      summaryStatus: "Status",
      summaryAnswer: "Answer",
      charUnit: "chars",
      contextTitleSuffix: "More context",
      points: [
        ["Who?", "Who exactly am I dealing with, and who is actually responsible?", "Clarify early who you are dealing with. Do research where needed. Find out whether the person you are speaking to is personally responsible for keeping commitments, or whether they are acting for someone else (collector, program operator, sponsor, agency, etc.)."],
        ["When?", "Which timeline applies all the way to the true project close?", "Clarify the complete timeline. Remember that the project does not end with the opening: it is only complete after return of works, completion of catalog production, payment of invoices, final accounting, handover of documentation, and any required follow-up work."],
        ["What?", "What is expected from me, and which uses are planned?", "What is expected from me? Artistic work can be described. Even when the works are new, it is recommended to align expectations regarding medium, technique, size, and effort during negotiations in order to avoid unrealistic assumptions. Usage rights become relevant here: does the organizer only want to exhibit your work, or also use it for advertising, image brochures, greeting cards, posters, souvenirs, etc.? In principle, each use should be agreed separately and explicitly, and compensated where applicable."],
        ["How much?", "What are the production budget and artist fee?", "Clarify whether there is a production budget. Is a fee paid independently of production costs? If yes, how much? If total funding is still uncertain, agree on a minimum amount or a variable range."],
        ["What do I want to do?", "What do I want to realize in this project, and where are my limits?", "Regularly reflect on your own project and production priorities. Which plans can be meaningfully realized in this exhibition or project? Do you have unrealized concepts at different scales that can be adapted to the invitation? Reflect on the artistic, conceptual, ethical, political, and economic framework of your work. Define your limits: what are you willing to do, and which situations do you not want to enter."],
        ["Budget scope", "Which costs must be covered by the production/project budget?", "Do not accept just hearing a total production budget without clarifying which costs are included. This often causes conflict, because institutional overhead, marketing costs, and travel/accommodation costs may be counted inside the same project budget."],
        ["Usage / exploitation rights", "Which usage rights are transferred, when, and for what purpose?", "Who has which exploitation rights after project completion? Note that exploitation rights and physical ownership can be held by different parties, and a sale does not automatically transfer all usage rights. In case of doubt, only rights necessary for the intended purpose are considered transferred. If you provide photos for a catalog, they cannot automatically be used for merchandising. Negotiate this especially carefully for reproducible works. Inform the organizer about memberships in collecting societies (e.g., Bildrecht)."],
        ["Funding", "What happens if additional project funding is granted?", "Clarify in advance whether project-specific funding increases your production budget, or whether that funding was already assumed in the agreed budget. Organizers often calculate budgets based on expected grants."],
        ["Transport of works", "Who organizes and pays for transport to and from the venue?", "Who organizes and pays transport of agreed works to the exhibition venue and back? Which standards apply (art logistics, courier services, private transport, shared transport with colleagues)? By what date is return transport completed? Is there adequate insurance for both outgoing and return transport? Can return to another location be required, and if yes, at whose cost?"],
        ["Travel & stay", "How do I travel, where do I stay, and what is covered?", "Does the organizer cover travel to and from the venue? Which modes of transport are allowed? What cost limits apply? To what extent are accommodation and subsistence costs covered? Can a partner and child travel with you? Private stay, hotel, guesthouse, apartment, shared flat? Is childcare available on site? Are per diems paid for additional meal costs?"],
        ["Promotion", "How is the event promoted and who pays?", "In what form and at whose expense is the event promoted? Is there a printed invitation card? Is postal mailing planned, and for how many addresses? Who handles promotion on social media channels? What other information/advertising measures are planned? What participation is expected from the artist in these activities?"],
        ["Essential requirements", "What do I absolutely need to ensure artistic quality?", "Define clearly the key requirements that are indispensable for artistic quality: correct installation, space, equipment, technical and staffing support, site conditions, tools, stage/light/sound systems, and other prerequisites. Emphasize this especially if you cannot be on site during setup, or if a tight schedule leaves no room for adjustments. Provide clear plans, sketches, and installation instructions."],
        ["Support", "What support do I need, and how is it paid?", "Clarify early what support you need and what resources are available. Discuss whether and how assistants, friends, or helpers are paid for their work. Remember that you are also responsible toward your own collaborators."],
        ["Insurance", "What insurance coverage applies during transport, setup, and exhibition?", "Are the exhibited works insured during transport, installation, and the exhibition period? If yes, to what extent and at what insured value? Note that some situations may not be insurable (public space, interactive use, difficult sites, etc.)."],
        ["My own rights", "Do I hold all necessary rights and permissions myself?", "Do you possess all rights you need? Are you using protected materials? Did you develop the concept alone, or are there co-authors? Have all contributors been credited correctly? Do you have all required permits and approvals? Do you own the materials used?"],
        ["Other conditions", "Which additional conditions are important to me?", "Declare any additional conditions, including those not directly tied to your own performance. What specific expectations do you have toward the organizer?"],
        ["After project end", "What happens to the produced work afterwards?", "Conflicts often arise over the fate of newly produced works. Note that newly created works may already belong to the organizer if materials were directly ordered and paid by them. Clearly agree whether and under which conditions ownership transfers to you after project completion. You can agree on destruction if you want to prevent ongoing display against your will, or avoid unwanted trade. You may also define a lifespan with maintenance and repair duties. Clarify whether later sales trigger (partial) repayment of production costs, and whether your fee increases if the work remains permanently. Simple if-then clauses are useful."],
        ["Sale", "What happens if a sale is made?", "Discuss and agree whether the organizer receives a share of sales, and at what rate. Clarify whether this also applies to sales after the exhibition has ended."],
        ["Documentation / archive", "How will the event be documented and archived?", "Which form of documentation is planned? Is a catalog printed, and at whose cost? Who is responsible for editorial and design decisions? What other documentation formats are planned? Which online activities are planned? Is permanent online availability intended? If yes, do you want this or not, and under which terms? Do you want to grant unlimited usage rights for this?"],
        ["Credits", "Who is credited, where, and how?", "Agree as precisely as possible on credits for all contributors, including exact function labels. Remember that as an artist you are also responsible for naming your collaborators. Clarify whether credits are required or expected after project completion as well (e.g., video credits)."],
        ["Reference copies", "How many free reference copies do I receive?", "How many copies of project-produced DVDs, print materials, or catalogs do you receive free of charge? What price is agreed for additional copies?"],
        ["Texts / photos / videos / online", "Who creates materials and under which approvals/rights?", "Who writes the necessary project texts and under which conditions? Agree whether all texts must be submitted to you before print/publication. Who handles photographic or audiovisual documentation? Who may use these recordings, and under which terms? Are all materials handed over free of charge or only a selection? Which obligations continue beyond project duration toward photographers, filmmakers, or other contributors?"],
        ["Long-term archiving", "Is long-term digital archiving planned and acceptable?", "Is permanent use of material on the internet, or another form of long-term (digital) archiving, planned? Do you agree? Is it important to you to select and edit these materials yourself? Do you want to grant unlimited usage rights for this?"],
        ["Additional obligations", "Who else expects a counter-performance?", "Are there other stakeholders (funders, sponsors, rights holders) toward whom obligations exist? This can occur, for example, in artist-in-residence programs when accommodation providers also expect an artistic contribution in addition to the organizer."],
        ["And then?", "How do I want to look back on this project in one year?", "Last but not least: consider how you want to review the project after one year. Where should your works ideally be by then? How much money should you have earned through the project? Which artistic or critical outcomes should have occurred? Who should own newly created works? Which credits and revenues do stakeholders expect in the future? Define these expectations and discuss them as openly and clearly as possible with your counterpart. Exchange experiences on these questions regularly with colleagues, gallerists, curators, organizers, and other participants."]
      ]
  const minDetailedLength = 180;

  const points = [
    {
      title: "Wer?",
      question: "Mit wem habe ich es konkret zu tun und wer entscheidet tatsächlich?",
      context:
        "Klären Sie frühzeitig mit wem Sie es zu tun haben. Führen Sie – wenn notwendig – Recherchen durch. Finden Sie heraus, ob die Person für die Einhaltung der Zusagen selbst verantwortlich sein wird, oder ob Ihr Gegenüber für jemand anderen (Sammler/in, Programmbetreiber/in, Sponsor/in, Agentur etc.) handelt."
    },
    {
      title: "Wann?",
      question: "Welche zeitlichen Rahmenbedingungen gelten bis zum echten Projektabschluss?",
      context:
        "Klären Sie alle terminlichen Rahmenbedingungen. Beachten Sie, dass das Projekt nicht mit der Eröffnung abgeschlossen sein wird, sondern erst mit der Rückgabe der Arbeiten, der Fertigstellung des Katalogs, der Bezahlung aller Rechnungen, der Abrechnung, der Übergabe der Dokumentation oder anderer notwendiger Nachbearbeitungen abgeschlossen ist."
    },
    {
      title: "Was?",
      question: "Was wird von mir erwartet und welche Nutzungen sind vorgesehen?",
      context:
        "Was wird von mir erwartet? Künstlerische Arbeit kann beschrieben werden. Auch wenn es sich um neue Arbeiten handelt, empfiehlt es sich, die gegenseitigen Vorstellungen über Medium, Technik, Größe und Aufwand in den Verhandlungen abzuklären, um etwaigen unrealistischen Erwartungen bereits frühzeitig entgegenwirken zu können. Hier spielen auch zum ersten Mal Verwertungsrechte eine Rolle. Will der Veranstalter / die Veranstalterin Ihre Arbeiten „nur“ ausstellen oder auch für andere Zwecke (Werbung, Imagefolder, Grußkarten, Poster, Souvenirs etc. etc.) nutzen. Theoretisch muss jede Nutzung separat und ausdrücklich vereinbart – und gegebenenfalls honoriert – werden."
    },
    {
      title: "Wie viel?",
      question: "Wie hoch sind Produktionsbudget und Honorar?",
      context:
        "Klären Sie, ob ein Produktionsbudget zur Verfügung steht oder nicht. Wird – unabhängig von etwaigen Produktionskosten – ein Honorar bezahlt? Wenn ja, wie hoch ist dieses? Vereinbaren Sie eine Mindestgrößenordnung oder eine variable Summe, wenn das Gesamtbudget wegen laufender Finanzierungsbemühungen noch nicht feststeht."
    },
    {
      title: "Was will ich machen?",
      question: "Was möchte ich im Rahmen des Projekts realisieren und wo liegen meine Grenzen?",
      context:
        "Reflektieren Sie regelmäßig ihre eigenen Projekt- und Produktionsprioritäten. Welche Vorhaben könnten im Rahmen der aktuellen Ausstellung / des aktuellen Projekts sinnvoll realisiert werden? Verfügen Sie über unrealisierte Konzepte in verschiedenen Größenordnungen, mit denen Sie auf die jeweilige Einladung reagieren können? Reflektieren Sie regelmäßig die künstlerischen, konzeptuellen, ethischen, politischen und ökonomischen Rahmenbedingungen ihrer Arbeit. Definieren Sie die Grenzen dessen, was Sie bereit sind zu tun, bzw. welchen Situationen Sie sich lieber nicht aussetzen würden."
    },
    {
      title: "Budgetumfang",
      question: "Welche Kosten müssen aus dem Produktions-/Projektbudget bezahlt werden?",
      context:
        "Geben Sie sich nicht mit der Nennung eines Produktionsbudgets zufrieden, ohne zu besprechen, welche Kosten mit dem genannten Betrag bestritten werden müssen. Dieser Punkt führt häufig zu Konflikten, da manchmal auch institutionelle Fixkosten, Werbekosten, Reise- und Aufenthaltskosten in das Projektbudget eingerechnet werden."
    },
    {
      title: "Nutzungen / Verwertungsrechte",
      question: "Welche Verwertungsrechte werden wann und wofür übertragen?",
      context:
        "Wer verfügt nach Abschluss des Projekts über welche Verwertungsrechte? Beachten Sie, dass Verwertungsrechte und physisches Eigentum in verschiedenen Händen liegen können, und dass mit einem Verkauf nicht automatisch sämtliche Verwertungsrechte übertragen werden. Im Zweifel gelten nur jene Rechte als übertragen, die für den jeweiligen Zweck notwendig sind. Stellen Sie also etwa Fotos „für den Katalog“ zur Verfügung, so können diese nicht automatisch für Merchandisingartikel verwendet werden. Verhandeln Sie diesen Punkt insbesondere bei reproduzierbaren Werken besonders sorgfältig. Weisen Sie den Veranstalter / die Veranstalterin auf eine etwaige Mitgliedschaft bei einer Verwertungsgesellschaft (z.B.: Bildrecht) hin."
    },
    {
      title: "Förderung",
      question: "Was passiert, wenn das Projekt gefördert wird?",
      context:
        "Klären Sie vorab, ob eine projektspezifische Förderung zu einer Erhöhung des Produktionsbudgets führt, oder ob diese Förderung bereits Grundlage für das vereinbarte Produktionsbudget gewesen ist. Häufig liegen den Projektkalkulationen der Veranstalter/innen bereits Förderungserwartungen zu Grunde."
    },
    {
      title: "Transport Werke",
      question: "Wer organisiert und bezahlt Hin- und Rücktransport meiner Arbeiten?",
      context:
        "Wer organisiert und bezahlt den Transport der vereinbarten Arbeiten zum Ausstellungsort und wieder zurück? Welche Standards gelten dafür als vereinbart (Kunsttransport?, Kurierdienste?, Privattransporte?, Mitnahme durch Kolleg/innen? Bis zu welchem Datum erfolgt der Rücktransport? Besteht sowohl für den Hin- wie auch für den Rücktransport ausreichender Versicherungsschutz? Kann verlangt werden, die Arbeiten an einen anderen als den Abholort zurückzustellen? Wenn ja, zu welchen Kosten? Auf wessen Rechnung?"
    },
    {
      title: "Reise & Aufenthalt",
      question: "Wie komme ich hin, wo wohne ich und was wird übernommen?",
      context:
        "Übernimmt der Veranstalter / die Veranstalterin die Reisekosten zum Veranstaltungsort und zurück? Welche Verkehrsmittel können dafür verwendet werden? Welche Kostenlimits bestehen? In welchem Umfang werden Übernachtungs- und Aufenthaltskosten am Veranstaltungsort übernommen? Kann mein Partner mit dem Kind mitkommen? Privatunterkunft? Hotel? Pension? Wohnung? Wohngemeinschaft? Besteht vor Ort eine Möglichkeit zur Kinderbetreuung? Werden Taggelder zur Bestreitung des erhöhten Verpflegungsaufwands bezahlt?"
    },
    {
      title: "Werbung",
      question: "Wie wird die Veranstaltung beworben und wer trägt die Kosten?",
      context:
        "In welcher Form und auf wessen Kosten wird für die Veranstaltung geworben? Wird eine Einladungskarte gedruckt? Ist ein Postversand geplant? Wenn ja, auf wessen Kosten und an wie viele Adressen? Wer übernimmt die Bewerbung der Veranstaltung in Social-Media Kanälen? Welche anderen Werbe- und Informationsmaßnahmen sind geplant? Welche Erwartungen bestehen seitens des Veranstalters / der Veranstalterin hinsichtlich der Mitwirkung des Künstlers/ der Künstlerin an diesen Maßnahmen?"
    },
    {
      title: "Mindestvoraussetzungen",
      question: "Was brauche ich unbedingt für die künstlerische Qualität?",
      context:
        "Definieren Sie eindeutig die wichtigsten – für die künstlerische Qualität Ihres Vorhabens unabdingbaren – Voraussetzungen: Korrekte Installation, Raum, Equipment, technische und personelle Ausstattung, räumliche Gegebenheiten, Werkzeuge, Bühnen-, Licht- und Tonanlagen und andere Voraussetzungen. Legen Sie besonderen Wert auf diesen Punkt, wenn Sie selbst nicht am Aufbau beteiligt sein können, oder wenn ein enger Zeitplan vor Ort keine Möglichkeit zur Anpassung der Gegebenheiten bietet. Erstellen Sie für diese Punkte möglichst eindeutige und leicht verständliche Pläne, Skizzen und Installationsanweisungen."
    },
    {
      title: "Unterstützung",
      question: "Welche Unterstützung brauche ich und wie wird sie bezahlt?",
      context:
        "Klären Sie frühzeitig welche Unterstützung Sie benötigen und welche Ressourcen für diese Unterstützung zur Verfügung stehen. Besprechen Sie, ob und in welcher Höhe eine Entlohnung für die von Ihnen oder Ihren Assistent/innen, Freund/innen oder Helfer/innen geleistete Arbeit vorgesehen ist. Beachten Sie, dass Sie auch selbst für Ihre eigenen Kollaborateur/innen Verantwortung tragen."
    },
    {
      title: "Versicherung",
      question: "Welcher Versicherungsschutz besteht während Transport, Aufbau und Ausstellung?",
      context:
        "Sind die ausgestellten Arbeiten während des Transports, des Aufbaus und während der Ausstellung versichert? Wenn ja, in welchem Umfang und mit welchem Versicherungswert? Beachten Sie, dass es auch nicht versicherbare Situationen gibt. (Öffentlicher Raum, bei Benützbarkeit, an „schwierigen“ Orten u.ä.)."
    },
    {
      title: "Eigene Rechte",
      question: "Habe ich selbst alle erforderlichen Rechte und Freigaben?",
      context:
        "Verfügen Sie selbst über alle Rechte, die Sie benötigen? Verwenden Sie geschützte Materialien? Haben Sie die Idee alleine entwickelt oder gibt es Co-Autor/innen? Haben Sie selbst alle Beteiligten korrekt genannt? Verfügen Sie über die notwendigen Genehmigungen und Freigaben? Gehören Ihnen die verwendeten Materialien?"
    },
    {
      title: "Weitere Bedingungen",
      question: "Welche anderen Bedingungen sind mir wichtig?",
      context:
        "Deklarieren Sie etwaige andere Bedingungen, auch wenn sich diese nicht direkt auf ihre eigene Beteiligung beziehen. Welche spezifische Erwartungen bestehen an den Veranstalter/ die Veranstalterin?"
    },
    {
      title: "Nach Projektende",
      question: "Was passiert danach mit der produzierten Arbeit?",
      context:
        "Häufig entstehen Konflikte über das Schicksal von neu produzierten Arbeiten. Beachten Sie, dass neu geschaffene Arbeiten unter Umständen bereits im Eigentum des Veranstalters / der Veranstalterin stehen, wenn das Material direkt vom Veranstalter / der Veranstalterin bestellt und bezahlt wurde. Vereinbaren Sie unbedingt, ob bzw. zu welchen Bedingungen die Arbeit nach Abschluss des Projekts in ihr Eigentum übergeht. Vereinbaren Sie die Zerstörung der Arbeit, wenn Sie verhindern wollen, dass eine Arbeit gegen ihren Willen dauerhaft präsentiert wird, oder wenn Sie befürchten, dass damit unerwünschter Handel betrieben werden könnte. Ebenso gut können Sie jedoch eine bestimmte „Lebensdauer“ mit entsprechenden Wartungs- und Reparaturpflichten vereinbaren. Klären Sie, ob für den Fall eines späteren Verkaufs eine (teilweise) Rückerstattung der Produktionskosten erwartet wird. Klären Sie, ob ihr Honorar erhöht wird, wenn die Arbeit dauerhaft verbleibt. Für diese Szenarien eignen sich einfache „Wenn-Dann“ Formulierungen."
    },
    {
      title: "Verkauf",
      question: "Was passiert, wenn ein Verkauf zustande kommt?",
      context:
        "Besprechen und vereinbaren Sie, ob und in welcher Höhe eine Beteiligung des Veranstalters / der Veranstalterin an erfolgten Verkäufen vorgesehen ist. Klären Sie, ob dies auch der Fall ist, wenn die Arbeit nach Abschluss der Ausstellung verkauft wird."
    },
    {
      title: "Dokumentation / Archiv",
      question: "Wie wird die Veranstaltung dokumentiert und archiviert?",
      context:
        "In welcher Form ist eine Dokumentation geplant? Wird ein Katalog gedruckt? Wenn ja, auf wessen Kosten? Wer übernimmt dafür die inhaltliche und gestalterische Verantwortung? Welche anderen Dokumentationsformate sind geplant? Welche Onlineaktivitäten sind geplant? Ist geplant, die Dokumentation dauerhaft online verfügbar zu machen. Wenn ja, wollen Sie das oder wollen Sie das nicht? Zu welchen Bedingungen? Wollen Sie dafür alle Verwertungsrechte zeitlich unbefristet einräumen?"
    },
    {
      title: "Nennung",
      question: "Wer wird wo und wie genannt?",
      context:
        "Vereinbaren Sie möglichst präzise die Nennung aller Beteiligten mit einer genauen Bezeichnung ihrer Funktionen. Beachten Sie, dass Sie als Künstler/in auch für die Nennung ihrer Kollaborateur/innen Verantwortung tragen. Klären Sie, ob diese Nennungen auch nach Abschluss des Projekts (z.B. als Videocredits) erfolgen müssen oder erfolgen sollen."
    },
    {
      title: "Belegexemplare",
      question: "Wie viele Belegexemplare erhalte ich kostenfrei?",
      context:
        "Wie viele Exemplare der für das Projekt produzierten DVDs, Drucksorten oder Kataloge bekommen Sie kostenfrei? Welcher Preis wird für zusätzliche Exemplare vereinbart?"
    },
    {
      title: "Texte/Fotos/Videos/Online",
      question: "Wer erstellt Materialien und mit welchen Freigaben/Nutzungsrechten?",
      context:
        "Wer verfasst zu welchen Bedingungen die für das Projekt notwendigen Texte? Vereinbaren Sie, ob ihnen sämtliche Texte vor Abdruck vorgelegt werden müssen oder nicht. Wer übernimmt die fotografische oder audiovisuelle Dokumentation des Projekts? Wem stehen die dabei gemachten Aufnahmen zu welchen Bedingungen zur Verfügung? Werden alle Materialien kostenfrei übergeben oder nur eine Auswahl? Welche Verpflichtungen bestehen über die Projektdauer hinaus gegenüber Fotograf/innen, Filmemacher/innen oder anderen Beteiligten?"
    },
    {
      title: "Langzeitarchivierung",
      question: "Ist dauerhafte (digitale) Archivierung geplant und akzeptiert?",
      context:
        "Ist eine dauerhafte Verwendung des Materials im Internet oder eine andere Form von (digitaler) Langzeitarchivierung vorgesehen? Bin ich damit einverstanden? Ist es mir wichtig, diese Materialien auszuwählen und nachbearbeiten zu können? Wollen Sie dafür alle Verwertungsrechte zeitlich unbefristet einräumen?"
    },
    {
      title: "Weitere Gegenleistungen",
      question: "Wer erwartet noch eine Gegenleistung?",
      context:
        "Gibt es andere Projektbeteiligte (Finanziers, Sponsor/innen, Rechteinhaber/innen) gegenüber denen Verpflichtungen bestehen? Diese Frage stellt sich zum Beispiel hin und wieder bei Artist in Residence Programmen, wenn sich neben dem Veranstalter / der Veranstalterin auch Unterkunftgeber/innen eine künstlerische Gegenleistung erwarten."
    },
    {
      title: "Und dann?",
      question: "Wie möchte ich in einem Jahr auf das Projekt zurückblicken?",
      context:
        "Last but not least: Überlegen Sie sich, wie Sie nach einem Jahr auf das Projekt zurückblicken wollen. Wo sollen ihre Arbeiten idealerweise zu diesem Zeitpunkt sein? Wie viel Geld wollen Sie mit dem Projekt verdient haben? Welche künstlerischen oder kritischen „Erfolge“ sollten eingetreten sein? In welchem Besitz sollen neu geschaffene Werke sein? Welche Nennungen und welche Einnahmen erwarten sich die Beteiligten auch in Zukunft? Definieren Sie Ihre diesbezüglichen Erwartungen und besprechen Sie diese möglichst offen und klar mit ihrem Gegenüber. Tauschen Sie sich mit über diese Fragen und ihre Erfahrungen regelmäßig mit KollegInnen, aber auch mit GaleristInnen, KuratorInnen, VeranstalterInnen und anderen Beteiligten aus."
    }
  };

  const i18n = dictionary[language];
  const points = i18n.points.map(([title, question, context]) => ({ title, question, context }));

  const state = {
    showIncomplete: false,
    items: points.map((point) => ({ ...point, answer: "" }))
  const STORAGE_KEY = "agreementChecklistQuestionnaireV2";

  const state = {
    showIncomplete: false,
    items: points.map((point) => ({
      ...point,
      answer: ""
    }))
  };

  const listEl = document.getElementById("agreementList");
  const progressEl = document.getElementById("agreementProgress");
  const showIncompleteBtn = document.getElementById("showIncompleteBtn");
  const copySummaryBtn = document.getElementById("copySummaryBtn");
  const barsEl = document.getElementById("agreementBars");
  const legendEl = document.getElementById("agreementLegend");
  const dialogEl = document.getElementById("contextDialog");
  const dialogTitleEl = document.getElementById("contextDialogTitle");
  const dialogTextEl = document.getElementById("contextDialogText");

  const escapeHtml = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const getAnswerClass = (text) => {
    const normalized = text.trim();
    if (!normalized) return "open";
    if (normalized.length >= i18n.minDetailedLength) return "detailed";
    return "started";
  };

  const getStatusText = (answerClass) => {
    if (answerClass === "detailed") return i18n.statusDetailed;
    if (answerClass === "started") return i18n.statusStarted;
    return i18n.statusOpen;
  };

  const save = () => {
    localStorage.setItem(i18n.storageKey, JSON.stringify(state.items.map((item) => item.answer)));
    if (normalized.length >= minDetailedLength) return "detailed";
    return "started";
  };

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items.map((item) => item.answer)));
  };

  const load = () => {
    try {
      const raw = localStorage.getItem(i18n.storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return;
      parsed.forEach((answer, index) => {
        if (typeof answer === "string" && state.items[index]) state.items[index].answer = answer;
        if (typeof answer === "string" && state.items[index]) {
          state.items[index].answer = answer;
        }
      });
    } catch (_) {
      // ignore corrupted local state
    }
  };

  const updateVisuals = () => {
    const counts = state.items.reduce((acc, item) => {
      acc[getAnswerClass(item.answer)] += 1;
      return acc;
    }, { detailed: 0, started: 0, open: 0 });

    progressEl.textContent = i18n.progressLabel(counts.detailed, state.items.length);
    const toPct = (value) => (value / state.items.length) * 100;

    barsEl.innerHTML = `
      <div class="agreement-bar">
        <span class="agreement-bar-label">${i18n.barDetailed} (${counts.detailed})</span>
        <div class="agreement-bar-track"><span class="agreement-bar-fill agreement-bar-fill-detailed" style="width:${toPct(counts.detailed)}%"></span></div>
      </div>
      <div class="agreement-bar">
        <span class="agreement-bar-label">${i18n.barStarted} (${counts.started})</span>
        <div class="agreement-bar-track"><span class="agreement-bar-fill agreement-bar-fill-started" style="width:${toPct(counts.started)}%"></span></div>
      </div>
      <div class="agreement-bar">
        <span class="agreement-bar-label">${i18n.barOpen} (${counts.open})</span>
        <div class="agreement-bar-track"><span class="agreement-bar-fill agreement-bar-fill-open" style="width:${toPct(counts.open)}%"></span></div>
      </div>
    `;

    legendEl.textContent = i18n.detailedRule(i18n.minDetailedLength);
    const counts = state.items.reduce(
      (acc, item) => {
        acc[getAnswerClass(item.answer)] += 1;
        return acc;
      },
      { detailed: 0, started: 0, open: 0 }
    );

    progressEl.textContent = `${counts.detailed} / ${state.items.length} ausreichend detailliert`;

    const toPct = (value) => (value / state.items.length) * 100;
    barsEl.innerHTML = `
      <div class="agreement-bar">
        <span class="agreement-bar-label">Ausreichend detailliert (${counts.detailed})</span>
        <div class="agreement-bar-track"><span class="agreement-bar-fill agreement-bar-fill-detailed" style="width:${toPct(counts.detailed)}%"></span></div>
      </div>
      <div class="agreement-bar">
        <span class="agreement-bar-label">Teilweise beantwortet (${counts.started})</span>
        <div class="agreement-bar-track"><span class="agreement-bar-fill agreement-bar-fill-started" style="width:${toPct(counts.started)}%"></span></div>
      </div>
      <div class="agreement-bar">
        <span class="agreement-bar-label">Noch offen (${counts.open})</span>
        <div class="agreement-bar-track"><span class="agreement-bar-fill agreement-bar-fill-open" style="width:${toPct(counts.open)}%"></span></div>
      </div>
    `;

    legendEl.textContent = `Als "ausreichend detailliert" zählt aktuell eine Antwort mit mindestens ${minDetailedLength} Zeichen.`;
  };

  const render = () => {
    updateVisuals();

    const visibleItems = state.items
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => !state.showIncomplete || getAnswerClass(item.answer) !== "detailed");

    listEl.innerHTML = visibleItems.map(({ item, index }) => {
      const answerClass = getAnswerClass(item.answer);
      const charCount = item.answer.trim().length;
      return `
        <article class="agreement-item agreement-answer-${answerClass}">
          <div class="agreement-head">
            <h3>${index + 1}) ${escapeHtml(item.title)} – ${escapeHtml(item.question)}</h3>
            <span class="pill">${getStatusText(answerClass)}</span>
          </div>
          <div class="agreement-question-actions">
            <button type="button" class="btn btn-outline more-context-btn" data-context-index="${index}">${i18n.moreContext}</button>
            <span class="muted">${charCount} ${i18n.charUnit}</span>
          </div>
          <label class="q">
            <span class="hint">${i18n.answerLabel}</span>
            <textarea data-answer-index="${index}" rows="4" placeholder="${i18n.answerPlaceholder}">${escapeHtml(item.answer)}</textarea>
          </label>
        </article>
      `;
    }).join("");
    listEl.innerHTML = visibleItems
      .map(({ item, index }) => {
        const answerClass = getAnswerClass(item.answer);
        const charCount = item.answer.trim().length;
        const statusText =
          answerClass === "detailed"
            ? "Ausreichend detailliert"
            : answerClass === "started"
              ? "Teilweise beantwortet"
              : "Noch offen";

        return `
          <article class="agreement-item agreement-answer-${answerClass}">
            <div class="agreement-head">
              <h3>${index + 1}) ${escapeHtml(item.title)} – ${escapeHtml(item.question)}</h3>
              <span class="pill">${statusText}</span>
            </div>
            <div class="agreement-question-actions">
              <button type="button" class="btn btn-outline more-context-btn" data-context-index="${index}">Mehr Kontext</button>
              <span class="muted">${charCount} Zeichen</span>
            </div>
            <label class="q">
              <span class="hint">Deine Antwort / Vereinbarung</span>
              <textarea data-answer-index="${index}" rows="4" placeholder="Formuliere hier konkret: Zuständigkeiten, Budget, Fristen, Rechte, Bedingungen …">${escapeHtml(item.answer)}</textarea>
            </label>
          </article>
        `;
      })
      .join("");

    listEl.querySelectorAll("textarea[data-answer-index]").forEach((textarea) => {
      textarea.addEventListener("input", (event) => {
        const index = Number(event.target.getAttribute("data-answer-index"));
        state.items[index].answer = event.target.value;
        save();
        updateVisuals();

        const card = event.target.closest(".agreement-item");
        if (!card) return;

        const answerClass = getAnswerClass(state.items[index].answer);
        card.classList.remove("agreement-answer-open", "agreement-answer-started", "agreement-answer-detailed");
        card.classList.add(`agreement-answer-${answerClass}`);

        const countEl = card.querySelector(".agreement-question-actions .muted");
        if (countEl) countEl.textContent = `${state.items[index].answer.trim().length} ${i18n.charUnit}`;

        const pillEl = card.querySelector(".pill");
        if (pillEl) pillEl.textContent = getStatusText(answerClass);
        const card = event.target.closest(".agreement-item");
        if (!card) return;
        const answerClass = getAnswerClass(state.items[index].answer);
        card.classList.remove("agreement-answer-open", "agreement-answer-started", "agreement-answer-detailed");
        card.classList.add(`agreement-answer-${answerClass}`);
        const countEl = card.querySelector(".agreement-question-actions .muted");
        if (countEl) countEl.textContent = `${state.items[index].answer.trim().length} Zeichen`;
        const pillEl = card.querySelector(".pill");
        if (pillEl) {
          pillEl.textContent = answerClass === "detailed" ? "Ausreichend detailliert" : answerClass === "started" ? "Teilweise beantwortet" : "Noch offen";
        }
      });
    });

    listEl.querySelectorAll(".more-context-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = Number(btn.getAttribute("data-context-index"));
        const item = state.items[index];
        dialogTitleEl.textContent = `${index + 1}) ${item.title} – ${i18n.contextTitleSuffix}`;
        dialogTitleEl.textContent = `${index + 1}) ${item.title} – Mehr Kontext`;
        dialogTextEl.textContent = item.context;
        dialogEl.showModal();
      });
    });

    showIncompleteBtn.textContent = state.showIncomplete ? i18n.showAll : i18n.showIncomplete;
    showIncompleteBtn.textContent = state.showIncomplete ? "Alle Fragen zeigen" : "Nur unvollständige Antworten";
  };

  showIncompleteBtn.addEventListener("click", () => {
    state.showIncomplete = !state.showIncomplete;
    render();
  });

  copySummaryBtn.addEventListener("click", async () => {
    const summary = state.items.map((item, index) => {
      const answerClass = getAnswerClass(item.answer);
      const answer = item.answer.trim() || i18n.noAnswer;
      return `${index + 1}) ${item.title}\n${i18n.summaryStatus}: ${getStatusText(answerClass)}\n${i18n.summaryAnswer}: ${answer}`;
    }).join("\n\n");

    const payload = `${i18n.summaryTitle}\n\n${summary}`;
    const summary = state.items
      .map((item, index) => {
        const answerClass = getAnswerClass(item.answer);
        const statusText = answerClass === "detailed" ? "ausreichend detailliert" : answerClass === "started" ? "teilweise" : "offen";
        const answer = item.answer.trim() || "(keine Antwort)";
        return `${index + 1}) ${item.title}\nStatus: ${statusText}\nAntwort: ${answer}`;
      })
      .join("\n\n");

    const payload = `Ausstellungs-Fragebogen (25 Punkte)\n\n${summary}`;

    try {
      await navigator.clipboard.writeText(payload);
      copySummaryBtn.textContent = i18n.copied;
    } catch (_) {
      copySummaryBtn.textContent = i18n.copyFailed;
    }

    window.setTimeout(() => {
      copySummaryBtn.textContent = i18n.copySummary;
    }, 1600);
  });

  dialogEl.addEventListener("click", (event) => {
    const rect = dialogEl.getBoundingClientRect();
    const clickedOutside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (clickedOutside) dialogEl.close();
  });

  copySummaryBtn.textContent = i18n.copySummary;
  showIncompleteBtn.textContent = i18n.showIncomplete;

    const clickedOutside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;
    if (clickedOutside) dialogEl.close();
  });

  load();
  render();
})();
