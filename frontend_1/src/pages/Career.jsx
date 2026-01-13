import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ContactUs from '../components/ContactUs';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';
import ScrollWrapper from '../components/ScrollWrapper';
import { AnimatePresence } from 'framer-motion';
import { dataService } from '../admin/services/dataService';

const Career = () => {
    const [selectedJob, setSelectedJob] = useState(null);
    const [isApplying, setIsApplying] = useState(false);
    const [appStatus, setAppStatus] = useState('idle'); // idle, sending, success, error

    const [jobsList, setJobsList] = useState([]);
    const [formFields, setFormFields] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        // Load Jobs
        const fetchJobs = async () => {
            try {
                const data = await dataService.getJobs();
                if (data) setJobsList(data);
            } catch (e) {
                console.error("Failed to load jobs", e);
            }
        };
        fetchJobs();

        // Load Dynamic Form Config
        const loadConfig = async () => {
            try {
                const config = await dataService.getFormConfig('career');
                if (config && config.fields) {
                    setFormFields(config.fields);
                }
            } catch (e) {
                console.error("Failed to load career form config", e);
            }
        };
        loadConfig();

    }, []);

    const positions = jobsList.filter(j => j.type !== 'Internship' && j.active);
    const internships = jobsList.filter(j => j.type === 'Internship' && j.active);

    useEffect(() => {
        if (isApplying) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isApplying]);

    const cultureItems = [
        {
            id: 1,
            title: "Team Work",
            img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop",
            rotation: -4,
            yOffset: 0,
        },
        {
            id: 2,
            title: "Office Vibe",
            img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop",
            rotation: 3,
            yOffset: 60,
        },
        {
            id: 3,
            title: "Design Fun",
            img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop",
            rotation: -2,
            yOffset: -20,
        },
        {
            id: 4,
            title: "Coffee Break",
            img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop",
            rotation: 5,
            yOffset: 80,
        },
        {
            id: 5,
            title: "Brainstorming",
            img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop",
            rotation: -3,
            yOffset: 30,
        },
        {
            id: 6,
            title: "Happy Minds",
            img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop",
            rotation: 4,
            yOffset: -10,
        },
        {
            id: 7,
            title: "Success",
            img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1000&auto=format&fit=crop",
            rotation: -5,
            yOffset: 70,
        },
        {
            id: 8,
            title: "Modern Tech",
            img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
            rotation: 2,
            yOffset: -30,
        }
    ];

    // Helper to strip HTML tags for preview
    const stripHtml = (html) => {
        if (!html) return '';
        const tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    };

    return (
        <ScrollWrapper>
            <div className="bg-[#f8f9fa] min-h-screen font-sans text-slate-900 overflow-x-hidden selection:bg-primary selection:text-white">
                <Navbar />

                {/* --- HERO SECTION --- */}
                <div className="relative pt-10 md:pt-16 pb-12 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-visible">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
                        <div className="lg:col-span-7 space-y-6 md:space-y-8 z-10">
                            <motion.div
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                className="inline-flex items-center space-x-3 bg-white px-3 md:px-4 py-1.5 md:py-2 rounded-full border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            >
                                <span className="w-2.5 h-2.5 md:w-3 md:h-3 bg-primary rounded-full animate-pulse"></span>
                                <span className="text-[10px] md:text-xs uppercase tracking-widest font-black text-slate-900">WE'RE HIRING!</span>
                            </motion.div>

                            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black leading-[0.9] text-slate-900 tracking-tighter">
                                JOIN THE <br />
                                <span className="text-primary italic outline-text">REVOLUTION.</span>
                            </h1>

                            <div className="flex flex-wrap gap-3 md:gap-4">
                                {["Brilliant Minds", "Fast Paced", "Big Impact"].map((item, idx) => (
                                    <motion.span
                                        key={idx}
                                        whileHover={{ scale: 1.1, rotate: idx % 2 === 0 ? 5 : -5 }}
                                        className="px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl border-2 border-slate-900 bg-white text-xs md:text-sm font-black text-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-primary hover:text-white transition-all cursor-pointer"
                                    >
                                        {item}
                                    </motion.span>
                                ))}
                            </div>

                            <p className="text-slate-600 max-w-lg text-sm md:text-xl font-medium leading-relaxed">
                                Stop working for machines. Start building for humans. Appzeto is looking for the bold, the curious, and the slightly obsessed.
                            </p>
                        </div>

                        <div className="lg:col-span-5 relative">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="relative aspect-square bg-primary rounded-[2rem] md:rounded-[3rem] border-[4px] border-slate-900 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] md:shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] rotate-3 overflow-hidden"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2340&auto=format&fit=crop"
                                    alt="Team"
                                    className="w-full h-full object-cover grayscale mix-blend-overlay hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute inset-0 flex items-center justify-center p-6 md:p-10 text-center">
                                    <h2 className="text-3xl md:text-5xl font-black text-white leading-tight drop-shadow-2xl">
                                        NOT JUST A JOB, <br /> A LEGACY.
                                    </h2>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* --- FUNKY MARQUEE --- */}
                <div className="bg-slate-950 py-1.5 overflow-hidden -rotate-2 transform scale-105 border-y-[3px] border-primary z-10 relative shadow-2xl">
                    <div className="whitespace-nowrap flex animate-[scroll_15s_linear_infinite]">
                        {[1, 2, 3, 4].map((_, i) => (
                            <div key={i} className="flex items-center mx-10 text-white font-bold text-lg md:text-xl uppercase tracking-tighter italic">
                                <span className="text-primary">NO BORING MEETINGS</span>
                                <span className="mx-6 opacity-30 text-sm">✷</span>
                                <span>UNLIMITED COFFEE</span>
                                <span className="mx-6 opacity-30 text-sm">✷</span>
                                <span className="text-primary">BIG DREAMS</span>
                                <span className="mx-6 opacity-30 text-sm">✷</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- OPEN POSITIONS --- */}
                <div id="positions" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 bg-white shadow-sm mt-0 border-b border-slate-100 flex flex-col overflow-hidden">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-6 md:mb-10 px-4">
                        <div className="text-left">
                            <p className="text-primary font-bold uppercase tracking-widest text-[10px] mb-2 text-slate-400">Join the squad</p>
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tighter uppercase">Wanna Join Us?</h2>
                        </div>
                        <p className="text-slate-400 text-xs max-w-xs mt-4 md:mt-0 italic">Always on the lookout for ambitious talent ready to disrupt.</p>
                    </div>

                    <div className="flex flex-col border-t border-slate-100/50">
                        {positions.length === 0 ? (
                            <div className="py-10 text-center text-slate-400 font-bold uppercase tracking-widest">
                                No open positions right now. Check back later!
                            </div>
                        ) : (
                            positions.map((job) => (
                                <motion.div
                                    key={job._id}
                                    whileHover={{ backgroundColor: "rgba(241, 252, 136, 0.2)" }}
                                    onClick={() => { setSelectedJob(job.title); setIsApplying(true); }}
                                    className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 md:py-6 px-4 md:px-6 border-b border-slate-100/50 group transition-all duration-300 cursor-pointer"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-12 flex-1 w-full">
                                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-300 w-24">{job.department || 'General'}</span>
                                        <div className="flex flex-col max-w-2xl">
                                            <h3 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-primary transition-colors uppercase tracking-tight">{job.title}</h3>
                                            <div
                                                className="text-slate-500 text-[10px] md:text-xs mt-1.5 [&>ul]:list-disc [&>ul]:pl-4 [&>ol]:list-decimal [&>ol]:pl-4 [&>p]:mb-1 cursor-text"
                                                onClick={(e) => e.stopPropagation()}
                                                dangerouslySetInnerHTML={{ __html: job.description }}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between w-full md:w-auto gap-8 mt-4 md:mt-0">
                                        <div className="hidden lg:flex items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                            <span className="flex items-center gap-1.5"><span className="material-icons text-sm opacity-50">schedule</span> {job.type}</span>
                                            <span className="flex items-center gap-1.5"><span className="material-icons text-sm opacity-50">location_on</span> {job.location || 'Remote'}</span>
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setSelectedJob(job.title); setIsApplying(true); }}
                                            className="bg-slate-950 text-white px-6 py-2 md:py-2.5 rounded-full font-bold text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-[#F1FC88] hover:text-slate-900 transition-all flex items-center gap-2 ml-auto md:ml-0"
                                        >
                                            Apply <span className="material-icons text-sm">north_east</span>
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>

                {/* --- INTERNSHIP --- */}
                <div id="internship" className="bg-primary py-10 mt-0 border-t-[6px] border-slate-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="absolute top-0 right-10 rotate-12 opacity-10 pointer-events-none text-[#F1FC88]">
                            <span className="material-icons text-[150px] md:text-[250px]">school</span>
                        </div>

                        <div className="relative z-10 flex flex-col gap-8 md:gap-12">
                            <div className="flex flex-col md:flex-row justify-between items-end gap-6 md:gap-8">
                                <div className="text-left">
                                    <h2 className="text-3xl md:text-5xl font-black text-white mb-2 md:mb-4 leading-[0.8] uppercase tracking-tighter">
                                        START AS <br />
                                        <span className="text-slate-900 underline decoration-slate-900 underline-offset-8">A ROOKIE.</span>
                                    </h2>
                                    <p className="text-white font-bold text-sm md:text-lg opacity-90 italic uppercase">
                                        Internships with serious impact and zero coffee runs.
                                    </p>
                                </div>
                                <div
                                    className="px-6 py-2.5 md:px-8 md:py-3 bg-[#F1FC88] text-slate-900 font-bold rounded-xl md:rounded-2xl uppercase tracking-widest text-[10px] md:text-xs border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] cursor-default"
                                >
                                    Grab Your Spot
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                {internships.length === 0 ? (
                                    <div className="col-span-3 text-center text-white font-bold uppercase tracking-widest py-10 opacity-70">
                                        No internship openings at the moment.
                                    </div>
                                ) : (
                                    internships.map((intern) => (
                                        <div key={intern._id} className="bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] md:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-1 transition-transform group flex flex-col justify-between">
                                            <div>
                                                <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-1">{intern.title}</h4>
                                                <div className="text-primary font-black text-[10px] uppercase tracking-widest mb-2 md:mb-4">{intern.duration || 'Flexible'} • {intern.type}</div>
                                                <p className="text-slate-600 font-normal text-xs md:text-sm line-clamp-2 mb-6">{stripHtml(intern.description)}</p>
                                            </div>
                                            <button
                                                onClick={() => { setSelectedJob(intern.title); setIsApplying(true); }}
                                                className="w-full py-2.5 bg-slate-900 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all border-2 border-slate-900"
                                            >
                                                Apply Now
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>


                <div id="culture" className="min-h-screen md:h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-0 flex flex-col justify-center relative overflow-hidden bg-[#f8f9fa]">
                    <div className="flex flex-col items-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 text-center uppercase tracking-tighter">
                            LIFE AT <span className="bg-[#F1FC88] text-slate-900 px-4 py-1 rounded-lg inline-block -rotate-2 scale-90">APPZETO</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-16 gap-x-6 md:gap-x-10 relative px-2">
                        {cultureItems.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1, y: item.yOffset / 2.5 }}
                                viewport={{ once: true }}
                                style={{ rotate: item.rotation }}
                                transition={{ duration: 0.8, ease: "circOut", delay: idx * 0.05 }}
                                whileHover={{ scale: 1.1, rotate: 0, zIndex: 10 }}
                                className="relative group flex justify-center"
                            >
                                <div className="bg-white p-2 md:p-3 pb-5 md:pb-8 shadow-2xl border border-slate-100 w-36 md:w-56 lg:w-64 transition-transform">
                                    <div className="h-28 md:h-40 lg:h-48 w-full overflow-hidden mb-3">
                                        <img
                                            src={item.img}
                                            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                                            alt={item.title}
                                        />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-[8px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest">{item.title}</h3>
                                    </div>
                                </div>
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 md:w-16 h-4 md:h-5 bg-[#F1FC88]/70 backdrop-blur-sm -rotate-2 group-hover:bg-[#F1FC88] transition-colors z-20" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* --- CHIT CHAT CALL TO ACTION --- */}
                <div className="bg-[#F1FC88] py-12 md:py-20 border-y-[6px] border-slate-950">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-6xl font-black text-slate-900 mb-6 md:mb-8 uppercase tracking-tighter italic">
                            Still Confused? <br /> Let's Chit Chat!
                        </h2>
                        <p className="text-slate-800 text-sm md:text-xl font-bold mb-8 md:mb-10 opacity-70">
                            Not sure which role fits you best? Our team is happy to help you find your path.
                        </p>
                        <Link to="/chit-chat#chitchat-form" className="bg-slate-950 text-white px-8 md:px-12 py-4 md:py-5 rounded-full font-black uppercase tracking-widest hover:scale-110 transition-transform shadow-2xl flex items-center gap-3 mx-auto max-w-fit text-xs md:text-base">
                            Ping Us Now <span className="material-icons">chat</span>
                        </Link>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isApplying && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex justify-center items-start p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto no-scrollbar"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            className="bg-white w-full max-w-3xl rounded-[1.5rem] md:rounded-[2rem] border-[3px] md:border-[4px] border-slate-900 shadow-[6px_6px_0px_0px_rgba(241,252,136,1)] md:shadow-[10px_10px_0px_0px_rgba(241,252,136,1)] relative my-4 md:my-10"
                        >
                            <button
                                onClick={() => setIsApplying(false)}
                                className="absolute top-3 right-3 md:top-6 md:right-6 w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 hover:bg-primary hover:text-white transition-all z-20 shadow-sm"
                            >
                                <span className="material-icons text-sm md:text-base">close</span>
                            </button>

                            <div className="p-4 md:p-8">
                                <div className="mb-4 md:mb-6">
                                    <h2 className="text-lg md:text-3xl font-black text-slate-900 tracking-tighter uppercase mb-0.5 md:mb-1 leading-none">Apply For</h2>
                                    <div className="inline-block bg-[#F1FC88] px-2 py-0.5 md:px-3 md:py-1 rounded-md md:rounded-lg -rotate-1 border-[1.5px] md:border-2 border-slate-900 text-slate-900 font-bold uppercase tracking-tight text-[10px] md:text-sm">
                                        {selectedJob}
                                    </div>
                                </div>

                                <form className="space-y-2 md:space-y-4" onSubmit={async (e) => {
                                    e.preventDefault();
                                    setAppStatus('sending');
                                    const formData = new FormData(e.target);
                                    const payload = Object.fromEntries(formData.entries());
                                    payload.jobTitle = selectedJob;

                                    try {
                                        await dataService.submitApplication(payload);
                                        setAppStatus('success');
                                        setTimeout(() => {
                                            setIsApplying(false);
                                            setAppStatus('idle');
                                        }, 3000);
                                    } catch (err) {
                                        console.error(err);
                                        setAppStatus('error');
                                        setTimeout(() => setAppStatus('idle'), 3000);
                                    }
                                }}>
                                    {formFields ? (
                                        <div className="space-y-4">
                                            {formFields.map((field) => (
                                                <div key={field.id} className="space-y-1">
                                                    <label className="text-[8px] md:text-[10px] font-black uppercase text-slate-400 px-1 tracking-widest">
                                                        {field.label} {field.required && <span className="text-red-500">*</span>}
                                                    </label>
                                                    {field.type === 'textarea' ? (
                                                        <textarea
                                                            name={field.label.toLowerCase().replace(/\s/g, '_')}
                                                            required={field.required}
                                                            placeholder={field.placeholder}
                                                            rows="3"
                                                            className="w-full px-3 py-2 md:px-4 md:py-3 bg-slate-50 border-[1.5px] md:border-2 border-slate-100 rounded-lg md:rounded-xl focus:border-primary focus:bg-white transition-all text-[10px] md:text-xs font-bold outline-none resize-none"
                                                        ></textarea>
                                                    ) : (
                                                        <input
                                                            type={field.type}
                                                            name={field.label.toLowerCase().replace(/\s/g, '_')}
                                                            required={field.required}
                                                            placeholder={field.placeholder}
                                                            className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-slate-50 border-[1.5px] md:border-2 border-slate-100 rounded-lg md:rounded-xl focus:border-primary focus:bg-white transition-all text-[10px] md:text-xs font-bold outline-none"
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                                                <div className="space-y-1">
                                                    <label className="text-[8px] md:text-[10px] font-black uppercase text-slate-400 px-1 tracking-widest">Full Name</label>
                                                    <input name="name" required type="text" placeholder="John Doe" className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-slate-50 border-[1.5px] md:border-2 border-slate-100 rounded-lg md:rounded-xl focus:border-primary focus:bg-white transition-all text-[10px] md:text-xs font-bold outline-none" />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[8px] md:text-[10px] font-black uppercase text-slate-400 px-1 tracking-widest">Email Address</label>
                                                    <input name="email" required type="email" placeholder="john@example.com" className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-slate-50 border-[1.5px] md:border-2 border-slate-100 rounded-lg md:rounded-xl focus:border-primary focus:bg-white transition-all text-[10px] md:text-xs font-bold outline-none" />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                                                <div className="space-y-1">
                                                    <label className="text-[8px] md:text-[10px] font-black uppercase text-slate-400 px-1 tracking-widest">Phone Number</label>
                                                    <input name="phone" required type="tel" placeholder="+91 00000 00000" className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-slate-50 border-[1.5px] md:border-2 border-slate-100 rounded-lg md:rounded-xl focus:border-primary focus:bg-white transition-all text-[10px] md:text-xs font-bold outline-none" />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[8px] md:text-[10px] font-black uppercase text-slate-400 px-1 tracking-widest">LinkedIn / Portfolio</label>
                                                    <input name="portfolio" type="url" placeholder="https://..." className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-slate-50 border-[1.5px] md:border-2 border-slate-100 rounded-lg md:rounded-xl focus:border-primary focus:bg-white transition-all text-[10px] md:text-xs font-bold outline-none" />
                                                </div>
                                            </div>

                                            <div className="space-y-1">
                                                <label className="text-[8px] md:text-[10px] font-black uppercase text-slate-400 px-1 tracking-widest">Why should we hire you?</label>
                                                <textarea name="coverLetter" rows="3" placeholder="Tell us about your superpower..." className="w-full px-3 py-2 md:px-4 md:py-3 bg-slate-50 border-[1.5px] md:border-2 border-slate-100 rounded-lg md:rounded-xl focus:border-primary focus:bg-white transition-all text-[10px] md:text-xs font-bold outline-none resize-none"></textarea>
                                            </div>
                                        </>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={appStatus !== 'idle'}
                                        className={`w-full py-3 md:py-3.5 rounded-lg md:rounded-xl font-black uppercase tracking-widest text-[9px] md:text-xs transition-all shadow-xl shadow-slate-900/20 mb-1 md:mb-2 ${appStatus === 'idle' ? 'bg-slate-950 text-white hover:bg-primary hover:text-slate-950' :
                                            appStatus === 'sending' ? 'bg-slate-400 text-white animate-pulse' :
                                                appStatus === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                                            }`}
                                    >
                                        {appStatus === 'idle' && 'Submit Application'}
                                        {appStatus === 'sending' && 'Sending...'}
                                        {appStatus === 'success' && 'Success!'}
                                        {appStatus === 'error' && 'Error! Try Again'}
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <ScrollReveal>
                <ContactUs isHomePage={true} />
            </ScrollReveal>

            <ScrollReveal>
                <Footer />
            </ScrollReveal>

            <style>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .outline-text {
                    -webkit-text-stroke: 2px #0f172a;
                    color: transparent;
                }
            `}</style>
        </ScrollWrapper>
    );
};

export default Career;
