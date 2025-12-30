import React from 'react';

const About = () => {
    return (
        <div className="relative z-30 w-full bg-[#f6f8f8] dark:bg-[#10221f] text-[#111817] transition-colors duration-200">
            <div className="flex-1">
                {/* Vision Section */}
                <section className="relative w-full py-20 lg:py-32 px-4 md:px-10 overflow-hidden bg-[#ffffff] dark:bg-[#1A2E2B]">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#13ecc8]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#EAB308]/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
                    <div className="max-w-[1200px] mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
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
                            <div className="relative z-10 lg:pl-10">
                                <div className="absolute -top-12 -right-12 w-32 h-32 border-[3px] border-[#EAB308]/20 rounded-full"></div>
                                <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-[#ffffff] dark:bg-[#1A2E2B] rounded-full mix-blend-multiply filter blur-3xl opacity-50 dark:opacity-20"></div>
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700 group">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#10221f]/80 via-transparent to-transparent z-10"></div>
                                    <div className="aspect-[4/3] w-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" data-alt="Modern collaborative office space with diverse team working on computers" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAvHdnN71Uc7VP5JfWs3Bi1tibY-BmrucyzsJWI-hHxdIv5oOnKBjtg7LfdwdC2rad-d0p4iPj9LwWlPseEbHZdUYkE87e-DHyeGAI4RrkWzWxw_1fKf_LEMqgFt5YL0TXzftrBmHTaUDovzaWII4YmKuPIxE_1L45FcbAXywasSgBLYxmh34fFB4-NL0YCipqEJwLITSceOiLPvBgcNIQp8rQmiGfqRtTJbBdNbdZdPHouDbj_ZX-ViI8fnifJEZNvo902FOESnJ4L")' }}></div>
                                    <div className="absolute bottom-0 left-0 p-4 sm:p-8 z-20 w-full">
                                        <div className="backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-xl overflow-hidden relative">
                                            <div className="absolute top-0 left-0 w-1 h-full bg-[#EAB308]"></div>
                                            <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-2">Our Mission</p>
                                            <p className="text-white text-lg font-bold leading-snug">"We don't follow trends. We engineer the technologies that create them."</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -top-6 -left-6 bg-[#ffffff] dark:bg-[#1A2E2B] p-4 pr-6 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-l-4 border-[#13ecc8] flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
                                    <div className="bg-[#13ecc8]/10 p-2 rounded-full text-[#13ecc8]">
                                        <span className="material-symbols-outlined">verified</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#618983] font-bold uppercase">Client Retention</p>
                                        <p className="text-xl font-black text-[#111817] dark:text-white">98%</p>
                                    </div>
                                </div>
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

                {/* Values Section */}
                <section className="w-full bg-[#f6f8f8] dark:bg-[#10221f] py-20 px-4 md:px-20 lg:px-40">
                    <div className="max-w-[1080px] mx-auto flex flex-col gap-12">
                        <div className="text-center max-w-2xl mx-auto">
                            <h2 className="text-3xl font-black mb-4 text-[#111817] dark:text-white">Driven by Values</h2>
                            <p className="text-[#618983] dark:text-gray-400">Our culture is built on a foundation of relentless innovation and unwavering integrity.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-[#ffffff] dark:bg-[#1A2E2B] p-8 rounded-xl shadow-sm border border-transparent hover:border-[#13ecc8]/50 transition-all duration-300 hover:-translate-y-1">
                                <div className="size-12 rounded-lg bg-[#13ecc8]/10 flex items-center justify-center mb-6 text-[#13ecc8]">
                                    <span className="material-symbols-outlined">lightbulb</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-[#111817] dark:text-white">Innovation First</h3>
                                <p className="text-[#618983] dark:text-gray-400 leading-relaxed">
                                    We don't just follow trends; we set them. Our labs are constantly exploring the bleeding edge of AI and ML to give our clients a competitive advantage.
                                </p>
                            </div>
                            <div className="bg-[#ffffff] dark:bg-[#1A2E2B] p-8 rounded-xl shadow-sm border border-transparent hover:border-[#13ecc8]/50 transition-all duration-300 hover:-translate-y-1">
                                <div className="size-12 rounded-lg bg-[#13ecc8]/10 flex items-center justify-center mb-6 text-[#13ecc8]">
                                    <span className="material-symbols-outlined">verified_user</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-[#111817] dark:text-white">Unwavering Reliability</h3>
                                <p className="text-[#618983] dark:text-gray-400 leading-relaxed">
                                    In the digital world, downtime is not an option. We build robust, scalable architectures designed to withstand high loads and security threats.
                                </p>
                            </div>
                            <div className="bg-[#ffffff] dark:bg-[#1A2E2B] p-8 rounded-xl shadow-sm border border-transparent hover:border-[#13ecc8]/50 transition-all duration-300 hover:-translate-y-1">
                                <div className="size-12 rounded-lg bg-[#13ecc8]/10 flex items-center justify-center mb-6 text-[#13ecc8]">
                                    <span className="material-symbols-outlined">handshake</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-[#111817] dark:text-white">True Partnership</h3>
                                <p className="text-[#618983] dark:text-gray-400 leading-relaxed">
                                    We build with you, not just for you. We see ourselves as an extension of your team, dedicated to your long-term success and growth.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Trusted By Section */}
                <section className="w-full bg-[#ffffff] dark:bg-[#1A2E2B] py-12 border-t border-[#f0f4f4] dark:border-gray-800">
                    <div className="max-w-[1080px] mx-auto px-4 md:px-10">
                        <p className="text-center text-sm font-semibold text-[#618983] dark:text-gray-500 uppercase tracking-widest mb-8">Trusted by industry leaders</p>
                        <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            <div className="flex items-center gap-2 font-bold text-xl dark:text-white"><span className="material-symbols-outlined">cloud</span> CloudInc</div>
                            <div className="flex items-center gap-2 font-bold text-xl dark:text-white"><span className="material-symbols-outlined">dataset</span> DataFlow</div>
                            <div className="flex items-center gap-2 font-bold text-xl dark:text-white"><span className="material-symbols-outlined">code</span> CodeSphere</div>
                            <div className="flex items-center gap-2 font-bold text-xl dark:text-white"><span className="material-symbols-outlined">rocket_launch</span> LaunchPad</div>
                            <div className="flex items-center gap-2 font-bold text-xl dark:text-white"><span className="material-symbols-outlined">security</span> SecureNet</div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="w-full bg-[#f6f8f8] dark:bg-[#10221f] py-24 px-4">
                    <div className="max-w-4xl mx-auto text-center bg-[#ffffff] dark:bg-[#1A2E2B] rounded-2xl p-10 md:p-16 shadow-lg border border-[#13ecc8]/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#13ecc8]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#EAB308]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                        <h2 className="text-3xl md:text-4xl font-black text-[#111817] dark:text-white mb-6 relative z-10">Ready to transform your business?</h2>
                        <p className="text-lg text-[#618983] dark:text-gray-300 mb-8 max-w-xl mx-auto relative z-10">
                            Let's discuss how our expert team can help you achieve your digital goals with custom AI and web solutions.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                            <button className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-[#13ecc8] hover:bg-[#13ecc8]/90 transition-colors text-[#111817] text-base font-bold shadow-lg shadow-[#13ecc8]/20">
                                Start a Project
                            </button>
                            <button className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-transparent border-2 border-gray-200 dark:border-gray-700 hover:border-[#13ecc8] hover:text-[#13ecc8] transition-colors text-[#111817] dark:text-white text-base font-bold">
                                View Case Studies
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            {/* Footer */}
            <footer className="bg-[#ffffff] dark:bg-[#1A2E2B] border-t border-[#f0f4f4] dark:border-gray-800 pt-16 pb-8 px-4 md:px-20 lg:px-40">
                <div className="max-w-[1080px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 text-[#111817] dark:text-white mb-4">
                            <div className="size-6 flex items-center justify-center text-[#13ecc8]">
                                <span className="material-symbols-outlined text-2xl">terminal</span>
                            </div>
                            <span className="font-bold text-lg">TechSolutions IT</span>
                        </div>
                        <p className="text-sm text-[#618983] dark:text-gray-400">
                            Empowering businesses with cutting-edge technology and human-centric design.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4 text-[#111817] dark:text-white">Company</h4>
                        <ul className="flex flex-col gap-2 text-sm text-[#618983] dark:text-gray-400">
                            <li><a className="hover:text-[#13ecc8] transition-colors" href="#">About Us</a></li>
                            <li><a className="hover:text-[#13ecc8] transition-colors" href="#">Careers</a></li>
                            <li><a className="hover:text-[#13ecc8] transition-colors" href="#">Blog</a></li>
                            <li><a className="hover:text-[#13ecc8] transition-colors" href="#">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4 text-[#111817] dark:text-white">Services</h4>
                        <ul className="flex flex-col gap-2 text-sm text-[#618983] dark:text-gray-400">
                            <li><a className="hover:text-[#13ecc8] transition-colors" href="#">Web Development</a></li>
                            <li><a className="hover:text-[#13ecc8] transition-colors" href="#">Mobile Apps</a></li>
                            <li><a className="hover:text-[#13ecc8] transition-colors" href="#">AI & ML Solutions</a></li>
                            <li><a className="hover:text-[#13ecc8] transition-colors" href="#">Cloud Architecture</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4 text-[#111817] dark:text-white">Contact</h4>
                        <ul className="flex flex-col gap-2 text-sm text-[#618983] dark:text-gray-400">
                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">mail</span> hello@techsolutions.it</li>
                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">call</span> +1 (555) 123-4567</li>
                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">location_on</span> San Francisco, CA</li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-[1080px] mx-auto pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-[#618983] dark:text-gray-500">© 2024 TechSolutions IT. All rights reserved.</p>
                    <div className="flex gap-4">
                        <a className="text-[#618983] dark:text-gray-500 hover:text-[#13ecc8]" href="#"><span className="sr-only">LinkedIn</span><svg className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg></a>
                        <a className="text-[#618983] dark:text-gray-500 hover:text-[#13ecc8]" href="#"><span className="sr-only">Twitter</span><svg className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default About;
