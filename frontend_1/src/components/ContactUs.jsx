
import React from 'react';

const ContactUs = () => {
    return (
        <div className="bg-[#f0f4f4] dark:bg-[#0b1211] font-sans transition-colors duration-300 overflow-hidden">
            {/* Header Section */}
            <div className="relative py-16 md:py-24 text-center px-4">
                <div className="absolute top-10 left-10 md:left-1/4 text-gray-200 dark:text-gray-800 opacity-50">
                    <svg width="40" height="20" viewBox="0 0 40 20" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M0 10 L5 0 L10 20 L15 0 L20 20 L25 0 L30 20 L35 0 L40 10" />
                    </svg>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-[#111817] dark:text-white mb-4 relative inline-block">
                    Contact Us
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-2 bg-gradient-to-r from-transparent via-[#05A4A7] to-transparent opacity-50"></div>
                </h1>
                <p className="text-[#618983] dark:text-gray-400 max-w-lg mx-auto text-sm md:text-base leading-relaxed mt-4">
                    Have questions or want to start a project? We'd love to hear from you. Reach out to us today.
                </p>
                <div className="absolute bottom-10 right-10 md:right-1/4 text-gray-200 dark:text-gray-800 opacity-50">
                    <svg width="40" height="20" viewBox="0 0 40 20" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M0 10 L5 20 L10 0 L15 20 L20 0 L25 20 L30 0 L35 20 L40 10" />
                    </svg>
                </div>
            </div>

            {/* Content Container */}
            <div className="max-w-6xl mx-auto px-6 pb-20">

                {/* Brand Logos */}
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mb-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
                    <span className="text-xl font-bold flex items-center gap-2 text-gray-600 dark:text-gray-400"><span className="material-symbols-outlined">dataset</span> logoipsum</span>
                    <span className="text-xl font-bold flex items-center gap-2 text-gray-600 dark:text-gray-400"><span className="material-symbols-outlined">hexagon</span> LOGOIPSUM</span>
                    <span className="text-xl font-bold flex items-center gap-2 text-gray-600 dark:text-gray-400"><span className="material-symbols-outlined">change_history</span> LOGOIPSUM</span>
                    <span className="text-xl font-bold flex items-center gap-2 text-gray-600 dark:text-gray-400"><span className="material-symbols-outlined">diamond</span> LOGOIPSUM</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full bg-[#dfe6e6] dark:bg-[#162623] text-gray-800 dark:text-white px-6 py-4 rounded-full border-none outline-none focus:ring-2 focus:ring-[#05A4A7] transition-all placeholder-gray-500"
                            />
                            <input
                                type="tel"
                                placeholder="Phone"
                                className="w-full bg-[#dfe6e6] dark:bg-[#162623] text-gray-800 dark:text-white px-6 py-4 rounded-full border-none outline-none focus:ring-2 focus:ring-[#05A4A7] transition-all placeholder-gray-500"
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full bg-[#dfe6e6] dark:bg-[#162623] text-gray-800 dark:text-white px-6 py-4 rounded-full border-none outline-none focus:ring-2 focus:ring-[#05A4A7] transition-all placeholder-gray-500"
                        />
                        <textarea
                            placeholder="Message"
                            rows="4"
                            className="w-full bg-[#dfe6e6] dark:bg-[#162623] text-gray-800 dark:text-white px-6 py-4 rounded-3xl border-none outline-none focus:ring-2 focus:ring-[#05A4A7] transition-all placeholder-gray-500 resize-none"
                        ></textarea>

                        <div>
                            <button className="px-8 py-4 bg-[#578E8F] dark:bg-[#05A4A7] text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:bg-[#437576] dark:hover:bg-[#048b8e] transition-all transform hover:-translate-y-0.5">
                                Submit Button
                            </button>
                        </div>
                    </div>

                    {/* Newsletter Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#578E8F] dark:bg-[#023638] rounded-3xl p-8 text-center text-white relative overflow-hidden h-full flex flex-col justify-center items-center shadow-xl">
                            {/* Decorative circles */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/10 rounded-full blur-2xl"></div>

                            <h3 className="text-2xl font-bold mb-4 relative z-10">Our Newsletters</h3>
                            <p className="text-white/80 text-sm mb-6 leading-relaxed relative z-10">
                                Subscribe to our newsletter to receive the latest news about our services and products.
                            </p>

                            <div className="w-full relative z-10 space-y-4">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full bg-white text-gray-800 px-6 py-3 rounded-full border-none outline-none focus:ring-2 focus:ring-white/50 transition-all placeholder-gray-400"
                                />
                                <button className="w-full py-3 bg-[#111817] text-white font-bold rounded-full hover:bg-black transition-all">
                                    Submit Button
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    {/* Phone Card */}
                    <div className="bg-[#9AB3B3] dark:bg-[#1a3836] p-8 rounded-3xl flex flex-col items-center justify-center text-center shadow-md">
                        <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center mb-4 text-white">
                            <span className="material-symbols-outlined">call</span>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">(+876) 765 665</h4>
                        <p className="text-white/80 text-xs text-center px-4">
                            Available 24/7 for support.
                        </p>
                    </div>

                    {/* Email Card */}
                    <div className="bg-[#CFD8D8] dark:bg-[#2c4a48] p-8 rounded-3xl flex flex-col items-center justify-center text-center shadow-md">
                        <div className="w-12 h-12 border-2 border-[#578E8F] text-[#578E8F] rounded-full flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined">mail</span>
                        </div>
                        <h4 className="text-xl font-bold text-[#111817] dark:text-white mb-2">mail@appzeto.id</h4>
                        <p className="text-[#618983] dark:text-gray-300 text-xs text-center px-4">
                            Send us your queries anytime.
                        </p>
                    </div>

                    {/* Location Card */}
                    <div className="bg-white dark:bg-[#111817] p-8 rounded-3xl flex flex-col items-center justify-center text-center shadow-md border border-gray-100 dark:border-gray-800">
                        <div className="w-12 h-12 border-2 border-gray-300 dark:border-gray-600 text-gray-400 rounded-full flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined">location_on</span>
                        </div>
                        <h4 className="text-xl font-bold text-[#111817] dark:text-white mb-2">London Eye London</h4>
                        <p className="text-[#618983] dark:text-gray-400 text-xs text-center px-4">
                            123 Tech Street, Innovation City.
                        </p>
                    </div>
                </div>

                {/* Map Section */}
                <div className="mt-8 relative w-full h-80 rounded-3xl overflow-hidden shadow-lg">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093706!2d144.9537353153166!3d-37.816279742021665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d30f3a531776!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1645432543599!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        className="filter grayscale contrast-125 opacity-90 hover:grayscale-0 transition-all duration-500"
                    ></iframe>
                    {/* Floating Map Label (Mockup of what's in image) */}
                    <div className="absolute top-4 left-4 bg-white dark:bg-[#111817] p-3 rounded-xl shadow-lg flex items-center gap-3">
                        <div className="bg-red-500 text-white p-1 rounded-full">
                            <span className="material-symbols-outlined text-sm">location_on</span>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-[#111817] dark:text-white">London Eye</p>
                            <p className="text-[10px] text-gray-500">4.5 Stars</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <footer className="bg-[#578E8F] dark:bg-[#023638] text-white pt-16 pb-8 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                    <div className="col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-2xl">terminal</span>
                            <span className="font-bold text-xl">Appzeto</span>
                        </div>
                        <p className="text-white/80 text-sm leading-relaxed mb-6">
                            Building the future of digital infrastructure.
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">location_on</span>
                            <span className="text-sm">London Eye, London UK</span>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Navigation</h4>
                        <ul className="space-y-2 text-sm text-white/80">
                            <li><a href="#" className="hover:text-white">Home</a></li>
                            <li><a href="#" className="hover:text-white">Pages</a></li>
                            <li><a href="#" className="hover:text-white">About Us</a></li>
                            <li><a href="#" className="hover:text-white">Services</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Quick Link</h4>
                        <ul className="space-y-2 text-sm text-white/80">
                            <li><a href="#" className="hover:text-white">Contact Us</a></li>
                            <li><a href="#" className="hover:text-white">FAQs</a></li>
                            <li><a href="#" className="hover:text-white">Booking</a></li>
                            <li><a href="#" className="hover:text-white">Pages</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Services</h4>
                        <div className="flex flex-col gap-3 text-sm text-white/80">
                            <a href="#" className="hover:text-white flex items-center gap-2"><span className="material-symbols-outlined text-sm">call</span> (+876) 765 665</a>
                            <a href="#" className="hover:text-white flex items-center gap-2"><span className="material-symbols-outlined text-sm">mail</span> mail@appzeto.id</a>
                            <div className="flex gap-4 mt-2">
                                <span className="material-symbols-outlined cursor-pointer hover:scale-110 transition-transform">public</span>
                                <span className="material-symbols-outlined cursor-pointer hover:scale-110 transition-transform">videocam</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/20 pt-8 text-center text-xs text-white/60">
                    <p>© 2023 Appzeto Template - All Rights Reserved</p>
                </div>
            </footer>
        </div>
    );
};

export default ContactUs;
