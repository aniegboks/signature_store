// svg_path_loader.tsx
'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const PageLoader = ({ onFinished }: { onFinished?: () => void }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        if (onFinished) onFinished();
      }
    });

    // Elegant typography reveal
    gsap.set('.char', { y: 100, opacity: 0 });
    gsap.set(overlayRef.current, { scaleY: 1 });

    tl.to('.char', {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.05,
      ease: "power4.out"
    })
      // Hold the text
      .to({}, { duration: 0.8 })
      // Fade text out slightly
      .to('.char', {
        opacity: 0,
        y: -50,
        duration: 0.8,
        stagger: 0.02,
        ease: "power3.in"
      })
      .to(overlayRef.current, {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.2,
        ease: "expo.inOut"
      }, "-=0.4")
      .set(wrapperRef.current, { display: 'none' });

    return () => { tl.kill(); };
  }, [onFinished]);

  // Split text for animation
  const text = "STUDIO".split("");

  return (
    <div ref={wrapperRef} className="fixed inset-0 z-500 pointer-events-none flex items-center justify-center">
      {/* Solid background that animates away */}
      <div ref={overlayRef} className="absolute inset-0 bg-white will-change-transform" />

      <div ref={textRef} className="relative z-10 overflow-hidden flex font-heading text-[#1A1A1A] text-6xl md:text-8xl tracking-widest font-light">
        {text.map((char, i) => (
          <span key={i} className="char inline-block will-change-transform">
            {char}
          </span>
        ))}
      </div>

      {/* Subtle branding/loading text */}
      <div className="absolute bottom-12 text-[#2C2B29]/40 text-[9px] uppercase tracking-[0.3em] font-sans font-medium char">
        Curating Collection...
      </div>
    </div>
  );
};