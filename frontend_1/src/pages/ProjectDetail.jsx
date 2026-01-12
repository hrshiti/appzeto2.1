import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollWrapper from '../components/ScrollWrapper';
import {
    Play,
    CheckCircle2,
    ShieldCheck,
    Zap,
    Quote,
    Laptop,
    Mail,
    ArrowLeft,
    Loader2,
    Calendar,
    Clock,
    User,
    Layers
} from 'lucide-react';

const ProjectDetail = () => {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                window.scrollTo(0, 0);
                const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/projects/${slug}`);
                if (data.success) {
                    setProject(data.data);
                }
            } catch (error) {
                console.error("Fetch Project Failed:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProject();
    }, [slug]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="animate-spin text-[#05A4A7]" size={40} />
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 flex-col">
                <h2 className="text-3xl font-bold text-slate-800">Project Not Found</h2>
                <Link to="/projects" className="text-[#05A4A7] mt-4 font-medium hover:underline">Back to Projects</Link>
            </div>
        );
    }

    // Dynamic Data extraction from DB Schema
    const {
        title,
        category,
        hero,
        info,
        overview,
        challenge,
        solution,
        results,
        testimonial
    } = project;

    const techs = info?.technologies || [];

    return (
        <ScrollWrapper>
            <div className="bg-[#F8FAFC] min-h-screen font-sans text-slate-800 selection:bg-[#05A4A7] selection:text-white overflow-x-hidden">
                <Navbar />

                {/* --- 1. HERO SECTION --- */}
                <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-20 overflow-hidden">
                    {/* Background Decor */}
                    <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-white via-slate-50/50 to-transparent -z-10" />

                    {/* Clean Background */}
                    <div className="absolute top-[-200px] right-[-100px] w-[800px] h-[800px] bg-[#05A4A7]/5 blur-[120px] rounded-full -z-10 opacity-60" />

                    <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">

                        {/* Left Content */}
                        <div className="lg:col-span-5 flex flex-col gap-8 order-2 lg:order-1">

                            <div className="flex flex-col gap-6">
                                <Link to="/projects" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#05A4A7] transition-colors font-medium text-sm group w-fit">
                                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                    Back to All Projects
                                </Link>

                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, ease: "easeOut" }}
                                >
                                    <span className="text-[#05A4A7] font-bold tracking-[0.2em] text-xs uppercase mb-3 block pl-1">
                                        {hero?.title || title}
                                    </span>
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#012828] leading-[1.1] mb-8 tracking-tight">
                                        {hero?.subtitle || title}
                                    </h1>

                                    <Link to="/contact" className="px-6 py-3 bg-[#05A4A7] text-white font-bold rounded-lg shadow-lg shadow-[#05A4A7]/20 hover:bg-[#048a8d] hover:shadow-xl hover:shadow-[#05A4A7]/30 hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center gap-2 group text-sm">
                                        <div className="bg-white/20 rounded-full p-1 group-hover:bg-white/30 transition-colors">
                                            <Play size={12} className="fill-white" />
                                        </div>
                                        Start a Project
                                    </Link>
                                </motion.div>
                            </div>

                            {/* Project Info - Boxed Layout (Vertical) */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                                className="mt-4 bg-white rounded-xl border border-slate-200 shadow-sm p-6"
                            >
                                <div className="flex flex-col gap-6 divide-y divide-slate-100">

                                    {/* Client */}
                                    <div className="flex items-center justify-between pb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                                                <User size={18} />
                                            </div>
                                            <div>
                                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Client</h4>
                                                <p className="font-bold text-slate-800 text-sm">{info?.client || 'Confidential'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Year */}
                                    <div className="flex items-center justify-between py-2">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                                                <Calendar size={18} />
                                            </div>
                                            <div>
                                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Year</h4>
                                                <p className="font-bold text-slate-800 text-sm">{info?.year || '2023'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Duration */}
                                    <div className="flex items-center justify-between py-2">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                                                <Clock size={18} />
                                            </div>
                                            <div>
                                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Duration</h4>
                                                <p className="font-bold text-slate-800 text-sm">{info?.duration || 'Ongoing'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Technologies */}
                                    <div className="pt-2">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                                                <Layers size={18} />
                                            </div>
                                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Technologies</h4>
                                        </div>
                                        <div className="flex flex-wrap gap-2 pl-12">
                                            {techs.map((tech, i) => (
                                                <span key={i} className="bg-[#05A4A7]/10 text-[#05A4A7] px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide">
                                                    {tech.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                        </div>

                        {/* Right Image (Laptop Mockup - CSS 3D Styled) */}
                        <motion.div
                            initial={{ opacity: 0, x: 60, rotateY: -20, rotateX: 10 }}
                            animate={{ opacity: 1, x: 0, rotateY: -12, rotateX: 6 }}
                            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                            className="lg:col-span-7 flex justify-center items-center relative order-1 lg:order-2 perspective-1000"
                            style={{
                                perspective: "1500px",
                                transformStyle: "preserve-3d"
                            }}
                        >
                            <div className="relative w-full max-w-[700px] transform-gpu transition-all duration-500 hover:rotate-y-[-5deg] hover:rotate-x-[5deg]">
                                {/* Laptop Body (White Minimalist) */}
                                <div className="relative bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-3 md:p-4 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.25)] border-[1px] border-slate-100 ring-1 ring-black/5">

                                    {/* Screen Bezel (Thin Black) */}
                                    <div className="relative bg-black rounded-[1rem] md:rounded-[2rem] overflow-hidden aspect-[16/10] shadow-inner ring-1 ring-black/20">
                                        {/* Camera Notch Area (Subtle) */}
                                        <div className="absolute top-2 md:top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-b-xl z-20 flex justify-center">
                                            <div className="w-1.5 h-1.5 bg-[#1a1a1a] rounded-full mt-1.5 ring-1 ring-white/10" />
                                        </div>

                                        {/* Screen Content */}
                                        <div className="w-full h-full bg-slate-900 border-[6px] md:border-[10px] border-black relative group overflow-hidden">
                                            <img
                                                src={hero?.coverImage || "https://images.unsplash.com/photo-1551288049-bebda4e38f71"}
                                                alt="Project Screen"
                                                className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
                                            />

                                            {/* Screen Glare & Reflection */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-40 mix-blend-overlay pointer-events-none" />
                                            <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover:animate-shine" />
                                        </div>
                                    </div>

                                    {/* Bottom Reflection/Depth Indicator */}
                                    <div className="absolute bottom-0 left-8 right-8 h-px bg-slate-200/50" />
                                </div>

                                {/* Laptop Base (Bottom Half - Perspective Hint) */}
                                <div className="absolute -bottom-3 md:-bottom-5 left-4 md:left-8 right-4 md:right-8 h-4 md:h-6 bg-[#f1f5f9] rounded-b-2xl md:rounded-b-3xl shadow-2xl -z-10 border-t border-slate-200/50 flex items-center justify-center">
                                    <div className="w-1/3 h-1 md:h-1.5 bg-slate-200/50 rounded-full mt-1" />
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </section>


                {/* --- 2. PROJECT OVERVIEW --- */}
                <section className="py-20 px-6 md:px-12 lg:px-20 bg-white relative z-10">
                    <div className="absolute inset-0 bg-[radial-gradient(#05A4A7_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.03]" />

                    <div className="max-w-[1400px] mx-auto relative z-10">
                        <div className="mb-12">
                            <h2 className="text-3xl lg:text-4xl font-bold text-[#012828] mb-4">Project Overview</h2>
                            <div className="w-20 h-1.5 bg-[#05A4A7] rounded-full" />
                        </div>

                        <div className="grid lg:grid-cols-2 gap-16 items-start">
                            {/* Video Thumbnail */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer ring-1 ring-slate-900/5 aspect-video"
                            >
                                <img
                                    src={overview?.mediaUrl || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"}
                                    alt="Overview"
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ring-1 ring-white/50 shadow-2xl">
                                        <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-sm">
                                            <Play size={20} className="fill-[#05A4A7] text-[#05A4A7] ml-0.5" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Description */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="space-y-6"
                            >
                                <p className="text-2xl text-slate-800 font-semibold leading-relaxed tracking-tight">
                                    {overview?.text?.split('.')[0] + '.'}
                                </p>
                                <p className="text-lg text-slate-500 leading-relaxed pl-6 border-l-2 border-[#05A4A7]/30">
                                    {overview?.text?.substring(overview?.text?.indexOf('.') + 1)}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>


                {/* --- 3. CHALLENGE & SOLUTION --- */}
                <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#001E1F] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
                    {/* Glowing Orbs */}
                    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#05A4A7]/10 blur-[150px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#05A4A7]/10 blur-[150px] rounded-full pointer-events-none" />

                    <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-8 relative z-10">

                        {/* Challenge Card */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 md:p-12 rounded-3xl shadow-2xl relative group hover:bg-white/[0.07] transition-colors">
                            <div className="absolute top-8 right-8 opacity-20 group-hover:opacity-30 transition-opacity">
                                <ShieldCheck size={80} className="text-white" />
                            </div>
                            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4 inline-block">The Challenge</h3>
                            <p className="text-slate-300 text-lg leading-relaxed mb-8 font-light">{challenge?.description}</p>
                            <ul className="space-y-4">
                                {challenge?.points?.map((pt, i) => (
                                    <li key={i} className="flex items-start gap-4 text-slate-300">
                                        <div className="mt-1 p-0.5 bg-red-400/20 rounded-full">
                                            <CheckCircle2 size={16} className="text-red-400 flex-none" />
                                        </div>
                                        <span>{pt}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Solution Card */}
                        <div className="bg-gradient-to-br from-[#05A4A7] to-[#036a6c] p-10 md:p-12 rounded-3xl shadow-2xl relative text-white">
                            <div className="absolute top-8 right-8 opacity-20">
                                <Zap size={80} className="text-white" />
                            </div>
                            <h3 className="text-2xl lg:text-3xl font-bold mb-8 border-b border-white/20 pb-4 inline-block">The Solution</h3>
                            <p className="text-white/90 font-medium text-lg leading-relaxed mb-8">{solution?.description}</p>
                            <ul className="space-y-4">
                                {solution?.points?.map((pt, i) => (
                                    <li key={i} className="flex items-start gap-4 text-white/95">
                                        <div className="mt-1 p-0.5 bg-white/20 rounded-full">
                                            <CheckCircle2 size={16} className="text-white flex-none" />
                                        </div>
                                        <span>{pt}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </section>


                {/* --- 4. RESULTS & IMPACT --- */}
                <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-slate-100 bg-slate-50 relative">
                    <div className="absolute inset-0 bg-[radial-gradient(#05A4A7_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.02]" />
                    <div className="max-w-[1400px] mx-auto relative z-10">
                        <div className="text-center mb-16">
                            <h3 className="text-3xl lg:text-4xl font-bold text-[#012828] mb-4">Key Results</h3>
                            <p className="text-slate-500 max-w-2xl mx-auto">Measurable impact delivered through our solution.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {results && results.length > 0 ? results.map((res, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -5 }}
                                    className="bg-white p-10 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-[#05A4A7]/10 transition-all duration-300 text-center flex flex-col items-center justify-center"
                                >
                                    <div className="text-5xl font-black text-[#05A4A7] mb-4 bg-clip-text text-transparent bg-gradient-to-br from-[#05A4A7] to-[#02595a]">{res.value}</div>
                                    <p className="text-lg font-bold text-slate-700 uppercase tracking-wide text-sm">{res.label}</p>
                                </motion.div>
                            )) : (
                                <div className="col-span-3 text-center text-slate-400 italic">Results pending verification.</div>
                            )}
                        </div>
                    </div>
                </section>


                {/* --- 5. TESTIMONIAL --- */}
                {testimonial && (
                    <section className="px-6 md:px-12 lg:px-20 pb-24 bg-slate-50">
                        <div className="max-w-[1400px] mx-auto bg-[#012828] rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
                            {/* Decorative quotes */}
                            <Quote size={120} className="text-white/5 absolute top-10 left-10 rotate-180" />

                            <div className="relative z-10 text-center max-w-4xl mx-auto">
                                <p className="text-2xl md:text-4xl font-semibold text-white leading-tight tracking-tight mb-12">
                                    "{testimonial.text}"
                                </p>
                                <div className="flex flex-col items-center gap-2">
                                    <h4 className="text-xl font-bold text-white">{testimonial.author}</h4>
                                    <p className="text-[#05A4A7] font-medium tracking-wide uppercase text-sm">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* --- 6. FINAL CTA --- */}
                <section className="py-32 bg-white text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,theme(colors.slate.50)_0%,white_100%)]" />
                    <div className="max-w-3xl mx-auto px-6 relative z-10">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#012828] mb-10 tracking-tight">Ready to build something <span className="text-[#05A4A7]">amazing?</span></h2>
                        <div className="flex flex-col sm:flex-row justify-center gap-5">
                            <Link to="/contact" className="px-8 py-4 bg-[#05A4A7] text-white font-bold rounded-xl shadow-xl shadow-[#05A4A7]/20 hover:shadow-2xl hover:bg-[#049194] hover:-translate-y-1 transition-all flex items-center justify-center gap-2.5">
                                <Laptop size={20} />
                                Start a Project
                            </Link>
                            <Link to="/contact" className="px-8 py-4 bg-white text-[#012828] border-2 border-[#012828] font-bold rounded-xl shadow-lg hover:bg-[#012828] hover:text-white hover:-translate-y-1 transition-all flex items-center justify-center gap-2.5">
                                <Mail size={20} />
                                Contact Us
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
