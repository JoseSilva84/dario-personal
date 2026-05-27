import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, ArrowRight, Tag, ChevronLeft, ChevronRight, Loader2, X } from 'lucide-react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

/* ─── Modal de leitura completa ─────────────────────────────────────────── */
function PostModal({ post, onClose }) {
  // Bloqueia scroll do body enquanto modal está aberto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[998] bg-black/80 backdrop-blur-sm flex items-start justify-center p-4 pt-16 overflow-y-auto"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full max-w-3xl bg-brand-dark border border-white/10 rounded-3xl overflow-hidden shadow-2xl mb-16"
        >
          {/* Imagem de capa */}
          {post.imagem && (
            <div className="h-72 relative">
              <img
                src={post.imagem}
                alt={post.titulo}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
            </div>
          )}

          {/* Conteúdo */}
          <div className="p-8">
            {/* Meta */}
            <div className="flex items-center gap-4 text-gray-400 text-sm mb-3">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.data).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{post.autor}</span>
              </div>
              <span className="text-brand-red text-xs font-semibold uppercase tracking-wider">
                {post.categoria}
              </span>
            </div>

            {/* Título */}
            <h2 className="font-heading text-3xl font-bold text-white mb-4 leading-tight">
              {post.titulo}
            </h2>

            {/* Resumo em destaque */}
            {post.resumo && (
              <p className="text-gray-300 text-base italic border-l-4 border-brand-red pl-4 mb-6 leading-relaxed">
                {post.resumo}
              </p>
            )}

            {/* Conteúdo completo */}
            {post.conteudo ? (
              <div className="text-gray-300 text-base leading-relaxed whitespace-pre-wrap">
                {post.conteudo}
              </div>
            ) : (
              <p className="text-gray-500 italic">Conteúdo não disponível.</p>
            )}
          </div>

          {/* Botão fechar fixo no canto */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-brand-red/80 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Card de post ───────────────────────────────────────────────────────── */
function PostCard({ post, onReadMore }) {
  return (
    <article className="bg-brand-dark/80 border border-white/10 rounded-3xl overflow-hidden card-glow group hover:transform hover:scale-[1.02] transition-all flex flex-col">
      {/* Imagem de capa — altura fixa */}
      <div className="h-48 bg-gradient-to-br from-brand-red/20 to-brand-black/50 relative flex-shrink-0">
        {post.imagem ? (
          <img
            src={post.imagem}
            alt={post.titulo}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Tag className="w-16 h-16 text-brand-red/30" />
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-4 text-gray-400 text-sm mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(post.data).toLocaleDateString('pt-BR')}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{post.autor}</span>
          </div>
        </div>

        <span className="inline-block text-brand-red text-xs font-semibold uppercase tracking-wider mb-2">
          {post.categoria}
        </span>

        <h3 className="font-heading text-xl font-bold text-white mb-3 group-hover:text-gradient transition-all">
          {post.titulo}
        </h3>

        <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-1">
          {post.resumo}
        </p>

        <button
          onClick={() => onReadMore(post)}
          className="inline-flex items-center gap-2 text-brand-red font-semibold text-sm hover:gap-3 transition-all cursor-pointer w-fit"
        >
          Ler mais <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
}

/* ─── Componente principal ───────────────────────────────────────────────── */
export default function Blog() {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [postsState, setPostsState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const q = query(collection(db, 'blog'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPostsState(data);
      } catch (error) {
        console.error('Erro ao carregar blog:', error);
      }
      setLoading(false);
    };
    fetchBlog();
  }, []);

  const minSwipeDistance = 50;

  const prev = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? postsState.length - 1 : prev - 1));
  }, [postsState.length]);

  const next = useCallback(() => {
    setCurrent((prev) => (prev === postsState.length - 1 ? 0 : prev + 1));
  }, [postsState.length]);

  useEffect(() => {
    if (postsState.length === 0 || selectedPost) return;
    const timer = setInterval(() => { next(); }, 5000);
    return () => clearInterval(timer);
  }, [next, postsState.length, selectedPost]);

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) next();
    if (distance < -minSwipeDistance) prev();
  };

  // Sempre 3 slots — repete posts quando há menos de 3
  const visiblePosts = postsState.length > 0
    ? [0, 1, 2].map(i => postsState[(current + i) % postsState.length])
    : [];

  return (
    <>
      <section
        id="blog"
        className="py-24 bg-gradient-dark relative overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-brand-red font-semibold tracking-widest text-sm uppercase mb-4 block">
              Últimos Artigos
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-6">
              BLOG DE{' '}
              <span className="text-gradient">EDUCAÇÃO FÍSICA</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Dicas, estratégias e conhecimentos para você alcançar seus objetivos.
            </p>
          </motion.div>

          <div className="relative">
            {loading ? (
              <div className="flex justify-center py-16">
                <Loader2 className="w-10 h-10 text-brand-red animate-spin" />
              </div>
            ) : postsState.length === 0 ? (
              <p className="text-center text-gray-500 py-16">Nenhum artigo publicado ainda.</p>
            ) : (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                  >
                    {visiblePosts.map((post, idx) => (
                      <PostCard
                        key={`${post.id}-${idx}`}
                        post={post}
                        onReadMore={setSelectedPost}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>

                {postsState.length > 3 && (
                  <>
                    <button
                      onClick={prev}
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={next}
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </>
            )}
          </div>

          {!loading && postsState.length > 0 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: Math.ceil(postsState.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index * 3 % postsState.length)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    Math.floor(current / 3) === index || (index === 0 && current < 3)
                      ? 'bg-brand-red w-8'
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a
              href="#"
              className="inline-block btn-swing bg-gradient-red text-white px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity"
            >
              Ver Todos os Artigos
            </a>
          </motion.div>
        </div>
      </section>

      {/* Modal de leitura */}
      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </>
  );
}