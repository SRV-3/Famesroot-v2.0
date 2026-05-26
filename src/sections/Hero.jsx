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
      // Gentle floating for the main sphere container
      gsap.to(".sphere-container", {
        y: "-=30",
        x: "+=15",
        rotation: 4,
        duration: 5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });

      // Atmospheric fog movement
      gsap.to(".fog-layer", {
        scale: "random(1, 1.2)",
        x: "random(-40, 40)",
        y: "random(-40, 40)",
        duration: "random(8, 12)",
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 2
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

      {/* 3. Floating 3D Assets */}
      <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-end pr-[10vw]">
        <motion.div 
          style={{ x: sphereX, y: sphereY }}
          initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 2, ease: "circOut", delay: 0.5 }}
          className="sphere-container relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px]"
        >
          <img 
            src="/assets/metallic_sphere.png" 
            alt="Abstract 3D Sphere" 
            className="w-full h-full object-contain mix-blend-screen drop-shadow-[0_0_60px_rgba(255,0,0,0.4)]"
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
          <div className="overflow-hidden mb-8">
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-3 py-1.5 px-4 glass rounded-full text-xs md:text-sm font-medium tracking-[0.2em] text-gray-300 uppercase shadow-[0_0_20px_rgba(255,0,0,0.1)] border border-white/10">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                India's #1 Performance-First Agency
              </span>
            </motion.div>
          </div>

          {/* Cinematic Masked Headline */}
          <div className="mb-10 flex flex-col gap-2">
            <div className="overflow-hidden pb-2">
              <motion.h1
                initial={{ y: "110%", rotate: 2 }}
                animate={{ y: "0%", rotate: 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="text-6xl md:text-8xl lg:text-[8.5rem] font-black uppercase leading-[0.85] tracking-[-0.04em] text-white mix-blend-plus-lighter"
              >
                Where Brands
              </motion.h1>
            </div>
            <div className="overflow-hidden pt-2">
              <motion.h1
                initial={{ y: "110%", rotate: -2 }}
                animate={{ y: "0%", rotate: 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
                className="text-6xl md:text-8xl lg:text-[8.5rem] font-black uppercase leading-[0.85] tracking-[-0.04em] text-transparent bg-clip-text bg-gradient-to-r from-primary via-red-500 to-red-800 drop-shadow-[0_0_40px_rgba(255,0,0,0.3)]"
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
            className="max-w-2xl pl-6 border-l border-white/20 mb-12"
          >
            <p className="text-base md:text-lg text-gray-400 font-inter leading-relaxed tracking-wide">
              <span className="text-white font-semibold">9 Years</span> · 
              <span className="text-white font-semibold ml-2">1,000+ Creators</span> · 
              <span className="text-white font-semibold ml-2">100+ Brands</span> · 
              <span className="text-white font-semibold ml-2">106M+ views</span>
              <br className="mt-2 block content-[''] h-2" />
              Zero Paid Reach. We Don't Sell Impressions. <br />
              <span className="text-white font-medium">We Deliver Performance.</span>
            </p>
          </motion.div>

          {/* Premium CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1 }}
            className="flex flex-col sm:flex-row gap-5 items-start"
          >
            <button className="relative group overflow-hidden px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-sm transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">Start a Campaign</span>
              <div className="absolute inset-0 h-full w-full bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0"></div>
            </button>
            <button className="relative group overflow-hidden px-10 py-5 glass text-white font-bold uppercase tracking-widest text-sm rounded-sm transition-all duration-500 hover:bg-white/10">
              <span className="relative z-10 flex items-center gap-3">
                See Our Work
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
