'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Expand, X, Search, Crosshair } from 'lucide-react';
import Container from './ui/container';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Cta = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [progress, setProgress] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const curatorRef = useRef<HTMLDivElement>(null);
    const fullscreenContentRef = useRef<HTMLDivElement>(null);

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

            // GSAP Imagine: Dynamic pattern overlay that flows with video progress
            if (curatorRef.current) {
                const interval = 8.33; // 100 / 12 elements
                const count = Math.floor(p / interval);
                const cells = curatorRef.current.children;

                for (let i = 0; i < cells.length; i++) {
                    const opacity = i < count ? 0.3 + (count - i) * 0.05 : 0;
                    const scale = i < count ? 1 + (count - i) * 0.02 : 1;
                    const visibility = i < count ? 'visible' : 'hidden';

                    gsap.to(cells[i], {
                        opacity: i === count - 1 ? 0.8 : opacity,
                        scale: i === count - 1 ? 1.2 : scale,
                        visibility,
                        duration: 0.8,
                        ease: "power2.out",
                        overwrite: true
                    });
                }
            }
        };

        video.addEventListener('timeupdate', updateProgress);
        return () => video.removeEventListener('timeupdate', updateProgress);
    }, []);

    useEffect(() => {
        if (isExpanded) {
            gsap.to(".fullscreen-overlay", {
                clipPath: "circle(100% at 50% 50%)",
                duration: 1.6,
                ease: "power4.inOut",
                display: "flex"
            });
            document.body.style.overflow = "hidden";

            // Staggered intro animation for fullscreen content
            if (fullscreenContentRef.current) {
                gsap.fromTo(fullscreenContentRef.current.children, {
                    opacity: 0,
                    y: 40
                }, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    duration: 1.2,
                    delay: 0.4,
                    ease: "power2.out",
                    overwrite: true
                });
            }
        } else {
            gsap.to(".fullscreen-overlay", {
                clipPath: "circle(0% at 50% 50%)",
                duration: 1.2,
                ease: "power4.inOut",
                display: "none"
            });
            document.body.style.overflow = "auto";
        }
    }, [isExpanded]);

    return (
        <section ref={containerRef} className='py-48 bg-neutral-50 relative overflow-hidden'>

            <Container>
                <div className="relative group">
                    {/* Header: Studio Notes */}
                    <div className="flex justify-between items-end mb-12 border-b border-black/5 pb-8">
                        <div className="space-y-4">
                            <h2 className="text-6xl md:text-8xl font-serif font-light tracking-tighter text-black leading-none">
                                Unfolding <br /> <span className="italic text-neutral-200 ml-12">Forms.</span>
                            </h2>
                        </div>
                    </div>
                    {/* CURATED VIDEO DECK */}
                    <div className="relative aspect-[21/9] overflow-hidden bg-white border border-neutral-100">
                        <video ref={videoRef} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out" loop muted playsInline>
                            <source src="/assets/hero.mp4" type="video/mp4" />
                        </video>

                        {/* DATA HUD OVERLAY */}
                        <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12 pointer-events-none">

                            {/* Top HUD: Status Indicators */}
                            <div className="flex justify-end items-start">
                                <button onClick={() => setIsExpanded(true)} className="size-12 border border-neutral-100 backdrop-blur-sm text-neutral-600 flex items-center justify-center hover:border-neutral-300 hover:text-black transition-colors pointer-events-auto">
                                    <Expand size={16} strokeWidth={1} />
                                </button>
                            </div>

                            {/* BOTTOM HUD: Dynamic Curator Grid */}
                            <div className="w-full flex justify-between items-end gap-12">
                                <div className="flex flex-col gap-1 w-full max-w-sm pointer-events-auto">
                                    <span className="text-[7px] font-mono text-neutral-400 tracking-[0.4em] uppercase">Studio_Notes: Texture_Study</span>
                                    <p className="text-xl font-serif text-black italic">A subtle interplay of form and function.</p>
                                    <p className="text-xs text-neutral-400">Our curated study on the art of comfort.</p>
                                </div>
                                <div ref={curatorRef} className="flex gap-0.5 pointer-events-auto">
                                    {[...Array(12)].map((_, i) => (
                                        <div key={i} className="h-6 w-3 border-2 border-dashed border-neutral-100/5 opacity-0 invisible" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            {/* FULLSCREEN OVERLAY (CYBER-TECH) */}
            <div className="fullscreen-overlay fixed inset-0 z-[100] bg-white hidden flex-col items-center justify-center">
                <button onClick={() => setIsExpanded(false)} className="absolute top-10 right-10 z-[110] text-neutral-400 hover:text-black transition-colors flex items-center gap-4 uppercase font-mono text-[9px] tracking-[0.5em]">
                    Close Study <X size={24} strokeWidth={1} />
                </button>

                <video className="w-full h-full object-cover opacity-10" autoPlay loop muted playsInline>
                    <source src="/assets/hero.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                    <div ref={fullscreenContentRef} className="max-w-5xl space-y-16">
                        <div className="flex flex-col items-center gap-4">
                            <Crosshair size={20} className="text-neutral-200" />
                            <div className="h-px w-32 bg-neutral-100" />
                        </div>
                        <h1 className="text-6xl md:text-9xl font-serif text-black leading-[0.8] tracking-tighter">
                            Uncharted <br /> <span className="italic text-neutral-300 ml-16">Comfort.</span>
                        </h1>
                        <button className="relative px-12 py-5 group overflow-hidden">
                            <div className="absolute inset-0 bg-neutral-50/5 border border-neutral-100 group-hover:border-neutral-300 transition-all duration-700" />
                            <span className="relative z-10 text-neutral-600 text-xs tracking-[0.5em] uppercase group-hover:text-black transition-colors">EXPLORE THE CURATION</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cta;