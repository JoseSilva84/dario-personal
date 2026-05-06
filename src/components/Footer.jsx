import { Dumbbell, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
              <Dumbbell className="w-8 h-8 text-brand-red" />
              <div className="flex flex-col">
                <span className="font-heading text-xl font-bold tracking-wider text-white">
                  DÁRIO LOPES
                </span>
                <span className="text-xs text-brand-red tracking-[0.2em] uppercase -mt-1">
                  Personal
                </span>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Profissional de Educação Física dedicado a transformar vidas
              através do treinamento personalizado e resultados de elite.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-heading text-lg font-bold text-white mb-6">
              LINKS RÁPIDOS
            </h4>
            <ul className="space-y-3 flex flex-col items-center md:items-start">
              {[
                { href: '#inicio', label: 'Início' },
                { href: '#sobre', label: 'Sobre' },
                { href: '#planos', label: 'Planos' },
                { href: '#contato', label: 'Contato' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-brand-red transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-heading text-lg font-bold text-white mb-6">
              CONTATO
            </h4>
            <ul className="space-y-4 flex flex-col items-center md:items-start">
              <li>
                <a
                  href="https://wa.me/5588921657051"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center md:justify-start gap-3 text-gray-400 hover:text-[#25D366] transition-colors"
                >
                  <img src="/icons/whatsapp.svg" alt="WhatsApp" className="w-5 h-5" />
                  (88) 92165-7051
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/dariolopes_personal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center md:justify-start gap-3 text-gray-400 hover:text-[#E4405F] transition-colors"
                >
                  <img src="/icons/instagram.svg" alt="Instagram" className="w-5 h-5" />
                  @dariolopes_personal
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} Dário Lopes Personal. Todos os direitos reservados.
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Feito com <Heart className="w-4 h-4 text-brand-red fill-brand-red" />{' '}
            por{' '}
            <a
              href="https://portfolio-oficial-seven.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-red hover:text-brand-orange transition-colors"
            >
              José Silva - Portfolio 
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
