import React from 'react';
import { Link } from 'react-router-dom';

export default function ListingCard({ listing }) {
  return (
    <Link to={`/product/${listing.id}`} className="card listing-card">
      <div className="listing-thumb">
        {listing.image && (
          <img src={listing.image} alt={listing.title} className="listing-img" />
        )}
        {listing.verified && (
          <span className="badge-verified">✓ Verified</span>
        )}
      </div>
      <div className="listing-price">R{listing.price.toLocaleString()}</div>
      <div className="listing-title">{listing.title}</div>
      <div className="listing-meta">
        <span>{listing.condition}</span>
        <span>{listing.campus.split(' ')[0]}</span>
      </div>
      <div className="listing-meta">
        <span>{listing.seller}</span>
        <span>★ {listing.rating}</span>
      </div>
    </Link>
  );
}
