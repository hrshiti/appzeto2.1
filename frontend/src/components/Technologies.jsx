import React from 'react';
import { motion } from 'framer-motion';

const techStack = [
    // Row 1 (1 item)
    [
        { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" }
    ],
    // Row 2 (2 items)
    [
        { name: "Node.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" }
    ],
    // Row 3 (3 items)
    [
        { name: "Next.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
        { name: "TypeScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { name: "MongoDB", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" }
    ],
    // Row 4 (4 items)
    [
        { name: "AWS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
        { name: "Docker", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { name: "Figma", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
        { name: "Tailwind", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" }
    ]
];

const Technologies = () => {
    return (
        <div className="w-full bg-[#f8f9fa] py-24 px-4 overflow-hidden min-h-screen flex flex-col justify-center items-center">

            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl md:text-7xl font-bold tracking-tighter text-[#1a1a1a]"
                >
                    OUR TECH <span className="text-orange-500">STACK</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-gray-500 mt-4 text-xl"
                >
                    Powered by modern, scalable technologies.
                </motion.p>
            </div>

            <div className="flex flex-col items-center gap-8 md:gap-12 w-full max-w-5xl">
                {techStack.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center gap-6 md:gap-12 w-full">
                        {row.map((tech, index) => {
                            // Determine direction: Left items come from -x, Right items from +x
                            // We split the row in half.
                            const isLeft = index < row.length / 2;
                            const initialX = isLeft ? -150 : 150;

                            return (
                                <motion.div
                                    key={tech.name}
                                    initial={{ opacity: 0, x: initialX }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: false, amount: 0.5 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 50,
                                        damping: 15,
                                        delay: rowIndex * 0.2 + (index * 0.1) // Stagger by row and index
                                    }}
                                    className="bg-white p-6 md:p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow w-24 h-24 md:w-32 md:h-32 flex items-center justify-center group"
                                >
                                    <img
                                        src={tech.img}
                                        alt={tech.name}
                                        className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110"
                                    />
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
