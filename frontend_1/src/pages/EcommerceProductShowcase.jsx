import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollWrapper from '../components/ScrollWrapper';
import ContactUs from '../components/ContactUs';

gsap.registerPlugin(ScrollTrigger);

// --- Reusable Mock Components for Phone Screens ---

const ProductScreen = () => (
    <div className="w-full h-full bg-white flex flex-col relative overflow-hidden font-sans">
        {/* Header */}
        <div className="flex items-center justify-between p-4 pt-6 bg-white sticky top-0 z-10">
            <span className="material-symbols-outlined text-gray-800">menu</span>
            <span className="font-black text-lg tracking-tighter text-[#4F46E5]">ZENITH</span>
            <span className="material-symbols-outlined text-gray-800">shopping_bag</span>
        </div>

        {/* Hero Banner inside App */}
        <div className="mx-4 mt-2 h-40 bg-[#EEF2FF] rounded-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-[#4338CA] flex items-center justify-center">
                <h3 className="text-white font-black text-2xl text-center italic">NEW <br /> DROP</h3>
            </div>
            <div className="absolute bottom-2 right-2 bg-white text-[#4338CA] text-[10px] font-bold px-2 py-1 rounded-full">Shop Now</div>
        </div>

        {/* Categories */}
        <div className="flex gap-4 overflow-x-auto p-4 no-scrollbar">
            {['All', 'Shoes', 'Apparel', 'Acc.'].map((c, i) => (
                <div key={i} className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap ${i === 0 ? 'bg-[#4F46E5] text-white' : 'bg-gray-100 text-gray-600'}`}>{c}</div>
            ))}
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto px-4 pb-20 no-scrollbar">
            <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((item, i) => (
                    <div key={i} className="space-y-2">
                        <div className="aspect-[3/4] bg-gray-100 rounded-xl relative overflow-hidden">
                            <div className="absolute top-2 right-2 bg-white p-1 rounded-full"><span className="material-symbols-outlined text-[14px] text-[#4F46E5]">favorite</span></div>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-900 leading-tight">Urban Jacket</p>
                            <p className="text-xs font-black text-[#4F46E5]">$129</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const CartScreen = () => (
    <div className="w-full h-full bg-gray-50 flex flex-col relative overflow-hidden font-sans">
        <div className="p-4 pt-6 bg-white shadow-sm z-10">
            <h3 className="font-black text-xl text-[#312E81]">My Cart (3)</h3>
        </div>
        <div className="flex-1 p-4 space-y-3 overflow-y-auto no-scrollbar">
            {[1, 2, 3].map((item, i) => (
                <div key={i} className="bg-white p-3 rounded-xl flex gap-3 shadow-sm">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg"></div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <h4 className="font-bold text-sm text-gray-800">Nike Air Max</h4>
                            <span className="font-black text-sm text-[#4F46E5]">$129</span>
                        </div>
                        <p className="text-[10px] text-gray-400">Size: 42 • Color: Black</p>
                        <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-1">
                                <span className="text-[10px]">-</span>
                                <span className="text-xs font-bold">1</span>
                                <span className="text-[10px]">+</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className="p-4 bg-white rounded-t-3xl shadow-lg">
            <div className="flex justify-between mb-2 text-sm text-gray-500">
                <span>Subtotal</span><span>$387.00</span>
            </div>
            <div className="flex justify-between mb-4 text-lg font-black text-gray-900">
                <span>Total</span><span>$387.00</span>
            </div>
            <button className="w-full py-4 bg-[#4F46E5] text-white rounded-2xl font-bold text-sm shadow-indigo-200 shadow-xl">Checkout</button>
        </div>
    </div>
);

const AdminDashboard = () => (
    <div className="w-full h-full bg-[#f8fafc] flex font-sans overflow-hidden text-[#0f172a]">
        {/* Sidebar */}
        <div className="w-16 bg-[#312E81] flex flex-col items-center py-6 gap-6 text-indigo-300">
            <span className="material-symbols-outlined text-white">store</span>
            <span className="material-symbols-outlined">inventory_2</span>
            <span className="material-symbols-outlined">shopping_cart</span>
            <span className="material-symbols-outlined">analytics</span>
            <div className="mt-auto w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-sm">settings</span>
            </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl text-[#312E81]">Store Overview</h3>
                <div className="w-8 h-8 bg-[#4F46E5] rounded-full shadow-sm text-white flex items-center justify-center text-xs">JD</div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                    { l: 'Total Sales', v: '$45.2k', c: 'bg-white text-[#312E81]' },
                    { l: 'Orders', v: '1,240', c: 'bg-white text-[#312E81]' },
                    { l: 'Visitors', v: '12.5k', c: 'bg-white text-[#312E81]' },
                    { l: 'Conversion', v: '3.2%', c: 'bg-[#4F46E5] text-white' }
                ].map((s, i) => (
                    <div key={i} className={`p-4 rounded-xl shadow-sm ${s.c} flex flex-col justify-center`}>
                        <span className={`text-[10px] font-bold uppercase opacity-80`}>{s.l}</span>
                        <span className="text-xl font-black mt-1">{s.v}</span>
                    </div>
                ))}
            </div>

            {/* Sales Graph Placeholder */}
            <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm relative flex items-end justify-between px-6 pb-4 gap-2">
                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                    <div key={i} className="w-full bg-[#4F46E5]/10 rounded-t-sm hover:bg-[#4F46E5] transition-colors" style={{ height: `${h}%` }}></div>
                ))}
            </div>
        </div>
    </div>
);


const EcommerceProductShowcase = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    const containerRef = useRef(null);
    const userSectionRef = useRef(null);
    const driverSectionRef = useRef(null);
    const adminSectionRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const heroBlobY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
    const heroPhoneY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const animateSection = (ref, xVal, yVal, rotateVal) => {
                if (!ref.current) return;
                gsap.fromTo(ref.current.querySelector('.visual'),
                    { opacity: 0, x: xVal || 0, y: yVal || 0, rotateY: rotateVal || 0 },
                    { opacity: 1, x: 0, y: 0, rotateY: 0, duration: 1, scrollTrigger: { trigger: ref.current, start: "top 70%", end: "bottom 70%", toggleActions: "play reverse play reverse", scrub: 1 } }
                );
                gsap.fromTo(ref.current.querySelector('.content'),
                    { opacity: 0, x: xVal ? -xVal : 0, y: yVal ? -yVal : 0 },
                    { opacity: 1, x: 0, y: 0, duration: 1, scrollTrigger: { trigger: ref.current, start: "top 70%", end: "bottom 70%", toggleActions: "play reverse play reverse", scrub: 1 } }
                );
            };
            animateSection(userSectionRef, -100, 0, 0);
            animateSection(driverSectionRef, 0, 50, 0);
            animateSection(adminSectionRef, 50, 0, -10);
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <ScrollWrapper>
            <div className="font-sans antialiased text-gray-900 bg-white overflow-hidden selection:bg-[#4F46E5] selection:text-white" ref={containerRef}>
                <Navbar />

                {/* --- Hero Section --- */}
                <section className="relative h-screen max-h-screen flex items-center pt-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-[60%] h-[120%] bg-[#EEF2FF] rounded-bl-full -z-10 translate-x-1/3 -translate-y-20"></div>
                    <motion.div style={{ y: heroBlobY }} className="absolute md:top-[10%] md:right-[5%] w-[500px] h-[500px] bg-[#4F46E5]/10 rounded-full blur-3xl -z-10"></motion.div>

                    <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
                        <div className="space-y-4 max-w-lg z-10">
                            <span className="text-[#4338CA] font-bold tracking-widest uppercase text-xs border-b-2 border-[#4F46E5] pb-1 inline-block">Next-Gen Ecommerce</span>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1] text-[#1E1B4B] tracking-tight">
                                Shop Smart,<br /> Live <span className="text-[#4F46E5] underline decoration-4 decoration-[#4F46E5]/30 underline-offset-4">Better.</span>
                            </h1>
                            <p className="text-[#4338CA] text-lg leading-relaxed font-medium">Create immersive shopping experiences that convert visitors into loyal customers.</p>
                            <div className="relative max-w-sm pt-4">
                                <button className="w-full pl-6 pr-4 py-4 rounded-full bg-[#1E1B4B] text-white shadow-xl shadow-indigo-200 flex items-center justify-between font-bold hover:scale-105 transition-all group">
                                    <span>Launch Your Store</span>
                                    <div className="bg-[#4F46E5] text-white p-2 rounded-full"><span className="material-symbols-outlined text-lg group-hover:rotate-45 transition-transform">arrow_forward</span></div>
                                </button>
                            </div>
                        </div>

                        <div className="relative flex justify-center lg:justify-end h-full items-center">
                            <motion.div style={{ y: heroPhoneY }} className="relative z-10 w-[280px] border-[10px] border-white rounded-[2.5rem] shadow-2xl bg-[#1E1B4B] overflow-hidden h-[580px]">
                                <ProductScreen />
                            </motion.div>
                            <motion.div animate={{ y: [-10, 10, -10] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute top-[30%] -left-16 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3">
                                <div className="p-3 bg-[#4F46E5] rounded-full text-white"><span className="material-symbols-outlined text-lg">view_in_ar</span></div>
                                <div><p className="text-xs font-black text-gray-800">AR Try-On</p><p className="text-[10px] text-gray-500 font-bold">Virtual Fitting</p></div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* --- 3 Icons Section --- */}
                <section className="py-12 md:py-20">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <p className="text-base font-black text-[#6366F1] uppercase tracking-widest mb-10">Complete Commerce Solution</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "Global Reach", desc: "Multi-currency and multi-language support built-in.", icon: "public", color: "bg-indigo-50 text-[#4F46E5]" },
                                { title: "AI Powered", desc: "Smart recommendations to boost average order value.", icon: "psychology", color: "bg-indigo-50 text-[#4F46E5]" },
                                { title: "Secure Checkout", desc: "Enterprise-grade security for peace of mind.", icon: "lock", color: "bg-indigo-50 text-[#4F46E5]" }
                            ].map((item, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2, duration: 0.6 }} viewport={{ once: true }} className="flex flex-col items-center group cursor-pointer">
                                    <div className={`w-20 h-20 rounded-[2rem] ${item.color} flex items-center justify-center mb-5 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                                        <span className="material-symbols-outlined text-4xl">{item.icon}</span>
                                    </div>
                                    <h3 className="text-xl font-black text-[#1E1B4B] mb-2">{item.title}</h3>
                                    <p className="text-[#4338CA] max-w-xs text-base">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- SECTION 1: USER APP --- */}
                <section ref={userSectionRef} className="py-12 md:py-16 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-[#EEF2FF] -skew-x-12 translate-x-[20%] -z-10"></div>
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="visual relative flex justify-center">
                            <div className="relative z-10 w-[340px] border-[14px] border-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] bg-white overflow-hidden h-[700px]">
                                <ProductScreen />
                            </div>
                        </div>
                        <div className="content space-y-4">
                            <div>
                                <h4 className="text-[#4F46E5] font-black tracking-[0.2em] uppercase text-sm mb-4 inline-block bg-[#EEF2FF] px-4 py-2 rounded-full">For Shoppers</h4>
                                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#1E1B4B] leading-[1.1] tracking-tight">Immersive <br /> Shopping</h2>
                            </div>
                            <p className="text-base text-gray-500 leading-relaxed font-medium">Engage customers with a fluid, native mobile experience.</p>
                            <ul className="space-y-3">
                                {["Clean, Minimalist UI", "One-Tap Checkout with Apple Pay", "Wishlist & Collections", "Real-time Order Tracking"].map((f, i) => (
                                    <li key={i} className="flex items-start gap-4 p-3 rounded-2xl hover:bg-[#EEF2FF] transition-colors cursor-default">
                                        <div className="w-8 h-8 rounded-full bg-[#4F46E5] flex items-center justify-center text-white mt-1 shrink-0"><span className="material-symbols-outlined text-sm font-bold">check</span></div>
                                        <span className="font-bold text-[#1E1B4B] text-lg">{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* --- SECTION 2: SELLER APP --- */}
                <section ref={driverSectionRef} className="py-12 md:py-16 overflow-hidden bg-[#1E1B4B] text-white relative">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="content space-y-4 order-2 lg:order-1">
                            <div>
                                <h4 className="text-[#818CF8] font-black tracking-[0.2em] uppercase text-sm mb-4 inline-block bg-[#4F46E5]/20 px-4 py-2 rounded-full">For Sellers</h4>
                                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">Manage Your <br /> Empire</h2>
                            </div>
                            <p className="text-base text-indigo-300 leading-relaxed font-medium">Process orders, update inventory, and handle returns on the go.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                {[{ t: "Inventory Sync", i: "inventory" }, { t: "Order Alerts", i: "notifications_active" }, { t: "Customer Chat", i: "chat" }, { t: "Sales Analytics", i: "trending_up" }].map((x, i) => (
                                    <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-3xl hover:bg-white/10 transition-colors flex items-center gap-4">
                                        <span className="material-symbols-outlined text-[#818CF8] text-3xl">{x.i}</span><span className="font-bold text-lg">{x.t}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="visual relative flex justify-center order-1 lg:order-2">
                            <div className="relative z-10 w-[340px] border-[14px] border-[#312E81] rounded-[3rem] shadow-2xl bg-[#1E1B4B] overflow-hidden h-[700px] ring-1 ring-white/10">
                                <CartScreen />
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- SECTION 3: ADMIN PANEL --- */}
                <section ref={adminSectionRef} className="py-12 md:py-16 overflow-hidden relative bg-[#F5F3FF]">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="visual relative flex justify-center perspective-1000">
                            <div className="relative z-10 w-full max-w-xl aspect-[16/10] shadow-2xl rounded-2xl overflow-hidden border-[12px] border-white bg-white transform rotate-y-12 shadow-indigo-900/10"><AdminDashboard /></div>
                        </div>
                        <div className="content space-y-4">
                            <div>
                                <h4 className="text-[#312E81] font-black tracking-[0.2em] uppercase text-sm mb-4 inline-block bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">Business Intelligence</h4>
                                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#1E1B4B] leading-[1.1] tracking-tight">Global Insights <br /> Real-time</h2>
                            </div>
                            <p className="text-base text-[#4338CA] leading-relaxed font-medium">Track your growth with detailed reports on sales, visitor demographics, and conversion rates.</p>
                            <div className="space-y-4">
                                {[{ t: "Revenue Tracking", d: "Monitor daily sales." }, { t: "User Management", d: "Control access roles." }, { t: "Campaign Manager", d: "Run promo banners." }].map((x, i) => (
                                    <div key={i} className="flex gap-4 group">
                                        <div className="w-14 h-14 bg-[#312E81] text-white rounded-2xl shadow-md flex items-center justify-center font-black text-2xl border border-[#4338CA]">{i + 1}</div>
                                        <div><h4 className="font-bold text-[#1E1B4B] text-xl">{x.t}</h4><p className="text-[#4338CA] text-base mt-2">{x.d}</p></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- CTA --- */}
                <section className="py-20 bg-[#1E1B4B] relative overflow-hidden text-white">
                    <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                        <h2 className="text-5xl md:text-6xl font-black mb-8">Ready to Scale?</h2>
                        <button className="px-10 py-5 bg-[#4F46E5] text-white font-black rounded-full text-lg shadow-xl hover:scale-105 transition-all outline outline-4 outline-[#4F46E5]/30">Start Free Trial</button>
                    </div>
                </section>

                <ContactUs isHomePage={true} />
                <Footer />
            </div>
        </ScrollWrapper>
    );
};

export default EcommerceProductShowcase;
