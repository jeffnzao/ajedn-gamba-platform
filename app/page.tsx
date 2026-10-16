import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="bg-blue-900 text-white py-20 px-6 text-center">
        <h1 className="text-4xl font-extrabold mb-4">AJEDN - Gamba</h1>
        <p className="text-xl max-w-2xl mx-auto mb-8">
          Association des Jeunes Entrepreneurs du Département de Ndougou. « C'est dans l'unité que nous vaincrons[cite: 6]. »
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/dashboard/user" className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-lg shadow">
            Espace Membre
          </Link>
          <Link href="/dashboard/admin" className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-lg shadow">
            Administration (Bureau)
          </Link>
        </div>
      </div>

      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-2xl font-bold mb-6 text-blue-900 border-b-2 border-amber-500 pb-2">
          Synergie Locale & Projets Mairie 2026
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow border border-slate-200">
            <h3 className="font-bold text-lg mb-2 text-blue-800">Marché du Littoral</h3>
            <p className="text-sm text-slate-600">Construction de 6 box, hangar pour pêcheurs et réfection des installations électriques et sanitaires[cite: 2].</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border border-slate-200">
            <h3 className="font-bold text-lg mb-2 text-blue-800">Espace Coworking Gamba</h3>
            <p className="text-sm text-slate-600">Accès haut débit, postes de travail et accompagnement aux appels d'offres pour les jeunes entrepreneurs[cite: 21].</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border border-slate-200">
            <h3 className="font-bold text-lg mb-2 text-blue-800">Banque de Talents & Diaspora</h3>
            <p className="text-sm text-slate-600">Recensement des compétences locales et internationales pour répondre aux campagnes de recrutement à Gamba.</p>
          </div>
        </div>
      </section>
    </main>
  );
}