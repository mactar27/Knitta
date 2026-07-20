"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FCFAF7]">
      <Navbar />


      {/* Header */}
      <section className="bg-sand-50 border-b border-sand-100 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center space-y-4">
          <span className="text-xs uppercase font-bold tracking-widest text-terracotta-600">Notre Histoire</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-charcoal-900 leading-tight">
            Sélection Mode &<br />
            <span className="italic font-medium text-charcoal-700">Streetwear Authentique.</span>
          </h1>
          <p className="text-xs text-charcoal-400 uppercase tracking-widest">Une marque versatile conçue à Dakar, Sénégal</p>
        </div>
      </section>

      {/* Core Narrative */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 space-y-20">

        {/* Row 1: The mission */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6 space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">Pourquoi KnittaCorner ?</h2>
            <p className="text-sm text-charcoal-500 leading-relaxed font-light">
              Fondée par Binta, <strong className="text-charcoal-900">KnittaCorner</strong> est née de la passion pour la mode, le streetwear et la culture vintage. Notre concept vise à proposer sous un même toit des pièces uniques de mode (streetwear, vintage, seconde main) rigoureusement sélectionnées.
            </p>
            <p className="text-sm text-charcoal-500 leading-relaxed font-light">
              Chaque vêtement et accessoire est sélectionné avec le plus grand soin pour son style et sa qualité. Nous sélectionnons des pièces authentiques pour leur qualité et leur adéquation avec la culture streetwear urbaine, afin de vous offrir un style pointu et unique.
            </p>
          </div>
          <div className="md:col-span-6 relative aspect-video md:aspect-[4/3] rounded-xs overflow-hidden bg-sand-50 border border-sand-100">
            <Image
              src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80"
              alt="Pièce de mode streetwear sélectionnée par Binta"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Row 2: Our Curation Process */}
        <div className="bg-sand-50 rounded-xs border border-sand-100 p-8 sm:p-12 space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs uppercase font-bold tracking-widest text-terracotta-600">Notre Engagement</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">Notre Processus de Curation</h2>
            <p className="text-xs text-charcoal-450 leading-relaxed max-w-md mx-auto">
              Nous portons une attention obsessionnelle aux détails de chaque pièce afin de vous garantir des articles de qualité supérieure.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                name: "Curation Streetwear",
                desc: "Nous dénichons des pièces streetwear et de seconde main de grande qualité à Dakar, assurant un style pointu et authentique."
              },
              {
                step: "02",
                name: "Pièces Authentiques",
                desc: "Tous nos vêtements et sneakers proviennent de sources fiables et sont vérifiés pour garantir leur authenticité."
              },
              {
                step: "03",
                name: "Vérification de l'État",
                desc: "Pour chaque vêtement et accessoire, nous indiquons les dimensions et l'état précis pour éviter les mauvaises surprises."
              },
              {
                step: "04",
                name: "Expédition Rapide",
                desc: "Nous expédions vos commandes sous enveloppe protectrice cadeau, avec des services de livraison rapides partout au Sénégal."
              }
            ].map((pStep, idx) => (
              <div key={idx} className="space-y-3 p-4 bg-white rounded-xs border border-sand-200">
                <span className="font-serif text-3xl font-light text-terracotta-600 block">{pStep.step}</span>
                <h3 className="font-serif text-sm font-semibold text-charcoal-900">{pStep.name}</h3>
                <p className="text-[11px] text-charcoal-400 leading-relaxed font-light">{pStep.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Row 3: Call to Action */}
        <div className="text-center space-y-6 max-w-lg mx-auto py-10">
          <h2 className="font-serif text-3xl font-bold text-charcoal-900">Découvrez l&apos;Univers KnittaCorner</h2>
          <p className="text-xs text-charcoal-400 leading-relaxed">
            Trouvez la pièce de mode parfaite et les essentiels de votre garde-robe urbaine.
          </p>
          <div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-sm bg-charcoal-900 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white hover:bg-terracotta-600 transition-colors shadow-xs"
            >
              Parcourir la boutique <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

      </section>

      <Footer />
    </div>
  );
}
