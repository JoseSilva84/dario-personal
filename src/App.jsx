import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Sobre from './components/Sobre'
import Planos from './components/Planos'
import Contato from './components/Contato'
import Agendamento from './components/Agendamento'
import Blog from './components/Blog'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

function App() {
  return (
    <div className="min-h-screen bg-brand-black">
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
