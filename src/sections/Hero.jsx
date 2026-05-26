import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'motion/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Typewriter from '../components/Typewriter';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);

  // Scroll-linked parallax fade-out
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.8], [0, -100]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);

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

    // GSAP animations
    const ctx = gsap.context(() => {
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

      // Reveal headline words
      gsap.fromTo(".hero-title-word",
        { y: "110%", rotate: 2 },
        {
          y: "0%",
          rotate: 0,
          duration: 1.4,
          ease: "power4.out",
          stagger: 0.15,
          delay: 0.2
        }
      );

      // Reveal subheadline / badge
      gsap.fromTo(".hero-badge",
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.1 }
      );

      // Reveal CTAs
      gsap.fromTo(".hero-ctas",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power4.out", delay: 0.6 }
      );

      // Parallax scroll on glowing fog layers
      gsap.to(".fog-layer", {
        y: (i) => i ? -80 : 80,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Stats counting animation
      gsap.utils.toArray('.stat-number').forEach((el, index) => {
        const target = parseFloat(el.getAttribute('data-target'));
        gsap.fromTo(el,
          { innerHTML: 0 },
          {
            innerHTML: target,
            duration: 2.5 + (index * 0.5),
            ease: "power4.out",
            snap: { innerHTML: 1 },
            scrollTrigger: {
              trigger: el,
              start: "top 95%",
            }
          }
        );
      });
    }, heroRef);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, [mouseX, mouseY]);

  return (
    <section ref={heroRef} className="relative min-h-screen w-full flex items-center overflow-hidden bg-[#030303] pt-20">

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

      {/* 4. Cinematic Vignette & Noise Overlay */}
      <div className="cinematic-vignette" />
      <div className="noise-overlay" />

      {/* Floating Decorative Crosses */}
      <div className="absolute top-[15%] right-[10%] floating-cross pointer-events-none z-20">
        <svg className="w-5 h-5 text-primary/10" viewBox="0 0 16 16" fill="currentColor"><rect x="7" y="0" width="2" height="16" /><rect x="0" y="7" width="16" height="2" /></svg>
      </div>
      <div className="absolute bottom-[25%] left-[8%] floating-cross pointer-events-none z-20">
        <svg className="w-3 h-3 text-white/8" viewBox="0 0 16 16" fill="currentColor"><rect x="7" y="0" width="2" height="16" /><rect x="0" y="7" width="16" height="2" /></svg>
      </div>

      {/* 5. Main Content Composition */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
        className="container relative z-30 mx-auto px-6 md:px-12 max-w-7xl h-full flex flex-col lg:flex-row items-center justify-between pointer-events-none pt-32 lg:pt-0"
      >
        {/* Left-Aligned Layout */}
        <motion.div
          style={{ x: textX, y: textY }}
          className="max-w-3xl flex flex-col pointer-events-auto w-full lg:w-auto"
        >

          {/* Subheading */}
          <div className="overflow-hidden mb-10">
            <div className="hero-badge">
              <span className="inline-flex items-center gap-3 py-1 px-3 glass rounded-full text-[10px] md:text-xs font-semibold tracking-[0.3em] text-gray-300 uppercase shadow-[0_0_20px_rgba(255,0,0,0.1)] border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(255,0,0,0.8)]" />
                India's #1 Performance-First Agency
              </span>
            </div>
          </div>

          {/* Cinematic Masked Headline */}
          <div className="mb-12 flex flex-col gap-1">
            <div className="overflow-hidden pb-1">
              <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] xl:text-[8.5rem] font-black uppercase leading-[0.85] tracking-[-0.05em] text-white mix-blend-plus-lighter translate-y-[110%] hero-title-word">
                Where Brands
              </h1>
            </div>
            <div className="overflow-hidden pt-1">
              <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] xl:text-[8.5rem] font-black uppercase leading-[0.85] tracking-[-0.05em] text-white mix-blend-plus-lighter translate-y-[110%] hero-title-word flex flex-wrap items-center">
                Become&nbsp;
                <Typewriter
                  words={["Culture.", "Viral.", "Iconic.", "Legendary."]}
                  textClassName="text-transparent bg-clip-text bg-gradient-to-r from-primary via-red-500 to-red-800 drop-shadow-[0_0_40px_rgba(255,0,0,0.3)]"
                  cursorClassName="bg-primary"
                />
              </h1>
            </div>
          </div>

          {/* Premium CTAs */}
          <div className="hero-ctas flex flex-col sm:flex-row gap-6 items-start mb-8 lg:mb-0">
            <a href="#contact" className="inline-block relative group overflow-hidden px-8 py-4 md:px-10 md:py-5 bg-white text-black font-bold uppercase tracking-[0.2em] text-[11px] md:text-xs rounded-sm transition-all duration-700 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] pointer-events-auto">
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">Start a Campaign</span>
              <div className="absolute inset-0 h-full w-full bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-0"></div>
            </a>
            <a href="#work" className="inline-block relative group overflow-hidden px-8 py-4 md:px-10 md:py-5 glass text-white font-bold uppercase tracking-[0.2em] text-[11px] md:text-xs rounded-sm transition-all duration-700 hover:bg-white/5 border border-white/10 hover:border-white/30 pointer-events-auto">
              <span className="relative z-10 flex items-center gap-4">
                See Our Work
                <svg className="w-3 h-3 group-hover:translate-x-1.5 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </a>
          </div>

        </motion.div>

        {/* Cinematic Statistics (Right Side Desktop, Bottom Inline Mobile) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
          className="w-full lg:w-auto mt-auto lg:mt-0 py-8 lg:py-0 border-t border-white/10 lg:border-t-0 lg:border-l lg:border-white/10 lg:pl-16 flex flex-row lg:flex-col items-center lg:items-start justify-between lg:justify-center gap-2 lg:gap-12 pointer-events-auto relative shrink-0"
        >
          {/* Subtle glow behind stats */}
          <div className="absolute inset-0 bg-gradient-to-l from-primary/5 to-transparent blur-2xl pointer-events-none" />

          {/* Stat 1 */}
          <div className="flex flex-col items-center lg:items-start group w-1/3 lg:w-auto">
            <h3 className="text-2xl sm:text-4xl lg:text-6xl font-black font-montserrat text-white flex items-center gap-1 drop-shadow-md">
              <span className="stat-number text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400" data-target="9">0</span>
              <span className="text-primary text-xl sm:text-3xl lg:text-5xl">+</span>
            </h3>
            <p className="text-[9px] sm:text-[11px] lg:text-sm text-gray-400 uppercase tracking-[0.1em] lg:tracking-[0.2em] mt-2 font-medium group-hover:text-gray-200 transition-colors text-center lg:text-left">
              Years in<br className="hidden lg:block" /> Industry
            </p>
          </div>

          <div className="w-px h-10 lg:h-px lg:w-20 bg-gradient-to-b lg:bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Stat 2 */}
          <div className="flex flex-col items-center lg:items-start group w-1/3 lg:w-auto">
            <h3 className="text-2xl sm:text-4xl lg:text-6xl font-black font-montserrat text-white flex items-center gap-1 drop-shadow-md">
              <span className="stat-number text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400" data-target="1">0</span>
              <span className="text-primary text-xl sm:text-3xl lg:text-5xl">K+</span>
            </h3>
            <p className="text-[9px] sm:text-[11px] lg:text-sm text-gray-400 uppercase tracking-[0.1em] lg:tracking-[0.2em] mt-2 font-medium group-hover:text-gray-200 transition-colors text-center lg:text-left">
              Verified<br className="hidden lg:block" /> Creators
            </p>
          </div>

          <div className="w-px h-10 lg:h-px lg:w-20 bg-gradient-to-b lg:bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Stat 3 */}
          <div className="flex flex-col items-center lg:items-start group w-1/3 lg:w-auto">
            <h3 className="text-2xl sm:text-4xl lg:text-6xl font-black font-montserrat text-white flex items-center gap-1 drop-shadow-md">
              <span className="stat-number text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400" data-target="106">0</span>
              <span className="text-primary text-xl sm:text-3xl lg:text-5xl">M+</span>
            </h3>
            <p className="text-[9px] sm:text-[11px] lg:text-sm text-gray-400 uppercase tracking-[0.1em] lg:tracking-[0.2em] mt-2 font-medium group-hover:text-gray-200 transition-colors text-center lg:text-left">
              Campaign<br className="hidden lg:block" /> Views
            </p>
          </div>

        </motion.div>

      </motion.div>

    </section>
  );
}