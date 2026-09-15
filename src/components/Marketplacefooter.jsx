import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Instagram, Twitter, Facebook, Linkedin } from "lucide-react";

export default function MarketplaceFooter() {
  const cols = [
    { title: "Marketplace", links: ["Browse All", "Trending", "Categories", "Recently Added"] },
    { title: "For Students", links: ["Student Businesses", "Accommodation", "Services", "Tutoring"] },
    { title: "Safety", links: ["Safety Tips", "Verified Sellers", "Report a Listing", "Block a User"] },
    { title: "Company", links: ["About EduTrade", "Revenue Model", "Contact", "Help Centre", "Privacy Policy", "Terms of Service"] },
  ];
  const linkTo = (l) => l === "Revenue Model" ? "/revenue" : "/marketplace";
  return (
    <footer className="relative mt-24 border-t border-border">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-primary/5" />
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid lg:grid-cols-[1.4fr_repeat(4,1fr)] gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent grid place-items-center text-white font-heading font-bold premium-shadow">ED</div>
              <span className="font-heading font-semibold">EduTrade</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              EduTrade is the secure, verified marketplace for South African university and public college students. Buy, sell and connect — safely within your academic community.
            </p>
            <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-primary" /> Student email verified community
            </div>
            <div className="flex gap-2 mt-5">
              {[Instagram, Twitter, Facebook, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg glass grid place-items-center hover:scale-105 transition-transform">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-heading text-sm font-semibold mb-4">{c.title}</h4>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}><Link to={linkTo(l)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© 2026 EduTrade. A student entrepreneurship (JGA) project.</p>
          <p>Made with care for the SA student community 🎓</p>
        </div>
      </div>
    </footer>
  );
}