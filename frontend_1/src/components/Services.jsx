
import React, { useState } from 'react';

const Services = () => {
    return (
        <div className="bg-[#f6f8f8] dark:bg-[#10221f] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-500">
            <main className="relative w-full overflow-hidden">
                {/* Abstract Background blobs */}
                <div className="absolute top-0 left-0 w-full h-[800px] overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#13ecc8]/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-normal"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-normal"></div>
                </div>
                <div className="w-full bg-[#F1FC88]/80 dark:bg-[#F1FC88]/20 py-8 lg:py-12">
                    <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
                        {/* Section Header */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                            <div className="max-w-2xl">
                                <span className="text-[#05A4A7] font-bold tracking-wider uppercase text-xs mb-2 block">Our Expertise</span>
                                <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight mb-3">
                                    Empowering Business with <br className="hidden md:block" /> <span className="relative inline-block">Next-Gen Tech<span className="absolute bottom-1 left-0 w-full h-2 bg-[#13ecc8]/30 -z-10 skew-x-12"></span></span>
                                </h1>
                                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed max-w-xl">
                                    From intelligent AI algorithms to scalable SaaS platforms, we build the digital infrastructure that propels your future forward.
                                </p>
                            </div>
                        </div>

                        {/* Redesigned Colorful Columns Layout - Improved Hover & Compact */}
                        <div className="grid grid-cols-1 lg:grid-cols-5 w-full h-auto lg:h-[380px] gap-6 lg:gap-0">

                            {/* Service 01: AI & ML - Blue */}
                            <div className="group relative bg-[#4361ee]/10 hover:bg-[#4361ee] p-7 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:z-10 hover:shadow-2xl h-full rounded-2xl lg:rounded-none lg:first:rounded-l-3xl border border-[#4361ee]/20 lg:border-none">
                                <div className="relative z-10 flex flex-col gap-5">
                                    <div className="size-12 rounded-xl bg-[#4361ee]/20 group-hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-[#4361ee] group-hover:text-white border border-[#4361ee]/30 group-hover:border-white/30 shadow-sm transition-all duration-500">
                                        <span className="material-symbols-outlined text-[26px]">psychology</span>
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-xl font-black text-slate-900 group-hover:text-white uppercase tracking-wide transition-colors duration-500">AI & ML</h3>
                                        <p className="text-slate-600 group-hover:text-white/90 text-sm leading-relaxed font-medium line-clamp-3 transition-colors duration-500">
                                            Unlock intelligent power with predictive analytics and neural networks.
                                        </p>
                                    </div>
                                </div>

                                <div className="relative z-10 mt-auto">
                                    <a href="#" className="inline-flex items-center text-[#4361ee] group-hover:text-white font-bold border-b-2 border-[#4361ee]/20 group-hover:border-white/40 pb-1 hover:border-[#4361ee] group-hover:hover:border-white transition-all text-sm group-hover:gap-2">
                                        Learn more <span className="material-symbols-outlined ml-2 text-base transition-all">arrow_outward</span>
                                    </a>
                                </div>
                            </div>

                            {/* Service 02: Web Development - Emerald */}
                            <div className="group relative bg-[#10b981]/10 hover:bg-[#10b981] p-7 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:z-10 hover:shadow-2xl h-full rounded-2xl lg:rounded-none border border-[#10b981]/20 lg:border-none">
                                <div className="relative z-10 flex flex-col gap-5">
                                    <div className="size-12 rounded-xl bg-[#10b981]/20 group-hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-[#10b981] group-hover:text-white border border-[#10b981]/30 group-hover:border-white/30 shadow-sm transition-all duration-500">
                                        <span className="material-symbols-outlined text-[26px]">code</span>
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-xl font-black text-slate-900 group-hover:text-white uppercase tracking-wide transition-colors duration-500">Web Dev</h3>
                                        <p className="text-slate-600 group-hover:text-white/90 text-sm leading-relaxed font-medium line-clamp-3 transition-colors duration-500">
                                            Responsive, high-performance web applications built for scale.
                                        </p>
                                    </div>
                                </div>

                                <div className="relative z-10 mt-auto">
                                    <a href="#" className="inline-flex items-center text-[#10b981] group-hover:text-white font-bold border-b-2 border-[#10b981]/20 group-hover:border-white/40 pb-1 hover:border-[#10b981] group-hover:hover:border-white transition-all text-sm group-hover:gap-2">
                                        Explore <span className="material-symbols-outlined ml-2 text-base transition-all">arrow_outward</span>
                                    </a>
                                </div>
                            </div>

                            {/* Service 03: Mobile App Dev - Rose/Red */}
                            <div className="group relative bg-[#f43f5e]/10 hover:bg-[#f43f5e] p-7 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:z-10 hover:shadow-2xl h-full rounded-2xl lg:rounded-none border border-[#f43f5e]/20 lg:border-none">
                                <div className="relative z-10 flex flex-col gap-5">
                                    <div className="size-12 rounded-xl bg-[#f43f5e]/20 group-hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-[#f43f5e] group-hover:text-white border border-[#f43f5e]/30 group-hover:border-white/30 shadow-sm transition-all duration-500">
                                        <span className="material-symbols-outlined text-[26px]">smartphone</span>
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-xl font-black text-slate-900 group-hover:text-white uppercase tracking-wide transition-colors duration-500">Mobile Apps</h3>
                                        <p className="text-slate-600 group-hover:text-white/90 text-sm leading-relaxed font-medium line-clamp-3 transition-colors duration-500">
                                            Native and cross-platform mobile solutions for seamless experiences.
                                        </p>
                                    </div>
                                </div>

                                <div className="relative z-10 mt-auto">
                                    <a href="#" className="inline-flex items-center text-[#f43f5e] group-hover:text-white font-bold border-b-2 border-[#f43f5e]/20 group-hover:border-white/40 pb-1 hover:border-[#f43f5e] group-hover:hover:border-white transition-all text-sm group-hover:gap-2">
                                        View Apps <span className="material-symbols-outlined ml-2 text-base transition-all">arrow_outward</span>
                                    </a>
                                </div>
                            </div>

                            {/* Service 04: Cloud Solutions - Amber/Orange */}
                            <div className="group relative bg-[#f59e0b]/10 hover:bg-[#f59e0b] p-7 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:z-10 hover:shadow-2xl h-full rounded-2xl lg:rounded-none border border-[#f59e0b]/20 lg:border-none">
                                <div className="relative z-10 flex flex-col gap-5">
                                    <div className="size-12 rounded-xl bg-[#f59e0b]/20 group-hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-[#f59e0b] group-hover:text-white border border-[#f59e0b]/30 group-hover:border-white/30 shadow-sm transition-all duration-500">
                                        <span className="material-symbols-outlined text-[26px]">cloud</span>
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-xl font-black text-slate-900 group-hover:text-white uppercase tracking-wide transition-colors duration-500">Cloud</h3>
                                        <p className="text-slate-600 group-hover:text-white/90 text-sm leading-relaxed font-medium line-clamp-3 transition-colors duration-500">
                                            Reliable and scalable cloud infrastructure for modern businesses.
                                        </p>
                                    </div>
                                </div>

                                <div className="relative z-10 mt-auto">
                                    <a href="#" className="inline-flex items-center text-[#f59e0b] group-hover:text-white font-bold border-b-2 border-[#f59e0b]/20 group-hover:border-white/40 pb-1 hover:border-[#f59e0b] group-hover:hover:border-white transition-all text-sm group-hover:gap-2">
                                        Details <span className="material-symbols-outlined ml-2 text-base transition-all">arrow_outward</span>
                                    </a>
                                </div>
                            </div>

                            {/* Service 05: UI/UX Design - Purple */}
                            <div className="group relative bg-[#8b5cf6]/10 hover:bg-[#8b5cf6] p-7 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:z-10 hover:shadow-2xl h-full rounded-2xl lg:rounded-none lg:last:rounded-r-3xl border border-[#8b5cf6]/20 lg:border-none">
                                <div className="relative z-10 flex flex-col gap-5">
                                    <div className="size-12 rounded-xl bg-[#8b5cf6]/20 group-hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-[#8b5cf6] group-hover:text-white border border-[#8b5cf6]/30 group-hover:border-white/30 shadow-sm transition-all duration-500">
                                        <span className="material-symbols-outlined text-[26px]">brush</span>
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-xl font-black text-slate-900 group-hover:text-white uppercase tracking-wide transition-colors duration-500">UI/UX Design</h3>
                                        <p className="text-slate-600 group-hover:text-white/90 text-sm leading-relaxed font-medium line-clamp-3 transition-colors duration-500">
                                            Creating intuitive interfaces that elevate the user experience.
                                        </p>
                                    </div>
                                </div>

                                <div className="relative z-10 mt-auto">
                                    <a href="#" className="inline-flex items-center text-[#8b5cf6] group-hover:text-white font-bold border-b-2 border-[#8b5cf6]/20 group-hover:border-white/40 pb-1 hover:border-[#8b5cf6] group-hover:hover:border-white transition-all text-sm group-hover:gap-2">
                                        See Work <span className="material-symbols-outlined ml-2 text-base transition-all">arrow_outward</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Why Choose Us Section */}
                <div className="w-full">
                    <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 mt-16 mb-8 text-center">
                        <span className="text-[#05A4A7] font-bold tracking-wider uppercase text-xs mb-3 block">Why Choose Us</span>
                        <h2 className="text-2xl md:text-5xl font-black text-gray-900 dark:text-white mb-10">Driven by Results, <br />Powered by Innovation</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                            <div className="flex flex-col items-center md:items-start group">
                                <div className="size-16 bg-gradient-to-br from-[#13ecc8]/20 to-[#13ecc8]/5 rounded-2xl flex items-center justify-center text-[#13ecc8] mb-6 shadow-[0_0_30px_-10px_rgba(19,236,200,0.3)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_40px_-5px_rgba(19,236,200,0.5)]">
                                    <span className="material-symbols-outlined text-3xl">rocket_launch</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-[#13ecc8] transition-colors">Rapid Deployment</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                                    We use agile methodologies and pre-built modules to launch your products faster without compromising quality.
                                </p>
                            </div>

                            <div className="flex flex-col items-center md:items-start group">
                                <div className="size-16 bg-gradient-to-br from-[#13ecc8]/20 to-[#13ecc8]/5 rounded-2xl flex items-center justify-center text-[#13ecc8] mb-6 shadow-[0_0_30px_-10px_rgba(19,236,200,0.3)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_40px_-5px_rgba(19,236,200,0.5)]">
                                    <span className="material-symbols-outlined text-3xl">security</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-[#13ecc8] transition-colors">Enterprise Security</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                                    Security is built-in, not bolted on. We implement banking-grade encryption and compliance standards from day one.
                                </p>
                            </div>

                            <div className="flex flex-col items-center md:items-start group">
                                <div className="size-16 bg-gradient-to-br from-[#13ecc8]/20 to-[#13ecc8]/5 rounded-2xl flex items-center justify-center text-[#13ecc8] mb-6 shadow-[0_0_30px_-10px_rgba(19,236,200,0.3)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_40px_-5px_rgba(19,236,200,0.5)]">
                                    <span className="material-symbols-outlined text-3xl">support_agent</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-[#13ecc8] transition-colors">24/7 Dedicated Support</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                                    Our global team ensures your critical infrastructure never sleeps, with round-the-clock monitoring and support.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-[#012829] border-t border-white/5 pt-16 pb-8 rounded-t-[40px] mt-10">
                    <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                            <div className="col-span-1 md:col-span-1">
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="text-[#13ecc8] size-6">
                                        <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                            <path clipRule="evenodd" d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" fill="currentColor" fillRule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <span className="text-xl font-bold text-white">TechNova IT</span>
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                    Building the future of digital infrastructure with cutting-edge technology and human-centric design.
                                </p>
                                <div className="flex gap-4">
                                    <a className="text-gray-400 hover:text-[#13ecc8] transition-colors" href="#"><span className="material-symbols-outlined">public</span></a>
                                    <a className="text-gray-400 hover:text-[#13ecc8] transition-colors" href="#"><span className="material-symbols-outlined">alternate_email</span></a>
                                    <a className="text-gray-400 hover:text-[#13ecc8] transition-colors" href="#"><span className="material-symbols-outlined">rss_feed</span></a>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-6">Company</h4>
                                <ul className="flex flex-col gap-3">
                                    <li><a className="text-gray-400 hover:text-[#13ecc8] text-sm transition-colors" href="#">About Us</a></li>
                                    <li><a className="text-gray-400 hover:text-[#13ecc8] text-sm transition-colors" href="#">Careers</a></li>
                                    <li><a className="text-gray-400 hover:text-[#13ecc8] text-sm transition-colors" href="#">Blog</a></li>
                                    <li><a className="text-gray-400 hover:text-[#13ecc8] text-sm transition-colors" href="#">Contact</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-6">Services</h4>
                                <ul className="flex flex-col gap-3">
                                    <li><a className="text-gray-400 hover:text-[#13ecc8] text-sm transition-colors" href="#">AI & ML</a></li>
                                    <li><a className="text-gray-400 hover:text-[#13ecc8] text-sm transition-colors" href="#">Web Development</a></li>
                                    <li><a className="text-gray-400 hover:text-[#13ecc8] text-sm transition-colors" href="#">Mobile Apps</a></li>
                                    <li><a className="text-gray-400 hover:text-[#13ecc8] text-sm transition-colors" href="#">Cloud Services</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-6">Legal</h4>
                                <ul className="flex flex-col gap-3">
                                    <li><a className="text-gray-400 hover:text-[#13ecc8] text-sm transition-colors" href="#">Privacy Policy</a></li>
                                    <li><a className="text-gray-400 hover:text-[#13ecc8] text-sm transition-colors" href="#">Terms of Service</a></li>
                                    <li><a className="text-gray-400 hover:text-[#13ecc8] text-sm transition-colors" href="#">Cookie Policy</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-gray-500 text-sm">© 2024 TechNova IT Services. All rights reserved.</p>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span>Designed with</span>
                                <span className="material-symbols-outlined text-red-400 text-sm">favorite</span>
                                <span>for the future.</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default Services;
