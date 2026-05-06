import { motion } from 'framer-motion';
import { Check, Zap, Trophy, Crown, ArrowRight } from 'lucide-react';

const planos = [
  {
    id: 1,
    nome: 'TOP',
    preco: '69,90',
    cor: 'from-gray-700 to-gray-900',
    borda: 'border-gray-600',
    icon: Zap,
    destaque: false,
    beneficios: [
      'Planilha de treino demonstrativa',
      'Acesso pelo app MFit Personal',
      'Treinos organizados e práticos',
      'Suporte via WhatsApp',
    ],
  },
  {
    id: 2,
    nome: 'MASTER',
    preco: '99,90',
    cor: 'from-brand-red to-red-900',
    borda: 'border-brand-red',
    icon: Trophy,
    destaque: true,
    beneficios: [
      'Planilha de treino demonstrativa',
      '3 avaliações físicas',
      'Acesso pelo app MFit Personal',
      'Acompanhamento trimestral',
      'Suporte prioritário',
    ],
  },
  {
    id: 3,
    nome: 'MASTER AVANÇADO',
    preco: '199,90',
    cor: 'from-brand-orange to-brand-gold',
    borda: 'border-brand-orange',
    icon: Crown,
    destaque: false,
    beneficios: [
      'Treino personalizado demonstrativo',
      '3 avaliações físicas trimestrais',
      'Acompanhamento trimestral completo',
      'Acesso pelo app MFit Personal',
      'Consultoria nutricional básica',
      'Suporte VIP 24/7',
    ],
  },
];

export default function Planos() {
  return (
    <section id="planos" className="py-24 bg-gradient-dark relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-brand-red font-semibold tracking-[0.3em] text-xs uppercase mb-4 block">
            Escolha Seu Plano
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-light text-white mb-6 tracking-wide uppercase">
            CONHEÇA MEUS{' '}
            <span className="text-gradient font-medium">PLANOS</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Planos flexíveis para todos os níveis. Comece sua transformação hoje mesmo.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {planos.map((plano, index) => {
            const Icon = plano.icon;
            return (
              <motion.div
                key={plano.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * index, duration: 0.6 }}
                className={`relative rounded-3xl p-8 glass-card ${
                  plano.destaque
                    ? 'bg-gradient-to-b from-brand-red/10 to-transparent border-brand-red/30 scale-105 z-10 shadow-[0_0_30px_rgba(217,4,41,0.2)]'
                    : ''
                }`}
              >
                {plano.destaque && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-red text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                    Mais Popular
                  </div>
                )}

                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plano.cor} flex items-center justify-center mb-6`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="font-heading text-2xl font-bold text-white mb-2">
                  PLANO {plano.nome}
                </h3>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-gray-400 text-lg">R$</span>
                  <span className="font-heading text-5xl font-bold text-gradient">
                    {plano.preco}
                  </span>
                  <span className="text-gray-400 text-sm">/mês</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plano.beneficios.map((beneficio) => (
                    <li key={beneficio} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        plano.destaque ? 'text-brand-red' : 'text-brand-orange'
                      }`} />
                      <span className="text-gray-300 text-sm">{beneficio}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="https://wa.me/5588921657051"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-4 rounded-xl font-medium tracking-widest text-xs uppercase text-center flex items-center justify-center gap-2 transition-all duration-300 ${
                    plano.destaque
                      ? 'btn-premium bg-gradient-red text-white shadow-[0_0_20px_rgba(217,4,41,0.3)] hover:shadow-[0_0_30px_rgba(217,4,41,0.5)]'
                      : 'glass-card text-white hover:bg-white/10'
                  }`}
                >
                  SAIBA MAIS
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 text-sm mt-8"
        >
          Todos os planos incluem acompanhamento inicial e suporte via WhatsApp.
          {' '}<span className="text-brand-red">Cancelamento a qualquer momento.</span>
        </motion.p>
      </div>
    </section>
  );
}
