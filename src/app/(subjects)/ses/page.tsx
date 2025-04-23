import Link from "next/link";

export default function SesHomePage() {
  return (
    <div>
      <h1>Bienvenue dans la section SES</h1>
      <p>Choisissez un parcours pour commencer :</p>
      {/* Ici, nous listerons les parcours disponibles plus tard */}
      <ul>
        <li>
          <Link href="/ses/parcours/exemple-parcours/1">
            Lien vers un parcours exemple (Étape 1)
          </Link>
        </li>
        {/* Ajouter d'autres liens ou un chargement dynamique des parcours */}
      </ul>
    </div>
  );
}
