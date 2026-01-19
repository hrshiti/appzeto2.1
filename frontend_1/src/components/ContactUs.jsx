import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { dataService } from '../admin/services/dataService';

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
                className="w-full text-left py-2 md:py-4 transition-all duration-300 flex justify-between items-center group"
            >
                <span className="text-sm md:text-base font-bold text-slate-800 leading-tight group-hover:text-primary transition-colors uppercase tracking-tighter">{question}</span>
                <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-primary rotate-45' : 'bg-slate-100'}`}>
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
                        <div className="px-4 md:px-6 py-2 md:py-3 text-[10px] md:text-xs text-slate-500 leading-relaxed border-l-2 border-primary/20 ml-3 md:ml-4 mt-1">
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
    const [status, setStatus] = useState('idle');
    const [isSalesOpen, setIsSalesOpen] = useState(false);

    // Dynamic Settings
    const [settings, setSettings] = useState({
        contactPhone: '+917691810506',
        contactEmail: 'appzeto@gmail.com',
        contactAddress: 'Office No 501, Princess center, 5th Floor, New Palasia, Indore, Madhya Pradesh 452001',
        social: {
            linkedin: 'https://linkedin.com/company/appzeto',
            instagram: 'https://instagram.com/appzeto',
            twitter: 'https://twitter.com/appzeto',
            github: 'https://github.com/appzeto'
        },
        offices: []
    });

    const [faqData] = useState([
        {
            question: "What services do you offer?",
            answer: "We offer a comprehensive range of software solutions including Web Development (MERN/Next.js), Mobile Apps (React Native/Flutter), AI & Machine Learning Integration, and Enterprise Software Consulting."
        },
        {
            question: "How do you handle project communication?",
            answer: "We maintain transparent communication through dedicated Slack/Teams channels, weekly sprint meetings, and Jira/Trello boards. You'll have direct access to the Project Manager and Lead Developer."
        },
        {
            question: "What is your pricing model?",
            answer: "We offer flexible engagement models: Fixed Price for well-defined scopes, Time & Material for evolving projects, and Dedicated Team augmentation for long-term collaboration."
        }
    ]);

    // Load Settings & Dynamic Form
    useEffect(() => {
        const load = async () => {
            try {
                // Load General Settings
                const loadedSettings = await dataService.getSettings();
                console.log("Loaded Settings in ContactUs:", loadedSettings); // DEBUG

                if (loadedSettings) {
                    setSettings(prev => ({
                        ...prev,
                        ...loadedSettings,
                        contactAddress: 'Office No 501, Princess center, 5th Floor, New Palasia, Indore, Madhya Pradesh 452001',
                        // Ensure social is merged correctly if partial, prioritizing defaults if API returns empty
                        social: {
                            linkedin: loadedSettings.social?.linkedin || prev.social.linkedin,
                            instagram: loadedSettings.social?.instagram || prev.social.instagram,
                            twitter: loadedSettings.social?.twitter || prev.social.twitter,
                            github: loadedSettings.social?.github || prev.social.github
                        },
                        // Ensure offices map correctly if structure differs, but generally it's same
                        offices: loadedSettings.offices && loadedSettings.offices.length > 0 ? loadedSettings.offices : prev.offices
                    }));
                }

                // Load Dynamic Form Config
                const config = await dataService.getFormConfig('contact');
                if (config && config.fields) {
                    setSettings(prev => ({ ...prev, formFields: config.fields }));
                }

            } catch (e) {
                console.error("Failed to load settings", e);
            }
        };
        load();
    }, []);

    // Lock body scroll when modal is open
    React.useEffect(() => {
        if (isSalesOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isSalesOpen]);

    const handleSend = async (e) => {
        e.preventDefault();
        setStatus('sending');

        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData.entries());

        try {
            await dataService.submitMessage(payload);
            setStatus('sent');
            setTimeout(() => setStatus('idle'), 3000);
            e.target.reset();
        } catch (err) {
            console.error(err);
            setStatus('idle');
            alert('Failed to send message. Please try again.');
        }
    };

    const handleLeadSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const rawData = Object.fromEntries(formData.entries());

        const payload = {
            ...rawData,
            leadType: 'Sales'
        };

        try {
            await dataService.submitLead(payload);
            alert('Lead Submitted Successfully! We will contact you shortly.');
            setIsSalesOpen(false);
        } catch (err) {
            console.error(err);
            alert('Failed to submit lead. Please try again.');
        }
    };

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
                    <div className="relative min-h-[450px] md:min-h-0 h-auto md:h-[85vh] flex items-center justify-center overflow-hidden pt-24 md:pt-0">
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
                            className="relative text-center z-10 px-4 mt-4 md:-mt-32 lg:-mt-40"
                        >
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-2xl">
                                Contact Appzeto for <br />
                                <span className="text-primary">Software Development Consultation</span>
                            </h1>
                            <p className="text-white/70 text-[8px] md:text-[10px] font-bold mt-3 max-w-2xl mx-auto uppercase tracking-[0.3em] md:tracking-[0.4em]">
                                Let's build something legendary together.
                            </p>
                        </motion.div>
                    </div>

                    <div className="max-w-7xl mx-auto px-6 md:px-12 relative -mt-16 md:-mt-48 lg:-mt-56 z-20">
                        {/* --- TOP INQUIRY CARDS (Scroll Animation) --- */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "-50px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 mb-8 md:mb-20 bg-white md:bg-transparent rounded-2xl md:rounded-none shadow-xl md:shadow-none p-3 md:p-0"
                        >
                            {[
                                { id: "sales", icon: "payments", title: "Sales Inquiry", desc: "Enterprise solutions & tailored pricing.", action: () => setIsSalesOpen(true) },
                                { id: "support", icon: "support_agent", title: "Tech Support", desc: "24/7 technical help & maintenance.", action: () => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' }) }
                            ].map((card, i) => (
                                <div
                                    key={card.id}
                                    id={card.id}
                                    onClick={card.action}
                                    className="p-3 md:p-6 border-b md:border-b-0 md:border-l border-slate-100 transition-all group last:border-0 md:last:border-l cursor-pointer bg-white/50 backdrop-blur-sm hover:bg-white md:hover:bg-primary/5 rounded-2xl md:rounded-none"
                                >
                                    <div className="w-8 h-8 md:w-14 md:h-14 bg-slate-50 rounded-lg md:rounded-2xl flex items-center justify-center mb-3 md:mb-6 group-hover:bg-primary transition-all duration-500 shadow-sm">
                                        <span className="material-icons text-slate-400 group-hover:text-white text-base md:text-2xl">{card.icon}</span>
                                    </div>
                                    <h3 className="text-base md:text-2xl font-black text-slate-900 mb-1 md:mb-3 uppercase tracking-tighter group-hover:text-primary transition-colors">{card.title}</h3>
                                    <p className="text-slate-500 text-[10px] md:text-sm leading-relaxed mb-3 md:mb-8 font-medium">{card.desc}</p>
                                    <div className="flex items-center gap-2 text-primary group-hover:gap-5 transition-all text-xs font-black uppercase tracking-widest">
                                        <span>Discuss Project</span>
                                        <span className="material-icons text-sm">east</span>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </>
            )}

            {/* --- THREE COLUMN INTERACTION (Scroll Animation) --- */}
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`bg-white w-full ${isHomePage ? 'min-h-[30vh] md:min-h-[60vh]' : 'min-h-[25vh] md:min-h-[50vh]'} flex items-center relative overflow-hidden`}
            >
                <div className="w-full h-full">
                    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr_1.2fr] items-stretch h-full">
                        {/* Left: Map - HIDDEN ON MOBILE */}
                        <div className="hidden lg:block h-full overflow-hidden relative bg-white">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.0810793132646!2d75.8950663750438!3d22.753556779363577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396302a6d7a22409%3A0x8e0404a0889c250!2sVijay%20Nagar%2C%20Indore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1703951567403!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>

                        {/* Middle: Meet Us */}
                        <div className="flex flex-col justify-center py-8 px-6 md:px-12 lg:px-16">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-900 mb-6 md:mb-12 tracking-tighter uppercase">Meet Us</h2>
                            <div className="space-y-6 md:space-y-12">
                                {[
                                    {
                                        icon: "call",
                                        label: "Phone",
                                        info: (
                                            <div className="flex flex-col">
                                                <span>+91 7691810506</span>
                                                <span className="mt-1">+91 6375095971</span>
                                            </div>
                                        ),
                                        className: "text-blue-600 bg-blue-50 border-blue-100 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white"
                                    },
                                    {
                                        icon: "alternate_email",
                                        label: "Email",
                                        info: (
                                            <div className="flex flex-col">
                                                <span>{settings.contactEmail}</span>
                                                <span className="mt-1">support@appzeto.com</span>
                                            </div>
                                        ),
                                        className: "text-orange-600 bg-orange-50 border-orange-100 group-hover:bg-orange-600 group-hover:border-orange-600 group-hover:text-white"
                                    },
                                    {
                                        icon: "location_on",
                                        label: "Address",
                                        info: settings.contactAddress,
                                        className: "text-rose-600 bg-rose-50 border-rose-100 group-hover:bg-rose-600 group-hover:border-rose-600 group-hover:text-white"
                                    }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 md:gap-8 group">
                                        <div className={`w-10 h-10 md:w-14 md:h-14 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-500 shadow-sm ${item.className}`}>
                                            <span className="material-icons text-lg md:text-2xl transition-colors">{item.icon}</span>
                                        </div>
                                        <div className="flex flex-col gap-0.5 md:gap-1">
                                            <span className="text-[8px] md:text-[10px] uppercase font-bold tracking-[0.25em] text-slate-400">{item.label}</span>
                                            <span className="text-sm md:text-lg font-medium text-slate-700 group-hover:text-slate-900 transition-colors">{item.info}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Social Media Links */}
                            {settings.social && (
                                <div className="mt-8 md:mt-12">
                                    <p className="text-[8px] md:text-[10px] uppercase font-bold tracking-[0.25em] text-slate-400 mb-4">Follow Us</p>
                                    <div className="flex items-center gap-4">
                                        {settings.social.linkedin && (
                                            <a href={settings.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#0077B5]/20 bg-[#0077B5]/5 flex items-center justify-center text-[#0077B5] hover:bg-[#0077B5] hover:text-white transition-all duration-300 shadow-sm hover:shadow-[#0077B5]/30 hover:scale-110">
                                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg>
                                            </a>
                                        )}
                                        {settings.social.instagram && (
                                            <a href={settings.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#E1306C]/20 bg-[#E1306C]/5 flex items-center justify-center text-[#E1306C] hover:bg-[#E1306C] hover:text-white transition-all duration-300 shadow-sm hover:shadow-[#E1306C]/30 hover:scale-110">
                                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                            </a>
                                        )}
                                        {settings.social.twitter && (
                                            <a href={settings.social.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-slate-900/10 bg-slate-900/5 flex items-center justify-center text-slate-900 hover:bg-black hover:text-white transition-all duration-300 shadow-sm hover:shadow-black/30 hover:scale-110">
                                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                            </a>
                                        )}
                                        {settings.social.github && (
                                            <a href={settings.social.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-slate-800/20 bg-slate-800/5 flex items-center justify-center text-slate-800 hover:bg-[#333] hover:text-white transition-all duration-300 shadow-sm hover:shadow-[#333]/30 hover:scale-110">
                                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right: Contact Form */}
                        <div id="contact-form" className="flex flex-col justify-center bg-primary/[0.03] p-8 md:p-12 lg:p-16 border-l border-primary/5 scroll-mt-48">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-900 mb-6 md:mb-10 tracking-tighter uppercase">Message</h2>
                            <form onSubmit={handleSend} className="space-y-4 md:space-y-6 lg:space-y-10">
                                {settings.formFields ? (
                                    <>
                                        {/* Dynamic Form Rendering */}
                                        <div className="space-y-4 md:space-y-6">
                                            {settings.formFields.map((field) => (
                                                <div key={field.id} className="space-y-1.5 md:space-y-4">
                                                    <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 lg:ml-0">
                                                        {field.label} {field.required && <span className="text-red-500">*</span>}
                                                    </label>
                                                    {field.type === 'textarea' ? (
                                                        <textarea
                                                            name={field.label.toLowerCase().replace(/\s/g, '_')}
                                                            required={field.required}
                                                            placeholder={field.placeholder}
                                                            rows="3"
                                                            className="w-full p-3 md:p-6 rounded-lg md:rounded-2xl bg-white border border-slate-100 text-slate-900 outline-none focus:border-primary/50 focus:bg-white transition-all text-xs md:text-sm font-medium placeholder:text-slate-300 resize-none shadow-sm"
                                                        ></textarea>
                                                    ) : field.type === 'select' ? (
                                                        <div className="relative">
                                                            <select
                                                                name={field.label.toLowerCase().replace(/\s/g, '_')}
                                                                required={field.required}
                                                                defaultValue=""
                                                                className="w-full p-3 md:p-6 rounded-lg md:rounded-2xl bg-white border border-slate-100 text-slate-900 outline-none focus:border-primary/50 focus:bg-white transition-all text-xs md:text-sm font-medium appearance-none cursor-pointer shadow-sm"
                                                            >
                                                                <option value="" disabled className="bg-white">Select...</option>
                                                                <option value="General" className="bg-white">General</option>
                                                                <option value="Project" className="bg-white">Project</option>
                                                                <option value="Support" className="bg-white">Support</option>
                                                            </select>
                                                            <span className="material-icons absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                                                        </div>
                                                    ) : (
                                                        <input
                                                            type={field.type}
                                                            name={field.label.toLowerCase().replace(/\s/g, '_')}
                                                            required={field.required}
                                                            placeholder={field.placeholder}
                                                            className="w-full p-3 md:p-6 rounded-lg md:rounded-2xl bg-white border border-slate-100 text-slate-900 outline-none focus:border-primary/50 focus:bg-white transition-all text-xs md:text-sm font-medium placeholder:text-slate-300 shadow-sm"
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:gap-10">
                                            <div className="space-y-1.5 md:space-y-4">
                                                <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Full Name</label>
                                                <input
                                                    required
                                                    name="name"
                                                    type="text"
                                                    placeholder="Your Name"
                                                    className="w-full p-3 md:p-6 rounded-lg md:rounded-2xl bg-white border border-slate-100 text-slate-900 outline-none focus:border-primary/50 focus:bg-white transition-all text-xs md:text-sm font-medium placeholder:text-slate-300 shadow-sm"
                                                />
                                            </div>
                                            <div className="space-y-1.5 md:space-y-4">
                                                <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Phone</label>
                                                <input
                                                    required
                                                    name="phone"
                                                    type="tel"
                                                    placeholder="+91 0000..."
                                                    className="w-full p-3 md:p-6 rounded-lg md:rounded-2xl bg-white border border-slate-100 text-slate-900 outline-none focus:border-primary/50 focus:bg-white transition-all text-xs md:text-sm font-medium placeholder:text-slate-300 shadow-sm"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:gap-10">
                                            <div className="space-y-1.5 md:space-y-4">
                                                <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Email Address</label>
                                                <input
                                                    required
                                                    name="email"
                                                    type="email"
                                                    placeholder="you@email.com"
                                                    className="w-full p-3 md:p-6 rounded-lg md:rounded-2xl bg-white border border-slate-100 text-slate-900 outline-none focus:border-primary/50 focus:bg-white transition-all text-xs md:text-sm font-medium placeholder:text-slate-300 shadow-sm"
                                                />
                                            </div>
                                            <div className="space-y-1.5 md:space-y-4">
                                                <label className="text-[10px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Reason</label>
                                                <div className="relative">
                                                    <select
                                                        required
                                                        name="reason"
                                                        defaultValue=""
                                                        className="w-full p-3 md:p-6 rounded-lg md:rounded-2xl bg-white border border-slate-100 text-slate-900 outline-none focus:border-primary/50 focus:bg-white transition-all text-xs md:text-sm font-medium appearance-none cursor-pointer shadow-sm"
                                                    >
                                                        <option value="" disabled className="bg-white">Select reason</option>
                                                        <option value="project" className="bg-white">New Project</option>
                                                        <option value="partnership" className="bg-white">Partnership</option>
                                                        <option value="career" className="bg-white">Careers</option>
                                                        <option value="other" className="bg-white">General</option>
                                                    </select>
                                                    <span className="material-icons absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-1.5 md:space-y-4">
                                            <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Message</label>
                                            <textarea
                                                required
                                                name="message"
                                                placeholder="How can we help?"
                                                rows="2"
                                                className="w-full p-3 md:p-6 rounded-lg md:rounded-2xl bg-white border border-slate-100 text-slate-900 outline-none focus:border-primary/50 focus:bg-white transition-all text-xs md:text-sm font-medium placeholder:text-slate-300 resize-none shadow-sm"
                                            ></textarea>
                                        </div>
                                    </>
                                )}
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={status !== 'idle'}
                                    type="submit"
                                    className={`w-full py-3 md:py-5 rounded-lg md:rounded-2xl font-bold uppercase tracking-[0.2em] md:tracking-[0.25em] text-[10px] md:text-xs flex items-center justify-center gap-3 md:gap-5 mt-2 md:mt-4 border border-slate-100 shadow-xl transition-all duration-500 ${status === 'idle' ? 'bg-slate-900 text-white hover:bg-primary' :
                                        status === 'sending' ? 'bg-slate-700 text-slate-400 cursor-not-allowed animate-pulse' : 'bg-green-500 text-white'
                                        }`}
                                >
                                    {status === 'idle' && <>SEND INQUIRY <span className="material-icons text-sm md:text-xl">near_me</span></>}
                                    {status === 'sending' && <>SENDING... <span className="material-icons text-sm md:text-xl animate-spin">sync</span></>}
                                    {status === 'sent' && <>SUCCESS! <span className="material-icons text-sm md:text-xl text-white">check_circle</span></>}
                                </motion.button>
                            </form>
                        </div>
                    </div>
                </div>
            </motion.div>

            {
                !isHomePage && (
                    <div className={`max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-20`}>
                        {/* --- VISIT OFFICES (Scroll Animation) --- */}
                        <motion.div
                            id="locations"
                            initial={{ opacity: 0, y: 80 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="pt-8 md:pt-20 pb-0 mb-8"
                        >
                            <div className="flex flex-col lg:flex-row gap-10 md:gap-20 items-start">
                                <div className="lg:w-1/3">
                                    <p className="text-primary font-black tracking-[0.3em] uppercase text-[10px] mb-2 md:mb-4">Our Presence</p>
                                    <h2 className="text-3xl md:text-5xl font-semibold text-slate-900 uppercase tracking-tighter leading-tight">
                                        Visit Our <br /> <span className="text-primary">Offices</span>
                                    </h2>
                                    <p className="text-slate-400 text-xs md:text-sm mt-4 md:mt-8 leading-relaxed max-w-xs">
                                        Stop by our innovation hubs to meet the team and discuss your next big idea.
                                    </p>
                                </div>

                                <div className="lg:w-2/3 w-full">
                                    {settings.offices.map((office, i) => (
                                        <motion.div
                                            key={office.id || i}
                                            className="py-6 md:py-12 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 group"
                                        >
                                            <div className="flex items-center gap-4 md:gap-8">
                                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-slate-50 flex items-center justify-center flex-shrink-0 border border-slate-100 transition-all duration-500 group-hover:bg-primary">
                                                    <span className="material-icons text-slate-400 group-hover:text-white text-xl md:text-2xl transition-all">{office.icon || 'apartment'}</span>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg md:text-2xl font-bold text-slate-900 tracking-tighter uppercase group-hover:text-primary transition-colors">{office.title}</h3>
                                                    <p className="text-slate-500 text-xs md:text-sm mt-1 md:mt-2 max-w-md font-medium">{office.address}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 md:gap-4 px-4 md:px-6 py-2 md:py-2.5 rounded-full border border-slate-100 bg-white flex-shrink-0 self-start md:self-center group-hover:border-primary/30 transition-all">
                                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse"></div>
                                                <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{office.time}</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* --- FAQ SECTION (Scroll Animation) --- */}
                        <motion.div
                            initial={{ opacity: 0, y: 80 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center pt-6 md:pt-10`}
                        >
                            <div className={`w-full`}>
                                <div className="mb-6">
                                    <p className="text-primary font-black tracking-[0.3em] uppercase text-[9px] mb-2">Support & Help</p>
                                    <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 leading-[1.1] uppercase tracking-tighter">
                                        Frequently <br /> <span className="text-primary">Asked</span>
                                    </h2>
                                </div>
                                <div className="space-y-2 md:space-y-4">
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
                                    <h3 className="text-3xl font-semibold text-slate-900 uppercase tracking-tighter">Still Stuck?</h3>
                                    <p className="text-slate-500 text-sm mt-6 leading-relaxed mb-10">Our global success managers are available around the clock to guide you.</p>
                                    <button
                                        onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                                        className="text-primary font-black uppercase text-[11px] tracking-[0.3em] flex items-center gap-4 group"
                                    >
                                        HELP CENTER <span className="material-icons group-hover:translate-x-3 transition-transform text-lg">east</span>
                                    </button>
                                </motion.div>
                                <div className="absolute -top-10 -right-10 w-80 h-80 bg-primary/10 rounded-full blur-[120px] -z-10" />
                            </div>
                        </motion.div>
                    </div>
                )
            }

            {/* --- SALES INQUIRY MODAL --- */}
            <AnimatePresence>
                {isSalesOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex justify-center items-start md:items-center p-4 bg-slate-950/90 backdrop-blur-xl overflow-y-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            className="bg-white w-full max-w-xl rounded-[1.2rem] md:rounded-[2rem] p-4 md:p-8 relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-slate-100 overflow-hidden my-4 md:my-0"
                        >
                            {/* Decorative Background for Modal */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                            <div className="flex justify-between items-start mb-4 md:mb-6">
                                <div>
                                    <p className="text-primary font-black tracking-[0.4em] uppercase text-[8px] md:text-[9px] mb-0.5 md:mb-1">Lead Genesis</p>
                                    <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Sales Inquiry</h2>
                                </div>
                                <button
                                    onClick={() => setIsSalesOpen(false)}
                                    className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                                >
                                    <span className="material-icons text-xs md:text-lg">close</span>
                                </button>
                            </div>

                            <form className="space-y-2 md:space-y-4" onSubmit={handleLeadSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                                    <div className="space-y-0.5 md:space-y-1">
                                        <label className="text-[7px] md:text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1 md:ml-2">Full Name</label>
                                        <input required name="name" type="text" placeholder="John Doe" className="w-full px-3 py-2 md:py-3.5 bg-slate-50 border-2 border-slate-100 rounded-lg md:rounded-xl focus:border-primary focus:bg-white outline-none transition-all text-[10px] md:text-sm font-bold placeholder:text-slate-300" />
                                    </div>
                                    <div className="space-y-0.5 md:space-y-1">
                                        <label className="text-[7px] md:text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1 md:ml-2">Company Name</label>
                                        <input required name="company" type="text" placeholder="Appzeto Inc." className="w-full px-3 py-2 md:py-3.5 bg-slate-50 border-2 border-slate-100 rounded-lg md:rounded-xl focus:border-primary focus:bg-white outline-none transition-all text-[10px] md:text-sm font-bold placeholder:text-slate-300" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                                    <div className="space-y-0.5 md:space-y-1">
                                        <label className="text-[7px] md:text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1 md:ml-2">Work Email</label>
                                        <input required name="email" type="email" placeholder="john@company.com" className="w-full px-3 py-2 md:py-3.5 bg-slate-50 border-2 border-slate-100 rounded-lg md:rounded-xl focus:border-primary focus:bg-white outline-none transition-all text-[10px] md:text-sm font-bold placeholder:text-slate-300" />
                                    </div>
                                    <div className="space-y-0.5 md:space-y-1">
                                        <label className="text-[7px] md:text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1 md:ml-2">Phone Number</label>
                                        <input required name="phone" type="tel" placeholder="+91 ..." className="w-full px-3 py-2 md:py-3.5 bg-slate-50 border-2 border-slate-100 rounded-lg md:rounded-xl focus:border-primary focus:bg-white outline-none transition-all text-[10px] md:text-sm font-bold placeholder:text-slate-300" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                                    <div className="space-y-0.5 md:space-y-1">
                                        <label className="text-[7px] md:text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1 md:ml-2">Project Type</label>
                                        <select required name="service" defaultValue="" className="w-full px-3 py-2 md:py-3.5 bg-slate-50 border-2 border-slate-100 rounded-lg md:rounded-xl focus:border-primary focus:bg-white outline-none transition-all text-[10px] md:text-sm font-bold appearance-none cursor-pointer">
                                            <option value="" disabled>Select service</option>
                                            <option value="web">Web Ecosystem</option>
                                            <option value="mobile">Mobile App</option>
                                            <option value="ai">AI Integration</option>
                                            <option value="enterprise">Enterprise Infra</option>
                                        </select>
                                    </div>
                                    <div className="space-y-0.5 md:space-y-1">
                                        <label className="text-[7px] md:text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1 md:ml-2">Estimated Budget</label>
                                        <select required name="budget" defaultValue="" className="w-full px-3 py-2 md:py-3.5 bg-slate-50 border-2 border-slate-100 rounded-lg md:rounded-xl focus:border-primary focus:bg-white outline-none transition-all text-[10px] md:text-sm font-bold appearance-none cursor-pointer">
                                            <option value="" disabled>Select budget range</option>
                                            <option value="5-10k">$5k - $10k</option>
                                            <option value="10-25k">$10k - $25k</option>
                                            <option value="25-50k">$25k - $50k</option>
                                            <option value="50k+">$50k+</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-0.5 md:space-y-1">
                                    <label className="text-[7px] md:text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1 md:ml-2">Message / Requirement</label>
                                    <textarea name="message" rows="2" placeholder="Tell us about your project..." className="w-full px-3 py-2 md:py-3 bg-slate-50 border-2 border-slate-100 rounded-lg md:rounded-xl focus:border-primary focus:bg-white outline-none transition-all text-[10px] md:text-sm font-bold placeholder:text-slate-300 resize-none"></textarea>
                                </div>

                                <button type="submit" className="w-full py-3 md:py-4 bg-slate-950 text-white rounded-lg md:rounded-2xl font-black uppercase tracking-[0.3em] text-[9px] md:text-[11px] hover:bg-primary transition-all shadow-xl shadow-slate-200 mt-1">
                                    Initiate Discussion
                                </button>
                                <p className="text-center text-[7px] md:text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-2 md:mt-3">Average response time: &lt; 24 Hours</p>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section >
    );
};

export default ContactUs;
