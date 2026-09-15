import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, BadgeCheck, ShieldCheck, Clock, TrendingUp, Award, CheckCircle2,
  CalendarDays, Camera, Flag, Send, MessageSquare
} from "lucide-react";

/* Derives seller reputation metrics from a seller object (used by ProductDetail & Profile) */
function deriveReputation(seller = {}) {
  const sales = seller.sales ?? 23;
  const rating = seller.rating ?? 4.9;
  const isVerified = !!seller.verified;
  const trusted = sales >= 15 && rating >= 4.5;
  const topSeller = sales >= 25 && rating >= 4.7;
  const completion = Math.min(100, Math.round(78 + sales * 0.6));
  return { sales, rating, isVerified, trusted, topSeller, completion, responseTime: "~22m", memberSince: "2025" };
}

export function SellerReputation({ seller }) {
  const r = deriveReputation(seller);
  return (
    <div className="mt-4 glass rounded-2xl p-4 premium-shadow">
      <div className="flex items-center gap-3">
        <img src={seller.avatar} alt={seller.name} className="w-12 h-12 rounded-full object-cover" />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm flex items-center gap-1.5 flex-wrap">
            {seller.name}
            {r.isVerified && <BadgeCheck className="w-4 h-4 text-primary" />}
          </p>
          <p className="text-xs text-muted-foreground truncate">{seller.faculty}</p>
          <div className="flex flex-wrap gap-1 mt-1.5">
            {r.isVerified && <Badge tone="primary" icon={<ShieldCheck className="w-3 h-3" />}>Verified</Badge>}
            {r.trusted && <Badge tone="emerald" icon={<CheckCircle2 className="w-3 h-3" />}>Trusted</Badge>}
            {r.topSeller && <Badge tone="amber" icon={<Award className="w-3 h-3" />}>Top Seller</Badge>}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-4">
        <Metric icon={<Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />} label="Rating" value={`${r.rating}`} />
        <Metric icon={<TrendingUp className="w-3.5 h-3.5" />} label="Sales" value={`${r.sales}`} />
        <Metric icon={<Clock className="w-3.5 h-3.5" />} label="Response" value={r.responseTime} />
        <Metric icon={<CheckCircle2 className="w-3.5 h-3.5" />} label="Completion" value={`${r.completion}%`} />
        <Metric icon={<CalendarDays className="w-3.5 h-3.5" />} label="Member since" value={r.memberSince} />
        <Metric icon={<MessageSquare className="w-3.5 h-3.5" />} label="Replies" value="98%" />
      </div>
    </div>
  );
}

function Badge({ tone, icon, children }) {
  const tones = {
    primary: "bg-primary/10 text-primary",
    emerald: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    amber: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  };
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${tones[tone]}`}>{icon}{children}</span>
  );
}

function Metric({ icon, label, value }) {
  return (
    <div className="rounded-xl bg-background/60 border border-border p-2.5 text-center">
      <div className="flex items-center justify-center gap-1 text-muted-foreground">{icon}</div>
      <p className="font-heading font-bold text-sm mt-1">{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}

/* Interactive review form: 1–5 stars, written review, optional image, submit */
export function ReviewForm({ onAdd }) {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [sent, setSent] = useState(false);

  const submit = () => {
    if (!text.trim()) return;
    onAdd?.({ rating, text: text.trim(), image: img, date: "Just now" });
    setText(""); setImg(null); setRating(5); setSent(true);
    setTimeout(() => setSent(false), 2500);
  };

  return (
    <div className="mt-5 rounded-2xl bg-background/60 border border-border p-4">
      <p className="text-sm font-medium mb-3">Rate this seller</p>
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <button key={i} onMouseEnter={() => setHover(i + 1)} onMouseLeave={() => setHover(0)} onClick={() => setRating(i + 1)} aria-label={`${i + 1} stars`}>
            <Star className={`w-6 h-6 transition-colors ${(hover || rating) > i ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40"}`} />
          </button>
        ))}
        <span className="text-xs text-muted-foreground ml-2">{hover || rating}/5</span>
      </div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} placeholder="Share your experience with this seller…" className="w-full text-sm bg-card border border-border rounded-xl p-3 outline-none focus:ring-2 ring-primary/30 resize-none" />
      <div className="flex items-center justify-between mt-3">
        <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer hover:text-foreground">
          <Camera className="w-4 h-4" /> Add photo
          <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) setImg(URL.createObjectURL(f)); }} />
        </label>
        <button onClick={submit} disabled={!text.trim()} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-medium disabled:opacity-40 hover:scale-[1.02] transition-transform">
          <Send className="w-4 h-4" /> {sent ? "Sent!" : "Submit"}
        </button>
      </div>
      {img && <img src={img} alt="review preview" className="mt-3 w-20 h-20 rounded-xl object-cover" />}
    </div>
  );
}

/* Review list with report-fake-review action */
export function ReviewList({ reviews = [] }) {
  const [reported, setReported] = useState({});
  return (
    <div className="space-y-4">
      <AnimatePresence>
        {reviews.map((r) => (
          <motion.div key={r.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="pb-4 border-b border-border last:border-0 last:pb-0">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-medium">{r.name}</p>
              <span className="text-[11px] text-muted-foreground">{r.date}</span>
            </div>
            <div className="flex gap-0.5 mb-1">
              {Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
            </div>
            <p className="text-xs text-muted-foreground">{r.text}</p>
            {r.image && <img src={r.image} alt="" className="mt-2 w-24 h-24 rounded-xl object-cover" />}
            <button onClick={() => setReported((s) => ({ ...s, [r.id]: true }))} className="mt-2 flex items-center gap-1 text-[11px] text-muted-foreground hover:text-destructive">
              <Flag className="w-3 h-3" /> {reported[r.id] ? "Reported" : "Report fake review"}
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}