import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, ShoppingBag, Store, Flag, BarChart3, Wallet, TrendingUp, Check, X, ShieldCheck, AlertTriangle } from "lucide-react";

const TABS = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "users", label: "Users", icon: Users },
  { id: "listings", label: "Listings", icon: ShoppingBag },
  { id: "businesses", label: "Approve", icon: Store },
  { id: "reports", label: "Reports", icon: Flag },
];

const USERS = [
  { id: "u1", name: "Thabo Mokoena", email: "thabo@tut4life.ac.za", campus: "Pretoria", role: "Seller", verified: true, status: "Active" },
  { id: "u2", name: "Lerato Dlamini", email: "lerato@tut4life.ac.za", campus: "Soshanguve", role: "Seller", verified: true, status: "Active" },
  { id: "u3", name: "Aisha Patel", email: "aisha@tut4life.ac.za", campus: "Pretoria", role: "Business", verified: false, status: "Pending" },
  { id: "u4", name: "Mandla Zwane", email: "mandla@tut4life.ac.za", campus: "Polokwane", role: "Seller", verified: true, status: "Active" },
  { id: "u5", name: "Unknown User", email: "spam@mail.com", campus: "—", role: "—", verified: false, status: "Suspended" },
];

const PENDING_BIZ = [
  { id: "b1", name: "Pixel Forge Studio", owner: "Aisha Patel", category: "Design", campus: "Pretoria" },
  { id: "b2", name: "QuickFix Repairs", owner: "Mandla Zwane", category: "Repairs", campus: "Polokwane" },
];

const REPORTS = [
  { id: "r1", target: "PS5 Slim listing", reason: "Suspiciously low price", by: "Sipho Nkosi", time: "1h" },
  { id: "r2", target: "User: Unknown User", reason: "Off-platform payment request", by: "Karabo M.", time: "5h" },
  { id: "r3", target: "Room rental ad", reason: "Duplicate listing", by: "Naledi K.", time: "1d" },
];

export default function Admin() {
  const [tab, setTab] = useState("overview");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent grid place-items-center text-white premium-shadow"><ShieldCheck className="w-5 h-5" /></div>
        <div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Manage users, listings and keep the marketplace safe.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Stat icon={Users} label="Total users" value="12,400" trend="+4%" />
        <Stat icon={ShoppingBag} label="Active listings" value="3,812" trend="+9%" />
        <Stat icon={Wallet} label="Platform revenue" value="R42,800" trend="+12%" />
        <Stat icon={Flag} label="Open reports" value="3" />
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar pb-1">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${tab === t.id ? "bg-gradient-to-r from-primary to-accent text-white premium-shadow" : "glass"}`}>
            <t.icon className="w-4 h-4" /> {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="grid lg:grid-cols-2 gap-6">
          <Panel title="Weekly activity">
            <div className="flex items-end gap-2 h-40">
              {[50, 70, 45, 85, 60, 95, 75].map((h, i) => <div key={i} className="flex-1 rounded-t-xl bg-gradient-to-t from-primary to-accent" style={{ height: `${h}%` }} />)}
            </div>
          </Panel>
          <Panel title="Recent signups">
            <div className="space-y-2">{USERS.slice(0, 4).map(u => (
              <div key={u.id} className="flex items-center gap-3 p-2 rounded-xl bg-background/60 border border-border">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent grid place-items-center text-white text-xs font-medium">{u.name[0]}</div>
                <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{u.name}</p><p className="text-[11px] text-muted-foreground">{u.email}</p></div>
                {u.verified && <ShieldCheck className="w-4 h-4 text-primary" />}
              </div>
            ))}</div>
          </Panel>
        </div>
      )}

      {tab === "users" && <Panel title="Users"><Table rows={USERS.map(u => [u.name, u.email, u.campus, u.role, u.verified ? "Verified" : "Unverified", u.status])} headers={["Name", "Email", "Campus", "Role", "Verification", "Status"]} /></Panel>}

      {tab === "listings" && <Panel title="Listings"><Table rows={[["MacBook Air M2", "Thabo Mokoena", "R14,500", "Electronics", "Active"], ["PS5 Slim", "Sipho Nkosi", "R8,800", "Gaming", "Flagged"], ["Room - Arcadia", "Johan Botha", "R2,800", "Accommodation", "Active"]]} headers={["Title", "Seller", "Price", "Category", "Status"]} /></Panel>}

      {tab === "businesses" && (
        <Panel title="Pending business approvals">
          <div className="space-y-3">
            {PENDING_BIZ.map(b => (
              <div key={b.id} className="flex items-center gap-3 p-4 rounded-2xl bg-background/60 border border-border">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary grid place-items-center"><Store className="w-5 h-5" /></div>
                <div className="flex-1"><p className="text-sm font-medium">{b.name}</p><p className="text-xs text-muted-foreground">{b.category} · {b.owner} · {b.campus}</p></div>
                <button className="px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Approve</button>
                <button className="px-3 py-1.5 rounded-lg bg-destructive/15 text-destructive text-xs font-medium flex items-center gap-1"><X className="w-3.5 h-3.5" /> Reject</button>
              </div>
            ))}
          </div>
        </Panel>
      )}

      {tab === "reports" && (
        <Panel title="Reported content">
          <div className="space-y-3">
            {REPORTS.map(r => (
              <div key={r.id} className="flex items-center gap-3 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/30">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 grid place-items-center"><AlertTriangle className="w-5 h-5" /></div>
                <div className="flex-1"><p className="text-sm font-medium">{r.target}</p><p className="text-xs text-muted-foreground">{r.reason} · reported by {r.by} · {r.time}</p></div>
                <button className="px-3 py-1.5 rounded-lg glass text-xs font-medium">Review</button>
              </div>
            ))}
          </div>
        </Panel>
      )}
    </div>
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

function Panel({ title, children }) {
  return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-6 premium-shadow"><h2 className="font-heading font-semibold text-base mb-4">{title}</h2>{children}</motion.div>;
}

function Table({ headers, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead><tr className="text-left text-xs text-muted-foreground border-b border-border">{headers.map(h => <th key={h} className="py-2">{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => (
          <tr key={i} className="border-b border-border last:border-0">
            {r.map((c, j) => <td key={j} className="py-3">{c}</td>)}
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}