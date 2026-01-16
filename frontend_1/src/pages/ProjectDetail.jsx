import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
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

    // --- SUB-COMPONENT: Word Level Scroll Reveal ---
    const Word = ({ children, progress, range }) => {
        const opacity = useTransform(progress, range, [0.2, 1]);
        return (
            <span className="relative inline-block mr-1.5 align-top">
                <motion.span style={{ opacity }}>
                    {children}
                </motion.span>
            </span>
        );
    };

    const ParagraphReveal = ({ text }) => {
        const container = useRef(null);
        const { scrollYProgress } = useScroll({
            target: container,
            offset: ["start 0.8", "start 0.3"]
        });

        const words = (text || "").split(" ");
        return (
            <p ref={container} className="flex flex-wrap text-xl md:text-2xl lg:text-3xl font-medium leading-[1.4] text-slate-900 tracking-tight">
                {words.map((word, i) => {
                    const start = i / words.length;
                    const end = start + (1 / words.length);
                    return (
                        <Word key={i} progress={scrollYProgress} range={[start, end]}>
                            {word}
                        </Word>
                    );
                })}
            </p>
        );
    };

    return (
        <ScrollWrapper>
            <Navbar />
            <div className="bg-[#F8FAFC] font-sans text-slate-800 selection:bg-[#05A4A7] selection:text-white">

                {/* --- 1. HERO SECTION (Redesigned: Compact & Pixel Perfect) --- */}
                <section className="relative pt-20 pb-0 lg:pt-36 lg:pb-0 px-3 md:px-12 lg:px-16 overflow-hidden min-h-fit lg:min-h-[500px] flex items-center bg-slate-50">
                    {/* Background Decor */}
                    <div className="absolute inset-0 w-full h-full bg-slate-50 lg:bg-gradient-to-r lg:from-slate-100/50 lg:via-white lg:to-slate-50/50 -z-20" />
                    {/* Soft blurred circle behind text/laptop */}
                    <div className="absolute top-[10%] right-[-5%] w-[600px] h-[600px] bg-[#05A4A7]/10 blur-[100px] rounded-full -z-10 opacity-60 pointer-events-none" />



                    <div className="max-w-[1300px] mx-auto w-full relative z-10">
                        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                            {/* COLUMN 1: Project Info Card (Floating Left) */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="lg:col-span-3 order-2 lg:order-1"
                            >
                                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] border border-white p-6 relative group hover:-translate-y-1 transition-transform duration-300 w-full max-w-sm mx-auto lg:mx-0">
                                    <h3 className="font-bold text-lg text-slate-800 mb-3 md:mb-5 pb-2 md:pb-3 border-b border-slate-100">
                                        Project Info
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-0 md:space-y-4">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Client</span>
                                            <span className="font-medium text-slate-700 text-sm">{info?.client || 'Confidential'}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Year</span>
                                            <span className="font-medium text-slate-700 text-sm">{info?.year || '2023'}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Duration</span>
                                            <span className="font-medium text-slate-700 text-sm">{info?.duration || 'Ongoing'}</span>
                                        </div>
                                        <div className="pt-0 md:pt-2 col-span-2 md:col-span-1">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Technologies</span>
                                            <div className="flex flex-wrap gap-2">
                                                {techs.map((tech, i) => (
                                                    <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg border border-slate-200 text-xs font-semibold hover:border-[#05A4A7] hover:text-[#05A4A7] transition-colors">
                                                        <DynamicIcon name={tech.icon} size={14} />
                                                        <span>{tech.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* COLUMN 2: Main Text Content (Center-Left) */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                                className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left order-1 lg:order-2"
                            >
                                <div className="text-[11px] font-bold text-slate-500 tracking-[0.2em] uppercase mb-3">
                                    {category} <span className="text-slate-300 px-1">|</span> {project.industry}
                                </div>

                                <h1 className="text-3xl lg:text-[42px] font-black text-[#012828] leading-[1.1] mb-3 md:mb-5 tracking-tight">
                                    {hero?.title || title}
                                </h1>

                                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                                    {/* Existing Subtitle */}
                                    <p className="text-[15px] text-slate-500 mb-8 leading-relaxed max-w-md lg:max-w-none w-full">
                                        {hero?.subtitle || shortDescription || "A cutting-edge platform for seamless transactions."}
                                    </p>

                                    {/* Conditional Visit Webpage Button */}
                                    {hero?.liveUrl && hero?.showLiveLink && (
                                        <a
                                            href={hero.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#05A4A7] text-white rounded-full font-bold shadow-lg shadow-teal-500/20 hover:-translate-y-1 hover:shadow-teal-500/40 transition-all text-sm group mb-8"
                                        >
                                            <span>Visit Webpage</span>
                                            <LucideIcons.ExternalLink size={16} className="group-hover:rotate-45 transition-transform" />
                                        </a>
                                    )}
                                </div>

                                <Link
                                    to="/chit-chat#chitchat-form"
                                    className="px-8 py-3 bg-gradient-to-r from-[#05A4A7] to-[#048a8d] text-white font-bold rounded shadow-lg shadow-[#05A4A7]/25 hover:shadow-xl hover:shadow-[#05A4A7]/30 hover:-translate-y-0.5 transition-all text-sm flex items-center gap-2"
                                >
                                    <LucideIcons.Play fill="currentColor" size={12} />
                                    <span>Start a Project</span>
                                </Link>
                            </motion.div>

                            {/* COLUMN 3: Vertical Phone Image (Right - Angled) */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                                className="lg:col-span-4 relative order-3 lg:order-3 w-full flex justify-center lg:justify-end mt-8 lg:mt-0"
                            >
                                <div className="relative w-[220px] md:w-[280px] mx-auto lg:mr-0 perspective-1000">
                                    {/* Transforming the container to give it a slight pop */}
                                    <div className="relative z-10 transform transition-transform duration-500 hover:scale-[1.02] lg:rotate-y-[-12deg] lg:rotate-x-[2deg] preserve-3d">
                                        {/* iPhone Frame Container */}
                                        <div className="relative aspect-[9/16] bg-black rounded-[2.5rem] border-[6px] border-slate-800 shadow-2xl overflow-hidden ring-1 ring-slate-400/20">
                                            {/* Notch */}
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-6 bg-black rounded-b-xl z-20" />

                                            {/* Screen Content */}
                                            <div className="w-full h-full bg-slate-800">
                                                <img
                                                    src={hero?.coverImage || "https://images.unsplash.com/photo-1551288049-bebda4e38f71"}
                                                    alt="Project Screen"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Decorative blurred blob behind phone */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[120%] bg-teal-500/20 blur-[60px] rounded-full -z-10" />
                                </div>
                            </motion.div>

                        </div>
                    </div>
                </section>

                {/* --- 2. OVERVIEW (Redesigned: Clean, Compact & Aligned) --- */}
                <section className="pt-8 md:pt-24 pb-8 md:pb-32 px-3 md:px-12 lg:px-20 bg-white relative">
                    <div className="max-w-[1300px] mx-auto w-full">
                        {/* Title Section - Top Left aligned */}
                        <div className="mb-6 md:mb-12 pl-1">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#012828] tracking-tight">Project Overview</h2>
                        </div>

                        <div className="grid lg:grid-cols-12 gap-10 items-center">
                            {/* Media (Left) - Portrait iPhone Placeholder */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="lg:col-span-7 flex justify-center"
                            >
                                {/* Portrait iPhone Frame */}
                                <div className="relative w-full max-w-[300px] aspect-[9/18.5] bg-black rounded-[2.5rem] border-[8px] border-slate-900 shadow-2xl overflow-hidden ring-4 ring-slate-200/50">
                                    {/* Notch (Top for portrait) */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-6 bg-black rounded-b-xl z-20" />

                                    {/* Screen Content */}
                                    <div className="w-full h-full bg-slate-900 relative overflow-hidden rounded-[2rem]">
                                        {(overview?.mediaType === 'video' || overview?.mediaUrl?.match(/\.(mp4|webm|ogg)$/i)) ? (
                                            <video
                                                src={overview?.mediaUrl}
                                                className="w-full h-full object-cover"
                                                controls
                                                playsInline
                                                controlsList="nofullscreen"
                                                disablePictureInPicture
                                            />
                                        ) : (
                                            <>
                                                <img
                                                    src={overview?.mediaUrl || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2426&q=80"}
                                                    alt="Project Overview"
                                                    className="w-full h-full object-cover"
                                                />
                                            </>
                                        )}
                                    </div>
                                </div>
                            </motion.div>

                            <div className="lg:col-span-5 flex flex-col justify-center">
                                <div className="space-y-8">
                                    <div className="overflow-hidden">
                                        <ParagraphReveal
                                            text={overview?.text || "We developed a secure and robust platform. Our goal was to create an intuitive and scalable solution tailored to the specific needs of the sector, ensuring fast and reliable online transactions for all users."}
                                        />
                                    </div>

                                    <div className="w-24 h-1.5 bg-[#05A4A7] rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- 3. CHALLENGE & SOLUTION (Redesigned: Picture Perfect) --- */}
                <section className="py-6 md:py-20 px-3 md:px-12 lg:px-20 bg-slate-900 relative overflow-hidden">
                    {/* Background Noise/Texture */}
                    <div className="absolute inset-0 opacity-[0.4] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-overlay pointer-events-none" />
                    {/* Subtle glow effects */}
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" />

                    <div className="max-w-[1300px] mx-auto w-full grid grid-cols-2 gap-3 md:gap-8 relative z-10">
                        {/* 1. The Challenge Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="bg-slate-800/40 backdrop-blur-md border border-white/5 rounded-xl p-3 md:p-8 shadow-2xl relative overflow-hidden group hover:border-white/10 transition-colors"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <h3 className="text-sm md:text-xl font-bold text-white mb-2 md:mb-4">The Challenge</h3>
                            <div className="w-full h-px bg-white/10 mb-3 md:mb-6" />

                            {/* Description from backend */}
                            {challenge?.description && (
                                <p className="text-slate-300 text-[10px] md:text-[15px] leading-relaxed mb-3 md:mb-6 font-medium opacity-90 line-clamp-4">
                                    {challenge.description}
                                </p>
                            )}

                            <ul className="space-y-2 md:space-y-4">
                                {challenge?.points?.map((pt, i) => (
                                    <li key={i} className="flex items-start gap-2 md:gap-3.5">
                                        {/* Blue Check Icon */}
                                        <div className="mt-0.5 md:mt-1 flex-shrink-0">
                                            <LucideIcons.Check className="text-cyan-400 font-bold w-3 h-3 md:w-[18px] md:h-[18px]" strokeWidth={3} />
                                        </div>
                                        <span className="text-slate-300 text-[10px] md:text-[15px] leading-tight md:leading-relaxed font-medium">{pt}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* 2. The Solution Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-[#048a8d] rounded-xl p-3 md:p-8 shadow-2xl relative overflow-hidden group hover:brightness-105 transition-all outline outline-1 outline-[#048a8d]/50"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <h3 className="text-sm md:text-xl font-bold text-white mb-2 md:mb-4">The Solution</h3>
                            <div className="w-full h-px bg-white/10 mb-3 md:mb-6" />

                            {/* Description from backend */}
                            {solution?.description && (
                                <p className="text-slate-300 text-[10px] md:text-[15px] leading-relaxed mb-3 md:mb-6 font-medium opacity-90 line-clamp-4">
                                    {solution.description}
                                </p>
                            )}

                            <ul className="space-y-2 md:space-y-4">
                                {solution?.points?.map((pt, i) => (
                                    <li key={i} className="flex items-start gap-2 md:gap-3.5">
                                        {/* Green Filled Checkbox Icon */}
                                        <div className="mt-0.5 md:mt-0.5 flex-shrink-0">
                                            <div className="w-3 h-3 md:w-5 md:h-5 bg-teal-500 rounded-[3px] md:rounded-[4px] flex items-center justify-center shadow-lg shadow-teal-500/20">
                                                <LucideIcons.Check className="text-white w-2 h-2 md:w-[14px] md:h-[14px]" strokeWidth={3} />
                                            </div>
                                        </div>
                                        <span className="text-slate-200 text-[10px] md:text-[15px] leading-tight md:leading-relaxed font-medium">{pt}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </section>

                {/* --- 4. MEDIA SHOWCASE (Redesigned: Pixel Perfect) --- */}
                <section className="py-8 px-4 md:px-12 lg:px-20 bg-slate-50 relative">
                    <div className="max-w-[1300px] mx-auto w-full">
                        {/* Title Section - Top Left aligned */}
                        <div className="mb-6 pl-1">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#012828] tracking-tight">Media Showcase</h2>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-6 items-center">
                            {/* Left Column: Vertical Media (iPhone Mockup) */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="flex justify-center"
                            >
                                {/* iPhone Frame Container */}
                                <div className="relative w-[280px] md:w-[320px] aspect-[9/16] bg-black rounded-[3rem] border-[8px] border-slate-900 shadow-2xl overflow-hidden ring-4 ring-slate-200/50">
                                    {/* Notch */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-7 bg-black rounded-b-2xl z-20" />

                                    {/* Screen Content */}
                                    <div className="w-full h-full bg-slate-800 relative">
                                        {(mediaShowcase?.mediaType === 'video' || (mediaShowcase?.mediaUrl && mediaShowcase.mediaUrl.match(/\.(mp4|webm|ogg)$/i))) ? (
                                            <video
                                                src={mediaShowcase.mediaUrl}
                                                className="w-full h-full object-cover"
                                                controls
                                                playsInline
                                                controlsList="nofullscreen"
                                                disablePictureInPicture
                                            // muted // Optional: mute by default for autoplay
                                            />
                                        ) : (
                                            <img
                                                src={mediaShowcase.mobileMediaUrl || mediaShowcase.mediaUrl || "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"}
                                                alt="Mobile Showcase"
                                                className="w-full h-full object-cover"
                                            />
                                        )}

                                        {/* Play Button Overlay (only for video if controls aren't enough, but native controls are better for mobile view usually. Keeping a subtle indicator if paused could be nice, but standard video tag works) */}
                                        {/* Using native controls for better UX within the frame */}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Right Column: Feature Buttons (Stacked) */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="flex flex-col gap-4 justify-center"
                            >
                                {/* Transforming the grid items into stacked pills as per reference */}
                                <div className="grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-4">
                                    {mediaShowcase.items?.slice(0, 4).map((item, i) => (
                                        <motion.div
                                            key={i}
                                            whileHover={{ scale: 1.02 }}
                                            className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 p-4 md:p-5 bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg shadow-lg border border-slate-700/50 group cursor-default"
                                        >
                                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg flex-shrink-0 group-hover:from-teal-400 group-hover:to-emerald-500 transition-all">
                                                <DynamicIcon name={item.icon} className="text-white" size={24} />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm md:text-lg font-bold text-white tracking-wide leading-tight">{item.label}</h4>
                                                {/* Optional: Add subtitle if available in data, or static for design */}
                                                {/* <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Features</p> */}
                                            </div>
                                            <div className="h-full w-px bg-slate-700/50 mx-2 hidden sm:block" />
                                            <div className="text-slate-500 hidden sm:block">
                                                <LucideIcons.ArrowRight size={18} className="group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </motion.div>
                                    ))}

                                    {/* Fallback if no items, show static ones to match design */}
                                    {(!mediaShowcase?.items || mediaShowcase.items.length === 0) && (
                                        <>
                                            <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg shadow-lg border border-slate-700/50">
                                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg"><LucideIcons.ShieldCheck className="text-white" size={24} /></div>
                                                <h4 className="text-lg font-bold text-white">Secure Payments</h4>
                                            </div>
                                            <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg shadow-lg border border-slate-700/50">
                                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg"><LucideIcons.BarChart3 className="text-white" size={24} /></div>
                                                <h4 className="text-lg font-bold text-white">Real-Time Analytics</h4>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>


                {/* --- 5. RESULTS & TESTIMONIALS (Reduced Padding) --- */}
                {/* --- 5. RESULTS & IMPACT (Redesigned: Pixel Perfect) --- */}
                <section className="py-8 md:py-12 px-4 md:px-12 lg:px-20 bg-white border-t border-slate-100">
                    <div className="max-w-[1100px] mx-auto w-full">

                        {/* Header: Title Centered */}
                        <div className="text-center mb-8">
                            <h3 className="text-2xl md:text-3xl font-bold text-[#012828] mb-3">Results & Impact</h3>
                            <div className="w-16 h-1 bg-gradient-to-r from-[#05A4A7] to-[#048a8d] rounded-full mx-auto" />
                        </div>

                        {/* Key Results Grid (Max 3) */}
                        {results && results.length > 0 && (
                            <div className="flex flex-row justify-around md:justify-center items-center gap-2 md:gap-16 mb-6 md:mb-10 max-w-4xl mx-auto px-2">
                                {results.slice(0, 3).map((res, i) => (
                                    <div key={i} className="text-center p-1 w-auto">
                                        <div className="text-2xl md:text-6xl font-black text-[#012828] mb-1 md:mb-2 tracking-tight leading-none">{res.value}</div>
                                        <div className="text-[9px] md:text-base font-extrabold text-[#05A4A7] uppercase tracking-wider leading-tight">{res.label}</div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Testimonial Card */}
                        {testimonial && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="relative w-full bg-slate-900 rounded-lg overflow-hidden shadow-2xl mb-10 group"
                            >
                                {/* Background Texture (Dots) */}
                                <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent z-10" />

                                <div className="relative z-20 p-6 md:p-8 text-center max-w-3xl mx-auto">
                                    <LucideIcons.Quote size={32} className="text-[#05A4A7] mb-3 opacity-80 inline-block" />
                                    <p className="text-lg md:text-xl font-medium text-white leading-relaxed mb-5 font-sans tracking-wide">
                                        "{testimonial.text}"
                                    </p>
                                    <div>
                                        <h4 className="text-base font-bold text-white mb-0.5">{testimonial.author}</h4>
                                        <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">{testimonial.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* CTA Section */}
                        <div className="text-center">
                            <h3 className="text-xl md:text-2xl font-medium text-slate-700 mb-6">Want a project like this for your business?</h3>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                                {/* Start Project Button */}
                                <Link
                                    to="/chit-chat#chitchat-form"
                                    className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-b from-[#05A4A7] to-[#037F82] text-white font-bold rounded shadow-[0_4px_0_#025e61] hover:translate-y-[2px] hover:shadow-[0_2px_0_#025e61] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2 group"
                                >
                                    <LucideIcons.Mail size={18} className="group-hover:rotate-12 transition-transform" />
                                    <span>Start a Project</span>
                                </Link>

                                {/* Contact Us Button */}
                                <Link
                                    to="/contact"
                                    className="w-full sm:w-auto px-8 py-3.5 bg-[#012828] text-white font-bold rounded shadow-[0_4px_0_#001515] hover:translate-y-[2px] hover:shadow-[0_2px_0_#001515] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2 group"
                                >
                                    <LucideIcons.Phone size={18} className="group-hover:rotate-12 transition-transform" />
                                    <span>Contact Us</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </ScrollWrapper>
    );
};

export default ProjectDetail;
