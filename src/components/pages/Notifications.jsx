import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Bell, MessageCircle, Tag, ShoppingBag, Megaphone, TrendingUp, Check, X,
  Truck, Heart, CalendarDays, Bot, Home, Wrench, Gift, Trash2, BellOff, Settings, Sparkles
} from "lucide-react";

const ICONS = { MessageCircle, Tag, ShoppingBag, Megaphone, TrendingUp, Truck, Heart, CalendarDays, Bot, Home, Wrench, Gift };

const SEED = [
  { id: 1, icon: "MessageCircle", color: "from-primary to-accent", title: "New message from Lerato Dlamini", desc: "“Is the textbook still available?”", time: "2m", unread: true, cat: "messages" },
  { id: 2, icon: "Tag", color: "from-amber-500 to-orange-400", title: "Price offer received", desc: "Karabo M. offered R14,000 for MacBook Air M2", time: "1h", unread: true, cat: "offers" },
  { id: 3, icon: "TrendingUp", color: "from-emerald-500 to-teal-400", title: "Your listing is trending", desc: "“TI-84 Calculator” is up 40% in views this week", time: "3h", cat: "listings" },
  { id: 4, icon: "Truck", color: "from-primary to-accent", title: "Delivery update", desc: "Your Logitech MX Mouse is in transit to Pretoria Campus", time: "5h", unread: true, cat: "delivery" },
  { id: 5, icon: "Heart", color: "from-rose-500 to-pink-400", title: "Wishlist item available", desc: "“Calculus Textbook” is back in stock", time: "6h", cat: "wishlist" },
  { id: 6, icon: "CalendarDays", color: "from-rose-500 to-red-400", title: "Assignment reminder", desc: "Database ERD submission due in 2 days (DBS201)", time: "8h", cat: "reminders" },
  { id: 7, icon: "CalendarDays", color: "from-red-600 to-rose-500", title: "Exam reminder", desc: "Software Engineering Final on Aug 5 — start revising!", time: "9h", cat: "reminders" },
  { id: 8, icon: "Home", color: "from-emerald-500 to-teal-400", title: "Accommodation update", desc: "New listing near Pretoria Campus matches your filters", time: "1d", cat: "accommodation" },
  { id: 9, icon: "Wrench", color: "from-sky-500 to-blue-400", title: "Service booking confirmed", desc: "Laptop repair with IT Hub — tomorrow 10:00", time: "1d", cat: "services" },
  { id: 10, icon: "Gift", color: "from-accent to-fuchsia-400", title: "Promotion", desc: "List 3 items this week & get a free Featured boost", time: "2d", cat: "promotions" },
  { id: 11, icon: "Bot", color: "from-primary to-accent", title: "AI recommendation", desc: "3 textbooks matched your IT modules — from R180", time: "2d", cat: "ai" },
  { id: 12, icon: "ShoppingBag", color: "from-emerald-500 to-teal-400", title: "Sale completed", desc: "Mini Fridge sold to Aisha Patel for R1,100", time: "2d", cat: "sales" },
  { id: 13, icon: "Megaphone", color: "from-accent to-fuchsia-400", title: "New announcement", desc: "EduTrade now supports locker pickup at all campuses", time: "4d", cat: "announcements" },
];

const FILTERS = ["all", "messages", "offers", "sales", "delivery", "wishlist", "listings", "reminders", "accommodation", "services", "promotions", "ai", "announcements"];

export default function Notifications() {
  const [items, setItems] = useState(SEED);
  const [filter, setFilter] = useState("all");
  const [muted, setMuted] = useState([]);
  const [showPrefs, setShowPrefs] = useState(false);
  const [prefs, setPrefs] = useState({ orders: true, delivery: true, messages: true, listings: true, priceDrops: true, wishlist: true, reminders: true, exams: true, accommodation: true, services: true, promotions: false, ai: true });

  const visible = items.filter(n => filter === "all" || n.cat === filter);
  const unreadCount = items.filter(n => n.unread && !muted.includes(n.id)).length;

  const markAll = () => setItems(s => s.map(n => ({ ...n, unread: false })));
  const markRead = (id) => setItems(s => s.map(n => n.id === id ? { ...n, unread: false } : n));
  const remove = (id) => setItems(s => s.filter(n => n.id !== id));
  const toggleMute = (id) => setMuted(m => m.includes(id) ? m.filter(x => x !== id) : [...m, id]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl flex items-center gap-2"><Bell className="w-7 h-7 text-primary" /> Notifications</h1>
          <p className="text-sm text-muted-foreground mt-1">{unreadCount} unread · stay up to date with your activity</p>
        </div>
        <div className="flex gap-2">
          <button onClick={markAll} className="text-sm text-primary hover:underline flex items-center gap-1"><Check className="w-4 h-4" /> Mark all read</button>
          <button onClick={() => setShowPrefs(true)} className="p-2 rounded-lg glass hover:bg-primary/10" aria-label="Preferences"><Settings className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar pb-1">
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`shrink-0 px-3.5 py-2 rounded-full text-sm font-medium capitalize transition-all ${filter === f ? "bg-gradient-to-r from-primary to-accent text-white premium-shadow" : "glass"}`}>{f}</button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="glass rounded-3xl p-10 text-center premium-shadow">
          <BellOff className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No notifications here.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {visible.map(n => {
            const Icon = ICONS[n.icon] || Bell;
            const isMuted = muted.includes(n.id);
            return (
              <motion.div key={n.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} className={`glass rounded-2xl p-4 flex items-start gap-3 premium-shadow ${n.unread && !isMuted ? "ring-1 ring-primary/30" : ""} ${isMuted ? "opacity-55" : ""}`}>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${n.color} grid place-items-center text-white shrink-0`}><Icon className="w-4 h-4" /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{n.title}</p>
                    {n.unread && !isMuted && <span className="w-2 h-2 rounded-full bg-accent" />}
                    {isMuted && <BellOff className="w-3 h-3 text-muted-foreground" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className="text-[11px] text-muted-foreground">{n.time}</span>
                  <div className="flex gap-1">
                    {!n.unread ? null : <button onClick={() => markRead(n.id)} className="p-1 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary" aria-label="Mark read"><Check className="w-3.5 h-3.5" /></button>}
                    <button onClick={() => toggleMute(n.id)} className="p-1 rounded-lg hover:bg-muted text-muted-foreground" aria-label="Mute">{isMuted ? <Bell className="w-3.5 h-3.5" /> : <BellOff className="w-3.5 h-3.5" />}</button>
                    <button onClick={() => remove(n.id)} className="p-1 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive" aria-label="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="mt-8 text-center">
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-primary font-medium"><Settings className="w-4 h-4" /> Manage notification settings</Link>
      </div>

      <AnimatePresence>
        {showPrefs && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm grid place-items-center p-4" onClick={() => setShowPrefs(false)}>
            <motion.div initial={{ scale: 0.95, y: 12 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }} onClick={(e) => e.stopPropagation()} className="glass-strong rounded-3xl p-6 w-full max-w-md premium-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold flex items-center gap-2"><Sparkles className="w-4 h-4 text-accent" /> Notification preferences</h3>
                <button onClick={() => setShowPrefs(false)}><X className="w-5 h-5 text-muted-foreground" /></button>
              </div>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
                {Object.entries(prefs).map(([k, on]) => (
                  <div key={k} className="flex items-center justify-between p-3 rounded-xl bg-background/60 border border-border">
                    <span className="text-sm capitalize">{k.replace(/([A-Z])/g, " $1")}</span>
                    <button onClick={() => setPrefs(p => ({ ...p, [k]: !on }))} className={`w-11 h-6 rounded-full p-0.5 transition-colors ${on ? "bg-primary" : "bg-muted"} flex`}>
                      <span className={`w-5 h-5 rounded-full bg-white transition-transform ${on ? "translate-x-5" : ""}`} />
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={() => setShowPrefs(false)} className="w-full mt-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-medium">Done</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}