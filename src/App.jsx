import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Sobre from './components/Sobre'
import Planos from './components/Planos'
import Depoimentos from './components/Depoimentos'
import Galeria from './components/Galeria'
import Agendamento from './components/Agendamento'
import Contato from './components/Contato'
import Blog from './components/Blog'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import AnimatedBackground from './components/AnimatedBackground'
import CustomCursor from './components/CustomCursor'

const NoiseOverlay = () => (
  <div 
    className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />
);

function App() {
  return (
    <div className="min-h-screen bg-brand-black relative cursor-none overflow-x-hidden">
      {/* Background animado - fixed para cobrir toda a viewport */}
      <AnimatedBackground />
      
      {/* Conteúdo principal - z-index maior que o background */}
      <div className="relative z-10">
        <NoiseOverlay />
        <CustomCursor />
        <Navbar />
        <Hero />
        <Sobre />
        <Planos />
        <Depoimentos />
        <Galeria />
        <Agendamento />
        <Blog />
        <Contato />
        <Footer />
        <WhatsAppButton />
      </div>
    </div>
  )
}

export default App
