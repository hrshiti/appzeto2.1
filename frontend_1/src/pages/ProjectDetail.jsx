import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollWrapper from '../components/ScrollWrapper';
import laptopLayout from '../assets/laptoplayout.png';
import * as LucideIcons from 'lucide-react';

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
                <LucideIcons.Loader2 className="animate-spin text-[#05A4A7]" size={40} />
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

    // Dynamic Data extraction
    const {
        title,
        category,
        shortDescription,
        hero,
        info,
        overview,
        challenge,
        solution,
        results,
        testimonial,
        mediaShowcase
    } = project;

    const techs = info?.technologies || [];

    const DynamicIcon = ({ name, className, size = 24 }) => {
        const IconComponent = LucideIcons[name] || LucideIcons.CheckCircle2;
        return <IconComponent className={className} size={size} />;
    };

    return (
        <ScrollWrapper>
            <Navbar />
            <div className="bg-[#F8FAFC] font-sans text-slate-800 selection:bg-[#05A4A7] selection:text-white">

                {/* --- 1. HERO SECTION (3-Column Layout: Info Card | Text | Image) --- */}
                <section className="relative pt-32 pb-16 px-6 md:px-12 lg:px-20 overflow-hidden min-h-[85vh] flex items-center">
                    {/* Background Decor */}
                    <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-white via-slate-50/50 to-transparent -z-10" />
                    <div className="absolute top-[-200px] right-[-100px] w-[800px] h-[800px] bg-[#05A4A7]/5 blur-[120px] rounded-full -z-10 opacity-60" />

                    <div className="max-w-[1500px] mx-auto w-full relative z-10">
                        {/* Back Button positioned top-left */}
                        <div className="mb-8">
                            <Link to="/projects" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#05A4A7] transition-colors font-bold text-xs uppercase tracking-widest group">
                                <span className="p-2 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all border border-slate-100">
                                    <LucideIcons.ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                </span>
                                Back to Projects
                            </Link>
                        </div>

                        <div className="grid lg:grid-cols-12 gap-8 items-center">

                            {/* COLUMN 1: Project Info Card (Left) */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="lg:col-span-3 order-2 lg:order-1"
                            >
                                <div className="bg-white rounded-xl shadow-xl shadow-slate-200/60 p-6 border border-slate-100/80 backdrop-blur-sm relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 w-full max-w-sm mx-auto lg:mx-0">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-[#05A4A7]" />
                                    <h3 className="font-bold text-lg text-slate-800 mb-6 flex items-center gap-2">
                                        Project Info
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Client</h4>
                                            <p className="font-semibold text-slate-700 text-sm">{info?.client || 'Confidential'}</p>
                                        </div>
                                        <div className="w-full h-px bg-slate-50" />
                                        <div>
                                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Year</h4>
                                            <p className="font-semibold text-slate-700 text-sm">{info?.year || '2023'}</p>
                                        </div>
                                        <div className="w-full h-px bg-slate-50" />
                                        <div>
                                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Duration</h4>
                                            <p className="font-semibold text-slate-700 text-sm">{info?.duration || 'Ongoing'}</p>
                                        </div>
                                        <div className="w-full h-px bg-slate-50" />
                                        <div>
                                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Technologies</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {techs.map((tech, i) => (
                                                    <div key={i} className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 text-slate-700 rounded-md text-[11px] font-bold uppercase tracking-wide border border-slate-100">
                                                        <DynamicIcon name={tech.icon} size={14} className="text-[#05A4A7]" />
                                                        <span>{tech.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* COLUMN 2: Main Text Content (Center) */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="lg:col-span-4 flex flex-col justify-center order-1 lg:order-2 text-center lg:text-left mb-8 lg:mb-0"
                            >
                                <div className="text-xs font-bold text-[#05A4A7] tracking-[0.2em] uppercase mb-3 text-center lg:text-left">
                                    {category} <span className="text-slate-300 px-2">|</span> {project.industry}
                                </div>

                                <h1 className="text-4xl md:text-5xl font-black text-[#012828] leading-[1.1] mb-6 tracking-tight text-center lg:text-left">
                                    {hero?.title || title}
                                </h1>

                                <p className="text-base text-slate-600 mb-8 leading-relaxed max-w-md mx-auto lg:mx-0 text-center lg:text-left">
                                    {hero?.subtitle || shortDescription || "A innovative solution tailored to specific business needs."}
                                </p>

                                <div className="flex gap-4 justify-center lg:justify-start">
                                    <Link to="/contact" className="px-8 py-3.5 bg-[#05A4A7] text-white font-bold rounded-lg shadow-lg hover:bg-[#048a8d] hover:-translate-y-1 transition-all text-sm flex items-center gap-2 group">
                                        <LucideIcons.Play size={16} className="fill-white group-hover:scale-110 transition-transform" />
                                        Start a Project
                                    </Link>
                                </div>
                            </motion.div>

                            {/* COLUMN 3: Laptop Image (Right) */}
                            <motion.div
                                initial={{ opacity: 0, x: 40, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="lg:col-span-5 relative order-3 lg:order-3"
                            >
                                <div className="relative w-full aspect-[16/10] max-w-[600px] mx-auto lg:ml-auto">
                                    {/* Laptop Frame */}
                                    <img
                                        src={laptopLayout}
                                        alt="Laptop Layout"
                                        className="w-full h-full object-contain relative z-20 drop-shadow-2xl"
                                    />
                                    {/* Screen Content */}
                                    <div className="absolute top-[11%] left-[13%] w-[74%] h-[78%] bg-black z-30 overflow-hidden rounded-[2px] lg:rounded-md flex items-center justify-center">
                                        <img
                                            src={hero?.coverImage || "https://images.unsplash.com/photo-1551288049-bebda4e38f71"}
                                            alt="Project Screen"
                                            className="w-full h-full object-contain"
                                        />
                                        {/* Glare */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-30 pointer-events-none" />
                                    </div>
                                </div>
                            </motion.div>

                        </div>
                    </div>
                </section>

                {/* --- 2. OVERVIEW (Reduced Padding) --- */}
                <section className="py-12 px-6 md:px-12 lg:px-20 bg-white relative">
                    <div className="max-w-[1400px] mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="order-2 lg:order-1"
                        >
                            <div className="w-10 h-1 bg-[#05A4A7] mb-4" />
                            <h2 className="text-2xl md:text-3xl font-bold text-[#012828] mb-4">Project Overview</h2>
                            <div className="space-y-4 text-base md:text-lg text-slate-600 leading-relaxed">
                                <p className="font-medium text-slate-800">{overview?.text?.split('.')[0]}.</p>
                                <p>{overview?.text?.substring(overview?.text?.indexOf('.') + 1)}</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="order-1 lg:order-2 relative rounded-xl overflow-hidden shadow-xl aspect-video group"
                        >
                            {overview?.mediaType === 'video' ? (
                                <video src={overview?.mediaUrl} className="w-full h-full object-cover" controls playsInline />
                            ) : (
                                <img src={overview?.mediaUrl} alt="Overview" className="w-full h-full object-cover" />
                            )}
                        </motion.div>
                    </div>
                </section>

                {/* --- 3. CHALLENGE & SOLUTION (Reduced Padding) --- */}
                <section className="py-12 px-6 md:px-12 lg:px-20 bg-[#001E1F] relative">
                    <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                    <div className="max-w-[1400px] mx-auto w-full grid md:grid-cols-2 gap-6 relative z-10">
                        {/* Challenge */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white/5 backdrop-blur border border-white/10 p-6 md:p-10 rounded-2xl"
                        >
                            <div className="flex items-center gap-3 mb-4 text-white border-b border-white/10 pb-3">
                                <LucideIcons.ShieldCheck size={28} className="text-red-400" />
                                <h3 className="text-xl md:text-2xl font-bold">The Challenge</h3>
                            </div>
                            <p className="text-slate-300 mb-6 leading-relaxed text-sm md:text-base">{challenge?.description}</p>
                            <ul className="space-y-2.5">
                                {challenge?.points?.map((pt, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                                        <LucideIcons.XCircle size={16} className="text-red-400 mt-0.5 flex-none" />
                                        <span>{pt}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Solution */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-gradient-to-br from-[#05A4A7] to-[#026466] p-6 md:p-10 rounded-2xl shadow-xl"
                        >
                            <div className="flex items-center gap-3 mb-4 text-white border-b border-white/20 pb-3">
                                <LucideIcons.Zap size={28} className="text-yellow-300" />
                                <h3 className="text-xl md:text-2xl font-bold">The Solution</h3>
                            </div>
                            <p className="text-white/90 mb-6 leading-relaxed text-sm md:text-base">{solution?.description}</p>
                            <ul className="space-y-2.5">
                                {solution?.points?.map((pt, i) => (
                                    <li key={i} className="flex items-start gap-3 text-white text-sm">
                                        <LucideIcons.CheckCircle2 size={16} className="text-white mt-0.5 flex-none" />
                                        <span>{pt}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </section>

                {/* --- 4. MEDIA SHOWCASE (Reduced Padding) --- */}
                {mediaShowcase && (mediaShowcase.mediaUrl || (mediaShowcase.items && mediaShowcase.items.length > 0)) && (
                    <section className="py-12 px-6 md:px-12 lg:px-20 bg-slate-50">
                        <div className="max-w-[1400px] mx-auto w-full">
                            <div className="text-center mb-10">
                                <h2 className="text-2xl md:text-3xl font-bold text-[#012828]">Media & Features</h2>
                                <div className="w-12 h-1 bg-[#05A4A7] mx-auto mt-3 rounded-full" />
                            </div>

                            <div className="grid lg:grid-cols-2 gap-10 items-center">
                                {/* Media */}
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl ring-4 ring-white bg-white"
                                >
                                    {mediaShowcase.mediaType === 'video' ? (
                                        <video src={mediaShowcase.mediaUrl} className="w-full h-full object-cover" controls />
                                    ) : (
                                        <img src={mediaShowcase.mediaUrl} alt="Showcase" className="w-full h-full object-cover" />
                                    )}
                                </motion.div>

                                {/* Features Grid */}
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {mediaShowcase.items?.map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            viewport={{ once: true }}
                                            className="p-5 bg-white border border-slate-100 rounded-lg shadow-md hover:border-[#05A4A7]/30 transition-all group"
                                        >
                                            <div className="w-9 h-9 bg-[#05A4A7]/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#05A4A7] transition-colors">
                                                <DynamicIcon name={item.icon} className="text-[#05A4A7] group-hover:text-white transition-colors" size={18} />
                                            </div>
                                            <h4 className="font-bold text-slate-800 text-sm md:text-base">{item.label}</h4>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* --- 5. RESULTS & TESTIMONIALS (Reduced Padding) --- */}
                <section className="py-16 px-6 md:px-12 lg:px-20 bg-white">
                    <div className="max-w-[1400px] mx-auto w-full">
                        {/* Results */}
                        <div className="mb-14">
                            <h3 className="text-xl md:text-2xl font-bold text-center text-[#012828] mb-8">Impact Summary</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                                {results?.map((res, i) => (
                                    <div key={i} className="text-center p-4 border-r border-slate-100 last:border-0">
                                        <div className="text-3xl md:text-4xl font-black text-[#05A4A7] mb-1">{res.value}</div>
                                        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{res.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Testimonial & CTA */}
                        {testimonial && (
                            <div className="bg-[#012828] rounded-[2rem] p-8 md:p-12 relative overflow-hidden text-center shadow-2xl">
                                <LucideIcons.Quote size={60} className="text-white/5 absolute top-6 left-6 rotate-180" />
                                <div className="relative z-10 max-w-3xl mx-auto">
                                    <p className="text-xl md:text-2xl font-serif text-white leading-tight mb-6">"{testimonial.text}"</p>
                                    <div className="mb-8">
                                        <div className="font-bold text-white text-base">{testimonial.author}</div>
                                        <div className="text-[#05A4A7] text-xs font-medium uppercase">{testimonial.role}</div>
                                    </div>
                                    <Link to="/contact" className="inline-flex items-center gap-3 px-6 py-3.5 bg-white text-[#012828] font-bold rounded-lg hover:scale-105 transition-transform text-sm">
                                        <LucideIcons.MessageSquare size={18} /> Let's Discuss Your Project
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                <Footer />
            </div>
        </ScrollWrapper>
    );
};

export default ProjectDetail;
