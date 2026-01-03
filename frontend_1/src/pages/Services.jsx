import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import ContactUs from '../components/ContactUs';
import ScrollReveal from '../components/ScrollReveal';
import ScrollWrapper from '../components/ScrollWrapper';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ServicesPage = () => {
    // 🎨 Service Data with verified stable .lottie URLs
    const services = [
        {
            title: "Website",
            slug: "website",
            desc: "Custom-built, SEO-optimized, and lightning-fast websites designed to convert visitors into loyal customers.",
            lottie: "https://lottie.host/81b212f4-ce6a-493e-9080-60b5a31b8162/Vf0O9iXv6Z.lottie",
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            title: "Web App",
            slug: "web-app",
            desc: "Complex business logic, real-time data integration, and enterprise-grade security for your SaaS platforms.",
            lottie: "https://lottie.host/4a539b75-197e-4054-94c3-636c84c1f24d/qK7XU7u7u7.lottie",
            color: "text-purple-600",
            bg: "bg-purple-50"
        },
        {
            title: "Mobile App",
            slug: "mobile-application",
            desc: "Native and Cross-platform (React Native/Flutter) apps that provide seamless user experiences.",
            lottie: "https://lottie.host/6ad307d8-18e0-405c-9d6e-9ca28841b9d4/f3iV3Gv4Gv.lottie",
            color: "text-pink-600",
            bg: "bg-pink-50"
        },
        {
            title: "UI/UX Design",
            slug: "ui-ux-design",
            desc: "User-centered, research-driven design that reduces friction and increases engagement.",
            lottie: "https://lottie.host/8b7d995c-3f41-477d-810a-ade6a41f6e2b/lU7fM7fM7f.lottie",
            color: "text-orange-600",
            bg: "bg-orange-50"
        },
        {
            title: "Maintenance",
            slug: "maintenance",
            desc: "Regular updates, security patches, and 24/7 monitoring to ensure zero downtime.",
            lottie: "https://lottie.host/17b35f63-3dc4-436f-870a-7ca7663f733f/P3UaP3UaP3.lottie",
            color: "text-green-600",
            bg: "bg-green-50"
        },
        {
            title: "Digital Marketing",
            slug: "digital-marketing",
            desc: "Data-driven strategies across social media, email, and PPC to scale your brand reach.",
            lottie: "https://lottie.host/2e2a77a9-e85d-4f1b-9f37-1c641c8888b1/marketAnim.lottie",
            color: "text-red-600",
            bg: "bg-red-50"
        },
        {
            title: "SEO Services",
            slug: "seo-services",
            desc: "Technical SEO audits, content strategy, and high-quality backlink building to dominate search results.",
            lottie: "https://lottie.host/93256d25-5e3a-4f51-8526-9e6b4d326954/seo.lottie",
            color: "text-teal-600",
            bg: "bg-teal-50"
        },
        {
            title: "Logo Design",
            slug: "logo-design",
            desc: "Iconic and memorable brand identities that reflect your vision and values across all platforms.",
            lottie: "https://lottie.host/1b5e5e4b-9e4b-4e4b-8e4b-1c5e5e4b9e4b/logo.lottie",
            color: "text-indigo-600",
            bg: "bg-indigo-50"
        },
        {
            title: "Graphic Design",
            slug: "graphic-design",
            desc: "Custom illustrations, high-end social media assets, and print-ready designs for marketing.",
            lottie: "https://lottie.host/b03487f5-27a1-4326-9080-92864388e6e7/graphic.lottie",
            color: "text-yellow-600",
            bg: "bg-yellow-50"
        }
    ];

    return (
        <ScrollWrapper>
            <div className="bg-[#f8fafc] min-h-screen font-sans overflow-x-hidden selection:bg-[#4F46E5] selection:text-white">
                <Navbar />

                {/* --- HERO SECTION --- */}
                <section className="relative h-[45vh] min-h-[450px] flex items-center justify-center overflow-hidden bg-slate-900 px-6">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                    <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/30 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-500/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>

                    <div className="relative z-10 text-center text-white">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-8 leading-none"
                        >
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-primary to-purple-400">Services</span>
                        </motion.h1>
                        <p className="text-slate-300 text-lg md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed opacity-80">
                            Engineering excellence and imaginative design to propel your vision forward. Explore our comprehensive deck of digital solutions.
                        </p>
                    </div>
                </section>

                {/* --- SERVICES GRID --- */}
                <section className="py-24 px-6 md:px-12 max-w-[1600px] mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                        {services.map((service, i) => (
                            <Link to={`/services/${service.slug}`} key={i} className="block group h-full">
                                <div className="relative w-full h-[650px] rounded-[3rem] overflow-hidden cursor-pointer shadow-[0_30px_60px_rgba(0,0,0,0.06)] hover:shadow-[0_50px_100px_rgba(79,70,229,0.2)] transition-all duration-700 bg-white border border-slate-100 flex flex-col">

                                    {/* --- DEFAULT VIEW --- */}
                                    <div className="absolute inset-0 flex flex-col items-center transition-all duration-700 group-hover:scale-105 group-hover:opacity-0 group-hover:-translate-y-20 delay-75 z-20 bg-white">

                                        {/* Animation Container */}
                                        <div className="flex-[3] w-full flex items-center justify-center p-6 mt-4">
                                            <div className={`w-full h-full rounded-[2.5rem] ${service.bg} flex items-center justify-center relative shadow-inner overflow-hidden border border-slate-50`}>
                                                <DotLottieReact
                                                    src={service.lottie}
                                                    loop
                                                    autoplay
                                                    className="w-full h-full object-contain transform scale-125"
                                                />
                                            </div>
                                        </div>

                                        {/* Title Section */}
                                        <div className="flex-1 w-full flex flex-col justify-center items-center pb-12 px-6">
                                            <h3 className="text-4xl font-black text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors text-center">
                                                {service.title}
                                            </h3>
                                            <div className="w-16 h-1.5 bg-indigo-500 mx-auto mt-4 rounded-full transform origin-center group-hover:scale-x-150 transition-all duration-500"></div>
                                        </div>
                                    </div>

                                    {/* --- HOVER VIEW --- */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5] via-[#3730A3] to-[#1E1B4B] flex flex-col items-center justify-center p-12 text-center opacity-0 group-hover:opacity-100 translate-y-32 group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] z-10">
                                        <h4 className="text-white text-4xl font-black mb-6 tracking-tight uppercase italic drop-shadow-lg">{service.title}</h4>
                                        <p className="text-white/90 text-xl font-medium leading-relaxed mb-10 italic">
                                            {service.desc}
                                        </p>
                                        <div className="pt-6 text-center">
                                            <div className="inline-flex items-center gap-4 bg-white px-10 py-5 rounded-full text-[#4F46E5] font-black uppercase tracking-widest text-base shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:scale-110 active:scale-95 transition-all group/btn cursor-pointer">
                                                Explore Now
                                                <span className="material-symbols-outlined group-hover:translate-x-3 transition-transform duration-500">arrow_right_alt</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                <ScrollReveal>
                    <ContactUs isHomePage={true} />
                </ScrollReveal>

                <ScrollReveal>
                    <Footer />
                </ScrollReveal>
            </div>
        </ScrollWrapper>
    );
};

export default ServicesPage;
