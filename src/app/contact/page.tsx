"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", orderNum: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: "", email: "", orderNum: "", message: "" });
      setTimeout(() => setSubmitted(false), 6000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFAF7]">
      <Navbar />

      {/* Header */}
      <section className="bg-sand-50 border-b border-sand-100 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center space-y-4">
          <span className="text-xs uppercase font-bold tracking-widest text-terracotta-600">Contactez-nous</span>
          <h1 className="font-serif text-4xl font-bold text-charcoal-900">Nous Contacter</h1>
          <p className="text-xs text-charcoal-400 uppercase tracking-widest max-w-md mx-auto leading-relaxed">
            Une question sur les mesures, la taille, votre commande ou le calendrier des prochains drops ?
          </p>
        </div>
      </section>

      {/* Grid Container */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT SIDE: Information Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-bold text-charcoal-900 mb-2">Nous sommes là pour vous aider</h2>
              <p className="text-sm text-charcoal-500 font-light leading-relaxed">
                Les pièces vintage étant des modèles uniques (1-of-1), nous voulons vous aider à choisir la bonne taille. N&apos;hésitez pas à nous solliciter pour des photos complémentaires, des vérifications de mesures ou des précisions sur les matières.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="rounded-full bg-sand-50 p-3 border border-sand-100 text-terracotta-600 h-fit">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-semibold text-charcoal-905">Par e-mail</h3>
                  <p className="text-xs text-charcoal-500 font-light mt-0.5">Nous répondons sous 12 à 24 heures.</p>
                  <a href="mailto:support@kcvintage.com" className="text-xs font-bold text-charcoal-800 hover:text-terracotta-600 mt-1 block">
                    support@kcvintage.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="rounded-full bg-sand-50 p-3 border border-sand-100 text-terracotta-600 h-fit">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-semibold text-charcoal-905">Par téléphone</h3>
                  <p className="text-xs text-charcoal-500 font-light mt-0.5">Du lundi au vendredi, de 9h00 à 17h00 CET.</p>
                  <a href="tel:+3312345678" className="text-xs font-bold text-charcoal-800 hover:text-terracotta-600 mt-1 block">
                    +33 (0) 1 23 45 67 89
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="rounded-full bg-sand-50 p-3 border border-sand-100 text-terracotta-600 h-fit">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-semibold text-charcoal-905">Notre Showroom</h3>
                  <p className="text-xs text-charcoal-500 font-light mt-0.5">Uniquement sur rendez-vous.</p>
                  <p className="text-xs text-charcoal-800 font-bold mt-1 leading-normal">
                    18 Rue du Faubourg Saint-Honoré, <br />
                    75008 Paris, France
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-xs border border-sand-100 shadow-2xs">
            <h2 className="font-serif text-xl font-bold text-charcoal-900 mb-6">Envoyer un message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-charcoal-800">Votre Nom *</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="ex. Jean Dupont"
                    className="w-full rounded-sm border border-sand-200 bg-[#FCFAF7] px-3.5 py-2.5 text-xs text-charcoal-950 placeholder-charcoal-400 focus:border-terracotta-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-xs font-bold uppercase tracking-wider text-charcoal-800">Adresse E-mail *</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ex. jean.dupont@example.com"
                    className="w-full rounded-sm border border-sand-200 bg-[#FCFAF7] px-3.5 py-2.5 text-xs text-charcoal-950 placeholder-charcoal-400 focus:border-terracotta-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="order" className="text-xs font-bold uppercase tracking-wider text-charcoal-800">Numéro de Commande (Optionnel)</label>
                <input
                  id="order"
                  type="text"
                  value={formData.orderNum}
                  onChange={(e) => setFormData({ ...formData, orderNum: e.target.value })}
                  placeholder="ex. ord-123456"
                  className="w-full rounded-sm border border-sand-200 bg-[#FCFAF7] px-3.5 py-2.5 text-xs text-charcoal-950 placeholder-charcoal-400 focus:border-terracotta-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="msg" className="text-xs font-bold uppercase tracking-wider text-charcoal-800">Votre Message *</label>
                <textarea
                  id="msg"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Posez-nous toutes vos questions sur les tailles, les matières ou le paiement..."
                  className="w-full rounded-sm border border-sand-200 bg-[#FCFAF7] p-3.5 text-xs text-charcoal-950 placeholder-charcoal-400 focus:border-terracotta-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-sm bg-charcoal-900 py-3.5 text-xs font-bold uppercase tracking-widest text-white hover:bg-terracotta-600 transition-colors"
              >
                Envoyer le Message <Send className="h-3.5 w-3.5" />
              </button>

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 bg-emerald-50 border border-emerald-100 rounded-sm flex items-center gap-3 text-emerald-850 text-xs font-semibold"
                  >
                    <Check className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                    <div>
                      Merci ! Votre message a été envoyé avec succès. Notre équipe vous répondra très rapidement.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
