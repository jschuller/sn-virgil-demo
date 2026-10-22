import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { seedRecords, stubGlideRecord } from './helpers/seed-records.mjs';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');

// Loads the Script Include with stub Glide globals. `records` feeds the stub GlideRecord that
// _loadRulesFromTable reads; `warnings` collects gs.warn calls.
function loadRuleEngine({ records = [], warnings = [] } = {}) {
  const context = {
    Class: { create: () => function () {} },
    gs: { info() {}, debug() {}, warn: (message) => warnings.push(message) },
    GlideRecord: stubGlideRecord({ x_9418_virgil_minos_rule: records }),
  };
  vm.createContext(context);
  vm.runInContext(read('../src/server/MinosRuleEngine.server.js'), context);
  return Object.create(vm.runInContext('MinosRuleEngine', context).prototype);
}

// The vm builds results with its own Object prototype; compare plain copies.
const plain = (value) => JSON.parse(JSON.stringify(value));

const model = (overrides = {}) => ({
  active_tables: {},
  cmdb_stats: {},
  instance_properties: {},
  active_node_ids: [],
  installed_plugins: {},
  mid_servers: [],
  integration_flows_count: 0,
  ...overrides,
});

describe('check primitives', () => {
  const engine = loadRuleEngine();
  const check = (c, m) => plain(engine._evalCheck(c, model(m)));

  test('node and plugin presence', () => {
    const m = { active_node_ids: ['itsm'], installed_plugins: { 'com.snc.change': true } };
    assert.equal(check({ node_absent: 'spm' }, m).fired, true);
    assert.equal(check({ node_absent: 'itsm' }, m).fired, false);
    assert.equal(check({ node_active: 'itsm' }, m).fired, true);
    assert.equal(check({ node_active: 'spm' }, m).fired, false);
    assert.equal(check({ plugin_absent: 'com.snc.grc' }, m).fired, true);
    assert.equal(check({ plugin_present: 'com.snc.change' }, m).fired, true);
    assert.equal(check({ plugin_present: 'com.snc.grc' }, m).fired, false);
  });

  test('table comparisons record the counts they read, -1 for an unscanned table', () => {
    const m = { active_tables: { incident: 10, problem: 4, empty: 0 } };
    assert.deepEqual(check({ table_gt: { table: 'incident', value: 9 } }, m), { fired: true, evidence: { incident_count: 10 } });
    assert.equal(check({ table_gt: { table: 'incident', value: 10 } }, m).fired, false);
    assert.equal(check({ table_lte: { table: 'incident', value: 10 } }, m).fired, true);
    assert.equal(check({ table_eq: { table: 'empty', value: 0 } }, m).fired, true);
    assert.deepEqual(check({ table_lte: { table: 'missing', value: 0 } }, m), { fired: true, evidence: { missing_count: -1 } });
    assert.equal(check({ table_between: { table: 'problem', min: 4, below: 5 } }, m).fired, true);
    assert.equal(check({ table_between: { table: 'incident', min: 4, below: 10 } }, m).fired, false);
    assert.deepEqual(check({ table_exceeds: { table: 'incident', other: 'problem' } }, m), {
      fired: true,
      evidence: { incident_count: 10, problem_count: 4 },
    });
  });

  test('table_ratio_below fires below the ratio and never when the other table is empty', () => {
    const m = { active_tables: { flows: 4, rest: 10, none: 0 } };
    assert.equal(check({ table_ratio_below: { table: 'flows', other: 'rest', ratio: 0.5 } }, m).fired, true);
    assert.equal(check({ table_ratio_below: { table: 'flows', other: 'rest', ratio: 0.4 } }, m).fired, false);
    assert.equal(check({ table_ratio_below: { table: 'flows', other: 'none', ratio: 0.5 } }, m).fired, false);
  });

  test('CMDB, property and infrastructure checks', () => {
    const m = {
      cmdb_stats: { total_cis: 50, has_discovery: false },
      instance_properties: { 'glide.sys.domain.enabled': 'TRUE' },
      mid_servers: [{ name: 'mid1' }],
      integration_flows_count: 0,
    };
    assert.deepEqual(check({ cmdb_below: { field: 'total_cis', value: 100 } }, m), { fired: true, evidence: { total_cis: 50 } });
    assert.equal(check({ cmdb_gt: { field: 'total_cis', value: 50 } }, m).fired, false);
    assert.equal(check({ cmdb_gt: { field: 'unknown', value: -1 } }, m).fired, true, 'a missing stat counts as 0');
    assert.equal(check({ cmdb_flag_false: 'has_discovery' }, m).fired, true);
    assert.equal(check({ property_neq: { property: 'glide.sys.domain.enabled', value: 'true' } }, m).fired, false, 'case-insensitive');
    assert.deepEqual(check({ property_neq: { property: 'unset.prop', value: 'true' } }, m), {
      fired: true,
      evidence: { 'unset.prop': '(not set)' },
    });
    assert.deepEqual(check({ mid_server_eq: 0 }, m), { fired: false, evidence: { mid_servers: 1 } });
    assert.deepEqual(check({ flow_count_eq: 0 }, m), { fired: true, evidence: { integration_flows: 0 } });
  });

  test('an unknown check type does not fire and is logged', () => {
    const warnings = [];
    const result = plain(loadRuleEngine({ warnings })._evalCheck({ table_huge: { table: 'incident' } }, model()));
    assert.deepEqual(result, { fired: false, evidence: {} });
    assert.match(warnings[0], /Unknown check type: \["table_huge"\]/);
  });
});

describe('combinators', () => {
  const engine = loadRuleEngine();
  const block = (b, m) => plain(engine._evalBlock(b, model(m)));
  const m = { active_tables: { incident: 10, change_request: 0 }, active_node_ids: ['itsm'] };

  test('all fires only when every check fires and stops at the first miss', () => {
    assert.equal(block({ all: [{ node_active: 'itsm' }, { table_gt: { table: 'incident', value: 5 } }] }, m).fired, true);
    const miss = block({ all: [{ table_gt: { table: 'change_request', value: 0 } }, { table_gt: { table: 'incident', value: 5 } }] }, m);
    assert.deepEqual(miss, { fired: false, evidence: { change_request_count: 0 } });
  });

  test('any fires on the first check that fires', () => {
    const hit = block({ any: [{ table_gt: { table: 'change_request', value: 0 } }, { table_gt: { table: 'incident', value: 5 } }] }, m);
    assert.deepEqual(hit, { fired: true, evidence: { change_request_count: 0, incident_count: 10 } });
    assert.equal(block({ any: [{ node_active: 'spm' }, { node_active: 'grc' }] }, m).fired, false);
  });

  test('nested all/any inside a check', () => {
    const nested = { all: [{ node_absent: 'spm' }, { any: [{ node_active: 'csm' }, { node_active: 'itsm' }] }] };
    assert.equal(block(nested, m).fired, true);
  });

  test('streams_covered_below counts the streams that fire', () => {
    const streams = {
      S2P: { any: [{ node_active: 'spm' }] },
      D2C: { any: [{ node_active: 'itsm' }] },
      R2D: { any: [{ table_gt: { table: 'change_request', value: 0 } }] },
    };
    assert.deepEqual(block({ streams_covered_below: { threshold: 2, streams } }, m), {
      fired: true,
      evidence: { covered_count: 1, covered_streams: 'D2C' }, // the streams' own evidence is not kept
    });
    assert.equal(block({ streams_covered_below: { threshold: 1, streams } }, m).fired, false);
    assert.equal(block({ streams_covered_below: { threshold: 1, streams } }, {}).fired, true, "'none' covered fires");
  });
});

test('_formatMessage fills every placeholder from the evidence and leaves unknown ones', () => {
  const engine = loadRuleEngine();
  assert.equal(
    engine._formatMessage('{incident_count} incidents, {incident_count} again, {x}', { incident_count: 1234 }),
    '1,234 incidents, 1,234 again, {x}'
  );
  assert.equal(engine._formatMessage('', { a: 1 }), '');
  assert.equal(engine._formatMessage('stream: {covered_streams}', { covered_streams: 'none' }), 'stream: none');
});

// ── The seeded rules (src/fluent/records/seed-data.now.ts) ────────────────────

const KNOWN_CHECKS = new Set([
  'node_absent', 'node_active', 'plugin_absent', 'plugin_present', 'table_lte', 'table_eq', 'table_gt',
  'table_between', 'table_exceeds', 'table_ratio_below', 'cmdb_below', 'cmdb_gt', 'cmdb_flag_false',
  'property_neq', 'mid_server_eq', 'flow_count_eq', 'all', 'any',
]);

// The check types a block uses and the evidence keys it can produce.
function walk(block, found = { types: [], keys: new Set() }) {
  if (block.streams_covered_below) {
    found.keys.add('covered_count').add('covered_streams');
    Object.values(block.streams_covered_below.streams).forEach((stream) => walk(stream, found));
    return found;
  }
  for (const [type, arg] of Object.entries(block)) {
    found.types.push(type);
    if (type === 'all' || type === 'any') arg.forEach((child) => walk(child, found));
    else if (type.startsWith('table_')) [arg.table, arg.other].filter(Boolean).forEach((t) => found.keys.add(`${t}_count`));
    else if (type === 'cmdb_below' || type === 'cmdb_gt') found.keys.add(arg.field);
    else if (type === 'cmdb_flag_false') found.keys.add(arg);
    else if (type === 'property_neq') found.keys.add(arg.property);
    else if (type === 'mid_server_eq') found.keys.add('mid_servers');
    else if (type === 'flow_count_eq') found.keys.add('integration_flows');
  }
  return found;
}

describe('seeded rules', () => {
  const rules = seedRecords('x_9418_virgil_minos_rule');

  test('are found, with unique ids', () => {
    assert.ok(rules.length >= 35, `found ${rules.length}`);
    assert.equal(new Set(rules.map((r) => r.rule_id)).size, rules.length);
  });

  for (const rule of rules) {
    test(`${rule.rule_id}: eval_json uses known checks; templates use evidence it produces`, () => {
      const evalBlock = JSON.parse(rule.eval_json);
      const { types, keys } = walk(evalBlock);
      assert.ok(types.length > 0 || evalBlock.streams_covered_below, 'has at least one check');
      assert.deepEqual(types.filter((t) => !KNOWN_CHECKS.has(t)), []);
      assert.ok(['critical', 'high', 'medium', 'low'].includes(rule.severity), rule.severity);
      for (const text of [rule.message_template, rule.recommendation]) {
        const placeholders = Array.from((text || '').matchAll(/\{(\w[\w.]*)\}/g), (m) => m[1]);
        assert.deepEqual(placeholders.filter((p) => !keys.has(p)), [], `placeholders in: ${text}`);
      }
      JSON.parse(rule.tags || '[]');
      JSON.parse(rule.recommended_nodes || '{}');
    });
  }

  test('load through _loadRulesFromTable and evaluate without unknown checks', () => {
    const warnings = [];
    const engine = loadRuleEngine({ records: rules, warnings });
    engine.rules = engine._loadRulesFromTable();
    assert.equal(engine.rules.length, rules.length);
    for (const m of [
      model(),
      model({
        active_node_ids: ['itsm', 'incident', 'csm', 'discovery', 'integration_hub'],
        active_tables: { incident: 6000, change_request: 900, sys_rest_message: 20, sys_hub_flow: 2, wf_workflow: 30 },
        cmdb_stats: { total_cis: 5000, has_discovery: true },
        mid_servers: [{}],
      }),
    ]) {
      const { findings } = plain(engine.evaluate(m));
      assert.ok(findings.length > 0);
      for (const f of findings) assert.ok(rules.some((r) => r.rule_id === f.rule_id));
    }
    assert.deepEqual(warnings, []);
  });

  test('IT4IT-S2P-001 fires without SPM on a busy instance, and not with SPM', () => {
    const engine = loadRuleEngine({ records: rules.filter((r) => r.rule_id === 'IT4IT-S2P-001') });
    engine.rules = engine._loadRulesFromTable();
    const busy = { active_tables: { change_request: 600, incident: 2500 } };
    const { findings } = plain(engine.evaluate(model(busy)));
    assert.equal(findings.length, 1);
    assert.equal(findings[0].severity, 'high');
    // Only the prefix: `any` stops at the first check that fires, so {incident_count} is left unfilled here.
    // That is current engine behaviour, recorded rather than changed by these tests.
    assert.match(findings[0].message, /^No SPM but 600 changes/);
    assert.equal(plain(engine.evaluate(model({ ...busy, active_node_ids: ['spm'] }))).findings.length, 0);
  });

  test('INT-ERR-001 fires only when there is no MID server', () => {
    const engine = loadRuleEngine({ records: rules.filter((r) => r.rule_id === 'INT-ERR-001') });
    engine.rules = engine._loadRulesFromTable();
    assert.equal(plain(engine.evaluate(model())).findings.length, 1);
    assert.equal(plain(engine.evaluate(model({ mid_servers: [{ name: 'mid1' }] }))).findings.length, 0);
  });
});

test('_loadRulesFromTable skips a rule whose eval_json is invalid and maps the columns', () => {
  const warnings = [];
  const engine = loadRuleEngine({
    warnings,
    records: [
      { rule_id: 'BAD', eval_json: '{not json' },
      { rule_id: 'OK', name: 'ok', eval_json: '{"mid_server_eq": 0}', tags: '["a"]', recommended_nodes: 'nope' },
    ],
  });
  const rules = plain(engine._loadRulesFromTable());
  assert.equal(rules.length, 1);
  assert.equal(rules[0].id, 'OK');
  assert.equal(rules[0].severity, 'medium', 'default severity');
  assert.deepEqual(rules[0].tags, ['a']);
  assert.deepEqual(rules[0].recommended_nodes, {}, 'invalid JSON falls back');
  assert.deepEqual(rules[0].eval, { mid_server_eq: 0 });
  assert.match(warnings[0], /Invalid eval_json for rule BAD/);
});
