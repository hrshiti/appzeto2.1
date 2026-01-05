import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollWrapper from '../components/ScrollWrapper';

const allProjects = [
    {
        id: "p1",
        title: "APPZETO GO",
        subtitle: "Logistics Reimagined",
        category: "LOGISTICS",
        description: "A complete mobility solution with real-time tracking, multi-modal transport, and peak-hour load balancing for modern enterprises.",
        link: "/appzeto-taxi",
        thumbnail: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=2340&auto=format&fit=crop",
        tags: ["React Native", "Node.js", "Google Maps API"]
    },
    {
        id: "p2",
        title: "APPZETO FOOD",
        subtitle: "Next-Gen Gastronomy",
        category: "NEXT-GEN",
        description: "Intelligent food discovery app using predictive analytics to suggest meals based on dietary habits and history.",
        link: "/appzeto-food",
        thumbnail: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop",
        tags: ["AI/ML", "Python", "React"]
    },
    {
        id: "p3",
        title: "APPZETO LEARN",
        subtitle: "Personalized Education",
        category: "PERSONALIZED",
        description: "Gamified learning platform with AI tutors and dynamic curriculum adjustment for every student.",
        link: "/services/mobile-application",
        thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2340&auto=format&fit=crop",
        tags: ["Gamification", "AI Tutors", "LMS"]
    },
    {
        id: "p4",
        title: "APPZETO PAY",
        subtitle: "Unified Digital Assets",
        category: "FINTECH",
        description: "Ultra-secure wealth management app with biometric multi-sig, instant FX, and portfolio tracking.",
        link: "/appzeto-ecommerce",
        thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2340&auto=format&fit=crop",
        tags: ["Blockchain", "Security", "Fintech"]
    },
    {
        id: "p5",
        title: "APPZETO VOICE",
        subtitle: "Intelligent Assistant",
        category: "AI VOICE",
        description: "Voice-first AI that integrates with your entire workspace to automate tasks via natural language.",
        link: "/services/ai-machine-learning",
        thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2340&auto=format&fit=crop",
        tags: ["NLP", "Voice AI", "Automation"]
    },
    {
        id: "p6",
        title: "APPZETO HEALTH",
        subtitle: "Hospital Ecosystem",
        category: "HEALTHCARE",
        description: "Integrated hospital management system with patient portal, billing, and automated diagnostics.",
        link: "/appzeto-hospital",
        thumbnail: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2340&auto=format&fit=crop",
        tags: ["EHR", "Healthcare", "Data Sync"]
    }
];

const Projects = () => {
    return (
        <ScrollWrapper>
            <div className="bg-[#0a0a0a] min-h-screen text-white font-sans">
                <Navbar />

                {/* Hero Section */}
                <section className="relative pt-14 md:pt-32 pb-4 md:pb-12 px-6 md:px-20 overflow-hidden text-center md:text-left">
                    <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/10 rounded-full blur-[100px] md:blur-[150px] -z-10 animate-pulse" />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-7xl mx-auto"
                    >
                        <h1 className="text-2xl sm:text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none italic">
                            PROJECTS WE HAVE <br />
                            <span className="text-primary">CREATED</span>
                        </h1>
                        <p className="mt-2 md:mt-6 text-gray-400 text-[9px] md:text-base max-w-xl font-medium tracking-wide leading-relaxed mx-auto md:mx-0">
                            A showcase of our most ambitious digital transformations. From AI-driven ecosystems to complex enterprise architectures, we build instruments for the future.
                        </p>
                    </motion.div>
                </section>

                {/* Projects Grid */}
                <section className="pb-20 md:pb-32 px-4 md:px-20">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
                        {allProjects.map((project, idx) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className="group"
                            >
                                <Link to={project.link}>
                                    <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 transition-all duration-700 md:group-hover:border-primary/50 shadow-2xl">
                                        {/* Image */}
                                        <img
                                            src={project.thumbnail}
                                            alt={project.title}
                                            className="w-full h-full object-cover grayscale-[0.8] md:grayscale-[0.5] md:group-hover:grayscale-0 md:group-hover:scale-110 transition-all duration-1000"
                                        />

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity" />

                                        {/* Content */}
                                        <div className="absolute inset-0 p-5 md:p-10 flex flex-col justify-end">
                                            <div className="space-y-2 md:space-y-4">
                                                <div className="flex flex-wrap gap-1.5 md:gap-2 mb-1 md:mb-2">
                                                    {project.tags.slice(0, 2).map(tag => (
                                                        <span key={tag} className="px-2 py-0.5 bg-white/10 backdrop-blur-md rounded-full text-[6px] md:text-[8px] font-black uppercase tracking-widest text-primary border border-primary/20">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                <h3 className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter leading-none md:group-hover:text-primary transition-colors">
                                                    {project.title}
                                                </h3>
                                                <p className="text-gray-400 text-[10px] md:text-xs font-medium leading-relaxed opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 line-clamp-2">
                                                    {project.description}
                                                </p>
                                                <div className="pt-1 md:pt-2 flex items-center gap-2 md:gap-3 text-primary">
                                                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em]">View Case Study</span>
                                                    <span className="material-icons text-xs md:text-sm md:group-hover:translate-x-2 transition-transform">east</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <Footer />
            </div>
        </ScrollWrapper>
    );
};

export default Projects;
