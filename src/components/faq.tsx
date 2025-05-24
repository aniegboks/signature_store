'use client';

import React, { useState } from 'react';
import Container from './ui/container';
import Image from 'next/image';
import { ALL_FAQ_QUERYResult } from '../../sanity.types';
import { imageUrl } from '@/lib/imageUrl';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { RevealAnimation } from '@/utils/reveal_animation';

type FaqProps = {
    allFaq: ALL_FAQ_QUERYResult;
};

const Faq = ({ allFaq }: FaqProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="py-24">
            <RevealAnimation>
                <Container>
                    <div className="grid gap-6">
                        {allFaq.map((faqData) => {
                            const img = faqData.image?.asset ? imageUrl(faqData.image).url() : null;
                            return (
                                <div
                                    key={faqData._id}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 w-full md:h-[400px]"
                                >
                                    {/* Left Image */}
                                    {img && (
                                        <div className="relative w-full h-[300px] md:h-full rounded-md overflow-hidden">
                                            <Image
                                                src={img}
                                                alt={faqData.image?.alt || 'FAQ image'}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}

                                    {/* Right Q&A */}
                                    <div className="flex flex-col justify-start h-[300px] md:h-full">
                                        <h2 className="mb-8 font-bold tracking-tight text-xl md:text-3xl">
                                            Frequently asked
                                        </h2>
                                        {faqData.items?.map((item, i) => {
                                            const isOpen = openIndex === i;

                                            return (
                                                <div key={item._key} className="mb-4">
                                                    {/* Toggle Button */}
                                                    <button
                                                        onClick={() => setOpenIndex(isOpen ? null : i)}
                                                        className="w-full text-left focus:outline-none"
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center">
                                                                <span className="h-10 w-10 font-bold rounded-full bg-neutral-600 flex items-center justify-center mr-4 text-white">
                                                                    {i + 1}
                                                                </span>
                                                                <h3 className="text-xl font-semibold">{item.question}</h3>
                                                            </div>
                                                            <ChevronDown
                                                                className={`text-neutral-700 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                                                                    }`}
                                                                size={18}
                                                            />
                                                        </div>
                                                    </button>

                                                    {/* Animated Answer */}
                                                    <AnimatePresence initial={false}>
                                                        {isOpen && (
                                                            <motion.div
                                                                initial={{ opacity: 0, height: 0 }}
                                                                animate={{ opacity: 1, height: 'auto' }}
                                                                exit={{ opacity: 0, height: 0 }}
                                                                transition={{ duration: 0.3 }}
                                                                className="overflow-hidden"
                                                            >
                                                                <p className="text-gray-700 mt-4 font-heading">{item.answer}</p>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>

                                                    <hr className="my-4 border-neutral-300" />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Container>
            </RevealAnimation>

        </div>
    );
};

export default Faq;
