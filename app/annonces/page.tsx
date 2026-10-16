'use client';
import { useState, useEffect } from 'react';

export default function AnnoncesPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'ANNONCE',
    fileUrl: '',
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      const json = await res.json();
      if (json.success) setPosts(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    const data = new FormData();
    data.append('file', file);
    data.append('bucket', 'attachments');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setFormData((prev) => ({ ...prev, fileUrl: json.url }));
      } else {
        alert("Erreur de téléversement : " + json.error);
      }
    } catch (err) {
      alert("Erreur réseau");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, ...formData }),
      });
      const json = await res.json();
      if (json.success) {
        setShowForm(false);
        setFormData({ title: '', content: '', category: 'ANNONCE', fileUrl: '' });
        fetchPosts();
      } else {
        alert(json.error);
      }
    } catch (err) {
      alert("Erreur de publication");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-amber-400 mb-1">Offres, Annonces & Opportunités</h1>
            <p className="text-slate-400 text-sm">Publications avec images, vidéos et fichiers joints.</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2.5 rounded-lg text-sm"
          >
            {showForm ? 'Fermer' : '+ Créer une publication'}
          </button>
        </header>

        {showForm && (
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow mb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Votre Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white text-sm"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Titre</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Catégorie</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white text-sm"
                  >
                    <option value="ANNONCE">Annonce Générale</option>
                    <option value="OFFRE_EMPLOI">Offre d'Emploi</option>
                    <option value="OFFRE_SOUS_TRAITANCE">Offre de Sous-traitance</option>
                    <option value="COMMUNICATION">Communication / Média</option>
                  </select>
                </div>
              </div>

              {/* Sélection directe du fichier (Image, Vidéo, Document) */}
              <div>
                <label className="block text-sm font-medium mb-1">📎 Joindre un fichier (Image, Vidéo MP4, PDF, DOCX, ZIP)</label>
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
                  }}
                  className="w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-slate-700 file:text-white"
                />
                {uploading && <p className="text-xs text-amber-400 mt-1">Téléversement en cours...</p>}
                {formData.fileUrl && <p className="text-xs text-emerald-400 mt-1">✓ Fichier prêt et attaché !</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description / Message</label>
                <textarea
                  rows={4}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 rounded-lg text-sm"
              >
                Publier
              </button>
            </form>
          </div>
        )}

        {/* Mur d'Annonces avec Rendu des Médias */}
        {loading ? (
          <div className="text-center py-10 text-slate-400">Chargement...</div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">
                    {post.category.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-slate-400">{new Date(post.createdAt).toLocaleDateString('fr-FR')}</span>
                </div>

                <h2 className="text-xl font-bold text-white mb-1">{post.title}</h2>
                <p className="text-xs text-amber-400 mb-4">Par : {post.author.firstName} {post.author.lastName}</p>
                <p className="text-sm text-slate-300 mb-4 whitespace-pre-line">{post.content}</p>

                {/* Affichage adaptatif de la pièce jointe (Image, Vidéo ou Document) */}
                {post.fileUrl && (
                  <div className="mt-4 pt-4 border-t border-slate-700">
                    {post.fileUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i) ? (
                      <img src={post.fileUrl} alt="Pièce jointe" className="max-h-96 rounded-lg object-cover" />
                    ) : post.fileUrl.match(/\.(mp4|webm|ogg)$/i) ? (
                      <video controls className="w-full max-h-96 rounded-lg">
                        <source src={post.fileUrl} />
                      </video>
                    ) : (
                      <a href={post.fileUrl} target="_blank" rel="noreferrer" className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1">
                        📎 Télécharger le fichier joint (PDF / Document / ZIP)
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}