import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { projectsData } from '../data/projectsData';

// --- Typewriter Effect Component ---
const TypewriterText = ({ text }) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        setDisplayText(''); // Reset
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayText((prev) => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, 50); // Speed of typing

        return () => clearInterval(timer);
    }, [text]);

    return (
        <span>{displayText}</span>
    );
};

// --- Internal Phone Mockup Component ---
const PhoneMockup = ({ image, title, isActive }) => {
    return (
        <div className="relative group flex flex-col items-center">
            <div className={`
                relative rounded-[1.5rem] md:rounded-[2rem] border-[3px] md:border-[4px] border-black bg-black overflow-hidden shadow-2xl
                w-[160px] md:w-[200px] aspect-[9/18] ring-1 ring-gray-800/50
            `}>
                {/* Phone Bezel/Camera - Black Style */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-3 md:h-4 bg-black rounded-b-lg z-20 flex justify-center items-center shadow-sm border-b border-x border-gray-800">
                    <div className="w-6 md:w-8 h-0.5 bg-gray-800 rounded-full" />
                </div>

                {/* Screen Content */}
                <div className="relative w-full h-full bg-gray-900 text-white">
                    <img
                        src={image || "https://via.placeholder.com/400x800?text=No+Image"}
                        alt={title}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/400x800?text=Image+Error"; }}
                    />

                    {/* Overlay for inactive - Reduced opacity for better visibility in 'side' views */}
                    <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 mask-overlay ${isActive ? 'opacity-0' : 'opacity-20'}`} />
                </div>

                {/* Glass Glare */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none z-10" />
            </div>

            {/* Title for Mobile & Desktop - ALWAYS VISIBLE */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[200px] text-center z-50">
                <h3 className={`
                    text-sm font-bold bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-slate-200 inline-block mx-auto leading-tight whitespace-nowrap transition-all duration-300
                    ${isActive ? 'text-slate-900 scale-100 opacity-100' : 'text-slate-500 scale-90 opacity-70'}
                `}>
                    {title}
                </h3>
            </div>
        </div>
    );
};

const ProjectShowcase = () => {
    const navigate = useNavigate();
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Container ref for GSAP context
    const carouselRef = useRef(null);
    const phonesRef = useRef([]);

    // --- Data Helpers ---
    // Create a robust list of unique items for rendering.
    // We duplicate projects until we have at least 6 items for smooth carousel looping.
    const carouselProjects = useMemo(() => {
        let base = [...projectsData];
        while (base.length < 6) {
            base = [...base, ...projectsData];
        }
        // Limit to reasonable number if projectsData is huge, but usually it's small. 
        // We just need a circular buffer. 
        // Actually, for GSAP loop logic to work perfectly with calculating "shortest distance" (diff), 
        // the list length shouldn't be huge, but "enough". 8-10 is safe.
        // Let's cap at 12 or just leave it if it's not massive.
        return base.slice(0, 12);
    }, []);

    const activeProject = carouselProjects[currentProjectIndex];

    // --- Project Auto-Rotation Logic (2 Seconds) ---
    useEffect(() => {
        let timer;
        if (isAutoPlaying) {
            timer = setInterval(() => {
                setCurrentProjectIndex((prev) => (prev + 1) % carouselProjects.length);
            }, 2000);
        }
        return () => clearInterval(timer);
    }, [isAutoPlaying, carouselProjects.length]);

    // --- Navigation Handlers ---
    const nextProject = () => {
        setCurrentProjectIndex((prev) => (prev + 1) % carouselProjects.length);
    };


    // --- GSAP Animation Engine ---
    useEffect(() => {
        const phones = phonesRef.current;
        const total = carouselProjects.length;

        phones.forEach((phone, i) => {
            if (!phone) return;

            // Calculate distance from current index, handling wrap-around for shortest path
            let diff = (i - currentProjectIndex) % total;
            if (diff < -total / 2) diff += total;
            if (diff > total / 2) diff -= total;

            // Adjust logic because % in JS can be negative: -1 % 5 = -1. 
            // We want canonical representation.
            // Actually the above logic is standard for circular carousel.

            // Configuration Base
            let config = {
                x: 0,
                scale: 0.5,
                opacity: 0,
                zIndex: 0,
                filter: "blur(10px)",
                duration: 0.5,
                ease: "power3.inOut"
            };

            const overlay = phone.querySelector('.mask-overlay');

            if (diff === 0) { // CENTER (Active)
                config = { ...config, x: 0, scale: 1.1, opacity: 1, zIndex: 30, filter: "blur(0px)" };
                if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.5 });
            } else if (diff === 1 || diff === -(total - 1)) { // RIGHT (Next) - handles wrap
                config = { ...config, x: 220, scale: 0.85, opacity: 1, zIndex: 10, filter: "blur(0px)" };
                if (overlay) gsap.to(overlay, { opacity: 0.1, duration: 0.5 });
            } else if (diff === -1 || diff === (total - 1)) { // LEFT (Prev) - handles wrap
                config = { ...config, x: -220, scale: 0.85, opacity: 1, zIndex: 10, filter: "blur(0px)" };
                if (overlay) gsap.to(overlay, { opacity: 0.1, duration: 0.5 });
            } else if (diff === 2 || diff === -(total - 2)) { // FAR RIGHT
                config = { ...config, x: 400, scale: 0.6, opacity: 0, zIndex: 0 }; // Fade out
            } else if (diff === -2 || diff === (total - 2)) { // FAR LEFT
                config = { ...config, x: -400, scale: 0.6, opacity: 0, zIndex: 0 }; // Fade out
            } else { // HIDDEN
                config = { ...config, x: 0, scale: 0.2, opacity: 0 };
            }

            gsap.to(phone, config);
        });

    }, [currentProjectIndex, carouselProjects.length]); // trigger on index change

    return (
        <section className="relative w-full min-h-screen bg-slate-50 overflow-hidden flex items-center py-24">

            {/* Background Texture */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(5,164,167,0.05),transparent_70%)]" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full" />
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">

                {/* LEFT SIDE: CONTENT */}
                <div className="flex flex-col items-start space-y-6 order-2 lg:order-1 pt-10 lg:pt-0">

                    {/* 1. Main Static Heading Section */}
                    <div className="mb-2">
                        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight tracking-tight drop-shadow-sm">
                            Projects <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-900">
                                We Created
                            </span>
                        </h1>
                    </div>

                    {/* 2. Dynamic Project Details */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeProject.id || currentProjectIndex} // Use index as key fallback if duplicate IDs exist (due to array repeat)
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-6 max-w-lg"
                        >
                            {/* Project Title & Category */}
                            <div className="space-y-2 h-[80px]">
                                <h3 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-normal">
                                    <TypewriterText text={activeProject.title} />
                                </h3>
                                <p className="text-[#05A4A7] font-medium tracking-wide text-sm">
                                    {activeProject.category}
                                </p>
                            </div>

                            {/* Description */}
                            <p className="text-slate-600 text-base md:text-lg leading-relaxed font-normal">
                                {activeProject.description}
                            </p>

                            {/* Tags bubble */}
                            <div className="flex flex-wrap gap-2">
                                {activeProject.tags?.slice(0, 3).map((tag, i) => (
                                    <span key={i} className="px-3 py-1 bg-slate-200 border border-slate-300 rounded-full text-xs text-slate-700 font-medium tracking-wide">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="pt-6 flex items-center gap-5">
                                <Link to="/projects">
                                    <button className="px-8 py-3.5 bg-slate-900 text-white font-bold text-sm tracking-wide rounded-full hover:bg-slate-800 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl">
                                        View All Projects
                                        <span className="material-symbols-outlined text-sm transform -rotate-45">arrow_forward</span>
                                    </button>
                                </Link>

                                <button
                                    onClick={nextProject}
                                    className="w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center text-slate-900 hover:bg-slate-200 transition-all active:scale-95"
                                    aria-label="Next Project"
                                >
                                    <span className="material-symbols-outlined text-xl">arrow_forward_ios</span>
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* RIGHT SIDE: GSAP CAROUSEL */}
                <div
                    ref={carouselRef}
                    className="relative h-[600px] w-full flex items-center justify-center order-1 lg:order-2"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                >
                    {carouselProjects.map((project, i) => {
                        // Determine visual styling based on index relative to active. 
                        // While GSAP handles position, we pass 'isActive' for static styling helper in PhoneMockup
                        const isActive = i === currentProjectIndex;

                        // Use first image or thumbnail
                        const displayImage = (project.images && project.images.length > 0) ? project.images[0] : project.thumbnail;

                        return (
                            <div
                                key={`proj-card-${i}`} // Unique key for the list position
                                ref={(el) => (phonesRef.current[i] = el)}
                                className="absolute origin-center will-change-transform cursor-pointer"
                                style={{ transform: 'scale(0) translateX(0)', opacity: 0 }}
                                onClick={() => navigate('/projects')}
                            >
                                <PhoneMockup
                                    image={displayImage}
                                    title={project.title}
                                    isActive={isActive}
                                />
                            </div>
                        );
                    })}

                    {/* Decorative Elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none">
                        <div className="w-full h-full border border-white/5 rounded-full animate-spin-slow opacity-30" />
                    </div>
                </div>
            </div>

        </section>
    );
};

export default ProjectShowcase;
