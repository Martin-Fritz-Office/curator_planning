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
  ];

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
  const showOpenBtn = document.getElementById("showOpenBtn");
  const copySummaryBtn = document.getElementById("copySummaryBtn");
  const contextModal = document.getElementById("contextModal");
  const contextModalTitle = document.getElementById("contextModalTitle");
  const contextModalBody = document.getElementById("contextModalBody");
  const contextModalCloseBtn = document.getElementById("contextModalCloseBtn");
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
    if (normalized.length >= minDetailedLength) return "detailed";
    return "started";
  };

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items.map((item) => item.answer)));
  };

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
      parsed.forEach((answer, index) => {
        if (typeof answer === "string" && state.items[index]) {
          state.items[index].answer = answer;
        }
      });
    } catch (_) {
      // ignore corrupted local state
    }
  };

  const updateVisuals = () => {
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
        dialogTitleEl.textContent = `${index + 1}) ${item.title} – Mehr Kontext`;
        dialogTextEl.textContent = item.context;
        dialogEl.showModal();
      });
    });

    showIncompleteBtn.textContent = state.showIncomplete ? "Alle Fragen zeigen" : "Nur unvollständige Antworten";
  };

  showIncompleteBtn.addEventListener("click", () => {
    state.showIncomplete = !state.showIncomplete;
    render();
  });

  copySummaryBtn.addEventListener("click", async () => {
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
      copySummaryBtn.textContent = "Zusammenfassung kopiert";
    } catch (_) {
      copySummaryBtn.textContent = "Kopieren nicht möglich";
    }

    window.setTimeout(() => {
      copySummaryBtn.textContent = "Zusammenfassung kopieren";
    }, 1600);
  });

  dialogEl.addEventListener("click", (event) => {
    const rect = dialogEl.getBoundingClientRect();
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
