export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow">
          <div>
            <h1 className="text-2xl font-bold text-blue-900">Espace Adhérent AJEDN</h1>
            <p className="text-sm text-slate-500">Bienvenue dans votre portail membre (Gamba)</p>
          </div>
          <span className="bg-green-100 text-green-800 font-semibold px-4 py-2 rounded-full text-sm">
            Cotisation : À Jour (5 000 XAF)
          </span>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-bold mb-4 text-slate-800">Mon Profil Entrepreneur</h2>
            <div className="space-y-3 text-sm">
              <p><strong>Nom :</strong> Jean Bersonne (Membre Actif)</p>
              <p><strong>Résidence :</strong> Gamba, Ndougou</p>
              <p><strong>Bureau Exécutif en exercice :</strong> Élu le 22/02/2026 (Président : MBOUMBA HERLHY-STEPHEN)</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-bold mb-4 text-slate-800">Avantages & Services</h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>✔️ Accès illimité à l'Espace Coworking Associatif Gamba[cite: 21]</li>
              <li>✔️ Veille sur les marchés publics et projets de la Mairie 2026</li>
              <li>✔️ Participation aux ateliers de formation ANPI & QHSE</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}