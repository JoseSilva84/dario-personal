import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const depoimentos = [
  {
    id: 1,
    nome: 'João Silva',
    resultado: '-15kg em 3 meses',
    texto: 'A metodologia do Dário transformou completamente minha vida. Em 3 meses perdi 15kg e recuperei minha confiança!',
    videoUrl: '',
    foto: '/images/testimonial1.jpg',
  },
  {
    id: 2,
    nome: 'Maria Santos',
    resultado: '+8kg de massa magra',
    texto: 'Os treinos personalizados e o acompanhamento constante me fizeram ganhar 8kg de massa magra em 4 meses.',
    videoUrl: '',
    foto: '/images/testimonial2.jpg',
  },
  {
    id: 3,
    nome: 'Carlos Oliveira',
    resultado: 'Redução de 12%',
    texto: 'Reduzi 12% de gordura corporal em 2 meses! O suporte 24/7 foi essencial para manter a consistência.',
    videoUrl: '',
    foto: '/images/testimonial3.jpg',
  },
  {
    id: 4,
    nome: 'Ana Paula',
    resultado: '-10kg em 2 meses',
    texto: 'Os treinos personalizados e o acompanhamento constante me fizeram ganhar 8kg de massa magra em 4 meses.',
    videoUrl: '',
    foto: '/images/testimonial4.jpg',
  },
  {
    id: 5,
    nome: 'Pedro Almeida',
    resultado: '+5kg de massa magra',
    texto: 'Reduzi 12% de gordura corporal em 2 meses! O suporte 24/7 foi essencial para manter a consistência.',
    videoUrl: '',
    foto: '/images/testimonial5.jpg',
  },
];

export default function Depoimentos() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? depoimentos.length - 1 : prev - 1));
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev === depoimentos.length - 1 ? 0 : prev + 1));
  }, []);

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
    <section id="depoimentos" className="py-16 bg-brand-black relative overflow-hidden">
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

        <div className="relative">
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
              className="grid md:grid-cols-3 gap-8"
            >
              {[0, 1, 2].map((offset) => {
                const index = (current + offset) % depoimentos.length;
                const depoimento = depoimentos[index];
                return (
                  <motion.div
                    key={depoimento.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: offset * 0.1, duration: 0.6 }}
                    className="glass-card rounded-3xl p-8 relative overflow-hidden"
                  >
                    <Quote className="w-10 h-10 text-brand-red/20 absolute -top-2 -right-2" />
                    
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-brand-red/30">
                        <img
                          src={depoimento.foto}
                          alt={depoimento.nome}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-heading text-lg font-bold text-white">
                          {depoimento.nome}
                        </h4>
                        <p className="text-brand-red text-sm font-medium">
                          {depoimento.resultado}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-300 text-base leading-relaxed mb-6">
                      "{depoimento.texto}"
                    </p>

                    {depoimento.videoUrl && (
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-800">
                        <button className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/30 transition-colors">
                          <Play className="w-12 h-12 text-white" />
                        </button>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

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
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {depoimentos.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > current ? 1 : index < current ? -1 : 0);
                setCurrent(index);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === current ? 'bg-brand-red w-8' : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}