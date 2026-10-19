import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    accountType: 'tut', // 'tut' or 'guest'
  });
  const [errors, setErrors] = useState({});

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (form.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    // Demo registration only — stored in browser localStorage
    register({
      ...form,
      role: form.accountType === 'guest' ? 'guest' : form.role,
      isGuest: form.accountType === 'guest',
    });
    navigate('/dashboard');
  }

  return (
    <main className="page-shell" style={{ paddingTop: 20 }}>
      <div className="form-shell">
        <div className="eyebrow">Join EduTrade</div>
        <h2 className="page-title" style={{ fontSize: '1.6rem' }}>Create your account</h2>
        <p className="page-sub" style={{ fontSize: '0.86rem' }}>
          Demo registration only. Everything is stored in your browser — no real server account is created.
        </p>

        <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
          <div className="field">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder="e.g. Blessing Sambo"
            />
            {errors.name && <div className="field-error">{errors.name}</div>}
          </div>

          {/* Account type */}
          <div className="field">
            <label htmlFor="accountType">I am from</label>
            <select
              id="accountType"
              value={form.accountType}
              onChange={(e) => update('accountType', e.target.value)}
            >
              <option value="tut">Tshwane University of Technology (TUT)</option>
              <option value="guest">Another university (Guest)</option>
            </select>
          </div>

          {/* Role — only shown for TUT users */}
          {form.accountType === 'tut' && (
            <div className="field">
              <label htmlFor="role">I am a</label>
              <select
                id="role"
                value={form.role}
                onChange={(e) => update('role', e.target.value)}
              >
                <option value="student">Student</option>
                <option value="lecturer">Lecturer</option>
              </select>
            </div>
          )}

          <div className="field">
            <label htmlFor="email">
              {form.accountType === 'tut'
                ? 'TUT student or staff email'
                : 'Your university email (guest)'}
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              placeholder={
                form.accountType === 'tut'
                  ? 's123456789@tut4life.ac.za'
                  : 'you@wits.ac.za or you@uj.ac.za'
              }
            />
            <div className="field-hint">
              {form.accountType === 'tut'
                ? 'Use your official @tut4life.ac.za or @tut.ac.za address.'
                : 'Guests can browse the marketplace. Full features are for TUT users in this demo.'}
            </div>
            {errors.email && <div className="field-error">{errors.email}</div>}
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
              placeholder="At least 6 characters"
            />
            {errors.password && <div className="field-error">{errors.password}</div>}
          </div>

          <button type="submit" className="btn btn-solid btn-block">
            Create Account
          </button>
        </form>

        <div className="auth-links">
          <Link to="/login">Already have an account? Log in</Link>
        </div>
      </div>
    </main>
  );
}