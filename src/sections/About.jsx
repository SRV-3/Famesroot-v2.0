import { useRef } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Users, Zap, ShieldCheck, Activity } from 'lucide-react';

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

  return (
    <section id="about" ref={containerRef} className="relative min-h-screen w-full bg-[#030303] py-24 md:py-32 overflow-hidden border-t border-white/[0.03]">

      {/* 1. Ultra-Subtle Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="absolute w-[80vw] h-[80vw] lg:w-[50vw] lg:h-[50vw] rounded-full bg-primary/5 blur-[120px] mix-blend-screen opacity-40 translate-x-[20%]" />
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full bg-red-900/10 blur-[150px] mix-blend-screen opacity-50" />
        <div className="cinematic-vignette opacity-80" />
        <div className="noise-overlay opacity-[0.15]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">

          {/* LEFT COLUMN - Increased Z-index and brightened text */}
          <div className="lg:col-span-5 flex flex-col relative z-50">

            <div className="mb-10">
              <div className="overflow-hidden mb-4">
                <motion.span
                  initial={{ y: "100%", opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-flex items-center gap-2 text-primary font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase drop-shadow-[0_0_10px_rgba(255,0,0,0.3)]"
                >
                  <span className="w-8 h-[1px] bg-primary/80" />
                  Creator Ecosystem
                </motion.span>
              </div>

              <div className="overflow-hidden pb-2">
                <motion.h2
                  initial={{ y: "110%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-black font-montserrat uppercase leading-[0.95] tracking-tight text-white mb-2"
                >
                  We Engineer<br />
                  <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">Influence.</span>
                </motion.h2>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              className="text-sm md:text-base text-gray-100 font-inter leading-[1.9] max-w-[90%] mb-12 font-medium"
            >
              Famesroot is a precision-engineered creator ecosystem. We discard vanity metrics and leverage deep psychographic intelligence to fuse brands directly into internet culture.
            </motion.p>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.4 } }
              }}
              className="flex flex-col gap-6"
            >
              {FEATURES.map((feature, idx) => (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 }
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative flex items-start gap-5 cursor-default bg-black/20 p-4 rounded-xl backdrop-blur-md border border-white/5"
                >
                  <div className="mt-1 w-10 h-10 rounded-full bg-white/[0.08] border border-white/[0.15] flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-500 shadow-sm">
                    {feature.icon}
                  </div>
                  <div className="flex-1 pb-2">
                    <h4 className="text-white font-bold text-sm tracking-wide mb-1.5">{feature.title}</h4>
                    <p className="text-gray-300 text-xs md:text-sm leading-relaxed max-w-[95%] font-medium">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Fan-out on Scroll Interaction */}
          <motion.div
            initial="stacked"
            whileInView="fanned"
            viewport={{ once: false, margin: "-200px" }}
            className="lg:col-span-7 relative h-[500px] lg:h-[750px] w-full mt-12 lg:mt-0 flex items-center justify-center perspective-[1000px] z-10"
          >

            <motion.div
              variants={{
                stacked: { width: "250px", height: "250px", opacity: 0.6 },
                fanned: { width: "400px", height: "400px", opacity: 1 }
              }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary/10 rounded-full blur-[80px] mix-blend-screen"
            />

            {/* Main Profile Card (Male) - Back Left Layer */}
            <motion.div
              variants={{
                stacked: { x: -10, y: -10, rotate: -4, scale: 0.95 },
                fanned: { x: typeof window !== 'undefined' && window.innerWidth >= 1024 ? -180 : -120, y: typeof window !== 'undefined' && window.innerWidth >= 1024 ? -120 : -80, rotate: -12, scale: 1 }
              }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute z-20 w-[220px] md:w-[260px] bg-gradient-to-b from-white/[0.06] to-transparent backdrop-blur-xl p-2 md:p-3 rounded-2xl border border-white/[0.08] shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
            >
              <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4">
                <img src="/assets/creator_1.png" alt="Creator Profile" className="w-full h-full object-cover grayscale-[30%] contrast-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-bold text-sm tracking-wide">Julian R.</h4>
                    <p className="text-gray-300 text-[9px] uppercase tracking-widest mt-1">Fashion / Tech</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                </div>
              </div>
              <div className="px-2 pb-2 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[8px] text-gray-400 uppercase tracking-widest font-semibold mb-0.5">Engagement</span>
                  <span className="text-white text-xs font-bold font-montserrat">9.8%</span>
                </div>
                <div className="h-6 w-px bg-white/10" />
                <div className="flex flex-col items-end">
                  <span className="text-[8px] text-gray-400 uppercase tracking-widest font-semibold mb-0.5">Reach</span>
                  <span className="text-white text-xs font-bold font-montserrat">1.2M</span>
                </div>
              </div>
            </motion.div>

            {/* Profile Card 2 (Female) - Middle Layer */}
            <motion.div
              variants={{
                stacked: { x: 5, y: 5, rotate: 2, scale: 0.95 },
                fanned: { x: typeof window !== 'undefined' && window.innerWidth >= 1024 ? 160 : 120, y: -40, rotate: 8, scale: 1 }
              }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute z-30 w-[180px] md:w-[220px] bg-gradient-to-br from-white/[0.08] to-transparent backdrop-blur-xl p-2 rounded-2xl border border-white/[0.1] shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
            >
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden">
                <img src="/assets/creator_2.png" alt="Creator Profile" className="w-full h-full object-cover grayscale-[10%] contrast-[1.15]" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-80 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4">
                  <h4 className="text-white font-bold text-sm tracking-wide">Elena M.</h4>
                  <p className="text-primary text-[9px] font-bold uppercase tracking-widest mt-1">2.4M Followers</p>
                </div>
              </div>
            </motion.div>

            {/* Performance Dashboard - Front Bottom Layer */}
            <motion.div
              variants={{
                stacked: { x: 0, y: 20, rotate: -1, scale: 0.95 },
                fanned: { x: typeof window !== 'undefined' && window.innerWidth >= 1024 ? 80 : 40, y: typeof window !== 'undefined' && window.innerWidth >= 1024 ? 140 : 100, rotate: -6, scale: 1 }
              }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute z-40 w-[260px] md:w-[320px] bg-gradient-to-b from-[#0a0a0a]/90 to-[#030303]/90 backdrop-blur-2xl p-5 md:p-6 rounded-2xl border border-white/[0.08] shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(255,0,0,0.8)]" />
                  <span className="text-[9px] uppercase tracking-[0.2em] text-gray-300 font-bold">Campaign ROI</span>
                </div>
                <span className="px-2 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold rounded-md border border-green-500/20">+342%</span>
              </div>

              <h3 className="text-4xl font-black font-montserrat text-white mb-6 tracking-tight">$4.2M <span className="text-xs font-medium text-gray-400 tracking-wide uppercase align-top ml-1">Gen</span></h3>

              <div className="flex items-end justify-between h-16 w-full border-b border-white/[0.08] pb-2 gap-1.5">
                {[30, 45, 35, 60, 50, 85, 100].map((height, i) => (
                  <div key={i} className="flex-1 bg-white/[0.05] rounded-sm relative group-hover:overflow-hidden">
                    <div
                      className={`absolute bottom-0 w-full rounded-sm transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${i === 6 ? 'bg-primary shadow-[0_0_20px_rgba(255,0,0,0.4)]' : 'bg-white/20'}`}
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-3">
                <span className="text-[8px] text-gray-400 uppercase tracking-[0.2em] font-bold">Q1</span>
                <span className="text-[8px] text-gray-400 uppercase tracking-[0.2em] font-bold">Q2</span>
                <span className="text-[8px] text-primary uppercase tracking-[0.2em] font-bold">Now</span>
              </div>
            </motion.div>

            {/* Floating Metric Badge */}
            <motion.div
              variants={{
                stacked: { x: -20, y: -10, rotate: 4, scale: 0.95 },
                fanned: { x: typeof window !== 'undefined' && window.innerWidth >= 1024 ? -140 : -100, y: 60, rotate: 4, scale: 1 }
              }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute z-50 bg-[#0a0a0a]/80 backdrop-blur-xl px-4 py-3 rounded-xl border border-white/[0.08] shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex items-center gap-3"
            >
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              </div>
              <div>
                <p className="text-[8px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-0.5">Protection</p>
                <p className="text-[10px] text-white font-bold tracking-wide">100% Authentic</p>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
