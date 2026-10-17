'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'EMAIL' | 'OTP'>('EMAIL');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Étape 1 : Demande d'envoi du code OTP par email
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true, // Crée automatiquement le compte s'il n'existe pas
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage(`Un code temporaire a été envoyé à ${email}. Vérifiez votre boîte mail.`);
      setStep('OTP');
    }
    setLoading(false);
  };

  // Étape 2 : Vérification du code OTP saisi par l'utilisateur
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error, data } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'email',
    });

    if (error) {
      setError("Code invalide ou expiré. Veuillez réespayer.");
      setLoading(false);
    } else if (data.session) {
      router.push('/dashboard/user');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-xl">
        <h1 className="text-2xl font-bold text-amber-400 mb-2 text-center">Connexion Sécurisée AJEDN</h1>
        <p className="text-sm text-slate-400 text-center mb-6">
          Connexion sans mot de passe via code temporaire (OTP).
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded-lg text-sm mb-4 text-center">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-emerald-500/10 border border-emerald-500 text-emerald-400 p-3 rounded-lg text-sm mb-4 text-center">
            {message}
          </div>
        )}

        {step === 'EMAIL' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Votre adresse email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-amber-400 text-sm"
                placeholder="votre.email@exemple.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-lg transition-colors text-sm"
            >
              {loading ? 'Envoi du code...' : 'Recevoir mon code d\'accès'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Code temporaire reçu par email</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                maxLength={6}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white text-center text-xl tracking-widest font-mono focus:outline-none focus:border-amber-400"
                placeholder="123456"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 rounded-lg transition-colors text-sm"
            >
              {loading ? 'Vérification...' : 'Valider et accéder à mon compte'}
            </button>

            <button
              type="button"
              onClick={() => setStep('EMAIL')}
              className="w-full text-xs text-slate-400 hover:text-amber-400 text-center block pt-2"
            >
              ← Modifier l'adresse email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}