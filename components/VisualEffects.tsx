import React, { useEffect, useState, useRef } from 'react';
import { RevealProps } from '../types.ts';

// --- Custom Cursor ---
export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    // Check for clickable elements to trigger hover state
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-[9999] hidden md:block mix-blend-screen"
      style={{
        left: position.x,
        top: position.y,
        transform: `translate(-50%, -50%)`,
      }}
    >
      {/* Main Cursor Dot */}
      <div 
        className={`rounded-full bg-gold transition-all duration-300 ease-out border border-white/50
          ${isHovering ? 'w-12 h-12 opacity-40 bg-purple-600' : 'w-4 h-4 bg-[#FFD700] shadow-[0_0_15px_#FFD700]'}`}
      />
      
      {/* Trailing Particle (Simulated with simple delay in perception or CSS) */}
      <div 
         className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400 opacity-30 transition-all duration-500
          ${isHovering ? 'w-16 h-16 animate-spin' : 'w-8 h-8'}`}
      />
    </div>
  );
};

// --- Scroll Reveal ---
export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, className = "", effect = 'fade-up' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const getEffectClass = () => {
    switch(effect) {
      case 'slide-right':
        return isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12';
      case 'scale':
        return isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90';
      case 'fade-up':
      default:
        return isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm';
    }
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${getEffectClass()} ${className}`}
    >
      {children}
    </div>
  );
};

// --- Sacred Geometry (Mandala Background) ---
export const SacredGeometry: React.FC = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vh] h-[120vh] opacity-[0.05] pointer-events-none z-0">
       {/* Simple SVG representation of sacred geometry - Flower of Life approximation */}
       <svg viewBox="0 0 100 100" className="w-full h-full mandala-spin stroke-[#FFD700] fill-none stroke-[0.2]">
         <circle cx="50" cy="50" r="48" />
         <circle cx="50" cy="50" r="30" />
         <circle cx="50" cy="50" r="15" />
         {[0, 60, 120, 180, 240, 300].map(deg => (
           <g key={deg} transform={`rotate(${deg} 50 50)`}>
             <circle cx="50" cy="25" r="25" />
             <circle cx="50" cy="25" r="12" />
           </g>
         ))}
       </svg>
    </div>
  );
};

// --- Portal Button ---
export const PortalButton: React.FC<{ children: React.ReactNode; onClick?: () => void; className?: string }> = ({ children, onClick, className = '' }) => {
  return (
    <button 
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center px-10 py-5 font-cinzel font-bold text-white uppercase tracking-widest transition-all duration-300 ${className}`}
    >
      {/* Background with Gradient */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Glowing Border */}
      <div className="absolute inset-0 rounded-full border-2 border-[#FFD700] opacity-50 blur-[2px] group-hover:blur-[4px] transition-all duration-300" />
      <div className="absolute inset-0 rounded-full border border-[#FFD700] group-hover:scale-105 transition-transform duration-300" />

      {/* Ripple Effect Container */}
      <div className="absolute -inset-4 rounded-full border border-[#FFD700]/20 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700 animate-pulse" />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-3 text-lg drop-shadow-[0_0_10px_rgba(255,215,0,0.8)] group-hover:text-[#FFD700] transition-colors">
        {children}
      </span>
    </button>
  );
}