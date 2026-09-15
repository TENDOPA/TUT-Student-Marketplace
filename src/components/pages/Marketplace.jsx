import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X, MapPin } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { ProductSkeleton } from "@/components/ui/motion";
import { PRODUCTS, CATEGORIES, CAMPUSES, CONDITIONS, FACULTIES } from "../data/marketplace";

const SORTS = [
{ id: "relevance", label: "Relevance" },
{ id: "price_low", label: "Price: Low to High" },
{ id: "price_high", label: "Price: High to Low" },
{ id: "rating", label: "Top Rated" },
{ id: "newest", label: "Newest" }];


export default function Marketplace() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const [cat, setCat] = useState(params.get("cat") || "all");
  const [campus, setCampus] = useState("all");
  const [condition, setCondition] = useState("all");
  const [maxPrice, setMaxPrice] = useState(15000);
  const [sort, setSort] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const c = params.get("cat");
    if (c) setCat(c);
    const q = params.get("q");
    if (q) setQuery(q);
  }, [params]);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, [query, cat, campus, condition, sort]);

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q)));
    }
    if (cat !== "all") list = list.filter((p) => p.category === cat);
    if (campus !== "all") list = list.filter((p) => p.campus === campus);
    if (condition !== "all") list = list.filter((p) => p.condition === condition);
    list = list.filter((p) => p.price <= maxPrice);
    switch (sort) {
      case "price_low":list.sort((a, b) => a.price - b.price);break;
      case "price_high":list.sort((a, b) => b.price - a.price);break;
      case "rating":list.sort((a, b) => b.rating - a.rating);break;
      case "newest":list.reverse();break;
    }
    return list;
  }, [query, cat, campus, condition, maxPrice, sort]);

  const activeCount = [cat !== "all", campus !== "all", condition !== "all"].filter(Boolean).length;

  const reset = () => {setCat("all");setCampus("all");setCondition("all");setMaxPrice(15000);setQuery("");setParams({});};

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl">Marketplace</h1>
        <p className="text-sm text-muted-foreground mt-1">Browse verified listings from TUT students across all campuses.</p>
      </div>

      {/* Search + sort */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 flex items-center gap-2 glass rounded-2xl px-4 py-3">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, services, businesses…"
            className="bg-transparent outline-none text-sm flex-1" />
          
          {query && <button onClick={() => setQuery("")}><X className="w-4 h-4 text-muted-foreground" /></button>}
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden flex items-center gap-2 px-4 rounded-2xl glass py-3 text-sm font-medium">
            <SlidersHorizontal className="w-4 h-4" /> Filters {activeCount > 0 && <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] grid place-items-center">{activeCount}</span>}
          </button>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="glass rounded-2xl px-4 py-3 text-sm font-medium outline-none bg-background">
            {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>
      </div>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-6">
        <Pill active={cat === "all"} onClick={() => setCat("all")}>All</Pill>
        {CATEGORIES.map((c) =>
        <Pill key={c.id} active={cat === c.id} onClick={() => setCat(c.id)}>
            <c.icon className="w-3.5 h-3.5" /> {c.name}
          </Pill>
        )}
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-6">
        {/* Filters sidebar */}
        <aside className={`${showFilters ? "block" : "hidden"} lg:block`}>
          <div className="glass rounded-2xl p-5 sticky top-28">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-sm">Filters</h3>
              {activeCount > 0 && <button onClick={reset} className="text-xs text-primary hover:underline">Reset</button>}
            </div>
            <FilterGroup label="Campus">
              <select value={campus} onChange={(e) => setCampus(e.target.value)} className="w-full bg-background rounded-xl px-3 py-2 text-sm border border-border outline-none">
                <option value="all">All campuses</option>
                {CAMPUSES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </FilterGroup>
            <FilterGroup label="Condition">
              <div className="flex flex-wrap gap-1.5">
                <Chip active={condition === "all"} onClick={() => setCondition("all")}>Any</Chip>
                {CONDITIONS.map((c) => <Chip key={c} active={condition === c} onClick={() => setCondition(c)}>{c}</Chip>)}
              </div>
            </FilterGroup>
            <FilterGroup label={`Max price: R${maxPrice.toLocaleString()}`}>
              <input type="range" min={50} max={15000} step={50} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-primary" />
              <div className="flex justify-between text-[10px] text-muted-foreground"><span>R50</span><span>R15,000</span></div>
            </FilterGroup>
            <FilterGroup label="Faculty">
              <select className="w-full bg-background rounded-xl px-3 py-2 text-sm border border-border outline-none">
                <option>All faculties</option>
                {FACULTIES.map((f) => <option key={f}>{f}</option>)}
              </select>
            </FilterGroup>
          </div>
        </aside>

        {/* Grid */}
        <div>
          <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
            <span><span className="font-semibold text-foreground">{filtered.length}</span> results</span>
            {cat !== "all" && <span className="flex items-center gap-1 capitalize"><X className="w-3 h-3 cursor-pointer" onClick={() => setCat("all")} /> {cat}</span>}
          </div>
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 9 }).map((_, i) => <ProductSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
          <div className="glass rounded-3xl p-16 text-center">
              <MapPin className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
              <p className="font-heading font-semibold">No listings found</p>
              <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or search.</p>
              <button onClick={reset} className="mt-4 px-4 py-2 rounded-xl bg-primary text-white text-sm">Clear filters</button>
            </div>
          ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((p, i) =>
            <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                   <ProductCard product={p} index={i} />
                 </motion.div>
            )}
            </div>
          )}
        </div>
      </div>
    </div>);

}

function Pill({ active, onClick, children }) {
  return (
    <button onClick={onClick} className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full font-medium transition-all text-sm ${active ? "bg-gradient-to-r from-primary to-accent text-white premium-shadow" : "glass hover:bg-primary/10"}`}>
      {children}
    </button>);

}
function FilterGroup({ label, children }) {
  return (
    <div className="mb-5">
      <p className="text-xs font-medium text-muted-foreground mb-2">{label}</p>
      {children}
    </div>);

}
function Chip({ active, onClick, children }) {
  return (
    <button onClick={onClick} className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${active ? "bg-primary text-white" : "bg-background border border-border hover:border-primary/40"}`}>
      {children}
    </button>);

}