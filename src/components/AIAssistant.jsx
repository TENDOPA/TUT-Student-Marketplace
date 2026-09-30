import React, { useState } from 'react';
import { base44 } from '../lib/base44.js';
import { LISTINGS, CATEGORIES } from '../lib/mockData.js';

// Local, dependency-free fallback logic. This is what actually answers
// every query in demo mode (no Base44 configured), and it's also what
// answers when Base44 IS configured but fails/times out/401s — so the
// assistant (and the page around it) never breaks.
function localAnswer(promptRaw) {
  const prompt = promptRaw.toLowerCase();

  if (/(how|what).*(work|use|start)/.test(prompt)) {
    return 'EduTrade works in 4 steps: register with your TUT email, browse or list an item, message the other student to arrange details, then meet on campus or arrange delivery. Want me to walk you to "Sell an Item"?';
  }
  if (/(sell|list|create).*(item|listing|product)/.test(prompt)) {
    return 'To list something: go to "Sell an Item", pick a category (laptops, phones, tablets, textbooks, study materials, calculators, or electronics), add a price, condition and campus, then submit.';
  }
  if (/(safe|safety|scam|trust)/.test(prompt)) {
    return "Safety tips: meet in public campus spots, verify the item before paying, never send money before seeing the product, and use the in-app report button for anything suspicious.";
  }
  if (/(categor)/.test(prompt)) {
    return `EduTrade covers: ${CATEGORIES.map((c) => c.name).join(', ')}.`;
  }

  const matches = LISTINGS.filter((l) => {
    if (l.title.toLowerCase().includes(prompt)) return true;
    return CATEGORIES.some((c) => c.id === l.category && prompt.includes(c.name.toLowerCase()));
  });
  if (matches.length) {
    const top = matches.slice(0, 3);
    return `Found ${matches.length} match${matches.length !== 1 ? 'es' : ''}: ${top
      .map((l) => `${l.title} — R${l.price.toLocaleString()}`)
      .join(' · ')}. Check the Marketplace page to see them all.`;
  }
  return "I couldn't find an exact match — try naming a category like laptops, textbooks, or calculators, or browse the Marketplace page directly.";
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [lines, setLines] = useState([
    { who: 'bot', text: "Hi! I'm the EduTrade assistant. Ask me to find something, or how the marketplace works." },
  ]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    setLines((prev) => [...prev, { who: 'user', text }]);
    setInput('');
    setLoading(true);

    let reply = null;
    let usedFallback = false;
    try {
      reply = await base44.askAssistant(text);
    } catch {
      reply = null;
    }
    if (!reply) {
      reply = localAnswer(text);
      usedFallback = !base44.isConfigured ? false : true;
    }

    setLines((prev) => {
      const next = [...prev, { who: 'bot', text: reply }];
      if (usedFallback) {
        next.push({ who: 'offline', text: 'Live assistant is unavailable right now — answered from demo data instead.' });
      }
      return next;
    });
    setLoading(false);
  }

  return (
    <div className="ai-widget">
      {open && (
        <div className="ai-panel">
          <div className="ai-panel-head">
            <span>💬 EduTrade Assistant</span>
            <button onClick={() => setOpen(false)} aria-label="Close">✕</button>
          </div>
          <div className="ai-body">
            {lines.map((l, i) => (
              <div key={i} className={`ai-line ${l.who}`}>{l.text}</div>
            ))}
            {loading && <div className="ai-line bot">Thinking…</div>}
          </div>
          <form className="ai-input-row" onSubmit={handleSubmit}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask EduTrade AI…"
            />
            <button type="submit" aria-label="Send">➤</button>
          </form>
        </div>
      )}
      <button className="ai-fab" onClick={() => setOpen((v) => !v)} aria-label="Open assistant">✨</button>
    </div>
  );
}
