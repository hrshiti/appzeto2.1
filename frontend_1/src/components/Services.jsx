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
        description: "High-performance websites and web applications built with modern technologies like React, Next.js, and Node.js. We ensure scalability, speed, and SEO optimization.",
        icon: "language",
        image: webImg,
        slug: "website"
    },
    {
        id: "02",
        title: "Mobile App Development",
        description: "Native and cross-platform mobile apps for iOS and Android. We create seamless user experiences using Flutter, React Native, and Swift/Kotlin.",
        icon: "smartphone",
        image: mobileImg,
        slug: "mobile-application"
    },
    {
        id: "03",
        title: "AI & Machine Learning",
        description: "Intelligent automation and data-driven solutions. From chatbots to predictive analytics, we help you leverage the power of AI to grow your business.",
        icon: "smart_toy",
        image: aiImg,
        slug: "ai-machine-learning"
    },
    {
        id: "04",
        title: "DevOps & Cloud",
        description: "Streamline your deployment pipeline and ensure high availability. We specialize in AWS, Azure, Docker, and Kubernetes for robust infrastructure.",
        icon: "cloud_sync",
        image: cloudImg,
        slug: "devops-cloud"
    }
];

const ServiceItem = ({ service, index, activeIndex, setActiveIndex }) => {
    const isActive = activeIndex === index;

    return (
        <Link to={`/services/${service.slug}`} className="block w-full">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group border-b border-white/10 cursor-pointer transition-colors duration-500 ${isActive ? 'bg-white/5' : 'hover:bg-white/5'}`}
                onMouseEnter={() => setActiveIndex(index)}
            >
                <div className="py-4 md:py-10 px-2 md:px-6 flex flex-row md:items-center justify-between gap-4 md:gap-8 items-center">
                    {/* ID & Title */}
                    <div className="flex items-center gap-3 md:gap-8 flex-1 relative z-10">
                        <span className={`text-base md:text-xl font-mono ${isActive ? 'text-[#05A4A7]' : 'text-gray-600'} transition-colors duration-300`}>
                            {service.id}
                        </span>
                        <h3 className={`text-lg md:text-3xl font-bold uppercase tracking-tight ${isActive ? 'text-white' : 'text-gray-400'} group-hover:text-white transition-colors duration-300 line-clamp-1`}>
                            {service.title}
                        </h3>
                    </div>

                    {/* Arrow Icon */}
                    <div className={`w-8 h-8 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 shrink-0 ${isActive ? 'bg-[#05A4A7] border-[#05A4A7] rotate-[-45deg]' : 'group-hover:border-white'}`}>
                        <span className={`material-symbols-outlined text-base md:text-xl ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
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
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <div className="pb-4 px-2 pl-8 max-w-4xl">
                                <p className="text-gray-400 text-xs leading-relaxed font-light">
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
        <section className="bg-[#0b0c10] py-16 md:py-32 relative overflow-hidden font-sans">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#05A4A7]/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#05A4A7]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                {/* Heading */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-20 gap-4 md:gap-6">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="block text-[#05A4A7] font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-2 md:mb-4"
                        >
                            Our Expertise
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter"
                        >
                            Solutions We <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#05A4A7] to-emerald-400">Deliver</span>
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="hidden sm:block text-gray-400 text-sm md:text-base max-w-md leading-relaxed"
                    >
                        We combine strategy, design, and technology to build digital products that drive growth and efficiency.
                    </motion.p>
                </div>

                {/* Services List - Full Width */}
                <div className="border-t border-white/10 relative" onMouseLeave={() => setActiveIndex(null)} data-cursor-text="View Detail">
                    {services.map((service, index) => (
                        <div key={index} className="relative">
                            <ServiceItem
                                service={service}
                                index={index}
                                activeIndex={activeIndex}
                                setActiveIndex={setActiveIndex}
                            />
                            {/* Floating Image Overlay - Only visible on Desktop Hover */}
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8, x: 20 }}
                                        animate={{ opacity: 1, scale: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.8, x: 10 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className="hidden lg:block fixed right-[15%] top-1/2 -translate-y-1/2 w-96 h-56 rounded-xl overflow-hidden shadow-2xl border border-white/20 z-50 pointer-events-none"
                                        style={{ boxShadow: '0 0 30px rgba(0,0,0,0.5)' }}
                                    >
                                        <div className="absolute inset-0 bg-black/20 z-10"></div>
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
