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
          <button
            className="btn btn-solid"
            style={{ marginTop: 16 }}
            onClick={() => login({ email: 'demo.student@tut4life.ac.za' })}
          >
            Continue as Demo TUT Student
          </button>
        </div>
      ) : (
        <div className="card" style={{ marginTop: 20, maxWidth: 520 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'var(--violet)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '1.2rem',
              }}
            >
              {(user.name || 'S')[0].toUpperCase()}
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', textTransform: 'capitalize' }}>
                {user.name}
              </h3>
              <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
                {user.email}
              </div>
            </div>
          </div>

          <div className="grid grid-2" style={{ marginTop: 20 }}>
            <div>
              <div style={{ fontSize: '0.74rem', color: 'var(--muted)' }}>Role</div>
              <div style={{ fontWeight: 600, textTransform: 'capitalize' }}>
                {user.role === 'guest' ? 'Guest' : user.role}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.74rem', color: 'var(--muted)' }}>Status</div>
              <div
                style={{
                  fontWeight: 600,
                  color: user.isGuest || user.role === 'guest'
                    ? '#B4720A'
                    : user.verified
                    ? 'var(--mint)'
                    : 'var(--coral)',
                }}
              >
                {user.isGuest || user.role === 'guest'
                  ? 'Guest (other university)'
                  : user.verified
                  ? 'Verified TUT email'
                  : 'TUT account (demo)'}
              </div>
            </div>
          </div>

          {(user.isGuest || user.role === 'guest') && (
            <p
              style={{
                marginTop: 16,
                fontSize: '0.82rem',
                color: 'var(--muted)',
                lineHeight: 1.5,
              }}
            >
              Guests can browse listings. Full selling and messaging features are limited in this demo.
            </p>
          )}
        </div>
      )}
    </main>
  );
}