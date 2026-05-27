import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'motion/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { CASE_STUDIES } from '../data/data';

gsap.registerPlugin(ScrollTrigger);

const CaseCard = ({ campaign }) => {
    return (
        <div
            className="case-card opacity-0 group relative flex flex-col justify-between min-h-[500px] lg:min-h-[600px] bg-gradient-to-b from-[#0B132B] to-[#030712] backdrop-blur-2xl border border-white/[0.05] rounded-[32px] overflow-hidden cursor-pointer transition-transform duration-700 hover:-translate-y-2"
        >
            {/* Dynamic Hover Glow based on themeColor */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-screen pointer-events-none z-0"
                style={{
                    background: `radial-gradient(circle at 50% 0%, ${campaign.themeColor}, transparent 70%)`
                }}
            />

            {/* Borders Hover Effect */}
            <div className="absolute inset-0 rounded-[32px] border border-transparent group-hover:border-white/20 transition-colors duration-700 z-20 pointer-events-none" />

            {/* Top Brand Logo Area */}
            <div className="relative h-48 lg:h-56 w-full overflow-hidden z-10 border-b border-white/[0.05]">
                <div className="absolute inset-0 bg-[#000] opacity-40 z-10 group-hover:opacity-20 transition-opacity duration-700" />
                <img
                    src={campaign.brandLogo}
                    alt={campaign.brandName}
                    className="case-card-image w-full h-[120%] object-cover scale-100 group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                />

                {/* Simulated Logo overlay using Text for now (user will replace) */}
                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <h3 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-widest opacity-80 drop-shadow-2xl">
                        {campaign.brandName}
                    </h3>
                </div>
            </div>

            {/* Content Area */}
            <div className="relative z-10 p-8 lg:p-10 flex flex-col grow">

                {/* Stats & Tags Row */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                    <div className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 flex items-center gap-2 shadow-[0_0_10px_rgba(255,255,255,0.05)]">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider">{campaign.metricsHighlight}</span>
                    </div>
                    {campaign.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-xs font-medium text-gray-400 uppercase tracking-widest">
                            {tag} {tIdx < campaign.tags.length - 1 && '•'}
                        </span>
                    ))}
                </div>

                <h4 className="text-3xl lg:text-4xl font-black text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-500">
                    {campaign.title}
                </h4>

                <p className="text-gray-400 leading-[1.8] font-medium mb-10 group-hover:text-gray-300 transition-colors duration-500 grow">
                    {campaign.description}
                </p>

                {/* Bottom Metrics */}
                <div className="flex items-center gap-8 pt-6 border-t border-white/[0.05]">
                    {campaign.stats.map((stat, sIdx) => (
                        <div key={sIdx} className="flex flex-col">
                            <span className="text-3xl lg:text-4xl font-black text-white mb-1 group-hover:text-primary transition-colors duration-500">{stat.value}</span>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</span>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default function CaseStudy() {
    const containerRef = useRef(null);
    const musicRef = useRef(null);
    const spotlightX = useMotionValue(0);
    const spotlightY = useMotionValue(0);

    const handleMouseMove = (e) => {
        if (!musicRef.current) return;
        const rect = musicRef.current.getBoundingClientRect();
        spotlightX.set(e.clientX - rect.left);
        spotlightY.set(e.clientY - rect.top);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Subtitle
            gsap.fromTo(".case-subtitle",
                { y: "100%", opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: ".case-subtitle",
                        start: "top 90%",
                    }
                }
            );

            // Title
            gsap.fromTo(".case-title-word",
                { y: "110%" },
                {
                    y: "0%",
                    duration: 1.2,
                    ease: "power4.out",
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: ".case-title",
                        start: "top 85%",
                    }
                }
            );

            // Scribble Draw
            gsap.fromTo(".case-scribble path",
                { strokeDashoffset: 600 },
                {
                    strokeDashoffset: 0,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".case-title",
                        start: "top 80%",
                    }
                }
            );

            // Staggered Cards Reveal
            gsap.fromTo(".case-card",
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power4.out",
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: ".case-grid",
                        start: "top 85%",
                    }
                }
            );

            // Image Parallax scroll inside card headers
            gsap.utils.toArray('.case-card-image').forEach((img) => {
                gsap.fromTo(img,
                    { yPercent: -10 },
                    {
                        yPercent: 10,
                        ease: "none",
                        scrollTrigger: {
                            trigger: img.closest('.case-card'),
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true
                        }
                    }
                );
            });

            // Music Marketing section entrance timeline
            const musicTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".music-marketing-box",
                    start: "top 85%",
                }
            });

            musicTl.fromTo(".music-marketing-box",
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" }
            );

            musicTl.fromTo(".music-stat-card",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: "power4.out", stagger: 0.1 },
                "-=0.8"
            );

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="work" ref={containerRef} className="relative min-h-screen w-full bg-transparent py-24 lg:py-32 overflow-hidden border-t border-white/[0.03]">

            {/* Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute w-[80vw] h-[80vw] lg:w-[40vw] lg:h-[40vw] rounded-full bg-[#0A192F]/10 blur-[150px] mix-blend-screen opacity-30 -translate-y-[20%]" />
                </div>
                {/* Subtle Grid */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.8)_100%)] opacity-90" />
                {/* Floating Decorative Crosses */}
                <div className="absolute top-20 right-[15%] floating-cross">
                    <svg className="w-4 h-4 text-primary/15" viewBox="0 0 16 16" fill="currentColor"><rect x="7" y="0" width="2" height="16"/><rect x="0" y="7" width="16" height="2"/></svg>
                </div>
                <div className="absolute bottom-40 left-[6%] floating-cross">
                    <svg className="w-3 h-3 text-white/10" viewBox="0 0 16 16" fill="currentColor"><rect x="7" y="0" width="2" height="16"/><rect x="0" y="7" width="16" height="2"/></svg>
                </div>
            </div>

            <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">

                {/* Section Header */}
                <div className="flex flex-col items-center justify-center text-center mb-20 lg:mb-28">
                    <div className="overflow-hidden mb-6">
                        <span className="case-subtitle inline-flex items-center gap-2 text-primary font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase drop-shadow-[0_0_10px_rgba(212,175,55,0.3)] opacity-0">
                            <span className="w-12 h-[1px] bg-primary/80" />
                            Selected Campaigns
                            <span className="w-12 h-[1px] bg-primary/80" />
                        </span>
                    </div>

                    <div className="case-title overflow-hidden pb-4">
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-black font-montserrat uppercase leading-[1.1] tracking-tight text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                            <span className="inline-block overflow-hidden mr-3">
                                <span className="case-title-word inline-block translate-y-[110%]">Work</span>
                            </span>
                            <span className="inline-block overflow-hidden mr-3">
                                <span className="case-title-word inline-block translate-y-[110%]">That</span>
                            </span>
                            <span className="inline-block overflow-hidden mr-3">
                                <span className="case-title-word inline-block translate-y-[110%]">Moved</span>
                            </span>
                            <br />
                            <span className="text-primary scribble-underline case-scribble">
                                <span className="inline-block overflow-hidden">
                                    <span className="case-title-word inline-block translate-y-[110%]">Audiences.</span>
                                </span>
                                <svg viewBox="0 0 200 10" preserveAspectRatio="none">
                                    <path d="M0,5 Q25,0 50,5 T100,5 T150,5 T200,5" />
                                </svg>
                            </span>
                        </h2>
                    </div>
                </div>

                {/* Grid */}
                <div className="case-grid grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                    {CASE_STUDIES.map((campaign) => (
                        <CaseCard key={campaign.id} campaign={campaign} />
                    ))}
                </div>

                {/* Music Marketing Dedicated Highlight */}
                <motion.div 
                    ref={musicRef}
                    onMouseMove={handleMouseMove}
                    className="music-marketing-box opacity-0 group w-full mt-20 lg:mt-32 relative rounded-[40px] overflow-hidden bg-gradient-to-br from-[#112240]/40 to-[#060B14]/30 border border-white/[0.06] p-10 lg:p-16 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700 hover:border-primary/30 hover:bg-[#060B14]/60 hover:shadow-[0_25px_60px_-15px_rgba(212,175,55,0.25)]"
                >
                    {/* Spotlight Glow */}
                    <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[40px] pointer-events-none z-0"
                        style={{
                            background: useMotionTemplate`radial-gradient(450px circle at ${spotlightX}px ${spotlightY}px, rgba(212, 175, 55, 0.08), transparent 80%)`
                        }}
                    />

                    {/* Atmospheric Glowing Background */}
                    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[40px]">
                        <div className="absolute top-0 right-0 w-[80vw] lg:w-[40vw] h-[80vw] lg:h-[40vw] bg-[#0A192F]/20 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3 mix-blend-screen" />
                        <div className="absolute bottom-0 left-0 w-[60vw] lg:w-[30vw] h-[60vw] lg:h-[30vw] bg-[#D4AF37]/10 blur-[100px] rounded-full -translate-x-1/4 translate-y-1/4 mix-blend-screen" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.8)_100%)] opacity-80" />
                    </div>

                    {/* Content Left */}
                    <div className="relative z-10 w-full lg:w-1/2 flex flex-col gap-6">
                        <div className="inline-flex items-center gap-3">
                            {/* Dynamic jumping audio waves */}
                            <div className="flex items-end gap-[3px] h-3.5 shrink-0">
                                <span className="w-[2px] bg-primary rounded-full h-2 animate-pulse" />
                                <span className="w-[2px] bg-primary rounded-full h-3.5 animate-pulse" style={{ animationDelay: '0.2s' }} />
                                <span className="w-[2px] bg-primary rounded-full h-2.5 animate-pulse" style={{ animationDelay: '0.4s' }} />
                            </div>
                            <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase drop-shadow-[0_0_8px_rgba(255,0,0,0.5)]">
                                Featured Capability
                            </span>
                        </div>
                        
                        <h3 className="text-4xl lg:text-5xl xl:text-6xl font-black font-montserrat uppercase leading-[1.1] tracking-tight text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                            Music Marketing —<br />
                            <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary via-red-500 to-red-800">
                                A Vertical We've Built from Scratch
                            </span>
                        </h3>
                        
                        <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mt-4">
                            Creator-led song distribution across Instagram Reels and YouTube Shorts. We’ve run campaigns for <span className="text-white font-bold">‘Tere Ishk Mein’</span>, <span className="text-white font-bold">‘Usey Kehna’</span>, and <span className="text-white font-bold">‘Born Rich’</span> — turning tracks into cultural moments through authentic creator storytelling.
                        </p>
                    </div>

                    {/* Stats Right */}
                    <div className="relative z-10 w-full lg:w-5/12 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                        {[
                            { value: "6M+", label: "Song Streams" },
                            { value: "218.6K", label: "Engagements" },
                            { value: "3+", label: "Songs Launched" }
                        ].map((stat, i) => (
                            <div 
                                key={stat.label}
                                className={`music-stat-card opacity-0 relative flex flex-col gap-2 p-6 rounded-2xl bg-[#112240]/20 border border-white/[0.05] hover:border-primary/30 hover:bg-[#060B14]/60 transition-colors duration-500 z-10 overflow-hidden ${i === 2 ? 'sm:col-span-2' : ''}`}
                            >
                                <span className="text-4xl lg:text-5xl font-black text-white tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:text-primary transition-colors duration-500">
                                    {stat.value}
                                </span>
                                <span className="text-primary text-xs font-bold uppercase tracking-widest">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
