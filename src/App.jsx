import { useEffect } from 'react'
import Lenis from 'lenis'
import Hero from './sections/Hero'
import Banner from './sections/Banner'
import About from './sections/About'
import Network from './sections/Network'
import Service from './sections/Service'
import Process from './sections/Process'
import CaseStudy from './sections/CaseStudy'
import Navbar from './components/Navbar'

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <main className="bg-background min-h-screen text-white font-inter">
      <Navbar />
      <Hero />
      <About />
      <Service />
      <Process />
      <Banner />
      <Network />
      <CaseStudy />
    </main>
  )
}

export default App
