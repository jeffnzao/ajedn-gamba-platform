'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-900 border-b border-slate-800 text-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="font-extrabold text-amber-400 text-lg sm:text-xl tracking-tight">
            AJEDN <span className="text-slate-400 text-sm font-normal hidden xs:inline">| Gamba</span>
          </Link>

          {/* Liens Desktop / Tablette Large */}
          <div className="hidden md:flex gap-6 text-sm items-center">
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
            <Link href="/login" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-lg transition-colors text-xs uppercase tracking-wider">
              Connexion
            </Link>
          </div>

          {/* Bouton Hamburger Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-slate-300 hover:text-amber-400 focus:outline-none p-2"
              aria-label="Menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu déroulant Mobile & Tablette */}
      {isOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/annuaire"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-slate-200 hover:text-amber-400 font-medium"
          >
            📋 Annuaire & Talents
          </Link>
          <Link
            href="/annonces"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-slate-200 hover:text-amber-400 font-medium"
          >
            📢 Offres & Annonces
          </Link>
          <Link
            href="/projets-mairie"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-slate-200 hover:text-amber-400 font-medium"
          >
            🏗️ Projets Mairie 2026
          </Link>
          <Link
            href="/adhesion"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-slate-200 hover:text-amber-400 font-medium"
          >
            ✍️ Adhésion
          </Link>
          <Link
            href="/dashboard/user"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-slate-200 hover:text-amber-400 font-medium"
          >
            👤 Espace Membre
          </Link>
          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center bg-amber-500 text-slate-950 font-bold py-2.5 rounded-lg mt-2"
          >
            Se connecter
          </Link>
        </div>
      )}
    </nav>
  );
}