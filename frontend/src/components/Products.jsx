import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

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
        image: "https://images.unsplash.com/photo-1626074169727-4a7b74f3f02e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
    },
    {
        category: "Enterprise Tools",
        title: "ADMIN DASHBOARD",
        description: "Powerful administrative panels for managing users, content, and system metrics with granular control.",
        features: ["Role Management", "Real-time Metrics", "Custom Reports"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
    }
];

const Products = () => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = direction === 'left' ? -400 : 400;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="w-full bg-[#111] text-white py-20 px-4 md:px-10 overflow-hidden relative">
            <div className="max-w-[1700px] mx-auto">
                {/* Header */}
                <div className="flex justify-between items-end mb-16 border-b border-gray-800 pb-8">
                    <div>
                        <h2 className="text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Our Products</h2>
                        <h3 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none">
                            Digital Solutions
                        </h3>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => scroll('left')} className="p-3 border border-gray-700 rounded-full hover:bg-white hover:text-black transition-colors">
                            <ChevronLeft size={24} />
                        </button>
                        <button onClick={() => scroll('right')} className="p-3 border border-gray-700 rounded-full hover:bg-white hover:text-black transition-colors">
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                {/* Horizontal Slider */}
                <div
                    ref={scrollRef}
                    className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide snap-x"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {products.map((product, index) => (
                        <div key={index} className="flex-none w-[85vw] md:w-[60vw] lg:w-[40vw] group snap-center">
                            {/* Image Section */}
                            <div className="relative w-full aspect-[4/3] overflow-hidden mb-8 bg-gray-800">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-4 right-4 bg-white text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowUpRight size={20} />
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <h4 className="text-3xl font-bold uppercase tracking-tight">{product.title}</h4>
                                    <span className="text-xs font-bold border border-white/20 px-2 py-1 rounded">{product.category}</span>
                                </div>
                                <p className="text-gray-400 text-sm max-w-md leading-relaxed">
                                    {product.description}
                                </p>
                                <ul className="flex flex-wrap gap-4 pt-2">
                                    {product.features.map((feature, i) => (
                                        <li key={i} className="text-xs font-bold text-gray-500 flex items-center gap-1 uppercase">
                                            <span className="w-1 h-1 bg-red-500 rounded-full"></span> {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}

                    {/* spacer for padding right */}
                    <div className="w-[1px] flex-none"></div>
                </div>
            </div>
        </div>
    );
};

export default Products;
