'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const PageLoader = ({ onFinished }: { onFinished?: () => void }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const gaugeRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        if (onFinished) onFinished();
      }
    });

    gsap.set('.speed-element', { opacity: 0, y: 20 });
    // Circumference for r=80 is ~502
    gsap.set(gaugeRef.current, { strokeDasharray: 502, strokeDashoffset: 502 });

    tl.to('.speed-element', {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.1,
      ease: "expo.out"
    })
    .to({ v: 0 }, {
      v: 100,
      duration: 2.8,
      ease: "power4.inOut",
      onUpdate() {
        const n = Math.round((this as any).targets()[0].v);
        if (counterRef.current) counterRef.current.textContent = n.toString().padStart(3, '0');
        if (gaugeRef.current) {
          const offset = 502 - (n / 100) * 502;
          gsap.set(gaugeRef.current, { strokeDashoffset: offset });
        }
      }
    })
    .to(wrapperRef.current, {
      opacity: 0,
      scale: 1.1,
      filter: "blur(30px)",
      duration: 1.2,
      ease: "power4.inOut"
    })
    .set(wrapperRef.current, { display: 'none' });

    return () => { tl.kill(); };
  }, [onFinished]);

  return (
    <div ref={wrapperRef} className="fixed inset-0 z-[500] bg-[#050505] flex items-center justify-center font-mono">
      <div className="relative flex flex-col items-center justify-center">
        {/* LARGE SPEEDOMETER RING */}
        <svg className="w-[350px] h-[350px] md:w-[450px] md:h-[450px] -rotate-90 speed-element">
          <circle cx="50%" cy="50%" r="80" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <circle 
            ref={gaugeRef}
            cx="50%" cy="50%" r="80" 
            fill="none" 
            stroke="#f97316" 
            strokeWidth="3" 
            strokeLinecap="butt"
          />
        </svg>

        {/* CENTER TELEMETRY */}
        <div className="absolute inset-0 flex flex-col items-center justify-center speed-element pt-4">
          <span className="text-[10px] text-white/20 tracking-[0.8em] mb-2 uppercase font-bold">Velocity_Index</span>
          <div className="flex items-baseline">
            <span ref={counterRef} className="text-8xl md:text-9xl font-light text-white tracking-tighter italic">000</span>
            <span className="text-orange-500 text-sm font-bold ml-2">V_MAX</span>
          </div>
          <div className="mt-6 flex flex-col items-center gap-1">
             <div className="w-12 h-px bg-white/20" />
             <span className="text-[8px] text-white/40 tracking-[0.4em] uppercase">System_Ignition_Sequence</span>
          </div>
        </div>
      </div>
    </div>
  );
};