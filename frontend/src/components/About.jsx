import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const About = () => {
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 relative">

                    {/* Left Content */}
                    <div>
                        <h2 className="text-[12vw] leading-[0.85] font-bold tracking-tighter text-[#333] mb-12">
                            WHO <br /> WE ARE
                        </h2>
                        <p className="text-2xl md:text-4xl font-medium leading-tight text-[#444] max-w-2xl">
                            As an innovative software agency in the digital landscape, APPZETO transcends code, crafting your vision into a digital legacy that endures.
                        </p>
                    </div>

                    {/* Right Content */}
                    <div className="flex flex-col justify-end items-start lg:items-end lg:pl-20">
                        <div className="max-w-md space-y-8">
                            <p className="text-lg text-gray-600 leading-relaxed">
                                We build with precision, staying updated with the latest tech (MERN, AI, Cloud) to make your brand a formidable force in the digital wilderness and deliver exceptional web and app experiences.
                            </p>

                            <div className="flex items-center gap-8">
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
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">

                    {/* Column 1 (Left) */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        {/* Card 1: Awards - Hover Orange */}
                        <div className="bg-[#e0e5e5] rounded-[2rem] p-10 flex flex-col justify-between h-[400px] hover:shadow-xl transition-all duration-500 group hover:bg-orange-500 border border-transparent">
                            <div className="text-[100px] leading-none font-medium text-[#333] transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2 origin-left group-hover:text-white">
                                15<sup className="text-4xl align-top">+</sup>
                            </div>
                            <div className="text-right">
                                <h4 className="text-3xl font-bold uppercase leading-none tracking-tight text-[#333] group-hover:text-white transition-colors">Awards &<br />Recognition</h4>
                            </div>
                        </div>

                        {/* Card 2: Tech Experts - Hover Black */}
                        <div className="bg-[#e0e5e5] rounded-[2rem] p-10 flex flex-col justify-between h-[400px] hover:shadow-xl transition-all duration-500 group hover:bg-black border border-transparent">
                            <div className="text-[100px] leading-none font-medium text-[#333] transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2 origin-left group-hover:text-white">
                                25<sup className="text-4xl align-top">+</sup>
                            </div>
                            <div className="text-right relative">
                                <h4 className="text-3xl font-bold uppercase leading-none tracking-tight text-[#333] group-hover:text-white transition-colors">Tech<br />Experts</h4>
                            </div>
                        </div>
                    </div>

                    {/* Column 2 (Right) - Shifted Down */}
                    <div className="lg:col-span-7 flex flex-col gap-6 lg:mt-32">
                        {/* Card 3: Projects - Default (White Hover) */}
                        <div className="bg-[#e0e5e5] rounded-[2rem] p-12 flex flex-col justify-between h-[500px] hover:shadow-xl transition-all duration-500 relative overflow-hidden group hover:bg-[#bce3d1] border border-transparent">
                            <div className="text-[150px] leading-none font-medium text-[#333] relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2 origin-left">
                                100<sup className="text-6xl align-top">+</sup>
                            </div>
                            <div className="text-right z-10">
                                <h4 className="text-4xl md:text-5xl font-bold uppercase leading-none tracking-tight text-[#333] group-hover:text-black transition-colors">Projects<br />Completed</h4>
                            </div>
                        </div>

                        {/* Card 4: Years - Hover Yellow - No Circle */}
                        <div className="bg-[#e0e5e5] rounded-[2rem] p-10 flex flex-col justify-between h-[300px] hover:shadow-xl transition-all duration-500 group hover:bg-yellow-400 border border-transparent">
                            <div className="text-[100px] leading-none font-medium text-[#333] transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2 origin-left">
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
