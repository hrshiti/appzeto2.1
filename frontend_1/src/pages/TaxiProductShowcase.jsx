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

const MapScreen = () => (
    <div className="w-full h-full bg-gray-100 flex flex-col relative overflow-hidden font-sans">
        {/* Map Background */}
        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Google_Maps_Logo_2020.svg/2275px-Google_Maps_Logo_2020.svg.png')] bg-cover bg-center opacity-10 grayscale"></div>

        {/* Map Elements (Mock) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
            {/* Roads */}
            <div className="absolute top-[20%] left-0 w-full h-4 bg-gray-300 transform -rotate-12"></div>
            <div className="absolute top-[60%] left-0 w-full h-4 bg-gray-300 transform rotate-12"></div>
            <div className="absolute top-0 right-[30%] w-4 h-full bg-gray-300"></div>

            {/* Path */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path d="M 120 180 Q 200 400 280 500" stroke="#00F2FE" strokeWidth="4" fill="none" strokeDasharray="8 8" />
            </svg>

            {/* Car */}
            <div className="absolute top-[40%] left-[30%] w-8 h-8 bg-black rounded-full flex items-center justify-center text-[#00F2FE] shadow-lg z-10 animate-bounce">
                <span className="material-symbols-outlined text-lg">local_taxi</span>
            </div>

            {/* User Pin */}
            <div className="absolute bottom-[20%] right-[25%] text-red-500 z-10">
                <span className="material-symbols-outlined text-4xl">location_on</span>
            </div>
        </div>

        {/* UI Overlays */}
        <div className="absolute bottom-0 w-full bg-white rounded-t-3xl p-5 shadow-2xl z-20">
            <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h4 className="font-bold text-gray-900">Ride Arriving</h4>
                    <p className="text-xs text-gray-500">2 mins away</p>
                </div>
                <span className="bg-[#00F2FE]/10 text-[#008f96] px-3 py-1 rounded-full text-xs font-bold">Standard</span>
            </div>
            <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div>
                    <p className="text-xs font-bold text-gray-900">Michael Driver</p>
                    <div className="flex text-yellow-500 text-[10px]">★★★★★</div>
                </div>
                <div className="ml-auto w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                    <span className="material-symbols-outlined text-sm">call</span>
                </div>
            </div>
        </div>
    </div>
);

const BookingScreen = () => (
    <div className="w-full h-full bg-white flex flex-col p-4 relative overflow-hidden font-sans">
        <div className="flex items-center gap-4 mb-6 mt-8">
            <span className="material-symbols-outlined">arrow_back</span>
            <h3 className="font-bold text-lg">Select Ride</h3>
        </div>

        <div className="space-y-3">
            {[
                { name: 'Bike', price: '$5.00', time: '1 min', icon: 'two_wheeler', active: false },
                { name: 'Standard', price: '$12.50', time: '3 min', icon: 'local_taxi', active: true },
                { name: 'Premium', price: '$24.00', time: '5 min', icon: 'directions_car', active: false },
                { name: 'Van', price: '$35.00', time: '8 min', icon: 'airport_shuttle', active: false },
            ].map((ride, i) => (
                <div key={i} className={`flex items-center justify-between p-3 rounded-xl border ${ride.active ? 'border-[#00F2FE] bg-[#00F2FE]/5' : 'border-gray-100'}`}>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-700">
                            <span className="material-symbols-outlined">{ride.icon}</span>
                        </div>
                        <div>
                            <p className="font-bold text-gray-800 text-sm">{ride.name}</p>
                            <p className="text-[10px] text-gray-400">{ride.time} away</p>
                        </div>
                    </div>
                    <span className="font-bold text-gray-900 text-sm">{ride.price}</span>
                </div>
            ))}
        </div>

        <div className="mt-auto mb-4">
            <button className="w-full py-3 bg-[#082F30] text-[#00F2FE] rounded-xl font-bold text-sm shadow-lg">Confirm Ride</button>
        </div>
    </div>
);


const DriverScreen = () => (
    <div className="w-full h-full bg-white flex flex-col relative overflow-hidden font-sans">
        {/* Header */}
        <div className="bg-[#082F30] p-6 pb-12 rounded-b-[2.5rem] relative z-20 text-white">
            <div className="flex justify-between items-center mb-6">
                <span className="material-symbols-outlined">menu</span>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold">Online</span>
                </div>
                <span className="material-symbols-outlined">notifications</span>
            </div>
            <div className="text-center">
                <p className="text-xs opacity-70 font-bold uppercase tracking-widest">Today's Earnings</p>
                <h3 className="text-4xl font-black mt-2">$248.50</h3>
            </div>
            <div className="flex justify-center gap-8 mt-6 border-t border-white/10 pt-4">
                <div className="text-center">
                    <p className="text-xl font-bold">12</p>
                    <p className="text-[10px] opacity-70">Rides</p>
                </div>
                <div className="text-center">
                    <p className="text-xl font-bold">5.5h</p>
                    <p className="text-[10px] opacity-70">Online</p>
                </div>
                <div className="text-center">
                    <p className="text-xl font-bold">4.9</p>
                    <p className="text-[10px] opacity-70">Rating</p>
                </div>
            </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 bg-gray-100 relative -mt-6 z-10">
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Google_Maps_Logo_2020.svg/2275px-Google_Maps_Logo_2020.svg.png')] bg-cover bg-center opacity-10"></div>
            {/* Route Line */}
            <svg className="absolute inset-0 w-full h-full">
                <path d="M 150 100 L 150 250 L 250 350" stroke="#082F30" strokeWidth="4" fill="none" strokeDasharray="6 4" />
            </svg>
            <div className="absolute top-[30%] left-[45%] bg-[#082F30] text-white p-2 rounded-full shadow-lg z-20">
                <span className="material-symbols-outlined">local_taxi</span>
            </div>
        </div>

        {/* Request Popup */}
        <div className="p-4">
            <div className="bg-white rounded-2xl p-4 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h4 className="font-bold text-gray-900">New Request</h4>
                        <p className="text-xs text-gray-500">4 min away • 2.5 km</p>
                    </div>
                    <div className="bg-gray-100 px-3 py-1 rounded-lg">
                        <span className="font-black text-gray-900">$14.20</span>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold text-sm">Decline</button>
                    <button className="flex-1 py-3 bg-[#00F2FE] text-[#082F30] rounded-xl font-bold text-sm">Accept Ride</button>
                </div>
            </div>
        </div>
    </div>
);

const AdminDashboard = () => (
    <div className="w-full h-full bg-[#f3f4f6] flex font-sans overflow-hidden text-[#1f2937]">
        {/* Sidebar */}
        <div className="w-16 bg-[#082F30] flex flex-col items-center py-6 gap-6 text-gray-400">
            <span className="material-symbols-outlined text-white">dashboard</span>
            <span className="material-symbols-outlined">group</span>
            <span className="material-symbols-outlined">local_taxi</span>
            <span className="material-symbols-outlined">payments</span>
            <div className="mt-auto w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-sm">settings</span>
            </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl">Dashboard</h3>
                <div className="w-8 h-8 bg-white rounded-full shadow-sm"></div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                    { label: 'Total Users', val: '24k', color: 'bg-blue-50 text-blue-600' },
                    { label: 'Active Drivers', val: '1.2k', color: 'bg-green-50 text-green-600' },
                    { label: 'Revenue', val: '$85k', color: 'bg-yellow-50 text-yellow-600' },
                    { label: 'Total Rides', val: '156k', color: 'bg-purple-50 text-purple-600' }
                ].map((s, i) => (
                    <div key={i} className={`p-3 rounded-xl ${s.color} flex flex-col justify-center`}>
                        <span className="text-[10px] font-bold uppercase opacity-70">{s.label}</span>
                        <span className="text-lg font-black">{s.val}</span>
                    </div>
                ))}
            </div>

            {/* Map Area */}
            <div className="flex-1 bg-white rounded-2xl border border-gray-200 p-4 shadow-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gray-50 flex items-center justify-center">
                    <span className="material-symbols-outlined text-6xl text-gray-200">map</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-white p-3 rounded-xl shadow-md border border-gray-100">
                    <div className="h-2 w-full bg-gray-100 rounded-full mb-2 overflow-hidden">
                        <div className="h-full w-[70%] bg-[#082F30]"></div>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-gray-500">
                        <span>Demand High</span>
                        <span>70% Active</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);


const TaxiProductShowcase = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Refs for Scroll Animations
    const containerRef = useRef(null);
    const userSectionRef = useRef(null);
    const driverSectionRef = useRef(null);
    const adminSectionRef = useRef(null);

    // Lenis Scroll Progress
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const heroBlobY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
    const heroPhoneY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

    // GSAP Animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            // User Section: Slide In + Fade
            gsap.fromTo(userSectionRef.current.querySelector('.visual'),
                { opacity: 0, x: -100 },
                {
                    opacity: 1, x: 0, duration: 1,
                    scrollTrigger: {
                        trigger: userSectionRef.current,
                        start: "top 70%",
                        end: "bottom 70%",
                        toggleActions: "play reverse play reverse", // Animates in on scroll down, out on scroll up
                        scrub: 1
                    }
                }
            );
            gsap.fromTo(userSectionRef.current.querySelector('.content'),
                { opacity: 0, x: 100 },
                {
                    opacity: 1, x: 0, duration: 1,
                    scrollTrigger: {
                        trigger: userSectionRef.current,
                        start: "top 70%",
                        end: "bottom 70%",
                        toggleActions: "play reverse play reverse",
                        scrub: 1
                    }
                }
            );

            // Driver Section: Slide Up + Scale
            gsap.fromTo(driverSectionRef.current.querySelector('.visual'),
                { opacity: 0, scale: 0.8 },
                {
                    opacity: 1, scale: 1, duration: 1,
                    scrollTrigger: {
                        trigger: driverSectionRef.current,
                        start: "top 70%",
                        end: "bottom 70%",
                        toggleActions: "play reverse play reverse",
                        scrub: 1
                    }
                }
            );
            gsap.fromTo(driverSectionRef.current.querySelector('.content'),
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0, duration: 1,
                    scrollTrigger: {
                        trigger: driverSectionRef.current,
                        start: "top 70%",
                        end: "bottom 70%",
                        toggleActions: "play reverse play reverse",
                        scrub: 1
                    }
                }
            );

            // Admin Section: 3D Rotate Reveal
            gsap.fromTo(adminSectionRef.current.querySelector('.visual'),
                { opacity: 0, rotateY: -30 },
                {
                    opacity: 1, rotateY: -10, duration: 1,
                    scrollTrigger: {
                        trigger: adminSectionRef.current,
                        start: "top 70%",
                        end: "bottom 70%",
                        toggleActions: "play reverse play reverse",
                        scrub: 1
                    }
                }
            );
            gsap.fromTo(adminSectionRef.current.querySelector('.content'),
                { opacity: 0, x: 50 },
                {
                    opacity: 1, x: 0, duration: 1,
                    scrollTrigger: {
                        trigger: adminSectionRef.current,
                        start: "top 70%",
                        end: "bottom 70%",
                        toggleActions: "play reverse play reverse",
                        scrub: 1
                    }
                }
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <ScrollWrapper>
            <div className="font-sans antialiased text-gray-900 bg-white overflow-hidden selection:bg-[#00F2FE] selection:text-[#082F30]" ref={containerRef}>
                <Navbar />

                {/* --- Hero Section --- */}
                <section className="relative h-screen max-h-screen flex items-center pt-0 overflow-hidden">
                    {/* Background Blobs (Like screenshot) */}
                    <div className="absolute top-0 right-0 w-[60%] h-[120%] bg-[#fefce8] rounded-bl-full -z-10 translate-x-1/3 -translate-y-20"></div>
                    <motion.div style={{ y: heroBlobY }} className="absolute md:top-[10%] md:right-[5%] w-[500px] h-[500px] bg-[#00F2FE]/10 rounded-full blur-3xl -z-10"></motion.div>

                    <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
                        {/* Text Content */}
                        <div className="space-y-4 max-w-lg z-10">
                            <span className="text-[#008f96] font-bold tracking-widest uppercase text-xs border-b-2 border-[#00F2FE] pb-1 inline-block">Modern Ride Hailing</span>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1] text-[#082F30] tracking-tight">
                                That Means We <br />
                                Don't Just <span className="text-[#00babe] underline decoration-4 decoration-[#00F2FE]/50 underline-offset-4">Drive.</span>
                            </h1>
                            <p className="text-gray-500 text-lg leading-relaxed font-medium">
                                Get to your destination with style, safety, and speed. Appzeto Taxi redefines urban mobility.
                            </p>

                            {/* Search Input Simulation */}
                            <div className="relative max-w-sm pt-4">
                                <input
                                    type="text"
                                    placeholder="Enter pickup location"
                                    className="w-full pl-10 pr-4 py-4 rounded-full bg-white shadow-[0_20px_60px_-10px_rgba(0,0,0,0.1)] border-none outline-none text-gray-600 font-bold focus:ring-4 focus:ring-[#00F2FE]/20 transition-all"
                                    readOnly
                                />
                                <span className="material-symbols-outlined absolute left-4 top-[50%] -translate-y-1/2 text-[#00F2FE] text-xl">search</span>
                                <button className="absolute right-2 top-[50%] -translate-y-1/2 bg-[#00F2FE] p-2 rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-all">
                                    <span className="material-symbols-outlined text-white text-lg">arrow_forward</span>
                                </button>
                            </div>
                        </div>

                        {/* Phone Mockup (Right) */}
                        <div className="relative flex justify-center lg:justify-end h-full items-center">
                            {/* Blob Behind Phone */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#00F2FE] rounded-full opacity-20 blur-xl"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-[#FFD166] rounded-full -rotate-6 z-0"></div>

                            <motion.div
                                style={{ y: heroPhoneY }}
                                className="relative z-10 w-[280px] border-[10px] border-white rounded-[2.5rem] shadow-2xl bg-black overflow-hidden h-[580px]"
                            >
                                <MapScreen />
                            </motion.div>

                            {/* Floating Badges */}
                            <motion.div
                                animate={{ y: [-10, 10, -10] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="absolute top-[25%] -left-12 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3"
                            >
                                <div className="p-2 bg-green-100 rounded-full text-green-600">
                                    <span className="material-symbols-outlined text-xl">verified_user</span>
                                </div>
                                <div>
                                    <p className="text-xs font-black text-gray-800">Verified Drivers</p>
                                    <p className="text-[10px] text-gray-500 font-bold">100% Safe</p>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [10, -10, 10] }}
                                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                                className="absolute bottom-[25%] -right-5 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3"
                            >
                                <div className="text-center">
                                    <p className="text-[10px] font-bold text-gray-800">Best Prices</p>
                                    <p className="text-base font-black text-[#008f96]">$5.00</p>
                                </div>
                                <div className="p-2 bg-yellow-100 rounded-full text-yellow-600">
                                    <span className="material-symbols-outlined text-xl">attach_money</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* --- 3 Icons Section --- */}
                <section className="py-12 md:py-20">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <p className="text-base font-black text-gray-400 uppercase tracking-widest mb-10">All-in-one Mobility to grow your business</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "Real-time Tracking", desc: "Know exactly where your ride is at all times.", icon: "location_on", color: "bg-blue-100 text-blue-600" },
                                { title: "Fastest Pickup", desc: "Our smart algorithm finds the nearest driver instantly.", icon: "electric_bolt", color: "bg-yellow-100 text-yellow-600" },
                                { title: "Secure Payments", desc: "Cashless, hassle-free and secure transactions.", icon: "account_balance_wallet", color: "bg-green-100 text-green-600" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.2, duration: 0.6 }}
                                    viewport={{ once: true }}
                                    className="flex flex-col items-center group cursor-pointer"
                                >
                                    <div className={`w-20 h-20 rounded-[2rem] ${item.color} flex items-center justify-center mb-5 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-getAll duration-300`}>
                                        <span className="material-symbols-outlined text-4xl">{item.icon}</span>
                                    </div>
                                    <h3 className="text-xl font-black text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-gray-500 max-w-xs text-base">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- SECTION 1: USER APP --- */}
                <section ref={userSectionRef} className="py-12 md:py-16 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-50 -skew-x-12 translate-x-[20%] -z-10"></div>
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        {/* Visual */}
                        <div className="visual relative flex justify-center">
                            <div className="relative z-10">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#00F2FE] rounded-full blur-[100px] opacity-20"></div>
                                <div className="w-[340px] border-[14px] border-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] bg-white overflow-hidden h-[700px] relative z-10">
                                    <BookingScreen />
                                </div>
                                {/* Floating Element */}
                                <div className="absolute top-24 -right-16 bg-white p-5 rounded-3xl shadow-2xl z-20 flex gap-4 items-center border border-gray-100">
                                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white shadow-lg">
                                        <span className="material-symbols-outlined">schedule</span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-extrabold text-[#00F2FE] uppercase tracking-wider">Estimated Arrival</p>
                                        <p className="text-xl font-black text-gray-900">10:45 AM</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="content space-y-4">
                            <div>
                                <h4 className="text-[#00F2FE] font-black tracking-[0.2em] uppercase text-sm mb-4 inline-block bg-[#00F2FE]/10 px-4 py-2 rounded-full">For Riders</h4>
                                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#082F30] leading-[1.1] tracking-tight">
                                    The Ultimate <br /> Booking Experience
                                </h2>
                            </div>
                            <p className="text-base text-gray-500 leading-relaxed font-medium">
                                Give your customers a seamless, premium experience from pickup to drop-off. Our user app is designed for speed, clarity, and ease of use.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    "Smart Location Search with Google Places API",
                                    "Multiple Ride Options (Bike, Auto, Sedan, SUV)",
                                    "Real-time Driver Tracking & ETA sharing",
                                    "Secure In-app Payments & Digital Wallets"
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-start gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                        <div className="w-8 h-8 rounded-full bg-[#00F2FE] flex items-center justify-center text-white mt-1 shrink-0 shadow-md">
                                            <span className="material-symbols-outlined text-sm font-bold">check</span>
                                        </div>
                                        <span className="font-bold text-gray-800 text-lg">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-2">
                                <button className="px-10 py-4 bg-[#082F30] text-[#00F2FE] rounded-full font-black text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-3 group">
                                    Explorer Rider Features
                                    <span className="material-symbols-outlined text-2xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- SECTION 2: DRIVER APP --- */}
                <section ref={driverSectionRef} className="py-12 md:py-16 overflow-hidden bg-[#082F30] text-white relative">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        {/* Content (Left) */}
                        <div className="content space-y-4 order-2 lg:order-1">
                            <div>
                                <h4 className="text-[#00F2FE] font-black tracking-[0.2em] uppercase text-sm mb-4 inline-block bg-[#00F2FE]/10 px-4 py-2 rounded-full">For Drivers</h4>
                                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">
                                    Maximize Earnings,<br /> Minimize Hassle
                                </h2>
                            </div>
                            <p className="text-base text-gray-400 leading-relaxed font-medium">
                                Empower your fleet with tools that make their job easier. From intelligent dispatching to instant earnings withdrawals.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                {[
                                    { title: "Smart Heatmaps", desc: "Guide drivers to high-demand zones instantly.", icon: "local_fire_department" },
                                    { title: "Earnings Tracker", desc: "Daily, weekly and monthly earning reports.", icon: "paid" },
                                    { title: "In-app Chat", desc: "Seamless communication with riders.", icon: "chat" },
                                    { title: "Document Upload", desc: "Easy onboarding and verification process.", icon: "upload_file" },
                                ].map((item, i) => (
                                    <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-3xl hover:bg-white/10 transition-colors group">
                                        <span className="material-symbols-outlined text-[#00F2FE] text-4xl mb-4 group-hover:scale-100 transition-transform">{item.icon}</span>
                                        <h4 className="font-bold text-xl mb-2">{item.title}</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Visual (Right) */}
                        <div className="visual relative flex justify-center order-1 lg:order-2">
                            <div className="relative z-10">
                                <div className="absolute inset-0 bg-white/10 blur-[100px] rounded-full transform rotate-12 scale-110"></div>
                                <div className="w-[340px] border-[14px] border-gray-800 rounded-[3rem] shadow-2xl bg-black overflow-hidden h-[700px] relative z-10 ring-1 ring-white/20">
                                    <DriverScreen />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- SECTION 3: ADMIN PANEL --- */}
                <section ref={adminSectionRef} className="py-12 md:py-16 overflow-hidden relative bg-gray-50">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        {/* Visual */}
                        <div className="visual relative flex justify-center perspective-1000">
                            <div
                                className="relative z-10 w-full max-w-xl aspect-[16/10] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] rounded-2xl overflow-hidden border-[12px] border-white bg-white transform rotate-y-12"
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                <AdminDashboard />
                            </div>
                            {/* Decorative Elements around dashboard */}
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#00F2FE] rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
                        </div>

                        {/* Content */}
                        <div className="content space-y-4">
                            <div>
                                <h4 className="text-[#082F30] font-black tracking-[0.2em] uppercase text-sm mb-4 inline-block bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">For Business Owners</h4>
                                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#082F30] leading-[1.1] tracking-tight">
                                    The Command Center <br /> for Your Fleet
                                </h2>
                            </div>
                            <p className="text-base text-gray-500 leading-relaxed font-medium">
                                Maintain complete control over your operations. Our powerful admin panel gives you a bird's-eye view of your entire business in real-time.
                            </p>
                            <div className="space-y-4">
                                {[
                                    { t: "Live Fleet Tracking", d: "Monitor every vehicle location and status on a live interactive map." },
                                    { t: "Dynamic Pricing Control", d: "Set surge pricing, base fares, and zone-based rates instantly." },
                                    { t: "Detailed Analytics", d: "Deep dive into revenue, ride volume, and driver performance metrics." },
                                ].map((x, i) => (
                                    <div key={i} className="flex gap-4 group">
                                        <div className="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center text-[#082F30] shrink-0 border border-gray-100 font-black text-2xl group-hover:bg-[#082F30] group-hover:text-[#00F2FE] transition-colors duration-300">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-xl group-hover:text-[#00F2FE] transition-colors">{x.t}</h4>
                                            <p className="text-gray-500 text-base mt-2 leading-relaxed">{x.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="pt-4">
                                <button className="text-[#082F30] font-black text-lg border-b-4 border-[#00F2FE] pb-1 hover:text-[#00F2FE] transition-colors">
                                    Request Admin Demo
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- Grid Features --- */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-5xl font-black text-[#082F30] mb-4">Perfect hailing app</h2>
                            <p className="text-gray-400 text-xl max-w-2xl mx-auto">Everything you need to run a successful taxi business, right out of the box.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-12">
                            {[
                                { title: "Zone Management", icon: "map", color: "text-green-500" },
                                { title: "Panel Control", icon: "admin_panel_settings", color: "text-orange-500" },
                                { title: "Integrated Payment", icon: "payments", color: "text-blue-500" },
                                { title: "Vehicle Options", icon: "directions_car", color: "text-purple-500" },
                                { title: "Ride History", icon: "history", color: "text-red-500" },
                                { title: "Smart Notifications", icon: "notifications_active", color: "text-teal-500" }
                            ].map((feature, i) => (
                                <div key={i} className="flex flex-col items-center text-center p-6 hover:bg-gray-50 rounded-[2rem] transition-colors border border-transparent hover:border-gray-100 group">
                                    <div className={`mb-6 p-6 bg-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] rounded-[2rem] ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                                        <span className="material-symbols-outlined text-4xl">{feature.icon}</span>
                                    </div>
                                    <h3 className="font-black text-2xl text-gray-900 mb-3">{feature.title}</h3>
                                    <p className="text-base text-gray-500 leading-relaxed font-medium">
                                        Complete control over business logic and features with ease.
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- App Screen Banner --- */}
                <section className="py-20 bg-gradient-to-r from-[#FF0844] to-[#FFB199] relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                        <div className="text-white">
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">Get professional Taxi App Modules for your business.</h2>
                            <p className="text-white/90 text-xl mb-10 max-w-lg font-medium leading-relaxed">
                                Launch your own taxi business with our white-label solution. Customizable source code included.
                            </p>
                            <div className="flex gap-4">
                                <button className="px-10 py-5 bg-white text-[#FF0844] font-black rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-lg">Contact Sales</button>
                            </div>
                        </div>
                        <div className="relative h-[400px] lg:h-[500px] flex items-center justify-center">
                            {/* Slanted Phones */}
                            <motion.div initial={{ y: 50, rotate: -12 }} whileInView={{ y: 0, rotate: -12 }} className="absolute left-0 w-[240px] bg-black border-[10px] border-gray-800 rounded-[2.5rem] h-[480px] shadow-2xl z-0 opacity-80"></motion.div>
                            <motion.div initial={{ y: 100, rotate: -6 }} whileInView={{ y: 0, rotate: -6 }} className="absolute left-[140px] top-10 w-[260px] bg-white border-[8px] border-gray-200 rounded-[2.5rem] h-[520px] shadow-2xl z-10 overflow-hidden"><BookingScreen /></motion.div>
                            <motion.div initial={{ y: 150, rotate: 6 }} whileInView={{ y: 0, rotate: 6 }} className="absolute left-[300px] top-20 w-[260px] bg-white border-[8px] border-gray-200 rounded-[2.5rem] h-[520px] shadow-2xl z-20 overflow-hidden"><MapScreen /></motion.div>
                        </div>
                    </div>
                </section>

                {/* --- Testimonials --- */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.3em] mb-16 text-center relative inline-block">
                            What people say About Us
                            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-gray-200 rounded-full"></span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { name: "Oguz Yagiz", text: "The best taxi solution layout I have ever seen. Seamless integration.", img: "https://i.pravatar.cc/150?u=1" },
                                { name: "Rizwan Gus", text: "Fastest deployment time. My business went live in 2 days.", img: "https://i.pravatar.cc/150?u=2" },
                                { name: "Marta K.", text: "Support is amazing. They customized the app exactly how I wanted.", img: "https://i.pravatar.cc/150?u=3" }
                            ].map((u, i) => (
                                <div key={i} className="p-10 bg-white border border-gray-100 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.05)] rounded-[2.5rem] flex flex-col items-center hover:-translate-y-2 transition-transform duration-300">
                                    <img src={u.img} alt={u.name} className="w-20 h-20 rounded-full mb-6 object-cover ring-4 ring-gray-50" />
                                    <h4 className="font-black text-xl text-gray-900 mb-2">{u.name}</h4>
                                    <p className="text-gray-500 text-base leading-relaxed italic">"{u.text}"</p>
                                    <div className="flex text-yellow-400 text-lg mt-6 gap-1">
                                        <span className="material-symbols-outlined fill-current">star</span>
                                        <span className="material-symbols-outlined fill-current">star</span>
                                        <span className="material-symbols-outlined fill-current">star</span>
                                        <span className="material-symbols-outlined fill-current">star</span>
                                        <span className="material-symbols-outlined fill-current">star</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <ContactUs isHomePage={true} />
                <Footer />
            </div>
        </ScrollWrapper>
    );
};

export default TaxiProductShowcase;
