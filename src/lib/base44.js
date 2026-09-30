// Isolated Base44 integration. Nothing else in the app imports Base44
// directly — every call goes through the functions here, and every one of
// them is wrapped so a missing config, a network error, or a 401/403 falls
// back to local demo data instead of throwing. That guarantees a Base44
// outage (or simply not having it configured) can never blank the site.

const APP_ID = import.meta.env.VITE_BASE44_APP_ID || '';
const API_URL = import.meta.env.VITE_BASE44_API_URL || '';
const IS_CONFIGURED = Boolean(APP_ID && API_URL);

async function safeFetch(path, options = {}) {
  if (!IS_CONFIGURED) return { ok: false, reason: 'not_configured' };
  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    });
    if (!res.ok) {
      // Covers 401/403/5xx — never throw, just report failure upward
      return { ok: false, reason: `http_${res.status}` };
    }
    const data = await res.json();
    return { ok: true, data };
  } catch (err) {
    return { ok: false, reason: 'network_error' };
  }
}

export const base44 = {
  isConfigured: IS_CONFIGURED,

  async askAssistant(prompt) {
    const result = await safeFetch(`/apps/${APP_ID}/assistant`, {
      method: 'POST',
      body: JSON.stringify({ prompt }),
    });
    if (result.ok) return result.data.reply;
    return null; // caller (AIAssistant.jsx) falls back to local demo logic
  },

  async fetchListings() {
    const result = await safeFetch(`/apps/${APP_ID}/listings`);
    if (result.ok) return result.data;
    return null; // caller falls back to mockData.js
  },
};
