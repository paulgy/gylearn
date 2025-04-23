// src/data/ses/parcours.ts

import { Parcours, Etape } from "@/types/parcours.types"; // Importe Parcours ET Etape

// Liste des parcours disponibles pour la section SES
export const parcoursSES: Parcours[] = [
  {
    slug: "introduction-pib",
    titre: "Introduction au Produit Intérieur Brut (PIB)",
    description:
      "Un parcours pour comprendre ce qu'est le PIB et comment il est mesuré.",
    discipline: "SES",
    etapes: [
      {
        numero: 1,
        titre: "Qu'est-ce que le PIB ?",
        type: "contenu", // Simple page de contenu explicatif
      },
      {
        numero: 2,
        titre: "Exercice : Calcul simple du PIB",
        type: "exercice-cloze", // Exercice à trou spécifique
      },
      {
        numero: 3,
        titre: "Visualisation : Évolution du PIB",
        type: "graphique-pib", // Composant affichant un graphique
      },
    ],
  },
  {
    slug: "marche-du-travail",
    titre: "Le Marché du Travail",
    description:
      "Analyse du fonctionnement du marché du travail, du chômage et des politiques d'emploi.",
    discipline: "SES",
    etapes: [
      {
        numero: 1,
        titre: "Les bases du marché du travail",
        type: "contenu",
      },
      {
        numero: 2,
        titre: "Exercice : Statut d'emploi",
        type: "autre", // Un autre type d'exercice ou de contenu
      },
      // Ajouter d'autres étapes ici...
    ],
  },
  // Ajoutez ici d'autres parcours SES quand vous les créerez
];

// Fonction utilitaire pour récupérer facilement un parcours par son slug
export const getParcoursBySlug = (slug: string): Parcours | undefined => {
  return parcoursSES.find((p) => p.slug === slug);
};

// Fonction utilitaire pour récupérer une étape spécifique d'un parcours
export const getEtape = (
  slug: string,
  numeroEtape: number
): Etape | undefined => {
  const parcours = getParcoursBySlug(slug);
  if (!parcours) {
    return undefined;
  }
  return parcours.etapes.find((e) => e.numero === numeroEtape);
};
