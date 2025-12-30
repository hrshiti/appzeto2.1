import React from 'react';

const Vision = () => {
    return (
        <section className="relative z-30 w-full py-20 lg:py-32 px-4 md:px-10 overflow-hidden bg-white dark:bg-[#1A2E2B]">
            {/* Background Blurs */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#13ecc8]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#EAB308]/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

            <div className="max-w-[1200px] mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left Content */}
                    <div className="relative z-10 flex flex-col gap-8">
                        <div className="flex flex-col gap-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13ecc8]/10 border border-[#13ecc8]/20 w-fit">
                                <span className="flex h-2 w-2 rounded-full bg-[#13ecc8] animate-pulse"></span>
                                <span className="text-xs font-bold uppercase tracking-wider text-[#0d9488] dark:text-[#13ecc8]">Who We Are</span>
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight text-[#111817] dark:text-white">
                                Engineering the <br className="hidden lg:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#13ecc8] to-emerald-400">Digital Future.</span>
                            </h1>
                            <p className="text-lg text-[#618983] dark:text-gray-400 leading-relaxed max-w-lg">
                                We don't just write code; we build the digital infrastructure that powers industry leaders. From{' '}
                                <span className="text-[#111817] dark:text-white font-semibold">AI-driven insights</span> to{' '}
                                <span className="text-[#111817] dark:text-white font-semibold">robust web ecosystems</span>,
                                TechSolutions IT turns complex challenges into scalable growth.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-dashed border-gray-200 dark:border-gray-700 pt-8">
                            <div className="group flex flex-col gap-2 p-3 -ml-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="material-symbols-outlined text-[#13ecc8] group-hover:scale-110 transition-transform">neurology</span>
                                    <h3 className="font-bold text-[#111817] dark:text-white">AI & Machine Learning</h3>
                                </div>
                                <p className="text-sm text-[#618983] dark:text-gray-500">Predictive algorithms that drive automation and smarter decisions.</p>
                            </div>
                            <div className="group flex flex-col gap-2 p-3 -ml-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="material-symbols-outlined text-[#EAB308] group-hover:scale-110 transition-transform">layers</span>
                                    <h3 className="font-bold text-[#111817] dark:text-white">Web & App Development</h3>
                                </div>
                                <p className="text-sm text-[#618983] dark:text-gray-500">High-performance, scalable architectures for web and mobile.</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 pt-4">
                            <button className="group flex items-center justify-center gap-2 h-12 px-8 rounded-lg bg-[#111817] dark:bg-white text-white dark:text-[#111817] font-bold hover:bg-opacity-90 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5">
                                <span>Our Vision</span>
                                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </button>
                            <div className="flex items-center gap-6 text-sm">
                                <div className="flex flex-col">
                                    <span className="font-black text-2xl text-[#13ecc8] leading-none">5+</span>
                                    <span className="text-[#618983] font-medium text-xs uppercase">Years</span>
                                </div>
                                <div className="w-px h-8 bg-gray-200 dark:border-gray-700"></div>
                                <div className="flex flex-col">
                                    <span className="font-black text-2xl text-[#13ecc8] leading-none">100+</span>
                                    <span className="text-[#618983] font-medium text-xs uppercase">Projects</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Image Content */}
                    <div className="relative z-10 lg:pl-10">
                        <div className="absolute -top-12 -right-12 w-32 h-32 border-[3px] border-[#EAB308]/20 rounded-full"></div>
                        <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-[#ffffff] dark:bg-[#1A2E2B] rounded-full mix-blend-multiply filter blur-3xl opacity-50 dark:opacity-20"></div>

                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700 group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#10221f]/80 via-transparent to-transparent z-10"></div>
                            <div
                                className="aspect-[4/3] w-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAvHdnN71Uc7VP5JfWs3Bi1tibY-BmrucyzsJWI-hHxdIv5oOnKBjtg7LfdwdC2rad-d0p4iPj9LwWlPseEbHZdUYkE87e-DHyeGAI4RrkWzWxw_1fKf_LEMqgFt5YL0TXzftrBmHTaUDovzaWII4YmKuPIxE_1L45FcbAXywasSgBLYxmh34fFB4-NL0YCipqEJwLITSceOiLPvBgcNIQp8rQmiGfqRtTJbBdNbdZdPHouDbj_ZX-ViI8fnifJEZNvo902FOESnJ4L")' }}
                            ></div>
                            <div className="absolute bottom-0 left-0 p-4 sm:p-8 z-20 w-full">
                                <div className="backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-xl overflow-hidden relative">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-[#EAB308]"></div>
                                    <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-2">Our Mission</p>
                                    <p className="text-white text-lg font-bold leading-snug">"We don't follow trends. We engineer the technologies that create them."</p>
                                </div>
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute -top-6 -left-6 bg-[#ffffff] dark:bg-[#1A2E2B] p-4 pr-6 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-l-4 border-[#13ecc8] flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
                            <div className="bg-[#13ecc8]/10 p-2 rounded-full text-[#13ecc8]">
                                <span className="material-symbols-outlined">verified</span>
                            </div>
                            <div>
                                <p className="text-xs text-[#618983] font-bold uppercase">Client Retention</p>
                                <p className="text-xl font-black text-[#111817] dark:text-white">98%</p>
                            </div>
                        </div>

                        {/* Tech Stack Icons (Hidden on Mobile) */}
                        <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3">
                            <div className="w-12 h-12 bg-white dark:bg-[#1A2E2B] rounded-full shadow-lg flex items-center justify-center text-[#EAB308] border border-gray-100 dark:border-gray-700 hover:scale-110 transition-transform cursor-default z-20" title="Python/AI">
                                <span className="material-symbols-outlined">smart_toy</span>
                            </div>
                            <div className="w-12 h-12 bg-white dark:bg-[#1A2E2B] rounded-full shadow-lg flex items-center justify-center text-[#13ecc8] border border-gray-100 dark:border-gray-700 hover:scale-110 transition-transform cursor-default z-20" title="React/Web">
                                <span className="material-symbols-outlined">code</span>
                            </div>
                            <div className="w-12 h-12 bg-white dark:bg-[#1A2E2B] rounded-full shadow-lg flex items-center justify-center text-indigo-500 border border-gray-100 dark:border-gray-700 hover:scale-110 transition-transform cursor-default z-20" title="Cloud">
                                <span className="material-symbols-outlined">cloud</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Vision;
