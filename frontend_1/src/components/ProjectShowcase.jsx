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
                relative rounded-[0.8rem] sm:rounded-[1.5rem] md:rounded-[2rem] border-[2px] md:border-[4px] border-black bg-black overflow-hidden shadow-2xl
                w-[80px] sm:w-[140px] md:w-[200px] aspect-[9/18] ring-1 ring-gray-800/50
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
            <div className="absolute -bottom-8 md:-bottom-16 left-1/2 -translate-x-1/2 w-[200px] text-center z-50">
                <h3 className={`
                    text-[10px] sm:text-sm font-bold bg-white/90 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-2 rounded-full shadow-lg border border-slate-200 inline-block mx-auto leading-tight whitespace-nowrap transition-all duration-300
                    ${isActive ? 'text-slate-900 scale-100 opacity-100' : 'text-slate-500 scale-90 opacity-70'}
                `}>
                    {title}
                </h3>
            </div>
        </div>
    );
};

const ProjectCarousel = ({ projects, currentIndex, setCurrentIndex, navigate }) => {
    const carouselRef = useRef(null);
    const phonesRef = useRef([]);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-Rotation inside the component
    useEffect(() => {
        let timer;
        if (isAutoPlaying) {
            timer = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % projects.length);
            }, 3000); // Slower interval for better UX
        }
        return () => clearInterval(timer);
    }, [isAutoPlaying, projects.length, setCurrentIndex]);

    // GSAP Animation
    useEffect(() => {
        const phones = phonesRef.current;
        const total = projects.length;

        phones.forEach((phone, i) => {
            if (!phone) return;

            let diff = (i - currentIndex) % total;
            if (diff < -total / 2) diff += total;
            if (diff > total / 2) diff -= total;

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

            if (diff === 0) { // CENTER
                config = { ...config, x: 0, scale: 1.1, opacity: 1, zIndex: 30, filter: "blur(0px)" };
                if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.5 });
            } else if (diff === 1 || diff === -(total - 1)) { // RIGHT
                config = { ...config, x: 100, scale: 0.75, opacity: 1, zIndex: 10, filter: "blur(0px)" }; // Increased spacing, no blur

                if (window.innerWidth >= 1024) { config.x = 220; config.scale = 0.85; config.filter = "blur(0px)"; }

                if (overlay) gsap.to(overlay, { opacity: 0.1, duration: 0.5 });
            } else if (diff === -1 || diff === (total - 1)) { // LEFT
                config = { ...config, x: -100, scale: 0.75, opacity: 1, zIndex: 10, filter: "blur(0px)" };
                if (window.innerWidth >= 1024) { config.x = -220; config.scale = 0.85; config.filter = "blur(0px)"; }

                if (overlay) gsap.to(overlay, { opacity: 0.1, duration: 0.5 });
            } else { // HIDDEN
                config = { ...config, x: 0, scale: 0.2, opacity: 0 };
            }

            gsap.to(phone, config);
        });

    }, [currentIndex, projects.length]);

    return (
        <div
            ref={carouselRef}
            className="relative w-full h-full flex items-center justify-center"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            {projects.map((project, i) => {
                const isActive = i === currentIndex;
                const displayImage = (project.images && project.images.length > 0) ? project.images[0] : project.thumbnail;

                return (
                    <div
                        key={`proj-card-${i}`}
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
    );
};

const ProjectShowcase = () => {
    const navigate = useNavigate();
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

    // --- Data Helpers ---
    const carouselProjects = useMemo(() => {
        let base = [...projectsData];
        while (base.length < 6) {
            base = [...base, ...projectsData];
        }
        return base.slice(0, 12);
    }, []);

    const activeProject = carouselProjects[currentProjectIndex];

    const nextProject = () => {
        setCurrentProjectIndex((prev) => (prev + 1) % carouselProjects.length);
    };

    return (
        <section className="relative w-full md:min-h-screen bg-slate-50 overflow-hidden flex items-center py-8 md:py-24">

            {/* Background Texture */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(5,164,167,0.05),transparent_70%)]" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full" />
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center relative z-10">

                {/* LEFT SIDE: CONTENT */}
                <div className="flex flex-col items-start w-full relative pt-0 lg:pt-0">

                    {/* 1. Main Static Heading Section */}
                    <div className="mb-4 md:mb-8 text-left w-full">
                        <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold text-slate-900 leading-tight tracking-tight drop-shadow-sm flex flex-col md:block items-center md:items-start text-center md:text-left">
                            <span className="md:inline">Projects </span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-900 md:ml-2">
                                We Created
                            </span>
                        </h1>
                    </div>

                    {/* MOBILE ONLY: CATEGORY FILTER ROW */}
                    <div className="lg:hidden w-full overflow-x-auto pb-2 mb-6 no-scrollbar w-full">
                        <div className="flex gap-3 w-max px-0">
                            {["All", "CRM Solution", "Food Delivery", "Service App", "Taxi Booking", "Ecommerce"].map((cat, i) => (
                                <button
                                    key={i}
                                    onClick={() => navigate('/projects')}
                                    className={`
                                        whitespace-nowrap px-5 py-2.5 rounded-full text-[11px] font-bold tracking-wide shadow-sm border transition-all duration-300
                                        ${i === 0
                                            ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                                            : 'bg-white text-slate-600 border-slate-200 hover:border-[#05A4A7] hover:text-[#05A4A7]'}
                                    `}
                                >
                                    {cat.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>


                    {/* 2. Top Content (Title & Category) - Animated */}
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={`title-${activeProject.id || currentProjectIndex}`}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="space-y-1 md:space-y-2 mb-6 md:mb-6 w-full"
                        >
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 tracking-normal">
                                <TypewriterText text={activeProject.title} />
                            </h3>
                            <p className="text-[#05A4A7] font-medium tracking-wide text-xs sm:text-sm">
                                {activeProject.category}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* 3. MOBILE ONLY CAROUSEL (Between Title and Description) */}
                    <div className="w-full h-[200px] mb-12 lg:hidden">
                        <ProjectCarousel
                            projects={carouselProjects}
                            currentIndex={currentProjectIndex}
                            setCurrentIndex={setCurrentProjectIndex}
                            navigate={navigate}
                        />
                    </div>

                    {/* 4. Bottom Content (Desc, Tags, Buttons) - Animated */}
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={`desc-${activeProject.id || currentProjectIndex}`}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5, delay: 0.1, ease: "easeInOut" }}
                            className="space-y-3 md:space-y-6 max-w-lg"
                        >
                            <p className="text-slate-600 text-xs sm:text-base md:text-lg leading-relaxed font-normal">
                                {activeProject.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {activeProject.tags?.slice(0, 3).map((tag, i) => (
                                    <span key={i} className="px-3 py-1 bg-slate-200 border border-slate-300 rounded-full text-[10px] sm:text-xs text-slate-700 font-medium tracking-wide">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                        </motion.div>
                    </AnimatePresence>

                    {/* Static Actions - Outside Animation */}
                    <div className="w-full pt-6 md:pt-6 flex items-center justify-center md:justify-start gap-4 md:gap-5">
                        <Link to="/projects">
                            <button className="px-6 md:px-8 py-3 bg-slate-900 text-white font-bold text-xs md:text-sm tracking-wide rounded-full hover:bg-slate-800 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl">
                                View All Projects
                                <span className="material-symbols-outlined text-sm transform -rotate-45">arrow_forward</span>
                            </button>
                        </Link>
                        {/* Arrow Button Removed as per request */}
                    </div>
                </div>

                {/* RIGHT SIDE: DESKTOP CAROUSEL */}
                <div className="relative h-[600px] w-full hidden lg:flex items-center justify-center">
                    <ProjectCarousel
                        projects={carouselProjects}
                        currentIndex={currentProjectIndex}
                        setCurrentIndex={setCurrentProjectIndex}
                        navigate={navigate}
                    />
                </div>
            </div>

        </section>
    );
};

export default ProjectShowcase;
