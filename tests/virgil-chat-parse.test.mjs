import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

// Loads the Script Include with just enough of the Glide globals to call its pure methods.
function loadVirgilChat() {
  const context = {
    Class: { create: () => function () {} },
    gs: { info() {}, debug() {}, warn() {}, error() {} },
  };
  vm.createContext(context);
  vm.runInContext(readFileSync(new URL('../src/server/VirgilChat.server.js', import.meta.url), 'utf8'), context);
  return Object.create(vm.runInContext('VirgilChat', context).prototype);
}

// The vm builds results with its own Object prototype; compare plain copies.
const plain = (value) => JSON.parse(JSON.stringify(value));
const chat = loadVirgilChat();
const parse = (content) => plain(chat._parseResponse({ content }));
const text = (t) => ({ type: 'text', text: t });

const FULL = {
  analysis: 'The instance lacks SPM.',
  recommendations: [{ title: 'Enable SPM', priority: 'high' }],
  mermaid_diagram: 'graph TD\n  A[ITSM] --> B[SPM]',
  implementation_notes: 'Start with demand.',
};

describe('VirgilChat._parseResponse', () => {
  test('parses a JSON answer and keeps only the four known fields', () => {
    assert.deepEqual(parse([text(JSON.stringify({ ...FULL, extra: 'dropped' }))]), FULL);
  });

  test('skips thinking blocks and joins the text blocks', () => {
    const json = JSON.stringify(FULL);
    const content = [
      { type: 'thinking', thinking: '{"analysis": "not this"}' },
      text(json.slice(0, 20)),
      { type: 'redacted_thinking', data: 'x' },
      text(json.slice(20)),
    ];
    assert.deepEqual(parse(content), FULL);
  });

  test('strips ```json and bare ``` fences', () => {
    assert.deepEqual(parse([text('```json\n' + JSON.stringify(FULL) + '\n```')]), FULL);
    assert.deepEqual(parse([text('```\n' + JSON.stringify(FULL) + '\n```')]), FULL);
  });

  test('extracts a JSON object surrounded by prose', () => {
    const answer = 'Here is my analysis:\n' + JSON.stringify(FULL) + '\nHope this helps.';
    assert.deepEqual(parse([text(answer)]), FULL);
  });

  test('fills missing fields with empty defaults', () => {
    assert.deepEqual(parse([text('{"analysis": "only this"}')]), {
      analysis: 'only this',
      recommendations: [],
      mermaid_diagram: '',
      implementation_notes: '',
    });
  });

  test('returns non-JSON text as the analysis', () => {
    assert.deepEqual(parse([text('  Plain **markdown** answer {not json}  ')]), {
      analysis: 'Plain **markdown** answer {not json}',
      recommendations: [],
      mermaid_diagram: '',
      implementation_notes: '',
    });
  });

  test('handles a response without content', () => {
    assert.deepEqual(plain(chat._parseResponse({})), {
      analysis: '',
      recommendations: [],
      mermaid_diagram: '',
      implementation_notes: '',
    });
  });
});

describe('VirgilChat._sanitizeMermaid', () => {
  test('removes fences, adds a graph header and cleans node and edge labels', () => {
    const out = chat._sanitizeMermaid('```mermaid\nA["CMDB / Assets (core)"] -->|Leverages| B[Event & Alert]\n```');
    assert.equal(out, 'graph TD\nA[CMDB Assets - core] -->|references| B[Event and Alert]');
  });

  test('cleans subgraph names', () => {
    const out = chat._sanitizeMermaid('graph LR\nsubgraph 1. "Ops / Run" (core)\n  A[X] --> B[Y]\nend');
    assert.equal(out, 'graph LR\nsubgraph Ops Run\n  A[X] --> B[Y]\nend');
  });

  test('returns the input unchanged when it has no arrows or is too short', () => {
    assert.equal(chat._sanitizeMermaid('graph TD\n  A[Only one node]'), 'graph TD\n  A[Only one node]');
    assert.equal(chat._sanitizeMermaid('A-->B'), 'A-->B');
    assert.equal(chat._sanitizeMermaid(''), '');
  });

  test('keeps at most 15 arrows', () => {
    const edges = Array.from({ length: 20 }, (_, i) => `  N${i}[n${i}] --> N${i + 1}[n${i + 1}]`);
    const out = chat._sanitizeMermaid('graph TD\n' + edges.join('\n'));
    assert.equal(out.split('\n').filter((line) => line.includes('-->')).length, 15);
    assert.ok(out.includes('N14[n14] --> N15[n15]'));
    assert.ok(!out.includes('N15[n15] --> N16[n16]'));
  });
});
