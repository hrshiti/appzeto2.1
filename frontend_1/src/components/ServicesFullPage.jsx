import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Link } from 'react-router-dom';

// Importing existing assets
import aiImg from '../assets/ai_ml_service_preview_1767285486518.png';
import webImg from '../assets/web_dev_service_preview_1767285503403.png';
import mobileImg from '../assets/mobile_apps_service_preview_1767285521524.png';
import cloudImg from '../assets/cloud_computing_service_preview_1767285540190.png';
import uiuxImg from '../assets/ui_ux_design_service_preview_1767285557945.png';

gsap.registerPlugin(ScrollTrigger);

// Static Data
const staticServices = [
    {
        id: "web-dev",
        slug: "web-development",
        title: "Web Development Company Building Fast & Scalable Websites",
        icon: "language",
<<<<<<< HEAD
        shortDescription: "We build high-performance websites and web applications ensuring scalability, speed, and SEO optimization.",
        fullDescription: "As a leading web development company, we build scalable, secure, and fast web applications tailored to your business needs. Our expertise includes frontend development with React, backend systems with Node.js, and full-stack solutions that drive growth for startups and enterprises.",
        features: ["Custom React Development", "Next.js SSR & SSG", "Responsive Design", "API Integration"]
=======
        layoutType: 'web',
        shortDescription: "High-performance websites and web applications built with modern technologies like React, Next.js, and Node.js.",
        fullDescription: "We build scalable, secure, and fast web applications tailored to your business needs. Our expertise includes frontend development with React, backend systems with Node.js, and full-stack solutions that drive growth.",
        features: ["Custom React Development", "Next.js SSR & SSG", "Responsive Design", "API Integration"],
        image: webImg,
        visualFilename: "WebDevPreview.png"
>>>>>>> 6c2142524a8eacd17fa108e90b3e92a965eb9627
    },
    {
        id: "app-dev",
        slug: "mobile-apps",
        title: "Mobile App Development Company for Android & iOS Solutions",
        icon: "smartphone",
        layoutType: 'app',
        shortDescription: "Native and cross-platform mobile apps for iOS and Android using Flutter and React Native.",
<<<<<<< HEAD
        fullDescription: "We are a mobile app development company transforming ideas into powerful mobile experiences. We specialize in creating intuitive, high-performance mobile applications that engage users and provide seamless functionality across all devices.",
        features: ["iOS & Android Apps", "Cross-Platform Flutter", "React Native Solutions", "App Store Optimization"]
=======
        fullDescription: "Transform your ideas into powerful mobile experiences. We specialize in creating intuitive, high-performance mobile applications that engage users and provide seamless functionality across all devices.",
        features: ["iOS & Android Apps", "Cross-Platform Flutter", "React Native Solutions", "App Store Optimization"],
        image: mobileImg,
        visualFilename: "AppDevPreview.png"
>>>>>>> 6c2142524a8eacd17fa108e90b3e92a965eb9627
    },
    {
        id: "ai-ml",
        slug: "ai-solutions",
        title: "AI & Machine Learning Software Development Services",
        icon: "smart_toy",
        layoutType: 'generic',
        shortDescription: "Intelligent automation and data-driven solutions to future-proof your business.",
<<<<<<< HEAD
        fullDescription: "Leverage the power of Artificial Intelligence to automate processes and gain insights. From custom chatbots to predictive modeling, our AI software development services integrate intelligent algorithms into your workflow for maximum efficiency.",
        features: ["Custom AI Models", "NLP & Chatbots", "Predictive Analytics", "Machine Learning Integration"]
    },
    {
        id: "custom-software",
        slug: "custom-software",
        title: "Custom Software Development Company for Businesses",
        icon: "business",
        shortDescription: "Scalable architectures, cloud solutions, and tailored enterprise software.",
        fullDescription: "As a custom software development company, we design and build software tailored to your specific business processes. We emphasize scalable architecture, cloud integration, and enterprise-grade security to support your long-term growth.",
        features: ["Enterprise Software", "Cloud Solutions", "Workflow Automation", "API Development"]
=======
        fullDescription: "Leverage the power of Artificial Intelligence to automate processes and gain insights. From custom chatbots to predictive modeling, we integrate AI into your workflow for maximum efficiency.",
        features: ["Custom AI Models", "NLP & Chatbots", "Predictive Analytics", "Machine Learning Integration"],
        image: aiImg,
        visualFilename: "AIPreview.png"
    },
    {
        id: "cloud-devops",
        slug: "cloud-devops",
        title: "Cloud & DevOps",
        icon: "cloud_sync",
        layoutType: 'generic',
        shortDescription: "Streamlined deployment pipelines and robust cloud infrastructure for high availability.",
        fullDescription: "Optimize your software delivery process with our DevOps expertise. We manage cloud infrastructure on AWS and Azure, ensuring your applications are always available, scalable, and secure.",
        features: ["AWS/Azure Management", "CI/CD Pipelines", "Docker & Kubernetes", "Infrastructure as Code"],
        image: cloudImg,
        visualFilename: "CloudPreview.png"
    },
    {
        id: "ui-ux",
        slug: "ui-ux-design",
        title: "UI/UX Design",
        icon: "design_services",
        layoutType: 'generic',
        shortDescription: "User-centric designs that combine aesthetics with seamless functional experiences.",
        fullDescription: "We believe that great technology starts with great design. Our team creates visually stunning and Highly functional interfaces that provide an exceptional user experience on every screen.",
        features: ["User Research", "Wireframing & Prototyping", "Visual Design", "Interaction Design"],
        image: uiuxImg,
        visualFilename: "UIUXPreview.png"
>>>>>>> 6c2142524a8eacd17fa108e90b3e92a965eb9627
    }
];

const ServicesFullPage = () => {
    const containerRef = useRef(null);
    const [activeSection, setActiveSection] = useState(staticServices[0].slug);
    const services = staticServices; // Use static data directly

    // Smooth Scroll Setup
    useEffect(() => {
        const lenis = new Lenis();
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, []);

    // Intersection Observer for Active Section
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.5, rootMargin: "-10% 0px -40% 0px" }
        );

        services.forEach(service => {
            const el = document.getElementById(service.slug || service._id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [services]);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Helper to format code content for display
    const renderCodeSnippet = (service) => {
        if (!service.visualCode) return (
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
        );

        return (
            <pre className="whitespace-pre-wrap break-all text-xs text-green-400 overflow-x-auto custom-scrollbar">
                {service.visualCode}
            </pre>
        );
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
                                onClick={() => services.length > 0 && scrollToSection(services[0].slug)}
                            >
                                Explore Services
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Dynamic Tech Orbit Animation */}
                    <div className="relative w-full max-w-[500px] aspect-square mx-auto lg:mx-0 hidden md:flex items-center justify-center perspective-1000">

                        {/* Core Glow */}
                        <div className="absolute w-[40%] h-[40%] bg-[#05A4A7]/20 blur-[60px] rounded-full animate-pulse"></div>

                        {/* Center Hub */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="relative z-20 w-24 h-24 bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_0_40px_rgba(5,164,167,0.2)] flex items-center justify-center border border-white"
                        >
                            <img src="/src/assets/logo.png" alt="Appzeto" className="w-[80%] h-[80%] object-contain" />
                        </motion.div>

                        {/* Orbit 1 (Inner) */}
                        <div className="absolute w-[65%] h-[65%] rounded-full border border-[#05A4A7]/20 animate-[spin_20s_linear_infinite]">
                            {/* React */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-lg p-3 flex items-center justify-center animate-[spin_20s_linear_infinite_reverse] group cursor-pointer">
                                <img src="/src/assets/react.svg" alt="React" className="w-full h-full object-contain animate-[spin_10s_linear_infinite]" />
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                    React JS
                                </div>
                            </div>
                            {/* Node/Server */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-lg p-3 flex items-center justify-center animate-[spin_20s_linear_infinite_reverse] group cursor-pointer">
                                <span className="material-symbols-outlined text-3xl text-green-600">dns</span>
                                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                    Backend
                                </div>
                            </div>
                        </div>

                        {/* Orbit 2 (Middle) */}
                        <div className="absolute w-[90%] h-[90%] rounded-full border border-slate-200 animate-[spin_30s_linear_infinite_reverse]">
                            {/* Mobile */}
                            <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-lg p-3.5 flex items-center justify-center animate-[spin_30s_linear_infinite] group cursor-pointer">
                                <span className="material-symbols-outlined text-3xl text-blue-500">smartphone</span>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                    Mobile Apps
                                </div>
                            </div>
                            {/* Cloud */}
                            <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-lg p-3.5 flex items-center justify-center animate-[spin_30s_linear_infinite] group cursor-pointer">
                                <span className="material-symbols-outlined text-3xl text-sky-500">cloud</span>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                    Cloud Infra
                                </div>
                            </div>
                        </div>

                        {/* Orbit 3 (Outer Decor) */}
                        <div className="absolute w-[120%] h-[120%] rounded-full border border-dashed border-slate-200/50 animate-[spin_60s_linear_infinite]">
                            <div className="absolute top-[15%] left-[15%] w-10 h-10 bg-white rounded-full shadow text-xs flex items-center justify-center font-bold text-purple-500 animate-[spin_60s_linear_infinite_reverse]">
                                AI
                            </div>
                            <div className="absolute bottom-[20%] right-[10%] w-10 h-10 bg-white rounded-full shadow text-xs flex items-center justify-center font-bold text-orange-500 animate-[spin_60s_linear_infinite_reverse]">
                                UX
                            </div>
                        </div>

                    </div>
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
                                    onClick={() => scrollToSection(service.slug)}
                                    className={`text-left px-6 py-3 text-sm font-bold transition-all duration-300 border-l-[3px] -ml-[3px] flex items-center gap-3 ${activeSection === service.slug
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
                        const layout = service.layoutType || 'web';

                        // Helper to get static asset image based on title
                        // For static data, we assume service.image is already the imported asset
                        const displayImage = service.image;

                        return (
                            <section key={service.id} id={service.slug} className="scroll-mt-24 md:scroll-mt-32">
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
                                                    <div className="text-[10px] text-gray-500 ml-4">{service.visualFilename || 'ServicePreview.png'}</div>
                                                </div>
                                                {displayImage ? (
                                                    <div className="relative w-full h-full overflow-hidden rounded-lg">
                                                        <img
                                                            src={displayImage}
                                                            alt={service.title}
                                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                                    </div>
                                                ) : (
                                                    renderCodeSnippet(service)
                                                )}
                                            </div>
                                            <div className="space-y-3 sm:space-y-4">
                                                {Array.isArray(service.features) && service.features.map((feature, idx) => (
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
                                                        {Array.isArray(service.features) && service.features.map((item, i) => (
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
                                                    <div className="relative group">
                                                        <div className="absolute -inset-1 bg-gradient-to-r from-[#05A4A7] to-emerald-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                                                        <img
                                                            src={displayImage || "https://assets.codepen.io/t-1/mobile-frame-png.png"}
                                                            width="220"
                                                            alt={service.title}
                                                            className="relative z-10 rounded-[2rem] object-cover h-[440px] w-[220px]"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* GENERIC / OTHER LAYOUTS */}
                                    {layout === 'generic' && (
                                        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-100">
                                            <div className="prose prose-slate max-w-none mb-8" dangerouslySetInnerHTML={{ __html: service.fullDescription || service.shortDescription }}></div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {Array.isArray(service.features) && service.features.map((feature, idx) => (
                                                    <section key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                                        <span className="material-symbols-outlined text-[#05A4A7]">check_circle</span>
                                                        <span className="text-sm font-medium text-slate-700">{feature}</span>
                                                    </section>
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
