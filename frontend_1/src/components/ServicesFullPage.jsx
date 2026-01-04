import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Importing existing assets (assuming valid paths from previous file)
import aiImg from '../assets/ai_ml_service_preview_1767285486518.png';
import webImg from '../assets/web_dev_service_preview_1767285503403.png';
import mobileImg from '../assets/mobile_apps_service_preview_1767285521524.png';
import cloudImg from '../assets/cloud_computing_service_preview_1767285540190.png';
import uiuxImg from '../assets/ui_ux_design_service_preview_1767285557945.png';

gsap.registerPlugin(ScrollTrigger);

const ServicesFullPage = () => {
    const containerRef = useRef(null);
    const [activeSection, setActiveSection] = useState('web-dev');

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

    // Scroll Spy Logic for Sidebar
    useEffect(() => {
        const sections = ['web-dev', 'app-dev', 'ai-ml', 'devops'];

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

        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    // Scroll specific section into view
    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
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
                                onClick={() => scrollToSection('web-dev')}
                            >
                                Explore Services
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 sm:px-8 sm:py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-lg hover:border-[#05A4A7] hover:text-[#05A4A7] transition-colors text-sm sm:text-base"
                            >
                                View Case Studies
                            </motion.button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative w-full max-w-md mx-auto lg:max-w-full aspect-[4/3] rounded-2xl bg-[#081226] overflow-hidden shadow-2xl group"
                    >
                        {/* Network Animation Placeholder - CSS Based */}
                        <div className="absolute inset-0 opacity-40">
                            <div className="absolute top-1/2 left-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-[#05A4A7]/20 rounded-full blur-[60px] sm:blur-[80px] -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                            <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                        </div>

                        {/* Card Content */}
                        <div className="relative z-10 w-full h-full flex items-center justify-center scale-75 sm:scale-100">
                            {/* Central Hub */}
                            <div className="w-16 h-16 bg-[#05A4A7] rounded-full flex items-center justify-center z-20 shadow-lg shadow-[#05A4A7]/50">
                                <span className="material-symbols-outlined text-3xl text-white">hub</span>
                            </div>

                            {/* Inner Orbit Ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="absolute w-48 h-48 border border-[#05A4A7]/30 rounded-full flex items-center justify-center"
                            >
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#081226] p-1.5 rounded-full border border-white/10">
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" className="w-6 h-6" alt="React" />
                                </div>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-[#081226] p-1.5 rounded-full border border-white/10">
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" className="w-6 h-6" alt="Python" />
                                </div>
                                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#081226] p-1.5 rounded-full border border-white/10">
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" className="w-6 h-6" alt="NodeJS" />
                                </div>
                            </motion.div>

                            {/* Outer Orbit Ring */}
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                                className="absolute w-80 h-80 border border-[#05A4A7]/20 rounded-full flex items-center justify-center border-dashed"
                            >
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#081226] p-2 rounded-full border border-white/10">
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" className="w-8 h-8" alt="Flutter" />
                                </div>
                                <div className="absolute bottom-0 right-[15%] bg-[#081226] p-2 rounded-full border border-white/10">
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" className="w-8 h-8" alt="AWS" />
                                </div>
                                <div className="absolute bottom-0 left-[15%] bg-[#081226] p-2 rounded-full border border-white/10">
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" className="w-8 h-8" alt="Tensorflow" />
                                </div>
                            </motion.div>
                        </div>

                        {/* Rocket Orbit System */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 z-30 pointer-events-none scale-75 sm:scale-100"
                        >
                            {/* Orbit Path Container */}
                            <div className="absolute top-[50%] left-[50%] w-[90%] h-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full">
                                {/* Rocket Wrapper - Pinned to top of orbit circles */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 flex flex-col items-center justify-center">

                                    {/* Rocket Icon - Rotated to face Tangent (Right/Clockwise) */}
                                    <div className="relative z-20 transform rotate-90">
                                        <span className="material-symbols-outlined text-5xl text-[#05A4A7] drop-shadow-[0_0_15px_rgba(5,164,167,0.8)]">rocket_launch</span>
                                    </div>

                                    {/* Smoke Trail Particles - High Density Stream */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pt-12 transform -rotate-90 origin-top">
                                        {[...Array(12)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="absolute bg-gradient-to-t from-white/0 to-white/60 rounded-full blur-[4px]"
                                                initial={{ opacity: 0, scale: 0.2, y: 0 }}
                                                animate={{
                                                    opacity: [0, 0.6, 0],
                                                    scale: [0.5, 2.5],
                                                    y: [0, 80]
                                                }}
                                                transition={{
                                                    duration: 1.2,
                                                    repeat: Infinity,
                                                    delay: i * 0.1,
                                                    ease: "easeOut"
                                                }}
                                                style={{
                                                    width: 8,
                                                    height: 8,
                                                    left: '50%',
                                                    transform: 'translateX(-50%)'
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
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
                            {[
                                { id: 'web-dev', label: 'Web Development', icon: 'language' },
                                { id: 'app-dev', label: 'App Development', icon: 'smartphone' },
                                { id: 'ai-ml', label: 'AI & Machine Learning', icon: 'smart_toy' },
                                { id: 'devops', label: 'DevOps & Cloud', icon: 'cloud_sync' }
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`text-left px-6 py-3 text-sm font-bold transition-all duration-300 border-l-[3px] -ml-[3px] flex items-center gap-3 ${activeSection === item.id
                                        ? 'border-[#05A4A7] text-[#05A4A7] bg-slate-50'
                                        : 'border-transparent text-slate-500 hover:text-slate-900'
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-lg">{item.icon}</span>
                                    {item.label}
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

                    {/* SECTION 1: WEB DEVELOPMENT */}
                    <section id="web-dev" className="scroll-mt-24 md:scroll-mt-32">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 sm:mb-4">Web Development</h2>
                            <p className="text-slate-600 mb-6 sm:mb-10 max-w-2xl text-xs sm:text-base leading-relaxed">
                                We build scalable, high-performance web architectures tailored to your enterprise needs. From Progressive Web Apps to complex Single Page Applications, our code is clean, efficient, and built for growth.
                            </p>

                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8 items-start">
                                {/* Code Mockup */}
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
                                        <p className="pl-12 text-green-300">{'<h1>Digital Excellence</h1>'}</p>
                                        <p className="pl-12 text-green-300">{'<PerformanceMonitor />'}</p>
                                        <p className="pl-12 text-green-300">{'<SecurityGrid level="enterprise" />'}</p>
                                        <p className="pl-8 text-green-300">{'</div>'}</p>
                                        <p className="pl-4">);</p>
                                        <p>{'}'};</p>
                                        <p className="text-gray-500 italic mt-4">// Optimizing rendering path...</p>
                                        <motion.div
                                            animate={{ width: ["0%", "80%", "0%"] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="h-1 bg-blue-500 rounded-full mt-1"
                                        />
                                    </div>
                                    {/* Glass Overlay with Tech Stack */}
                                    <div className="absolute bottom-4 right-4 flex gap-2 flex-wrap justify-end">
                                        <span className="px-2 py-1 bg-white/10 rounded text-white text-[9px] sm:text-[10px]">React</span>
                                        <span className="px-2 py-1 bg-white/10 rounded text-white text-[9px] sm:text-[10px]">Next.js</span>
                                        <span className="px-2 py-1 bg-white/10 rounded text-white text-[9px] sm:text-[10px]">TS</span>
                                    </div>
                                </div>

                                {/* Feature Cards */}
                                <div className="space-y-3 sm:space-y-4">
                                    {[
                                        { icon: "speed", title: "Performance First", desc: "Optimized rendering and load times for maximum conversion.", color: "text-blue-500", bg: "bg-blue-50" },
                                        { icon: "devices", title: "Responsive Design", desc: "Seamless experiences across mobile, tablet, and desktop.", color: "text-purple-500", bg: "bg-purple-50" },
                                        { icon: "security", title: "Enterprise Security", desc: "Bank-grade encryption and OWASP standard compliance.", color: "text-green-500", bg: "bg-green-50" }
                                    ].map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ x: 10, backgroundColor: "#FFF" }}
                                            className="p-4 sm:p-6 bg-white border border-slate-100 rounded-xl shadow-sm flex items-start gap-4 transition-all"
                                        >
                                            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${item.bg} flex items-center justify-center shrink-0`}>
                                                <span className={`material-symbols-outlined text-base sm:text-xl ${item.color}`}>{item.icon}</span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-800 text-xs sm:text-sm mb-1">{item.title}</h4>
                                                <p className="text-[10px] sm:text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </section>


                    {/* SECTION 2: APP DEVELOPMENT */}
                    <section id="app-dev" className="scroll-mt-24 md:scroll-mt-32">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 sm:mb-6 gap-2">
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 border-l-4 border-yellow-400 pl-4">App Development</h2>
                                <p className="text-slate-500 pl-4 text-xs sm:text-base">Native and cross-platform mobile solutions that engage users.</p>
                            </div>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest hidden md:block">View Mobile Portfolio</span>
                        </div>

                        <div className="w-full bg-[#0D1F23] rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 md:p-12 text-white relative overflow-hidden">
                            {/* Background Gradient */}
                            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#05A4A7]/20 rounded-full blur-[100px] pointer-events-none"></div>

                            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative z-10">
                                <div className="flex-1 space-y-6 sm:space-y-8 pt-0 sm:pt-6">
                                    <h3 className="text-xl sm:text-2xl md:text-4xl font-bold leading-tight">iOS & Android Ecosystems</h3>
                                    <p className="text-slate-400 leading-relaxed max-w-md text-xs sm:text-base">
                                        Whether you need the raw performance of Swift and Kotlin or the speed-to-market of Flutter and React Native, we engineer mobile experiences that feel fluid and native.
                                    </p>

                                    <ul className="space-y-3 sm:space-y-4">
                                        {[
                                            "Intuitive UI/UX Design",
                                            "Offline Capabilities",
                                            "App Store Optimization"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center gap-3">
                                                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#05A4A7] flex items-center justify-center text-black">
                                                    <span className="material-symbols-outlined text-xs sm:text-sm font-bold">check</span>
                                                </div>
                                                <span className="font-semibold text-xs sm:text-sm text-slate-200">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Phones Visual */}
                                <div className="flex-1 min-h-[250px] sm:min-h-[400px] relative flex justify-center items-center scale-90 sm:scale-100">
                                    <motion.div
                                        animate={{ y: [0, -20, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                        className="relative w-[140px] sm:w-[200px] z-20"
                                    >
                                        <img src="https://assets.codepen.io/t-1/mobile-frame-png.png" alt="Phone" className="w-full drop-shadow-2xl relative z-20" />
                                        <div className="absolute top-[3%] left-[4%] w-[92%] h-[94%] bg-white rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden z-10">
                                            <img src={mobileImg} className="w-full h-full object-cover" />
                                        </div>
                                    </motion.div>
                                    <motion.div
                                        animate={{ y: [0, -30, 0] }}
                                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                        className="relative w-[120px] sm:w-[180px] -ml-8 sm:-ml-16 mt-12 sm:mt-20 z-10 opacity-80"
                                    >
                                        <div className="absolute top-[3%] left-[4%] w-[92%] h-[94%] bg-[#05A4A7] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden">
                                            <div className="p-3 sm:p-4 text-white">
                                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full mb-3 sm:mb-4"></div>
                                                <div className="h-1.5 sm:h-2 w-16 sm:w-20 bg-white/20 rounded mb-2"></div>
                                                <div className="h-1.5 sm:h-2 w-10 sm:w-12 bg-white/20 rounded"></div>
                                            </div>
                                        </div>
                                        <img src="https://assets.codepen.io/t-1/mobile-frame-png.png" alt="Phone" className="w-full drop-shadow-xl" />
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </section>


                    {/* SECTION 3: AI & ML */}
                    <section id="ai-ml" className="scroll-mt-24 md:scroll-mt-32">
                        <div className="mb-6 sm:mb-10">
                            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 border-l-4 border-purple-500 pl-4">AI & Machine Learning</h2>
                            <p className="text-slate-600 pl-4 max-w-2xl text-xs sm:text-base">Turn your data into your most valuable asset. We integrate intelligent algorithms to automate processes.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                            {[
                                { title: "Predictive Analytics", icon: "insights", color: "text-purple-600", bg: "bg-purple-100" },
                                { title: "NLP & Chatbots", icon: "chat_bubble", color: "text-blue-600", bg: "bg-blue-100" },
                                { title: "Computer Vision", icon: "visibility", color: "text-pink-600", bg: "bg-pink-100" },
                            ].map((card, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -10 }}
                                    className="p-6 sm:p-8 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col items-start gap-4"
                                >
                                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full ${card.bg} flex items-center justify-center`}>
                                        <span className={`material-symbols-outlined text-xl sm:text-2xl ${card.color}`}>{card.icon}</span>
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold text-slate-900">{card.title}</h3>
                                    <p className="text-[10px] sm:text-xs text-slate-500 leading-relaxed">Advanced algorithms designed to scale with your business intelligence needs.</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Case Highlight */}
                        <div className="w-full p-4 sm:p-6 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4 sm:gap-6">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg shadow-sm flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-purple-600">trending_up</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">Case Highlight: FinTech Forecast</h4>
                                    <p className="text-[10px] sm:text-xs text-slate-500 mt-1">Implemented an ML model for a trading bank that increased fraud detection accuracy by 45%.</p>
                                </div>
                            </div>
                            <button className="text-purple-600 text-xs font-bold hover:underline whitespace-nowrap">Read Study →</button>
                        </div>
                    </section>


                    {/* SECTION 4: DEVOPS */}
                    <section id="devops" className="scroll-mt-24 md:scroll-mt-32">
                        <div className="mb-6 sm:mb-10">
                            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 border-l-4 border-green-500 pl-4">DevOps & Cloud</h2>
                            <p className="text-slate-600 pl-4 max-w-2xl text-xs sm:text-base">We bridge the gap between development and operations. Accelerate delivery, ensure reliability.</p>
                        </div>

                        <div className="relative py-6 sm:py-10">
                            {/* Connecting Line */}
                            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-200 -translate-y-1/2 z-0 hidden md:block"></div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 relative z-10">
                                {[
                                    { num: "1", label: "Audit", desc: "Infra assessment" },
                                    { num: "2", label: "Automate", desc: "CI/CD pipelines" },
                                    { num: "3", label: "Containerize", desc: "Docker & K8s" },
                                    { num: "4", label: "Monitor", desc: "24/7 Performance" }
                                ].map((step, idx) => (
                                    <div key={idx} className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#05A4A7] text-white font-bold flex items-center justify-center mb-3 sm:mb-4 shadow-lg shadow-[#05A4A7]/30 text-xs sm:text-base">
                                            {step.num}
                                        </div>
                                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{step.label}</h4>
                                        <p className="text-[10px] sm:text-xs text-slate-500 mt-1">{step.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tech Logos */}
                        <div className="mt-6 sm:mt-8 flex gap-3 sm:gap-4 md:gap-8 flex-wrap opacity-60 grayscale hover:grayscale-0 transition-all justify-center md:justify-start">
                            {/* Simple placeholer logos */}
                            <div className="h-8 flex items-center font-bold text-slate-700 gap-1.5 sm:gap-2 text-xs sm:text-base"><span className="material-symbols-outlined text-sm sm:text-base">cloud</span> AWS</div>
                            <div className="h-8 flex items-center font-bold text-slate-700 gap-1.5 sm:gap-2 text-xs sm:text-base"><span className="material-symbols-outlined text-sm sm:text-base">dns</span> Azure</div>
                            <div className="h-8 flex items-center font-bold text-slate-700 gap-1.5 sm:gap-2 text-xs sm:text-base"><span className="material-symbols-outlined text-sm sm:text-base">deployed_code</span> Docker</div>
                        </div>
                    </section>

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
                        <button className="px-8 py-3.5 sm:px-10 sm:py-5 bg-transparent border border-gray-600 text-white font-bold rounded-lg hover:bg-white/5 transition-colors text-sm sm:text-base">
                            Schedule a Call
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServicesFullPage;
