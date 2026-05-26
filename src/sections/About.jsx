import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ShieldCheck, Activity, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: <ShieldCheck className="w-5 h-5 text-white/90 group-hover:text-primary transition-colors duration-500" />,
    title: "Verified Network",
    desc: "Stringent 12-point authentication ensuring zero fake engagement."
  },
  {
    icon: <Activity className="w-5 h-5 text-white/90 group-hover:text-primary transition-colors duration-500" />,
    title: "Intelligence Analytics",
    desc: "Predictive AI models maximizing real-time campaign ROI."
  },
  {
    icon: <Users className="w-5 h-5 text-white/90 group-hover:text-primary transition-colors duration-500" />,
    title: "Creator Matchmaking",
    desc: "Psychographic mapping to your exact target audience."
  }
];

export default function About() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtitle reveal
      gsap.fromTo(".about-subtitle",
        { y: "100%", opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".about-subtitle",
            start: "top 90%",
          }
        }
      );

      // Title reveal
      gsap.fromTo(".about-title-word",
        { y: "110%" },
        {
          y: "0%",
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".about-title",
            start: "top 85%",
          }
        }
      );

      // Draw SVG scribble
      gsap.fromTo(".about-scribble path",
        { strokeDashoffset: 600 },
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-title",
            start: "top 80%",
          }
        }
      );

      // Description reveal
      gsap.fromTo(".about-desc",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-desc",
            start: "top 90%",
          }
        }
      );

      // Stagger features lists
      gsap.fromTo(".about-feature-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-features-list",
            start: "top 85%",
          }
        }
      );

      // Card Stack Fan Out ScrollTrigger Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom 30%",
          scrub: 1,
        }
      });

      // Card 1: Male Card
      tl.fromTo(".about-card-1",
        { x: -5, y: -5, rotate: -4, scale: 0.95 },
        {
          xPercent: -45,
          yPercent: -15,
          rotate: -12,
          scale: 1,
          ease: "power1.out"
        },
        0
      );

      // Card 2: Female Card
      tl.fromTo(".about-card-2",
        { x: 5, y: 5, rotate: 4, scale: 0.95 },
        {
          xPercent: 45,
          yPercent: 8,
          rotate: 12,
          scale: 1,
          ease: "power1.out"
        },
        0
      );

      // Badge
      tl.fromTo(".about-badge",
        { x: 0, y: 10, rotate: -2, scale: 0.95 },
        {
          xPercent: -25,
          yPercent: 35,
          rotate: -8,
          scale: 1.05,
          ease: "power1.out"
        },
        0
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="relative min-h-screen w-full bg-[#030303] py-24 md:py-32 overflow-hidden border-t border-white/[0.03]">

      {/* 1. Ultra-Subtle Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="absolute w-[80vw] h-[80vw] lg:w-[50vw] lg:h-[50vw] rounded-full bg-primary/5 blur-[120px] mix-blend-screen opacity-40 translate-x-[20%]" />
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full bg-red-900/10 blur-[150px] mix-blend-screen opacity-50" />
        <div className="cinematic-vignette opacity-80" />
        <div className="noise-overlay opacity-[0.15]" />
        {/* Floating Decorative Crosses */}
        <div className="absolute top-24 right-[18%] floating-cross">
          <svg className="w-4 h-4 text-primary/15" viewBox="0 0 16 16" fill="currentColor"><rect x="7" y="0" width="2" height="16" /><rect x="0" y="7" width="16" height="2" /></svg>
        </div>
        <div className="absolute bottom-40 left-[5%] floating-cross">
          <svg className="w-3 h-3 text-white/10" viewBox="0 0 16 16" fill="currentColor"><rect x="7" y="0" width="2" height="16" /><rect x="0" y="7" width="16" height="2" /></svg>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">

          {/* LEFT COLUMN - Increased Z-index and brightened text */}
          <div className="lg:col-span-5 flex flex-col relative z-50">

            <div className="mb-10">
              <div className="overflow-hidden mb-4">
                <span className="about-subtitle inline-flex items-center gap-2 text-primary font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase drop-shadow-[0_0_10px_rgba(255,0,0,0.3)] opacity-0">
                  <span className="w-8 h-[1px] bg-primary/80" />
                  Creator Ecosystem
                </span>
              </div>

              <div className="about-title overflow-hidden pb-2">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-montserrat uppercase leading-[0.95] tracking-tight text-white mb-2">
                  <span className="inline-block overflow-hidden mr-2">
                    <span className="about-title-word inline-block translate-y-[110%]">We</span>
                  </span>
                  <span className="inline-block overflow-hidden mr-2">
                    <span className="about-title-word inline-block translate-y-[110%]">Engineer</span>
                  </span>
                  <br />
                  <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] scribble-underline about-scribble">
                    <span className="inline-block overflow-hidden">
                      <span className="about-title-word inline-block translate-y-[110%]">Influence.</span>
                    </span>
                    <svg viewBox="0 0 200 10" preserveAspectRatio="none">
                      <path d="M0,5 Q25,0 50,5 T100,5 T150,5 T200,5" />
                    </svg>
                  </span>
                </h2>
              </div>
            </div>

            <p className="about-desc text-sm md:text-base text-gray-100 font-inter leading-[1.9] max-w-[90%] mb-12 font-medium opacity-0">
              Famesroot is a precision-engineered creator ecosystem. We discard vanity metrics and leverage deep psychographic intelligence to fuse brands directly into internet culture.
            </p>

            <div className="about-features-list flex flex-col gap-6">
              {FEATURES.map((feature, idx) => (
                <div
                  key={idx}
                  className="about-feature-item opacity-0 group relative flex items-start gap-5 cursor-default bg-black/20 p-4 rounded-xl backdrop-blur-md border border-white/5"
                >
                  <div className="mt-1 w-10 h-10 rounded-full bg-white/[0.08] border border-white/[0.15] flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-500 shadow-sm">
                    {feature.icon}
                  </div>
                  <div className="flex-1 pb-2">
                    <h4 className="text-white font-bold text-sm tracking-wide mb-1.5">{feature.title}</h4>
                    <p className="text-gray-300 text-xs md:text-sm leading-relaxed max-w-[95%] font-medium">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Fan-out on Scroll Interaction */}
          <div className="lg:col-span-7 relative h-[500px] lg:h-[750px] w-full mt-12 lg:mt-0 flex items-center justify-center perspective-[1000px] z-10">
            <div className="absolute w-[250px] height-[250px] bg-primary/10 rounded-full blur-[80px] mix-blend-screen" />

            {/* Main Profile Card (Male) - Back Left Layer */}
            <div className="about-card-1 absolute z-20 w-[220px] md:w-[260px] lg:w-[320px] bg-gradient-to-b from-white/[0.06] to-transparent backdrop-blur-xl p-2 md:p-3 lg:p-4 rounded-2xl lg:rounded-[2rem] border border-white/[0.08] shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4">
                <img src="/assets/creator_1.jpeg" alt="Creator Profile" className="w-full h-full object-cover grayscale-[30%] contrast-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                </div>
              </div>
              <div className="px-2 pb-2 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[8px] text-gray-400 uppercase tracking-widest font-semibold mb-0.5">Views</span>
                  <span className="text-white text-xs font-bold font-montserrat">106M</span>
                </div>
                <div className="h-6 w-px bg-white/10" />
                <div className="flex flex-col items-end">
                  <span className="text-[8px] text-gray-400 uppercase tracking-widest font-semibold mb-0.5">Campaign</span>
                  <span className="text-white text-xs font-bold font-montserrat">View Grab</span>
                </div>
              </div>
            </div>

            {/* Profile Card 2 (Female) - Middle Layer */}
            <div className="about-card-2 absolute z-30 w-[180px] md:w-[220px] lg:w-[280px] bg-gradient-to-br from-white/[0.08] to-transparent backdrop-blur-xl p-2 lg:p-3 rounded-2xl lg:rounded-3xl border border-white/[0.1] shadow-[0_20px_40px_rgba(0,0,0,0.7)]">
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden">
                <img src="/assets/creator_2.jpeg" alt="Creator Profile" className="w-full h-full object-cover grayscale-[10%] contrast-[1.15]" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-80 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4">
                  <h4 className="text-white font-bold text-sm tracking-wide">1000+</h4>
                  <p className="text-primary text-[9px] font-bold uppercase tracking-widest mt-1">Verified creators</p>
                </div>
              </div>
            </div>

            {/* Floating Metric Badge */}
            <div className="about-badge absolute z-50 bg-[#0a0a0a]/80 backdrop-blur-xl px-4 py-3 rounded-xl border border-white/[0.08] shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              </div>
              <div>
                <p className="text-[8px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-0.5">Protection</p>
                <p className="text-[10px] text-white font-bold tracking-wide">100% Authentic</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
