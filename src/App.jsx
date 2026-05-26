import { useEffect } from 'react'
import Lenis from 'lenis'
import Hero from './sections/Hero'

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
      <Hero />
    </main>
  )
}

export default App
