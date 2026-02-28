'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CursorFollower = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    const context = contextRef.current;
    if (!ring || !dot || !context) return;

    gsap.set([ring, dot], { xPercent: -50, yPercent: -50 });

    const xDotTo = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3.out" });
    const yDotTo = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3.out" });
    const xRingTo = gsap.quickTo(ring, "x", { duration: 0.8, ease: "power3.out" });
    const yRingTo = gsap.quickTo(ring, "y", { duration: 0.8, ease: "power3.out" });

    const moveCursor = (e: MouseEvent) => {
      xDotTo(e.clientX);
      yDotTo(e.clientY);
      xRingTo(e.clientX);
      yRingTo(e.clientY);
    };

    const handleInteraction = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [data-cursor="hover"]');
      const isProduct = target.closest('[data-cursor="product"]');

      if (isInteractive) {
        gsap.to(ring, { 
          scale: 1.4, 
          borderColor: "rgba(255,255,255,0.8)",
          backgroundColor: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(2px)",
          duration: 0.4,
          ease: "expo.out"
        });
        gsap.to(dot, { scale: 0, duration: 0.3 });
      } else {
        gsap.to(ring, { 
          scale: 1, 
          borderColor: "rgba(255,255,255,0.25)",
          backgroundColor: "transparent",
          backdropFilter: "blur(0px)",
          duration: 0.4,
          ease: "expo.out"
        });
        gsap.to(dot, { scale: 1, duration: 0.3 });
      }
      
      if (isProduct) {
        gsap.to(context, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.5)" });
      } else {
        gsap.to(context, { opacity: 0, scale: 0.8, duration: 0.3 });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleInteraction);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleInteraction);
    };
  }, []);

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          body { cursor: none !important; }
        }
        .cursor-ring {
          position: fixed; top: 0; left: 0; width: 36px; height: 36px;
          border-radius: 50%; border: 1px solid rgba(255,255,255,0.25);
          pointer-events: none; z-index: 99999; mix-blend-mode: difference;
          display: flex; align-items: center; justify-content: center;
          will-change: transform;
        }
        .cursor-dot {
          position: fixed; top: 0; left: 0; width: 4px; height: 4px;
          background: white; border-radius: 50%; pointer-events: none;
          z-index: 100000; mix-blend-mode: difference; will-change: transform;
        }
      `}</style>

      <div ref={ringRef} className="cursor-ring">
        <span ref={contextRef} className="font-sans text-[8px] tracking-[0.2em] text-white uppercase opacity-0 font-medium absolute">
          View
        </span>
      </div>
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
};