import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Flame, Zap, Trophy } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'CONSULTORIA ONLINE',
    subtitle: 'COMECE SUA MUDANÇA HOJE!',
    description: 'Profissional de educação física para resultados de elite.',
    image: '/images/dario1.png',
    icon: Flame,
  },
  {
    id: 2,
    title: 'PLANO TOP',
    subtitle: 'R$ 69,90',
    description: 'Planilha de treino demonstrativa + Acesso pelo app MFit Personal',
    image: '/images/img2.png',
    icon: Zap,
  },
  {
    id: 3,
    title: 'PLANO MASTER',
    subtitle: 'R$ 99,90',
    description: 'Planilha demonstrativa + 3 avaliações físicas + Acompanhamento',
    image: '/images/img3.png',
    icon: Trophy,
  },
  {
    id: 4,
    title: 'PLANO MASTER AVANÇADO',
    subtitle: 'R$ 199,90',
    description: 'Treino personalizado + 3 avaliações trimestral + Acompanhamento',
    image: '/images/img4.png',
    icon: Flame,
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = useCallback((newDirection) => {
    setDirection(newDirection);
    setCurrent((prev) => {
      const next = prev + newDirection;
      if (next < 0) return slides.length - 1;
      if (next >= slides.length) return 0;
      return next;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [paginate]);

  const slide = slides[current];
  const Icon = slide.icon;

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section id="inicio" className="relative h-screen overflow-hidden bg-brand-black">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
          }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${slide.image})`,
              backgroundPosition: slide.id === 1 ? 'center calc(30% + 100px)' : undefined
            }}
          >
            {slide.id === 1 && <div className="absolute inset-0 hero-glow pointer-events-none" />}
            <div className="absolute inset-0 hero-gradient" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-black/95 via-brand-black/70 to-brand-black/10" />
          </div>

          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="max-w-2xl"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Icon className="w-5 h-5 text-brand-red" />
                  <span className="text-brand-red font-semibold tracking-[0.3em] text-xs uppercase">
                    Dário Lopes Personal
                  </span>
                </div>
                <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-medium tracking-wide uppercase text-white mb-4 leading-tight">
                  {slide.title}
                </h1>
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light tracking-widest uppercase text-gradient mb-6">
                  {slide.subtitle}
                </h2>
                <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-lg font-light leading-relaxed">
                  {slide.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#planos"
                    className="btn-premium bg-gradient-red text-white px-8 py-4 rounded-full font-medium text-sm tracking-widest uppercase hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(217,4,41,0.3)] hover:shadow-[0_0_30px_rgba(217,4,41,0.5)] inline-flex items-center gap-2"
                  >
                    <Zap className="w-5 h-5" />
                    Conheça os Planos
                  </a>
                  <a
                    href="https://wa.me/5588921657051"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card text-white px-8 py-4 rounded-full font-medium text-sm tracking-widest uppercase hover:bg-white/10 hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
                  >
                    Fale Comigo
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > current ? 1 : -1);
              setCurrent(index);
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              index === current
                ? 'bg-brand-red w-8'
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      <button
        onClick={() => paginate(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-black to-transparent" />
    </section>
  );
}
