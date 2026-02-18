const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const repoRoot = path.resolve(__dirname, '..');
const jsPath = path.join(repoRoot, 'agreement_checklist.js');
const dePagePath = path.join(repoRoot, 'agreement_checklist.php');
const enPagePath = path.join(repoRoot, 'agreement_checklist_en.php');

function getLanguagePointsCount(source, lang) {
  const langBlock = new RegExp(`${lang}: \\{([\\s\\S]*?)\\n\\s*\\},\\n\\s*[a-z]{2}:`, 'm');
  const match = source.match(langBlock);
  if (!match) {
    if (lang === 'en') {
      const enBlock = source.match(/en: \{([\s\S]*?)\n\s*\}\n\s*\};/m);
      if (!enBlock) throw new Error(`Could not locate ${lang} dictionary block`);
      return (enBlock[1].match(/\["/g) || []).length;
    }
    throw new Error(`Could not locate ${lang} dictionary block`);
  }
  return (match[1].match(/\["/g) || []).length;
}

test('German and English questionnaire each contain exactly 25 points', () => {
  const source = fs.readFileSync(jsPath, 'utf8');
  const deCount = getLanguagePointsCount(source, 'de');
  const enCount = getLanguagePointsCount(source, 'en');

  assert.equal(deCount, 25, `German checklist should contain 25 points (got ${deCount})`);
  assert.equal(enCount, 25, `English checklist should contain 25 points (got ${enCount})`);
});

test('Both checklist pages are wired to agreement_checklist.js with the correct language', () => {
  const dePage = fs.readFileSync(dePagePath, 'utf8');
  const enPage = fs.readFileSync(enPagePath, 'utf8');

  assert.match(dePage, /<script defer src="agreement_checklist\.js"><\/script>/);
  assert.match(enPage, /<script defer src="agreement_checklist\.js"><\/script>/);

  assert.match(dePage, /<body data-lang="de">/);
  assert.match(enPage, /<body data-lang="en">/);
});
