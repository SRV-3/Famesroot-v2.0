import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { TESTIMONIALS } from '../data/data';
import Typewriter from '../components/Typewriter';

gsap.registerPlugin(ScrollTrigger);

const TestimonialCard = ({ testimonial }) => {
    return (
        <div
            className="testimonial-card opacity-0 group relative flex flex-col justify-between p-10 lg:p-12 min-h-[400px] bg-gradient-to-b from-[#0B132B] to-[#030712] backdrop-blur-2xl border border-white/[0.05] rounded-[32px] overflow-hidden cursor-pointer transition-transform duration-700 hover:-translate-y-2"
        >
            {/* Dynamic Hover Glow */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-screen pointer-events-none z-0"
                style={{
                    background: `radial-gradient(circle at top left, ${testimonial.accentColor}, transparent 60%)`
                }}
            />

            {/* Borders Hover Effect */}
            <div className="absolute inset-0 rounded-[32px] border border-transparent group-hover:border-white/20 transition-colors duration-700 z-20 pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col h-full">

                <div className="mb-8">
                    <svg className="w-10 h-10 text-primary/80 drop-shadow-[0_0_10px_rgba(212,175,55,0.3)] group-hover:text-primary transition-colors duration-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                </div>

                {/* Testimonial Text */}
                <p className="text-xl lg:text-2xl text-gray-300 font-medium italic leading-[1.8] mb-12 grow group-hover:text-white transition-colors duration-500">
                    "{testimonial.quote}"
                </p>

                {/* Bottom Footer Info */}
                <div className="flex items-center gap-6 pt-8 border-t border-white/[0.05]">
                    {/* Brand Logo / Avatar */}
                    <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10 shrink-0 bg-black">
                        <img
                            src={testimonial.logoImage}
                            alt={testimonial.brandName}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        />
                    </div>

                    <div className="flex flex-col">
                        <h4 className="text-xl font-bold text-white mb-1 tracking-wide">{testimonial.brandName}</h4>
                        <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">{testimonial.designation}</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default function Testimonials() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Subtitle
            gsap.fromTo(".testimonials-subtitle",
                { y: "100%", opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: ".testimonials-subtitle",
                        start: "top 90%",
                    }
                }
            );

            // Title Reveal
            gsap.fromTo(".testimonials-title-word",
                { y: "110%" },
                {
                    y: "0%",
                    duration: 1.2,
                    ease: "power4.out",
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: ".testimonials-title",
                        start: "top 85%",
                    }
                }
            );

            // Draw SVG scribble
            gsap.fromTo(".testimonials-scribble path",
                { strokeDashoffset: 600 },
                {
                    strokeDashoffset: 0,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".testimonials-title",
                        start: "top 80%",
                    }
                }
            );

            // Testimonial Cards Stagger Reveal
            gsap.fromTo(".testimonial-card",
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power4.out",
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: ".testimonial-grid",
                        start: "top 85%",
                    }
                }
            );

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="testimonials" ref={containerRef} className="relative min-h-screen w-full bg-transparent py-24 lg:py-32 overflow-hidden border-t border-white/[0.03]">

            {/* Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
                <div className="absolute w-[90vw] h-[90vw] lg:w-[40vw] lg:h-[40vw] rounded-full bg-[#D4AF37]/5 blur-[120px] mix-blend-screen opacity-40 translate-x-[20%]" />
                {/* Floating Decorative Crosses */}
                <div className="absolute top-32 left-[8%] floating-cross">
                    <svg className="w-3 h-3 text-primary/15" viewBox="0 0 16 16" fill="currentColor"><rect x="7" y="0" width="2" height="16"/><rect x="0" y="7" width="16" height="2"/></svg>
                </div>
                <div className="absolute bottom-20 right-[12%] floating-cross">
                    <svg className="w-4 h-4 text-white/8" viewBox="0 0 16 16" fill="currentColor"><rect x="7" y="0" width="2" height="16"/><rect x="0" y="7" width="16" height="2"/></svg>
                </div>
            </div>

            <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">

                {/* Section Header */}
                <div className="flex flex-col items-center justify-center text-center mb-20 lg:mb-28">
                    <div className="overflow-hidden mb-6">
                        <span className="testimonials-subtitle inline-flex items-center gap-2 text-primary font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase drop-shadow-[0_0_10px_rgba(212,175,55,0.3)] opacity-0">
                            <span className="w-12 h-[1px] bg-primary/80" />
                            Client Love
                            <span className="w-12 h-[1px] bg-primary/80" />
                        </span>
                    </div>

                    <div className="testimonials-title overflow-hidden pb-4">
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-black font-montserrat uppercase leading-[1.1] tracking-tight text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
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
                </div>

                {/* Grid */}
                <div className="testimonial-grid grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                    {TESTIMONIALS.map((testimonial) => (
                        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                    ))}
                </div>

            </div>
        </section>
    );
}
