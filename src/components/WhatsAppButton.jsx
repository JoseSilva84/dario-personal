import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <>
      <a
        href="https://wa.me/5588921657051"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 group"
        style={{
          boxShadow: '0 0 20px rgba(37, 211, 102, 0.5)',
        }}
        aria-label="Fale no WhatsApp"
      >
        <MessageCircle className="w-8 h-8 text-white transition-transform group-hover:rotate-12" />
        <span className="absolute inset-0 rounded-full border-2 border-green-400/50 animate-pulse" />
      </a>

      <a
        href="https://instagram.com/dariolopes_personal"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 group"
        style={{
          boxShadow: '0 0 20px rgba(236, 72, 153, 0.5)',
        }}
        aria-label="Siga no Instagram"
      >
        <svg className="w-7 h-7 text-white transition-transform group-hover:rotate-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.3 2.4.5.6.2 1 .5 1.5 1 .5.5.8.9 1 1.5.2.5.4 1.2.5 2.4.1 1.2.1 1.6.1 2.4.1 1.2.1 4.9.1 4.9 0 0 4.9-.1 4.9-.1 0-3.2 0-3.6-.1-4.9-.1-1.2-.3-1.9-.5-2.4-.2-.6-.5-1-1-1.5-.5-.5-.9-.8-1.5-1-.5-.2-1.2-.4-2.4-.5-1.2-.1-1.6-.1-2.4-.1-1.2-.1-4.9 0-4.9.1 0 3.2 0 3.6.1 4.9.1 1.2.3 1.9.5 2.4.2.6.5 1 1 1.5.5.5.9.8 1.5 1 .5.2 1.2.4 2.4.5 1.2.1 1.6.1 2.4.1 1.2.1 1.2.1v4.9.1 0 3.6-.1 4.9-.1 1.2-.1 1.9-.3 2.4-.5.6-.2 1-.5 1.5-1 .5-.5.8-.9 1-1.5.2-.5.4-1.2.5-2.4.1-1.2.1-1.6.1-2.4.1-1.2.1-4.9.1-4.9 0 0-4.9.1-4.9.1-4.9.1-1.2.3-1.9.5-2.4.2-.6-.5-1-1-1.5-.5-.5-.9-.8-1.5-1-.5-.2-1.2-.4-2.4-.5-1.2-.1-1.6-.1-2.4-.1-1.2-.1-4.9 0-4.9.1z"/>
          <path d="M12 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.5a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/>
        </svg>
        <span className="absolute inset-0 rounded-full border-2 border-pink-400/50 animate-pulse" />
      </a>
    </>
  );
}