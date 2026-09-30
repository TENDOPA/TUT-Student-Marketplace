import React, { useState } from 'react';
import { LISTINGS, STATS } from '../lib/mockData.js';

const REPORTS = [
  { id: 1, listing: 'Free iPhone 15 — DM for details', reason: 'Suspected scam', status: 'Pending' },
  { id: 2, listing: 'Assignment writing service', reason: 'Possible academic integrity issue', status: 'Pending' },
];

export default function Admin() {
  const [reports, setReports] = useState(REPORTS);

  function resolve(id) {
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'Resolved' } : r)));
  }

  return (
    <main className="page-shell">
      <div className="eyebrow">Moderation</div>
      <h1 className="page-title">Admin dashboard</h1>
      <p className="demo-note">Demo admin view — actions here update local state only, no backend is connected.</p>

      <div className="grid grid-4" style={{ marginTop: 20 }}>
        <div className="card stat-card"><div className="stat-num">{reports.filter((r) => r.status === 'Pending').length}</div><div className="stat-label">Pending reports</div></div>
        <div className="card stat-card"><div className="stat-num">{LISTINGS.length}</div><div className="stat-label">Total listings</div></div>
        <div className="card stat-card"><div className="stat-num">{STATS.activeStudents.toLocaleString()}</div><div className="stat-label">Active students</div></div>
        <div className="card stat-card"><div className="stat-num">{STATS.verifiedSellers}</div><div className="stat-label">Verified sellers</div></div>
      </div>

      <div className="section-head" style={{ marginTop: 32 }}>
        <h2 className="page-title" style={{ fontSize: '1.3rem' }}>Reported listings</h2>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Listing</th><th>Reason</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.id}>
                <td>{r.listing}</td>
                <td>{r.reason}</td>
                <td><span className={`status-pill ${r.status === 'Pending' ? 'status-pending' : 'status-ok'}`}>{r.status}</span></td>
                <td>{r.status === 'Pending' && <button className="btn btn-outline btn-sm" onClick={() => resolve(r.id)}>Mark resolved</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
