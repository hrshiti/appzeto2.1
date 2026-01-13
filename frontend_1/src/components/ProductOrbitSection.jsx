import React from 'react';
import RevolvingOrbit from './RevolvingOrbit';
import { motion } from 'framer-motion';

const ProductOrbitSection = () => {
    return (
        <section className="py-8 md:py-20 bg-slate-50 dark:bg-slate-900 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[80px] opacity-60"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[80px] opacity-60"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-0 md:mb-16 relative z-10">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-block py-1 px-3 rounded-full bg-teal-500/10 text-teal-600 font-bold text-xs uppercase tracking-widest mb-2 md:mb-4"
                >
                    Connected Experience
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-2 md:mb-6"
                >
                    The <span className="text-[#05A4A7]">Appzeto</span> Ecosystem
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="hidden md:block text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed"
                >
                    A unified platform of powerful applications working seamlessly together to drive your business growth.
                </motion.p>
            </div>

            <div className="flex justify-center items-center relative z-10 py-0 md:py-10 scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100 origin-center -mt-12 md:mt-0">
                <RevolvingOrbit size="lg" />
            </div>
        </section>
    );
};

export default ProductOrbitSection;
