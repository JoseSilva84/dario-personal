import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const imagens = [
  {
    id: 1,
    src: '/images/galeria1.jpg',
    alt: 'Treino personalizado',
    categoria: 'Treinos',
  },
  {
    id: 2,
    src: '/images/galeria2.jpg',
    alt: 'Transformação de aluno',
    categoria: 'Resultados',
  },
  {
    id: 3,
    src: '/images/galeria3.jpg',
    alt: 'Acompanhamento online',
    categoria: 'Acompanhamento',
  },
  {
    id: 4,
    src: '/images/galeria4.jpg',
    alt: 'Treino funcional',
    categoria: 'Treinos',
  },
  {
    id: 5,
    src: '/images/galeria5.jpg',
    alt: 'Resultado antes e depois',
    categoria: 'Resultados',
  },
  {
    id: 6,
    src: '/images/galeria6.jpg',
    alt: 'Consultoria fitness',
    categoria: 'Acompanhamento',
  },
];

const categorias = ['Todos', 'Treinos', 'Resultados', 'Acompanhamento'];

export default function Galeria() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
  const [imagemAberta, setImagemAberta] = useState(null);
  const scrollRef = useRef(null);
  const pausedRef = useRef(false);
  const intervalRef = useRef(null);

  const imagensFiltradas =
    categoriaAtiva === 'Todos'
      ? imagens
      : imagens.filter((img) => img.categoria === categoriaAtiva);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 340;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const abrirImagem = (index) => setImagemAberta(index);
  const fecharImagem = () => setImagemAberta(null);

  const imagemAnterior = () => {
    setImagemAberta((prev) =>
      prev === 0 ? imagensFiltradas.length - 1 : prev - 1
    );
  };

  const proximaImagem = () => {
    setImagemAberta((prev) =>
      prev === imagensFiltradas.length - 1 ? 0 : prev + 1
    );
  };

  // Autoplay - scroll automático usando ref
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (pausedRef.current || !scrollRef.current || imagemAberta !== null) return;

      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const scrollAmount = 340;

      if (scrollLeft >= maxScroll - 10) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [imagemAberta]);

  const handleMouseEnter = () => { pausedRef.current = true; };
  const handleMouseLeave = () => { pausedRef.current = false; };

  return (
    <section
      id="galeria"
      className="py-16 relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background decorativo */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-red/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-brand-red font-semibold tracking-[0.3em] text-xs uppercase mb-4 block">
            Galeria
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-light text-white mb-6 tracking-wide uppercase">
            FOTOS &{' '}
            <span className="text-gradient font-medium">RESULTADOS</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Confira treinos, transformações e momentos dos meus alunos.
          </p>
        </motion.div>

        {/* Filtro de categorias */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaAtiva(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer border ${
                categoriaAtiva === cat
                  ? 'bg-brand-red text-white border-brand-red'
                  : 'bg-transparent text-gray-400 border-white/20 hover:border-brand-red/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Carrossel com setas */}
        <div className="relative">
          {/* Seta esquerda */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-6 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-brand-red/80 hover:border-brand-red transition-all cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Seta direita */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-6 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-brand-red/80 hover:border-brand-red transition-all cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carrossel */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth px-2 py-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <AnimatePresence mode="popLayout">
              {imagensFiltradas.map((imagem, index) => (
                <motion.div
                  key={imagem.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex-shrink-0 w-[280px] sm:w-[320px] group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
                  onClick={() => abrirImagem(index)}
                >
                  <img
                    src={imagem.src}
                    alt={imagem.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <span className="text-brand-red text-xs font-semibold tracking-wider uppercase">
                        {imagem.categoria}
                      </span>
                      <p className="text-white text-sm mt-1">{imagem.alt}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Dots indicadores */}
        <div className="flex justify-center gap-2 mt-6">
          {imagensFiltradas.map((_, index) => (
            <div
              key={index}
              className="w-1.5 h-1.5 rounded-full bg-white/30"
            />
          ))}
        </div>

        {/* Placeholder para Firebase */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-gray-500 text-sm italic">
            Em breve: mais fotos carregadas diretamente do Firebase 🔥
          </p>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {imagemAberta !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={fecharImagem}
          >
            {/* Botão fechar */}
            <button
              onClick={fecharImagem}
              className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Botão anterior */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                imagemAnterior();
              }}
              className="absolute left-4 sm:left-8 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Imagem */}
            <motion.img
              key={imagemAberta}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              src={imagensFiltradas[imagemAberta]?.src}
              alt={imagensFiltradas[imagemAberta]?.alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Botão próxima */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                proximaImagem();
              }}
              className="absolute right-4 sm:right-8 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Legenda */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
              <span className="text-brand-red text-xs font-semibold tracking-wider uppercase">
                {imagensFiltradas[imagemAberta]?.categoria}
              </span>
              <p className="text-white text-sm mt-1">
                {imagensFiltradas[imagemAberta]?.alt}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
