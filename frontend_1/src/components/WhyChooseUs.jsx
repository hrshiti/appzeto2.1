import React from 'react';
import { motion } from 'framer-motion';
import thinkingPersonGreenImg from '../assets/thinking_professional_green.png';

const features = [
    {
        id: "01",
        title: "Cutting-Edge Technology",
        description: "We leverage React, MERN, AI, and Cloud to build scalable, future-ready products.",
        color: "bg-[#2E583E]", // Dark Green (Matches Left Sidebar)
        textColor: "text-white"
    },
    {
        id: "02",
        title: "Client First Approach",
        description: "Your goals are our priority. We tailor every solution to fit your specific business needs.",
        color: "bg-gray-400", // Grey
        textColor: "text-white"
    },
    {
        id: "03",
        title: "Secure & Reliable",
        description: "Enterprise-grade security protocols to protect your sensitive data and systems.",
        color: "bg-[#94D2BD]", // Light Teal/Mint
        textColor: "text-[#2E583E]"
    },
    {
        id: "04",
        title: "On-Time Delivery",
        description: "Agile workflows and sprint planning ensure fast, timely project completion.",
        color: "bg-[#2E583E]",
        textColor: "text-white"
    },
    {
        id: "05",
        title: "Stunning UI/UX",
        description: "Modern, user-centric designs that drive engagement and retention.",
        color: "bg-gray-400",
        textColor: "text-white"
    }
];

const MarqueeRow = ({ items, reverse = false }) => {
    return (
        <div className="relative flex overflow-hidden w-full bg-slate-50 py-3 border-y border-slate-100">
            <motion.div
                className="flex whitespace-nowrap gap-12 items-center"
                animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
            >
                {[...items, ...items, ...items, ...items].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 text-slate-400 font-bold uppercase tracking-widest text-xs md:text-sm opacity-60">
                        <span>{item}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

const WhyChooseUs = () => {
    const keywords = ["Innovation", "Scalability", "Security", "Performance", "Reliability", "Excellence"];
    const keywords2 = ["React", "Node.js", "AI Solutions", "Cloud Native", "Mobile Apps", "UI/UX Design"];

    return (
        <div className="flex flex-col">
            <section className="w-full flex flex-col md:flex-row min-h-screen font-sans">
                {/* LEFT SIDE - Image & Title Combined */}
                <div className="md:w-5/12 lg:w-5/12 bg-[#2E583E] relative flex flex-col justify-center p-10 md:p-14 lg:p-20 overflow-hidden group">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src={thinkingPersonGreenImg}
                            alt="Background"
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000"
                        />
                        {/* Dark Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-[#2E583E]/80 mix-blend-multiply"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2E583E] via-transparent to-transparent"></div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10 text-white"
                    >
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 drop-shadow-lg">
                            Why<br />Choose<br />Appzeto?
                        </h2>
                        <div className="w-24 h-1.5 bg-white/40 mb-8 rounded-full"></div>
                        <p className="text-xl md:text-2xl text-white/90 font-medium leading-relaxed max-w-md drop-shadow-md">
                            The numbers speak for themselves. We deliver excellence.
                        </p>
                    </motion.div>
                </div>

                {/* RIGHT SIDE - Features (White Content) */}
                <div className="md:w-7/12 lg:w-7/12 bg-white p-6 md:p-16 lg:p-24 flex flex-col justify-center">
                    <div className="max-w-3xl space-y-8 md:space-y-12">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.id}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                whileHover={{ x: -10, transition: { duration: 0.3 } }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="flex items-start gap-5 md:gap-8 group cursor-pointer"
                            >
                                <div className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 ${feature.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <span className={`text-xl md:text-2xl font-bold ${feature.textColor}`}>{feature.id}</span>
                                </div>
                                <div className="pt-2">
                                    <h3 className="text-xl md:text-2xl font-bold text-[#2E583E] mb-2 group-hover:text-emerald-700 transition-colors">{feature.title}</h3>
                                    <p className="text-slate-500 text-sm md:text-base leading-relaxed">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Reverse Marquee Section */}
            <div className="bg-slate-50">
                <MarqueeRow items={keywords} />
                <MarqueeRow items={keywords2} reverse={true} />
            </div>
        </div>
    );
};

export default WhyChooseUs;
