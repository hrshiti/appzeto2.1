import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
    {
        question: "How much time does it take for a project?",
        answer: "Project timelines vary based on complexity. A typical web application takes 6-12 weeks, while a simpler website might take 3-4 weeks."
    },
    {
        question: "Why should your organization use Appzeto?",
        answer: "Appzeto provides Enterprise-grade engineering with Next-Gen AI capabilities, ensuring your business stays ahead of the competition."
    },
    {
        question: "How to Contact Us?",
        answer: "You can reach us through our contact form, email, or schedule a direct consultation call with our experts."
    },
    {
        question: "Trust Level of Appzeto Engineering?",
        answer: "We follow industry-standard security protocols and military-grade encryption to ensure your data and intellectual property are always protected."
    },
    {
        question: "What technologies do you use?",
        answer: "We specialize in React, Next.js, Node.js, and advanced AI frameworks to build scalable, future-proof solutions."
    },
    {
        question: "How do you handle post-launch support?",
        answer: "Transparency is key. We offer 24/7 priority support and dedicated success managers for all our enterprise clients."
    }
];

const FAQItem = ({ question, answer, isOpen, toggle }) => {
    return (
        <div className="border-b border-slate-100 group">
            <button
                onClick={toggle}
                className="w-full text-left py-3 md:py-4 transition-all duration-300 flex justify-between items-center group"
            >
                <span className="text-sm md:text-base font-bold text-slate-800 leading-tight group-hover:text-primary transition-colors uppercase tracking-tighter">{question}</span>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-primary rotate-45' : 'bg-slate-100'}`}>
                    <span className={`material-icons text-[10px] ${isOpen ? 'text-white' : 'text-slate-400'}`}>add</span>
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 py-3 text-[10px] md:text-xs text-slate-500 leading-relaxed italic border-l-2 border-primary/20 ml-4 mt-1">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ContactUs = ({ isHomePage = false }) => {
    const [openIndex, setOpenIndex] = useState(0);

    React.useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, []);

    return (
        <section className={`bg-white font-sans overflow-x-hidden pt-0`}>
            {!isHomePage && (
                <>
                    <div className="relative h-[85vh] flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0">
                            <img
                                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2340&auto=format&fit=crop"
                                className="w-full h-full object-cover grayscale-[0.3] brightness-[0.4]"
                                alt="Workspace"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/10" />
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 1 }}
                            className="relative text-center z-10 px-4 -mt-32 lg:-mt-40"
                        >
                            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic drop-shadow-2xl">
                                Contact <span className="text-primary italic">Us</span>
                            </h1>
                            <p className="text-white/70 text-[9px] md:text-[10px] font-bold mt-4 max-w-2xl mx-auto uppercase tracking-[0.4em]">
                                Let's build something legendary together.
                            </p>
                        </motion.div>
                    </div>

                    <div className="max-w-[1300px] mx-auto px-10 lg:px-24 relative -mt-48 md:-mt-56 z-20">
                        {/* --- TOP INQUIRY CARDS (Scroll Animation) --- */}
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
                        >
                            {[
                                { id: "sales", icon: "payments", title: "Sales Inquiry", desc: "Enterprise solutions & tailored pricing." },
                                { id: "support", icon: "support_agent", title: "Tech Support", desc: "24/7 technical help & maintenance." },
                                { id: "general", icon: "location_on", title: "World Wide", desc: "Find a local office near you." }
                            ].map((card, i) => (
                                <div
                                    key={card.id}
                                    id={card.id}
                                    className="p-4 border-l border-slate-100 transition-all group"
                                >
                                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-all duration-500">
                                        <span className="material-icons text-slate-400 group-hover:text-white text-xl">{card.icon}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2 uppercase tracking-tighter group-hover:text-primary transition-colors">{card.title}</h3>
                                    <p className="text-slate-500 text-xs leading-relaxed mb-6 font-medium italic">{card.desc}</p>
                                    <div className="flex items-center gap-3 text-primary group-hover:gap-5 transition-all cursor-pointer">
                                        <span className="text-[9px] font-black uppercase tracking-[0.3em]">Discuss Project</span>
                                        <span className="material-icons text-[12px]">east</span>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </>
            )}

            {/* --- THREE COLUMN INTERACTION (Scroll Animation) --- */}
            <motion.div
                initial={{ opacity: 0, y: 120 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`bg-[#062929] w-full ${isHomePage ? 'h-screen min-h-[700px]' : 'min-h-[70vh]'} flex items-center relative py-12 lg:py-16`}
            >
                <div className="max-w-[1700px] mx-auto px-10 lg:px-24 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr_1.2fr] gap-12 lg:gap-20 items-center">
                        {/* Left: Map */}
                        <div className="h-[400px] lg:h-[500px] overflow-hidden relative grayscale invert brightness-[0.4] opacity-30 rounded-[2rem]">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.25280821814!2d-74.119763973046!3d40.69740344223377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1703951567403!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>

                        {/* Middle: Meet Us */}
                        <div className="flex flex-col justify-center py-8">
                            <h2 className="text-4xl font-semibold text-white mb-12 tracking-tighter uppercase">Meet Us</h2>
                            <div className="space-y-12">
                                {[
                                    { icon: "call", label: "Phone", info: "+465 723 723 566" },
                                    { icon: "alternate_email", label: "Email", info: "contact@appzeto.com" },
                                    { icon: "location_on", label: "Address", info: "1784 Griffin Street, Alabama, USA" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-8 group">
                                        <div className="w-14 h-14 rounded-full border border-white/5 flex items-center justify-center flex-shrink-0 group-hover:border-primary/40 transition-all duration-500">
                                            <span className="material-icons text-slate-500 text-2xl group-hover:text-primary transition-all">{item.icon}</span>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-slate-500">{item.label}</span>
                                            <span className="text-lg font-medium text-slate-200 group-hover:text-white transition-colors">{item.info}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Contact Form */}
                        <div className="flex flex-col justify-center">
                            <h2 className="text-4xl font-semibold text-white mb-10 tracking-tighter uppercase">Message</h2>
                            <form className="space-y-10">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        className="w-full p-6 rounded-2xl bg-white/5 border border-white/5 text-white outline-none focus:border-primary/50 transition-all text-sm font-medium placeholder:text-slate-600 shadow-inner"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Message</label>
                                    <textarea
                                        placeholder="How can we help?"
                                        rows="4"
                                        className="w-full p-6 rounded-2xl bg-white/5 border border-white/5 text-white outline-none focus:border-primary/50 transition-all text-sm font-medium placeholder:text-slate-600 resize-none shadow-inner"
                                    ></textarea>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-5 bg-white text-[#062929] rounded-[1.5rem] font-bold uppercase tracking-[0.25em] text-[10px] flex items-center justify-center gap-5 mt-6 border border-white/5 shadow-2xl hover:bg-primary transition-all duration-500"
                                >
                                    SEND INQUIRY <span className="material-icons text-xl">near_me</span>
                                </motion.button>
                            </form>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className={`max-w-[1700px] mx-auto px-10 lg:px-24 ${isHomePage ? 'h-screen flex flex-col justify-center py-10 overflow-hidden' : 'py-20'}`}>
                {/* --- VISIT OFFICES (Scroll Animation) --- */}
                {!isHomePage && (
                    <motion.div
                        id="locations"
                        initial={{ opacity: 0, y: 80 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="pt-20 pb-0 mb-8"
                    >
                        <div className="flex flex-col lg:flex-row gap-20 items-start">
                            <div className="lg:w-1/3">
                                <p className="text-primary font-black tracking-[0.3em] uppercase text-[10px] mb-4">Our Presence</p>
                                <h2 className="text-5xl font-semibold text-slate-900 uppercase tracking-tighter leading-tight">
                                    Visit Our <br /> <span className="text-primary italic">Offices</span>
                                </h2>
                                <p className="text-slate-400 text-sm mt-8 leading-relaxed italic max-w-xs">
                                    Stop by our innovation hubs to meet the team and discuss your next big idea.
                                </p>
                            </div>

                            <div className="lg:w-2/3 w-full">
                                {[
                                    { title: "Global Headquarters", addr: "1784 Griffin Street, Birmingham, Alabama 35203, USA", icon: "apartment", time: "Mon - Fri" },
                                    { title: "Innovation Tech Hub", addr: "548 Market St, Suite 120, San Francisco, CA 94104, USA", icon: "business_center", time: "Mon - Sat" }
                                ].map((office, i) => (
                                    <motion.div
                                        key={i}
                                        className="py-12 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-8 group"
                                    >
                                        <div className="flex items-center gap-8">
                                            <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center flex-shrink-0 border border-slate-100 transition-all duration-500 group-hover:bg-primary">
                                                <span className="material-icons text-slate-400 group-hover:text-white text-2xl transition-all">{office.icon}</span>
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-slate-900 tracking-tighter uppercase group-hover:text-primary transition-colors">{office.title}</h3>
                                                <p className="text-slate-500 text-sm mt-2 max-w-md font-medium italic">{office.addr}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 px-6 py-2.5 rounded-full border border-slate-100 bg-white flex-shrink-0 self-start md:self-center group-hover:border-primary/30 transition-all">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{office.time}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* --- FAQ SECTION (Scroll Animation) --- */}
                <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`grid grid-cols-1 ${isHomePage ? 'lg:grid-cols-1' : 'lg:grid-cols-2'} gap-12 items-center ${isHomePage ? 'pt-0' : 'pt-10'}`}
                >
                    <div className={`w-full ${isHomePage ? 'max-w-3xl mx-auto text-center' : ''}`}>
                        <div className="mb-6">
                            <p className="text-primary font-black tracking-[0.3em] uppercase text-[9px] mb-2">Support & Help</p>
                            <h2 className="text-3xl font-semibold text-slate-900 leading-[1.1] uppercase tracking-tighter">
                                Frequently <br /> <span className="text-primary italic">Asked</span>
                            </h2>
                        </div>
                        <div className="space-y-4">
                            {faqData.map((faq, index) => (
                                <FAQItem
                                    key={index}
                                    question={faq.question}
                                    answer={faq.answer}
                                    isOpen={openIndex === index}
                                    toggle={() => setOpenIndex(index === openIndex ? -1 : index)}
                                />
                            ))}
                        </div>
                    </div>

                    {!isHomePage && (
                        <div className="relative pt-10 hidden lg:block">
                            <motion.div
                                initial={{ opacity: 0, rotate: 2, scale: 0.9 }}
                                whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
                                viewport={{ once: false }}
                                transition={{ duration: 1 }}
                                className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-2xl relative z-10"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2340&auto=format&fit=crop"
                                    className="w-full h-72 object-cover rounded-3xl mb-10 grayscale-[0.5] hover:grayscale-0 transition-all duration-1000"
                                    alt="Support"
                                />
                                <h3 className="text-3xl font-semibold text-slate-900 uppercase tracking-tighter italic">Still Stuck?</h3>
                                <p className="text-slate-500 text-sm mt-6 leading-relaxed mb-10 italic">Our global success managers are available around the clock to guide you.</p>
                                <button className="text-primary font-black uppercase text-[11px] tracking-[0.3em] flex items-center gap-4 group">
                                    HELP CENTER <span className="material-icons group-hover:translate-x-3 transition-transform text-lg">east</span>
                                </button>
                            </motion.div>
                            <div className="absolute -top-10 -right-10 w-80 h-80 bg-primary/10 rounded-full blur-[120px] -z-10" />
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default ContactUs;
