import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { dataService } from '../admin/services/dataService';

// Importing existing assets
import aiImg from '../assets/ai_ml_service_preview_1767285486518.png';
import webImg from '../assets/web_dev_service_preview_1767285503403.png';
import mobileImg from '../assets/mobile_apps_service_preview_1767285521524.png';
import cloudImg from '../assets/cloud_computing_service_preview_1767285540190.png';
import uiuxImg from '../assets/ui_ux_design_service_preview_1767285557945.png';

gsap.registerPlugin(ScrollTrigger);

const ServicesFullPage = () => {
    const containerRef = useRef(null);
    const [activeSection, setActiveSection] = useState('');
    const [services, setServices] = useState([]);

    // Fetch Services
    useEffect(() => {
        const allServices = dataService.getServices();
        setServices(allServices);
        if (allServices.length > 0) {
            setActiveSection(allServices[0].id);
        }
    }, []);

    // Smooth Scroll Setup
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, []);

    // Scroll Spy Logic
    useEffect(() => {
        if (services.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.3, rootMargin: "-10% 0px -50% 0px" }
        );

        services.forEach(service => {
            const el = document.getElementById(service.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [services]);


    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Helper to determine layout type based on content
    const getLayoutType = (title) => {
        const t = title.toLowerCase();
        if (t.includes('web')) return 'web';
        if (t.includes('app') || t.includes('mobile')) return 'app';
        if (t.includes('ai') || t.includes('intelligence') || t.includes('ml')) return 'ai';
        if (t.includes('devops') || t.includes('cloud')) return 'devops';
        return 'generic';
    };

    return (
        <div ref={containerRef} className="w-full bg-[#FAFAFA] text-slate-900 font-sans selection:bg-[#05A4A7] selection:text-white">

            {/* HERO SECTION */}
            <section className="relative w-full h-auto min-h-[80vh] md:h-[90vh] flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 py-12 md:py-0">
                {/* Abstract Decor */}
                <div className="absolute top-0 right-0 w-[80vw] sm:w-[50vw] h-[80vw] sm:h-[50vw] bg-[#05A4A7]/5 rounded-full blur-[80px] sm:blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center lg:text-left"
                    >
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "80px" }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="h-1 bg-[#05A4A7] mb-4 sm:mb-6 mx-auto lg:mx-0"
                        />
                        <h5 className="text-[#05A4A7] font-bold tracking-[0.2em] uppercase text-xs sm:text-sm mb-3 sm:mb-4">Comprehensive IT Services</h5>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-4 sm:mb-6 text-slate-900">
                            Engineering <br />
                            <span className="text-[#05A4A7]">Digital Excellence</span>
                        </h1>
                        <p className="text-sm sm:text-lg text-slate-600 leading-relaxed max-w-lg mb-6 sm:mb-8 mx-auto lg:mx-0">
                            We transform businesses through scalable web architectures, intelligent AI solutions, and robust DevOps pipelines. Future-proof your technology stack today with Appzeto's expertise.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 sm:px-8 sm:py-4 bg-[#05A4A7] text-white font-bold rounded-lg shadow-lg hover:shadow-[#05A4A7]/30 transition-shadow text-sm sm:text-base"
                                onClick={() => services.length > 0 && scrollToSection(services[0].id)}
                            >
                                Explore Services
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Orbit Animation - Keeping as static visual for Hero */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative w-full max-w-md mx-auto lg:max-w-full aspect-[4/3] rounded-2xl bg-[#081226] overflow-hidden shadow-2xl group hidden md:block"
                    >
                        <div className="absolute inset-0 opacity-40">
                            <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                        </div>
                        <div className="relative z-10 w-full h-full flex items-center justify-center scale-75 sm:scale-100">
                            <div className="w-16 h-16 bg-[#05A4A7] rounded-full flex items-center justify-center z-20 shadow-lg shadow-[#05A4A7]/50">
                                <span className="material-symbols-outlined text-3xl text-white">hub</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* MAIN CONTENT SPLIT */}
            <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-24 py-8 md:py-20 lg:py-32 flex flex-col lg:flex-row gap-8 lg:gap-24 relative">

                {/* LEFT SIDEBAR (Sticky) */}
                <div className="hidden lg:block w-64 shrink-0 relative">
                    <div className="sticky top-32">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Service Menu</h4>
                        <div className="flex flex-col gap-2 border-l border-slate-200">
                            {services.map((service) => (
                                <button
                                    key={service.id}
                                    onClick={() => scrollToSection(service.id)}
                                    className={`text-left px-6 py-3 text-sm font-bold transition-all duration-300 border-l-[3px] -ml-[3px] flex items-center gap-3 ${activeSection === service.id
                                        ? 'border-[#05A4A7] text-[#05A4A7] bg-slate-50'
                                        : 'border-transparent text-slate-500 hover:text-slate-900'
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-lg">{service.icon || 'layers'}</span>
                                    {service.title}
                                </button>
                            ))}
                        </div>

                        <div className="mt-10 p-6 bg-slate-100 rounded-xl">
                            <h5 className="font-bold text-slate-900 mb-2">Need a custom plan?</h5>
                            <p className="text-xs text-slate-500 mb-4 leading-relaxed">Talk to our architects for a tailored solution.</p>
                            <button className="text-[#05A4A7] text-xs font-bold underline decoration-2 underline-offset-4 hover:text-teal-700">Book a consultation</button>
                        </div>
                    </div>
                </div>

                {/* RIGHT CONTENT */}
                <div className="flex-1 w-full space-y-16 md:space-y-32">

                    {services.map((service) => {
                        const layout = getLayoutType(service.title);

                        return (
                            <section key={service.id} id={service.id} className="scroll-mt-24 md:scroll-mt-32">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 sm:mb-4">{service.title}</h2>
                                    <p className="text-slate-600 mb-6 sm:mb-10 max-w-2xl text-xs sm:text-base leading-relaxed">
                                        {service.shortDescription}
                                    </p>

                                    {/* DYNAMIC CONTENT RENDERING BASED ON LAYOUT TYPE */}

                                    {/* WEB LAYOUT */}
                                    {layout === 'web' && (
                                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8 items-start">
                                            <div className="bg-[#1E1E1E] rounded-xl p-3 sm:p-4 shadow-2xl font-mono text-[9px] sm:text-xs leading-relaxed text-gray-300 border border-gray-800 h-[250px] sm:h-[380px] overflow-hidden relative group">
                                                <div className="flex items-center gap-2 mb-4 border-b border-gray-700 pb-2">
                                                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                                                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
                                                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
                                                    <div className="text-[10px] text-gray-500 ml-4">App.tsx</div>
                                                </div>
                                                <div className="space-y-1 opacity-80 group-hover:opacity-100 transition-opacity">
                                                    <p><span className="text-purple-400">import</span> React <span className="text-purple-400">from</span> 'react';</p>
                                                    <p><span className="text-purple-400">const</span> <span className="text-yellow-300">App</span> = () {'=>'} {'{'}</p>
                                                    <p className="pl-4"><span className="text-purple-400">return</span> (</p>
                                                    <p className="pl-8 text-green-300">{'<div className="app-container">'}</p>
                                                    <p className="pl-12 text-green-300">{'<h1>'}{service.title}{'</h1>'}</p>
                                                    <p className="pl-8 text-green-300">{'</div>'}</p>
                                                    <p className="pl-4">);</p>
                                                    <p>{'}'};</p>
                                                </div>
                                            </div>
                                            <div className="space-y-3 sm:space-y-4">
                                                {service.features.map((feature, idx) => (
                                                    <motion.div key={idx} className="p-4 sm:p-6 bg-white border border-slate-100 rounded-xl shadow-sm flex items-start gap-4">
                                                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0`}>
                                                            <span className={`material-symbols-outlined text-base sm:text-xl text-blue-500`}>check</span>
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-slate-800 text-xs sm:text-sm mb-1">{feature}</h4>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* APP LAYOUT */}
                                    {layout === 'app' && (
                                        <div className="w-full bg-[#0D1F23] rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 md:p-12 text-white relative overflow-hidden">
                                            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative z-10">
                                                <div className="flex-1 space-y-6 sm:space-y-8 pt-0 sm:pt-6">
                                                    <div className="prose prose-invert max-w-none text-slate-400 text-sm" dangerouslySetInnerHTML={{ __html: service.fullDescription }}></div>
                                                    <ul className="space-y-3 sm:space-y-4">
                                                        {service.features.map((item, i) => (
                                                            <li key={i} className="flex items-center gap-3">
                                                                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#05A4A7] flex items-center justify-center text-black">
                                                                    <span className="material-symbols-outlined text-xs sm:text-sm font-bold">check</span>
                                                                </div>
                                                                <span className="font-semibold text-xs sm:text-sm text-slate-200">{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className="flex-1 relative flex justify-center items-center">
                                                    <img src="https://assets.codepen.io/t-1/mobile-frame-png.png" width="200" alt="App" className="relative z-10" />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* GENERIC / OTHER LAYOUTS */}
                                    {(layout !== 'web' && layout !== 'app') && (
                                        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-100">
                                            <div className="prose prose-slate max-w-none mb-8" dangerouslySetInnerHTML={{ __html: service.fullDescription || service.shortDescription }}></div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {service.features.map((feature, idx) => (
                                                    <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                                        <span className="material-symbols-outlined text-[#05A4A7]">check_circle</span>
                                                        <span className="text-sm font-medium text-slate-700">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                </motion.div>
                            </section>
                        );
                    })}

                </div>
            </div>

            {/* CTA FOOTER */}
            <section className="bg-[#021818] text-white py-12 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] bg-[#05A4A7]/10 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-2xl sm:text-4xl md:text-6xl font-black mb-4 sm:mb-6 tracking-tight">Ready to build the future?</h2>
                    <p className="text-sm sm:text-xl text-slate-400 mb-8 sm:mb-10 max-w-2xl mx-auto">
                        Whether you need a complete digital transformation or a specific technical solution, our team is ready to engineer your success.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                        <button className="px-8 py-3.5 sm:px-10 sm:py-5 bg-[#05A4A7] text-white font-bold rounded-lg shadow-[0_0_30px_rgba(5,164,167,0.4)] hover:scale-105 transition-transform text-sm sm:text-base">
                            Start Your Project
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServicesFullPage;
