'use client';

import React, { useState } from 'react';
import { Expand, X } from 'lucide-react';
import Container from './ui/container';
import { AnimatePresence, motion } from 'framer-motion';
import { RevealAnimation } from '@/utils/reveal_animation';

const Cta = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className='py-24'>
            {/* Normal State */}
            {!isExpanded && (
                <RevealAnimation>

                    <div className="relative w-full">
                        <Container>
                            <h2 className="hidden lg:mb-8 font-bold tracking-tight text-xl md:text-3xl pt-16 md:pt-8 pb-4">
                              Annual Exhibitions
                            </h2>
                            <motion.div
                                className="relative overflow-hidden rounded-lg"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                            >
                                <video
                                    className="w-full h-auto object-cover rounded-lg"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                >
                                    <source src="/assets/hero.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>


                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/20 hidden md:flex flex-col justify-end text-white px-6">
                                    <div className="flex items-end justify-end mt-10 mr-4">
                                        <button
                                            onClick={() => setIsExpanded(true)}
                                            className="h-10 w-10 bg-neutral-700 flex items-center justify-center rounded-full border border-orange-400 p-3"
                                            aria-label="Expand video"
                                        >
                                            <Expand size={16} />
                                        </button>
                                    </div>
                                    <div className="ml-4 h-full flex flex-col justify-end pb-4">
                                        <h1 className="text-3xl md:text-3xl font-bold mb-4">
                                            Signature: Style in Motion
                                        </h1>
                                        <p className="text-sm md:text-sm max-w-2xl font-heading">
                                            Discover fashion that flows with you—timeless cuts,<br />
                                            luxurious feel, effortless confidence.
                                        </p>
                                    </div>
                                </div>

                            </motion.div>
                        </Container>
                    </div>
                </RevealAnimation>

            )}

            {/* Fullscreen Mode with Animation */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="relative w-full h-full"
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                        >
                            <video
                                className="w-full h-full object-cover"
                                autoPlay
                                loop
                                muted
                                playsInline
                            >
                                <source src="/assets/hero.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                            {/* Overlay content */}
                            <div className="absolute inset-0 bg-black/60 text-white flex flex-col justify-between px-6 py-8 z-10">
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => setIsExpanded(false)}
                                        className="h-10 w-10 bg-neutral-800 hover:bg-neutral-700 transition-colors flex items-center justify-center rounded-full border border-orange-400 p-3"
                                        aria-label="Exit fullscreen"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="ml-4 pb-6">
                                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                                        Signature: Style in Motion
                                    </h1>
                                    <p className="text-sm md:text-base max-w-2xl font-heading">
                                        Discover fashion that flows with you—timeless cuts,<br />
                                        luxurious feel, effortless confidence.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Cta;
