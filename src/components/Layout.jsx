import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import MarketplaceNavbar from "@/components/MarketplaceNavbar";
import MarketplaceFooter from "@/components/MarketplaceFooter";
import EduTradeAssistant from "@/components/EduTradeAssisstant";

export default function Layout() {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col">
      <MarketplaceNavbar />
      <main className="flex-1 pt-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <MarketplaceFooter />
      <EduTradeAssistant />
    </div>
  );
}