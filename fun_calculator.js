(function () {
  const lang = document.body?.dataset?.lang === "de" ? "de" : "en";
  const dimensions = lang === "de" ? [
    { key: "financial", label: "Finanziell" },
    { key: "reputational", label: "Reputation" },
    { key: "collaborative", label: "Kollaboration" },
    { key: "professional", label: "Professionell" },
    { key: "ethical", label: "Ethisch" },
    { key: "capacity", label: "Kapazität" }
  ] : [
    { key: "financial", label: "Financial" },
    { key: "reputational", label: "Reputational" },
    { key: "collaborative", label: "Collaborative" },
    { key: "professional", label: "Professional" },
    { key: "ethical", label: "Ethical" },
    { key: "capacity", label: "Capacity" }
  ];

  const root = document.getElementById("spark-inputs");
  if (!root) {
    return;
  }

  const inputs = Array.from(root.querySelectorAll('input[type="range"]'));
  const valueSlots = Object.fromEntries(
    dimensions.map((d) => [d.key, document.querySelector(`[data-value="${d.key}"]`)])
  );

  const rings = document.getElementById("spark-rings");
  const axes = document.getElementById("spark-axes");
  const labels = document.getElementById("spark-labels");
  const shape = document.getElementById("spark-shape");
  const pointsLayer = document.getElementById("spark-points");
  const scoreEl = document.getElementById("spark-score");
  const lowestEl = document.getElementById("spark-lowest");
  const messageEl = document.getElementById("spark-message");

  const center = 170;
  const maxRadius = 120;

  function polarPoint(index, value, count) {
    const angle = (-Math.PI / 2) + (index * Math.PI * 2 / count);
    const radius = (value / 100) * maxRadius;
    return {
      x: center + Math.cos(angle) * radius,
      y: center + Math.sin(angle) * radius,
      angle
    };
  }

  function drawStaticGrid() {
    rings.innerHTML = "";
    axes.innerHTML = "";
    labels.innerHTML = "";

    [25, 50, 75, 100].forEach((step) => {
      const ring = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      ring.setAttribute("cx", String(center));
      ring.setAttribute("cy", String(center));
      ring.setAttribute("r", String((step / 100) * maxRadius));
      ring.setAttribute("class", "spark-grid");
      rings.appendChild(ring);
    });

    dimensions.forEach((dimension, index) => {
      const p = polarPoint(index, 100, dimensions.length);

      const axis = document.createElementNS("http://www.w3.org/2000/svg", "line");
      axis.setAttribute("x1", String(center));
      axis.setAttribute("y1", String(center));
      axis.setAttribute("x2", String(p.x));
      axis.setAttribute("y2", String(p.y));
      axis.setAttribute("class", "spark-axis");
      axes.appendChild(axis);

      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", String(center + Math.cos(p.angle) * (maxRadius + 18)));
      text.setAttribute("y", String(center + Math.sin(p.angle) * (maxRadius + 18)));
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("dominant-baseline", "middle");
      text.setAttribute("class", "spark-label");
      text.textContent = dimension.label;
      labels.appendChild(text);
    });
  }

  function readValues() {
    const values = {};
    inputs.forEach((input) => {
      const value = Number(input.value);
      values[input.dataset.key] = value;
      if (valueSlots[input.dataset.key]) {
        valueSlots[input.dataset.key].textContent = String(value);
      }
    });
    return values;
  }

  function messageFor(score, lowest, hasLowDimension) {
    if (hasLowDimension) {
      return lang === "de"
      ? `Warnung: Mindestens eine Dimension liegt unter 50. Stärke die Dimension ${lowest.label.toLowerCase()}, bevor du zusagst.`
      : `Warning: at least one dimension is below 50. Strengthen the ${lowest.label.toLowerCase()} dimension before committing.`;
    }
    if (score >= 75) {
      return lang === "de"
      ? "Starker Gesamt-Fit: Das wirkt wie ein grünes Licht mit guter Balance über alle Dimensionen."
      : "Strong overall fit: this looks like a green-light project with good balance across dimensions.";
    }
    if (score >= 55) {
      return lang === "de"
      ? `Vielversprechend, aber kläre die Dimension ${lowest.label.toLowerCase()} bevor du zusagst.`
      : `Promising, but clarify the ${lowest.label.toLowerCase()} dimension before committing.`;
    }
    return lang === "de"
      ? `Vorsichtig weitermachen: Die Dimension ${lowest.label.toLowerCase()} ist aktuell zu schwach.`
      : `Proceed carefully: the ${lowest.label.toLowerCase()} dimension is currently too weak.`;
  }

  function render() {
    const values = readValues();
    const ordered = dimensions.map((d) => values[d.key] ?? 1);
    const score = Math.round(ordered.reduce((sum, value) => sum + value, 0) / ordered.length);

    const lowest = dimensions.reduce((current, d) => {
      const val = values[d.key] ?? 1;
      if (!current || val < current.value) {
        return { label: d.label, value: val };
      }
      return current;
    }, null);

    const hasLowDimension = ordered.some((value) => value < 50);

    const coordinates = ordered.map((value, index) => polarPoint(index, value, dimensions.length));
    shape.setAttribute("points", coordinates.map((p) => `${p.x},${p.y}`).join(" "));

    pointsLayer.innerHTML = coordinates
      .map((p, index) => `
        <circle cx="${p.x}" cy="${p.y}" r="4.5" class="spark-node">
          <title>${dimensions[index].label}: ${ordered[index]}</title>
        </circle>`)
      .join("");

    scoreEl.textContent = String(score);
    lowestEl.textContent = `${lowest.label} (${lowest.value})`;
    messageEl.textContent = messageFor(score, lowest, hasLowDimension);
  }

  drawStaticGrid();
  inputs.forEach((input) => input.addEventListener("input", render));
  render();
})();
