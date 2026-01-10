import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Reviews = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
    const [isPaused, setIsPaused] = useState(false);

    const testimonials = [
        {
            id: 1,
            name: "Victoria Linton",
            role: "CEO, TechFlow",
            text: "Appzeto transformed our digital presence. Their team's attention to detail and commitment to quality is unmatched. The final product exceeded our expectations in every way.",
            stars: 5,
            img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
        },
        {
            id: 2,
            name: "Dmitri Woodhouse",
            role: "Founder, StartupX",
            text: "Working with Appzeto was a game-changer. They understood our vision perfectly and delivered a scalable solution that helped us secure our Series A funding.",
            stars: 5,
            img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
        },
        {
            id: 3,
            name: "Fanny Dean",
            role: "Marketing Director, Studio G",
            text: "The UI/UX design provided by Appzeto is simply world-class. Our user engagement metrics have skyrocketed since the launch. Highly recommended!",
            stars: 5,
            img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
        },
        {
            id: 4,
            name: "Hindley Micawber",
            role: "CTO, FutureNet",
            text: "Technical expertise at its finest. They tackled complex challenges with ease and delivered a robust, high-performance application on time and within budget.",
            stars: 5,
            img: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
        },
        {
            id: 5,
            name: "Nelly Vane",
            role: "Product Owner, CreativeSol",
            text: "A true partner in development. Their proactive communication and agile methodology made the entire process smooth and transparent. We love our new app!",
            stars: 4,
            img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
        }
    ];

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!isPaused) {
            const timer = setInterval(() => {
                nextSlide();
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [currentIndex, isPaused, isDesktop]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <section className="bg-gradient-to-b from-gray-900 via-[#012829] to-gray-900 py-12 md:py-20 relative overflow-hidden font-display flex flex-col justify-center min-h-0 lg:min-h-[85vh]">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-primary/20 rounded-full blur-[80px] opacity-40 mix-blend-screen"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[80px] opacity-40 mix-blend-screen"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                {/* Header */}
                <div className="text-center mb-8 md:mb-10">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-medium text-primary mb-3"
                    >
                        Client Success Stories
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-3 font-display"
                    >
                        Trusted by Companies for <span className="text-primary">IT Services</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
                    >
                        We help startups and businesses design, develop, and scale reliable digital products using modern technologies.
                    </motion.p>
                </div>

                {/* Testimonial Carousel Container */}
                <div
                    className="relative"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Items Wrapper */}
                    <div className="overflow-hidden px-2 -mx-2 py-4">
                        <motion.div
                            className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                            style={{
                                transform: `translateX(-${currentIndex * (isDesktop ? 33.333 : 50)}%)`
                            }}
                        >
                            {testimonials.map((item) => (
                                <div
                                    key={item.id}
                                    className="w-1/2 md:w-1/3 flex-shrink-0 px-2 md:px-3"
                                >
                                    <div className="h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-[1rem] md:rounded-[1.5rem] p-4 md:p-8 hover:bg-white/10 transition-colors duration-300 group shadow-lg relative overflow-hidden">

                                        {/* Glow Effect on Hover */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                                        {/* Quote Icon */}
                                        <div className="absolute top-3 right-3 md:top-6 md:right-6 text-primary/20 transform rotate-12">
                                            <svg width="20" height="20" className="md:w-8 md:h-8" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14.017 21L14.017 18C14.017 16.8906 14.3219 15.9375 14.9316 15.1406C15.5414 14.3438 16.3262 13.9141 17.2861 13.8516C17.0781 13.25 17.0254 12.6797 17.1289 12.1406C17.3828 10.9609 18.0664 10.0547 19.1797 9.42188C19.7422 9.10938 20.375 8.95312 21.0781 8.95312V9.04688C20.6953 9.42188 20.4766 9.875 20.4219 10.4062C20.4219 11.0234 20.6582 11.5391 21.1309 11.9531C21.6035 12.3672 22.1523 12.5742 22.7773 12.5742C23.6367 12.5742 24.3164 12.2812 24.8164 11.6953C25.3164 11.1094 25.5664 10.4062 25.5664 9.58594C25.5664 8.52344 25.1016 7.57031 24.1719 6.72656C23.2383 5.88281 21.8203 5.46094 19.918 5.46094C17.2422 5.46094 15.2227 6.45312 13.8594 8.4375C13.0625 9.58594 12.6016 11.0859 12.4766 12.9375L12.4219 14.25L12.4766 21H14.017ZM0.59375 21L0.59375 18C0.59375 16.8906 0.898438 15.9375 1.50813 15.1406C2.11719 14.3438 2.90234 13.9141 3.8623 13.8516C3.6543 13.25 3.60156 12.6797 3.70508 12.1406C3.95898 10.9609 4.64258 10.0547 5.75586 9.42188C6.31836 9.10938 6.95117 8.95312 7.6543 8.95312V9.04688C7.27148 9.42188 7.05273 9.875 6.99805 10.4062C6.99805 11.0234 7.23438 11.5391 7.70703 11.9531C8.17969 12.3672 8.72852 12.5742 9.35352 12.5742C10.2129 12.5742 10.8926 12.2812 11.3926 11.6953C11.8926 11.1094 12.1426 10.4062 12.1426 9.58594C12.1426 8.52344 11.6777 7.57031 10.748 6.72656C9.81445 5.88281 8.39648 5.46094 6.49414 5.46094C3.81836 5.46094 1.79883 6.45312 0.435547 8.4375C-0.361328 9.58594 -0.822266 11.0859 -0.947266 12.9375L-1.00195 14.25L-0.947266 21H0.59375Z" />
                                            </svg>
                                        </div>

                                        {/* Stars */}
                                        <div className="flex space-x-1 mb-2 md:mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className={`text-xs md:text-base ${i < item.stars ? 'text-yellow-400' : 'text-gray-600'}`}>★</span>
                                            ))}
                                        </div>

                                        {/* Text */}
                                        <p className="text-gray-300 text-xs md:text-base leading-relaxed mb-4 md:mb-6 relative z-10 font-light line-clamp-4">
                                            "{item.text}"
                                        </p>

                                        {/* Profile */}
                                        <div className="flex items-center space-x-3 mt-auto">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-primary/30 rounded-full blur-md"></div>
                                                <img
                                                    src={item.img}
                                                    alt={item.name}
                                                    className="w-10 h-10 rounded-full object-cover relative z-10 border border-white/20"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold text-sm">{item.name}</h4>
                                                <p className="text-primary text-[10px] font-semibold uppercase tracking-wider">{item.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex justify-center items-center space-x-4 mt-8">
                        <button
                            onClick={prevSlide}
                            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-primary hover:text-white hover:border-primary text-white transition-all duration-300 group"
                        >
                            <span className="material-icons text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
                        </button>

                        {/* Pagination Dots */}
                        <div className="flex space-x-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex
                                        ? 'w-6 bg-primary'
                                        : 'w-1.5 bg-white/20 hover:bg-white/40'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextSlide}
                            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-primary hover:text-white hover:border-primary text-white transition-all duration-300 group"
                        >
                            <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </button>
                    </div>
                </div>

                {/* Trusted Badge - Removed explicitly to keep "compact" as per user request to fit in one view, if you want it back add it here in a small footer line */}
            </div>
        </section>
    );
};

export default Reviews;
