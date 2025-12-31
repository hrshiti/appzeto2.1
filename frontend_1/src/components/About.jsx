import React, { useState, useEffect, useRef } from 'react';

const About = () => {
    const [charIndex, setCharIndex] = useState(0);
    const [isInView, setIsInView] = useState(false);
    const [areValuesInView, setAreValuesInView] = useState(false);
    const paragraphRef = useRef(null);
    const valuesRef = useRef(null);

    const textSegments = [
        "We don't just write code; we build the digital infrastructure that powers industry leaders. From ",
        "AI-driven insights",
        " to ",
        "robust web ecosystems",
        ", TechSolutions IT turns complex challenges into scalable growth."
    ];

    const totalLength = textSegments.reduce((acc, seg) => acc + seg.length, 0);

    // Observer for Top Section (Vision)
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsInView(entry.isIntersecting);
        }, { threshold: 0.3 }); // Trigger when 30% visible

        if (paragraphRef.current) observer.observe(paragraphRef.current);
        return () => observer.disconnect();
    }, []);

    // Observer for Values Section
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setAreValuesInView(entry.isIntersecting);
        }, { threshold: 0.2 });

        if (valuesRef.current) observer.observe(valuesRef.current);
        return () => observer.disconnect();
    }, []);

    // Typing Effect Logic
    useEffect(() => {
        let interval;
        if (isInView) {
            // Type forward - SLOWER SPEED (50ms)
            interval = setInterval(() => {
                setCharIndex(prev => {
                    if (prev >= totalLength) {
                        clearInterval(interval);
                        return prev;
                    }
                    return prev + 1;
                });
            }, 50);
        } else {
            // Type backward (reverse) - SLOWER SPEED (20ms)
            interval = setInterval(() => {
                setCharIndex(prev => {
                    if (prev <= 0) {
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - 2;
                });
            }, 20);
        }
        return () => clearInterval(interval);
    }, [isInView, totalLength]);

    const getSlice = (segmentIndex) => {
        let previousLength = 0;
        for (let i = 0; i < segmentIndex; i++) previousLength += textSegments[i].length;

        const localIndex = charIndex - previousLength;

        if (localIndex <= 0) return "";
        if (localIndex >= textSegments[segmentIndex].length) return textSegments[segmentIndex];
        return textSegments[segmentIndex].slice(0, localIndex);
    };

    return (
        <div className="relative z-30 w-full bg-[#f6f8f8] dark:bg-[#012829] text-[#111817] transition-colors duration-200">
            <div className="flex-1">
                {/* Vision Section */}
                <section className="relative w-full min-h-screen flex items-center justify-center py-20 px-6 md:px-12 lg:px-16 overflow-hidden bg-[#ffffff] dark:bg-[#023638]">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#05A4A7]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#EAB308]/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
                    <div className="max-w-[1280px] mx-auto w-full">
                        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center h-full">
                            {/* Left Image - Slide in from Left */}
                            <div className={`relative z-10 w-full transition-all duration-1000 delay-300 transform ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
                                <div className="absolute -top-12 -left-12 w-32 h-32 border-[3px] border-[#EAB308]/20 rounded-full"></div>
                                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-[#ffffff] dark:bg-[#023638] rounded-full mix-blend-multiply filter blur-3xl opacity-50 dark:opacity-20"></div>
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700 group w-full">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#012829]/80 via-transparent to-transparent z-10"></div>
                                    <div className="aspect-[4/3] w-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" data-alt="Modern collaborative office space with diverse team working on computers" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAvHdnN71Uc7VP5JfWs3Bi1tibY-BmrucyzsJWI-hHxdIv5oOnKBjtg7LfdwdC2rad-d0p4iPj9LwWlPseEbHZdUYkE87e-DHyeGAI4RrkWzWxw_1fKf_LEMqgFt5YL0TXzftrBmHTaUDovzaWII4YmKuPIxE_1L45FcbAXywasSgBLYxmh34fFB4-NL0YCipqEJwLITSceOiLPvBgcNIQp8rQmiGfqRtTJbBdNbdZdPHouDbj_ZX-ViI8fnifJEZNvo902FOESnJ4L")' }}></div>
                                    <div className="absolute bottom-0 left-0 p-4 sm:p-8 z-20 w-full">
                                        <div className="backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-xl overflow-hidden relative">
                                            <div className="absolute top-0 left-0 w-1 h-full bg-[#EAB308]"></div>
                                            <p className="text-white/80 text-sm font-bold uppercase tracking-widest mb-2">Our Mission</p>
                                            <p className="text-white text-xl font-bold leading-snug">"We don't follow trends. We engineer the technologies that create them."</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -top-6 -right-6 bg-[#ffffff] dark:bg-[#023638] p-4 pr-6 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-r-4 border-[#05A4A7] flex flex-row-reverse items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
                                    <div className="bg-[#05A4A7]/10 p-2 rounded-full text-[#05A4A7]">
                                        <span className="material-symbols-outlined">verified</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-[#618983] font-bold uppercase">Client Retention</p>
                                        <p className="text-xl font-black text-[#111817] dark:text-white">98%</p>
                                    </div>
                                </div>
                                <div className="absolute -left-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3">
                                    <div className="w-12 h-12 bg-white dark:bg-[#023638] rounded-full shadow-lg flex items-center justify-center text-[#EAB308] border border-gray-100 dark:border-gray-700 hover:scale-110 transition-transform cursor-default z-20" title="Python/AI">
                                        <span className="material-symbols-outlined">smart_toy</span>
                                    </div>
                                    <div className="w-12 h-12 bg-white dark:bg-[#023638] rounded-full shadow-lg flex items-center justify-center text-[#05A4A7] border border-gray-100 dark:border-gray-700 hover:scale-110 transition-transform cursor-default z-20" title="React/Web">
                                        <span className="material-symbols-outlined">code</span>
                                    </div>
                                    <div className="w-12 h-12 bg-white dark:bg-[#023638] rounded-full shadow-lg flex items-center justify-center text-indigo-500 border border-gray-100 dark:border-gray-700 hover:scale-110 transition-transform cursor-default z-20" title="Cloud">
                                        <span className="material-symbols-outlined">cloud</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Content */}
                            <div className={`relative z-10 w-full flex flex-col gap-5 transition-all duration-1000 transform ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                                <div className="flex flex-col gap-2">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#05A4A7]/10 border border-[#05A4A7]/20 w-fit">
                                        <span className="flex h-2.5 w-2.5 rounded-full bg-[#05A4A7] animate-pulse"></span>
                                        <span className="text-sm font-extrabold uppercase tracking-widest text-[#0d9488] dark:text-[#05A4A7]">Who We Are</span>
                                    </div>
                                    <h1 className="text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight text-[#111817] dark:text-white">
                                        Engineering the <br className="hidden lg:block" />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#05A4A7] to-emerald-400">Digital Future.</span>
                                    </h1>
                                    <p ref={paragraphRef} className="text-lg lg:text-xl text-[#618983] dark:text-gray-400 leading-relaxed max-w-lg min-h-[5rem]">
                                        {getSlice(0)}
                                        <span className="text-[#111817] dark:text-white font-semibold">{getSlice(1)}</span>
                                        {getSlice(2)}
                                        <span className="text-[#111817] dark:text-white font-semibold">{getSlice(3)}</span>
                                        {getSlice(4)}
                                        <span className="animate-pulse">|</span>
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-dashed border-gray-200 dark:border-gray-700 pt-6">
                                    <div className="group flex flex-col gap-1 p-2 -ml-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="material-symbols-outlined text-[#05A4A7] group-hover:scale-110 transition-transform">neurology</span>
                                            <h3 className="font-bold text-[#111817] dark:text-white">AI & Machine Learning</h3>
                                        </div>
                                        <p className="text-sm text-[#618983] dark:text-gray-500">Predictive algorithms that drive automation and smarter decisions.</p>
                                    </div>
                                    <div className="group flex flex-col gap-1 p-2 -ml-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="material-symbols-outlined text-[#EAB308] group-hover:scale-110 transition-transform">layers</span>
                                            <h3 className="font-bold text-[#111817] dark:text-white">Web & App Development</h3>
                                        </div>
                                        <p className="text-sm text-[#618983] dark:text-gray-500">High-performance, scalable architectures for web and mobile.</p>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 pt-2">
                                    <button className="group flex items-center justify-center gap-2 h-12 px-8 rounded-lg bg-[#111817] dark:bg-white text-white dark:text-[#111817] font-bold hover:bg-opacity-90 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5">
                                        <span>Our Vision</span>
                                        <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    </button>
                                    <div className="flex items-center gap-6 text-sm">
                                        <div className="flex flex-col">
                                            <span className="font-black text-2xl text-[#05A4A7] leading-none">5+</span>
                                            <span className="text-[#618983] font-medium text-xs uppercase">Years</span>
                                        </div>
                                        <div className="w-px h-8 bg-gray-200 dark:border-gray-700"></div>
                                        <div className="flex flex-col">
                                            <span className="font-black text-2xl text-[#05A4A7] leading-none">100+</span>
                                            <span className="text-[#618983] font-medium text-xs uppercase">Projects</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section ref={valuesRef} className="w-full bg-[#f6f8f8] dark:bg-[#012829] py-12 lg:py-16 px-6 md:px-12 lg:px-16">
                    <div className="max-w-[1280px] mx-auto flex flex-col gap-12">
                        <div className={`text-center max-w-2xl mx-auto transition-all duration-1000 ${areValuesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <h2 className="text-3xl font-black mb-4 text-[#111817] dark:text-white">Driven by Values</h2>
                            <p className="text-[#618983] dark:text-gray-400">Our culture is built on a foundation of relentless innovation and unwavering integrity.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { title: "Innovation First", icon: "lightbulb", desc: "We don't just follow trends; we set them. Our labs are constantly exploring the bleeding edge of AI and ML to give our clients a competitive advantage." },
                                { title: "Unwavering Reliability", icon: "verified_user", desc: "In the digital world, downtime is not an option. We build robust, scalable architectures designed to withstand high loads and security threats." },
                                { title: "True Partnership", icon: "handshake", desc: "We build with you, not just for you. We see ourselves as an extension of your team, dedicated to your long-term success and growth." }
                            ].map((value, i) => (
                                <div key={i} className={`bg-[#023638] dark:bg-[#023638] p-8 rounded-xl shadow-lg border border-[#05A4A7]/20 hover:border-[#05A4A7] hover:shadow-[#05A4A7]/20 transition-all duration-1000 hover:-translate-y-1 ${areValuesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={{ transitionDelay: `${i * 200}ms` }}>
                                    <div className="size-12 rounded-lg bg-[#ffffff]/10 flex items-center justify-center mb-6 text-[#05A4A7]">
                                        <span className="material-symbols-outlined">{value.icon}</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-white">{value.title}</h3>
                                    <p className="text-gray-300 leading-relaxed">
                                        {value.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>





                {/* CTA Section */}
                <section className="w-full bg-[#023638] py-20 px-6 md:px-12 lg:px-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#05A4A7]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#EAB308]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Ready to transform your business?</h2>
                        <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
                            Let's discuss how our expert team can help you achieve your digital goals with custom AI and web solutions.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-[#05A4A7] hover:bg-[#05A4A7]/90 transition-colors text-[#111817] text-base font-bold shadow-lg shadow-[#05A4A7]/20">
                                Start a Project
                            </button>
                            <button className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-[#F1FC88] hover:bg-[#EAF576] transition-colors text-gray-900 text-base font-bold shadow-lg shadow-[#F0FF35]/20">
                                View Case Studies
                            </button>
                        </div>
                    </div>
                </section>
            </div>


        </div>
    );
};

export default About;
