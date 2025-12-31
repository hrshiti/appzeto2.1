import React from 'react';
import { motion } from 'framer-motion';

const ContactUs = () => {
    return (
        <div className="bg-[#f6f8f8] dark:bg-[#012829] font-sans transition-colors duration-500 overflow-hidden min-h-screen lg:h-screen flex flex-col pt-12 lg:pt-20 relative">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#05A4A7]/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-6xl mx-auto px-6 w-full relative z-10 flex flex-col justify-center">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative text-left mb-12"
                >
                    <div className="absolute top-0 left-0 -translate-y-full text-gray-200 dark:text-gray-800 opacity-30">
                        <svg width="40" height="20" viewBox="0 0 40 20" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M0 10 L5 0 L10 20 L15 0 L20 20 L25 0 L30 20 L35 0 L40 10" />
                        </svg>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 relative inline-block uppercase tracking-tight">
                        Contact Us
                        <div className="absolute -bottom-2 left-0 w-24 h-2 bg-gradient-to-r from-[#05A4A7] to-transparent opacity-50"></div>
                    </h1>
                    <p className="text-slate-500 dark:text-gray-400 max-w-lg text-sm md:text-base leading-relaxed mt-4 font-medium italic">
                        Have questions or want to start a project? We'd love to hear from you. Reach out to us today.
                    </p>
                </motion.div>

                {/* Content Container */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-2 space-y-5"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full bg-white dark:bg-[#023638] text-slate-900 dark:text-white px-6 py-4 rounded-2xl border border-slate-200 dark:border-white/5 outline-none focus:ring-2 focus:ring-[#05A4A7] transition-all placeholder-slate-400 text-sm font-medium shadow-sm"
                            />
                            <input
                                type="tel"
                                placeholder="Phone"
                                className="w-full bg-white dark:bg-[#023638] text-slate-900 dark:text-white px-6 py-4 rounded-2xl border border-slate-200 dark:border-white/5 outline-none focus:ring-2 focus:ring-[#05A4A7] transition-all placeholder-slate-400 text-sm font-medium shadow-sm"
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full bg-white dark:bg-[#023638] text-slate-900 dark:text-white px-6 py-4 rounded-2xl border border-slate-200 dark:border-white/5 outline-none focus:ring-2 focus:ring-[#05A4A7] transition-all placeholder-slate-400 text-sm font-medium shadow-sm"
                        />
                        <textarea
                            placeholder="Message"
                            rows="4"
                            className="w-full bg-white dark:bg-[#023638] text-slate-900 dark:text-white px-6 py-4 rounded-3xl border border-slate-200 dark:border-white/5 outline-none focus:ring-2 focus:ring-[#05A4A7] transition-all placeholder-slate-400 text-sm font-medium resize-none shadow-sm"
                        ></textarea>

                        <div>
                            <button className="px-10 py-4 bg-[#05A4A7] text-white font-black rounded-2xl shadow-xl shadow-[#05A4A7]/20 hover:shadow-2xl hover:bg-[#049497] transition-all transform hover:-translate-y-1 uppercase tracking-widest text-xs">
                                Submit Message
                            </button>
                        </div>
                    </motion.div>

                    {/* Contact Info Column */}
                    <div className="lg:col-span-1 flex flex-col gap-6">
                        {/* Phone Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="bg-[#05A4A7] px-8 py-4 rounded-[1.5rem] flex flex-col items-center justify-center text-center shadow-xl shadow-[#05A4A7]/20"
                        >
                            <div className="size-10 bg-white/10 rounded-xl flex items-center justify-center mb-3 text-white backdrop-blur-sm border border-white/20">
                                <span className="material-symbols-outlined text-lg">call</span>
                            </div>
                            <h4 className="text-lg font-black text-white mb-0.5 tracking-tight">(+876) 765 665</h4>
                            <p className="text-white/70 text-[9px] font-bold uppercase tracking-widest">
                                24/7 Support Line
                            </p>
                        </motion.div>

                        {/* Email Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="bg-white dark:bg-[#023638] px-8 py-4 rounded-[1.5rem] flex flex-col items-center justify-center text-center shadow-xl border border-slate-200 dark:border-white/5"
                        >
                            <div className="size-10 bg-[#05A4A7]/10 rounded-xl flex items-center justify-center mb-3 text-[#05A4A7]">
                                <span className="material-symbols-outlined text-lg">mail</span>
                            </div>
                            <h4 className="text-lg font-black text-slate-900 dark:text-white mb-0.5 tracking-tight">mail@appzeto.id</h4>
                            <p className="text-slate-400 dark:text-gray-500 text-[9px] font-bold uppercase tracking-widest">
                                Official Email
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Copyright Footer */}
            <div className="absolute bottom-0 left-0 w-full py-8 text-center text-[10px] text-gray-400 uppercase font-black tracking-[0.2em] pointer-events-none">
                <p>© 2024 Appzeto Infrastructure Solutions • Innovation in Motion</p>
            </div>
        </div>
    );
};

export default ContactUs;
