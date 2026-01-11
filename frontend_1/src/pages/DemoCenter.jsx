import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollWrapper from '../components/ScrollWrapper';
import { dataService } from '../admin/services/dataService';

const DemoCenter = () => {
    const HERO_VIDEO = {
        _id: 'hero-static',
        title: "Appzeto Core Platform",
        description: "A comprehensive walk-through of our flagship ecosystem, showing real-time data sync and AI capabilities.",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2340&auto=format&fit=crop",
        visibility: "Public"
    };

    const [selectedVideo, setSelectedVideo] = useState(null);
    const [videos, setVideos] = useState([]);
    const [mainDemo, setMainDemo] = useState(HERO_VIDEO);
    const [loading, setLoading] = useState(true);

    const getImgUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        return path.startsWith('/uploads') ? `${import.meta.env.VITE_BACKEND_URL}${path}` : path;
    };

    const getFullUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('http')) return url;
        return url.startsWith('/uploads') ? `${import.meta.env.VITE_BACKEND_URL}${url}` : url;
    };

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const allVideos = await dataService.getVideos();
                // Filter public videos
                const publicVideos = Array.isArray(allVideos) ? allVideos.filter(v => v.visibility === 'Public') : [];

                // Logic:
                // 1. Check if any video is marked as featured in backend
                const featuredVideo = publicVideos.find(v => v.featured);

                if (featuredVideo) {
                    setMainDemo(featuredVideo);
                    // Filter out the featured video from the grid
                    setVideos(publicVideos.filter(v => v._id !== featuredVideo._id));
                } else {
                    // Fallback to static hero if nothing featured exists
                    setMainDemo(HERO_VIDEO);
                    setVideos(publicVideos);
                }
            } catch (error) {
                console.error("Error fetching videos:", error);
                setMainDemo(HERO_VIDEO);
            } finally {
                setLoading(false);
            }
        };
        fetchVideos();
        window.scrollTo(0, 0);
    }, []);

    const VideoModal = ({ video, onClose }) => {
        const url = video.url;
        const isVideoFile = url.startsWith('/uploads') ||
            url.includes('cloudinary.com') ||
            url.match(/\.(mp4|webm|ogg)$/i);
        const fullUrl = getFullUrl(url);

        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative w-full max-w-5xl aspect-video bg-gray-900 rounded-3xl overflow-hidden shadow-2xl"
                    onClick={e => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>

                    {isVideoFile ? (
                        <video
                            src={fullUrl}
                            controls
                            autoPlay
                            className="w-full h-full object-contain"
                        />
                    ) : (
                        <iframe
                            src={url.includes('youtube.com/embed') || url.includes('vimeo.com') ?
                                `${url}${url.includes('?') ? '&' : '?'}autoplay=1` :
                                url}
                            className="w-full h-full"
                            title={video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    )}
                </motion.div>
            </motion.div>
        );
    };

    return (
        <ScrollWrapper>
            <div className="bg-[#f8f9fa] min-h-screen font-sans selection:bg-primary selection:text-white">
                <Navbar />

                {/* --- Hero Section with Main Video --- */}
                {mainDemo && (
                    <section className="relative w-full h-[25vh] md:h-[85vh] overflow-hidden cursor-pointer group" onClick={() => setSelectedVideo(mainDemo)}>
                        <img
                            src={getImgUrl(mainDemo.thumbnail)}
                            className="absolute inset-0 w-full h-full object-cover brightness-[0.4] group-hover:scale-105 transition-transform duration-[3s] ease-out"
                            alt="Core Demo"
                        />

                        <div className="absolute inset-0 bg-black/40" />

                        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4 pt-10">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="max-w-5xl"
                            >
                                <span className="text-primary font-black tracking-[0.4em] uppercase text-[9px] md:text-xs mb-3 md:mb-6 block">Featured Demo</span>
                                <h1 className="text-2xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[1] md:leading-[0.9] mb-4 md:mb-8 italic">
                                    {mainDemo.title}
                                </h1>
                                <p className="max-w-xl mx-auto text-[10px] md:text-lg font-medium leading-relaxed opacity-80 mb-6 md:mb-12">
                                    {mainDemo.description}
                                </p>

                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="inline-flex items-center justify-center w-14 h-14 md:w-28 md:h-28 rounded-full bg-primary cursor-pointer"
                                >
                                    <span className="material-symbols-outlined text-2xl md:text-5xl">play_arrow</span>
                                </motion.div>
                            </motion.div>
                        </div>
                    </section>
                )}

                {/* --- Demos Grid --- */}
                <section className="py-6 md:py-24 px-4 md:px-20 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-4 md:mb-16">
                            <span className="text-primary font-black tracking-[0.2em] uppercase text-[9px] md:text-xs mb-1 block">Watch & Learn</span>
                            <h2 className="text-lg md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">Latest <span className="text-primary">Demos</span></h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                            {videos.length > 0 ? (
                                videos.map((demo, idx) => (
                                    <motion.div
                                        key={demo._id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="group cursor-pointer"
                                        onClick={() => setSelectedVideo(demo)}
                                    >
                                        <div className="relative aspect-video md:aspect-[16/10] rounded-2xl md:rounded-3xl overflow-hidden bg-gray-900 mb-3 md:mb-6 border border-gray-100">
                                            <img src={getImgUrl(demo.thumbnail)} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" alt={demo.title} />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110">
                                                    <span className="material-symbols-outlined text-xl md:text-3xl">play_arrow</span>
                                                </div>
                                            </div>
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-tighter mt-1 group-hover:text-primary transition-colors">{demo.title}</h3>
                                        <p className="text-gray-500 text-sm line-clamp-2 mt-2">{demo.description}</p>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-full py-10 text-center text-slate-400">
                                    {!mainDemo && "No demo videos available."}
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* --- CTA Section --- */}
                <section className="py-12 md:py-32 px-4 md:px-20 bg-gray-50">
                    <div className="max-w-5xl mx-auto text-center">
                        <h2 className="text-xl md:text-6xl font-black uppercase tracking-tighter italic leading-none mb-6">Want a Custom Demo for your Business?</h2>
                        <button className="px-8 py-4 md:px-10 md:py-5 bg-gray-900 text-white font-black rounded-full uppercase tracking-widest text-[10px] md:text-sm hover:bg-primary transition-all">Schedule a Call</button>
                    </div>
                </section>

                <Footer />

                {/* Video Modal Overlay */}
                <AnimatePresence>
                    {selectedVideo && (
                        <VideoModal
                            video={selectedVideo}
                            onClose={() => setSelectedVideo(null)}
                        />
                    )}
                </AnimatePresence>
            </div>
        </ScrollWrapper>
    );
};

export default DemoCenter;

