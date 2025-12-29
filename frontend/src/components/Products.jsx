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
        image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&auto=format&fit=crop&w=1064&q=80"
    },
    {
        category: "Mobile Solutions",
        title: "FOOD DELIVERY APP",
        description: "Complete white-label solution for food delivery services featuring real-time tracking and vendor portals.",
        features: ["Live Tracking", "Multi-Vendor", "Driver App"],
        image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=2071&auto=format&fit=crop"
    },
    {
        category: "Enterprise Tools",
        title: "ADMIN DASHBOARD",
        description: "Powerful administrative panels for managing users, content, and system metrics with granular control.",
        features: ["Role Management", "Real-time Metrics", "Custom Reports"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
    },
    {
        category: "AI Integrations",
        title: "PREDICTIVE ANALYTICS",
        description: "Harness the power of machine learning to forecast trends and optimize business operations.",
        features: ["Data Modeling", "Trend Forecasting", "Automated Insights"],
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop"
    }
];

const Products = () => {
    const containerRef = useRef(null);
    const headerTitleRef = useRef(null);
    // Removed imageContainerRef as we don't need to pin it via JS anymore

    useEffect(() => {
        // 1. Header "Fill" Animation
        const headerEl = headerTitleRef.current;
        if (headerEl) {
            const chars = headerEl.innerText.split('');
            headerEl.innerHTML = '';
            chars.forEach((char) => {
                const span = document.createElement('span');
                span.innerText = char;
                span.style.opacity = '0.2';
                span.style.transition = 'color 0.1s';
                headerEl.appendChild(span);
            });

            const spans = headerEl.querySelectorAll('span');

            gsap.to(spans, {
                opacity: 1,
                color: '#ffffff',
                stagger: 0.1,
                scrollTrigger: {
                    trigger: headerEl,
                    start: "top 80%",
                    end: "top 20%",
                    scrub: true,
                }
            });
        }

        // 2. Project Animations
        products.forEach((_, i) => {
            const currentImg = document.getElementById(`prod-img-${i}`);
            const triggerEl = document.getElementById(`prod-text-${i}`);

            // Skip animation for the first image OR animate it differently
            // Here we basically say: default CSS state is hidden for all except 0. 
            // We'll trust GSAP to handle the states.

            if (currentImg && triggerEl) {
                // If it's the FIRST image, it should simply be visible from the start
                if (i === 0) {
                    gsap.set(currentImg, {
                        opacity: 1,
                        clipPath: "circle(150% at 50% 50%)",
                        rotationY: 0,
                        zIndex: 1
                    });
                } else {
                    // Subsequent images animate IN from Left with 3D Rotate
                    gsap.fromTo(currentImg,
                        {
                            clipPath: "circle(0% at 0% 50%)", // Start small circle at LEFT edge
                            rotationY: -90, // Rotate 90deg (facing left)
                            transformOrigin: "left center", // Pivot from left
                            opacity: 0,
                            zIndex: i + 1
                        },
                        {
                            clipPath: "circle(150% at 50% 50%)", // Expand to full
                            rotationY: 0, // Face front
                            opacity: 1,
                            duration: 1.5,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: triggerEl,
                                start: "top center", // When text hits center
                                end: "bottom center",
                                scrub: 1,
                            }
                        }
                    );
                }
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };

    }, []);

    return (
        <div ref={containerRef} className="w-full bg-[#111] text-white relative">

            {/* Top Header Section */}
            <div className="pt-24 pb-12 px-8 md:px-12 mb-[5vh]">
                <h2 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wide">Our Products</h2>
                <h3
                    ref={headerTitleRef}
                    className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-none text-gray-700 max-w-4xl"
                >
                    Digital Solutions
                </h3>
            </div>

            <div className="relative">
                {/* --- Sticky Image Overlay (Centered + 3D Perspective) --- */}
                {/* Added perspective class for 3D effect */}
                <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none z-0 perspective-1000">
                    {products.map((product, i) => (
                        <div
                            key={i}
                            id={`prod-img-${i}`}
                            // REDUCED SIZE here: w-[60vw] -> [50vw], md:w-[600px] -> [450px]
                            className="absolute w-[50vw] h-[35vw] md:w-[450px] md:h-[550px] bg-gray-800 rounded-2xl overflow-hidden shadow-2xl backface-hidden"
                            // For i > 0, we set opacity 0/clipPath via CSS init just in case JS lags, 
                            // but simpler to let GSAP handle. i=0 is opacity 1 via CSS.
                            style={{
                                opacity: i === 0 ? 1 : 0,
                                visibility: 'visible',
                                transformStyle: 'preserve-3d' // Ensure child 3D works
                            }}
                        >
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20"></div>
                        </div>
                    ))}
                </div>

                {/* --- Scrollable Product Texts (Overlay on top of sticky) --- */}
                {/* Negative margin top to pull text up over the sticky area if desired, or just flow naturally */}
                <div className="relative z-10 w-full px-8 md:px-12 pb-[20vh] mt-[-100vh]">
                    {/* Add spacer so first text starts late enough if needed, or just padding */}
                    <div className="h-[20vh]"></div>

                    {products.map((product, i) => (
                        <div
                            key={i}
                            id={`prod-text-${i}`}
                            // mt-[80vh] ensures large gaps between text blocks for scrolling time
                            className={`min-h-[80vh] flex flex-col justify-center max-w-lg mb-[10vh] pointer-events-auto ${i % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}
                        >
                            <div className="space-y-6 p-8 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl transform transition-transform duration-500 hover:scale-[1.02]">
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
