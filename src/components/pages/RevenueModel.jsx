import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Percent, Star, Truck, BarChart3, Wallet, Crown, Megaphone,
  ArrowRight, TrendingUp, ShoppingBag, Users, Building2, Receipt
} from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  AreaChart, Area, PieChart, Pie, Cell, Legend
} from "recharts";
import MarketplaceNavbar from "@/components/MarketplaceNavbar";
import MarketplaceFooter from "@/components/MarketplaceFooter";
import { Reveal, Stagger, staggerItem } from "@/components/ui/motion";

const REVENUE_STREAMS = [
  { icon: Percent, title: "Marketplace Commission", color: "from-primary to-accent", desc: "A small 3–5% service fee is added to every completed sale. Sellers keep the vast majority — EduTrade only takes a tiny cut to keep the platform running.", example: "R1,000 sale → R40 fee (4%)" },
  { icon: Star, title: "Featured Listings", color: "from-amber-500 to-orange-400", desc: "Sellers pay a small once-off fee to boost their listing to the top of search results and the homepage for a set period.", example: "R25 for 7 days at the top" },
  { icon: Crown, title: "Premium Seller Subscription", color: "from-violet-500 to-fuchsia-400", desc: "A monthly plan for active sellers: featured profile, unlimited listings, better visibility, sales analytics, priority support and early access to new features.", example: "R49 / month" },
  { icon: Megaphone, title: "Sponsored Educational Ads", color: "from-emerald-500 to-teal-400", desc: "Relevant educational advertisers only — laptop brands, study software, student banking, internet providers, printing services and educational events. No gambling, alcohol or adult content, ever.", example: "R500 / campaign" },
  { icon: Truck, title: "Delivery Service Fee", color: "from-sky-500 to-blue-400", desc: "A small convenience fee on campus delivery, courier and residence delivery options to cover logistics and tracking.", example: "R10–R35 per delivery" },
  { icon: Wallet, title: "Instant EFT & Wallet Top-ups", color: "from-rose-500 to-pink-400", desc: "A nominal processing margin on instant EFT and digital wallet transactions, kept low to stay student-friendly.", example: "1.5% per transaction" },
];

const MONTHLY = [
  { m: "Feb", rev: 18200 }, { m: "Mar", rev: 24600 }, { m: "Apr", rev: 21800 },
  { m: "May", rev: 31200 }, { m: "Jun", rev: 38900 }, { m: "Jul", rev: 47600 },
];
const SPLIT = [
  { name: "Commission", value: 52, color: "#4f46e5" },
  { name: "Featured", value: 18, color: "#f59e0b" },
  { name: "Subscriptions", value: 16, color: "#a855f7" },
  { name: "Sponsored Ads", value: 9, color: "#10b981" },
  { name: "Delivery", value: 5, color: "#0ea5e9" },
];
const TOP_UNIS = [
  { uni: "TUT", sales: 4200 }, { uni: "UJ", sales: 3100 }, { uni: "Wits", sales: 2600 },
  { uni: "UP", sales: 2400 }, { uni: "UKZN", sales: 1900 }, { uni: "CPUT", sales: 1500 },
];
const KPI = [
  { icon: Wallet, label: "Total Revenue", value: "R182,300", sub: "Last 6 months", tone: "text-primary" },
  { icon: Percent, label: "Commission Earned", value: "R94,800", sub: "52% of revenue", tone: "text-emerald-600" },
  { icon: ShoppingBag, label: "Total Orders", value: "6,420", sub: "+18% vs last qtr", tone: "text-accent" },
  { icon: Crown, label: "Premium Sellers", value: "318", sub: "R49/mo each", tone: "text-violet-600" },
  { icon: Star, label: "Featured Income", value: "R32,800", sub: "1,312 boosts", tone: "text-amber-600" },
  { icon: Users, label: "Active Users", value: "50,000+", sub: "Verified students", tone: "text-sky-600" },
];

export default function RevenueModel() {
  return (
    <div className="min-h-screen">
      <MarketplaceNavbar />

      <section className="relative overflow-hidden pt-36 pb-16">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 -left-20 w-[40rem] h-[40rem] rounded-full bg-primary/30 blur-[120px]" />
          <div className="absolute top-20 -right-20 w-[36rem] h-[36rem] rounded-full bg-accent/30 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-4xl px-4 text-center">
          <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium mb-5">
            <Wallet className="w-3.5 h-3.5 text-primary" /> How EduTrade makes money
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-heading font-extrabold text-4xl sm:text-5xl">
            The <span className="gradient-text">EduTrade</span> Revenue Model
          </motion.h1>
          <p className="mt-5 text-muted-foreground max-w-2xl mx-auto">
            EduTrade is free for students to join and browse. We generate sustainable income through small, student-friendly fees — never by selling your data or showing irrelevant ads.
          </p>
        </div>
      </section>

      {/* Revenue streams */}
      <section className="mx-auto max-w-7xl px-4 mb-24">
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REVENUE_STREAMS.map((s) => (
            <motion.div key={s.title} variants={staggerItem} className="glass rounded-3xl p-6 premium-shadow hover:-translate-y-1.5 transition-all">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} grid place-items-center text-white mb-4`}><s.icon className="w-5 h-5" /></div>
              <h3 className="font-heading font-semibold">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.desc}</p>
              <p className="mt-3 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-primary/10 text-primary inline-flex items-center gap-1">e.g. {s.example}</p>
            </motion.div>
          ))}
        </Stagger>
      </section>

      {/* Analytics dashboard preview */}
      <section className="mx-auto max-w-7xl px-4 mb-24">
        <Reveal className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h2 className="font-heading font-bold text-2xl sm:text-3xl">Revenue Analytics Dashboard</h2>
        </Reveal>

        <Stagger className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {KPI.map((k) => (
            <motion.div key={k.label} variants={staggerItem} className="glass rounded-2xl p-5 premium-shadow">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{k.label}</p>
                <k.icon className={`w-4 h-4 ${k.tone}`} />
              </div>
              <p className={`font-heading font-bold text-2xl mt-1 ${k.tone}`}>{k.value}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{k.sub}</p>
            </motion.div>
          ))}
        </Stagger>

        <div className="grid lg:grid-cols-3 gap-4">
          <Reveal className="glass rounded-3xl p-6 premium-shadow lg:col-span-2">
            <div className="flex items-center gap-2 mb-4"><TrendingUp className="w-4 h-4 text-primary" /><h3 className="font-heading font-semibold">Monthly Revenue (R)</h3></div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={MONTHLY}>
                <defs><linearGradient id="rev" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4f46e5" stopOpacity={0.5} /><stop offset="100%" stopColor="#4f46e5" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="m" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
                <Area type="monotone" dataKey="rev" stroke="#4f46e5" strokeWidth={2} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </Reveal>

          <Reveal delay={0.1} className="glass rounded-3xl p-6 premium-shadow">
            <div className="flex items-center gap-2 mb-4"><Receipt className="w-4 h-4 text-accent" /><h3 className="font-heading font-semibold">Revenue Split</h3></div>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={SPLIT} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85} paddingAngle={3}>
                  {SPLIT.map((s) => <Cell key={s.name} fill={s.color} />)}
                </Pie>
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
              </PieChart>
            </ResponsiveContainer>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="glass rounded-3xl p-6 premium-shadow mt-4">
          <div className="flex items-center gap-2 mb-4"><Building2 className="w-4 h-4 text-primary" /><h3 className="font-heading font-semibold">Top Universities by Sales</h3></div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={TOP_UNIS}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="uni" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
              <Bar dataKey="sales" radius={[8, 8, 0, 0]} fill="url(#barGrad)" />
              <defs><linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a855f7" /><stop offset="100%" stopColor="#4f46e5" /></linearGradient></defs>
            </BarChart>
          </ResponsiveContainer>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 mb-24">
        <Reveal className="relative overflow-hidden rounded-3xl p-10 lg:p-14 text-center bg-gradient-to-br from-primary to-accent text-white premium-shadow">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="relative">
            <h2 className="font-heading font-bold text-3xl">Built for students, sustainable for EduTrade</h2>
            <p className="mt-3 text-white/80 max-w-xl mx-auto">Small fees, big value. EduTrade stays free to join while earning fairly from the features that help sellers succeed.</p>
            <Link to="/sell" className="mt-7 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-semibold text-sm hover:scale-105 transition-transform">Start selling <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </Reveal>
      </section>

      <MarketplaceFooter />
    </div>
  );
}