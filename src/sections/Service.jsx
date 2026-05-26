import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import gsap from 'gsap';

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

const ServiceCard = ({ service, variants, transition }) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

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
            variants={variants}
            transition={transition}
            className="group relative flex flex-col justify-between h-[400px] lg:h-[480px] bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-8 lg:p-10 cursor-pointer hover:border-primary/30 hover:shadow-[0_30px_80px_-15px_rgba(255,0,0,0.2)] transition-colors duration-700"
        >
            {/* Background Hover Details */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 shadow-[inset_0_0_60px_rgba(255,0,0,0.05)] rounded-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-b-2xl" />

            {/* Content Container (Pushed forward in 3D space) */}
            <div style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }} className="relative z-10 flex flex-col justify-between h-full pointer-events-none">

                {/* Top Content */}
                <div>
                    <div className="flex justify-between items-start mb-12">
                        <span style={{ transform: "translateZ(10px)" }} className="text-white/[0.1] group-hover:text-white/[0.2] font-black text-6xl lg:text-7xl leading-none transition-colors duration-700 select-none drop-shadow-sm">
                            {service.num}
                        </span>
                        <div style={{ transform: "translateZ(20px)" }} className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center -rotate-45 group-hover:rotate-0 group-hover:border-primary/50 group-hover:bg-primary/20 group-hover:shadow-[0_0_15px_rgba(255,0,0,0.3)] transition-all duration-500 shrink-0">
                            <svg className="w-4 h-4 text-white group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>
                    </div>

                    <h3 style={{ transform: "translateZ(30px)" }} className="text-2xl lg:text-3xl font-black text-white tracking-wide mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-500">
                        {service.title}
                    </h3>
                    <p style={{ transform: "translateZ(20px)" }} className="text-gray-300 text-sm md:text-base leading-[1.8] font-medium group-hover:text-white transition-colors duration-500">
                        {service.desc}
                    </p>
                </div>

                {/* Bottom Content: Pill Tags */}
                <div style={{ transform: "translateZ(30px)" }} className="flex flex-wrap gap-2 mt-8">
                    {service.tags.map((tag, tIdx) => (
                        <span
                            key={tIdx}
                            className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[9px] uppercase tracking-widest text-gray-300 font-bold group-hover:border-primary/40 group-hover:text-white group-hover:bg-primary/10 transition-all duration-500"
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
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="services" ref={containerRef} className="relative min-h-screen w-full bg-[#030303] py-32 overflow-hidden border-t border-white/[0.03] perspective-[1200px]">

            {/* Background Atmosphere - Z-0 */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
                <div className="service-glow absolute w-[60vw] h-[60vw] lg:w-[40vw] lg:h-[40vw] rounded-full bg-primary/5 blur-[120px] mix-blend-screen opacity-30 translate-y-[10%]" />
                <div className="cinematic-vignette opacity-70" />
                <div className="noise-overlay opacity-[0.1]" />
            </div>

            <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">

                {/* Section Header */}
                <div className="flex flex-col items-center justify-center text-center mb-20 lg:mb-28">
                    <div className="overflow-hidden mb-6">
                        <motion.div
                            initial={{ y: "100%", opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="inline-flex items-center gap-2 text-primary font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase drop-shadow-[0_0_10px_rgba(255,0,0,0.3)]"
                        >
                            <span className="w-12 h-[1px] bg-primary/80" />
                            What We Do
                            <span className="w-12 h-[1px] bg-primary/80" />
                        </motion.div>
                    </div>

                    <div className="overflow-hidden pb-4">
                        <motion.h2
                            initial={{ y: "100%", opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-7xl font-black font-montserrat uppercase leading-[1.1] tracking-tight text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                        >
                            Services That <br />
                            <span className="text-primary scribble-underline animate">
                                Drive Impact.
                                <svg viewBox="0 0 200 10" preserveAspectRatio="none">
                                    <path d="M0,5 Q25,0 50,5 T100,5 T150,5 T200,5" />
                                </svg>
                            </span>
                        </motion.h2>
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
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: { staggerChildren: 0.2 }
                        }
                    }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 perspective-[1000px]"
                >
                    {SERVICES.map((service, idx) => (
                        <ServiceCard
                            key={idx}
                            service={service}
                            variants={{
                                hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
                                show: { opacity: 1, y: 0, filter: "blur(0px)" }
                            }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        />
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
