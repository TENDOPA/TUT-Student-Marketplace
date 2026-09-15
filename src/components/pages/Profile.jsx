import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck, Star, MapPin, GraduationCap, Users, ShoppingBag, ArrowRight, MessageCircle, Share2 } from "lucide-react";
import { PRODUCTS, REVIEWS_SAMPLE } from "../data/marketplace";
import { SafeImage } from "@/components/ui/motion";

export default function Profile() {
  const [tab, setTab] = useState("products");
  const myListings = PRODUCTS.filter(p => p.seller.name.startsWith("Thabo"));
  const others = PRODUCTS.slice(2, 6);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Cover */}
      <div className="relative h-40 rounded-3xl overflow-hidden premium-shadow">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/60 to-accent/60" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      </div>

      <div className="relative -mt-12 px-4">
        <div className="glass-strong rounded-3xl p-6 premium-shadow flex flex-col sm:flex-row items-center gap-5">
          <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" alt="" className="w-24 h-24 rounded-2xl object-cover border-4 border-background" />
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="font-heading font-bold text-2xl">Thabo Mokoena</h1>
              <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground flex items-center justify-center sm:justify-start gap-2 mt-1"><GraduationCap className="w-3.5 h-3.5" /> ICT · <MapPin className="w-3.5 h-3.5" /> Pretoria campus</p>
            <div className="flex items-center justify-center sm:justify-start gap-5 mt-3 text-sm">
              <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-amber-400 text-amber-400" /> 4.9</span>
              <span className="flex items-center gap-1"><ShoppingBag className="w-4 h-4 text-muted-foreground" /> 23 sales</span>
              <span className="flex items-center gap-1"><Users className="w-4 h-4 text-muted-foreground" /> 148 followers</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/messages" className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-medium flex items-center gap-1.5 premium-shadow"><MessageCircle className="w-4 h-4" /> Message</Link>
            <button className="px-4 py-2.5 rounded-xl glass text-sm font-medium flex items-center gap-1.5"><Share2 className="w-4 h-4" /> Share</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-6 mb-5">
          {["products", "reviews", "about"].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${tab === t ? "bg-gradient-to-r from-primary to-accent text-white premium-shadow" : "glass"}`}>{t}</button>
          ))}
        </div>

        {tab === "products" && (
          <div className="grid sm:grid-cols-3 gap-4">
            {myListings.concat(others).slice(0, 6).map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Link to={`/product/${p.id}`} className="group glass rounded-2xl overflow-hidden premium-shadow hover:-translate-y-1 transition-all block">
                  <div className="relative h-36 overflow-hidden"><SafeImage src={p.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" /></div>
                  <div className="p-3"><p className="text-sm font-medium truncate">{p.title}</p><p className="font-heading font-bold gradient-text text-sm mt-1">R{p.price.toLocaleString()}</p></div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {tab === "reviews" && (
          <div className="space-y-3">
            {REVIEWS_SAMPLE.map(r => (
              <div key={r.id} className="glass rounded-2xl p-4 premium-shadow">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium">{r.name}</p>
                  <span className="text-[11px] text-muted-foreground">{r.date}</span>
                </div>
                <div className="flex gap-0.5 mb-1">{Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="w-3 h-3 fill-amber-400 text-amber-400" />)}</div>
                <p className="text-sm text-muted-foreground">{r.text}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "about" && (
          <div className="glass rounded-2xl p-6 premium-shadow space-y-3 text-sm">
            <Row label="Faculty" value="Information & Communication Technology" />
            <Row label="Campus" value="Pretoria" />
            <Row label="Year" value="3rd Year" />
            <Row label="Member since" value="January 2025" />
            <Row label="Verified" value="TUT email confirmed" />
            <div className="pt-3 border-t border-border">
              <p className="text-muted-foreground">Selling quality electronics and furniture to fellow TUT students. Always happy to negotiate and meet at campus pickup points.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return <div className="flex items-center justify-between"><span className="text-muted-foreground">{label}</span><span className="font-medium">{value}</span></div>;
}