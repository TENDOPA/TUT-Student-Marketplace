import React from 'react';
import { CAMPUSES } from '../lib/mockData.js';

const ROOMS = [
  { id: 1, title: 'Single Room Sublet — 2nd Semester', campus: 'Soshanguve South', price: 2800, desc: '5 min walk to campus gate, secure complex, wifi included.' },
  { id: 2, title: 'Shared 2-Bed Apartment', campus: 'Pretoria (Main)', price: 3400, desc: 'Looking for a quiet roommate, walking distance to res block C.' },
  { id: 3, title: 'Bachelor Flat Near Arcadia Campus', campus: 'Arcadia', price: 3900, desc: 'Fully furnished, own bathroom and kitchenette.' },
];

export default function Accommodation() {
  return (
    <main className="page-shell">
      <div className="eyebrow">Housing</div>
      <h1 className="page-title">Student accommodation</h1>
      <p className="page-sub">Rooms, sublets and roommate listings shared by verified TUT students.</p>
      <div className="grid grid-3" style={{ marginTop: 24 }}>
        {ROOMS.map((r) => (
          <div key={r.id} className="card">
            <div className="listing-thumb" />
            <h4 style={{ marginTop: 12 }}>{r.title}</h4>
            <div className="listing-price" style={{ marginTop: 6 }}>R{r.price.toLocaleString()}/mo</div>
            <p style={{ fontSize: '0.84rem', color: 'var(--muted)', marginTop: 8 }}>{r.desc}</p>
            <div className="listing-meta" style={{ marginTop: 10 }}><span>📍 {r.campus}</span></div>
          </div>
        ))}
      </div>
      <p style={{ marginTop: 24, fontSize: '0.8rem', color: 'var(--muted)' }}>Covers all campuses: {CAMPUSES.join(', ')}.</p>
    </main>
  );
}
