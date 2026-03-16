const VEREINSTIPPS = [
  { id: 1, number: 1, title: "Statuten auf Aktualität prüfen", description: "Die Vereinsstatuten sind regelmäßig auf Aktualität, innere Widerspruchsfreiheit und Übereinstimmung mit den gesetzlichen Anforderungen zu prüfen und erforderlichenfalls anzupassen.", categories: ["Governance & Statuten"] },
  { id: 2, number: 2, title: "Zuständigkeiten der Vereinsorgane einhalten", description: "Die in den Statuten festgelegten Zuständigkeiten der Vereinsorgane sind einzuhalten und Abweichungen davon nachvollziehbar zu begründen.", categories: ["Governance & Statuten"] },
  { id: 3, number: 3, title: "Materielle Mittel dokumentieren", description: "Alle materiellen Mittel zur Erreichung des Vereinszwecks sind in den Statuten anzuführen.", categories: ["Governance & Statuten"] },
  { id: 4, number: 4, title: "Einladungsbestimmungen evaluieren", description: "Die statutarischen Regelungen zur Einladung zur Generalversammlung sind zu evaluieren und konsequent einzuhalten.", categories: ["Governance & Statuten"] },
  { id: 5, number: 5, title: "Wirtschaftsjahr genehmigen", description: "Änderungen des Wirtschaftsjahres sind durch Beschluss der Generalversammlung zu genehmigen und in den Statuten zu verankern.", categories: ["Governance & Statuten"] },
  { id: 6, number: 6, title: "Schiedsgericht und Sonderorgane prüfen", description: "Die Statuten sind hinsichtlich der Bestimmungen über das Schiedsgericht und allfälliger Sonderorgane auf Aktualität und Zweckmäßigkeit zu prüfen.", categories: ["Governance & Statuten"] },
  { id: 7, number: 7, title: "Auflösungsbestimmung überprüfen", description: "Bei der Auflösung des Vereins ist sicherzustellen, dass die in den Statuten genannte Empfängerorganisation für allfälliges Vereinsvermögen tatsächlich noch existent und rechtsfähig ist.", categories: ["Governance & Statuten"] },
  { id: 8, number: 8, title: "Mitgliederversammlungen korrekt abbilden", description: "Die Bestimmungen des Vereinsgesetzes hinsichtlich der Einberufung von Mitgliederversammlungen sind in den Statuten korrekt abzubilden.", categories: ["Governance & Statuten"] },
  { id: 9, number: 9, title: "Ordentliche Generalversammlungen durchführen", description: "Ordentliche Generalversammlungen sind gemäß den Statuten jährlich durchzuführen.", categories: ["Generalversammlung & Protokolle"] },
  { id: 10, number: 10, title: "Sitzungen fortlaufend nummerieren", description: "Alle Sitzungen der Generalversammlung – einschließlich außerordentlicher – sind fortlaufend zu nummerieren, um Vollständigkeit und Nachvollziehbarkeit zu gewährleisten.", categories: ["Generalversammlung & Protokolle"] },
  { id: 11, number: 11, title: "Schriftliche Protokolle anfertigen", description: "Über jede Generalversammlung ist ein schriftliches Protokoll anzufertigen, das Anwesenheitsliste, Tagesordnung, Beschlussinhalte und Abstimmungsergebnisse enthält.", categories: ["Generalversammlung & Protokolle"] },
  { id: 12, number: 12, title: "Protokolle unterzeichnen und aufbewahren", description: "Die Protokolle sind von den zuständigen Vereinsorganen zu unterzeichnen und sorgfältig aufzubewahren.", categories: ["Generalversammlung & Protokolle"] },
  { id: 13, number: 13, title: "Aufgaben der Generalversammlung wahrnehmen", description: "Die Generalversammlung hat sämtliche ihr statutarisch obliegenden Aufgaben wahrzunehmen, insbesondere die Genehmigung des Rechnungsabschlusses, die Entlastung des Vorstandes und die Beschlussfassung über den Voranschlag.", categories: ["Generalversammlung & Protokolle"] },
  { id: 14, number: 14, title: "Vorstandssitzung als Mitgliederversammlung dokumentieren", description: "Sofern eine Vorstandssitzung zugleich als Mitgliederversammlung fungiert, ist dies in den Protokollen ausdrücklich zu dokumentieren.", categories: ["Generalversammlung & Protokolle"] },
  { id: 15, number: 15, title: "Fehlende Beschlussfassungen nachzuholen", description: "Fehlende Beschlussfassungen der Vereinsorgane sind umgehend nachzuholen und zu protokollieren.", categories: ["Generalversammlung & Protokolle"] },
  { id: 16, number: 16, title: "Teilnehmerliste aufzulegen", description: "Eine Teilnehmerliste ist bei jeder Generalversammlung aufzulegen, um die statutengemäße Beschlussfähigkeit nachzuweisen.", categories: ["Generalversammlung & Protokolle"] },
  { id: 17, number: 17, title: "Leitungsorgane müssen Vereinsmitglieder sein", description: "Die Mitglieder des Leitungsorgans müssen Vereinsmitglieder sein oder es ist eine anderslautende Satzungsbestimmung vorzusehen.", categories: ["Vorstand & Vertretung"] },
  { id: 18, number: 18, title: "Vertretungsregelungen konsequent einhalten", description: "Die organschaftlichen Vertretungsregelungen sind im Zahlungsverkehr und bei Vertragsabschlüssen konsequent einzuhalten und intern zu kommunizieren.", categories: ["Vorstand & Vertretung"] },
  { id: 19, number: 19, title: "Kurzprotokolle von Vorstandsbeschlüssen", description: "Über alle wesentlichen Beschlüsse des Vorstandes sind zumindest Kurzprotokolle anzufertigen.", categories: ["Vorstand & Vertretung"] },
  { id: 20, number: 20, title: "Neuwahl vor Ablauf der Funktionsperiode", description: "Vor Ablauf der Funktionsperiode des Leitungsorganes ist rechtzeitig eine Mitgliederversammlung zwecks Neuwahl der Vereinsorgane durchzuführen.", categories: ["Vorstand & Vertretung"] },
  { id: 21, number: 21, title: "Generalversammlung-Kompetenzen nicht durch Vorstand", description: "Entscheidungen, die gemäß Statuten in den Wirkungsbereich der Generalversammlung fallen, dürfen nicht allein durch den Vorstand oder die Geschäftsführung getroffen werden; eine nachträgliche Genehmigung ist einzuholen.", categories: ["Vorstand & Vertretung"] },
  { id: 22, number: 22, title: "Geschäftsordnung beschließen", description: "Für die Geschäftsführung ist eine umfassende und von der Generalversammlung beschlossene Geschäftsordnung zu erlassen.", categories: ["Vorstand & Vertretung"] },
  { id: 23, number: 23, title: "Erreichbarkeit vertretungsbefugter Personen", description: "Eine ständige Erreichbarkeit einer vertretungsbefugten Person ist durch geeignete organisatorische Maßnahmen sicherzustellen.", categories: ["Vorstand & Vertretung"] },
  { id: 24, number: 24, title: "Gegenzeichnung ab Betragsgrenze", description: "Ab einer dem Verein zweckmäßig erscheinenden Betragsgrenze ist die Gegenzeichnung durch ein zweites zeichnungsberechtigtes Organ einzuführen (Vieraugenprinzip).", categories: ["Internes Kontrollsystem"] },
  { id: 25, number: 25, title: "Vieraugenprinzip bei höheren Beträgen", description: "Das Vieraugenprinzip ist bei Verfügungen über höhere Beträge ausnahmslos zu garantieren und entsprechend zu dokumentieren.", categories: ["Internes Kontrollsystem"] },
  { id: 26, number: 26, title: "Online-Banking-Zugänge sicher verwahren", description: "Online-Banking-Zugänge und Authentifizierungsmittel (z. B. TAN-Codes) sind so zu verwahren, dass das Vieraugenprinzip gewahrt bleibt; die alleinige Verfügungsgewalt einer einzelnen Person ist zu vermeiden.", categories: ["Internes Kontrollsystem"] },
  { id: 27, number: 27, title: "Zeichnungsberechtigungen aktualisieren", description: "Zeichnungsberechtigungen bei Kreditinstituten sind aktuell zu halten; ausgeschiedene Vereinsorgane sind unverzüglich zu streichen.", categories: ["Internes Kontrollsystem"] },
  { id: 28, number: 28, title: "Ablaufbeschreibungen erstellen", description: "Im Rahmen eines internen Kontrollsystems sind schriftliche Ablaufbeschreibungen für wesentliche Prozesse (Kassaführung, Zahlungsverkehr, Belegwesen) zu erarbeiten.", categories: ["Internes Kontrollsystem"] },
  { id: 29, number: 29, title: "Compliance-Regelungen erarbeiten", description: "Compliance-Regelungen sind zu erarbeiten und für geförderte Organisationen verpflichtend einzufordern.", categories: ["Internes Kontrollsystem"] },
  { id: 30, number: 30, title: "Prozesse standardisieren", description: "Beratungsrelevante und entscheidungsrelevante Prozesse sind zu verschriftlichen und zu standardisieren.", categories: ["Internes Kontrollsystem"] },
  { id: 31, number: 31, title: "Zustimmung zu In-sich-Geschäften einholen", description: "Bei Rechtsgeschäften zwischen einem Vorstandsmitglied und dem Verein (In-sich-Geschäfte) ist die Zustimmung eines weiteren vertretungsbefugten Organs einzuholen und nachvollziehbar zu dokumentieren.", categories: ["In-sich-Geschäfte"] },
  { id: 32, number: 32, title: "In-sich-Geschäfte im Bericht anführen", description: "Die Rechnungsprüfenden sind verpflichtet, In-sich-Geschäfte in ihrem Bericht gesondert anzuführen und zu beurteilen.", categories: ["In-sich-Geschäfte"] },
  { id: 33, number: 33, title: "In-sich-Geschäfte schriftlich abschließen", description: "In-sich-Geschäfte sind ausschließlich schriftlich abzuschließen; die vereinsrechtlichen Vorgaben sind beim Vertragsabschluss einzuhalten.", categories: ["In-sich-Geschäfte"] },
  { id: 34, number: 34, title: "Marktpreise bei Befangenheit nachweisen", description: "Bei Befangenheit sind Markt- oder Börsenpreise nachzuweisen bzw. Vergleichsangebote einzuholen und zu dokumentieren.", categories: ["In-sich-Geschäfte"] },
  { id: 35, number: 35, title: "Zwei unabhängige Rechnungsprüfer wählen", description: "Entsprechend den Vorgaben des Vereinsgesetzes sind zwei unabhängige und unbefangene Rechnungsprüfende von der Generalversammlung zu wählen.", categories: ["Rechnungsprüfung"] },
  { id: 36, number: 36, title: "Wahl der Rechnungsprüfer protokollieren", description: "Die Wahl der Rechnungsprüfenden ist im Protokoll der Generalversammlung taxativ zu dokumentieren.", categories: ["Rechnungsprüfung"] },
  { id: 37, number: 37, title: "Fristen für Rechnungsprüfung einhalten", description: "Die im Vereinsgesetz vorgesehenen Fristen für die Rechnungsprüfung sind einzuhalten.", categories: ["Rechnungsprüfung"] },
  { id: 38, number: 38, title: "Rechnungsprüfungsberichte schriftlich erstellen", description: "Rechnungsprüfungsberichte sind schriftlich zu erstellen und von den Prüfenden zu unterzeichnen; nur so ist eine strukturierte und vollständige Berichterstattung gewährleistet.", categories: ["Rechnungsprüfung"] },
  { id: 39, number: 39, title: "Statutengemäße Mittelverwendung bestätigen", description: "Im Rechnungsprüfungsbericht ist die statutengemäße Verwendung der Mittel ausdrücklich zu bestätigen.", categories: ["Rechnungsprüfung"] },
  { id: 40, number: 40, title: "Rechnungsprüfer persönlich berichten", description: "Die Rechnungsprüfenden haben in der Generalversammlung persönlich Bericht zu erstatten; zumindest eine prüfende Person sollte dabei anwesend sein.", categories: ["Rechnungsprüfung"] },
  { id: 41, number: 41, title: "Unabhängigkeit bei Bestellung beachten", description: "Bei der Bestellung von Rechnungsprüfenden ist auf deren Unabhängigkeit und Unbefangenheit zu achten, um Interessenkonflikte zu vermeiden.", categories: ["Rechnungsprüfung"] },
  { id: 42, number: 42, title: "Rechnungsprüfer regelmäßig wechseln", description: "Eine regelmäßige Rotation der Rechnungsprüfenden ist anzustreben.", categories: ["Rechnungsprüfung"] },
  { id: 43, number: 43, title: "Einnahmen und Ausgaben vollständig erfassen", description: "Alle Einnahmen und Ausgaben sind laufend und vollständig zu erfassen; das Belegprinzip ist strikt einzuhalten.", categories: ["Buchführung & Jahresabschluss"] },
  { id: 44, number: 44, title: "Einnahmen-Ausgaben-Rechnung erstellen", description: "Binnen fünf Monaten nach Ende des Geschäftsjahres sind eine Einnahmen-Ausgaben-Rechnung sowie eine Vermögensübersicht gemäß Vereinsgesetz zu erstellen.", categories: ["Buchführung & Jahresabschluss"] },
  { id: 45, number: 45, title: "Einnahmen-Ausgaben-Rechnung einheitlich gestalten", description: "Die Einnahmen-Ausgaben-Rechnung ist einheitlich und widerspruchsfrei zu gestalten; einmal gewählte Gliederungsgrundsätze und Kontenbezeichnungen sind beizubehalten.", categories: ["Buchführung & Jahresabschluss"] },
  { id: 46, number: 46, title: "Belege korrekt nummerieren und lagern", description: "Alle Belege sind mit Datum, fortlaufender Nummerierung und Kontierungsvermerk zu versehen und geordnet aufzubewahren.", categories: ["Buchführung & Jahresabschluss"] },
  { id: 47, number: 47, title: "Eigenbelege für fehlende Dokumente erstellen", description: "Für nicht mehr auffindbare Belege sind Eigenbelege zu erstellen.", categories: ["Buchführung & Jahresabschluss"] },
  { id: 48, number: 48, title: "Finanzlage klar darstellen", description: "Die Finanzlage des Vereins muss aus dem Rechenwerk klar und nachvollziehbar erkennbar sein; Saldierungen sind zu unterlassen.", categories: ["Buchführung & Jahresabschluss"] },
  { id: 49, number: 49, title: "Zahlungsverpflichtungen über Vereinskonto", description: "Sämtliche Zahlungsverpflichtungen sind ausschließlich über das Vereinskonto abzuwickeln; die Vermischung mit Privatkonten ist zu vermeiden.", categories: ["Buchführung & Jahresabschluss"] },
  { id: 50, number: 50, title: "Doppelte Buchführung evaluieren", description: "Die Notwendigkeit einer Einführung der doppelten Buchführung oder einer Kostenrechnung ist regelmäßig zu evaluieren.", categories: ["Buchführung & Jahresabschluss"] },
  { id: 51, number: 51, title: "Buchführungspflichten erfüllen", description: "Buchführungspflichten gemäß Vereinsgesetz und ggf. Unternehmensgesetzbuch sind einzuhalten; bei Bedarf ist kaufmännische Unterstützung hinzuzuziehen.", categories: ["Buchführung & Jahresabschluss"] },
  { id: 52, number: 52, title: "Kassabuch zeitnah führen", description: "Das Kassabuch ist zeitnah und lückenlos zu führen; der Saldo muss jederzeit mit dem tatsächlichen Kassenbestand übereinstimmen.", categories: ["Kassaführung"] },
  { id: 53, number: 53, title: "Regelmäßige Kassenprüfungen durchführen", description: "Regelmäßige und unvermutete Kassenprüfungen sind durchzuführen und deren Ergebnisse zu dokumentieren.", categories: ["Kassaführung"] },
  { id: 54, number: 54, title: "Privatein- und -entnahmen unterlassen", description: "Privateinlagen und -entnahmen aus der Vereinskasse sind strikt zu unterlassen.", categories: ["Kassaführung"] },
  { id: 55, number: 55, title: "Schriftliche Kassenordnung erarbeiten", description: "Eine schriftliche Kassenordnung ist zu erarbeiten, die Regelungen zu Zuständigkeiten, Kassenhöchstbeständen, Kassenprüfungen und dem Umgang mit Fehlbeständen enthält.", categories: ["Kassaführung"] },
  { id: 56, number: 56, title: "Versicherungsschutz für Kassenbestände evaluieren", description: "Der Versicherungsschutz für Kassenbestände und Geldtransporte ist regelmäßig zu evaluieren und dem tatsächlichen Bestand anzupassen.", categories: ["Kassaführung"] },
  { id: 57, number: 57, title: "Honorarnoten müssen alle Angaben enthalten", description: "Honorarnoten sind nur anzuerkennen, wenn sie folgende Angaben enthalten: Datum, Name und Adresse der ausstellenden Person, Rechnungsempfänger, Leistungszeitraum, Art und Umfang der Leistung sowie Zahlungsvermerk.", categories: ["Honorarnoten & Belege"] },
  { id: 58, number: 58, title: "Bewirtungsbelege mit Zweck dokumentieren", description: "Bei Bewirtungsbelegen sind Zweck und teilnehmende Personen zwingend anzugeben.", categories: ["Honorarnoten & Belege"] },
  { id: 59, number: 59, title: "Reisespesen belegen", description: "Reisespesen und Taxifahrten sind mit Datum, Wegstrecke, Zweck und Begründung zu belegen.", categories: ["Honorarnoten & Belege"] },
  { id: 60, number: 60, title: "Tankbelege mit Fahrtenbuch bezahlen", description: "Tankbelege sind nur auf Basis zeitnaher Fahrtenbücher zu bezahlen; für Spesen und Aufwandersatz sind klare interne Regelungen zu schaffen.", categories: ["Honorarnoten & Belege"] },
  { id: 61, number: 61, title: "Rechnungen an den Verein adressieren", description: "Einlangende Rechnungen sind ausschließlich an den Verein zu adressieren.", categories: ["Honorarnoten & Belege"] },
  { id: 62, number: 62, title: "Vergleichsangebote ab Betragsgrenze einholen", description: "Ab einem festzulegenden Betragsgrenzwert sind mindestens zwei Vergleichsangebote einzuholen und zu dokumentieren.", categories: ["Beschaffung & Vergabe"] },
  { id: 63, number: 63, title: "Stückelung von Aufträgen verbieten", description: "Eine Stückelung von Aufträgen zur Umgehung der Angebotseinholungspflicht ist unzulässig und in den internen Richtlinien ausdrücklich zu verbieten.", categories: ["Beschaffung & Vergabe"] },
  { id: 64, number: 64, title: "Bedarf an Beratungsleistungen darstellen", description: "Der Bedarf an externen Beratungsleistungen ist schlüssig darzulegen; Leistungsbeschreibungen müssen hinreichend genau sein, damit Vergleichsangebote eingeholt werden können.", categories: ["Beschaffung & Vergabe"] },
  { id: 65, number: 65, title: "Verträge mit nahen Geschäftspartnern schriftlich", description: "Verträge mit Geschäftspartnern, die der Geschäftsführung nahestehen, sind ausschließlich schriftlich abzuschließen und einer vertiefenden Dokumentation zu unterziehen.", categories: ["Beschaffung & Vergabe"] },
  { id: 66, number: 66, title: "Skonti konsequent nutzen", description: "Angebotene Skonti sind konsequent zu nutzen; Eingangsrechnungen sind so zu organisieren, dass Skontofristen eingehalten werden können.", categories: ["Beschaffung & Vergabe"] },
  { id: 67, number: 67, title: "Konsolidierte Einnahmen-Ausgaben-Rechnung einfordern", description: "Bei Förderungsansuchen ist eine den Buchführungsvorschriften entsprechende konsolidierte Einnahmen-Ausgaben-Rechnung samt Vermögensaufstellung für den gesamten Verein einzufordern.", categories: ["Förderungsabwicklung"] },
  { id: 68, number: 68, title: "Widmungsgemäße Mittelverwendung nachweisen", description: "Die widmungsgemäße Verwendung von Fördermitteln ist anhand der Buchführung nachzuweisen; alle relevanten Belege sind den Abrechnungsunterlagen beizulegen.", categories: ["Förderungsabwicklung"] },
  { id: 69, number: 69, title: "Kooperationsvereinbarungen schriftlich abschließen", description: "Vertragliche Vereinbarungen mit Kooperationspartnern sind schriftlich abzuschließen und haben den Gesamtfinanzierungsbedarf sowie eine klare Aufgabentrennung auszuweisen.", categories: ["Förderungsabwicklung"] },
  { id: 70, number: 70, title: "Bekanntgabe weiterer Drittförderungen verlangen", description: "In den Kooperationsvereinbarungen ist bei Antragstellung die Bekanntgabe weiterer Drittförderungen für dasselbe Projekt zu verlangen.", categories: ["Förderungsabwicklung"] },
  { id: 71, number: 71, title: "Prüfungsergebnisse bei Entscheidungen berücksichtigen", description: "Die Erkenntnisse aus abgeschlossenen Prüfungen sind bei künftigen Förderungsentscheidungen zu berücksichtigen; die Umsetzung ergangener Empfehlungen ist zu verfolgen.", categories: ["Förderungsabwicklung"] },
  { id: 72, number: 72, title: "Rückforderungsaufforderungen dokumentieren", description: "Falls ein Verein einer Rückforderungsaufforderung nicht nachkommt, sind entsprechende Schritte zu setzen und zu dokumentieren.", categories: ["Förderungsabwicklung"] },
  { id: 73, number: 73, title: "Vertragsvereinbarungen im Förderungsakt abbilden", description: "Sämtliche vertraglichen Vereinbarungen im Förderungsakt sind vollständig abzubilden.", categories: ["Förderungsabwicklung"] },
  { id: 74, number: 74, title: "Direktauszahlung an Gesellschaften prüfen", description: "Es ist zu prüfen, ob die direkte Auszahlung von Fördermitteln an eine nicht gemeinnützige Gesellschaft anstelle eines antragstellenden gemeinnützigen Vereins mit den Förderrichtlinien vereinbar ist.", categories: ["Förderungsabwicklung"] },
  { id: 75, number: 75, title: "Beitragsgebühren regelmäßig evaluieren", description: "Die statutarisch festgelegte Einhebung von Beitragsgebühren und Mitgliedsbeiträgen ist regelmäßig zu evaluieren; Änderungen sind durch Generalversammlungsbeschluss zu legitimieren.", categories: ["Mitgliedschaft & Beiträge"] },
  { id: 76, number: 76, title: "Mitgliedsbeiträge konsequent einheben", description: "Die von der Generalversammlung beschlossenen Mitgliedsbeiträge sind konsequent einzuheben; Ausnahmen sind zu begründen und zu dokumentieren.", categories: ["Mitgliedschaft & Beiträge"] },
  { id: 77, number: 77, title: "Mitgliederverwaltung aktuell halten", description: "Die Mitgliederverwaltung ist aktuell zu halten; Eintritte, Austritte und Änderungen sind zeitnah zu erfassen.", categories: ["Mitgliedschaft & Beiträge"] },
  { id: 78, number: 78, title: "Mitgliedschaftsarten eindeutig festlegen", description: "Die Arten der Vereinsmitgliedschaft sind in den Statuten eindeutig festzulegen, um klare Beschlussfähigkeitsregeln zu gewährleisten.", categories: ["Mitgliedschaft & Beiträge"] },
  { id: 79, number: 79, title: "Personalentscheidungen beschließen und dokumentieren", description: "Personalentscheidungen – insbesondere zu Entgelten, Überstunden und Sonderzahlungen – sind vom zuständigen Vereinsorgan zu beschließen und nachvollziehbar zu dokumentieren.", categories: ["Personalangelegenheiten"] },
  { id: 80, number: 80, title: "Arbeitszeitaufzeichnungen kontrollieren", description: "Arbeitszeitaufzeichnungen sind inhaltlich und rechnerisch zu kontrollieren; ihre Genehmigung ist zu dokumentieren.", categories: ["Personalangelegenheiten"] },
  { id: 81, number: 81, title: "Anstellungsverhältnisse evaluieren", description: "Die Anstellungsverhältnisse im Verein sind regelmäßig auf ihre rechtliche Korrektheit hin zu evaluieren.", categories: ["Personalangelegenheiten"] },
  { id: 82, number: 82, title: "Schriftliche Mitarbeitervereinbarungen treffen", description: "Schriftliche Regelungen zu Mitarbeitervereinbarungen (Entgelt, Mehrdienstleistungen, Fortbildung, Vorrückungen) sind zu treffen und aktuell zu halten.", categories: ["Personalangelegenheiten"] },
  { id: 83, number: 83, title: "Rücklagen und Rückstellungen sachlich begründen", description: "Rücklagen und Rückstellungen sind nur mit sachlicher Begründung zu bilden; deren Höhe und Notwendigkeit sind gegenüber Fördergebenden zu dokumentieren.", categories: ["Vermögen & Veranlagung"] },
  { id: 84, number: 84, title: "Veranlagungsform regelmäßig evaluieren", description: "Die gewählte Veranlagungsform von Vereinsvermögen ist regelmäßig zu evaluieren; es sind ausschließlich Sparformen ohne Bonitätsrisiken zu wählen.", categories: ["Vermögen & Veranlagung"] },
  { id: 85, number: 85, title: "Darlehensgewährungen begrenzen", description: "Darlehensgewährungen aus Vereinsmitteln, die nicht dem Vereinszweck entsprechen, sind zu unterlassen; noch aushaftende Darlehen sind einzufordern.", categories: ["Vermögen & Veranlagung"] },
  { id: 86, number: 86, title: "Vereinsvermögen satzungsgemäß verwenden", description: "Vereinsvermögen ist ausschließlich für die in der Satzung definierten Aufgaben und gemäß den vereinbarten Subventionsbedingungen zu verwenden.", categories: ["Vermögen & Veranlagung"] },
  { id: 87, number: 87, title: "Leistungsbeziehungen mit verbundenen Organisationen regeln", description: "Bei der Zusammenarbeit mit verbundenen Organisationen (z. B. Tochtergesellschaften) sind Leistungsbeziehungen vertraglich zu regeln und die Verrechnung transparent zu gestalten.", categories: ["Kooperationen"] },
  { id: 88, number: 88, title: "Einnahmen und Ausgaben trennen", description: "Eine klare Trennung der Einnahmen und Ausgaben zwischen dem Verein und verbundenen Gesellschaften ist sicherzustellen.", categories: ["Kooperationen"] },
  { id: 89, number: 89, title: "Aufgaben in Musterkooperationsvereinbarungen dokumentieren", description: "In Musterkooperationsvereinbarungen ist zu dokumentieren, welche Aufgaben der Verein im Rahmen der operativen Abwicklung übernimmt.", categories: ["Kooperationen"] },
  { id: 90, number: 90, title: "Synergien bei Prüfung nutzen", description: "Synergien bei der Prüfung von Abrechnungsunterlagen verbundener Förderungen sind zu nutzen.", categories: ["Kooperationen"] },
  { id: 91, number: 91, title: "Vieraugenprinzip bei Verträgen sicherstellen", description: "Beim Abschluss von Verträgen, die höhere Verpflichtungen begründen, ist das Vieraugenprinzip sicherzustellen.", categories: ["Vertragsmanagement"] },
  { id: 92, number: 92, title: "Ergänzungsvereinbarungen der Generalversammlung vorlegen", description: "Ergänzungsvereinbarungen zu bereits genehmigten Dauerschuldverhältnissen sind der Generalversammlung zur Beschlussfassung vorzulegen.", categories: ["Vertragsmanagement"] },
  { id: 93, number: 93, title: "Vertragsformen überprüfen", description: "Die Zuordnung von Vertragsbeziehungen zu einer bestimmten Vertragsform ist zu überprüfen, um nachteilige rechtliche und finanzielle Folgen für den Verein auszuschließen.", categories: ["Vertragsmanagement"] },
  { id: 94, number: 94, title: "Nutzungsvereinbarungen schriftlich abschließen", description: "Nutzungsvereinbarungen für Vereinsräumlichkeiten und Infrastruktur sind schriftlich zu schließen und zu dokumentieren.", categories: ["Vertragsmanagement"] },
  { id: 95, number: 95, title: "Jährliche Inventuren durchführen", description: "Jährliche Inventuren sind durchzuführen und das Anlageverzeichnis (AfA-Verzeichnis) ist stets aktuell zu halten.", categories: ["Inventar & Anlagevermögen"] },
  { id: 96, number: 96, title: "Wertvolle Vereinsgüter inventarisieren", description: "Wertvolle Vereinsgüter sind zu inventarisieren und ihr Versicherungsschutz ist regelmäßig zu evaluieren.", categories: ["Inventar & Anlagevermögen"] },
  { id: 97, number: 97, title: "Betriebsmittelbeschaffung begrenzen", description: "Die Beschaffung von Betriebsmitteln ist auf das unbedingt erforderliche Ausmaß zu beschränken.", categories: ["Inventar & Anlagevermögen"] },
  { id: 98, number: 98, title: "Tätigkeitsbericht transparent darstellen", description: "Der Verein sollte seine Tätigkeiten in einem jährlichen Tätigkeitsbericht transparent und nachvollziehbar darstellen.", categories: ["Transparenz & Öffentlichkeit"] },
  { id: 99, number: 99, title: "Internetauftritt etablieren", description: "Ein eigener Internetauftritt des Vereins ist anzustreben, um den Vereinszweck und die Aktivitäten der Öffentlichkeit zugänglich zu machen.", categories: ["Transparenz & Öffentlichkeit"] },
  { id: 100, number: 100, title: "PR-Ausgaben evaluieren", description: "Ausgaben für PR und Öffentlichkeitsarbeit sind in Relation zum Förderungszweck und dem Prinzip der sparsamen Mittelverwendung zu evaluieren.", categories: ["Transparenz & Öffentlichkeit"] }
];

class VereinstippsFilter {
  constructor() {
    this.selectedCategories = new Set();
    this.searchTerm = '';
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.render();
  }

  setupEventListeners() {
    // Category filter buttons
    const filterButtons = document.querySelectorAll('[data-category-filter]');
    filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const category = button.dataset.categoryFilter;
        this.toggleCategory(category);
      });
    });

    // Search input
    const searchInput = document.getElementById('search-tipps');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchTerm = e.target.value.toLowerCase();
        this.render();
      });
    }

    // Reset button
    const resetButton = document.getElementById('reset-filters');
    if (resetButton) {
      resetButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.selectedCategories.clear();
        this.searchTerm = '';
        if (searchInput) searchInput.value = '';
        this.updateFilterButtons();
        this.render();
      });
    }
  }

  toggleCategory(category) {
    if (this.selectedCategories.has(category)) {
      this.selectedCategories.delete(category);
    } else {
      this.selectedCategories.add(category);
    }
    this.updateFilterButtons();
    this.render();
  }

  updateFilterButtons() {
    document.querySelectorAll('[data-category-filter]').forEach(button => {
      const category = button.dataset.categoryFilter;
      if (this.selectedCategories.has(category)) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }

  getFilteredTips() {
    return VEREINSTIPPS.filter(tip => {
      // If no categories selected, show all
      const categoryMatch = this.selectedCategories.size === 0 ||
        tip.categories.some(cat => this.selectedCategories.has(cat));

      // Search in title and description
      const searchMatch = this.searchTerm === '' ||
        tip.title.toLowerCase().includes(this.searchTerm) ||
        tip.description.toLowerCase().includes(this.searchTerm) ||
        tip.number.toString().includes(this.searchTerm);

      return categoryMatch && searchMatch;
    });
  }

  render() {
    const container = document.getElementById('tipps-container');
    if (!container) return;

    const filteredTips = this.getFilteredTips();
    const resultsCount = document.getElementById('results-count');

    if (resultsCount) {
      resultsCount.textContent = `${filteredTips.length} ${filteredTips.length === 1 ? 'Tipp' : 'Tipps'} gefunden`;
    }

    container.innerHTML = filteredTips.map(tip => `
      <div class="tipp-card">
        <div class="tipp-number">Tipp ${tip.number}</div>
        <h3 class="tipp-title">${this.escapeHtml(tip.title)}</h3>
        <p class="tipp-description">${this.escapeHtml(tip.description)}</p>
        <div class="tipp-categories">
          ${tip.categories.map(cat => `<span class="category-badge">${this.escapeHtml(cat)}</span>`).join('')}
        </div>
      </div>
    `).join('');

    if (filteredTips.length === 0) {
      container.innerHTML = '<div class="no-results">Keine Tipps gefunden. Versuchen Sie eine andere Suche oder Filter.</div>';
    }
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new VereinstippsFilter();
  });
} else {
  new VereinstippsFilter();
}
