import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { projectsData as allProjects } from '../data/projectsData';

const ProjectShowcase = () => {
    // We only want the first 4 projects as requested
    const displayProjects = allProjects.slice(0, 4);

    const [activeProject, setActiveProject] = useState(displayProjects[0]);
    const [carouselItems, setCarouselItems] = useState(displayProjects.slice(1));
    const [bgImageIndex, setBgImageIndex] = useState(0);

    // Auto-cycle background images from the project's images array
    useEffect(() => {
        const timer = setInterval(() => {
            if (activeProject.images && activeProject.images.length > 0) {
                setBgImageIndex((prev) => (prev + 1) % activeProject.images.length);
            }
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

    const getSafeImages = (project) => {
        return project.images && project.images.length > 0 ? project.images : [project.thumbnail];
    };

    return (
        <section className="h-[75vh] md:h-screen w-full relative overflow-hidden bg-black font-sans select-none">

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
                            src={getSafeImages(activeProject)[bgImageIndex]}
                            alt={activeProject.title}
                            className="w-full h-full object-cover brightness-[0.4]"
                        />
                    </AnimatePresence>
                </motion.div>
            </AnimatePresence>

            <div className="absolute top-6 left-6 md:top-16 md:left-20 z-30 pointer-events-none">
                <motion.h2 className="text-white text-[10px] md:text-lg font-bold uppercase tracking-widest pointer-events-none">
                    Projects We Have <span className="text-primary italic">Created</span>
                </motion.h2>
            </div>

            {/* 3. Central Details (Normal Text, No Card Background) */}
            <div className="absolute inset-0 flex items-center z-20 px-6 md:px-20 pt-8 md:pt-10 pointer-events-none">
                <div className="max-w-[1440px] w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 h-full">
                    <motion.div
                        initial={{ opacity: 0, y: 100, x: 100 }}
                        whileInView={{ opacity: 1, y: 0, x: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-12 xl:col-span-6 flex flex-col justify-start md:justify-center mt-16 md:mt-0"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeProject.id}
                                initial={{ opacity: 0, x: -80, filter: "blur(10px)" }}
                                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, x: 80, filter: "blur(10px)" }}
                                transition={{ duration: 0.8, ease: "circOut" }}
                                className="space-y-4 md:space-y-6 pointer-events-auto"
                            >
                                <p className="text-white/60 text-[10px] md:text-sm font-bold uppercase tracking-[0.3em]">
                                    {activeProject.subtitle}
                                </p>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-2 md:mb-0">
                                    {activeProject.title.split(' ')[0]} <br />
                                    <span className="text-primary">{activeProject.title.split(' ')[1]}</span>
                                </h1>

                                <div className="max-w-md mt-2">
                                    <p className="hidden sm:block text-gray-300 text-[10px] sm:text-xs md:text-sm leading-relaxed font-medium opacity-90">{activeProject.description}</p>
                                </div>

                                <Link to={`/projects/${activeProject.slug}`}>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-6 py-3 md:px-10 md:py-4 bg-primary text-white font-black rounded-full uppercase tracking-wider text-[10px] md:text-[11px] flex items-center gap-2 md:gap-3 shadow-2xl shadow-primary/30"
                                    >
                                        <span className="material-icons text-xs md:text-sm">rocket_launch</span>
                                        Explore Case Study
                                    </motion.button>
                                </Link>
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
                className="absolute bottom-20 right-6 md:bottom-16 md:right-20 z-30 flex items-end gap-4 md:gap-10 pointer-events-auto hidden sm:flex"
            >
                <div className="flex gap-2 md:gap-4 items-end">
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
                                className="group relative w-20 md:w-32 lg:w-40 aspect-[3/4.5] rounded-xl md:rounded-[2rem] overflow-hidden cursor-pointer border border-white/10 bg-white/5 shadow-2xl"
                            >
                                <motion.img
                                    layoutId={`card-img-${project.id}`}
                                    src={project.thumbnail}
                                    alt={project.title}
                                    className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 active:scale-95"
                                />
                                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-2 text-center">
                                    <h4 className="text-white text-[6px] md:text-[9px] font-black uppercase tracking-widest px-1 drop-shadow-lg">{project.title}</h4>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* View All Projects - No background, minimal link */}
                <Link to="/projects">
                    <motion.div
                        whileHover={{ x: 10 }}
                        className="flex flex-col items-center justify-center cursor-pointer group mb-4 md:mb-10"
                    >
                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/20 flex flex-col items-center justify-center transition-all group-hover:border-primary group-hover:bg-primary/10">
                            <span className="material-icons text-white text-base md:text-2xl group-hover:text-primary transition-colors">east</span>
                        </div>
                        <span className="text-[8px] md:text-[10px] font-black text-white/40 group-hover:text-white uppercase tracking-widest mt-2 md:mt-3 transition-colors">View All</span>
                    </motion.div>
                </Link>
            </motion.div>

            {/* 5. Bottom Navigation Bar */}
            <div className="absolute bottom-4 left-6 md:bottom-12 md:left-20 z-30 flex items-center gap-4 md:gap-6">
                <div className="flex gap-3 md:gap-4">
                    <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() => handleSelect(carouselItems[carouselItems.length - 1])}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center text-white backdrop-blur-md"
                    >
                        <span className="material-icons text-sm md:text-base">west</span>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.2, backgroundColor: "#FFF", color: "#000" }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() => handleSelect(carouselItems[0])}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white backdrop-blur-md"
                    >
                        <span className="material-icons text-sm md:text-base">east</span>
                    </motion.button>
                </div>

                <div className="hidden md:block h-[1px] w-48 md:w-64 bg-white/10 relative rounded-full overflow-hidden">
                    <motion.div
                        className="absolute h-full bg-primary"
                        animate={{ width: `${((displayProjects.findIndex(p => p.id === activeProject.id) + 1) / displayProjects.length) * 100}%` }}
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
