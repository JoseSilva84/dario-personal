import { motion, AnimatePresence } from 'framer-motion';
import { Target, Award, Users, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';

const images = [
  '/images/foto1.png',
  '/images/foto2.png',
  '/images/foto3.png',
];

const stats = [
  { icon: Target, label: 'Alunos Transformados', value: '100+' },
  { icon: Award, label: 'Anos de Experiência', value: '3+' },
  { icon: Users, label: 'Avaliações Realizadas', value: '100+' },
  { icon: Heart, label: 'Taxa de Satisfação', value: '98%' },
];

export default function Sobre() {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentStatPair, setCurrentStatPair] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatPair((prev) => (prev + 1) % 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const statPairs = [
    [stats[0], stats[1]],
    [stats[2], stats[3]],
  ];

  return (
    <section id="sobre" className="py-16 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand-red font-semibold tracking-[0.3em] text-xs uppercase mb-4 block">
              Sobre Mim
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-light text-white mb-6 leading-tight tracking-wide uppercase">
              RESULTADOS DE{' '}
              <span className="text-gradient font-medium">ELITE</span>
            </h2>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>
                Sou Dário Lopes, personal trainer em Juazeiro do Norte, Ceará, Bacharel em Educação Física pela Universidade Estácio de Sá, com formação voltada para treinamento físico, saúde e qualidade de vida. Atendo com consultoria presencial em academia e acompanhamento online.
              </p>
              <p>
                Minha trajetória acadêmica inclui estudos em fisiologia do exercício, biomecânica, treinamento neuromuscular, prescrição de exercícios e prevenção musculoesquelética, sempre com foco em resultados seguros e eficientes.
              </p>
              <p>
                Minha missão é levar você ao seu máximo potencial, seja qual for seu
                objetivo: emagrecimento, hipertrofia, condicionamento físico,
                preparação para competições ou melhoria da qualidade de vida, com treinos ajustados à sua rotina.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-red flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-lg">Licença de Atividade</p>
                <p className="text-gray-400 text-sm">CREF ativo • 022147-G /CE</p>
              </div>
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[520px] rounded-2xl overflow-hidden bg-black/20 flex items-center justify-center"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImage}
                  src={images[currentImage]}
                  alt={`Dário Lopes personal trainer em Juazeiro do Norte - foto ${currentImage + 1}`}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                  className="max-w-[130%] max-h-[130%] object-contain"
                />
              </AnimatePresence>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImage ? 'bg-white w-6' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStatPair}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-2 gap-4"
              >
                {statPairs[currentStatPair].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass-card rounded-2xl p-6 text-center"
                    >
                      <Icon className="w-8 h-8 text-brand-red mx-auto mb-3" />
                      <p className="font-heading text-3xl font-bold text-gradient mb-1">
                        {stat.value}
                      </p>
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
