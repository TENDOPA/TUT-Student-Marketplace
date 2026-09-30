import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { LISTINGS, STATS } from '../lib/mockData.js';

export default function Dashboard() {
  const { user, ready, login } = useAuth();

  if (ready && !user) {
    return (
      <main className="page-shell">
        <div className="empty-state">
          <h2 style={{ fontFamily: 'Sora', fontSize: '1.3rem', color: 'var(--ink)' }}>You're browsing in demo mode</h2>
          <p style={{ marginTop: 8 }}>Log in with any TUT-style email to see a personalised dashboard.</p>
          <button className="btn btn-solid" style={{ marginTop: 18 }} onClick={() => login({ email: 'demo.student@tut4life.ac.za' })}>
            Continue as Demo Student
          </button>
        </div>
      </main>
    );
  }

  const myListings = LISTINGS.slice(0, 3);

  return (
    <main className="page-shell">
      <div className="dash-layout">
        <aside className="dash-sidebar">
          <Link to="/dashboard" className="active">Overview</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/messages">Messages</Link>
          <Link to="/notifications">Notifications</Link>
          <Link to="/sell">Sell an item</Link>
        </aside>
        <div>
          <div className="eyebrow">Dashboard</div>
          <h1 className="page-title">Welcome back{user ? `, ${user.name}` : ''}</h1>
          <div className="grid grid-3" style={{ marginTop: 20 }}>
            <div className="card stat-card"><div className="stat-num">{myListings.length}</div><div className="stat-label">Your listings</div></div>
            <div className="card stat-card"><div className="stat-num">2</div><div className="stat-label">Active chats</div></div>
            <div className="card stat-card"><div className="stat-num">{STATS.verifiedSellers}</div><div className="stat-label">Verified sellers on EduTrade</div></div>
          </div>
          <div className="section-head" style={{ marginTop: 32 }}>
            <h2 className="page-title" style={{ fontSize: '1.3rem' }}>Your listings</h2>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Title</th><th>Price</th><th>Status</th><th></th></tr></thead>
              <tbody>
                {myListings.map((l) => (
                  <tr key={l.id}>
                    <td>{l.title}</td>
                    <td>R{l.price.toLocaleString()}</td>
                    <td><span className="status-pill status-ok">Active</span></td>
                    <td><Link to={`/product/${l.id}`} className="btn btn-outline btn-sm">View</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
