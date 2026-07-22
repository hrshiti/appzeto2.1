import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollWrapper from '../components/ScrollWrapper';
import { motion } from 'framer-motion';
import { dataService } from '../admin/services/dataService';
import { getMediaUrl } from '../utils/getMediaUrl';

const BlogDetail = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const data = await dataService.getBlog(slug);
                setBlog(data);
            } catch (err) {
                console.error("Error fetching blog:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
        window.scrollTo(0, 0);
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-12 h-12 border-4 border-[#05A4A7] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
                <h1 className="text-4xl font-black text-slate-900 mb-4">STORY NOT FOUND</h1>
                <Link to="/blogs" className="text-[#05A4A7] font-bold uppercase tracking-widest">Back to Stories</Link>
            </div>
        );
    }

    return (
        <ScrollWrapper>
            <div className="bg-white min-h-screen font-sans">
                <Navbar />

                {/* --- HEADER --- */}
                <header className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                    <img
                        src={getMediaUrl(blog.featuredImage)}
                        className="absolute inset-0 w-full h-full object-cover"
                        alt={blog.title}
                    />
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

                    <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="px-6 py-2 bg-[#05A4A7] text-white text-[10px] md:text-xs font-black uppercase tracking-[0.3em] rounded-full mb-8 inline-block"
                        >
                            {blog.tag || 'Updates'}
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-[0.9]"
                        >
                            {blog.title}
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-8 text-white/60 text-xs md:text-sm font-bold uppercase tracking-widest"
                        >
                            {new Date(blog.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • BY {blog.author}
                        </motion.div>
                    </div>
                </header>

                {/* --- CONTENT --- */}
                <main className="max-w-6xl mx-auto px-4 md:px-8 py-12">
                    <div
                        className="prose prose-lg md:prose-2xl prose-slate max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:italic prose-a:text-[#05A4A7] standard-content"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />

                    <div className="mt-20 pt-10 border-t border-slate-100 flex justify-between items-center">
                        <Link to="/blogs" className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-widest text-[10px] hover:text-[#05A4A7] transition-colors">
                            <span className="material-icons text-sm">west</span>
                            Back to Stories
                        </Link>
                    </div>
                </main>

                <Footer />
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .standard-content p { margin-bottom: 1.5rem; color: #334155; line-height: 1.6; }
                .standard-content img { border-radius: 1rem; margin: 2rem 0; max-height: 500px; width: auto; }
                .standard-content h2 { font-size: 2rem; margin-top: 3rem; color: #0f172a; }
            `}} />
        </ScrollWrapper>
    );
};

export default BlogDetail;
