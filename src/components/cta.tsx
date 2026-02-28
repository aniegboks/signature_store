'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Expand, X, Gauge, Zap, Crosshair } from 'lucide-react';
import Container from './ui/container';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Cta = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [progress, setProgress] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            onEnter: () => video.play(),
            onLeave: () => video.pause(),
        });

        const updateProgress = () => {
            const p = (video.currentTime / video.duration) * 100;
            setProgress(p);
        };

        video.addEventListener('timeupdate', updateProgress);
        return () => video.removeEventListener('timeupdate', updateProgress);
    }, []);

    useEffect(() => {
        if (isExpanded) {
            gsap.to(".fullscreen-overlay", {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: 1.2,
                ease: "expo.inOut",
                display: "flex"
            });
            document.body.style.overflow = "hidden";
        } else {
            gsap.to(".fullscreen-overlay", {
                clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
                duration: 0.8,
                ease: "power4.inOut",
                display: "none"
            });
            document.body.style.overflow = "auto";
        }
    }, [isExpanded]);

    return (
        <section ref={containerRef} className='py-48 bg-[#fcfcfc] relative overflow-hidden'>
            
            {/* HUD Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

            <Container>
                <div className="relative group">
                    {/* Header Calibration */}
                    <div className="flex justify-between items-end mb-12 border-b border-black/5 pb-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Crosshair size={14} className="text-orange-500 animate-pulse" />
                                <span className="text-[10px] font-mono tracking-[0.6em] text-black/30 uppercase">Telemetry_System_Active</span>
                            </div>
                            <h2 className="text-6xl md:text-8xl font-serif font-light tracking-tighter text-black leading-none">
                                Kinetic <br /> <span className="italic text-neutral-200 ml-12">Flow_v2.</span>
                            </h2>
                        </div>
                    </div>

                    {/* FUTURISTIC VIDEO DECK */}
                    <div className="relative aspect-[21/9] overflow-hidden bg-black shadow-2xl">
                        <video ref={videoRef} className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[2s] ease-out" loop muted playsInline>
                            <source src="/assets/hero.mp4" type="video/mp4" />
                        </video>

                        {/* DATA HUD OVERLAY */}
                        <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12 pointer-events-none">
                            
                            {/* Top HUD: Status Indicators */}
                            <div className="flex justify-between items-start">
                                <div className="flex gap-8">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[7px] font-mono text-white/30 tracking-[0.4em] uppercase">Engine_Load</span>
                                        <div className="flex gap-0.5">
                                            {[...Array(12)].map((_, i) => (
                                                <div key={i} className={`h-3 w-1 ${progress > (i * 8) ? 'bg-orange-500' : 'bg-white/10'}`} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[7px] font-mono text-white/30 tracking-[0.4em] uppercase">Core_Temp</span>
                                        <span className="text-[10px] font-mono text-white">STABLE_32°C</span>
                                    </div>
                                </div>
                                <button onClick={() => setIsExpanded(true)} className="size-14 border border-white/10 backdrop-blur-xl text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 pointer-events-auto">
                                    <Expand size={18} strokeWidth={1} />
                                </button>
                            </div>

                            {/* BOTTOM HUD: THE FUTURISTIC SPEEDOMETER */}
                            <div className="w-full max-w-2xl space-y-4">
                                <div className="flex justify-between items-end mb-[-10px]">
                                    <span className="text-[10px] font-mono text-white/40 tracking-[0.5em] uppercase italic">Velocity_Vector</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-serif italic text-white leading-none">{Math.round(progress)}</span>
                                        <span className="text-[10px] font-mono text-orange-500 font-bold uppercase">Pct</span>
                                    </div>
                                </div>
                                
                                {/* Linear Gauge Arch */}
                                <div className="relative h-1 w-full bg-white/10 overflow-hidden">
                                    <div 
                                        className="absolute top-0 left-0 h-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.8)] transition-all duration-300 ease-linear"
                                        style={{ width: `${progress}%` }}
                                    />
                                    {/* Tick Overlays */}
                                    <div className="absolute inset-0 flex justify-between px-1">
                                        {[...Array(20)].map((_, i) => (
                                            <div key={i} className="h-full w-[1px] bg-black/40" />
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center text-[7px] font-mono text-white/20 tracking-[0.8em] uppercase">
                                    <span>Neutral</span>
                                    <span>Drive</span>
                                    <span className={progress > 90 ? "text-orange-500 animate-pulse" : ""}>Overdrive</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            {/* FULLSCREEN OVERLAY (CYBER-TECH) */}
            <div className="fullscreen-overlay fixed inset-0 z-[100] bg-[#0a0a0a] hidden flex-col items-center justify-center">
                <button onClick={() => setIsExpanded(false)} className="absolute top-10 right-10 z-[110] text-white/20 hover:text-orange-500 transition-colors flex items-center gap-4 uppercase font-mono text-[9px] tracking-[0.5em]">
                    Terminate_Feed <X size={24} strokeWidth={1} />
                </button>
                
                <video className="w-full h-full object-cover opacity-30 brightness-50" autoPlay loop muted playsInline>
                    <source src="/assets/hero.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                    <div className="max-w-5xl space-y-16">
                        <div className="flex flex-col items-center gap-4">
                            <Zap size={20} className="text-orange-500" />
                            <div className="h-px w-32 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
                        </div>
                        <h1 className="text-8xl md:text-[14rem] font-serif italic text-white leading-[0.7] tracking-tighter">
                            Pure <br /> <span className="text-transparent border-t border-b border-white/10 px-8">Logic.</span>
                        </h1>
                        <button className="relative px-20 py-8 group overflow-hidden">
                            <div className="absolute inset-0 bg-white/5 border border-white/10 group-hover:bg-orange-500 transition-all duration-700" />
                            <span className="relative z-10 text-white text-[10px] tracking-[1em] uppercase group-hover:text-black transition-colors">Initiate_Sequence</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cta;