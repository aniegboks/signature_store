"use client"
import React, { useState } from 'react';
//import { features } from '../constants';
//import { temp1, temp2, temp3 } from '../utils';
import Card from './ui/card';
import Container from './ui/container';
//import Display from './ui/display';
import Collections from './ui/collections';
import Pointer from './ui/pointer';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import TypeAnimation from './ui/type_animation';

import { ALL_TESTIMONIALS_QUERYResult } from '../../sanity.types';
import { RevealAnimation } from '@/utils/reveal_animation';

type FeaturesSectionProps = {
    featuresSection: ALL_TESTIMONIALS_QUERYResult
}

const FeaturesSection = () => {

    const [isHovered, setIsHovered] = useState(false);
    const [isCardHovered, setIsCardHovered] = useState(false);
    const [isTemplated, setIsTemplated] = useState(false);

    return (
        <section className="my-16">
            <RevealAnimation>
                <Container>

                    {/* Features card section */}
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        {/* Card 1 */}

                        <div className='relative'
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <Card
                                title="Endorsement"
                                className="col-span-1 lg:col-span-1 group font-heading"
                                description="Signature has over 2 years in the fashion industry"
                            >
                                <Collections />
                                <div>
                                    {isHovered && (
                                        <>
                                            <motion.div
                                                initial={{ x: 0, y: 0 }}
                                                animate={{
                                                    x: [-240, -60],
                                                    y: [24, 48, 24, 0],
                                                    transition: { duration: 0.9, ease: "easeInOut" },
                                                }}
                                                className="absolute top-40 left-48"
                                            >
                                                <Pointer name="angela" color="alternate" />
                                            </motion.div>

                                            <motion.div
                                                initial={{ x: 0, y: 0 }}
                                                animate={{
                                                    x: [0, 0, 100, 0],
                                                    y: [0, -200, -24, 48, 60],
                                                    rotate: [0, 15, -15, 0],
                                                    transition: { duration: 2, ease: "easeInOut", delay: 0.3 },
                                                }}
                                                className="absolute top-40 left-48"
                                            >
                                                <Pointer name="mia" color="primary" />
                                            </motion.div>

                                            <motion.div
                                                initial={{ x: 0, y: 0 }}
                                                animate={{
                                                    x: [50, -30, 50],
                                                    y: [0, -200, 50],
                                                    scale: [1, 1.2, 1],
                                                    transition: { duration: 1.2, ease: "easeInOut", delay: 0.6 },
                                                }}
                                                className="absolute top-40 left-48"
                                            >
                                                <Pointer name="anita" color="secondary" />
                                            </motion.div>
                                        </>
                                    )}
                                </div>
                            </Card>
                        </div>


                        {/* Card 2 */}
                        <div
                            onMouseEnter={() => setIsCardHovered(true)}
                            onMouseLeave={() => setIsCardHovered(false)}
                        >
                            {/* typing animation */}
                            <Card
                                title="Emergence"
                                className="col-span-1 lg:col-span-1 font-heading"
                                description="Signature has expanded over the years into an appreal titan"
                            >
                                <div className="aspect-video flex items-center justify-center relative">
                                    <div
                                        className="text-2xl font-extrabold text-neutral-700  text-center">

                                        Celebrating{" "}
                                        <span>
                                            {isCardHovered ? (
                                                <TypeAnimation />

                                            ) :
                                                (
                                                    <span className='bg-gradient-to-r from-orange-300 to-orange-400 bg-clip-text text-transparent'>
                                                        Exceptional
                                                    </span>
                                                )
                                            }
                                        </span>
                                        {" "}
                                        Growth This Year
                                    </div>
                                </div>
                            </Card>

                        </div>
                        {/* Card 3 */}
                    </div>
                </Container>
            </RevealAnimation>
        </section >
    );
};

export default FeaturesSection;