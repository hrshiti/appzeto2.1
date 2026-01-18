import React from 'react';
import { motion } from 'framer-motion';
import mapImage from '../assets/india_map_bg.png';

const Pin = ({ label, top, left, labelPosition, color = "#05A4A7", delay }) => {
    // Determine label and line styles based on position
    let effectivePosition = labelPosition;
    if (window.innerWidth < 768 && labelPosition === 'left') {
        effectivePosition = 'right';
    }

    let labelStyle = {};
    let lineStyle = {};
    let lineContainerStyle = {};

    // Base adjustments for the line to emanate from the dot
    const dotSize = 12;

    switch (effectivePosition) {
        case 'right':
            labelStyle = { left: '100%', top: '50%', transform: 'translateY(-50%)' };
            lineContainerStyle = { left: '30%', top: '50%', width: window.innerWidth < 768 ? '30px' : '60px', height: '2px', transform: 'translateY(-50%)' };
            lineStyle = { width: '100%', height: '100%', borderTop: `2px dotted ${color}` };
            break;
        case 'left':
            labelStyle = { right: '100%', top: '50%', transform: 'translateY(-50%)' };
            lineContainerStyle = { right: '30%', top: '50%', width: window.innerWidth < 768 ? '30px' : '60px', height: '2px', transform: 'translateY(-50%)' };
            lineStyle = { width: '100%', height: '100%', borderTop: `2px dotted ${color}` };
            break;
        case 'top':
            labelStyle = { bottom: '100%', left: '50%', transform: 'translateX(-50%)' };
            lineContainerStyle = { bottom: '30%', left: '50%', height: window.innerWidth < 768 ? '30px' : '60px', width: '2px', transform: 'translateX(-50%)' };
            lineStyle = { width: '100%', height: '100%', borderLeft: `2px dotted ${color}` };
            break;
        case 'bottom':
            labelStyle = { top: '100%', left: '50%', transform: 'translateX(-50%)' };
            lineContainerStyle = { top: '30%', left: '50%', height: window.innerWidth < 768 ? '30px' : '60px', width: '2px', transform: 'translateX(-50%)' };
            lineStyle = { width: '100%', height: '100%', borderLeft: `2px dotted ${color}` };
            break;
        default:
            break;
    }

    return (
        <motion.div
            className="absolute z-10"
            style={{ top, left }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay, type: "spring" }}
        >
            {/* The Dot */}
            <div className="relative flex items-center justify-center">
                <div
                    className={`w-3 h-3 rounded-full z-20`}
                    style={{ backgroundColor: color }}
                />
                <div
                    className={`absolute w-full h-full rounded-full animate-ping opacity-75`}
                    style={{ backgroundColor: color }}
                ></div>

                {/* Connecting Line */}
                <motion.div
                    className="absolute z-10 flex items-center justify-center pointer-events-none"
                    style={lineContainerStyle}
                    initial={{ width: 0, height: 0, opacity: 0 }}
                    whileInView={{
                        width: lineContainerStyle.width,
                        height: lineContainerStyle.height,
                        opacity: 1
                    }}
                    transition={{ duration: 0.5, delay: delay + 0.3 }}
                >
                    <div style={lineStyle}></div>
                </motion.div>

                {/* Label */}
                <motion.div
                    className="absolute bg-[#012828] text-white px-2 py-1 md:px-4 md:py-2 rounded md:rounded-lg whitespace-nowrap z-20"
                    style={labelStyle}
                    initial={{ opacity: 0, [effectivePosition === 'left' || effectivePosition === 'right' ? 'x' : 'y']: effectivePosition === 'left' ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.4, delay: delay + 0.6 }}
                >
                    <span className="font-bold text-[8px] md:text-sm tracking-wide">{label}</span>
                </motion.div>
            </div>
        </motion.div>
    );
};

const PartnerStat = ({ number, text }) => (
    <div className="flex flex-col">
        <h4 className="text-3xl lg:text-5xl font-black text-[#012828]">{number}</h4>
        <p className="text-xs md:text-gray-600 md:font-medium mt-0.5 md:mt-1">{text}</p>
    </div>
);

const AppzetoPartners = () => {
    const [isMobile, setIsMobile] = React.useState(false);
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    React.useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const locations = isMobile ? [
        { label: "Noida - Tech City", top: "25%", left: "42%", position: "right", color: "#00AEEF", delay: 0.2 },
        { label: "Indore - Growth Hub", top: "45%", left: "28%", position: "top", color: "#FF6D00", delay: 0.4 },
        { label: "Mumbai - Finance Core", top: "62%", left: "15%", position: "right", color: "#FF4081", delay: 0.6 },
        { label: "Pune - IT Zone", top: "70%", left: "25%", position: "bottom", color: "#7C4DFF", delay: 0.7 },
        { label: "Hyderabad - Cyber Park", top: "65%", left: "48%", position: "top", color: "#64DD17", delay: 0.8 },
        { label: "Bangalore - Startup Valley", top: "85%", left: "38%", position: "right", color: "#2962FF", delay: 1.0 },
    ] : [
        { label: "Noida - Tech City", top: "29%", left: "32%", position: "right", color: "#00AEEF", delay: 0.2 },
        { label: "Indore - Growth Hub", top: "50%", left: "28%", position: "left", color: "#FF6D00", delay: 0.4 },
        { label: "Mumbai - Finance Core", top: "64%", left: "18%", position: "left", color: "#FF4081", delay: 0.6 },
        { label: "Pune - IT Zone", top: "68%", left: "23%", position: "bottom", color: "#7C4DFF", delay: 0.7 },
        { label: "Hyderabad - Cyber Park", top: "68%", left: "40%", position: "top", color: "#64DD17", delay: 0.8 },
        { label: "Bangalore - Startup Valley", top: "82%", left: "35%", position: "left", color: "#2962FF", delay: 1.0 },
    ];

    return (
        <section className="w-full py-10 md:py-20 bg-white overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
                {/* Floating CTA Button */}
                <div className="absolute top-0 right-6 md:right-12 z-30">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="group relative inline-flex items-center gap-2 px-6 py-3 bg-[#05A4A7] text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(5,164,167,0.5)] hover:shadow-[0_0_30px_rgba(5,164,167,0.8)]"
                    >
                        <span className="relative z-10 font-bold uppercase tracking-wider text-xs md:text-sm">Join as a Partner</span>
                        <span className="material-symbols-outlined relative z-10 text-lg animate-arrow-bounce">arrow_forward</span>

                        {/* Pulse Ring */}
                        <span className="absolute inset-0 rounded-full ring-2 ring-white/30 group-hover:ring-4 group-hover:ring-white/50 transition-all duration-500 animate-pulse"></span>

                        {/* Shimmer Effect */}
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                    </button>
                </div>

                <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">

                    {/* Left Column: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-4 md:space-y-8"
                    >
                        {/* Heading Section */}
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="flex items-center gap-3 mb-4 md:mb-6 text-[#05A4A7] font-black uppercase tracking-[0.4em] text-[10px] md:text-xs"
                            >
                                <span className="h-[1px] md:h-[2px] w-8 md:w-10 bg-[#05A4A7]"></span>
                                Global Network
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="text-3xl md:text-5xl lg:text-6xl font-black text-[#012828] leading-none tracking-tight uppercase"
                            >
                                APPZETO <br />
                                <motion.span
                                    initial={{ color: "transparent" }}
                                    whileInView={{ color: "transparent" }}
                                    transition={{ delay: 0.5, duration: 0.1 }}
                                    className="stroke-text-dark relative inline-block"
                                >
                                    <span className="absolute inset-0 text-transparent stroke-text-dark z-10">PARTNERS</span>
                                    <motion.span
                                        initial={{ width: "0%" }}
                                        whileInView={{ width: "100%" }}
                                        transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
                                        className="absolute inset-0 text-[#012828] overflow-hidden whitespace-nowrap z-20"
                                    >
                                        PARTNERS
                                    </motion.span>
                                    <span className="opacity-0">PARTNERS</span>
                                </motion.span>
                            </motion.h2>
                        </div>

                        <div className="w-12 md:w-20 h-0.5 md:h-1 bg-gray-300"></div>

                        <div className="relative">
                            <p className={`text-sm md:text-lg text-gray-600 leading-relaxed max-w-lg transition-all duration-300 ${!isExpanded ? 'line-clamp-2 md:line-clamp-none' : ''}`}>
                                Our extensive partner network spans across the nation, ensuring that Appzeto's innovative solutions are accessible everywhere. From bustling metros to emerging tech hubs, we are present where you need us.
                            </p>
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="md:hidden mt-2 text-[#05A4A7] text-xs font-bold hover:underline focus:outline-none"
                            >
                                {isExpanded ? 'Read Less' : 'Read More'}
                            </button>


                        </div>

                        <div className="grid grid-cols-2 gap-3 md:gap-8 pt-2 md:pt-6">
                            <PartnerStat number="50+" text="Major Cities" />
                            <PartnerStat number="200+" text="Enterprise Partners" />
                            <PartnerStat number="15k+" text="Active Users" />
                            <PartnerStat number="24/7" text="Regional Support" />
                        </div>
                    </motion.div>

                    {/* Right Column: Map */}
                    <div className="relative w-full h-[350px] md:h-[600px] flex items-center justify-center">
                        <motion.img
                            src={mapImage}
                            alt="India Map"
                            className="w-full h-full object-contain opacity-90"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 0.9, scale: 1 }}
                            transition={{ duration: 1 }}
                        />

                        {/* Overlay Pins */}
                        {locations.map((loc, index) => (
                            <Pin
                                key={index}
                                label={loc.label}
                                top={loc.top}
                                left={loc.left}
                                labelPosition={loc.position}
                                color={loc.color}
                                delay={loc.delay}
                            />
                        ))}
                    </div>

                </div>
            </div>

            {/* Injected Styles for Stroke Effect */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .stroke-text-dark {
                    -webkit-text-stroke: 2px #012828;
                    color: transparent;
                }
                @media (max-width: 768px) {
                    .stroke-text-dark {
                        -webkit-text-stroke: 1px #012828;
                    }
                }
                @keyframes arrowBounceX {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(5px); }
                }
                .animate-arrow-bounce {
                    animation: arrowBounceX 1.5s infinite ease-in-out;
                }
            ` }} />

            {/* PARTNER FORM MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative"
                    >
                        {/* Modal Header */}
                        <div className="bg-[#012828] p-6 text-white flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-bold">Become a Partner</h3>
                                <p className="text-white/60 text-xs mt-1">Join the Appzeto Network</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="text-white/70 hover:text-white">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6">
                            <PartnerForm onClose={() => setIsModalOpen(false)} />
                        </div>
                    </motion.div>
                </div>
            )}
        </section>
    );
};

const PartnerForm = ({ onClose }) => {
    const [formData, setFormData] = React.useState({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        businessType: '',
        message: ''
    });
    const [status, setStatus] = React.useState('idle'); // idle, loading, success, error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
            const response = await fetch(`${API_URL}/api/contact/partner`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
                setTimeout(() => {
                    onClose();
                    setStatus('idle');
                    setFormData({ companyName: '', contactPerson: '', email: '', phone: '', businessType: '', message: '' });
                }, 2000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-green-600 text-3xl">check</span>
                </div>
                <h4 className="text-xl font-bold text-slate-800">Application Submitted!</h4>
                <p className="text-slate-500 mt-2 text-sm">Our team will review your details and get back to you shortly.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase">Company Name</label>
                    <input
                        type="text"
                        name="companyName"
                        required
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#05A4A7] text-sm"
                        placeholder="Tech Solutions Ltd."
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase">Contact Person</label>
                    <input
                        type="text"
                        name="contactPerson"
                        required
                        value={formData.contactPerson}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#05A4A7] text-sm"
                        placeholder="John Doe"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase">Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#05A4A7] text-sm"
                        placeholder="john@example.com"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#05A4A7] text-sm"
                        placeholder="+91 98765 43210"
                    />
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase">Business Type</label>
                <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#05A4A7] text-sm bg-white"
                >
                    <option value="">Select Type...</option>
                    <option value="Consultancy">Consultancy</option>
                    <option value="Development Agency">Development Agency</option>
                    <option value="Freelancer">Freelancer</option>
                    <option value="Enterprise">Enterprise</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase">Message (Optional)</label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#05A4A7] text-sm resize-none"
                    placeholder="Tell us about yourself..."
                ></textarea>
            </div>

            {status === 'error' && (
                <p className="text-red-500 text-xs text-center">Something went wrong. Please try again.</p>
            )}

            <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 bg-[#012828] text-white font-bold rounded-lg hover:bg-[#023638] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {status === 'loading' ? 'Submitting...' : 'Submit Application'}
            </button>
        </form>
    );
};

export default AppzetoPartners;
