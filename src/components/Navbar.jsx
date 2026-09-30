import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const links = [
    { to: '/', label: 'Home', end: true },
    { to: '/marketplace', label: 'Marketplace' },
    { to: '/accommodation', label: 'Accommodation' },
    { to: '/services', label: 'Services' },
    { to: '/businesses', label: 'Businesses' },
    { to: '/schedule', label: 'Schedule' },
    { to: '/about', label: 'About' },
  ];

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-glyph">ET</span>
          EduTrade<span>.</span>
        </Link>

        <div className={`nav-links${open ? ' open' : ''}`}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="nav-actions">
          {user ? (
            <>
              <Link to="/dashboard" className="btn btn-ghost">Dashboard</Link>
              <button className="btn btn-outline btn-sm" onClick={logout}>Log out</button>
            </>
          ) : (
            <Link to="/login" className="btn btn-ghost">Login / Register</Link>
          )}
          <Link to="/sell" className="btn btn-solid">Sell an Item</Link>
          <button className="nav-burger" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">☰</button>
        </div>
      </div>
    </nav>
  );
}
