import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Typewriter from "../components/Typewriter";

//calendy
import { InlineWidget } from "react-calendly";
import { PopupWidget } from "react-calendly";

gsap.registerPlugin(ScrollTrigger);

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
const FormInput = ({
  label,
  type = "text",
  placeholder,
  textarea = false,
  options = null,
}) => {
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
          <option value="" disabled className="bg-[#0B132B] text-gray-500">
            {placeholder}
          </option>
          {options.map((opt, i) => (
            <option
              key={i}
              value={opt}
              className="bg-[#0B132B] text-white py-2"
            >
              {opt}
            </option>
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
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title word reveal
      gsap.fromTo(
        ".contact-title-word",
        { y: "110%" },
        {
          y: "0%",
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".contact-title",
            start: "top 85%",
          },
        },
      );

      // Scribble Draw
      gsap.fromTo(
        ".contact-scribble path",
        { strokeDashoffset: 600 },
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-title",
            start: "top 80%",
          },
        },
      );

      // Sub-paragraph reveal
      gsap.fromTo(
        ".contact-desc",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-desc",
            start: "top 90%",
          },
        },
      );

      // Buttons row reveal
      gsap.fromTo(
        ".contact-buttons-container",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".contact-buttons-container",
            start: "top 90%",
          },
        },
      );

      // Bottom grid container blocks reveal
      gsap.fromTo(
        ".contact-bottom-item",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".contact-bottom-grid",
            start: "top 85%",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative min-h-screen w-full bg-transparent pt-32 lg:pt-40 pb-10 overflow-hidden border-t border-white/[0.03]"
    >
      {/* Massive Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[120vw] h-[60vw] rounded-[100%] bg-[#0A192F]/20 blur-[150px] mix-blend-screen pointer-events-none z-0" />
      {/* Subtle Grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,transparent_0%,#030712_80%)] opacity-90 pointer-events-none z-0" />
      {/* Floating Decorative Crosses */}
      <div className="absolute top-32 left-[8%] floating-cross pointer-events-none z-0">
        <svg
          className="w-4 h-4 text-primary/15"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <rect x="7" y="0" width="2" height="16" />
          <rect x="0" y="7" width="16" height="2" />
        </svg>
      </div>
      <div className="absolute top-20 right-[12%] floating-cross pointer-events-none z-0">
        <svg
          className="w-3 h-3 text-white/8"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <rect x="7" y="0" width="2" height="16" />
          <rect x="0" y="7" width="16" height="2" />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10 flex flex-col items-center">
        {/* --- TOP: CTA HEADLINE --- */}
        <div className="w-full text-center mb-16 lg:mb-24 flex flex-col items-center">
          <div className="overflow-hidden mb-8">
            <h2 className="contact-title text-6xl md:text-8xl lg:text-[110px] xl:text-[130px] font-black font-montserrat uppercase leading-[0.9] tracking-tighter">
              <span className="inline-block overflow-hidden">
                <span className="contact-title-word inline-block translate-y-[110%] text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  Let's
                </span>
              </span>
              &nbsp;
              <span className="inline-block overflow-hidden">
                <span className="contact-title-word inline-block translate-y-[110%] text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  Build
                </span>
              </span>
              <br />
              <span className="inline-block overflow-hidden">
                <span
                  className="contact-title-word inline-block translate-y-[110%] text-transparent"
                  style={{ WebkitTextStroke: "2px rgba(255,255,255,0.8)" }}
                >
                  What
                </span>
              </span>
              &nbsp;
              <span className="inline-block overflow-hidden">
                <span
                  className="contact-title-word inline-block translate-y-[110%] text-transparent"
                  style={{ WebkitTextStroke: "2px rgba(255,255,255,0.8)" }}
                >
                  People
                </span>
              </span>
              <br />
              <span className="text-primary scribble-underline contact-scribble inline-flex items-center">
                <span className="inline-block overflow-hidden">
                  <span className="contact-title-word inline-block translate-y-[110%] drop-shadow-[0_0_40px_rgba(212,175,55,0.4)]">
                    <Typewriter
                      words={["Remember.", "Share.", "Love.", "Watch."]}
                      textClassName="text-primary"
                      cursorClassName="bg-primary"
                    />
                  </span>
                </span>
                <svg viewBox="0 0 200 10" preserveAspectRatio="none">
                  <path d="M0,5 Q25,0 50,5 T100,5 T150,5 T200,5" />
                </svg>
              </span>
            </h2>
          </div>

          <p className="contact-desc text-gray-400 text-lg lg:text-xl font-medium max-w-2xl mx-auto opacity-0">
            Join the world's most innovative brands. Partner with our creator
            network to engineer your next cultural moment.
          </p>
        </div>
        {/* --- MIDDLE: MAGNETIC BUTTONS --- */}

        {/* --- BOTTOM: FORM & INFO --- */}
        <div className="contact-bottom-grid w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT: FORM (7 cols) */}
          <div className="contact-bottom-item opacity-0 col-span-1 lg:col-span-7 bg-white/[0.02] backdrop-blur-3xl border border-white/[0.05] rounded-[32px] p-8 lg:p-12 relative overflow-hidden">
            {/* Inner form glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-[80px] pointer-events-none" />

            <h3 className="text-3xl font-black text-white mb-8 relative z-10">
              Ready to Scale?
            </h3>

            <div className="App h-[full]">
              <InlineWidget url="https://calendly.com/arnav-famesroot/30min?" />
            </div>
          </div>

          {/* RIGHT: CONTACT INFO (5 cols) */}
          <div className="contact-bottom-item opacity-0 col-span-1 lg:col-span-5 flex flex-col gap-8">
            {/* Info Block */}
            <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/[0.05] rounded-[32px] p-8 lg:p-10 flex flex-col gap-8">
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Location
                </h4>
                <p className="text-xl text-white font-medium">Noida, India</p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Direct Contact
                </h4>
                <a
                  href="mailto:info@famesroot.com"
                  className="text-xl text-white font-medium hover:text-primary transition-colors block"
                >
                  info@famesroot.com
                </a>
                <a
                  href="tel:+919335938216"
                  className="text-xl text-white font-medium hover:text-primary transition-colors block mt-1"
                >
                  +91 9335938216
                </a>
              </div>
            </div>

            {/* Social Links Block */}
            <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/[0.05] rounded-[32px] p-8 lg:p-10 flex flex-col justify-center ">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">
                Social Network
              </h4>
              <div className="flex flex-wrap gap-4">
                {[
                  {
                    name: "Instagram",
                    url: "https://www.instagram.com/famesroot/",
                  },
                  {
                    name: "Facebook",
                    url: "https://www.facebook.com/Famesroot/",
                  },
                  { name: "X", url: "https://x.com/famesroot" },
                  {
                    name: "LinkedIn",
                    url: "https://www.linkedin.com/company/famesroot/",
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-full border border-white/10 text-sm font-medium text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Footer Copyright */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between mt-24 pt-8 border-t border-white/[0.05] text-sm text-gray-600 font-medium z-10 relative">
          <p>© 2026 Famesroot Agency. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
