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
    }
];

const ServiceCard = ({ service, index }) => {
    return (
        <Link to={`/services/${service.slug}`} className="block h-full">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group relative h-full bg-white p-6 md:p-8 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-2xl border border-slate-100"
            >
                {/* Background Image on Hover - Fills from Bottom */}
                <div className="absolute bottom-0 left-0 right-0 z-0 h-0 group-hover:h-full transition-all duration-500 ease-out overflow-hidden">
                    <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover object-bottom transition-transform duration-700 scale-105 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-[#05A4A7]/90 mix-blend-multiply opacity-90"></div>
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                    {/* Header: Number Only */}
                    <div className="flex justify-end items-start mb-2">
                        <span className="text-5xl md:text-6xl font-bold text-slate-100 group-hover:text-white/20 transition-colors duration-300 leading-none select-none">
                            {service.id}
                        </span>
                    </div>

                    <div className="mt-auto">
                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 group-hover:text-white transition-colors duration-300 relative inline-block">
                            {service.title}
                        </h3>

                        <p className="text-slate-500 text-sm mb-4 line-clamp-3 group-hover:text-slate-100 transition-colors duration-300 leading-relaxed">
                            {service.description}
                        </p>

                        <ul className="space-y-2">
                            {service.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2.5 group-hover:text-white transition-colors duration-300">
                                    <div className="w-4 h-4 rounded-full bg-[#05A4A7]/10 group-hover:bg-white/20 flex items-center justify-center flex-shrink-0 transition-colors">
                                        <span className="material-icons text-[#05A4A7] group-hover:text-white text-[8px] font-bold">check</span>
                                    </div>
                                    <span className="text-slate-600 text-[11px] md:text-xs font-semibold group-hover:text-slate-100 transition-colors">{feature}</span>
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
        <section className="bg-[#062929] min-h-screen flex flex-col justify-center py-10 md:py-0 font-sans relative">
            <div className="max-w-[1380px] mx-auto px-4 md:px-8 w-full">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 gap-6">
                    <div className="max-w-3xl">
                        <span className="block text-[#05A4A7] font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-2 pl-1">
                            // Our Expertise
                        </span>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
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

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
                    {services.map((service, index) => (
                        <ServiceCard key={index} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
