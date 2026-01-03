import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import ContactUs from '../components/ContactUs';
import ScrollReveal from '../components/ScrollReveal';
import ScrollWrapper from '../components/ScrollWrapper';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ServicesPage = () => {
    const services = [
        { title: "Website", slug: "website", desc: "Crafting stunning, high-performance websites that leave a lasting digital footprint.", icon: "language" },
        { title: "Web App", slug: "web-app", desc: "Building complex, feature-rich web applications tailored for enterprise-level demands.", icon: "laptop_mac" },
        { title: "Mobile Application", slug: "mobile-application", desc: "Expert Android, iOS, and Hybrid app development for an unmatched mobile experience.", icon: "smartphone" },
        { title: "UI/UX Design", slug: "ui-ux-design", desc: "Designing intuitive and immersive user interfaces that prioritize engagement and flow.", icon: "architecture" },
        { title: "Maintenance", slug: "maintenance", desc: "Providing 24/7 support and regular optimization to keep your platforms running flawlessly.", icon: "handyman" },
        { title: "Digital Marketing", slug: "digital-marketing", desc: "Strategic marketing solutions to amplify your brand's reach and dominate the market.", icon: "campaign" },
        { title: "SEO Services", slug: "seo-services", desc: "Dominating search rankings with ethical, results-driven search engine optimization.", icon: "query_stats" },
        { title: "Logo Design", slug: "logo-design", desc: "Creating memorable and unique brand identities that tell your story at a glance.", icon: "auto_awesome" },
        { title: "Graphic Design", slug: "graphic-design", desc: "High-end visual assets that reflect your brand’s excellence across all digital touchpoints.", icon: "brush" }
    ];

    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const cardsRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header Animation
            gsap.from(headerRef.current.children, {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: "top 85%",
                }
            });

            // Cards Staggered Animation
            ScrollTrigger.batch(".service-card", {
                onEnter: batch => gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    stagger: {
                        each: 0.1,
                        grid: "auto",
                        from: "start"
                    },
                    duration: 1.4,
                    ease: "power3.out",
                    overwrite: true
                }),
                onLeaveBack: batch => gsap.set(batch, { opacity: 0, y: 100, scale: 0.9, overwrite: true }),
                start: "top 90%",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <ScrollWrapper>
            <div className="bg-[#f8fafc] min-h-screen font-sans overflow-x-hidden">
                <Navbar />

                {/* --- HERO SECTION --- */}
                <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2340&auto=format&fit=crop"
                            className="w-full h-full object-cover"
                            alt="Hero Background"
                        />
                        <div className="absolute inset-0 bg-black/60" />
                    </div>

                    <div className="relative z-10 text-center text-white px-4">
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="text-5xl md:text-7xl font-bold uppercase tracking-tight italic"
                        >
                            Our <span className="text-primary italic">Services</span>
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center justify-center gap-3 mt-6 text-sm font-medium uppercase tracking-[0.2em]"
                        >
                            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                            <span className="text-primary">&gt;</span>
                            <span className="text-white/60">Our Services</span>
                        </motion.div>
                    </div>
                </section>

                {/* --- FEATURES SECTION --- */}
                <section ref={sectionRef} className="pt-10 pb-24 px-10 lg:px-24 max-w-[1700px] mx-auto">
                    <div ref={headerRef} className="text-center mb-24">
                        <p className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-4">
                            Feature Services
                        </p>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tighter uppercase italic leading-tight">
                            A wide range of <br />
                            <span className="text-primary italic">Next-Gen Solutions</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 gap-y-20">
                        {services.map((service, i) => (
                            <Link
                                key={i}
                                to={`/services/${service.slug}`}
                                className="service-card opacity-0 translate-y-20 scale-95 relative bg-[#0f172a] pt-12 pb-10 px-6 rounded-2xl shadow-2xl border border-white/5 text-center group block cursor-pointer"
                            >
                                {/* OVERLAPPING ICON CASE */}
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#1e293b] rounded-xl shadow-xl flex items-center justify-center transition-all duration-500 border border-white/10 group-hover:-translate-y-2">
                                    <span className="material-icons text-2xl text-primary transition-transform duration-500 group-hover:scale-110">
                                        {service.icon}
                                    </span>
                                </div>

                                <h3 className="text-xl font-black text-white uppercase italic tracking-tight mb-4 transition-colors group-hover:text-primary">
                                    {service.title}
                                </h3>
                                <p className="text-slate-400 text-xs leading-relaxed italic mb-8 min-h-[60px]">
                                    {service.desc}
                                </p>

                                <div className="flex justify-center items-center gap-2">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500">Explore</span>
                                    <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-slate-500 group-hover:bg-primary group-hover:text-white transition-all shadow-sm group-hover:shadow-lg group-hover:shadow-primary/30">
                                        <span className="material-icons text-lg">east</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>

            <ScrollReveal>
                <ContactUs isHomePage={true} />
            </ScrollReveal>

            <ScrollReveal>
                <Footer />
            </ScrollReveal>
        </ScrollWrapper>
    );
};

export default ServicesPage;
