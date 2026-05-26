import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Loader({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const containerRef = useRef(null);
  const percentRef = useRef(null);

  useEffect(() => {
    // Disable body scrolling while loader is active
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Play clean exit sequence
          const exitTl = gsap.timeline({
            onComplete: () => {
              // Enable body scrolling
              document.body.style.overflow = '';
              window.__loaderComplete = true;
              onComplete();
              window.dispatchEvent(new Event('loaderComplete'));
            }
          });

          // 1. Fade out the outlined helper text and percentage indicator
          exitTl.to([".loader-outline-text", ".loader-ui", ".loader-particles"], {
            opacity: 0,
            duration: 0.4,
            ease: "power2.out"
          });

          // 2. Cinematic expansion of the filled logo
          exitTl.to(".loader-svg-content", {
            scale: 1.05,
            opacity: 0,
            duration: 0.7,
            ease: "power4.inOut"
          }, "-=0.2");

          // 3. Fade out the entire container
          exitTl.to(containerRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power3.inOut"
          }, "-=0.5");
        }
      });

      // Infinite seamless horizontal scroll for front and back waves
      // Front wave scrolls left
      gsap.to("#front-wave", {
        x: -1000,
        duration: 3.5,
        ease: "none",
        repeat: -1
      });

      // Back wave scrolls right
      gsap.to("#back-wave", {
        x: 1000,
        duration: 5,
        ease: "none",
        repeat: -1
      });

      // Atmospheric slow floating particles
      gsap.fromTo(".loader-particle",
        { y: 50, opacity: 0 },
        {
          y: -150,
          opacity: "random(0.1, 0.4)",
          duration: "random(4, 7)",
          stagger: {
            each: 0.3,
            repeat: -1
          },
          ease: "power1.out"
        }
      );

      // Loading Progress Fill Timeline
      const progressObj = { value: 0 };
      tl.to(progressObj, {
        value: 100,
        duration: 1.8,
        ease: "power2.out",
        onUpdate: () => {
          const val = Math.round(progressObj.value);
          setPercent(val);

          // Translate the waves vertically from bottom to top
          // Initial wave center is at y=150.
          // y = 180 is empty (bottom of 300 height viewBox)
          // y = -180 is full (top of 300 height viewBox)
          const waveY = 180 - (progressObj.value / 100) * 360;
          gsap.set(["#front-wave", "#back-wave"], { y: waveY });

          // Ambient glow behind the text tracks the liquid level
          // moves from y: 80px (bottom) to y: -80px (top)
          const glowY = 80 - (progressObj.value / 100) * 160;
          const glowOpacity = progressObj.value > 0 ? (progressObj.value / 100) * 0.45 : 0;
          gsap.set(".loader-glow", { y: glowY, opacity: glowOpacity });

          // Progress line
          gsap.set(".loader-progress-bar-inner", { width: `${progressObj.value}%` });
        }
      });

      // Text initial fade in
      gsap.fromTo([".loader-svg-content", ".loader-ui"],
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.15 }
      );

    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full bg-[#000000] z-[99999] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.95)_100%)] pointer-events-none z-10" />
      
      {/* Atmospheric Film Grain */}
      <div className="noise-overlay opacity-[0.06] z-10" />

      {/* Floating Cinematic Dust Particles */}
      <div className="loader-particles absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="loader-particle absolute w-1 h-1 bg-white/40 rounded-full blur-[0.5px]"
            style={{
              left: `${15 + i * 7}%`,
              bottom: '10%',
            }}
          />
        ))}
      </div>

      {/* Center Logo Group */}
      <div className="relative w-full max-w-5xl px-6 flex flex-col items-center justify-center z-20">
        
        {/* Soft Red Ambient Reflection Glow behind text */}
        <div className="loader-glow absolute w-[35vw] h-[35vw] rounded-full bg-primary/25 blur-[120px] mix-blend-screen pointer-events-none opacity-0 z-0" />

        {/* Text Mask SVG */}
        <div className="loader-svg-content w-full h-auto opacity-0 z-10">
          <svg viewBox="0 0 1000 300" className="w-full h-auto drop-shadow-[0_0_35px_rgba(255,0,0,0.15)]">
            <defs>
              {/* Text Mask definition for clipping the waves */}
              <clipPath id="loader-text-clip">
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="'Oswald', sans-serif"
                  fontWeight="900"
                  letterSpacing="0.08em"
                  fontSize="135"
                >
                  FAMESROOT
                </text>
              </clipPath>
            </defs>

            {/* Outlined text (base layer in white stroke, transparent fill) */}
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="'Oswald', sans-serif"
              fontWeight="900"
              letterSpacing="0.08em"
              fontSize="135"
              fill="none"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="1.2"
              className="loader-outline-text"
            >
              FAMESROOT
            </text>

            {/* Filled text layer, clipped by letters */}
            <g clipPath="url(#loader-text-clip)">
              {/* Back Wave: darker crimson red */}
              <path
                id="back-wave"
                d="M-1000,150 C-750,185 -750,115 -500,150 C-250,185 -250,115 0,150 C250,185 250,115 500,150 C750,185 750,115 1000,150 C1250,185 1250,115 1500,150 C1770,185 1750,115 2000,150 L2000,450 L-1000,450 Z"
                fill="rgba(168, 8, 8, 0.5)"
              />

              {/* Front Wave: rich primary deep red */}
              <path
                id="front-wave"
                d="M-1000,150 C-750,115 -750,185 -500,150 C-250,115 -250,185 0,150 C250,115 250,185 500,150 C750,115 750,185 1000,150 C1250,115 1250,185 1500,150 C1750,115 1750,185 2000,150 L2000,450 L-1000,450 Z"
                fill="#d90429"
              />
            </g>
          </svg>
        </div>

        {/* Loading UI indicators */}
        <div className="loader-ui flex flex-col items-center mt-12 opacity-0 z-10">
          {/* Percentage */}
          <span 
            ref={percentRef}
            className="text-white text-base md:text-lg font-montserrat tracking-[0.2em] font-semibold mb-2 tabular-nums"
          >
            {String(percent).padStart(2, '0')}%
          </span>

          {/* Thin Progress bar */}
          <div className="w-24 h-[1px] bg-white/10 relative overflow-hidden rounded-full mb-4">
            <div className="loader-progress-bar-inner absolute top-0 left-0 h-full w-0 bg-primary" />
          </div>

          {/* Loading status */}
          <span className="text-[10px] text-white/40 tracking-[0.4em] font-bold uppercase select-none">
            LOADING
          </span>
        </div>
      </div>
    </div>
  );
}
