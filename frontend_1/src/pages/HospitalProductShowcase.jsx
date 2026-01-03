import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollWrapper from '../components/ScrollWrapper';
import ContactUs from '../components/ContactUs';

gsap.registerPlugin(ScrollTrigger);

// --- Reusable Mock Components for Phone Screens ---

const PatientHome = () => (
    <div className="w-full h-full bg-[#f0f9ff] flex flex-col relative overflow-hidden font-sans">
        <div className="p-6 pt-8 bg-white rounded-b-[2rem] shadow-sm z-10">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <p className="text-xs text-blue-500 font-bold uppercase">Good Morning</p>
                    <h3 className="text-xl font-black text-gray-900">Sarah Jones</h3>
                </div>
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600"><span className="material-symbols-outlined">person</span></div>
            </div>
            <div className="bg-[#0EA5E9] text-white p-4 rounded-xl flex items-center justify-between">
                <div>
                    <p className="text-xs font-bold text-blue-100">Next Appointment</p>
                    <p className="font-black text-lg">Dr. Smith • Cardiologist</p>
                    <p className="text-xs">Today, 10:00 AM</p>
                </div>
                <div className="bg-white/20 p-2 rounded-lg"><span className="material-symbols-outlined text-xl">calendar_month</span></div>
            </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto no-scrollbar">
            <h4 className="font-black text-gray-900 mb-4">Categories</h4>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {['General', 'Dentist', 'Cardio', 'Derma'].map((c, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 min-w-[60px]">
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-blue-500 shadow-sm"><span className="material-symbols-outlined">medical_services</span></div>
                        <span className="text-[10px] font-bold text-gray-600">{c}</span>
                    </div>
                ))}
            </div>
            <h4 className="font-black text-gray-900 mt-6 mb-4">Top Doctors</h4>
            <div className="space-y-3">
                {[1, 2].map((d, i) => (
                    <div key={i} className="bg-white p-3 rounded-2xl flex items-center gap-3 shadow-sm">
                        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                        <div>
                            <p className="font-bold text-sm text-gray-900">Dr. Albert</p>
                            <p className="text-[10px] text-gray-500">Surgeon • 4.8 ★</p>
                        </div>
                        <button className="ml-auto bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">Book</button>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const DoctorSchedule = () => (
    <div className="w-full h-full bg-white flex flex-col relative overflow-hidden font-sans">
        <div className="bg-[#082F49] text-white p-6 pt-8 rounded-b-[2rem]">
            <h3 className="font-black text-xl mb-1">My Schedule</h3>
            <p className="text-xs text-blue-200">Monday, 12 Oct</p>
            <div className="flex mt-4 gap-2">
                {[12, 13, 14, 15, 16].map((d, i) => (
                    <div key={i} className={`flex-1 p-2 rounded-xl text-center ${i === 2 ? 'bg-[#0EA5E9] text-white' : 'bg-white/10 text-gray-300'}`}>
                        <p className="text-[10px] font-bold">Mon</p>
                        <p className="text-lg font-black">{d}</p>
                    </div>
                ))}
            </div>
        </div>
        <div className="flex-1 p-6 space-y-4">
            {['09:00 AM', '10:30 AM', '01:00 PM'].map((t, i) => (
                <div key={i} className="flex gap-4">
                    <p className="text-xs font-bold text-gray-400 w-12 pt-2">{t}</p>
                    <div className={`flex-1 p-4 rounded-xl ${i === 0 ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50'}`}>
                        <h4 className="font-bold text-gray-900 text-sm">Consultation - Alex</h4>
                        <p className="text-[10px] text-gray-500 mt-1">General Checkup • Room 302</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const HospitalAdmin = () => (
    <div className="w-full h-full bg-slate-50 flex font-sans overflow-hidden text-slate-800">
        <div className="w-16 bg-[#082F49] flex flex-col items-center py-6 gap-6 text-slate-400">
            <span className="material-symbols-outlined text-white">local_hospital</span>
            <span className="material-symbols-outlined">group</span>
            <span className="material-symbols-outlined">calendar_month</span>
            <span className="material-symbols-outlined">settings</span>
        </div>
        <div className="flex-1 p-6 flex flex-col">
            <h3 className="font-bold text-xl mb-6">Hospital Overview</h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                    { l: 'Patients', v: '842', c: 'text-blue-600 bg-blue-50' },
                    { l: 'Doctors', v: '45', c: 'text-teal-600 bg-teal-50' },
                    { l: 'Appts', v: '128', c: 'text-purple-600 bg-purple-50' },
                    { l: 'Revenue', v: '$12k', c: 'text-gray-600 bg-gray-100' }
                ].map((s, i) => (
                    <div key={i} className={`p-3 rounded-xl ${s.c}`}>
                        <span className="text-[10px] font-bold uppercase opacity-70">{s.l}</span>
                        <span className="block text-xl font-black">{s.v}</span>
                    </div>
                ))}
            </div>
            <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-sm">Bed Occupancy</h4>
                    <span className="text-xs font-bold text-green-500">85% Full</span>
                </div>
                <div className="flex gap-1 h-20 items-end">
                    {[30, 50, 40, 70, 85, 60, 50].map((h, i) => (
                        <div key={i} className="flex-1 bg-[#0EA5E9] opacity-20 rounded-t-sm hover:opacity-100 transition-opacity" style={{ height: `${h}%` }}></div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const HospitalProductShowcase = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    const containerRef = useRef(null);
    const userSectionRef = useRef(null);
    const driverSectionRef = useRef(null);
    const adminSectionRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const heroBlobY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
    const heroPhoneY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const animateSection = (ref, xVal, yVal, rotateVal) => {
                if (!ref.current) return;
                gsap.fromTo(ref.current.querySelector('.visual'),
                    { opacity: 0, x: xVal || 0, y: yVal || 0, rotateY: rotateVal || 0 },
                    { opacity: 1, x: 0, y: 0, rotateY: 0, duration: 1, scrollTrigger: { trigger: ref.current, start: "top 70%", end: "bottom 70%", toggleActions: "play reverse play reverse", scrub: 1 } }
                );
                gsap.fromTo(ref.current.querySelector('.content'),
                    { opacity: 0, x: xVal ? -xVal : 0, y: yVal ? -yVal : 0 },
                    { opacity: 1, x: 0, y: 0, duration: 1, scrollTrigger: { trigger: ref.current, start: "top 70%", end: "bottom 70%", toggleActions: "play reverse play reverse", scrub: 1 } }
                );
            };
            animateSection(userSectionRef, -100, 0, 0);
            animateSection(driverSectionRef, 0, 50, 0);
            animateSection(adminSectionRef, 50, 0, -10);
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <ScrollWrapper>
            <div className="font-sans antialiased text-slate-900 bg-white overflow-hidden selection:bg-[#0EA5E9] selection:text-white" ref={containerRef}>
                <Navbar />

                {/* --- Hero Section --- */}
                <section className="relative h-screen max-h-screen flex items-center pt-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-[60%] h-[120%] bg-blue-50 rounded-bl-full -z-10 translate-x-1/3 -translate-y-20"></div>
                    <motion.div style={{ y: heroBlobY }} className="absolute md:top-[10%] md:right-[5%] w-[500px] h-[500px] bg-[#0EA5E9]/10 rounded-full blur-3xl -z-10"></motion.div>

                    <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
                        <div className="space-y-4 max-w-lg z-10">
                            <span className="text-[#0EA5E9] font-bold tracking-widest uppercase text-xs border-b-2 border-[#0EA5E9] pb-1 inline-block">Appzeto Care</span>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1] text-[#082F49] tracking-tight">
                                Smart Housing <br /> For <span className="text-[#0EA5E9] underline decoration-4 decoration-[#0EA5E9]/30 underline-offset-4">Health.</span>
                            </h1>
                            <p className="text-slate-500 text-lg leading-relaxed font-medium">Bridge the gap between patients and providers with our unified digital health platform.</p>
                            <div className="relative max-w-sm pt-4">
                                <button className="w-full pl-6 pr-4 py-4 rounded-full bg-[#082F49] text-white shadow-xl flex items-center justify-between font-bold hover:scale-105 transition-all group">
                                    <span>Get A Demo</span>
                                    <div className="bg-[#0EA5E9] text-white p-2 rounded-full"><span className="material-symbols-outlined text-lg group-hover:rotate-45 transition-transform">arrow_forward</span></div>
                                </button>
                            </div>
                        </div>

                        <div className="relative flex justify-center lg:justify-end h-full items-center">
                            <motion.div style={{ y: heroPhoneY }} className="relative z-10 w-[280px] border-[10px] border-white rounded-[2.5rem] shadow-2xl bg-black overflow-hidden h-[580px]">
                                <PatientHome />
                            </motion.div>
                            <motion.div animate={{ y: [-10, 10, -10] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute top-[25%] -left-12 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3">
                                <div className="p-3 bg-red-100 rounded-full text-red-600"><span className="material-symbols-outlined text-lg">favorite</span></div>
                                <div><p className="text-xs font-black text-gray-800">Heart Rate</p><p className="text-[10px] text-gray-500 font-bold">72 bpm • Normal</p></div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* --- 3 Icons Section --- */}
                <section className="py-12 md:py-20">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <p className="text-base font-black text-slate-400 uppercase tracking-widest mb-10">Healthcare Reimagined</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "Telemedicine", desc: "HD Video consults from anywhere.", icon: "videocam", color: "bg-blue-100 text-blue-600" },
                                { title: "Electronic Records", desc: "Secure, centralized patient history.", icon: "folder_shared", color: "bg-teal-100 text-teal-600" },
                                { title: "Smart Scheduling", desc: "AI-optimized doctor appointments.", icon: "schedule", color: "bg-purple-100 text-purple-600" }
                            ].map((item, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2, duration: 0.6 }} viewport={{ once: true }} className="flex flex-col items-center group cursor-pointer">
                                    <div className={`w-20 h-20 rounded-[2rem] ${item.color} flex items-center justify-center mb-5 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                                        <span className="material-symbols-outlined text-4xl">{item.icon}</span>
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-slate-500 max-w-xs text-base">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- SECTION 1: Patient App --- */}
                <section ref={userSectionRef} className="py-12 md:py-16 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50 -skew-x-12 translate-x-[20%] -z-10"></div>
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="visual relative flex justify-center">
                            <div className="relative z-10 w-[340px] border-[14px] border-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] bg-white overflow-hidden h-[700px]">
                                <PatientHome />
                            </div>
                        </div>
                        <div className="content space-y-4">
                            <div>
                                <h4 className="text-[#0EA5E9] font-black tracking-[0.2em] uppercase text-sm mb-4 inline-block bg-blue-50 px-4 py-2 rounded-full">For Patients</h4>
                                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#082F49] leading-[1.1] tracking-tight">Care at Your <br /> Fingertips</h2>
                            </div>
                            <p className="text-base text-slate-500 leading-relaxed font-medium">Empower patients to take control of their health journey.</p>
                            <ul className="space-y-3">
                                {["Instant Doctor Booking", "Secure Lab Reports Access", "Medicine Reminders", "Family Health Management"].map((f, i) => (
                                    <li key={i} className="flex items-start gap-4 p-3 rounded-2xl hover:bg-blue-50 transition-colors cursor-default border border-transparent hover:border-blue-100">
                                        <div className="w-8 h-8 rounded-full bg-[#0EA5E9] flex items-center justify-center text-white mt-1 shrink-0 shadow-md"><span className="material-symbols-outlined text-sm font-bold">check</span></div>
                                        <span className="font-bold text-slate-800 text-lg">{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* --- SECTION 2: Doctor App --- */}
                <section ref={driverSectionRef} className="py-12 md:py-16 overflow-hidden bg-[#082F49] text-white relative">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="content space-y-4 order-2 lg:order-1">
                            <div>
                                <h4 className="text-[#0EA5E9] font-black tracking-[0.2em] uppercase text-sm mb-4 inline-block bg-[#0EA5E9]/10 px-4 py-2 rounded-full">For Doctors</h4>
                                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">Optimized <br /> Practice</h2>
                            </div>
                            <p className="text-base text-slate-300 leading-relaxed font-medium">Streamline clinical workflows and focus on what matters most—patient care.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                {[{ t: "Smart Schedule", i: "edit_calendar" }, { t: "Patient History", i: "history_edu" }, { t: "E-Prescriptions", i: "prescriptions" }, { t: "Secure Chat", i: "chat_bubble" }].map((x, i) => (
                                    <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-3xl hover:bg-white/10 transition-colors flex items-center gap-4">
                                        <span className="material-symbols-outlined text-[#0EA5E9] text-3xl">{x.i}</span><span className="font-bold text-lg">{x.t}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="visual relative flex justify-center order-1 lg:order-2">
                            <div className="relative z-10 w-[340px] border-[14px] border-slate-700/50 rounded-[3rem] shadow-2xl bg-black overflow-hidden h-[700px] ring-1 ring-white/10">
                                <DoctorSchedule />
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- SECTION 3: ADMIN PANEL --- */}
                <section ref={adminSectionRef} className="py-12 md:py-16 overflow-hidden relative bg-slate-50">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="visual relative flex justify-center perspective-1000">
                            <div className="relative z-10 w-full max-w-xl aspect-[16/10] shadow-2xl rounded-2xl overflow-hidden border-[12px] border-white bg-white transform rotate-y-12 shadow-blue-900/10"><HospitalAdmin /></div>
                        </div>
                        <div className="content space-y-4">
                            <div>
                                <h4 className="text-[#082F49] font-black tracking-[0.2em] uppercase text-sm mb-4 inline-block bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">Hospital Administration</h4>
                                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#082F49] leading-[1.1] tracking-tight">Healthcare <br /> Operations</h2>
                            </div>
                            <p className="text-base text-slate-500 leading-relaxed font-medium">Efficiently manage resources, staff, and finances across your entire healthcare network.</p>
                            <div className="space-y-4">
                                {[{ t: "Staff Management", d: "Rostering and performance." }, { t: "Resource Allocation", d: "Beds, OT, and inventory." }, { t: "Revenue Cycle", d: "Billing and insurance claims." }].map((x, i) => (
                                    <div key={i} className="flex gap-4 group">
                                        <div className="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center text-[#082F49] shrink-0 border border-gray-100 font-black text-2xl group-hover:bg-[#082F49] group-hover:text-[#0EA5E9] transition-colors duration-300">{i + 1}</div>
                                        <div><h4 className="font-bold text-slate-900 text-xl">{x.t}</h4><p className="text-slate-500 text-base mt-2">{x.d}</p></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- CTA --- */}
                <section className="py-20 bg-[#082F49] relative overflow-hidden text-white">
                    <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                        <h2 className="text-5xl md:text-6xl font-black mb-8">Digitize Your Hospital</h2>
                        <button className="px-10 py-5 bg-[#0EA5E9] text-white font-black rounded-full text-lg shadow-xl hover:scale-105 transition-all">Begin Transformation</button>
                    </div>
                </section>

                <ContactUs isHomePage={true} />
                <Footer />
            </div>
        </ScrollWrapper>
    );
};

export default HospitalProductShowcase;
