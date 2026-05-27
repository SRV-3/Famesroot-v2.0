import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { CREATORS } from '../data/data';

gsap.registerPlugin(ScrollTrigger);

export default function PastTalent() {
    const containerRef = useRef(null);
    const rightSideRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Background ambient glow movement
            gsap.to(".talent-ambient-glow", {
                x: "random(-100, 100)",
                y: "random(-100, 100)",
                duration: "random(5, 10)",
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
            });

            // Reveal Animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            });

            tl.fromTo(".talent-header-elem",
                { opacity: 0, y: 30, filter: "blur(8px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out", stagger: 0.15 }
            );

            tl.fromTo(".talent-pill",
                { opacity: 0, scale: 0.8, filter: "blur(10px)", y: 50 },
                { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 1.2, ease: "back.out(1.2)", stagger: 0.1 },
                "-=0.6"
            );

            // Desktop floating parallax effect for pills
            gsap.utils.toArray('.talent-pill').forEach((pill, i) => {
                const speed = 1 + (i * 0.2); // different speeds
                gsap.to(pill, {
                    yPercent: -30 * speed,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.5,
                    }
                });

                // Subtle continuous floating
                gsap.to(pill, {
                    y: `random(-15, 15)`,
                    x: `random(-15, 15)`,
                    rotation: `random(-3, 3)`,
                    duration: `random(3, 6)`,
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: -1,
                    delay: i * 0.2
                });
            });

            // Button magnetic effect
            const btn = document.querySelector(".talent-btn");
            if (btn) {
                btn.addEventListener("mousemove", (e) => {
                    const rect = btn.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: "power2.out" });
                });
                btn.addEventListener("mouseleave", () => {
                    gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
                });
            }

        }, containerRef);
        return () => ctx.revert();
    }, []);

    // Desktop Absolute Positions for the 5 pills
    const pillPositions = [
        { top: "10%", left: "10%" },
        { top: "45%", left: "5%" },
        { top: "25%", left: "50%" },
        { top: "70%", left: "35%" },
        { top: "50%", left: "80%" },
    ];

    return (
        <section ref={containerRef} className="relative w-full bg-[#030712] py-24 lg:py-32 overflow-hidden border-t border-white/[0.03]">
            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Midnight Blue / Gold Ambient Fog */}
                <div className="talent-ambient-glow absolute top-[-20%] left-[20%] w-[60vw] h-[60vw] lg:w-[40vw] lg:h-[40vw] bg-[#0A192F]/40 blur-[120px] rounded-full mix-blend-screen opacity-50" />
                <div className="talent-ambient-glow absolute bottom-[-10%] right-[10%] w-[50vw] h-[50vw] lg:w-[30vw] lg:h-[30vw] bg-[#D4AF37]/10 blur-[100px] rounded-full mix-blend-screen opacity-60" />

                {/* Subtle Mesh Grid */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(3,7,18,0.9)_100%)] z-10" />
                <div className="absolute inset-0 opacity-[0.03] z-10"
                    style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
                />
            </div>

            <div className="container mx-auto px-6 md:px-12 max-w-[1300px] relative z-20">
                <div className="bg-white/[0.01] backdrop-blur-3xl border border-white/[0.04] rounded-[40px] p-8 md:p-12 lg:p-20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col lg:flex-row items-center justify-between gap-16 overflow-hidden relative">

                    {/* Inner glowing vignette */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none z-0" />

                    {/* Left: Content */}
                    <div className="w-full lg:w-5/12 flex flex-col gap-6 relative z-10">
                        <div className="talent-header-elem inline-flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)] animate-pulse" />
                            <span className="text-gray-400 font-semibold tracking-[0.2em] text-[10px] md:text-xs uppercase">
                                Past Managed Talent
                            </span>
                        </div>

                        <h2 className="talent-header-elem text-4xl md:text-5xl lg:text-6xl font-black font-montserrat leading-[1.1] tracking-tight text-white drop-shadow-xl">
                            Names That Built <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 italic font-light">Internet Culture.</span>
                        </h2>

                        <p className="talent-header-elem text-gray-400 text-sm md:text-base font-light leading-relaxed max-w-md">
                            Over the years, we’ve collaborated with and managed some of India’s most recognised digital personalities — helping them scale influence, partnerships and long-term creator value.
                        </p>

                        <div className="talent-header-elem mt-6">
                            <button className="talent-btn group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-white font-semibold text-sm tracking-wide overflow-hidden transition-all duration-500 hover:bg-[#D4AF37]/20 hover:border-[#D4AF37]/60 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                                <span className="relative z-10 flex items-center gap-2">
                                    Work With Our Creators
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                            </button>
                        </div>
                    </div>

                    {/* Right: Floating Creator Ecosystem (Hidden on Mobile) */}
                    <div className="hidden lg:block w-full lg:w-7/12 relative h-[600px] z-10">
                        {/* Desktop view: Floating Cinematic Pills */}
                        <div className="absolute inset-0">
                            {CREATORS.map((creator, i) => (
                                <div
                                    key={creator.id}
                                    className="talent-pill-reveal talent-pill-desktop absolute flex items-center gap-4 p-3 pr-6 rounded-full bg-[#060B14]/40 backdrop-blur-2xl border border-white/[0.08] shadow-[0_15px_40px_rgba(0,0,0,0.4)] hover:bg-white/[0.05] hover:border-white/[0.15] hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)] transition-all duration-500 cursor-pointer group/pill"
                                    style={{
                                        top: pillPositions[i]?.top || "50%",
                                        left: pillPositions[i]?.left || "50%",
                                    }}
                                >
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/[0.05] to-transparent opacity-0 group-hover/pill:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                    
                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 shrink-0 relative z-10 group-hover/pill:border-[#D4AF37]/50 transition-colors duration-500">
                                        <img src={creator.image} alt={creator.name} className="w-full h-full object-cover group-hover/pill:scale-110 transition-transform duration-700" />
                                    </div>
                                    <div className="flex flex-col relative z-10">
                                        <div className="flex items-center gap-1.5">
                                            <h4 className="text-white font-bold text-base tracking-wide group-hover/pill:text-gray-100 transition-colors">{creator.name}</h4>
                                            {creator.verified && (
                                                <svg className="w-4 h-4 text-blue-400 drop-shadow-[0_0_5px_rgba(96,165,250,0.5)]" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z" />
                                                </svg>
                                            )}
                                        </div>
                                        <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest">{creator.followers} Followers</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
}
