import React, { useState } from 'react';
import { FAQS } from '../lib/mockData.js';

export default function About() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <main className="page-shell">
      <div className="eyebrow">About</div>
      <h1 className="page-title">About EduTrade</h1>
      <p className="page-sub">
        EduTrade is a JGA (group project) prototype for a marketplace built only for the TUT
        community — students and lecturers buying, selling and connecting over academic and
        student-related technology. It is not an official TUT platform.
      </p>

      <div className="section-head" style={{ marginTop: 40 }}>
        <div className="eyebrow">Questions</div>
        <h2 className="page-title" style={{ fontSize: '1.4rem' }}>Frequently asked questions</h2>
      </div>
      <div className="card" style={{ padding: '4px 20px' }}>
        {FAQS.map((f, i) => (
          <div key={i} className="faq-item" onClick={() => setOpenIdx(openIdx === i ? -1 : i)}>
            <div className="faq-q">{f.q}<span>{openIdx === i ? '−' : '+'}</span></div>
            {openIdx === i && <div className="faq-a">{f.a}</div>}
          </div>
        ))}
      </div>
    </main>
  );
}
