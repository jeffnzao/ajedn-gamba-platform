'use client';
import { useState } from 'react';

export default function UserDashboard() {
  const [email, setEmail] = useState('');
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [uploadingCompanyDoc, setUploadingCompanyDoc] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    whatsapp: '',
    userType: 'ENTREPRENEUR',
    bio: '',
    skills: '',
    companyName: '',
    portfolioUrl: '',
    resumeUrl: '',
    companyDocUrl: '',
  });

  const handleFetchProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setFetching(true);
    setError(null);

    try {
      const res = await fetch('/api/members');
      const json = await res.json();
      if (json.success) {
        const found = json.data.find((m: any) => m.email.toLowerCase() === email.toLowerCase());
        if (found) {
          setFormData({
            firstName: found.firstName || '',
            lastName: found.lastName || '',
            phone: found.phone || '',
            whatsapp: found.whatsapp || '',
            userType: found.userType || 'ENTREPRENEUR',
            bio: found.bio || '',
            skills: found.skills || '',
            companyName: found.companyName || '',
            portfolioUrl: found.portfolioUrl || '',
            resumeUrl: found.resumeUrl || '',
            companyDocUrl: found.companyDocUrl || '',
          });
        } else {
          setError("Aucun profil trouvé avec cet email.");
        }
      }
    } catch (err) {
      setError("Erreur lors de la récupération du profil.");
    } finally {
      setFetching(false);
    }
  };

  // Téléversement de fichier générique
  const handleFileUpload = async (file: File, bucket: string, fieldName: 'resumeUrl' | 'companyDocUrl') => {
    const data = new FormData();
    data.append('file', file);
    data.append('bucket', bucket);

    if (fieldName === 'resumeUrl') setUploadingResume(true);
    if (fieldName === 'companyDocUrl') setUploadingCompanyDoc(true);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setFormData((prev) => ({ ...prev, [fieldName]: json.url }));
      } else {
        alert("Erreur lors du téléversement : " + json.error);
      }
    } catch (err) {
      alert("Erreur réseau lors de l'upload.");
    } finally {
      if (fieldName === 'resumeUrl') setUploadingResume(false);
      if (fieldName === 'companyDocUrl') setUploadingCompanyDoc(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      const res = await fetch('/api/members/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, ...formData }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Erreur de mise à jour');

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-amber-400 mb-2">Espace Membre & Portfolio</h1>
          <p className="text-slate-400 text-sm">
            Mettez à jour vos informations, joignez votre CV (PDF, DOCX, ZIP) ou le dossier de votre entreprise.
          </p>
        </header>

        {/* Chargement profil */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow mb-8">
          <form onSubmit={handleFetchProfile} className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Votre Email enregistré</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre.email@exemple.com"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={fetching}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-lg text-sm"
            >
              {fetching ? 'Chargement...' : 'Charger mon profil'}
            </button>
          </form>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-lg mb-6 text-sm">{error}</div>}
        {success && <div className="bg-emerald-500/10 border border-emerald-500 text-emerald-400 p-4 rounded-lg mb-6 text-sm font-medium">Profil et documents enregistrés avec succès !</div>}

        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 shadow">
          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Prénom</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Nom</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white text-sm"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Statut Professionnel</label>
                <select
                  value={formData.userType}
                  onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white text-sm"
                >
                  <option value="ENTREPRENEUR">Entrepreneur / Entreprise</option>
                  <option value="SALARIE">Salarié</option>
                  <option value="DEMANDEUR_EMPLOI">Demandeur d'emploi</option>
                  <option value="ETUDIANT">Étudiant</option>
                  <option value="AUTRE">Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Nom de l'entreprise (si applicable)</label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="Ex: Ndougou Services BTP"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white text-sm"
                />
              </div>
            </div>

            {/* Téléversement de CV / Portfolio (PDF, DOCX, ZIP) */}
            <div className="border-t border-slate-700 pt-4">
              <label className="block text-sm font-bold text-amber-400 mb-2">📄 Joindre votre CV / Portfolio (PDF, DOCX, ZIP)</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.zip,.rar"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFileUpload(e.target.files[0], 'resumes', 'resumeUrl');
                }}
                className="w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-slate-700 file:text-white hover:file:bg-slate-600"
              />
              {uploadingResume && <p className="text-xs text-amber-400 mt-1">Téléversement du CV en cours...</p>}
              {formData.resumeUrl && (
                <p className="text-xs text-emerald-400 mt-2 font-medium">
                  ✓ Fichier attaché : <a href={formData.resumeUrl} target="_blank" rel="noreferrer" className="underline">Consulter le document</a>
                </p>
              )}
            </div>

            {/* Téléversement de Dossier Entreprise */}
            <div className="border-t border-slate-700 pt-4">
              <label className="block text-sm font-bold text-amber-400 mb-2">🏢 Joindre le dossier de présentation entreprise (Plaquette, NIF, ZIP...)</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.zip,.rar,.png,.jpg"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFileUpload(e.target.files[0], 'company-docs', 'companyDocUrl');
                }}
                className="w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-slate-700 file:text-white hover:file:bg-slate-600"
              />
              {uploadingCompanyDoc && <p className="text-xs text-amber-400 mt-1">Téléversement du dossier en cours...</p>}
              {formData.companyDocUrl && (
                <p className="text-xs text-emerald-400 mt-2 font-medium">
                  ✓ Fichier attaché : <a href={formData.companyDocUrl} target="_blank" rel="noreferrer" className="underline">Consulter le dossier</a>
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Présentation / Bio</label>
              <textarea
                rows={4}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-lg text-sm transition-colors"
            >
              {loading ? 'Enregistrement...' : 'Mettre à jour mon profil'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}