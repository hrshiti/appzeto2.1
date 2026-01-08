import React from 'react';
import { motion } from 'framer-motion';
import {
    Zap, Globe, Shield, Activity, Anchor,
    Cpu, Cloud, Database, Layers, Command,
    Headphones, Camera, Briefcase, Award, Smile
} from 'lucide-react';

const clients = [
    { name: "TechFlow", icon: Zap, color: "text-blue-600" },
    { name: "GlobalCorp", icon: Globe, color: "text-indigo-600" },
    { name: "SecureNet", icon: Shield, color: "text-emerald-600" },
    { name: "PulseData", icon: Activity, color: "text-rose-600" },
    { name: "BlueHarbor", icon: Anchor, color: "text-cyan-600" },
    { name: "CyberCore", icon: Cpu, color: "text-violet-600" },
    { name: "CloudNine", icon: Cloud, color: "text-sky-500" },
    { name: "DataStack", icon: Database, color: "text-amber-600" },
    { name: "LayerOne", icon: Layers, color: "text-fuchsia-600" },
    { name: "CommandX", icon: Command, color: "text-slate-700" },
    { name: "AudioWave", icon: Headphones, color: "text-pink-600" },
    { name: "Visionary", icon: Camera, color: "text-teal-600" },
    { name: "VentureWorks", icon: Briefcase, color: "text-orange-600" },
    { name: "PrimeStar", icon: Award, color: "text-yellow-600" },
    { name: "HappyUser", icon: Smile, color: "text-lime-600" },
];

const ChannelPartners = () => {
    // Duplicate the list for seamless marquee
    const marqueeList = [...clients, ...clients, ...clients];

    return (
        <section className="bg-white py-12 overflow-hidden border-y border-gray-100">

            {/* Header */}
            <div className="text-center mb-10 px-4">
                <span className="text-[#05A4A7] font-bold tracking-[0.2em] uppercase text-xs block mb-2">
                    Trusted By
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
                    Our Happy Clients
                </h2>
            </div>

            {/* Marquee Container */}
            <div className="relative w-full flex overflow-hidden">

                {/* Gradient Masks for edges */}
                <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

                {/* The Moving Track */}
                <div className="flex animate-scroll-fast whitespace-nowrap py-4">
                    {marqueeList.map((client, index) => (
                        <div
                            key={index}
                            className="inline-flex items-center gap-3 mx-6 md:mx-10 px-6 py-3 rounded-full bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-default"
                        >
                            <client.icon className={`w-6 h-6 ${client.color}`} strokeWidth={2.5} />
                            <span className={`text-lg md:text-xl font-extrabold tracking-tight ${client.color}`}>
                                {client.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .animate-scroll-fast {
                    animation: scroll 15s linear infinite; /* Increased speed (lower duration) */
                }
                /* Reuse existing scroll keyframes or ensure they are present */
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); } 
                }
            `}</style>
        </section>
    );
};

export default ChannelPartners;
