import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

// Custom Magnetic Button
const MagneticButton = ({ children, className }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring physics for smooth return
    const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        x.set(middleX * 0.2);
        y.set(middleY * 0.2);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            style={{ x: springX, y: springY }}
            className={`relative overflow-hidden ${className}`}
        >
            {children}
        </motion.button>
    );
};

// Custom Input Field
const FormInput = ({ label, type = "text", placeholder, textarea = false, options = null }) => {
    return (
        <div className="flex flex-col gap-2 w-full group">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest group-focus-within:text-primary transition-colors duration-300">
                {label}
            </label>
            {textarea ? (
                <textarea
                    rows={4}
                    placeholder={placeholder}
                    className="w-full bg-white/[0.03] border-b border-white/[0.1] px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:bg-white/[0.05] transition-all duration-300 resize-none rounded-t-lg"
                />
            ) : options ? (
                <select 
                    className="w-full bg-white/[0.03] border-b border-white/[0.1] px-4 py-3 text-white focus:outline-none focus:border-primary focus:bg-white/[0.05] transition-all duration-300 rounded-t-lg appearance-none cursor-pointer"
                    defaultValue=""
                >
                    <option value="" disabled className="bg-[#0a0a0a] text-gray-500">{placeholder}</option>
                    {options.map((opt, i) => (
                        <option key={i} value={opt} className="bg-[#0a0a0a] text-white py-2">{opt}</option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    placeholder={placeholder}
                    className="w-full bg-white/[0.03] border-b border-white/[0.1] px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:bg-white/[0.05] transition-all duration-300 rounded-t-lg"
                />
            )}
        </div>
    );
};

export default function Contact() {
    return (
        <section id="contact" className="relative min-h-screen w-full bg-[#030303] pt-32 lg:pt-40 pb-10 overflow-hidden border-t border-white/[0.03]">

            {/* Massive Bottom Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[120vw] h-[60vw] rounded-[100%] bg-primary/10 blur-[150px] mix-blend-screen pointer-events-none z-0" />
            <div className="noise-overlay opacity-[0.05]" />

            <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10 flex flex-col items-center">

                {/* --- TOP: CTA HEADLINE --- */}
                <div className="w-full text-center mb-16 lg:mb-24 flex flex-col items-center">
                    <div className="overflow-hidden mb-8">
                        <motion.h2
                            initial={{ y: "100%", opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="text-6xl md:text-8xl lg:text-[110px] xl:text-[130px] font-black font-montserrat uppercase leading-[0.9] tracking-tighter"
                        >
                            <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">Let's Build</span><br />
                            <span className="text-transparent" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}>What People</span><br />
                            <span className="text-primary drop-shadow-[0_0_40px_rgba(255,0,0,0.4)]">Remember.</span>
                        </motion.h2>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="text-gray-400 text-lg lg:text-xl font-medium max-w-2xl mx-auto"
                    >
                        Join the world's most innovative brands. Partner with our creator network to engineer your next cultural moment.
                    </motion.p>
                </div>

                {/* --- MIDDLE: MAGNETIC BUTTONS --- */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex flex-wrap justify-center gap-4 mb-24 lg:mb-32"
                >
                    <MagneticButton className="px-8 py-4 rounded-full bg-primary text-white font-bold uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(255,0,0,0.2)] hover:shadow-[0_0_40px_rgba(255,0,0,0.5)] transition-shadow duration-300">
                        Start a Campaign
                    </MagneticButton>
                    <MagneticButton className="px-8 py-4 rounded-full bg-white text-black font-bold uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-shadow duration-300">
                        Book Strategy Call
                    </MagneticButton>
                    <MagneticButton className="px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/[0.05] transition-colors duration-300">
                        Follow Us
                    </MagneticButton>
                </motion.div>

                {/* --- BOTTOM: FORM & INFO --- */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* LEFT: FORM (7 cols) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="col-span-1 lg:col-span-7 bg-white/[0.02] backdrop-blur-3xl border border-white/[0.05] rounded-[32px] p-8 lg:p-12 relative overflow-hidden"
                    >
                        {/* Inner form glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

                        <h3 className="text-3xl font-black text-white mb-8 relative z-10">Ready to Scale?</h3>

                        <form className="flex flex-col gap-8 relative z-10" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <FormInput label="Your Name" placeholder="Rahul Sharma" />
                                <FormInput label="Brand / Company" placeholder="Your Brand" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <FormInput label="Email Address" type="email" placeholder="rahul@brand.com" />
                                <FormInput label="Phone / WhatsApp" type="tel" placeholder="+91 9876543210" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <FormInput 
                                    label="Service Needed" 
                                    placeholder="Select a service" 
                                    options={[
                                        "Influencer Marketing Campaign",
                                        "Talent Management",
                                        "Music Marketing Campaign",
                                        "Growth Strategy",
                                        "Creator Representation"
                                    ]}
                                />
                                <FormInput 
                                    label="Estimated Budget" 
                                    placeholder="Select budget" 
                                    options={[
                                        "Under ₹1 Lakh",
                                        "₹1L - ₹5L",
                                        "₹5L - ₹20L",
                                        "₹20L+"
                                    ]}
                                />
                            </div>
                            <FormInput label="Campaign Details" textarea={true} placeholder="Tell us about your goals, target audience, and timeline..." />

                            <button type="submit" className="self-start px-10 py-5 rounded-full bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-gray-200 hover:scale-105 transition-all duration-300 mt-4 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                Submit Inquiry →
                            </button>
                        </form>
                    </motion.div>

                    {/* RIGHT: CONTACT INFO (5 cols) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="col-span-1 lg:col-span-5 flex flex-col gap-8"
                    >
                        {/* Info Block */}
                        <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/[0.05] rounded-[32px] p-8 lg:p-10 flex flex-col gap-8">
                            <div>
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Location</h4>
                                <p className="text-xl text-white font-medium">Uttar Pradesh<br />India</p>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Direct Contact</h4>
                                <a href="mailto:info@famesroot.com" className="text-xl text-white font-medium hover:text-primary transition-colors block">info@famesroot.com</a>
                                <a href="tel:+919335938216" className="text-xl text-white font-medium hover:text-primary transition-colors block mt-1">+91 9335938216</a>
                            </div>
                        </div>

                        {/* Social Links Block */}
                        <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/[0.05] rounded-[32px] p-8 lg:p-10 flex flex-col justify-center grow">
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Social Network</h4>
                            <div className="flex flex-wrap gap-4">
                                {[
                                    { name: 'Instagram', url: 'https://www.instagram.com/famesroot/' },
                                    { name: 'Facebook', url: 'https://www.facebook.com/Famesroot/' },
                                    { name: 'X', url: 'https://x.com/famesroot' },
                                    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/famesroot/' }
                                ].map((social) => (
                                    <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-full border border-white/10 text-sm font-medium text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300">
                                        {social.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                </div>

                {/* Footer Copyright */}
                <div className="w-full flex flex-col md:flex-row items-center justify-between mt-24 pt-8 border-t border-white/[0.05] text-sm text-gray-600 font-medium z-10 relative">
                    <p>© 2026 Famesroot Agency. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>

            </div>
        </section>
    );
}
