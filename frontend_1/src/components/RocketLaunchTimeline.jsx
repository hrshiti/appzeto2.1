import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Palette, Laptop, FlaskConical, Rocket, Bike } from 'lucide-react';

const steps = [
    {
        id: 1,
        number: '01',
        title: 'Discovery',
        description: 'We dive deep into your requirements, target audience, and business goals.',
        icon: Search,
        color: '#a855f7', // Purple
        bg: 'bg-purple-500',
        lightBg: 'bg-purple-50',
        iconColor: 'text-white'
    },
    {
        id: 2,
        number: '02',
        title: 'UI/UX Design',
        description: 'Crafting intuitive layouts and stunning visuals for exceptional experiences.',
        icon: Palette,
        color: '#ec4899', // Pink
        bg: 'bg-pink-500',
        lightBg: 'bg-pink-50',
        iconColor: 'text-white'
    },
    {
        id: 3,
        number: '03',
        title: 'Development',
        description: 'Transforming designs into robust, scalable code using the latest tech.',
        icon: Laptop,
        color: '#3b82f6', // Blue
        bg: 'bg-blue-500',
        lightBg: 'bg-blue-50',
        iconColor: 'text-white'
    },
    {
        id: 4,
        number: '04',
        title: 'Testing',
        description: 'Rigorous quality assurance to ensure perfect performance everywhere.',
        icon: FlaskConical,
        color: '#06b6d4', // Cyan
        bg: 'bg-cyan-500',
        lightBg: 'bg-cyan-50',
        iconColor: 'text-white'
    },
    {
        id: 5,
        number: '05',
        title: 'Deployment',
        description: 'Launching your product to the world with ongoing support.',
        icon: Rocket,
        color: '#f59e0b', // Amber
        bg: 'bg-amber-500',
        lightBg: 'bg-amber-50',
        iconColor: 'text-white'
    }
];

const RoadmapJourney = () => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.1 });
    const [progress, setProgress] = useState(0);
    const [activeStep, setActiveStep] = useState(0);

    // Precise Snake Path (Bottom Left -> Top Right)
    // Adjusted control points for a smoother, wider S-curve that fits cards nicely
    const desktopPath = "M 50 750 C 250 750, 250 550, 450 550 C 650 550, 650 400, 850 400 C 1050 400, 1050 250, 1250 250 C 1450 250, 1450 100, 1600 100";

    // Auto-drive Logic
    useEffect(() => {
        let interval;
        if (isInView && progress < 100) {
            interval = setInterval(() => {
                setProgress(prev => {
                    const next = prev + 0.15; // Slightly slower for better readability
                    return next > 100 ? 100 : next;
                });
            }, 20);
        }
        return () => clearInterval(interval);
    }, [isInView, progress]);

    // Step Activation Logic
    useEffect(() => {
        if (progress > 10) setActiveStep(1);
        if (progress > 30) setActiveStep(2);
        if (progress > 50) setActiveStep(3);
        if (progress > 70) setActiveStep(4);
        if (progress > 90) setActiveStep(5);
    }, [progress]);

    return (
        <section ref={containerRef} className="relative py-24 bg-[#f3f4f6] overflow-hidden min-h-[1000px] flex flex-col items-center justify-center font-sans">

            {/* Header */}
            <div className="max-w-7xl w-full px-6 mb-24 md:mb-12 relative z-10 text-left md:pl-20">
                <div className="flex items-center gap-3 mb-4">
                    {/* Decorative Dots */}
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                    </div>
                </div>
                <h2 className="text-5xl md:text-7xl font-extrabold text-slate-800 tracking-tight leading-none mb-2">
                    WORKFLOW
                </h2>
                <p className="text-xl md:text-2xl text-slate-400 font-light tracking-wide">
                    How We Bring Your Ideas To Life
                </p>
                <div className="mt-4 text-xs font-bold text-slate-300 tracking-[0.2em] uppercase">
                    WE SELL CONFIDENCE NOT TEMPLATES
                </div>
            </div>

            <div className="relative w-full max-w-[1600px] h-[800px] md:h-[800px]">

                {/* SVG LAYERS */}
                <svg className="absolute inset-0 w-full h-full visible md:hidden" viewBox="0 0 100 1200" preserveAspectRatio="none">
                    <path d="M 50 50 L 50 1150" fill="none" stroke="#1e293b" strokeWidth="60" strokeLinecap="round" />
                    <path d="M 50 50 L 50 1150" fill="none" stroke="#ffffff" strokeWidth="4" strokeDasharray="15,15" strokeOpacity="0.5" />
                </svg>

                <svg className="absolute inset-0 w-full h-full hidden md:block" viewBox="0 0 1600 800" style={{ overflow: 'visible' }}>
                    <defs>
                        <filter id="road-shadow" x="-50%" y="-50%" width="200%" height="200%">
                            <feDropShadow dx="0" dy="15" stdDeviation="10" floodColor="#000" floodOpacity="0.4" />
                        </filter>
                    </defs>

                    {/* 1. THE ROAD (Base) */}
                    <path
                        d={desktopPath}
                        fill="none"
                        stroke="#1e293b" // Dark Slate/Black
                        strokeWidth="110" // Thicker road
                        strokeLinecap="round"
                        filter="url(#road-shadow)"
                    />

                    {/* 2. THE STRIPES (Dashed Line) */}
                    <path
                        d={desktopPath}
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="5"
                        strokeDasharray="25,35"
                        strokeOpacity="0.6"
                    />
                </svg>

                {/* --- MAPPABLE NODES & CARDS --- */}
                <div className="absolute inset-0 pointer-events-none">
                    {steps.map((step, i) => {
                        // Hardcoded Curve Points based on desktopPath approx
                        const positions = [
                            { x: '16%', y: '84%' },  // 01 
                            { x: '35%', y: '61%' },  // 02 
                            { x: '58%', y: '50%' },  // 03 
                            { x: '77%', y: '35%' },  // 04 
                            { x: '92%', y: '20%' },  // 05 
                        ];

                        const mobileTop = `${10 + (i * 18)}%`;
                        const isActive = activeStep >= step.id;
                        const isEven = i % 2 !== 0; // Alternating sides

                        // Card Styles matching the image: White rect, Shadow, Colored Icon Box, Triangle Pointer
                        return (
                            <div
                                key={step.id}
                                className="absolute w-full md:w-auto flex items-center justify-center md:block"
                                style={{
                                    left: typeof window !== 'undefined' && window.innerWidth >= 768 ? positions[i].x : '50%',
                                    top: typeof window !== 'undefined' && window.innerWidth >= 768 ? positions[i].y : mobileTop,
                                    transform: 'translate(-50%, -50%)',
                                    zIndex: 30
                                }}
                            >
                                {/* ROAD NODE (Circle with Number) */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: isActive ? 1 : 0.8 }}
                                    className={`
                                        relative w-14 h-14 rounded-full border-[6px] border-[#1e293b] 
                                        flex items-center justify-center z-20 
                                        ${isActive ? step.bg : 'bg-slate-700'}
                                        shadow-lg
                                    `}
                                >
                                    <span className="text-white font-bold text-sm">{step.number}</span>
                                </motion.div>

                                {/* INFO CARD */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5, y: isEven ? 20 : -20 }}
                                    animate={{
                                        opacity: isActive ? 1 : 0,
                                        scale: isActive ? 1 : 0.5,
                                        y: isActive ? 0 : (isEven ? 20 : -20)
                                    }}
                                    transition={{ duration: 0.4, type: 'spring' }}
                                    className={`
                                        absolute 
                                        ${isEven ? 'md:top-24 md:-right-20' : 'md:-top-40 md:-left-20'} 
                                        left-16 md:left-auto
                                        w-72 bg-white p-2 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] z-30
                                        flex items-center gap-4
                                    `}
                                >
                                    {/* Triangle Pointer */}
                                    <div className={`
                                        absolute w-6 h-6 bg-white transform rotate-45 
                                        ${isEven ? 'top-[-8px] left-10' : 'bottom-[-8px] right-10'}
                                        hidden md:block
                                    `} />

                                    {/* Colored Icon Box */}
                                    <div className={`w-14 h-14 ${step.bg} rounded-lg flex items-center justify-center flex-shrink-0 shadow-md`}>
                                        <step.icon className="w-7 h-7 text-white" />
                                    </div>

                                    {/* Text Content */}
                                    <div className="py-2 pr-2">
                                        <h3 className="font-extrabold text-slate-800 uppercase text-sm mb-1">{step.title}</h3>
                                        <p className="text-[11px] text-slate-500 font-medium leading-snug">
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>


                {/* --- THE BIKE ACTOR --- */}
                <div
                    className="absolute z-50 pointer-events-none hidden md:block"
                    style={{
                        offsetPath: `path('${desktopPath}')`,
                        offsetDistance: `${progress}%`,
                        offsetRotate: 'auto',
                        width: '60px',
                        height: '60px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: 'translate(-50%, -50%)',
                        top: 0, left: 0
                    }}
                >
                    <div className="relative">
                        {/* Headlight */}
                        <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-16 h-8 bg-yellow-400 blur-xl opacity-60" />

                        <div className="bg-white p-2.5 rounded-full shadow-lg border-2 border-slate-900 z-10 relative">
                            <Bike className="w-6 h-6 text-slate-900 fill-current" />
                        </div>
                    </div>
                </div>

                {/* Mobile Bike */}
                <div
                    className="absolute z-50 pointer-events-none md:hidden"
                    style={{
                        left: '50%',
                        top: `${progress}%`,
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    <div className="bg-white p-2 rounded-full shadow-lg border-2 border-slate-900">
                        <Bike className="w-5 h-5 text-slate-900 fill-current" />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default RoadmapJourney;
