import React, { useLayoutEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';

const StatItem = ({ value, suffix, label, index }) => {
    const numberRef = useRef(null);
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: false, amount: 0.5 });

    useLayoutEffect(() => {
        let animation;
        if (isInView) {
            const obj = { val: 0 };
            animation = gsap.to(obj, {
                val: value,
                duration: 1.2,
                ease: "power2.out",
                onUpdate: () => {
                    if (numberRef.current) {
                        numberRef.current.innerText = Math.round(obj.val);
                    }
                }
            });
        } else {
            if (numberRef.current) {
                numberRef.current.innerText = "0";
            }
        }

        // Tilt effect logic remains same but within the conditional context
        const ctx = gsap.context(() => {

            // Subtle hover tilt effect
            const onMove = (e) => {
                const { clientX, clientY } = e;
                if (!cardRef.current) return;
                const { left, top, width, height } = cardRef.current.getBoundingClientRect();
                const x = (clientX - left) / width - 0.5;
                const y = (clientY - top) / height - 0.5;

                gsap.to(cardRef.current, {
                    rotateY: x * 15,
                    rotateX: -y * 15,
                    scale: 1.05,
                    duration: 0.6,
                    ease: "power2.out"
                });
            };

            const onLeave = () => {
                gsap.to(cardRef.current, {
                    rotateY: 0,
                    rotateX: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: "power2.out"
                });
            };

            const el = cardRef.current;
            if (el) {
                el.addEventListener('mousemove', onMove);
                el.addEventListener('mouseleave', onLeave);
            }
        }, cardRef);

        return () => ctx.revert();
    }, [value, isInView]);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
            className="group relative flex flex-col items-center justify-center p-6 md:p-8 bg-[#ffffff05] backdrop-blur-2xl rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl"
        >
            {/* Inner Glow/Shine */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#cdbdae]/40 to-transparent" />

            {/* Animated Hover Background */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-gradient-to-br from-[#cdbdae] to-transparent pointer-events-none" />

            <div className="relative flex items-baseline select-none" style={{ transform: "translateZ(50px)" }}>
                <span
                    ref={numberRef}
                    className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tighter"
                >
                    0
                </span>
                <span className="text-3xl md:text-4xl font-serif font-light text-[#cdbdae] ml-1">{suffix}</span>
            </div>

            <div className="mt-4 flex flex-col items-center" style={{ transform: "translateZ(30px)" }}>
                <div className="h-[1px] w-8 bg-[#cdbdae]/40 mb-3 group-hover:w-16 transition-all duration-700" />
                <span className="text-gray-400 font-sans font-bold uppercase tracking-[0.3em] text-[10px] md:text-[11px] text-center group-hover:text-white transition-colors duration-500">
                    {label}
                </span>
            </div>

            {/* Ambient Background Blur */}
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-[#cdbdae]/10 rounded-full blur-3xl pointer-events-none" />
        </motion.div>
    );
};

const Stats = () => {
    const stats = [
        { value: 500, suffix: "+", label: "Projects Delivered" },
        { value: 10, suffix: "+", label: "Years Experience" },
        { value: 50, suffix: "+", label: "Expert Developers" },
        { value: 99, suffix: "%", label: "Client Satisfaction" }
    ];

    return (
        <section className="bg-[#011617] py-16 md:py-20 relative overflow-hidden font-serif">
            {/* Luxury Background Elements */}
            <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#cdbdae]/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#05a4a7]/5 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="max-w-7xl mx-auto px-8 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {stats.map((stat, index) => (
                        <StatItem
                            key={index}
                            index={index}
                            value={stat.value}
                            suffix={stat.suffix}
                            label={stat.label}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
