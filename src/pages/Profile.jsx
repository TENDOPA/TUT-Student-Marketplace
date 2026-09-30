import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Profile() {
  const { user, login } = useAuth();

  return (
    <main className="page-shell">
      <div className="eyebrow">Account</div>
      <h1 className="page-title">Your profile</h1>

      {!user ? (
        <div className="empty-state">
          <p>No demo session active yet.</p>
          <button className="btn btn-solid" style={{ marginTop: 16 }} onClick={() => login({ email: 'demo.student@tut4life.ac.za' })}>
            Continue as Demo Student
          </button>
        </div>
      ) : (
        <div className="card" style={{ marginTop: 20, maxWidth: 520 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--violet)' }} />
            <div>
              <h3 style={{ fontSize: '1.1rem', textTransform: 'capitalize' }}>{user.name}</h3>
              <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>{user.email}</div>
            </div>
          </div>
          <div className="grid grid-2" style={{ marginTop: 20 }}>
            <div><div style={{ fontSize: '0.74rem', color: 'var(--muted)' }}>Role</div><div style={{ fontWeight: 600, textTransform: 'capitalize' }}>{user.role}</div></div>
            <div><div style={{ fontSize: '0.74rem', color: 'var(--muted)' }}>Verification</div><div style={{ fontWeight: 600, color: user.verified ? 'var(--mint)' : 'var(--coral)' }}>{user.verified ? 'Verified TUT email' : 'Not verified'}</div></div>
          </div>
        </div>
      )}
    </main>
  );
}
