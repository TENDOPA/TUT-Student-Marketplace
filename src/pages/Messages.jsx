import React, { useState } from 'react';

const THREADS = [
  { id: 1, name: 'Katekani S.', listing: 'Dell Latitude 5410', last: 'Sounds good, see you at the library!', messages: [
    { from: 'them', text: 'Hi! Yes, still available.' },
    { from: 'me', text: 'Great, could we meet at the library steps tomorrow?' },
    { from: 'them', text: 'Sounds good, see you at the library!' },
  ] },
  { id: 2, name: 'Lindiwe M.', listing: 'Engineering Mathematics N4', last: 'It\u2019s R180, negotiable slightly.', messages: [
    { from: 'them', text: 'Hi, the textbook is still up for grabs.' },
    { from: 'them', text: 'It\u2019s R180, negotiable slightly.' },
  ] },
];

export default function Messages() {
  const [activeId, setActiveId] = useState(THREADS[0].id);
  const [draft, setDraft] = useState('');
  const [threads, setThreads] = useState(THREADS);
  const active = threads.find((t) => t.id === activeId);

  function send(e) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setThreads((prev) => prev.map((t) => (t.id === activeId ? { ...t, messages: [...t.messages, { from: 'me', text }], last: text } : t)));
    setDraft('');
  }

  return (
    <main className="page-shell">
      <div className="eyebrow">Inbox</div>
      <h1 className="page-title">Messages</h1>
      <div className="dash-layout" style={{ marginTop: 20, gridTemplateColumns: '280px 1fr' }}>
        <div className="dash-sidebar" style={{ padding: 0 }}>
          {threads.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveId(t.id)}
              style={{
                width: '100%', textAlign: 'left', padding: 14, border: 'none',
                background: t.id === activeId ? 'var(--bg)' : 'transparent', borderBottom: '1px solid var(--line)',
              }}
            >
              <strong style={{ fontSize: '0.88rem' }}>{t.name}</strong>
              <div style={{ fontSize: '0.76rem', color: 'var(--muted)', marginTop: 2 }}>{t.listing}</div>
              <div style={{ fontSize: '0.76rem', color: 'var(--muted)', marginTop: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.last}</div>
            </button>
          ))}
        </div>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: 480, padding: 0 }}>
          <div style={{ padding: 16, borderBottom: '1px solid var(--line)', fontWeight: 700 }}>{active.name} <span style={{ color: 'var(--muted)', fontWeight: 400, fontSize: '0.8rem' }}>· {active.listing}</span></div>
          <div style={{ flex: 1, padding: 18, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {active.messages.map((m, i) => (
              <div key={i} style={{
                maxWidth: '70%', padding: '10px 14px', borderRadius: 14, fontSize: '0.86rem',
                alignSelf: m.from === 'me' ? 'flex-end' : 'flex-start',
                background: m.from === 'me' ? 'var(--violet)' : 'var(--bg)',
                color: m.from === 'me' ? '#fff' : 'var(--ink)',
              }}>{m.text}</div>
            ))}
          </div>
          <form onSubmit={send} style={{ display: 'flex', gap: 8, padding: 14, borderTop: '1px solid var(--line)' }}>
            <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Type a message…" style={{ flex: 1, padding: '10px 14px', borderRadius: 100, border: '1px solid var(--line)' }} />
            <button type="submit" className="btn btn-solid btn-sm">Send</button>
          </form>
        </div>
      </div>
    </main>
  );
}
