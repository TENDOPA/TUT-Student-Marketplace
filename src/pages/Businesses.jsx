import React from 'react';

const BUSINESSES = [
  { id: 1, name: 'Campus Print Hub', desc: 'Student-run printing and binding service near the ICT building.' },
  { id: 2, name: 'CodeCraft Tutors', desc: 'A small student collective offering coding bootcamp-style tutoring.' },
  { id: 3, name: 'ResEats', desc: 'Homemade meal delivery run by students, for students, at Soshanguve res.' },
];

export default function Businesses() {
  return (
    <main className="page-shell">
      <div className="eyebrow">Student-run</div>
      <h1 className="page-title">Student businesses</h1>
      <p className="page-sub">Small ventures started by TUT students — support your campus community.</p>
      <div className="grid grid-3" style={{ marginTop: 24 }}>
        {BUSINESSES.map((b) => (
          <div key={b.id} className="card">
            <h4>{b.name}</h4>
            <p style={{ fontSize: '0.84rem', color: 'var(--muted)', marginTop: 8 }}>{b.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
