import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, CheckCircle } from 'lucide-react';

const horariosDisponiveis = [
  '08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'
];

const tiposServico = [
  { id: 1, nome: 'Avaliação Física', duracao: '60 min' },
  { id: 2, nome: 'Treino Personalizado', duracao: '50 min' },
  { id: 3, nome: 'Consultoria Online', duracao: '40 min' },
  { id: 4, nome: 'Plano Alimentar', duracao: '30 min' },
];

export default function Agendamento() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    tipoServico: '',
    data: '',
    horario: '',
  });
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.nome && formData.data && formData.horario && formData.tipoServico) {
      setEnviado(true);
      setTimeout(() => setEnviado(false), 3000);
      setFormData({ nome: '', email: '', telefone: '', tipoServico: '', data: '', horario: '' });
    }
  };

  return (
    <section id="agendamento" className="py-24 bg-brand-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-3xl" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-brand-red font-semibold tracking-widest text-sm uppercase mb-4 block">
            Agende sua sessão
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-6">
            FALE CONOSCO{' '}
            <span className="text-gradient">PELO WHATSAPP</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Escolha o melhor horário para você e aguarde nossa confirmação via WhatsApp.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-brand-dark/80 border border-brand-red/20 rounded-3xl p-8 md:p-12"
        >
          {enviado ? (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-brand-red mx-auto mb-4" />
              <h3 className="font-heading text-2xl font-bold text-white mb-2">Agendamento Solicitado!</h3>
              <p className="text-gray-400">Entraremos em contato via WhatsApp em breve.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="text-white font-medium mb-2 block">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    className="w-full bg-brand-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-brand-red focus:outline-none"
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-white font-medium mb-2 block">E-mail</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-brand-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-brand-red focus:outline-none"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label className="text-white font-medium mb-2 block">Telefone</label>
                <input
                  type="tel"
                  value={formData.telefone}
                  onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                  className="w-full bg-brand-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-brand-red focus:outline-none"
                  placeholder="(88) 9XXXX-XXXX"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-white font-medium mb-2 block">Tipo de Serviço</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {tiposServico.map((tipo) => (
                    <button
                      key={tipo.id}
                      type="button"
                      onClick={() => setFormData({...formData, tipoServico: tipo.nome})}
                      className={`p-3 rounded-xl border text-sm transition-all ${
                        formData.tipoServico === tipo.nome
                          ? 'bg-brand-red/20 border-brand-red text-white'
                          : 'bg-brand-black/50 border-white/10 text-gray-400 hover:border-brand-red/50'
                      }`}
                    >
                      <div className="font-semibold cursor-pointer">{tipo.nome}</div>
                      <div className="text-xs opacity-70 cursor-pointer">{tipo.duracao}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-white font-medium mb-2 block">Data</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={formData.data}
                    onChange={(e) => setFormData({...formData, data: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-brand-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-brand-red focus:outline-none [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-white font-medium mb-2 block">Horário</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={formData.horario}
                    onChange={(e) => setFormData({...formData, horario: e.target.value})}
                    className="w-full bg-brand-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-brand-red focus:outline-none appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Selecione um horário</option>
                    {horariosDisponiveis.map((horario) => (
                      <option key={horario} value={horario}>{horario}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-red text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity animate-pulse-glow cursor-pointer"
                >
                  Agendar Consulta
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}