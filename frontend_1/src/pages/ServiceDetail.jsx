import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactUs from '../components/ContactUs';
import ScrollReveal from '../components/ScrollReveal';
import ScrollWrapper from '../components/ScrollWrapper';
import { motion } from 'framer-motion';

const serviceData = {
    "website": {
        title: "Website Development",
        desc: "Crafting stunning, high-performance websites that leave a lasting digital footprint.",
        icon: "language",
        content: "Our website development service focuses on creating responsive, fast-loading, and SEO-friendly websites. We use the latest technologies like React, Next.js, and Tailwind CSS to ensure your site is modern and scalable.",
        features: ["Custom UI/UX", "SEO Optimization", "Responsive Design", "Speed Performance"]
    },
    "web-app": {
        title: "Web App Development",
        desc: "Building complex, feature-rich web applications tailored for enterprise-level demands.",
        icon: "laptop_mac",
        content: "We specialize in building robust web applications with complex functionalities. From e-commerce platforms to custom CRM systems, we deliver high-quality solutions that drive business growth.",
        features: ["Scalable Architecture", "API Integration", "Secure Authentication", "Real-time Features"]
    },
    "mobile-application": {
        title: "Mobile Application",
        desc: "Expert Android, iOS, and Hybrid app development for an unmatched mobile experience.",
        icon: "smartphone",
        content: "Our mobile app development team creates seamless experiences for both iOS and Android. We use Flutter and React Native to build high-performance cross-platform applications.",
        features: ["iOS & Android", "Native Performance", "User-Centric Design", "App Store Optimization"]
    },
    "ui-ux-design": {
        title: "UI/UX Design",
        desc: "Designing intuitive and immersive user interfaces that prioritize engagement and flow.",
        icon: "architecture",
        content: "We create user interfaces that are not only beautiful but also highly functional. Our design process involves deep research and user testing to ensure an optimal user experience.",
        features: ["User Research", "Wireframing", "Prototyping", "Visual Identity"]
    },
    "maintenance": {
        title: "Maintenance & Support",
        desc: "Providing 24/7 support and regular optimization to keep your platforms running flawlessly.",
        icon: "handyman",
        content: "Software needs regular updates and monitoring. Our maintenance service ensures your application stays secure, up-to-date, and performs at its best at all times.",
        features: ["Security Updates", "Performance Monitoring", "Bug Fixes", "24/7 Support"]
    },
    "digital-marketing": {
        title: "Digital Marketing",
        desc: "Strategic marketing solutions to amplify your brand's reach and dominate the market.",
        icon: "campaign",
        content: "Scale your business with our data-driven marketing strategies. We handle social media, PPC, and content marketing to improve your brand visibility and ROI.",
        features: ["Social Media Marketing", "PPC Campaigns", "Content Strategy", "Performance Tracking"]
    },
    "seo-services": {
        title: "SEO Services",
        desc: "Dominating search rankings with ethical, results-driven search engine optimization.",
        icon: "query_stats",
        content: "Get found by your target audience. Our SEO services improve your search rankings through technical SEO, keyword research, and high-quality backlink building.",
        features: ["Technical SEO", "Keyword Research", "On-Page SEO", "Link Building"]
    },
    "logo-design": {
        title: "Logo Design",
        desc: "Creating memorable and unique brand identities that tell your story at a glance.",
        icon: "auto_awesome",
        content: "Your logo is the face of your brand. We design unique, memorable logos that represent your brand values and leave a lasting impression on your audience.",
        features: ["Unique Identity", "Versatile Formats", "Brand Consistency", "Modern Aesthetics"]
    },
    "graphic-design": {
        title: "Graphic Design",
        desc: "High-end visual assets that reflect your brand’s excellence across all digital touchpoints.",
        icon: "brush",
        content: "From social media graphics to print material, we provide high-quality graphic design services that align with your brand identity and communicate your message effectively.",
        features: ["Visual Communication", "Brand Assets", "Creative Illustrations", "Marketing Collateral"]
    }
};

const ServiceDetail = () => {
    const { slug } = useParams();
    const service = serviceData[slug];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!service) {
        return (
            <ScrollWrapper>
                <Navbar />
                <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-6xl font-black text-slate-200 uppercase italic mb-4">404</h1>
                    <h2 className="text-2xl font-bold text-slate-800 uppercase italic">Service Not Found</h2>
                    <Link to="/services" className="mt-8 px-8 py-4 bg-primary text-white rounded-full font-bold uppercase text-xs tracking-widest hover:scale-105 transition-all">
                        Back to Services
                    </Link>
                </div>
                <Footer />
            </ScrollWrapper>
        );
    }

    return (
        <ScrollWrapper>
            <div className="bg-[#f8fafc] min-h-screen font-sans overflow-x-hidden">
                <Navbar />

                {/* --- HERO SECTION --- */}
                <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2340&auto=format&fit=crop"
                            className="w-full h-full object-cover grayscale-[0.5] brightness-[0.3]"
                            alt={service.title}
                        />
                        <div className="absolute inset-0 bg-black/40" />
                    </div>

                    <div className="relative z-10 text-center text-white px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="w-16 h-16 bg-primary/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20"
                        >
                            <span className="material-icons text-3xl text-primary">{service.icon}</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl md:text-6xl font-black uppercase tracking-tight italic"
                        >
                            {service.title}
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center justify-center gap-3 mt-6 text-[10px] font-bold uppercase tracking-[0.3em] text-white/80"
                        >
                            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                            <span className="text-primary">&gt;</span>
                            <Link to="/services" className="hover:text-primary transition-colors">Services</Link>
                            <span className="text-primary">&gt;</span>
                            <span className="text-white/60">{service.title}</span>
                        </motion.div>
                    </div>
                </section>

                {/* --- CONTENT SECTION --- */}
                <section className="py-24 px-10 lg:px-24 max-w-[1700px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.4fr] gap-20">
                        {/* Left Side: Main Content */}
                        <div className="space-y-12">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <p className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-4">Service Overview</p>
                                <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tighter uppercase italic leading-tight mb-8">
                                    Why Choose Our <br />
                                    <span className="text-primary italic">{service.title}?</span>
                                </h2>
                                <p className="text-lg text-slate-600 leading-relaxed italic border-l-4 border-primary/20 pl-8">
                                    {service.content}
                                </p>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                                {service.features.map((feature, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6 group hover:border-primary/30 transition-all"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                            <span className="material-icons text-xl">done</span>
                                        </div>
                                        <span className="text-lg font-bold text-slate-800 uppercase italic tracking-tight">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side: Sidebar/CTA */}
                        <div className="space-y-8">
                            <div className="bg-[#0f172a] p-10 rounded-[2.5rem] text-white relative overflow-hidden group shadow-2xl">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                <h3 className="text-2xl font-black uppercase italic tracking-tight mb-6">Need Custom Solution?</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-8 italic">
                                    Let's discuss your project and build something legendary together.
                                </p>
                                <Link to="/contact" className="w-full bg-white text-[#0f172a] py-4 rounded-2xl font-bold uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-primary hover:text-white transition-all">
                                    Contact Us <span className="material-icons text-lg">near_me</span>
                                </Link>
                            </div>

                            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
                                <h3 className="text-xl font-bold text-slate-900 uppercase italic tracking-tight mb-8">Related Services</h3>
                                <div className="space-y-4">
                                    {Object.entries(serviceData).filter(([key]) => key !== slug).slice(0, 4).map(([key, data]) => (
                                        <Link
                                            key={key}
                                            to={`/services/${key}`}
                                            className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group"
                                        >
                                            <span className="text-sm font-bold text-slate-600 group-hover:text-primary transition-colors italic uppercase">{data.title}</span>
                                            <span className="material-icons text-slate-300 group-hover:text-primary transition-all text-sm">east</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
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

export default ServiceDetail;
