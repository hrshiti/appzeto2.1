import React, { useLayoutEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import innovationPremiumImg from '../assets/innovation_premium.png';

const StatItem = ({ value, suffix, label, index }) => {
    const numberRef = useRef(null);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.5 });

    useLayoutEffect(() => {
        let animation;
        if (isInView) {
            const obj = { val: 0 };
            animation = gsap.to(obj, {
                val: value,
                duration: 1.5,
                ease: "power3.out",
                onUpdate: () => {
                    if (numberRef.current) {
                        numberRef.current.innerText = Math.round(obj.val);
                    }
                }
            });
        }
    }, [value, isInView]);

    return (
        <div ref={containerRef} className="flex flex-col items-center sm:items-start group">
            <div className="flex items-baseline">
                <span ref={numberRef} className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">0</span>
                <span className="text-xl md:text-2xl font-black text-[#05A4A7] ml-0.5">{suffix}</span>
            </div>
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-1 group-hover:text-[#05A4A7] transition-colors duration-300">
                {label}
            </span>
        </div>
    );
};

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

const stats = [
    { value: 500, suffix: "+", label: "Projects Delivered" },
    { value: 10, suffix: "+", label: "Years Experience" },
    { value: 100, suffix: "+", label: "Technologies Used" },
    { value: 99, suffix: "%", label: "Client Satisfaction" }
];

const WhyChooseUs = () => {
    return (
        <section className="w-full bg-white overflow-hidden font-sans border-y border-slate-50 flex flex-col lg:flex-row min-h-[600px]">

            {/* LEFT: Impact Visual with Integrated Stats */}
            <div className="w-full lg:w-[40%] h-[350px] lg:h-auto relative overflow-hidden group">
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
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />

                    {/* Visual Content */}
                    <div className="absolute bottom-10 left-10 z-10">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-[#05A4A7] font-black uppercase tracking-[0.4em] text-[10px] mb-2 block"
                        >
                            Future Prepared
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-white text-3xl md:text-5xl font-black tracking-tighter leading-[0.9]"
                        >
                            Redefining <br />
                            <span className="text-[#05A4A7]">Innovation.</span>
                        </motion.h2>
                    </div>
                </motion.div>
            </div>

            {/* RIGHT: Unified Content & Stats */}
            <div className="w-full lg:w-[60%] flex flex-col justify-center px-6 md:px-16 lg:px-24 py-16 md:py-24 bg-white relative">
                <div className="max-w-4xl relative z-10 w-full">
                    {/* Header */}
                    <div className="mb-12 md:mb-20">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-[#05A4A7] font-black uppercase tracking-[0.5em] text-[10px] mb-4 block"
                        >
                            Excellence Driven
                        </motion.span>
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.85] mb-8"
                        >
                            Why Choose <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#05A4A7] to-[#013537]">Appzeto?</span>
                        </motion.h3>
                    </div>

                    {/* Integrated Stats Row */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-16 md:mb-24 pb-16 md:pb-24 border-b border-slate-100">
                        {stats.map((stat, index) => (
                            <StatItem key={index} {...stat} index={index} />
                        ))}
                    </div>

                    {/* Features Grid */}
                    <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="w-8 h-8 flex items-center justify-center text-[#05A4A7] font-black text-xs bg-[#05A4A7]/5 rounded-xl group-hover:bg-[#05A4A7] group-hover:text-white transition-all duration-500 shadow-sm shadow-[#05A4A7]/10">
                                        {feature.id}
                                    </span>
                                    <h4 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tight group-hover:text-[#05A4A7] transition-colors">
                                        {feature.title}
                                    </h4>
                                </div>
                                <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium pl-2 border-l-2 border-slate-100 group-hover:border-[#05A4A7] transition-all duration-500">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Footer Detail */}
                    <div className="mt-16 md:mt-24 pt-8 border-t border-slate-50 flex flex-wrap items-center gap-8 md:gap-12">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#05A4A7] animate-pulse shadow-[0_0_10px_rgba(5,164,167,0.5)]" />
                            <span className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Client First Approach</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#05A4A7]/20" />
                            <span className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">24/7 Priority Support</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#05A4A7]/20" />
                            <span className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Scalable Solutions</span>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default WhyChooseUs;
