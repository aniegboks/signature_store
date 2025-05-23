'use client';

import React, { useRef, useState } from 'react';
import Container from './container';
import { ALL_POPULAR_PRODUCTS_QUERYResult } from '../../../sanity.types';
import PopularProducts from './popular_products';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { RevealAnimation } from '@/utils/reveal_animation';

type PopularGridProps = {
    popularProducts: ALL_POPULAR_PRODUCTS_QUERYResult;
};

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const PopularGrid: React.FC<PopularGridProps> = ({ popularProducts }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const controls = useAnimation();

    const handleAnimateSwipe = async (direction: 'left' | 'right') => {
        await controls.start({
            x: direction === 'left' ? -15 : 15,
            transition: { type: 'spring', stiffness: 300, damping: 20 },
        });
        controls.start({ x: 0 });
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.offsetWidth * 0.8;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
            handleAnimateSwipe(direction);
        }
    };

    // Swipe touch handlers
    const [touchStartX, setTouchStartX] = useState<number | null>(null);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX === null) return;
        const touchEndX = e.changedTouches[0].clientX;
        const deltaX = touchEndX - touchStartX;

        if (Math.abs(deltaX) > 50) {
            const direction = deltaX > 0 ? 'left' : 'right';
            scroll(direction);
        }

        setTouchStartX(null);
    };

    return (
        <RevealAnimation>
            <motion.section
                className="my-24 py-8"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
            >
                <Container>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-xl md:text-2xl">Popular Products</h3>
                        <div className="hidden lg:flex gap-4">
                            <motion.button
                                type="button"
                                onClick={() => scroll('left')}
                                className="h-10 w-10 flex items-center justify-center rounded-full border border-neutral-300 hover:bg-neutral-100 transition"
                                aria-label="Scroll left"
                                whileTap={{ scale: 0.9 }}
                            >
                                <ChevronLeft size={18} className="text-neutral-700" />
                            </motion.button>
                            <motion.button
                                type="button"
                                onClick={() => scroll('right')}
                                className="h-10 w-10 flex items-center justify-center rounded-full border border-neutral-300 hover:bg-neutral-100 transition"
                                aria-label="Scroll right"
                                whileTap={{ scale: 0.9 }}
                            >
                                <ChevronRight size={18} className="text-neutral-700" />
                            </motion.button>
                        </div>
                    </div>

                    <motion.div
                        ref={scrollRef}
                        className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide -mx-4 px-4"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        animate={controls}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        {popularProducts?.map((popularProduct) => (
                            <motion.div
                                key={popularProduct._id}
                                variants={cardVariants}
                                className="min-w-[80%] sm:min-w-[45%] lg:min-w-[22%] flex-shrink-0"
                            >
                                <PopularProducts popularProduct={popularProduct} />
                            </motion.div>
                        ))}
                    </motion.div>
                </Container>
            </motion.section>
        </RevealAnimation>
    );
};

export default PopularGrid;
