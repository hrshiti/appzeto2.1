import React, { useLayoutEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';

const TECH_IMAGE_URL = "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80";

const StatCard = ({ value, suffix, label, index }) => {
    const numberRef = useRef(null);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.5 });

    useLayoutEffect(() => {
        if (isInView) {
            const obj = { val: 0 };
            gsap.to(obj, {
                val: value,
                duration: 2.5,
                ease: "power2.out",
                onUpdate: () => {
                    if (numberRef.current) {
                        numberRef.current.innerText = Math.round(obj.val);
                    }
                }
            });
        }
    }, [value, isInView]);

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="bg-white/95 backdrop-blur-xl p-3 md:p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center border border-white/20 w-full min-w-0 md:min-w-[180px] group hover:shadow-2xl hover:border-[#05A4A7]/30 transition-all duration-300"
        >
            <div className="flex items-baseline md:mb-1 group-hover:scale-105 transition-transform duration-300">
                <span ref={numberRef} className="text-2xl md:text-4xl font-black text-[#012828] tracking-tighter">0</span>
                <span className="text-lg md:text-2xl font-black text-[#05A4A7] ml-0.5">{suffix}</span>
            </div>
            <span className="text-[9px] md:text-[10px] font-black text-[#012828]/60 uppercase tracking-widest leading-tight mt-1">
                {label}
            </span>
        </motion.div>
    );
};

const WhyChooseUs = () => {
    const points = [
        "Advanced AI Solutions",
        "Cybersecurity Audits",
        "Cloud Architecture",
        "Modern UI/UX Design"
    ];

    return (
        <section className="relative w-full py-6 md:py-20 min-h-0 md:min-h-[550px] flex items-center overflow-hidden font-sans bg-[#012828]">
            {/* Background Layer */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `url(${TECH_IMAGE_URL})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    filter: 'blur(1px) brightness(20%)'
                }}
            />

            <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 md:px-12 lg:px-24">
                <div className="grid lg:grid-cols-12 gap-2 lg:gap-24 items-start">

                    {/* LEFT SIDE: Heading (Takes ~40% width) */}
                    <div className="lg:col-span-5 flex flex-col justify-center h-full pt-4 lg:pt-0">
                        <motion.div
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex items-center gap-3 mb-4 md:mb-8 text-[#05A4A7] font-black uppercase tracking-[0.4em] text-xs"
                        >
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: "2.5rem" }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="h-[2px] bg-[#05A4A7]"
                            ></motion.span>
                            Excellence
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-3xl md:text-8xl lg:text-[110px] font-black text-white leading-none md:leading-[0.8] tracking-tighter uppercase mb-2 md:mb-6"
                        >
                            WHY <br />
                            <motion.span
                                initial={{ color: "#ffffff" }}
                                whileInView={{ color: "transparent" }}
                                transition={{ delay: 0.5, duration: 0.1 }}
                                className="stroke-text-white relative inline-block"
                            >
                                <span className="absolute inset-0 text-transparent stroke-text-white z-10">CHOOSE</span>
                                <motion.span
                                    initial={{ width: "0%" }}
                                    whileInView={{ width: "100%" }}
                                    transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
                                    className="absolute inset-0 text-white overflow-hidden whitespace-nowrap z-20"
                                >
                                    CHOOSE
                                </motion.span>
                                <span className="opacity-0">CHOOSE</span>
                            </motion.span> <br />
                            <span className="text-[#05A4A7]">APPZETO?</span>
                        </motion.h2>

                        <motion.div
                            className="relative pl-6 py-2 hidden lg:block max-w-md"
                        >
                            <motion.div
                                initial={{ height: 0 }}
                                whileInView={{ height: "100%" }}
                                transition={{ duration: 1, delay: 0.4 }}
                                className="absolute left-0 top-0 w-1 bg-[#05A4A7]"
                            />
                            <motion.p
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                className="text-white/60 text-lg font-medium"
                            >
                                We build enterprise-grade digital solutions that transform businesses with precision and future-proof technology.
                            </motion.p>
                        </motion.div>
                    </div>

                    {/* RIGHT SIDE: Detailed Content & Stats (Takes ~60% width) */}
                    <div className="lg:col-span-7 flex flex-col justify-center gap-8 md:gap-10 h-full lg:pt-16">

                        {/* 1. Main Tagline/Description */}
                        <motion.p
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-white text-2xl md:text-3xl font-bold leading-snug max-w-2xl"
                        >
                            Your strategic technology partner for building resilient, scalable, and secure digital ecosystems.
                        </motion.p>

                        {/* 2. Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 w-full">
                            <StatCard value={12} suffix="+" label="Years Of Exp" index={0} />
                            <StatCard value={250} suffix="+" label="Happy Clients" index={1} />
                            <StatCard value={2} suffix="k+" label="Success Projects" index={2} />
                        </div>

                        {/* 3. Checkmarks Grid */}
                        <div className="grid grid-cols-2 gap-y-5 md:gap-y-6 gap-x-6 md:gap-x-8 pt-6 md:pt-6 border-t border-white/10 w-full">
                            {points.map((point, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                                    className="flex items-center gap-4 group cursor-default"
                                >
                                    <div className="w-8 h-8 rounded-full bg-[#05A4A7]/20 flex items-center justify-center border border-[#05A4A7] group-hover:bg-[#05A4A7] transition-colors duration-300">
                                        <span className="material-icons text-[#05A4A7] text-[14px] font-black group-hover:text-white transition-colors duration-300">done</span>
                                    </div>
                                    <span className="text-white/90 font-bold text-sm tracking-widest uppercase group-hover:text-[#05A4A7] transition-colors duration-300">{point}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .stroke-text-white {
                    -webkit-text-stroke: 2px white;
                    color: transparent;
                }
                @media (max-width: 768px) {
                    .stroke-text-white {
                        -webkit-text-stroke: 1px white;
                    }
                }
            ` }} />
        </section >
    );
};

export default WhyChooseUs;
