import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, LISTINGS, STATS } from '../lib/mockData.js';
import ListingCard from '../components/ListingCard.jsx';

export default function Home() {
  const featured = LISTINGS.slice(0, 4);

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div>
          <div className="hero-badge">✓ TUT students &amp; lecturers only</div>
          <h1>Buy. Sell. Connect.<br /><span className="grad">Built for TUT.</span></h1>
          <p className="hero-sub">
            EduTrade is a marketplace made only for the TUT community — students and lecturers
            trading laptops, textbooks, tablets, calculators and other academic tech, safely and locally.
          </p>
          <div className="hero-ctas">
            <Link to="/marketplace" className="btn btn-solid">Browse Marketplace</Link>
            <Link to="/sell" className="btn btn-outline">Sell an Item</Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-visual-thumb" />
          <div style={{ marginTop: 16 }}>
            <div className="listing-price">R{LISTINGS[0].price.toLocaleString()}</div>
            <div className="listing-title">{LISTINGS[0].title}</div>
            <div className="listing-meta" style={{ marginTop: 8 }}>
              <span>{LISTINGS[0].condition}</span>
              <span>{LISTINGS[0].campus.split(' ')[0]}</span>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section">
        <div className="section-head">
          <div className="eyebrow">Browse</div>
          <h2 className="page-title" style={{ fontSize: '1.8rem' }}>Shop by category</h2>
        </div>
        <div className="grid grid-4">
          {CATEGORIES.map((c) => (
            <Link key={c.id} to={`/marketplace?category=${c.id}`} className="card cat-tile">
              <div className="icon">{c.icon}</div>
              <h4>{c.name}</h4>
              <span>{c.count} listings</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED LISTINGS */}
      <section className="section">
        <div className="section-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div className="eyebrow">Fresh listings</div>
            <h2 className="page-title" style={{ fontSize: '1.8rem' }}>Featured right now</h2>
          </div>
          <Link to="/marketplace" className="btn btn-outline btn-sm">View all listings</Link>
        </div>
        <div className="grid grid-4">
          {featured.map((l) => <ListingCard key={l.id} listing={l} />)}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <div className="section-head">
          <div className="eyebrow">Process</div>
          <h2 className="page-title" style={{ fontSize: '1.8rem' }}>How it works</h2>
        </div>
        <div className="grid grid-4">
          <div className="card step-card"><div className="step-num">01</div><h4 style={{ marginTop: 10 }}>Register with TUT</h4><p style={{ color: 'var(--muted)', fontSize: '0.86rem', marginTop: 8 }}>Sign up with your TUT student or staff email.</p></div>
          <div className="card step-card"><div className="step-num">02</div><h4 style={{ marginTop: 10 }}>Browse or list</h4><p style={{ color: 'var(--muted)', fontSize: '0.86rem', marginTop: 8 }}>Search the marketplace, or list an item in minutes.</p></div>
          <div className="card step-card"><div className="step-num">03</div><h4 style={{ marginTop: 10 }}>Connect</h4><p style={{ color: 'var(--muted)', fontSize: '0.86rem', marginTop: 8 }}>Message the buyer or seller directly in-app.</p></div>
          <div className="card step-card"><div className="step-num">04</div><h4 style={{ marginTop: 10 }}>Complete safely</h4><p style={{ color: 'var(--muted)', fontSize: '0.86rem', marginTop: 8 }}>Meet on campus or arrange delivery to finish the deal.</p></div>
        </div>
      </section>

      {/* TRUST & SAFETY */}
      <section className="section">
        <div className="section-head">
          <div className="eyebrow">Trust &amp; safety</div>
          <h2 className="page-title" style={{ fontSize: '1.8rem' }}>Built for a safer campus marketplace</h2>
        </div>
        <div className="grid grid-3">
          <div className="card"><h4>TUT-only marketplace</h4><p style={{ color: 'var(--muted)', fontSize: '0.86rem', marginTop: 8 }}>Every account is tied to a TUT student or staff email.</p></div>
          <div className="card"><h4>Verified users &amp; ratings</h4><p style={{ color: 'var(--muted)', fontSize: '0.86rem', marginTop: 8 }}>Sellers build a rating history from real transactions.</p></div>
          <div className="card"><h4>Report &amp; secure chat</h4><p style={{ color: 'var(--muted)', fontSize: '0.86rem', marginTop: 8 }}>Report a listing anytime, and message without sharing personal numbers.</p></div>
        </div>
      </section>

      {/* STATS */}
      <section className="section">
        <div className="section-head">
          <div className="eyebrow">EduTrade in numbers</div>
          <h2 className="page-title" style={{ fontSize: '1.8rem' }}>Demo project statistics</h2>
          <p className="demo-note">These are demo figures for presentation purposes — not live backend data.</p>
        </div>
        <div className="grid grid-4">
          <div className="card stat-card"><div className="stat-num">{STATS.activeStudents.toLocaleString()}</div><div className="stat-label">Active students</div></div>
          <div className="card stat-card"><div className="stat-num">{STATS.listings.toLocaleString()}</div><div className="stat-label">Listings</div></div>
          <div className="card stat-card"><div className="stat-num">{STATS.successfulConnections.toLocaleString()}</div><div className="stat-label">Successful connections</div></div>
          <div className="card stat-card"><div className="stat-num">{STATS.verifiedSellers.toLocaleString()}</div><div className="stat-label">Verified sellers</div></div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="cta-banner">
          <div>
            <h2>Got a laptop or textbook to sell?</h2>
            <p>List it in minutes and reach verified TUT students on your campus.</p>
          </div>
          <Link to="/sell" className="btn" style={{ background: '#fff', color: 'var(--violet-deep)' }}>Sell an Item</Link>
        </div>
      </section>
    </main>
  );
}
