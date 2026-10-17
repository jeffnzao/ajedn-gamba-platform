'use client';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/members');
        const json = await res.json();
        if (json.success) setMembers(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalMembers = members.length;
  const totalCotiz = members.filter((m) => m.statutCotiz === 'A_JOUR').length * 5000;

  const planActivites = [
    { mois: 'Juin', titre: 'Ateliers de marketing digital', cible: 'Jeunes entrepreneurs', statut: 'Planifié' },
    { mois: 'Juillet', titre: 'Journée de salubrité & citoyenneté', cible: 'Population de Gamba', statut: 'Planifié' },
    { mois: 'Août', titre: "Forum de l'emploi & de l'employabilité", cible: 'Jeunes diplômés & entreprises', statut: 'Planifié' },
    { mois: 'Septembre', titre: "Formation : Création d'entreprise & formalisation ANPI", cible: 'Jeunes leaders', statut: 'À venir' },
    { mois: 'Octobre', titre: "Atelier sur les financements & appels d'offres (Mairie 2026)", cible: 'Entrepreneurs locaux', statut: 'À venir' },
    { mois: 'Novembre', titre: 'Séminaire QHSE & Normes industrielles', cible: 'Secteur BTP & Services', statut: 'À venir' },
    { mois: 'Décembre', titre: 'Assemblée Générale Bilan 2026', cible: 'Tous les membres', statut: 'À venir' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* En-tête avec Pilotage Exécutif repositionné au bas du bloc */}
        <div className="bg-slate-800 p-6 sm:p-8 rounded-xl border border-slate-700 shadow-xl flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-400 mb-1">
              Administration AJEDN
            </h1>
            <p className="text-sm text-slate-400 font-medium">
              Pilotage Exécutif – Mandat 2026-2028
            </p>
          </div>

          {/* Président & Trésorière placés sous le titre en mobile, et alignés proprement */}
          <div className="pt-4 md:pt-0 border-t md:border-t-0 border-slate-700/80 flex flex-col sm:flex-row gap-4 md:gap-8 text-xs sm:text-sm">
            <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-700/50">
              <span className="text-slate-400 block font-medium">Président :</span>
              <strong className="text-amber-400 font-bold text-sm block">MBOUMBA HERLHY-STEPHEN</strong>
            </div>
            <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-700/50">
              <span className="text-slate-400 block font-medium">Trésorerie Générale :</span>
              <strong className="text-emerald-400 font-bold text-sm block">MR NDOKI MONDJO RISTELLE</strong>
            </div>
          </div>
        </div>

        {/* Indicateurs Clés */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow">
            <span className="text-xs text-slate-400 font-medium block mb-1">Membres Actifs</span>
            <span className="text-3xl font-black text-white">{totalMembers}</span>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow">
            <span className="text-xs text-slate-400 font-medium block mb-1">Trésorerie Estimée du Mois</span>
            <span className="text-3xl font-black text-emerald-400">{totalCotiz.toLocaleString('fr-FR')} XAF</span>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow sm:col-span-2 lg:col-span-1">
            <span className="text-xs text-slate-400 font-medium block mb-1">Cotisation Mensuelle</span>
            <span className="text-3xl font-black text-amber-400">5 000 XAF</span>
            <span className="text-[10px] text-slate-400 block mt-1">Exigible le 5 de chaque mois (Art. 18)</span>
          </div>
        </div>

        {/* Suivi des Activités & Plan Annuel 2026 avec scroll horizontal sécurisé */}
        <div className="bg-slate-800 p-5 sm:p-8 rounded-xl border border-slate-700 shadow-xl overflow-hidden">
          <h2 className="text-xl font-extrabold text-amber-400 mb-4">
            Suivi des Activités & Plan Annuel 2026
          </h2>

          {/* Wrapper overflow-x-auto pour empêcher la table de déborder sur écran mobile */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 min-w-[500px]">
              <thead className="bg-slate-900/80 text-amber-400 uppercase text-[11px] tracking-wider border-b border-slate-700">
                <tr>
                  <th className="py-3 px-4">Mois</th>
                  <th className="py-3 px-4">Activité / Événement</th>
                  <th className="py-3 px-4">Cible</th>
                  <th className="py-3 px-4 text-right">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60">
                {planActivites.map((act, index) => (
                  <tr key={index} className="hover:bg-slate-700/30 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">{act.mois}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-200">{act.titre}</td>
                    <td className="py-3.5 px-4 text-slate-400">{act.cible}</td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          act.statut === 'Planifié'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-slate-700 text-slate-400'
                        }`}
                      >
                        {act.statut}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}