import { MessageCircle } from 'lucide-react';

const InstagramIcon = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* Instagram Button */}
      <a
        href="https://instagram.com/dariolopes_personal"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-end w-14 h-14 hover:w-[150px] bg-zinc-900/90 backdrop-blur-md border border-white/10 rounded-full transition-all duration-500 overflow-hidden relative shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(236,72,153,0.6)]"
        aria-label="Siga no Instagram"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Animated border on the idle state */}
        <span className="absolute inset-0 rounded-full border border-pink-500/30 group-hover:opacity-0 animate-[pulse_2s_ease-in-out_infinite] transition-opacity duration-500" />
        
        <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500 text-white font-medium z-10 mr-14">
          Instagram
        </span>

        <div className="absolute right-0 w-14 h-14 flex items-center justify-center z-10">
          <InstagramIcon className="w-6 h-6 text-pink-400 group-hover:text-white transition-colors duration-500 group-hover:scale-110" />
        </div>
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/5588921657051"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-end w-14 h-14 hover:w-[150px] bg-zinc-900/90 backdrop-blur-md border border-white/10 rounded-full transition-all duration-500 overflow-hidden relative shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(37,211,102,0.6)]"
        aria-label="Fale no WhatsApp"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Animated border on the idle state */}
        <span className="absolute inset-0 rounded-full border border-green-500/30 group-hover:opacity-0 animate-[pulse_2s_ease-in-out_infinite] transition-opacity duration-500" />
        
        <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500 text-white font-medium z-10 mr-14">
          WhatsApp
        </span>

        <div className="absolute right-0 w-14 h-14 flex items-center justify-center z-10">
          <MessageCircle className="w-6 h-6 text-green-400 group-hover:text-white transition-colors duration-500 group-hover:scale-110" />
        </div>
      </a>
    </div>
  );
}