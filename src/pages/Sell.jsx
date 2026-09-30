import React, { useState } from 'react';
import { CATEGORIES, CAMPUSES } from '../lib/mockData.js';

const initialForm = { title: '', category: '', description: '', price: '', condition: '', campus: '', contactPref: 'in-app' };

export default function Sell() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    const e = {};
    if (!form.title.trim()) e.title = 'Please enter a product name.';
    if (!form.category) e.category = 'Please choose a category.';
    if (!form.price || Number(form.price) < 0) e.price = 'Please enter a valid price (0 for free).';
    if (!form.condition) e.condition = 'Please choose a condition.';
    if (!form.campus) e.campus = 'Please choose your campus.';
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setSubmitted(true);
    setForm(initialForm);
  }

  return (
    <main className="page-shell">
      <div className="eyebrow">New listing</div>
      <h1 className="page-title">Sell an item</h1>
      <p className="page-sub">Only academic and student-related technology is allowed — laptops, phones, tablets, textbooks, study materials, calculators and electronics/accessories.</p>

      {submitted && (
        <div className="card" style={{ marginTop: 20, background: 'rgba(20,184,166,0.08)', borderColor: 'var(--mint)' }}>
          Your listing was submitted (demo) — it would appear in the Marketplace once reviewed.
        </div>
      )}

      <form onSubmit={handleSubmit} className="card" style={{ marginTop: 20, maxWidth: 640 }}>
        <div className="field">
          <label htmlFor="title">Product name</label>
          <input id="title" value={form.title} onChange={(e) => update('title', e.target.value)} placeholder="e.g. Casio FX-991ZA PLUS Calculator" />
          {errors.title && <div className="field-error">{errors.title}</div>}
        </div>
        <div className="grid grid-2">
          <div className="field">
            <label htmlFor="category">Category</label>
            <select id="category" value={form.category} onChange={(e) => update('category', e.target.value)}>
              <option value="">Select category</option>
              {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            {errors.category && <div className="field-error">{errors.category}</div>}
          </div>
          <div className="field">
            <label htmlFor="condition">Condition</label>
            <select id="condition" value={form.condition} onChange={(e) => update('condition', e.target.value)}>
              <option value="">Select condition</option>
              <option>Brand New</option><option>Like New</option><option>Good</option><option>Used – Fair</option>
            </select>
            {errors.condition && <div className="field-error">{errors.condition}</div>}
          </div>
        </div>
        <div className="grid grid-2">
          <div className="field">
            <label htmlFor="price">Price (ZAR)</label>
            <input id="price" type="number" min="0" value={form.price} onChange={(e) => update('price', e.target.value)} placeholder="0 for free" />
            {errors.price && <div className="field-error">{errors.price}</div>}
          </div>
          <div className="field">
            <label htmlFor="campus">Campus</label>
            <select id="campus" value={form.campus} onChange={(e) => update('campus', e.target.value)}>
              <option value="">Select campus</option>
              {CAMPUSES.map((c) => <option key={c}>{c}</option>)}
            </select>
            {errors.campus && <div className="field-error">{errors.campus}</div>}
          </div>
        </div>
        <div className="field">
          <label htmlFor="description">Description</label>
          <textarea id="description" rows="4" value={form.description} onChange={(e) => update('description', e.target.value)} placeholder="Condition details, reason for selling, anything a buyer should know." />
        </div>
        <div className="field">
          <label>Images</label>
          <div className="card" style={{ textAlign: 'center', color: 'var(--muted)', borderStyle: 'dashed', cursor: 'pointer' }}>
            Click to upload photos (simulated in this demo)
          </div>
        </div>
        <div className="field">
          <label htmlFor="contactPref">Preferred contact method</label>
          <select id="contactPref" value={form.contactPref} onChange={(e) => update('contactPref', e.target.value)}>
            <option value="in-app">In-app messaging</option>
            <option value="email">Email</option>
          </select>
        </div>
        <button type="submit" className="btn btn-solid btn-block">Publish Listing</button>
      </form>
    </main>
  );
}
