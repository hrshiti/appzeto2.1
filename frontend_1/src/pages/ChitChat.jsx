import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollWrapper from '../components/ScrollWrapper';
import { motion, AnimatePresence } from 'framer-motion';

const ChitChat = () => {
    const [status, setStatus] = useState('idle');

    const handleSend = (e) => {
        e.preventDefault();
        setStatus('sending');
        setTimeout(() => setStatus('sent'), 2000);
    };

    return (
        <ScrollWrapper>
            <div className="bg-[#f8fafc] min-h-screen font-sans text-slate-900 overflow-x-hidden selection:bg-primary selection:text-white">
                <Navbar />

                <main className="w-full flex flex-col relative px-0">
                    {/* Background Decorative Elements */}
                    <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] -z-10 animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] -z-10" />

                    {/* Full Width Unified Container: Image Background + Form Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-full relative min-h-[700px] lg:h-[85vh] flex items-stretch overflow-hidden"
                    >
                        {/* Background Image Layer - Full Width */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                                alt="Team Background"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
                        </div>

                        {/* Content Grid (within the full-width container) */}
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 w-full max-w-[1400px] mx-auto h-full">
                            {/* Left Side: Creative Text Overlaying Image */}
                            <div className="hidden lg:flex flex-col justify-center p-12 text-white">
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <p className="text-primary font-black uppercase tracking-[0.6em] text-[10px] mb-4">Direct Collaboration</p>
                                    <h2 className="text-6xl lg:text-8xl font-black uppercase italic tracking-tighter leading-[0.8] drop-shadow-2xl">
                                        Great <br />
                                        <span className="text-primary italic">Things</span> <br />
                                        Start <br />
                                        With <br />
                                        A Chat.
                                    </h2>
                                    <p className="mt-8 text-white/80 max-w-sm font-bold italic text-sm leading-relaxed border-l-4 border-primary/50 pl-6">
                                        Have an idea? A question? Or just want to say hi? We are all ears. Let's build the future together.
                                    </p>
                                </motion.div>
                            </div>

                            {/* Right Side: High-Contrast Form Overlay - COMPACT & CLEAN */}
                            <div className="flex items-center justify-center p-4 lg:p-8 h-full">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-white/95 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-10 w-full max-w-xl shadow-[0_40px_80px_rgba(0,0,0,0.15)] border border-white/50"
                                >
                                    <div className="mb-6 text-center lg:text-left">
                                        <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tight">Drop us a Line</h2>
                                        <p className="text-slate-500 text-[10px] mt-1 font-bold uppercase tracking-widest inline-block bg-slate-100 px-3 py-1 rounded-full">Response in 2 hours</p>
                                    </div>

                                    <form onSubmit={handleSend} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-3">Full Name</label>
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="Your Name"
                                                    className="w-full bg-slate-50/80 border border-slate-100 p-3 rounded-xl focus:border-primary focus:bg-white outline-none transition-all placeholder:text-slate-300 text-sm font-bold italic text-slate-800"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-3">Phone</label>
                                                <input
                                                    required
                                                    type="tel"
                                                    placeholder="+91 0000..."
                                                    className="w-full bg-slate-50/80 border border-slate-100 p-3 rounded-xl focus:border-primary focus:bg-white outline-none transition-all placeholder:text-slate-300 text-sm font-bold italic text-slate-800"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-3">Email Address</label>
                                            <input
                                                required
                                                type="email"
                                                placeholder="you@email.com"
                                                className="w-full bg-slate-50/80 border border-slate-100 p-3 rounded-xl focus:border-primary focus:bg-white outline-none transition-all placeholder:text-slate-300 text-sm font-bold italic text-slate-800"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-3">Reason</label>
                                            <div className="relative">
                                                <select
                                                    required
                                                    className="w-full bg-slate-50/80 border border-slate-100 p-3 rounded-xl focus:border-primary focus:bg-white outline-none transition-all text-sm font-bold italic text-slate-800 appearance-none cursor-pointer"
                                                >
                                                    <option value="" disabled selected>Select reason</option>
                                                    <option value="project">New Project</option>
                                                    <option value="partnership">Partnership</option>
                                                    <option value="career">Careers</option>
                                                    <option value="other">General</option>
                                                </select>
                                                <span className="material-icons absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-lg">expand_more</span>
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-3">Message</label>
                                            <textarea
                                                required
                                                rows="2"
                                                placeholder="How can we help?"
                                                className="w-full bg-slate-50/80 border border-slate-100 p-3 rounded-xl focus:border-primary focus:bg-white outline-none transition-all placeholder:text-slate-300 text-sm font-bold italic text-slate-800 resize-none"
                                            />
                                        </div>

                                        <button
                                            disabled={status !== 'idle'}
                                            className={`w-full py-4 rounded-xl font-black uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-3 text-[10px] shadow-lg ${status === 'idle' ? 'bg-primary text-white hover:scale-[1.02] active:scale-[0.98]' :
                                                    status === 'sending' ? 'bg-slate-100 text-slate-400 animate-pulse' : 'bg-green-500 text-white'
                                                }`}
                                        >
                                            {status === 'idle' && <>Send Message <span className="material-icons text-sm">send</span></>}
                                            {status === 'sending' && <>Sending... <span className="material-icons animate-bounce text-sm">chat</span></>}
                                            {status === 'sent' && <>Success! <span className="material-icons text-sm">check_circle</span></>}
                                        </button>
                                    </form>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </main>

                <Footer />
            </div>
        </ScrollWrapper>
    );
};

export default ChitChat;
