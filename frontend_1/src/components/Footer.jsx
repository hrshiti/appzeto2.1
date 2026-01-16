import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { dataService } from '../admin/services/dataService';

const Footer = () => {
    const [settings, setSettings] = useState({
        contactEmail: 'appzeto@gmail.com',
        contactPhone: '+917691810506',
        contactAddress: 'Office No 501, Princess center, 5th Floor, New Palasia, Indore, Madhya Pradesh 452001',
        social: {
            linkedin: 'https://linkedin.com/company/appzeto',
            instagram: 'https://instagram.com/appzeto',
            twitter: 'https://twitter.com/appzeto',
            github: 'https://github.com/appzeto'
        }
    });

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const loadedSettings = await dataService.getSettings();
                if (loadedSettings) {
                    setSettings(prev => ({
                        ...prev,
                        ...loadedSettings,
                        social: {
                            linkedin: loadedSettings.social?.linkedin || prev.social.linkedin,
                            instagram: loadedSettings.social?.instagram || prev.social.instagram,
                            twitter: loadedSettings.social?.twitter || prev.social.twitter,
                            github: loadedSettings.social?.github || prev.social.github
                        }
                    }));
                }
            } catch (err) {
                console.error("Failed to load footer settings", err);
            }
        };
        loadSettings();
    }, []);

    return (
        <footer className="bg-[#012829] text-white pt-10 md:pt-20 pb-24 md:pb-8 px-6 md:px-12 relative z-20 border-t border-white/5 font-sans overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#05A4A7]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 lg:gap-8 mb-10 md:mb-16">
                    {/* Column 1: Brand & Social */}
                    <div className="col-span-2 lg:col-span-1 space-y-6">
                        <Link to="/" className="block w-fit">
                            <img src={logo} alt="Appzeto Logo" className="h-8 md:h-10 w-auto opacity-90 hover:opacity-100 transition-opacity" />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                            Empowering enterprises with next-gen digital solutions. We specialize in bespoke web architecture, mobile ecosystems, and AI-driven automation to transform visionary ideas into scalable reality.
                        </p>

                        <div className="flex items-center gap-4">
                            {/* LinkedIn */}
                            {settings.social.linkedin && (
                                <a href={settings.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-[#0077B5] hover:border-[#0077B5] transition-all duration-300 group">
                                    <svg className="w-4 h-4 text-gray-300 group-hover:text-white fill-current transition-colors" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg>
                                </a>
                            )}
                            {/* Instagram */}
                            {settings.social.instagram && (
                                <a href={settings.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-[#E1306C] hover:border-[#E1306C] transition-all duration-300 group">
                                    <svg className="w-4 h-4 text-gray-300 group-hover:text-white fill-current transition-colors" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                </a>
                            )}
                            {/* Twitter/X */}
                            {settings.social.twitter && (
                                <a href={settings.social.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-black hover:border-gray-600 transition-all duration-300 group">
                                    <svg className="w-4 h-4 text-gray-300 group-hover:text-white fill-current transition-colors" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                </a>
                            )}
                            {/* GitHub */}
                            {settings.social.github && (
                                <a href={settings.social.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-[#333] hover:border-white/20 transition-all duration-300 group">
                                    <svg className="w-4 h-4 text-gray-300 group-hover:text-white fill-current transition-colors" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Column 2: Services & Solutions & Resources */}
                    <div className="flex flex-col gap-8 md:gap-10">
                        <div>
                            <h4 className="text-white font-bold mb-4 md:mb-6 uppercase tracking-wider text-xs border-l-2 border-[#05A4A7] pl-3">Services</h4>
                            <ul className="space-y-3">
                                <li><Link to="/services/website" className="text-gray-400 hover:text-[#05A4A7] transition-colors text-sm font-medium flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-[#05A4A7] transition-colors"></span> Web Development
                                </Link></li>
                                <li><Link to="/services/mobile-application" className="text-gray-400 hover:text-[#05A4A7] transition-colors text-sm font-medium flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-[#05A4A7] transition-colors"></span> Mobile App Development
                                </Link></li>
                                <li><Link to="/services/ai-machine-learning" className="text-gray-400 hover:text-[#05A4A7] transition-colors text-sm font-medium flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-[#05A4A7] transition-colors"></span> AI & ML Solutions
                                </Link></li>
                                <li><Link to="/services/devops-cloud" className="text-gray-400 hover:text-[#05A4A7] transition-colors text-sm font-medium flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-[#05A4A7] transition-colors"></span> DevOps & Cloud
                                </Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4 md:mb-6 uppercase tracking-wider text-xs border-l-2 border-[#05A4A7] pl-3">Resources</h4>
                            <ul className="space-y-3">
                                <li><Link to="/contact#contact-form" className="text-gray-400 hover:text-[#05A4A7] transition-colors text-sm font-medium flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-[#05A4A7] transition-colors"></span> Support
                                </Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Column 3: Company */}
                    <div className="flex flex-col gap-8 md:gap-10">
                        <div>
                            <h4 className="text-white font-bold mb-4 md:mb-6 uppercase tracking-wider text-xs border-l-2 border-[#05A4A7] pl-3">Company</h4>
                            <ul className="space-y-3">
                                <li><Link to="/about" className="text-gray-400 hover:text-[#05A4A7] transition-colors text-sm font-medium flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-[#05A4A7] transition-colors"></span> About Us
                                </Link></li>
                                <li><Link to="/career" className="text-gray-400 hover:text-[#05A4A7] transition-colors text-sm font-medium flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-[#05A4A7] transition-colors"></span> Careers
                                </Link></li>
                                <li><Link to="/projects" className="text-gray-400 hover:text-[#05A4A7] transition-colors text-sm font-medium flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-[#05A4A7] transition-colors"></span> Projects
                                </Link></li>
                                <li><Link to="/blogs" className="text-gray-400 hover:text-[#05A4A7] transition-colors text-sm font-medium flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-[#05A4A7] transition-colors"></span> Blog / Insights
                                </Link></li>
                                <li><Link to="/contact#contact-form" className="text-gray-400 hover:text-[#05A4A7] transition-colors text-sm font-medium flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-[#05A4A7] transition-colors"></span> Contact Us
                                </Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Column 4: Technologies & Content */}
                    <div className="col-span-2 lg:col-span-1 flex flex-col gap-8 md:gap-10">
                        <div>
                            <h4 className="text-white font-bold mb-4 md:mb-6 uppercase tracking-wider text-xs border-l-2 border-[#05A4A7] pl-3">Technologies</h4>
                            <div className="flex flex-wrap gap-2">
                                {['React / Next.js', 'Node.js', 'MongoDB', 'Flutter', 'AWS / Cloud', 'AI & ML'].map((tech) => (
                                    <span key={tech} className="px-3 py-1 bg-white/5 rounded-md text-[11px] font-medium text-gray-300 border border-white/5 hover:border-[#05A4A7]/50 hover:text-[#05A4A7] transition-colors cursor-default">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-4 md:mb-6 uppercase tracking-wider text-xs border-l-2 border-[#05A4A7] pl-3">Contact Us</h4>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3 group">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex flex-shrink-0 items-center justify-center border border-white/5 group-hover:border-[#05A4A7]/50 group-hover:bg-[#05A4A7]/10 transition-colors">
                                        <span className="material-symbols-outlined text-[#05A4A7] text-lg">mail</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase font-black tracking-wide">Email</p>
                                        <a href={`mailto:${settings.contactEmail}`} className="text-sm font-bold text-white group-hover:text-[#05A4A7] transition-colors block">{settings.contactEmail}</a>
                                        <a href="mailto:support@appzeto.com" className="text-sm font-bold text-white group-hover:text-[#05A4A7] transition-colors block mt-1">support@appzeto.com</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 group">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex flex-shrink-0 items-center justify-center border border-white/5 group-hover:border-[#05A4A7]/50 group-hover:bg-[#05A4A7]/10 transition-colors">
                                        <span className="material-symbols-outlined text-[#05A4A7] text-lg">call</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase font-black tracking-wide">Phone</p>
                                        <a href={`tel:${settings.contactPhone.replace(/\D/g, '')}`} className="text-sm font-bold text-white group-hover:text-[#05A4A7] transition-colors block">{settings.contactPhone}</a>
                                        <a href="tel:6375095971" className="text-sm font-bold text-white group-hover:text-[#05A4A7] transition-colors block mt-1">+91 6375095971</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 group">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex flex-shrink-0 items-center justify-center border border-white/5 group-hover:border-[#05A4A7]/50 group-hover:bg-[#05A4A7]/10 transition-colors">
                                        <span className="material-symbols-outlined text-[#05A4A7] text-lg">location_on</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase font-black tracking-wide">Location</p>
                                        <p className="text-sm font-bold text-white group-hover:text-[#05A4A7] transition-colors leading-tight">{settings.contactAddress}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Follow Us - Added as per request below Location */}
                            <div className="pt-4 mt-2 border-t border-white/5">
                                <p className="text-[10px] text-gray-500 uppercase font-black tracking-wide mb-3">Follow Us</p>
                                <div className="flex items-center gap-3">
                                    {/* LinkedIn */}
                                    {settings.social.linkedin && (
                                        <a href={settings.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center hover:bg-[#0077B5] hover:border-[#0077B5] transition-all duration-300 group">
                                            <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-white fill-current transition-colors" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg>
                                        </a>
                                    )}
                                    {/* Instagram */}
                                    {settings.social.instagram && (
                                        <a href={settings.social.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center hover:bg-[#E1306C] hover:border-[#E1306C] transition-all duration-300 group">
                                            <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-white fill-current transition-colors" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                        </a>
                                    )}
                                    {/* Twitter/X */}
                                    {settings.social.twitter && (
                                        <a href={settings.social.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center hover:bg-black hover:border-gray-600 transition-all duration-300 group">
                                            <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-white fill-current transition-colors" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                        </a>
                                    )}
                                    {/* GitHub */}
                                    {settings.social.github && (
                                        <a href={settings.social.github} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center hover:bg-[#333] hover:border-white/20 transition-all duration-300 group">
                                            <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-white fill-current transition-colors" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                    <p className="text-gray-500 text-xs font-medium text-center md:text-left tracking-wide">
                        © {new Date().getFullYear()} Appzeto. All rights reserved.
                    </p>
                    <div className="flex gap-4 md:gap-6">
                        <Link to="/privacy-policy" className="text-gray-500 hover:text-[#05A4A7] text-xs font-medium transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="text-gray-500 hover:text-[#05A4A7] text-xs font-medium transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer >
    );
};

export default Footer;
