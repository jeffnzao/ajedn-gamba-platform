'use client';
import { useEffect, useState } from 'react';

export default function AnnuairePage() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchMembers() {
      try {
        const res = await fetch('/api/members');
        const json = await res.json();
        if (json.success) {
          setMembers(json.data);
        }
      } catch (err) {
        console.error("Erreur chargement annuaire", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMembers();
  }, []);

  const filteredMembers = members.filter((m) => {
    const matchesType = filterType === 'ALL' || m.userType === filterType;
    const matchesSearch = 
      m.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m.companyName && m.companyName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (m.skills && m.skills.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-amber-400 mb-2">Annuaire Économique & Talents de Gamba</h1>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Retrouvez les entrepreneurs, salariés, demandeurs d'emploi et entreprises de l'écosystème de Ndougou (Membres AJEDN et acteurs locaux).
          </p>
        </header>

        {/* Filtres & Recherche */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <input
            type="text"
            placeholder="Rechercher par nom, entreprise, compétence..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/3 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:border-amber-400 focus:outline-none text-sm"
          />

          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end">
            {['ALL', 'ENTREPRENEUR', 'SALARIE', 'DEMANDEUR_EMPLOI'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  filterType === type
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-900 text-slate-300 border border-slate-700 hover:bg-slate-700'
                }`}
              >
                {type === 'ALL' ? 'Tous' : type.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Grille des profils */}
        {loading ? (
          <div className="text-center py-20 text-slate-400">Chargement de l'annuaire de Gamba...</div>
        ) : filteredMembers.length === 0 ? (
          <div className="text-center py-20 bg-slate-800 rounded-xl border border-slate-700">
            <p className="text-slate-400">Aucun profil trouvé dans l'annuaire pour le moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <div key={member.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-full border border-amber-500/20">
                      {member.userType}
                    </span>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${member.isAjednMember ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-700 text-slate-300'}`}>
                      {member.isAjednMember ? 'Membre AJEDN' : 'Acteur Externe'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">{member.firstName} {member.lastName}</h3>
                  {member.companyName && (
                    <p className="text-sm font-semibold text-blue-400 mb-2">🏢 {member.companyName}</p>
                  )}

                  <p className="text-xs text-slate-400 mb-4">📍 {member.residence} {member.isDiaspora && '(Diaspora)'}</p>

                  <p className="text-sm text-slate-300 mb-4 line-clamp-3">
                    {member.bio || "Aucune description de portfolio renseignée."}
                  </p>

                  {member.skills && (
                    <div className="mb-4">
                      <span className="text-xs text-slate-400 block mb-1 font-semibold">Compétences / Secteur :</span>
                      <span className="text-xs bg-slate-900 text-slate-200 px-2 py-1 rounded border border-slate-700 inline-block">
                        {member.skills}
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-700 flex justify-between items-center text-xs">
                  <span className="text-slate-400">WhatsApp : {member.whatsapp || member.phone || 'Non renseigné'}</span>
                  {member.portfolioUrl && (
                    <a
                      href={member.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 font-semibold hover:underline"
                    >
                      Voir Portfolio →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}