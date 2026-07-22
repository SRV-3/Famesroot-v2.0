import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

import { PopupWidget } from "react-calendly";
import CalendlyButton from "./CalendlyButton.jsx";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Creators", href: "#network" },
  { name: "Work", href: "#work" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar({ isLoading }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Magnetic Button Logic
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } =
      buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.3;
    const y = (e.clientY - top - height / 2) * 0.3;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={isLoading ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-transparent ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-white/5 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 max-w-7xl flex items-center justify-between">
          {/* Logo */}
          <div className="relative group cursor-pointer">
            <span className="font-montserrat font-black text-2xl tracking-tighter text-white">
              FAMESROOT
            </span>
            <span className="absolute -right-2 top-0 text-primary font-bold">
              .
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-sm font-medium tracking-widest uppercase text-gray-300 hover:text-white transition-colors group"
              >
                {link.name}
                <span className="absolute left-0 bottom-[-4px] w-full h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
              </a>
            ))}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            {/* Magnetic CTA (Desktop) */}
            <motion.a
              href="#contact"
              ref={buttonRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{ x: position.x, y: position.y }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 15,
                mass: 0.1,
              }}
              className="hidden md:block relative group overflow-hidden px-7 py-3 bg-white text-black font-bold uppercase tracking-widest text-[11px] rounded-sm transition-shadow duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                <CalendlyButton />
              </span>
              <div className="absolute inset-0 h-full w-full bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-0"></div>
            </motion.a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-white p-2"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-2xl flex flex-col justify-center items-center"
          >
            {/* Ambient Mobile Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-primary/20 blur-[100px] pointer-events-none" />

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-2 text-white hover:text-primary transition-colors"
            >
              <X size={32} />
            </button>

            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.2 },
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 },
                },
              }}
              className="flex flex-col items-center gap-8 z-10"
            >
              {NAV_LINKS.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  variants={{
                    open: { y: 0, opacity: 1, filter: "blur(0px)" },
                    closed: { y: 40, opacity: 0, filter: "blur(10px)" },
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl font-black font-montserrat uppercase tracking-tighter text-white hover:text-primary transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}

              <motion.a
                onClick={() => setIsMobileMenuOpen(false)}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 px-10 py-5 bg-primary text-white font-bold uppercase tracking-widest text-sm rounded-sm shadow-[0_0_40px_rgba(255,0,0,0.4)]"
              ></motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
