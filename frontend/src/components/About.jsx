import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const titleRef = useRef(null);
    const p1Ref = useRef(null);
    const p2Ref = useRef(null);
    const btnRef = useRef(null);
    const containerRef = useRef(null);

    // New Refs for Stats Section
    const statsContainerRef = useRef(null);
    const leftColRef = useRef(null);
    const rightColRef = useRef(null);

    useEffect(() => {
        const titleContainer = titleRef.current;
        const p1 = p1Ref.current;
        const p2 = p2Ref.current;
        const btn = btnRef.current;
        const container = containerRef.current;
        const statsContainer = statsContainerRef.current;
        const leftCol = leftColRef.current;
        const rightCol = rightColRef.current;

        // Helper to split text
        const splitAndAnimate = (element, initialOpacity = '0.2') => {
            if (!element) return null;
            const text = element.innerText; // Get text
            element.innerHTML = ''; // Clear
            const spans = [];
            text.split('').forEach((char) => {
                const span = document.createElement('span');
                span.innerText = char;
                span.style.opacity = initialOpacity;
                element.appendChild(span);
                spans.push(span);
            });
            return spans;
        };

        // --- Title Animation ---
        if (titleContainer) {
            const line1 = titleContainer.querySelector('.line-1-text');
            const line2 = titleContainer.querySelector('.line-2-text');
            const spans1 = splitAndAnimate(line1);
            const spans2 = splitAndAnimate(line2);

            if (spans1 && spans2) {
                gsap.to([...spans1, ...spans2], {
                    opacity: 1,
                    color: '#333333',
                    stagger: 0.05,
                    scrollTrigger: {
                        trigger: titleContainer,
                        start: "top 40%",
                        end: "top 10%",
                        scrub: true,
                    }
                });
            }
            gsap.fromTo(line1, { x: "30%" }, {
                x: "0%",
                scrollTrigger: {
                    trigger: titleContainer,
                    start: "top 90%",
                    end: "top 20%",
                    scrub: 1
                }
            });
            gsap.fromTo(line2, { x: "-30%" }, {
                x: "0%",
                scrollTrigger: {
                    trigger: titleContainer,
                    start: "top 90%",
                    end: "top 20%",
                    scrub: 1
                }
            });
        }

        // --- Paragraphs & Button Animation ---
        if (p1 && p2 && btn && container) {
            const p1Spans = splitAndAnimate(p1, '0.1');
            const p2Spans = splitAndAnimate(p2, '0.1');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top 70%",
                    end: "bottom 60%",
                    scrub: 2,
                }
            });

            if (p1Spans && p1Spans.length > 0) {
                tl.to(p1Spans, {
                    opacity: 1,
                    color: '#444444',
                    stagger: 0.02,
                    duration: 1
                }, "textStart");
            }

            if (p2Spans && p2Spans.length > 0) {
                tl.fromTo(p2Spans,
                    { x: 50, opacity: 0.1 },
                    {
                        x: 0,
                        opacity: 1,
                        color: '#4b5563',
                        stagger: 0.01,
                        duration: 1
                    },
                    "textStart+=0.5"
                );
            }

            tl.fromTo(btn,
                { opacity: 0, y: 30, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 0.5 },
                ">+=0.2"
            );
        }

        // --- Stats Grid Animations ---
        // 1. Scroll Scrub Logic (Left/Right Columns Slide In)
        if (leftCol && rightCol && statsContainer) {
            // Left Column: Slides in from Left
            gsap.fromTo(leftCol,
                { x: -100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    scrollTrigger: {
                        trigger: statsContainer,
                        start: "top 85%",
                        end: "top 50%",
                        scrub: 1
                    }
                }
            );

            // Right Column: Slides in from Right
            gsap.fromTo(rightCol,
                { x: 100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    scrollTrigger: {
                        trigger: statsContainer,
                        start: "top 85%",
                        end: "top 50%",
                        scrub: 1
                    }
                }
            );
        }

        // 2. Hover Logic (Number Reprint Animation)
        const cleanupContext = gsap.context(() => {
            if (statsContainer) {
                const cards = statsContainer.querySelectorAll('.stats-card');
                cards.forEach(card => {
                    const numberText = card.querySelector('.stat-number');
                    if (numberText) {
                        card.addEventListener('mouseenter', () => {
                            gsap.fromTo(numberText,
                                { y: 60, opacity: 0 },
                                { y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.7)", overwrite: true }
                            );
                        });
                    }
                });
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
            cleanupContext.revert(); // Context revert handles cleanup of animations/events created within it
        };
    }, []);

    return (
        <div className="w-full bg-[#f2f2f2] text-[#1a1a1a] py-20 px-4 md:px-10 relative">

            {/* Fixed Floating Badge on Screen */}
            <div className="fixed bottom-10 right-10 z-50 text-white pointer-events-none mix-blend-difference hidden md:block">
                <div className="relative w-32 h-32 flex items-center justify-center animate-spin-slow">
                    <svg className="w-full h-full absolute inset-0 text-[10px] uppercase tracking-widest" viewBox="0 0 100 100">
                        <defs>
                            <path id="circlePathFixed" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
                        </defs>
                        <text>
                            <textPath href="#circlePathFixed" startOffset="0%" textLength="220" className="fill-current font-bold">
                                • LET'S TALK NOW • LET'S TALK NOW •
                            </textPath>
                        </text>
                    </svg>
                    <ArrowUpRight className="w-10 h-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
            </div>

            <div className="max-w-[1700px] mx-auto">

                {/* Section 1: WHO WE ARE */}
                <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 relative">

                    {/* Left Content */}
                    <div>
                        <div ref={titleRef} className="flex flex-col mb-12 overflow-hidden">
                            <div className="line-1-wrapper self-end lg:self-auto">
                                <h2 className="line-1-text text-[12vw] leading-[0.85] font-bold tracking-tighter text-[#333]">
                                    WHO
                                </h2>
                            </div>
                            <div className="line-2-wrapper self-start lg:self-auto">
                                <h2 className="line-2-text text-[12vw] leading-[0.85] font-bold tracking-tighter text-[#333]">
                                    WE ARE
                                </h2>
                            </div>
                        </div>
                        <p ref={p1Ref} className="text-2xl md:text-4xl font-medium leading-tight text-[#444] max-w-2xl">
                            As an innovative software agency in the digital landscape, APPZETO transcends code, crafting your vision into a digital legacy that endures.
                        </p>
                    </div>

                    {/* Right Content */}
                    <div className="flex flex-col justify-end items-start lg:items-end lg:pl-20">
                        <div className="max-w-md space-y-8">
                            <p ref={p2Ref} className="text-lg text-gray-600 leading-relaxed overflow-hidden">
                                We build with precision, staying updated with the latest tech (MERN, AI, Cloud) to make your brand a formidable force in the digital wilderness and deliver exceptional web and app experiences.
                            </p>

                            {/* Button Wrapper */}
                            <div ref={btnRef} className="flex items-center gap-8 opacity-0 translate-y-8">
                                <button className="px-8 py-4 border border-gray-400 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                                    About Us
                                </button>

                                {/* Static Badge */}
                                <div className="relative w-24 h-24 flex items-center justify-center border border-gray-400 rounded-full">
                                    <div className="text-2xl font-black text-[#333]">A</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 2: Stats Grid */}
                <div ref={statsContainerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative overflow-hidden">

                    {/* Column 1 (Left) */}
                    <div ref={leftColRef} className="lg:col-span-5 flex flex-col gap-6">
                        {/* Card 1: Awards - Hover Orange */}
                        <div className="bg-[#e0e5e5] rounded-[2rem] p-10 flex flex-col justify-between h-[400px] hover:shadow-xl transition-all duration-500 group hover:bg-orange-500 border border-transparent stats-card cursor-pointer">
                            <div className="stat-number text-[100px] leading-none font-medium text-[#333] transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2 origin-left group-hover:text-white block">
                                15<sup className="text-4xl align-top">+</sup>
                            </div>
                            <div className="text-right">
                                <h4 className="text-3xl font-bold uppercase leading-none tracking-tight text-[#333] group-hover:text-white transition-colors">Awards &<br />Recognition</h4>
                            </div>
                        </div>

                        {/* Card 2: Tech Experts - Hover Black */}
                        <div className="bg-[#e0e5e5] rounded-[2rem] p-10 flex flex-col justify-between h-[400px] hover:shadow-xl transition-all duration-500 group hover:bg-black border border-transparent stats-card cursor-pointer">
                            <div className="stat-number text-[100px] leading-none font-medium text-[#333] transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2 origin-left group-hover:text-white block">
                                25<sup className="text-4xl align-top">+</sup>
                            </div>
                            <div className="text-right relative">
                                <h4 className="text-3xl font-bold uppercase leading-none tracking-tight text-[#333] group-hover:text-white transition-colors">Tech<br />Experts</h4>
                            </div>
                        </div>
                    </div>

                    {/* Column 2 (Right) - Shifted Down */}
                    <div ref={rightColRef} className="lg:col-span-7 flex flex-col gap-6 lg:mt-32">
                        {/* Card 3: Projects - Default (White Hover) */}
                        <div className="bg-[#e0e5e5] rounded-[2rem] p-12 flex flex-col justify-between h-[500px] hover:shadow-xl transition-all duration-500 relative overflow-hidden group hover:bg-[#bce3d1] border border-transparent stats-card cursor-pointer">
                            <div className="stat-number text-[150px] leading-none font-medium text-[#333] relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2 origin-left block">
                                100<sup className="text-6xl align-top">+</sup>
                            </div>
                            <div className="text-right z-10">
                                <h4 className="text-4xl md:text-5xl font-bold uppercase leading-none tracking-tight text-[#333] group-hover:text-black transition-colors">Projects<br />Completed</h4>
                            </div>
                        </div>

                        {/* Card 4: Years - Hover Yellow - No Circle */}
                        <div className="bg-[#e0e5e5] rounded-[2rem] p-10 flex flex-col justify-between h-[300px] hover:shadow-xl transition-all duration-500 group hover:bg-yellow-400 border border-transparent stats-card cursor-pointer">
                            <div className="stat-number text-[100px] leading-none font-medium text-[#333] transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2 origin-left block">
                                02<sup className="text-4xl align-top">+</sup>
                            </div>

                            <div className="text-right">
                                <h4 className="text-3xl font-bold uppercase leading-none tracking-tight text-[#333] group-hover:text-black transition-colors">Years of<br />Excellence</h4>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default About;
