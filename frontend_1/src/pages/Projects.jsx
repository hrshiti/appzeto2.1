import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollWrapper from '../components/ScrollWrapper';
import { dataService } from '../admin/services/dataService';

const Projects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        // Fetch projects from data service
        const allProjects = dataService.getProjects();
        setProjects(allProjects);
    }, []);

    return (
        <ScrollWrapper>
            <div className="bg-white min-h-screen text-gray-900 font-sans">
                <Navbar />

                {/* Hero Section */}
                <section className="relative pt-4 md:pt-10 pb-4 md:pb-8 px-5 md:px-20 overflow-hidden text-center md:text-left">
                    <div className="absolute top-0 right-0 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-primary/5 rounded-full blur-[80px] md:blur-[150px] -z-10 animate-pulse" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-7xl mx-auto"
                    >
                        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tighter leading-[0.9] italic text-gray-900 mb-3 md:mb-6">
                            PROJECTS WE HAVE <br />
                            <span className="text-primary">CREATED</span>
                        </h1>
                        <p className="text-gray-600 text-[11px] md:text-base max-w-lg font-medium tracking-wide leading-relaxed mx-auto md:mx-0 opacity-80">
                            A showcase of our most ambitious digital transformations. We build high-performance instruments for the future.
                        </p>
                    </motion.div>
                </section>

                {/* Projects Grid */}
                <section className="pb-12 md:pb-24 px-2 md:px-20">
                    <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-8">
                        {projects.length > 0 ? (
                            projects.map((project, idx) => (
                                <motion.div
                                    key={project.id || idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                                    className="group"
                                >
                                    <Link to={`/projects/${project.slug}`}>
                                        <div className="relative aspect-[4/5] rounded-[0.8rem] md:rounded-[2rem] overflow-hidden border border-gray-100 bg-gray-50 transition-all duration-500 md:group-hover:border-primary/40 shadow-lg md:group-hover:shadow-2xl">
                                            {/* Image */}
                                            <img
                                                src={project.thumbnail}
                                                alt={project.title}
                                                className="w-full h-full object-cover md:group-hover:scale-105 transition-all duration-700"
                                            />

                                            {/* Content */}
                                            <div className="absolute inset-0 p-3 md:p-8 flex flex-col justify-end bg-black/30 md:bg-transparent md:group-hover:bg-black/40 transition-all duration-500">
                                                <div className="space-y-1 md:space-y-3">
                                                    <div className="hidden md:flex flex-wrap gap-1.5 text-white">
                                                        {project.tags && Array.isArray(project.tags) ? project.tags.slice(0, 2).map((tag, i) => (
                                                            <span key={i} className="px-2 py-0.5 bg-white/10 backdrop-blur-md rounded-full text-[9px] font-bold uppercase tracking-widest text-white border border-white/20">
                                                                {tag}
                                                            </span>
                                                        )) : null}
                                                    </div>
                                                    <h3 className="text-sm md:text-2xl font-black text-white uppercase tracking-tighter leading-tight md:group-hover:text-primary transition-colors">
                                                        {project.title}
                                                    </h3>
                                                    <p className="hidden md:block text-gray-300 text-sm font-medium leading-normal opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 line-clamp-2">
                                                        {project.description}
                                                    </p>
                                                    <div className="pt-0.5 flex items-center gap-1.5 text-primary">
                                                        <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest">Case Study</span>
                                                        <span className="material-icons text-[10px] md:text-xs md:group-hover:translate-x-1 transition-transform">east</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20">
                                <p className="text-slate-400">No projects found. Add some from the Admin Panel.</p>
                            </div>
                        )}
                    </div>
                </section>

                <Footer />
            </div>
        </ScrollWrapper>
    );
};

export default Projects;
