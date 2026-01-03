import React from 'react';
import { motion } from 'framer-motion';

const comparisonData = [
    {
        feature: "Timeline",
        appzeto: "4-8 Weeks",
        others: "6-12 Months",
        icon: "schedule"
    },
    {
        feature: "Tech Stack",
        appzeto: "Next-Gen AI",
        others: "Legacy Code",
        icon: "bolt"
    },
    {
        feature: "Security",
        appzeto: "Military Grade",
        others: "Basic SSL",
        icon: "security"
    },
    {
        feature: "Support",
        appzeto: "24/7 Priority",
        others: "Business Hours",
        icon: "support_agent"
    },
    {
        feature: "Cost Model",
        appzeto: "Fixed & Clear",
        others: "Hidden Fees",
        icon: "payments"
    }
];

const WhyChooseUs = () => {
    return (
        <section className="w-full py-24 bg-white dark:bg-surface-dark overflow-hidden font-sans">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
                <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">

                    {/* Left Side: Heading */}
                    <motion.div
                        className="lg:col-span-4 text-left border-l-[4px] border-primary pl-8 py-4"
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <p className="text-primary font-semibold tracking-[0.2em] uppercase text-[10px] mb-4">The Advantage</p>
                        <h2 className="text-3xl md:text-5xl font-semibold text-slate-900 dark:text-white leading-[1.1] mb-6">
                            Why Choose <br className="hidden lg:block" />
                            <span className="text-primary italic">Appzeto?</span>
                        </h2>
                        <p className="text-base text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-xs">
                            We deliver enterprise-grade engineering at the speed of light.
                        </p>
                    </motion.div>

                    {/* Right Side: Comparison Table */}
                    <motion.div
                        className="lg:col-span-8 w-full"
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <div className="bg-white dark:bg-white/2 border border-gray-100 dark:border-white/5 rounded-3xl overflow-hidden shadow-xl">
                            {/* Table Header */}
                            <div className="grid grid-cols-12 bg-gray-50/50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5 py-4 px-6 md:px-8">
                                <div className="col-span-6 text-[10px] font-semibold uppercase tracking-widest text-gray-400">Capability</div>
                                <div className="col-span-3 text-[10px] font-semibold uppercase tracking-widest text-primary text-center">Appzeto</div>
                                <div className="col-span-3 text-[10px] font-semibold uppercase tracking-widest text-gray-400 text-right">Industry</div>
                            </div>

                            {/* Table Rows */}
                            <div className="divide-y divide-gray-50 dark:divide-white/5">
                                {comparisonData.map((row, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: false }}
                                        transition={{ delay: idx * 0.05, duration: 0.4 }}
                                        className="grid grid-cols-12 py-5 px-6 md:px-8 items-center hover:bg-gray-50/30 dark:hover:bg-white/[0.01] transition-colors"
                                    >
                                        {/* Feature with Icon */}
                                        <div className="col-span-6 flex items-center gap-3">
                                            <span className="material-icons text-primary/30 text-lg hidden md:block">{row.icon}</span>
                                            <span className="text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-tight">
                                                {row.feature}
                                            </span>
                                        </div>

                                        {/* Appzeto Value */}
                                        <div className="col-span-3 text-center">
                                            <div className="flex items-center justify-center gap-1.5 transition-transform group-hover:scale-105">
                                                <span className="material-icons text-primary text-sm md:text-base">verified</span>
                                                <span className="text-xs md:text-sm font-semibold text-primary uppercase tracking-tight italic">
                                                    {row.appzeto}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Traditional Value */}
                                        <div className="col-span-3 text-right">
                                            <span className="text-[10px] md:text-xs font-medium text-gray-400 uppercase tracking-tight">
                                                {row.others}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 text-center md:text-right px-4">
                            <p className="text-[10px] text-gray-400 uppercase tracking-[0.5em] font-medium opacity-50">High Performance Model • v2.1</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
