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
    const [activeFilter, setActiveFilter] = useState('All');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/projects`);
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

    const filters = ["All", "Web Apps", "Mobile Apps", "E-Commerce", "Business Solutions", "Testing Projects"];

    const filteredProjects = activeFilter === 'All'
        ? projects
        : projects.filter(p => p.category === activeFilter);

    return (
        <ScrollWrapper>
            <Navbar />
            <div className="bg-[#F8FAFC] min-h-screen font-sans text-slate-800 selection:bg-[#05A4A7] selection:text-white overflow-x-hidden">

                {/* --- HERO SECTION --- */}
                <div className="relative w-full min-h-[250px] md:min-h-0 h-auto md:h-[350px] pt-20 md:pt-0 flex flex-col items-center justify-center text-center px-4 overflow-visible">
                    {/* Background Image with Blue Tint */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop"
                            alt="Project Dashboard Background"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-[#05A4A7]/60 mix-blend-multiply" />
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto pt-4 md:pt-10">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4">Our Work</h1>
                        <p className="text-teal-50 text-sm md:text-lg font-medium mb-1 md:mb-2 leading-tight">
                            Real-world solutions we’ve built for startups, businesses, and enterprises.
                        </p>
                        <div className="w-16 md:w-24 h-0.5 bg-[#05A4A7]/50 mx-auto my-2 md:my-4" />
                        <p className="hidden md:block text-teal-100 text-xs md:text-sm font-light max-w-2xl mx-auto leading-relaxed">
                            We design, develop, and test powerful digital products that solve real business problems.
                        </p>
                    </div>

                    {/* Filter Bar */}
                    <div className="absolute bottom-0 translate-y-1/2 z-20 w-full px-4">
                        <div className="flex flex-wrap justify-center gap-1.5 md:gap-0 max-w-fit mx-auto bg-white rounded-full p-1 border border-slate-100">
                            {filters.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-semibold transition-all duration-300 ${activeFilter === filter
                                        ? 'bg-[#05A4A7] text-white'
                                        : 'bg-transparent text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- PROJECTS GRID --- */}
                <section className="pt-12 pb-8 md:pt-16 md:pb-16 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto min-h-[50vh]">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="animate-spin text-[#05A4A7]" size={40} />
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
                        >
                            {filteredProjects.map((project) => (
                                <div key={project._id || project.id} className="bg-white rounded-2xl overflow-hidden shadow-[0_20px_40px_rgb(0,0,0,0.1)] border border-slate-100 group flex flex-col transition-all duration-300">
                                    {/* Thumbnail */}
                                    <div className="h-40 overflow-hidden bg-slate-50 relative group">
                                        <div className="absolute inset-0 bg-[#05A4A7]/0 group-hover:bg-[#05A4A7]/10 transition-colors duration-300 z-10" />
                                        <img
                                            src={project.thumbnail}
                                            alt={project.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                        {/* Badge */}
                                        <div className="absolute top-3 left-3 z-20">
                                            <span className="bg-white/90 backdrop-blur-sm text-[9px] font-bold px-2 py-0.5 rounded-full text-slate-800 uppercase tracking-wider">
                                                {project.category}
                                            </span>
                                        </div>
                                    </div>
                                    {/* Content */}
                                    <div className="p-3 md:p-4 flex flex-col flex-1 text-left relative">
                                        <h3 className="text-base md:text-lg font-bold text-slate-900 mb-1 group-hover:text-[#05A4A7] transition-colors">{project.title}</h3>
                                        <p className="text-slate-500 text-xs leading-relaxed mb-3 line-clamp-3">{project.shortDescription}</p>

                                        <div className="mt-auto pt-2 md:pt-3 border-t border-slate-50 flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Built With</span>
                                                <span className="text-[10px] font-semibold text-slate-700">
                                                    {project.techTags ? project.techTags.join(', ') : ''}
                                                </span>
                                            </div>

                                            <button
                                                onClick={() => navigate(`/projects/${project.slug}`)}
                                                className="w-8 h-8 rounded-full bg-[#05A4A7] text-white flex items-center justify-center hover:bg-[#037A7C] transition-all duration-300"
                                            >
                                                <ArrowRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </section>

                {/* --- FOOTER CTA --- */}
                <section className="relative py-12 px-4 text-center overflow-hidden">
                    {/* BG */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2613&auto=format&fit=crop"
                            alt="City Footer"
                            className="w-full h-full object-cover grayscale-[0.5] opacity-50 blur-[2px]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
                    </div>

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Have a project in mind?</h2>
                        <p className="text-xl md:text-2xl text-[#05A4A7] font-bold italic mb-8">
                            Let’s build something <span className="underline decoration-[#05A4A7]">great together.</span>
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button
                                onClick={() => navigate('/contact')}
                                className="px-8 py-3 bg-[#05A4A7] text-white font-bold rounded hover:bg-[#037A7C] transition-colors flex items-center justify-center gap-2"
                            >
                                Request a Quote <ArrowRight size={16} />
                            </button>
                            <button
                                onClick={() => navigate('/contact')}
                                className="px-8 py-3 bg-white text-slate-900 font-bold rounded hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 border border-slate-200"
                            >
                                Talk to Our Team <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </ScrollWrapper>
    );
};

export default Projects;
