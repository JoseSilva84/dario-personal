import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Image as ImageIcon, FileText, Trash2, LogOut, Loader2, Eye, EyeOff } from 'lucide-react';
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
  
  const [activeTab, setActiveTab] = useState('blog'); // 'blog' ou 'galeria'
  const [items, setItems] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form states - Galeria
  const [galeriaImg, setGaleriaImg] = useState(null);
  const [galeriaAlt, setGaleriaAlt] = useState('');
  const [galeriaCategoria, setGaleriaCategoria] = useState('Treinos');

  // Form states - Blog
  const [blogImg, setBlogImg] = useState(null);
  const [blogTitulo, setBlogTitulo] = useState('');
  const [blogResumo, setBlogResumo] = useState('');
  const [blogCategoria, setBlogCategoria] = useState('Treino');
  const [blogAutor, setBlogAutor] = useState('Dário Lopes');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        fetchItems(activeTab);
      }
    });
    return () => unsubscribe();
  }, [activeTab]);

  const getFirebaseErrorMsg = (code) => {
    const msgs = {
      'auth/email-already-in-use': 'Este e-mail já está cadastrado. Use o botão "Entrar".',
      'auth/invalid-email': 'E-mail inválido. Verifique o endereço digitado.',
      'auth/weak-password': 'Senha muito fraca. Use pelo menos 6 caracteres.',
      'auth/user-not-found': 'E-mail não encontrado. Verifique ou crie uma conta.',
      'auth/wrong-password': 'Senha incorreta. Tente novamente.',
      'auth/invalid-credential': 'E-mail ou senha incorretos. Verifique e tente novamente.',
      'auth/too-many-requests': 'Muitas tentativas. Aguarde alguns minutos e tente de novo.',
      'auth/network-request-failed': 'Sem conexão. Verifique sua internet.',
      'auth/operation-not-allowed': '⚠️ O login por e-mail/senha ainda não foi ativado no Firebase. Vá em: Firebase Console → Authentication → Sign-in method → Email/Senha → Ativar.',
    };
    return msgs[code] || `Erro inesperado (${code}). Tente novamente.`;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error.code, error.message);
      setLoginError(getFirebaseErrorMsg(error.code));
    }
    setLoading(false);
  };

  const handleRegister = async () => {
    if (!email || !password) {
      setLoginError('Preencha email e senha para criar a conta.');
      return;
    }
    setLoading(true);
    setLoginError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMsg('✅ Conta criada com sucesso! Você já está logado.');
    } catch (error) {
      console.error(error.code, error.message);
      setLoginError(getFirebaseErrorMsg(error.code));
    }
    setLoading(false);
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800; // Largura máxima para compressão
          let width = img.width;
          let height = img.height;
          
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Comprime para JPEG com 60% de qualidade
          const dataUrl = canvas.toDataURL('image/jpeg', 0.6);
          resolve(dataUrl);
        };
        img.onerror = error => reject(error);
      };
      reader.onerror = error => reject(error);
    });
  };

  const fetchItems = async (tab) => {
    setFetching(true);
    try {
      const q = query(collection(db, tab), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(data);
    } catch (error) {
      console.error("Erro ao buscar itens", error);
    }
    setFetching(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir?')) return;
    try {
      await deleteDoc(doc(db, activeTab, id));
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error("Erro ao excluir", error);
    }
  };

  const handleAddGaleria = async (e) => {
    e.preventDefault();
    if (!galeriaImg) return alert('Selecione uma imagem!');
    setSubmitting(true);
    try {
      const base64Image = await compressImage(galeriaImg);

      const novoItem = {
        src: base64Image,
        alt: galeriaAlt,
        categoria: galeriaCategoria,
        createdAt: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(db, 'galeria'), novoItem);
      setItems([{ id: docRef.id, ...novoItem }, ...items]);
      setGaleriaImg(null);
      setGaleriaAlt('');
      e.target.reset();
    } catch (error) {
      console.error('Erro ao adicionar foto', error);
      alert('Erro ao salvar foto.');
    }
    setSubmitting(false);
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    if (!blogImg) return alert('Selecione uma imagem para o post!');
    setSubmitting(true);
    try {
      const base64Image = await compressImage(blogImg);

      const novoItem = {
        imagem: base64Image,
        titulo: blogTitulo,
        resumo: blogResumo,
        categoria: blogCategoria,
        autor: blogAutor,
        data: new Date().toISOString(),
        createdAt: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(db, 'blog'), novoItem);
      setItems([{ id: docRef.id, ...novoItem }, ...items]);
      setBlogImg(null);
      setBlogTitulo('');
      setBlogResumo('');
      e.target.reset();
    } catch (error) {
      console.error('Erro ao adicionar post', error);
      alert('Erro ao salvar post.');
    }
    setSubmitting(false);
  };

  if (loading) return (
    <div className="fixed inset-0 z-[999] bg-brand-black/95 flex items-center justify-center">
      <Loader2 className="w-12 h-12 text-brand-red animate-spin" />
    </div>
  );

  return (
    <div className="fixed inset-0 z-[999] bg-brand-black/95 overflow-y-auto p-4 flex justify-center items-start pt-20 admin-panel">
      <div className="w-full max-w-4xl bg-brand-dark/90 border border-white/10 rounded-2xl p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>

        {!user ? (
          <div className="max-w-md mx-auto py-12">
            <h2 className="text-2xl font-bold text-white text-center mb-6">Administração</h2>
            {loginError && <p className="text-brand-red text-center mb-4 text-sm">{loginError}</p>}
            {successMsg && <p className="text-green-500 text-center mb-4 text-sm">{successMsg}</p>}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-brand-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-red outline-none" required />
              </div>
              <div>
                <label className="text-gray-400 text-sm">Senha (mín. 6 caracteres)</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    className="w-full bg-brand-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-red outline-none pr-10" 
                    required 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div className="flex gap-4 pt-2">
                <button type="submit" className="flex-1 bg-brand-red text-white font-bold py-3 rounded-lg hover:bg-brand-red/80 transition-colors">
                  Entrar
                </button>
                <button type="button" onClick={handleRegister} className="flex-1 bg-transparent border border-brand-red text-brand-red font-bold py-3 rounded-lg hover:bg-brand-red/10 transition-colors">
                  Criar minha Conta
                </button>
              </div>
              <p className="text-xs text-gray-500 text-center mt-4">
                Para o primeiro acesso, digite o e-mail e senha desejados e clique em "Criar minha Conta". 
                (Avisarei quando você criar, assim eu retiro esse botão daqui para segurança).
              </p>
            </form>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
              <h2 className="text-2xl font-bold text-white">Painel de Controle</h2>
              <button onClick={handleLogout} className="flex items-center gap-2 text-gray-400 hover:text-brand-red transition-colors">
                <LogOut className="w-5 h-5" /> Sair
              </button>
            </div>

            <div className="flex gap-4 mb-8">
              <button onClick={() => setActiveTab('blog')} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === 'blog' ? 'bg-brand-red text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
                <FileText className="w-5 h-5" /> Blog
              </button>
              <button onClick={() => setActiveTab('galeria')} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === 'galeria' ? 'bg-brand-red text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
                <ImageIcon className="w-5 h-5" /> Galeria
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Form de Adição */}
              <div className="bg-brand-black/50 p-6 rounded-xl border border-white/5">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Adicionar {activeTab === 'blog' ? 'Post' : 'Foto'}
                </h3>
                
                {activeTab === 'galeria' ? (
                  <form onSubmit={handleAddGaleria} className="space-y-4">
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Imagem</label>
                      <input type="file" accept="image/*" onChange={e => setGaleriaImg(e.target.files[0])} className="w-full text-white text-sm" required />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Texto Alternativo (Alt)</label>
                      <input type="text" value={galeriaAlt} onChange={e => setGaleriaAlt(e.target.value)} className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white focus:border-brand-red outline-none" required placeholder="Ex: Treino de perna" />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Categoria</label>
                      <select value={galeriaCategoria} onChange={e => setGaleriaCategoria(e.target.value)} className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white focus:border-brand-red outline-none">
                        <option>Treinos</option>
                        <option>Resultados</option>
                        <option>Acompanhamento</option>
                      </select>
                    </div>
                    <button type="submit" disabled={submitting} className="w-full bg-brand-red text-white font-bold py-2 rounded-lg hover:bg-brand-red/80 transition-colors flex items-center justify-center gap-2">
                      {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Salvar Foto'}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleAddBlog} className="space-y-4">
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Imagem de Capa</label>
                      <input type="file" accept="image/*" onChange={e => setBlogImg(e.target.files[0])} className="w-full text-white text-sm" required />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Título</label>
                      <input type="text" value={blogTitulo} onChange={e => setBlogTitulo(e.target.value)} className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white focus:border-brand-red outline-none" required />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Resumo</label>
                      <textarea value={blogResumo} onChange={e => setBlogResumo(e.target.value)} className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white focus:border-brand-red outline-none" rows="3" required></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-gray-400 text-sm block mb-1">Categoria</label>
                        <input type="text" value={blogCategoria} onChange={e => setBlogCategoria(e.target.value)} className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white focus:border-brand-red outline-none" required />
                      </div>
                      <div>
                        <label className="text-gray-400 text-sm block mb-1">Autor</label>
                        <input type="text" value={blogAutor} onChange={e => setBlogAutor(e.target.value)} className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white focus:border-brand-red outline-none" required />
                      </div>
                    </div>
                    <button type="submit" disabled={submitting} className="w-full bg-brand-red text-white font-bold py-2 rounded-lg hover:bg-brand-red/80 transition-colors flex items-center justify-center gap-2">
                      {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Publicar Post'}
                    </button>
                  </form>
                )}
              </div>

              {/* Lista de Itens */}
              <div className="bg-brand-black/50 p-6 rounded-xl border border-white/5 h-[500px] overflow-y-auto">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Itens Salvos ({items.length})
                </h3>
                {fetching ? (
                  <div className="flex justify-center py-8"><Loader2 className="w-8 h-8 text-brand-red animate-spin" /></div>
                ) : items.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Nenhum item encontrado.</p>
                ) : (
                  <div className="space-y-4">
                    {items.map(item => (
                      <div key={item.id} className="flex items-center gap-4 bg-brand-dark p-3 rounded-lg border border-white/5">
                        <img src={item.src || item.imagem} alt="" className="w-16 h-16 object-cover rounded-md bg-white/5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium truncate text-sm">{item.titulo || item.alt || 'Sem título'}</p>
                          <p className="text-gray-400 text-xs mt-1">{item.categoria}</p>
                        </div>
                        <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-500 hover:text-brand-red hover:bg-brand-red/10 rounded-lg transition-colors">
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
