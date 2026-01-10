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

    const validImages = (project.images || []).filter(Boolean);
    const galleryImages = validImages.length > 0 ? validImages : [project.thumbnail];

    return (
        <ScrollWrapper>
            <div className="bg-white min-h-screen text-gray-900 font-sans selection:bg-[#05A4A7] selection:text-white">
                <Navbar />

                {/* --- Hero Section --- */}
                <section className="relative h-[50vh] md:h-[60vh] flex items-end pb-8 px-4 md:px-20 overflow-hidden pt-12 md:pt-16">
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
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
                <section className="py-8 md:py-12 px-4 md:px-20 border-b border-gray-100">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                        {/* Sidebar Info - Sticky */}
                        <div className="md:col-span-4 relative">
                            <div className="md:sticky md:top-32 space-y-10 p-8 bg-slate-50/50 rounded-[2rem] border border-slate-100 backdrop-blur-sm">
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

                            <div className="grid grid-cols-1 gap-6 md:gap-8">
                                <div className="p-8 md:p-10 bg-orange-50/50 border border-orange-100 rounded-[2rem] hover:border-orange-200 transition-all group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                    <h3 className="text-gray-900 text-xl md:text-2xl font-black uppercase tracking-tighter mb-4 flex items-center gap-3 relative z-10">
                                        <span className="material-symbols-outlined text-orange-500 text-2xl group-hover:rotate-12 transition-transform">bolt</span>
                                        The Challenge
                                    </h3>
                                    <p className="text-gray-600 text-sm md:text-base font-medium leading-relaxed relative z-10">
                                        {project.challenge}
                                    </p>
                                </div>
                                <div className="p-8 md:p-10 bg-emerald-50/50 border border-emerald-100 rounded-[2rem] hover:border-emerald-200 transition-all group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                    <h3 className="text-gray-900 text-xl md:text-2xl font-black uppercase tracking-tighter mb-4 flex items-center gap-3 relative z-10">
                                        <span className="material-symbols-outlined text-emerald-500 text-2xl group-hover:scale-110 transition-transform">auto_awesome</span>
                                        The Solution
                                    </h3>
                                    <p className="text-gray-600 text-sm md:text-base font-medium leading-relaxed relative z-10">
                                        {project.solution}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- Project Gallery Section --- */}
                {project.images && project.images.length > 0 && (
                    <section className="py-12 md:py-20 px-4 md:px-20 bg-slate-50 border-b border-gray-100">
                        <div className="max-w-7xl mx-auto">
                            <div className="mb-12 md:mb-16 text-center">
                                <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] md:text-xs block mb-3">Visual Showcase</span>
                                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic text-gray-900">
                                    Project <span className="text-primary">Gallery</span>
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                {project.images.map((img, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`group rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-xl border-[6px] border-white relative ${
                                            // Make every 3rd image span 2 cols for variety, or first image large
                                            index === 0 ? 'md:col-span-2 md:row-span-2 aspect-video' : 'aspect-[4/3]'
                                            }`}
                                    >
                                        <img
                                            src={getImgUrl(img)}
                                            alt={`Project Grid ${index + 1}`}
                                            className="w-full h-full object-cover transform md:group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <span className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white">
                                                <span className="material-symbols-outlined">fullscreen</span>
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* --- Features Section (Redesigned) --- */}
                {project.features && project.features.length > 0 && (
                    <section className="py-12 md:py-24 px-4 md:px-20 bg-[#0B0F19] text-white relative overflow-hidden">
                        {/* Background Elements */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

                        <div className="max-w-7xl mx-auto relative z-10">
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
                                <div>
                                    <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] md:text-xs block mb-3">Capabilities</span>
                                    <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter italic leading-none">
                                        Key <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Features</span>
                                    </h2>
                                </div>
                                <div className="hidden md:block w-32 h-[1px] bg-white/20 mb-4"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                {project.features.map((feature, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 }}
                                        className="group relative p-6 md:p-8 bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-primary/30 rounded-2xl transition-all duration-300 overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                                            <span className="material-symbols-outlined text-4xl text-primary">token</span>
                                        </div>

                                        <div className="relative z-10 flex items-start gap-4">
                                            <div className="mt-1 w-8 h-8 rounded bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                                                <span className="text-[10px] font-black">{i + 1 < 10 ? `0${i + 1}` : i + 1}</span>
                                            </div>
                                            <div>
                                                <h4 className="text-white/90 text-lg md:text-xl font-bold leading-tight group-hover:text-white transition-colors">
                                                    {feature}
                                                </h4>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* --- Results Section --- */}
                {project.results && project.results.length > 0 && (
                    <section className="py-10 md:py-20 px-4 md:px-20 bg-white">
                        <div className="max-w-7xl mx-auto text-center">
                            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter italic mb-8 md:mb-16 text-slate-300 select-none opacity-50">Impact Study</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
                                {project.results.map((result, i) => (
                                    <div key={i} className="flex flex-col items-center group">
                                        <motion.span
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500 mb-2 md:mb-4 tracking-tighter break-words"
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
                    <section className="py-12 md:py-20 px-6 md:px-20 bg-slate-50 border-y border-slate-100">
                        <div className="max-w-5xl mx-auto text-center relative">
                            <div className="text-primary/10 text-9xl md:text-[10rem] font-serif absolute -top-10 -left-10 md:-top-20 md:-left-20 pointer-events-none select-none italic">“</div>
                            <blockquote className="text-2xl md:text-4xl font-medium text-slate-800 italic leading-[1.1] md:leading-[1.1] mb-8 md:mb-12 relative z-10">
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
                <section className="py-12 md:py-20 px-4 md:px-20">
                    <div className="max-w-7xl mx-auto p-12 md:p-16 bg-slate-900 rounded-[3rem] md:rounded-[4rem] relative overflow-hidden text-center">
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

