import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);
    const navigate = useNavigate();
    const [activeProject, setActiveProject] = useState(0);

    React.useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                const scrollDistance = window.innerWidth * (projects.length - 1);

                gsap.to(sectionRef.current, {
                    xPercent: -100 * (projects.length - 1) / projects.length,
                    ease: "none",
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        pin: true,
                        scrub: 1,
                        snap: {
                            snapTo: 1 / (projects.length - 1),
                            duration: { min: 0.1, max: 0.2 },
                            delay: 0,
                            ease: "power1.inOut"
                        },
                        end: () => `+=${scrollDistance}`,
                        onUpdate: (self) => {
                            const progress = self.progress;
                            const total = projects.length;
                            const idx = Math.round(progress * (total - 1));
                            setActiveProject(idx);
                        }
                    }
                });
            });
        });

        return () => ctx.revert();
    }, []);

    // Animation Variants
    const textVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const phoneVariants = {
        hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
        visible: {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            transition: { duration: 0.8, ease: "backOut" }
        }
    };

    return (
        <div className="relative w-full">
            {/* --- Desktop View (Pinned Scroll) --- */}
            <div ref={triggerRef} className="hidden md:block overflow-hidden bg-white">
                <div
                    ref={sectionRef}
                    className="flex h-screen w-[400vw] relative"
                >
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="w-screen h-screen flex flex-col md:flex-row items-center justify-center p-4 md:p-10 relative overflow-hidden"
                            style={{ backgroundColor: project.bgColor }}
                            data-cursor-text={index === 0 ? "Food" : index === 1 ? "Store" : index === 2 ? "Medical" : "Transport"}
                        >
                            {/* Background Decor */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vh] h-[120vh] bg-white/10 rounded-full blur-[100px] pointer-events-none" />

                            {/* Content Container */}
                            <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-20 z-10 h-full justify-center pt-10 md:pt-0">

                                {/* Text Content */}
                                <motion.div
                                    initial="hidden"
                                    animate={activeProject === index ? "visible" : "hidden"}
                                    variants={containerVariants}
                                    className="w-full md:w-1/2 text-left space-y-4 md:space-y-8 flex flex-col justify-center"
                                >
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag, i) => (
                                            <span key={i} className="px-2 py-1 md:px-3 md:py-1 bg-black/10 backdrop-blur-sm rounded-full text-[10px] md:text-xs font-bold border border-white/10" style={{ color: project.textColor }}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <motion.h2 variants={textVariants} className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight mt-2 md:mt-0" style={{ color: project.textColor }}>
                                        {project.title.split("•")[0]}
                                        <span className="block text-lg md:text-3xl opacity-80 font-bold mt-1 md:mt-2">{project.title.split("•")[1]}</span>
                                    </motion.h2>

                                    <motion.p variants={textVariants} className="text-sm sm:text-base md:text-xl font-medium opacity-90 max-w-xl leading-relaxed hidden sm:block" style={{ color: project.textColor }}>
                                        {project.description}
                                    </motion.p>

                                    <Link to={project.link}>
                                        <motion.div
                                            variants={textVariants}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-5 py-2 md:px-8 md:py-4 rounded-full font-bold shadow-lg flex items-center gap-2 group transition-all text-sm md:text-base w-fit cursor-pointer"
                                            style={{ backgroundColor: project.btnColor, color: project.btnText }}
                                        >
                                            View Case Study
                                            <span className="material-symbols-outlined text-sm md:text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                        </motion.div>
                                    </Link>
                                </motion.div>

                                {/* Phone UI Mockup */}
                                <div className="w-full md:w-1/2 flex justify-center perspective-1000 mt-4 md:mt-0">
                                    <motion.div
                                        initial="hidden"
                                        animate={activeProject === index ? "visible" : "hidden"}
                                        variants={phoneVariants}
                                        className="relative w-[220px] sm:w-[260px] md:w-[320px] aspect-[9/19] bg-black rounded-[2rem] md:rounded-[3rem] p-2 md:p-3 shadow-2xl border-[6px] md:border-[8px] border-black ring-1 ring-white/20"
                                    >
                                        <div className="w-full h-full bg-white rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden relative">
                                            {React.createElement(project.UI)}
                                            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 md:w-24 h-4 md:h-6 bg-black rounded-full z-50 pointer-events-none" />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none rounded-[2rem] md:rounded-[3rem]" />
                                    </motion.div>
                                </div>
                            </div>

                            {/* Page Number Indicator */}
                            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 text-6xl md:text-9xl font-black opacity-10 select-none pointer-events-none" style={{ color: project.textColor }}>
                                0{index + 1}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- Mobile View (Horizontal Scroll Carousel) --- */}
            <div className="block md:hidden bg-white py-8">
                <div className="px-4 mb-6">
                    <p className="text-[#cdbdae] font-medium tracking-widest uppercase mb-1 text-[10px]">Projects</p>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Our Creations</h2>
                </div>

                <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="w-[85vw] flex-shrink-0 snap-center mx-3 first:ml-4 last:mr-4 rounded-[2rem] overflow-hidden relative shadow-xl"
                            style={{ backgroundColor: project.bgColor }}
                        >
                            {/* Background Decor */}
                            <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-white/10 rounded-full blur-[60px] pointer-events-none" />

                            <div className="p-6 flex flex-col h-full">
                                <div className="space-y-4 flex-grow">
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.tags.slice(0, 2).map((tag, i) => (
                                            <span key={i} className="px-2 py-0.5 bg-black/10 backdrop-blur-sm rounded-full text-[8px] font-bold border border-white/10" style={{ color: project.textColor }}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <h2 className="text-xl font-black leading-tight tracking-tight" style={{ color: project.textColor }}>
                                        {project.title.split("•")[0]}
                                        <span className="block text-sm opacity-80 font-bold mt-0.5">{project.title.split("•")[1]}</span>
                                    </h2>

                                    <p className="text-[10px] font-medium opacity-90 leading-relaxed line-clamp-2" style={{ color: project.textColor }}>
                                        {project.description}
                                    </p>

                                    <Link to={project.link}>
                                        <div
                                            className="px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2 transition-all text-[10px] w-fit cursor-pointer"
                                            style={{ backgroundColor: project.btnColor, color: project.btnText }}
                                        >
                                            View Study
                                            <span className="material-symbols-outlined text-xs">arrow_forward</span>
                                        </div>
                                    </Link>
                                </div>

                                {/* Mobile Phone Mockup - Smaller for Carousel */}
                                <div className="flex justify-center mt-6">
                                    <div className="relative w-[140px] aspect-[9/19] bg-black rounded-[1.2rem] p-1 shadow-xl border-[3px] border-black ring-1 ring-white/10">
                                        <div className="w-full h-full bg-white rounded-[0.8rem] overflow-hidden relative">
                                            {React.createElement(project.UI)}
                                            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-black rounded-full z-50 pointer-events-none" />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none rounded-[1.2rem]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Scroll Indicator Dots */}
                <div className="flex justify-center gap-1.5 mt-2">
                    {projects.map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Projects;
