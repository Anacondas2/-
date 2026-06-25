import Navbar from './components/layout/Navbar'
import HeroSection from './components/sections/HeroSection'
import LifestyleSection from './components/sections/LifestyleSection'

export default function App() {
  return (
    <div className="bg-noturno min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <LifestyleSection />
      </main>
    </div>
  )
}
