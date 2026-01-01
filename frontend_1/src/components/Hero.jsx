import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

const Hero = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark font-body antialiased transition-colors duration-300 min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow flex relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl dark:bg-primary/20"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl dark:bg-secondary/10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-10 lg:pt-6 lg:pb-20 w-full relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <motion.div
                            initial={{ x: -70, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: false, amount: 0.2 }}
                            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                            className="space-y-8"
                        >
                            <div className="inline-flex items-center space-x-2 bg-teal-50 dark:bg-teal-900/30 border border-teal-100 dark:border-teal-800 rounded-full px-4 py-1.5">
                                <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                <span className="text-sm font-semibold text-primary tracking-wide uppercase">Reflect Technology</span>
                            </div>

                            <h1 className="text-5xl lg:text-6xl font-display font-extrabold text-gray-900 dark:text-white leading-tight">
                                Building the <span className="text-primary relative inline-block">
                                    Future
                                    <svg className="absolute w-full h-3 bottom-1 left-0 text-secondary -z-10 opacity-60" preserveAspectRatio="none" viewBox="0 0 100 10">
                                        <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="8"></path>
                                    </svg>
                                </span> of Digital Innovation
                            </h1>

                            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">
                                We transform businesses with cutting-edge <span className="font-semibold text-gray-800 dark:text-gray-100">Web Development</span>, immersive <span className="font-semibold text-gray-800 dark:text-gray-100">Mobile Apps</span>, and intelligent <span className="font-semibold text-gray-800 dark:text-gray-100">AI &amp; ML</span> solutions.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <a className="inline-flex justify-center items-center px-8 py-4 bg-[#F1FC88] text-gray-900 font-bold rounded-xl shadow-lg shadow-[#F0FF35]/20 hover:bg-[#EAF576] transform hover:-translate-y-1 transition-all duration-300 text-lg group" href="#">
                                    Explore Services
                                    <span className="material-icons ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </a>
                                <a className="inline-flex justify-center items-center px-8 py-4 bg-white dark:bg-surface-dark text-gray-700 dark:text-gray-200 font-semibold rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300 text-lg" href="#">
                                    <span className="material-icons mr-2 text-primary">play_circle_filled</span>
                                    Watch Demo
                                </a>
                            </div>

                            <div className="pt-8 flex items-center space-x-6 text-gray-500 dark:text-gray-400 text-sm font-medium">
                                <div className="flex items-center">
                                    <span className="material-icons text-primary mr-2 text-lg">verified</span>
                                    Top Rated Developer
                                </div>
                                <div className="flex items-center">
                                    <span className="material-icons text-primary mr-2 text-lg">rocket_launch</span>
                                    Agile Delivery
                                </div>
                            </div>
                        </motion.div>
                        <div className="relative lg:h-full flex items-center justify-center">
                            <div className="relative w-full aspect-square max-w-2xl mx-auto flex items-center justify-center transform scale-125">
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
            <section className="border-y border-gray-200 dark:border-gray-800 bg-primary/5 dark:bg-primary/10 overflow-hidden py-4">
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
                        <div key={index} className="flex items-center space-x-3 mx-8 cursor-pointer hover:scale-110 transition-transform">
                            <div className="p-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl">
                                <span className="material-icons text-gray-500 dark:text-gray-400 text-lg">{item.icon}</span>
                            </div>
                            <span className="font-bold text-base text-gray-700 dark:text-gray-300">{item.label}</span>
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
                        <div key={`duplicate-${index}`} className="flex items-center space-x-3 mx-8 cursor-pointer hover:scale-110 transition-transform">
                            <div className="p-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl">
                                <span className="material-icons text-gray-500 dark:text-gray-400 text-lg">{item.icon}</span>
                            </div>
                            <span className="font-bold text-base text-gray-700 dark:text-gray-300">{item.label}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Hero;
