import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

// --- Reused Mock UI Components for Previews ---

const TaxiAppUI = () => (
    <div className="w-full h-full bg-gray-100 relative overflow-hidden flex flex-col font-sans text-[8px] sm:text-[10px]">
        <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop")' }}></div>
        <div className="mt-auto bg-white rounded-t-xl shadow-2xl z-10 relative h-[70%] flex flex-col p-2">
            <div className="w-8 h-1 bg-gray-300 rounded-full mx-auto mb-2 flex-shrink-0"></div>
            <p className="font-bold text-gray-800 mb-1">Where to?</p>
            <div className="space-y-1">
                <div className="flex items-center gap-2 p-1 bg-gray-50 rounded border border-gray-100">
                    <span className="material-symbols-outlined text-xs text-gray-600">work</span>
                    <div><p className="font-bold">Office</p></div>
                </div>
                <div className="flex items-center gap-2 p-1 bg-gray-50 rounded border border-gray-100">
                    <span className="material-symbols-outlined text-xs text-gray-600">home</span>
                    <div><p className="font-bold">Home</p></div>
                </div>
            </div>
        </div>
    </div>
);

const FoodAppUI = () => (
    <div className="w-full h-full bg-white flex flex-col font-sans overflow-hidden text-[8px] sm:text-[10px]">
        <div className="p-2 pt-4 bg-white sticky top-0 z-20 shadow-sm">
            <p className="text-[#05A4A7] font-black">Home • 12th St</p>
        </div>
        <div className="p-2 grid grid-cols-2 gap-2">
            {[1, 2].map((i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
                    <img src={`https://source.unsplash.com/random/200x200?food,${i}`} alt="Food" className="w-full h-full object-cover" />
                </div>
            ))}
        </div>
    </div>
);

const EcommerceUI = () => (
    <div className="w-full h-full bg-white flex flex-col font-sans overflow-hidden text-[8px] sm:text-[10px]">
        <div className="p-2 pt-4 flex justify-between items-center bg-white z-20">
            <span className="font-black text-gray-900">SHOP</span>
            <span className="material-symbols-outlined text-xs">shopping_bag</span>
        </div>
        <div className="p-2 grid grid-cols-2 gap-2">
            <div className="col-span-2 aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30" className="w-full h-full object-cover" alt="Watch" />
            </div>
        </div>
    </div>
);

const HospitalUI = () => (
    <div className="w-full h-full bg-[#f0f9ff] flex flex-col font-sans overflow-hidden text-[8px] sm:text-[10px]">
        <div className="p-2 pt-4 bg-blue-600 text-white rounded-b-xl mb-2">
            <p className="font-bold">Dr. Sarah</p>
            <p className="text-[8px] opacity-80">Cardiologist</p>
        </div>
        <div className="px-2 space-y-1">
            <div className="bg-white p-2 rounded-lg shadow-sm flex justify-between">
                <span>Patients</span>
                <span className="font-bold text-blue-600">12</span>
            </div>
            <div className="bg-white p-2 rounded-lg shadow-sm flex justify-between">
                <span>Surgery</span>
                <span className="font-bold text-blue-600">2</span>
            </div>
        </div>
    </div>
);

// --- Data ---
const projects = [
    {
        id: "food",
        title: "Appzeto Food",
        slug: "appzeto-food",
        subtitle: "Delivered Hot",
        description: "AI-powered food delivery with predictive ordering.",
        icon: "restaurant",
        color: "#FF0844",
        link: "/appzeto-food",
        UI: FoodAppUI
    },
    {
        id: "shop",
        title: "Appzeto Shop",
        slug: "appzeto-pay",
        subtitle: "Future Commerce",
        description: "AR-enabled shopping experience.",
        icon: "shopping_bag",
        color: "#4F46E5",
        link: "/appzeto-ecommerce",
        UI: EcommerceUI
    },
    {
        id: "care",
        title: "Appzeto Health",
        slug: "appzeto-health",
        subtitle: "Smart Health",
        description: "Telemedicine & comprehensive hospital management.",
        icon: "local_hospital",
        color: "#0EA5E9",
        link: "/appzeto-hospital",
        UI: HospitalUI
    },
    {
        id: "go",
        title: "Appzeto Go",
        slug: "appzeto-go",
        subtitle: "Mobility",
        description: "Smart logistics and ride-sharing network.",
        icon: "local_taxi",
        color: "#00F2FE",
        link: "/appzeto-taxi",
        UI: TaxiAppUI
    }
];

const Projects = () => {
    const [hoveredProject, setHoveredProject] = useState(null);

    return (
        <section className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex flex-col items-center justify-center py-20 font-sans">

            {/* --- Background Elements --- */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] opacity-40" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] opacity-40" />
            </div>

            {/* --- Header Content --- */}
            <div className="text-center z-10 mb-12 sm:mb-20 px-4 mt-10 md:mt-0">
                <div className="inline-block px-4 py-1.5 rounded-full bg-teal-900/30 border border-teal-500/30 text-teal-400 text-xs font-bold tracking-wider uppercase mb-6">
                    The Ecosystem
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
                    Everything connected.
                    <br />
                    <span className="text-[#05A4A7]">One powerful core.</span>
                </h2>
                <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                    Explore our integrated suite of tools designed to work in perfect harmony.
                    Hover over the nodes to discover the power of the Appzeto engine.
                </p>
            </div>

            {/* --- Orbit System Container --- */}
            <div className="relative w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px] flex items-center justify-center z-10 scale-90 sm:scale-100">

                {/* 1. Outer Static Ring (Decoration) */}
                <div className="absolute inset-0 rounded-full border border-dashed border-white/10" />

                {/* 2. Middle Rotating Ring (The Orbit) */}
                <motion.div
                    className="absolute w-[80%] h-[80%] rounded-full border border-white/5"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        animationPlayState: hoveredProject ? "paused" : "running"
                    }}
                >
                </motion.div>

                <motion.div
                    className="absolute w-[70%] h-[70%] sm:w-[75%] sm:h-[75%] rounded-full border-[1.5px] border-white/10 shadow-[0_0_50px_-10px_rgba(255,255,255,0.05)]"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    style={{ animationPlayState: hoveredProject ? "paused" : "running" }}
                >
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className="absolute"
                            style={{
                                top: index === 0 ? '0%' : index === 1 ? '50%' : index === 2 ? '100%' : '50%',
                                left: index === 0 ? '50%' : index === 1 ? '100%' : index === 2 ? '50%' : '0%',
                                transform: 'translate(-50%, -50%)'
                            }}
                        >
                            {/* Counter-Rotating Node to keep content upright */}
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                style={{ animationPlayState: hoveredProject ? "paused" : "running" }}
                                className="relative group cursor-pointer"
                                onMouseEnter={() => setHoveredProject(project)}
                                onMouseLeave={() => setHoveredProject(null)}
                            >
                                {/* Wrapper for Icon + Text to ensure they move together */}
                                <Link to={project.link} className="flex flex-col items-center gap-3">
                                    {/* Icon Circle */}
                                    <div className={`
                                        w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-[#111] shadow-2xl border border-white/10 
                                        flex items-center justify-center transition-all duration-300 relative z-20 overflow-hidden
                                        ${hoveredProject?.id === project.id ? 'scale-110 border-teal-500 ring-4 ring-teal-500/20' : 'hover:scale-105 group-hover:border-white/30'}
                                    `}>
                                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <span
                                            className="material-symbols-outlined text-2xl sm:text-3xl transition-colors duration-300 relative z-10"
                                            style={{ color: hoveredProject?.id === project.id ? '#05A4A7' : project.color }}
                                        >
                                            {project.icon}
                                        </span>
                                    </div>

                                    {/* Name Label (Below Icon) */}
                                    <div className={`
                                        bg-[#111]/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-lg
                                        transition-all duration-300
                                        ${hoveredProject?.id === project.id ? 'opacity-100 translate-y-0 border-teal-500/50' : 'opacity-70 group-hover:opacity-100'}
                                    `}>
                                        <p className="text-[10px] sm:text-xs font-bold text-gray-200 whitespace-nowrap">{project.title}</p>
                                    </div>
                                </Link>

                                {/* Floating Detail Card (Visible on Hover) */}
                                <AnimatePresence>
                                    {hoveredProject?.id === project.id && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.8, y: 10 }}
                                            transition={{ duration: 0.2 }}
                                            className={`
                                                absolute z-50 w-52 sm:w-72 bg-[#1a1a1a] rounded-2xl shadow-2xl border border-white/10 p-4 overflow-hidden pointer-events-none
                                                ${index === 0 ? 'bottom-full left-1/2 -translate-x-1/2 mb-4 origin-bottom' : ''}
                                                ${index === 1 ? 'left-full top-1/2 -translate-y-1/2 ml-6 origin-left' : ''}
                                                ${index === 2 ? 'top-full left-1/2 -translate-x-1/2 mt-4 origin-top' : ''}
                                                ${index === 3 ? 'right-full top-1/2 -translate-y-1/2 mr-6 origin-right' : ''}
                                            `}
                                        >
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="p-1.5 rounded-full bg-white/5 border border-white/10">
                                                    <img src={logo} alt="" className="w-4 h-4 opacity-80" />
                                                </div>
                                                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{project.subtitle}</span>
                                            </div>

                                            {/* Mini UI Preview */}
                                            <div className="w-full h-28 sm:h-36 bg-gray-900 rounded-xl overflow-hidden mb-4 border border-white/5 relative group-hover:border-white/10 transition-colors">
                                                <project.UI />
                                            </div>

                                            <h4 className="font-black text-white text-lg leading-tight">{project.title}</h4>
                                            <p className="text-xs text-gray-400 font-medium leading-relaxed mt-2 line-clamp-2">{project.description}</p>

                                            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                                                <span className="text-[10px] font-bold text-gray-500">Tap to view case study</span>
                                                <div className="w-6 h-6 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400">
                                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    ))}
                </motion.div>

                {/* 3. Inner Pulse Ring */}
                <div className="absolute w-[40%] h-[40%] rounded-full border border-teal-500/20 bg-teal-500/5 animate-pulse" />

                {/* 4. Central Core (Static) */}
                <div className="relative z-20 w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full bg-[#111] shadow-[0_0_50px_-10px_rgba(5,164,167,0.2)] flex flex-col items-center justify-center border border-white/10">
                    {/* Glassmorphic overlay */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/5 to-transparent opacity-100" />

                    <img src={logo} alt="Appzeto Core" className="w-14 sm:w-16 md:w-20 relative z-10 drop-shadow-2xl brightness-125" />
                    <span className="relative z-10 text-[9px] sm:text-[10px] font-black tracking-[0.25em] text-gray-500 mt-3">CORE</span>
                </div>

            </div>

            {/* --- Mobile View Indicator --- */}
            <div className="absolute bottom-10 md:hidden text-center w-full px-10">
                <p className="text-xs text-gray-600 font-bold uppercase tracking-widest animate-pulse">Explore the Ecosystem</p>
            </div>

        </section>

    );
};

export default Projects;
