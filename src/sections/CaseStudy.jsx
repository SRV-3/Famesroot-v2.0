import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate, useMotionTemplate } from 'motion/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { CASE_STUDIES } from '../data/data';

gsap.registerPlugin(ScrollTrigger);

// --- Desktop 3D Card (GSAP) ---
const DesktopCaseCard = ({ campaign }) => {
    const cardRef = useRef(null);
    const spotlightX = useMotionValue(0);
    const spotlightY = useMotionValue(0);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        spotlightX.set(e.clientX - rect.left);
        spotlightY.set(e.clientY - rect.top);
    };

    return (
        <a
            href={campaign.profileUrl || '#'}
            target={campaign.profileUrl ? "_blank" : undefined}
            rel={campaign.profileUrl ? "noopener noreferrer" : undefined}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className="desktop-case-card group absolute top-1/2 left-1/2 w-[380px] h-[520px] -ml-[190px] -mt-[260px] flex flex-col justify-between bg-gradient-to-b from-[#0A192F]/95 to-[#030712]/95 backdrop-blur-3xl border border-white/[0.08] rounded-[28px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] cursor-pointer"
            style={{ transformStyle: "preserve-3d" }}
        >
            {/* Ambient Background Glow based on theme color */}
            <div
                className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 mix-blend-screen pointer-events-none z-0"
                style={{
                    background: `radial-gradient(150px circle at top left, ${campaign.themeColor}, transparent 100%)`
                }}
            />

            {/* Spotlight Hover Glow */}
            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[28px] pointer-events-none z-10 mix-blend-screen"
                style={{
                    background: useMotionTemplate`radial-gradient(400px circle at ${spotlightX}px ${spotlightY}px, rgba(255, 255, 255, 0.05), transparent 70%)`
                }}
            />
            
            {/* Inner Border Glow */}
            <div className="absolute inset-0 rounded-[28px] border border-transparent group-hover:border-white/20 transition-colors duration-700 z-20 pointer-events-none" />

            {/* Top Brand Logo Area */}
            <div className="relative h-[220px] w-full overflow-hidden z-20 border-b border-white/[0.05]">
                <div className="absolute inset-0 bg-[#000] opacity-40 z-10 group-hover:opacity-20 transition-opacity duration-700" />
                <img
                    src={campaign.brandLogo}
                    alt={campaign.brandName}
                    className="w-full h-[120%] object-cover scale-100 group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <h3 className="text-4xl font-black text-white uppercase tracking-widest opacity-80 drop-shadow-2xl">
                        {campaign.brandName}
                    </h3>
                </div>
            </div>

            {/* Content Area */}
            <div className="relative z-20 p-8 flex flex-col grow">
                {/* Highlight Tag */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 flex items-center gap-2 shadow-[0_0_10px_rgba(255,255,255,0.05)] group-hover:bg-white/[0.1] transition-colors duration-500">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">{campaign.metricsHighlight}</span>
                    </div>
                </div>

                <h4 className="text-3xl font-black text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-500">
                    {campaign.title}
                </h4>

                <p className="text-sm text-gray-400 leading-relaxed font-medium mb-6 grow line-clamp-3 group-hover:text-gray-300 transition-colors">
                    {campaign.description}
                </p>

                {/* Bottom Metrics */}
                <div className="flex items-center gap-6 pt-5 border-t border-white/[0.05]">
                    {campaign.stats.map((stat, sIdx) => (
                        <div key={sIdx} className="flex flex-col">
                            <span className="text-2xl font-black text-white group-hover:text-primary transition-colors duration-500">{stat.value}</span>
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </a>
    );
};

export default function CaseStudy() {
    const containerRef = useRef(null);
    const musicRef = useRef(null);
    const carouselRef = useRef(null);
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

            // Subtitle & Title Animations
            gsap.fromTo(".case-subtitle",
                { y: "100%", opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power4.out", scrollTrigger: { trigger: containerRef.current, start: "top 90%" } }
            );

            gsap.fromTo(".case-title-word",
                { y: "110%" },
                { y: "0%", duration: 1.2, ease: "power4.out", stagger: 0.1, scrollTrigger: { trigger: containerRef.current, start: "top 85%" } }
            );

            gsap.fromTo(".case-scribble path",
                { strokeDashoffset: 600 },
                { strokeDashoffset: 0, duration: 1.5, ease: "power3.out", scrollTrigger: { trigger: containerRef.current, start: "top 80%" } }
            );

            // 3D Horizontal Carousel (Applied to all screens)
            const cards = gsap.utils.toArray('.desktop-case-card');
            if (cards.length > 0) {

                const getCardState = (diff) => {
                    // Center (Active)
                    if (diff === 0) return { x: "0%", rotationY: 0, scale: 1, opacity: 1, zIndex: 50, filter: "brightness(1.1) blur(0px)" };
                    // Right side
                    if (diff === 1) return { x: "85%", rotationY: -15, scale: 0.82, opacity: 0.5, zIndex: 40, filter: "brightness(0.8) blur(2px)" };
                    if (diff === 2) return { x: "155%", rotationY: -25, scale: 0.65, opacity: 0.2, zIndex: 30, filter: "brightness(0.6) blur(4px)" };
                    if (diff >= 3) return { x: "200%", rotationY: -35, scale: 0.5, opacity: 0, zIndex: 20, filter: "brightness(0.4) blur(6px)" };
                    // Left side
                    if (diff === -1) return { x: "-85%", rotationY: 15, scale: 0.82, opacity: 0.5, zIndex: 40, filter: "brightness(0.8) blur(2px)" };
                    if (diff === -2) return { x: "-155%", rotationY: 25, scale: 0.65, opacity: 0.2, zIndex: 30, filter: "brightness(0.6) blur(4px)" };
                    if (diff <= -3) return { x: "-200%", rotationY: 35, scale: 0.5, opacity: 0, zIndex: 20, filter: "brightness(0.4) blur(6px)" };
                };

                const numSteps = cards.length - 1;
                // Give 80vh of scroll per transition step
                const totalScroll = numSteps * window.innerHeight * 0.8;

                const mainTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: carouselRef.current,
                        start: "center center", // Pin when the carousel is centered
                        end: `+=${totalScroll}`,
                        pin: true,
                        scrub: 1.5,
                        anticipatePin: 1,
                    }
                });

                // Set initial state (step 0)
                cards.forEach((card, i) => {
                    gsap.set(card, getCardState(i));
                });

                // Build the timeline steps
                for (let step = 0; step < numSteps; step++) {
                    const nextActive = step + 1;
                    
                    cards.forEach((card, i) => {
                        const diff = i - nextActive;
                        const targetState = getCardState(diff);
                        
                        mainTl.to(card, {
                            ...targetState,
                            ease: "power2.inOut",
                            duration: 1
                        }, step);
                    });
                }
            }

            // Music Marketing Timeline
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
        <section id="work" ref={containerRef} className="relative w-full bg-transparent py-24 lg:py-32 overflow-hidden border-t border-white/[0.03]">

            {/* Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute w-[80vw] h-[80vw] lg:w-[40vw] lg:h-[40vw] rounded-full bg-[#0A192F]/10 blur-[150px] mix-blend-screen opacity-30 -translate-y-[20%]" />
                </div>
                {/* Subtle Grid */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.8)_100%)] opacity-90" />
                {/* Floating Decorative Crosses */}
                <div className="absolute top-20 right-[15%] floating-cross">
                    <svg className="w-4 h-4 text-primary/15" viewBox="0 0 16 16" fill="currentColor"><rect x="7" y="0" width="2" height="16" /><rect x="0" y="7" width="16" height="2" /></svg>
                </div>
                <div className="absolute bottom-40 left-[6%] floating-cross">
                    <svg className="w-3 h-3 text-white/10" viewBox="0 0 16 16" fill="currentColor"><rect x="7" y="0" width="2" height="16" /><rect x="0" y="7" width="16" height="2" /></svg>
                </div>
            </div>

            <div className="relative z-10">

                {/* Section Header */}
                <div className="container mx-auto px-6 md:px-12 max-w-7xl flex flex-col items-center justify-center text-center mb-16 lg:mb-12">
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

                {/* 3D Cinematic Carousel Container */}
                <div 
                    ref={carouselRef} 
                    className="relative w-full h-[600px] lg:h-screen lg:max-h-[800px] flex items-center justify-center overflow-hidden lg:overflow-visible"
                    style={{ perspective: "1500px" }}
                >
                    {/* Carousel Stack (GSAP applied on all screens) */}
                    <div className="relative w-full h-full max-w-[380px] lg:max-w-7xl mx-auto" style={{ transformStyle: "preserve-3d" }}>
                        {CASE_STUDIES.map((campaign) => (
                            <DesktopCaseCard key={campaign.id} campaign={campaign} />
                        ))}
                    </div>
                </div>

                {/* Music Marketing Dedicated Highlight */}
                <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                    <motion.div
                        ref={musicRef}
                        onMouseMove={handleMouseMove}
                        className="music-marketing-box opacity-0 group w-full mt-24 lg:mt-32 relative rounded-[40px] overflow-hidden bg-gradient-to-br from-[#112240]/40 to-[#060B14]/30 border border-white/[0.06] p-10 lg:p-16 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700 hover:border-primary/30 hover:bg-[#060B14]/60 hover:shadow-[0_25px_60px_-15px_rgba(212,175,55,0.25)]"
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
            </div>
        </section>
    );
}
