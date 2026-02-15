(() => {
  // -------------------- utils --------------------
  const EUR = (n) =>
    new Intl.NumberFormat("de-AT", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(Math.round(Number(n) || 0));

  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));

  function stripWhitespace(s) {
    let out = "";
    for (let i = 0; i < s.length; i++) {
      const ch = s[i];
      if (ch !== " " && ch !== "\t" && ch !== "\n" && ch !== "\r") out += ch;
    }
    return out;
  }

  // Accept de-AT style decimals (comma) + tolerate blanks while typing.
  function parseLocaleNumber(v) {
    const raw = String(v ?? "").trim();
    const s = stripWhitespace(raw).split(",").join(".");
    if (s === "" || s === "." || s === "-") return 0;
    const n = Number(s);
    return Number.isFinite(n) ? n : 0;
  }

  const FULLTIME_HOURS = 38.5; // 38,5h/W = 1,0 VZÄ
  const hoursToFte = (hours) => (parseLocaleNumber(hours) || 0) / FULLTIME_HOURS;

  // -------------------- data --------------------
  // IG Kultur Fair Pay Gehaltsschema (ab 1.1.2026) – Monatsbrutto Vollzeit, 14 Gehälter/Jahr
  const IGK_PAY_2026 = {
    1: { A: 2166, B: 2205, C: 2264, D: 2330, E: 2394, F: 2458, G: 2527, H: 2599, I: 2673, J: 2746 },
    2: { A: 2335, B: 2435, C: 2533, D: 2638, E: 2748, F: 2859, G: 2967, H: 3074, I: 3188, J: 3300 },
    3: { A: 2516, B: 2627, C: 2749, D: 2870, E: 2986, F: 3108, G: 3226, H: 3346, I: 3466, J: 3587 },
    4: { A: 2838, B: 2986, C: 3141, D: 3294, E: 3445, F: 3594, G: 3745, H: 3898, I: 4049, J: 4201 },
    5: { A: 3150, B: 3322, C: 3489, D: 3657, E: 3829, F: 4000, G: 4170, H: 4339, I: 4507, J: 4679 },
    6: { A: 3573, B: 3764, C: 3951, D: 4145, E: 4334, F: 4528, G: 4715, H: 4909, I: 5100, J: 5292 },
    7: { A: 4301, B: 4534, C: 4764, D: 4996, E: 5229, F: 5458, G: 5688, H: 5921, I: 6151, J: 6380 },
    8: { A: 5008, B: 5243, C: 5486, D: 5722, E: 5963, F: 6208, G: 6444, H: 6685, I: 6924, J: 7163 },
  };

  const IGK_STEPS = [
    { key: "A", label: "Stufe A" },
    { key: "B", label: "Stufe B" },
    { key: "C", label: "Stufe C" },
    { key: "D", label: "Stufe D" },
    { key: "E", label: "Stufe E" },
    { key: "F", label: "Stufe F" },
    { key: "G", label: "Stufe G" },
    { key: "H", label: "Stufe H" },
    { key: "I", label: "Stufe I" },
    { key: "J", label: "Stufe J" },
  ];

  const FUNCTIONS = [
   { key: "assist", name: "Hilfsdienste / Aufsicht / Reinigung", defaultBG: 1 },
    { key: "assist", name: "Assistenz / Office / Kassa", defaultBG: 2 },
    { key: "admin", name: "Administration / Buchhaltung (operativ)", defaultBG: 4 },
    { key: "comms", name: "Kommunikation / PR / Social", defaultBG: 4 },
    { key: "tech", name: "Technik / Produktion (qualifiziert)", defaultBG: 5 },
    { key: "prog", name: "Programm / Projektmanagement", defaultBG: 5 },
    { key: "lead", name: "Projekt-/Bereichsleitung", defaultBG: 6 },
    { key: "coord", name: "Gesamtkoordination", defaultBG: 7 },
    { key: "director", name: "Geschäftsführung", defaultBG: 8 },
  ];

  const COST_QUESTIONS = [
    { id: "rentArea", title: "Fläche (m²)", hint: "Relevante Nutzfläche (Saal + Nebenflächen). Option D erlaubt einen Eigenwert.", type: "number",
      options: { A: { name: "180 m²", value: 180 }, B: { name: "250 m²", value: 250 }, C: { name: "320 m²", value: 320 }, D: { name: "Eigenwert (m²)", value: 250 } } },
    { id: "rentPerM2", title: "Miete (€/m²/Monat)", hint: "Kategorien: 15/20/25 €/m². Option D erlaubt einen Eigenwert.", type: "rate",
      options: { A: { name: "15 €/m²", value: 15 }, B: { name: "20 €/m²", value: 20 }, C: { name: "25 €/m²", value: 25 }, D: { name: "Eigenwert (€/m²)", value: 22 } } },
    { id: "utilities", title: "Energie & variable BK (jährlich)", hint: "Energie + variable Betriebskosten.", type: "eur",
      options: { A: { name: "9.000 €", value: 9000 }, B: { name: "16.000 €", value: 16000 }, C: { name: "26.000 €", value: 26000 }, D: { name: "38.000 €", value: 38000 } } },
    { id: "events", title: "Veranstaltungen pro Jahr", hint: "Treiber für Künstlerhonorare und variable Kosten.", type: "number",
      options: { A: { name: "30", value: 30 }, B: { name: "50", value: 50 }, C: { name: "75", value: 75 }, D: { name: "110", value: 110 } } },
    { id: "feePerEvent", title: "Künstlerhonorar Ø pro Veranstaltung", hint: "Gage/Ensemble-Anteil (exkl. Reise/Technik).", type: "eur",
      options: { A: { name: "400 €", value: 400 }, B: { name: "800 €", value: 800 }, C: { name: "1.400 €", value: 1400 }, D: { name: "2.200 €", value: 2200 } } },
    { id: "production", title: "Technik & Produktion (jährlich)", hint: "Wartung, Reparaturen, Material, kleine Mieten.", type: "eur",
      options: { A: { name: "5.000 €", value: 5000 }, B: { name: "12.000 €", value: 12000 }, C: { name: "22.000 €", value: 22000 }, D: { name: "35.000 €", value: 35000 } } },
    { id: "marketing", title: "Marketing & Kommunikation (jährlich)", hint: "Digital/Print/Plakat/Agentur.", type: "eur",
      options: { A: { name: "3.000 €", value: 3000 }, B: { name: "7.000 €", value: 7000 }, C: { name: "14.000 €", value: 14000 }, D: { name: "25.000 €", value: 25000 } } },
    { id: "adminAccounting", title: "Buchhaltung & Abschluss (extern)", hint: "Steuerberatung, Abschluss, laufende Buchhaltung.", type: "eur",
      options: { A: { name: "3.000 €", value: 3000 }, B: { name: "6.000 €", value: 6000 }, C: { name: "10.000 €", value: 10000 }, D: { name: "16.000 €", value: 16000 } } },
    { id: "adminInsurance", title: "Versicherungen", hint: "Haftpflicht, Inventar, Veranstaltung.", type: "eur",
      options: { A: { name: "2.000 €", value: 2000 }, B: { name: "4.000 €", value: 4000 }, C: { name: "7.000 €", value: 7000 }, D: { name: "11.000 €", value: 11000 } } },
    { id: "adminIT", title: "IT & Kommunikation (Kosten)", hint: "Software, Hardware, Telefon, Ticketsystem.", type: "eur",
      options: { A: { name: "1.500 €", value: 1500 }, B: { name: "3.500 €", value: 3500 }, C: { name: "7.500 €", value: 7000 }, D: { name: "15.000 €", value: 12000 } } },
    { id: "adminLegal", title: "Recht & Beratung", hint: "Verträge, Arbeitsrecht, Urheberrecht.", type: "eur",
      options: { A: { name: "1.000 €", value: 1000 }, B: { name: "3.000 €", value: 3000 }, C: { name: "6.000 €", value: 6000 }, D: { name: "10.000 €", value: 10000 } } },
    { id: "reserve", title: "Rücklagen (jährlich)", hint: "Operative Sicherheit.", type: "eur",
      options: { A: { name: "0 €", value: 0 }, B: { name: "5.000 €", value: 5000 }, C: { name: "15.000 €", value: 15000 }, D: { name: "35.000 €", value: 35000 } } },
  ];

  const FUTURE_COST_QUESTIONS = [
    { id: "futureAccessibility", title: "Barrierefreiheit & Inklusion", hint: "Leitsysteme, Umbauten, barrierefreie Ausstattung.", type: "eur",
      options: { A: { name: "4.000 €", value: 4000 }, B: { name: "10.000 €", value: 10000 }, C: { name: "22.000 €", value: 22000 }, D: { name: "40.000 €", value: 40000 } } },
    { id: "futureSafety", title: "Sicherheitskonzept & Brandschutz", hint: "Prüfungen, Schulungen, laufende Anpassungen.", type: "eur",
      options: { A: { name: "3.000 €", value: 3000 }, B: { name: "8.000 €", value: 8000 }, C: { name: "16.000 €", value: 16000 }, D: { name: "30.000 €", value: 30000 } } },
    { id: "futureClimate", title: "Klimaschutzmaßnahmen", hint: "Energieeffizienz, Umstellung auf nachhaltige Technik.", type: "eur",
      options: { A: { name: "5.000 €", value: 5000 }, B: { name: "12.000 €", value: 12000 }, C: { name: "28.000 €", value: 28000 }, D: { name: "50.000 €", value: 50000 } } },
    { id: "futureMaintenance", title: "Instandhaltungsfonds Gebäude", hint: "Planbare Rücklagen für bauliche Erneuerungen.", type: "eur",
      options: { A: { name: "6.000 €", value: 6000 }, B: { name: "15.000 €", value: 15000 }, C: { name: "30.000 €", value: 30000 }, D: { name: "55.000 €", value: 55000 } } },
    { id: "futureDigitalInfra", title: "Digitale Infrastruktur", hint: "Netzwerk, WLAN, Server, Storage und Monitoring.", type: "eur",
      options: { A: { name: "2.500 €", value: 2500 }, B: { name: "7.000 €", value: 7000 }, C: { name: "15.000 €", value: 15000 }, D: { name: "28.000 €", value: 28000 } } },
    { id: "futureCyber", title: "Cybersecurity & Datenschutz", hint: "Audits, Lizenzen, Backup- und Sicherheitslösungen.", type: "eur",
      options: { A: { name: "2.000 €", value: 2000 }, B: { name: "5.000 €", value: 5000 }, C: { name: "11.000 €", value: 11000 }, D: { name: "22.000 €", value: 22000 } } },
    { id: "futureData", title: "Datenanalyse & Wirkungsmonitoring", hint: "Besucher*innen-Daten, Evaluation, Dashboards.", type: "eur",
      options: { A: { name: "1.500 €", value: 1500 }, B: { name: "4.000 €", value: 4000 }, C: { name: "9.000 €", value: 9000 }, D: { name: "18.000 €", value: 18000 } } },
    { id: "futureMediation", title: "Vermittlung & Community-Programme", hint: "Outreach, Schulkooperationen, Nachbarschaftsarbeit.", type: "eur",
      options: { A: { name: "4.000 €", value: 4000 }, B: { name: "10.000 €", value: 10000 }, C: { name: "20.000 €", value: 20000 }, D: { name: "36.000 €", value: 36000 } } },
    { id: "futureResidencies", title: "Residencies & Nachwuchsförderung", hint: "Arbeitsstipendien, Proberäume, Mentoring.", type: "eur",
      options: { A: { name: "5.000 €", value: 5000 }, B: { name: "12.000 €", value: 12000 }, C: { name: "25.000 €", value: 25000 }, D: { name: "45.000 €", value: 45000 } } },
    { id: "futureInclusion", title: "Diversity- & Antidiskriminierungsarbeit", hint: "Trainings, Moderation, Maßnahmenpakete.", type: "eur",
      options: { A: { name: "1.500 €", value: 1500 }, B: { name: "4.500 €", value: 4500 }, C: { name: "10.000 €", value: 10000 }, D: { name: "20.000 €", value: 20000 } } },
    { id: "futureVolunteer", title: "Freiwilligenmanagement", hint: "Koordination, Schulung und Betreuung von Volunteers.", type: "eur",
      options: { A: { name: "1.000 €", value: 1000 }, B: { name: "3.000 €", value: 3000 }, C: { name: "8.000 €", value: 8000 }, D: { name: "15.000 €", value: 15000 } } },
    { id: "futureWellbeing", title: "Teamgesundheit & Weiterbildung", hint: "Supervision, Gesundheitsangebote, Schulungen.", type: "eur",
      options: { A: { name: "2.000 €", value: 2000 }, B: { name: "5.500 €", value: 5500 }, C: { name: "12.000 €", value: 12000 }, D: { name: "24.000 €", value: 24000 } } },
    { id: "futureTicketing", title: "Ticketing- & CRM-Entwicklung", hint: "Lizenzen, Schnittstellen, Wartung.", type: "eur",
      options: { A: { name: "1.500 €", value: 1500 }, B: { name: "4.000 €", value: 4000 }, C: { name: "9.000 €", value: 9000 }, D: { name: "18.000 €", value: 18000 } } },
    { id: "futureHybrid", title: "Hybrid-/Streaming-Formate", hint: "Aufzeichnung, Übertragung, Nachbearbeitung.", type: "eur",
      options: { A: { name: "3.000 €", value: 3000 }, B: { name: "8.000 €", value: 8000 }, C: { name: "16.000 €", value: 16000 }, D: { name: "32.000 €", value: 32000 } } },
    { id: "futureMobility", title: "Nachhaltige Mobilität", hint: "Anreiseprogramme, Lastenrad, Transportoptimierung.", type: "eur",
      options: { A: { name: "1.000 €", value: 1000 }, B: { name: "3.500 €", value: 3500 }, C: { name: "8.000 €", value: 8000 }, D: { name: "16.000 €", value: 16000 } } },
    { id: "futurePartnerships", title: "Kooperationen & Netzwerkarbeit", hint: "Mitgliedschaften, Formate mit Partnerinstitutionen.", type: "eur",
      options: { A: { name: "2.500 €", value: 2500 }, B: { name: "6.000 €", value: 6000 }, C: { name: "13.000 €", value: 13000 }, D: { name: "24.000 €", value: 24000 } } },
    { id: "futureFundraising", title: "Fundraising-Kampagnen", hint: "Spendenkampagnen, Materialien, Events.", type: "eur",
      options: { A: { name: "2.000 €", value: 2000 }, B: { name: "5.000 €", value: 5000 }, C: { name: "11.000 €", value: 11000 }, D: { name: "22.000 €", value: 22000 } } },
    { id: "futureLegalCompliance", title: "Compliance & Governance", hint: "Richtlinien, Audits, Rechts- und Vergabefragen.", type: "eur",
      options: { A: { name: "1.500 €", value: 1500 }, B: { name: "4.000 €", value: 4000 }, C: { name: "9.000 €", value: 9000 }, D: { name: "18.000 €", value: 18000 } } },
    { id: "futureAudienceResearch", title: "Publikumsforschung", hint: "Studien, Befragungen, Segmentanalysen.", type: "eur",
      options: { A: { name: "1.000 €", value: 1000 }, B: { name: "3.000 €", value: 3000 }, C: { name: "7.000 €", value: 7000 }, D: { name: "14.000 €", value: 14000 } } },
    { id: "futureInnovation", title: "Innovationsbudget", hint: "Pilotprojekte und experimentelle Formate.", type: "eur",
      options: { A: { name: "3.000 €", value: 3000 }, B: { name: "9.000 €", value: 9000 }, C: { name: "20.000 €", value: 20000 }, D: { name: "40.000 €", value: 40000 } } },
  ];

  const REV_QUESTIONS = [
    { id: "ticketPrice", title: "Ø Ticketpreis", hint: "Durchschnittlicher Ticketpreis.", type: "eurNumber",
      options: { A: { name: "8 €", value: 8 }, B: { name: "12 €", value: 12 }, C: { name: "16 €", value: 16 }, D: { name: "22 €", value: 22 } } },
    { id: "capacity", title: "Ø Kapazität pro Veranstaltung", hint: "Typischer Saal.", type: "number",
      options: { A: { name: "80 Plätze", value: 80 }, B: { name: "120 Plätze", value: 120 }, C: { name: "180 Plätze", value: 180 }, D: { name: "250 Plätze", value: 250 } } },
    { id: "occupancy", title: "Ø Auslastung", hint: "Erwartung, nicht Wunsch.", type: "percent",
      options: { A: { name: "40%", value: 0.4 }, B: { name: "60%", value: 0.6 }, C: { name: "75%", value: 0.75 }, D: { name: "90%", value: 0.9 } } },
    { id: "baseGrant", title: "Öffentliche Basisförderung", hint: "Strukturförderung.", type: "eur",
      options: { A: { name: "40.000 €", value: 40000 }, B: { name: "80.000 €", value: 80000 }, C: { name: "140.000 €", value: 140000 }, D: { name: "220.000 €", value: 220000 } } },
    { id: "projectGrants", title: "Projektförderungen (gesamt)", hint: "Projektmittel.", type: "eur",
      options: { A: { name: "15.000 €", value: 15000 }, B: { name: "35.000 €", value: 35000 }, C: { name: "70.000 €", value: 70000 }, D: { name: "120.000 €", value: 120000 } } },
    { id: "sponsoring", title: "Sponsoring & Spenden", hint: "Private Mittel.", type: "eur",
      options: { A: { name: "5.000 €", value: 5000 }, B: { name: "15.000 €", value: 15000 }, C: { name: "35.000 €", value: 35000 }, D: { name: "60.000 €", value: 60000 } } },
    { id: "bar", title: "Gastro/Bar-Deckungsbeitrag", hint: "Netto-Beitrag nach Kosten.", type: "eur",
      options: { A: { name: "6.000 €", value: 6000 }, B: { name: "14.000 €", value: 14000 }, C: { name: "26.000 €", value: 26000 }, D: { name: "42.000 €", value: 42000 } } },
    { id: "spaceRental", title: "Raumvermietung (netto)", hint: "Seminare/Proben/Events.", type: "eur",
      options: { A: { name: "4.000 €", value: 4000 }, B: { name: "12.000 €", value: 12000 }, C: { name: "24.000 €", value: 24000 }, D: { name: "40.000 €", value: 40000 } } },
  ];

  // -------------------- state --------------------
  const state = {
    selCost: {},
    selRev: {},
    customRentArea: "0",
    customRentPerM2: "0",
    paidShare: "0",
    dgFactor: "1,35",
    staffRows: [],
    spSmall: "0",
    spMid: "0",
    spLarge: "0",
  };

  // -------------------- dom refs --------------------
  const $ = (id) => document.getElementById(id);
  const costWrap = $("costQuestions");
  const futureCostWrap = $("futureCostQuestions");
  const revWrap = $("revQuestions");
  const staffList = $("staffList");
  const staffFunctionPreset = $("staffFunctionPreset");

  function syncStaffFunctionPreset() {
    if (!staffFunctionPreset) return;
    staffFunctionPreset.innerHTML = FUNCTIONS.map((x) => `<option value="${x.key}">${x.name}</option>`).join("");
    if (!FUNCTIONS.some((x) => x.key === staffFunctionPreset.value)) {
      staffFunctionPreset.value = FUNCTIONS[0].key;
    }
  }

  function getSelectedFunctionKey() {
    if (!staffFunctionPreset) return FUNCTIONS[0].key;
    const val = staffFunctionPreset.value;
    return FUNCTIONS.some((x) => x.key === val) ? val : FUNCTIONS[0].key;
  }

  function optSub(q, optVal) {
    if (q.type === "eur") return `Betrag: <strong>${EUR(optVal)}</strong>`;
    if (q.type === "eurNumber") return `Wert: <strong>${EUR(optVal)}</strong>`;
    if (q.type === "percent") return `Wert: <strong>${Math.round(optVal * 100)}%</strong>`;
    if (q.id === "rentPerM2") return `Wert: <strong>${optVal} €/m²/Monat</strong>`;
    return `Wert: <strong>${optVal}</strong>`;
  }

  function renderQuestion(q, bucket) {
    const selectedKey = bucket === "cost" ? state.selCost[q.id] : state.selRev[q.id];

    const el = document.createElement("div");
    el.className = "qcard";

    el.innerHTML = `
      <div class="qhead">${q.title}</div>
      <div class="qbody">
        <div class="qhint">${q.hint}</div>
        <div class="optgrid" data-qid="${q.id}" data-bucket="${bucket}"></div>
        <div class="custom" data-custom="${q.id}"></div>
      </div>
    `;

    const grid = el.querySelector(".optgrid");
    Object.keys(q.options).forEach((k) => {
      const opt = q.options[k];
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "opt" + (selectedKey === k ? " sel" : "");
      btn.innerHTML = `
        <div class="opt-top">
          <span class="badge ${selectedKey === k ? "sel" : ""}">${k}</span>
          <div><strong>${opt.name}</strong></div>
        </div>
        <div class="opt-sub">${optSub(q, opt.value)}</div>
      `;
      btn.addEventListener("click", () => {
        if (bucket === "cost") state.selCost[q.id] = k;
        else state.selRev[q.id] = k;
        renderAll();
      });
      grid.appendChild(btn);
    });

    return el;
  }

  function renderFutureDropdownQuestion(q) {
    const selectedKey = state.selCost[q.id] || "A";

    const el = document.createElement("div");
    el.className = "future-qrow";

    const label = document.createElement("div");
    label.className = "future-qtitle";
    label.textContent = q.title;
    el.appendChild(label);

    const select = document.createElement("select");
    select.className = "select";
    select.setAttribute("aria-label", q.title);

    Object.keys(q.options).forEach((k) => {
      const opt = q.options[k];
      const option = document.createElement("option");
      option.value = k;
      option.selected = k === selectedKey;
      option.textContent = `${k}: ${opt.name}`;
      select.appendChild(option);
    });

    select.addEventListener("change", (e) => {
      state.selCost[q.id] = e.target.value;
      renderAll();
    });

    el.appendChild(select);
    return el;
  }

  function renderCustomPanels() {
    const areaQ = costWrap.querySelector('[data-custom="rentArea"]');
    if (areaQ) {
      areaQ.innerHTML = "";
      if (state.selCost.rentArea === "D") {
        const box = document.createElement("div");
        box.className = "panel";
        box.innerHTML = `
          <div class="label">Eigenwert (m²)</div>
          <div class="row">
            <input class="input" id="customRentArea" inputmode="decimal" value="${state.customRentArea}">
            <span class="chip">0–5.000</span>
          </div>
        `;
        box.querySelector("#customRentArea").addEventListener("input", (e) => {
          state.customRentArea = e.target.value;
          renderAll();
        });
        areaQ.appendChild(box);
      }
    }

    const rentQ = costWrap.querySelector('[data-custom="rentPerM2"]');
    if (rentQ) {
      rentQ.innerHTML = "";
      if (state.selCost.rentPerM2 === "D") {
        const box = document.createElement("div");
        box.className = "panel";
        box.innerHTML = `
          <div class="label">Eigenwert (€/m²/Monat)</div>
          <div class="row">
            <input class="input" id="customRentPerM2" inputmode="decimal" value="${state.customRentPerM2}">
            <span class="chip">0–80</span>
          </div>
        `;
        box.querySelector("#customRentPerM2").addEventListener("input", (e) => {
          state.customRentPerM2 = e.target.value;
          renderAll();
        });
        rentQ.appendChild(box);
      }
    }

    const occQ = revWrap.querySelector('[data-custom="occupancy"]');
    if (occQ) {
      occQ.innerHTML = "";
      const box = document.createElement("div");
      box.className = "panel";
      box.innerHTML = `
        <div class="label">Anteil zahlender Tickets</div>
        <div class="row">
          <input class="input" id="paidShare" inputmode="decimal" value="${state.paidShare}">
          <span class="chip">0.00–1.00</span>
        </div>
      `;
      box.querySelector("#paidShare").addEventListener("input", (e) => {
        state.paidShare = e.target.value;
        renderAll();
      });
      occQ.appendChild(box);
    }
  }

  // -------------------- staff planner --------------------
  function calcAnnualEmployer({ bg, step, hoursPerWeek, dgFactor }) {
    const bgN = clamp(parseLocaleNumber(bg) || 2, 1, 8);
    const st = step || "A";
    const monthly = (IGK_PAY_2026[bgN] && IGK_PAY_2026[bgN][st]) ? IGK_PAY_2026[bgN][st] : 0;
    const hoursN = clamp(parseLocaleNumber(hoursPerWeek) || 0, 0, FULLTIME_HOURS * 2);
    const fte = hoursToFte(hoursN);
    const monthlyActual = monthly * fte;
    const annualGross14 = monthly * 14 * fte;
    const factor = clamp(parseLocaleNumber(dgFactor) || 0, 0, 3);
    const annualEmployer = annualGross14 * factor;
    return { bgN, step: st, monthly, monthlyActual, hoursN, fte, annualGross14, factor, annualEmployer };
  }

  function addStaffRow() {
    const selectedKey = getSelectedFunctionKey();
    const f0 = FUNCTIONS.find((x) => x.key === selectedKey) || FUNCTIONS[0];
    const id = (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()) + "_" + Math.random().toString(16).slice(2);
    state.staffRows.push({
      id,
      functionKey: f0.key,
      customJobTitle: "",
      bg: String(f0.defaultBG),
      step: "A",
      hours: String(FULLTIME_HOURS),
    });
    renderAll();
  }

  function removeStaffRow(id) {
    state.staffRows = state.staffRows.filter((r) => r.id !== id);
    renderAll();
  }

  function renderStaff() {
    staffList.innerHTML = "";

    const factor = clamp(parseLocaleNumber(state.dgFactor), 0, 3);
    let totalEmployer = 0;

    state.staffRows.forEach((r) => {
      const fn = FUNCTIONS.find((x) => x.key === r.functionKey)?.name || r.functionKey;
      const customJobTitle = String(r.customJobTitle || "").trim();
      const displayName = customJobTitle || fn;
      const res = calcAnnualEmployer({ bg: r.bg, step: r.step, hoursPerWeek: r.hours, dgFactor: factor });
      totalEmployer += parseLocaleNumber(res.annualEmployer);

      const row = document.createElement("div");
      row.className = "staff-row";
      row.setAttribute("data-row-id", r.id);
      row.innerHTML = `
        <div class="staff-top">
          <div class="staff-name">${displayName}</div>
          <button class="iconbtn" title="Entfernen">🗑️</button>
        </div>

        <div class="staff-grid">
          <div>
            <div class="label">Eigener Jobtitel / Custom job title</div>
            <input class="input" data-f="customJobTitle" value="${String(r.customJobTitle || "")}" />
          </div>
          <div>
            <div class="label">Funktion / Function</div>
            <select class="select" data-f="functionKey"></select>
          </div>
          <div>
            <div class="label">BG (1–8)</div>
            <select class="select" data-f="bg">
              ${[1,2,3,4,5,6,7,8].map(n => `<option value="${n}">BG ${n}</option>`).join("")}
            </select>
          </div>
          <div>
            <div class="label">Stufe</div>
            <select class="select" data-f="step">
              ${IGK_STEPS.map(s => `<option value="${s.key}">${s.label}</option>`).join("")}
            </select>
          </div>
          <div>
            <div class="label">Wochenstunden</div>
            <input class="input" inputmode="decimal" data-f="hours" value="${String(r.hours)}" />
            <div class="mini">${FULLTIME_HOURS}h = 1,0 VZÄ · ${Math.round(res.fte * 100) / 100} VZÄ</div>
          </div>
        </div>

        <div class="boxgrid">
          <div class="box">
            <div class="k">Monatsbrutto (Vollzeit) / Monthly gross salary (full time)</div>
            <div class="v">${EUR(res.monthly)}</div>
          </div>
          <div class="box">
            <div class="k">Monatsbrutto (Ist-Stunden) / Monthly gross salary (actual hours)</div>
            <div class="v">${EUR(res.monthlyActual)}</div>
          </div>
          <div class="box">
            <div class="k">Jahresbrutto (14×) × Stunden</div>
            <div class="v">${EUR(res.annualGross14)}</div>
          </div>
          <div class="box">
            <div class="k">Arbeitgeberkosten (Faktor)</div>
            <div class="v">${EUR(res.annualEmployer)}</div>
          </div>
        </div>
      `;

      row.querySelector(".iconbtn").addEventListener("click", () => removeStaffRow(r.id));

      const selFn = row.querySelector('select[data-f="functionKey"]');
      selFn.innerHTML = FUNCTIONS.map(x => `<option value="${x.key}">${x.name}</option>`).join("");
      selFn.value = r.functionKey;

      row.querySelector('select[data-f="bg"]').value = String(r.bg);
      row.querySelector('select[data-f="step"]').value = String(r.step);

      // change handlers
      row.querySelectorAll("[data-f]").forEach((node) => {
        const field = node.getAttribute("data-f");
        if (field === "hours" || field === "customJobTitle") {
          node.addEventListener("input", (e) => {
            const idx = state.staffRows.findIndex(x => x.id === r.id);
            if (idx === -1) return;
            state.staffRows[idx][field] = e.target.value;
            renderAll();
          });
        } else {
          node.addEventListener("change", (e) => {
            const idx = state.staffRows.findIndex(x => x.id === r.id);
            if (idx === -1) return;
            const val = e.target.value;

            if (field === "functionKey") {
              state.staffRows[idx].functionKey = val;
              const nf = FUNCTIONS.find((x) => x.key === val);
              if (nf) state.staffRows[idx].bg = String(nf.defaultBG);
            } else if (field === "bg") state.staffRows[idx].bg = val;
            else if (field === "step") state.staffRows[idx].step = val;

            renderAll();
          });
        }
      });

      staffList.appendChild(row);
    });

    $("staffTotal").textContent = EUR(totalEmployer);
    return totalEmployer;
  }

  // -------------------- Sonderprojekte --------------------
  function renderSpecialProjectsCard() {
    const el = document.createElement("div");
    el.className = "qcard";
    el.innerHTML = `
      <div class="qhead">Sonderprojekte</div>
      <div class="qbody">
        <div class="qhint">Zusätzlich zum Regelbetrieb (optional).</div>
        <div class="staff-grid" style="grid-template-columns:repeat(3,1fr)">
          <div class="box">
            <div class="k">Klein</div>
            <div class="v">5.000 €</div>
            <input class="input" id="spSmall" inputmode="numeric" value="${state.spSmall}">
            <div class="mini">Anzahl</div>
          </div>
          <div class="box">
            <div class="k">Mittel</div>
            <div class="v">15.000 €</div>
            <input class="input" id="spMid" inputmode="numeric" value="${state.spMid}">
            <div class="mini">Anzahl</div>
          </div>
          <div class="box">
            <div class="k">Groß</div>
            <div class="v">30.000 €</div>
            <input class="input" id="spLarge" inputmode="numeric" value="${state.spLarge}">
            <div class="mini">Anzahl</div>
          </div>
        </div>
        <div class="sep"></div>
        <div class="sumrow"><span>Sonderprojekte gesamt</span><strong id="spTotal">0 €</strong></div>
      </div>
    `;

    const recalc = () => {
      const total =
        clamp(parseLocaleNumber(state.spSmall), 0, 999) * 5000 +
        clamp(parseLocaleNumber(state.spMid), 0, 999) * 15000 +
        clamp(parseLocaleNumber(state.spLarge), 0, 999) * 30000;
      el.querySelector("#spTotal").textContent = EUR(total);
      return total;
    };

    el.querySelector("#spSmall").addEventListener("input", (e) => { state.spSmall = e.target.value; renderAll(); });
    el.querySelector("#spMid").addEventListener("input", (e) => { state.spMid = e.target.value; renderAll(); });
    el.querySelector("#spLarge").addEventListener("input", (e) => { state.spLarge = e.target.value; renderAll(); });
    recalc();

    return el;
  }

  // -------------------- compute totals --------------------
  function qValue(list, selMap, id) {
    const q = list.find((x) => x.id === id);
    const k = selMap[id];
    if (!q || !k) return 0;
    return q.options[k] ? q.options[k].value : 0;
  }

  function compute() {
    const rentAreaBase = qValue(COST_QUESTIONS, state.selCost, "rentArea");
    const rentArea = state.selCost.rentArea === "D"
      ? clamp(parseLocaleNumber(state.customRentArea), 0, 5000)
      : rentAreaBase;
    const rentPerM2Base = qValue(COST_QUESTIONS, state.selCost, "rentPerM2");
    const rentPerM2 = state.selCost.rentPerM2 === "D"
      ? clamp(parseLocaleNumber(state.customRentPerM2), 0, 80)
      : rentPerM2Base;

    const events = qValue(COST_QUESTIONS, state.selCost, "events");
    const feePerEvent = qValue(COST_QUESTIONS, state.selCost, "feePerEvent");

    const rentAnnual = rentArea * rentPerM2 * 12;
    const artistFees = events * feePerEvent;
    const otherEventCosts = events * 500;

    const otherCosts = COST_QUESTIONS.reduce((sum, q) => {
      const k = state.selCost[q.id];
      if (!k) return sum;
      if (["rentArea", "rentPerM2", "events", "feePerEvent"].includes(q.id)) return sum;
      return sum + parseLocaleNumber(q.options[k].value);
    }, 0);

    const futureCosts = FUTURE_COST_QUESTIONS.reduce((sum, q) => {
      const k = state.selCost[q.id];
      if (!k) return sum;
      return sum + parseLocaleNumber(q.options[k].value);
    }, 0);

    const specialProjectsCost =
      clamp(parseLocaleNumber(state.spSmall), 0, 999) * 5000 +
      clamp(parseLocaleNumber(state.spMid), 0, 999) * 15000 +
      clamp(parseLocaleNumber(state.spLarge), 0, 999) * 30000;

    const staffCosts = renderStaff();

    const totalCosts = rentAnnual + artistFees + otherEventCosts + staffCosts + otherCosts + futureCosts + specialProjectsCost;

    const ticketPrice = qValue(REV_QUESTIONS, state.selRev, "ticketPrice");
    const capacity = qValue(REV_QUESTIONS, state.selRev, "capacity");
    const occupancy = qValue(REV_QUESTIONS, state.selRev, "occupancy");
    const baseGrant = qValue(REV_QUESTIONS, state.selRev, "baseGrant");
    const projectGrants = qValue(REV_QUESTIONS, state.selRev, "projectGrants");
    const sponsoring = qValue(REV_QUESTIONS, state.selRev, "sponsoring");
    const bar = qValue(REV_QUESTIONS, state.selRev, "bar");
    const spaceRental = qValue(REV_QUESTIONS, state.selRev, "spaceRental");

    const paid = clamp(parseLocaleNumber(state.paidShare), 0, 1);
    const ticketRevenueGross = events * capacity * occupancy * ticketPrice;
    const ticketRevenue = ticketRevenueGross * paid;

    const otherRevenues = baseGrant + projectGrants + sponsoring + bar + spaceRental;
    const totalRevenues = ticketRevenue + otherRevenues;
    const net = totalRevenues - totalCosts;

    const publicPart = baseGrant + projectGrants;
    const publicShare = totalRevenues > 0 ? publicPart / totalRevenues : 0;

    const costBreakdown = [
      { name: "Miete", value: rentAnnual },
      { name: "Personal", value: staffCosts },
      { name: "Künstlerhonorare", value: artistFees },
      { name: "Sonderprojekte", value: specialProjectsCost },
      { name: "Zukunftsparameter", value: futureCosts },
      { name: "Veranstaltungskosten", value: otherEventCosts },
      ...COST_QUESTIONS
        .filter(q => !["rentArea","rentPerM2","events","feePerEvent"].includes(q.id))
        .map(q => {
          const k = state.selCost[q.id];
          if (!k) return null;
          const v = parseLocaleNumber(q.options[k].value);
          if (v === 0) return null;
          return { name: q.title, value: v };
        })
        .filter(Boolean),
    ];

    return {
      staffCosts, specialProjectsCost, totalCosts,
      ticketRevenue, totalRevenues, net, publicShare,
      revenues: { baseGrant, projectGrants, sponsoring, bar, spaceRental },
      costBreakdown
    };
  }

  // -------------------- pie chart --------------------
  let pieChart = null;
  function renderPie(costBreakdown) {
    const ctx = $("pie").getContext("2d");
    const labels = costBreakdown.map(x => x.name);
    const values = costBreakdown.map(x => Math.round(x.value));

    if (pieChart) {
      pieChart.data.labels = labels;
      pieChart.data.datasets[0].data = values;
      pieChart.update();
      return;
    }

    pieChart = new Chart(ctx, {
      type: "pie",
      data: { labels, datasets: [{ data: values }] },
      options: {
        plugins: {
          tooltip: { callbacks: { label: (c) => `${c.label}: ${EUR(c.parsed)}` } },
          legend: { position: "bottom" },
        },
      },
    });
  }

  // -------------------- render --------------------
  function captureFocusSnapshot() {
    const active = document.activeElement;
    if (!active) return null;

    const tag = active.tagName;
    if (!["INPUT", "SELECT", "TEXTAREA"].includes(tag)) return null;

    const row = active.closest(".staff-row");
    const field = active.getAttribute("data-f");

    return {
      id: active.id || null,
      field: field || null,
      rowId: row ? row.getAttribute("data-row-id") : null,
      selectionStart: typeof active.selectionStart === "number" ? active.selectionStart : null,
      selectionEnd: typeof active.selectionEnd === "number" ? active.selectionEnd : null,
    };
  }

  function restoreFocusSnapshot(snapshot) {
    if (!snapshot) return;

    let target = null;

    if (snapshot.rowId && snapshot.field) {
      target = document.querySelector(`.staff-row[data-row-id="${snapshot.rowId}"] [data-f="${snapshot.field}"]`);
    }

    if (!target && snapshot.id) {
      target = document.getElementById(snapshot.id);
    }

    if (!target) return;
    target.focus();

    if (
      typeof target.setSelectionRange === "function" &&
      snapshot.selectionStart !== null &&
      snapshot.selectionEnd !== null
    ) {
      target.setSelectionRange(snapshot.selectionStart, snapshot.selectionEnd);
    }
  }

  function renderAll() {
    const focusSnapshot = captureFocusSnapshot();

    const dg = $("dgFactor");
    if (dg && dg.value !== state.dgFactor) dg.value = state.dgFactor;

    costWrap.innerHTML = "";
    COST_QUESTIONS.forEach((q) => {
      costWrap.appendChild(renderQuestion(q, "cost"));
      if (q.id === "feePerEvent") costWrap.appendChild(renderSpecialProjectsCard());
    });

    if (futureCostWrap) {
      futureCostWrap.innerHTML = "";
      FUTURE_COST_QUESTIONS.forEach((q) => {
        futureCostWrap.appendChild(renderFutureDropdownQuestion(q));
      });
    }

    revWrap.innerHTML = "";
    REV_QUESTIONS.forEach((q) => revWrap.appendChild(renderQuestion(q, "rev")));

    renderCustomPanels();

    const t = compute();

    $("totalCosts").textContent = EUR(t.totalCosts);
    $("totalStaff").textContent = EUR(t.staffCosts);
    $("totalRevs").textContent = EUR(t.totalRevenues);

    $("netLabel").textContent = t.net >= 0 ? "Überschuss" : "Finanzierungsbedarf";
    $("netValue").textContent = EUR(t.net);

    $("publicShare").textContent = `Öffentlicher Anteil (Basis+Projekt): ${Math.round(t.publicShare * 100)}%`;

    $("revTickets").textContent = EUR(t.ticketRevenue);
    $("revBase").textContent = EUR(t.revenues.baseGrant);
    $("revProject").textContent = EUR(t.revenues.projectGrants);
    $("revSpons").textContent = EUR(t.revenues.sponsoring);
    $("revBar").textContent = EUR(t.revenues.bar);
    $("revSpace").textContent = EUR(t.revenues.spaceRental);

    const costBreak = $("costBreakdown");
    costBreak.innerHTML = "";
    t.costBreakdown.forEach((c) => {
      const row = document.createElement("div");
      row.className = "sumrow";
      row.innerHTML = `<span>${c.name}</span><strong>${EUR(c.value)}</strong>`;
      costBreak.appendChild(row);
    });

    renderPie(t.costBreakdown);
    restoreFocusSnapshot(focusSnapshot);
  }

  // -------------------- save/load via PHP session --------------------
  async function apiPost(action, payload) {
    const res = await fetch("api.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, payload }),
    });
    if (!res.ok) throw new Error("API error");
    return await res.json();
  }

  async function saveToServer() {
    try {
      await apiPost("save", state);
      alert("Gespeichert (Session).");
    } catch {
      alert("Speichern fehlgeschlagen. (api.php vorhanden?)");
    }
  }

  async function loadFromServer() {
    try {
      const data = await apiPost("load", null);
      if (!data || !data.ok || !data.state) {
        alert("Keine gespeicherte Session gefunden.");
        return;
      }
      Object.assign(state, data.state);
      renderAll();
    } catch {
      alert("Laden fehlgeschlagen. (api.php vorhanden?)");
    }
  }

  function csvEscape(value) {
    const s = String(value ?? "");
    return `"${s.replace(/"/g, '""')}"`;
  }

  function questionValue(q, bucket) {
    const selectedKey = bucket[q.id];
    if (!selectedKey) return { option: "", value: "" };
    const option = q.options[selectedKey];
    let val = parseLocaleNumber(option.value);
    if (q.id === "rentPerM2" && selectedKey === "D") {
      val = clamp(parseLocaleNumber(state.customRentPerM2), 0, 80);
    }
    if (q.id === "rentArea" && selectedKey === "D") {
      val = clamp(parseLocaleNumber(state.customRentArea), 0, 5000);
    }
    return { option: `${selectedKey} - ${option.name}`, value: val };
  }

  function downloadCsv() {
    const t = compute();
    const rows = [["Bereich", "Parameter", "Option", "Wert"]];

    rows.push(["Allgemein", "Dienstgeber*innen-Faktor", "", clamp(parseLocaleNumber(state.dgFactor), 0, 3)]);
    rows.push(["Allgemein", "Anteil zahlender Tickets", "", clamp(parseLocaleNumber(state.paidShare), 0, 1)]);

    COST_QUESTIONS.forEach((q) => {
      const v = questionValue(q, state.selCost);
      rows.push(["Kosten", q.title, v.option, v.value]);
    });

    FUTURE_COST_QUESTIONS.forEach((q) => {
      const v = questionValue(q, state.selCost);
      rows.push(["Zukunft", q.title, v.option, v.value]);
    });

    REV_QUESTIONS.forEach((q) => {
      const v = questionValue(q, state.selRev);
      rows.push(["Einnahmen", q.title, v.option, v.value]);
    });

    rows.push(["Ergebnis", "Gesamtkosten", "", t.totalCosts]);
    rows.push(["Ergebnis", "Personal", "", t.staffCosts]);
    rows.push(["Ergebnis", "Sonderprojekte", "", t.specialProjectsCost]);
    rows.push(["Ergebnis", "Gesamteinnahmen", "", t.totalRevenues]);
    rows.push(["Ergebnis", "Ticketverkauf", "", t.ticketRevenue]);
    rows.push(["Ergebnis", "Saldo", "", t.net]);
    rows.push(["Ergebnis", "Öffentlicher Anteil", "", t.publicShare]);

    t.costBreakdown.forEach((c) => {
      rows.push(["Kostenaufschlüsselung", c.name, "", c.value]);
    });

    state.staffRows.forEach((r, i) => {
      const fn = FUNCTIONS.find((x) => x.key === r.functionKey)?.name || r.functionKey;
      const customJobTitle = String(r.customJobTitle || "").trim();
      const displayName = customJobTitle || fn;
      const res = calcAnnualEmployer({ bg: r.bg, step: r.step, hoursPerWeek: r.hours, dgFactor: state.dgFactor });
      const label = `Stelle ${i + 1}: ${fn}`;
      rows.push(["Personal", `${label} - Eigener Jobtitel / Custom job title`, "", customJobTitle]);
      rows.push(["Personal", `${label} - Funktion`, "", fn]);
      rows.push(["Personal", `${label} - Anzeige-Jobtitel / Display job title`, "", displayName]);
      rows.push(["Personal", `${label} - BG`, "", res.bgN]);
      rows.push(["Personal", `${label} - Stufe`, "", res.step]);
      rows.push(["Personal", `${label} - Wochenstunden`, "", res.hoursN]);
      rows.push(["Personal", `${label} - VZÄ`, "", res.fte]);
      rows.push(["Personal", `${label} - Monatsbrutto (Ist-Stunden) / Monthly gross salary (actual hours)`, "", res.monthlyActual]);
      rows.push(["Personal", `${label} - Jahresbrutto`, "", res.annualGross14]);
      rows.push(["Personal", `${label} - Arbeitgeberkosten`, "", res.annualEmployer]);
    });

    const csv = rows.map((r) => r.map(csvEscape).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const date = new Date().toISOString().slice(0, 10);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `budget-szenario-${date}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function downloadPersonalplanungCsv() {
    const rows = [[
      "Function",
      "Stufe BG",
      "hours",
      "Grade",
      "monthly gross salary for full time",
      "custom job title",
      "monthly gross salary for actual hours",
      "calculated salary for actual hours",
      "yearly costs",
    ]];

    state.staffRows.forEach((r) => {
      const fn = FUNCTIONS.find((x) => x.key === r.functionKey)?.name || r.functionKey;
      const customJobTitle = String(r.customJobTitle || "").trim();
      const res = calcAnnualEmployer({ bg: r.bg, step: r.step, hoursPerWeek: r.hours, dgFactor: state.dgFactor });
      rows.push([
        fn,
        `BG ${res.bgN}`,
        res.hoursN,
        res.step,
        res.monthly,
        customJobTitle,
        res.monthlyActual,
        res.annualGross14,
        res.annualEmployer,
      ]);
    });

    const csv = rows.map((r) => r.map(csvEscape).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const date = new Date().toISOString().slice(0, 10);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Personalplanung-${date}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // -------------------- events --------------------
  $("btnAddStaff").addEventListener("click", addStaffRow);

  $("dgFactor").addEventListener("input", (e) => {
    state.dgFactor = e.target.value;
    renderAll();
  });

  $("btnReset").addEventListener("click", () => {
    state.selCost = {};
    state.selRev = {};
    state.customRentArea = "0";
    state.customRentPerM2 = "0";
    state.paidShare = "0";
    state.dgFactor = "1,35";
    state.staffRows = [];
    state.spSmall = "0";
    state.spMid = "0";
    state.spLarge = "0";
    if (staffFunctionPreset) staffFunctionPreset.value = FUNCTIONS[0].key;
    renderAll();
  });

  $("btnSave").addEventListener("click", saveToServer);
  $("btnLoad").addEventListener("click", loadToServer);
  $("btnCsv").addEventListener("click", downloadCsv);
  $("btnCsvPersonalplanung").addEventListener("click", downloadPersonalplanungCsv);

  // initial
  syncStaffFunctionPreset();
  renderAll();

  // fix: loadToServer typo guard (keep backward compatible)
  async function loadToServer() { return loadFromServer(); }
})();
