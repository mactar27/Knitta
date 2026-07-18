"use client";

import React, { useState } from "react";
import { ArrowUpDown, RotateCcw, SlidersHorizontal } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";

export default function NewArrivalsPage() {
  const { products } = useShop();
  const [sortBy, setSortBy] = useState("newest");
  const [selectedCategory, setSelectedCategory] = useState("Tout");

  // Filter products for New Arrivals and in stock
  const rawArrivals = products.filter((p) => p.isNewArrival && p.inStock);

  // Categories present in raw arrivals
  const availableCategories = ["Tout", ...Array.from(new Set(rawArrivals.map((p) => p.category)))];

  const filteredArrivals = rawArrivals.filter((p) => {
    return selectedCategory === "Tout" || p.category === selectedCategory;
  });

  // Sorting
  const sortedArrivals = [...filteredArrivals].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return b.id.localeCompare(a.id); // Default newest
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFAF7]">
      <Navbar />

      {/* Hero Header */}
      <section className="bg-sand-50 border-b border-sand-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-terracotta-600">Catalogue Hebdomadaire</span>
          <h1 className="font-serif text-4xl font-bold text-charcoal-900">Derniers Arrivages : Nouveautés</h1>
          <p className="text-xs text-charcoal-400 uppercase tracking-widest max-w-md mx-auto leading-relaxed">
            Découvrez nos derniers arrivages de pièces streetwear et notre sélection cosmétique fraîchement débarquée.
          </p>
        </div>
      </section>

      {/* Catalog Container */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 flex-1">
        {/* Filters and Sorting bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-sand-100 pb-5 mb-8 gap-4">
          {/* Categories select */}
          <div className="flex flex-wrap gap-2">
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-semibold border transition-all ${
                  selectedCategory === cat
                    ? "bg-charcoal-900 border-charcoal-900 text-white"
                    : "bg-white border-sand-200 text-charcoal-500 hover:border-charcoal-800 hover:text-charcoal-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sorter */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <label htmlFor="sort-arrivals" className="text-xs text-charcoal-400 font-light flex items-center gap-1">
              <ArrowUpDown className="h-3.5 w-3.5 text-charcoal-500" /> Tri :
            </label>
            <select
              id="sort-arrivals"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border border-sand-200 py-1.5 px-3 rounded-sm text-xs font-semibold text-charcoal-850 focus:outline-none"
            >
              <option value="newest">Derniers Drops</option>
              <option value="price-low">Prix : Du - au +</option>
              <option value="price-high">Prix : Du + au -</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {sortedArrivals.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-charcoal-500 text-sm">Aucune nouveauté ne correspond à cette catégorie actuellement.</p>
            <button
              onClick={() => setSelectedCategory("Tout")}
              className="mt-4 rounded-sm bg-charcoal-900 py-2 px-4 text-xs font-bold uppercase tracking-wider text-white hover:bg-terracotta-600 transition-colors"
            >
              Réinitialiser
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {sortedArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
