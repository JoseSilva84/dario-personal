import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Sobre from './components/Sobre'
import Planos from './components/Planos'
import Contato from './components/Contato'
import Agendamento from './components/Agendamento'
import Blog from './components/Blog'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

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
    <div className="min-h-screen bg-brand-black relative">
      <NoiseOverlay />
      <Navbar />
      <Hero />
      <Sobre />
      <Planos />
      <Agendamento />
      <Blog />
      <Contato />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default App
