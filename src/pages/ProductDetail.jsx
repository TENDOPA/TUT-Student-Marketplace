import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { LISTINGS, CATEGORIES } from '../lib/mockData.js';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const listing = LISTINGS.find((l) => String(l.id) === id);
  const [saved, setSaved] = useState(false);
  const [reported, setReported] = useState(false);

  if (!listing) {
    return (
      <main className="page-shell">
        <div className="empty-state">
          <p>We couldn't find that listing — it may have been sold or removed.</p>
          <Link to="/marketplace" className="btn btn-solid" style={{ marginTop: 16 }}>Back to Marketplace</Link>
        </div>
      </main>
    );
  }

  const category = CATEGORIES.find((c) => c.id === listing.category);

  return (
    <main className="page-shell">
      <button className="btn btn-ghost btn-sm" onClick={() => navigate(-1)}>← Back</button>
      <div className="grid grid-2" style={{ marginTop: 20, alignItems: 'start' }}>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="listing-thumb" style={{ height: 320, borderRadius: 0, position: 'relative' }}>
            {listing.image && (
              <img src={listing.image} alt={listing.title} className="listing-img" />
            )}
            {listing.verified && <span className="badge-verified">✓ Verified seller</span>}
          </div>
        </div>
        <div>
          <div className="eyebrow">{category ? category.name : listing.category}</div>
          <h1 className="page-title" style={{ fontSize: '1.6rem' }}>{listing.title}</h1>
          <div className="listing-price" style={{ fontSize: '1.6rem', marginTop: 10 }}>R{listing.price.toLocaleString()}</div>
          <div style={{ display: 'flex', gap: 16, marginTop: 14, color: 'var(--muted)', fontSize: '0.86rem', flexWrap: 'wrap' }}>
            <span>{listing.condition}</span>
            <span>📍 {listing.campus}</span>
            <span>★ {listing.rating} rating</span>
          </div>
          <p style={{ marginTop: 18, color: 'var(--muted)', lineHeight: 1.7 }}>{listing.desc}</p>

          <div className="card" style={{ marginTop: 20, background: 'var(--bg)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--violet)' }} />
            <div>
              <strong style={{ fontSize: '0.9rem' }}>{listing.seller}</strong>
              {listing.verified && <span style={{ color: 'var(--mint)', fontSize: '0.76rem', marginLeft: 8 }}>✓ Verified</span>}
              <div style={{ fontSize: '0.76rem', color: 'var(--muted)', marginTop: 2 }}>Responds within a day · {listing.campus}</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 22, flexWrap: 'wrap' }}>
            <Link to="/messages" className="btn btn-solid">Contact Seller</Link>
            <button className="btn btn-outline" onClick={() => setSaved((v) => !v)}>{saved ? '♥ Saved' : '♡ Save to Favourites'}</button>
          </div>

          {reported ? (
            <p style={{ marginTop: 16, fontSize: '0.82rem', color: 'var(--mint)' }}>Thanks — this listing has been reported for review.</p>
          ) : (
            <button className="btn btn-ghost btn-sm" style={{ marginTop: 16, color: 'var(--coral)' }} onClick={() => setReported(true)}>🚩 Report this listing</button>
          )}
        </div>
      </div>
    </main>
  );
}
