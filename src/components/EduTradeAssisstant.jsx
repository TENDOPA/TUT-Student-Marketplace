import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, Loader2, ShieldCheck } from "lucide-react";
import { base44 } from "@/api/base44Client";

const SUGGESTIONS = [
  "Recommend textbooks for my IT modules",
  "Suggest a laptop for engineering students",
  "Find accommodation near Pretoria campus",
  "Recommend highly-rated tutoring services",
  "Buying tips for second-hand laptops",
  "Selling tips to sell my items faster",
  "Remind me about my upcoming deadlines",
];

export default function EduTradeAssistant() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    let active = true;
    base44.auth.isAuthenticated().then(async (ok) => {
      if (!ok) return;
      try {
        const me = await base44.auth.me();
        if (active && me) setUser(me);
      } catch { /* ignore */ }
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (open && messages.length === 0) {
      const hr = new Date().getHours();
      const part = hr < 12 ? "Good morning" : hr < 17 ? "Good afternoon" : hr < 21 ? "Good evening" : "Burning the midnight oil";
      const firstName = user?.full_name?.split(" ")[0];
      const bday = new Date().getMonth() === 6 && new Date().getDate() === 22; // Jul 22 demo birthday
      const intro = firstName
        ? `${part}, ${firstName}! 👋 I'm your EduTrade assistant. I can recommend textbooks & electronics for your modules, find accommodation, suggest top-rated sellers, and remind you about deadlines.`
        : `${part}! 👋 I'm the EduTrade assistant. I can help you find products, recommend textbooks, explain delivery, and give buying & selling tips.`;
      const greet = bday ? `🎉 Happy birthday${firstName ? ", " + firstName : ""}! EduTrade wishes you a fantastic day! ${intro}` : intro;
      setMessages([{ role: "assistant", text: greet }]);
    }
  }, [open, user, messages.length]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, busy]);

  const send = async (text) => {
    const content = (text || draft).trim();
    if (!content || busy) return;
    setDraft("");
    const next = [...messages, { role: "user", text: content }];
    setMessages(next);
    setBusy(true);
    try {
      const prompt = `You are the EduTrade AI assistant for a South African student-only marketplace (verified university/college emails only). Be friendly, professional and concise (max 90 words). The marketplace sells education-related items: textbooks, calculators, laptops, tablets, phones, IT accessories, stationery, accommodation, tutoring and repair services. EduTrade offers campus pickup, campus delivery, courier, residence delivery and locker pickup with real-time tracking. Prioritise highly-rated, verified sellers when recommending. You can also give buying tips, selling tips, recommend study groups, and remind students about assignment/exam deadlines.${user?.full_name ? ` The logged-in user is ${user.full_name}.` : ""} Student question: "${content}"`;
      const res = await base44.integrations.Core.InvokeLLM({ prompt });
      const reply = typeof res === "string" ? res : res?.response || res?.text || "Sorry, I couldn't process that. Try rephrasing.";
      setMessages((m) => [...m, { role: "assistant", text: reply }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", text: "I'm having trouble connecting right now. Please try again in a moment." }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent text-white grid place-items-center premium-shadow"
        aria-label="EduTrade Assistant"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X className="w-6 h-6" /></motion.span>
          ) : (
            <motion.span key="b" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><Bot className="w-6 h-6" /></motion.span>
          )}
        </AnimatePresence>
        {!open && <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-5 z-50 w-[92vw] max-w-sm glass-strong rounded-3xl premium-shadow overflow-hidden flex flex-col"
            style={{ height: "70vh", maxHeight: 560 }}
          >
            <div className="flex items-center gap-3 p-4 border-b border-border bg-gradient-to-r from-primary/10 to-accent/10">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent grid place-items-center text-white"><Bot className="w-5 h-5" /></div>
              <div className="flex-1">
                <p className="font-heading font-semibold text-sm flex items-center gap-1.5">EduTrade Assistant <Sparkles className="w-3.5 h-3.5 text-accent" /></p>
                <p className="text-[11px] text-muted-foreground flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Online · {user ? "Personalised" : "Ready to help"}</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${m.role === "user" ? "bg-gradient-to-br from-primary to-accent text-white rounded-br-sm" : "glass rounded-bl-sm"}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {busy && (
                <div className="flex justify-start">
                  <div className="glass px-3.5 py-2.5 rounded-2xl rounded-bl-sm flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="w-4 h-4 animate-spin" /> Thinking…</div>
                </div>
              )}
              {messages.length <= 1 && !busy && (
                <div className="pt-1 space-y-1.5">
                  {SUGGESTIONS.map((s) => (
                    <button key={s} onClick={() => send(s)} className="w-full text-left text-xs px-3 py-2 rounded-xl glass hover:bg-primary/10 hover:scale-[1.01] transition-all flex items-center gap-2"><Sparkles className="w-3.5 h-3.5 text-accent shrink-0" /> {s}</button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-3 border-t border-border">
              <div className="flex items-center gap-2 glass rounded-2xl px-3 py-2">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") send(); }}
                  placeholder="Ask EduTrade AI…"
                  className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                />
                <button onClick={() => send()} disabled={busy || !draft.trim()} className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent text-white grid place-items-center disabled:opacity-40 hover:scale-105 transition-transform">
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-muted-foreground mt-2 flex items-center gap-1 justify-center"><ShieldCheck className="w-3 h-3 text-primary" /> AI guidance only — always verify listings & meet safely on campus.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}