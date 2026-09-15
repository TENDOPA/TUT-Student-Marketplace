import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Star, MapPin, BadgeCheck, Share2, Flag } from "lucide-react";
import { TiltCard } from "@/components/ui/motion";

const FALLBACK = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80";

export default function ProductCard({ product, index = 0 }) {
  const [saved, setSaved] = useState(false);
  const [imgSrc, setImgSrc] = useState(product.images[0]);

  const ripple = (e) => {
    const el = e.currentTarget;
    const ink = document.createElement("span");
    const r = el.getBoundingClientRect();
    const size = Math.max(r.width, r.height);
    ink.className = "ripple-ink";
    ink.style.width = ink.style.height = `${size}px`;
    ink.style.left = `${e.clientX - r.left - size / 2}px`;
    ink.style.top = `${e.clientY - r.top - size / 2}px`;
    el.appendChild(ink);
    setTimeout(() => ink.remove(), 600);
  };

  return (
    <TiltCard className="h-full" intensity={6}>
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45, delay: (index % 8) * 0.05 }}
        className="group h-full"
      >
        <Link
          to={`/product/${product.id}`}
          onClick={ripple}
          className="ripple block h-full glass rounded-3xl overflow-hidden premium-shadow hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={imgSrc}
              alt={product.title}
              loading="lazy"
              onError={() => setImgSrc(FALLBACK)}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-x-0 top-0 p-3 flex justify-between">
              <div className="flex flex-col gap-1.5">
                {product.featured && (
                  <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white backdrop-blur">Featured</span>
                )}
                {product.trending && (
                  <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-amber-500/90 text-white backdrop-blur w-fit">🔥 Trending</span>
                )}
              </div>
              <button
                onClick={(e) => { e.preventDefault(); setSaved(!saved); }}
                className="w-9 h-9 rounded-full glass-strong grid place-items-center hover:scale-110 active:scale-90 transition-transform"
                aria-label="Save"
              >
                <motion.span key={String(saved)} initial={{ scale: 0.6 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 12 }}>
                  <Heart className={`w-4 h-4 transition-colors ${saved ? "fill-rose-500 text-rose-500" : ""}`} />
                </motion.span>
              </button>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground capitalize">{product.category}</span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{product.condition}</span>
            </div>
            <h3 className="font-heading font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">{product.title}</h3>
            <p className="text-[11px] text-muted-foreground mt-1 line-clamp-1">{product.description}</p>
            <div className="flex items-end justify-between mt-2">
              <div>
                {product.discount > 0 && (
                  <span className="inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 mb-1">-{product.discount}% off new</span>
                )}
                <div className="flex items-center gap-1.5">
                  <p className="font-heading font-bold text-lg gradient-text">R{product.price.toLocaleString()}</p>
                  {product.newPrice > product.price && <p className="text-[11px] text-muted-foreground line-through">R{product.newPrice.toLocaleString()}</p>}
                </div>
                {product.discount > 0
                  ? <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Save R{product.savings.toLocaleString()} 2nd-hand</p>
                  : product.negotiable
                    ? <p className="text-[10px] text-muted-foreground">Negotiable</p>
                    : null}
              </div>
              <div className="flex items-center gap-0.5 text-xs text-muted-foreground">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                {product.rating} <span className="text-muted-foreground/70">({product.reviews})</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <img src={product.seller.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                <span className="text-xs text-muted-foreground truncate flex items-center gap-1">
                  {product.seller.name}
                  {product.seller.verified && <BadgeCheck className="w-3 h-3 text-primary shrink-0" />}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button onClick={(e) => e.preventDefault()} className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors" aria-label="Share"><Share2 className="w-3.5 h-3.5" /></button>
                <button onClick={(e) => e.preventDefault()} className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors" aria-label="Report"><Flag className="w-3.5 h-3.5" /></button>
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><MapPin className="w-3 h-3" /> {product.campus}</span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </TiltCard>
  );
}