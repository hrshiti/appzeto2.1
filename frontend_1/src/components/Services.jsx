import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import webImg from '../assets/web_dev_service_preview_1767285503403.png';
import mobileImg from '../assets/mobile_apps_service_preview_1767285521524.png';
import aiImg from '../assets/ai_ml_service_preview_1767285486518.png';
import cloudImg from '../assets/cloud_computing_service_preview_1767285540190.png';

const services = [
    {
        id: "01",
        title: "Web Development",
        description: "Fast & scalable websites using React, Next.js, and Node.js. Optimized for SEO and speed.",
        icon: "language",
        image: webImg,
        slug: "web-development"
    },
    {
        id: "02",
        title: "Mobile App Development",
        description: "Android & iOS solutions with native performance using Flutter and React Native.",
        icon: "smartphone",
        image: mobileImg,
        slug: "mobile-apps"
    },
    {
        id: "03",
        title: "AI & Machine Learning",
        description: "Automation and data-driven custom AI models to grow your business efficiency.",
        icon: "smart_toy",
        image: aiImg,
        slug: "ai-solutions"
    },
    {
        id: "04",
        title: "Custom Software",
        description: "Scalable architectures and tailored enterprise solutions for business growth.",
        icon: "cloud_sync",
        image: cloudImg,
        slug: "custom-software"
    }
];

const ServiceItem = ({ service, index, activeIndex, setActiveIndex }) => {
    const isActive = activeIndex === index;

    return (
        <Link to={`/services/${service.slug}`} className="block w-full">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`group border-b border-slate-100 cursor-pointer transition-colors duration-300 ${isActive ? 'bg-slate-50/50' : 'hover:bg-slate-50/30'}`}
                onMouseEnter={() => setActiveIndex(index)}
            >
                <div className="py-4 md:py-7 px-2 md:px-6 flex flex-row md:items-center justify-between gap-4 md:gap-8 items-center">
                    {/* ID & Title */}
                    <div className="flex items-center gap-3 md:gap-6 flex-1 relative z-10">
                        <span className={`text-sm md:text-lg font-mono font-bold ${isActive ? 'text-[#05A4A7]' : 'text-slate-200'} transition-colors duration-300`}>
                            {service.id}
                        </span>
                        <h3 className={`text-lg md:text-2xl font-black uppercase tracking-tight ${isActive ? 'text-[#05A4A7]' : 'text-slate-400'} group-hover:text-[#05A4A7] transition-colors duration-300`}>
                            {service.title}
                        </h3>
                    </div>

                    {/* Arrow Icon */}
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full border border-slate-200 flex items-center justify-center transition-all duration-300 shrink-0 ${isActive ? 'bg-[#05A4A7] border-[#05A4A7] -rotate-45' : 'group-hover:border-[#05A4A7]'}`}>
                        <span className={`material-symbols-outlined text-[18px] md:text-xl ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-[#05A4A7]'}`}>
                            arrow_forward
                        </span>
                    </div>
                </div>

                {/* Accordion Content */}
                <AnimatePresence>
                    {isActive && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="pb-6 px-2 pl-12 md:pl-24 max-w-2xl">
                                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                                    {service.description}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </Link>
    );
};

const Services = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section className="bg-white py-12 md:py-20 relative overflow-hidden font-sans">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                {/* Heading - Compact */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-4">
                    <div className="max-w-3xl">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="block text-[#05A4A7] font-black uppercase tracking-[0.3em] text-[10px] mb-2"
                        >
                            Our Expertise
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none"
                        >
                            IT & Software <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#05A4A7] to-emerald-500">Development</span>
                        </motion.h2>
                    </div>
                </div>

                {/* Services List */}
                <div className="border-t border-slate-100 relative" onMouseLeave={() => setActiveIndex(null)}>
                    {services.map((service, index) => (
                        <div key={index} className="relative">
                            <ServiceItem
                                service={service}
                                index={index}
                                activeIndex={activeIndex}
                                setActiveIndex={setActiveIndex}
                            />
                            {/* Floating Image Overlay - Compact & Small */}
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, x: 10 }}
                                        animate={{ opacity: 1, scale: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, x: 5 }}
                                        transition={{ duration: 0.25 }}
                                        className="hidden lg:block fixed right-[15%] top-1/2 -translate-y-1/2 w-64 h-40 rounded-2xl overflow-hidden shadow-xl border border-slate-100 z-50 pointer-events-none"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
