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

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (pathRef.current && rocketRef.current) {
                const pathLength = pathRef.current.getTotalLength();
                // Set initial line state (hidden)
                gsap.set(pathRef.current, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

                // Create a proxy object to animate progress from 0 to 1
                const progressObj = { value: 0 };

                gsap.to(progressObj, {
                    value: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top center",
                        end: "bottom center",
                        scrub: 1,
                    },
                    onUpdate: () => {
                        // 1. Update Line Drawing
                        const drawLength = pathLength * progressObj.value;
                        gsap.set(pathRef.current, { strokeDashoffset: pathLength - drawLength });

                        // 2. Update Rocket Position
                        const point = pathRef.current.getPointAtLength(drawLength);
                        // Get points slightly behind and ahead to calculate smooth rotation
                        const nextPoint = pathRef.current.getPointAtLength(Math.min(drawLength + 1, pathLength));

                        // Calculate angle based on trajectory
                        let angle = 0;
                        if (nextPoint && point) {
                            angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
                        }

                        // Convert SVG coordinates to percentages relative to container
                        const xPercent = (point.x / 900) * 100;
                        const yPercent = (point.y / 600) * 100;

                        gsap.set(rocketRef.current, {
                            left: `${xPercent}%`,
                            top: `${yPercent}%`,
                            rotation: angle + 45, // Adjusted to match the rocket icon's default orientation
                            force3D: true
                        });
                    }
                });
            }
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="bg-slate-50 pt-12 pb-32 lg:h-auto lg:min-h-[850px] relative overflow-hidden flex flex-col items-center justify-center">

            <div className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]"
                style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
            </div>

            <div className="max-w-[1200px] mx-auto px-4 w-full relative z-10 h-full flex flex-col justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 flex-shrink-0"
                >
                    <span className="bg-white border border-slate-200 text-slate-900 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm mb-3 inline-block">
                        Workflow
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-2">
                        How We Work
                    </h2>
                    <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base">
                        Simple steps to take your idea from concept to reality.
                    </p>
                </motion.div>

                {/* DESKTOP COMPACT LAYOUT */}
                <div className="hidden lg:block relative h-[600px] w-full max-w-[900px] mx-auto flex-grow-0">
                    <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 900 600">
                        {/* 
                           Compact Layout:
                           Row 1 Y: 60
                           Row 2 Y: 280 (Gap = 220px)
                           Row 3 Y: 500 (Gap = 220px)
                        */}
                        <path
                            d="M 100 60 L 800 60 Q 900 60 900 170 Q 900 280 800 280 L 100 280 Q 0 280 0 390 Q 0 500 100 500 L 250 500"
                            fill="none"
                            stroke="#e2e8f0"
                            strokeWidth="3"
                        />
                        <path
                            ref={pathRef}
                            d="M 100 60 L 800 60 Q 900 60 900 170 Q 900 280 800 280 L 100 280 Q 0 280 0 390 Q 0 500 100 500 L 250 500"
                            fill="none"
                            stroke="#0f172a"
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
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ margin: "-50px" }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="absolute flex flex-col items-center group"
                            style={{
                                left: `${(step.pos.left / 900) * 100}%`,
                                top: `${(step.pos.top / 600) * 100}%`,
                                transform: 'translate(-50%, -50%)',
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
                        <span className="font-bold text-slate-900 text-lg">Goal!</span>
                    </motion.div>
                </div>

                {/* MOBILE LIST LAYOUT */}
                <div className="lg:hidden w-full max-m-md mx-auto space-y-4 mt-8">
                    {steps.map((step, index) => (
                        <div key={index} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex gap-4 items-start">
                            <div className="relative flex-shrink-0">
                                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-900">
                                    <span className="material-symbols-outlined text-xl">{step.icon}</span>
                                </div>
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-slate-900 text-white text-[10px] rounded-full flex items-center justify-center border border-white">
                                    {step.id}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-base">{step.title}</h3>
                                <p className="text-[10px] text-primary font-bold uppercase mb-1 opacity-80">{step.subtitle}</p>
                                <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
