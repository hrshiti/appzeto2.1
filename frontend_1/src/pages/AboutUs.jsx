import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import Navbar from '../components/Navbar';
import AboutSections from '../components/AboutSections';
import ceoImage from '../assets/ceo.jpeg';
import ContactUs from '../components/ContactUs';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';
import ScrollWrapper from '../components/ScrollWrapper';
import { motion } from 'framer-motion';
import { officesData } from '../data/officesData';

const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, margin: "-100px" },
    transition: { duration: 0.8, ease: "easeOut" }
};

const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: false },
    transition: { staggerChildren: 0.1 }
};

const AboutUs = () => {
    // Handle hash on initial load and changes
    useEffect(() => {
        const handleHashScroll = () => {
            const hash = window.location.hash;
            if (hash) {
                const id = hash.replace('#', '');
                const el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                }
            }
        };

        setTimeout(handleHashScroll, 100);
        window.addEventListener('hashchange', handleHashScroll);
        return () => window.removeEventListener('hashchange', handleHashScroll);
    }, []);

    return (
        <ScrollWrapper>
            <div className="bg-white font-body text-gray-800 selection:bg-primary selection:text-white">
                {/* Navigation - Duplicated/Adapted from Hero.jsx for consistency but can be refactored */}
                <Navbar />

                <header className="relative w-full min-h-[450px] md:min-h-0 h-auto md:h-[60vh] flex items-center justify-center bg-gray-900 overflow-hidden pt-24 md:pt-0">
                    <motion.div
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.6 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 z-0"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
                            alt="Office"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40"></div>
                    </motion.div>
                    <div className="relative z-10 text-center text-white px-4">
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-2 md:mb-4 font-display uppercase">
                            About Appzeto – <br />
                            Technology Solutions Company
                        </h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-xs sm:text-lg lg:text-xl font-light text-gray-200 tracking-wide mb-4 md:mb-6 max-w-xs sm:max-w-none mx-auto"
                        >
                            Innovating for those who demand excellence.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex items-center justify-center gap-2 text-[10px] sm:text-sm text-gray-300"
                        >
                            <Link to="/" className="hover:text-white transition-colors">Home</Link>
                            <span>/</span>
                            <span className="text-primary font-medium">About Us</span>
                        </motion.div>
                    </div>

                </header>

                <section id="we-are-appzeto" className="py-12 md:py-24 px-4 md:px-10 max-w-7xl mx-auto overflow-hidden scroll-mt-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="space-y-4 md:space-y-8"
                        >
                            <div>
                                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-6 font-display tracking-tight">WE ARE APPZETO</h2>
                                <blockquote className="text-sm md:text-xl text-gray-500 italic border-l-4 border-primary pl-4 mb-3 md:mb-6">
                                    "We don't impress with design. We build trust with clarity."
                                </blockquote>
                                <p className="text-gray-600 leading-relaxed mb-3 text-xs sm:text-base">
                                    Appzeto is a technology solutions company dedicated to transforming businesses through digital innovation. We specialize in robust Web Development, cutting-edge Mobile Apps, and intelligent AI & ML solutions.
                                </p>
                                <p className="text-gray-600 leading-relaxed text-xs sm:text-base hidden sm:block">
                                    Our philosophy is simple: we don't just build software; we engineer ecosystems. Reliability, scalability, and user-centric design are at the core of everything we create.
                                </p>
                            </div>

                            <div className="pt-4 md:pt-6">
                                <p className="text-[10px] md:text-xs font-bold text-primary uppercase tracking-[0.2em] mb-3">LEADERSHIP</p>
                                <div className="flex flex-col items-start">
                                    <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">Sumit Jaiswal</h4>
                                    <p className="text-xs md:text-sm text-gray-500 font-medium">Founder & Chief Executive Officer</p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="relative mt-4 md:mt-0"
                        >
                            <div className="aspect-[4/5] sm:aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden relative group max-h-[350px] sm:max-h-none mx-auto w-full max-w-[280px] sm:max-w-none shadow-2xl">
                                <img
                                    src={ceoImage}
                                    alt="CEO"
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                                />
                                <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent">
                                    <p className="text-white text-lg md:text-xl font-bold">Sumit Jaiswal</p>
                                    <p className="text-primary text-xs md:text-sm font-medium">Founder & CEO</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section id="why-choose-us" className="py-8 md:py-24 bg-gray-50 overflow-hidden scroll-mt-20">
                    <div className="max-w-7xl mx-auto px-4 md:px-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false }}
                                transition={{ duration: 0.8 }}
                                className="order-2 lg:order-1 relative hidden md:block"
                            >
                                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl relative group">
                                    <img
                                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                                        alt="Team Collaboration"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: false }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    className="absolute -bottom-8 -right-8 bg-white p-8 rounded-xl shadow-xl hidden md:block"
                                >
                                    <p className="text-4xl font-bold text-primary mb-1">2k+</p>
                                    <p className="text-gray-500 font-medium whitespace-nowrap">Successful Projects</p>
                                </motion.div>
                            </motion.div>
                            <div className="order-1 lg:order-2 space-y-6 md:space-y-10">
                                <motion.div {...fadeInUp}>
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4 font-display">WHY CHOOSE US</h2>
                                    <p className="text-gray-600 text-xs sm:text-base">
                                        We combine technical expertise with business acumen to deliver solutions that actually work.
                                    </p>
                                </motion.div>

                                <motion.div
                                    variants={staggerContainer}
                                    initial="initial"
                                    whileInView="whileInView"
                                    viewport={{ once: false }}
                                    className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 md:gap-x-8 md:gap-y-10"
                                >
                                    {[
                                        { icon: "lightbulb", title: "Innovative Strategy", desc: "Forward-thinking approaches to solve modern problems." },
                                        { icon: "tune", title: "Easy Customization", desc: "Flexible solutions tailored to your specific needs." },
                                        { icon: "headset_mic", title: "24/7 Support", desc: "Always here to ensure your operations run smoothly." },
                                        { icon: "rocket_launch", title: "Performance First", desc: "Optimized for speed, efficiency, and scalability." },
                                        { icon: "security", title: "Top-Tier Security", desc: "Enterprise-grade protection for your data." },
                                        { icon: "code", title: "Clean Development", desc: "Maintainable, high-quality code standards." }
                                    ].map((feature, i) => (
                                        <motion.div
                                            key={i}
                                            variants={{
                                                initial: { opacity: 0, y: 20 },
                                                whileInView: { opacity: 1, y: 0 }
                                            }}
                                            className="flex gap-3 md:gap-4 group cursor-default"
                                        >
                                            <div className="flex-shrink-0 w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                                <span className="material-icons text-lg md:text-2xl">{feature.icon}</span>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 mb-0.5 md:mb-2 text-xs sm:text-base group-hover:text-primary transition-colors">{feature.title}</h3>
                                                <p className="text-[10px] sm:text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* New Middle Section */}
                <AboutSections />

                <section id="offices" className="py-8 md:py-16 bg-gray-50 overflow-hidden scroll-mt-20">
                    <div className="max-w-7xl mx-auto px-4 md:px-10">
                        <motion.div
                            {...fadeInUp}
                            className="text-center mb-8 md:mb-12"
                        >
                            <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-2 block">Global Footprint</span>
                            <h2 className="text-2xl md:text-4xl font-black text-gray-900 uppercase tracking-tighter mb-4">Our <span className="text-primary">Offices</span></h2>
                            <p className="text-gray-500 max-w-xl mx-auto text-xs md:text-sm leading-relaxed">
                                Strategically located in the world's leading technology hubs to better serve our global clientele.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                            {officesData.map((office, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                                    viewport={{ once: false }}
                                    className="group bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
                                >
                                    <Link to={`/offices/${office.slug}`} className="block">
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={office.heroImage}
                                                alt={office.city}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                            <div className="absolute bottom-4 left-6 flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                                                    <span className="material-icons text-xl">location_on</span>
                                                </div>
                                                <h3 className="text-white font-bold text-lg">{office.city}</h3>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="p-8">
                                        <p className="text-primary font-bold uppercase text-[10px] tracking-widest mb-3">{office.id.includes('hq') ? 'Corporate Headquarters' : 'Branch Office'}</p>
                                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed min-h-[40px]">
                                            {office.address}
                                        </p>
                                        <div className="mt-6 pt-6 border-t border-gray-50">
                                            <Link to={`/offices/${office.slug}`} className="flex items-center gap-2 text-gray-900 group/link font-black text-[10px] uppercase tracking-widest hover:text-primary transition-colors">
                                                View Office Details
                                                <span className="material-icons text-sm transform group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="meet-our-team" className="py-12 md:py-24 px-4 bg-white overflow-hidden scroll-mt-20">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            {...fadeInUp}
                            className="text-center mb-10 md:mb-16"
                        >
                            <div className="flex items-center justify-center gap-4 mb-2 md:mb-4">
                                <div className="h-[2px] w-4 md:w-8 bg-primary"></div>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-widest font-display">MEET OUR TEAM</h2>
                                <div className="h-[2px] w-4 md:w-8 bg-primary"></div>
                            </div>
                            <p className="text-[10px] md:text-base text-gray-500">The minds behind the magic</p>
                        </motion.div>

                        <div className="md:hidden overflow-x-auto no-scrollbar pb-6 -mx-4 px-4 snap-x snap-mandatory">
                            <motion.div
                                variants={staggerContainer}
                                initial="initial"
                                whileInView="whileInView"
                                viewport={{ once: false }}
                                className="flex gap-4 w-max"
                            >
                                {[
                                    { name: "David Chen", role: "Lead Developer", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop", special: false },
                                    { name: "Sarah Johnson", role: "Project Manager", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop", special: true },
                                    { name: "Michael Ross", role: "AI Specialist", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop", special: false }
                                ].map((member, i) => (
                                    <motion.div
                                        key={i}
                                        variants={{
                                            initial: { opacity: 0, x: 20 },
                                            whileInView: { opacity: 1, x: 0 }
                                        }}
                                        className="w-[260px] snap-center shrink-0 group relative mt-4 pb-8"
                                    >
                                        <div className="aspect-[4/5] overflow-hidden bg-gray-100 rounded-xl relative">
                                            <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                            {member.special && (
                                                <div className="absolute top-2 right-2 bg-primary text-white text-[8px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">
                                                    Strategic Lead
                                                </div>
                                            )}
                                        </div>
                                        <div className="absolute -bottom-2 left-3 right-3 bg-white p-3 shadow-lg rounded-xl border-b-2 border-primary translate-y-0 text-center">
                                            <h3 className="text-sm font-bold text-gray-900 leading-tight">{member.name}</h3>
                                            <p className="text-primary text-[10px] font-medium mb-1.5">{member.role}</p>
                                            <div className="flex justify-center gap-3">
                                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><span className="material-icons text-[14px]">link</span></a>
                                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><span className="material-icons text-[14px]">mail</span></a>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Desktop View (Grid Layout) */}
                        <div className="hidden md:block">
                            <motion.div
                                variants={staggerContainer}
                                initial="initial"
                                whileInView="whileInView"
                                viewport={{ once: false }}
                                className="grid md:grid-cols-3 gap-8"
                            >
                                {[
                                    { name: "David Chen", role: "Lead Developer", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop", special: false },
                                    { name: "Sarah Johnson", role: "Project Manager", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop", special: true },
                                    { name: "Michael Ross", role: "AI Specialist", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop", special: false }
                                ].map((member, i) => (
                                    <motion.div
                                        key={i}
                                        variants={{
                                            initial: { opacity: 0, y: 40 },
                                            whileInView: { opacity: 1, y: 0 }
                                        }}
                                        className={`group relative ${member.special ? 'md:-mt-8' : ''}`}
                                    >
                                        <div className={`aspect-[4/5] overflow-hidden bg-gray-100 rounded-lg md:rounded-none ${member.special ? 'shadow-2xl relative z-10' : ''}`}>
                                            <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        </div>
                                        <div className={`${member.special ? 'relative z-20 bg-white mx-1.5 md:mx-4 -mt-8 md:-mt-12 p-3 md:p-6 shadow-xl text-center border-b-4 border-primary rounded-b-lg' : 'absolute bottom-0 left-0 w-full bg-white p-3 md:p-6 shadow-lg translate-y-2 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-300'}`}>
                                            <h3 className={`${member.special ? 'text-lg md:text-2xl' : 'text-base md:text-xl'} font-bold text-gray-900`}>{member.name}</h3>
                                            <p className={`text-primary ${member.special ? 'text-[10px] md:text-base' : 'text-[10px] md:text-sm'} font-medium mb-1.5 md:mb-3`}>{member.role}</p>
                                            <div className={`flex ${member.special ? 'justify-center' : ''} gap-3 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><span className="material-icons text-xs md:text-base">link</span></a>
                                                <a href="#" className="text-gray-400 hover:text-primary transition-colors"><span className="material-icons text-xs md:text-base">mail</span></a>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </section>
            </div >

            <ScrollReveal>
                <ContactUs isHomePage={true} />
            </ScrollReveal>

            <ScrollReveal>
                <Footer />
            </ScrollReveal>
        </ScrollWrapper >
    );
};

export default AboutUs;
