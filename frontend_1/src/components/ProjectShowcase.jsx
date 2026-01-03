import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projectsData = [
    {
        id: "p1",
        title: "APPZETO GO",
        subtitle: "Logistics Reimagined",
        category: "LOGISTICS",
        description: "A complete mobility solution with real-time tracking, multi-modal transport, and peak-hour load balancing for modern enterprises.",
        images: [
            "https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=2340&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1519003722824-191d446dc344?q=80&w=2340&auto=format&fit=crop"
        ],
        thumbnail: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=2340&auto=format&fit=crop"
    },
    {
        id: "p2",
        title: "APPZETO FOOD",
        subtitle: "Next-Gen Gastronomy",
        category: "NEXT-GEN",
        description: "Intelligent food discovery app using predictive analytics to suggest meals based on dietary habits and history.",
        images: [
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2340&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=2340&auto=format&fit=crop"
        ],
        thumbnail: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "p3",
        title: "APPZETO LEARN",
        subtitle: "Personalized Education",
        category: "PERSONALIZED",
        description: "Gamified learning platform with AI tutors and dynamic curriculum adjustment for every student.",
        images: [
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2340&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2340&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1503676260728-1c00da07bb5e?q=80&w=2340&auto=format&fit=crop"
        ],
        thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2340&auto=format&fit=crop"
    },
    {
        id: "p4",
        title: "APPZETO PAY",
        subtitle: "Unified Digital Assets",
        category: "FINTECH",
        description: "Ultra-secure wealth management app with biometric multi-sig, instant FX, and portfolio tracking.",
        images: [
            "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2340&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1550565118-3a14e8d0386f?q=80&w=2340&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1551288049-bb848a4f691f?q=80&w=2340&auto=format&fit=crop"
        ],
        thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2340&auto=format&fit=crop"
    },
    {
        id: "p5",
        title: "APPZETO VOICE",
        subtitle: "Intelligent Assistant",
        category: "AI VOICE",
        description: "Voice-first AI that integrates with your entire workspace to automate tasks via natural language.",
        images: [
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2340&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=2340&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2340&auto=format&fit=crop"
        ],
        thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2340&auto=format&fit=crop"
    }
];

const ProjectShowcase = () => {
    const [activeProject, setActiveProject] = useState(projectsData[0]);
    const [carouselItems, setCarouselItems] = useState(projectsData.slice(1));
    const [bgImageIndex, setBgImageIndex] = useState(0);

    // Auto-cycle background images
    useEffect(() => {
        const timer = setInterval(() => {
            setBgImageIndex((prev) => (prev + 1) % activeProject.images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [activeProject]);

    const handleSelect = useCallback((selectedProject) => {
        const oldActive = activeProject;
        setActiveProject(selectedProject);
        setCarouselItems(prev => {
            const newList = prev.filter(p => p.id !== selectedProject.id);
            return [...newList, oldActive];
        });
        setBgImageIndex(0);
    }, [activeProject]);

    return (
        <section className="h-screen w-full relative overflow-hidden bg-black font-sans select-none">

            {/* 1. Full-Screen Background */}
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                    key={activeProject.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                    className="absolute inset-0 z-0 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent z-10" />

                    <AnimatePresence mode="wait">
                        <motion.img
                            key={bgImageIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.2 }}
                            src={activeProject.images[bgImageIndex]}
                            alt={activeProject.title}
                            className="w-full h-full object-cover brightness-[0.4]"
                        />
                    </AnimatePresence>
                </motion.div>
            </AnimatePresence>

            <div className="absolute top-10 left-10 md:top-16 md:left-20 z-30 pointer-events-none">
                <motion.h2 className="text-white text-lg md:text-2xl font-bold uppercase tracking-widest pointer-events-none">
                    Projects We Have <span className="text-primary italic">Created</span>
                </motion.h2>
            </div>

            {/* 3. Central Details (Normal Text, No Card Background) */}
            <div className="absolute inset-0 flex items-center z-20 px-10 md:px-20 pt-10 pointer-events-none">
                <div className="max-w-[1440px] w-full grid grid-cols-1 lg:grid-cols-12 gap-10 h-full">
                    <motion.div
                        initial={{ opacity: 0, y: 100, x: 100 }}
                        whileInView={{ opacity: 1, y: 0, x: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-12 xl:col-span-6 flex flex-col justify-center"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeProject.id}
                                initial={{ opacity: 0, x: -80, filter: "blur(10px)" }}
                                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, x: 80, filter: "blur(10px)" }}
                                transition={{ duration: 0.8, ease: "circOut" }}
                                className="space-y-6 pointer-events-auto"
                            >
                                <p className="text-white/60 text-xs md:text-sm font-bold uppercase tracking-[0.3em]">
                                    {activeProject.subtitle}
                                </p>
                                <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                                    {activeProject.title.split(' ')[0]} <br />
                                    <span className="text-primary">{activeProject.title.split(' ')[1]}</span>
                                </h1>

                                <div className="max-w-md mt-2">
                                    <p className="text-gray-300 text-[10px] md:text-sm leading-relaxed font-medium opacity-90">{activeProject.description}</p>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-10 py-4 bg-primary text-white font-black rounded-full uppercase tracking-wider text-[11px] flex items-center gap-3 shadow-2xl shadow-primary/30"
                                >
                                    <span className="material-icons text-sm">rocket_launch</span>
                                    Explore Case Study
                                </motion.button>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>

            {/* 4. Bottom Right Carousel & View All Link */}
            <motion.div
                initial={{ opacity: 0, y: 100, x: -100 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-10 right-10 md:bottom-16 md:right-20 z-30 flex items-end gap-10 pointer-events-auto"
            >
                <div className="flex gap-4 items-end">
                    <AnimatePresence mode="popLayout" initial={false}>
                        {carouselItems.map((project) => (
                            <motion.div
                                key={project.id}
                                layoutId={`card-container-${project.id}`}
                                initial={{ opacity: 0, x: 100, scale: 0.8 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -100, scale: 1.2, filter: "blur(20px)" }}
                                transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                                onClick={() => handleSelect(project)}
                                className="group relative w-32 md:w-40 aspect-[3/4.5] rounded-[2rem] overflow-hidden cursor-pointer border border-white/10 bg-white/5 shadow-2xl"
                            >
                                <motion.img
                                    layoutId={`card-img-${project.id}`}
                                    src={project.thumbnail}
                                    alt={project.title}
                                    className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 active:scale-95"
                                />
                                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4 text-center">
                                    <h4 className="text-white text-[8px] md:text-[9px] font-black uppercase tracking-widest px-2 drop-shadow-lg">{project.title}</h4>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* View All Projects - No background, minimal link */}
                <motion.div
                    whileHover={{ x: 10 }}
                    className="flex flex-col items-center justify-center cursor-pointer group mb-10"
                >
                    <div className="w-14 h-14 rounded-full border border-white/20 flex flex-col items-center justify-center transition-all group-hover:border-primary group-hover:bg-primary/10">
                        <span className="material-icons text-white group-hover:text-primary transition-colors">east</span>
                    </div>
                    <span className="text-[10px] font-black text-white/40 group-hover:text-white uppercase tracking-widest mt-3 transition-colors">View All</span>
                </motion.div>
            </motion.div>

            {/* 5. Bottom Navigation Bar */}
            <div className="absolute bottom-12 left-10 md:left-20 z-30 flex items-center gap-6">
                <div className="flex gap-4">
                    <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() => handleSelect(carouselItems[carouselItems.length - 1])}
                        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white backdrop-blur-md"
                    >
                        <span className="material-icons text-base">west</span>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.2, backgroundColor: "#FFF", color: "#000" }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() => handleSelect(carouselItems[0])}
                        className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white backdrop-blur-md"
                    >
                        <span className="material-icons text-base">east</span>
                    </motion.button>
                </div>

                <div className="hidden md:block h-[1px] w-48 md:w-64 bg-white/10 relative rounded-full overflow-hidden">
                    <motion.div
                        className="absolute h-full bg-primary"
                        animate={{ width: `${((projectsData.findIndex(p => p.id === activeProject.id) + 1) / projectsData.length) * 100}%` }}
                        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                    />
                </div>
            </div>

            {/* Background Texture Branding */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center pointer-events-none opacity-[0.03]">
                <h3 className="text-[35vw] font-black text-white select-none">APPZETO</h3>
            </div>
        </section>
    );
};

export default ProjectShowcase;
