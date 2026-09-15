import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Heart, Share2, MessageCircle, Phone, Star, MapPin, ShieldCheck,
  BadgeCheck, ChevronLeft, ChevronRight, AlertTriangle, Bot, Flag, ArrowLeft
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import ChatDrawer from "@/components/ChatDrawer";
import { SellerReputation, ReviewForm, ReviewList } from "@/components/SellerReputation";
import { SafeImage } from "@/components/ui/motion";
import { PRODUCTS, REVIEWS_SAMPLE, CATEGORIES } from "../data/marketplace";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
  const [active, setActive] = useState(0);
  const [saved, setSaved] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [reviews, setReviews] = useState(REVIEWS_SAMPLE);
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const cat = CATEGORIES.find(c => c.id === product.category);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-5">
        <ArrowLeft className="w-4 h-4" /> Back to marketplace
      </button>

      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8">
        {/* Gallery */}
        <div>
          <div className="relative glass rounded-3xl overflow-hidden premium-shadow aspect-[4/3]">
            <motion.div key={active} initial={{ opacity: 0.6 }} animate={{ opacity: 1 }} className="w-full h-full">
              <SafeImage src={product.images[active]} alt={product.title} className="w-full h-full object-cover" />
            </motion.div>
            {product.images.length > 1 && (
              <>
                <button onClick={() => setActive((active - 1 + product.images.length) % product.images.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-strong grid place-items-center hover:scale-105 transition-transform">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={() => setActive((active + 1) % product.images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-strong grid place-items-center hover:scale-105 transition-transform">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {product.images.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-white" : "w-1.5 bg-white/50"}`} />
              ))}
            </div>
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-3">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setActive(i)} className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${i === active ? "border-primary" : "border-transparent opacity-60"}`}>
                  <SafeImage src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground capitalize flex items-center gap-1">
              {cat && <cat.icon className="w-3 h-3" />} {product.category}
            </span>
            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground">{product.condition === "New" ? "Brand New" : product.condition}</span>
            {product.featured && <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white">Featured</span>}
          </div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl leading-tight">{product.title}</h1>
          <div className="flex items-center gap-3 mt-3 flex-wrap">
            <p className="font-heading font-bold text-3xl gradient-text">R{product.price.toLocaleString()}</p>
            {product.newPrice > product.price && <p className="text-base text-muted-foreground line-through">R{product.newPrice.toLocaleString()}</p>}
            {product.discount > 0 && <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-semibold">{product.discount}% off new</span>}
            {product.negotiable && <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">Negotiable</span>}
          </div>
          {product.savings > 0 && <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mt-1">Save R{product.savings.toLocaleString()} buying second-hand</p>}
          <div className="flex items-center gap-3 mt-3 text-sm">
            <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {product.rating}</span>
            <span className="text-muted-foreground">({product.reviews} reviews)</span>
            <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="w-4 h-4" /> {product.campus} Campus</span>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button onClick={() => setChatOpen(true)} className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-medium text-sm premium-shadow hover:scale-[1.02] transition-transform">
              <MessageCircle className="w-4 h-4" /> Chat with seller
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl glass-strong font-medium text-sm hover:scale-[1.02] transition-transform">
              <Phone className="w-4 h-4" /> Call
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-3">
            <button onClick={() => setSaved(!saved)} className={`flex flex-col items-center gap-1 py-3 rounded-xl glass text-xs font-medium ${saved ? "text-rose-500" : ""}`}>
              <Heart className={`w-4 h-4 ${saved ? "fill-rose-500" : ""}`} /> {saved ? "Saved" : "Save"}
            </button>
            <button className="flex flex-col items-center gap-1 py-3 rounded-xl glass text-xs font-medium">
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button className="flex flex-col items-center gap-1 py-3 rounded-xl glass text-xs font-medium text-muted-foreground">
              <Flag className="w-4 h-4" /> Report
            </button>
          </div>

          {/* AI scam warning */}
          <div className="mt-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">AI Safety Check</p>
              <p className="text-xs text-muted-foreground mt-0.5">For your safety, meet the seller at a verified campus pickup point. Never pay before inspecting the item.</p>
            </div>
          </div>

          {/* Seller reputation */}
          <SellerReputation seller={product.seller} />
          <div className="flex justify-end mt-2">
            <Link to="/profile" className="px-3 py-2 rounded-xl glass text-xs font-medium hover:bg-primary/10">View profile</Link>
          </div>
        </div>
      </div>

      {/* Description + details */}
      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-8 mt-10">
        <div className="glass rounded-3xl p-6">
          <h2 className="font-heading font-semibold text-lg mb-3">Description</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
            <Detail label="Selling Price" value={`R${product.price.toLocaleString()}`} />
            <Detail label="Original New Price" value={`R${product.newPrice.toLocaleString()}`} />
            <Detail label="Est. Market Value" value={`R${product.marketValue.toLocaleString()}`} />
            <Detail label="Condition" value={product.condition === "New" ? "Brand New" : product.condition} />
            <Detail label="Discount" value={product.discount > 0 ? `${product.discount}% off new` : "—"} />
            <Detail label="You Save" value={product.savings > 0 ? `R${product.savings.toLocaleString()}` : "—"} />
            <Detail label="Campus" value={product.campus} />
            <Detail label="Negotiable" value={product.negotiable ? "Yes" : "No"} />
            <Detail label="Listing ID" value={product.id.toUpperCase()} />
          </div>

          {/* AI price insight */}
          <div className="mt-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 p-5">
            <div className="flex items-center gap-2 mb-2"><Bot className="w-4 h-4 text-accent" /><span className="text-sm font-medium">AI Price Insight</span></div>
            <p className="text-xs text-muted-foreground">Retail new is R{product.newPrice.toLocaleString()}. Based on similar second-hand listings, a fair market price is around R{product.marketValue.toLocaleString()}. This listing is {product.discount > 0 ? `${product.discount}% below the new price` : "priced at market value"}.</p>
          </div>
        </div>

        {/* Reviews */}
        <div className="glass rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-semibold text-lg">Reviews</h2>
            <span className="flex items-center gap-1 text-sm"><Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {product.rating} · {product.reviews}</span>
          </div>
          <ReviewList reviews={reviews} />
          <ReviewForm onAdd={(r) => setReviews(s => [{ id: Date.now(), name: "You", ...r }, ...s])} />
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="font-heading font-bold text-xl mb-5">Related products</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      )}

      <ChatDrawer open={chatOpen} onClose={() => setChatOpen(false)} product={product} />
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="rounded-xl bg-background/60 border border-border p-3">
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="text-sm font-medium capitalize mt-0.5">{value}</p>
    </div>
  );
}