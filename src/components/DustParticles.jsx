import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function DustParticles() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -300]);

  // Generate lightweight DOM particles for depth (rendered as blurred gold/white dots)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const numParticles = isMobile ? 15 : 40;

  const particles = Array.from({ length: numParticles }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * -20,
    opacity: Math.random() * 0.3 + 0.1,
    color: Math.random() > 0.7 ? '#D4AF37' : '#ffffff' // Occasional warm gold specs
  }));

  return (
    <motion.div 
      ref={containerRef}
      className="fixed inset-0 w-full h-[150vh] pointer-events-none z-[1]"
      style={{ y: yParallax, mixBlendMode: 'screen' }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            opacity: p.opacity,
            filter: 'blur(2px)'
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, 30, -30, 0],
            opacity: [p.opacity, p.opacity * 2, p.opacity]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.div>
  );
}
