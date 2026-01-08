import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollWrapper from '../components/ScrollWrapper';
import { dataService } from '../admin/services/dataService';
import { useState } from 'react';

const allPartners = [
    {
        id: 1,
        name: "TechVision Solutions",
        location: "Mumbai, India",
        type: "Premium Partner",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400&h=250"
    },
    {
        id: 2,
        name: "Global Connect Inc",
        location: "Delhi, India",
        type: "Gold Partner",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400&h=250"
    },
    {
        id: 3,
        name: "Elite Systems",
        location: "Bangalore, India",
        type: "Strategic Partner",
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=400&h=250"
    },
    {
        id: 4,
        name: "Future Grid Co.",
        location: "Hyderabad, India",
        type: "Silver Partner",
        image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=400&h=250"
    },
    {
        id: 5,
        name: "Omni Digital",
        location: "Pune, India",
        type: "Gold Partner",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=400&h=250"
    },
    {
        id: 6,
        name: "Nexus Infotech",
        location: "Chennai, India",
        type: "Premium Partner",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=400&h=250"
    }
];

const ChannelPartnersPage = () => {
    const [status, setStatus] = useState('idle'); // idle, sending, success, error

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <ScrollWrapper>
            <Navbar />

            <div className="bg-white min-h-screen pt-8 md:pt-10 pb-16 font-sans">
                {/* Hero section for the page */}
                <div className="max-w-[1440px] mx-auto px-4 md:px-12 mb-4 md:mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <span className="text-[#05A4A7] font-bold tracking-[0.2em] uppercase text-xs mb-3 md:mb-4 block">Our Ecosystem</span>
                        <h1 className="text-3xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter mb-4 md:mb-6 leading-none">
                            Our Trusted <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#05A4A7] to-emerald-400">Channel Partners</span>
                        </h1>
                        <p className="text-gray-600 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                            We collaborate with industry leaders to deliver exceptional value and innovative solutions to businesses worldwide.
                        </p>
                    </motion.div>
                </div>

                {/* Partners Grid */}
                <div className="max-w-[1440px] mx-auto px-2 md:px-12 grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-16">
                    {allPartners.map((partner, index) => (
                        <motion.div
                            key={partner.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-gray-50 border border-gray-100 rounded-xl md:rounded-3xl overflow-hidden group hover:border-[#05A4A7]/30 transition-all duration-500 shadow-sm"
                        >
                            <div className="relative h-32 md:h-64 overflow-hidden">
                                <img
                                    src={partner.image}
                                    alt={partner.name}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                                <div className="absolute bottom-2 md:bottom-6 left-2 md:left-6 right-2">
                                    <div className="bg-[#05A4A7] text-white text-[7px] md:text-[10px] font-black uppercase tracking-widest px-2 py-0.5 md:px-3 md:py-1 rounded-full mb-1 md:mb-3 inline-block">
                                        {partner.type.split(' ')[0]}
                                    </div>
                                    <h3 className="text-xs md:text-2xl font-bold text-white group-hover:text-[#05A4A7] transition-colors leading-tight line-clamp-1">{partner.name}</h3>
                                </div>
                            </div>
                            <div className="p-3 md:p-8">
                                <div className="flex items-center gap-1.5 md:gap-3 text-gray-500 mb-2 md:mb-6">
                                    <span className="material-symbols-outlined text-[#05A4A7] text-xs md:text-base">location_on</span>
                                    <span className="text-[9px] md:text-sm font-medium tracking-wide truncate">{partner.location}</span>
                                </div>
                                <p className="text-gray-600 text-[10px] md:text-sm leading-tight md:leading-relaxed mb-4 md:mb-8 line-clamp-2 hidden md:block">
                                    Delivering excellence in digital transformation with local market focus.
                                </p>
                                <button className="w-full py-2 md:py-4 rounded-lg md:rounded-2xl bg-white border border-gray-200 text-gray-900 font-bold text-[8px] md:text-xs uppercase tracking-widest md:tracking-[0.2em] transition-all duration-300 group-hover:bg-[#05A4A7] group-hover:text-white group-hover:border-[#05A4A7]">
                                    Profile
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Apply Form Section */}
                <div id="apply" className="max-w-[1440px] mx-auto px-2 md:px-12">
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl md:rounded-[3rem] p-6 md:p-20 relative overflow-hidden shadow-sm">
                        {/* Decorative elements */}
                        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#05A4A7]/5 rounded-full blur-[100px]" />
                        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px]" />

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20">
                            <div>
                                <span className="text-[#05A4A7] font-bold tracking-[0.3em] uppercase text-[10px] md:text-sm mb-4 md:mb-6 block text-center lg:text-left">Join Our Network</span>
                                <h2 className="text-2xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter mb-4 md:mb-8 leading-tight text-center lg:text-left">
                                    Become a <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#05A4A7] to-emerald-400 font-black">Channel Partner</span>
                                </h2>
                                <p className="text-gray-600 text-sm md:text-lg mb-6 md:mb-10 leading-relaxed text-center lg:text-left">
                                    Expand your service portfolio and grow your business with our support.
                                </p>

                                <div className="space-y-6">
                                    {[
                                        "Access to exclusive product lineup",
                                        "Competitive commission structures",
                                        "Dedicated partner support manager",
                                        "Marketing & sales enablement tools"
                                    ].map((benefit, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="w-6 h-6 rounded-full bg-[#05A4A7]/10 flex items-center justify-center shrink-0">
                                                <span className="material-symbols-outlined text-[#05A4A7] text-sm font-bold">check</span>
                                            </div>
                                            <span className="text-gray-700 font-medium">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <form className="space-y-6" onSubmit={async (e) => {
                                e.preventDefault();
                                setStatus('sending');
                                const formData = new FormData(e.target);
                                const rawData = Object.fromEntries(formData.entries());

                                // Map to Lead Model
                                const payload = {
                                    name: rawData.contactPerson,
                                    company: rawData.companyName,
                                    email: rawData.email,
                                    phone: rawData.phone,
                                    service: `Partner: ${rawData.businessType}`,
                                    message: rawData.message,
                                    leadType: 'Partner'
                                };

                                try {
                                    await dataService.submitLead(payload);
                                    setStatus('success');
                                    setTimeout(() => setStatus('idle'), 3000);
                                    e.target.reset();
                                } catch (err) {
                                    console.error(err);
                                    setStatus('error');
                                    setTimeout(() => setStatus('idle'), 3000);
                                }
                            }}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Company Name</label>
                                        <input
                                            required
                                            name="companyName"
                                            type="text"
                                            placeholder="Enter your company"
                                            className="w-full bg-white border border-gray-200 rounded-2xl py-4 px-6 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#05A4A7] transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Company Email</label>
                                        <input
                                            required
                                            name="email"
                                            type="email"
                                            placeholder="email@company.com"
                                            className="w-full bg-white border border-gray-200 rounded-2xl py-4 px-6 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#05A4A7] transition-colors"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Contact Person</label>
                                        <input
                                            required
                                            name="contactPerson"
                                            type="text"
                                            placeholder="Your name"
                                            className="w-full bg-white border border-gray-200 rounded-2xl py-4 px-6 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#05A4A7] transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Phone Number</label>
                                        <input
                                            required
                                            name="phone"
                                            type="tel"
                                            placeholder="+91 ...."
                                            className="w-full bg-white border border-gray-200 rounded-2xl py-4 px-6 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#05A4A7] transition-colors"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Business Nature</label>
                                    <select name="businessType" className="w-full bg-white border border-gray-200 rounded-2xl py-4 px-6 text-gray-900 focus:outline-none focus:border-[#05A4A7] transition-colors appearance-none">
                                        <option>Technology Consulting</option>
                                        <option>Digital Agency</option>
                                        <option>System Integrator</option>
                                        <option>Independent Vendor</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Message</label>
                                    {/* Note: textarea background is white to match the theme */}
                                    <textarea
                                        name="message"
                                        rows="4"
                                        placeholder="How can we help you?"
                                        className="w-full bg-white border border-gray-200 rounded-2xl py-4 px-6 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#05A4A7] transition-colors resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    disabled={status !== 'idle'}
                                    className={`w-full py-5 rounded-2xl text-white font-black text-sm uppercase tracking-[0.3em] transition-all duration-300 transform hover:-translate-y-1 ${status === 'idle' ? 'bg-gradient-to-r from-[#05A4A7] to-emerald-500 hover:shadow-[0_10px_30px_rgba(5,164,167,0.3)]' :
                                        status === 'sending' ? 'bg-gray-400 animate-pulse' :
                                            status === 'success' ? 'bg-green-500' : 'bg-red-500'
                                        }`}
                                >
                                    {status === 'idle' && 'Submit Application'}
                                    {status === 'sending' && 'Submitting...'}
                                    {status === 'success' && 'Submitted Successfully!'}
                                    {status === 'error' && 'Error! Please Try Again'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </ScrollWrapper>
    );
};

export default ChannelPartnersPage;
