"use client";

import React, { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";

export default function BestSellersPage() {
  const { products } = useShop();
  const [sortBy, setSortBy] = useState("popular");
  const [selectedCategory, setSelectedCategory] = useState("Tout");

  // Filter products for Best Sellers and in stock
  const rawSellers = products.filter((p) => p.isBestSeller && p.inStock);

  // Categories present in best sellers
  const availableCategories = ["Tout", ...Array.from(new Set(rawSellers.map((p) => p.category)))];

  const filteredSellers = rawSellers.filter((p) => {
    return selectedCategory === "Tout" || p.category === selectedCategory;
  });

  // Sorting
  const sortedSellers = [...filteredSellers].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return b.rating - a.rating; // Default popular (highest rating)
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFAF7]">
      <Navbar />

      {/* Hero Header */}
      <section className="bg-sand-50 border-b border-sand-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-gold-600">Pépites très convoitées</span>
          <h1 className="font-serif text-4xl font-bold text-charcoal-900">Tendances & Meilleures Ventes</h1>
          <p className="text-xs text-charcoal-400 uppercase tracking-widest max-w-md mx-auto leading-relaxed">
            Nos pièces incontournables plébiscitées par la communauté. Des créations crochetées main aux indispensables de la beauté.
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
            <label htmlFor="sort-sellers" className="text-xs text-charcoal-400 font-light flex items-center gap-1">
              Tri :
            </label>
            <select
              id="sort-sellers"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border border-sand-200 py-1.5 px-3 rounded-sm text-xs font-semibold text-charcoal-850 focus:outline-none"
            >
              <option value="popular">Popularité (Étoiles)</option>
              <option value="price-low">Prix : Du - au +</option>
              <option value="price-high">Prix : Du + au -</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {sortedSellers.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-charcoal-500 text-sm">Aucun best-seller ne correspond à cette catégorie actuellement.</p>
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
              {sortedSellers.map((product) => (
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
