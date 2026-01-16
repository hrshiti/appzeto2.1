import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import TypewriterText from './TypewriterText';

const Hero = () => {
    const serviceItems = [
        { icon: 'web', label: 'Web Dev' },
        { icon: 'smartphone', label: 'App Dev' },
        { icon: 'psychology', label: 'AI Solutions' },
        { icon: 'cloud', label: 'Cloud Ops' },
        { icon: 'security', label: 'Cybersecurity' },
        { icon: 'bar_chart', label: 'Data Analytics' },
        { icon: 'brush', label: 'UI/UX Design' },
        { icon: 'settings', label: 'DevOps' },
        { icon: 'link', label: 'Blockchain' },
    ];

    // Phrases for the typewriter effect
    const phrases = [
        "Powerful Digital Products",
        "Scalable Digital Products",
        "High-Impact Digital Products",
        "Future-Ready Digital Products"
    ];

    const [showFixedButton, setShowFixedButton] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            // Show button after scrolling past 100vh (approx 1 section)
            if (window.scrollY > window.innerHeight) {
                setShowFixedButton(true);
            } else {
                setShowFixedButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-background-light dark:bg-background-dark font-body antialiased transition-colors duration-300 min-h-screen flex flex-col relative overflow-hidden">
            {/* ... (Background elements remain the same) */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 sm:w-96 sm:h-96 bg-primary/10 rounded-full blur-3xl dark:bg-primary/20 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-56 h-56 sm:w-80 sm:h-80 bg-secondary/20 rounded-full blur-3xl dark:bg-secondary/10 pointer-events-none"></div>

            <Navbar />

            <main className="flex-grow flex flex-col relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-0 sm:pb-10 lg:pt-32 lg:pb-10 w-full relative z-10 flex-grow flex flex-col justify-center">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center flex-grow">
                        <motion.div
                            initial={{ x: -70, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: false, amount: 0.2 }}
                            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                            className="space-y-4 sm:space-y-8 flex flex-col justify-center h-full"
                        >
                            {/* Mobile Heading */}
                            <h1 className="lg:hidden flex flex-col items-center font-black text-gray-900 dark:text-white leading-tight text-center mb-0 z-20 relative">
                                <span className="text-5xl">Building Your</span>
                                <span className="text-3xl text-[#05A4A7] mt-1">Digital Future</span>
                            </h1>

                            {/* Desktop Heading */}
                            <h1 className="hidden lg:block text-2xl sm:text-3xl lg:text-5xl font-display font-black text-gray-800 dark:text-white leading-[1.2] tracking-tight">
                                Helping Businesses Turn Ideas into <br className="hidden lg:block" />
                                <TypewriterText phrases={phrases} />
                            </h1>

                            <p className="hidden sm:block text-sm sm:text-base lg:text-lg text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed font-medium">
                                We help startups, founders, and businesses design, develop, and scale reliable digital products using modern technologies and proven development processes.
                            </p>

                            <div className="lg:hidden relative flex flex-col items-center justify-center py-0 w-full overflow-visible -mt-8 -mb-4 flex-grow z-10">
                                <div className="w-full max-w-[420px] aspect-square scale-110">
                                    <DotLottieReact
                                        src="https://lottie.host/f5edc29d-7c20-49be-9b54-7c07fa26f2c6/wKHzGrk2QZ.lottie"
                                        loop
                                        autoplay
                                    />
                                </div>
                                {/* Mobile Stats - Moved below image, above paragraph */}
                                <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-1.5 pr-4 rounded-full shadow-xl z-20 mb-4 -mt-8">
                                    <div className="flex -space-x-2">
                                        {[
                                            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64",
                                            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64",
                                            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64"
                                        ].map((src, i) => (
                                            <div key={i} className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-800 overflow-hidden">
                                                <img src={src} alt="Client" className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-gray-900 dark:text-white">500+ Clients</span>
                                        <div className="flex items-center gap-1">
                                            <span className="flex text-yellow-400 text-[8px]">
                                                {"★★★★★".split("").map((star, i) => <span key={i}>{star}</span>)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium text-center mb-4">
                                    Innovating today for a smarter tomorrow.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-0 lg:pt-4 w-full sm:w-auto mt-auto pb-8">
                                <div className="relative group w-full sm:w-auto">
                                    <motion.div
                                        whileHover={{ y: -6, scale: 1.05 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="relative p-[2px] rounded-xl overflow-hidden bg-white/10 shadow-[0_20px_40px_rgba(5,164,167,0.25)]"
                                    >
                                        <div className="absolute inset-0 z-0">
                                            <motion.div
                                                animate={{ rotate: [360, 0] }}
                                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600%] h-[600%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_340deg,#05A4A7_355deg,#05A4A7_360deg)] opacity-100 blur-[1px]"
                                            />
                                        </div>

                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate('/contact#contact-form');
                                            }}
                                            className="relative z-10 flex items-center justify-center px-7 py-3 bg-gradient-to-br from-[#05A4A7] to-[#037A7C] text-white font-black rounded-[11px] overflow-hidden group/btn w-full sm:w-auto cursor-pointer"
                                        >
                                            <span className="relative z-10 text-sm uppercase tracking-wider">Launch Your Dream</span>
                                            <motion.span
                                                className="relative z-10 material-icons ml-2 text-xl"
                                                animate={{ x: [0, 5, 0] }}
                                                transition={{ duration: 1, repeat: Infinity }}
                                            >
                                                rocket_launch
                                            </motion.span>
                                        </button>
                                    </motion.div>
                                </div>

                                <div className="relative group w-full sm:w-auto">
                                    <motion.div
                                        whileHover={{ y: -6, scale: 1.05 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="relative p-[2px] rounded-xl overflow-hidden bg-white/10 mb-2 sm:mb-0"
                                    >
                                        <div className="absolute inset-0 z-0">
                                            <motion.div
                                                animate={{ rotate: [360, 0] }}
                                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_340deg,#ffffff_360deg)] opacity-100"
                                            />
                                        </div>

                                        <Link to="/projects" className="relative z-10 flex items-center justify-center px-6 py-4 sm:px-7 sm:py-3 bg-gray-900 hover:bg-black sm:bg-gray-100 dark:bg-slate-800 border-2 border-transparent dark:border-white/5 text-white sm:text-gray-800 dark:text-white font-black rounded-[11px] shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-xl overflow-hidden group/btn w-full sm:w-auto mt-0 sm:mt-0 transition-all duration-300">
                                            <span className="relative z-10 text-sm sm:text-sm uppercase tracking-wider font-black">View Case Studies</span>
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="hidden lg:flex items-center justify-center relative py-6 lg:py-0 w-full h-full"
                        >
                            <div className="relative w-full max-w-[800px] aspect-square scale-125 md:scale-150">
                                <DotLottieReact
                                    src="https://lottie.host/f5edc29d-7c20-49be-9b54-7c07fa26f2c6/wKHzGrk2QZ.lottie"
                                    loop
                                    autoplay
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1, duration: 0.8 }}
                                className="absolute -bottom-12 right-0 sm:-bottom-8 sm:-right-24 flex items-center gap-2 sm:gap-3 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-2 pr-4 sm:p-3 sm:pr-5 rounded-full shadow-2xl z-20"
                            >
                                <div className="flex -space-x-2 sm:-space-x-3">
                                    {[
                                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64",
                                        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64",
                                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64",
                                        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64"
                                    ].map((src, i) => (
                                        <div key={i} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white dark:border-slate-800 overflow-hidden">
                                            <img src={src} alt="Client" className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] sm:text-xs font-black text-gray-900 dark:text-white whitespace-nowrap">
                                        500+ Happy Clients • Proven Results • Transparent Process
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <span className="flex text-yellow-400 text-[8px] sm:text-[10px]">
                                            {"★★★★★".split("").map((star, i) => <span key={i}>{star}</span>)}
                                        </span>
                                        <span className="text-[8px] sm:text-[10px] text-gray-500 font-medium">4.9/5</span>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div >

                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block animate-bounce z-20">
                    <span className="material-icons text-gray-400 dark:text-gray-600">keyboard_arrow_down</span>
                </div>
            </main >

            <section className="border-y border-gray-200 dark:border-gray-800 bg-primary/5 dark:bg-primary/10 overflow-hidden py-1.5 sm:py-4">
                <div className="flex animate-scroll-fast whitespace-nowrap group">
                    {[...serviceItems, ...serviceItems].map((item, index) => (
                        <div key={index} className="flex items-center space-x-1.5 sm:space-x-3 mx-2 sm:mx-8 cursor-pointer hover:scale-110 transition-transform">
                            <div className="p-1 sm:p-2.5 bg-gray-100 dark:bg-gray-800 rounded-lg sm:rounded-xl">
                                <span className="material-icons text-gray-500 dark:text-gray-400 text-xs sm:text-lg">{item.icon}</span>
                            </div>
                            <span className="font-bold text-[10px] sm:text-base text-gray-700 dark:text-gray-300 uppercase tracking-wider">{item.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Mobile Fixed Sticky Button - Full Width */}
            {/* Mobile Fixed Sticky Button - Full Width */}
            <div className={`lg:hidden fixed bottom-0 left-0 w-full z-50 bg-[#05A4A7] shadow-[0_-4px_10px_rgba(0,0,0,0.1)] border-t border-[#049194] transition-transform duration-300 ${showFixedButton ? 'translate-y-0' : 'translate-y-full'}`}>
                <Link to="/contact#contact-form" className="flex items-center justify-center w-full py-3.5 text-white font-black uppercase tracking-wider text-xs active:bg-[#037A7C] transition-colors">
                    Book Free Consultation
                    <span className="material-icons ml-2 text-lg">rocket_launch</span>
                </Link>
            </div>

        </div >
    );
};

export default Hero;
