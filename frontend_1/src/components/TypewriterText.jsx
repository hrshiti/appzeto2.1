import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TypewriterText = ({ phrases }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        }, 3000); // Change text every 3 seconds

        return () => clearInterval(interval);
    }, [phrases]);

    // Use the longest phrase to reserve space and prevent layout shifts
    const longestPhrase = phrases.reduce((a, b) => a.length > b.length ? a : b, "");

    return (
        <span className="inline-grid w-full">
            {/* Invisible spacer to maintaining consistent dimensions */}
            <span aria-hidden="true" className="opacity-0 pointer-events-none col-start-1 row-start-1 pb-1">
                {longestPhrase}
            </span>

            {/* Animated Text Layer */}
            <div className="col-start-1 row-start-1 z-10 w-full">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="block text-primary"
                    >
                        {phrases[index]}
                    </motion.span>
                </AnimatePresence>
            </div>
        </span>
    );
};

export default TypewriterText;
