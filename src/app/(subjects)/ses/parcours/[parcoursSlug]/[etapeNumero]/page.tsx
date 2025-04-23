// src/app/(subjects)/ses/parcours/[parcoursSlug]/[etapeNumero]/page.tsx

import { getParcoursBySlug, getEtape } from "@/data/ses/parcours"; // Nos fonctions utilitaires synchrones
// import { Parcours, Etape } from '@/types/parcours.types'; // Pas besoin d'importer Etape/Parcours ici si getEtape/getParcoursBySlug les retournent déjà typés
import { notFound } from "next/navigation";
import Link from "next/link";
// --- Ajout de generateStaticParams ---
// Cette fonction indique à Next.js quelles combinaisons de slug/numero existent
// afin qu'il puisse les générer à l'avance lors du build.
export async function generateStaticParams() {
  // Importe les données DANS la fonction pour s'assurer qu'elles sont fraîches au build
  const { parcoursSES } = await import("@/data/ses/parcours");

  // Crée la liste des paramètres pour chaque étape existante
  return parcoursSES.flatMap((parcours) =>
    parcours.etapes.map((etape) => ({
      parcoursSlug: parcours.slug,
      etapeNumero: String(etape.numero), // Le type retourné doit correspondre aux noms des dossiers dynamiques
    }))
  );
}
// --- Fin de generateStaticParams ---
// --- Nouvelle structure pour Next.js 15 ---

// Étape 1: Définir la forme des paramètres une fois la Promise résolue
type ResolvedParams = {
  parcoursSlug: string;
  etapeNumero: string; // Vient de l'URL, donc c'est une chaîne
};

// Étape 2: Définir le type des props de la page avec les Promises
type PageProps = {
  params: Promise<ResolvedParams>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>; // searchParams est aussi une Promise, optionnelle
};

// Étape 3: Utiliser le type PageProps et rendre le composant Page ASYNC
export default async function EtapePage({ params, searchParams }: PageProps) {
  // Utiliser await pour obtenir les valeurs des paramètres résolus
  const resolvedParams = await params;
  // Gérer aussi searchParams s'il existe (même si on ne l'utilise pas ici)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const resolvedSearchParams = searchParams ? await searchParams : {};

  // Extraire les slugs/numeros DEPUIS les params résolus
  const { parcoursSlug, etapeNumero } = resolvedParams;
  const numeroEtape = parseInt(etapeNumero, 10); // Convertir APRES await

  // --- Logique existante (appelée APRES await) ---

  // Récupérer les données du parcours et de l'étape actuelle
  // Ces fonctions sont synchrones dans notre cas (basées sur /data)
  const parcours = getParcoursBySlug(parcoursSlug);
  const etape = getEtape(parcoursSlug, numeroEtape);

  // Si le parcours ou l'étape n'existent pas, afficher une page 404
  if (!parcours || !etape) {
    notFound();
  }

  // Calculer les numéros pour la navigation (étape précédente/suivante)
  const etapePrecedente = numeroEtape > 1 ? numeroEtape - 1 : null;
  // On vérifie l'existence de l'étape suivante après avoir les infos du parcours courant
  const etapeSuivante = getEtape(parcoursSlug, numeroEtape + 1)
    ? numeroEtape + 1
    : null;

  // --- Rendu JSX (inchangé) ---
  return (
    <div>
      {/* Utiliser les données de 'parcours' et 'etape' récupérées */}
      <h1 className="text-2xl font-bold mb-2">Parcours : {parcours.titre}</h1>
      <h2 className="text-xl font-semibold mb-4">
        Étape {etape.numero} : {etape.titre}
      </h2>

      {/* Zone où le contenu spécifique de l'étape sera rendu */}
      <div className="content p-4 border rounded mb-4 min-h-[200px]">
        {etape.type === "contenu" && (
          <p>Ceci est une page de contenu simple.</p>
        )}
        {etape.type === "exercice-cloze" && (
          <p>Ici, on afficherait le composant pour l&apos;exercice à trou.</p>
        )}
        {etape.type === "graphique-pib" && (
          <p>Ici, on afficherait le composant Graphique PIB.</p>
        )}
        {etape.type === "autre" && (
          <p>Ici, on afficherait un autre type de contenu/exercice.</p>
        )}
      </div>

      {/* Navigation entre les étapes */}
      <div className="navigation flex justify-between">
        {etapePrecedente ? (
          <Link
            href={`/ses/parcours/${parcoursSlug}/${etapePrecedente}`}
            className="text-blue-600 hover:underline"
          >
            &larr; Étape précédente ({etapePrecedente})
          </Link>
        ) : (
          <span />
        )}
        {etapeSuivante ? (
          <Link
            href={`/ses/parcours/${parcoursSlug}/${etapeSuivante}`}
            className="text-blue-600 hover:underline"
          >
            Étape suivante ({etapeSuivante}) &rarr;
          </Link>
        ) : (
          <span className="text-gray-500">Fin du parcours</span>
        )}
      </div>
    </div>
  );
}
