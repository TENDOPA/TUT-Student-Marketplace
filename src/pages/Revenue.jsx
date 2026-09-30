import React from 'react';

export default function Revenue() {
  return (
    <main className="page-shell">
      <div className="eyebrow">Business model</div>
      <h1 className="page-title">Revenue &amp; sustainability</h1>
      <p className="page-sub">How EduTrade could sustain itself if developed beyond this JGA prototype.</p>
      <div className="grid grid-3" style={{ marginTop: 24 }}>
        <div className="card">
          <h4>Featured listings</h4>
          <p style={{ fontSize: '0.84rem', color: 'var(--muted)', marginTop: 8 }}>Sellers pay a small fee to feature a listing at the top of category pages for 48 hours.</p>
        </div>
        <div className="card">
          <h4>Verified badge (optional)</h4>
          <p style={{ fontSize: '0.84rem', color: 'var(--muted)', marginTop: 8 }}>A one-time verification fee for lecturers or off-campus vendors wanting a trust badge.</p>
        </div>
        <div className="card">
          <h4>Campus partnerships</h4>
          <p style={{ fontSize: '0.84rem', color: 'var(--muted)', marginTop: 8 }}>TUT faculties or societies could sponsor category pages (e.g. ICT Faculty on Laptops).</p>
        </div>
      </div>
      <p className="demo-note" style={{ marginTop: 20 }}>This page is illustrative for the JGA presentation — no payment processing is implemented.</p>
    </main>
  );
}
