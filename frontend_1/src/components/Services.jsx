
import React from 'react';

const Services = () => {
    return (
        <div className="bg-[#f6f8f8] dark:bg-[#10221f] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
            <main className="relative w-full overflow-hidden">
                {/* Abstract Background blobs */}
                <div className="absolute top-0 left-0 w-full h-[800px] overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#13ecc8]/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-normal"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-normal"></div>
                </div>
                <div className="max-w-7xl mx-auto px-6 lg:px-20 py-16 lg:py-24">
                    {/* Section Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                        <div className="max-w-2xl">
                            <span className="text-[#13ecc8] font-bold tracking-wider uppercase text-sm mb-2 block">Our Expertise</span>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight mb-4">
                                Empowering Business with <br className="hidden md:block" /> <span className="relative inline-block">Next-Gen Tech<span className="absolute bottom-1 left-0 w-full h-3 bg-[#13ecc8]/30 -z-10 skew-x-12"></span></span>
                            </h1>
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                                From intelligent AI algorithms to scalable SaaS platforms, we build the digital infrastructure that propels your future forward.
                            </p>
                        </div>
                        <div className="hidden md:block pb-2">
                            <button className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold group">
                                View Full Portfolio
                                <span className="material-symbols-outlined text-[#13ecc8] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                    {/* Bento Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Main Feature Card (Spans 2 columns on large screens) */}
                        <div className="group relative col-span-1 md:col-span-2 lg:col-span-2 rounded-2xl bg-black border border-gray-800 p-8 overflow-hidden h-full flex flex-col justify-between min-h-[320px] transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
                            {/* Background Image & Overlay */}
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/60"></div>

                            <div className="relative z-10 flex flex-col items-start gap-4">
                                <div className="size-14 rounded-xl bg-[#13ecc8]/20 backdrop-blur-md flex items-center justify-center text-[#13ecc8] mb-2 border border-[#13ecc8]/30">
                                    <span className="material-symbols-outlined text-[32px]">psychology</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white tracking-wide">AI & Machine Learning</h3>
                                <p className="text-gray-300 leading-relaxed max-w-md font-medium">
                                    Unlock the power of your data with custom predictive analytics and neural networks. We build intelligent systems that learn, adapt, and drive decision-making automation for your enterprise.
                                </p>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-white border border-white/20">NLP</span>
                                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-white border border-white/20">Computer Vision</span>
                                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-white border border-white/20">Predictive Modeling</span>
                                </div>
                            </div>
                            <a className="relative z-10 mt-8 inline-flex items-center text-sm font-bold text-white hover:text-[#13ecc8] transition-colors" href="#">
                                Learn more <span className="material-symbols-outlined ml-1 text-sm transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
                            </a>
                        </div>
                        {/* Web Development Card */}
                        <div className="group relative col-span-1 rounded-2xl bg-black border border-gray-800 p-8 flex flex-col justify-between h-full min-h-[320px] overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
                            {/* Background Image & Overlay */}
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/60"></div>

                            <div className="relative z-10">
                                <div className="size-12 rounded-lg bg-blue-500/20 backdrop-blur-md flex items-center justify-center text-blue-400 mb-6 border border-blue-500/30">
                                    <span className="material-symbols-outlined">code</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 tracking-wide">Web Development</h3>
                                <p className="text-gray-300 text-sm leading-relaxed font-medium">
                                    Responsive, high-performance web applications built on modern stacks like React, Next.js, and Node.js.
                                </p>
                            </div>
                            <a className="relative z-10 mt-6 inline-flex items-center text-sm font-bold text-white hover:text-blue-400 transition-colors" href="#">
                                Explore Web Services <span className="material-symbols-outlined ml-1 text-sm transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
                            </a>
                        </div>
                        {/* Mobile App Development Card */}
                        <div className="group relative col-span-1 rounded-2xl bg-black border border-gray-800 p-8 flex flex-col justify-between h-full min-h-[280px] overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
                            {/* Background Image & Overlay */}
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/60"></div>

                            <div className="relative z-10">
                                <div className="size-12 rounded-lg bg-purple-500/20 backdrop-blur-md flex items-center justify-center text-purple-400 mb-6 border border-purple-500/30">
                                    <span className="material-symbols-outlined">smartphone</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 tracking-wide">Mobile App Dev</h3>
                                <p className="text-gray-300 text-sm leading-relaxed font-medium">
                                    Native (iOS/Android) and cross-platform solutions (Flutter/React Native) that deliver seamless user experiences.
                                </p>
                            </div>
                            <a className="relative z-10 mt-6 inline-flex items-center text-sm font-bold text-white hover:text-purple-400 transition-colors" href="#">
                                View Mobile Solutions <span className="material-symbols-outlined ml-1 text-sm transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
                            </a>
                        </div>
                        {/* SaaS Solutions Card */}
                        <div className="group relative col-span-1 rounded-2xl bg-black border border-gray-800 p-8 flex flex-col justify-between h-full min-h-[280px] overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
                            {/* Background Image & Overlay */}
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/60"></div>

                            <div className="relative z-10">
                                <div className="size-12 rounded-lg bg-teal-500/20 backdrop-blur-md flex items-center justify-center text-teal-400 mb-6 border border-teal-500/30">
                                    <span className="material-symbols-outlined">cloud_upload</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 tracking-wide">SaaS Solutions</h3>
                                <p className="text-gray-300 text-sm leading-relaxed font-medium">
                                    Scalable, multi-tenant cloud architectures designed for growth, security, and high availability.
                                </p>
                            </div>
                            <a className="relative z-10 mt-6 inline-flex items-center text-sm font-bold text-white hover:text-teal-400 transition-colors" href="#">
                                Build your SaaS <span className="material-symbols-outlined ml-1 text-sm transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
                            </a>
                        </div>
                        {/* Cloud Infrastructure Card */}
                        <div className="group relative col-span-1 rounded-2xl bg-black border border-gray-800 p-8 flex flex-col justify-between h-full min-h-[280px] overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
                            {/* Background Image & Overlay */}
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-efc02570fbc9?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/60"></div>

                            <div className="relative z-10">
                                <div className="size-12 rounded-lg bg-orange-500/20 backdrop-blur-md flex items-center justify-center text-orange-400 mb-6 border border-orange-500/30">
                                    <span className="material-symbols-outlined">dns</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 tracking-wide">Cloud Infrastructure</h3>
                                <p className="text-gray-300 text-sm leading-relaxed font-medium">
                                    Expert AWS/Azure management, DevOps implementation, and serverless deployment strategies.
                                </p>
                            </div>
                            <a className="relative z-10 mt-6 inline-flex items-center text-sm font-bold text-white hover:text-orange-400 transition-colors" href="#">
                                Optimize Cloud <span className="material-symbols-outlined ml-1 text-sm transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
                            </a>
                        </div>
                        {/* UI/UX Design Card */}
                        <div className="group relative col-span-1 md:col-span-2 lg:col-span-1 rounded-2xl bg-black border border-gray-800 p-8 flex flex-col justify-between h-full min-h-[280px] overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
                            {/* Background Image & Overlay */}
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/60"></div>

                            <div className="relative z-10">
                                <div className="size-12 rounded-lg bg-pink-500/20 backdrop-blur-md flex items-center justify-center text-pink-400 mb-6 border border-pink-500/30">
                                    <span className="material-symbols-outlined">brush</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 tracking-wide">UI/UX Design</h3>
                                <p className="text-gray-300 text-sm leading-relaxed font-medium">
                                    User-centric interfaces that blend aesthetics with functionality to drive engagement and conversion.
                                </p>
                            </div>
                            <a className="relative z-10 mt-6 inline-flex items-center text-sm font-bold text-white hover:text-pink-400 transition-colors" href="#">
                                See Designs <span className="material-symbols-outlined ml-1 text-sm transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
                            </a>
                        </div>
                    </div>
                    {/* Bottom CTA Banner */}
                    <div className="mt-16 relative w-full rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 dark:from-[#162e2a] dark:to-black overflow-hidden px-8 py-12 md:px-16 md:py-16 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
                        {/* Decorative pattern */}
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" data-alt="Subtle geometric cube pattern background texture"></div>
                        <div className="absolute top-0 right-0 w-64 h-full bg-[#13ecc8]/10 blur-3xl -skew-x-12 translate-x-10"></div>
                        <div className="relative z-10 max-w-2xl">
                            <h2 className="text-3xl font-bold text-white mb-4">Ready to transform your digital presence?</h2>
                            <p className="text-slate-300 text-lg">Let's discuss how our technology solutions can solve your specific business challenges today.</p>
                        </div>
                        <div className="relative z-10 shrink-0">
                            <button className="bg-[#13ecc8] hover:bg-white hover:text-slate-900 text-slate-900 px-8 py-4 rounded-xl text-base font-bold transition-all shadow-lg shadow-[#13ecc8]/25">
                                Get a Free Consultation
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Services;
