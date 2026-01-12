import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Importing specific product logos
import ecommerceLogo from '../assets/logos/Appzeto Ecommerce.jpg';
import foodLogo from '../assets/logos/Appzeto Food.jpg';
import multiVendorLogo from '../assets/logos/Appzeto Multi Vendor.jpg';
import quickCommerceLogo from '../assets/logos/Appzeto Quick Commerce.jpg';
import taxiLogo from '../assets/logos/Appzeto Taxi.jpg';

const products = [
    { id: "ecommerce", title: "Ecommerce", image: ecommerceLogo, link: "/appzeto-ecommerce" },
    { id: "food", title: "Food Delivery", image: foodLogo, link: "/appzeto-food" },
    { id: "multivendor", title: "Marketplace", image: multiVendorLogo, link: "/appzeto-ecommerce" },
    { id: "quick-commerce", title: "Quick Comm", image: quickCommerceLogo, link: "/appzeto-taxi" },
    { id: "taxi", title: "Taxi App", image: taxiLogo, link: "/appzeto-taxi" },
];

const techStack = [
    { icon: "psychology", label: "AI & ML", color: "text-purple-500", bg: "bg-purple-50" },
    { icon: "code", label: "React Native", color: "text-sky-500", bg: "bg-sky-50" },
    { icon: "dns", label: "Node.js", color: "text-green-500", bg: "bg-green-50" },
    { icon: "database", label: "MongoDB", color: "text-emerald-500", bg: "bg-emerald-50" },
    { icon: "cloud", label: "AWS Cloud", color: "text-orange-500", bg: "bg-orange-50" },
    { icon: "api", label: "REST API", color: "text-pink-500", bg: "bg-pink-50" }
];

const RevolvingOrbit = ({ size = "md" }) => {
    return (
        <div className="w-full max-w-xl mx-auto py-10">
            <div className="flex flex-col gap-6">

                {/* 1. PRODUCT LOGOS GRID */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link
                                to={product.link}
                                className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
                            >
                                <div className="w-10 h-10 rounded-xl overflow-hidden border border-gray-50 dark:border-slate-700 bg-white shadow-inner">
                                    <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                </div>
                                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{product.title}</span>
                            </Link>
                        </motion.div>
                    ))}

                    {/* Final "Our Portfolio" CTA style card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Link
                            to="/projects"
                            className="flex items-center justify-center p-3 bg-[#05A4A7] border border-[#05A4A7]/20 rounded-2xl shadow-lg hover:bg-[#037A7C] transition-all group h-full"
                        >
                            <span className="text-sm font-black text-white uppercase tracking-tight">All Projects</span>
                            <span className="material-symbols-outlined text-white ml-2 text-sm group-hover:translate-x-1 transition-transform">east</span>
                        </Link>
                    </motion.div>
                </div>

                {/* 2. TECH STACK LABELS (Horizontal Scroll / Wrap) */}
                <div className="flex flex-wrap gap-2 pt-4">
                    {techStack.map((tech, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 + (index * 0.05) }}
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-100 dark:border-slate-800 ${tech.bg} dark:bg-slate-800/50 backdrop-blur-sm`}
                        >
                            <span className={`material-symbols-outlined text-sm font-bold ${tech.color}`}>{tech.icon}</span>
                            <span className="text-[10px] sm:text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">{tech.label}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Optional: Subtle decorative backdrop to keep it "premium" */}
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle,rgba(5,164,167,0.03)_0%,transparent_70%)] pointer-events-none" />
            </div>
        </div>
    );
};

export default RevolvingOrbit;
