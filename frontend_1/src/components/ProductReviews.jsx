import React from 'react';
import { motion } from 'framer-motion';

const ProductReviews = ({ color = "#EF7F1A" }) => {
    const reviews = [
        {
            id: 1,
            name: "Sarah Jenkins",
            role: "Restaurant Owner",
            text: "The Appzeto Food solution completely changed how we handle peek hours. The interface is intuitive and the support is top-notch.",
            stars: 5,
            img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100"
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Entrepreneur",
            text: "Launching our grocery delivery app was seamless. The code is clean and highly scalable. Best investment we've made this year.",
            stars: 5,
            img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100"
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            role: "Product Manager",
            text: "The multi-vendor features are incredible. It handles complex commissions and real-time tracking with ease. Highly recommended!",
            stars: 5,
            img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100"
        },
        {
            id: 4,
            name: "David Smith",
            role: "Fleet Owner",
            text: "The delivery app is very stable. Drivers find it easy to use, and the real-time distance calculation is remarkably accurate.",
            stars: 4,
            img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100"
        }
    ];

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-4 block"
                        style={{ color }}
                    >
                        Success Stories
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter"
                    >
                        Loved by <span style={{ color }}>Businesses</span> Worldwide
                    </motion.h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
                    {reviews.map((review, idx) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white p-3 md:p-8 rounded-xl md:rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 hover:border-gray-200 transition-all group flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center gap-2 md:gap-4 mb-3 md:mb-6">
                                    <img
                                        src={review.img}
                                        alt={review.name}
                                        className="w-8 h-8 md:w-12 md:h-12 rounded-full object-cover border-2 border-white shadow-md"
                                    />
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-xs md:text-sm leading-tight">{review.name}</h4>
                                        <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-wider text-gray-400">{review.role}</p>
                                    </div>
                                </div>

                                <div className="flex gap-0.5 md:gap-1 mb-2 md:mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <span
                                            key={i}
                                            className={`material-symbols-outlined text-[10px] md:text-sm ${i < review.stars ? '' : 'opacity-20'}`}
                                            style={{ color: i < review.stars ? color : '#ccc' }}
                                        >
                                            star
                                        </span>
                                    ))}
                                </div>

                                <p className="text-gray-600 text-[10px] md:text-sm leading-relaxed italic line-clamp-4 md:line-clamp-none">
                                    "{review.text}"
                                </p>
                            </div>

                            <div className="mt-3 md:mt-6 pt-3 md:pt-6 border-t border-gray-50 flex justify-between items-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-gray-300 whitespace-nowrap">Verified</span>
                                <span className="material-symbols-outlined text-xs md:text-sm text-gray-200">verified</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductReviews;
