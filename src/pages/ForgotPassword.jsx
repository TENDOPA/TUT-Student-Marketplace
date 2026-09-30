import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setSent(true);
  }

  return (
    <main className="page-shell" style={{ paddingTop: 20 }}>
      <div className="form-shell">
        <div className="eyebrow">Account recovery</div>
        <h2 className="page-title" style={{ fontSize: '1.6rem' }}>Forgot your password?</h2>
        <p className="page-sub" style={{ fontSize: '0.86rem' }}>Enter your TUT email and we'll simulate sending a reset link (demo only).</p>
        {sent ? (
          <div className="card" style={{ marginTop: 24, background: 'var(--bg)' }}>
            <p style={{ fontSize: '0.9rem' }}>If an account exists for <strong>{email}</strong>, a reset link has been sent. In this demo, continue straight to <Link to="/reset-password" style={{ color: 'var(--violet)', fontWeight: 600 }}>Reset Password</Link>.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
            <div className="field">
              <label htmlFor="email">TUT email</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="s123456789@tut4life.ac.za" required />
            </div>
            <button type="submit" className="btn btn-solid btn-block">Send Reset Link</button>
          </form>
        )}
        <div className="auth-links">
          <Link to="/login">Back to login</Link>
        </div>
      </div>
    </main>
  );
}
