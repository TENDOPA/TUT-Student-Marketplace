import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ImageIcon, X, Bot, Sparkles, Tag, AlertTriangle, ShieldCheck, Upload, Check
} from "lucide-react";
import { CATEGORIES, CAMPUSES, FACULTIES, CONDITIONS, AI_SUGGESTIONS } from "../data/marketplace";

export default function SellItem() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [form, setForm] = useState({
    title: "", description: "", price: "", category: "electronics",
    campus: "Pretoria", faculty: FACULTIES[0], condition: "Good",
    negotiable: true, whatsapp: true, call: false,
  });
  const [aiBusy, setAiBusy] = useState(false);
  const [aiApplied, setAiApplied] = useState(false);
  const [aiPriceOpen, setAiPriceOpen] = useState(false);

  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []);
    const urls = files.slice(0, 6).map(f => URL.createObjectURL(f));
    setImages(prev => [...prev, ...urls].slice(0, 6));
  };

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const generateDescription = () => {
    setAiBusy(true);
    setTimeout(() => {
      setForm(prev => ({ ...prev, description: AI_SUGGESTIONS.description }));
      setAiBusy(false);
      setAiApplied(true);
    }, 1200);
  };

  const submit = (e) => {
    e.preventDefault();
    navigate("/marketplace");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary mb-2">
          <ShieldCheck className="w-3.5 h-3.5" /> Verified students only
        </span>
        <h1 className="font-heading font-bold text-2xl sm:text-3xl">List a new item</h1>
        <p className="text-sm text-muted-foreground mt-1">Reach thousands of TUT students. Use AI to make your listing stand out.</p>
      </div>

      <form onSubmit={submit} className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
        <div className="space-y-6">
          {/* Photos */}
          <Card title="Photos" subtitle="Add up to 6 photos. First photo is the cover.">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              <label className="aspect-square rounded-2xl border-2 border-dashed border-border hover:border-primary/50 grid place-items-center cursor-pointer transition-colors glass">
                <input type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />
                <div className="text-center text-muted-foreground">
                  <Upload className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-[10px]">Upload</span>
                </div>
              </label>
              {images.map((src, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative aspect-square rounded-2xl overflow-hidden glass">
                  <img src={src} alt="" className="w-full h-full object-cover" />
                  {i === 0 && <span className="absolute top-1 left-1 text-[9px] px-1.5 py-0.5 rounded-full bg-primary text-white">Cover</span>}
                  <button type="button" onClick={() => setImages(images.filter((_, j) => j !== i))} className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/50 grid place-items-center text-white">
                    <X className="w-3 h-3" />
                  </button>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Details */}
          <Card title="Listing details" subtitle="Tell students what you're selling">
            <Field label="Title">
              <input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. MacBook Air M2 - Excellent Condition" className="input" />
            </Field>
            <Field label="Description">
              <div className="relative">
                <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={5} placeholder="Describe your item — condition, specs, reason for selling…" className="input resize-none" />
                <button type="button" onClick={generateDescription} disabled={aiBusy} className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary to-accent text-white text-[11px] font-medium disabled:opacity-60">
                  {aiBusy ? <Bot className="w-3.5 h-3.5 animate-pulse" /> : <Sparkles className="w-3.5 h-3.5" />}
                  {aiBusy ? "Generating…" : "AI write"}
                </button>
              </div>
              {aiApplied && <p className="text-[11px] text-primary mt-1.5 flex items-center gap-1"><Check className="w-3 h-3" /> AI description applied</p>}
            </Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Price (R)">
                <input type="number" value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="0" className="input" />
              </Field>
              <Field label="Condition">
                <select value={form.condition} onChange={(e) => set("condition", e.target.value)} className="input">
                  {CONDITIONS.map(c => <option key={c}>{c}</option>)}
                </select>
              </Field>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Category">
                <select value={form.category} onChange={(e) => set("category", e.target.value)} className="input">
                  {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </Field>
              <Field label="Campus">
                <select value={form.campus} onChange={(e) => set("campus", e.target.value)} className="input">
                  {CAMPUSES.map(c => <option key={c}>{c}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Faculty">
              <select value={form.faculty} onChange={(e) => set("faculty", e.target.value)} className="input">
                {FACULTIES.map(f => <option key={f}>{f}</option>)}
              </select>
            </Field>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.negotiable} onChange={(e) => set("negotiable", e.target.checked)} className="accent-primary w-4 h-4" />
              Price is negotiable
            </label>
          </Card>

          {/* Contact */}
          <Card title="Contact options" subtitle="How should buyers reach you?">
            <div className="flex flex-wrap gap-2">
              <Toggle active={form.whatsapp} onClick={() => set("whatsapp", !form.whatsapp)}>WhatsApp</Toggle>
              <Toggle active={form.call} onClick={() => set("call", !form.call)}>Call</Toggle>
            </div>
          </Card>
        </div>

        {/* Sidebar: AI + publish */}
        <div className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <div className="glass rounded-3xl p-5 premium-shadow">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent grid place-items-center text-white"><Bot className="w-4 h-4" /></div>
              <div>
                <p className="font-heading font-semibold text-sm">AI Listing Assistant</p>
                <p className="text-[11px] text-muted-foreground">Smart suggestions for your listing</p>
              </div>
            </div>
            <div className="space-y-2">
              <AIButton icon={Tag} label="Suggest a fair price" onClick={() => setAiPriceOpen(!aiPriceOpen)} />
              {aiPriceOpen && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="rounded-xl bg-background/60 border border-border p-3">
                  <p className="text-[11px] text-muted-foreground">Based on similar listings:</p>
                  <p className="text-sm font-semibold gradient-text mt-1">R8,200 – R9,500</p>
                  <p className="text-[11px] text-muted-foreground mt-1">{AI_SUGGESTIONS.priceNote.split(".")[0]}.</p>
                </motion.div>
              )}
              <AIButton icon={Sparkles} label="Generate description" onClick={generateDescription} />
              <AIButton icon={ShieldCheck} label="Recommend category" onClick={() => set("category", AI_SUGGESTIONS.category)} />
            </div>
            <div className="mt-3 rounded-xl bg-amber-500/10 border border-amber-500/30 p-3 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-[11px] text-muted-foreground">AI scam detection will scan buyers messaging you and flag suspicious activity.</p>
            </div>
          </div>

          <div className="glass rounded-3xl p-5">
            <p className="text-xs text-muted-foreground mb-3">Your listing will be visible to <span className="font-medium text-foreground">12,400+ verified TUT students</span>.</p>
            <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-medium text-sm premium-shadow hover:scale-[1.02] transition-transform">
              Publish listing
            </button>
            <p className="text-[10px] text-muted-foreground text-center mt-2">By publishing you agree to our marketplace safety guidelines.</p>
          </div>
        </div>
      </form>

      <style>{`.input{width:100%;background:hsl(var(--background)/0.6);border:1px solid hsl(var(--border));border-radius:0.85rem;padding:0.65rem 0.85rem;font-size:0.875rem;outline:none}.input:focus{border-color:hsl(var(--primary))}`}</style>
    </div>
  );
}

function Card({ title, subtitle, children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-6 premium-shadow">
      <div className="mb-4">
        <h2 className="font-heading font-semibold text-base">{title}</h2>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      <div className="space-y-4">{children}</div>
    </motion.div>
  );
}
function Field({ label, children }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}
function Toggle({ active, onClick, children }) {
  return (
    <button type="button" onClick={onClick} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${active ? "bg-gradient-to-r from-primary to-accent text-white" : "glass"}`}>
      {children}
    </button>
  );
}
function AIButton({ icon: Icon, label, onClick }) {
  return (
    <button type="button" onClick={onClick} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl bg-background/60 border border-border hover:border-primary/40 text-sm font-medium transition-colors">
      <Icon className="w-4 h-4 text-accent" /> {label}
    </button>
  );
}