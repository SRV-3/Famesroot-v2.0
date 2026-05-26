import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'motion/react';
import gsap from 'gsap';

function Counter({ from = 0, to, suffix = "", duration = 2 }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const count = useMotionValue(from);
    
    // Animate value when element comes into view
    useEffect(() => {
        if (isInView) {
            animate(count, to, { 
                duration, 
                ease: [0.16, 1, 0.3, 1] // smooth custom ease out
            });
        }
    }, [isInView, count, to, duration]);

    // Format number seamlessly
    const displayValue = useTransform(count, (latest) => {
        return Math.round(latest).toLocaleString() + suffix;
    });

    return <motion.span ref={ref}>{displayValue}</motion.span>;
}

const STATS = [
    { value: 9, suffix: "+", label: "Years in Industry" },
    { value: 1000, suffix: "+", label: "Verified Creators" },
    { value: 100, suffix: "+", label: "Brand Clients" },
    { value: 106, suffix: "M+", label: "Campaign Views" },
];

export default function Banner() {
    const containerRef = useRef(null);

    // Optional: Subtle ambient breathing for the red glow
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(".banner-glow", {
                opacity: 0.8,
                scale: 1.1,
                duration: 6,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section 
            id="statistics" 
            ref={containerRef} 
            className="relative w-full bg-[#030303] py-24 lg:py-32 overflow-hidden border-t border-b border-white/[0.05]"
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
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#030303_100%)] opacity-90" />
                
                {/* Animated Red Glow */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] lg:w-[40vw] lg:h-[40vw] rounded-full bg-primary/10 blur-[100px] mix-blend-screen banner-glow" />
                
                {/* Subtle Grain Noise */}
                <div className="noise-overlay opacity-[0.05]" />
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
                
                <motion.div 
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: { staggerChildren: 0.15 }
                        }
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0"
                >
                    {STATS.map((stat, idx) => (
                        <motion.div 
                            key={idx}
                            variants={{
                                hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
                                show: { opacity: 1, y: 0, filter: "blur(0px)" }
                            }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="relative flex flex-col items-center text-center group"
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
                                <Counter to={stat.value} suffix={stat.suffix} />
                            </h3>
                            
                            <p className="text-gray-400 text-sm md:text-base font-medium tracking-wide uppercase group-hover:text-gray-200 transition-colors duration-500">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
                
            </div>
        </section>
    );
}
