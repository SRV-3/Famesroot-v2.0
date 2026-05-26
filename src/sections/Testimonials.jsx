import { useRef } from 'react';
import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data/data';

const TestimonialCard = ({ testimonial, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col justify-between p-10 lg:p-12 min-h-[400px] bg-gradient-to-b from-[#0a0a0a] to-[#030303] backdrop-blur-2xl border border-white/[0.05] rounded-[32px] overflow-hidden cursor-pointer transition-transform duration-700 hover:-translate-y-2"
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

                {/* Quote Icon */}
                <div className="mb-8">
                    <svg className="w-10 h-10 text-primary/80 drop-shadow-[0_0_10px_rgba(255,0,0,0.3)] group-hover:text-primary transition-colors duration-500" viewBox="0 0 24 24" fill="currentColor">
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
        </motion.div>
    );
};

export default function Testimonials() {
    return (
        <section id="testimonials" className="relative min-h-screen w-full bg-[#030303] py-24 lg:py-32 overflow-hidden border-t border-white/[0.03]">

            {/* Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
                <div className="absolute w-[90vw] h-[90vw] lg:w-[40vw] lg:h-[40vw] rounded-full bg-primary/5 blur-[120px] mix-blend-screen opacity-40 translate-x-[20%]" />
                <div className="cinematic-vignette opacity-80" />
                <div className="noise-overlay opacity-[0.1]" />
            </div>

            <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">

                {/* Section Header */}
                <div className="flex flex-col items-center justify-center text-center mb-20 lg:mb-28">
                    <div className="overflow-hidden mb-6">
                        <motion.div
                            initial={{ y: "100%", opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="inline-flex items-center gap-2 text-primary font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase drop-shadow-[0_0_10px_rgba(255,0,0,0.3)]"
                        >
                            <span className="w-12 h-[1px] bg-primary/80" />
                            Client Love
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
                            What Brands <br />
                            <span className="text-primary">Say.</span>
                        </motion.h2>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                    {TESTIMONIALS.map((testimonial, index) => (
                        <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
                    ))}
                </div>

            </div>
        </section>
    );
}
