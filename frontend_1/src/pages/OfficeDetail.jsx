import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollWrapper from '../components/ScrollWrapper';
import { officesData } from '../data/officesData';

const OfficeDetail = () => {
    const { slug } = useParams();
    const [office, setOffice] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [formStatus, setFormStatus] = useState('');

    useEffect(() => {
        const foundOffice = officesData.find(o => o.slug === slug);
        setOffice(foundOffice);
        window.scrollTo(0, 0);
    }, [slug]);

    if (!office) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-white">
                <div className="text-center">
                    <h2 className="text-4xl font-black mb-4">Office Not Found</h2>
                    <Link to="/" className="text-primary hover:underline">Back to Home</Link>
                </div>
            </div>
        );
    }

    const handleCopyAddress = () => {
        navigator.clipboard.writeText(office.address);
        alert('Address copied to clipboard!');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('Message sent successfully!');
        setTimeout(() => setFormStatus(''), 3000);
    };

    return (
        <ScrollWrapper>
            <Navbar />

            <div className="bg-[#0A0A0A] text-white min-h-screen font-sans selection:bg-primary selection:text-white">

                {/* --- Section 1: Hero Section --- */}
                <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
                    <motion.img
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.4 }}
                        transition={{ duration: 1.5 }}
                        src={office.heroImage}
                        className="absolute inset-0 w-full h-full object-cover"
                        alt={office.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0A0A0A]" />

                    <div className="relative z-10 text-center px-4 max-w-5xl">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-primary/20 text-primary border border-primary/30 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-6 inline-block backdrop-blur-md"
                        >
                            Development Center
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none italic mb-6"
                        >
                            {office.name}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-sm md:text-xl text-gray-400 font-medium tracking-wide max-w-2xl mx-auto"
                        >
                            {office.tagline}
                        </motion.p>
                    </div>
                </section>

                {/* --- Section 2: Info & Stats --- */}
                <section className="py-12 md:py-24 px-4 md:px-20 relative -mt-20 z-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                            {/* Information Glass Cards */}
                            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="p-8 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-xl group"
                                >
                                    <span className="material-symbols-outlined text-primary text-3xl mb-4 block">location_on</span>
                                    <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2">Location</h3>
                                    <p className="text-lg font-bold leading-tight mb-6">{office.address}</p>
                                    <button
                                        onClick={handleCopyAddress}
                                        className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest hover:gap-3 transition-all"
                                    >
                                        Copy Address <span className="material-symbols-outlined text-sm">content_copy</span>
                                    </button>
                                </motion.div>

                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="p-8 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-xl"
                                >
                                    <span className="material-symbols-outlined text-emerald-500 text-3xl mb-4 block">call</span>
                                    <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2">Connect</h3>
                                    <p className="text-xl font-bold mb-1 italic">{office.phone}</p>
                                    <p className="text-gray-400 font-medium text-sm mb-6">{office.email}</p>
                                    <div className="flex gap-4">
                                        <a href={`tel:${office.phone}`} className="p-3 bg-white/10 hover:bg-primary rounded-full transition-colors">
                                            <span className="material-symbols-outlined text-base">call</span>
                                        </a>
                                        <a href={`mailto:${office.email}`} className="p-3 bg-white/10 hover:bg-primary rounded-full transition-colors">
                                            <span className="material-symbols-outlined text-base">mail</span>
                                        </a>
                                    </div>
                                </motion.div>

                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="p-8 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-xl"
                                >
                                    <span className="material-symbols-outlined text-purple-500 text-3xl mb-4 block">schedule</span>
                                    <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2">Availability</h3>
                                    <p className="text-lg font-bold leading-tight mb-2">{office.workingHours}</p>
                                    <span className="text-xs text-gray-500 font-black uppercase tracking-widest">{office.timeZone}</span>
                                </motion.div>

                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="p-8 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-xl"
                                >
                                    <span className="material-symbols-outlined text-orange-500 text-3xl mb-4 block">info</span>
                                    <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2">About The Hub</h3>
                                    <p className="text-sm text-gray-400 font-medium leading-relaxed italic">
                                        "{office.about}"
                                    </p>
                                </motion.div>
                            </div>

                            {/* Map Section */}
                            <div className="md:col-span-4 h-full min-h-[400px]">
                                <div className="h-full bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-xl p-3">
                                    <iframe
                                        title="Office Location"
                                        src={office.mapUrl}
                                        className="w-full h-full rounded-[1.5rem] grayscale invert contrast-[0.9] opacity-70"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* --- Section 3: Gallery --- */}
                <section className="py-12 md:py-24 px-4 md:px-20 bg-black/30">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-12">
                            <span className="text-primary font-black tracking-[0.4em] uppercase text-[10px] mb-2 block">Visual Tour</span>
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic">Inside <span className="text-primary">The Workspace</span></h2>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {office.gallery.map((img, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 0.98 }}
                                    className="aspect-square rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden cursor-zoom-in"
                                    onClick={() => setSelectedImage(img)}
                                >
                                    <img src={img} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt={`Gallery ${i}`} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- Section 4: Contact Form --- */}
                <section className="py-20 md:py-32 px-4 md:px-20 border-t border-white/5">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-[0.9] mb-8">
                                    Message <br />
                                    <span className="text-primary">This Hub</span> Direct
                                </h2>
                                <p className="text-gray-400 text-lg font-medium leading-relaxed mb-10 max-w-sm">
                                    Have a specific inquiry for our {office.city} team? Send it here and we'll get back to you within 24 hours.
                                </p>
                                <Link to="/about" className="flex items-center gap-3 text-white/50 hover:text-white transition-colors group">
                                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest">Back to Offices</span>
                                </Link>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        required
                                        placeholder="Your Name"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 outline-none focus:border-primary focus:bg-white/10 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <input
                                        type="email"
                                        required
                                        placeholder="Business Email"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 outline-none focus:border-primary focus:bg-white/10 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <textarea
                                        required
                                        rows="4"
                                        placeholder="How can we help?"
                                        className="w-full bg-white/5 border border-white/10 rounded-3xl py-5 px-8 outline-none focus:border-primary focus:bg-white/10 transition-all resize-none"
                                    />
                                </div>
                                <button className="w-full py-6 bg-primary text-white font-black uppercase tracking-[0.3em] rounded-full hover:bg-white hover:text-black transition-all transform hover:-translate-y-1">
                                    Deliver Message
                                </button>
                                {formStatus && <p className="text-emerald-500 font-black text-center text-xs uppercase tracking-widest animate-pulse">{formStatus}</p>}
                            </form>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>

            {/* --- Lightbox --- */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[9999] p-4 md:p-20 bg-black/95 flex items-center justify-center backdrop-blur-xl cursor-zoom-out"
                    >
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            src={selectedImage}
                            className="max-w-full max-h-full rounded-3xl object-contain shadow-2xl"
                        />
                        <button className="absolute top-10 right-10 text-white hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-4xl font-black">close</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </ScrollWrapper>
    );
};

export default OfficeDetail;
