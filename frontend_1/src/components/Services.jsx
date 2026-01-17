import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import webImg from '../assets/web_dev_service_preview_1767285503403.png';
import mobileImg from '../assets/mobile_apps_service_preview_1767285521524.png';
import aiImg from '../assets/ai_ml_service_preview_1767285486518.png';
import cloudImg from '../assets/cloud_computing_service_preview_1767285540190.png';

const services = [
    {
        id: "01",
        title: "Web Development",
        description: "Scalable, high-performance websites using React, Next.js, and modern MERN stack architecture.",
        features: ["React & Next.js Experts", "Progressive Web Apps (PWA)", "SEO & Performance Optimized", "Secure Backend Architecture"],
        icon: "language",
        image: webImg,
        slug: "web-development"
    },
    {
        id: "02",
        title: "App Development",
        description: "Native and cross-platform mobile applications for iOS and Android ensuring seamless user experiences.",
        features: ["Flutter & React Native", "iOS & Android Support", "User-Centric UI/UX", "Seamless API Integration"],
        icon: "smartphone",
        image: mobileImg,
        slug: "mobile-apps"
    },
    {
        id: "03",
        title: "Custom Software",
        description: "Tailored enterprise software solutions designed to streamline your specific business operations.",
        features: ["Enterprise Resource Planning", "CRM & SaaS Platforms", "Cloud-Native Solutions", "Scalable Microservices"],
        icon: "settings_suggest",
        image: cloudImg,
        slug: "custom-software"
    },
    {
        id: "04",
        title: "AI & Machine Learning",
        description: "Intelligent automation and data-driven insights to empower smarter business decisions.",
        features: ["Predictive Analytics", "Natural Language Processing", "Computer Vision Models", "Automated Workflows"],
        icon: "psychology",
        image: aiImg,
        slug: "ai-solutions"
    },
    {
        id: "05",
        title: "Cloud DevOps",
        description: "Optimized infrastructure and automated deployment pipelines for maximum uptime and reliability.",
        features: ["AWS/Azure Specialists", "Docker & Kubernetes", "CI/CD Automation", "Infrastructure as Code"],
        icon: "cloud",
        image: cloudImg,
        slug: "cloud-devops"
    },
    {
        id: "06",
        title: "Cyber Security",
        description: "End-to-end security audits and implementation to protect your digital assets and user data.",
        features: ["Vulnerability Testing", "Zero Trust Security", "Compliance & Privacy", "Managed Firewall"],
        icon: "security",
        image: webImg,
        slug: "cyber-security"
    }
];

const ServiceCard = ({ service, index }) => {
    return (
        <Link to={`/services/${service.slug}`} className="block h-full">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.3 }}
                className="group relative flex-shrink-0 w-[160px] md:w-[225px] h-[260px] md:h-[380px] bg-[#062929] rounded-2xl overflow-hidden shadow-xl border border-transparent transition-all duration-500 hover:-translate-y-2"
            >
                {/* 1. Background Image (Base Layer) */}
                <div className="absolute inset-0 z-0 h-full w-full">
                    <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover object-center scale-105 transition-transform duration-700 group-hover:scale-100"
                    />
                    {/* Dark Teal Overlay */}
                    <div className="absolute inset-0 bg-[#062929]/90 mix-blend-multiply"></div>
                </div>

                {/* 2. Brand Teal Hover Overlay (Fills from Bottom) */}
                <div className="absolute bottom-0 left-0 right-0 h-0 bg-[#05A4A7] z-10 group-hover:h-full transition-all duration-500 ease-in-out rounded-2xl"></div>

                {/* 3. Content */}
                <div className="relative z-20 flex flex-col h-full p-3 md:p-8">
                    {/* Header: Number Only */}
                    <div className="flex justify-end items-start mb-1 md:mb-2">
                        <div className="relative h-10 md:h-20 w-full flex justify-end">
                            <span className="absolute top-0 right-0 text-4xl md:text-7xl font-bold text-white/50 group-hover:opacity-0 transition-opacity duration-300 leading-none select-none">
                                {service.id}
                            </span>
                            <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 material-icons text-5xl md:text-8xl text-[#05A4A7] opacity-0 group-hover:opacity-100 group-hover:text-white transition-all duration-300 leading-none select-none transform scale-90 group-hover:scale-100">
                                {service.icon}
                            </span>
                        </div>
                    </div>

                    <div className="mt-auto">
                        <h3 className="text-sm md:text-2xl font-bold text-white mb-1 md:mb-2 group-hover:text-white transition-colors duration-300 relative inline-block leading-tight">
                            {service.title}
                        </h3>

                        <p className="text-slate-200 text-[10px] md:text-sm mb-2 md:mb-4 line-clamp-2 md:line-clamp-3 group-hover:text-white/90 transition-colors duration-300 leading-relaxed font-medium">
                            {service.description}
                        </p>

                        <ul className="space-y-1 md:space-y-2">
                            {service.features.slice(0, 3).map((feature, i) => (
                                <li key={i} className="flex items-center gap-1.5 md:gap-2.5 text-white/90 group-hover:text-white transition-colors duration-300">
                                    <div className="w-3 h-3 md:w-6 md:h-6 rounded-full bg-[#05A4A7] group-hover:bg-white flex items-center justify-center flex-shrink-0 transition-colors">
                                        <span className="material-icons text-white group-hover:text-[#05A4A7] text-[6px] md:text-[10px] font-bold">check</span>
                                    </div>
                                    <span className="text-[9px] md:text-xs font-semibold truncate">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

const Services = () => {
    return (
        <section className="bg-[#062929] min-h-0 lg:h-screen lg:min-h-[750px] flex flex-col justify-center pt-8 pb-8 md:py-10 overflow-hidden font-sans relative">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 md:mb-10 gap-4 sm:gap-6">
                    <div className="max-w-3xl py-2 md:py-0">
                        <span className="block text-[#05A4A7] font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-2">
                            // Our Expertise
                        </span>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-2 md:mb-0">
                            Broad Range of <br />
                            <span className="text-[#05A4A7]">
                                Professional
                            </span> IT Services
                        </h2>
                    </div>
                    <div className="max-w-md pb-1">
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed font-medium">
                            Appzeto leverages cutting-edge technology to assist businesses in design, development, and scaling of robust digital products.
                        </p>
                    </div>
                </div>

                {/* Cards Container (Horizontal Scroll) */}
                <div className="relative group/scroll">
                    <div className="flex gap-3 md:gap-4 overflow-x-auto no-scrollbar pb-4 md:pb-10 px-0 mask-linear">
                        {services.map((service, index) => (
                            <ServiceCard key={index} service={service} index={index} />
                        ))}
                    </div>

                    {/* Visual Scroll Hint */}
                    <div className="mt-4 flex items-center gap-4 text-white/30 text-[10px] font-black uppercase tracking-[0.3em]">
                        <span className="animate-pulse">Scroll to explore services</span>
                        <div className="w-12 h-[1px] bg-white/20"></div>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-1 h-1 rounded-full bg-white/10"></div>)}
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .mask-linear {
                    mask-image: linear-gradient(to right, black 85%, transparent 100%);
                }
            ` }} />
        </section>
    );
};

export default Services;
