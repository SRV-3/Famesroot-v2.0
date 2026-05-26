import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import Lenis from 'lenis'
import Hero from './sections/Hero'
import Brand from './sections/Brand'
import Banner from './sections/Banner'
import About from './sections/About'
import Network from './sections/Network'
import Service from './sections/Service'
import Process from './sections/Process'
import CaseStudy from './sections/CaseStudy'
import Testimonials from './sections/Testimonials'
import Contact from './sections/Contact'
import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import Loader from './components/Loader'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })
    lenisRef.current = lenis

    if (isLoading) {
      lenis.stop()
    }

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    if (!lenisRef.current) return
    if (isLoading) {
      lenisRef.current.stop()
    } else {
      lenisRef.current.start()
    }
  }, [isLoading])

  return (
    <div className="bg-[#030303] min-h-screen text-white font-inter selection:bg-primary/30 selection:text-white">
      {/* Loader */}
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      {/* Custom Mouse Cursor */}
      <CustomCursor />

      {/* Scroll Progress Bar */}
      {!isLoading && <motion.div className="scroll-progress" style={{ scaleX }} />}

      <Navbar isLoading={isLoading} />
      <main>
        <Hero />
        <Brand />
        <About />
        <Service />
        <Process />
        <Banner />
        <Network />
        <CaseStudy />
        <Testimonials />
        <Contact />
      </main>
    </div>
  )
}

export default App
