import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import aiImg from '../assets/ai_ml_service_preview_1767285486518.png';
import webImg from '../assets/web_dev_service_preview_1767285503403.png';
import mobileImg from '../assets/mobile_apps_service_preview_1767285521524.png';
import cloudImg from '../assets/cloud_computing_service_preview_1767285540190.png';
import uiuxImg from '../assets/ui_ux_design_service_preview_1767285557945.png';

const services = [
    {
        id: "01",
        title: "AI & Machine Learning",
        features: ["Predictive Analytics", "Deep Learning", "Neural Networks", "NLP", "Machine Vision"],
        image: aiImg
    },
    {
        id: "02",
        title: "Web Development",
        features: ["Full-stack Apps", "E-commerce Solutions", "SaaS Platforms", "Performance Optimization", "SEO Strategy"],
        image: webImg
    },
    {
        id: "03",
        title: "Mobile App Development",
        features: ["iOS & Android", "React Native", "Flutter Apps", "Cross-platform", "Real-time Sync"],
        image: mobileImg
    },
    {
        id: "04",
        title: "Cloud Computing",
        features: ["Cloud Architecture", "Serverless Apps", "DevOps & CI/CD", "Cybersecurity", "Microservices"],
        image: cloudImg
    },
    {
        id: "05",
        title: "UI/UX Design",
        features: ["Visual Identity", "Wireframing", "Prototyping", "User Research", "Interaction Design"],
        image: uiuxImg
    },
];

const Services = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <section className="bg-[#012829] text-white px-6 md:px-12 lg:px-24 font-sans overflow-hidden min-h-screen py-24">
            <div className="max-w-7xl mx-auto w-full relative z-10">
                {/* Header Section */}
                <div className="flex justify-between items-baseline mb-16 border-b border-white/10 pb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white uppercase mb-2">
                            Services
                        </h1>
                        <div className="h-1 w-12 bg-primary rounded-full"></div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hidden md:flex items-center gap-3 text-primary/80"
                    >
                        <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse shadow-[0_0_15px_rgba(5,164,167,0.5)]"></span>
                        <span className="text-sm font-bold uppercase tracking-widest">
                            {services.length} Specialized Areas
                        </span>
                    </motion.div>
                </div>

                {/* Services List */}
                <div className="flex flex-col">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="group relative border-b border-white/10 last:border-0"
                        >
                            <div className="py-4 md:py-6 flex flex-col items-start transition-all duration-500">
                                <div className="w-full flex items-center justify-between cursor-pointer">
                                    <div className="flex items-center gap-8 md:gap-16">
                                        <span className={`text-xs md:text-sm font-medium transition-colors duration-500 font-mono ${hoveredIndex === index ? 'text-primary' : 'text-white/30'}`}>
                                            ({service.id})
                                        </span>
                                        <h3 className={`text-xl md:text-2xl font-semibold tracking-tight transition-all duration-500 ${hoveredIndex === index ? 'text-primary' : 'text-white/80 group-hover:text-white'}`}>
                                            {service.title}
                                        </h3>
                                    </div>

                                    <div className={`size-10 md:size-12 rounded-full border border-white/20 flex items-center justify-center transition-all duration-500 ease-out ${hoveredIndex === index ? 'bg-primary border-primary scale-110' : 'group-hover:bg-white group-hover:text-black group-hover:border-white'}`}>
                                        <span className={`material-symbols-outlined text-xl transition-transform duration-500 ${hoveredIndex === index ? 'rotate-45 text-black' : 'rotate-[-45deg]'}`}>
                                            arrow_upward
                                        </span>
                                    </div>
                                </div>

                                {/* Expanded Content */}
                                <AnimatePresence>
                                    {hoveredIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{
                                                duration: 1.5,
                                                ease: [0.22, 1, 0.36, 1]
                                            }}
                                            className="overflow-hidden w-full origin-top"
                                        >
                                            <div className="pt-10 pb-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                                                {/* Image Container with Slower Sliding Animation */}
                                                <motion.div
                                                    initial={{ scale: 0.9, opacity: 0, x: -30 }}
                                                    animate={{ scale: 1, opacity: 1, x: 0 }}
                                                    transition={{
                                                        duration: 1.2,
                                                        ease: [0.22, 1, 0.36, 1],
                                                        delay: 0.2
                                                    }}
                                                    className="w-full lg:w-[480px] aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.6)] border border-white/5 relative group/img"
                                                >
                                                    <img
                                                        src={service.image}
                                                        alt={service.title}
                                                        className="w-full h-full object-cover transition-transform duration-[3000ms] ease-out group-hover/img:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                                                </motion.div>

                                                {/* Features List with Slower Staggered Reveal */}
                                                <div className="flex-1 w-full lg:w-auto">
                                                    <motion.h4
                                                        initial={{ opacity: 0, y: 15 }}
                                                        animate={{ opacity: 0.7, y: 0 }}
                                                        transition={{ duration: 1, delay: 0.4 }}
                                                        className="text-[11px] font-bold uppercase tracking-[0.5em] mb-8 text-white/90"
                                                    >
                                                        Technical Expertise
                                                    </motion.h4>
                                                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-x-12 gap-y-5">
                                                        {service.features.map((feature, fIdx) => (
                                                            <motion.li
                                                                key={feature}
                                                                initial={{ x: 30, opacity: 0 }}
                                                                animate={{ x: 0, opacity: 1 }}
                                                                transition={{
                                                                    duration: 0.8,
                                                                    delay: 0.6 + (fIdx * 0.15),
                                                                    ease: [0.22, 1, 0.36, 1]
                                                                }}
                                                                className="flex items-center gap-5 text-white/80 hover:text-primary transition-colors duration-500 group/item"
                                                            >
                                                                <div className="size-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group-hover/item:bg-primary group-hover/item:border-primary transition-all duration-500">
                                                                    <span className="material-symbols-outlined text-primary text-[14px] group-hover/item:text-black font-bold">done</span>
                                                                </div>
                                                                <span className="font-medium text-base tracking-normal group-hover/item:translate-x-2 transition-transform duration-500">
                                                                    {feature}
                                                                </span>
                                                            </motion.li>
                                                        ))}
                                                    </ul>

                                                    <motion.div
                                                        initial={{ opacity: 0, y: 25 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 1.2, duration: 0.8 }}
                                                    >
                                                        <motion.button
                                                            whileHover={{ scale: 1.05, backgroundColor: "#05A4A7", color: "white" }}
                                                            whileTap={{ scale: 0.95 }}
                                                            className="mt-12 bg-white text-black px-12 py-3.5 rounded-full font-bold text-xs shadow-2xl uppercase tracking-[0.2em]"
                                                        >
                                                            Discover More
                                                        </motion.button>
                                                    </motion.div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
