import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const partners = [
    {
        id: 1,
        name: "TechVision Solutions",
        location: "Mumbai, India",
        type: "Premium Partner",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400&h=250"
    },
    {
        id: 2,
        name: "Global Connect Inc",
        location: "Delhi, India",
        type: "Gold Partner",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400&h=250"
    },
    {
        id: 3,
        name: "Elite Systems",
        location: "Bangalore, India",
        type: "Strategic Partner",
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=400&h=250"
    },
    {
        id: 4,
        name: "Future Grid Co.",
        location: "Hyderabad, India",
        type: "Silver Partner",
        image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=400&h=250"
    }
];

const ChannelPartners = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header text animation - Using a stable trigger
            gsap.from(".partner-header-text", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play reverse play reverse",
                }
            });

            // Cards animation - Using a stable trigger
            gsap.from(".partner-card", {
                y: 40,
                opacity: 0,
                scale: 0.98,
                duration: 0.6,
                stagger: 0.08,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".partner-cards-grid",
                    start: "top 85%",
                    toggleActions: "play reverse play reverse",
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-white py-16 relative overflow-hidden font-sans">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#05A4A7]/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-400/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-[1440px] mx-auto px-4 md:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
                    <div className="max-w-2xl">
                        <div className="overflow-hidden">
                            <span className="partner-header-text block text-[#05A4A7] font-bold tracking-[0.2em] uppercase text-xs mb-3">
                                Strategic Alliances
                            </span>
                        </div>
                        <div className="overflow-hidden">
                            <h2 className="partner-header-text text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter leading-tight">
                                Our Channel <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#05A4A7] to-emerald-400">Partners</span>
                            </h2>
                        </div>
                    </div>

                    <div className="flex flex-col items-start lg:items-end">
                        <div className="flex flex-wrap gap-3 partner-header-text">
                            <Link
                                to="/channel-partners"
                                className="group flex items-center gap-2 text-gray-900 hover:text-[#05A4A7] transition-all duration-300 font-bold uppercase text-[10px] tracking-widest px-5 py-2.5 border border-gray-200 rounded-full hover:border-[#05A4A7]"
                            >
                                View All
                                <span className="material-symbols-outlined text-xs transform group-hover:translate-x-1 transition-transform">
                                    arrow_forward
                                </span>
                            </Link>
                            <Link
                                to="/channel-partners#apply"
                                className="bg-gradient-to-r from-[#05A4A7] to-emerald-500 text-white px-6 py-2.5 rounded-full font-bold uppercase text-[10px] tracking-[0.2em] hover:shadow-[0_8px_15px_rgba(5,164,167,0.2)] transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5"
                            >
                                Become a Partner
                                <span className="material-symbols-outlined text-xs">edit_note</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="partner-cards-grid grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
                    {partners.map((partner) => (
                        <div
                            key={partner.id}
                            className="partner-card group relative"
                        >
                            <motion.div
                                whileHover={{ y: -15 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="bg-gray-50 border border-gray-100 rounded-2xl md:rounded-[2rem] overflow-hidden transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-[#05A4A7]/10"
                            >
                                <div className="relative h-32 md:h-60 overflow-hidden">
                                    <img
                                        src={partner.image}
                                        alt={partner.name}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-115"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                                    <div className="absolute top-2 right-2 md:top-5 md:right-5">
                                        <div className="bg-white/90 backdrop-blur-md px-2 py-1 md:px-4 md:py-1.5 rounded-full border border-gray-100 shadow-sm">
                                            <span className="text-[7px] md:text-[10px] font-black text-[#05A4A7] uppercase tracking-widest">{partner.type.split(' ')[0]}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-3 md:p-8">
                                    <h3 className="text-sm md:text-2xl font-bold text-gray-900 mb-1 md:mb-3 group-hover:text-[#05A4A7] transition-colors line-clamp-1">
                                        {partner.name}
                                    </h3>
                                    <div className="flex items-center gap-1 md:gap-2 text-gray-500 font-medium">
                                        <div className="w-5 h-5 md:w-8 md:h-8 rounded-full bg-[#05A4A7]/10 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-[10px] md:text-sm text-[#05A4A7]">location_on</span>
                                        </div>
                                        <span className="text-[9px] md:text-sm tracking-wide truncate">{partner.location}</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ChannelPartners;
