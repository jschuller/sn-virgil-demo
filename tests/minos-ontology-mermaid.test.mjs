import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { seedRecords, stubGlideRecord } from './helpers/seed-records.mjs';

// Loads MinosOntology with stub Glide globals; `tables` feeds the stub GlideRecord its constructor reads.
function loadOntology(tables) {
  const context = {
    Class: { create: () => function () { this.initialize.apply(this, arguments); } },
    gs: { info() {}, debug() {}, warn() {} },
    GlideRecord: stubGlideRecord(tables),
  };
  vm.createContext(context);
  vm.runInContext(readFileSync(new URL('../src/server/MinosOntology.server.js', import.meta.url), 'utf8'), context);
  return vm.runInContext('new MinosOntology()', context);
}

const node = (node_id, name, layer = 'application') => ({ node_id, name, layer, tables: '[]', plugins: '[]' });
const edge = (source_node, target_node, rel_type = 'depends_on') => ({ source_node, target_node, rel_type });

const RESERVED = /^(end|graph|flowchart|subgraph|direction|style|classdef|class|click|call|href|linkstyle|interpolate|default|acctitle|accdescr)$/i;
const ID = '[A-Za-z][A-Za-z0-9_]*';
const LINE_SHAPES = [
  /^graph TB$/,
  /^ {2}subgraph [A-Za-z ]+$/,
  /^ {2}end$/,
  // A label is never empty and never holds a raw % (Mermaid finds %% comments and %%{init}%% directives even in quotes).
  new RegExp(`^ {4}(${ID})\\["([^"\\n%]+)"\\](:::recommended)?$`),
  new RegExp(`^ {2}(${ID}) --> (${ID})$`),
  /^ {2}classDef recommended fill:#fef3c7,stroke:#f59e0b,stroke-width:2px$/,
];

// Checks every line against the statement shapes generateMermaid may emit; returns the declared nodes and edges.
function parseDiagram(diagram) {
  const declared = new Map();
  const edges = [];
  for (const line of diagram.split('\n')) {
    const shape = LINE_SHAPES.find((pattern) => pattern.test(line));
    assert.ok(shape, `unexpected Mermaid line: ${JSON.stringify(line)}`);
    const match = line.match(shape);
    if (shape === LINE_SHAPES[3]) {
      assert.ok(!RESERVED.test(match[1]), `reserved id ${match[1]}`);
      assert.ok(!declared.has(match[1]), `duplicate id ${match[1]}`);
      declared.set(match[1], match[2]);
    }
    if (shape === LINE_SHAPES[4]) edges.push([match[1], match[2]]);
  }
  return { declared, edges };
}

// What Mermaid shows for a label: one pass that turns #name; and #number; entity codes into characters.
const NAMED = { quot: '"', amp: '&', lt: '<', gt: '>' };
const decode = (label) =>
  label.replace(/#(\w+);/g, (code, inner) => (/^\d+$/.test(inner) ? String.fromCharCode(Number(inner)) : NAMED[inner] ?? code));

describe('generateMermaid with table-sourced names and ids', () => {
  const hostile = [
    node('evil', 'Evil"] --> pwned["owned'),
    node('newline', 'Line one\nclick evil call alert(1)\r\nstyle evil fill:red'),
    node('html', '<img src=x onerror=alert(1)> & <b>bold</b>'),
    node('entity', 'Already #quot; encoded #35; and C# and `**markdown**`'),
    node('brackets', 'Pipes | and ] brackets [ and (parens) {braces}'),
    node('end', 'Reserved id'),
    node('a-b', 'Dash id'),
    node('a_b', 'Underscore id'),
    node('9lives', 'Digit id'),
    node('hasOwnProperty', 'Object method id'),
    node('blank', ''),
    node('spaces', ' \n\t '),
    node('init', "x%%{init: {'theme':'forest','themeCSS':'.node rect{fill:red}','flowchart':{'htmlLabels':true}}}%%"),
    node('unclosed', 'x%%{ y'),
    node('comment', 'x %% y'),
    node('wholeinit', "%%{init: {'theme':'dark'}}%%"),
  ];
  const ontology = loadOntology({
    x_9418_virgil_ontology_node: hostile,
    x_9418_virgil_ontology_edge: [edge('end', 'a-b'), edge('a_b', '9lives'), edge('hasOwnProperty', 'evil', 'references'), edge('evil', 'gone')],
  });
  const ids = hostile.map((n) => n.node_id);
  const diagram = ontology.generateMermaid(ids, 'as_is');
  const { declared, edges } = parseDiagram(diagram);

  test('every line is one well-formed statement', () => {
    assert.equal(declared.size, hostile.length, 'one node line per node: no injected statements');
    assert.equal(diagram.split('\n').filter((line) => /^\s*(click|style)\b/.test(line)).length, 0);
  });

  test('labels show the original names', () => {
    const shown = [...declared.values()].map(decode);
    for (const n of hostile) {
      const expected = (n.name || '').replace(/[\r\n\t]+/g, ' ').trim() || n.node_id;
      assert.ok(shown.includes(expected), `label for ${n.node_id}: ${expected}`);
    }
  });

  test('no % reaches the diagram, so no name can carry an init directive or a comment', () => {
    assert.ok(!diagram.includes('%'), diagram);
    assert.equal(decode(declared.get('init')), hostile.find((n) => n.node_id === 'init').name);
    assert.equal(declared.get('unclosed'), 'x#37;#37;{ y');
  });

  test('a blank name shows the node id instead of an empty label', () => {
    assert.equal(declared.get('blank'), 'blank');
    assert.equal(declared.get('spaces'), 'spaces');
  });

  test('ids are safe, unique and keep safe ids as they are', () => {
    const idList = [...declared.keys()];
    assert.ok(idList.includes('evil') && idList.includes('a_b') && idList.includes('n_end') && idList.includes('n_9lives'));
    assert.ok(idList.includes('a_b_2'), "'a-b' and 'a_b' stay two nodes; the safe 'a_b' keeps its name");
    assert.ok(idList.includes('hasOwnProperty'), 'an id named like an Object method is an ordinary id');
  });

  test('edges use the same ids as the node lines', () => {
    assert.deepEqual(edges, [
      ['n_end', 'a_b_2'],
      ['a_b', 'n_9lives'],
      ['hasOwnProperty', 'evil'],
    ]);
  });

  test('a recommended node keeps its class and star', () => {
    const rec = loadOntology({ x_9418_virgil_ontology_node: [node('grc', 'GRC "Risk"')], x_9418_virgil_ontology_edge: [] });
    const out = rec.generateMermaid([], 'recommended', { grc: 'S2P coverage' });
    assert.match(out, /^ {4}grc\["GRC #quot;Risk#quot; ⭐"\]:::recommended$/m);
    parseDiagram(out);
  });
});

describe('generateMermaid with the seeded ontology', () => {
  const nodes = seedRecords('x_9418_virgil_ontology_node');
  const ontology = loadOntology({
    x_9418_virgil_ontology_node: nodes,
    x_9418_virgil_ontology_edge: seedRecords('x_9418_virgil_ontology_edge'),
  });
  const all = nodes.map((n) => n.node_id);

  test('the seed data has nodes', () => {
    assert.ok(nodes.length >= 40, `found ${nodes.length}`);
  });

  for (const mode of ['as_is', 'recommended']) {
    test(`${mode}: every line is well formed and every edge joins declared nodes`, () => {
      const half = all.slice(0, Math.ceil(all.length / 2));
      const recommended = Object.fromEntries(all.slice(half.length).map((id) => [id, 'reason']));
      const { declared, edges } = parseDiagram(ontology.generateMermaid(half, mode, recommended));
      assert.ok(declared.size > 0);
      for (const [from, to] of edges) assert.ok(declared.has(from) && declared.has(to), `${from} --> ${to}`);
    });
  }

  test('seeded node ids are already safe, so their ids are unchanged', () => {
    const { declared } = parseDiagram(ontology.generateMermaid(all, 'as_is'));
    for (const id of declared.keys()) assert.ok(all.includes(id), id);
  });
});
