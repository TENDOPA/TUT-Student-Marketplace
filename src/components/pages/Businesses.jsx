import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Star, MapPin, ShieldCheck, Store, ArrowRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import { BUSINESSES, BUSINESS_CATEGORIES } from "../data/marketplace";
import { SafeImage } from "@/components/ui/motion";

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.06 } }) };

export default function Businesses() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");
  const [onlyVerified, setOnlyVerified] = useState(false);

  const filtered = useMemo(() => {
    let list = [...BUSINESSES];
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(b => b.name.toLowerCase().includes(q) || b.tagline.toLowerCase().includes(q) || b.owner.toLowerCase().includes(q));
    }
    if (cat !== "all") list = list.filter(b => b.category === cat);
    if (onlyVerified) list = list.filter(b => b.verified);
    return list;
  }, [query, cat, onlyVerified]);

  const catName = (id) => BUSINESS_CATEGORIES.find(c => c.id === id)?.name || id;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 text-center">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary mb-2"><Store className="w-3.5 h-3.5" /> Student entrepreneurs</span>
        <h1 className="font-heading font-bold text-3xl sm:text-4xl">Student Business Directory</h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-lg mx-auto">Discover and support businesses run by verified TUT students across all campuses.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex-1 flex items-center gap-2 glass rounded-2xl px-4 py-3">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search businesses, owners…" className="bg-transparent outline-none text-sm flex-1" />
          {query && <button onClick={() => setQuery("")}><X className="w-4 h-4 text-muted-foreground" /></button>}
        </div>
        <button onClick={() => setOnlyVerified(!onlyVerified)} className={`px-4 rounded-2xl text-sm font-medium flex items-center gap-2 ${onlyVerified ? "bg-gradient-to-r from-primary to-accent text-white" : "glass"}`}>
          <ShieldCheck className="w-4 h-4" /> Verified only
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-6">
        <Pill active={cat === "all"} onClick={() => setCat("all")}>All</Pill>
        {BUSINESS_CATEGORIES.map(c => (
          <Pill key={c.id} active={cat === c.id} onClick={() => setCat(c.id)}>
            <c.icon className="w-3.5 h-3.5" /> {c.name}
          </Pill>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((b, i) => (
          <motion.div key={b.id} custom={i} initial="hidden" animate="show" variants={fadeUp} className="group glass rounded-3xl overflow-hidden premium-shadow hover:-translate-y-1 transition-all">
            <div className="relative h-40 overflow-hidden">
              <SafeImage src={b.image} alt={b.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              {b.sponsored && <span className="absolute top-3 left-3 text-[10px] font-semibold px-2 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white">Sponsored</span>}
              {b.verified && <span className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 grid place-items-center"><ShieldCheck className="w-4 h-4 text-primary" /></span>}
            </div>
            <div className="p-5">
              <p className="text-[10px] uppercase tracking-wide text-accent font-medium">{catName(b.category)}</p>
              <h3 className="font-heading font-semibold text-base mt-1">{b.name}</h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{b.tagline}</p>
              <div className="flex items-center justify-between mt-4 text-xs">
                <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {b.rating} ({b.reviews})</span>
                <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="w-3 h-3" /> {b.campus}</span>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border text-xs">
                <span>By {b.owner}</span>
                <Link to="/messages" className="ml-auto px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-medium flex items-center gap-1">Contact <ArrowRight className="w-3 h-3" /></Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="glass rounded-3xl p-16 text-center">
          <p className="font-heading font-semibold">No businesses found</p>
          <p className="text-sm text-muted-foreground mt-1">Try a different search or category.</p>
        </div>
      )}

      <div className="mt-12 rounded-3xl p-8 text-center bg-gradient-to-br from-primary to-accent text-white premium-shadow">
        <h2 className="font-heading font-bold text-2xl">Are you a student entrepreneur?</h2>
        <p className="text-white/80 mt-2">List your business and reach thousands of TUT students.</p>
        <Link to="/sell" className="mt-5 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-primary font-semibold text-sm">List your business <ArrowRight className="w-4 h-4" /></Link>
      </div>
    </div>
  );
}

function Pill({ active, onClick, children }) {
  return (
    <button onClick={onClick} className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-all ${active ? "bg-gradient-to-r from-primary to-accent text-white premium-shadow" : "glass hover:bg-primary/10"}`}>{children}</button>
  );
}