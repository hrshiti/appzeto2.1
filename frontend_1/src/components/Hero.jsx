import React from 'react';
import { Link } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import RevolvingOrbit from './RevolvingOrbit';
import aapreecLogo from '../assets/logos/aapreec.jpg';
import autoRideLogo from '../assets/logos/auto_ride.jpg';
import beeyouLogo from '../assets/logos/beeyou.jpg';
import bookMyTempoLogo from '../assets/logos/book_my_tempo.jpg';
import createBharatLogo from '../assets/logos/create_bharat.jpg';
import dailyHisabLogo from '../assets/logos/daily_hisab.jpg';
import doctorOnHomeLogo from '../assets/logos/doctor_on_home.jpg';
import fixflyLogo from '../assets/logos/fixfly.jpg';
import rentYatraLogo from '../assets/logos/rent_yatra.jpg';
import blueRideLogo from '../assets/logos/blue_ride.jpg';

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
                            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-display font-black text-gray-800 dark:text-white leading-[1.2] tracking-tight">
                                IT Services Company <br className="hidden lg:block" />
                                <span className="text-primary">Building Scalable</span> <br className="hidden lg:block" />
                                Web, App & AI Solutions
                            </h1>

                            <p className="hidden sm:block text-sm sm:text-base lg:text-lg text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed font-medium">
                                We help startups, founders, and businesses design, develop, and scale reliable digital products using modern technologies and proven development processes.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                                <Link to="/contact" className="inline-flex justify-center items-center px-6 py-3 sm:px-10 sm:py-5 bg-[#F1FC88] text-gray-900 font-black rounded-2xl shadow-xl shadow-[#F0FF35]/10 hover:bg-[#EAF576] transform hover:-translate-y-1 transition-all duration-300 text-sm sm:text-lg group">
                                    Book Free Consultation
                                    <span className="material-icons ml-2 group-hover:translate-x-1 transition-transform">rocket_launch</span>
                                </Link>
                                <Link to="/projects" className="inline-flex justify-center items-center px-6 py-3 sm:px-10 sm:py-5 bg-white/50 dark:bg-white/5 backdrop-blur-md text-gray-700 dark:text-gray-200 font-bold rounded-2xl border border-gray-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 transition-all duration-300 text-sm sm:text-lg">
                                    View Case Studies
                                </Link>
                            </div>
                        </motion.div>

                        {/* THE REVOLVING ORBIT (Visible on both Mobile and Desktop) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="flex items-center justify-center relative scale-50 sm:scale-65 lg:scale-75 xl:scale-90 py-6 lg:py-0"
                        >
                            <RevolvingOrbit size="lg" />
                        </motion.div>
                    </div>
                </div>

                {/* THE PHONE LOTTIE (Moved Below Hero Content) - HIDDEN
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
                */}

                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block animate-bounce z-20">
                    <span className="material-icons text-gray-400 dark:text-gray-600">keyboard_arrow_down</span>
                </div>
            </main>
            <section className="border-y border-gray-200 dark:border-gray-800 bg-primary/5 dark:bg-primary/10 overflow-hidden py-3 sm:py-4">
                <div className="flex animate-scroll-fast whitespace-nowrap group">
                    {[
                        { name: "Aapreec", logo: aapreecLogo },
                        { name: "AutoRide", logo: autoRideLogo },
                        { name: "Beeyou", logo: beeyouLogo },
                        { name: "Book My Tempo", logo: bookMyTempoLogo },
                        { name: "Create Bharat", logo: createBharatLogo },
                        { name: "Daily Hisab", logo: dailyHisabLogo },
                        { name: "Doctor on Home", logo: doctorOnHomeLogo },
                        { name: "Fixfly", logo: fixflyLogo },
                        { name: "Rent Yatra", logo: rentYatraLogo },
                        { name: "Blue Ride", logo: blueRideLogo },
                    ].map((client, index) => (
                        <div key={index} className="flex items-center space-x-2 sm:space-x-4 mx-4 sm:mx-8 cursor-pointer hover:scale-105 transition-transform duration-300">
                            <div className="h-16 w-16 sm:h-20 sm:w-20 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center p-2">
                                <img
                                    src={client.logo}
                                    alt={client.name}
                                    className="max-h-full max-w-full object-contain mix-blend-multiply"
                                />
                            </div>
                            <span className="font-bold text-sm sm:text-base text-gray-700 dark:text-gray-300">{client.name}</span>
                        </div>
                    ))}
                    {[
                        { name: "Aapreec", logo: aapreecLogo },
                        { name: "AutoRide", logo: autoRideLogo },
                        { name: "Beeyou", logo: beeyouLogo },
                        { name: "Book My Tempo", logo: bookMyTempoLogo },
                        { name: "Create Bharat", logo: createBharatLogo },
                        { name: "Daily Hisab", logo: dailyHisabLogo },
                        { name: "Doctor on Home", logo: doctorOnHomeLogo },
                        { name: "Fixfly", logo: fixflyLogo },
                        { name: "Rent Yatra", logo: rentYatraLogo },
                        { name: "Blue Ride", logo: blueRideLogo },
                    ].map((client, index) => (
                        <div key={`duplicate-${index}`} className="flex items-center space-x-2 sm:space-x-4 mx-4 sm:mx-8 cursor-pointer hover:scale-105 transition-transform duration-300">
                            <div className="h-16 w-16 sm:h-20 sm:w-20 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center p-2">
                                <img
                                    src={client.logo}
                                    alt={client.name}
                                    className="max-h-full max-w-full object-contain mix-blend-multiply"
                                />
                            </div>
                            <span className="font-bold text-sm sm:text-base text-gray-700 dark:text-gray-300">{client.name}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Hero;
