"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_SECTIONS: Record<string, FAQItem[]> = {
  "Tailles & Mesures": [
    {
      question: "Comment m'assurer qu'un vêtement vintage m'ira ?",
      answer: "Les tailles d'époque différant beaucoup des tailles modernes, nous indiquons les mesures précises prises à plat sur chaque fiche produit : largeur de poitrine (aisselle à aisselle), hauteur totale et longueur de manche. Pour viser juste, nous vous recommandons de mesurer l'un de vos vêtements préférés posé à plat et de comparer."
    },
    {
      question: "Vos vêtements sont-ils unisexes ?",
      answer: "Oui, la majorité de nos pièces sont mixtes. Nous conseillons de prendre votre taille habituelle en vérifiant les mesures à plat pour une coupe classique, ou une taille au-dessus pour un style vintage volontairement oversize."
    }
  ],
  "État & Qualité": [
    {
      question: "À quoi correspondent les différents états indiqués ?",
      answer: "Nous utilisons une charte d'évaluation rigoureuse :\n\n• Excellent état : Zéro défaut, aspect proche du neuf, très légères traces de port.\n• Très bon état : Légère patine d'usage, aucun trou ni tache.\n• Bon état : Patine naturelle d'usage, légère décoloration ou usure esthétique mineure qui fait le charme du vintage.\n• Usure naturelle : Usure vintage marquée et visible (ex. petites décolorations ou légères imperfections), toutes indiquées en photo."
    },
    {
      question: "Les vêtements sont-ils lavés avant expédition ?",
      answer: "Oui, absolument ! Chaque pièce est soigneusement inspectée, lavée avec des lessives écologiques spécialisées, séchée à l'air libre puis repassée à la vapeur avant d'être emballée. Elles arrivent propres et prêtes à être portées."
    }
  ],
  "Livraison & Retours": [
    {
      question: "Quel est le délai de livraison ?",
      answer: "Nous expédions les commandes sous 1 à 2 jours ouvrés. La livraison prend ensuite 2 à 4 jours ouvrés en France, et 5 à 10 jours ouvrés à l'international. Tous les colis sont envoyés de manière écoresponsable dans des emballages en papier recyclé."
    },
    {
      question: "Quelle est votre politique de retour ?",
      answer: "Nos pièces vintage étant uniques (1-of-1), toutes les ventes sont finales. Nous n'acceptons pas les retours pour des questions de taille ou de changement d'avis. Cependant, en cas d'erreur de mesure importante de notre part (> 2,5 cm) ou de défaut majeur non signalé, veuillez contacter notre support sous 48 heures après livraison pour convenir d'un remboursement."
    }
  ]
};

export default function FAQPage() {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setActiveAccordion((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFAF7]">
      <Navbar />

      {/* Header */}
      <section className="bg-sand-50 border-b border-sand-100 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center space-y-4">
          <span className="text-xs uppercase font-bold tracking-widest text-terracotta-600">Centre d&apos;Aide</span>
          <h1 className="font-serif text-4xl font-bold text-charcoal-900">Questions Fréquentes (FAQ)</h1>
          <p className="text-xs text-charcoal-400 uppercase tracking-widest max-w-md mx-auto leading-relaxed">
            Trouvez toutes les réponses sur les tailles, l&apos;évaluation des vêtements, les livraisons et les retours.
          </p>
        </div>
      </section>

      {/* Accordion Container */}
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 flex-1 space-y-12">
        {Object.entries(FAQ_SECTIONS).map(([sectionTitle, items]) => (
          <div key={sectionTitle} className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-charcoal-900 border-b border-sand-200 pb-2">
              {sectionTitle}
            </h2>

            <div className="space-y-3">
              {items.map((item, idx) => {
                const uniqueId = `${sectionTitle}-${idx}`;
                const isOpen = activeAccordion === uniqueId;

                return (
                  <div
                    key={idx}
                    className="border border-sand-100 rounded-sm bg-white overflow-hidden shadow-3xs"
                  >
                    <button
                      onClick={() => toggleAccordion(uniqueId)}
                      className="w-full flex items-center justify-between text-left px-5 py-4 font-serif text-sm font-semibold text-charcoal-900 hover:bg-sand-50 transition-colors"
                    >
                      <span>{item.question}</span>
                      {isOpen ? (
                        <Minus className="h-4.5 w-4.5 text-terracotta-600 flex-shrink-0" />
                      ) : (
                        <Plus className="h-4.5 w-4.5 text-charcoal-400 flex-shrink-0" />
                      )}
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pt-1 text-xs text-charcoal-500 leading-relaxed font-light whitespace-pre-line border-t border-sand-50 bg-[#FCFAF7]">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}
