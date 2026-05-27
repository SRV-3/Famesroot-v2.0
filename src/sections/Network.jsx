import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { CREATORS } from '../data/data';

gsap.registerPlugin(ScrollTrigger);

// --- Mobile Swipe Card Component ---
const SwipeCard = ({ creator, index, setCards }) => {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-10, 10]);

    const handleDragEnd = (e, info) => {
        if (Math.abs(info.offset.x) > 100) {
            // Animate completely off screen
            const direction = info.offset.x > 0 ? 1 : -1;
            animate(x, direction * 400, { duration: 0.3 }).then(() => {
                setCards(prev => {
                    const next = [...prev];
                    const top = next.shift();
                    next.push(top);
                    return next;
                    x.set(0); // reset position for when it cycles back
                });
            });
        } else {
            // Snap back to center
            animate(x, 0, { type: "spring", stiffness: 300, damping: 20 });
        }
    };

    const isFront = index === 0;
    const yOffset = index * 24;
    const scale = 1 - index * 0.06;
    const zIndex = 50 - index;

    return (
        <motion.div
            style={{ x, rotate, zIndex }}
            animate={{
                y: yOffset,
                scale: scale,
                opacity: index > 2 ? 0 : 1 // Only show top 3 cards for performance/aesthetics
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            drag={isFront ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className="absolute top-0 w-[85vw] max-w-[360px] aspect-[4/5] rounded-[32px] overflow-hidden cursor-grab active:cursor-grabbing border border-white/[0.08] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]"
        >
            <img src={creator.image} alt={creator.name} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/30 to-transparent pointer-events-none opacity-90" />

            <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 pointer-events-none">
                <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-semibold text-white drop-shadow-lg">{creator.name}</h3>
                    {creator.verified && (
                        <svg className="w-5 h-5 text-primary drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z" />
                        </svg>
                    )}
                </div>
                <p className="text-gray-300 text-sm font-medium mb-3">{creator.category}</p>
                <div className="inline-block px-3 py-1.5 rounded-full bg-white/[0.05] backdrop-blur-md border border-white/10">
                    <span className="text-xs font-bold text-white tracking-wide">{creator.followers} Followers</span>
                </div>
            </div>
        </motion.div>
    );
};

// --- Desktop Grid Component ---
const CreatorCard = ({ creator, featured = false }) => (
    <div
        className={`creator-card opacity-0 group relative rounded-3xl overflow-hidden cursor-pointer border border-white/[0.05] hover:border-primary/30 transition-colors duration-700 bg-[#0a0a0a] ${featured ? 'h-[650px]' : 'h-full min-h-[300px]'}`}
    >
        {/* Hover Glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 shadow-[inset_0_0_80px_rgba(212,175,55,0.15)] pointer-events-none z-10" />

        {/* Image with parallax effect wrapper */}
        <div className="absolute inset-0 overflow-hidden">
            <img
                src={creator.image}
                alt={creator.name}
                className="creator-card-image w-full h-[120%] object-cover scale-100 group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
            />
        </div>

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-transparent opacity-90 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#030303] opacity-60 z-10" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex flex-col justify-end">
            <div className="flex items-center gap-2 mb-1 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                <h3 className={`${featured ? 'text-2xl' : 'text-xl'} font-semibold text-white`}>
                    {creator.name}
                </h3>
                {creator.verified && (
                    <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z" />
                    </svg>
                )}
            </div>
            <p className="text-primary text-sm font-bold mb-3 transition-all duration-500 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)]">
                {creator.category}
            </p>

            <div className="flex justify-between items-center transition-all duration-500 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)]">
                <div className="px-3 py-1.5 rounded-full bg-white/[0.05] backdrop-blur-md border border-white/10">
                    <span className="text-xs font-bold text-white tracking-wide">{creator.followers}</span>
                </div>

                {/* Arrow Icon */}
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                    <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
);


export default function Network() {
    const containerRef = useRef(null);
    const [mobileCards, setMobileCards] = useState(CREATORS);
    const featuredCreator = CREATORS[0];
    const gridCreators = CREATORS.slice(1, 5); // Take next 4 for the grid

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Subtitle
            gsap.fromTo(".network-subtitle",
                { y: "100%", opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: ".network-subtitle",
                        start: "top 90%",
                    }
                }
            );

            // Title
            gsap.fromTo(".network-title-word",
                { y: "110%" },
                {
                    y: "0%",
                    duration: 1.2,
                    ease: "power4.out",
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: ".network-title",
                        start: "top 85%",
                    }
                }
            );

            // Scribble Draw
            gsap.fromTo(".network-scribble path",
                { strokeDashoffset: 600 },
                {
                    strokeDashoffset: 0,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".network-title",
                        start: "top 80%",
                    }
                }
            );

            // Stagger Creator Cards
            gsap.fromTo(".creator-card",
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power4.out",
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: ".network-grid-container",
                        start: "top 80%",
                    }
                }
            );

            // Parallax on image zoom/movement inside CreatorCard
            gsap.utils.toArray('.creator-card-image').forEach((img) => {
                gsap.fromTo(img,
                    { yPercent: -10 },
                    {
                        yPercent: 10,
                        ease: "none",
                        scrollTrigger: {
                            trigger: img.closest('.creator-card'),
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true
                        }
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="network" ref={containerRef} className="relative min-h-screen w-full bg-transparent py-24 lg:py-32 overflow-hidden border-t border-white/[0.03]">

            {/* Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
                <div className="absolute w-[80vw] h-[80vw] lg:w-[50vw] lg:h-[50vw] rounded-full bg-[#600000]/10 blur-[120px] mix-blend-screen opacity-40 translate-x-[20%]" />
                <div className="absolute top-16 left-[12%] floating-cross">
                    <svg className="w-4 h-4 text-primary/15" viewBox="0 0 16 16" fill="currentColor"><rect x="7" y="0" width="2" height="16"/><rect x="0" y="7" width="16" height="2"/></svg>
                </div>
                <div className="absolute bottom-24 right-[8%] floating-cross">
                    <svg className="w-3 h-3 text-white/10" viewBox="0 0 16 16" fill="currentColor"><rect x="7" y="0" width="2" height="16"/><rect x="0" y="7" width="16" height="2"/></svg>
                </div>
            </div>

            <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">

                {/* Section Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 lg:mb-24 gap-6">
                    <div className="flex flex-col">
                        <div className="overflow-hidden mb-4">
                            <span className="network-subtitle inline-flex items-center gap-2 text-primary font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase drop-shadow-[0_0_10px_rgba(212,175,55,0.3)] opacity-0">
                                <span className="w-12 h-[1px] bg-primary/80" />
                                Our Creator Network
                            </span>
                        </div>

                        <div className="network-title overflow-hidden pb-4">
                            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black font-montserrat uppercase leading-[1.1] tracking-tight text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                <span className="inline-block overflow-hidden mr-3">
                                    <span className="network-title-word inline-block translate-y-[110%]">1,000+</span>
                                </span>
                                <span className="inline-block overflow-hidden mr-3">
                                    <span className="network-title-word inline-block translate-y-[110%]">Creators.</span>
                                </span>
                                <br />
                                <span className="text-primary scribble-underline network-scribble">
                                    <span className="inline-block overflow-hidden mr-2">
                                        <span className="network-title-word inline-block translate-y-[110%]">All</span>
                                    </span>
                                    <span className="inline-block overflow-hidden mr-2">
                                        <span className="network-title-word inline-block translate-y-[110%]">Verified.</span>
                                    </span>
                                    <span className="inline-block overflow-hidden mr-2">
                                        <span className="network-title-word inline-block translate-y-[110%]">All</span>
                                    </span>
                                    <span className="inline-block overflow-hidden mr-2">
                                        <span className="network-title-word inline-block translate-y-[110%]">Ready.</span>
                                    </span>
                                    <svg viewBox="0 0 200 10" preserveAspectRatio="none">
                                        <path d="M0,5 Q25,0 50,5 T100,5 T150,5 T200,5" />
                                    </svg>
                                </span>
                            </h2>
                        </div>
                    </div>

                    <div className="hidden lg:block">
                        <a href="#contact" className="inline-block px-8 py-4 rounded-full bg-white text-black font-bold uppercase tracking-wider text-sm hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                            Join Network
                        </a>
                    </div>
                </div>

                {/* Mobile: Swipe Carousel */}
                <div className="block lg:hidden relative h-[80vh] flex items-center justify-center overflow-visible mt-8">
                    <p className="absolute top-0 text-gray-500 text-xs font-bold uppercase tracking-widest text-center w-full z-20">
                        ← Swipe to explore →
                    </p>
                    <div className="relative w-full max-w-[360px] h-[65vh] flex justify-center mt-12">
                        {mobileCards.map((creator, index) => (
                            <SwipeCard
                                key={creator.id}
                                creator={creator}
                                index={index}
                                setCards={setMobileCards}
                            />
                        ))}
                    </div>
                </div>

                {/* Desktop: Asymmetrical Grid */}
                <div className="network-grid-container hidden lg:grid grid-cols-12 gap-8">
                    {/* Left Featured (Spans 5 cols) */}
                    <div className="col-span-5">
                        <CreatorCard creator={featuredCreator} featured={true} />
                    </div>

                    {/* Right Nested Grid (Spans 7 cols) */}
                    <div className="col-span-7 grid grid-cols-2 gap-8 h-[650px]">
                        {gridCreators.map((creator) => (
                            <CreatorCard
                                key={creator.id}
                                creator={creator}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
