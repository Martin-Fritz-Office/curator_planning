(function () {
  'use strict';

  const lang = document.body?.dataset?.lang === 'de' ? 'de' : 'en';

  const UI = lang === 'de'
    ? {
        riskLabels: { info: 'Information', warning: 'Hinweis', danger: 'Risiko' },
        watchOut: 'Achtung:',
        better: 'Besser:',
        close: 'Schließen',
        indexParagraph: '§',
      }
    : {
        riskLabels: { info: 'Info', warning: 'Note', danger: 'Risk' },
        watchOut: 'Watch out:',
        better: 'Better:',
        close: 'Close',
        indexParagraph: '§',
      };

  // ── Clause data ──────────────────────────────────────────────────────────
  const CLAUSES = {
    scope: {
      label: lang === 'de' ? 'Vager Leistungsumfang' : 'Vague scope of services',
      risk: 'warning',
      explain: lang === 'de'
        ? 'Der Begriff „alle damit zusammenhängenden Aufgaben" ist rechtlich unbestimmt. Der Auftraggeber kann nachträglich Tätigkeiten einfordern, die du nicht eingeplant hast – z. B. Pressearbeit, Führungen oder Katalogtexte, ohne diese extra zu vergüten.'
        : 'The phrase "all related tasks" is legally undefined. The client can later demand work you didn\'t budget for — e.g. press work, guided tours, or catalogue texts — without extra pay.',
      watchOut: lang === 'de'
        ? 'Bestehe auf einem konkreten Leistungsverzeichnis als Vertragsanhang. Je spezifischer, desto besser bist du geschützt.'
        : 'Insist on a specific list of deliverables as a contract annex. The more specific, the better your protection.',
      better: lang === 'de'
        ? '„… gemäß beigefügtem Leistungsverzeichnis (Anhang A). Zusatzleistungen sind gesondert zu beauftragen und zu vergüten."'
        : '"… as per the attached scope of work (Annex A). Additional services require a separate written order and fee."',
    },

    lowFee: {
      label: lang === 'de' ? 'Honorarhöhe' : 'Fee level',
      risk: 'warning',
      explain: lang === 'de'
        ? '€ 3.500 brutto für die kuratorische Leitung einer Ausstellung über ~7 Monate liegt deutlich unter dem Fair-Pay-Richtwert 2026 für freie Kuratorinnen (≥ € 3.500 / Monat bei Vollzeitäquivalent). Der Stundenlohn kann unter dem Kollektivvertragsmindestlohn fallen.'
        : '€3,500 gross for curating an exhibition over ~7 months is well below the Fair Pay 2026 benchmark for freelance curators (≥ €3,500/month at full-time equivalent). The hourly rate may fall below the collective agreement minimum.',
      watchOut: lang === 'de'
        ? 'Nutze den Honorar-Fragebogen (Fair Pay 2026) auf dieser Plattform, um einen realistischen Wert zu ermitteln. Vergleiche mit dem KV-Mindestlohn für vergleichbare Angestellte.'
        : 'Use the fee questionnaire (Fair Pay 2026) on this platform to calculate a realistic figure. Compare with collective agreement minimum wages for equivalent employed staff.',
      better: null,
    },

    latePayment: {
      label: lang === 'de' ? 'Zahlungsfrist 60 Tage' : 'Payment term: 60 days',
      risk: 'warning',
      explain: lang === 'de'
        ? '60 Tage nach Projektabschluss bedeutet: Du erhältst das gesamte Honorar erst Monate nach der Eröffnung – möglicherweise ein Jahr nach deinem ersten Arbeitstag. Als Freischaffende*r trägst du das Liquiditätsrisiko allein.'
        : '60 days after project completion means you receive the full fee months after the opening — possibly a year after your first working day. As a freelancer you carry all the liquidity risk.',
      watchOut: lang === 'de'
        ? 'Verhandel Abschlagszahlungen. Gängiges Modell: 30 % bei Vertragsunterzeichnung, 40 % zur Eröffnung, 30 % nach Projektabschluss.'
        : 'Negotiate instalment payments. Common model: 30% on contract signing, 40% at opening, 30% after project completion.',
      better: lang === 'de'
        ? '„30 % bei Vertragsunterzeichnung, 40 % zur Ausstellungseröffnung, 30 % innerhalb von 30 Tagen nach Projektabschluss."'
        : '"30% on contract signing, 40% at exhibition opening, 30% within 30 days of project completion."',
    },

    fullRights: {
      label: lang === 'de' ? 'Vollständige Rechteübertragung' : 'Full IP rights transfer',
      risk: 'danger',
      explain: lang === 'de'
        ? 'Du überträgst alle Nutzungsrechte – unwiderruflich, zeitlich unbegrenzt und unentgeltlich. Das umfasst Texte, Konzepte, Fotos und alle zukünftigen Verwertungen, die heute noch gar nicht absehbar sind. Nach Unterzeichnung kannst du deine eigenen Konzepte und Texte nicht mehr ohne Zustimmung des Auftraggebers verwenden oder publizieren.'
        : 'You transfer all usage rights — irrevocably, without time limit and without additional payment. This includes texts, concepts, photos and all future uses not yet foreseeable today. After signing you can no longer use or publish your own concepts and texts without the client\'s consent.',
      watchOut: lang === 'de'
        ? 'Diese Klausel ist einer der häufigsten und gravierendsten Fehler in Kuratorinnenverträgen. Im Zweifel gilt nach österreichischem UrhG (§ 37), dass nur jene Rechte als übertragen gelten, die für den vereinbarten Zweck notwendig sind – aber nur wenn keine anderslautende Vereinbarung vorliegt.'
        : 'This is one of the most common and serious errors in curatorial contracts. Under Austrian copyright law (§37 UrhG), only rights necessary for the agreed purpose are transferred by default — but only if no explicit agreement states otherwise.',
      better: lang === 'de'
        ? '„Der Auftraggeber erhält das nicht-exklusive Recht zur Nutzung der erstellten Materialien für die Ausstellungsdokumentation und -kommunikation. Alle weiteren Nutzungen bedürfen einer gesonderten schriftlichen Vereinbarung."'
        : '"The client receives a non-exclusive right to use the created materials for exhibition documentation and communication. All further uses require a separate written agreement."',
    },

    nonCompete: {
      label: lang === 'de' ? 'Konkurrenzklausel' : 'Non-compete clause',
      risk: 'warning',
      explain: lang === 'de'
        ? 'Du darfst während der ~7-monatigen Laufzeit für keine „vergleichbare" Institution tätig sein. Für Freischaffende, die mehrere Aufträge gleichzeitig benötigen, kann diese Klausel existenzgefährdend sein.'
        : 'During the ~7-month term you may not work for any "comparable" institution. For freelancers who need several concurrent contracts, this clause can threaten financial survival.',
      watchOut: lang === 'de'
        ? 'Der Begriff „direkt konkurrierend" ist unklar. Frage: Ist jede andere Kunsthalle in Österreich ein Konkurrent? Verlange eine geografische und sachliche Einschränkung.'
        : 'The term "directly competing" is vague. Is every other Kunsthalle in Austria a competitor? Demand a geographic and subject-matter limitation.',
      better: lang === 'de'
        ? 'Klausel streichen oder einschränken auf: „… Einrichtungen, die im selben Zeitraum eine inhaltlich identische Ausstellung zeigen und sich im selben geografischen Einzugsgebiet (Wien) befinden."'
        : 'Delete the clause or limit it to: "… institutions showing a content-identical exhibition during the same period within the same geographic area (Vienna)."',
    },

    unilateralTermination: {
      label: lang === 'de' ? 'Einseitiges Kündigungsrecht' : 'Unilateral termination right',
      risk: 'danger',
      explain: lang === 'de'
        ? 'Der Auftraggeber kann jederzeit kündigen – also auch kurz vor der Eröffnung nach monatelanger Vorbereitung. Das Ausfallhonorar von 25 % deckt in dieser Phase deinen tatsächlichen Aufwand nicht annähernd. Der Zusatz „nach freiem Ermessen" beim anteiligen Honorar gibt dir keine rechtliche Handhabe.'
        : 'The client can terminate at any time — including just before the opening after months of preparation. The 25% kill fee at that stage does not come close to covering your actual work. The phrase "at the client\'s discretion" for partial fees gives you no legal recourse.',
      watchOut: lang === 'de'
        ? 'Das Ausfallhonorar sollte gestaffelt sein: Je später die Kündigung, desto höher der Ausfall. 25 % pauschal ist deutlich zu wenig.'
        : 'The kill fee should be tiered: the later the cancellation, the higher the fee. A flat 25% is far too low.',
      better: lang === 'de'
        ? '„Bei Kündigung bis 3 Monate vor Ausstellungseröffnung: 50 % des Honorars. Bei Kündigung nach diesem Zeitpunkt: 100 % des Honorars. Bereits angefallene Auslagen werden zusätzlich erstattet."'
        : '"Cancellation up to 3 months before opening: 50% of fee. Cancellation after this date: 100% of fee. Any incurred expenses are reimbursed in addition."',
    },

    unlimitedLiability: {
      label: lang === 'de' ? 'Unbeschränkte Haftung' : 'Unlimited liability',
      risk: 'danger',
      explain: lang === 'de'
        ? 'Du haftest für alle direkten und mittelbaren Schäden ohne Betragsbegrenzung. Das kann Schäden an ausgeliehenen Kunstwerken (oft Millionenwert), Folgeschäden eines Ausstellungsstopps oder entgangene Einnahmen des Auftraggebers einschließen.'
        : 'You are liable for all direct and indirect damages without a financial cap. This can include damage to loaned artworks (often worth millions), consequential losses from an exhibition halt, or the client\'s lost revenues.',
      watchOut: lang === 'de'
        ? 'Eine unbeschränkte Haftungsklausel ist für Freischaffende existenzbedrohend. Verlange eine Begrenzung auf grobe Fahrlässigkeit und Vorsatz sowie eine Haftungsobergrenze.'
        : 'Unlimited liability is existentially dangerous for freelancers. Demand limitation to gross negligence and wilful misconduct, plus a liability cap.',
      better: lang === 'de'
        ? '„Die Haftung der Auftragnehmer*in ist auf Fälle grober Fahrlässigkeit und Vorsatz begrenzt und betraglich auf die Höhe des vereinbarten Honorars beschränkt. Indirekte Schäden und Folgeschäden sind ausgeschlossen."'
        : '"Liability is limited to cases of gross negligence and wilful misconduct and is capped at the amount of the agreed fee. Indirect damages and consequential losses are excluded."',
    },

    insuranceObligation: {
      label: lang === 'de' ? 'Versicherungspflicht' : 'Insurance obligation',
      risk: 'info',
      explain: lang === 'de'
        ? 'Der Vertrag verpflichtet dich, eine Berufshaftpflichtversicherung mit € 500.000 Deckungssumme auf eigene Kosten abzuschließen. Das ist grundsätzlich sinnvoll, erhöht aber deine Kosten und kann bei kurzen Projekten unverhältnismäßig sein.'
        : 'The contract requires you to take out professional liability insurance with €500,000 coverage at your own expense. This is sensible in principle but increases your costs and may be disproportionate for short projects.',
      watchOut: lang === 'de'
        ? 'Frag: Wird die Versicherungsprämie (typisch € 200–500/Jahr) bei der Honorarkalkulation berücksichtigt? Hast du bereits eine solche Versicherung über einen Berufsverband?'
        : 'Ask: Is the insurance premium (typically €200–500/year) factored into the fee? Do you already have such coverage through a professional association?',
      better: null,
    },

    jurisdiction: {
      label: lang === 'de' ? 'Gerichtsstand Wien' : 'Jurisdiction: Vienna',
      risk: 'info',
      explain: lang === 'de'
        ? 'Bei Streitigkeiten musst du in Wien klagen oder wirst dort beklagt – unabhängig von deinem Wohnort. Für eine Kuratorin aus Graz bedeutet das zusätzlichen Aufwand und Kosten im Streitfall.'
        : 'In case of dispute you must litigate in Vienna — regardless of your home location. For a curator based in Graz this means extra effort and cost in any legal proceedings.',
      watchOut: lang === 'de'
        ? 'Wenn du nicht in Wien ansässig bist, verhandel den Gerichtsstand an deinem Wohnort oder schlage ein Schiedsverfahren vor.'
        : 'If you are not based in Vienna, negotiate the jurisdiction to your location or propose arbitration.',
      better: null,
    },

    writtenForm: {
      label: lang === 'de' ? 'Schriftformklausel' : 'Written form requirement',
      risk: 'info',
      explain: lang === 'de'
        ? 'Mündliche Absprachen, Zusagen per Telefon oder informelle E-Mails gelten nicht als Vertragsänderung. Nur beidseitig unterschriebene Dokumente sind bindend.'
        : 'Oral agreements, phone promises, or informal emails do not count as contract amendments. Only mutually signed documents are binding.',
      watchOut: lang === 'de'
        ? 'Das schützt dich – aber: Nicht alle Gerichte erkennen E-Mail oder einfache elektronische Signaturen als „Schriftform" nach ABGB an. Qualifizierte elektronische Signaturen (z. B. Handy-Signatur) sind sicherer.'
        : 'This protects you — but: not all courts accept email or simple electronic signatures as "written form" under Austrian law. Qualified electronic signatures are safer.',
      better: null,
    },

    unilateralModification: {
      label: lang === 'de' ? 'Einseitiges Änderungsrecht' : 'Unilateral modification right',
      risk: 'danger',
      explain: lang === 'de'
        ? 'Der Auftraggeber kann Vertragsbestandteile einseitig ändern – z. B. das Budget kürzen, den Zeitrahmen verlängern oder den Leistungsumfang erweitern – ohne deine Zustimmung. Diese Klausel macht praktisch den gesamten restlichen Vertrag unverbindlich.'
        : 'The client can unilaterally change contract terms — e.g. reduce the budget, extend the timeline, or expand the scope — without your consent. This clause effectively makes the rest of the contract non-binding.',
      watchOut: lang === 'de'
        ? 'Diese Klausel ist nach österreichischem Recht (§ 879 ABGB) als sittenwidrig anfechtbar, wenn sie einseitig zum Nachteil des Vertragspartners ausgestaltet ist – aber eine gerichtliche Durchsetzung kostet Zeit und Geld.'
        : 'This clause may be challengeable under Austrian law (§879 ABGB) as contrary to good morals if structured unilaterally to the detriment of the contracting party — but court enforcement costs time and money.',
      better: lang === 'de'
        ? '„Änderungen des Vertrags bedürfen der schriftlichen Zustimmung beider Parteien. Einseitige Anpassungen sind ausgeschlossen."'
        : '"Contract amendments require the written consent of both parties. Unilateral adjustments are excluded."',
    },
  };

  // ── Tooltip engine ────────────────────────────────────────────────────────
  const tip = document.createElement('div');
  tip.className = 'clause-tip';
  tip.setAttribute('role', 'tooltip');
  tip.hidden = true;
  document.body.appendChild(tip);

  let closeTimer = null;
  let pinned = false;
  let activeEl = null;

  function escHtml(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function buildTip(data) {
    const badge = `<span class="clause-tip__badge clause-tip__badge--${data.risk}">${escHtml(UI.riskLabels[data.risk])}</span>`;
    const watchOut = data.watchOut
      ? `<div class="clause-tip__section clause-tip__watchout"><strong>${escHtml(UI.watchOut)}</strong> ${escHtml(data.watchOut)}</div>`
      : '';
    const better = data.better
      ? `<div class="clause-tip__section clause-tip__better"><strong>${escHtml(UI.better)}</strong> <em>${escHtml(data.better)}</em></div>`
      : '';
    return `
      <button class="clause-tip__close" type="button" aria-label="${escHtml(UI.close)}">×</button>
      <div class="clause-tip__header">${badge}<strong class="clause-tip__title">${escHtml(data.label)}</strong></div>
      <p class="clause-tip__body">${escHtml(data.explain)}</p>
      ${watchOut}${better}`;
  }

  function placeTip(trigger) {
    const TIP_W = Math.min(360, window.innerWidth - 20);
    const GAP = 10;
    const rect = trigger.getBoundingClientRect();

    tip.style.width = TIP_W + 'px';

    // Horizontal: centre on trigger, clamped to viewport
    let left = rect.left + rect.width / 2 - TIP_W / 2;
    left = Math.max(GAP, Math.min(left, window.innerWidth - TIP_W - GAP));

    // Measure height (briefly visible off-screen)
    tip.style.top = '-9999px';
    tip.style.left = left + 'px';
    tip.hidden = false;
    const tipH = tip.offsetHeight;

    // Prefer above, fall back below
    const above = rect.top - GAP;
    let top = above >= tipH + GAP
      ? rect.top - tipH - GAP
      : rect.bottom + GAP;
    top = Math.max(GAP, Math.min(top, window.innerHeight - tipH - GAP));

    tip.style.top = top + 'px';
  }

  function showTip(trigger) {
    clearTimeout(closeTimer);
    const key = trigger.dataset.clause;
    const data = CLAUSES[key];
    if (!data) return;

    tip.innerHTML = buildTip(data);
    tip.querySelector('.clause-tip__close').addEventListener('click', () => {
      pinned = false;
      hideTip(true);
    });

    placeTip(trigger);
    activeEl = trigger;
  }

  function hideTip(immediate) {
    if (pinned) return;
    if (immediate) {
      tip.hidden = true;
      activeEl = null;
    } else {
      closeTimer = setTimeout(() => {
        tip.hidden = true;
        activeEl = null;
      }, 220);
    }
  }

  // ── Wire up clause elements ───────────────────────────────────────────────
  document.querySelectorAll('.clause').forEach((el) => {
    // Hover (desktop)
    el.addEventListener('mouseenter', () => {
      clearTimeout(closeTimer);
      if (!pinned) showTip(el);
    });
    el.addEventListener('mouseleave', () => {
      if (!pinned) hideTip(false);
    });

    // Click / tap: toggle pin
    el.addEventListener('click', (e) => {
      e.preventDefault();
      if (pinned && activeEl === el) {
        pinned = false;
        hideTip(true);
      } else {
        pinned = true;
        showTip(el);
      }
    });

    el.addEventListener('touchstart', (e) => {
      e.preventDefault();
      if (pinned && activeEl === el) {
        pinned = false;
        hideTip(true);
      } else {
        pinned = true;
        showTip(el);
      }
    }, { passive: false });

    // Keyboard
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (pinned && activeEl === el) {
          pinned = false;
          hideTip(true);
        } else {
          pinned = true;
          showTip(el);
        }
      }
    });

    el.addEventListener('focus', () => { if (!pinned) showTip(el); });
    el.addEventListener('blur', () => { if (!pinned) hideTip(false); });
  });

  // Keep tip open when hovering over it
  tip.addEventListener('mouseenter', () => clearTimeout(closeTimer));
  tip.addEventListener('mouseleave', () => { if (!pinned) hideTip(false); });

  // Escape / outside click to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { pinned = false; hideTip(true); }
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.clause') && !e.target.closest('.clause-tip')) {
      pinned = false;
      hideTip(true);
    }
  });

  // Reposition on scroll / resize
  window.addEventListener('scroll', () => {
    if (!tip.hidden && activeEl) placeTip(activeEl);
  }, { passive: true });
  window.addEventListener('resize', () => {
    if (!tip.hidden && activeEl) placeTip(activeEl);
  });

  // ── Clause index (summary list below the contract) ────────────────────────
  const indexEl = document.getElementById('clauseIndex');
  if (indexEl) {
    const riskOrder = { danger: 0, warning: 1, info: 2 };
    const sorted = Object.entries(CLAUSES).sort(
      ([, a], [, b]) => riskOrder[a.risk] - riskOrder[b.risk]
    );

    indexEl.innerHTML = sorted.map(([key, data]) => `
      <div class="clause-index-item clause-index-item--${data.risk}">
        <div class="clause-index-head">
          <span class="clause-tip__badge clause-tip__badge--${data.risk}">${escHtml(UI.riskLabels[data.risk])}</span>
          <strong>${escHtml(data.label)}</strong>
        </div>
        <p class="clause-index-explain">${escHtml(data.explain)}</p>
        ${data.watchOut ? `<p class="clause-index-meta"><strong>${escHtml(UI.watchOut)}</strong> ${escHtml(data.watchOut)}</p>` : ''}
        ${data.better ? `<p class="clause-index-meta clause-index-better"><strong>${escHtml(UI.better)}</strong> <em>${escHtml(data.better)}</em></p>` : ''}
      </div>`
    ).join('');
  }
})();
