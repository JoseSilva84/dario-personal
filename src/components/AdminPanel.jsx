import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Image as ImageIcon, FileText, Trash2, LogOut, Loader2, Eye, EyeOff, MessageSquare, Upload, CheckCircle2 } from 'lucide-react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';

export default function AdminPanel({ onClose }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // 'blog' | 'galeria' | 'depoimentos'
  const [activeTab, setActiveTab] = useState('blog');
  const [items, setItems] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form - Galeria (múltiplas imagens)
  const [galeriaFiles, setGaleriaFiles] = useState([]);    // File[]
  const [galeriaAlt, setGaleriaAlt] = useState('');
  const [galeriaCategoria, setGaleriaCategoria] = useState('Treinos');
  const [galeriaProgress, setGaleriaProgress] = useState(null); // "3/5"

  // Form - Blog
  const [blogImg, setBlogImg] = useState(null);
  const [blogTitulo, setBlogTitulo] = useState('');
  const [blogResumo, setBlogResumo] = useState('');
  const [blogConteudo, setBlogConteudo] = useState('');
  const [blogCategoria, setBlogCategoria] = useState('Treino');
  const [blogAutor, setBlogAutor] = useState('Dário Lopes');

  // Form - Depoimentos
  const [depFoto, setDepFoto] = useState(null);
  const [depNome, setDepNome] = useState('');
  const [depTema, setDepTema] = useState('');
  const [depTexto, setDepTexto] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) fetchItems(activeTab);
    });
    return () => unsubscribe();
  }, [activeTab]);

  /* ── Helpers ──────────────────────────────────────────────────────── */
  const getFirebaseErrorMsg = (code) => {
    const msgs = {
      'auth/email-already-in-use': 'Este e-mail já está cadastrado. Use o botão "Entrar".',
      'auth/invalid-email': 'E-mail inválido.',
      'auth/weak-password': 'Senha muito fraca. Use pelo menos 6 caracteres.',
      'auth/user-not-found': 'E-mail não encontrado.',
      'auth/wrong-password': 'Senha incorreta.',
      'auth/invalid-credential': 'E-mail ou senha incorretos.',
      'auth/too-many-requests': 'Muitas tentativas. Aguarde e tente de novo.',
      'auth/network-request-failed': 'Sem conexão. Verifique sua internet.',
      'auth/operation-not-allowed': '⚠️ Login por e-mail/senha não ativado no Firebase.',
    };
    return msgs[code] || `Erro inesperado (${code}).`;
  };

  const compressImage = (file, maxWidth = 800, quality = 0.6) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let w = img.width, h = img.height;
          if (w > maxWidth) { h = Math.round((h * maxWidth) / w); w = maxWidth; }
          canvas.width = w; canvas.height = h;
          canvas.getContext('2d').drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });

  /* ── Auth ──────────────────────────────────────────────────────────── */
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); setLoginError('');
    try { await signInWithEmailAndPassword(auth, email, password); }
    catch (err) { setLoginError(getFirebaseErrorMsg(err.code)); }
    setLoading(false);
  };

  const handleRegister = async () => {
    if (!email || !password) { setLoginError('Preencha email e senha.'); return; }
    setLoading(true); setLoginError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMsg('✅ Conta criada! Você já está logado.');
    } catch (err) { setLoginError(getFirebaseErrorMsg(err.code)); }
    setLoading(false);
  };

  const handleLogout = () => signOut(auth);

  /* ── Firestore ─────────────────────────────────────────────────────── */
  const fetchItems = async (tab) => {
    setFetching(true);
    try {
      const q = query(collection(db, tab), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) { console.error('Erro ao buscar', err); }
    setFetching(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Excluir este item?')) return;
    try {
      await deleteDoc(doc(db, activeTab, id));
      setItems(prev => prev.filter(i => i.id !== id));
    } catch (err) { console.error('Erro ao excluir', err); }
  };

  /* ── Galeria (múltiplas) ───────────────────────────────────────────── */
  const handleAddGaleria = async (e) => {
    e.preventDefault();
    if (!galeriaFiles.length) return alert('Selecione ao menos uma imagem!');
    setSubmitting(true);
    const saved = [];
    for (let i = 0; i < galeriaFiles.length; i++) {
      setGaleriaProgress(`${i + 1}/${galeriaFiles.length}`);
      try {
        const base64 = await compressImage(galeriaFiles[i]);
        const novoItem = { src: base64, alt: galeriaAlt, categoria: galeriaCategoria, createdAt: serverTimestamp() };
        const ref = await addDoc(collection(db, 'galeria'), novoItem);
        saved.push({ id: ref.id, ...novoItem });
      } catch (err) { console.error('Erro foto', i, err); }
    }
    setItems(prev => [...saved, ...prev]);
    setGaleriaFiles([]);
    setGaleriaAlt('');
    setGaleriaProgress(null);
    e.target.reset();
    setSubmitting(false);
  };

  /* ── Blog ──────────────────────────────────────────────────────────── */
  const handleAddBlog = async (e) => {
    e.preventDefault();
    if (!blogImg) return alert('Selecione uma imagem de capa!');
    setSubmitting(true);
    try {
      const base64 = await compressImage(blogImg);
      const novoItem = {
        imagem: base64, titulo: blogTitulo, resumo: blogResumo,
        conteudo: blogConteudo, categoria: blogCategoria, autor: blogAutor,
        data: new Date().toISOString(), createdAt: serverTimestamp()
      };
      const ref = await addDoc(collection(db, 'blog'), novoItem);
      setItems(prev => [{ id: ref.id, ...novoItem }, ...prev]);
      setBlogImg(null); setBlogTitulo(''); setBlogResumo(''); setBlogConteudo('');
      e.target.reset();
    } catch (err) { console.error('Erro blog', err); alert('Erro ao salvar post.'); }
    setSubmitting(false);
  };

  /* ── Depoimentos ───────────────────────────────────────────────────── */
  const handleAddDepoimento = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let fotoBase64 = null;
      if (depFoto) fotoBase64 = await compressImage(depFoto, 400, 0.75);
      const novoItem = {
        foto: fotoBase64, nome: depNome, tema: depTema,
        texto: depTexto, createdAt: serverTimestamp()
      };
      const ref = await addDoc(collection(db, 'depoimentos'), novoItem);
      setItems(prev => [{ id: ref.id, ...novoItem }, ...prev]);
      setDepFoto(null); setDepNome(''); setDepTema(''); setDepTexto('');
      e.target.reset();
    } catch (err) { console.error('Erro depoimento', err); alert('Erro ao salvar depoimento.'); }
    setSubmitting(false);
  };

  /* ── Loading global ─────────────────────────────────────────────────── */
  if (loading) return (
    <div className="fixed inset-0 z-[999] bg-brand-black/95 flex items-center justify-center">
      <Loader2 className="w-12 h-12 text-brand-red animate-spin" />
    </div>
  );

  /* ── Helpers de render ──────────────────────────────────────────────── */
  const tabBtn = (tab, icon, label) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-colors text-sm ${activeTab === tab ? 'bg-brand-red text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
    >
      {icon} {label}
    </button>
  );

  const itemThumb = (item) => {
    const src = item.src || item.imagem || item.foto;
    return src
      ? <img src={src} alt="" className="w-14 h-14 object-cover rounded-md flex-shrink-0 bg-white/5" />
      : <div className="w-14 h-14 rounded-md flex-shrink-0 bg-white/5 flex items-center justify-center text-gray-600 text-xs">Sem foto</div>;
  };

  const itemLabel = (item) => item.titulo || item.nome || item.alt || '—';
  const itemSub   = (item) => item.categoria || item.tema || item.resultado || '';

  return (
    <div className="fixed inset-0 z-[999] bg-brand-black/95 overflow-y-auto p-4 flex justify-center items-start pt-16 admin-panel">
      <div className="w-full max-w-5xl bg-brand-dark/90 border border-white/10 rounded-2xl p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>

        {/* ── Login ── */}
        {!user ? (
          <div className="max-w-md mx-auto py-12">
            <h2 className="text-2xl font-bold text-white text-center mb-6">Administração</h2>
            {loginError && <p className="text-brand-red text-center mb-4 text-sm">{loginError}</p>}
            {successMsg && <p className="text-green-500 text-center mb-4 text-sm">{successMsg}</p>}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full bg-brand-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-red outline-none" required />
              </div>
              <div>
                <label className="text-gray-400 text-sm">Senha (mín. 6 caracteres)</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-brand-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-red outline-none pr-10" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div className="flex gap-4 pt-2">
                <button type="submit" className="flex-1 bg-brand-red text-white font-bold py-3 rounded-lg hover:bg-brand-red/80 transition-colors">Entrar</button>
                <button type="button" onClick={handleRegister}
                  className="flex-1 bg-transparent border border-brand-red text-brand-red font-bold py-3 rounded-lg hover:bg-brand-red/10 transition-colors">
                  Criar minha Conta
                </button>
              </div>
              <p className="text-xs text-gray-500 text-center mt-4">
                Para o primeiro acesso, digite o e-mail e senha desejados e clique em "Criar minha Conta".
              </p>
            </form>
          </div>

        ) : (
          /* ── Painel ── */
          <div>
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <h2 className="text-2xl font-bold text-white">Painel de Controle</h2>
              <button onClick={handleLogout} className="flex items-center gap-2 text-gray-400 hover:text-brand-red transition-colors">
                <LogOut className="w-5 h-5" /> Sair
              </button>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-3 mb-6">
              {tabBtn('blog',        <FileText className="w-4 h-4" />,       'Blog')}
              {tabBtn('galeria',     <ImageIcon className="w-4 h-4" />,      'Galeria')}
              {tabBtn('depoimentos', <MessageSquare className="w-4 h-4" />,  'Depoimentos')}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* ── Formulários ── */}
              <div className="bg-brand-black/50 p-6 rounded-xl border border-white/5">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Adicionar {activeTab === 'blog' ? 'Post' : activeTab === 'galeria' ? 'Fotos' : 'Depoimento'}
                </h3>

                {/* ── Galeria ── */}
                {activeTab === 'galeria' && (
                  <form onSubmit={handleAddGaleria} className="space-y-4">
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">
                        Imagens <span className="text-brand-red text-xs">(selecione várias de uma vez)</span>
                      </label>
                      <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-brand-red/60 transition-colors bg-brand-dark/50 relative overflow-hidden">
                        <Upload className="w-7 h-7 text-gray-500 mb-1" />
                        <span className="text-gray-400 text-sm">
                          {galeriaFiles.length > 0
                            ? `${galeriaFiles.length} imagem(ns) selecionada(s)`
                            : 'Clique ou arraste as imagens aqui'}
                        </span>
                        {galeriaFiles.length > 0 && (
                          <span className="text-brand-red text-xs mt-0.5">
                            {Array.from(galeriaFiles).map(f => f.name).join(', ').slice(0, 60)}{Array.from(galeriaFiles).map(f => f.name).join(', ').length > 60 ? '…' : ''}
                          </span>
                        )}
                        <input
                          type="file" accept="image/*" multiple className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={e => setGaleriaFiles(Array.from(e.target.files))}
                        />
                      </label>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Texto Alternativo (Alt)</label>
                      <input type="text" value={galeriaAlt} onChange={e => setGaleriaAlt(e.target.value)}
                        className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white focus:border-brand-red outline-none"
                        required placeholder="Ex: Treino de perna" />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Categoria</label>
                      <select value={galeriaCategoria} onChange={e => setGaleriaCategoria(e.target.value)}
                        className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white focus:border-brand-red outline-none">
                        <option>Treinos</option>
                        <option>Resultados</option>
                        <option>Acompanhamento</option>
                      </select>
                    </div>
                    <button type="submit" disabled={submitting}
                      className="w-full bg-brand-red text-white font-bold py-2 rounded-lg hover:bg-brand-red/80 transition-colors flex items-center justify-center gap-2">
                      {submitting
                        ? <><Loader2 className="w-5 h-5 animate-spin" /> Salvando {galeriaProgress}…</>
                        : <><Upload className="w-4 h-4" /> Salvar {galeriaFiles.length > 1 ? `${galeriaFiles.length} Fotos` : 'Foto'}</>
                      }
                    </button>
                  </form>
                )}

                {/* ── Blog ── */}
                {activeTab === 'blog' && (
                  <form onSubmit={handleAddBlog} className="space-y-4">
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Imagem de Capa</label>
                      <input type="file" accept="image/*" onChange={e => setBlogImg(e.target.files[0])} className="w-full text-white text-sm" required />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Título</label>
                      <input type="text" value={blogTitulo} onChange={e => setBlogTitulo(e.target.value)}
                        className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white focus:border-brand-red outline-none" required />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Resumo</label>
                      <textarea value={blogResumo} onChange={e => setBlogResumo(e.target.value)}
                        className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white focus:border-brand-red outline-none" rows="3" required />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Conteúdo</label>
                      <textarea value={blogConteudo} onChange={e => setBlogConteudo(e.target.value)}
                        className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white focus:border-brand-red outline-none"
                        rows="6" placeholder="Escreva o conteúdo completo do post aqui..." required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-gray-400 text-sm block mb-1">Categoria</label>
                        <input type="text" value={blogCategoria} onChange={e => setBlogCategoria(e.target.value)}
                          className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white focus:border-brand-red outline-none" required />
                      </div>
                      <div>
                        <label className="text-gray-400 text-sm block mb-1">Autor</label>
                        <input type="text" value={blogAutor} onChange={e => setBlogAutor(e.target.value)}
                          className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white focus:border-brand-red outline-none" required />
                      </div>
                    </div>
                    <button type="submit" disabled={submitting}
                      className="w-full bg-brand-red text-white font-bold py-2 rounded-lg hover:bg-brand-red/80 transition-colors flex items-center justify-center gap-2">
                      {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Publicar Post'}
                    </button>
                  </form>
                )}

                {/* ── Depoimentos ── */}
                {activeTab === 'depoimentos' && (
                  <form onSubmit={handleAddDepoimento} className="space-y-4">
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Foto da Pessoa <span className="text-xs text-gray-500">(opcional)</span></label>
                      <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-brand-red/60 transition-colors bg-brand-dark/50 relative overflow-hidden">
                        {depFoto ? (
                          <><CheckCircle2 className="w-6 h-6 text-green-400 mb-1" /><span className="text-green-400 text-sm">{depFoto.name}</span></>
                        ) : (
                          <><Upload className="w-6 h-6 text-gray-500 mb-1" /><span className="text-gray-400 text-sm">Foto do cliente</span></>
                        )}
                        <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={e => setDepFoto(e.target.files[0] || null)} />
                      </label>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Nome</label>
                      <input type="text" value={depNome} onChange={e => setDepNome(e.target.value)}
                        className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white focus:border-brand-red outline-none"
                        required placeholder="Ex: João Silva" />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Tema / Resultado</label>
                      <input type="text" value={depTema} onChange={e => setDepTema(e.target.value)}
                        className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white focus:border-brand-red outline-none"
                        required placeholder="Ex: -15kg em 3 meses" />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Depoimento</label>
                      <textarea value={depTexto} onChange={e => setDepTexto(e.target.value)}
                        className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white focus:border-brand-red outline-none"
                        rows="4" required placeholder="Texto do depoimento..." />
                    </div>
                    <button type="submit" disabled={submitting}
                      className="w-full bg-brand-red text-white font-bold py-2 rounded-lg hover:bg-brand-red/80 transition-colors flex items-center justify-center gap-2">
                      {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Salvar Depoimento'}
                    </button>
                  </form>
                )}
              </div>

              {/* ── Lista de itens ── */}
              <div className="bg-brand-black/50 p-6 rounded-xl border border-white/5 h-[520px] overflow-y-auto">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Itens Salvos ({items.length})
                </h3>
                {fetching ? (
                  <div className="flex justify-center py-8"><Loader2 className="w-8 h-8 text-brand-red animate-spin" /></div>
                ) : items.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Nenhum item encontrado.</p>
                ) : (
                  <div className="space-y-3">
                    {items.map(item => (
                      <div key={item.id} className="flex items-center gap-3 bg-brand-dark p-3 rounded-lg border border-white/5">
                        {itemThumb(item)}
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium truncate text-sm">{itemLabel(item)}</p>
                          {itemSub(item) && <p className="text-gray-400 text-xs mt-0.5 truncate">{itemSub(item)}</p>}
                        </div>
                        <button onClick={() => handleDelete(item.id)}
                          className="p-2 text-gray-500 hover:text-brand-red hover:bg-brand-red/10 rounded-lg transition-colors flex-shrink-0">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
