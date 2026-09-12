const API_BASE = '/api';

export const api = {
  // Guides
  async getGuides(category = 'all', search = '') {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (search) params.append('search', search);
    const res = await fetch(`${API_BASE}/guides?${params.toString()}`);
    return res.json();
  },

  async getRecipes(category = 'all') {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    const res = await fetch(`${API_BASE}/guides/recipes/all?${params.toString()}`);
    return res.json();
  },

  // Pitfalls
  async getPitfalls(category = 'all', severity = 'all', search = '') {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (severity && severity !== 'all') params.append('severity', severity);
    if (search) params.append('search', search);
    const res = await fetch(`${API_BASE}/pitfalls?${params.toString()}`);
    return res.json();
  },

  // Config Generator
  async generateConfig(configPayload) {
    const res = await fetch(`${API_BASE}/config/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(configPayload)
    });
    return res.json();
  },

  // Validate zerops.yml
  async validateConfig(yamlContent) {
    const res = await fetch(`${API_BASE}/config/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ yamlContent })
    });
    return res.json();
  },

  // Quiz
  async getQuizQuestions() {
    const res = await fetch(`${API_BASE}/quiz`);
    return res.json();
  },

  async submitQuiz(answers) {
    const res = await fetch(`${API_BASE}/quiz/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers })
    });
    return res.json();
  },

  // Community Tips
  async getTips() {
    const res = await fetch(`${API_BASE}/tips`);
    return res.json();
  },

  async upvoteTip(id) {
    const res = await fetch(`${API_BASE}/tips/${id}/upvote`, {
      method: 'POST'
    });
    return res.json();
  },

  async submitTip(tipData) {
    const res = await fetch(`${API_BASE}/tips/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tipData)
    });
    return res.json();
  },

  // Backend Health
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE}/health`);
      return res.json();
    } catch {
      return { status: 'offline' };
    }
  }
};
