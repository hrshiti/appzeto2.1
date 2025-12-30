import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const products = [
    {
        category: "SaaS Platforms",
        title: "E-COMMERCE SUITE",
        description: "A comprehensive solution for scaling online businesses with advanced analytics and inventory management.",
        features: ["Secure Payments", "Inventory Sync", "AI Recommendations"],
        image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&auto=format&fit=crop&w=1064&q=80",
        faceClass: "rotate-x-0" // Front
    },
    {
        category: "Mobile Solutions",
        title: "FOOD DELIVERY APP",
        description: "Complete white-label solution for food delivery services featuring real-time tracking and vendor portals.",
        features: ["Live Tracking", "Multi-Vendor", "Driver App"],
        image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=2071&auto=format&fit=crop",
        faceClass: "rotate-x-90" // Top (Next in tumble sequence)
    },
    {
        category: "Enterprise Tools",
        title: "ADMIN DASHBOARD",
        description: "Powerful administrative panels for managing users, content, and system metrics with granular control.",
        features: ["Role Management", "Real-time Metrics", "Custom Reports"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        faceClass: "rotate-x-180" // Back
    },
    {
        category: "AI Integrations",
        title: "PREDICTIVE ANALYTICS",
        description: "Harness the power of machine learning to forecast trends and optimize business operations.",
        features: ["Data Modeling", "Trend Forecasting", "Automated Insights"],
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop",
        faceClass: "rotate-x-270" // Bottom
    }
];

const Products = () => {
    const containerRef = useRef(null);
    const headerTitleRef = useRef(null);
    const cubeRef = useRef(null);
    const textWrapperRef = useRef(null);

    useEffect(() => {
        // 1. Header Animation (Move + Fill) - Preserved
        const headerContainer = headerTitleRef.current;
        if (headerContainer) {
            const line1 = headerContainer.querySelector('.line-1-text');
            const line2 = headerContainer.querySelector('.line-2-text');

            const splitAndAnimate = (element) => {
                if (!element) return;
                const chars = element.innerText.split('');
                element.innerHTML = '';
                chars.forEach((char) => {
                    const span = document.createElement('span');
                    span.innerText = char;
                    span.style.opacity = '0.2';
                    element.appendChild(span);
                });
                return element.querySelectorAll('span');
            };

            const spans1 = splitAndAnimate(line1);
            const spans2 = splitAndAnimate(line2);

            if (spans1 && spans2) {
                gsap.to([...spans1, ...spans2], {
                    opacity: 1,
                    color: '#ffffff',
                    stagger: 0.05,
                    scrollTrigger: {
                        trigger: headerContainer,
                        start: "top 80%",
                        end: "top 20%",
                        scrub: true,
                    }
                });
            }

            gsap.fromTo(line1, { x: "30%" }, {
                x: "0%",
                scrollTrigger: {
                    trigger: headerContainer,
                    start: "top 90%",
                    end: "top 20%",
                    scrub: 1
                }
            });

            gsap.fromTo(line2, { x: "-30%" }, {
                x: "0%",
                scrollTrigger: {
                    trigger: headerContainer,
                    start: "top 90%",
                    end: "top 20%",
                    scrub: 1
                }
            });
        }

        // 2. 3D Cube Vertical Tumble Logic (High Velocity)
        if (cubeRef.current && textWrapperRef.current) {
            // We want to Rotate X (Vertical Tumble)
            // Normal rotation: 90deg per section.
            // High Velocity: Add 360deg spin between sections.
            // Total Rotation = (Sections * 90) + (Sections * 360) 
            const totalRotation = (products.length - 1) * 90 + (products.length - 1) * 360;

            gsap.to(cubeRef.current, {
                rotationX: totalRotation,
                ease: "power2.inOut", // Smooth acceleration/deceleration
                scrollTrigger: {
                    trigger: textWrapperRef.current,
                    start: "top center",
                    end: "bottom bottom",
                    scrub: 1, // Smooth scrubbing
                    snap: {
                        snapTo: 1 / (products.length - 1), // Snap to nearest section (e.g. 0, 0.33, 0.66, 1)
                        duration: { min: 0.2, max: 0.7 }, // Smooth snap duration
                        delay: 0.05, // Wait briefly after scroll stops
                        ease: "power2.out"
                    }
                }
            });

            // Mouse Move Interaction (Free Movement - Subtler)
            const handleMouseMove = (e) => {
                const { clientX, clientY, currentTarget } = e;
                const { width, height } = currentTarget.getBoundingClientRect();

                const xPos = (clientX / width) - 0.5;
                const yPos = (clientY / height) - 0.5;

                // Subtle tilt on top of the heavy spin
                gsap.to(cubeRef.current, {
                    rotationY: xPos * 15,
                    rotationZ: -xPos * 5,
                    duration: 0.5,
                    ease: "power2.out"
                });
            };

            window.addEventListener('mousemove', handleMouseMove);
            return () => window.removeEventListener('mousemove', handleMouseMove);
        }

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };

    }, []);

    return (
        <div ref={containerRef} className="w-full bg-[#111] text-white relative">

            {/* Header */}
            <div className="pt-24 pb-12 px-8 md:px-12 mb-[5vh] overflow-hidden">
                <h2 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wide">Our Products</h2>
                <div ref={headerTitleRef} className="flex flex-col">
                    <div className="line-1-wrapper self-start md:self-auto">
                        <h3 className="line-1-text text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-none text-gray-700">
                            Digital
                        </h3>
                    </div>
                    <div className="line-2-wrapper self-end md:self-auto">
                        <h3 className="line-2-text text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-none text-gray-700">
                            Solutions
                        </h3>
                    </div>
                </div>
            </div>

            <div className="relative">
                {/* --- 3D Cube Sticky Container --- */}
                <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none perspective-full z-0">

                    {/* The Rotating Cube - Vertical Tumble Mode */}
                    <div
                        ref={cubeRef}
                        className="relative w-[240px] h-[240px] md:w-[300px] md:h-[300px] preserve-3d transition-transform duration-75"
                    >
                        {products.map((product, i) => (
                            <div
                                key={i}
                                className={`absolute inset-0 bg-gray-800 rounded-xl overflow-hidden shadow-2xl backface-hidden border border-white/5 ${product.faceClass}`}
                            >
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-cover opacity-90"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                {/* Label Removed */}
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- Text Content (Scroll Trigger Source) --- */}
                <div ref={textWrapperRef} className="relative z-10 w-full px-8 md:px-12 mt-[-100vh] pb-[20vh]">

                    {/* Spacer */}
                    <div className="h-[40vh]"></div>

                    {products.map((product, i) => (
                        <div
                            key={i}
                            className={`min-h-[100vh] flex flex-col justify-center max-w-lg pointer-events-auto ${i % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}
                        >
                            <div className="space-y-6 p-8 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl">
                                <div className="space-y-2">
                                    <span className="text-xs font-bold text-[#D33C1D] border border-[#D33C1D]/30 px-2 py-1 rounded inline-block">
                                        {product.category}
                                    </span>
                                    <h4 className="text-3xl md:text-5xl font-bold uppercase tracking-tight leading-[0.9]">
                                        {product.title}
                                    </h4>
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {product.description}
                                </p>
                                <ul className="flex flex-wrap gap-4 pt-2">
                                    {product.features.map((feature, j) => (
                                        <li key={j} className="text-xs font-bold text-gray-400 flex items-center gap-1 uppercase">
                                            <span className="w-1 h-1 bg-[#D33C1D] rounded-full"></span> {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button className="text-sm font-bold uppercase tracking-wide border-b border-white pb-1 hover:text-[#D33C1D] hover:border-[#D33C1D] transition-colors inline-flex items-center gap-2">
                                    View Case Study <ArrowUpRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;
