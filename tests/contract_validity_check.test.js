const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const repoRoot = path.resolve(__dirname, '..');
const jsPath = path.join(repoRoot, 'contract_validity_check.js');
const phpPath = path.join(repoRoot, 'contract_validity_check.php');

test('Contract validity check contains exactly 10 questions', () => {
  const source = fs.readFileSync(jsPath, 'utf8');
  const matches = source.match(/\{\s*\n?\s*id:/g) || [];
  assert.equal(matches.length, 10, `Expected 10 questions (got ${matches.length})`);
});

test('Exactly 5 questions are marked critical', () => {
  const source = fs.readFileSync(jsPath, 'utf8');
  const criticalTrueCount = (source.match(/critical:\s*true/g) || []).length;
  assert.equal(criticalTrueCount, 5, `Expected 5 critical:true entries (got ${criticalTrueCount})`);
});

test('PHP page is wired to contract_validity_check.js with required DOM elements', () => {
  const page = fs.readFileSync(phpPath, 'utf8');
  assert.match(page, /<script defer src="contract_validity_check\.js"><\/script>/);
  assert.match(page, /id="carouselStage"/);
  assert.match(page, /id="prevBtn"/);
  assert.match(page, /id="nextBtn"/);
  assert.match(page, /id="progressLabel"/);
});
