import { motion } from 'framer-motion';
import { Phone, MessageCircle, Clock, Check } from 'lucide-react';

export default function Contato() {
  return (
    <section id="contato" className="py-24 bg-brand-black relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand-red font-semibold tracking-widest text-sm uppercase mb-4 block">
              Fale Comigo
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              COMECE SUA{' '}
              <span className="text-gradient">TRANSFORMAÇÃO</span>
              {' '}HOJE
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Não espere mais para alcançar seus objetivos. Entre em contato agora
              e descubra como posso te ajudar a conquistar o corpo e a saúde que você
              sempre desejou.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-brand-dark/80 rounded-xl border border-white/10">
                <div className="w-12 h-12 rounded-full bg-brand-red/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-brand-red" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Telefone / WhatsApp</p>
                  <p className="text-white font-semibold">(88) 992165-7051</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-brand-dark/80 rounded-xl border border-white/10">
                <div className="w-12 h-12 rounded-full bg-brand-gold/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Atendimento</p>
                  <p className="text-white font-semibold">Seg - Sex: 8h às 17h</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-red rounded-3xl blur-2xl opacity-20" />
            <div className="relative bg-gradient-to-b from-brand-dark to-brand-black border border-brand-red/30 rounded-3xl p-8 sm:p-10">
              <div className="text-center mb-8">
                <MessageCircle className="w-12 h-12 text-brand-red mx-auto mb-4" />
                <h3 className="font-heading text-2xl font-bold text-white mb-2">
                  FALE DIRETO NO WHATSAPP
                </h3>
                <p className="text-gray-400">
                  Resposta em até 2 horas em horário comercial
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-gray-300">
                  <Check className="w-5 h-5 text-brand-red flex-shrink-0" />
                  <span>Amenese Gratuita e Avaliação Visual (Opcional)</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Check className="w-5 h-5 text-brand-red flex-shrink-0" />
                  <span>Planos personalizados para seu objetivo</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Check className="w-5 h-5 text-brand-red flex-shrink-0" />
                  <span>Acompanhamento contínuo e ajustes mensais</span>
                </div>
              </div>

              <a
                href="https://wa.me/5588921657051"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-red text-white text-center py-5 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity animate-pulse-glow"
              >
                CHAMAR NO WHATSAPP
              </a>

              <p className="text-center text-gray-500 text-sm mt-4">
                Ou ligue diretamente:{' '}
                <a href="tel:+5588921657051" className="text-brand-red hover:underline">
                  (88) 992165-7051
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

