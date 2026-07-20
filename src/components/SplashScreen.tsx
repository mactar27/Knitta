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
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  const knittaText = "Knitta".split("");
  const cornerText = "Corner".split("");

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FCFAF7]"
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="font-serif text-5xl sm:text-6xl font-bold text-charcoal-900 tracking-wider flex">
              {knittaText.map((char, index) => (
                <motion.span
                  key={`k-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.12, duration: 0.3, ease: "easeOut" }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
            <div className="font-serif text-5xl sm:text-6xl font-bold text-terracotta-600 tracking-wider flex">
              {cornerText.map((char, index) => (
                <motion.span
                  key={`c-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.12, duration: 0.3, ease: "easeOut" }}
                >
                  {char}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                className="ml-1 text-terracotta-600"
              >
                |
              </motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
