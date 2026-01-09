import React from 'react';
import { motion } from 'framer-motion';
import innovationPremiumImg from '../assets/innovation_premium.png';

const features = [
    {
        id: "01",
        title: "Cutting-Edge Tech",
        description: "We use the latest stacks like React, Next.js, and AI."
    },
    {
        id: "02",
        title: "Ironclad Security",
        description: "Your data is safe with our enterprise-grade protocols."
    },
    {
        id: "03",
        title: "Agile Execution",
        description: "Fast development with updates for on-time delivery."
    },
    {
        id: "04",
        title: "Global Excellence",
        description: "Award-winning standards for every project we build."
    }
];

const WhyChooseUs = () => {
    return (
        <section className="w-full bg-white overflow-hidden font-sans border-y border-slate-50 flex flex-col lg:flex-row">

            {/* LEFT: Compact High-Impact Visual */}
            <div className="w-full lg:w-[45%] h-[280px] lg:h-[500px] relative overflow-hidden group">
                <motion.div
                    initial={{ opacity: 0, scale: 1.1 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <img
                        src={innovationPremiumImg}
                        alt="Premium Innovation"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#021F20]/50 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#021F20]/80 via-transparent to-transparent opacity-80" />

                    {/* Compact Label */}
                    <div className="absolute bottom-8 left-8 z-10">
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-white text-2xl md:text-4xl font-black tracking-tighter leading-none"
                        >
                            Redefining <br />
                            <span className="text-[#05A4A7]">The Future.</span>
                        </motion.h2>
                    </div>
                </motion.div>
            </div>

            {/* RIGHT: Tighter Content Area */}
            <div className="w-full lg:w-[55%] flex flex-col justify-center px-8 md:px-16 lg:px-20 py-10 lg:py-12 bg-white relative">
                <div className="max-w-2xl relative z-10">
                    <div className="mb-8">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-[#05A4A7] font-black uppercase tracking-[0.5em] text-[10px] mb-2.5 block"
                        >
                            Excellence Driven
                        </motion.span>
                        <motion.h3
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-[0.9]"
                        >
                            Why Choose <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#05A4A7] to-[#013537]">Appzeto?</span>
                        </motion.h3>
                    </div>

                    {/* Compact Grid */}
                    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6 lg:gap-y-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.id}
                                initial={{ opacity: 0, x: 15 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="flex items-center gap-3 mb-2.5">
                                    <span className="text-[#05A4A7] font-mono font-black text-xs bg-[#05A4A7]/5 px-2 py-0.5 rounded-lg group-hover:bg-[#05A4A7] group-hover:text-white transition-all duration-300">
                                        {feature.id}
                                    </span>
                                    <h4 className="text-base lg:text-lg font-black text-slate-900 uppercase tracking-tight group-hover:text-[#05A4A7] transition-colors">
                                        {feature.title}
                                    </h4>
                                </div>
                                <p className="text-slate-500 text-xs lg:text-sm leading-relaxed font-medium pl-3 border-l-2 border-slate-100 group-hover:border-[#05A4A7] transition-colors">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Lean Status Bar */}
                    <div className="mt-10 pt-5 border-t border-slate-50 flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#05A4A7] animate-pulse" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Client First</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-100" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">24/7 Support</span>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default WhyChooseUs;
