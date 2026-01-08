import React from 'react';
import { Link } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import RevolvingOrbit from './RevolvingOrbit';

const Hero = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark font-body antialiased transition-colors duration-300 min-h-screen flex flex-col relative overflow-hidden">

            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 sm:w-96 sm:h-96 bg-primary/10 rounded-full blur-3xl dark:bg-primary/20 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-56 h-56 sm:w-80 sm:h-80 bg-secondary/20 rounded-full blur-3xl dark:bg-secondary/10 pointer-events-none"></div>

            <Navbar />

            <main className="flex-grow flex flex-col relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-0 sm:pb-10 lg:pt-10 lg:pb-10 w-full relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                        <motion.div
                            initial={{ x: -70, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: false, amount: 0.2 }}
                            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                            className="space-y-6 sm:space-y-8"
                        >
                            <div className="inline-flex items-center space-x-2 bg-teal-50 dark:bg-teal-900/30 border border-teal-100 dark:border-teal-800 rounded-full px-3 py-1 sm:px-4 sm:py-1.5">
                                <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                <span className="text-xs sm:text-sm font-semibold text-primary tracking-wide uppercase">Innovation Ecosystem</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-black text-gray-800 dark:text-white leading-[1.1] tracking-tight">
                                One Unified <br />
                                <span className="text-primary">Product Engine</span> <br />
                                for Businesses.
                            </h1>

                            <p className="hidden sm:block text-base sm:text-lg lg:text-xl text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed font-medium">
                                We've built an interconnected suite of AI-native platforms to automate your logistics, food delivery, and commerce needs.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                                <Link to="/services" className="inline-flex justify-center items-center px-6 py-3 sm:px-10 sm:py-5 bg-[#F1FC88] text-gray-900 font-black rounded-2xl shadow-xl shadow-[#F0FF35]/10 hover:bg-[#EAF576] transform hover:-translate-y-1 transition-all duration-300 text-sm sm:text-lg group">
                                    Get Started
                                    <span className="material-icons ml-2 group-hover:translate-x-1 transition-transform">rocket_launch</span>
                                </Link>
                                <Link to="/demo" className="inline-flex justify-center items-center px-6 py-3 sm:px-10 sm:py-5 bg-white/50 dark:bg-white/5 backdrop-blur-md text-gray-700 dark:text-gray-200 font-bold rounded-2xl border border-gray-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 transition-all duration-300 text-sm sm:text-lg">
                                    Case Studies
                                </Link>
                            </div>
                        </motion.div>

                        {/* THE REVOLVING ORBIT (Visible on both Mobile and Desktop) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="flex items-center justify-center relative scale-50 sm:scale-75 lg:scale-90 xl:scale-110 py-6 lg:py-0"
                        >
                            <RevolvingOrbit size="lg" />
                        </motion.div>
                    </div>
                </div>

                {/* THE PHONE LOTTIE (Moved Below Hero Content) */}
                <div className="w-full relative flex flex-col items-center justify-center py-20 bg-primary/5 dark:bg-white/5 mt-10">
                    <div className="text-center mb-10 px-4">
                        <p className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-2">Immersive Experience</p>
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Mobile-First <span className="text-primary">Precision</span></h2>
                    </div>
                    <div className="relative w-full aspect-square max-w-[300px] sm:max-w-md lg:max-w-xl mx-auto flex items-center justify-center">
                        <DotLottieReact
                            src="https://lottie.host/f5edc29d-7c20-49be-9b54-7c07fa26f2c6/wKHzGrk2QZ.lottie"
                            loop
                            autoplay
                            className="w-full h-full transform scale-150"
                        />
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block animate-bounce z-20">
                    <span className="material-icons text-gray-400 dark:text-gray-600">keyboard_arrow_down</span>
                </div>
            </main>
            <section className="border-y border-gray-200 dark:border-gray-800 bg-primary/5 dark:bg-primary/10 overflow-hidden py-3 sm:py-4">
                <div className="flex animate-scroll-fast sm:animate-scroll whitespace-nowrap group">
                    {[
                        { icon: 'web', label: 'Web Dev' },
                        { icon: 'smartphone', label: 'App Dev' },
                        { icon: 'psychology', label: 'AI Solutions' },
                        { icon: 'cloud', label: 'Cloud Ops' },
                        { icon: 'security', label: 'Cybersecurity' },
                        { icon: 'bar_chart', label: 'Data Analytics' },
                        { icon: 'brush', label: 'UI/UX Design' },
                        { icon: 'settings', label: 'DevOps' },
                        { icon: 'link', label: 'Blockchain' },
                    ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-2 sm:space-x-3 mx-4 sm:mx-8 cursor-pointer hover:scale-110 transition-transform">
                            <div className="p-2 sm:p-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl">
                                <span className="material-icons text-gray-500 dark:text-gray-400 text-sm sm:text-lg">{item.icon}</span>
                            </div>
                            <span className="font-bold text-sm sm:text-base text-gray-700 dark:text-gray-300">{item.label}</span>
                        </div>
                    ))}
                    {[
                        { icon: 'web', label: 'Web Dev' },
                        { icon: 'smartphone', label: 'App Dev' },
                        { icon: 'psychology', label: 'AI Solutions' },
                        { icon: 'cloud', label: 'Cloud Ops' },
                        { icon: 'security', label: 'Cybersecurity' },
                        { icon: 'bar_chart', label: 'Data Analytics' },
                        { icon: 'brush', label: 'UI/UX Design' },
                        { icon: 'settings', label: 'DevOps' },
                        { icon: 'link', label: 'Blockchain' },
                    ].map((item, index) => (
                        <div key={`duplicate-${index}`} className="flex items-center space-x-2 sm:space-x-3 mx-4 sm:mx-8 cursor-pointer hover:scale-110 transition-transform">
                            <div className="p-2 sm:p-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl">
                                <span className="material-icons text-gray-500 dark:text-gray-400 text-sm sm:text-lg">{item.icon}</span>
                            </div>
                            <span className="font-bold text-sm sm:text-base text-gray-700 dark:text-gray-300">{item.label}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Hero;
