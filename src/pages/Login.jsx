import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('tut'); // 'tut' or 'guest'
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }
    setError('');

    // Demo login only — no real password check
    login({
      email,
      role: accountType === 'tut' ? 'student' : 'guest',
      isGuest: accountType === 'guest',
    });
    navigate('/dashboard');
  }

  return (
    <main className="page-shell" style={{ paddingTop: 20 }}>
      <div className="form-shell">
        <div className="eyebrow">Welcome back</div>
        <h2 className="page-title" style={{ fontSize: '1.6rem' }}>Log in to EduTrade</h2>
        <p className="page-sub" style={{ fontSize: '0.86rem' }}>
          Demo login only. No real account is created. Data stays in your browser.
        </p>

        <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
          {/* Account type */}
          <div className="field">
            <label>I am logging in as</label>
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
            >
              <option value="tut">TUT student or lecturer</option>
              <option value="guest">Guest from another university</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="email">
              {accountType === 'tut' ? 'TUT student or staff email' : 'University email (guest)'}
            </label>
            <input
              id="email"
              type="email"
              placeholder={
                accountType === 'tut'
                  ? 's123456789@tut4life.ac.za'
                  : 'you@wits.ac.za or you@uj.ac.za'
              }
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="field-hint">
              {accountType === 'tut'
                ? 'Use your @tut4life.ac.za or @tut.ac.za email.'
                : 'Guests can browse but have limited features in this demo.'}
            </div>
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <div className="field-error">{error}</div>}
          </div>

          <button type="submit" className="btn btn-solid btn-block">
            Log In
          </button>
        </form>

        <div className="auth-links">
          <Link to="/forgot-password">Forgot password?</Link>
          <Link to="/register">Create an account</Link>
        </div>
      </div>
    </main>
  );
}