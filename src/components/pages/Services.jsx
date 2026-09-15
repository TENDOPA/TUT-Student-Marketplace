import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Star, ShieldCheck, Wrench, ArrowRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import { BUSINESSES, BUSINESS_CATEGORIES, PRODUCTS } from "../data/marketplace";
import { SafeImage } from "@/components/ui/motion";

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.06 } }) };

const SERVICE_PRICES = { design: "from R150", tutoring: "from R80/hr", programming: "from R300", photography: "from R500", haircuts: "from R50", baking: "from R120", cleaning: "from R200", printing: "from R2/pg", delivery: "from R30", repairs: "from R100" };

export default function Services() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");
  const serviceProducts = PRODUCTS.filter(p => p.category === "services");

  const filtered = useMemo(() => {
    let list = BUSINESSES.filter(b => b.category !== "design" ? true : true);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(b => b.name.toLowerCase().includes(q) || b.tagline.toLowerCase().includes(q) || b.category.includes(q));
    }
    if (cat !== "all") list = list.filter(b => b.category === cat);
    return list;
  }, [query, cat]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 text-center">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary mb-2"><Wrench className="w-3.5 h-3.5" /> Services</span>
        <h1 className="font-heading font-bold text-3xl sm:text-4xl">Services Marketplace</h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-lg mx-auto">Hire skilled TUT students for design, tutoring, repairs, photography and more.</p>
      </div>

      <div className="flex items-center gap-2 glass rounded-2xl px-4 py-3 mb-6">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search services…" className="bg-transparent outline-none text-sm flex-1" />
        {query && <button onClick={() => setQuery("")}><X className="w-4 h-4 text-muted-foreground" /></button>}
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-8">
        <Pill active={cat === "all"} onClick={() => setCat("all")}>All services</Pill>
        {BUSINESS_CATEGORIES.map(c => (
          <Pill key={c.id} active={cat === c.id} onClick={() => setCat(c.id)}>
            <c.icon className="w-3.5 h-3.5" /> {c.name}
          </Pill>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
        {filtered.map((b, i) => (
          <motion.div key={b.id} custom={i} initial="hidden" animate="show" variants={fadeUp} className="glass rounded-3xl p-5 premium-shadow hover:-translate-y-1 transition-all">
            <div className="flex items-start gap-3">
              <img src={b.image} alt="" className="w-14 h-14 rounded-2xl object-cover" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <h3 className="font-heading font-semibold text-sm truncate">{b.name}</h3>
                  {b.verified && <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />}
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">By {b.owner} · {b.campus}</p>
                <div className="flex items-center gap-1 mt-1 text-[11px]"><Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {b.rating} ({b.reviews})</div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3 line-clamp-2">{b.tagline}</p>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <span className="font-heading font-bold gradient-text text-sm">{SERVICE_PRICES[b.category]}</span>
              <Link to="/messages" className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium flex items-center gap-1">Book <ArrowRight className="w-3 h-3" /></Link>
            </div>
          </motion.div>
        ))}
      </div>

      <h2 className="font-heading font-bold text-xl mb-5">Service listings</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {serviceProducts.map((p, i) => (
          <motion.div key={p.id} custom={i} initial="hidden" animate="show" variants={fadeUp} className="glass rounded-3xl overflow-hidden premium-shadow hover:-translate-y-1 transition-all">
            <SafeImage src={p.images[0]} alt={p.title} className="w-full h-40 object-cover" />
            <div className="p-5">
              <h3 className="font-heading font-semibold text-sm">{p.title}</h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{p.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="font-heading font-bold gradient-text">R{p.price.toLocaleString()}</span>
                <Link to={`/product/${p.id}`} className="text-xs text-primary font-medium flex items-center gap-1">View <ArrowRight className="w-3 h-3" /></Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Pill({ active, onClick, children }) {
  return (
    <button onClick={onClick} className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-all ${active ? "bg-gradient-to-r from-primary to-accent text-white premium-shadow" : "glass hover:bg-primary/10"}`}>{children}</button>
  );
}