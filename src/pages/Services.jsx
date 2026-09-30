import React from 'react';

const SERVICES = [
  { id: 1, title: 'Statistics & Calculus Peer Tutoring', provider: 'Nomsa T.', price: 'R130/session', desc: '3rd-year student, distinction in both modules.' },
  { id: 2, title: 'Assignment Typing & Formatting', provider: 'Precious K.', price: 'R50/page', desc: 'Fast turnaround, APA/Harvard referencing included.' },
  { id: 3, title: 'Laptop Repair & Software Setup', provider: 'Sipho N.', price: 'From R150', desc: 'Screen swaps, OS reinstalls, and basic hardware fixes.' },
];

export default function Services() {
  return (
    <main className="page-shell">
      <div className="eyebrow">Peer services</div>
      <h1 className="page-title">Student services</h1>
      <p className="page-sub">Tutoring, typing, repairs and other academic services offered by fellow students.</p>
      <div className="grid grid-3" style={{ marginTop: 24 }}>
        {SERVICES.map((s) => (
          <div key={s.id} className="card">
            <h4>{s.title}</h4>
            <div className="listing-price" style={{ marginTop: 8, fontSize: '1rem' }}>{s.price}</div>
            <p style={{ fontSize: '0.84rem', color: 'var(--muted)', marginTop: 8 }}>{s.desc}</p>
            <div className="listing-meta" style={{ marginTop: 10 }}><span>By {s.provider}</span></div>
          </div>
        ))}
      </div>
    </main>
  );
}
