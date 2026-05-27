import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'motion/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Typewriter from '../components/Typewriter';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
    {
        num: "01",
        title: "Influencer Marketing",
        desc: "End-to-end campaign execution connecting your brand with hyper-relevant creators for maximum authentic impact and engagement.",
        tags: ["Strategy", "Campaigns", "Analytics"]
    },
    {
        num: "02",
        title: "Talent Management",
        desc: "Exclusive representation and brand development for top-tier creators. We handle the business so talent can focus on creation.",
        tags: ["Representation", "Growth", "Partnerships"]
    },
    {
        num: "03",
        title: "Music Marketing",
        desc: "Viral sound seeding and chart-topping artist campaigns leveraging our massive network of global trendsetters.",
        tags: ["Viral Sounds", "Artist Promo", "Trends"]
    }
];

const getServiceIcon = (num) => {
    switch (num) {
        case "01":
            return (
                <svg className="w-10 h-10 text-white/30 group-hover:text-primary transition-colors duration-500 mb-6" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="24" cy="12" r="4" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="32" r="4" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="36" cy="32" r="4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21 15L15 29M27 15L33 29M16 32H32" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
                    <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
                </svg>
            );
        case "02":
            return (
                <svg className="w-10 h-10 text-white/30 group-hover:text-primary transition-colors duration-500 mb-6" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M24 6L36 18L24 30L12 18Z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M24 18L36 30L24 42L12 30Z" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3" />
                    <circle cx="24" cy="24" r="2.5" fill="currentColor" className="text-white/30 group-hover:text-primary transition-colors duration-500" />
                </svg>
            );
        case "03":
            return (
                <svg className="w-10 h-10 text-white/30 group-hover:text-primary transition-colors duration-500 mb-6" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M8 24H40" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M14 16V32M20 10V38M26 14V34M32 18V30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M8 24C12 24 16 12 20 12C24 12 28 36 32 36C36 36 40 24 44 24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
                </svg>
            );
        default:
            return null;
    }
};

const ServiceCard = ({ service }) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const spotlightX = useMotionValue(0);
    const spotlightY = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
        spotlightX.set(mouseX);
        spotlightY.set(mouseY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            whileHover={{ scale: 1.03, zIndex: 20 }}
            className="service-card-item opacity-0 group relative flex flex-col justify-between h-[400px] lg:h-[480px] bg-gradient-to-b from-[#111111]/40 to-[#070707]/30 backdrop-blur-2xl border border-white/[0.06] rounded-3xl p-8 lg:p-10 cursor-pointer hover:border-[#D4AF37]/30 hover:bg-[#070707]/60 hover:shadow-[0_25px_60px_-15px_rgba(212,175,55,0.25)] transition-all duration-700"
        >
            {/* Spotlight Glow tracking mouse */}
            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl pointer-events-none z-0"
                style={{
                    background: useMotionTemplate`radial-gradient(350px circle at ${spotlightX}px ${spotlightY}px, rgba(212, 175, 55, 0.08), transparent 80%)`
                }}
            />
            {/* Corner Ambient Light leak */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(212,175,55,0.03),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl pointer-events-none" />

            {/* Huge Watermark Outline Number */}
            <span 
                style={{ WebkitTextStroke: "1px rgba(255, 255, 255, 0.05)" }}
                className="absolute top-6 right-8 text-[7.5rem] font-black font-montserrat tracking-tighter leading-none text-transparent select-none opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 pointer-events-none z-0"
            >
                {service.num}
            </span>

            {/* Content Container (Pushed forward in 3D space) */}
            <div style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }} className="relative z-10 flex flex-col justify-between h-full pointer-events-none">

                {/* Top Content */}
                <div>
                    <div className="flex justify-between items-start mb-8">
                        {/* Custom Service Icon */}
                        <div style={{ transform: "translateZ(25px)" }} className="relative z-10 shrink-0">
                            {getServiceIcon(service.num)}
                        </div>
                        <div style={{ transform: "translateZ(20px)" }} className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center -rotate-45 group-hover:rotate-0 group-hover:border-primary/50 group-hover:bg-primary/20 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all duration-500 shrink-0">
                            <svg className="w-4 h-4 text-white group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>
                    </div>

                    <h3 style={{ transform: "translateZ(30px)" }} className="text-2xl lg:text-3xl font-black text-white tracking-wide mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-500">
                        {service.title}
                    </h3>
                    <p style={{ transform: "translateZ(20px)" }} className="text-gray-300/90 text-sm md:text-base leading-[1.8] font-medium group-hover:text-white transition-colors duration-500">
                        {service.desc}
                    </p>
                </div>

                {/* Bottom Content: Pill Tags */}
                <div style={{ transform: "translateZ(30px)" }} className="flex flex-wrap gap-2 mt-8 z-10">
                    {service.tags.map((tag, tIdx) => (
                        <span
                            key={tIdx}
                            className="px-3.5 py-1 text-[9px] uppercase tracking-[0.15em] font-semibold text-gray-400 border border-white/[0.05] rounded-full group-hover:border-primary/30 group-hover:text-white bg-black/20 transition-all duration-500"
                            style={{ transitionDelay: `${tIdx * 50}ms` }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default function Service() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Ambient atmospheric breathing
            gsap.to(".service-glow", {
                opacity: 0.5,
                scale: 1.05,
                duration: 8,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
            });

            // Subtitle
            gsap.fromTo(".service-subtitle",
                { y: "100%", opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: ".service-subtitle",
                        start: "top 90%",
                    }
                }
            );

            // Title Reveal
            gsap.fromTo(".service-title-word",
                { y: "110%" },
                {
                    y: "0%",
                    duration: 1.2,
                    ease: "power4.out",
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: ".service-title",
                        start: "top 85%",
                    }
                }
            );

            // Draw SVG scribble
            gsap.fromTo(".service-scribble path",
                { strokeDashoffset: 600 },
                {
                    strokeDashoffset: 0,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".service-title",
                        start: "top 80%",
                    }
                }
            );

            // Cards Stagger
            gsap.fromTo(".service-card-item",
                { opacity: 0, y: 50, rotateX: 10 },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 1.2,
                    ease: "power4.out",
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: ".services-grid",
                        start: "top 85%",
                    }
                }
            );

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="services" ref={containerRef} className="relative min-h-screen w-full bg-transparent py-32 overflow-hidden border-t border-white/[0.03] perspective-[1200px]">

            {/* Background Atmosphere - Z-0 */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
                <div className="service-glow absolute w-[60vw] h-[60vw] lg:w-[40vw] lg:h-[40vw] rounded-full bg-[#600000]/5 blur-[120px] mix-blend-screen opacity-30 translate-y-[10%]" />
            </div>

            <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">

                {/* Section Header */}
                <div className="flex flex-col items-center justify-center text-center mb-20 lg:mb-28">
                    <div className="overflow-hidden mb-6">
                        <span className="service-subtitle inline-flex items-center gap-2 text-primary font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase drop-shadow-[0_0_10px_rgba(212,175,55,0.3)] opacity-0">
                            <span className="w-12 h-[1px] bg-primary/80" />
                            What We Do
                            <span className="w-12 h-[1px] bg-primary/80" />
                        </span>
                    </div>

                    <div className="service-title overflow-hidden pb-4">
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-black font-montserrat uppercase leading-[1.1] tracking-tight text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                            <span className="inline-block overflow-hidden mr-3">
                                <span className="service-title-word inline-block translate-y-[110%]">Services</span>
                            </span>
                            <span className="inline-block overflow-hidden mr-3">
                                <span className="service-title-word inline-block translate-y-[110%]">That</span>
                            </span>
                            <br />
                            <span className="text-primary scribble-underline service-scribble inline-flex items-center">
                                <span className="inline-block overflow-hidden">
                                    <span className="service-title-word inline-block translate-y-[110%]">Drive&nbsp;</span>
                                </span>
                                <span className="inline-block overflow-hidden">
                                    <span className="service-title-word inline-block translate-y-[110%]">
                                        <Typewriter words={["Impact.", "Results.", "Growth.", "ROAS."]} textClassName="text-primary" cursorClassName="bg-primary" />
                                    </span>
                                </span>
                                <svg viewBox="0 0 200 10" preserveAspectRatio="none">
                                    <path d="M0,5 Q25,0 50,5 T100,5 T150,5 T200,5" />
                                </svg>
                            </span>
                        </h2>
                    </div>
                </div>

                {/* Floating Decorative Crosses */}
                <div className="absolute top-20 right-[15%] floating-cross pointer-events-none z-0">
                    <svg className="w-4 h-4 text-primary/20" viewBox="0 0 16 16" fill="currentColor"><rect x="7" y="0" width="2" height="16"/><rect x="0" y="7" width="16" height="2"/></svg>
                </div>
                <div className="absolute bottom-32 left-[10%] floating-cross pointer-events-none z-0">
                    <svg className="w-3 h-3 text-white/10" viewBox="0 0 16 16" fill="currentColor"><rect x="7" y="0" width="2" height="16"/><rect x="0" y="7" width="16" height="2"/></svg>
                </div>

                {/* Services Grid */}
                <div className="services-grid grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 perspective-[1000px]">
                    {SERVICES.map((service, idx) => (
                        <ServiceCard
                            key={idx}
                            service={service}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}
