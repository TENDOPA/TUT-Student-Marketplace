import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    setError('');
    setDone(true);
    setTimeout(() => navigate('/login'), 1500);
  }

  return (
    <main className="page-shell" style={{ paddingTop: 20 }}>
      <div className="form-shell">
        <div className="eyebrow">Account recovery</div>
        <h2 className="page-title" style={{ fontSize: '1.6rem' }}>Reset your password</h2>
        {done ? (
          <p style={{ marginTop: 20, color: 'var(--mint)', fontWeight: 600 }}>Password updated (demo) — redirecting to login…</p>
        ) : (
          <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
            <div className="field">
              <label htmlFor="password">New password</label>
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" />
            </div>
            <div className="field">
              <label htmlFor="confirm">Confirm password</label>
              <input id="confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Repeat password" />
              {error && <div className="field-error">{error}</div>}
            </div>
            <button type="submit" className="btn btn-solid btn-block">Update Password</button>
          </form>
        )}
      </div>
    </main>
  );
}
