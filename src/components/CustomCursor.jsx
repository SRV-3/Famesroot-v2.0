import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;

    if (!dot || !ring || !glow) return;

    // Check if the device has a mouse/pointer
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasPointer) {
      dot.style.display = 'none';
      ring.style.display = 'none';
      glow.style.display = 'none';
      return;
    }

    // Set initial offsets
    gsap.set(dot, { xPercent: -50, yPercent: -50, x: window.innerWidth / 2, y: window.innerHeight / 2 });
    gsap.set(ring, { xPercent: -50, yPercent: -50, x: window.innerWidth / 2, y: window.innerHeight / 2 });
    gsap.set(glow, { xPercent: -50, yPercent: -50, x: window.innerWidth / 2, y: window.innerHeight / 2 });

    const xToDot = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3" });
    const xToRing = gsap.quickTo(ring, "x", { duration: 0.25, ease: "power3" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.25, ease: "power3" });
    const xToGlow = gsap.quickTo(glow, "x", { duration: 0.8, ease: "power2" });
    const yToGlow = gsap.quickTo(glow, "y", { duration: 0.8, ease: "power2" });

    let isHovering = false;

    const onMouseMove = (e) => {
      // Make sure elements are visible once the mouse moves
      if (dot.style.opacity === '0') {
        gsap.to([dot, ring, glow], { opacity: 1, duration: 0.2 });
      }
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
      xToGlow(e.clientX);
      yToGlow(e.clientY);
    };

    // Hide cursor initially until mouse moves
    gsap.set([dot, ring, glow], { opacity: 0 });
    window.addEventListener("mousemove", onMouseMove);

    // Hover states for interactive elements
    const handleMouseEnter = () => {
      isHovering = true;
      gsap.to(ring, { 
        scale: 1.6, 
        borderColor: '#D4AF37', 
        backgroundColor: 'rgba(212, 175, 55, 0.08)', 
        borderWidth: '1.5px',
        boxShadow: '0 0 15px rgba(212, 175, 55, 0.4)',
        duration: 0.3 
      });
      gsap.to(dot, { 
        scale: 0.5, 
        backgroundColor: '#D4AF37', 
        duration: 0.3 
      });
      gsap.to(glow, {
        scale: 1.5,
        opacity: 0.8,
        duration: 0.4
      });
    };

    const handleMouseLeave = () => {
      isHovering = false;
      gsap.to(ring, { 
        scale: 1, 
        borderColor: '#ffffff', 
        backgroundColor: 'transparent', 
        borderWidth: '1px',
        boxShadow: '0 0 0px rgba(212, 175, 55, 0)',
        duration: 0.3 
      });
      gsap.to(dot, { 
        scale: 1, 
        backgroundColor: '#ffffff', 
        duration: 0.3 
      });
      gsap.to(glow, {
        scale: 1,
        opacity: 0.5,
        duration: 0.4
      });
    };

    // Attach event listeners to all interactive elements
    const addHoverListeners = () => {
      const interactives = document.querySelectorAll('a, button, input, select, textarea, [role="button"], .cursor-pointer');
      interactives.forEach(el => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    // Initial attachment
    addHoverListeners();

    // Since React can render/mount new interactive elements dynamically,
    // we use a MutationObserver to attach listeners to newly created nodes.
    const observer = new MutationObserver(() => {
      addHoverListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
      const interactives = document.querySelectorAll('a, button, input, select, textarea, [role="button"], .cursor-pointer');
      interactives.forEach(el => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Ambient Glow */}
      <div
        ref={glowRef}
        className="custom-cursor-element fixed top-0 left-0 w-[40vw] h-[40vw] rounded-full pointer-events-none z-[0] mix-blend-screen opacity-50"
        style={{ 
          background: 'radial-gradient(circle, rgba(96,0,0,0.15) 0%, transparent 60%)',
          willChange: 'transform' 
        }}
      />
      {/* Custom Cursor Ring */}
      <div
        ref={ringRef}
        className="custom-cursor-element fixed top-0 left-0 w-8 h-8 rounded-full border border-white pointer-events-none z-[100000] mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
      {/* Custom Cursor Dot */}
      <div
        ref={dotRef}
        className="custom-cursor-element fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white pointer-events-none z-[100001] mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
