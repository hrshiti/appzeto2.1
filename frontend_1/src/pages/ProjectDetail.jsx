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
    BarChart3,
    Users,
    Zap,
    Quote,
    Laptop,
    Mail,
    ArrowLeft,
    Loader2
} from 'lucide-react';

const ProjectDetail = () => {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                window.scrollTo(0, 0);
                const { data } = await axios.get(`http://localhost:5000/api/projects/${slug}`);
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
                    <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-white via-slate-50 to-transparent -z-10" />
                    <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] bg-[#05A4A7]/5 blur-[120px] rounded-full -z-10" />

                    <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">

                        {/* Left Content */}
                        <div className="lg:col-span-5 flex flex-col gap-10">

                            <Link to="/projects" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#05A4A7] transition-colors font-medium text-sm group">
                                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                Back to All Projects
                            </Link>

                            {/* Project Info Card (Floating) */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                                className="bg-white p-6 rounded-2xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] border border-slate-100 max-w-sm relative z-20"
                            >
                                <div className="absolute top-0 left-0 w-1 h-full bg-[#05A4A7] rounded-l-2xl" />
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Project Info</h3>
                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between items-center group">
                                        <span className="text-slate-500 font-medium">Client</span>
                                        <span className="font-bold text-slate-800 group-hover:text-[#05A4A7] transition-colors truncate max-w-[150px]">
                                            {info?.client || 'Confidential'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-500 font-medium">Year</span>
                                        <span className="font-bold text-slate-800">{info?.year || '2023'}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-500 font-medium">Category</span>
                                        <span className="font-bold text-slate-800 uppercase text-xs tracking-wider">{category}</span>
                                    </div>
                                    <div className="pt-2">
                                        <span className="text-slate-500 font-medium block mb-2 text-xs uppercase tracking-wider">Technologies</span>
                                        <div className="flex flex-wrap gap-2 text-[#05A4A7]">
                                            {techs.slice(0, 4).map((tech, i) => (
                                                <span key={i} className="bg-[#05A4A7]/10 px-2 py-1 rounded text-xs font-bold">
                                                    {tech.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Main Text Content */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                            >
                                <span className="text-[#05A4A7] font-bold tracking-[0.2em] text-xs uppercase mb-3 block pl-1">
                                    {hero?.title || title}
                                </span>
                                <h1 className="text-5xl md:text-7xl font-black text-[#012828] leading-[1.05] mb-6 tracking-tight">
                                    {hero?.subtitle || title}
                                </h1>

                                <button className="px-8 py-4 bg-[#05A4A7] text-white font-bold rounded-xl shadow-lg shadow-[#05A4A7]/25 hover:bg-[#048a8d] hover:shadow-2xl hover:shadow-[#05A4A7]/40 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 group">
                                    <div className="bg-white/20 rounded-full p-1 group-hover:bg-white/30 transition-colors">
                                        <Play size={16} className="fill-white" />
                                    </div>
                                    Start a Project
                                </button>
                            </motion.div>

                        </div>

                        {/* Right Image (Laptop Mockup) */}
                        <motion.div
                            initial={{ opacity: 0, x: 60, rotateY: 10 }}
                            animate={{ opacity: 1, x: 0, rotateY: 0 }}
                            transition={{ duration: 1, delay: 0.3, type: "spring", bounce: 0.2 }}
                            className="lg:col-span-7 relative perspective-[2000px]"
                        >
                            <div className="relative transform-gpu transition-transform hover:scale-[1.02] duration-500">
                                {/* Macbook Style Frame */}
                                <div className="relative mx-auto bg-gray-900 rounded-[1.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] border-[4px] border-gray-800 aspect-[16/10] overflow-hidden">
                                    <img
                                        src={hero?.coverImage || "https://images.unsplash.com/photo-1551288049-bebda4e38f71"}
                                        alt="Cover"
                                        className="w-full h-full object-cover opacity-90"
                                    />
                                </div>
                                {/* Base */}
                                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[110%] h-4 bg-[#e2e8f0] rounded-b-2xl shadow-xl" />
                            </div>
                        </motion.div>

                    </div>
                </section>


                {/* --- 2. PROJECT OVERVIEW --- */}
                <section className="py-20 px-6 md:px-12 lg:px-20 bg-white relative z-10">
                    <div className="max-w-[1400px] mx-auto">
                        <div className="mb-12">
                            <h2 className="text-3xl lg:text-4xl font-bold text-[#012828] mb-4">Project Overview</h2>
                            <div className="w-20 h-1.5 bg-[#05A4A7] rounded-full" />
                        </div>

                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            {/* Video Thumbnail */}
                            <motion.div
                                initial={{ opacity: 0, rotate: -2 }}
                                whileInView={{ opacity: 1, rotate: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer border-[8px] border-white ring-1 ring-slate-200 bg-slate-100"
                            >
                                <div className="aspect-video relative overflow-hidden">
                                    <img
                                        src={overview?.mediaUrl || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"}
                                        alt="Overview"
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ring-4 ring-white/30">
                                            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                                                <Play size={24} className="fill-[#05A4A7] text-[#05A4A7] ml-1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Description */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="space-y-6"
                            >
                                <p className="text-xl text-slate-800 font-medium leading-relaxed">
                                    {overview?.text?.split('.')[0] + '.'}
                                </p>
                                <p className="text-lg text-slate-600 leading-relaxed border-l-4 border-slate-200 pl-6">
                                    {overview?.text?.substring(overview?.text?.indexOf('.') + 1)}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>


                {/* --- 3. CHALLENGE & SOLUTION --- */}
                <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#001E1F] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
                    <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-8 relative z-10">

                        {/* Challenge Card */}
                        <div className="bg-[#012828] border border-white/5 p-10 md:p-12 rounded-3xl shadow-2xl relative group hover:bg-[#023131] transition-colors">
                            <div className="absolute top-8 right-8 opacity-10">
                                <ShieldCheck size={100} className="text-white" />
                            </div>
                            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4 inline-block">The Challenge</h3>
                            <p className="text-slate-300 text-lg leading-relaxed mb-6">{challenge?.description}</p>
                            <ul className="space-y-3">
                                {challenge?.points?.map((pt, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-400">
                                        <CheckCircle2 size={18} className="text-red-400 mt-1 flex-none" />
                                        <span>{pt}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Solution Card */}
                        <div className="bg-gradient-to-br from-[#05A4A7] to-[#046b6d] p-10 md:p-12 rounded-3xl shadow-2xl relative text-white">
                            <div className="absolute top-8 right-8 opacity-20">
                                <Zap size={100} className="text-white" />
                            </div>
                            <h3 className="text-2xl lg:text-3xl font-bold mb-8 border-b border-white/20 pb-4 inline-block">The Solution</h3>
                            <p className="text-white font-medium text-lg leading-relaxed mb-6">{solution?.description}</p>
                            <ul className="space-y-3">
                                {solution?.points?.map((pt, i) => (
                                    <li key={i} className="flex items-start gap-3 text-white/90">
                                        <CheckCircle2 size={18} className="text-white mt-1 flex-none" />
                                        <span>{pt}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </section>


                {/* --- 4. RESULTS & IMPACT --- */}
                <section className="py-20 px-6 md:px-12 lg:px-20 border-t border-slate-200 bg-white">
                    <div className="max-w-[1400px] mx-auto">
                        <h3 className="text-3xl font-bold text-[#012828] mb-12">Key Results</h3>
                        <div className="grid md:grid-cols-3 gap-8">
                            {results && results.length > 0 ? results.map((res, i) => (
                                <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="text-4xl font-black text-[#05A4A7] mb-2">{res.value}</div>
                                    <p className="text-lg font-bold text-slate-800">{res.label}</p>
                                </div>
                            )) : (
                                <div className="col-span-3 text-center text-slate-400">Results pending verification.</div>
                            )}
                        </div>
                    </div>
                </section>


                {/* --- 5. TESTIMONIAL --- */}
                {testimonial && (
                    <section className="px-6 md:px-12 lg:px-20 pb-24 bg-white">
                        <div className="max-w-[1400px] mx-auto bg-[#012828] rounded-[3rem] p-10 md:p-20 relative overflow-hidden shadow-2xl">
                            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                                <div className="flex-1 text-center lg:text-left">
                                    <Quote size={60} className="text-[#05A4A7] mb-8 opacity-80 mx-auto lg:mx-0" />
                                    <p className="text-2xl md:text-3xl font-semibold text-white leading-tight tracking-tight">
                                        "{testimonial.text}"
                                    </p>
                                    <div className="mt-10">
                                        <h4 className="text-xl font-bold text-white">{testimonial.author}</h4>
                                        <p className="text-[#05A4A7] font-medium tracking-wide">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* --- 6. FINAL CTA --- */}
                <section className="py-24 bg-slate-50 text-center relative overflow-hidden">
                    <div className="max-w-3xl mx-auto px-6 relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#012828] mb-8">Want a project like this for your business?</h2>
                        <div className="flex flex-col sm:flex-row justify-center gap-5">
                            <button className="px-10 py-4 bg-[#05A4A7] text-white font-bold rounded-xl shadow-xl shadow-[#05A4A7]/20 hover:shadow-2xl hover:bg-[#049194] hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                                <Laptop size={20} />
                                Start a Project
                            </button>
                            <button className="px-10 py-4 bg-[#012828] text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:bg-black hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                                <Mail size={20} />
                                Contact Us
                            </button>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </ScrollWrapper>
    );
};

export default ProjectDetail;
