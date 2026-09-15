import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  LayoutGrid, Heart, ShoppingBag, MessageCircle, Bell, BarChart3, Settings,
  TrendingUp, Wallet, Eye, Star, Plus, ArrowRight, ShieldCheck, GraduationCap,
  CalendarDays, PackageCheck, Bot, Sparkles, MapPin, Clock, Zap, User, Bookmark,
  CheckCircle2, Truck, BookOpen, Megaphone, ChevronRight
} from "lucide-react";
import { PRODUCTS, REVIEWS_SAMPLE } from "../data/marketplace";
import { SafeImage } from "@/components/ui/motion";
import { base44 } from "@/api/base44Client";

const TABS = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "listings", label: "My Listings", icon: ShoppingBag },
  { id: "orders", label: "Orders", icon: Wallet },
  { id: "purchases", label: "Purchases", icon: PackageCheck },
  { id: "saved", label: "Wishlist", icon: Heart },
  { id: "viewed", label: "Recently Viewed", icon: Eye },
  { id: "messages", label: "Messages", icon: MessageCircle },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "delivery", label: "Delivery", icon: Truck },
  { id: "events", label: "Events", icon: CalendarDays },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

const PROFILE = {
  name: "Thabo Mokoena",
  university: "Tshwane University of Technology",
  short: "TUT",
  faculty: "Information & Communication Technology",
  course: "Diploma in Computer Systems Engineering",
  year: "Year 3",
  campus: "Pretoria",
};

export default function Dashboard() {
  const [tab, setTab] = useState("overview");
  const [me, setMe] = useState(null);
  const myListings = PRODUCTS.slice(0, 4);
  const saved = PRODUCTS.slice(4, 7);
  const viewed = PRODUCTS.slice(7, 10);
  const purchases = PRODUCTS.slice(2, 5);

  useEffect(() => {
    let active = true;
    base44.auth.isAuthenticated().then(async (ok) => {
      if (!ok || !active) return;
      try { const u = await base44.auth.me(); if (active && u) setMe(u); } catch { /* demo profile */ }
    });
    return () => { active = false; };
  }, []);

  const name = me?.full_name?.split(" ")[0] || PROFILE.name.split(" ")[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Welcome header */}
      <div className="glass-strong rounded-3xl p-6 premium-shadow mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" alt="" className="w-20 h-20 rounded-2xl object-cover" />
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
              <h1 className="font-heading font-bold text-xl">Welcome back, {name} 👋</h1>
              <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2">
              <Badge tone="primary" icon={<GraduationCap className="w-3 h-3" />}>{PROFILE.university}</Badge>
              <Badge tone="accent" icon={<BookOpen className="w-3 h-3" />}>{PROFILE.faculty}</Badge>
              <Badge tone="muted" icon={<MapPin className="w-3 h-3" />}>{PROFILE.campus} Campus</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{PROFILE.course} · {PROFILE.year}</p>
          </div>
          <div className="flex gap-2">
            <Link to="/sell" className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-medium flex items-center gap-1.5 premium-shadow"><Plus className="w-4 h-4" /> New listing</Link>
            <Link to="/profile" className="px-4 py-2.5 rounded-xl glass text-sm font-medium">Profile</Link>
          </div>
        </div>
      </div>

      {/* Quick shortcuts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
        <Shortcut to="/marketplace" icon={<ShoppingBag className="w-4 h-4" />} label="Browse" />
        <Shortcut to="/sell" icon={<Plus className="w-4 h-4" />} label="Sell item" />
        <Shortcut to="/schedule" icon={<CalendarDays className="w-4 h-4" />} label="My Schedule" />
        <Shortcut to="/messages" icon={<MessageCircle className="w-4 h-4" />} label="Messages" />
        <Shortcut to="/notifications" icon={<Bell className="w-4 h-4" />} label="Alerts" />
        <Shortcut to="/profile" icon={<User className="w-4 h-4" />} label="Account" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Stat icon={Eye} label="Listing views" value="1,240" trend="+12%" />
        <Stat icon={Wallet} label="Earnings" value="R18,450" trend="+8%" />
        <Stat icon={ShoppingBag} label="Active listings" value="6" />
        <Stat icon={MessageCircle} label="Unread messages" value="3" />
      </div>

      <div className="grid lg:grid-cols-[220px_1fr] gap-6">
        <aside className="glass rounded-2xl p-3 h-fit lg:sticky lg:top-28">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${tab === t.id ? "bg-gradient-to-r from-primary to-accent text-white" : "hover:bg-background/60"}`}>
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </aside>

        <div>
          {tab === "overview" && (
            <div className="space-y-6">
              <Panel title="Recent activity">
                <div className="space-y-3">
                  {[{ t: "New message from Lerato Dlamini", d: "About: Engineering Mathematics Textbook", time: "2h" }, { t: "Your listing 'MacBook Air M2' got 42 views", d: "Trending in Electronics", time: "5h" }, { t: "Sale completed: Mini Fridge (R1,100)", d: "Buyer: Aisha Patel", time: "1d" }].map((a, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-background/60 border border-border">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary grid place-items-center shrink-0"><Bell className="w-4 h-4" /></div>
                      <div className="flex-1"><p className="text-sm font-medium">{a.t}</p><p className="text-xs text-muted-foreground">{a.d}</p></div>
                      <span className="text-[11px] text-muted-foreground">{a.time}</span>
                    </div>
                  ))}
                </div>
              </Panel>

              <div className="grid md:grid-cols-2 gap-6">
                <Panel title="AI recommendations" icon={<Sparkles className="w-4 h-4 text-accent" />}>
                  <div className="space-y-2">
                    {PRODUCTS.slice(8, 11).map((p, i) => (
                      <Link key={p.id} to={`/product/${p.id}`} className="flex items-center gap-3 p-2 rounded-xl hover:bg-background/60">
                        <SafeImage src={p.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{p.title}</p><p className="text-xs text-muted-foreground">R{p.price.toLocaleString()}</p></div>
                        <Bot className="w-4 h-4 text-accent" />
                      </Link>
                    ))}
                    <p className="text-[11px] text-muted-foreground px-2 pt-1">Based on your IT modules & recent views.</p>
                  </div>
                </Panel>

                <Panel title="Delivery tracking" icon={<Truck className="w-4 h-4 text-primary" />}>
                  <div className="space-y-3">
                    {[
                      { item: "Logitech MX Mouse", stage: 2, stages: ["Ordered", "Packed", "In transit", "Delivered"] },
                      { item: "Calculus Textbook", stage: 1, stages: ["Ordered", "Packed", "In transit", "Delivered"] },
                    ].map((d, i) => (
                      <div key={i} className="p-3 rounded-xl bg-background/60 border border-border">
                        <p className="text-sm font-medium">{d.item}</p>
                        <div className="flex items-center justify-between mt-2">
                          {d.stages.map((s, j) => (
                            <div key={s} className="flex-1 flex flex-col items-center text-center">
                              <div className={`w-5 h-5 rounded-full grid place-items-center text-[9px] ${j <= d.stage ? "bg-gradient-to-br from-primary to-accent text-white" : "bg-muted text-muted-foreground"}`}>{j <= d.stage ? "✓" : j + 1}</div>
                              <span className={`text-[9px] mt-1 ${j <= d.stage ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Panel>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Panel title="Upcoming events" icon={<CalendarDays className="w-4 h-4 text-primary" />}>
                  <div className="space-y-2">
                    {[{ t: "Database ERD submission", d: "DBS201 · in 2 days", tone: "text-amber-500" }, { t: "Calculus Class Test 2", d: "MAT301 · in 6 days", tone: "text-rose-500" }, { t: "Software Engineering Final", d: "SWE301 · in 14 days", tone: "text-rose-500" }].map((e, i) => (
                      <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-background/60 border border-border">
                        <CalendarDays className="w-4 h-4 text-primary shrink-0" />
                        <div className="flex-1"><p className="text-sm font-medium">{e.t}</p><p className="text-xs text-muted-foreground">{e.d}</p></div>
                        <Link to="/schedule" className="text-[11px] text-primary hover:underline">View</Link>
                      </div>
                    ))}
                  </div>
                </Panel>
                <Panel title="Saved products" icon={<Heart className="w-4 h-4 text-rose-500" />}>
                  <div className="grid grid-cols-2 gap-2">
                    {saved.slice(0, 2).map(p => <MiniListing key={p.id} product={p} />)}
                  </div>
                </Panel>
              </div>
            </div>
          )}
          {tab === "listings" && <Panel title="My Listings"><div className="grid sm:grid-cols-2 gap-3">{myListings.concat(PRODUCTS.slice(4, 6)).map(p => <MiniListing key={p.id} product={p} />)}</div></Panel>}
          {tab === "orders" && <Panel title="Orders (sales)"><OrdersTable /></Panel>}
          {tab === "purchases" && <Panel title="My purchases"><div className="grid sm:grid-cols-2 gap-3">{purchases.map(p => <MiniListing key={p.id} product={p} />)}</div></Panel>}
          {tab === "saved" && <Panel title="Wishlist"><div className="grid sm:grid-cols-2 gap-3">{saved.map(p => <MiniListing key={p.id} product={p} />)}</div></Panel>}
          {tab === "viewed" && <Panel title="Recently viewed"><div className="grid sm:grid-cols-2 gap-3">{viewed.map(p => <MiniListing key={p.id} product={p} />)}</div></Panel>}
          {tab === "messages" && <Panel title="Messages"><div className="space-y-3">{[{ n: "Lerato Dlamini", m: "Is the textbook still available?", t: "2h" }, { n: "Aisha Patel", m: "Can we meet at Pretoria campus?", t: "1d" }, { n: "Sipho Nkosi", m: "Thanks for the quick reply!", t: "2d" }].map((c, i) => <Link key={i} to="/messages" className="flex items-center gap-3 p-3 rounded-xl bg-background/60 border border-border hover:border-primary/40"><div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent grid place-items-center text-white text-xs font-medium">{c.n[0]}</div><div className="flex-1"><p className="text-sm font-medium">{c.n}</p><p className="text-xs text-muted-foreground">{c.m}</p></div><span className="text-[11px] text-muted-foreground">{c.t}</span></Link>)}</div></Panel>}
          {tab === "notifications" && <Panel title="Recent notifications"><div className="space-y-3">{[{ t: "Price drop on a saved item", d: "MacBook Air M2 now R13,500", time: "1h" }, { t: "New message from Lerato", d: "About Engineering Mathematics", time: "2h" }, { t: "Wishlist item available", d: "TI-84 Calculator is back in stock", time: "5h" }].map((n, i) => <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-background/60 border border-border"><div className="w-9 h-9 rounded-xl bg-accent/10 text-accent grid place-items-center shrink-0"><Bell className="w-4 h-4" /></div><div className="flex-1"><p className="text-sm font-medium">{n.t}</p><p className="text-xs text-muted-foreground">{n.d}</p></div><span className="text-[11px] text-muted-foreground">{n.time}</span></div>)}</div><Link to="/notifications" className="inline-flex items-center gap-1 text-sm text-primary mt-3">All notifications <ChevronRight className="w-4 h-4" /></Link></Panel>}
          {tab === "delivery" && <Panel title="Delivery tracking"><p className="text-sm text-muted-foreground mb-3">Track your orders from purchase to your door.</p><div className="space-y-3">{[{ item: "Logitech MX Mouse", stage: 2, stages: ["Ordered", "Packed", "In transit", "Delivered"] }, { item: "Calculus Textbook", stage: 1, stages: ["Ordered", "Packed", "In transit", "Delivered"] }, { item: "Engineering Notes Pack", stage: 0, stages: ["Ordered", "Packed", "In transit", "Delivered"] }].map((d, i) => <div key={i} className="p-3 rounded-xl bg-background/60 border border-border"><p className="text-sm font-medium mb-2">{d.item}</p><div className="flex items-center justify-between">{d.stages.map((s, j) => <div key={s} className="flex-1 flex flex-col items-center text-center"><div className={`w-5 h-5 rounded-full grid place-items-center text-[9px] ${j <= d.stage ? "bg-gradient-to-br from-primary to-accent text-white" : "bg-muted text-muted-foreground"}`}>{j <= d.stage ? "✓" : j + 1}</div><span className={`text-[9px] mt-1 ${j <= d.stage ? "text-foreground" : "text-muted-foreground"}`}>{s}</span></div>)}</div></div>)}</div></Panel>}
          {tab === "events" && <Panel title="Upcoming events"><div className="space-y-2">{[{ t: "Database ERD submission", d: "DBS301 · Jul 24", tone: "amber" }, { t: "Calculus Class Test 2", d: "MAT301 · Jul 28", tone: "rose" }, { t: "Software Engineering Final", d: "SWE301 · Aug 5", tone: "rose" }, { t: "Career Day", d: "Pretoria Campus · Aug 12", tone: "primary" }].map((e, i) => <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-background/60 border border-border"><CalendarDays className="w-4 h-4 text-primary" /><div className="flex-1"><p className="text-sm font-medium">{e.t}</p><p className="text-xs text-muted-foreground">{e.d}</p></div></div>)}</div><Link to="/schedule" className="inline-flex items-center gap-1 text-sm text-primary mt-3">Open full schedule <ChevronRight className="w-4 h-4" /></Link></Panel>}
          {tab === "analytics" && <Panel title="Analytics"><AnalyticsView /></Panel>}
          {tab === "settings" && <Panel title="Account settings"><div className="space-y-4">{[["Email notifications", true], ["SMS alerts", false], ["Push notifications", true], ["Show profile publicly", true], ["Allow offers on listings", true], ["AI recommendations", true]].map(([label, on], i) => <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-background/60 border border-border"><span className="text-sm">{label}</span><span className={`w-11 h-6 rounded-full p-0.5 transition-colors ${on ? "bg-primary" : "bg-muted"} flex`}><span className={`w-5 h-5 rounded-full bg-white transition-transform ${on ? "translate-x-5" : ""}`} /></span></div>)}</div></Panel>}
        </div>
      </div>
    </div>
  );
}

function Badge({ tone, icon, children }) {
  const tones = { primary: "bg-primary/10 text-primary", accent: "bg-accent/10 text-accent", muted: "bg-muted text-muted-foreground" };
  return <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-full ${tones[tone]}`}>{icon}{children}</span>;
}

function Shortcut({ to, icon, label }) {
  return (
    <Link to={to} className="glass rounded-2xl p-3 flex flex-col items-center gap-1.5 hover:-translate-y-1 hover:shadow-lg transition-all premium-shadow">
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 text-primary grid place-items-center">{icon}</div>
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );
}

function Stat({ icon: Icon, label, value, trend }) {
  return (
    <div className="glass rounded-2xl p-5 premium-shadow">
      <div className="flex items-center justify-between">
        <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary grid place-items-center"><Icon className="w-4 h-4" /></div>
        {trend && <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5"><TrendingUp className="w-3 h-3" /> {trend}</span>}
      </div>
      <p className="font-heading font-bold text-2xl mt-3">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function Panel({ title, icon, children }) {
  return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-6 premium-shadow"><h2 className="font-heading font-semibold text-base mb-4 flex items-center gap-2">{icon}{title}</h2>{children}</motion.div>;
}

function MiniListing({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="flex items-center gap-3 p-3 rounded-2xl bg-background/60 border border-border hover:border-primary/40 transition-colors">
      <SafeImage src={product.images[0]} alt="" className="w-14 h-14 rounded-xl object-cover" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{product.title}</p>
        <p className="text-xs text-muted-foreground">R{product.price.toLocaleString()} · {product.campus}</p>
      </div>
      <ArrowRight className="w-4 h-4 text-muted-foreground" />
    </Link>
  );
}

function OrdersTable() {
  const orders = [{ id: "#1042", item: "Mini Fridge", buyer: "Aisha Patel", price: 1100, status: "Completed" }, { id: "#1041", item: "Logitech Mouse", buyer: "Naledi K.", price: 850, status: "Completed" }, { id: "#1040", item: "MacBook Air M2", buyer: "Karabo M.", price: 14500, status: "Pending" }];
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead><tr className="text-left text-xs text-muted-foreground border-b border-border"><th className="py-2">Order</th><th>Item</th><th>Buyer</th><th>Price</th><th>Status</th></tr></thead>
        <tbody>{orders.map(o => (
          <tr key={o.id} className="border-b border-border last:border-0">
            <td className="py-3 font-medium">{o.id}</td><td>{o.item}</td><td>{o.buyer}</td><td>R{o.price.toLocaleString()}</td>
            <td><span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${o.status === "Completed" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-amber-500/15 text-amber-600"}`}>{o.status}</span></td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}

function AnalyticsView() {
  const bars = [40, 65, 50, 80, 60, 95, 75];
  return (
    <div>
      <div className="flex items-end gap-3 h-40 mb-6">
        {bars.map((h, i) => <div key={i} className="flex-1 rounded-t-xl bg-gradient-to-t from-primary to-accent" style={{ height: `${h}%` }} />)}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-2xl bg-background/60 border border-border"><p className="text-xs text-muted-foreground">Conversion rate</p><p className="font-heading font-bold text-xl">3.4%</p></div>
        <div className="p-4 rounded-2xl bg-background/60 border border-border"><p className="text-xs text-muted-foreground">Avg. response time</p><p className="font-heading font-bold text-xl">22m</p></div>
      </div>
    </div>
  );
}