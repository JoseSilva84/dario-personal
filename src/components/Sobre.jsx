import { motion } from 'framer-motion';
import { Target, Award, Users, Heart } from 'lucide-react';

const stats = [
  { icon: Target, label: 'Alunos Transformados', value: '100+' },
  { icon: Award, label: 'Anos de Experiência', value: '3+' },
  { icon: Users, label: 'Avaliações Realizadas', value: '100+' },
  { icon: Heart, label: 'Taxa de Satisfação', value: '98%' },
];

export default function Sobre() {
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
                Sou Dário Lopes, Bacharel em Educação Física pela Universidade Estácio de Sá, com formação voltada para treinamento físico, saúde e qualidade de vida, dedicado a transformar
                vidas através do treinamento personalizado e da consultoria online.
              </p>
              <p>
                Minha trajetória acadêmica inclui estudos em fisiologia do exercício, biomecânica, treinamento neuromuscular, prescrição de exercícios e prevenção musculoesquelética, sempre com foco em resultados seguros e eficientes.
              </p>
              <p>
                Minha missão é levar você ao seu máximo potencial, seja qual for seu
                objetivo: emagrecimento, hipertrofia, condicionamento físico,
                preparação para competições ou melhoria da qualidade de vida.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-red flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-lg">Certificado e Especializado</p>
                <p className="text-gray-400 text-sm">CREF ativo • 022147-G /CE</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
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
        </div>
      </div>
    </section>
  );
}
