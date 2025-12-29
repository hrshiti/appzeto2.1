import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const products = [
    {
        category: "SaaS Platforms",
        title: "E-COMMERCE SUITE",
        description: "A comprehensive solution for scaling online businesses with advanced analytics and inventory management.",
        features: ["Secure Payments", "Inventory Sync", "AI Recommendations"],
        image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&auto=format&fit=crop&w=1064&q=80"
    },
    {
        category: "Mobile Solutions",
        title: "FOOD DELIVERY APP",
        description: "Complete white-label solution for food delivery services featuring real-time tracking and vendor portals.",
        features: ["Live Tracking", "Multi-Vendor", "Driver App"],
        image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=2071&auto=format&fit=crop"
    },
    {
        category: "Enterprise Tools",
        title: "ADMIN DASHBOARD",
        description: "Powerful administrative panels for managing users, content, and system metrics with granular control.",
        features: ["Role Management", "Real-time Metrics", "Custom Reports"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
    },
    {
        category: "AI Integrations",
        title: "PREDICTIVE ANALYTICS",
        description: "Harness the power of machine learning to forecast trends and optimize business operations.",
        features: ["Data Modeling", "Trend Forecasting", "Automated Insights"],
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop"
    }
];

const Products = () => {
    return (
        <div className="w-full bg-[#111] text-white py-20 px-4 md:px-0 overflow-hidden">
            <div className="max-w-[1700px] mx-auto">
                <div className="text-center mb-24 px-4">
                    <h2 className="text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Our Products</h2>
                    <h3 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none">
                        Digital Solutions
                    </h3>
                </div>

                <div className="w-full flex flex-col gap-0 border-t border-white/0">
                    {products.map((product, index) => (
                        <div key={index} className="grid grid-cols-1 lg:grid-cols-3 w-full group border-b border-white/0 min-h-screen">

                            {/* === COLUMN 1 === */}
                            <div className={`flex flex-col justify-center p-8 md:p-12 order-2 lg:order-none border-r border-white/0 ${index % 2 !== 0 ? 'lg:invisible lg:pointer-events-none hidden lg:flex' : ''}`}>
                                {/* Content for EVEN rows (0, 2...) goes here */}
                                {index % 2 === 0 && (
                                    <div className="space-y-6 text-left lg:text-right">
                                        <div className="space-y-2">
                                            <span className="text-xs font-bold text-red-500 border border-red-500/30 px-2 py-1 rounded inline-block">{product.category}</span>
                                            <h4 className="text-3xl md:text-5xl font-bold uppercase tracking-tight leading-[0.9]">{product.title}</h4>
                                        </div>
                                        <p className="text-gray-400 text-sm leading-relaxed ml-auto max-w-md">
                                            {product.description}
                                        </p>
                                        <ul className="flex flex-wrap gap-4 justify-start lg:justify-end pt-2">
                                            {product.features.map((feature, i) => (
                                                <li key={i} className="text-xs font-bold text-gray-500 flex items-center gap-1 uppercase">
                                                    {feature} <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                                </li>
                                            ))}
                                        </ul>
                                        <button className="text-sm font-bold uppercase tracking-wide border-b border-white pb-1 hover:text-red-500 hover:border-red-500 transition-colors inline-flex items-center gap-2">
                                            View Case Study <ArrowUpRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* === COLUMN 2 (IMAGE CENTER) === */}
                            <div className="h-[400px] lg:h-auto border-r border-white/0 order-1 lg:order-none flex items-center justify-center p-8">
                                <div className="relative w-full max-w-[500px] h-[50vh] overflow-hidden group shadow-2xl">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[50%] group-hover:grayscale-0"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                                </div>
                            </div>

                            {/* === COLUMN 3 === */}
                            <div className={`flex flex-col justify-center p-8 md:p-12 order-3 lg:order-none ${index % 2 === 0 ? 'lg:invisible lg:pointer-events-none hidden lg:flex' : ''}`}>
                                {/* Content for ODD rows (1, 3...) goes here */}
                                {index % 2 !== 0 && (
                                    <div className="space-y-6 text-left">
                                        <div className="space-y-2">
                                            <span className="text-xs font-bold text-red-500 border border-red-500/30 px-2 py-1 rounded inline-block">{product.category}</span>
                                            <h4 className="text-3xl md:text-5xl font-bold uppercase tracking-tight leading-[0.9]">{product.title}</h4>
                                        </div>
                                        <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                                            {product.description}
                                        </p>
                                        <ul className="flex flex-wrap gap-4 pt-2">
                                            {product.features.map((feature, i) => (
                                                <li key={i} className="text-xs font-bold text-gray-500 flex items-center gap-1 uppercase">
                                                    <span className="w-1 h-1 bg-red-500 rounded-full"></span> {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <button className="text-sm font-bold uppercase tracking-wide border-b border-white pb-1 hover:text-red-500 hover:border-red-500 transition-colors inline-flex items-center gap-2">
                                            View Case Study <ArrowUpRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;
