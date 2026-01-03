import React, { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        title: "Discovery",
        description: "We dive deep into your requirements, target audience, and business goals to create a solid roadmap.",
        icon: "🔍",
        color: "#cdbdae"
    },
    {
        title: "UI/UX Design",
        description: "Crafting intuitive layouts and stunning visuals that ensure an exceptional user experience.",
        icon: "🎨",
        color: "#9D8F8F"
    },
    {
        title: "Development",
        description: "Transforming designs into robust, scalable code using the latest technology stack.",
        icon: "💻",
        color: "#8E847F"
    },
    {
        title: "Testing",
        description: "Rigorous quality assurance to ensure every feature works perfectly across all devices.",
        icon: "🧪",
        color: "#7D746F"
    },
    {
        title: "Deployment",
        description: "Launching your product to the world and providing ongoing support for growth.",
        icon: "🚀",
        color: "#5C5652"
    }
];

const Process = () => {
    const containerRef = useRef(null);
    const lineRef = useRef(null);
    const mobileLineRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // GSAP ScrollTrigger for the connector line
            if (lineRef.current) {
                gsap.fromTo(lineRef.current,
                    { scaleY: 0 },
                    {
                        scaleY: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top center",
                            end: "bottom center",
                            scrub: 1, // Smoothly link to scroll
                        }
                    }
                );
            }
            if (mobileLineRef.current) {
                gsap.fromTo(mobileLineRef.current,
                    { scaleY: 0 },
                    {
                        scaleY: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top center",
                            end: "bottom center",
                            scrub: 1,
                        }
                    }
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="bg-white min-h-screen py-20 relative overflow-hidden flex flex-col justify-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
                <div className="absolute top-20 left-10 w-64 h-64 bg-[#cdbdae] rounded-full blur-[100px]" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#cdbdae] rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-left mb-16"
                >
                    <p className="text-[#cdbdae] font-medium tracking-widest uppercase mb-2">Workflow</p>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">How We Bring Your Ideas To Life</h2>
                    <div className="w-24 h-1 bg-[#cdbdae] rounded-full" />
                </motion.div>

                <div className="relative">
                    {/* GSAP Managed Vertical Connector Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gray-100 -translate-x-1/2 hidden md:block" />
                    <div
                        ref={lineRef}
                        className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-[#cdbdae] -translate-x-1/2 hidden md:block origin-top scale-y-0"
                    />

                    {/* GSAP Managed Mobile Connector Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-gray-100 md:hidden" />
                    <div
                        ref={mobileLineRef}
                        className="absolute left-8 top-0 bottom-0 w-[2px] bg-[#cdbdae] md:hidden origin-top scale-y-0"
                    />

                    <div className="space-y-12 md:space-y-0">
                        {steps.map((step, index) => {
                            const isOdd = index % 2 !== 0;
                            return (
                                <div key={index} className="relative flex items-center md:h-32 mb-8 md:mb-0">
                                    <div className="flex w-full items-center">
                                        {/* Left Side Content (Framer Motion) */}
                                        <div className={`hidden md:flex w-1/2 justify-end pr-16 ${isOdd ? 'invisible order-1' : 'order-1'}`}>
                                            <motion.div
                                                initial={{ opacity: 0, x: -60, filter: "blur(10px)" }}
                                                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                                viewport={{ once: false, amount: 0.3 }}
                                                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                                                className="text-right max-w-sm"
                                            >
                                                <h3 className="text-xl font-bold text-gray-900 mb-1">{step.title}</h3>
                                                <p className="text-gray-500 text-sm font-sans leading-relaxed">{step.description}</p>
                                            </motion.div>
                                        </div>

                                        {/* Center Icon (Framer Motion) */}
                                        <div className="relative z-10 w-12 h-12 bg-white border-2 border-[#cdbdae] rounded-full flex items-center justify-center text-xl shadow-lg order-2 md:absolute md:left-1/2 md:-translate-x-1/2">
                                            <motion.div
                                                initial={{ scale: 0, rotate: -45 }}
                                                whileInView={{ scale: 1, rotate: 0 }}
                                                viewport={{ once: false, amount: 0.5 }}
                                                transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
                                            >
                                                {step.icon}
                                            </motion.div>
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: false }}
                                                transition={{ delay: 0.4 }}
                                                className="absolute -top-1 -right-1 w-6 h-6 bg-gray-900 text-white text-[10px] flex items-center justify-center rounded-full font-sans font-bold shadow-md"
                                            >
                                                0{index + 1}
                                            </motion.div>
                                        </div>

                                        {/* Right Side Content (Framer Motion) */}
                                        <div className={`w-full md:w-1/2 pl-12 md:pl-16 ${!isOdd ? 'md:invisible order-3' : 'order-3'}`}>
                                            <motion.div
                                                initial={{ opacity: 0, x: 60, filter: "blur(10px)" }}
                                                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                                viewport={{ once: false, amount: 0.3 }}
                                                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                                                className="text-left max-w-sm"
                                            >
                                                <h3 className="text-xl font-bold text-gray-900 mb-1">{step.title}</h3>
                                                <p className="text-gray-500 text-sm font-sans leading-relaxed">{step.description}</p>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Process;
