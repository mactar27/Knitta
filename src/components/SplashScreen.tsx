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
          className="fixed inset-0 z-[9999] bg-[#40271D] overflow-hidden"
        >
          <style dangerouslySetInnerHTML={{__html: `
            .splash-hero-bg {
              background-image: url('/hero-bg.png');
              background-size: 100% auto;
              background-position: center center;
              background-repeat: no-repeat;
            }
            @media (min-width: 768px) {
              .splash-hero-bg {
                background-size: cover;
              }
            }
          `}} />
          
          {/* The static hero image background */}
          <div className="absolute inset-0 w-full h-full splash-hero-bg" />

          {/* The mask overlay that slides away to the right to reveal the image */}
          <motion.div
            initial={{ left: "0%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-y-0 right-0 bg-[#40271D]"
            style={{ right: 0 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
