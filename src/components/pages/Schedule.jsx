import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays, Clock, BookOpen, FileText, PenLine, BellRing, Plus,
  MapPin, GraduationCap, AlertCircle, X, Sparkles
} from "lucide-react";
import { Reveal } from "@/components/ui/motion";

const TYPE_META = {
  class:      { label: "Class",      icon: BookOpen,   color: "from-primary to-accent" },
  assignment: { label: "Assignment",icon: FileText,   color: "from-amber-500 to-orange-400" },
  test:       { label: "Test",       icon: PenLine,    color: "from-rose-500 to-pink-400" },
  exam:       { label: "Exam",       icon: AlertCircle,color: "from-red-600 to-rose-500" },
  reminder:   { label: "Reminder",  icon: BellRing,   color: "from-emerald-500 to-teal-400" },
};

const seed = [
  { id: 1, type: "class", title: "Engineering Mathematics 3", module: "MAT301", location: "Room C204, Pretoria Campus", day: 0, start: "08:00", end: "09:30" },
  { id: 2, type: "class", title: "Database Systems", module: "DBS201", location: "Lab 3, Pretoria Campus", day: 0, start: "10:00", end: "11:30" },
  { id: 3, type: "class", title: "Software Engineering", module: "SWE301", location: "Room A110", day: 1, start: "09:00", end: "10:30" },
  { id: 4, type: "assignment", title: "Database ERD submission", module: "DBS201", due: "2026-07-24", note: "Submit on LMS before 23:59" },
  { id: 5, type: "test", title: "Calculus Class Test 2", module: "MAT301", due: "2026-07-28", note: "Covers integration & differential equations" },
  { id: 6, type: "exam", title: "Software Engineering Final", module: "SWE301", due: "2026-08-05", note: "Venue: Main Hall, Pretoria Campus" },
  { id: 7, type: "reminder", title: "Pay residence fees", module: "", due: "2026-07-26", note: "Before deadline to avoid late penalty" },
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function todayIdx() {
  // Current local time per context: Wednesday 2026-07-22
  return new Date().getDay();
}
function tomorrowIdx() { return (todayIdx() + 1) % 7; }

export default function Schedule() {
  const [items, setItems] = useState(seed);
  const [adding, setAdding] = useState(null); // null | "class" | "task"
  const today = todayIdx();

  const todaysClasses = items.filter(i => i.type === "class" && i.day === today).sort((a, b) => a.start.localeCompare(b.start));
  const tomorrowsClasses = items.filter(i => i.type === "class" && i.day === tomorrowIdx()).sort((a, b) => a.start.localeCompare(b.start));
  const upcoming = items.filter(i => i.type !== "class" && i.due).sort((a, b) => a.due.localeCompare(b.due));

  const add = (item) => { setItems(s => [...s, { ...item, id: Date.now() }]); setAdding(null); };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl flex items-center gap-2"><CalendarDays className="w-7 h-7 text-primary" /> My Schedule</h1>
          <p className="text-sm text-muted-foreground mt-1">Your classes, deadlines & reminders — synced to your studies.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setAdding("class")} className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl glass-strong text-sm font-medium hover:scale-[1.02] transition-transform"><Plus className="w-4 h-4" /> Add class</button>
          <button onClick={() => setAdding("task")} className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-medium premium-shadow hover:scale-[1.02] transition-transform"><Plus className="w-4 h-4" /> Add deadline</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <ScheduleCol title="Today's classes" icon={<BookOpen className="w-4 h-4 text-primary" />} items={todaysClasses} />
        <ScheduleCol title="Tomorrow's classes" icon={<Clock className="w-4 h-4 text-accent" />} items={tomorrowsClasses} />
      </div>

      <Reveal>
        <div className="glass rounded-3xl p-6 premium-shadow">
          <h2 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2"><AlertCircle className="w-5 h-5 text-primary" /> Upcoming deadlines</h2>
          {upcoming.length === 0 ? <p className="text-sm text-muted-foreground">No upcoming deadlines. Add one to stay on track.</p> : (
            <div className="space-y-3">
              {upcoming.map((i) => <DeadlineRow key={i.id} item={i} />)}
            </div>
          )}
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 p-5 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-accent shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium">AI Study Buddy</p>
            <p className="text-xs text-muted-foreground mt-0.5">I'll remind you before each deadline and suggest textbooks, notes and past papers for your modules. Ask me in the assistant any time.</p>
          </div>
        </div>
      </Reveal>

      {adding && <AddModal mode={adding} onClose={() => setAdding(null)} onAdd={add} />}
    </div>
  );
}

function ScheduleCol({ title, icon, items }) {
  return (
    <Reveal>
      <div className="glass rounded-3xl p-6 premium-shadow h-full">
        <h2 className="font-heading font-semibold text-base mb-4 flex items-center gap-2">{icon} {title}</h2>
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">No classes scheduled.</p>
        ) : (
          <div className="space-y-3">
            {items.map(i => <ClassRow key={i.id} item={i} />)}
          </div>
        )}
      </div>
    </Reveal>
  );
}

function ClassRow({ item }) {
  const meta = TYPE_META[item.type];
  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl bg-background/60 border border-border">
      <div className={`w-1.5 self-stretch rounded-full bg-gradient-to-b ${meta.color}`} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{item.title}</p>
        <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
          <MapPin className="w-3 h-3" /> {item.location}
          {item.module && <><span>·</span> <GraduationCap className="w-3 h-3" /> {item.module}</>}
        </p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-xs font-medium">{item.start}</p>
        <p className="text-[11px] text-muted-foreground">{item.end}</p>
      </div>
    </div>
  );
}

function DeadlineRow({ item }) {
  const meta = TYPE_META[item.type];
  const Icon = meta.icon;
  const daysLeft = Math.ceil((new Date(item.due) - new Date("2026-07-22")) / 86400000);
  return (
    <div className="flex items-start gap-3 p-3 rounded-2xl bg-background/60 border border-border">
      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${meta.color} grid place-items-center text-white shrink-0`}><Icon className="w-4 h-4" /></div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{item.title}</p>
        <p className="text-xs text-muted-foreground">{item.module ? `${item.module} · ` : ""}{item.note}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-xs font-medium">{new Date(item.due).toLocaleDateString("en-ZA", { day: "numeric", month: "short" })}</p>
        <p className={`text-[11px] font-medium ${daysLeft <= 2 ? "text-rose-500" : daysLeft <= 5 ? "text-amber-500" : "text-emerald-500"}`}>
          {daysLeft <= 0 ? "Due today" : `${daysLeft}d left`}
        </p>
      </div>
    </div>
  );
}

function AddModal({ mode, onClose, onAdd }) {
  const [type, setType] = useState(mode === "class" ? "class" : "assignment");
  const [title, setTitle] = useState("");
  const [module, setModule] = useState("");
  const [location, setLocation] = useState("");
  const [start, setStart] = useState("08:00");
  const [end, setEnd] = useState("09:00");
  const [day, setDay] = useState(new Date().getDay());
  const [due, setDue] = useState("");
  const [note, setNote] = useState("");

  const save = () => {
    if (!title.trim()) return;
    if (mode === "class") onAdd({ type: "class", title, module, location, day: Number(day), start, end });
    else onAdd({ type, title, module, due, note });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm grid place-items-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, y: 12 }} animate={{ scale: 1, y: 0 }} onClick={(e) => e.stopPropagation()} className="glass-strong rounded-3xl p-6 w-full max-w-md premium-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold">{mode === "class" ? "Add class" : "Add deadline"}</h3>
          <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
        </div>
        <div className="space-y-3">
          <Field label="Title"><input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Engineering Maths 3" className="w-full bg-card border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 ring-primary/30" /></Field>
          <Field label="Module code"><input value={module} onChange={(e) => setModule(e.target.value)} placeholder="e.g. MAT301" className="w-full bg-card border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 ring-primary/30" /></Field>
          {mode === "class" ? (
            <>
              <Field label="Location"><input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Room C204, Pretoria Campus" className="w-full bg-card border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 ring-primary/30" /></Field>
              <div className="grid grid-cols-3 gap-2">
                <Field label="Day">
                  <select value={day} onChange={(e) => setDay(e.target.value)} className="w-full bg-card border border-border rounded-xl px-3 py-2.5 text-sm outline-none">
                    {DAYS.map((d, i) => <option key={d} value={i}>{d}</option>)}
                  </select>
                </Field>
                <Field label="Start"><input type="time" value={start} onChange={(e) => setStart(e.target.value)} className="w-full bg-card border border-border rounded-xl px-3 py-2.5 text-sm outline-none" /></Field>
                <Field label="End"><input type="time" value={end} onChange={(e) => setEnd(e.target.value)} className="w-full bg-card border border-border rounded-xl px-3 py-2.5 text-sm outline-none" /></Field>
              </div>
            </>
          ) : (
            <>
              <Field label="Type">
                <div className="flex gap-2 flex-wrap">
                  {["assignment", "test", "exam", "reminder"].map(t => (
                    <button key={t} onClick={() => setType(t)} className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize ${type === t ? "bg-gradient-to-r from-primary to-accent text-white" : "glass"}`}>{t}</button>
                  ))}
                </div>
              </Field>
              <Field label="Due date"><input type="date" value={due} onChange={(e) => setDue(e.target.value)} className="w-full bg-card border border-border rounded-xl px-3 py-2.5 text-sm outline-none" /></Field>
              <Field label="Note"><textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} placeholder="Optional details" className="w-full bg-card border border-border rounded-xl px-3 py-2.5 text-sm outline-none resize-none" /></Field>
            </>
          )}
          <button onClick={save} disabled={!title.trim()} className="w-full py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-medium disabled:opacity-40">Save</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Field({ label, children }) {
  return <div><label className="text-xs text-muted-foreground mb-1 block">{label}</label>{children}</div>;
}