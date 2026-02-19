(function () {
  const labels = ["energy", "risk", "time", "support"];
  const inputs = Array.from(document.querySelectorAll('#spark-inputs input[type="range"]'));
  const valueSlots = Object.fromEntries(labels.map((k) => [k, document.querySelector(`[data-value="${k}"]`)]));
  const sparkShape = document.getElementById("spark-shape");
  const sparkPoints = document.getElementById("spark-points");
  const sparkScore = document.getElementById("spark-score");
  const sparkMessage = document.getElementById("spark-message");

  function readValues() {
    const values = {};
    inputs.forEach((input) => {
      values[input.dataset.key] = Number(input.value);
      valueSlots[input.dataset.key].textContent = input.value;
    });
    return values;
  }

  function axisPoint(index, value) {
    const center = 160;
    const angle = (-Math.PI / 2) + (index * Math.PI * 2 / labels.length);
    const radius = 20 + value;
    return {
      x: center + Math.cos(angle) * radius,
      y: center + Math.sin(angle) * radius
    };
  }

  function messageFor(score, values) {
    if (score >= 78) {
      return "Launch a bold public experiment this month. You have enough momentum for a visible prototype.";
    }
    if (score >= 58) {
      return "Perfect time for a collaborative pop-up concept: medium risk, high learning, quick feedback.";
    }
    if (values.support < 35) {
      return "Try a solo mini-format first (1-day micro-exhibition) before scaling with partners.";
    }
    return "Build a low-stakes sketch phase: 3 tiny tests, one trusted collaborator, zero perfection pressure.";
  }

  function render() {
    const values = readValues();
    const ordered = labels.map((k) => values[k]);
    const score = Math.round((values.energy * 0.35) + (values.risk * 0.2) + (values.time * 0.25) + (values.support * 0.2));

    const points = ordered.map((value, index) => axisPoint(index, value));
    sparkShape.setAttribute("points", points.map((p) => `${p.x},${p.y}`).join(" "));

    sparkPoints.innerHTML = points
      .map((p, index) => `<circle cx="${p.x}" cy="${p.y}" r="4.5" class="spark-node"><title>${labels[index]}: ${ordered[index]}</title></circle>`)
      .join("");

    sparkScore.textContent = String(score);
    sparkMessage.textContent = messageFor(score, values);
  }

  inputs.forEach((input) => input.addEventListener("input", render));
  render();
})();
