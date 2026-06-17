import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HeroScrubVideo from './components/sections/HeroScrubVideo'
import About from './components/sections/About'
import Menu from './components/sections/Menu'
import Gallery from './components/sections/Gallery'
import Reservation from './components/sections/Reservation'
import Location from './components/sections/Location'
import GrainOverlay from './components/ui/GrainOverlay'

export default function App() {
  return (
    <>
      <GrainOverlay />
      <Navbar />
      <main>
        <HeroScrubVideo />
        <About />
        <Menu />
        <Gallery />
        <Reservation />
        <Location />
      </main>
      <Footer />
    </>
  )
}
