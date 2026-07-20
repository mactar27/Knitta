"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SplashScreen() {
  const [showSplash, setShowSplash] = useState<boolean | null>(null);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("kc_splash_seen");
    if (hasSeenSplash) {
      setShowSplash(false);
    } else {
      setShowSplash(true);
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem("kc_splash_seen", "true");
      }, 2800);
      return () => clearTimeout(timer);
    }
  }, []);

  if (showSplash === null) return null;

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FCFAF7]"
        >
          <div className="flex flex-col items-center leading-none space-y-4">
            <div 
              className="relative text-[5.5rem] sm:text-8xl md:text-9xl tracking-wide text-sand-200"
              style={{ fontFamily: 'var(--font-cursive)' }}
            >
              <span className="pr-2">Knitta Corner</span>
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
                className="absolute top-0 left-0 overflow-hidden whitespace-nowrap text-terracotta-600" // Terracotta text fill
              >
                <span className="pr-2">Knitta Corner</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
