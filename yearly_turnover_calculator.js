(function () {
  const rowsEl = document.getElementById("turnoverRows");
  const addBtn = document.getElementById("addTurnoverRowBtn");
  const totalEl = document.getElementById("yearlyTotal");

  if (!rowsEl || !addBtn || !totalEl) {
    return;
  }

  const lang = document.body?.dataset?.lang === "de" ? "de" : "en";
  const labels = {
    de: {
      remove: "Entfernen",
      placeholder: "z. B. Ausstellungskonzept",
      units: ["Stunden", "Tage", "Wochen", "Monate", "Werke", "Objekte", "Auftritte geringer Aufwand", "Auftritte großer Aufwand"]
    },
    en: {
      remove: "Remove",
      placeholder: "e.g. Exhibition concept",
      units: ["Hours", "Days", "Weeks", "Months", "Works", "Objects", "Performances (low effort)", "Performances (high effort)"]
    }
  };

  const locale = lang === "de" ? "de-DE" : "en-US";

  function EUR(value) {
    return Number(value || 0).toLocaleString(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  function updateTotals() {
    const rows = Array.from(rowsEl.querySelectorAll("tr"));
    let total = 0;

    rows.forEach((row) => {
      const price = Number(row.querySelector('[data-field="price"]').value) || 0;
      const quantity = Number(row.querySelector('[data-field="quantity"]').value) || 0;
      const yearly = price * quantity;
      total += yearly;
      row.querySelector('[data-field="yearly"]').textContent = EUR(yearly);
    });

    totalEl.textContent = EUR(total);
  }

  function unitOptionsMarkup() {
    return labels[lang].units.map((unit) => `<option value="${unit}">${unit}</option>`).join("");
  }

  function createRow() {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><input type="text" data-field="service" placeholder="${labels[lang].placeholder}" /></td>
      <td><select data-field="unit">${unitOptionsMarkup()}</select></td>
      <td><input type="number" data-field="price" min="0" step="0.01" value="0" /></td>
      <td><input type="number" data-field="quantity" min="0" step="1" value="0" /></td>
      <td data-field="yearly">0</td>
      <td><button type="button" class="btn btn-outline" data-action="remove">${labels[lang].remove}</button></td>
    `;

    tr.querySelectorAll('input, select').forEach((el) => {
      el.addEventListener("input", updateTotals);
      el.addEventListener("change", updateTotals);
    });

    tr.querySelector('[data-action="remove"]').addEventListener("click", function () {
      tr.remove();
      updateTotals();
    });

    rowsEl.appendChild(tr);
    updateTotals();
  }

  addBtn.addEventListener("click", createRow);

  createRow();
})();
