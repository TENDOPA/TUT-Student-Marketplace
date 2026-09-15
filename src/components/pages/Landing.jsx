import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Star,
  Bot,
  Tag,
  AlertTriangle,
  Store,
  Quote,
  ChevronDown,
  Megaphone,
  Clock,
  Plus,
  Users,
} from "lucide-react";

import MarketplaceNavBar from "@/components/MarketplaceNavBar";
import MarketplaceFooter from "@/components/Marketplacefooter";
import EduTradeAssistant from "@/components/EduTradeAssisstant";
import ProductCard from "@/components/ProductCard";
import { Reveal, CountUp, Stagger, staggerItem } from "@/components/ui/motion";

import {
  CATEGORIES,
  FEATURED_CATEGORIES,
  PRODUCTS,
  BUSINESSES,
  TESTIMONIALS,
  STATS,
  FEATURED_SELLERS,
  FAQS,
  ANNOUNCEMENTS,
} from "../data/marketplace";

import { POPULAR_UNIVERSITIES } from "../data/universities";

export default function Landing() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [openFaq, setOpenFaq] = useState(0);

  const trending = PRODUCTS.filter((p) => p.trending).slice(0, 8);
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 8);
  const recent = PRODUCTS.slice(-8).reverse();

  const topBiz = BUSINESSES
    .filter((b) => b.sponsored)
    .concat(BUSINESSES.filter((b) => !b.sponsored))
    .slice(0, 4);

  return (
    <div className="min-h-screen">
      <MarketplaceNavBar />
      <EduTradeAssistant />

      {/* HERO */}
      <section className="relative overflow-hidden pt-36 pb-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 -left-20 w-[40rem] h-[40rem] rounded-full bg-primary/30 blur-[120px]" />
          <div className="absolute top-20 -right-20 w-[36rem] h-[36rem] rounded-full bg-accent/30 blur-[120px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium mb-6">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              Verified students & lecturers from SA universities
            </span>

            <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Buy. Sell. Learn.
              </motion.span>

              <motion.span
                className="block gradient-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                Only on EduTrade.
              </motion.span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
              The secure marketplace built exclusively for verified students
              and lecturers from South African universities and public
              colleges. Discover textbooks, laptops, accommodation, services
              and more — within your trusted academic community.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigate(
                  `/marketplace?q=${encodeURIComponent(query)}`
                );
              }}
              className="mt-8 flex items-center gap-2 glass-strong rounded-2xl p-2 premium-shadow max-w-xl mx-auto"
            >
              <Search className="w-5 h-5 text-muted-foreground ml-3" />

              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for textbooks, laptops, rooms…"
                className="flex-1 bg-transparent outline-none text-sm px-1"
              />

              <button className="px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-medium btn-glow hover:scale-[1.03] transition-transform">
                Search
              </button>
            </form>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-muted-foreground">Popular:</span>

              {[
                "MacBook",
                "Textbooks",
                "Rooms near campus",
                "Calculators",
              ].map((t) => (
                <button
                  key={t}
                  onClick={() =>
                    navigate(
                      `/marketplace?q=${encodeURIComponent(t)}`
                    )
                  }
                  className="px-3 py-1 rounded-full glass hover:bg-primary/10 hover:scale-105 transition-all"
                >
                  {t}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-4 -mt-8 mb-24">
        <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <motion.div
              key={s.label}
              variants={staggerItem}
              className="glass rounded-2xl p-6 text-center premium-shadow hover:-translate-y-1 transition-transform"
            >
              <p className="font-heading font-bold text-3xl sm:text-4xl gradient-text">
                <CountUp to={s.value} suffix={s.suffix} />
              </p>

              <p className="text-xs text-muted-foreground mt-1">
                {s.label}
              </p>
            </motion.div>
          ))}
        </Stagger>
      </section>

      {/* POPULAR UNIVERSITIES */}
      <section className="mx-auto max-w-7xl px-4 mb-24">
        <SectionHeader
          eyebrow="Nationwide"
          title="Popular Universities"
          subtitle="EduTrade connects students across South Africa's leading institutions"
          icon={<ShieldCheck className="w-4 h-4 text-primary" />}
        />

        <Stagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {POPULAR_UNIVERSITIES.map((u) => (
            <motion.button
              key={u.domain}
              variants={staggerItem}
              onClick={() =>
                navigate(
                  `/marketplace?q=${encodeURIComponent(u.short)}`
                )
              }
              className="group glass rounded-2xl p-4 text-center hover:-translate-y-1.5 hover:shadow-xl transition-all premium-shadow"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-primary to-accent grid place-items-center text-white font-heading font-bold mb-2 group-hover:scale-110 transition-transform">
                {u.short.slice(0, 2)}
              </div>

              <p className="font-heading font-semibold text-xs leading-tight">
                {u.short}
              </p>

              <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">
                {u.name}
              </p>

              <span className="mt-1.5 inline-block text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 capitalize">
                {u.type === "tvet" ? "TVET" : "University"}
              </span>
            </motion.button>
          ))}
        </Stagger>
      </section>

      {/* FEATURED CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 mb-24">
        <SectionHeader
          eyebrow="Browse"
          title="Featured Categories"
          subtitle="Find exactly what you need across campus"
        />

        <Stagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {FEATURED_CATEGORIES.map((c) => (
            <motion.button
              key={c.id}
              variants={staggerItem}
              onClick={() =>
                navigate(`/marketplace?cat=${c.id}`)
              }
              className="group glass rounded-2xl p-5 text-left hover:-translate-y-1.5 hover:shadow-xl transition-all premium-shadow"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} grid place-items-center text-white mb-3 group-hover:scale-110 group-hover:rotate-3 transition-transform`}
              >
                <c.icon className="w-5 h-5" />
              </div>

              <p className="font-heading font-semibold text-sm">
                {c.name}
              </p>

              <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1">
                Browse
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </p>
            </motion.button>
          ))}
        </Stagger>
      </section>

      {/* FEATURED LISTINGS */}
      <section className="mx-auto max-w-7xl px-4 mb-24">
        <SectionHeader
          eyebrow="Editor's picks"
          title="Featured Listings"
          subtitle="Hand-picked deals from verified student sellers"
          icon={<Sparkles className="w-4 h-4 text-primary" />}
          action={
            <Link
              to="/marketplace"
              className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          }
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* AI FEATURES */}
      <section className="mx-auto max-w-7xl px-4 mb-24">
        <Reveal className="relative glass-strong rounded-3xl p-8 lg:p-12 overflow-hidden premium-shadow">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-accent/20 blur-3xl" />

          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium mb-4">
                <Bot className="w-3.5 h-3.5" />
                AI-Powered
              </span>

              <h2 className="font-heading font-bold text-3xl sm:text-4xl">
                Smarter selling with built-in AI
              </h2>

              <p className="mt-4 text-muted-foreground">
                Let AI help you write descriptions, suggest fair prices,
                detect scams and recommend the right category — all designed
                for EduTrade.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  {
                    icon: Sparkles,
                    title: "AI description generator",
                    desc: "Turn a few bullet points into a polished listing.",
                  },
                  {
                    icon: Tag,
                    title: "AI price suggestion",
                    desc: "Fair market pricing based on similar listings.",
                  },
                  {
                    icon: AlertTriangle,
                    title: "AI scam detection",
                    desc: "Warnings before you message a risky seller.",
                  },
                ].map((f) => (
                  <Reveal
                    key={f.title}
                    delay={0.05}
                    className="flex items-start gap-3"
                  >
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent grid place-items-center text-white shrink-0">
                      <f.icon className="w-4 h-4" />
                    </div>

                    <div>
                      <p className="font-medium text-sm">
                        {f.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {f.desc}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Link
                to="/sell"
                className="mt-7 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-medium btn-glow hover:scale-[1.03] transition-transform"
              >
                Try selling with AI
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="glass rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Bot className="w-4 h-4 text-accent" />
                AI Price Check
              </div>

              <div className="rounded-xl bg-background/60 border border-border p-4">
                <p className="text-xs text-muted-foreground mb-1">
                  Listed: R9,200 · Samsung S23 Ultra
                </p>

                <p className="text-sm">
                  Fair range:{" "}
                  <span className="font-semibold gradient-text">
                    R8,200 – R9,500
                  </span>
                </p>

                <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "75%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  />
                </div>

                <p className="text-[11px] text-muted-foreground mt-2">
                  ✓ Price is within market range. Consider marking as
                  negotiable.
                </p>
              </div>

              <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-3 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />

                <p className="text-xs">
                  This seller was created recently. Meet at a campus pickup
                  point for safety.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* TRENDING */}
      <section className="mx-auto max-w-7xl px-4 mb-24">
        <SectionHeader
          eyebrow="Hot right now"
          title="Trending Products"
          subtitle="The most-viewed listings this week"
          icon={<TrendingUp className="w-4 h-4 text-amber-500" />}
          action={
            <Link
              to="/marketplace"
              className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          }
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {trending.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* RECENTLY ADDED */}
      <section className="mx-auto max-w-7xl px-4 mb-24">
        <SectionHeader
          eyebrow="Just listed"
          title="Recently Added"
          subtitle="Fresh listings from across campuses"
          icon={<Clock className="w-4 h-4 text-primary" />}
          action={
            <Link
              to="/marketplace"
              className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          }
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {recent.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* FEATURED SELLERS */}
      <section className="mx-auto max-w-7xl px-4 mb-24">
        <SectionHeader
          eyebrow="Top rated"
          title="Featured Sellers"
          subtitle="Trusted verified students with great track records"
          icon={<Users className="w-4 h-4 text-primary" />}
          action={
            <Link
              to="/businesses"
              className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
            >
              All businesses
              <ArrowRight className="w-4 h-4" />
            </Link>
          }
        />

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURED_SELLERS.map((s) => (
            <motion.div
              key={s.id}
              variants={staggerItem}
              className="group glass rounded-3xl p-5 text-center premium-shadow hover:-translate-y-1.5 transition-all"
            >
              <div className="relative w-20 h-20 mx-auto">
                <img
                  src={s.avatar}
                  alt={s.name}
                  className="w-20 h-20 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all"
                />

                {s.verified && (
                  <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary grid place-items-center text-white border-2 border-background">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>

              <p className="font-heading font-semibold text-sm mt-3">
                {s.name}
              </p>

              <p className="text-[11px] text-muted-foreground mt-0.5">
                {s.faculty}
              </p>

              <div className="flex items-center justify-center gap-3 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {s.rating}
                </span>

                <span>{s.sales} sales</span>
              </div>

              <p className="text-[11px] text-muted-foreground mt-1 flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3" />
                {s.campus} campus
              </p>

              <Link
                to="/profile"
                className="mt-3 inline-block px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
              >
                View profile
              </Link>
            </motion.div>
          ))}
        </Stagger>
      </section>

      {/* STUDENT BUSINESSES */}
      <section className="mx-auto max-w-7xl px-4 mb-24">
        <SectionHeader
          eyebrow="Student entrepreneurs"
          title="Featured Student Businesses"
          subtitle="Support businesses run by your fellow students"
          icon={<Store className="w-4 h-4 text-primary" />}
          action={
            <Link
              to="/businesses"
              className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
            >
              All businesses
              <ArrowRight className="w-4 h-4" />
            </Link>
          }
        />

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topBiz.map((b) => (
            <motion.div
              key={b.id}
              variants={staggerItem}
              className="group glass rounded-3xl overflow-hidden premium-shadow hover:-translate-y-1.5 transition-all"
            >
              <div className="relative h-36 overflow-hidden">
                <img
                  src={b.image}
                  alt={b.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {b.sponsored && (
                  <span className="absolute top-3 left-3 text-[10px] font-semibold px-2 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white">
                    Sponsored
                  </span>
                )}

                {b.verified && (
                  <span className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 grid place-items-center">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                  </span>
                )}
              </div>

              <div className="p-4">
                <p className="text-[10px] uppercase tracking-wide text-accent font-medium capitalize">
                  {b.category}
                </p>

                <h3 className="font-heading font-semibold text-sm mt-1">
                  {b.name}
                </h3>

                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {b.tagline}
                </p>

                <div className="flex items-center justify-between mt-3 text-xs">
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {b.rating} ({b.reviews})
                  </span>

                  <span className="text-muted-foreground">
                    {b.campus}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </Stagger>
      </section>

      {/* CAMPUS ANNOUNCEMENTS */}
      <section className="mx-auto max-w-7xl px-4 mb-24">
        <SectionHeader
          eyebrow="Stay informed"
          title="Campus Announcements"
          subtitle="Latest updates from the EduTrade team"
          icon={<Megaphone className="w-4 h-4 text-primary" />}
        />

        <Stagger className="grid sm:grid-cols-3 gap-4">
          {ANNOUNCEMENTS.map((a) => (
            <motion.div
              key={a.id}
              variants={staggerItem}
              className={`glass rounded-2xl p-5 premium-shadow hover:-translate-y-1 transition-all border-l-4 ${
                a.tone === "primary"
                  ? "border-primary"
                  : a.tone === "accent"
                  ? "border-accent"
                  : "border-emerald-500"
              }`}
            >
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-2">
                <Megaphone className="w-3.5 h-3.5" />
                {a.date}
              </div>

              <p className="font-heading font-semibold text-sm">
                {a.title}
              </p>

              <p className="text-xs text-muted-foreground mt-1">
                {a.body}
              </p>
            </motion.div>
          ))}
        </Stagger>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 mb-24">
        <SectionHeader
          eyebrow="Loved by students"
          title="What students say"
          subtitle="Real experiences from the EduTrade community"
          icon={<Quote className="w-4 h-4 text-primary" />}
        />

        <Stagger className="grid md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.id}
              variants={staggerItem}
              className="glass rounded-3xl p-6 premium-shadow hover:-translate-y-1 transition-all"
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <p className="text-sm leading-relaxed">
                "{t.text}"
              </p>

              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div>
                  <p className="font-medium text-sm">{t.name}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </Stagger>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 mb-24">
        <SectionHeader
          eyebrow="Need help?"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about EduTrade"
        />

        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <Reveal
              key={i}
              delay={i * 0.04}
              className="glass rounded-2xl overflow-hidden premium-shadow"
            >
              <button
                onClick={() =>
                  setOpenFaq(openFaq === i ? -1 : i)
                }
                className="w-full flex items-center justify-between gap-3 p-5 text-left"
              >
                <span className="font-heading font-semibold text-sm">
                  {f.q}
                </span>

                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${
                    openFaq === i ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-muted-foreground">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 mb-24">
        <Reveal className="relative overflow-hidden rounded-3xl p-10 lg:p-16 text-center bg-gradient-to-br from-primary to-accent text-white premium-shadow">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl">
              Got something to sell?
            </h2>

            <p className="mt-3 text-white/80 max-w-lg mx-auto">
              List it in minutes and reach thousands of verified SA students
              across all campuses.
            </p>

            <Link
              to="/sell"
              className="mt-7 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-semibold text-sm hover:scale-105 hover:shadow-2xl transition-all"
            >
              <Plus className="w-4 h-4" />
              Start selling
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      <MarketplaceFooter />
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  icon,
  action,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
      <Reveal>
        <span className="text-xs font-medium uppercase tracking-wider text-primary flex items-center gap-1.5">
          {icon}
          {eyebrow}
        </span>

        <h2 className="font-heading font-bold text-2xl sm:text-3xl mt-1">
          {title}
        </h2>

        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">
            {subtitle}
          </p>
        )}
      </Reveal>

      {action}
    </div>
  );
}
