"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-terracotta-50 text-charcoal-900 border-t border-sand-100">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          
          {/* Logo & Description */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="Knitta Corner Logo"
                width={120}
                height={60}
                className="object-contain"
              />
            </div>
            <p className="text-xs text-charcoal-400 leading-relaxed font-light">
              Créations uniques. Mode & Style.
            </p>
            <p className="text-xs text-charcoal-400 leading-relaxed font-light max-w-xs">
              Pièces streetwear pointues et accessoires tendance sélectionnés pour révéler votre personnalité.
            </p>
          </div>

          {/* Boutique column */}
          <div className="space-y-4">
            <h3 className="font-sans text-[10px] font-bold tracking-widest text-terracotta-600 uppercase">Boutique</h3>
            <ul className="space-y-2 text-xs text-charcoal-500">
              <li>
                <Link href="/shop" className="hover:text-terracotta-600 transition-colors">Tous les produits</Link>
              </li>
              <li>
                <Link href="/arrivals" className="hover:text-terracotta-600 transition-colors">Nouveautés</Link>
              </li>
              <li>
                <Link href="/sellers" className="hover:text-terracotta-600 transition-colors">Meilleures ventes</Link>
              </li>
              <li>
                <Link href="/#collections" className="hover:text-terracotta-600 transition-colors">Collections</Link>
              </li>
            </ul>
          </div>

          {/* A Propos column */}
          <div className="space-y-4">
            <h3 className="font-sans text-[10px] font-bold tracking-widest text-terracotta-600 uppercase">À Propos</h3>
            <ul className="space-y-2 text-xs text-charcoal-500">
              <li>
                <Link href="/about" className="hover:text-terracotta-600 transition-colors">Qui sommes-nous ?</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-terracotta-600 transition-colors">Notre mission</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-terracotta-600 transition-colors">Nous contacter</Link>
              </li>
            </ul>
          </div>

          {/* Aide column */}
          <div className="space-y-4">
            <h3 className="font-sans text-[10px] font-bold tracking-widest text-terracotta-600 uppercase">Aide</h3>
            <ul className="space-y-2 text-xs text-charcoal-500">
              <li>
                <Link href="/faq" className="hover:text-terracotta-600 transition-colors">FAQ</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-terracotta-600 transition-colors">Livraison</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-terracotta-600 transition-colors">Retours & échanges</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-terracotta-600 transition-colors">CGV</Link>
              </li>
            </ul>
          </div>

          {/* Suivez-nous column */}
          <div className="space-y-4">
            <h3 className="font-sans text-[10px] font-bold tracking-widest text-terracotta-600 uppercase">Suivez-nous</h3>
            <ul className="space-y-2 text-xs text-charcoal-500">
              <li>
                <a href="https://www.instagram.com/knitta_corner/" target="_blank" rel="noopener noreferrer" className="hover:text-terracotta-600 transition-colors">Instagram</a>
              </li>
              <li>
                <a href="https://www.pinterest.com/Knitta_Corner/" target="_blank" rel="noopener noreferrer" className="hover:text-terracotta-600 transition-colors">Pinterest</a>
              </li>
              <li>
                <a href="mailto:bintaandoy@gmail.com" className="hover:text-terracotta-600 transition-colors">bintaandoy@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Newsletter Subscription Row */}
        <div className="mt-12 border-t border-sand-100 pt-8 grid grid-cols-1 md:grid-cols-3 items-center gap-6">
          <div className="space-y-1">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-charcoal-900">Abonnez-vous à notre newsletter</h4>
            <p className="text-[11px] text-charcoal-400 font-light">Pour ne rien manquer de nos nouveaux drops et offres exclusives.</p>
          </div>
          
          <form onSubmit={handleSubscribe} className="md:col-span-2 relative flex items-center w-full max-w-lg md:ml-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse e-mail"
              required
              className="w-full rounded-sm border border-sand-200 bg-white px-4 py-3 text-xs text-charcoal-900 placeholder-charcoal-400 focus:border-terracotta-600 focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 rounded-sm bg-charcoal-900 px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-terracotta-600 transition-colors h-[calc(100%-8px)]"
              aria-label="S'abonner"
            >
              S&apos;inscrire
            </button>
          </form>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-sand-100 pt-8 text-[10px] text-charcoal-500 font-light">
          <p>© {new Date().getFullYear()} Knitta Corner. Tous droits réservés.</p>
          <p>
            Réalisé par{" "}
            <a
              href="https://wockytech.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-terracotta-600 hover:text-terracotta-700 transition-colors"
            >
              WockyTech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
