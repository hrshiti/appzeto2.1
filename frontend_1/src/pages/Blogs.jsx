import React, { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollWrapper from '../components/ScrollWrapper';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import groupImg from '../assets/group (1).jpeg';
import bonfireImg from '../assets/bonfire.jpg';
import boatingImg from '../assets/boating.jpg';
import achImg1 from '../assets/acheivement1.jpeg';
import achImg2 from '../assets/achievement2.jpeg';
import achImg3 from '../assets/achievement3.jpg';

gsap.registerPlugin(ScrollTrigger);

const blogPosts = [
    {
        id: 1,
        title: "Magic at Maheshwar",
        category: "Team Retreat",
        date: "Dec 28, 2025",
        image: groupImg,
        description: "Everything about our trip to Maheshwar was legendary. The historic forts, the peaceful Narmada river, and the team bonding sessions created memories that will last a lifetime. We explored every corner of the Ahilya Ghat and felt the rich heritage in every stone.",
        stats: { people: "25+", days: "3", fun: "100%" }
    },
    {
        id: 2,
        title: "The Bonfire Night",
        category: "Winter Vibes",
        date: "Dec 30, 2025",
        image: bonfireImg,
        description: "There's nothing quite like a cold night warmed by a bright bonfire and even warmer conversations. We had 'badhiya' snacks, shared our funniest office stories, and bonded over music under the open sky. A true highlight of our cultural life.",
        stats: { stories: "50+", laughter: "Infinite", heat: "Perfect" }
    },
    {
        id: 3,
        title: "Boating Adventures",
        category: "Adventure",
        date: "Jan 2, 2026",
        image: boatingImg,
        description: "Navigating the serene waters together, our boating trip was a masterclass in teamwork and relaxation. The gentle rhythm of the oars and the breathtaking views provided the perfect backdrop for meaningful conversations and shared laughter.",
        stats: { boats: "5", waves: "Calm", joy: "Pure" }
    }
];

const achievements = [
    { title: "Best Startup 2025", award: "National Tech Excellence", icon: "emoji_events", image: achImg1 },
    { title: "Top AI Solutions", award: "Global Innovation Summit", icon: "psychology", image: achImg2 },
    { title: "Fastest Growth", award: "Industry Leaders Award", icon: "trending_up", image: achImg1 },
    { title: "Design Excellence", award: "International UI/UX Forum", icon: "auto_awesome", image: achImg2 }
];

const Blogs = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const sections = gsap.utils.toArray('.blog-section');

        sections.forEach((section, i) => {
            gsap.fromTo(section.querySelector('.content-box'),
                { opacity: 0, x: i % 2 === 0 ? 100 : -100 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1.5,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 70%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }, []);

    return (
        <ScrollWrapper>
            <div className="bg-[#f8fafc] min-h-screen font-sans">
                <Navbar />

                {/* --- HERO SECTION --- */}
                <section className="h-screen flex items-center justify-center relative overflow-hidden bg-white">
                    <div className="absolute inset-0 z-0">
                        <img
                            src={groupImg}
                            className="w-full h-full object-cover"
                            alt="Appzeto Team"
                        />
                        <div className="absolute inset-0 bg-black/40" />
                    </div>
                    <div className="relative z-10 text-center px-6 w-full max-w-[1700px] mx-auto -mt-24">
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="text-5xl md:text-8xl font-black text-primary uppercase italic tracking-tighter"
                        >
                            Appzeto <span className="font-black italic">Stories</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-slate-200 text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] mt-8 max-w-3xl mx-auto"
                        >
                            Chapter by chapter, we are building the future.
                        </motion.p>
                    </div>
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
                        <span className="material-icons text-white/30 text-4xl">south</span>
                    </div>
                </section>

                {/* --- BLOG SECTIONS (SIDE BY SIDE) --- */}
                <div ref={containerRef} className="space-y-0">
                    {blogPosts.map((post, i) => (
                        <section key={post.id} className="blog-section relative h-[70vh] flex items-center overflow-hidden border-b border-slate-100 bg-white">
                            <div className={`flex w-full h-full items-center ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                                {/* --- IMAGE SIDE --- */}
                                <div className="w-1/2 h-full overflow-hidden relative image-container">
                                    <img src={post.image} className="w-full h-full object-cover transition-transform duration-700" alt={post.title} />
                                </div>

                                {/* --- CONTENT SIDE --- */}
                                <div className="w-1/2 px-12 lg:px-24">
                                    <div className="content-box max-w-2xl mx-auto">
                                        <div className="flex items-center gap-4 mb-6">
                                            <span className="px-5 py-1.5 bg-primary/5 border border-primary/20 rounded-full text-primary text-[10px] font-black uppercase tracking-widest">{post.category}</span>
                                            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{post.date}</span>
                                        </div>
                                        <h2 className="text-4xl md:text-6xl font-black text-slate-800 uppercase italic tracking-tight mb-8 leading-tight">
                                            {post.title}
                                        </h2>
                                        <p className="text-slate-500 text-base lg:text-lg leading-relaxed mb-12 italic border-l-4 border-primary/20 pl-8">
                                            {post.description}
                                        </p>

                                        <div className="grid grid-cols-3 gap-8">
                                            {Object.entries(post.stats).map(([key, value]) => (
                                                <div key={key}>
                                                    <div className="text-3xl font-black text-primary uppercase italic">{value}</div>
                                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{key}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    ))}
                </div>

                {/* --- ACHIEVEMENTS SECTION --- */}
                <section className="h-screen flex flex-col justify-center px-10 lg:px-24 max-w-[1700px] mx-auto relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

                    <div className="text-center mb-8">
                        <p className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4">Milestones</p>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-tight">
                            Awards & <span className="text-primary italic">Achievements</span>
                        </h2>
                    </div>

                    <div className="flex flex-col md:flex-row items-start gap-10">
                        {/* Image 1 - Large & Main */}
                        <div className="flex-[1.2] w-full h-[400px] relative rounded-[3rem] overflow-hidden group shadow-2xl">
                            <img src={achImg1} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Awards 1" />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                        </div>

                        {/* Image 2 - Medium & Staggered Down */}
                        <div className="flex-1 w-full h-[300px] md:mt-24 relative rounded-[3rem] overflow-hidden group shadow-2xl">
                            <img src={achImg2} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Awards 2" />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                        </div>

                        {/* Image 3 - Small & Staggered Mid */}
                        <div className="flex-1 w-full h-[340px] md:mt-8 relative rounded-[3rem] overflow-hidden group shadow-2xl">
                            <img src={achImg3} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Awards 3" />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </ScrollWrapper>
    );
};

export default Blogs;
