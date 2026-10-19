import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

// Loads the Script Include with just enough of the Glide globals to call evaluate().
function loadRuleEngine() {
  const context = {
    Class: { create: () => function () {} },
    gs: { info() {}, debug() {}, warn() {} },
  };
  vm.createContext(context);
  vm.runInContext(readFileSync(new URL('../src/server/MinosRuleEngine.server.js', import.meta.url), 'utf8'), context);
  return vm.runInContext('MinosRuleEngine', context);
}

test('evaluate orders findings critical, high, medium, low, then unknown', () => {
  const MinosRuleEngine = loadRuleEngine();
  const engine = Object.create(MinosRuleEngine.prototype);
  engine.rules = ['low', 'bogus', 'critical', 'medium', 'high', 'critical'].map((severity, i) => ({
    id: `R${i}`, name: `rule ${i}`, severity, eval: { always: true }, message: '', recommendation: '',
  }));
  engine._evalBlock = () => ({ fired: true, evidence: {} });

  const { findings } = engine.evaluate({});

  assert.deepEqual(Array.from(findings, (f) => f.severity), ['critical', 'critical', 'high', 'medium', 'low', 'bogus']);
});
