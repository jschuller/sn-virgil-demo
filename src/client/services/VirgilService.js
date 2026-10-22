/**
 * One WDF capability line, as /plutus/history returns it (fields of x_9418_virgil_wdf_scan_line without the
 * x_9418_virgil_ prefix). PlutusScanner.scan() must return lines in the same shape.
 *
 * @typedef {Object} PlutusLine
 * @property {string} capability_id
 * @property {string} capability_label
 * @property {boolean} detected
 * @property {number} usage_value
 * @property {string} meter_unit
 * @property {number} credits_per_unit
 * @property {number} credits_consumed
 * @property {string} evidence
 */

/**
 * @typedef {Object} PlutusScanResult
 * @property {string} [status] 'stub' while the demo's PlutusScanner is a placeholder
 * @property {string} [message]
 * @property {number} total_credits
 * @property {number} capabilities_detected
 * @property {PlutusLine[]} lines
 */

export class VirgilService {
  constructor() {
    this.baseUrl = '/api/x_9418_virgil/virgil_api';
  }

  async runMinosScan() {
    try {
      const response = await fetch(`${this.baseUrl}/minos/scan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        },
        body: JSON.stringify({})
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error running Minos scan:', error);
      throw error;
    }
  }

  /** @returns {Promise<PlutusScanResult>} */
  async runPlutusScan() {
    try {
      const response = await fetch(`${this.baseUrl}/plutus/scan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        },
        body: JSON.stringify({})
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error running Plutus scan:', error);
      throw error;
    }
  }

  async askVirgil(query, thinking = false) {
    try {
      const response = await fetch(`${this.baseUrl}/virgil/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        },
        body: JSON.stringify({ 
          query: query,
          thinking: thinking
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error getting Virgil chat response:', error);
      throw error;
    }
  }
}