import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

// Importing specific product logos
import ecommerceLogo from '../assets/logos/AppzetoEcommerce.jpg';
import foodLogo from '../assets/logos/AppzetoFood.jpg';
import multiVendorLogo from '../assets/logos/AppzetoMultiVendor.jpg';
import quickCommerceLogo from '../assets/logos/AppzetoQuickCommerce.jpg';
import taxiLogo from '../assets/logos/AppzetoTaxi.jpg';

const projects = [

    {
        id: "food",
        title: "Appzeto Food",
        description: "AI-powered food delivery.",
        image: foodLogo,
        color: "#FF0844",
        link: "/appzeto-food"
    },
    {
        id: "multivendor",
        title: "Appzeto Multi Vendor",
        description: "Marketplace platform.",
        image: multiVendorLogo,
        color: "#8B5CF6",
        link: "/appzeto-multivendor"
    },
    {
        id: "quick-commerce",
        title: "Appzeto Quick Ecommerce",
        description: "Hyper-local delivery.",
        image: quickCommerceLogo,
        color: "#F59E0B",
        link: "/appzeto-quick-commerce"
    },
    {
        id: "taxi",
        title: "Appzeto Taxi",
        description: "Smart logistics network.",
        image: taxiLogo,
        color: "#00F2FE",
        link: "/appzeto-taxi"
    }
];

const techStack = [
    { icon: "psychology", label: "AI & ML", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
    { icon: "code", label: "React Native", color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20" },
    { icon: "dns", label: "Node.js", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
    { icon: "database", label: "MongoDB", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
    { icon: "cloud", label: "AWS Cloud", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
    { icon: "api", label: "REST API", color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20" }
];

const RevolvingOrbit = ({ size = "md" }) => {
    const [hoveredProduct, setHoveredProduct] = useState(null);

    const sizeClasses = {
        sm: "w-[280px] h-[280px]",
        md: "w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px]",
        lg: "w-full aspect-square max-w-2xl"
    };

    return (
        <div className={`relative flex items-center justify-center z-10 ${sizeClasses[size]}`}>

            {/* 1. OUTER DECORATIVE CIRCLE */}
            <div className="absolute inset-0 rounded-full border border-white/5 pointer-events-none scale-110" />

            {/* 2. MAIN SYSTEM (Rotating Container) */}
            <style>
                {`
                    @keyframes orbit {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                    @keyframes orbit-reverse {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(-360deg); }
                    }
                    .animate-orbit {
                        animation: orbit 40s linear infinite;
                    }
                    .animate-orbit-reverse {
                        animation: orbit-reverse 40s linear infinite;
                    }
                    .paused {
                        animation-play-state: paused;
                    }
                `}
            </style>
            <div
                className={`absolute w-[95%] h-[95%] md:w-[80%] md:h-[80%] z-10 animate-orbit ${hoveredProduct ? 'paused' : ''}`}
            >
                {/* CIRCULAR TRACK PATH - OUTER */}
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
                    <circle
                        cx="50" cy="50" r="50"
                        fill="none"
                        stroke="rgba(5, 164, 167, 0.2)"
                        strokeWidth="0.5"
                    />
                    <circle
                        cx="50" cy="50" r="50"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.2)"
                        strokeWidth="0.2"
                        strokeDasharray="4, 4"
                    />
                </svg>

                {/* PRODUCT NODES */}
                {projects.map((product, index) => {
                    const angle = (index / projects.length) * 360;
                    return (
                        <div
                            key={product.id}
                            className="absolute"
                            style={{
                                top: `${50 + 50 * Math.sin((angle * Math.PI) / 180)}%`,
                                left: `${50 + 50 * Math.cos((angle * Math.PI) / 180)}%`,
                                transform: 'translate(-50%, -50%)'
                            }}
                        >
                            <div
                                className={`relative group flex flex-col items-center animate-orbit-reverse ${hoveredProduct ? 'paused' : ''}`}
                                onMouseEnter={() => setHoveredProduct(product)}
                                onMouseLeave={() => setHoveredProduct(null)}
                            >
                                <Link to={product.link} className="flex flex-col items-center">
                                    {/* CIRCULAR TOKEN CONTAINER */}
                                    <div className={`
                                        w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-transparent 
                                        flex items-center justify-center relative z-20 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden bg-white
                                        ${hoveredProduct?.id === product.id ? 'scale-125 shadow-[0_0_25px_rgba(5,164,167,0.4)]' : 'hover:scale-110'}
                                    `}>
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="mt-3 text-center pointer-events-none">
                                        <p className={`
                                            text-[7px] sm:text-[9px] font-bold uppercase tracking-wider transition-all duration-300
                                            bg-black/80 px-2 py-0.5 rounded-full border border-white/10
                                            ${hoveredProduct?.id === product.id ? 'text-primary border-primary/40' : 'text-gray-400 opacity-0 group-hover:opacity-100'}
                                        `}>
                                            {product.title}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 3. INNER CORE AREA (Tech Icons + Pulse) */}
            <div className="absolute w-[55%] h-[55%] md:w-[40%] md:h-[40%] pointer-events-auto">
                <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{ rotate: -180 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                >
                    {/* Inner track line - UPDATED to be solid like the outer one */}
                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible opacity-60">
                        <circle
                            cx="50" cy="50" r="50"
                            fill="none"
                            stroke="rgba(5, 164, 167, 0.2)"
                            strokeWidth="0.5"
                        />
                        <circle
                            cx="50" cy="50" r="50"
                            fill="none"
                            stroke="white"
                            strokeWidth="0.2"
                            strokeDasharray="0"
                        />
                    </svg>

                    {techStack.map((tech, index) => {
                        const angle = (index / techStack.length) * 360;
                        return (
                            <div
                                key={index}
                                className="absolute"
                                style={{
                                    top: `${50 + 50 * Math.sin((angle * Math.PI) / 180)}%`,
                                    left: `${50 + 50 * Math.cos((angle * Math.PI) / 180)}%`,
                                    transform: 'translate(-50%, -50%)'
                                }}
                            >
                                {/* Floating Tech Bubble */}
                                <motion.div
                                    className="relative group cursor-pointer"
                                    animate={{ rotate: 180 }}
                                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                                >
                                    <div className={`
                                        w-6 h-6 sm:w-8 sm:h-8 rounded-full backdrop-blur-md flex items-center justify-center
                                        border transition-all duration-300 shadow-lg hover:scale-125
                                        ${tech.bg} ${tech.border}
                                    `}>
                                        <span className={`material-symbols-outlined text-[8px] sm:text-xs font-bold ${tech.color}`}>
                                            {tech.icon}
                                        </span>
                                    </div>

                                    {/* Tech Label Tooltip */}
                                    <div className={`
                                        absolute -bottom-5 left-1/2 -translate-x-1/2 
                                        px-1.5 py-0.5 rounded-full bg-slate-900/90 border border-white/10
                                        opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
                                        whitespace-nowrap z-20
                                    `}>
                                        <span className={`text-[6px] sm:text-[8px] font-bold uppercase tracking-wide ${tech.color}`}>
                                            {tech.label}
                                        </span>
                                    </div>
                                </motion.div>
                            </div>
                        );
                    })}
                </motion.div>
            </div>

            {/* 4. CENTRAL LOGO CORE */}
            <div className="relative z-30 w-20 h-20 sm:w-32 sm:h-32 md:w-44 md:h-44 rounded-full bg-black shadow-[0_0_60px_-10px_rgba(5,164,167,0.4)] flex items-center justify-center border border-white/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent opacity-50" />
                <motion.div
                    initial={{ scale: 0.9, opacity: 0.8 }}
                    animate={{ scale: 1.1, opacity: 1 }}
                    transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
                    className="absolute inset-0 bg-[radial-gradient(circle,rgba(5,164,167,0.1)_0%,transparent_70%)]"
                />
                <motion.div
                    animate={{ rotateY: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    className="relative z-10 flex items-center justify-center"
                >
                    <img src={logo} alt="Appzeto" className="w-12 sm:w-20 md:w-28 brightness-125 drop-shadow-[0_0_15px_rgba(5,164,167,0.5)]" />
                </motion.div>
            </div>

            {/* BACKGROUND DECORATIVE GLOW */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(5,164,167,0.05)_0%,transparent_70%)] pointer-events-none" />
        </div>
    );
};

export default RevolvingOrbit;
