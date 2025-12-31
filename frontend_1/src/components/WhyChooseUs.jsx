import React from 'react';
import { motion } from 'framer-motion';

const WhyChooseUs = () => {
    return (
        <section className="w-full py-12 lg:py-16 bg-white dark:bg-[#10221f]">
            <div className="w-full">
                <motion.div
                    className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 mb-12 flex flex-col items-start text-left"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: false, amount: 0.2 }}
                >
                    <div className="mb-4 transition-all">
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase transition-all">
                            Why Choose Us
                        </h2>
                    </div>
                    <h3 className="text-xl md:text-3xl font-bold text-[#05A4A7] mb-6 transition-all">Driven by Results, Powered by Innovation</h3>
                </motion.div>

                <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                        {[
                            {
                                icon: "rocket_launch",
                                title: "Rapid Deployment",
                                desc: "We use agile methodologies and pre-built modules to launch your products faster without compromising quality."
                            },
                            {
                                icon: "security",
                                title: "Enterprise Security",
                                desc: "Security is built-in, not bolted on. We implement banking-grade encryption and compliance standards from day one."
                            },
                            {
                                icon: "support_agent",
                                title: "24/7 Dedicated Support",
                                desc: "Our global team ensures your critical infrastructure never sleeps, with round-the-clock monitoring and support."
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.6, delay: idx * 0.15 }}
                                className="flex flex-col items-center md:items-start group"
                            >
                                <div className="size-16 bg-gradient-to-br from-[#13ecc8]/20 to-[#13ecc8]/5 rounded-2xl flex items-center justify-center text-[#13ecc8] mb-6 shadow-[0_0_30px_-10px_rgba(19,236,200,0.3)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_40px_-5px_rgba(19,236,200,0.5)]">
                                    <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-[#13ecc8] transition-colors">{item.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
