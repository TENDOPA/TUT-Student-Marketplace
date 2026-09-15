import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Moon, Sun, Bell, MessageCircle, User, Menu, X, ShieldCheck } from "lucide-react";

export default function MarketplaceNavbar() {
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  const links = [
    { label: "Marketplace", to: "/marketplace" },
    { label: "Services", to: "/services" },
    { label: "Accommodation", to: "/accommodation" },
    { label: "Revenue", to: "/revenue" },
    { label: "Schedule", to: "/schedule" },
    { label: "Sell", to: "/sell" },
  ];

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}>
      <div className="mx-auto max-w-7xl px-4">
        <div className={`glass-strong rounded-2xl px-4 sm:px-5 py-3 flex items-center gap-3 transition-all ${scrolled ? "premium-shadow" : ""}`}>
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent grid place-items-center text-white font-heading font-bold text-sm premium-shadow">
              ED
            </div>
            <span className="hidden sm:block font-heading font-semibold text-sm tracking-tight">
              EduTrade
            </span>
          </Link>

          <form
            onSubmit={(e) => { e.preventDefault(); navigate("/marketplace"); }}
            className="hidden md:flex flex-1 items-center gap-2 mx-2 px-3 py-2 rounded-xl bg-background/60 border border-border"
          >
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              placeholder="Search products, services, businesses…"
              className="bg-transparent outline-none text-sm flex-1 placeholder:text-muted-foreground"
            />
            <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">⌘K</kbd>
          </form>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link key={l.label} to={l.to} className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-background/60 transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 ml-auto">
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-background/60 transition-colors" aria-label="Toggle theme">
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Link to="/notifications" className="p-2 rounded-lg hover:bg-background/60 transition-colors hidden sm:block relative" aria-label="Notifications">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent" />
            </Link>
            <Link to="/messages" className="p-2 rounded-lg hover:bg-background/60 transition-colors hidden sm:block relative" aria-label="Messages">
              <MessageCircle className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent" />
            </Link>
            <Link to="/sell" className="hidden sm:flex items-center gap-1.5 ml-1 px-3 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-medium premium-shadow hover:scale-[1.02] transition-transform">
              <ShieldCheck className="w-4 h-4" /> <span className="hidden lg:inline">Verified Only</span>
            </Link>
            <Link to="/dashboard" className="p-2 rounded-lg hover:bg-background/60 transition-colors" aria-label="Dashboard">
              <User className="w-4 h-4" />
            </Link>
            <Link to="/admin" className="p-2 rounded-lg hover:bg-background/60 transition-colors hidden sm:block" aria-label="Admin">
              <ShieldCheck className="w-4 h-4" />
            </Link>
            <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-lg hover:bg-background/60 transition-colors" aria-label="Menu">
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden mt-2 glass-strong rounded-2xl p-2 premium-shadow">
            {links.map((l) => (
              <Link key={l.label} to={l.to} onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-background/60">
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}