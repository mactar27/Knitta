export interface Review {
  id: string;
  user: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  size: string;
  brand: string;
  condition: "Très bon état" | "Bon état" | "Usure naturelle" | "Neuf" | "Fait main";
  images: string[];
  inStock: boolean;
  stockCount: number;
  isNewArrival: boolean;
  isBestSeller: boolean;
  rating: number;
  reviews: Review[];
  details: string[]; // Specs (Material, ingredients, sizes)
  target: "Femme" | "Homme" | "Enfant" | "Unisexe";
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Mules Plateformes Fourrées Crochet",
    description: "Mules d'intérieur et d'extérieur ultra confortables de style Ugg. Doublure fourrée en fausse fourrure beige laineuse pour maintenir vos pieds au chaud, dotées d'une plateforme stable de 4cm et agrémentées d'une élégante bordure crochetée à la main KnittaCorner.",
    price: 35,
    category: "Accessoires & Chaussures",
    size: "38-39",
    brand: "KnittaCorner",
    condition: "Neuf",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1588361861040-cf9b1018204d?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    stockCount: 1,
    isNewArrival: true,
    isBestSeller: true,
    rating: 4.9,
    reviews: [
      { id: "r1", user: "Mariama D.", rating: 5, date: "2026-06-15", comment: "Super confortables et la finition crochetée est magnifique." }
    ],
    details: [
      "Matière : Suédine de qualité supérieure",
      "Doublure : Laine synthétique ultra douce",
      "Finition : Broderie crochetée main par Binta",
      "Semelle : Plateforme EVA antidérapante 4cm"
    ],
    target: "Femme"
  },
  {
    id: "p2",
    name: "Coffret Mascara Double The Drama",
    description: "Pack exclusif Kiss Beauty contenant deux mascaras professionnels. Apporte un volume spectaculaire et allonge vos cils dès le premier passage. Tenue longue durée de 24h sans paquet et résistante à l'eau.",
    price: 15,
    category: "Archives & Vintage",
    size: "Taille Unique",
    brand: "Vintage",
    condition: "Neuf",
    images: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    stockCount: 1,
    isNewArrival: true,
    isBestSeller: true,
    rating: 4.8,
    reviews: [
      { id: "r2", user: "Fatou S.", rating: 5, date: "2026-07-02", comment: "Le meilleur mascara volumateur que j'ai testé à Dakar." }
    ],
    details: [
      "Contenu : 2 Mascaras volumateurs",
      "Formule : Résistante à l'eau & Sans paquet",
      "Tenue : Longue durée 24 heures",
      "Couleur : Noir profond"
    ],
    target: "Femme"
  },
  {
    id: "p3",
    name: "Revolution Base Fix Spray Fixateur",
    description: "Le spray fixateur de teint Revolution Base Fix offre une tenue extrême à votre maquillage sous le climat chaud de Dakar. Fixation hydratante, matifiante et imperméable pour conserver un fini parfait du matin au soir.",
    price: 18,
    category: "Archives & Vintage",
    size: "Taille Unique",
    brand: "Streetwear",
    condition: "Neuf",
    images: [
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    stockCount: 1,
    isNewArrival: true,
    isBestSeller: false,
    rating: 4.7,
    reviews: [
      { id: "r3", user: "Awa N.", rating: 4, date: "2026-07-10", comment: "Le maquillage ne bouge pas de la journée, très bon spray fixateur." }
    ],
    details: [
      "Volume : 100 ml",
      "Finition : Mat invisible & Hydratant",
      "Usage : Convient à tous les types de peau",
      "Conseil : Secouer et vaporiser à 20cm"
    ],
    target: "Femme"
  },
  {
    id: "p4",
    name: "Trio de Gloss Scintillants Beauty Treats",
    description: "Un lot de trois gloss repulpants scintillants aux reflets chauds et scintillants dorés. Apporte une hydratation instantanée à vos lèvres grâce à une formule enrichie en vitamines et huiles naturelles.",
    price: 12,
    category: "Archives & Vintage",
    size: "Taille Unique",
    brand: "Designer",
    condition: "Neuf",
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    stockCount: 1,
    isNewArrival: false,
    isBestSeller: true,
    rating: 4.6,
    reviews: [],
    details: [
      "Contenu : 3 Tubes de gloss scintillants",
      "Ingrédients : Vitamine E & Huile de coco",
      "Finition : Ultra brillante non collante",
      "Parfum : Fruité doux"
    ],
    target: "Femme"
  },
  {
    id: "p5",
    name: "Sac Cabas Orange Crocheté Main",
    description: "Sac à bandoulière d'été, idéal pour le quotidien. Crocheté entièrement à la main par Binta dans notre atelier de Dakar. Sa couleur orange vif apporte du dynamisme et sa maille ajourée assure un style bohème moderne unique.",
    price: 25,
    category: "Vêtements & Streetwear",
    size: "M",
    brand: "KnittaCorner",
    condition: "Fait main",
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    stockCount: 1,
    isNewArrival: true,
    isBestSeller: true,
    rating: 4.9,
    reviews: [
      { id: "r4", user: "Khady J.", rating: 5, date: "2026-06-25", comment: "Couleur sublime, idéal pour mes tenues d'été. C'est du super travail !" }
    ],
    details: [
      "Créateur : Tricoté main par Binta",
      "Matière : Fil de coton biologique épais",
      "Dimensions : Largeur 26cm x Hauteur 22cm",
      "Lavage : Lavage à la main recommandé"
    ],
    target: "Unisexe"
  },
  {
    id: "p6",
    name: "Sac Cordon Crochet aux Couleurs Palestiniennes",
    description: "Sac seau crocheté à la main, arborant les bandes symboliques verte, blanche, noire et rouge. Fermeture à cordon solide avec pompons et bandoulière en maille renforcée pour plus de durabilité.",
    price: 30,
    category: "Vêtements & Streetwear",
    size: "M",
    brand: "KnittaCorner",
    condition: "Fait main",
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    stockCount: 1,
    isNewArrival: false,
    isBestSeller: false,
    rating: 5.0,
    reviews: [],
    details: [
      "Créateur : Fait main par Binta",
      "Matière : Coton acrylique doux et robuste",
      "Hauteur : 24 cm | Diamètre base : 16 cm",
      "Particularité : Modèle solidaire tricoté avec amour"
    ],
    target: "Unisexe"
  },
  {
    id: "p7",
    name: "Lingettes Démaquillantes Collagène",
    description: "Lot de deux paquets de lingettes démaquillantes et nettoyantes Kiss Beauty. Formulées pour retirer en douceur le maquillage waterproof le plus résistant sans irriter les yeux ni assécher la peau.",
    price: 8,
    category: "Archives & Vintage",
    size: "Taille Unique",
    brand: "Vintage",
    condition: "Neuf",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    stockCount: 1,
    isNewArrival: false,
    isBestSeller: false,
    rating: 4.5,
    reviews: [],
    details: [
      "Contenu : 2 paquets de 60 lingettes",
      "Ingrédients : Collagène & Aloé Véra",
      "Action : Nettoyage en profondeur & Hydratant",
      "Type de peau : Peaux sensibles acceptées"
    ],
    target: "Femme"
  },
  {
    id: "p8",
    name: "Bob d&apos;été Crochet Multicolore",
    description: "Bob crocheté main en fil de coton premium aux couleurs estivales contrastées. Protège avec élégance des rayons du soleil tout en complétant vos tenues d'une touche bohème et originale.",
    price: 22,
    category: "Vêtements & Streetwear",
    size: "L",
    brand: "KnittaCorner",
    condition: "Fait main",
    images: [
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    stockCount: 1,
    isNewArrival: true,
    isBestSeller: false,
    rating: 4.8,
    reviews: [],
    details: [
      "Créateur : Fait main par Binta",
      "Matière : 100% Coton respirant",
      "Entretien : Lavage à la main uniquement à froid",
      "Taille : Diamètre tête standard adaptable (56-58cm)"
    ],
    target: "Unisexe"
  },
  {
    id: "p9",
    name: "Rouges à Lèvres Mat Luxe Couronne (Set)",
    description: "Un ensemble de trois gloss mats liquides longue tenue Kiss Beauty. Présentés dans des flacons aux capuchons dorés sculptés en couronne royale. Fini mat velours intense qui reste confortable et ne file pas.",
    price: 14,
    category: "Archives & Vintage",
    size: "Taille Unique",
    brand: "Vintage",
    condition: "Neuf",
    images: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80"
    ],
    inStock: true,
    stockCount: 1,
    isNewArrival: true,
    isBestSeller: false,
    rating: 4.7,
    reviews: [],
    details: [
      "Contenu : 3 Rouges à lèvres mats liquides",
      "Finition : Mat velouté haute pigmentation",
      "Teintes : Rosewood, Terracotta et Nude",
      "Tenue : Longue tenue sans transfert"
    ],
    target: "Femme"
  }
];

export const CATEGORIES = ["Tout", "Vêtements & Streetwear", "Archives & Vintage", "Accessoires & Sneakers"];
export const BRANDS = ["Tout", "KnittaCorner", "Vintage", "Streetwear", "Designer", "Autre"];
export const SIZES = [
  "Tout",
  "Taille Unique",
  "XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL",
  "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45",
  "36-37", "38-39", "40-41", "42-43"
];
export const CONDITIONS = ["Tout", "Neuf", "Fait main", "Très bon état", "Bon état", "Usure naturelle"];
export const TARGETS = ["Tout", "Femme", "Homme", "Enfant", "Unisexe"];
