import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollWrapper from '../components/ScrollWrapper';
import BuyProductModal from '../components/BuyProductModal';
import { ArrowRight, ShoppingBag, Truck, Car, ShoppingCart, Activity } from 'lucide-react';

// Static Data for the 4 Core Products
const PRODUCTS = [
    {
        id: 'food',
        title: 'Food Delivery Solution',
        description: 'A complete UberEats clone with Customer App, Restaurant App, Driver App, and Admin Dashboard. Ready to launch.',
        thumbnail: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=2000&auto=format&fit=crop', // Replace with actual asset if available
        category: 'On-Demand',
        slug: 'appzeto-food',
        icon: <Truck size={20} className="text-orange-500" />
    },
    {
        id: 'taxi',
        title: 'Taxi Booking Solution',
        description: 'Full-featured ride-booking solution like Uber. Includes Passenger App, Driver App, and Dispatch Panel.',
        thumbnail: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2000&auto=format&fit=crop',
        category: 'Transport',
        slug: 'appzeto-taxi',
        icon: <Car size={20} className="text-yellow-500" />
    },
    {
        id: 'ecommerce',
        title: 'Multi-Vendor Ecommerce',
        description: 'Scalable marketplace solution like Amazon/Flipkart. Supports unlimited vendors, products, and categories.',
        thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=2000',
        category: 'Retail',
        slug: 'appzeto-ecommerce',
        icon: <ShoppingCart size={20} className="text-blue-500" />
    },
    {
        id: 'hospital',
        title: 'Hospital Management',
        description: 'Comprehensive HMS for clinics and hospitals. Manage patients, doctors, appointments, and billing efficiently.',
        thumbnail: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop',
        category: 'Healthcare',
        slug: 'appzeto-hospital',
        icon: <Activity size={20} className="text-red-500" />
    }
];

const Ecommerce = () => {
    const navigate = useNavigate();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleBuyClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleExploreClick = (slug) => {
        navigate(`/${slug}`);
    };

    return (
        <ScrollWrapper>
            <Navbar />
            <div className="bg-[#F8FAFC] min-h-screen font-sans text-slate-800 selection:bg-[#2563EB] selection:text-white overflow-x-hidden">

                {/* --- HERO SECTION --- */}
                <div className="relative w-full min-h-[350px] md:min-h-0 h-auto md:h-[400px] pt-24 md:pt-0 flex flex-col items-center justify-center text-center px-4 overflow-visible">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2000&auto=format&fit=crop"
                            alt="Ecommerce Background"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-slate-900/80 mix-blend-multiply" />
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto pt-4 md:pt-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 text-xs font-bold uppercase tracking-wider mb-4 animate-fade-in-up">
                            <ShoppingBag size={14} /> Official Store
                        </div>
                        <h1 className="text-3xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
                            Premium Ready-Made <br /> Solutions
                        </h1>
                        <p className="text-blue-100 text-sm md:text-lg font-medium mb-6 max-w-2xl mx-auto leading-relaxed opacity-90">
                            Launch your business today with our production-ready applications.
                            <br className="hidden md:block" /> customize, deploy, and scale with ease.
                        </p>
                    </div>
                </div>

                {/* --- PRODUCT GRID --- */}
                <section className="py-12 md:py-20 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {PRODUCTS.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 group flex flex-col hover:-translate-y-2 transition-all duration-300"
                            >
                                {/* Thumbnail */}
                                <div className="h-40 md:h-48 overflow-hidden bg-slate-100 relative cursor-pointer" onClick={() => handleExploreClick(product.slug)}>
                                    <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/10 transition-colors duration-300 z-10" />
                                    <img
                                        src={product.thumbnail}
                                        alt={product.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    {/* Category Badge */}
                                    <div className="absolute top-3 left-3 md:top-4 md:left-4 z-20">
                                        <span className="bg-white/95 backdrop-blur-md text-[9px] md:text-[10px] font-bold px-2 py-0.5 md:px-3 md:py-1 rounded-full text-slate-800 uppercase tracking-wider shadow-sm flex items-center gap-1">
                                            {product.icon} {product.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4 md:p-5 flex flex-col flex-1">
                                    <h3
                                        className="text-lg md:text-xl font-bold text-slate-900 mb-1 md:mb-2 group-hover:text-[#1D4ED8] transition-colors cursor-pointer leading-tight"
                                        onClick={() => handleExploreClick(product.slug)}
                                    >
                                        {product.title}
                                    </h3>
                                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-4 md:mb-6 line-clamp-2 md:line-clamp-3">
                                        {product.description}
                                    </p>

                                    {/* Actions */}
                                    <div className="mt-auto grid grid-cols-2 gap-2 md:gap-3">
                                        <button
                                            onClick={() => handleExploreClick(product.slug)}
                                            className="px-3 py-2 md:px-4 md:py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs md:text-sm hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center justify-center gap-2"
                                        >
                                            Explore
                                        </button>
                                        <button
                                            onClick={() => handleBuyClick(product)}
                                            className="px-3 py-2 md:px-4 md:py-2.5 rounded-xl bg-[#1D4ED8] text-white font-bold text-xs md:text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95 flex items-center justify-center gap-2"
                                        >
                                            Buy Now <ArrowRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* --- FOOTER CTA --- */}
                <section className="relative py-16 px-4 text-center overflow-hidden bg-white border-t border-slate-100">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">Enterprise Customization?</h2>
                        <p className="text-slate-500 mb-8 max-w-xl mx-auto">
                            Need a tailored solution for your specific business model? Our team can customize any of these products to fit your needs perfectly.
                        </p>
                        <button
                            onClick={() => navigate('/contact')}
                            className="px-8 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
                        >
                            Talk to Sales <ArrowRight size={16} />
                        </button>
                    </div>
                </section>

                <Footer />
            </div>

            {/* Modal */}
            <BuyProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                productTitle={selectedProduct?.title}
            />
        </ScrollWrapper>
    );
};

export default Ecommerce;
