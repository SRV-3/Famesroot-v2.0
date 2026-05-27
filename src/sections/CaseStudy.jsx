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
            className="desktop-case-card group absolute top-1/2 left-1/2 w-[320px] h-[460px] md:w-[380px] md:h-[520px] -ml-[160px] -mt-[230px] md:-ml-[190px] md:-mt-[260px] flex flex-col justify-between bg-gradient-to-b from-[#0A192F]/95 to-[#030712]/95 backdrop-blur-3xl border border-white/[0.08] rounded-[28px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] cursor-pointer"
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
                    <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-widest opacity-80 drop-shadow-2xl">
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

                <h4 className="text-2xl md:text-3xl font-black text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-500">
                    {campaign.title}
                </h4>

                <p className="text-sm text-gray-400 leading-relaxed font-medium mb-6 grow line-clamp-3 group-hover:text-gray-300 transition-colors">
                    {campaign.description}
                </p>

                {/* Bottom Metrics */}
                <div className="flex items-center gap-6 pt-5 border-t border-white/[0.05]">
                    {campaign.stats.map((stat, sIdx) => (
                        <div key={sIdx} className="flex flex-col">
                            <span className="text-xl md:text-2xl font-black text-white group-hover:text-primary transition-colors duration-500">{stat.value}</span>
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
                            ease: "none",
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
                { opacity: 0, y: 50, filter: "blur(10px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power4.out" }
            );

            musicTl.fromTo(".music-stat-card",
                { opacity: 0, y: 30, filter: "blur(8px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power4.out", stagger: 0.15 },
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
                    <div className="relative w-full h-full max-w-[320px] md:max-w-[380px] lg:max-w-7xl mx-auto" style={{ transformStyle: "preserve-3d" }}>
                        {CASE_STUDIES.map((campaign) => (
                            <DesktopCaseCard key={campaign.id} campaign={campaign} />
                        ))}
                    </div>
                </div>

                {/* Music Marketing Dedicated Highlight */}
                <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
                    <div
                        ref={musicRef}
                        className="music-marketing-box opacity-0 group w-full mt-20 lg:mt-32 relative rounded-[32px] overflow-hidden bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-700 hover:border-white/10 hover:bg-white/[0.04]"
                    >
                        {/* Soft Vignette & Grid */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(3,7,18,0.6)_100%)] z-0 pointer-events-none" />
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay pointer-events-none z-0" />
                        
                        {/* Subtle Radial Lighting */}
                        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
                            <div className="absolute top-[-30%] left-[-10%] w-[60%] h-[60%] bg-blue-500/10 blur-[100px] rounded-full mix-blend-screen" />
                            <div className="absolute bottom-[-30%] right-[-10%] w-[60%] h-[60%] bg-[#D4AF37]/10 blur-[100px] rounded-full mix-blend-screen" />
                        </div>

                        {/* Content Left */}
                        <div className="relative z-10 w-full lg:w-1/2 flex flex-col gap-5 lg:pr-8">
                            <div className="inline-flex items-center gap-3">
                                {/* Elegant minimal dot */}
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/80 animate-pulse shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                                <span className="text-gray-400 font-medium tracking-[0.2em] text-[10px] md:text-xs uppercase">
                                    Featured Capability
                                </span>
                            </div>

                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium font-montserrat leading-[1.2] tracking-tight text-white mt-2">
                                Music Marketing<br />
                                Built Through<br />
                                <span className="text-[#D4AF37] italic font-light">Creator Culture.</span>
                            </h3>

                            <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed max-w-md mt-2">
                                Creator-led song distribution across Instagram Reels and YouTube Shorts. We’ve run campaigns for <span className="text-white font-medium">‘Tere Ishk Mein’</span>, <span className="text-white font-medium">‘Usey Kehna’</span>, and <span className="text-white font-medium">‘Born Rich’</span> — turning tracks into cultural moments through authentic storytelling.
                            </p>
                        </div>

                        {/* Stats Right */}
                        <div className="relative z-10 w-full lg:w-5/12 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                            {[
                                { value: "6M+", label: "Song Streams" },
                                { value: "218.6K", label: "Engagements" },
                                { value: "3+", label: "Songs Launched", colSpan: true }
                            ].map((stat, i) => (
                                <div
                                    key={stat.label}
                                    className={`music-stat-card opacity-0 group/card relative flex flex-col justify-center p-6 lg:p-8 rounded-[24px] bg-white/[0.02] backdrop-blur-md border border-white/[0.04] transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] hover:bg-white/[0.04] hover:border-white/10 hover:shadow-[0_10px_40px_-10px_rgba(212,175,55,0.1)] overflow-hidden z-10 ${stat.colSpan ? 'sm:col-span-2' : ''}`}
                                >
                                    {/* Ultra soft inner glow on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
                                    
                                    <span className="relative z-10 text-3xl lg:text-4xl font-light text-white tracking-tight mb-2">
                                        {stat.value}
                                    </span>
                                    <span className="relative z-10 text-gray-500 text-[10px] md:text-xs font-semibold uppercase tracking-widest group-hover/card:text-[#D4AF37] transition-colors duration-500">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
