import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../data/projectsData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollWrapper from '../components/ScrollWrapper';

const ProjectDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const foundProject = projectsData.find(p => p.slug === slug);
        if (!foundProject) {
            navigate('/projects');
        } else {
            setProject(foundProject);
            setCurrentImageIndex(0);
            window.scrollTo(0, 0);
        }
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

    if (!project) return null;

    return (
        <ScrollWrapper>
            <div className="bg-white min-h-screen text-gray-900 font-sans selection:bg-[#05A4A7] selection:text-white">
                <Navbar />

                {/* --- Hero Section --- */}
                <section className="relative h-[45vh] md:h-[70vh] flex items-end pb-6 px-4 md:px-20 overflow-hidden pt-12 md:pt-16">
                    <div className="absolute inset-0 z-0">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentImageIndex}
                                src={project.images ? project.images[currentImageIndex] : project.coverImage}
                                alt={project.title}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.2, ease: "easeInOut" }}
                                className="w-full h-full object-cover absolute inset-0"
                            />
                        </AnimatePresence>
                    </div>

                    <div className="max-w-7xl mx-auto w-full relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-2 py-0.5 bg-primary/10 border border-primary/20 rounded-full text-[9px] md:text-xs font-bold text-primary uppercase tracking-widest">
                                    {project.category}
                                </span>
                                <span className="text-gray-600 text-[10px] md:text-sm font-semibold tracking-wide capitalize">
                                    {project.industry}
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] italic mb-3 text-gray-900">
                                {project.title.split(' ').slice(0, -1).join(' ')} <br />
                                <span className="text-primary">{project.title.split(' ').pop()}</span>
                            </h1>
                            <p className="max-w-md text-gray-700 text-xs md:text-lg font-medium leading-relaxed opacity-90">
                                {project.subtitle}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* --- Project Metadata & Overview --- */}
                <section className="py-8 md:py-20 px-4 md:px-20 border-b border-gray-100">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20">
                        {/* Sidebar Info */}
                        <div className="md:col-span-4">
                            <div className="grid grid-cols-2 md:grid-cols-1 gap-6 md:gap-10">
                                <div className="space-y-1">
                                    <p className="text-primary text-[9px] md:text-xs font-black uppercase tracking-widest">Client</p>
                                    <p className="text-gray-900 text-sm md:text-xl font-bold">{project.client}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-primary text-[9px] md:text-xs font-black uppercase tracking-widest">Year</p>
                                    <p className="text-gray-900 text-sm md:text-xl font-bold">{project.year}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-primary text-[9px] md:text-xs font-black uppercase tracking-widest">Industry</p>
                                    <p className="text-gray-900 text-sm md:text-xl font-bold">{project.industry}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-primary text-[9px] md:text-xs font-black uppercase tracking-widest">Tech Stack</p>
                                    <div className="flex flex-wrap gap-x-2 gap-y-1">
                                        {project.tags.map((tag, i) => (
                                            <span key={tag} className="text-gray-600 text-[10px] md:text-sm font-semibold">
                                                {tag}{i !== project.tags.length - 1 ? ' • ' : ''}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Description */}
                        <div className="md:col-span-8 space-y-10">
                            <div>
                                <h2 className="text-lg md:text-3xl font-black uppercase tracking-tighter mb-3 text-gray-900">Overview</h2>
                                <p className="text-gray-600 text-sm md:text-xl font-medium leading-relaxed opacity-90">
                                    {project.fullDescription}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                                <div className="p-6 md:p-8 bg-gray-50 border border-gray-100 rounded-2xl md:rounded-3xl hover:border-primary/30 transition-all">
                                    <h3 className="text-gray-900 text-lg md:text-2xl font-black uppercase tracking-tighter mb-3 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-base md:text-2xl">psychology</span>
                                        Challenge
                                    </h3>
                                    <p className="text-gray-600 text-xs md:text-base font-medium leading-relaxed">
                                        {project.challenge}
                                    </p>
                                </div>
                                <div className="p-5 md:p-8 bg-gray-50 border border-gray-100 rounded-xl md:rounded-3xl hover:border-emerald-500/30 transition-all">
                                    <h3 className="text-gray-900 text-base md:text-2xl font-black uppercase tracking-tighter mb-2 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-emerald-500 text-sm md:text-2xl">verified</span>
                                        Solution
                                    </h3>
                                    <p className="text-gray-600 text-[10px] md:text-base font-medium leading-relaxed">
                                        {project.solution}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- Features Section --- */}
                <section className="py-10 md:py-24 px-4 md:px-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-8 md:mb-16">
                            <span className="text-primary text-[9px] md:text-xs font-black uppercase tracking-widest block mb-1">Core Functionality</span>
                            <h2 className="text-xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter italic text-gray-900">Key <span className="text-primary">Features</span></h2>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                            {project.features.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -5 }}
                                    className="p-4 md:p-8 border border-gray-100 rounded-xl md:rounded-[2rem] bg-white h-full shadow-sm"
                                >
                                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-3 md:mb-6">
                                        <span className="material-symbols-outlined text-sm md:text-xl">auto_awesome</span>
                                    </div>
                                    <h4 className="text-gray-900 text-[10px] md:text-xl font-bold mb-2 leading-tight">{feature}</h4>
                                    <div className="w-8 h-1 bg-primary/20 rounded-full"></div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- Results Section --- */}
                <section className="py-10 md:py-24 px-4 md:px-20 overflow-hidden relative border-b border-gray-100">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/5 rounded-full blur-[80px] md:blur-[150px] pointer-events-none"></div>

                    <div className="max-w-7xl mx-auto relative z-10 text-center">
                        <h2 className="text-3xl md:text-7xl font-black uppercase tracking-tighter leading-none italic mb-8 md:mb-16 opacity-10 text-gray-900 select-none">THE RESULTS</h2>

                        <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 md:gap-12">
                            {project.results.map((result, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <span className="text-xl md:text-5xl lg:text-6xl font-black text-primary mb-0.5 md:mb-2">{result.split(' ')[0]}</span>
                                    <p className="text-gray-600 text-[7px] md:text-base font-bold uppercase tracking-widest leading-tight">{result.split(' ').slice(1).join(' ')}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- Client Testimonial Section --- */}
                {project.testimonial && (
                    <section className="py-20 md:py-32 px-5 md:px-20 bg-white overflow-hidden">
                        <div className="max-w-5xl mx-auto relative">
                            {/* Large Quote Icon Background */}
                            <div className="absolute -top-10 -left-10 text-primary/5 text-[15rem] font-serif select-none pointer-events-none">“</div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                className="relative z-10 text-center"
                            >
                                <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-8 block">Client Voice</span>
                                <blockquote className="text-2xl md:text-5xl font-medium text-gray-900 italic leading-tight md:leading-tight tracking-tight mb-12">
                                    "{project.testimonial.text}"
                                </blockquote>
                                <div className="flex flex-col items-center">
                                    <div className="w-16 md:w-24 h-[2px] bg-primary/20 mb-8"></div>
                                    <h4 className="text-xl md:text-3xl font-black text-gray-900 uppercase tracking-tighter">{project.testimonial.author}</h4>
                                    <p className="text-primary text-xs md:text-base font-bold uppercase tracking-widest mt-2">{project.testimonial.role}</p>
                                </div>
                            </motion.div>
                        </div>
                    </section>
                )}

                {/* --- CTA Section --- */}
                <section className="pb-20 md:pb-32 px-4 md:px-20">
                    <div className="max-w-7xl mx-auto p-8 md:p-24 bg-gradient-to-br from-[#05A4A7] to-emerald-600 rounded-[2rem] md:rounded-[3rem] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                        <div className="relative z-10 text-center space-y-6">
                            <h2 className="text-2xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none italic">
                                Ready to build <br /> your next project?
                            </h2>
                            <p className="text-white/80 text-[10px] md:text-xl font-medium max-w-xl mx-auto tracking-wide">
                                Let's transform your vision into an industry-leading reality.
                            </p>
                            <Link to="/contact">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="mt-6 px-6 py-3 md:px-12 md:py-6 bg-white text-[#05A4A7] rounded-full font-black uppercase tracking-widest text-[10px] md:text-base hover:bg-gray-900 hover:text-white transition-all shadow-xl shadow-black/10"
                                >
                                    Start a Conversation
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
