import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Loader2, User } from 'lucide-react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

/* ─── Card de depoimento ─────────────────────────────────────────────────── */
function TestimonialCard({ depoimento }) {
  return (
    <div className="glass-card rounded-3xl p-8 relative overflow-hidden h-full flex flex-col">
      <Quote className="w-10 h-10 text-brand-red/20 absolute -top-2 -right-2" />

      {/* Avatar + nome + tema */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-brand-red/30 flex-shrink-0 bg-white/5 flex items-center justify-center">
          {depoimento.foto ? (
            <img src={depoimento.foto} alt={depoimento.nome} className="w-full h-full object-cover" />
          ) : (
            <User className="w-8 h-8 text-gray-600" />
          )}
        </div>
        <div>
          <h4 className="font-heading text-lg font-bold text-white leading-tight">
            {depoimento.nome}
          </h4>
          <p className="text-brand-red text-sm font-medium mt-0.5">
            {depoimento.tema || depoimento.resultado}
          </p>
        </div>
      </div>

      {/* Texto */}
      <p className="text-gray-300 text-base leading-relaxed flex-1">
        "{depoimento.texto}"
      </p>
    </div>
  );
}

/* ─── Componente principal ───────────────────────────────────────────────── */
export default function Depoimentos() {
  const [depoimentos, setDepoimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const pausedRef = useRef(false);
  const intervalRef = useRef(null);

  /* Carrega do Firebase */
  useEffect(() => {
    const fetch = async () => {
      try {
        const q = query(collection(db, 'depoimentos'), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        setDepoimentos(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error('Erro ao carregar depoimentos:', err);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  /* Autoplay */
  useEffect(() => {
    if (depoimentos.length === 0) return;
    intervalRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setCurrent(prev => (prev + 1) % depoimentos.length);
      }
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [depoimentos.length]);

  const prev = useCallback(() => {
    setCurrent(prev => (prev === 0 ? depoimentos.length - 1 : prev - 1));
  }, [depoimentos.length]);

  const next = useCallback(() => {
    setCurrent(prev => (prev + 1) % depoimentos.length);
  }, [depoimentos.length]);

  /* Swipe */
  const minSwipe = 50;
  const onTouchStart  = (e) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX); };
  const onTouchMove   = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd    = ()  => {
    if (!touchStart || !touchEnd) return;
    const d = touchStart - touchEnd;
    if (d > minSwipe) next();
    if (d < -minSwipe) prev();
  };

  /* 3 cards sempre visíveis (repete se necessário) */
  const visible = depoimentos.length > 0
    ? [0, 1, 2].map(i => depoimentos[(current + i) % depoimentos.length])
    : [];

  return (
    <section
      id="depoimentos"
      className="py-16 relative overflow-hidden"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-brand-red/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-brand-red font-semibold tracking-[0.3em] text-xs uppercase mb-4 block">
            Depoimentos
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-light text-white mb-6 tracking-wide uppercase">
            HISTÓRIAS DE{' '}
            <span className="text-gradient font-medium">SUCESSO</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Veja as transformações reais de quem já treinou comigo.
          </p>
        </motion.div>

        {/* Conteúdo */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-brand-red animate-spin" />
          </div>
        ) : depoimentos.length === 0 ? (
          <p className="text-center text-gray-500 py-16">Nenhum depoimento publicado ainda.</p>
        ) : (
          <>
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                  {visible.map((dep, idx) => (
                    <TestimonialCard key={`${dep.id}-${idx}`} depoimento={dep} />
                  ))}
                </motion.div>
              </AnimatePresence>

              {depoimentos.length > 3 && (
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
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {depoimentos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    i === current ? 'bg-brand-red w-8' : 'bg-white/40 w-2 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
