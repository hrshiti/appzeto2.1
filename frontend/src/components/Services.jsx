import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const servicesData = [
    {
        id: "01",
        title: "Web Development",
        description: "We build scalable, high-performance websites and web applications tailored to your business needs using modern technologies.",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "02",
        title: "Mobile App Dev",
        description: "Create seamless native and cross-platform mobile experiences for iOS and Android.",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "03",
        title: "AI & Machine Learning",
        description: "Leverage the power of Artificial Intelligence to automate processes and build intelligent systems.",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "04",
        title: "UI/UX Design",
        description: "We craft intuitive and visually stunning user interfaces that drive engagement.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "05",
        title: "Digital Strategy",
        description: "Transform your business with comprehensive digital strategies and SEO data-driven insights.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    }
];

const Services = () => {
    const [activeId, setActiveId] = useState("01");

    // Animations
    const headerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15, // Increased stagger for better wave effect
                delayChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, x: 300, scale: 0.3 }, // Deep right and very small
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 50,
                damping: 20,
                duration: 1.2
            }
        }
    };

    return (
        <div className="w-full bg-white text-[#1a1a1a] py-24 px-4 md:px-10 overflow-hidden min-h-screen flex flex-col justify-center">

            <div className="max-w-[1700px] mx-auto w-full">
                {/* Header with Animation */}
                <motion.div
                    className="mb-16 flex flex-col md:flex-row justify-between items-end border-b border-gray-300 pb-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={headerVariants}
                >
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter w-full md:w-1/2 leading-none text-[#1a1a1a]">
                        OUR <br /> <span className="text-gray-400">EXPERTISE</span>
                    </h2>
                    <motion.p
                        className="text-gray-600 max-w-md text-lg mt-6 md:mt-0"
                        variants={{
                            hidden: { opacity: 0, x: 20 },
                            visible: { opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.8 } }
                        }}
                    >
                        We deliver comprehensive digital solutions designed to elevate your brand and drive business growth in the modern era.
                    </motion.p>
                </motion.div>

                {/* Expanding Cards Container with Animation */}
                <motion.div
                    className="flex flex-col lg:flex-row h-[60vh] lg:h-[500px] gap-2 lg:gap-4 services-container"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.5 }} // Reverse animation enabled
                    variants={containerVariants}
                >
                    {servicesData.map((service) => (
                        <motion.div
                            key={service.id}
                            variants={cardVariants}
                            onMouseEnter={() => setActiveId(service.id)}
                            className={`
                relative h-full transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer overflow-hidden rounded-3xl
                ${activeId === service.id ? 'flex-[10] shadow-2xl' : 'flex-[1] grayscale hover:grayscale-0'}
                flex flex-col group
              `}
                        >

                            {/* Image Background with Blur/Zoom effect */}
                            <div
                                className={`absolute inset-0 bg-cover bg-center transition-transform duration-[1500ms] ease-out 
                  ${activeId === service.id ? 'scale-110' : 'scale-100'}
                `}
                                style={{ backgroundImage: `url(${service.image})` }}
                            />

                            {/* Overlay Gradient */}
                            <div className={`
                 absolute inset-0 transition-all duration-700
                 ${activeId === service.id
                                    ? 'bg-gradient-to-t from-black/90 via-black/40 to-transparent'
                                    : 'bg-black/60 group-hover:bg-black/40'}
              `} />

                            {/* Collapsed State: Vertical Text - NO NUMBERS */}
                            <div className={`
                 absolute inset-0 flex flex-col items-center justify-center z-10 p-4 transition-all duration-500
                 ${activeId === service.id ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0 delay-200'}
              `}>
                                <span className="text-xl font-bold text-white/90 uppercase tracking-widest whitespace-nowrap rotate-180" style={{ writingMode: 'vertical-rl' }}>
                                    {service.title}
                                </span>
                            </div>

                            {/* Expanded State Content - NO NUMBERS, NO ICONS */}
                            <div className={`
                absolute bottom-0 left-0 w-full p-8 md:p-12 z-20 flex flex-col justify-end h-full
                ${activeId === service.id ? 'pointer-events-auto' : 'pointer-events-none'}
              `}>
                                {/* Content Wrapper for Animation */}
                                <div className={`flex flex-col gap-6 transition-all duration-700 delay-100 
                      ${activeId === service.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
                  `}>

                                    <div>
                                        <h3 className="text-4xl md:text-6xl font-black leading-tight text-white mb-4 tracking-tight drop-shadow-lg">
                                            {service.title}
                                        </h3>
                                        <div className={`h-1 bg-[#D33C1D] transition-all duration-1000 ${activeId === service.id ? 'w-24' : 'w-0'}`}></div>
                                    </div>

                                    <p className="text-gray-200 text-lg md:text-xl max-w-2xl leading-relaxed drop-shadow-md">
                                        {service.description}
                                    </p>

                                    <button className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-white group/btn w-fit mt-4">
                                        <span className="border-b border-transparent group-hover/btn:border-[#D33C1D] transition-all pb-1">View Case Study</span>
                                        <div className="bg-[#D33C1D] text-white p-3 rounded-full transition-transform duration-300 group-hover/btn:rotate-45 shadow-lg shadow-red-900/20">
                                            <ArrowUpRight className="w-5 h-5" />
                                        </div>
                                    </button>
                                </div>
                            </div>

                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </div>
    );
};

export default Services;
