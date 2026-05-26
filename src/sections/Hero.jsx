import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef(null);

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for mouse
  const springConfig = { damping: 50, stiffness: 200, mass: 1 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Parallax transforms based on mouse
  const textX = useTransform(smoothMouseX, [-1, 1], [-15, 15]);
  const textY = useTransform(smoothMouseY, [-1, 1], [-15, 15]);

  const sphereX = useTransform(smoothMouseX, [-1, 1], [60, -60]);
  const sphereY = useTransform(smoothMouseY, [-1, 1], [60, -60]);

  const glowX = useTransform(smoothMouseX, [-1, 1], [150, -150]);
  const glowY = useTransform(smoothMouseY, [-1, 1], [150, -150]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      // Normalize to -1 to 1
      mouseX.set((clientX / innerWidth) * 2 - 1);
      mouseY.set((clientY / innerHeight) * 2 - 1);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // GSAP continuous ambient motion
    const ctx = gsap.context(() => {
      // Ultra-slow, luxurious floating for the main sphere container
      gsap.to(".sphere-container", {
        y: "-=40",
        x: "+=20",
        rotation: 8,
        scale: 1.05,
        duration: 12,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });

      // Subtle pulse for the ambient glow behind the sphere
      gsap.to(".sphere-glow", {
        opacity: 0.8,
        scale: 1.2,
        duration: 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });

      // Atmospheric fog movement
      gsap.to(".fog-layer", {
        scale: "random(1, 1.2)",
        x: "random(-40, 40)",
        y: "random(-40, 40)",
        duration: "random(10, 15)",
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 3
      });

      // Particles floating
      gsap.to(".particle", {
        y: "random(-100, 100)",
        x: "random(-100, 100)",
        opacity: "random(0.2, 0.8)",
        duration: "random(10, 20)",
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.5,
          from: "random"
        }
      });
    }, heroRef);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, [mouseX, mouseY]);

  return (
    <section ref={heroRef} className="relative min-h-screen w-full flex items-center overflow-hidden bg-[#030303]">
      
      {/* 1. Base Atmospheric Layers */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-primary/10 to-transparent opacity-30" />
      </div>

      {/* 2. Mouse Reactive Glows (Fog) */}
      <motion.div 
        className="absolute inset-0 z-10 opacity-60 mix-blend-screen pointer-events-none"
        style={{ x: glowX, y: glowY }}
      >
        <div className="fog-layer absolute top-[20%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-red-600/10 blur-[120px]" />
        <div className="fog-layer absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-primary/20 blur-[150px]" />
      </motion.div>

      {/* 3. Floating 3D Assets & Ambient Light */}
      <div className="absolute inset-0 z-20 pointer-events-none hidden md:flex items-center justify-end pr-[10vw]">
        
        {/* Background Ambient Glow Behind Object */}
        <motion.div 
          style={{ x: sphereX, y: sphereY }}
          className="absolute right-[5vw] w-[400px] h-[400px] md:w-[700px] md:h-[700px] flex items-center justify-center"
        >
          <div className="sphere-glow absolute w-full h-full rounded-full bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.4)_0%,transparent_70%)] blur-[80px] opacity-50 mix-blend-screen" />
          
          {/* Subtle Particles */}
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <div 
                key={i} 
                className="particle absolute w-1 h-1 md:w-2 md:h-2 rounded-full bg-white blur-[2px] shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.1
                }}
              />
            ))}
          </div>
        </motion.div>

        <motion.div 
          style={{ x: sphereX, y: sphereY }}
          initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 3, ease: "circOut", delay: 0.5 }}
          className="sphere-container relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[700px] lg:h-[700px]"
        >
          <img 
            src="/assets/metallic_sphere.png" 
            alt="Abstract 3D Sphere" 
            className="w-full h-full object-contain mix-blend-screen mask-radial-faded drop-shadow-[0_0_80px_rgba(255,0,0,0.6)]"
          />
        </motion.div>
      </div>

      {/* 4. Cinematic Vignette & Noise Overlay */}
      <div className="cinematic-vignette" />
      <div className="noise-overlay" />

      {/* 5. Main Content Composition */}
      <div className="container relative z-30 mx-auto px-6 md:px-12 max-w-7xl pt-20 flex flex-col justify-center h-full pointer-events-none">
        
        {/* Asymmetrical Left-Aligned Layout */}
        <motion.div 
          style={{ x: textX, y: textY }}
          className="max-w-4xl flex flex-col pointer-events-auto"
        >
          
          {/* Subheading */}
          <div className="overflow-hidden mb-10">
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-3 py-1 px-3 glass rounded-full text-[10px] md:text-xs font-semibold tracking-[0.3em] text-gray-300 uppercase shadow-[0_0_20px_rgba(255,0,0,0.1)] border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(255,0,0,0.8)]" />
                India's #1 Performance-First Agency
              </span>
            </motion.div>
          </div>

          {/* Cinematic Masked Headline */}
          <div className="mb-12 flex flex-col gap-1">
            <div className="overflow-hidden pb-1">
              <motion.h1
                initial={{ y: "110%", rotate: 2 }}
                animate={{ y: "0%", rotate: 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="text-6xl md:text-8xl lg:text-[8.5rem] font-black uppercase leading-[0.85] tracking-[-0.05em] text-white mix-blend-plus-lighter"
              >
                Where Brands
              </motion.h1>
            </div>
            <div className="overflow-hidden pt-1">
              <motion.h1
                initial={{ y: "110%", rotate: -2 }}
                animate={{ y: "0%", rotate: 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
                className="text-6xl md:text-8xl lg:text-[8.5rem] font-black uppercase leading-[0.85] tracking-[-0.05em] text-transparent bg-clip-text bg-gradient-to-r from-primary via-red-500 to-red-800 drop-shadow-[0_0_40px_rgba(255,0,0,0.3)]"
              >
                Become Culture.
              </motion.h1>
            </div>
          </div>

          {/* Data Points / Editorial Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
            className="max-w-xl pl-6 border-l-[1.5px] border-white/20 mb-14"
          >
            <p className="text-sm md:text-base text-gray-400 font-inter leading-[1.8] tracking-[0.02em]">
              <span className="text-white font-medium tracking-wide">9 Years</span> &nbsp;·&nbsp; 
              <span className="text-white font-medium tracking-wide">1,000+ Creators</span> &nbsp;·&nbsp; 
              <span className="text-white font-medium tracking-wide">100+ Brands</span> &nbsp;·&nbsp; 
              <span className="text-white font-medium tracking-wide">106M+ views</span>
              <br className="mt-3 block content-[''] h-3" />
              Zero Paid Reach. We Don't Sell Impressions. <br />
              <span className="text-white font-semibold">We Deliver Performance.</span>
            </p>
          </motion.div>

          {/* Premium CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1 }}
            className="flex flex-col sm:flex-row gap-6 items-start"
          >
            <button className="relative group overflow-hidden px-8 py-4 md:px-10 md:py-5 bg-white text-black font-bold uppercase tracking-[0.2em] text-[11px] md:text-xs rounded-sm transition-all duration-700 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">Start a Campaign</span>
              <div className="absolute inset-0 h-full w-full bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-0"></div>
            </button>
            <button className="relative group overflow-hidden px-8 py-4 md:px-10 md:py-5 glass text-white font-bold uppercase tracking-[0.2em] text-[11px] md:text-xs rounded-sm transition-all duration-700 hover:bg-white/5 border border-white/10 hover:border-white/30">
              <span className="relative z-10 flex items-center gap-4">
                See Our Work
                <svg className="w-3 h-3 group-hover:translate-x-1.5 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>
          </motion.div>

        </motion.div>
      </div>
      
    </section>
  );
}
