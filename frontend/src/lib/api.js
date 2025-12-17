/**
 * Cliente API para comunicação com o backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

class APIClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
        throw new Error(error.detail || `Erro ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error;
    }
  }

  // Gera uma desculpa
  async generateExcuse(data) {
    return this.request('/generate', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Obtém tons disponíveis
  async getTones() {
    return this.request('/tones');
  }

  // Obtém roles sugeridos
  async getRoles() {
    return this.request('/roles');
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export const apiClient = new APIClient(API_BASE_URL);
