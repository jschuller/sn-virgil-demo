import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');

// The line fields the /plutus/history route emits, read from its script.
function historyLineFields() {
  const api = read('../src/fluent/rest-api/virgil-api.now.ts');
  const route = api.slice(api.indexOf("path: '/plutus/history'"));
  const push = route.slice(route.indexOf('lines.push({'), route.indexOf('});', route.indexOf('lines.push({')));
  return new Map(Array.from(push.matchAll(/(\w+): [^\n]*?'x_9418_virgil_(\w+)'/g), (m) => [m[1], m[2]]));
}

test('the Plutus page reads only fields that /plutus/history returns', () => {
  const fields = historyLineFields();
  const used = new Set(Array.from(read('../src/client/plutus.jsx').matchAll(/\bline\.(\w+)/g), (m) => m[1]));
  assert.ok(used.size >= 6, `found ${[...used]}`);
  assert.deepEqual([...used].filter((name) => !fields.has(name)), []);
});

test('/plutus/history names each line field after its x_9418_virgil_wdf_scan_line column', () => {
  const columns = new Set(
    Array.from(read('../src/fluent/tables/wdf-scan-line.now.ts').matchAll(/x_9418_virgil_(\w+): \w+Column/g), (m) => m[1])
  );
  for (const [name, column] of historyLineFields()) {
    assert.ok(columns.has(column), `${column} is a column`);
    assert.equal(name, column, `${name} matches its column name`);
  }
});
