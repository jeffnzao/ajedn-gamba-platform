'use client';

export default function ProjetsMairiePage() {
  const projetsMairie2026 = [
    { id: 1, lot: "Marché du Littoral", desc: "Construction de 6 box, hangar pour les pêcheurs, réfection des toilettes et de l'éclairage des étals." },
    { id: 2, lot: "Tri sélectif des ordures", desc: "Construction d'un point d'apport volontaire (PAV) écologique, autonome, compartimenté avec récupération d'eau de pluie et solaire." },
    { id: 3, lot: "Pharmacie Municipale", desc: "Transformation du logement du Secrétaire Général en Pharmacie Municipale." },
    { id: 4, lot: "Marché de Plaine 4", desc: "Réfection de la plomberie, étanchéité, menuiserie, éclairage, peinture des étals et construction d'une dalle." },
    { id: 5, lot: "Réhabilitation de voiries", desc: "Interventions ciblées sur la Zone KOITA." },
    { id: 6, lot: "Hôtel de Ville", desc: "Aménagement du Hall, construction d'une rampe d'accès et remplacement de la porte principale." },
    { id: 7, lot: "Magasin de stockage", desc: "Construction d'un Magasin R+1 à l'Hôtel de ville et d'un hangar pour le carburant et les huiles." },
    { id: 8, lot: "Boulangerie Municipale", desc: "Réhabilitation et viabilisation de la boulangerie municipale." },
    { id: 9, lot: "Cité blanche", desc: "Réhabilitation de 2 villas et sécurisation de toutes les villas." },
    { id: 10, lot: "Cité zone Affaires sociales", desc: "Sécurisation, étanchéité et équipement hygiénique." },
    { id: 11, lot: "Complex Bel-Air", desc: "Assainissement, étanchéité et aménagement." },
    { id: 12, lot: "Ravalement Hôtel de ville", desc: "Remise en état de l'Hôtel de ville et nettoyage en profondeur." },
    { id: 13, lot: "Éclairage solaire urbain", desc: "Installation de 400 lampadaires solaires dans le périmètre urbain de Gamba." },
    { id: 14, lot: "Audiovisuel Mairie", desc: "Fourniture et installation de matériel audiovisuel fixe dans les salles de mariage et de réunion." },
    { id: 15, lot: "Réseau d'eau", desc: "Diagnostic, réparation et augmentation de la capacité en eau de l'institution." },
    { id: 16, lot: "Passerelles", desc: "Travaux de construction et de réfection à réaliser sur dix passerelles." },
    { id: 17, lot: "Base Technique", desc: "Forage et électrification par panneaux solaires." },
    { id: 18, lot: "Place des Fêtes", desc: "Modernisation avec extension de la tribune existante." },
    { id: 19, lot: "Guérite d'entrée", desc: "Construction d'une guérite de contrôle à l'entrée de la ville de Gamba." }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-amber-400 mb-2">Chantiers & Projets Mairie de Gamba 2026</h1>
          <p className="text-slate-400 text-sm">
            Opportunités de positionnement et de sous-traitance pour les jeunes entrepreneurs membres de l'AJEDN.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {projetsMairie2026.map((projet) => (
            <div key={projet.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">
                  Lot #{projet.id}
                </span>
                <h2 className="text-xl font-bold text-white mt-3 mb-2">{projet.lot}</h2>
                <p className="text-slate-300 text-sm leading-relaxed">{projet.desc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-700/60 flex justify-between items-center text-xs text-slate-400">
                <span>Maître d'ouvrage : Mairie de Gamba</span>
                <span className="text-amber-400 font-medium">Coordination AJEDN</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}