import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
    { value: 9, suffix: "+", label: "Years in Industry" },
    { value: 1000, suffix: "+", label: "Verified Creators" },
    { value: 100, suffix: "+", label: "Brand Clients" },
    { value: 106, suffix: "M+", label: "Campaign Views" },
];

export default function Banner() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animated Red Glow breathing
            gsap.to(".banner-glow", {
                opacity: 0.8,
                scale: 1.1,
                duration: 6,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
            });

            // Column entry reveal stagger
            gsap.fromTo(".banner-stat-col",
                { opacity: 0, y: 40, filter: "blur(10px)" },
                {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 1.2,
                    ease: "power4.out",
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: ".banner-stats-row",
                        start: "top 85%",
                    }
                }
            );

            // ScrollTrigger count-up animation
            gsap.utils.toArray('.banner-stat-number').forEach((el) => {
                const target = parseFloat(el.getAttribute('data-target'));
                const suffix = el.getAttribute('data-suffix') || "";
                gsap.fromTo(el,
                    { innerHTML: 0 },
                    {
                        innerHTML: target,
                        duration: 2.2,
                        ease: "power4.out",
                        snap: { innerHTML: 1 },
                        scrollTrigger: {
                            trigger: el,
                            start: "top 90%",
                        },
                        onUpdate: function() {
                            el.innerHTML = Math.round(Number(el.innerHTML)).toLocaleString() + suffix;
                        }
                    }
                );
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            id="statistics"
            ref={containerRef}
            className="relative w-full bg-transparent py-24 lg:py-32 overflow-hidden border-t border-b border-white/[0.05]"
        >
            {/* Cinematic Background Layer */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* CSS Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.15]"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px'
                    }}
                />

                {/* Radial gradients for depth masking */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.8)_100%)] opacity-90" />

                {/* Animated Red Glow */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] lg:w-[40vw] lg:h-[40vw] rounded-full bg-[#0A192F]/20 blur-[100px] mix-blend-screen banner-glow" />
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">

                <div className="banner-stats-row grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0">
                    {STATS.map((stat, idx) => (
                        <div
                            key={idx}
                            className="banner-stat-col opacity-0 relative flex flex-col items-center text-center group"
                        >
                            {/* Desktop Separator (between columns) */}
                            {idx !== STATS.length - 1 && (
                                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                            )}

                            {/* Mobile/Tablet Separator (below items) */}
                            {idx !== STATS.length - 1 && (
                                <div className="block lg:hidden absolute -bottom-6 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                            )}

                            <h3 className="text-5xl lg:text-6xl xl:text-7xl font-black text-white font-montserrat tracking-tighter mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:scale-105 group-hover:text-primary transition-all duration-500">
                                <span className="banner-stat-number" data-target={stat.value} data-suffix={stat.suffix}>0</span>
                            </h3>

                            <p className="text-gray-400 text-sm md:text-base font-medium tracking-wide uppercase group-hover:text-gray-200 transition-colors duration-500">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
