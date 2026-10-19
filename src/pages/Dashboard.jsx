import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { LISTINGS } from '../lib/mockData.js';

export default function Dashboard() {
  const { user, ready, login } = useAuth();

  if (ready && !user) {
    return (
      <main className="page-shell">
        <div className="empty-state">
          <h2 style={{ fontFamily: 'Sora', fontSize: '1.3rem', color: 'var(--ink)' }}>
            You're browsing in demo mode
          </h2>
          <p style={{ marginTop: 8 }}>
            Log in with a TUT email or continue as a guest to see a personalised dashboard.
          </p>
          <button
            className="btn btn-solid"
            style={{ marginTop: 18 }}
            onClick={() => login({ email: 'demo.student@tut4life.ac.za' })}
          >
            Continue as Demo TUT Student
          </button>
        </div>
      </main>
    );
  }

  const myListings = LISTINGS.slice(0, 3);
  const isGuest = user?.isGuest || user?.role === 'guest';
  const isVerified = user?.verified;

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
          <h1 className="page-title">
            Welcome back{user ? `, ${user.name}` : ''}
          </h1>

          {/* Status badge */}
          <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {isGuest ? (
              <span
                style={{
                  background: 'rgba(245,166,35,0.15)',
                  color: '#B4720A',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '4px 12px',
                  borderRadius: 100,
                }}
              >
                Guest (other university)
              </span>
            ) : (
              <span
                style={{
                  background: 'rgba(20,184,166,0.12)',
                  color: 'var(--mint)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '4px 12px',
                  borderRadius: 100,
                }}
              >
                {isVerified ? 'Verified TUT student / lecturer' : 'TUT account (demo)'}
              </span>
            )}
          </div>

          <div className="grid grid-3" style={{ marginTop: 20 }}>
            <div className="card stat-card">
              <div className="stat-num">{myListings.length}</div>
              <div className="stat-label">Your listings</div>
            </div>
            <div className="card stat-card">
              <div className="stat-num">2</div>
              <div className="stat-label">Active chats</div>
            </div>
            <div className="card stat-card">
              <div className="stat-num">{isGuest ? 'Limited' : 'Full'}</div>
              <div className="stat-label">Access level</div>
            </div>
          </div>

          <div className="section-head" style={{ marginTop: 32 }}>
            <h2 className="page-title" style={{ fontSize: '1.3rem' }}>Your listings</h2>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {myListings.map((l) => (
                  <tr key={l.id}>
                    <td>{l.title}</td>
                    <td>R{l.price.toLocaleString()}</td>
                    <td>
                      <span className="status-pill status-ok">Active</span>
                    </td>
                    <td>
                      <Link to={`/product/${l.id}`} className="btn btn-outline btn-sm">
                        View
                      </Link>
                    </td>
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