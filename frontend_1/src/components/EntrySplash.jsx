import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from 'lenis/react'; // Importing hook directly if available, or we will assume Lenis is managed globally, but you requested useLenis
import logo from '../assets/logo.png'; // Verify path

const EntrySplash = ({ isVisible, onComplete }) => {
    // If you are using 'lenis/react' context, this is how you'd control it.
    // However, if Lenis is initialized globally elsewhere without a provider, we might need a different approach.
    // Assuming standard Lenis React usage:
    const lenis = useLenis();

    useEffect(() => {
        if (isVisible) {
            lenis?.stop();
        } else {
            lenis?.start();
        }
    }, [isVisible, lenis]);

    return (
        <AnimatePresence mode="wait">
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[9999] bg-[#012829] flex flex-col items-center justify-center overflow-hidden"
                    initial={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} // Custom cubic bezier for smooth "curtain" lift
                >
                    <div className="relative flex flex-col items-center">
                        {/* Logo Animation */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="relative z-10 w-32 h-32 md:w-48 md:h-48 mb-6 bg-white/5 rounded-full flex items-center justify-center backdrop-blur-3xl border border-white/10 shadow-[0_0_60px_-15px_rgba(5,164,167,0.3)]"
                        >
                            <img src={logo} alt="Appzeto" className="w-20 md:w-28 object-contain drop-shadow-2xl" />

                            {/* Ripple Effect Circles */}
                            <motion.div
                                className="absolute inset-0 rounded-full border border-teal-500/30"
                                initial={{ scale: 1, opacity: 0.5 }}
                                animate={{ scale: 1.5, opacity: 0 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                            />
                        </motion.div>

                        {/* Text Animation */}
                        <div className="overflow-hidden text-center">
                            <motion.h1
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ delay: 0.5, duration: 0.8, ease: "backOut" }}
                                className="text-4xl md:text-6xl font-black text-white tracking-tight"
                            >
                                APPZETO
                            </motion.h1>
                        </div>

                        <div className="overflow-hidden mt-2">
                            <motion.p
                                initial={{ y: "100%", opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8, duration: 0.8 }}
                                className="text-sm md:text-lg text-teal-400 font-medium tracking-[0.3em] uppercase"
                            >
                                Innovate • Build • Scale
                            </motion.p>
                        </div>
                    </div>

                    {/* Background Subtle Elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default EntrySplash;
