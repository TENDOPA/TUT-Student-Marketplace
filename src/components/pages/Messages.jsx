import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Search, Send, Phone, Video, MoreVertical, ShieldCheck, ArrowLeft,
  Paperclip, Smile, BadgeCheck, Lock, CornerDownLeft, CheckCheck, Bell
} from "lucide-react";
import { PRODUCTS } from "../data/marketplace";

const STARTER = [
  {
    id: "c1",
    sellerId: "p1",
    name: "Thabo Mokoena",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    verified: true,
    productTitle: "MacBook Air M2 (2023) - 256GB",
    productId: "p1",
    last: "Slight, but I prefer 14k flat.",
    time: "2m",
    unread: 2,
    online: true,
    messages: [
      { id: "m1", from: "them", text: "Hi, is the MacBook still available?", time: "16:42" },
      { id: "m2", from: "me", text: "Yes it is! Barely used, like new condition.", time: "16:43" },
      { id: "m3", from: "them", text: "Great. Would you accept R13,000?", time: "16:44" },
      { id: "m4", from: "me", text: "I could do R14,000 — it includes the original box and charger.", time: "16:45" },
      { id: "m5", from: "them", text: "Slight, but I prefer 14k flat.", time: "16:48" },
    ],
  },
  {
    id: "c2",
    sellerId: "p2",
    name: "Lerato Dlamini",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    verified: true,
    productTitle: "Engineering Mathematics Textbook (7th Ed)",
    productId: "p2",
    last: "Perfect, see you at the library tomorrow 📚",
    time: "1h",
    unread: 0,
    online: false,
    messages: [
      { id: "m1", from: "them", text: "Hello, are the notes complete for the full syllabus?", time: "14:10" },
      { id: "m2", from: "me", text: "Yes, everything from chapter 1 to 12 plus past papers.", time: "14:12" },
      { id: "m3", from: "them", text: "Perfect, see you at the library tomorrow 📚", time: "14:15" },
    ],
  },
  {
    id: "c3",
    sellerId: "p9",
    name: "Zanele Mahlangu",
    avatar: "https://images.unsplash.com/photo-1559548331-f9cb980014e0?auto=format&fit=crop&w=200&q=80",
    verified: true,
    productTitle: "Home-Cooked Meal Prep (Weekly)",
    productId: "p9",
    last: "Your weekly plan is confirmed ✅",
    time: "3h",
    unread: 0,
    online: true,
    messages: [
      { id: "m1", from: "me", text: "Hi Zanele, I'd like to subscribe to the weekly meal prep.", time: "11:20" },
      { id: "m2", from: "them", text: "Awesome! Delivery to res is free. Which menu option do you prefer?", time: "11:25" },
      { id: "m3", from: "me", text: "The balanced one please.", time: "11:27" },
      { id: "m4", from: "them", text: "Your weekly plan is confirmed ✅", time: "11:30" },
    ],
  },
  {
    id: "c4",
    sellerId: "p3",
    name: "Sipho Nkosi",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    verified: true,
    productTitle: "PS5 Slim Disc Edition + 2 Controllers",
    productId: "p3",
    last: "Can we meet at the campus pickup point?",
    time: "1d",
    unread: 1,
    online: false,
    messages: [
      { id: "m1", from: "them", text: "Still interested in the PS5?", time: "Yesterday" },
      { id: "m2", from: "me", text: "Yes — can you do R8,000?", time: "Yesterday" },
      { id: "m3", from: "them", text: "Can we meet at the campus pickup point?", time: "Yesterday" },
    ],
  },
];

export default function Messages() {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState(STARTER);
  const [activeId, setActiveId] = useState(STARTER[0].id);
  const [draft, setDraft] = useState("");
  const [mobileChat, setMobileChat] = useState(false);
  const [query, setQuery] = useState("");
  const endRef = useRef(null);

  const active = conversations.find(c => c.id === activeId);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeId, active?.messages.length]);

  const send = () => {
    if (!draft.trim()) return;
    const text = draft.trim();
    setDraft("");
    setConversations(prev => prev.map(c => {
      if (c.id !== activeId) return c;
      return {
        ...c,
        last: text,
        time: "now",
        unread: 0,
        messages: [...c.messages, { id: `m${c.messages.length + 1}`, from: "me", text, time: "now" }],
      };
    }));
    // simulated reply
    setTimeout(() => {
      setConversations(prev => prev.map(c => c.id === activeId ? {
        ...c,
        last: "Sure, sounds good 👍",
        time: "now",
        messages: [...c.messages, { id: `r${c.messages.length + 1}`, from: "them", text: "Sure, sounds good 👍", time: "now" }],
      } : c));
    }, 1400);
  };

  const open = (id) => { setActiveId(id); setMobileChat(true); };
  const filtered = conversations.filter(c => c.name.toLowerCase().includes(query.toLowerCase()) || c.productTitle.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl flex items-center gap-2">
            Messages <Lock className="w-5 h-5 text-primary" />
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Negotiate and chat securely with verified TUT students.</p>
        </div>
        <span className="hidden sm:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full glass text-emerald-600 dark:text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" /> End-to-end secure
        </span>
      </div>

      <div className="grid lg:grid-cols-[340px_1fr] gap-4 h-[70vh]">
        {/* Conversation list */}
        <aside className={`glass rounded-3xl overflow-hidden flex flex-col ${mobileChat ? "hidden lg:flex" : "flex"}`}>
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-background/60 border border-border">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search conversations…" className="bg-transparent outline-none text-sm flex-1" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filtered.map(c => (
              <button
                key={c.id}
                onClick={() => open(c.id)}
                className={`w-full flex items-center gap-3 p-3 transition-colors text-left ${activeId === c.id ? "bg-primary/10" : "hover:bg-background/60"}`}
              >
                <div className="relative shrink-0">
                  <img src={c.avatar} alt={c.name} className="w-11 h-11 rounded-full object-cover" />
                  {c.online && <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-background" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate flex items-center gap-1">
                      {c.name} {c.verified && <BadgeCheck className="w-3.5 h-3.5 text-primary shrink-0" />}
                    </p>
                    <span className="text-[10px] text-muted-foreground shrink-0">{c.time}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground truncate">{c.productTitle}</p>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{c.last}</p>
                </div>
                {c.unread > 0 && <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] grid place-items-center shrink-0">{c.unread}</span>}
              </button>
            ))}
          </div>
        </aside>

        {/* Chat window */}
        <section className={`glass rounded-3xl overflow-hidden flex flex-col ${mobileChat ? "flex" : "hidden lg:flex"}`}>
          {active && (
            <>
              {/* Header */}
              <div className="flex items-center gap-3 p-4 border-b border-border glass-strong">
                <button onClick={() => setMobileChat(false)} className="lg:hidden p-1"><ArrowLeft className="w-5 h-5" /></button>
                <img src={active.avatar} alt={active.name} className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium flex items-center gap-1 truncate">
                    {active.name} {active.verified && <BadgeCheck className="w-4 h-4 text-primary" />}
                  </p>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    {active.online ? <><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active now</> : "Offline"}
                  </p>
                </div>
                <button className="p-2 rounded-lg hover:bg-background/60"><Phone className="w-4 h-4" /></button>
                <button className="p-2 rounded-lg hover:bg-background/60"><Video className="w-4 h-4" /></button>
                <button className="p-2 rounded-lg hover:bg-background/60"><MoreVertical className="w-4 h-4" /></button>
              </div>

              {/* Product context banner */}
              <button onClick={() => navigate(`/product/${active.productId}`)} className="flex items-center gap-3 p-3 border-b border-border bg-primary/5 hover:bg-primary/10 transition-colors text-left">
                <img src={PRODUCTS.find(p => p.id === active.productId)?.images[0]} alt="" className="w-11 h-11 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">Discussing this listing</p>
                  <p className="text-sm font-medium truncate">{active.productTitle}</p>
                </div>
                <span className="text-xs font-semibold gradient-text">View</span>
              </button>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-transparent to-primary/[0.02]">
                <div className="flex justify-center">
                  <span className="text-[10px] px-3 py-1 rounded-full glass text-muted-foreground flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Secure chat — never share banking details
                  </span>
                </div>
                <AnimatePresence initial={false}>
                  {active.messages.map(m => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${m.from === "me" ? "bg-gradient-to-br from-primary to-accent text-white rounded-br-sm" : "glass-strong rounded-bl-sm"}`}>
                        <p>{m.text}</p>
                        <div className={`flex items-center gap-1 justify-end mt-1 ${m.from === "me" ? "text-white/70" : "text-muted-foreground"}`}>
                          <span className="text-[10px]">{m.time}</span>
                          {m.from === "me" && <CheckCheck className="w-3 h-3" />}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={endRef} />
              </div>

              {/* Composer */}
              <div className="p-3 border-t border-border glass-strong">
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-xl hover:bg-background/60"><Paperclip className="w-4 h-4 text-muted-foreground" /></button>
                  <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl bg-background/60 border border-border">
                    <input
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && send()}
                      placeholder="Type a message…"
                      className="bg-transparent outline-none text-sm flex-1"
                    />
                    <button className="text-muted-foreground"><Smile className="w-4 h-4" /></button>
                  </div>
                  <button onClick={send} className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent text-white grid place-items-center hover:scale-105 transition-transform premium-shadow">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[10px] text-muted-foreground text-center mt-2 flex items-center justify-center gap-1">
                  <Bell className="w-3 h-3" /> AI scam detection is monitoring this chat
                </p>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}