
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Mock UI Components for "Homepages" ---

const TaxiAppUI = () => (
    <div className="w-full h-full bg-gray-100 relative overflow-hidden flex flex-col font-sans">
        <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop")' }}></div>
        <div className="absolute top-0 w-full p-4 pt-12 flex justify-between items-center z-10 pointer-events-none">
            <div className="bg-white/90 p-2 rounded-full shadow-md pointer-events-auto"><span className="material-symbols-outlined text-gray-800">menu</span></div>
            <div className="bg-white/90 px-4 py-2 rounded-full shadow-md font-bold text-gray-800 text-sm pointer-events-auto">Offline</div>
        </div>
        <div className="mt-auto bg-white rounded-t-3xl shadow-2xl z-10 relative h-[60%] flex flex-col">
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-4 mb-2 flex-shrink-0"></div>
            <div className="flex-1 overflow-y-auto px-6 pb-20 no-scrollbar">
                <h3 className="text-xl font-bold text-gray-800 mb-4 sticky top-0 bg-white py-2">Where to?</h3>
                <div className="flex flex-col gap-3 mb-6">
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors">
                        <div className="p-2 bg-gray-200 rounded-full"><span className="material-symbols-outlined text-gray-600">work</span></div>
                        <div>
                            <p className="font-bold text-gray-800 text-sm">Office</p>
                            <p className="text-gray-500 text-xs">24, Tech Park, Sector 5</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors">
                        <div className="p-2 bg-gray-200 rounded-full"><span className="material-symbols-outlined text-gray-600">home</span></div>
                        <div>
                            <p className="font-bold text-gray-800 text-sm">Home</p>
                            <p className="text-gray-500 text-xs">102, Green Valley</p>
                        </div>
                    </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3 sticky top-10 bg-white py-2 z-10">Ride Options</h3>
                <div className="h-[200px] overflow-hidden relative">
                    <div className="animate-scroll-vertical">
                        {[
                            { type: 'Economy', price: '$12.50', time: '3 min', icon: 'local_taxi' },
                            { type: 'Premium', price: '$24.00', time: '5 min', icon: 'directions_car' },
                            { type: 'Electric', price: '$14.20', time: '4 min', icon: 'electric_car' },
                            { type: 'Van', price: '$32.00', time: '8 min', icon: 'airport_shuttle' },
                            { type: 'Bike', price: '$8.50', time: '2 min', icon: 'two_wheeler' },
                            { type: 'Economy', price: '$12.50', time: '3 min', icon: 'local_taxi' },
                        ].map((ride, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-primary/50 cursor-pointer mb-3">
                                <div className="flex items-center gap-4">
                                    <span className="material-symbols-outlined text-3xl text-gray-700">{ride.icon}</span>
                                    <div>
                                        <p className="font-bold text-gray-800">{ride.type}</p>
                                        <p className="text-xs text-gray-500">{ride.time} away</p>
                                    </div>
                                </div>
                                <span className="font-bold text-gray-900">{ride.price}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const FoodAppUI = () => (
    <div className="w-full h-full bg-white flex flex-col font-sans overflow-hidden">
        <div className="p-6 pt-12 bg-white sticky top-0 z-20">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Delivering to</p>
            <div className="flex items-center gap-1 text-[#05A4A7]">
                <span className="text-lg font-black text-gray-800">Home • 12th Street</span>
                <span className="material-symbols-outlined text-sm">expand_more</span>
            </div>
            <div className="mt-4 flex items-center gap-2 bg-gray-100 p-3 rounded-xl text-gray-400">
                <span className="material-symbols-outlined">search</span>
                <span className="text-sm font-medium">Pizza, Burger, Sushi...</span>
            </div>
        </div>
        <div className="flex-1 overflow-hidden px-6 pb-20 relative">
            <div className="animate-scroll-vertical">
                <div className="pb-8">
                    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
                        {['Pizza', 'Burger', 'Asian', 'Vegan'].map((cat, i) => (
                            <div key={i} className="px-4 py-2 bg-gray-100 rounded-full text-xs font-bold text-gray-600 whitespace-nowrap">{cat}</div>
                        ))}
                    </div>
                    <h3 className="text-lg font-black text-gray-800 mt-6 mb-4">Popular near you</h3>
                    <div className="flex flex-col gap-6">
                        {[
                            { name: 'Pizza Hub', rating: '4.8', time: '20-30 min', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop' },
                            { name: 'Burger King', rating: '4.5', time: '15-25 min', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop' },
                        ].map((shop, i) => (
                            <div key={i} className="flex flex-col gap-2">
                                <div className="w-full aspect-video rounded-2xl bg-gray-200 overflow-hidden relative">
                                    <img src={shop.img} alt={shop.name} className="w-full h-full object-cover" />
                                    <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg text-[10px] font-black shadow-sm">
                                        ★ {shop.rating}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-gray-800">{shop.name}</span>
                                    <span className="text-[10px] text-gray-500 font-bold">{shop.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const EcommerceUI = () => (
    <div className="w-full h-full bg-white flex flex-col font-sans overflow-hidden">
        <div className="p-6 pt-12 flex justify-between items-center bg-white z-20 sticky top-0">
            <span className="material-symbols-outlined text-gray-800">menu</span>
            <h3 className="text-lg font-black text-gray-900 tracking-tighter">SHOP</h3>
            <span className="material-symbols-outlined text-gray-800">shopping_bag</span>
        </div>
        <div className="flex-1 overflow-hidden px-6 pb-20">
            <div className="animate-scroll-vertical">
                <div className="py-2 space-y-6">
                    <div className="relative aspect-[4/3] bg-gray-100 rounded-[2rem] overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Product" />
                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl">
                            <p className="font-bold text-xs">Elegant Watch</p>
                            <p className="font-black text-sm">$129.00</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { name: 'Nike Air', price: '$99', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop' },
                            { name: 'Headphones', price: '$199', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop' }
                        ].map((item, i) => (
                            <div key={i} className="space-y-2">
                                <div className="aspect-square bg-gray-100 rounded-[1.5rem] overflow-hidden">
                                    <img src={item.img} className="w-full h-full object-cover" alt={item.name} />
                                </div>
                                <div>
                                    <p className="font-bold text-xs text-gray-800">{item.name}</p>
                                    <p className="font-black text-xs text-gray-500">{item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const HospitalUI = () => (
    <div className="w-full h-full bg-[#f0f9ff] flex flex-col font-sans overflow-hidden">
        <div className="p-6 pt-12 flex justify-between items-center bg-[#f0f9ff] z-20">
            <div>
                <p className="text-xs text-blue-500 font-bold uppercase">Good Morning</p>
                <h3 className="text-xl font-black text-gray-900">Dr. Sarah</h3>
            </div>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-500 shadow-sm">
                <span className="material-symbols-outlined">calendar_month</span>
            </div>
        </div>
        <div className="flex-1 overflow-hidden px-6 pb-20">
            <div className="animate-scroll-vertical">
                <div className="py-2 space-y-4">
                    <div className="bg-blue-600 text-white p-5 rounded-[2rem] flex justify-between items-center">
                        <div>
                            <p className="text-blue-100 text-xs font-bold mb-1">Appointments</p>
                            <h4 className="text-2xl font-black">12</h4>
                            <p className="text-[10px] text-blue-200 mt-1">4 Pending</p>
                        </div>
                        <span className="material-symbols-outlined text-4xl opacity-50">groups</span>
                    </div>
                    <h4 className="font-black text-gray-900 mt-4">Upcoming Patients</h4>
                    {[
                        { name: 'Alex M.', time: '10:00 AM', type: 'Checkup', bg: 'bg-white' },
                        { name: 'Sam K.', time: '11:30 AM', type: 'Surgery', bg: 'bg-white' },
                        { name: 'John D.', time: '02:00 PM', type: 'Consultation', bg: 'bg-white' },
                        { name: 'Alex M.', time: '10:00 AM', type: 'Checkup', bg: 'bg-white' },
                    ].map((p, i) => (
                        <div key={i} className={`p-4 rounded-2xl ${p.bg} flex items-center justify-between shadow-sm`}>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                                    {p.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800 text-sm">{p.name}</p>
                                    <p className="text-[10px] text-gray-500 font-medium">{p.type}</p>
                                </div>
                            </div>
                            <span className="text-xs font-black text-gray-900 bg-gray-50 px-2 py-1 rounded-lg">{p.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

// --- Main Components ---

const projects = [
    {
        title: "Appzeto Food • Next-Gen Gastronomy",
        description: "Intelligent food discovery app using predictive analytics to suggest meals based on dietary habits and history.",
        tags: ["Flutter", "TensorFlow", "PostgreSQL"],
        UI: FoodAppUI,
        bgColor: "#FF0844", // Vivid Rose
        textColor: "#300811",
        btnColor: "#300811",
        btnText: "#FF0844",
        link: "/appzeto-food"
    },
    {
        title: "Appzeto Shop • Future of Commerce",
        description: "Immersive e-commerce experience with AR try-ons, AI styling assistants, and seamless one-tap checkout.",
        tags: ["React Native", "ARKit", "Stripe"],
        UI: EcommerceUI,
        bgColor: "#4F46E5", // Indigo
        textColor: "#FFFFFF",
        btnColor: "#FFFFFF",
        btnText: "#4F46E5",
        link: "/appzeto-ecommerce"
    },
    {
        title: "Appzeto Care • Smart Healthcare",
        description: "Comprehensive hospital management ecosystem for doctors, patients, and administrators with real-time monitoring.",
        tags: ["Next.js", "FHIR", "WebRTC"],
        UI: HospitalUI,
        bgColor: "#0EA5E9", // Sky Blue
        textColor: "#082F49",
        btnColor: "#082F49",
        btnText: "#0EA5E9",
        link: "/appzeto-hospital"
    },
    {
        title: "Appzeto Go • Logistics Reimagined",
        description: "A complete mobility solution with real-time tracking, multi-modal transport, and peak-hour load balancing.",
        tags: ["React Native", "Google Maps SDK", "Node.js"],
        UI: TaxiAppUI,
        bgColor: "#00F2FE", // Electric Cyan
        textColor: "#082F30",
        btnColor: "#082F30",
        btnText: "#00F2FE",
        link: "/appzeto-taxi"
    }
];

const Projects = () => {
    const [activeProject, setActiveProject] = useState(0);
    const containerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: `+=${projects.length * 80}%`,
                pin: true,
                scrub: 1.5, // Even slower, lazier catch-up for maximum premium feel
                onUpdate: (self) => {
                    const progress = self.progress;
                    const totalProjects = projects.length;
                    let newIndex = Math.floor(progress * totalProjects);
                    if (newIndex >= totalProjects) newIndex = totalProjects - 1;

                    if (newIndex !== activeProject) {
                        setActiveProject(newIndex);
                    }
                },
            });
        });

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <motion.div
            ref={containerRef}
            animate={{ backgroundColor: projects[activeProject].bgColor }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full font-display overflow-hidden antialiased"
        >
            <div className="relative w-full h-screen flex flex-col items-center justify-center">
                <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 h-full py-4 relative z-10">
                    <div className="w-full lg:w-1/2 flex flex-col justify-center h-full gap-8 order-2 lg:order-1 relative z-20 items-start text-left">
                        <div className="mb-2">
                            <motion.h1
                                animate={{ color: projects[activeProject].textColor }}
                                className="text-sm md:text-base font-black tracking-[0.3em] uppercase opacity-60"
                            >
                                Case Studies
                            </motion.h1>
                        </div>

                        <div className="relative w-full min-h-[400px] flex items-center mb-8">
                            <AnimatePresence>
                                <motion.div
                                    key={activeProject}
                                    initial={{ opacity: 0, x: -200, pointerEvents: 'none', zIndex: 0 }}
                                    animate={{ opacity: 1, x: 0, pointerEvents: 'auto', zIndex: 10 }}
                                    exit={{ opacity: 0, x: 200, pointerEvents: 'none', zIndex: 0 }}
                                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                                    className="flex flex-col gap-6 items-start absolute inset-0 py-4 text-left"
                                >
                                    <div className="flex flex-wrap gap-2 justify-start">
                                        {projects[activeProject].tags.map((tag, i) => (
                                            <span key={i} className="px-3 py-1 bg-black/5 rounded-full text-black/60 text-xs md:text-sm font-bold border border-black/10">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <motion.h2
                                        animate={{ color: projects[activeProject].textColor }}
                                        className="text-3xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tighter"
                                    >
                                        {projects[activeProject].title.split(' • ')[0]}<br />
                                        <span className="opacity-70">{projects[activeProject].title.split(' • ')[1]}</span>
                                    </motion.h2>
                                    <motion.p
                                        animate={{ color: projects[activeProject].textColor }}
                                        className="text-base md:text-lg opacity-80 leading-relaxed max-w-xl font-medium"
                                    >
                                        {projects[activeProject].description}
                                    </motion.p>
                                    <div className="pt-6">
                                        <motion.button
                                            onClick={() => navigate(projects[activeProject].link)}
                                            animate={{
                                                backgroundColor: projects[activeProject].btnColor,
                                                color: projects[activeProject].btnText
                                            }}
                                            className="flex items-center gap-3 px-10 py-4 rounded-full font-black text-lg shadow-2xl transition-all duration-300 group"
                                        >
                                            Checkout Case Study
                                            <span className="material-symbols-outlined text-2xl transition-transform group-hover:translate-x-1">north_east</span>
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="flex items-center gap-4 relative z-30">
                            {projects.map((_, idx) => (
                                <motion.button
                                    key={idx}
                                    animate={{ backgroundColor: idx === activeProject ? projects[activeProject].textColor : projects[activeProject].textColor + '20' }}
                                    className={`h-1.5 rounded-full transition-all duration-500 ease-out ${idx === activeProject ? 'w-12' : 'w-2'}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 flex justify-center items-center h-full order-1 lg:order-2 py-[2vh] lg:py-[5vh]">
                        <div className="relative h-[75vh] w-auto aspect-[1/2] max-h-[800px] border-[10px] border-[#111] rounded-[3rem] overflow-hidden bg-black shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] ring-1 ring-white/10 z-10 transition-transform duration-1000">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[30%] h-[4%] bg-[#111] rounded-b-[1.5rem] z-40"></div>
                            <div className="relative w-full h-full bg-[#f8fafc]">
                                <AnimatePresence>
                                    <motion.div
                                        key={activeProject}
                                        initial={{ opacity: 0, scale: 0.94 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.06 }}
                                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                                        className="absolute inset-0 w-full h-full"
                                    >
                                        <div className="absolute top-0 w-full px-[8%] py-[4%] flex justify-between items-center z-50 text-[10px] font-bold pointer-events-none mix-blend-difference text-white">
                                            <span>9:41</span>
                                            <div className="flex gap-1.5">
                                                <span className="material-symbols-outlined text-[12px]">signal_cellular_alt</span>
                                                <span className="material-symbols-outlined text-[12px]">wifi</span>
                                                <span className="material-symbols-outlined text-[12px]">battery_full</span>
                                            </div>
                                        </div>
                                        {React.createElement(projects[activeProject].UI)}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                        <div className="absolute top-1/2 right-1/4 w-[60vh] h-[60vh] bg-white/20 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none z-0 mix-blend-overlay animate-pulse"></div>
                    </div>
                </div>

                <div className="absolute right-12 bottom-12 hidden xl:flex flex-col items-end gap-1 z-0">
                    {projects.map((_, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                            <motion.span
                                animate={{ color: projects[activeProject].textColor }}
                                className={`text-xs font-black tracking-widest transition-all duration-500 ${idx === activeProject ? 'opacity-100' : 'opacity-10'}`}
                            >
                                0{idx + 1}
                            </motion.span>
                            <motion.div
                                animate={{ backgroundColor: projects[activeProject].textColor }}
                                className={`h-[1px] transition-all duration-500 ${idx === activeProject ? 'w-8 opacity-100' : 'w-4 opacity-10'}`}
                            ></motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Projects;
