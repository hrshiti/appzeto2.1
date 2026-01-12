import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollWrapper from '../components/ScrollWrapper';
import { ArrowRight, Loader2 } from 'lucide-react';

const Projects = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // Fetch from backend
                const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/projects`);
                // Backend standard response: { success: true, count: N, data: [...] }
                if (data.success) {
                    setProjects(data.data);
                }
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProjects();
    }, []);

    // Staggered animation for grid
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <ScrollWrapper>
            <div className="bg-[#F8FAFC] min-h-screen font-sans text-slate-800 selection:bg-[#05A4A7] selection:text-white overflow-x-hidden">
                <Navbar />

                {/* --- 1. LISTING HERO --- */}
                <section className="relative pt-6 md:pt-10 pb-2 md:pb-8 px-4 md:px-12 lg:px-20 text-center">
                    <div className="max-w-4xl mx-auto">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[#05A4A7] font-bold tracking-[0.2em] text-[8px] md:text-xs uppercase mb-0.5 md:mb-2 block"
                        >
                            Our Portfolio
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl sm:text-4xl md:text-5xl font-black text-[#012828] tracking-tight mb-1 md:mb-3"
                        >
                            Real-world solutions we’ve built for <span className="text-[#05A4A7]">businesses.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xs md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed px-4"
                        >
                            From enterprise logistics platforms to hyper-local e-commerce apps, explore how we transform complex challenges into elegant digital products.
                        </motion.p>
                    </div>
                </section>

                {/* --- 2. PROJECTS GRID --- */}
                <section className="px-6 md:px-12 lg:px-20 pb-24">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="animate-spin text-[#05A4A7]" size={40} />
                        </div>
                    ) : (
                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 px-1 md:px-4"
                        >
                            {projects.map((project) => (
                                <motion.div
                                    key={project._id || project.id}
                                    variants={item}
                                    whileHover={{ y: -5 }}
                                    className="group bg-white rounded-xl overflow-hidden border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full hover:border-[#05A4A7]/30"
                                    onClick={() => navigate(`/projects/${project.slug}`)}
                                >
                                    {/* Image Container */}
                                    <div className="aspect-[16/10] overflow-hidden relative">
                                        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors z-10" />
                                        <img
                                            src={project.thumbnail}
                                            alt={project.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                        />
                                        {/* Category Badge */}
                                        <div className="absolute top-2 left-2 z-20">
                                            <span className="bg-white/95 backdrop-blur text-[#012828] text-[8px] md:text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm uppercase tracking-wide">
                                                {project.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-2 md:p-4 flex flex-col flex-1">
                                        <h3 className="text-sm md:text-lg font-bold text-[#012828] mb-0.5 md:mb-1 group-hover:text-[#05A4A7] transition-colors line-clamp-1">
                                            {project.title}
                                        </h3>
                                        <p className="text-slate-500 text-[10px] md:text-xs leading-relaxed mb-2 md:mb-3 line-clamp-2">
                                            {project.shortDescription}
                                        </p>

                                        <div className="mt-auto pt-2 md:pt-3 border-t border-slate-100 flex items-center justify-between">
                                            <div className="flex gap-1 md:gap-1.5 overflow-hidden">
                                                {project.techTags && project.techTags.slice(0, window.innerWidth < 768 ? 1 : 2).map((tag, idx) => (
                                                    <span key={idx} className="bg-slate-50 text-slate-600 text-[8px] md:text-[9px] font-bold px-1 md:px-1.5 py-0.5 rounded overflow-hidden text-ellipsis whitespace-nowrap max-w-[50px] md:max-w-[60px]">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="text-[#05A4A7] group-hover:translate-x-1 transition-transform">
                                                <ArrowRight size={window.innerWidth < 768 ? 12 : 14} />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </section>

                <Footer />
            </div>
        </ScrollWrapper>
    );
};

export default Projects;
