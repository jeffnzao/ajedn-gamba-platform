import Link from 'next/link';

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Colonne 1 : Présentation */}
        <div>
          <h2 className="text-lg font-bold text-amber-400 mb-3">AJEDN GAMBA</h2>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Association des Jeunes Entrepreneurs du Département de Ndougou. Fondée pour fédérer, former et propulser la jeunesse entrepreneuriale locale et la diaspora.
          </p>
          <p className="text-xs text-slate-500">
            Loi 1901 – Commune de Gamba, Gabon.
          </p>
        </div>

        {/* Colonne 2 : Liens Rapides */}
        <div>
          <h3 className="text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wider">Navigation</h3>
          <ul className="space-y-2 text-xs">
            <li><Link href="/annuaire" className="hover:text-amber-400 transition-colors">Annuaire Économique</Link></li>
            <li><Link href="/annonces" className="hover:text-amber-400 transition-colors">Offres & Opportunités</Link></li>
            <li><Link href="/projets-mairie" className="hover:text-amber-400 transition-colors">Chantiers Mairie 2026</Link></li>
            <li><Link href="/adhesion" className="hover:text-amber-400 transition-colors">Devenir Membre (5 000 XAF)</Link></li>
            <li><Link href="/dashboard/user" className="hover:text-amber-400 transition-colors">Espace Mon Profil</Link></li>
          </ul>
        </div>

        {/* Colonne 3 : Partenaires Institutionnels & Industriels */}
        <div>
          <h3 className="text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wider">Partenaires Clés</h3>
          <ul className="space-y-2 text-xs text-slate-400">
            <li className="flex items-center gap-2">🛢️ Assala Energy Gabon</li>
            <li className="flex items-center gap-2">🏛️ Mairie de Gamba</li>
            <li className="flex items-center gap-2">🇬🇦 Conseil Départemental de Ndougou</li>
            <li className="flex items-center gap-2">🏢 Entreprises & PME Locales</li>
            <li className="flex items-center gap-2">💼 ANPI Gabon (Formalisation)</li>
            <li className="flex items-center gap-2">🌍 Diaspora Gambanaise</li>
          </ul>
        </div>

        {/* Colonne 4 : Contacts & Permanence */}
        <div>
          <h3 className="text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wider">Contact & Bureau</h3>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>📍 <strong>Siège :</strong> Gamba, Département de Ndougou</li>
            <li>📞 <strong>Président :</strong> Mboumba Herlhy-Stephen</li>
            <li>💰 <strong>Trésorerie :</strong> Ristelle Ndoki Mondjo</li>
            <li>✉️ <strong>Email :</strong> contact@ajedn-gamba.org</li>
            <li className="pt-2">
              <span className="inline-block bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded text-[10px] font-semibold">
                Permanence : Lun - Sam 08h-17h
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
        <p>© {currentYear} AJEDN Gamba. Tous droits réservés.</p>
        <p className="text-center sm:text-right">Plateforme numérique officielle – Propulsée par la Jeunesse de Ndougou</p>
      </div>
    </footer>
  );
}