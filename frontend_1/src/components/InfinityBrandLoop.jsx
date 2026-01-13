import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Option 7: Tiled Grid with Shuffle Animation
 * This component displays a grid of logos that periodically shuffle their positions
 * with smooth layout transitions using framer-motion.
 */
const InfinityBrandLoop = ({
    logos = [],
    rows = 1,
    cols = 6,
    interval = 4000,
    title = "Trusted by Global Brands"
}) => {
    const [displayLogos, setDisplayLogos] = useState([]);
    const [isPaused, setIsPaused] = useState(false);

    // Initialize and handle shuffling
    useEffect(() => {
        if (logos.length === 0) return;

        // Initial shuffle
        const shuffled = [...logos].sort(() => Math.random() - 0.5);
        setDisplayLogos(shuffled);

        const timer = setInterval(() => {
            if (!isPaused) {
                setDisplayLogos(prev => [...prev].sort(() => Math.random() - 0.5));
            }
        }, interval);

        return () => clearInterval(timer);
    }, [logos, interval, isPaused]);

    if (logos.length === 0) return null;

    return (
        <section className="py-12 md:py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                {title && (
                    <div className="text-center mb-10">
                        <h2 className="text-xs md:text-sm font-black text-gray-400 uppercase tracking-[0.3em] mb-2">
                            {title}
                        </h2>
                        <div className="w-12 h-1 bg-[#00F2FE] mx-auto rounded-full opacity-50"></div>
                    </div>
                )}

                <div
                    className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-8"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <AnimatePresence mode="popLayout">
                        {displayLogos.slice(0, 12).map((logo, index) => (
                            <motion.div
                                key={logo.id || logo.src}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{
                                    layout: { type: "spring", stiffness: 200, damping: 30 },
                                    opacity: { duration: 0.4 },
                                    scale: { duration: 0.4 }
                                }}
                                className="aspect-[3/2] flex items-center justify-center p-4 md:p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-[#00F2FE]/30 transition-shadow group cursor-default"
                            >
                                <img
                                    src={logo.src}
                                    alt={logo.name || "Client Logo"}
                                    className="max-w-full max-h-full object-contain transition-all duration-500 opacity-90 group-hover:opacity-100 scale-90 group-hover:scale-110"
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default InfinityBrandLoop;
