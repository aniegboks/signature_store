import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const letterDelay = 0.025;
const fadeDuration = 0.125;
const fadeDelay = 5;
const swapDelay = 2000;

const TypeAnimation = () => {
    const wordAnimation = ["Incredible", "Outstanding", "Remarkable", "Phenomenal", "Extraordinary"];
    const [animationIndex, setAnimationIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setAnimationIndex((prev) => (prev + 1) % wordAnimation.length);
        }, swapDelay);

        return () => clearInterval(intervalId);
    }, [wordAnimation.length]);

    const currentWord = wordAnimation[animationIndex];

    return (
        <span className="">
            {currentWord.split('').map((letter, i) => (
                <motion.span
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0, }}
                    transition={{ delay: fadeDelay, duration: fadeDuration, ease: 'easeInOut' }}
                    key={`${animationIndex}-${i}`}
                    className="relative">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, }}
                        transition={{ delay: i * letterDelay, duration: 0 }}
                        className="bg-gradient-to-r from-orange-300 to-orange-400 bg-clip-text text-transparent">
                        {letter}
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ times: [0, 0.1, 1], delay: i * letterDelay, duration: fadeDuration, ease: 'easeInOut' }}
                        className="absolute bottom-[3px] left-[1px] right-0 top-[3px] bg-gradient-to-r from-orange-300 to-orange-400" />
                </motion.span>
            ))}
        </span>
    );
};

export default TypeAnimation;

