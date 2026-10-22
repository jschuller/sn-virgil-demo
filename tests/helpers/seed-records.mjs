import { readFileSync } from 'node:fs';
import vm from 'node:vm';

/**
 * The data of every Record() for `table` in src/fluent/records/seed-data.now.ts, as plain values with the
 * x_9418_virgil_ prefix removed. Values are the file's own JS literals (strings, booleans, numbers).
 */
export function seedRecords(table) {
  return readFileSync(new URL('../../src/fluent/records/seed-data.now.ts', import.meta.url), 'utf8')
    .split(/\nRecord\(\{/)
    .filter((chunk) => chunk.includes(`table: '${table}'`))
    .map((chunk) => {
      const data = {};
      for (const [, key, literal] of chunk.matchAll(/^\s+x_9418_virgil_(\w+): ('(?:[^'\\]|\\.)*'|true|false|-?\d+),?$/gm)) {
        data[key] = vm.runInNewContext(literal);
      }
      return data;
    });
}

/** A stub GlideRecord over `tables` ({ tableName: [record data] }); queries return every row. */
export function stubGlideRecord(tables) {
  return function GlideRecord(table) {
    const rows = tables[table] || [];
    let index = -1;
    this.addQuery = () => {};
    this.orderBy = () => {};
    this.query = () => {};
    this.next = () => ++index < rows.length;
    this.getValue = (field) => {
      const value = rows[index][field.replace(/^x_9418_virgil_/, '')];
      return value === undefined || value === null ? null : String(value);
    };
    this.getUniqueValue = () => `sys_${index}`;
  };
}
