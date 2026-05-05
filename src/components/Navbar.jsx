import { useState, useEffect } from 'react';
import { Menu, X, Dumbbell } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#inicio', label: 'Início' },
    { href: '#sobre', label: 'Sobre' },
    { href: '#planos', label: 'Planos' },
    { href: '#agendamento', label: 'Agendar' },
    { href: '#blog', label: 'Blog' },
    { href: '#contato', label: 'Contato' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-black/95 backdrop-blur-md border-b border-brand-red/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#inicio" className="flex items-center gap-2 group">
            <Dumbbell className="w-8 h-8 text-brand-red group-hover:text-brand-orange transition-colors" />
            <div className="flex flex-col">
              <span className="font-heading text-xl font-bold tracking-wider text-white">
                DÁRIO LOPES
              </span>
              <span className="text-xs text-brand-red tracking-[0.2em] uppercase -mt-1">
                Personal
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-brand-red transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-red transition-all group-hover:w-full" />
              </a>
            ))}
            <a
              href="#contato"
              className="bg-gradient-red text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity animate-pulse-glow"
            >
              Comece Agora
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-brand-dark border-t border-brand-red/20">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-gray-300 hover:text-brand-red transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contato"
              onClick={() => setIsOpen(false)}
              className="block bg-gradient-red text-white text-center px-6 py-3 rounded-full font-semibold"
            >
              Comece Agora
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
