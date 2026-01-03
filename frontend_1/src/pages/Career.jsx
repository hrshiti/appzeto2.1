import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import ContactUs from '../components/ContactUs';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';
import ScrollWrapper from '../components/ScrollWrapper';

const Career = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const positions = [
        {
            id: 1,
            role: "Frontend Dev",
            department: "Engineering",
            type: "Full-time",
            location: "Remote",
            description: "Crafting pixel-perfect React interfaces."
        },
        {
            id: 2,
            role: "Backend Dev",
            department: "Engineering",
            type: "Full-time",
            location: "Remote",
            description: "Building scalable Node.js architectures."
        },
        {
            id: 3,
            role: "UI/UX Designer",
            department: "Product",
            type: "Full-time",
            location: "On-site",
            description: "Designing the next-gen user journeys."
        },
        {
            id: 4,
            role: "SEO Expert",
            department: "Marketing",
            type: "Full-time",
            location: "On-site",
            description: "Optimizing visibility and conversion."
        }
    ];

    const internships = [
        {
            id: "i1",
            role: "Graphic Design Intern",
            duration: "3 - 6 Months",
            type: "Paid",
            description: "Work on real-world brand identities and digital marketing assets.",
            icon: "palette"
        },
        {
            id: "i2",
            role: "Full Stack Web Intern",
            duration: "6 Months",
            type: "Paid",
            description: "Learn and build with the MERN stack with expert mentorship.",
            icon: "code"
        },
        {
            id: "i3",
            role: "Content Intern",
            duration: "3 Months",
            type: "Paid",
            description: "Create engaging content for social media and blogs.",
            icon: "edit"
        }
    ];

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

    return (
        <ScrollWrapper>
            <div className="bg-[#f8f9fa] min-h-screen font-sans text-slate-900 overflow-x-hidden selection:bg-primary selection:text-white">
                <Navbar />

                {/* --- HERO SECTION --- */}
                <div className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-visible">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7 space-y-8 z-10">
                            <motion.div
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                className="inline-flex items-center space-x-3 bg-white px-4 py-2 rounded-full border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            >
                                <span className="w-3 h-3 bg-primary rounded-full animate-pulse"></span>
                                <span className="text-xs uppercase tracking-widest font-black text-slate-900">WE'RE HIRING!</span>
                            </motion.div>

                            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] text-slate-900 tracking-tighter">
                                JOIN THE <br />
                                <span className="text-primary italic outline-text">REVOLUTION.</span>
                            </h1>

                            <div className="flex flex-wrap gap-4">
                                {["Brilliant Minds", "Fast Paced", "Big Impact"].map((item, idx) => (
                                    <motion.span
                                        key={idx}
                                        whileHover={{ scale: 1.1, rotate: idx % 2 === 0 ? 5 : -5 }}
                                        className="px-6 py-3 rounded-2xl border-2 border-slate-900 bg-white text-sm font-black text-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-primary hover:text-white transition-all cursor-pointer"
                                    >
                                        {item}
                                    </motion.span>
                                ))}
                            </div>

                            <p className="text-slate-600 max-w-lg text-xl font-medium leading-relaxed">
                                Stop working for machines. Start building for humans. Appzeto is looking for the bold, the curious, and the slightly obsessed.
                            </p>
                        </div>

                        <div className="lg:col-span-5 relative">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="relative aspect-square bg-primary rounded-[3rem] border-[4px] border-slate-900 shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] rotate-3 overflow-hidden"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2340&auto=format&fit=crop"
                                    alt="Team"
                                    className="w-full h-full object-cover grayscale mix-blend-overlay hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute inset-0 flex items-center justify-center p-10 text-center">
                                    <h2 className="text-4xl md:text-5xl font-black text-white leading-tight drop-shadow-2xl">
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

                {/* --- OPEN POSITIONS (MODERN MINIMAL LIST - FITS IN 100VH) --- */}
                <div id="positions" className="lg:h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-white shadow-sm mt-0 border-b border-slate-100 flex flex-col justify-center overflow-hidden">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 px-4">
                        <div className="text-left">
                            <p className="text-primary font-bold uppercase tracking-widest text-[10px] mb-2 text-slate-400">Join the squad</p>
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tighter uppercase">Wanna Join Us?</h2>
                        </div>
                        <p className="text-slate-400 text-xs max-w-xs mt-4 md:mt-0 italic">Always on the lookout for ambitious talent ready to disrupt.</p>
                    </div>

                    <div className="flex flex-col border-t border-slate-100/50">
                        {positions.map((job) => (
                            <motion.div
                                key={job.id}
                                whileHover={{ backgroundColor: "rgba(241, 252, 136, 0.2)" }}
                                className="flex flex-col md:flex-row items-center justify-between py-6 px-6 border-b border-slate-100/50 group transition-all duration-300 cursor-pointer"
                            >
                                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 flex-1">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 w-24">{job.department}</span>
                                    <div className="flex flex-col">
                                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors uppercase tracking-tight">{job.role}</h3>
                                        <p className="text-slate-500 text-xs mt-0.5">{job.description}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8 mt-6 md:mt-0">
                                    <div className="hidden lg:flex items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        <span className="flex items-center gap-1.5"><span className="material-icons text-sm opacity-50">schedule</span> {job.type}</span>
                                        <span className="flex items-center gap-1.5"><span className="material-icons text-sm opacity-50">location_on</span> {job.location}</span>
                                    </div>
                                    <button className="bg-slate-950 text-white px-6 py-2.5 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-[#F1FC88] hover:text-slate-900 transition-all flex items-center gap-2">
                                        Apply <span className="material-icons text-sm">north_east</span>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* --- INTERNSHIP --- */}
                <div id="internship" className="bg-primary py-10 mt-0 border-t-[6px] border-slate-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="absolute top-0 right-10 rotate-12 opacity-10 pointer-events-none text-[#F1FC88]">
                            <span className="material-icons text-[250px]">school</span>
                        </div>

                        <div className="relative z-10 flex flex-col gap-12">
                            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                                <div className="text-left">
                                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-[0.8] uppercase tracking-tighter">
                                        START AS <br />
                                        <span className="text-slate-900 underline decoration-slate-900 underline-offset-8">A ROOKIE.</span>
                                    </h2>
                                    <p className="text-white font-bold text-lg opacity-90 italic uppercase">
                                        Internships with serious impact and zero coffee runs.
                                    </p>
                                </div>
                                <button className="px-8 py-3 bg-[#F1FC88] text-slate-900 font-bold rounded-2xl uppercase tracking-widest text-xs hover:bg-white transition-all border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]">
                                    Grab Your Spot
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {internships.map((intern) => (
                                    <div key={intern.id} className="bg-white p-6 rounded-[2rem] border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-1 transition-transform">
                                        <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-1">{intern.role}</h4>
                                        <div className="text-primary font-black text-[10px] uppercase tracking-widest mb-4">{intern.duration} • {intern.type}</div>
                                        <p className="text-slate-600 font-normal text-sm line-clamp-2">{intern.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- SCATTERED LIFE AT APPZETO --- */}
                <div id="culture" className="h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center relative overflow-hidden bg-[#f8f9fa]">
                    <div className="flex flex-col items-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center uppercase tracking-tighter">
                            LIFE AT <span className="bg-[#F1FC88] text-slate-900 px-4 py-1 rounded-lg inline-block -rotate-2 scale-90">APPZETO</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 relative">
                        {cultureItems.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 0.9, y: item.yOffset / 2 }}
                                viewport={{ once: true }}
                                style={{ rotate: item.rotation }}
                                transition={{ duration: 0.8, ease: "circOut", delay: idx * 0.05 }}
                                whileHover={{ scale: 1, rotate: 0, zIndex: 10 }}
                                className="relative group flex justify-center"
                            >
                                <div className="bg-white p-2 pb-6 shadow-lg border border-slate-100 w-32 md:w-48 lg:w-56">
                                    <div className="h-24 md:h-32 lg:h-40 w-full overflow-hidden mb-2">
                                        <img
                                            src={item.img}
                                            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                                            alt={item.title}
                                        />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.title}</h3>
                                    </div>
                                </div>
                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-[#F1FC88]/60 backdrop-blur-sm -rotate-2 group-hover:bg-[#F1FC88] transition-colors z-20" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* --- CHIT CHAT CALL TO ACTION --- */}
                <div className="bg-[#F1FC88] py-20 border-y-[6px] border-slate-950">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 uppercase tracking-tighter italic">
                            Still Confused? <br /> Let's Chit Chat!
                        </h2>
                        <p className="text-slate-800 text-xl font-bold mb-10 opacity-70">
                            Not sure which role fits you best? Our team is happy to help you find your path.
                        </p>
                        <Link to="/chit-chat" className="bg-slate-950 text-white px-12 py-5 rounded-full font-black uppercase tracking-widest hover:scale-110 transition-transform shadow-2xl flex items-center gap-3 mx-auto max-w-fit">
                            Ping Us Now <span className="material-icons">chat</span>
                        </Link>
                    </div>
                </div>
            </div>

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
