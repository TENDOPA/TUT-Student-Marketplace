import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="page-shell">
      <div className="empty-state">
        <h2 style={{ fontFamily: 'Sora', fontSize: '1.6rem', color: 'var(--ink)' }}>Page not found</h2>
        <p style={{ marginTop: 10 }}>The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-solid" style={{ marginTop: 18 }}>Back to Home</Link>
      </div>
    </main>
  );
}
