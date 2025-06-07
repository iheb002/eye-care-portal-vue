
// Base Product interface matching the main productSchema
export interface BaseProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  stock: number;
  category: 'Montres optique' | 'Lentille' | 'Verre' | 'Monture Solaire';
  opticienId: string;
  offres?: string[]; // Array of Offre IDs
  createdAt: string;
  kind: 'Accessoire' | 'Lentille' | 'Lunette'; // discriminatorKey
}

// Lentille discriminator
export interface LentilleProduct extends BaseProduct {
  kind: 'Lentille';
  type?: string; // "souple", "rigide"
  dioptrie?: number; // e.g., -2.5
  dureeVie?: string; // e.g., "1 jour", "1 mois"
  couleur?: string; // e.g., "bleu", "vert"
}

// Accessoire discriminator
export interface AccessoireProduct extends BaseProduct {
  kind: 'Accessoire';
  type?: string; // "Étui", "Chiffon", "Spray"
  compatibilite?: string; // "Tous types", "Montures métal", "Lentilles"
}

// Lunette discriminator
export interface LunetteProduct extends BaseProduct {
  kind: 'Lunette';
  type?: string;
  couleur?: string;
  forme?: string;
  matiere?: string;
  genre?: 'Homme' | 'Femme' | 'Enfant' | 'Mixte';
  model3d?: string;
}

// Union type for all products
export type Product = LentilleProduct | AccessoireProduct | LunetteProduct;
