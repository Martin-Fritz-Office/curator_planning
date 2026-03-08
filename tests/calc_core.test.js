const assert = require('node:assert/strict');
const core = require('../calc_core.js');

function near(actual, expected, eps = 1e-9) {
  assert.ok(Math.abs(actual - expected) < eps, `expected ${actual} ≈ ${expected}`);
}

// tax tests around bracket boundaries
near(core.calculateAustrianIncomeTax2025(0), 0);
near(core.calculateAustrianIncomeTax2025(13308), 0);
near(core.calculateAustrianIncomeTax2025(13309), 0.2);
near(core.calculateAustrianIncomeTax2025(21617), (21617 - 13308) * 0.2);

const taxAt35836 = (21617 - 13308) * 0.2 + (35836 - 21617) * 0.3;
near(core.calculateAustrianIncomeTax2025(35836), taxAt35836);

// forecast test with defaults
const forecast = core.calculateForecast(core.DEFAULT_ANSWERS, 0, {
  labels: {
    income: ['a', 'b', 'c', 'd', 'e', 'f'],
    costs: ['x', 'y', 'z', 'w'],
    typology: {
      precarious: 'p',
      stable: 's',
      highlyProfessionalized: 'h',
    },
  },
});

near(forecast.revenue, 44650);
near(forecast.taxes, 3424);
near(forecast.available, 21178.96);
assert.equal(forecast.typ.label, 's');
assert.equal(forecast.incomePie[0].name, 'a');

// employment should directly increase available income
const withEmployment = core.calculateForecast(core.DEFAULT_ANSWERS, 12000);
near(withEmployment.available - forecast.available, 12000);

console.log('calc_core tests passed');
