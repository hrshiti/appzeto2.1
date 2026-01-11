import React, { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollWrapper from '../components/ScrollWrapper';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import groupImg from '../assets/group_photo.jpeg';
// Fixed: Pointing to existing file 'boating.jpg' instead of missing 'bonfire.jpg'
import bonfireImg from '../assets/boating.jpg';
import boatingImg from '../assets/boating.jpg';
import achImg1 from '../assets/acheivement1.jpeg';
import achImg2 from '../assets/achievement2.jpeg';
import achImg3 from '../assets/achievement3.jpg';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const achievements = [
    { title: "Best Startup 2025", award: "National Tech Excellence", icon: "emoji_events", image: achImg1 },
    { title: "Top AI Solutions", award: "Global Innovation Summit", icon: "psychology", image: achImg2 },
    { title: "Fastest Growth", award: "Industry Leaders Award", icon: "trending_up", image: achImg1 },
    { title: "Design Excellence", award: "International UI/UX Forum", icon: "auto_awesome", image: achImg2 }
];

import { dataService } from '../admin/services/dataService';

const Blogs = () => {
    const containerRef = useRef(null);
    const [blogs, setBlogs] = React.useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await dataService.getBlogs();
                setBlogs(data || []);
            } catch (err) {
                console.error("Error fetching blogs:", err);
            }
        };
        fetchBlogs();
    }, []);

    useEffect(() => {
        if (blogs.length > 0) {
            const sections = gsap.utils.toArray('.blog-section');
            sections.forEach((section, i) => {
                if (window.innerWidth >= 768) {
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
                }
            });
        }
    }, [blogs]);

    return (
        <ScrollWrapper>
            <div className="bg-[#f8fafc] min-h-screen font-sans">
                <Navbar />

                {/* --- HERO SECTION --- */}
                <section className="h-[60vh] md:h-screen flex items-center justify-center relative overflow-hidden bg-white">
                    <div className="absolute inset-0 z-0">
                        <img
                            src={groupImg}
                            className="w-full h-full object-cover"
                            alt="Appzeto Team"
                        />
                        <div className="absolute inset-0 bg-black/40" />
                    </div>
                    <div className="relative z-10 text-center px-4 w-full max-w-[1700px] mx-auto md:-mt-24">
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="text-4xl md:text-8xl font-black text-primary uppercase italic tracking-tighter"
                        >
                            Appzeto <span className="font-black italic">Stories</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-slate-200 text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] mt-4 md:mt-8 max-w-3xl mx-auto"
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
                    {blogs.length > 0 ? blogs.map((post, i) => (
                        <section key={post._id} className="blog-section relative h-auto md:h-[85vh] flex items-center overflow-hidden border-b border-slate-100 bg-white">
                            <div className={`flex w-full h-full flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                {/* --- IMAGE SIDE --- */}
                                <div className="w-full md:w-1/2 h-[300px] md:h-full overflow-hidden relative group p-4 md:p-10">
                                    <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-2xl relative">
                                        <img
                                            src={post.featuredImage && post.featuredImage.startsWith('/uploads') ? `${import.meta.env.VITE_BACKEND_URL}${post.featuredImage}` : (post.featuredImage || bonfireImg)}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                            alt={post.title}
                                        />
                                        <div className="absolute inset-0 bg-black/5" />
                                    </div>
                                </div>

                                {/* --- CONTENT SIDE --- */}
                                <div className="w-full md:w-1/2 px-6 py-6 md:px-10 lg:px-16 h-full flex items-center justify-center">
                                    <div className="content-box max-w-xl w-full">
                                        <div className="flex items-center gap-4 mb-3 md:mb-5">
                                            <span className="px-4 py-1 bg-[#05A4A7]/5 border border-[#05A4A7]/20 rounded-full text-[#05A4A7] text-[9px] md:text-[10px] font-black uppercase tracking-widest">{post.tag || 'Updates'}</span>
                                            <span className="text-slate-400 text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
                                                {post.publishDate ? new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Jan 01, 2026'}
                                            </span>
                                        </div>
                                        <h2 className="text-2xl md:text-[4vw] font-black text-slate-900 uppercase italic tracking-tighter mb-3 md:mb-6 leading-[0.85] hover:text-[#05A4A7] transition-colors">
                                            {post.title}
                                        </h2>
                                        <div className="relative mb-5 md:mb-8">
                                            <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#05A4A7]/30 rounded-full" />
                                            <p className="text-slate-600 text-sm md:text-lg leading-relaxed italic pl-6 md:pl-10 font-medium line-clamp-3">
                                                {post.excerpt || "There's nothing quite like a cold night warmed by a bright bonfire and even warmer conversations."}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-3 gap-6 md:gap-8 mb-8">
                                            {post.stats && post.stats.map((stat, idx) => (
                                                <div key={idx} className="group cursor-default">
                                                    <div className="text-2xl md:text-4xl font-black text-[#05A4A7] uppercase italic tracking-tighter group-hover:scale-110 transition-transform origin-left">{stat.label}</div>
                                                    <div className="text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">{stat.subtext}</div>
                                                </div>
                                            ))}
                                            {(!post.stats || post.stats.length === 0) && (
                                                <>
                                                    <div>
                                                        <div className="text-2xl md:text-4xl font-black text-[#05A4A7] uppercase italic tracking-tighter">50+</div>
                                                        <div className="text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">STORIES</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-2xl md:text-4xl font-black text-[#05A4A7] uppercase italic tracking-tighter">INFINITE</div>
                                                        <div className="text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">LAUGHTER</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-2xl md:text-4xl font-black text-[#05A4A7] uppercase italic tracking-tighter">PERFECT</div>
                                                        <div className="text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">HEAT</div>
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        {/* VIEW FULL STORY BUTTON - CONDITIONAL */}
                                        {post.content && post.content.replace(/<[^>]*>?/gm, '').trim().length > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                className="mt-12 md:mt-16"
                                            >
                                                <Link
                                                    to={`/blogs/${post.slug || post._id}`}
                                                    className="inline-flex items-center gap-4 px-8 py-4 bg-slate-900 text-white rounded-full font-black uppercase italic tracking-widest text-[10px] md:text-xs hover:bg-[#05A4A7] transition-all duration-500 shadow-xl shadow-slate-200"
                                                >
                                                    Read Full Story
                                                    <span className="material-icons text-sm md:text-lg">arrow_forward</span>
                                                </Link>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>
                    )) : (
                        <div className="py-20 text-center text-slate-400 font-bold uppercase tracking-widest">No stories found. Start building the future...</div>
                    )}
                </div>

                {/* --- ACHIEVEMENTS SECTION --- */}
                <section className="h-auto md:h-screen flex flex-col justify-center px-4 md:px-10 lg:px-24 max-w-[1700px] mx-auto relative overflow-hidden py-12 md:py-0">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

                    <div className="text-center mb-8">
                        <p className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4">Milestones</p>
                        <h2 className="text-2xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-tight">
                            Awards & <span className="text-primary italic">Achievements</span>
                        </h2>
                    </div>

                    {/* Mobile View: Automatic Slider */}
                    <div className="md:hidden w-full overflow-hidden">
                        <motion.div
                            animate={{ x: ["0%", "-100%"] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="flex gap-4 w-fit"
                        >
                            {[achImg1, achImg2, achImg3, achImg1, achImg2, achImg3].map((img, idx) => (
                                <div key={idx} className="flex-shrink-0 w-[70vw] h-[220px] relative rounded-[2rem] overflow-hidden shadow-xl">
                                    <img src={img} className="w-full h-full object-cover" alt={`Award ${idx}`} />
                                    <div className="absolute inset-0 bg-black/20" />
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Desktop View: Staggered Layout */}
                    <div className="hidden md:flex flex-row items-start gap-10">
                        <div className="flex-[1.2] w-full h-[400px] relative rounded-[3rem] overflow-hidden group shadow-2xl">
                            <img src={achImg1} className="w-full h-full object-cover transition-all duration-1000" alt="Awards 1" />
                        </div>
                        <div className="flex-1 w-full h-[300px] mt-24 relative rounded-[3rem] overflow-hidden group shadow-2xl">
                            <img src={achImg2} className="w-full h-full object-cover transition-all duration-1000" alt="Awards 2" />
                        </div>
                        <div className="flex-1 w-full h-[340px] mt-8 relative rounded-[3rem] overflow-hidden group shadow-2xl">
                            <img src={achImg3} className="w-full h-full object-cover transition-all duration-1000" alt="Awards 3" />
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </ScrollWrapper>
    );
};

export default Blogs;
