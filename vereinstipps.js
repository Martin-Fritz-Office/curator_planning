const VEREINSTIPPS = [
  {
    id: 1,
    number: 1,
    title: "Statuten regelmäßig aktualisieren",
    description: "Die Vereinsstatuten sollten regelmäßig auf Aktualität geprüft und bei Abweichungen zwischen den tatsächlichen Gegebenheiten und den Statutenbestimmungen entsprechend angepasst werden.",
    categories: ["Governance & Statuten"]
  },
  {
    id: 2,
    number: 2,
    title: "Materialien im Statut dokumentieren",
    description: "In den Statuten sind alle materiellen Mittel, die zur Erreichung des Vereinszweckes dienen, anzuführen.",
    categories: ["Governance & Statuten"]
  },
  {
    id: 3,
    number: 3,
    title: "Funktionsperioden im Statut festlegen",
    description: "Die gesetzlichen Vorgaben hinsichtlich der Dauer der Funktionsperioden von Vereinsorganen sind im Statut verbindlich festzulegen.",
    categories: ["Governance & Statuten"]
  },
  {
    id: 4,
    number: 4,
    title: "Mitglieder im Leitungsorgan sicherstellen",
    description: "Es ist sicherzustellen, dass die Mitglieder des Leitungsorgans Vereinsmitglieder sind; andernfalls ist eine entsprechende Satzungsbestimmung vorzusehen.",
    categories: ["Governance & Statuten"]
  },
  {
    id: 5,
    number: 5,
    title: "Mitgliedschaftsarten definieren",
    description: "Die Arten der Vereinsmitglieder sind im Einklang mit den Statuten festzulegen, um eine klare und eindeutige Mitgliedschaftsstruktur zu gewährleisten.",
    categories: ["Governance & Statuten"]
  },
  {
    id: 6,
    number: 6,
    title: "Schriftliche Geschäftsordnung erstellen",
    description: "Eine Geschäftsordnung in Schriftform ist zu erarbeiten, in der die Kompetenzen und Aufgaben der Vereinsorgane (Obfrau/Obmann, Geschäftsführung) genau geregelt werden. Eindeutige und einfache Vertretungsregelungen sind dabei festzulegen.",
    categories: ["Geschäftsordnung"]
  },
  {
    id: 7,
    number: 7,
    title: "Geschäftsordnung für Vorstand beschließen",
    description: "Eine umfassende und vollständige Geschäftsordnung für den geschäftsführenden Vorstand ist zu erlassen und von der Generalversammlung zu beschließen.",
    categories: ["Geschäftsordnung"]
  },
  {
    id: 8,
    number: 8,
    title: "Geschäftsordnung einhalten",
    description: "Die Bestimmungen der Geschäftsordnung für die Geschäftsführung sind einzuhalten, insbesondere hinsichtlich zustimmungspflichtiger Geschäfte.",
    categories: ["Geschäftsordnung"]
  },
  {
    id: 9,
    number: 9,
    title: "Grundlagen vereinheitlichen",
    description: "Die organisatorischen Grundlagen – Vereinsstatuten, Geschäftsordnung und das Interne Kontrollsystem – sind zu vereinheitlichen und etwaige Widersprüchlichkeiten zu beseitigen.",
    categories: ["Geschäftsordnung"]
  },
  {
    id: 10,
    number: 10,
    title: "Vertretungsbefugnisse dokumentieren",
    description: "Die in den Statuten vorgesehenen Vertretungsbefugnisse sind einzuhalten bzw. abweichende Regelungen sind durch den Vorstand zu beschließen und in der Geschäftsordnung festzuschreiben.",
    categories: ["Geschäftsordnung"]
  },
  {
    id: 11,
    number: 11,
    title: "Beschlussprotokolle führen",
    description: "Zu allen Sitzungen des Vorstandes sowie der Generalversammlung sind zumindest Beschlussprotokolle zu verfassen. Fehlende Beschlussfassungen sind nachzuholen.",
    categories: ["Dokumentation & Protokolle"]
  },
  {
    id: 12,
    number: 12,
    title: "Interne Entscheidungen dokumentieren",
    description: "Auf die durchgängige Dokumentation der internen Entscheidungen ist zu achten. Sämtliche Beschlüsse über die den Vereinsorganen obliegenden Angelegenheiten sind schriftlich festzuhalten.",
    categories: ["Dokumentation & Protokolle"]
  },
  {
    id: 13,
    number: 13,
    title: "Generalversammlungen vollständig dokumentieren",
    description: "Generalversammlungssitzungen sind vollständig zu dokumentieren. Auf eine durchgängige und nachvollziehbare Dokumentation aller Vereinsentscheidungen ist zu achten.",
    categories: ["Dokumentation & Protokolle"]
  },
  {
    id: 14,
    number: 14,
    title: "Anwesenheiten protokollieren",
    description: "Auf die Dokumentation der Anwesenheiten von Vereinsorganen bei Vorstandssitzungen ist zu achten.",
    categories: ["Dokumentation & Protokolle"]
  },
  {
    id: 15,
    number: 15,
    title: "Sonderfälle dokumentieren",
    description: "Sofern eine Vorstandssitzung zugleich auch die Mitgliederversammlung beinhaltet, ist dies in den Protokollen entsprechend zu dokumentieren.",
    categories: ["Dokumentation & Protokolle"]
  },
  {
    id: 16,
    number: 16,
    title: "Sitzungen gemäß Statuten abhalten",
    description: "Verbandsvorstandssitzungen und Generalversammlungen sind gemäß den Statuten abzuhalten und die getroffenen Entscheidungen und Beschlussfassungen schriftlich in Protokollen festzuhalten.",
    categories: ["Generalversammlung"]
  },
  {
    id: 17,
    number: 17,
    title: "Einladungsverfahren evaluieren",
    description: "Die Vorgehensweise bei der Einladung der Vereinsmitglieder zur Generalversammlung sollte evaluiert und die in den Vereinsstatuten festgelegten Regelungen eingehalten werden.",
    categories: ["Generalversammlung"]
  },
  {
    id: 18,
    number: 18,
    title: "Jahresabschlüsse genehmigen",
    description: "Die Generalversammlung hat den Statuten entsprechend die Genehmigung der vorangegangenen Jahresabschlüsse vorzunehmen; dies ist in den Protokollen ausdrücklich festzuhalten.",
    categories: ["Generalversammlung"]
  },
  {
    id: 19,
    number: 19,
    title: "Vorstand in Generalversammlung entlasten",
    description: "Der Vorstand ist in den Generalversammlungen zu entlasten und dies in den jeweiligen Protokollen zu dokumentieren.",
    categories: ["Generalversammlung"]
  },
  {
    id: 20,
    number: 20,
    title: "Vorgenehmigungen vermeiden",
    description: "Künftig ist die nachträgliche Genehmigung von Entscheidungen in Angelegenheiten, die gemäß den Statuten in den Wirkungsbereich der Generalversammlung fallen, zu vermeiden. Solche Beschlüsse sind vorab einzuholen.",
    categories: ["Generalversammlung"]
  },
  {
    id: 21,
    number: 21,
    title: "Ergänzungsvereinbarungen genehmigen",
    description: "Ergänzungsvereinbarungen zu bereits genehmigten Dauerschuldverhältnissen sind der Generalversammlung zur Beschlussfassung vorzulegen.",
    categories: ["Generalversammlung"]
  },
  {
    id: 22,
    number: 22,
    title: "Rechnungsprüfer in Generalversammlungen einbinden",
    description: "In künftigen Generalversammlungen ist die persönliche Anwesenheit zumindest einer Rechnungsprüferin/eines Rechnungsprüfers sicherzustellen, wenn die Mitglieder über die geprüfte Einnahmen-Ausgaben-Rechnung informiert werden.",
    categories: ["Generalversammlung"]
  },
  {
    id: 23,
    number: 23,
    title: "Zwei Rechnungsprüfer bestellen",
    description: "Wie im Vereinsgesetz normiert, sind zwei unabhängige und unbefangene Rechnungsprüfer/innen zu bestellen. Fehlende Bestellungen sind unverzüglich nachzuholen.",
    categories: ["Rechnungsprüfung"]
  },
  {
    id: 24,
    number: 24,
    title: "Kontrollpflichten der Rechnungsprüfer sicherstellen",
    description: "Sowohl die Einhaltung der Kontroll- und Dokumentationspflichten der Rechnungsprüfer/innen als auch deren Berichtspflicht gegenüber dem Vorstand und der Generalversammlung sind sicherzustellen.",
    categories: ["Rechnungsprüfung"]
  },
  {
    id: 25,
    number: 25,
    title: "Auswahlmodalitäten dokumentieren",
    description: "Die vereinsrechtlichen Vorgaben zu den Auswahlmodalitäten der Rechnungsprüfer/innen sind einzuhalten und deren Beachtung nachweislich zu dokumentieren.",
    categories: ["Rechnungsprüfung"]
  },
  {
    id: 26,
    number: 26,
    title: "Rechnungsprüfer berichten zeitnah",
    description: "Die Rechnungsprüfer/innen haben zeitnah in der jeweils nächsten Generalversammlung ihrer Berichtspflicht an die Vereinsmitglieder nachzukommen.",
    categories: ["Rechnungsprüfung"]
  },
  {
    id: 27,
    number: 27,
    title: "Gesetzliche Vorgaben für Prüfung einhalten",
    description: "Bei der Prüfungsdokumentation und Berichterstattung durch die Rechnungsprüfer/innen sind die gesetzlichen Bestimmungen einzuhalten, um die im Gesetz vorgesehenen Haftungsfolgen hintanzuhalten.",
    categories: ["Rechnungsprüfung"]
  },
  {
    id: 28,
    number: 28,
    title: "Vieraugenprinzip einhalten",
    description: "Die Einhaltung des in den Vereinsstatuten vorgesehenen Vieraugenprinzips beim Abschluss von Verträgen und bei der Bestätigung von Abrechnungsunterlagen ist sicherzustellen.",
    categories: ["Vieraugenprinzip & Zeichnung"]
  },
  {
    id: 29,
    number: 29,
    title: "Gegenzeichnung ab Betragsgrenze einführen",
    description: "Ab einer zweckmäßig erscheinenden Betragsgrenze ist die Gegenzeichnung durch ein zweites Vorstandsmitglied (Obfrau/Obmann bzw. Stellvertretung) einzuführen, um das Vieraugenprinzip zu wahren.",
    categories: ["Vieraugenprinzip & Zeichnung"]
  },
  {
    id: 30,
    number: 30,
    title: "Vieraugenprinzip bei wichtigen Vereinbarungen evaluieren",
    description: "Im Rahmen des IKS ist zu evaluieren, ob ein Vieraugenprinzip bei finanziell bedeutsamen Vereinbarungen (z.B. Urlaubsersatzleistungen, größere Verträge) angebracht wäre.",
    categories: ["Vieraugenprinzip & Zeichnung"]
  },
  {
    id: 31,
    number: 31,
    title: "Zeichnungsberechtigungen regelmäßig überprüfen",
    description: "Die Zeichnungsberechtigungen auf den Vereinsbankkonten sollten regelmäßig evaluiert und deren Aktualität sichergestellt werden.",
    categories: ["Vieraugenprinzip & Zeichnung"]
  },
  {
    id: 32,
    number: 32,
    title: "Zeichnung von Abrechnungsunterlagen sicherstellen",
    description: "Auf eine den Vereinsstatuten entsprechende Zeichnung von Abrechnungsunterlagen ist zu achten.",
    categories: ["Vieraugenprinzip & Zeichnung"]
  },
  {
    id: 33,
    number: 33,
    title: "Zugangsdaten sicher aufbewahren",
    description: "Die Aufbewahrung von Zugangsdaten (z.B. TAN-Codes) sollte so geregelt sein, dass das Vieraugenprinzip bei Überweisungen gewährleistet ist und kein unkontrollierter Einzelzugriff möglich ist.",
    categories: ["Vieraugenprinzip & Zeichnung"]
  },
  {
    id: 34,
    number: 34,
    title: "Vertretungsregelung strikt einhalten",
    description: "Die statutenmäßige Vertretungsregelung ist strikt einzuhalten. Verträge auf Vereinsseite dürfen nur durch die gemäß Statuten zeichnungsberechtigten Personen unterfertigt werden.",
    categories: ["Vertretungsregelungen"]
  },
  {
    id: 35,
    number: 35,
    title: "Vertretungsregelungen dokumentieren",
    description: "Die Vertretungsregelungen sind gemäß den Vereinsstatuten einzuhalten. Fehlende weitere Vertretungsregelungen sind entsprechend zu dokumentieren und zu beschließen.",
    categories: ["Vertretungsregelungen"]
  },
  {
    id: 36,
    number: 36,
    title: "Stellvertretung der Geschäftsführung normieren",
    description: "Eine Vertretungsbefugnis der Geschäftsführung ist, sofern nicht bereits vorhanden, in den Statuten entsprechend zu normieren.",
    categories: ["Vertretungsregelungen"]
  },
  {
    id: 37,
    number: 37,
    title: "Stellvertretung Schriftführer evaluieren",
    description: "Die Notwendigkeit einer Stellvertretung für die Funktion der Schriftführerin/des Schriftführers sollte evaluiert und gegebenenfalls die Vereinsstatuten dahingehend angepasst werden.",
    categories: ["Vertretungsregelungen"]
  },
  {
    id: 38,
    number: 38,
    title: "Entgelte dokumentieren und vergleichen",
    description: "Beschlussfassungen über Entgelte an Vereinsorgane sind zu dokumentieren. In diesen Fällen ist ein Drittvergleich einzuholen, um einem höheren Sorgfaltsmaßstab gerecht zu werden.",
    categories: ["Entgelte & Interessenkonflikte"]
  },
  {
    id: 39,
    number: 39,
    title: "Personalentscheidungen dokumentieren",
    description: "Beschlüsse, die Personalfragen betreffen, sind über den Vorstand des Vereins abzuwickeln und die diesbezügliche Beschlussfassung nachweislich zu dokumentieren.",
    categories: ["Entgelte & Interessenkonflikte"]
  },
  {
    id: 40,
    number: 40,
    title: "Supervisionsleistungen begrenzen",
    description: "Umfangreiche und kostenintensive Einzelsupervisionsleistungen sollten nur in Ausnahmefällen zur Gänze aus dem Vereinsbudget bedeckt werden; dies ist entsprechend nachweislich zu begründen.",
    categories: ["Entgelte & Interessenkonflikte"]
  },
  {
    id: 41,
    number: 41,
    title: "Jährliche Inventuren durchführen",
    description: "Zur Sicherung des Vereinsvermögens sind durchgängig jährliche Inventuren durchzuführen, deren Ergebnisse schriftlich zu dokumentieren sind.",
    categories: ["Vereinsvermögen & Inventar"]
  },
  {
    id: 42,
    number: 42,
    title: "Inventar über 400 EUR erstellen",
    description: "Ein Inventar der Anlagengegenstände mit einem Anschaffungswert von über 400 EUR ist zu erstellen.",
    categories: ["Vereinsvermögen & Inventar"]
  },
  {
    id: 43,
    number: 43,
    title: "Rücklagenenwicklung mit Förderern besprechen",
    description: "Bei jährlichen Qualitätsgesprächen mit Förderstellen ist verstärkt auf die Entwicklung der Rücklagen, des Vereinsvermögens und der Betreuungsstunden einzugehen.",
    categories: ["Vereinsvermögen & Inventar"]
  },
  {
    id: 44,
    number: 44,
    title: "Auflösungsbestimmung überprüfen",
    description: "Ein in den Statuten als Empfänger des Vereinsvermögens im Auflösungsfall angeführter Verein ist auf seine aktuelle rechtliche Existenz zu überprüfen; andernfalls sind die Statuten anzupassen.",
    categories: ["Vereinsvermögen & Inventar"]
  },
  {
    id: 45,
    number: 45,
    title: "Realistische Budgetplanung",
    description: "Im Rahmen eines Förderungsansuchens sind die Einnahmen und Ausgaben auf Basis der in Vorjahren gewonnenen Erfahrungswerte realistisch zu kalkulieren.",
    categories: ["Finanzgebarung & Förderungen"]
  },
  {
    id: 46,
    number: 46,
    title: "Vereinsvermögen in Förderungsbewertung berücksichtigen",
    description: "Die Höhe des Vereinsvermögens ist bei der Beurteilung der Förderungshöhe verstärkt zu berücksichtigen. Im Zuge der Abrechnungsprüfungen ist die Entwicklung des Vereinsvermögens im Förderungszeitraum zu prüfen.",
    categories: ["Finanzgebarung & Förderungen"]
  },
  {
    id: 47,
    number: 47,
    title: "Rückforderungen prüfen",
    description: "Die Möglichkeit der Rückforderung von Nachtragsförderungen ist bei Unregelmäßigkeiten rechtlich zu prüfen und gegebenenfalls sind entsprechende Schritte einzuleiten.",
    categories: ["Finanzgebarung & Förderungen"]
  },
  {
    id: 48,
    number: 48,
    title: "Gliederungsgrundsätze beibehalten",
    description: "Einmal angewendete Gliederungsgrundsätze und Kontenbezeichnungen in der Einnahmen-Ausgaben-Rechnung sind im Sinne der Kontinuität beizubehalten. Abweichungen sind die Ausnahme und entsprechend zu dokumentieren.",
    categories: ["Finanzgebarung & Förderungen"]
  },
  {
    id: 49,
    number: 49,
    title: "Kassengebarung regeln",
    description: "Regelungen zur Kassengebarung sind zu erarbeiten, die u.a. Richtlinien über Kassenbestände, Kassensicherheit und zugriffsberechtigte Personen inkl. Stellvertretungsregelungen beinhalten. Das Kassenbuch ist möglichst zeitnah zu erfassen.",
    categories: ["Finanzgebarung & Förderungen"]
  },
  {
    id: 50,
    number: 50,
    title: "Mitarbeiter-Vereinbarungen schriftlich festhalten",
    description: "Mitarbeiter/innen betreffende Vereinbarungen (Abgeltung von Mehrdienstleistungen, Fortbildungsfreistellungen, Vorrückungszeiträume etc.) sind schriftlich festzuhalten. Änderungen von Dienstverträgen sind stets in Schriftform vorzunehmen.",
    categories: ["Finanzgebarung & Förderungen"]
  }
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
