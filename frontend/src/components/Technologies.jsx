import React from 'react';
import { motion } from 'framer-motion';

const techStack = [
    // Row 1 (Top - 1 item)
    [
        { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" }
    ],
    // Row 2 (2 items)
    [
        { name: "Node.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Laravel", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" }
    ],
    // Row 3 (3 items)
    [
        { name: "Next.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
        { name: "MySql", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
        { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" }
    ],
    // Row 4 (4 items - Web & App)
    [
        { name: "Flutter", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
        { name: "TypeScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { name: "MongoDB", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
        { name: "Vue.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" }
    ],
    // Row 5 (5 items - AI/ML & Tools)
    [
        { name: "TensorFlow", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
        { name: "Docker", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { name: "AWS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
        { name: "Figma", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
        { name: "Tailwind", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" }
    ]
];

const Technologies = () => {
    return (
        <div className="w-full bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef] py-24 px-4 overflow-hidden min-h-screen flex flex-col justify-center items-center relative">

            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>
            </div>

            <div className="text-center mb-16 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                    className="text-6xl md:text-8xl font-black tracking-tighter text-[#1a1a1a] mb-6"
                >
                    OUR TECH <span className="text-[#D33C1D] inline-block">STACK</span>
                </motion.h2>
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100px" }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="h-1 bg-[#D33C1D] mx-auto mb-6"
                ></motion.div>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-gray-500 text-xl md:text-2xl max-w-2xl mx-auto font-light"
                >
                    Mastering the most advanced tools to build your future.
                </motion.p>
            </div>

            <div className="flex flex-col items-center gap-4 md:gap-6 w-full max-w-6xl relative z-10">
                {techStack.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center gap-4 md:gap-6 w-full">
                        {row.map((tech, index) => {

                            // Calculate direction based on position in row
                            const midPoint = (row.length - 1) / 2;
                            const isLeft = index < midPoint;
                            const isCenter = index === midPoint;

                            // Define start position
                            let startX = 0;
                            if (isLeft) startX = -100; // Comes from Left
                            else if (!isLeft && !isCenter) startX = 100; // Comes from Right
                            // Center item (if odd row) comes from bottom or stays static? Let's make it zoom.

                            // Actually, simply: Left items from left, Right from right.
                            const initialX = index < row.length / 2 ? -200 : 200;

                            return (
                                <motion.div
                                    key={tech.name}
                                    // Animation: Slide from sides
                                    initial={{ opacity: 0, x: initialX }}
                                    whileInView={{
                                        opacity: 1,
                                        x: 0,
                                        transition: {
                                            duration: 1.2, // Slower duration for smoothness
                                            ease: [0.16, 1, 0.3, 1], // Custom bezier for very smooth easeOut
                                            delay: rowIndex * 0.15 // Slightly slower stagger
                                        }
                                    }}
                                    viewport={{ once: false, amount: 0.2 }} // Replays every time
                                    whileHover={{
                                        scale: 1.15,
                                        y: -15,
                                        transition: { type: "spring", stiffness: 300, damping: 20 }
                                    }}
                                    // Smaller boxes: w-24 h-24 on mobile, w-32 h-32 on desktop -> reduced to w-20 h-20 md:w-28 md:h-28
                                    className="bg-white/80 backdrop-blur-md border border-white/50 p-4 md:p-6 rounded-[1.5rem] shadow-sm hover:shadow-2xl hover:shadow-orange-500/20 transition-all w-20 h-20 md:w-28 md:h-28 flex flex-col items-center justify-center gap-2 group cursor-pointer hover:z-50 relative"
                                >
                                    <img
                                        src={tech.img}
                                        alt={tech.name}
                                        className="w-10 h-10 md:w-16 md:h-16 object-contain transition-all duration-500 filter drop-shadow-sm"
                                    />
                                    {/* Smaller Text */}
                                    <span className="text-[10px] md:text-xs font-bold text-gray-500 transition-colors absolute bottom-2">{tech.name}</span>
                                </motion.div>
                            );
                        })}
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Technologies;
