import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CATEGORIES, LISTINGS, CAMPUSES } from '../lib/mockData.js';
import ListingCard from '../components/ListingCard.jsx';

export default function Marketplace() {
  const [params, setParams] = useSearchParams();
  const initialCategory = params.get('category') || '';
  const [category, setCategory] = useState(initialCategory);
  const [campus, setCampus] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('recent');

  const results = useMemo(() => {
    let list = LISTINGS.filter((l) => {
      if (category && l.category !== category) return false;
      if (campus && l.campus !== campus) return false;
      if (maxPrice && l.price > Number(maxPrice)) return false;
      if (search && !l.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
    if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, campus, maxPrice, search, sort]);

  function selectCategory(id) {
    setCategory(id);
    setParams(id ? { category: id } : {});
  }

  return (
    <main className="page-shell">
      <div className="eyebrow">Marketplace</div>
      <h1 className="page-title">Browse listings</h1>
      <p className="page-sub">Filter by category, campus, price and condition.</p>

      <div className="chip-row" style={{ marginTop: 24 }}>
        <button className={category === '' ? 'active' : ''} onClick={() => selectCategory('')}>All</button>
        {CATEGORIES.map((c) => (
          <button key={c.id} className={category === c.id ? 'active' : ''} onClick={() => selectCategory(c.id)}>{c.icon} {c.name}</button>
        ))}
      </div>

      <div className="card" style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search listings…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: 180, padding: '10px 14px', borderRadius: 10, border: '1px solid var(--line)' }}
        />
        <select value={campus} onChange={(e) => setCampus(e.target.value)} style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid var(--line)' }}>
          <option value="">All campuses</option>
          {CAMPUSES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid var(--line)' }}>
          <option value="">Any price</option>
          <option value="500">Under R500</option>
          <option value="2000">Under R2,000</option>
          <option value="5000">Under R5,000</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid var(--line)' }}>
          <option value="recent">Most recent</option>
          <option value="low">Price: low to high</option>
          <option value="high">Price: high to low</option>
        </select>
      </div>

      <p style={{ color: 'var(--muted)', fontSize: '0.86rem', marginTop: 18 }}>{results.length} listing{results.length !== 1 ? 's' : ''} found</p>

      <div className="grid grid-4" style={{ marginTop: 14 }}>
        {results.map((l) => <ListingCard key={l.id} listing={l} />)}
      </div>
      {results.length === 0 && (
        <div className="empty-state">No listings match your filters. Try widening your search.</div>
      )}
    </main>
  );
}
