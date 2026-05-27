import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useTransform, animate, useMotionTemplate } from 'motion/react';
import { TESTIMONIALS } from '../data/data';
import Typewriter from '../components/Typewriter';

gsap.registerPlugin(ScrollTrigger);

// --- Desktop Stack Card (GSAP) ---
const DesktopCard = ({ testimonial }) => {
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
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className="group desktop-testimonial-card absolute top-0 left-0 w-full h-full flex flex-col justify-between p-8 lg:p-12 bg-white backdrop-blur-3xl border border-gray-200/60 rounded-[32px] lg:rounded-[40px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)]"
            style={{ transformOrigin: "bottom center" }}
        >
            <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.03),transparent_60%)] pointer-events-none" />

            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[40px] pointer-events-none z-0 mix-blend-screen"
                style={{
                    background: useMotionTemplate`radial-gradient(400px circle at ${spotlightX}px ${spotlightY}px, ${testimonial.accentColor || 'rgba(212, 175, 55, 0.15)'}, transparent 70%)`
                }}
            />

            <div className="relative z-10 flex flex-col h-full">
                <div className="mb-4 lg:mb-10">
                    <svg className="w-8 h-8 lg:w-12 lg:h-12 text-primary/80 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                </div>

                <p className="text-base md:text-lg lg:text-3xl text-gray-800 font-medium italic leading-[1.6] mb-4 lg:mb-12 grow overflow-hidden">
                    "{testimonial.quote}"
                </p>

                <div className="flex items-center gap-4 lg:gap-6 pt-4 lg:pt-8 border-t border-gray-100">
                    <div className="w-10 h-10 lg:w-16 lg:h-16 rounded-full overflow-hidden border-2 border-gray-100 shrink-0 bg-white shadow-sm">
                        <img src={testimonial.logoImage} alt={testimonial.brandName} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                        <h4 className="text-base lg:text-xl font-bold text-gray-900 tracking-wide">{testimonial.brandName}</h4>
                        <span className="text-[10px] lg:text-sm font-bold text-primary uppercase tracking-widest">{testimonial.designation}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Testimonials() {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {

            // Text Reveals
            gsap.fromTo(".testimonials-subtitle",
                { y: "100%", opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power4.out", scrollTrigger: { trigger: containerRef.current, start: "top 80%" } }
            );

            gsap.fromTo(".testimonials-title-word",
                { y: "110%" },
                { y: "0%", duration: 1.2, ease: "power4.out", stagger: 0.1, scrollTrigger: { trigger: containerRef.current, start: "top 75%" } }
            );

            // Scroll Stacking Logic
            const cards = gsap.utils.toArray('.desktop-testimonial-card');
            if (cards.length > 0) {

                // Each card gets 80vh of scroll distance
                const totalScroll = (cards.length > 1 ? cards.length - 1 : 1) * window.innerHeight * 0.8;

                // Pin the entire section so user scrubs through the deck
                const mainTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: `+=${totalScroll}`,
                        pin: true,
                        scrub: 1.5,
                        anticipatePin: 1,
                    }
                });

                // Background rotation
                mainTl.to(".bg-atmosphere", {
                    rotation: 180,
                    ease: "none",
                    duration: cards.length > 1 ? cards.length - 1 : 1
                }, 0);

                // 1. Initial State: Stack them nicely
                cards.forEach((card, i) => {
                    const yOffset = i * 40;
                    const scale = 1 - (i * 0.05);
                    const rotation = i === 0 ? 0 : (i % 2 === 0 ? 3 : -3) * i;

                    gsap.set(card, {
                        y: yOffset,
                        scale: scale,
                        rotationZ: rotation,
                        opacity: 1 - (i * 0.15),
                        zIndex: 100 - i
                    });
                });

                // 2. Scroll Animations
                cards.forEach((card, i) => {
                    // Skip animating the very last card flying off
                    if (i === cards.length - 1) return;

                    const stepStartTime = i; // 1 second duration per step on timeline

                    // Active card flies UP and fades out
                    mainTl.to(card, {
                        y: -window.innerHeight * 0.8,
                        opacity: 0,
                        rotationZ: (i % 2 === 0 ? -15 : 15),
                        scale: 1.05,
                        ease: "none",
                        duration: 1
                    }, stepStartTime);

                    // Remaining cards below shift UP to take its place
                    cards.slice(i + 1).forEach((nextCard, j) => {
                        const targetY = j * 40;
                        const targetScale = 1 - (j * 0.05);
                        const targetRot = j === 0 ? 0 : (j % 2 === 0 ? 3 : -3) * j;
                        const targetOp = 1 - (j * 0.15);

                        mainTl.to(nextCard, {
                            y: targetY,
                            scale: targetScale,
                            rotationZ: targetRot,
                            opacity: targetOp,
                            ease: "none",
                            duration: 1
                        }, stepStartTime);
                    });
                });
            }

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="testimonials" ref={containerRef} className="relative w-full bg-[#030712] border-t border-white/[0.03]">
            {/* Container will be pinned on Desktop, standard scroll on mobile */}
            <div className="relative flex flex-col justify-center overflow-hidden pt-16 pb-12 lg:py-0 lg:min-h-screen">

                {/* Background Atmosphere */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
                    <div className="bg-atmosphere absolute w-[100vw] h-[100vw] lg:w-[60vw] lg:h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.06)_0%,transparent_70%)] mix-blend-screen opacity-60 pointer-events-none" />

                    {/* Floating Decorative Crosses */}
                    <div className="absolute top-1/4 left-[10%] floating-cross hidden md:block">
                        <svg className="w-4 h-4 text-primary/20" viewBox="0 0 16 16" fill="currentColor"><rect x="7" y="0" width="2" height="16" /><rect x="0" y="7" width="16" height="2" /></svg>
                    </div>
                    <div className="absolute bottom-1/4 right-[12%] floating-cross">
                        <svg className="w-3 h-3 text-white/10" viewBox="0 0 16 16" fill="currentColor"><rect x="7" y="0" width="2" height="16" /><rect x="0" y="7" width="16" height="2" /></svg>
                    </div>

                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
                </div>

                <div className="container mx-auto px-6 md:px-12 max-w-[1400px] relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20 h-full">

                    {/* Left: Section Titles */}
                    <div className="w-full lg:w-5/12 flex flex-col justify-center items-center lg:items-start text-center lg:text-left pt-6 lg:pt-0">
                        <div className="overflow-hidden mb-6">
                            <span className="testimonials-subtitle inline-flex items-center gap-2 text-primary font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase drop-shadow-[0_0_10px_rgba(212,175,55,0.3)] opacity-0">
                                <span className="w-12 h-[1px] bg-primary/80 hidden lg:block" />
                                Client Love
                                <span className="w-12 h-[1px] bg-primary/80 lg:hidden" />
                            </span>
                        </div>

                        <div className="testimonials-title overflow-hidden pb-4">
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black font-montserrat uppercase leading-[1.1] tracking-tight text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                <span className="inline-block overflow-hidden mr-3">
                                    <span className="testimonials-title-word inline-block translate-y-[110%]">What</span>
                                </span>
                                <span className="inline-block overflow-hidden mr-3">
                                    <span className="testimonials-title-word inline-block translate-y-[110%]">Brands</span>
                                </span>
                                <br />
                                <span className="text-primary scribble-underline testimonials-scribble inline-flex items-center">
                                    <span className="inline-block overflow-hidden">
                                        <span className="testimonials-title-word inline-block translate-y-[110%]">
                                            <Typewriter words={["Say.", "Think.", "Achieve.", "Scale."]} textClassName="text-primary" cursorClassName="bg-primary" />
                                        </span>
                                    </span>
                                    <svg viewBox="0 0 200 10" preserveAspectRatio="none">
                                        <path d="M0,5 Q25,0 50,5 T100,5 T150,5 T200,5" />
                                    </svg>
                                </span>
                            </h2>
                        </div>

                        <p className="text-gray-400 font-medium leading-[1.8] mt-6 max-w-md hidden lg:block">
                            Real partnerships. Real creator impact. Real business growth. Scroll to see what industry leaders are saying about Famesroot.
                        </p>
                    </div>

                    {/* Right: Interactive Card Stack */}
                    <div className="relative w-full lg:w-6/12 xl:w-5/12 h-[450px] lg:h-[600px] flex items-center justify-center lg:justify-end">

                        {/* Stack (GSAP applied on all screens) */}
                        <div className="relative w-full max-w-[340px] md:max-w-[380px] lg:max-w-none h-[450px] lg:h-full mt-6 lg:mt-0">
                            {TESTIMONIALS.map((testimonial, i) => (
                                <DesktopCard key={testimonial.id} testimonial={testimonial} />
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
