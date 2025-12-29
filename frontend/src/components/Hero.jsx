import React from 'react';

const Hero = () => {
    const marqueeItems = [
        "WEB DEVELOPMENT", "MOBILE APPS", "CLOUD SOLUTIONS", "UI/UX DESIGN", "DIGITAL STRATEGY", "E-COMMERCE",
        "WEB DEVELOPMENT", "MOBILE APPS", "CLOUD SOLUTIONS", "UI/UX DESIGN", "DIGITAL STRATEGY", "E-COMMERCE"
    ];

    return (
        <div className="w-full h-[calc(100vh-80px)] max-w-[1700px] mx-auto px-6 md:px-10 flex flex-col pb-0">

            {/* 1. Top Section: Heading + Description Side-by-side */}
            <div className="flex-none flex items-end justify-between pt-2 pb-4 border-b border-gray-300 overflow-hidden">
                <h1 id="hero-heading" className="text-[9vw] leading-[0.8] font-bold tracking-tighter text-gray-900 opacity-0 -translate-y-full">
                    APPZETO
                </h1>
                <p id="hero-desc" className="hidden md:block text-gray-700 text-xs leading-tight max-w-xs text-right pb-2 opacity-0 translate-x-[50px]">
                    Building modern, fully responsive, and scalable digital solutions. We specialize in Web Development, Mobile Apps, and Cloud services.
                </p>
            </div>

            {/* 2. Info Grid - 3 Columns below line */}
            <div id="hero-info-grid" className="flex-none grid grid-cols-3 gap-2 py-3 items-center opacity-0 -translate-y-[20px]">
                <div className="text-[10px] mobile:text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    @2025
                </div>
                <div className="text-center text-[10px] mobile:text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Software Solutions
                </div>
                <div className="text-right text-[10px] mobile:text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    INDIA, GLOBAL
                </div>
            </div>

            {/* 3. Main Content (Image + List) */}
            <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-6 pb-2">

                {/* Left Sidebar Service List - From Left */}
                <div id="hero-service-list" className="hidden lg:flex flex-col justify-end pb-16 pl-2 opacity-0 -translate-x-[50px]">
                    {/* Can be removed or kept based on preference, keeping for now but minimal */}
                    <ul className="space-y-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
                        {/* List items if needed, or clear for cleaner look if marquee covers services */}
                        <li className="flex items-center gap-2">
                            <span className="text-xl leading-none text-gray-400">•</span> Strategy
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-xl leading-none text-gray-400">•</span> Design
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-xl leading-none text-gray-400">•</span> Development
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-xl leading-none text-gray-400">•</span> Marketing
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-xl leading-none text-gray-400">•</span> AI & ML
                        </li>
                    </ul>
                </div>

                {/* Main Hero Image - Relative */}
                <div className="lg:col-span-2 h-full w-full relative">
                    <img
                        id="hero-main-image"
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                        alt="Team Collaboration"
                        className="absolute inset-0 w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700 opacity-0"
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 hover:opacity-10 transition-opacity pointer-events-none"></div>
                </div>
            </div>

            {/* 4. Marquee Section - Fixed Height at Bottom */}
            <div className="flex-none bg-[#D33C1D] text-white overflow-hidden py-3">
                <div className="whitespace-nowrap animate-marquee flex items-center">
                    {marqueeItems.map((item, index) => (
                        <span key={index} className="mx-8 font-bold text-sm tracking-widest uppercase flex items-center">
                            {item} <span className="ml-8 text-[#ff8e75]">•</span>
                        </span>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Hero;
