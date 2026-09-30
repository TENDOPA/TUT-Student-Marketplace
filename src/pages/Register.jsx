import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const [errors, setErrors] = useState({});

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Please enter a valid email address.';
    if (form.password.length < 6) nextErrors.password = 'Password must be at least 6 characters.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    register(form);
    navigate('/dashboard');
  }

  return (
    <main className="page-shell" style={{ paddingTop: 20 }}>
      <div className="form-shell">
        <div className="eyebrow">Join EduTrade</div>
        <h2 className="page-title" style={{ fontSize: '1.6rem' }}>Create your account</h2>
        <p className="page-sub" style={{ fontSize: '0.86rem' }}>Demo registration — stored locally in your browser only.</p>
        <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
          <div className="field">
            <label htmlFor="name">Full name</label>
            <input id="name" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="e.g. Blessing Sambo" />
            {errors.name && <div className="field-error">{errors.name}</div>}
          </div>
          <div className="field">
            <label htmlFor="role">I am a</label>
            <select id="role" value={form.role} onChange={(e) => update('role', e.target.value)}>
              <option value="student">Student</option>
              <option value="lecturer">Lecturer</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="email">TUT email</label>
            <input id="email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="s123456789@tut4life.ac.za" />
            {errors.email && <div className="field-error">{errors.email}</div>}
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={form.password} onChange={(e) => update('password', e.target.value)} placeholder="At least 6 characters" />
            {errors.password && <div className="field-error">{errors.password}</div>}
          </div>
          <button type="submit" className="btn btn-solid btn-block">Create Account</button>
        </form>
        <div className="auth-links">
          <Link to="/login">Already have an account? Log in</Link>
        </div>
      </div>
    </main>
  );
}
