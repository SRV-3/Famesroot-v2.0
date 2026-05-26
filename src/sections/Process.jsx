import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
    {
        num: "01",
        title: "Strategy & Brief",
        desc: "Deep-dive into your brand DNA, identifying precise culture insertion points and campaign objectives.",
        icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    },
    {
        num: "02",
        title: "Creator Selection",
        desc: "Proprietary psychographic matching against our elite, vetted network of global trendsetters.",
        icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    },
    {
        num: "03",
        title: "Content Execution",
        desc: "High-end studio production that perfectly balances brand guidelines with authentic creator voice.",
        icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
    },
    {
        num: "04",
        title: "Reporting & Growth",
        desc: "Real-time dashboard analytics tracking viral velocity, engagement depth, and direct ROI.",
        icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    },
    {
        num: "05",
        title: "Optimise & Scale",
        desc: "Leveraging winning content formats into massive paid media multipliers to scale culture.",
        icon: "M13 10V3L4 14h7v7l9-11h-7z"
    }
];

export default function Process() {
    const containerRef = useRef(null);
    const trackRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            let mm = gsap.matchMedia();

            // Text Reveals (Global for both mobile & desktop)
            gsap.fromTo(".process-subtitle",
                { x: -30, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: ".process-subtitle",
                        start: "top 90%",
                    }
                }
            );

            gsap.fromTo(".process-title-word",
                { y: "110%" },
                {
                    y: "0%",
                    duration: 1.2,
                    ease: "power4.out",
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: ".process-title",
                        start: "top 85%",
                    }
                }
            );

            // Draw SVG scribble
            gsap.fromTo(".process-scribble path",
                { strokeDashoffset: 600 },
                {
                    strokeDashoffset: 0,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".process-title",
                        start: "top 80%",
                    }
                }
            );

            gsap.fromTo(".process-desc",
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".process-desc",
                        start: "top 90%",
                    }
                }
            );

            // Desktop Horizontal Scroll & staggers
            mm.add("(min-width: 1024px)", () => {
                const track = trackRef.current;

                // Animate horizontal translation based on scroll width
                gsap.to(track, {
                    x: () => -(track.scrollWidth - window.innerWidth),
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        pin: true,
                        scrub: 1,
                        end: () => "+=" + (track.scrollWidth - window.innerWidth),
                        invalidateOnRefresh: true,
                    }
                });

                // Stagger cards horizontally as track moves
                gsap.fromTo(".process-step-item",
                    { opacity: 0, x: 120, filter: "blur(10px)" },
                    {
                        opacity: 1,
                        x: 0,
                        filter: "blur(0px)",
                        duration: 1,
                        stagger: 0.15,
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 20%",
                            scrub: 1
                        }
                    }
                );
            });

            // Mobile Vertical Stagger
            mm.add("(max-width: 1023px)", () => {
                gsap.fromTo(".process-step-item",
                    { opacity: 0, y: 40, filter: "blur(10px)" },
                    {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        duration: 1,
                        stagger: 0.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: ".process-steps-container",
                            start: "top 85%",
                        }
                    }
                );
            });

            // Ambient background glow animation
            gsap.to(".process-ambient", {
                opacity: 0.6,
                scale: 1.2,
                duration: 10,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="process" ref={containerRef} className="relative bg-[#030303] overflow-hidden lg:h-screen w-full border-t border-white/[0.03]">

            {/* Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
                <div className="process-ambient absolute w-[80vw] h-[80vw] lg:w-[50vw] lg:h-[50vw] rounded-full bg-primary/5 blur-[150px] mix-blend-screen opacity-30" />
                <div className="cinematic-vignette opacity-80" />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Desktop: Centered vertically. Mobile: standard padding */}
            <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-stretch lg:h-full py-32 lg:py-0">

                <div ref={trackRef} className="flex flex-col lg:flex-row items-center lg:h-full lg:w-max px-6 md:px-12 lg:px-[10vw] gap-20 lg:gap-32">

                    {/* Intro / Header Block */}
                    <div className="w-full lg:w-[450px] shrink-0 flex flex-col justify-center h-full">
                        <div className="overflow-hidden mb-6">
                            <div className="process-subtitle inline-flex items-center gap-2 text-primary font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase drop-shadow-[0_0_10px_rgba(255,0,0,0.3)] opacity-0">
                                <span className="w-12 h-[1px] bg-primary/80" />
                                How We Scale Culture
                            </div>
                        </div>

                        <div className="process-title overflow-hidden pb-4">
                            <h2 className="text-5xl lg:text-7xl font-black font-montserrat uppercase leading-[1.1] tracking-tight text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                <span className="inline-block overflow-hidden mr-3">
                                    <span className="process-title-word inline-block translate-y-[110%]">From</span>
                                </span>
                                <span className="inline-block overflow-hidden mr-3">
                                    <span className="process-title-word inline-block translate-y-[110%]">Vision</span>
                                </span>
                                <span className="inline-block overflow-hidden mr-3">
                                    <span className="process-title-word inline-block translate-y-[110%]">to</span>
                                </span>
                                <br />
                                <span className="text-primary scribble-underline process-scribble">
                                    <span className="inline-block overflow-hidden">
                                        <span className="process-title-word inline-block translate-y-[110%]">Viral.</span>
                                    </span>
                                    <svg viewBox="0 0 200 10" preserveAspectRatio="none">
                                        <path d="M0,5 Q25,0 50,5 T100,5 T150,5 T200,5" />
                                    </svg>
                                </span>
                            </h2>
                        </div>

                        <p className="process-desc text-gray-300 font-inter leading-[1.9] max-w-[90%] mt-6 opacity-0">
                            We don't just launch campaigns; we engineer cultural moments. Scroll to explore our proprietary 5-step methodology that turns raw attention into measurable impact.
                        </p>
                    </div>

                    {/* Timeline Track & Steps */}
                    <div className="process-steps-container relative flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                        {/* Connecting Line */}
                        <div className="absolute left-[24px] lg:left-0 top-0 lg:top-1/2 w-[2px] lg:w-full h-full lg:h-[2px] bg-white/[0.05] -z-10 lg:-translate-y-1/2 rounded-full overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b lg:bg-gradient-to-r from-transparent via-primary/50 to-primary shadow-[0_0_20px_rgba(255,0,0,0.5)]" />
                        </div>

                        {/* Steps */}
                        {STEPS.map((step, idx) => (
                            <div
                                key={idx}
                                className="process-step-item opacity-0 group relative flex flex-col lg:w-[320px] shrink-0 pl-16 lg:pl-0"
                            >
                                {/* Node Indicator */}
                                <div className="absolute left-[-2px] lg:left-0 lg:top-[-40px] w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-[#030303] border border-white/10 flex items-center justify-center -translate-x-1/2 lg:translate-x-0 group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(255,0,0,0.3)] transition-all duration-700 z-10 overflow-hidden">
                                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    <svg className="w-5 h-5 lg:w-6 lg:h-6 text-gray-500 group-hover:text-white transition-colors duration-500 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={step.icon} />
                                    </svg>
                                </div>

                                {/* Content Card */}
                                <div className="bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-xl border border-white/[0.08] p-8 rounded-2xl group-hover:border-primary/30 group-hover:bg-white/[0.06] transition-colors duration-700 mt-2 lg:mt-16">
                                    <div className="flex justify-between items-start mb-6">
                                        <h3 className="text-xl font-bold text-white tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-500">
                                            {step.title}
                                        </h3>
                                        <span className="text-white/20 font-black text-2xl font-montserrat leading-none">
                                            {step.num}
                                        </span>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-[1.8] font-medium group-hover:text-gray-200 transition-colors duration-500">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
