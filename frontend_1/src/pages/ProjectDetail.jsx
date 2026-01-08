import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollWrapper from '../components/ScrollWrapper';
import { dataService } from '../admin/services/dataService';

const ProjectDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const getImgUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        return path.startsWith('/uploads') ? `http://localhost:5000${path}` : path;
    };

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const data = await dataService.getProject(slug);
                if (data) {
                    setProject(data);
                } else {
                    navigate('/projects');
                }
            } catch (err) {
                console.error("Error fetching project:", err);
                navigate('/projects');
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
        window.scrollTo(0, 0);
    }, [slug, navigate]);

    // Slideshow Effect
    useEffect(() => {
        if (project && project.images && project.images.length > 1) {
            const timer = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [project]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!project) return null;

    const galleryImages = project.images && project.images.length > 0 ? project.images : [project.thumbnail];

    return (
        <ScrollWrapper>
            <div className="bg-white min-h-screen text-gray-900 font-sans selection:bg-[#05A4A7] selection:text-white">
                <Navbar />

                {/* --- Hero Section --- */}
                <section className="relative h-[50vh] md:h-[80vh] flex items-end pb-8 px-4 md:px-20 overflow-hidden pt-12 md:pt-16">
                    <div className="absolute inset-0 z-0">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentImageIndex}
                                src={getImgUrl(galleryImages[currentImageIndex])}
                                alt={project.title}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                className="w-full h-full object-cover absolute inset-0"
                            />
                        </AnimatePresence>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>

                    <div className="max-w-7xl mx-auto w-full relative z-10 text-white">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-primary text-white text-[10px] md:text-xs font-black uppercase tracking-[0.2em] rounded-full">
                                    {project.category}
                                </span>
                                <span className="text-white/70 text-[10px] md:text-sm font-bold tracking-widest uppercase">
                                    {project.industry}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] italic mb-4">
                                {project.title.split(' ').slice(0, -1).join(' ')} <br />
                                <span className="text-primary">{project.title.split(' ').pop()}</span>
                            </h1>
                            <p className="max-w-xl text-white/80 text-sm md:text-xl font-medium leading-relaxed italic">
                                "{project.subtitle}"
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* --- Project Metadata & Overview --- */}
                <section className="py-12 md:py-24 px-4 md:px-20 border-b border-gray-100">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
                        {/* Sidebar Info */}
                        <div className="md:col-span-4 space-y-12">
                            <div className="grid grid-cols-2 md:grid-cols-1 gap-8">
                                <div className="space-y-2">
                                    <p className="text-primary text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">Client</p>
                                    <p className="text-gray-900 text-sm md:text-2xl font-bold">{project.client}</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-primary text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">Project Year</p>
                                    <p className="text-gray-900 text-sm md:text-2xl font-bold">{project.year}</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-primary text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">Technologies</p>
                                    <div className="flex flex-wrap gap-x-3 gap-y-2">
                                        {project.tags && project.tags.map((tech, i) => (
                                            <span key={i} className="text-gray-500 text-[11px] md:text-base font-bold uppercase tracking-widest">
                                                {tech}{i !== project.tags.length - 1 ? ' •' : ''}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Description */}
                        <div className="md:col-span-8 space-y-16">
                            <div>
                                <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-6 italic">Project <span className="text-primary">Overview</span></h2>
                                <p className="text-gray-600 text-base md:text-2xl font-medium leading-relaxed opacity-90">
                                    {project.fullDescription}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                                <div className="p-8 md:p-12 bg-slate-50 border border-slate-100 rounded-[2rem] md:rounded-[3rem] hover:border-primary/20 transition-all group">
                                    <h3 className="text-gray-900 text-xl md:text-3xl font-black uppercase tracking-tighter mb-4 flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary text-2xl md:text-4xl group-hover:rotate-12 transition-transform">bolt</span>
                                        The Challenge
                                    </h3>
                                    <p className="text-gray-600 text-sm md:text-lg font-medium leading-relaxed">
                                        {project.challenge}
                                    </p>
                                </div>
                                <div className="p-8 md:p-12 bg-emerald-50/30 border border-emerald-100 rounded-[2rem] md:rounded-[3rem] hover:border-emerald-500/20 transition-all group">
                                    <h3 className="text-gray-900 text-xl md:text-3xl font-black uppercase tracking-tighter mb-4 flex items-center gap-3">
                                        <span className="material-symbols-outlined text-emerald-500 text-2xl md:text-4xl group-hover:scale-110 transition-transform">auto_awesome</span>
                                        The Solution
                                    </h3>
                                    <p className="text-gray-600 text-sm md:text-lg font-medium leading-relaxed">
                                        {project.solution}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- Features Section --- */}
                {project.features && project.features.length > 0 && (
                    <section className="py-16 md:py-32 px-4 md:px-20 bg-slate-900 text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

                        <div className="max-w-7xl mx-auto relative z-10">
                            <div className="mb-12 md:mb-20">
                                <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] md:text-xs block mb-4">Core Functionality</span>
                                <h2 className="text-3xl md:text-7xl font-black uppercase tracking-tighter italic leading-[0.9]">Key <span className="text-primary">Features</span></h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
                                {project.features.map((feature, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-8 md:p-12 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/[0.08] hover:border-primary/30 transition-all"
                                    >
                                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary mb-8 text-2xl md:text-3xl">
                                            <span className="material-symbols-outlined">star</span>
                                        </div>
                                        <h4 className="text-white text-lg md:text-2xl font-bold leading-tight mb-4">{feature}</h4>
                                        <div className="w-10 h-[2px] bg-primary/30 rounded-full"></div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* --- Results Section --- */}
                {project.results && project.results.length > 0 && (
                    <section className="py-20 md:py-40 px-4 md:px-20 bg-white">
                        <div className="max-w-7xl mx-auto text-center">
                            <h2 className="text-4xl md:text-9xl font-black uppercase tracking-tighter italic mb-16 md:mb-32 text-gray-100 select-none">Impact Study</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
                                {project.results.map((result, i) => (
                                    <div key={i} className="flex flex-col items-center group">
                                        <motion.span
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            className="text-3xl md:text-6xl lg:text-7xl font-black text-primary mb-2 md:mb-4 tracking-tighter break-words"
                                        >
                                            {result.split(' ')[0]}
                                        </motion.span>
                                        <p className="text-gray-900 text-xs md:text-xl font-black uppercase tracking-[0.3em] text-center">
                                            {result.split(' ').slice(1).join(' ')}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* --- Client Testimonial --- */}
                {project.testimonial && project.testimonial.text && (
                    <section className="py-24 md:py-48 px-6 md:px-20 bg-slate-50 border-y border-slate-100">
                        <div className="max-w-5xl mx-auto text-center relative">
                            <div className="text-primary/10 text-9xl md:text-[15rem] font-serif absolute -top-20 -left-10 md:-top-40 md:-left-20 pointer-events-none select-none italic">“</div>
                            <blockquote className="text-2xl md:text-6xl font-medium text-slate-800 italic leading-[1.1] md:leading-[1.1] mb-12 md:mb-20 relative z-10">
                                {project.testimonial.text}
                            </blockquote>
                            <div className="relative z-10">
                                <h4 className="text-xl md:text-3xl font-black text-gray-900 uppercase tracking-tighter">{project.testimonial.author}</h4>
                                <p className="text-primary text-[10px] md:text-base font-black uppercase tracking-[0.4em] mt-3">{project.testimonial.role}</p>
                            </div>
                        </div>
                    </section>
                )}

                {/* --- CTA Section --- */}
                <section className="py-20 md:py-40 px-4 md:px-20">
                    <div className="max-w-7xl mx-auto p-12 md:px-24 md:py-32 bg-slate-900 rounded-[3rem] md:rounded-[5rem] relative overflow-hidden text-center">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 to-transparent opacity-50" />
                        <div className="relative z-10 space-y-10">
                            <h2 className="text-3xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9] italic">
                                Ready for <br /> Greatness?
                            </h2>
                            <p className="text-white/60 text-sm md:text-2xl font-medium max-w-2xl mx-auto">
                                Let's collaborate to build an industry-leading masterpiece that exceeds expectations.
                            </p>
                            <Link to="/contact">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-10 py-5 md:px-16 md:py-8 bg-primary text-white rounded-full font-black uppercase tracking-widest text-xs md:text-lg hover:bg-white hover:text-primary transition-all shadow-2xl shadow-primary/20"
                                >
                                    Start a Project
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </ScrollWrapper>
    );
};

export default ProjectDetail;

