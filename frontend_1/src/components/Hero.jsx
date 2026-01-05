import React from 'react';
import { Link } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

const Hero = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark font-body antialiased transition-colors duration-300 min-h-screen flex flex-col">




            <Navbar />
            <main className="flex-grow flex relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 sm:w-96 sm:h-96 bg-primary/10 rounded-full blur-3xl dark:bg-primary/20"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-56 h-56 sm:w-80 sm:h-80 bg-secondary/20 rounded-full blur-3xl dark:bg-secondary/10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-0 sm:pb-10 lg:pt-6 lg:pb-20 w-full relative z-10">




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
                                <span className="text-xs sm:text-sm font-semibold text-primary tracking-wide uppercase">Reflect Technology</span>
                            </div>

                            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-gray-900 dark:text-white leading-tight">
                                Building the <span className="text-primary relative inline-block">
                                    Future
                                    <svg className="absolute w-full h-2 sm:h-3 bottom-1 left-0 text-secondary -z-10 opacity-60" preserveAspectRatio="none" viewBox="0 0 100 10">
                                        <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="8"></path>
                                    </svg>
                                </span> of Digital Innovation
                            </h1>


                            <p className="hidden sm:block text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">
                                We transform businesses with cutting-edge <span className="font-semibold text-gray-800 dark:text-gray-100">Web Development</span>, immersive <span className="font-semibold text-gray-800 dark:text-gray-100">Mobile Apps</span>, and intelligent <span className="font-semibold text-gray-800 dark:text-gray-100">AI &amp; ML</span> solutions.
                            </p>

                            {/* Mobile Only Lottie */}
                            <div className="lg:hidden relative w-full aspect-square max-w-[280px] mx-auto flex items-center justify-center transform scale-110">
                                <DotLottieReact
                                    src="https://lottie.host/f5edc29d-7c20-49be-9b54-7c07fa26f2c6/wKHzGrk2QZ.lottie"
                                    loop
                                    autoplay
                                    className="w-full h-full"
                                />
                            </div>



                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                                <Link to="/services" className="inline-flex justify-center items-center px-4 py-3 sm:px-8 sm:py-4 bg-[#F1FC88] text-gray-900 font-bold rounded-xl shadow-lg shadow-[#F0FF35]/20 hover:bg-[#EAF576] transform hover:-translate-y-1 transition-all duration-300 text-sm sm:text-lg group">
                                    Explore Services
                                    <span className="material-icons ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </Link>
                                <Link to="/services/web-app" className="inline-flex justify-center items-center px-4 py-3 sm:px-8 sm:py-4 bg-white dark:bg-surface-dark text-gray-700 dark:text-gray-200 font-semibold rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300 text-sm sm:text-lg">
                                    <span className="material-icons mr-2 text-primary">play_circle_filled</span>
                                    Watch Demo
                                </Link>
                            </div>

                            <div className="pt-2 sm:pt-8 flex flex-wrap gap-3 sm:gap-6 text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-medium">
                                <div className="flex items-center">
                                    <span className="material-icons text-primary mr-2 text-sm sm:text-lg">verified</span>
                                    Top Rated Developer
                                </div>
                                <div className="flex items-center">
                                    <span className="material-icons text-primary mr-2 text-sm sm:text-lg">rocket_launch</span>
                                    Agile Delivery
                                </div>
                            </div>
                        </motion.div>
                        <div className="hidden lg:flex relative lg:h-full items-center justify-center mt-[-20px] lg:mt-0">

                            <div className="relative w-full aspect-square max-w-[280px] sm:max-w-md lg:max-w-2xl mx-auto flex items-center justify-center transform scale-110 sm:scale-125">
                                <DotLottieReact
                                    src="https://lottie.host/f5edc29d-7c20-49be-9b54-7c07fa26f2c6/wKHzGrk2QZ.lottie"
                                    loop
                                    autoplay
                                    className="w-full h-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block animate-bounce">
                    <span className="material-icons text-gray-400 dark:text-gray-600">keyboard_arrow_down</span>
                </div>
            </main>
            <section className="border-y border-gray-200 dark:border-gray-800 bg-primary/5 dark:bg-primary/10 overflow-hidden py-3 sm:py-4">
                <div className="flex animate-scroll whitespace-nowrap group">
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
