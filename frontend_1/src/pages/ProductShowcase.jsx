import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import ContactUs from '../components/ContactUs';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';
import ScrollWrapper from '../components/ScrollWrapper';

import heroImage from '../assets/appzeto-food-hero.jpg';
import floatingImage1 from '../assets/appzeto-food-1.jpg';
import floatingImage2 from '../assets/appzeto-food-2.jpg';
import carouselImage1 from '../assets/appzeto-food-3.jpg';
import carouselImage2 from '../assets/appzeto-food-4.jpg';
import carouselImage3 from '../assets/appzeto-food-5.jpg';

gsap.registerPlugin(ScrollTrigger);

const ProductShowcase = () => {
    // Scroll Parallax
    const { scrollY } = useScroll();
    const yText = useTransform(scrollY, [0, 1000], [0, 300]);

    // Array of images to cycle through
    const images = [heroImage, carouselImage1, carouselImage2, carouselImage3];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Carousel Interval
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(intervalId);
    }, [images.length]);

    return (
        <ScrollWrapper>
            <Navbar />
            <div className="min-h-screen w-full bg-white relative overflow-hidden font-sans selection:bg-[#EF7F1A] selection:text-white">
                <div className="max-w-[1400px] mx-auto min-h-screen px-4 md:px-10 lg:px-20 py-20 lg:py-0 flex flex-col lg:flex-row items-center relative z-10">

                    {/* Left Content */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-8 md:gap-10 pt-10 lg:pt-0 z-20">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: false }}
                            className="flex flex-col gap-4"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-[#EF7F1A] font-bold tracking-wider text-sm uppercase">Appzeto Food</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] text-gray-900 tracking-tight">
                                Multi Restaurant <br />
                                <span className="text-[#EF7F1A]">Food Ordering &</span> <br />
                                <span className="text-[#EF7F1A]">Delivery</span> Solution
                            </h1>
                            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                                Build your very own multi-restaurant online food ordering & delivery business with Appzeto's complete source code & post-purchase services. Experience seamless ordering, real-time tracking, and powerful admin controls.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: false }}
                            className="flex flex-wrap items-center gap-4"
                        >
                            <button className="h-14 px-8 rounded-full bg-gradient-to-r from-[#EF7F1A] to-[#F59E0B] text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
                                Buy Now
                                <span className="material-symbols-outlined font-bold">arrow_forward</span>
                            </button>
                            <button className="h-14 px-8 rounded-full bg-white border-2 border-gray-200 text-gray-700 font-bold text-lg hover:border-[#EF7F1A] hover:text-[#EF7F1A] transition-all duration-300 flex items-center gap-2">
                                View Demo
                                <span className="material-symbols-outlined">play_arrow</span>
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            viewport={{ once: false }}
                            className="flex items-center gap-4 mt-4 opacity-80"
                        >
                            <div className="flex -space-x-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white"></div>
                                <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white"></div>
                                <div className="w-10 h-10 rounded-full bg-gray-400 border-2 border-white"></div>
                            </div>
                            <p className="text-sm text-gray-500 font-medium">Trusted by 500+ Businesses</p>
                        </motion.div>
                    </div>

                    {/* Right Content / Hero Graphics */}
                    <div className="w-full lg:w-1/2 relative mt-16 lg:mt-0 lg:h-screen flex items-center justify-center">
                        {/* Orange Blob Background */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[#EF7F1A] rounded-[40%] rotate-12 lg:translate-x-[20%] opacity-100 z-0"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%] bg-[#EF7F1A]/10 rounded-[45%] -rotate-6 lg:translate-x-[20%] z-[-1]"></div>

                        {/* Phone Container */}
                        <div className="relative z-10 w-[280px] md:w-[320px] lg:w-[360px] mx-auto transform rotate-[-5deg] hover:rotate-0 transition-transform duration-700 ease-out">
                            {/* Phone Frame Mockup */}
                            <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl border-4 border-gray-900">
                                <div className="relative rounded-[2.5rem] overflow-hidden bg-white aspect-[9/19.5]">
                                    {/* Carousel Images */}
                                    {images.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={`Appzeto Food App Screen ${index + 1}`}
                                            className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                                                }`}
                                        />
                                    ))}
                                    {/* Top Notch */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-2xl z-20"></div>
                                </div>
                            </div>

                            {/* Floating Elements with Entrance Animation */}
                            <motion.div
                                initial={{ x: -100, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="absolute top-[20%] -left-[20%] md:-left-[40%] bg-white p-3 md:p-4 rounded-xl shadow-xl z-20 max-w-[160px]"
                            >
                                <div className="flex gap-3 items-center">
                                    <img src={floatingImage1} className="w-12 h-12 rounded-lg object-cover" alt="Food" />
                                    <div>
                                        <p className="text-xs font-bold text-gray-800">Tasty Pasta</p>
                                        <div className="flex text-[#EF7F1A] text-[10px]">★★★★★</div>
                                        <p className="text-[10px] font-bold mt-1">$12.99</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ x: 100, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.7 }}
                                className="absolute bottom-[20%] -right-[15%] md:-right-[30%] bg-white p-3 md:p-4 rounded-xl shadow-xl z-20"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                                        <span className="material-symbols-outlined">location_on</span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-800">Tracking Order</p>
                                        <p className="text-[10px] text-gray-500">10 mins away</p>
                                    </div>
                                </div>
                            </motion.div>

                            <div className="absolute top-[50%] -right-[25px] flex flex-col gap-4">
                                <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#EF7F1A] cursor-pointer hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined">notifications</span>
                                </div>
                                <div className="w-12 h-12 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined">chat</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* What Comes With Section */}
                <div className="min-h-screen w-full py-20 bg-gray-50 relative z-20 overflow-hidden flex flex-col justify-center">
                    <div className="max-w-[1400px] mx-auto px-4 md:px-10 text-center mb-10 lg:mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: false }}
                            className="text-3xl md:text-5xl font-black text-gray-900 mb-6"
                        >
                            What Comes with <span className="text-[#EF7F1A]">Appzeto Food?</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: false }}
                            className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed"
                        >
                            A complete ecosystem designed to automate your delivery business. From ordering to delivery, we have covered every touchpoint with premium interfaces.
                        </motion.p>
                    </div>

                    {/* Device Cluster Container - Reference Image Layout */}
                    <div className="relative w-full max-w-[1200px] mx-auto h-[450px] md:h-[550px] flex justify-center items-center scale-[0.6] sm:scale-[0.75] md:scale-100 origin-top mt-10">

                        {/* 1. Websites (Monitor - Back Center) */}
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="absolute top-[40px] left-1/2 -translate-x-1/2 w-[360px] z-10 group">
                            <FeatureLabel title="Websites" subtitle="Responsive Web App" icon="language" position="top" offset="-top-24" />
                            <MockupFrame type="monitor" images={images} duration={2500} />
                        </motion.div>

                        {/* 2. Admin Panel (Laptop - Front Left) */}
                        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="absolute bottom-[80px] left-[calc(50%-340px)] w-[280px] z-20 group">
                            <FeatureLabel title="Admin Panel" subtitle="Full Business Control" icon="admin_panel_settings" position="top" offset="-top-20 -left-10" />
                            <MockupFrame type="laptop" images={images} duration={2200} imageIndexOffset={1} />
                        </motion.div>

                        {/* 3. Restaurant Panel (Laptop - Front Right) */}
                        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="absolute bottom-[80px] right-[calc(50%-340px)] w-[280px] z-20 group">
                            <FeatureLabel title="Restaurant Panel" subtitle="Manage Orders & Menu" icon="storefront" position="top" offset="-top-20 -right-10" />
                            <MockupFrame type="laptop" images={images} duration={2800} imageIndexOffset={2} />
                        </motion.div>

                        {/* 4. Delivery App (Phone - Far Left) */}
                        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="absolute bottom-[60px] left-[calc(50%-450px)] w-[80px] z-30 group">
                            <FeatureLabel title="Delivery App" subtitle="Real-time Tracking" icon="local_shipping" position="bottom" offset="-bottom-24" />
                            <MockupFrame type="phone" images={images} duration={1800} imageIndexOffset={3} />
                        </motion.div>

                        {/* 5. Restaurant App (Phone - Far Right) */}
                        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="absolute bottom-[60px] right-[calc(50%-450px)] w-[80px] z-30 group">
                            <FeatureLabel title="Restaurant App" subtitle="Kitchen Dashboard" icon="restaurant" position="bottom" offset="-bottom-24" />
                            <MockupFrame type="phone" images={images} duration={2100} imageIndexOffset={2} />
                        </motion.div>

                        {/* 6. Customer App (Phone - Front Center) */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="absolute -bottom-[20px] left-1/2 -translate-x-1/2 w-[90px] z-40 group">
                            <FeatureLabel title="Customer App" subtitle="Seamless Ordering" icon="smartphone" position="bottom" offset="-bottom-24" />
                            <MockupFrame type="phone" images={images} duration={1500} imageIndexOffset={0} />
                        </motion.div>

                    </div>
                </div>

                {/* How It Works Section */}
                <HowItWorks />

                {/* Revenue Model Section */}
                <RevenueModel />

                {/* Modern Interactive Features Section */}
                <ModernInteractiveFeatures />

                {/* Background decorative elements */}
                <motion.div style={{ y: yText }} className="absolute top-10 left-10 text-gray-200 text-9xl font-black opacity-10 select-none z-0">FOOD</motion.div>
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

// How It Works Component - Exact Reference Match
const HowItWorks = () => {
    const [activeTab, setActiveTab] = useState('restaurant');
    const containerRef = useRef(null);
    const inView = useInView(containerRef, { once: false, margin: "-100px" });

    return (
        <div ref={containerRef} className="w-full pt-20 pb-12 bg-white relative z-20 overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-4 md:px-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-black text-gray-900 mb-6"
                    >
                        How Does <span className="text-[#EF7F1A]">Appzeto Food</span> Work?
                    </motion.h2>

                    {/* Tabs */}
                    <div className="flex justify-center gap-4 mt-8">
                        <button
                            onClick={() => setActiveTab('restaurant')}
                            className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 ${activeTab === 'restaurant'
                                ? 'bg-[#EF7F1A] text-white shadow-lg scale-105'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            Order Accepted by Restaurant
                        </button>
                        <button
                            onClick={() => setActiveTab('deliveryman')}
                            className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 ${activeTab === 'deliveryman'
                                ? 'bg-[#EF7F1A] text-white shadow-lg scale-105'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            Order Accepted by Deliveryman
                        </button>
                    </div>
                </div>

                {/* Workflow Cycle Container */}
                <div className="relative w-full h-[600px] hidden md:block">
                    {/* SVG Path Animation */}
                    <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" style={{ overflow: 'visible' }}>
                        {/* Path: Step 1 -> Up/Right -> 2 -> Down -> 3 -> Left -> 4 -> Left/Up -> 5 */}
                        <motion.path
                            d="M 280 200 C 280 100, 400 50, 600 50 L 850 50 L 850 150 M 850 350 L 850 450 L 600 450 L 500 450 M 350 450 L 280 450 L 280 350"
                            fill="none"
                            stroke="#EF7F1A"
                            strokeWidth="2"
                            strokeDasharray="8 8"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={inView ? { pathLength: 1, opacity: 0.5 } : {}}
                            transition={{ duration: 2, ease: "linear" }}
                        />
                        {/* Arrow Heads */}
                        <motion.path d="M 845 140 L 850 150 L 855 140" fill="none" stroke="#EF7F1A" strokeWidth="2" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1 }} />
                        <motion.path d="M 845 360 L 850 350 L 855 360" fill="none" stroke="#EF7F1A" strokeWidth="2" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.5 }} />
                        <motion.path d="M 360 445 L 350 450 L 360 455" fill="none" stroke="#EF7F1A" strokeWidth="2" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 2 }} />
                        <motion.path d="M 275 360 L 280 350 L 285 360" fill="none" stroke="#EF7F1A" strokeWidth="2" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 2.2 }} />
                    </svg>

                    {/* 1. Customer Places Order */}
                    <div className="absolute top-[200px] left-[50px] w-[250px] flex flex-col items-end text-right z-10">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }}>
                            <h3 className="text-gray-900 font-bold mb-1">1. Customer places order</h3>
                            <p className="text-sm text-gray-500">through app or web</p>
                        </motion.div>
                        {/* Visual Placeholder: Person with Phone */}
                        <motion.div
                            initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ type: 'spring', delay: 0.2 }}
                            className="mr-0 mt-4 w-24 h-32 bg-gray-100 border-2 border-white shadow-xl rounded-2xl flex items-center justify-center relative z-20"
                        >
                            <span className="material-symbols-outlined text-5xl text-gray-400">person_filled</span>
                            <div className="absolute bottom-2 right-2 w-6 h-10 bg-[#EF7F1A] rounded-md flex items-center justify-center text-white">
                                <span className="material-symbols-outlined text-xs">smartphone</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Central Hexagon Icon */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-50">
                        <div className="w-64 h-64 bg-orange-50 rounded-full flex items-center justify-center animate-pulse">
                            <span className="material-symbols-outlined text-9xl text-[#EF7F1A]/20">lunch_dining</span>
                        </div>
                    </div>


                    {/* 2. Restaurant Area Container (Right Side) */}
                    <div className="absolute top-[150px] right-[50px] w-[300px] h-[300px] flex flex-col items-center justify-center z-10">
                        {/* Visual Placeholder: Restaurant */}
                        <motion.div
                            initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ type: 'spring', delay: 0.8 }}
                            className="w-48 h-32 bg-white border-2 border-gray-100 shadow-xl rounded-xl flex flex-col items-center justify-center relative z-20 mb-4"
                        >
                            <div className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-1">RESTAURANT</div>
                            <span className="material-symbols-outlined text-5xl text-gray-700">storefront</span>
                        </motion.div>

                        {/* Step 2 Text (Above) */}
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.9 }} className="absolute -top-10 left-0 w-full text-left pl-4">
                            <h3 className="text-gray-900 font-bold mb-1">2. Restaurant accepts</h3>
                            <p className="text-sm text-gray-500">order & starts preparing</p>
                        </motion.div>

                        {/* Step 3 Text (Below) */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.1 }} className="absolute -bottom-[-10px] left-0 w-full text-left pl-4">
                            <h3 className="text-gray-900 font-bold mb-1">3. Restaurant prepares</h3>
                            <p className="text-sm text-gray-500">food & hands over</p>
                        </motion.div>
                    </div>

                    {/* 4. Deliveryman (Bottom Center) */}
                    <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 flex flex-col items-center z-10 pt-10">
                        {/* Visual Placeholder: Scooter */}
                        <motion.div
                            initial={{ x: -100, opacity: 0 }} animate={inView ? { x: 0, opacity: 1 } : {}} transition={{ duration: 0.8, delay: 1.4 }}
                            className="w-32 h-32 flex items-center justify-center relative z-20"
                        >
                            <span className="material-symbols-outlined text-8xl text-[#EF7F1A]">two_wheeler</span>
                            <div className="absolute top-2 right-2 w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center shadow-md">
                                <span className="material-symbols-outlined text-white">inventory_2</span>
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.6 }} className="text-center mt-2 w-[300px]">
                            <h3 className="text-gray-900 font-bold mb-1">4. Deliveryman receives food</h3>
                            <p className="text-sm text-gray-500">from restaurant and out for delivery</p>
                        </motion.div>
                    </div>

                    {/* 5. Customer Receives (Left Side loop back) */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 2.2 }}
                        className="absolute bottom-[130px] left-[50px] w-[250px] text-right"
                    >
                        <h3 className="text-gray-900 font-bold mb-1">5. Customer receives order</h3>
                        <p className="text-sm text-gray-500">from deliveryman</p>
                        <div className="mt-2 text-[#EF7F1A] material-symbols-outlined text-2xl">check_circle</div>
                    </motion.div>

                </div>

                {/* Mobile Fallback (Grid Layout) */}
                <div className="md:hidden flex flex-col gap-8">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                            <div className="w-10 h-10 bg-[#EF7F1A] rounded-full flex items-center justify-center text-white font-bold">{item}</div>
                            <div>
                                <h3 className="font-bold text-gray-900">Step {item}</h3>
                                <p className="text-sm text-gray-500">Description of step {item}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const RevenueModel = () => {
    const containerRef = useRef(null);
    const inView = useInView(containerRef, { once: false, margin: "-100px" });
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
    const yBg1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const yBg2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

    return (
        <div ref={containerRef} className="w-full pt-12 pb-24 bg-gray-50 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <motion.div style={{ y: yBg1 }} className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-orange-100/30 rounded-full blur-3xl"></motion.div>
                <motion.div style={{ y: yBg2 }} className="absolute top-40 right-40 w-[300px] h-[300px] bg-yellow-100/30 rounded-full blur-3xl"></motion.div>
            </div>

            <div className="max-w-[1200px] mx-auto px-4 md:px-10 relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="inline-block mb-4"
                    >
                        <div className="w-16 h-16 mx-auto bg-orange-50 rounded-full flex items-center justify-center mb-4 ring-1 ring-orange-100">
                            <span className="material-symbols-outlined text-4xl text-[#EF7F1A]">lightbulb</span>
                        </div>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl md:text-5xl font-black text-gray-900 mb-6"
                    >
                        The Smartest Ways to Make <span className="text-[#EF7F1A]">Money</span> <br /> with Appzeto Food
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-gray-500 max-w-3xl mx-auto"
                    >
                        With Appzeto Food, you get to run your multi restaurant business seamlessly along with making money as you scale with smart revenue streams.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column: Revenue Streams */}
                    <div className="space-y-12">
                        {/* Stream 1 */}
                        <motion.div initial={{ x: -30, opacity: 0 }} animate={inView ? { x: 0, opacity: 1 } : {}} transition={{ delay: 0.3 }} className="group">
                            <div className="flex items-start gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-pink-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                    <span className="material-symbols-outlined text-3xl text-pink-500">payments</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Commission-based Earning</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-3 text-gray-600">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#EF7F1A]"></div>
                                            Order-wise (Restaurant-wise) Commission
                                        </li>
                                        <li className="flex items-center gap-3 text-gray-600">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#EF7F1A]"></div>
                                            Commission In Delivery Charge
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>

                        {/* Stream 2 */}
                        <motion.div initial={{ x: -30, opacity: 0 }} animate={inView ? { x: 0, opacity: 1 } : {}} transition={{ delay: 0.4 }} className="group">
                            <div className="flex items-start gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                    <span className="material-symbols-outlined text-3xl text-purple-500">inventory_2</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Subscription-based Earning</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-3 text-gray-600">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#EF7F1A]"></div>
                                            Restaurant Subscription Plans
                                        </li>
                                        <li className="flex items-center gap-3 text-gray-600">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#EF7F1A]"></div>
                                            Delivery Man Subscription Plans
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Composite Illustration */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={inView ? { scale: 1, opacity: 1 } : {}}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="relative h-[500px] w-full flex items-center justify-center p-10"
                    >
                        {/* Background Blobs */}
                        <div className="absolute inset-0 bg-white rounded-[50px] shadow-2xl skew-y-3 opacity-40 z-0"></div>

                        {/* Central Character */}
                        <div className="relative z-20 flex flex-col items-center">
                            {/* CSS Person Construction */}
                            <div className="w-20 h-20 bg-[#EF7F1A] rounded-full mb-2 shadow-lg"></div> {/* Head */}
                            <div className="w-32 h-40 bg-gray-800 rounded-3xl mx-auto shadow-xl relative overflow-hidden"> {/* Body */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-yellow-400 rounded-b-full"></div> {/* Neck/Shirt */}
                            </div>
                            <div className="flex gap-4 -mt-4">
                                <div className="w-8 h-32 bg-gray-900 rounded-full"></div> {/* Leg */}
                                <div className="w-8 h-32 bg-gray-900 rounded-full"></div> {/* Leg */}
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute top-10 right-10 bg-white p-4 rounded-xl shadow-lg z-30">
                            <div className="flex gap-2 mb-2">
                                <div className="w-8 h-2 bg-yellow-400 rounded-full"></div>
                                <div className="w-4 h-2 bg-gray-200 rounded-full"></div>
                            </div>
                            <div className="w-16 h-16 bg-gray-50 rounded-lg"></div>
                        </motion.div>

                        <motion.div animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="absolute bottom-20 left-10 bg-white p-4 rounded-xl shadow-lg z-30 flex gap-3 items-center">
                            <div className="w-12 h-12 bg-[#EF7F1A] rounded-full flex items-center justify-center text-white font-bold text-xl">$</div>
                            <div>
                                <div className="w-20 h-3 bg-gray-200 rounded-full mb-2"></div>
                                <div className="w-12 h-2 bg-gray-100 rounded-full"></div>
                            </div>
                        </motion.div>

                        <div className="absolute bottom-10 right-32 text-8xl text-yellow-400 z-30 drop-shadow-lg">
                            💰
                        </div>

                        <motion.div animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 3.5 }} className="absolute top-32 left-20 bg-white/80 backdrop-blur p-3 rounded-lg shadow-sm border border-orange-100 z-10">
                            <span className="material-symbols-outlined text-4xl text-[#EF7F1A]">storefront</span>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

const FeatureLabel = ({ title, subtitle, icon, position, offset }) => {
    const isTop = position === 'top';
    const isBottom = position === 'bottom';
    const isLeft = position === 'left';
    const isRight = position === 'right';

    let containerClasses = `absolute z-50 pointer-events-none flex items-center gap-3 ${offset} `;

    if (isTop || isBottom) {
        containerClasses += "left-1/2 -translate-x-1/2 flex-col";
    } else {
        containerClasses += "top-1/2 -translate-y-1/2";
    }

    return (
        <div className={containerClasses}>
            {isTop && (
                <>
                    <LabelCard icon={icon} title={title} subtitle={subtitle} />
                    <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-[#EF7F1A] rounded-full border-2 border-white shadow-sm ring-2 ring-[#EF7F1A]/20"></div>
                        <div className="w-0.5 h-10 bg-gradient-to-b from-[#EF7F1A] to-transparent opacity-50"></div>
                    </div>
                </>
            )}

            {isBottom && (
                <>
                    <div className="flex flex-col items-center">
                        <div className="w-0.5 h-10 bg-gradient-to-t from-[#EF7F1A] to-transparent opacity-50"></div>
                        <div className="w-3 h-3 bg-[#EF7F1A] rounded-full border-2 border-white shadow-sm ring-2 ring-[#EF7F1A]/20"></div>
                    </div>
                    <LabelCard icon={icon} title={title} subtitle={subtitle} />
                </>
            )}

            {isLeft && (
                <>
                    <LabelCard icon={icon} title={title} subtitle={subtitle} />
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-[#EF7F1A] rounded-full border-2 border-white shadow-sm ring-2 ring-[#EF7F1A]/20"></div>
                        <div className="h-0.5 w-10 bg-gradient-to-r from-[#EF7F1A] to-transparent opacity-50"></div>
                    </div>
                </>
            )}

            {isRight && (
                <>
                    <div className="flex items-center">
                        <div className="h-0.5 w-10 bg-gradient-to-l from-[#EF7F1A] to-transparent opacity-50"></div>
                        <div className="w-3 h-3 bg-[#EF7F1A] rounded-full border-2 border-white shadow-sm ring-2 ring-[#EF7F1A]/20"></div>
                    </div>
                    <LabelCard icon={icon} title={title} subtitle={subtitle} />
                </>
            )}
        </div>
    );
};

const LabelCard = ({ icon, title, subtitle }) => (
    <div className="bg-white/90 backdrop-blur-md border border-white/50 px-4 py-2.5 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex items-center gap-3 min-w-[180px] transform transition-transform duration-300 hover:scale-105">
        <div className="w-10 h-10 rounded-lg bg-[#EF7F1A]/10 flex items-center justify-center text-[#EF7F1A]">
            <span className="material-symbols-outlined text-xl">{icon}</span>
        </div>
        <div className="text-left">
            <p className="text-gray-900 font-bold text-sm leading-tight">{title}</p>
            <p className="text-gray-500 text-[10px] uppercase tracking-wide font-medium mt-0.5">{subtitle}</p>
        </div>
    </div>
);

const MockupFrame = ({ type, images, duration, imageIndexOffset = 0 }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        setCurrentImageIndex(imageIndexOffset % images.length);
    }, [imageIndexOffset, images.length]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, duration);

        return () => clearInterval(intervalId);
    }, [duration, images.length]);

    if (type === 'monitor') {
        return (
            <div className="relative mx-auto group transform transition-transform duration-500 hover:scale-[1.02]" style={{ width: '360px' }}>
                {/* Monitor Screen */}
                <div className="relative bg-[#1a1a1a] rounded-[10px] p-[6px] shadow-2xl border border-[#2a2a2a] w-full aspect-[16/9] z-20">
                    <div className="bg-black rounded-[4px] overflow-hidden w-full h-full relative">
                        {images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt="Screen"
                                className={`w-full h-full object-cover object-top absolute top-0 left-0 transition-opacity duration-700 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                                    }`}
                            />
                        ))}
                    </div>
                    {/* Chin */}
                    <div className="absolute bottom-0 left-0 w-full h-4 bg-[#1a1a1a] rounded-b-[10px] flex justify-center items-center">
                        <div className="w-1 h-1 bg-[#333] rounded-full"></div>
                    </div>
                </div>
                {/* Stand Neck */}
                <div className="mx-auto w-[60px] h-[40px] bg-[#1a1a1a] -mt-2 relative z-10 shadow-lg border-x border-[#222]"></div>
                {/* Stand Base */}
                <div className="mx-auto w-[120px] h-[8px] bg-[#1a1a1a] rounded-t-sm shadow-xl relative z-10 border-t border-[#333]"></div>
            </div>
        );
    }

    if (type === 'laptop') {
        return (
            <div className="relative mx-auto group transform transition-transform duration-500 hover:scale-[1.02]" style={{ perspective: '2000px', width: '280px' }}>
                {/* Laptop Lid */}
                <div className="relative bg-[#1a1a1a] rounded-t-[12px] rounded-b-[4px] p-[5px] shadow-xl border border-[#2a2a2a] w-full aspect-[16/10] z-20 origin-bottom transition-transform duration-500" style={{ transform: 'rotateX(2deg)' }}>
                    {/* Screen Content */}
                    <div className="bg-black rounded-[4px] overflow-hidden w-full h-full relative">
                        {images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt="Screen"
                                className={`w-full h-full object-cover object-[center_15%] absolute top-0 left-0 transition-opacity duration-700 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Laptop Base */}
                <div className="relative w-[120%] h-[10px] bg-[#222] -mt-[4px] -ml-[10%] rounded-b-[8px] rounded-t-[2px] shadow-lg z-10 flex justify-center items-start border-t border-[#333]">
                    {/* Fake Thumb Lift */}
                    <div className="w-[15%] h-[2px] bg-[#333] rounded-b-sm"></div>
                </div>
            </div>
        );
    }

    if (type === 'phone') {
        return (
            <div className="relative mx-auto transition-transform duration-500 hover:scale-[1.02]" style={{ width: '80px' }}>
                {/* Phone Frame - Clean Dark */}
                <div className="relative bg-[#1a1a1a] rounded-[18px] p-[3px] shadow-xl border border-[#333] ring-1 ring-black/20">
                    {/* Screen Container */}
                    <div className="bg-black rounded-[15px] overflow-hidden aspect-[9/19.5] relative z-10">
                        {images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt="Screen"
                                style={{ transform: 'scale(1.06) translateY(-2.5%)' }}
                                className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-700 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                                    }`}
                            />
                        ))}

                        {/* Simple Notch */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[25%] h-[8px] bg-black rounded-full z-20"></div>

                        {/* Screen Gloss */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none rounded-[15px]"></div>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

// ... (previous code)

const ModernInteractiveFeatures = () => {
    const scrollRef = useRef(null);
    const containerRef = useRef(null);
    const inView = useInView(containerRef, { once: false, margin: "-100px" });

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 300;
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    const features = [
        {
            title: "Veg/Non-Veg Options",
            desc: "Allow customers to filter food based on dietary preferences.",
            icon: "nutrition",
            bg: "bg-[#FFF0EB]",
            iconColor: "text-green-600"
        },
        {
            title: "Light & Dark Mode",
            desc: "Experience inclusive visuals with full light & dark mode support.",
            icon: "dark_mode",
            bg: "bg-[#FFF4E6]",
            iconColor: "text-gray-800"
        },
        {
            title: "Live Order Tracking",
            desc: "Real-time order tracking for customers right after checkout.",
            icon: "location_on",
            bg: "bg-[#FEF9C3]",
            iconColor: "text-blue-600"
        },
        {
            title: "Robust Zone Management",
            desc: "Create and manage multiple business zones effectively.",
            icon: "map",
            bg: "bg-[#FFF0E6]",
            iconColor: "text-orange-600"
        },
        {
            title: "Multi-Restaurant Management",
            desc: "Centrally manage multiple restaurants and franchises with ease.",
            icon: "store_mall_directory",
            bg: "bg-[#FFE4E6]",
            iconColor: "text-red-500"
        }
    ];

    return (
        <div ref={containerRef} className="w-full py-24 bg-white relative">
            <div className="max-w-[1400px] mx-auto px-4 md:px-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-black text-gray-900 mb-6"
                    >
                        From Search to MUST: Modern & Interactive <span className="text-[#EF7F1A]">Appzeto Food</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-gray-500 max-w-3xl mx-auto"
                    >
                        Enjoy unlimited intuitive features in Appzeto Food Multi Restaurant Delivery Software you've been looking for.
                    </motion.p>
                </div>

                {/* Carousel Container */}
                <div className="relative">
                    {/* Left Button */}
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4 }}
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-400 hover:text-[#EF7F1A] hover:scale-110 transition-all"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </motion.button>

                    {/* Right Button */}
                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4 }}
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-400 hover:text-[#EF7F1A] hover:scale-110 transition-all"
                    >
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </motion.button>

                    {/* Scrollable Area */}
                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto gap-8 pb-10 px-4 hide-scrollbar snap-x snap-mandatory"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                                className={`min-w-[280px] md:min-w-[320px] h-[380px] ${feature.bg} rounded-[32px] p-8 flex flex-col items-center justify-center text-center snap-center hover:-translate-y-2 transition-transform duration-300`}
                            >
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                                    <span className={`material-symbols-outlined text-4xl ${feature.iconColor}`}>{feature.icon}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Footer Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 }}
                    className="flex justify-center mt-10"
                >
                    <button className="bg-gradient-to-r from-[#EF7F1A] to-[#F59E0B] text-white px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2">
                        More Features
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default ProductShowcase;
