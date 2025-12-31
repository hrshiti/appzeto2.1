
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
            {/* Footer */}
            <footer className="bg-white dark:bg-[#10221f] border-t border-gray-100 dark:border-white/5 pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-6 lg:px-20">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="text-[#13ecc8] size-6">
                                    <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                        <path clipRule="evenodd" d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" fill="currentColor" fillRule="evenodd"></path>
                                    </svg>
                                </div>
                                <span className="text-xl font-bold text-slate-900 dark:text-white">TechNova IT</span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                                Building the future of digital infrastructure with cutting-edge technology and human-centric design.
                            </p>
                            <div className="flex gap-4">
                                <a className="text-slate-400 hover:text-[#13ecc8] transition-colors" href="#"><span className="material-symbols-outlined">public</span></a>
                                <a className="text-slate-400 hover:text-[#13ecc8] transition-colors" href="#"><span className="material-symbols-outlined">alternate_email</span></a>
                                <a className="text-slate-400 hover:text-[#13ecc8] transition-colors" href="#"><span className="material-symbols-outlined">rss_feed</span></a>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-6">Company</h4>
                            <ul className="flex flex-col gap-3">
                                <li><a className="text-slate-500 dark:text-slate-400 hover:text-[#13ecc8] dark:hover:text-[#13ecc8] text-sm transition-colors" href="#">About Us</a></li>
                                <li><a className="text-slate-500 dark:text-slate-400 hover:text-[#13ecc8] dark:hover:text-[#13ecc8] text-sm transition-colors" href="#">Careers</a></li>
                                <li><a className="text-slate-500 dark:text-slate-400 hover:text-[#13ecc8] dark:hover:text-[#13ecc8] text-sm transition-colors" href="#">Blog</a></li>
                                <li><a className="text-slate-500 dark:text-slate-400 hover:text-[#13ecc8] dark:hover:text-[#13ecc8] text-sm transition-colors" href="#">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-6">Services</h4>
                            <ul className="flex flex-col gap-3">
                                <li><a className="text-slate-500 dark:text-slate-400 hover:text-[#13ecc8] dark:hover:text-[#13ecc8] text-sm transition-colors" href="#">AI & ML</a></li>
                                <li><a className="text-slate-500 dark:text-slate-400 hover:text-[#13ecc8] dark:hover:text-[#13ecc8] text-sm transition-colors" href="#">Web Development</a></li>
                                <li><a className="text-slate-500 dark:text-slate-400 hover:text-[#13ecc8] dark:hover:text-[#13ecc8] text-sm transition-colors" href="#">Mobile Apps</a></li>
                                <li><a className="text-slate-500 dark:text-slate-400 hover:text-[#13ecc8] dark:hover:text-[#13ecc8] text-sm transition-colors" href="#">Cloud Services</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-6">Legal</h4>
                            <ul className="flex flex-col gap-3">
                                <li><a className="text-slate-500 dark:text-slate-400 hover:text-[#13ecc8] dark:hover:text-[#13ecc8] text-sm transition-colors" href="#">Privacy Policy</a></li>
                                <li><a className="text-slate-500 dark:text-slate-400 hover:text-[#13ecc8] dark:hover:text-[#13ecc8] text-sm transition-colors" href="#">Terms of Service</a></li>
                                <li><a className="text-slate-500 dark:text-slate-400 hover:text-[#13ecc8] dark:hover:text-[#13ecc8] text-sm transition-colors" href="#">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-100 dark:border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-slate-500 dark:text-slate-500 text-sm">© 2024 TechNova IT Services. All rights reserved.</p>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <span>Designed with</span>
                            <span className="material-symbols-outlined text-red-400 text-sm">favorite</span>
                            <span>for the future.</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Services;
