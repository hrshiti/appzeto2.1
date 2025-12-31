import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Services = () => {
    return (
        <div className="bg-[#f6f8f8] dark:bg-[#10221f] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-500">
            <main className="relative w-full overflow-hidden">
                {/* Abstract Background blobs */}
                <div className="absolute top-0 left-0 w-full h-[800px] overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#13ecc8]/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-normal"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-normal"></div>
                </div>
                <div className="w-full py-8 lg:py-12">
                    <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
                        {/* Section Header */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                            <div className="max-w-4xl">
                                <div className="mb-4">
                                    <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase transition-all">
                                        Our Expertise
                                    </h1>
                                </div>
                                <h2 className="text-xl md:text-3xl font-bold text-[#05A4A7] leading-tight mb-4 transition-all">
                                    Empowering Business with Next-Gen Tech
                                </h2>
                                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl transition-all">
                                    From intelligent AI algorithms to scalable SaaS platforms, we build the digital infrastructure that propels your future forward.
                                </p>
                            </div>
                        </div>

                        {/* Redesigned Colorful Columns Layout - EVEN SMALLER HEIGHT & MORE COMPACT */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 w-full h-auto lg:h-[260px] gap-4">
                            {[
                                {
                                    title: "AI & ML",
                                    desc: "Unlock intelligent power with predictive analytics.",
                                    icon: "psychology",
                                    color: "bg-[#4361ee]",
                                    border: "border-[#4361ee]/20",
                                    iconBg: "bg-[#4361ee]/20",
                                    link: "Learn more"
                                },
                                {
                                    title: "Web Dev",
                                    desc: "Responsive, high-performance web applications.",
                                    icon: "code",
                                    color: "bg-[#10b981]",
                                    border: "border-[#10b981]/20",
                                    iconBg: "bg-[#10b981]/20",
                                    link: "Explore"
                                },
                                {
                                    title: "Mobile Apps",
                                    desc: "Native and cross-platform mobile solutions.",
                                    icon: "smartphone",
                                    color: "bg-[#f43f5e]",
                                    border: "border-[#f43f5e]/20",
                                    iconBg: "bg-[#f43f5e]/20",
                                    link: "View Apps"
                                },
                                {
                                    title: "Cloud",
                                    desc: "Reliable and scalable cloud infrastructure.",
                                    icon: "cloud",
                                    color: "bg-[#f59e0b]",
                                    border: "border-[#f59e0b]/20",
                                    iconBg: "bg-[#f59e0b]/20",
                                    link: "Details"
                                },
                                {
                                    title: "UI/UX",
                                    desc: "Creating intuitive interfaces that elevate.",
                                    icon: "brush",
                                    color: "bg-[#8b5cf6]",
                                    border: "border-[#8b5cf6]/20",
                                    iconBg: "bg-[#8b5cf6]/20",
                                    link: "See Work"
                                }
                            ].map((service, idx) => (
                                <div
                                    key={idx}
                                    className={`group relative ${service.color}/60 hover:${service.color} p-5 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:z-10 hover:shadow-2xl h-full rounded-2xl border ${service.border}`}
                                >
                                    <div className="relative z-10 flex flex-col gap-3">
                                        <div className={`size-10 rounded-lg ${service.iconBg} group-hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-slate-100 group-hover:text-white border border-white/10 shadow-sm transition-all duration-500`}>
                                            <span className="material-symbols-outlined text-[20px]">{service.icon}</span>
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-lg font-black text-slate-900 group-hover:text-white uppercase tracking-wide transition-colors duration-500">{service.title}</h3>
                                            <p className="text-slate-600 group-hover:text-white/90 text-[12px] leading-snug font-medium line-clamp-2 transition-colors duration-500">
                                                {service.desc}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="relative z-10 mt-auto">
                                        <a href="#" className="inline-flex items-center text-slate-800 group-hover:text-white font-bold border-b border-black/10 group-hover:border-white/40 pb-0.5 hover:border-black group-hover:hover:border-white transition-all text-[12px]">
                                            {service.link} <span className="material-symbols-outlined ml-1 text-sm transition-all">arrow_outward</span>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Services;
