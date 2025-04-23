// src/types/parcours.types.ts

/**
 * Représente une étape individuelle dans un parcours pédagogique.
 */
export interface Etape {
  numero: number; // Le numéro de l'étape dans le parcours (ex: 1, 2, ...)
  titre: string; // Le titre de l'étape (ex: "Introduction au PIB")
  type: "contenu" | "exercice-cloze" | "graphique-pib" | "autre"; // Type d'étape pour savoir quel composant afficher
  // Ajoutez d'autres types selon vos besoins
  // Vous pouvez ajouter d'autres champs si nécessaire, par exemple :
  // description?: string;
  // contenuId?: string; // Un ID pour charger un contenu spécifique si besoin
}

/**
 * Représente un parcours pédagogique complet.
 */
export interface Parcours {
  slug: string; // Identifiant unique utilisé dans l'URL (ex: "pib-introduction")
  titre: string; // Titre complet du parcours (ex: "Comprendre le PIB")
  description: string; // Courte description du parcours
  discipline: "SES" | "SNT"; // Pourrait être utile pour filtrer plus tard
  etapes: Etape[]; // La liste des étapes qui composent le parcours
}
