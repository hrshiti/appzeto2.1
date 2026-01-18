import React, { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        id: "01",
        title: "Idea & Plan",
        subtitle: "The Beginning",
        description: "We discuss your vision and create a solid roadmap.",
        icon: "lightbulb",
        pos: { top: 60, left: 100 }
    },
    {
        id: "02",
        title: "Sketching",
        subtitle: "Rough Draft",
        description: "Drafting the basic layout to visualize structure.",
        icon: "edit",
        pos: { top: 60, left: 450 }
    },
    {
        id: "03",
        title: "Designing",
        subtitle: "Look & Feel",
        description: "Adding colors and styles for a beautiful UI.",
        icon: "palette",
        pos: { top: 60, left: 800 }
    },
    {
        id: "04",
        title: "Coding",
        subtitle: "Building It",
        description: "Writing clean code to bring designs to life.",
        icon: "code",
        pos: { top: 280, left: 800 }
    },
    {
        id: "05",
        title: "Testing",
        subtitle: "Quality Check",
        description: "Ensuring zero bugs across all devices.",
        icon: "bug_report",
        pos: { top: 280, left: 450 }
    },
    {
        id: "06",
        title: "Launch",
        subtitle: "Going Live",
        description: "Deploying your project to the world.",
        icon: "rocket_launch",
        pos: { top: 280, left: 100 }
    },
    {
        id: "07",
        title: "Support",
        subtitle: "Here to Help",
        description: "Continuous growth and maintenance.",
        icon: "support_agent",
        pos: { top: 500, left: 100 }
    }
];

const Process = () => {
    const containerRef = useRef(null);
    const pathRef = useRef(null);
    const rocketRef = useRef(null);
    const mobileWrapperRef = useRef(null);
    const mobileProgressLineRef = useRef(null);
    const mobileRocketRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // DESKTOP ANIMATION
            if (pathRef.current && rocketRef.current) {
                const pathLength = pathRef.current.getTotalLength();
                // Reset/Set initial state
                gsap.set(pathRef.current, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

                // Proxy object for progress
                const progressObj = { value: 0 };

                gsap.to(progressObj, {
                    value: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top center",   // Rocket starts when section hits center
                        end: "bottom center",  // Rocket ends when section leaves center
                        scrub: 1.5,            // Tighter syncing
                        invalidateOnRefresh: true,
                    },
                    onUpdate: () => {
                        // 1. Update Line Drawing
                        const drawLength = pathLength * progressObj.value;
                        gsap.set(pathRef.current, { strokeDashoffset: pathLength - drawLength });

                        // 2. Update Rocket Position
                        const point = pathRef.current.getPointAtLength(drawLength);
                        // Look ahead for rotation
                        const nextPoint = pathRef.current.getPointAtLength(Math.min(drawLength + 2, pathLength));

                        let angle = 0;
                        if (nextPoint && point) {
                            angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
                        }

                        // Update DOM
                        gsap.set(rocketRef.current, {
                            left: (point.x / 900) * 100 + "%",
                            top: (point.y / 600) * 100 + "%",
                            rotation: angle + 45,
                            force3D: true
                        });
                    }
                });
            }

            // MOBILE PROGRESS LINE ANIMATION
            if (mobileWrapperRef.current && mobileProgressLineRef.current && mobileRocketRef.current) {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: mobileWrapperRef.current,
                        start: "top center",
                        end: "bottom center",
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    }
                });

                tl.to(mobileProgressLineRef.current, { height: "100%", ease: "none" }, 0)
                    .to(mobileRocketRef.current, { top: "100%", ease: "none" }, 0);
            }

        }, containerRef); // Scope to container

        return () => ctx.revert(); // Cleanup
    }, []);

    return (
        <section ref={containerRef} className="bg-[#062929] pt-12 pb-12 lg:pb-32 lg:h-auto lg:min-h-[850px] relative overflow-hidden flex flex-col items-center justify-center">

            <div className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05]"
                style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 h-full flex flex-col justify-center items-start">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                    className="text-left mb-6 md:mb-12 flex-shrink-0 w-full max-w-4xl"
                >
                    <span className="bg-white border border-slate-200 text-slate-900 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm mb-3 inline-block">
                        Workflow
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2">
                        How We Work
                    </h2>
                    <p className="text-gray-400 max-w-xl text-sm md:text-base mt-6 mb-16">
                        Simple steps to take your idea from concept to reality.
                    </p>
                </motion.div>

                {/* DESKTOP COMPACT LAYOUT */}
                <div className="hidden lg:block relative h-[600px] w-full mx-auto flex-grow-0">
                    <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 900 600" preserveAspectRatio="none">
                        {/* 
                           Compact Layout:
                           Row 1 Y: 60
                           Row 2 Y: 280 (Gap = 220px)
                           Row 3 Y: 500 (Gap = 220px)
                        */}
                        <path
                            d="M 100 60 L 800 60 L 800 280 L 100 280 L 100 500 L 350 500"
                            fill="none"
                            stroke="#ffffff"
                            strokeOpacity="0.1"
                            strokeWidth="3"
                        />
                        <path
                            ref={pathRef}
                            d="M 100 60 L 800 60 L 800 280 L 100 280 L 100 500 L 350 500"
                            fill="none"
                            stroke="#05A4A7"
                            strokeWidth="4"
                            strokeLinecap="round"
                        />
                    </svg>

                    {/* ROCKET - FLIES ALONG THE PATH */}
                    <div
                        ref={rocketRef}
                        className="absolute w-10 h-10 bg-white shadow-xl rounded-full flex items-center justify-center z-30 text-2xl border-2 border-slate-900 transform -translate-x-1/2 -translate-y-1/2"
                    >
                        🚀
                    </div>

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
                            whileInView={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                            viewport={{ margin: "-50px" }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="absolute flex flex-col items-center group z-40"
                            style={{
                                left: `${(step.pos.left / 900) * 100}%`,
                                top: `${(step.pos.top / 600) * 100}%`,
                                width: '220px'
                            }}
                        >
                            {/* Card Container */}
                            <div className="relative bg-white pt-10 pb-4 px-4 rounded-2xl shadow-lg border border-slate-100 text-center w-full transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">

                                {/* Floating Icon */}
                                <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 bg-white border-4 border-slate-50 rounded-full flex items-center justify-center shadow-md z-20">
                                    <span className="material-symbols-outlined text-2xl text-slate-800">
                                        {step.icon}
                                    </span>
                                    {/* Number Badge */}
                                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-slate-900 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                                        {step.id}
                                    </div>
                                </div>

                                {/* Content */}
                                <div>
                                    <h3 className="font-bold text-slate-900 text-lg mb-1 leading-tight">{step.title}</h3>
                                    <p className="text-[10px] text-primary font-bold uppercase tracking-wide mb-2 opacity-80">{step.subtitle}</p>
                                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 }}
                        className="absolute left-[300px] top-[500px] -translate-y-1/2 ml-0 flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-3xl text-green-500 animate-bounce">flag</span>
                        <span className="font-bold text-white text-lg">Goal!</span>
                    </motion.div>
                </div>

                {/* MOBILE LIST LAYOUT */}
                {/* MOBILE LIST LAYOUT - ALTERNATING & COMPACT */}
                {/* MOBILE LIST LAYOUT - ALTERNATING & COMPACT */}
                <div ref={mobileWrapperRef} className="lg:hidden w-full max-w-md mx-auto mt-4 relative px-2">
                    {/* Central Line Base */}
                    <div className="absolute left-1/2 top-4 bottom-4 w-0.5 bg-slate-700/20 -translate-x-1/2 rounded-full">
                        {/* Scroll Progress Line */}
                        <div ref={mobileProgressLineRef} className="absolute top-0 left-0 w-full bg-[#05A4A7] rounded-full" style={{ height: '0%' }}></div>

                        {/* Mobile Rocket */}
                        <div
                            ref={mobileRocketRef}
                            className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-white border-2 border-slate-900 rounded-full flex items-center justify-center text-lg shadow-lg z-20 -mt-4 rotate-[135deg]"
                        >
                            🚀
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 py-4">
                        {steps.map((step, index) => {
                            const isEven = index % 2 === 0; // Left Side
                            return (
                                <div key={index} className={`relative flex items-center justify-between w-full ${isEven ? '' : 'flex-row-reverse'}`}>

                                    {/* CONTENT CARD (42% Width to fit tight screens) */}
                                    <div className="w-[42%]">
                                        <div className={`bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm relative ${isEven ? 'text-right' : 'text-left'}`}>
                                            <h3 className="font-bold text-slate-900 text-sm leading-tight mb-0.5">{step.title}</h3>
                                            <p className="text-[9px] text-[#05A4A7] font-bold uppercase mb-1 tracking-wide">{step.subtitle}</p>
                                            <p className="text-[10px] text-slate-500 leading-tight">{step.description}</p>
                                        </div>
                                    </div>

                                    {/* CENTER ICON */}
                                    <div className="absolute left-1/2 -translate-x-1/2 z-10 flex flex-col items-center justify-center">
                                        <div className="w-8 h-8 bg-slate-900 border-2 border-[#062929] rounded-full flex items-center justify-center text-white shadow-md">
                                            <span className="material-symbols-outlined text-xs">{step.icon}</span>
                                        </div>
                                    </div>

                                    {/* SPACER */}
                                    <div className="w-[42%]"></div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Process;
