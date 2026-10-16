'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 text-slate-100 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="font-extrabold text-amber-400 text-lg">
          AJEDN - Gamba
        </Link>
        <div className="flex gap-6 text-sm items-center">
          <Link href="/annuaire" className="hover:text-amber-400 transition-colors">
            Annuaire & Talents
          </Link>
          <Link href="/annonces" className="hover:text-amber-400 transition-colors">
            Offres & Annonces
          </Link>
          <Link href="/projets-mairie" className="hover:text-amber-400 transition-colors">
            Projets Mairie 2026
          </Link>
          <Link href="/adhesion" className="hover:text-amber-400 transition-colors">
            Adhésion
          </Link>
          <Link href="/dashboard/user" className="hover:text-amber-400 transition-colors">
            Espace Membre
          </Link>
          <Link href="/dashboard/admin" className="hover:text-amber-400 transition-colors">
            Admin
          </Link>
          <Link href="/login" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-lg transition-colors">
            Connexion
          </Link>
        </div>
      </div>
    </nav>
  );
}