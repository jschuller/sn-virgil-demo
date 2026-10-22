import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { stubGlideRecord } from './helpers/seed-records.mjs';

// Ids, plugins and tables named like Object.prototype members must be ordinary keys in MinosOntology.

function loadOntology(nodes, edges, warnings = []) {
  const context = {
    Class: { create: () => function () { this.initialize.apply(this, arguments); } },
    gs: { info() {}, debug() {}, warn: (message) => warnings.push(message) },
    GlideRecord: stubGlideRecord({ x_9418_virgil_ontology_node: nodes, x_9418_virgil_ontology_edge: edges }),
  };
  vm.createContext(context);
  vm.runInContext(readFileSync(new URL('../src/server/MinosOntology.server.js', import.meta.url), 'utf8'), context);
  return vm.runInContext('new MinosOntology()', context);
}

const node = (node_id, { layer = 'application', tables = [], plugins = [] } = {}) => ({
  node_id, name: `name of ${node_id}`, layer, tables: JSON.stringify(tables), plugins: JSON.stringify(plugins),
});
const edge = (source_node, target_node, rel_type = 'depends_on') => ({ source_node, target_node, rel_type });
const plain = (value) => JSON.parse(JSON.stringify(value));
const activeIds = (ontology, model) =>
  plain(ontology.mapInstanceToNodes({ installed_plugins: {}, active_tables: {}, ...model })).active_node_ids.sort();

test('a node with node_id __proto__ or an empty node_id is skipped with a warning', () => {
  const warnings = [];
  const ontology = loadOntology([node('__proto__'), node(''), node('itsm')], [edge('__proto__', 'itsm'), edge('itsm', '')], warnings);
  assert.deepEqual(Object.keys(ontology.getAllNodes()), ['itsm']);
  assert.equal(ontology.edges.length, 0);
  assert.equal(warnings.length, 4);
  assert.match(warnings[0], /skipping ontology node sys_0 with unusable node_id "__proto__"/);
});

test('depends_on edges from hasOwnProperty or constructor load, and promote only when a module is active', () => {
  const nodes = [node('hasOwnProperty'), node('constructor'), node('mod', { tables: ['mod_table'] })];
  const ontology = loadOntology(nodes, [edge('hasOwnProperty', 'mod'), edge('constructor', 'other')]);
  assert.deepEqual(activeIds(ontology, {}), []);
  const ids = activeIds(ontology, { active_tables: { mod_table: 3 } });
  assert.ok(ids.includes('hasOwnProperty') && ids.includes('mod'));
  assert.ok(!ids.includes('constructor'), "constructor's module is not active");
});

test('plugins named toString and tables named valueOf map like any other', () => {
  const nodes = [node('a', { plugins: ['toString'] }), node('b', { tables: ['valueOf'] }), node('c', { layer: 'data' })];
  const ontology = loadOntology(nodes, []);
  assert.deepEqual(activeIds(ontology, {}), []);
  assert.deepEqual(activeIds(ontology, { installed_plugins: { valueOf: true, constructor: true } }), [], 'unknown plugins map to nothing');
  const ids = activeIds(ontology, { installed_plugins: { toString: true }, active_tables: { valueOf: 2, toString: 5 } });
  assert.ok(ids.includes('a') && ids.includes('b'));
  assert.ok(!ids.includes('c'));
});

test('a node named like an Object member is active only when listed', () => {
  const ontology = loadOntology([node('toString'), node('itsm')], [edge('itsm', 'toString', 'references')]);
  const diagram = ontology.generateMermaid(['itsm'], 'as_is');
  assert.match(diagram, /itsm\[/);
  assert.doesNotMatch(diagram, /toString/);
  assert.match(ontology.generateMermaid(['itsm', 'toString'], 'as_is'), /itsm --> toString/);
});
