import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Send, Phone, ShieldCheck, BadgeCheck, CheckCheck, Paperclip, Smile
} from "lucide-react";

const SEED = [
  "Hi, is this still available?",
  "Yes it is! Let me know if you have any questions.",
];

export default function ChatDrawer({ open, onClose, product }) {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    if (open && messages.length === 0 && product) {
      setMessages([
        { id: "s1", from: "me", text: SEED[0], time: "now" },
        { id: "s2", from: "them", text: SEED[1], time: "now" },
      ]);
    }
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, open]);

  if (!product) return null;

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    setMessages(prev => [...prev, { id: `m${prev.length + 1}`, from: "me", text, time: "now" }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { id: `r${prev.length + 1}`, from: "them", text: "Sure, happy to help. Can we meet at a campus pickup point?", time: "now" }]);
    }, 1300);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:max-w-md glass-strong border-l border-border flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-border">
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-background/60"><X className="w-5 h-5" /></button>
              <img src={product.seller.avatar} alt={product.seller.name} className="w-10 h-10 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium flex items-center gap-1 truncate">
                  {product.seller.name} {product.seller.verified && <BadgeCheck className="w-4 h-4 text-primary shrink-0" />}
                </p>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active now
                </p>
              </div>
              <button className="p-2 rounded-lg hover:bg-background/60"><Phone className="w-4 h-4" /></button>
            </div>

            {/* Product context */}
            <div className="flex items-center gap-3 p-3 border-b border-border bg-primary/5">
              <img src={product.images[0]} alt="" className="w-11 h-11 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-muted-foreground">Discussing</p>
                <p className="text-sm font-medium truncate">{product.title}</p>
              </div>
              <p className="font-heading font-bold gradient-text text-sm">R{product.price.toLocaleString()}</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div className="flex justify-center">
                <span className="text-[10px] px-3 py-1 rounded-full glass text-muted-foreground flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Secure chat — never share banking details
                </span>
              </div>
              <AnimatePresence initial={false}>
                {messages.map(m => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm ${m.from === "me" ? "bg-gradient-to-br from-primary to-accent text-white rounded-br-sm" : "glass rounded-bl-sm"}`}>
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
            <div className="p-3 border-t border-border">
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
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}