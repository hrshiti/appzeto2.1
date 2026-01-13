import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const Reviews = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
    const [isPaused, setIsPaused] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const carouselRef = useRef(null);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

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

    const extendedTestimonials = [...testimonials, ...testimonials.slice(0, 3)];

    useEffect(() => {
        if (!isPaused) {
            const timer = setInterval(() => {
                nextSlide();
            }, 3000); // Faster auto-scroll
            return () => clearInterval(timer);
        }
    }, [currentIndex, isPaused, isDesktop]);

    const handleTransitionEnd = () => {
        if (currentIndex >= testimonials.length) {
            setIsTransitioning(false);
            setCurrentIndex(0);
        }
    };

    // Restore transition after snap-back
    useEffect(() => {
        if (!isTransitioning) {
            requestAnimationFrame(() => {
                // Force reflow
                const _ = carouselRef.current?.offsetHeight;
                setIsTransitioning(true);
            });
        }
    }, [isTransitioning]);

    const nextSlide = () => {
        if (currentIndex >= testimonials.length) return; // Prevent double clicks during reset
        setCurrentIndex((prev) => prev + 1);
    };

    const prevSlide = () => {
        if (currentIndex <= 0) {
            setIsTransitioning(false);
            setCurrentIndex(testimonials.length - 1);
            return;
        }
        setCurrentIndex((prev) => prev - 1);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    // Touch Handlers for Mobile Swipe
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
        setIsPaused(true);
    };

    const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        if (isLeftSwipe) nextSlide();
        if (isRightSwipe) prevSlide();
        setIsPaused(false);
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
                    <div
                        className="overflow-hidden px-2 -mx-2 py-4"
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                    >
                        <motion.div
                            ref={carouselRef}
                            className={`flex ${isTransitioning ? 'transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]' : ''}`}
                            onTransitionEnd={handleTransitionEnd}
                            style={{
                                transform: `translateX(-${currentIndex * (isDesktop ? 33.333 : 50)}%)`
                            }}
                        >
                            {extendedTestimonials.map((item, index) => (
                                <div
                                    key={`${item.id}-${index}`}
                                    className="w-1/2 md:w-1/3 flex-shrink-0 px-2 md:px-3"
                                >
                                    <div className="h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-[1rem] md:rounded-[1.5rem] p-4 md:p-8 hover:bg-white/10 transition-colors duration-300 group shadow-lg relative overflow-hidden">

                                        {/* Glow Effect on Hover */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                                        {/* Appzeto Logo Icon (Replaced Leaf/Quote Icon) */}
                                        <div className="absolute top-3 right-3 md:top-6 md:right-6 transform rotate-12">
                                            <img src={logo} alt="Appzeto" className="w-6 h-6 md:w-10 md:h-10 object-contain" />
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
