"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Only set the cookie once the component mounts
    document.cookie = "kc_splash_seen=true; path=/; max-age=86400"; // Expires in 1 day for demo purposes, or session
    
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FCFAF7]"
        >
          <div className="flex flex-col items-center leading-none space-y-3">
            {/* KNITTA */}
            <div className="relative font-serif text-5xl sm:text-7xl font-bold tracking-widest uppercase">
              {/* Base faded text */}
              <span className="text-[#E6E0D8]">KNITTA</span>
              {/* Filling colored text */}
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
                className="absolute top-0 left-0 overflow-hidden whitespace-nowrap text-charcoal-900"
              >
                KNITTA
              </motion.div>
            </div>

            {/* CORNER */}
            <div className="relative font-serif text-5xl sm:text-7xl font-bold tracking-widest uppercase">
              <span className="text-[#E6E0D8]">CORNER</span>
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, ease: "easeInOut", delay: 1.2 }}
                className="absolute top-0 left-0 overflow-hidden whitespace-nowrap text-terracotta-600"
              >
                CORNER
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
