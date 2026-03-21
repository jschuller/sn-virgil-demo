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