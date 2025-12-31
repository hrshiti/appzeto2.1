import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#012829] text-white pt-24 pb-10 px-6 relative z-20 border-t border-white/5">
            <div className="max-w-[1280px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="material-symbols-outlined text-3xl text-[#05A4A7]">terminal</span>
                            <span className="font-black text-2xl tracking-tighter uppercase">Appzeto</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xs">
                            Architecting the digital frontier. We build robust, scalable infrastructure for the next generation of innovators.
                        </p>
                        <div className="flex gap-5">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#05A4A7] transition-all duration-300 group">
                                <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform">public</span>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#05A4A7] transition-all duration-300 group">
                                <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform">alternate_email</span>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Platform</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Core Services</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Enterprise Solutions</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Pricing</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">API Docs</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Resources</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Documentation</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Help Center</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Case Studies</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Community</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Connect</h4>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#05A4A7]/20 border border-white/5 transition-all">
                                    <span className="material-symbols-outlined text-[#05A4A7]">mail</span>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase font-black">Email Us</p>
                                    <p className="text-sm font-bold group-hover:text-[#05A4A7] transition-colors">hello@appzeto.io</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#05A4A7]/20 border border-white/5 transition-all">
                                    <span className="material-symbols-outlined text-[#05A4A7]">call</span>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase font-black">Call Us</p>
                                    <p className="text-sm font-bold group-hover:text-[#05A4A7] transition-colors">+1 888 234 5678</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-gray-500 text-xs font-medium">© 2024 APPZETO INFRASTRUCTURE SOLUTIONS. ALL RIGHTS RESERVED.</p>
                    <div className="flex gap-8">
                        <a href="#" className="text-gray-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">Privacy Policy</a>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">Terms</a>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
