import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HeroScrubVideo from './components/sections/HeroScrubVideo'
import About from './components/sections/About'
import Highlights from './components/sections/Highlights'
import Menu from './components/sections/Menu'
import Gallery from './components/sections/Gallery'
import Testimonials from './components/sections/Testimonials'
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
        <Highlights />
        <Menu />
        <Gallery />
        <Testimonials />
        <Reservation />
        <Location />
      </main>
      <Footer />
    </>
  )
}
