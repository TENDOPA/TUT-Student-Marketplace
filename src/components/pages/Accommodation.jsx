import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Bed, Bath, Wifi, X, ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PRODUCTS, CAMPUSES } from "../data/marketplace";
import { SafeImage } from "@/components/ui/motion";

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.06 } }) };

const EXTRA = [
  { id: "a1", title: "Bachelor Flat - Arcadia, Pretoria", price: 4500, campus: "Pretoria", beds: 1, baths: 1, wifi: true, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80", description: "Self-contained bachelor flat near TUT Pretoria. Includes WiFi and water.", seller: { name: "Johan Botha", verified: true } },
  { id: "a2", title: "Shared Room in Commune - Soshanguve", price: 1800, campus: "Soshanguve", beds: 1, baths: 2, wifi: true, image: "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?auto=format&fit=crop&w=900&q=80", description: "Shared house, your own room. Close to campus and taxi rank.", seller: { name: "Lerato Dlamini", verified: true } },
  { id: "a3", title: "2-Bedroom Apartment - Ga-Rankuwa", price: 5200, campus: "Ga-Rankuwa", beds: 2, baths: 1, wifi: false, image: "https://images.unsplash.com/photo-1493809842364-78817add7a3e?auto=format&fit=crop&w=900&q=80", description: "Secure complex with parking. Split with a friend and save.", seller: { name: "Sipho Nkosi", verified: false } },
];

export default function Accommodation() {
  const [query, setQuery] = useState("");
  const [campus, setCampus] = useState("all");
  const [maxRent, setMaxRent] = useState(6000);

  const listings = useMemo(() => {
    const base = PRODUCTS.filter(p => p.category === "accommodation").map(p => ({ id: p.id, title: p.title, price: p.price, campus: p.campus, beds: 1, baths: 1, wifi: true, image: p.images[0], description: p.description, seller: { name: p.seller.name, verified: p.seller.verified } }));
    const all = [...base, ...EXTRA];
    let list = all.filter(a => a.price <= maxRent);
    if (campus !== "all") list = list.filter(a => a.campus === campus);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(a => a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q));
    }
    return list;
  }, [query, campus, maxRent]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 text-center">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary mb-2"><Bed className="w-3.5 h-3.5" /> Accommodation</span>
        <h1 className="font-heading font-bold text-3xl sm:text-4xl">Find your home near TUT</h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-lg mx-auto">Verified rooms, flats and communes close to all six TUT campuses.</p>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-6">
        <aside className="glass rounded-2xl p-5 lg:sticky lg:top-28 h-fit">
          <h3 className="font-heading font-semibold text-sm mb-4">Filters</h3>
          <div className="mb-5">
            <p className="text-xs font-medium text-muted-foreground mb-2">Search</p>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-background/60 border border-border">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Area, title…" className="bg-transparent outline-none text-sm flex-1" />
              {query && <button onClick={() => setQuery("")}><X className="w-3.5 h-3.5 text-muted-foreground" /></button>}
            </div>
          </div>
          <div className="mb-5">
            <p className="text-xs font-medium text-muted-foreground mb-2">Campus</p>
            <select value={campus} onChange={(e) => setCampus(e.target.value)} className="w-full bg-background rounded-xl px-3 py-2 text-sm border border-border outline-none">
              <option value="all">All campuses</option>
              {CAMPUSES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="mb-2">
            <p className="text-xs font-medium text-muted-foreground mb-2">Max rent: R{maxRent.toLocaleString()}</p>
            <input type="range" min={1000} max={6000} step={100} value={maxRent} onChange={(e) => setMaxRent(Number(e.target.value))} className="w-full accent-primary" />
            <div className="flex justify-between text-[10px] text-muted-foreground"><span>R1,000</span><span>R6,000</span></div>
          </div>
        </aside>

        <div>
          <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
            <span><span className="font-semibold text-foreground">{listings.length}</span> listings</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {listings.map((a, i) => (
              <motion.div key={a.id} custom={i} initial="hidden" animate="show" variants={fadeUp} className="group glass rounded-3xl overflow-hidden premium-shadow hover:-translate-y-1 transition-all">
                <div className="relative h-44 overflow-hidden">
                  <SafeImage src={a.image} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 text-[10px] font-semibold px-2 py-1 rounded-full bg-black/50 text-white">For rent</span>
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-semibold text-sm">{a.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> {a.campus} campus</p>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{a.description}</p>
                  <div className="flex items-center gap-3 mt-3 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1"><Bed className="w-3 h-3" /> {a.beds} bed</span>
                    <span className="flex items-center gap-1"><Bath className="w-3 h-3" /> {a.baths} bath</span>
                    {a.wifi && <span className="flex items-center gap-1 text-primary"><Wifi className="w-3 h-3" /> WiFi</span>}
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                    <div>
                      <p className="font-heading font-bold gradient-text">R{a.price.toLocaleString()}<span className="text-[10px] text-muted-foreground font-normal">/month</span></p>
                      <p className="text-[10px] text-muted-foreground flex items-center gap-1">By {a.seller.name} {a.seller.verified && <ShieldCheck className="w-3 h-3 text-primary" />}</p>
                    </div>
                    <Link to="/messages" className="px-3 py-2 rounded-lg bg-primary/10 text-primary text-xs font-medium flex items-center gap-1">Contact <ArrowRight className="w-3 h-3" /></Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}