import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, margin: "-100px" },
    transition: { duration: 0.8, ease: "easeOut" }
};

const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: false },
    transition: { staggerChildren: 0.2 }
};

const AboutSections = () => {
    return (
        <div className="bg-[#FFFCF8] py-12 md:py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-10">
                {/* Section 1: Top Dual Column */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16 md:mb-32">

                    {/* Left Column: Image with Overlays */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="rounded-[2.5rem] overflow-hidden shadow-xl aspect-[4/3] relative group">
                            <img
                                src="https://images.unsplash.com/photo-1573167101669-476636b96cea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
                                alt="Founder Working"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform"
                                >
                                    <svg className="w-6 h-6 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </motion.button>
                            </div>
                        </div>

                        {/* Floating Quote Card */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: false }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl p-6 shadow-xl w-64 text-center border-t-2 border-primary"
                        >
                            <p className="font-bold text-gray-900 text-sm mb-1">"Building digital futures, together"</p>
                            <p className="text-xs text-gray-500 font-medium">CEO, Appzeto</p>
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.8 }}
                        className="lg:pl-8 mt-12 lg:mt-0"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
                            We empower businesses with <span className="text-primary italic">future-ready</span> tech
                        </h2>

                        <p className="text-gray-500 leading-relaxed mb-8 text-sm md:text-base">
                            At Appzeto, we don't just write code; we architect solutions. Our mission is to bridge the gap between complex technology and tangible business growth. By leveraging the latest in AI, cloud computing, and user-centric design, we turn your ambitious visions into robust, scalable realities.
                        </p>

                        <div className="bg-[#FFF8E7] border-l-4 border-primary p-6 rounded-r-xl shadow-sm">
                            <p className="text-sm font-medium text-gray-700 italic">
                                "Technology is the catalyst, but human ingenuity is the driver. We combine both to deliver excellence that matters."
                            </p>
                        </div>
                    </motion.div>
                </div>


                {/* Section 2: Bottom Features */}
                <div className="text-center relative">
                    {/* Decorative Elements */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 right-10 text-primary opacity-20"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle></svg>
                    </motion.div>
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute top-10 left-20 text-gray-400"
                    >
                        <span className="text-xl">✨</span>
                    </motion.div>

                    <motion.h2
                        {...fadeInUp}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 max-w-2xl mx-auto tracking-tight"
                    >
                        We help startups scale faster and smarter
                    </motion.h2>
                    <motion.p
                        {...fadeInUp}
                        className="text-gray-500 max-w-2xl mx-auto mb-16 text-sm md:text-base"
                    >
                        From MVP to enterprise-grade systems, our holistic approach ensures every milestone is met with precision and quality.
                    </motion.p>

                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: false }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {/* Feature 1 */}
                        <motion.div
                            variants={{
                                initial: { opacity: 0, y: 30 },
                                whileInView: { opacity: 1, y: 0 }
                            }}
                            className="flex flex-col items-center group"
                        >
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary transition-all duration-500">
                                <span className="material-icons text-primary group-hover:text-white text-2xl">person_outline</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Engineering</h3>
                            <p className="text-sm text-gray-500 text-center max-w-xs leading-relaxed">
                                Our team consists of industry veterans and coding prodigies dedicated to clean, efficient, and maintainable code.
                            </p>
                        </motion.div>

                        {/* Feature 2 */}
                        <motion.div
                            variants={{
                                initial: { opacity: 0, y: 30 },
                                whileInView: { opacity: 1, y: 0 }
                            }}
                            className="flex flex-col items-center group"
                        >
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary transition-all duration-500">
                                <span className="material-icons text-primary group-hover:text-white text-2xl">track_changes</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Result Driven</h3>
                            <p className="text-sm text-gray-500 text-center max-w-xs leading-relaxed">
                                We focus on KPIs that matter—user retention, load times, and conversion rates—to ensure tangible ROI.
                            </p>
                        </motion.div>

                        {/* Feature 3 */}
                        <motion.div
                            variants={{
                                initial: { opacity: 0, y: 30 },
                                whileInView: { opacity: 1, y: 0 }
                            }}
                            className="flex flex-col items-center relative group"
                        >
                            {/* Decorative sparkle */}
                            <motion.div
                                animate={{ scale: [1, 1.5, 1], rotate: [0, 45, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute -top-4 right-10 text-primary opacity-30"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                            </motion.div>
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary transition-all duration-500">
                                <span className="material-icons text-primary group-hover:text-white text-2xl">poll</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Success Guarantee</h3>
                            <p className="text-sm text-gray-500 text-center max-w-xs leading-relaxed">
                                We stand by our work. Our agile process includes rigorous testing and post-launch support to guarantee success.
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Floating icons decoration */}
                    <div className="absolute bottom-0 right-0 hidden md:block opacity-20 text-primary">
                        <span className="material-icons text-4xl animate-bounce">open_in_full</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSections;
