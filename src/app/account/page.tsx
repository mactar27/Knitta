"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Heart, User, LogOut, Package, Settings, Eye, Trash2, ArrowRight } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

function AccountContent() {
  const {
    currentUser,
    orders,
    wishlist,
    products,
    login,
    register,
    logout,
    toggleWishlist
  } = useShop();

  const searchParams = useSearchParams();
  const router = useRouter();

  // Tabs: "orders", "wishlist", "profile"
  const [activeTab, setActiveTab] = useState("orders");
  const [isLoginView, setIsLoginView] = useState(true);

  // Form States
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // Sync tab with search parameters
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && ["orders", "wishlist", "profile"].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    if (isLoginView) {
      if (email.trim()) {
        login(email.trim());
      } else {
        setAuthError("Veuillez fournir une adresse e-mail.");
      }
    } else {
      if (name.trim() && email.trim()) {
        register(name.trim(), email.trim());
      } else {
        setAuthError("Veuillez remplir tous les champs obligatoires.");
      }
    }
  };

  // Filter wishlist products
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  // Filter orders for the current user
  const userOrders = orders.filter((o) => {
    if (!currentUser) return false;
    return o.customerEmail.toLowerCase() === currentUser.email.toLowerCase();
  });

  const getStatusColor = (status: string) => {
    if (status === "Livre") return "bg-emerald-50 text-emerald-700 border-emerald-100";
    if (status === "Expedie") return "bg-blue-50 text-blue-700 border-blue-100";
    return "bg-amber-50 text-amber-700 border-amber-100";
  };

  const getStatusLabel = (status: string) => {
    if (status === "Delivered" || status === "Livre") return "Livré";
    if (status === "Shipped" || status === "Expedie") return "Expédié";
    return "En préparation";
  };

  // LOGIN / REGISTER INTERFACE
  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FCFAF7]">
        <Navbar />

        <main className="flex-1 flex items-center justify-center py-20 px-4">
          <div className="w-full max-w-md bg-white border border-sand-100 rounded-sm p-6 sm:p-10 shadow-sm space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-terracotta-600">Portail Collecteur</span>
              <h1 className="font-serif text-2xl font-bold text-charcoal-900">
                {isLoginView ? "Bon retour" : "Créer un compte"}
              </h1>
              <p className="text-xs text-charcoal-400">
                {isLoginView ? "Connectez-vous pour suivre vos commandes et voir vos favoris." : "Inscrivez-vous pour rejoindre notre club."}
              </p>
            </div>

            {/* Auth Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {!isLoginView && (
                <div className="space-y-1.5">
                  <label htmlFor="auth-name" className="text-[10px] font-bold uppercase tracking-wider text-charcoal-800">Votre Nom</label>
                  <input
                    id="auth-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jean Dupont"
                    className="w-full rounded-sm border border-sand-200 bg-[#FCFAF7] px-3.5 py-2.5 text-xs text-charcoal-950 focus:border-terracotta-600 focus:outline-none"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label htmlFor="auth-email" className="text-[10px] font-bold uppercase tracking-wider text-charcoal-800">Adresse E-mail</label>
                <input
                  id="auth-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jean.dupont@example.com"
                  className="w-full rounded-sm border border-sand-200 bg-[#FCFAF7] px-3.5 py-2.5 text-xs text-charcoal-950 focus:border-terracotta-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="auth-pass" className="text-[10px] font-bold uppercase tracking-wider text-charcoal-800">Mot de passe</label>
                <input
                  id="auth-pass"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-sm border border-sand-200 bg-[#FCFAF7] px-3.5 py-2.5 text-xs text-charcoal-950 focus:border-terracotta-600 focus:outline-none"
                />
              </div>

              {authError && (
                <p className="text-xs text-red-500 text-center font-medium">{authError}</p>
              )}

              <button
                type="submit"
                className="w-full rounded-sm bg-charcoal-900 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-terracotta-600 transition-colors shadow-3xs"
              >
                {isLoginView ? "Se connecter" : "S'inscrire"}
              </button>
            </form>

            {/* Toggle state links */}
            <div className="text-center pt-4 border-t border-sand-100 text-xs">
              <span className="text-charcoal-400">
                {isLoginView ? "Pas encore de compte ? " : "Déjà inscrit ? "}
              </span>
              <button
                onClick={() => {
                  setIsLoginView(!isLoginView);
                  setAuthError("");
                }}
                className="text-terracotta-600 font-bold hover:underline"
              >
                {isLoginView ? "Créer un compte" : "Se connecter"}
              </button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // LOGGED IN PORTAL
  return (
    <div className="min-h-screen flex flex-col bg-[#FCFAF7]">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Welcome Header bar */}
        <div className="bg-white border border-sand-100 rounded-sm p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-3xs mb-10">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-sand-50 p-4 border border-sand-100 text-terracotta-600">
              <User className="h-8 w-8" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-terracotta-600">Tableau de Bord</span>
              <h1 className="font-serif text-2xl font-bold text-charcoal-900">Bienvenue, {currentUser.name} !</h1>
              <p className="text-xs text-charcoal-450 mt-0.5 font-light">E-mail du compte : {currentUser.email}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-charcoal-400 hover:text-red-500 transition-colors p-2"
          >
            <LogOut className="h-4 w-4" /> Se déconnecter
          </button>
        </div>

        {/* Account Tab Controls */}
        <div className="flex gap-4 border-b border-sand-200 pb-3 mb-8 overflow-x-auto">
          {[
            { id: "orders", label: "Historique des commandes", icon: <Package className="h-4 w-4" /> },
            { id: "wishlist", label: "Mes Favoris", icon: <Heart className="h-4 w-4" /> },
            { id: "profile", label: "Profil de livraison", icon: <Settings className="h-4 w-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                router.replace(`/account?tab=${tab.id}`);
              }}
              className={`flex items-center gap-2 text-xs uppercase font-bold tracking-wider pb-2 border-b-2 transition-all px-1 whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-terracotta-600 text-terracotta-600 font-bold"
                  : "border-transparent text-charcoal-400 hover:text-charcoal-900"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab contents panel */}
        <div>
          
          {/* ORDERS HISTORY TAB */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              {userOrders.length === 0 ? (
                <div className="text-center py-16 bg-white border border-sand-100 rounded-sm p-6 shadow-3xs space-y-4">
                  <Package className="h-10 w-10 text-charcoal-350 mx-auto" />
                  <p className="font-serif text-sm font-semibold text-charcoal-900">Aucune commande pour le moment</p>
                  <p className="text-xs text-charcoal-400 max-w-xs mx-auto">
                    Votre historique d&apos;achat est vide. Lorsque vous achèterez des vêtements vintage, ils apparaîtront ici avec le suivi de livraison.
                  </p>
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-1.5 rounded-sm bg-charcoal-900 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-terracotta-600 transition-colors"
                  >
                    Découvrir nos collections
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {userOrders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white border border-sand-100 rounded-sm shadow-3xs overflow-hidden"
                    >
                      {/* Order Metadata header */}
                      <div className="bg-sand-50 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-sand-100">
                        <div className="grid grid-cols-2 sm:flex sm:gap-6 text-xs gap-y-1">
                          <div>
                            <span className="text-charcoal-400 block uppercase font-light text-[9px] tracking-wider">Réf Commande</span>
                            <strong className="text-charcoal-905">{order.id}</strong>
                          </div>
                          <div>
                            <span className="text-charcoal-400 block uppercase font-light text-[9px] tracking-wider">Date d&apos;achat</span>
                            <strong className="text-charcoal-905">{order.date}</strong>
                          </div>
                          <div>
                            <span className="text-charcoal-400 block uppercase font-light text-[9px] tracking-wider">Total</span>
                            <strong className="text-charcoal-905">{order.total} FCFA</strong>
                          </div>
                        </div>

                        <span className={`text-[10px] font-bold uppercase px-3 py-1 border rounded-full ${getStatusColor(order.status)}`}>
                          {getStatusLabel(order.status)}
                        </span>
                      </div>

                      {/* Items lists */}
                      <div className="p-6 divide-y divide-sand-100">
                        {order.items.map((item) => (
                          <div key={item.product.id} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4">
                            <div className="relative h-16 w-12 flex-shrink-0 overflow-hidden rounded-xs border border-sand-200 bg-sand-50">
                              <Image
                                src={item.product.images[0]}
                                alt={item.product.name}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-[9px] uppercase font-semibold text-terracotta-600 tracking-wider">
                                {item.product.brand}
                              </span>
                              <h4 className="font-serif text-sm font-semibold text-charcoal-900 line-clamp-1">
                                {item.product.name}
                              </h4>
                              <p className="text-[10px] text-charcoal-400 mt-0.5">Taille : {item.product.size} | Prix : {item.product.price} FCFA</p>
                            </div>
                            <Link
                              href={`/product/${item.product.id}`}
                              className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 hover:text-terracotta-600 flex items-center gap-1"
                            >
                              Voir l&apos;article <ArrowRight className="h-3 w-3" />
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* WISHLIST TAB */}
          {activeTab === "wishlist" && (
            <div>
              {wishlistProducts.length === 0 ? (
                <div className="text-center py-16 bg-white border border-sand-100 rounded-sm p-6 shadow-3xs space-y-4">
                  <Heart className="h-10 w-10 text-charcoal-350 mx-auto" />
                  <p className="font-serif text-sm font-semibold text-charcoal-900">Votre liste de favoris est vide</p>
                  <p className="text-xs text-charcoal-400 max-w-xs mx-auto">
                    Ajoutez des coups de cœur en cliquant sur le cœur des fiches produits lors de votre navigation pour les enregistrer ici.
                  </p>
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-1.5 rounded-sm bg-charcoal-900 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-terracotta-600 transition-colors"
                  >
                    Voir la boutique
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {wishlistProducts.map((p) => (
                    <div key={p.id} className="relative group">
                      <ProductCard product={p} />
                      <button
                        onClick={() => toggleWishlist(p.id)}
                        className="absolute bottom-20 right-4 rounded-full bg-red-500/90 text-white p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-650"
                        title="Retirer des favoris"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <div className="max-w-2xl bg-white border border-sand-100 p-6 sm:p-8 rounded-sm shadow-3xs space-y-6">
              <h2 className="font-serif text-lg font-semibold text-charcoal-900 border-b border-sand-100 pb-3">
                Adresse de livraison par défaut
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-charcoal-800">Nom du destinataire</label>
                    <input
                      type="text"
                      defaultValue={currentUser.name}
                      disabled
                      className="w-full rounded-sm border border-sand-200 bg-sand-50 px-3.5 py-2.5 text-xs text-charcoal-550 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-charcoal-800">Adresse E-mail</label>
                    <input
                      type="email"
                      defaultValue={currentUser.email}
                      disabled
                      className="w-full rounded-sm border border-sand-200 bg-sand-50 px-3.5 py-2.5 text-xs text-charcoal-550 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-100 rounded-sm text-amber-800 text-xs">
                  <strong>Paramètres de démo :</strong> Les informations de profil ci-dessus sont synchronisées avec vos identifiants. L&apos;adresse de livraison finale est saisie lors du paiement.
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col justify-between bg-[#FCFAF7]">
        <div className="h-20 bg-white border-b border-sand-100 flex items-center justify-center font-serif font-bold text-lg text-charcoal-500">Chargement du portail client...</div>
        <div className="flex-1 flex items-center justify-center font-serif text-sm italic text-charcoal-400">Récupération de la session...</div>
      </div>
    }>
      <AccountContent />
    </Suspense>
  );
}
