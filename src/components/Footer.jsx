import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div>
          <div className="brand"><span className="brand-glyph">ET</span>EduTrade<span>.</span></div>
          <p style={{ color: 'var(--muted)', fontSize: '0.84rem', marginTop: 14, maxWidth: 280, lineHeight: 1.6 }}>
            A marketplace built for TUT students and lecturers — buy, sell and connect over academic and student-related items. JGA project prototype.
          </p>
        </div>
        <div className="footer-col">
          <h4>Marketplace</h4>
          <Link to="/marketplace">Browse listings</Link>
          <Link to="/sell">Sell an item</Link>
          <Link to="/accommodation">Accommodation</Link>
          <Link to="/services">Services</Link>
        </div>
        <div className="footer-col">
          <h4>Support</h4>
          <Link to="/about">FAQ</Link>
          <Link to="/dashboard">Dashboard</Link>
          <a href="mailto:support@edutrade.tut.ac.za">Contact support</a>
        </div>
        <div className="footer-col">
          <h4>Legal</h4>
          <a>Privacy Policy</a>
          <a>Terms of Use</a>
          <a>Report a listing</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 EduTrade — TUT Student Marketplace (JGA Prototype)</span>
        <span>Not an official TUT platform</span>
      </div>
    </footer>
  );
}
