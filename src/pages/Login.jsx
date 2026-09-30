import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }
    setError('');
    login({ email });
    navigate('/dashboard');
  }

  return (
    <main className="page-shell" style={{ paddingTop: 20 }}>
      <div className="form-shell">
        <div className="eyebrow">Welcome back</div>
        <h2 className="page-title" style={{ fontSize: '1.6rem' }}>Log in to EduTrade</h2>
        <p className="page-sub" style={{ fontSize: '0.86rem' }}>Demo login — any TUT-style email works, no real account is created.</p>
        <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
          <div className="field">
            <label htmlFor="email">TUT email</label>
            <input id="email" type="email" placeholder="s123456789@tut4life.ac.za" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && <div className="field-error">{error}</div>}
          </div>
          <button type="submit" className="btn btn-solid btn-block">Log In</button>
        </form>
        <div className="auth-links">
          <Link to="/forgot-password">Forgot password?</Link>
          <Link to="/register">Create an account</Link>
        </div>
      </div>
    </main>
  );
}
