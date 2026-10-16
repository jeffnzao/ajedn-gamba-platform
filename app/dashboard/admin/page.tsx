export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8 bg-slate-800 p-6 rounded-xl border border-slate-700">
          <div>
            <h1 className="text-2xl font-bold text-amber-400">Administration AJEDN</h1>
            <p className="text-sm text-slate-400">Pilotage Exécutif - Mandat 2026-2028</p>
          </div>
          <div className="text-right text-sm">
            <p><strong>Président :</strong> MBOUMBA HERLHY-STEPHEN</p>
            <p><strong>Trésorerie :</strong> MR NDOKI MONDJO RISTELLE</p>
          </div>
        </header>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h3 className="text-slate-400 text-sm">Membres Actifs</h3>
            <p className="text-3xl font-bold mt-2">48</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h3 className="text-slate-400 text-sm">Trésorerie du Mois</h3>
            <p className="text-3xl font-bold mt-2 text-emerald-400">240 000 XAF</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h3 className="text-slate-400 text-sm">Projets Mairie Suivis</h3>
            <p className="text-3xl font-bold mt-2 text-blue-400">19 Chantiers</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h3 className="text-slate-400 text-sm">Diaspora Connectée</h3>
            <p className="text-3xl font-bold mt-2 text-amber-400">14 Profils</p>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-lg font-bold mb-4 text-slate-200">Suivi des Activités & Plan Annuel 2026</h2>
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="border-b border-slate-700 text-slate-400">
              <tr>
                <th className="pb-3">Mois</th>
                <th className="pb-3">Activité / Événement</th>
                <th className="pb-3">Cible</th>
                <th className="pb-3">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              <tr>
                <td className="py-3">Août</td>
                <td className="py-3">Forum de l'emploi & de l'employabilité</td>
                <td className="py-3">Jeunes diplômés & entreprises[cite: 5]</td>
                <td className="py-3 text-amber-400">Planifié</td>
              </tr>
              <tr>
                <td className="py-3">Septembre</td>
                <td className="py-3">Formation : Création d'entreprise & formalisation ANPI</td>
                <td className="py-3">Jeunes leaders[cite: 5]</td>
                <td className="py-3 text-slate-400">À venir</td>
              </tr>
              <tr>
                <td className="py-3">Octobre</td>
                <td className="py-3">Atelier sur les financements & appels d'offres (Mairie 2026)</td>
                <td className="py-3">Entrepreneurs locaux[cite: 5]</td>
                <td className="py-3 text-slate-400">À venir</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}