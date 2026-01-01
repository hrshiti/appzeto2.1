import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const technologies = [
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", side: "left" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", side: "right" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", side: "left" },
    { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", side: "right" },
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", side: "left" },
    { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", side: "right" },
    { name: "Typescript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", side: "left" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", side: "right" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", side: "left" },
    { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", side: "right" },
];

const TechStack = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const icons = containerRef.current.querySelectorAll('.tech-icon');

        icons.forEach((icon) => {
            const side = icon.dataset.side;
            const xOffset = side === 'left' ? -200 : 200;

            gsap.fromTo(icon,
                {
                    x: xOffset,
                    opacity: 0,
                    scale: 0.5,
                    rotate: side === 'left' ? -45 : 45
                },
                {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    scrollTrigger: {
                        trigger: icon,
                        start: "top 90%",
                        end: "top 60%",
                        scrub: 1,
                        toggleActions: "play reverse play reverse",
                    }
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section ref={sectionRef} className="py-32 bg-[#FAF9F6] dark:bg-[#021A1B] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-20"
                >
                    <h4 className="text-teal-600 dark:text-teal-400 font-black tracking-[0.3em] uppercase text-sm mb-4">Our Technology Stack</h4>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter">
                        Powered by World-Class <br />
                        <span className="text-teal-600">Libraries & Frameworks</span>
                    </h2>
                </motion.div>

                <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 items-center justify-center">
                    {technologies.map((tech, index) => (
                        <div
                            key={index}
                            data-side={tech.side}
                            className="tech-icon group flex flex-col items-center justify-center p-8 bg-white dark:bg-white/5 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-none border border-slate-100 dark:border-white/10 hover:border-teal-500/50 transition-colors duration-500 relative"
                        >
                            <div className="absolute inset-0 bg-teal-500/5 opacity-0 group-hover:opacity-100 rounded-[2.5rem] transition-opacity duration-500"></div>
                            <img
                                src={tech.icon}
                                alt={tech.name}
                                className="w-12 h-12 md:w-16 md:h-16 grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                            />
                            <p className="mt-4 text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                {tech.name}
                            </p>
                        </div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    className="mt-24 pt-12 border-t border-slate-200 dark:border-white/10 flex flex-wrap justify-center gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                >
                    {/* Add more subtle text or mini-logos if needed */}
                    <p className="text-slate-400 dark:text-gray-500 font-bold tracking-widest text-sm italic">
                        & more than 50+ specialized integration libraries
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default TechStack;
