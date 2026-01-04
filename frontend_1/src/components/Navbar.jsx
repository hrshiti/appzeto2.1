import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

const NAV_ITEMS = [
    {
        title: "Home",
        path: "/",
        description: "Return to our starting point and core information.",
        items: [] // Home doesn't strictly need sub-items for overview in this context, but keeping structure
    },
    {
        title: "Services",
        path: "/services",
        description: "End-to-end development and specialized services.",
        items: [
            { label: "Website", link: "/services/website" },
            { label: "Web App", link: "/services/web-app" },
            { label: "Mobile Application", link: "/services/mobile-application" },
            { label: "UI/UX Design", link: "/services/ui-ux-design" },
            { label: "Maintenance", link: "/services/maintenance" },
            { label: "Digital Marketing", link: "/services/digital-marketing" },
            { label: "SEO Services", link: "/services/seo-services" },
            { label: "Logo Design", link: "/services/logo-design" },
            { label: "Graphic Design", link: "/services/graphic-design" }
        ]
    },
    {
        title: "Blogs",
        path: "/blogs",
        description: "Insights, updates, and articles from our expert team.",
        items: [
            { label: "Latest News", link: "/blogs" },
            { label: "Tech Trends", link: "/blogs" },
            { label: "Case Breakdowns", link: "/blogs" }
        ]
    },
    {
        title: "Careers",
        path: "/career",
        description: "Join our team of innovators and creators.",
        items: [
            { label: "Open Positions", link: "/career#positions" },
            { label: "Life at Appzeto", link: "/career#culture" },
            { label: "Internships", link: "/career#internship" }
        ]
    },
    {
        title: "Contact Us",
        path: "/contact",
        description: "Get in touch with our global team.",
        items: [
            { label: "Sales Inquiry", link: "/contact#sales" },
            { label: "Technical Support", link: "/contact#support" },
            { label: "Office Locations", link: "/contact#locations" }
        ]
    }
];

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isBlasting, setIsBlasting] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeMobileSubmenu, setActiveMobileSubmenu] = useState(null);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setActiveMobileSubmenu(null);
        }
    }, [isMobileMenuOpen]);

    const handleChitChat = (e) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        setIsBlasting(true);
        setTimeout(() => {
            navigate('/chit-chat');
            setIsBlasting(false);
        }, 500);
    };

    const handleLinkClick = (path) => {
        setIsMobileMenuOpen(false);
        if (path && window.location.pathname === path) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        // Handle hash links if any
        if (path && path.includes('#')) {
            const id = path.split('#')[1];
            if (window.location.pathname === path.split('#')[0]) {
                setTimeout(() => {
                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                }, 300);
            }
        }
    };

    const toggleMobileSubmenu = (index) => {
        setActiveMobileSubmenu(activeMobileSubmenu === index ? null : index);
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-white dark:bg-surface-dark border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex-shrink-0 flex items-center relative group/logo isolate">
                        {/* Orbit System - Clean 2D Animation */}
                        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
                            {/* Rotating Container */}
                            <div className="w-[180%] h-[180%] absolute animate-orbit-ring flex items-center justify-center">
                                {/* Rocket Positioned on the edge */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5">
                                    {/* Rocket Icon - Rotated to face direction of travel (Tangent) */}
                                    <div className="transform rotate-90">
                                        <svg viewBox="0 0 24 24" className="w-full h-full fill-primary" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.13 22.19L11.5 18.36C12.59 18.19 13.58 17.65 14.38 16.91L13.13 22.19ZM5.64 12.5L1.81 10.87L7.09 9.62C6.35 10.42 5.81 11.41 5.64 12.5ZM21.61 2.39C21.61 2.39 16.66 2.14 11.26 7.55C8.94 9.87 7.76 12.63 7.76 12.63L11.37 16.24C11.37 16.24 14.13 15.06 16.45 12.74C21.86 7.34 21.61 2.39 21.61 2.39ZM13.06 13.92C12.18 13.92 11.47 13.21 11.47 12.33C11.47 11.45 12.18 10.74 13.06 10.74C13.94 10.74 14.65 11.45 14.65 12.33C14.65 13.21 13.94 13.92 13.06 13.92Z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Link to="/" className="relative z-10" onClick={() => handleLinkClick("/")}>
                            <img alt="Appzeto Logo" className="h-10 w-auto" src={logo} />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center h-full">
                        {NAV_ITEMS.map((navItem, index) => (
                            <div key={index} className="group static h-full flex items-center px-4">
                                <Link
                                    to={navItem.path || "#"}
                                    className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-primary font-medium transition-colors focus:outline-none h-full border-b-2 border-transparent group-hover:border-primary"
                                    onClick={(e) => {
                                        if (navItem.path && window.location.pathname === navItem.path) {
                                            e.preventDefault();
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }
                                    }}
                                >
                                    <span>{navItem.title}</span>
                                    {navItem.items.length > 0 && <span className="material-symbols-outlined text-sm transition-transform duration-200 group-hover:-rotate-180">expand_more</span>}
                                </Link>
                                {navItem.items.length > 0 && (
                                    <div className="absolute top-20 left-0 w-full bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800 shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-500 transform origin-top -translate-y-4 group-hover:translate-y-0 z-50">
                                        {/* Bridge to prevent flickering */}
                                        <div className="absolute -top-4 left-0 w-full h-4 bg-transparent" />
                                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                                            <div className="flex">
                                                <div className="w-1/4 pr-8 border-r border-gray-100 dark:border-gray-800 transform opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out delay-100">
                                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{navItem.title}</h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                                        {navItem.description}
                                                    </p>
                                                    <Link
                                                        to={navItem.path || "#"}
                                                        className="inline-flex items-center mt-4 text-sm font-semibold text-primary hover:text-teal-600"
                                                        onClick={(e) => {
                                                            if (navItem.path && window.location.pathname === navItem.path) {
                                                                e.preventDefault();
                                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                                            }
                                                        }}
                                                    >
                                                        View Details <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                                                    </Link>
                                                </div>
                                                <div className="w-3/4 pl-8">
                                                    <div className="grid grid-cols-3 gap-y-4 gap-x-8">
                                                        {navItem.items.map((subItem, subIndex) => (
                                                            <Link
                                                                key={subIndex}
                                                                to={typeof subItem === 'object' ? subItem.link : "#"}
                                                                className="group/item mobile:block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                                                onClick={(e) => {
                                                                    if (typeof subItem === 'object' && subItem.link.includes('#')) {
                                                                        const id = subItem.link.split('#')[1];
                                                                        if (window.location.pathname === subItem.link.split('#')[0]) {
                                                                            e.preventDefault();
                                                                            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                                                                        }
                                                                    }
                                                                }}
                                                            >
                                                                <div
                                                                    className="flex items-start space-x-3 transform opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out"
                                                                    style={{ transitionDelay: `${subIndex * 150 + 300}ms` }}
                                                                >
                                                                    <div className="flex-shrink-0">
                                                                        <span className="material-symbols-outlined text-gray-400 group-hover/item:text-primary transition-colors">chevron_right</span>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover/item:text-primary transition-colors">
                                                                            {typeof subItem === 'object' ? subItem.label : subItem}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="pl-4 ml-2 border-l border-gray-200 dark:border-gray-700 h-10 flex items-center relative group/btn">
                            {/* Blast Ring */}
                            {isBlasting && (
                                <div className="absolute inset-0 bg-[#F1FC88] rounded-full animate-blast-ring z-0 pointer-events-none"></div>
                            )}
                            <Link
                                className={`bg-[#F1FC88] hover:bg-[#EAF576] text-gray-900 px-6 py-2.5 rounded-full font-bold transition-all shadow-lg shadow-[#F0FF35]/20 relative z-10 ${isBlasting ? 'animate-blast-content' : ''}`}
                                to="/chit-chat"
                                onClick={handleChitChat}
                            >
                                Let's Chit Chat
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            className="text-gray-600 dark:text-gray-300 hover:text-primary focus:outline-none p-2"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <span className="material-symbols-outlined text-3xl">menu</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed inset-0 z-[60] bg-white h-screen w-screen flex flex-col md:hidden overflow-hidden"
                    >
                        {/* Mobile Header */}
                        <div className="flex justify-between items-center h-20 px-4 sm:px-6 border-b border-gray-100">
                            <div className="flex-shrink-0 flex items-center">
                                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                                    <img alt="Appzeto Logo" className="h-8 w-auto" src={logo} />
                                </Link>
                            </div>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        {/* Mobile Navigation List */}
                        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
                            {NAV_ITEMS.map((item, index) => (
                                <div key={index} className="border-b border-gray-50 last:border-0 pb-2">
                                    <div
                                        className="flex items-center justify-between py-3 px-2 cursor-pointer hover:bg-gray-50 rounded-lg"
                                        onClick={() => item.items.length > 0 ? toggleMobileSubmenu(index) : handleLinkClick(item.path)}
                                    >
                                        <span className={`text-lg font-bold ${activeMobileSubmenu === index || location.pathname === item.path ? 'text-primary' : 'text-gray-800'}`}>
                                            {item.title}
                                        </span>
                                        {item.items.length > 0 && (
                                            <span className={`material-symbols-outlined text-gray-400 transition-transform duration-300 ${activeMobileSubmenu === index ? 'rotate-180' : ''}`}>
                                                expand_more
                                            </span>
                                        )}
                                    </div>

                                    {/* Submenu */}
                                    <AnimatePresence>
                                        {activeMobileSubmenu === index && item.items.length > 0 && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden bg-gray-50 rounded-xl mt-1"
                                            >
                                                {item.items.map((subItem, subIndex) => (
                                                    <Link
                                                        key={subIndex}
                                                        to={subItem.link}
                                                        className="block py-3 px-6 text-sm font-medium text-gray-600 hover:text-primary border-l-2 border-transparent hover:border-primary hover:bg-gray-100/50 transition-all"
                                                        onClick={() => handleLinkClick(subItem.link)}
                                                    >
                                                        {subItem.label}
                                                    </Link>
                                                ))}
                                                {/* Allow going to the main section page as well if it has one */}
                                                <Link
                                                    to={item.path}
                                                    className="block py-3 px-6 text-sm font-bold text-primary flex items-center gap-2 border-t border-gray-200/50 mt-1"
                                                    onClick={() => handleLinkClick(item.path)}
                                                >
                                                    View All {item.title} <span className="material-symbols-outlined text-xs">arrow_forward</span>
                                                </Link>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>

                        {/* Mobile Footer Area */}
                        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                            <Link
                                to="/chit-chat"
                                className="w-full flex items-center justify-center gap-3 bg-[#F1FC88] py-4 rounded-xl text-gray-900 font-bold uppercase tracking-wide shadow-lg hover:shadow-xl transition-all active:scale-95"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLinkClick();
                                    handleChitChat(e);
                                }}
                            >
                                Let's Chit Chat
                                <span className="material-symbols-outlined">chat</span>
                            </Link>

                            <div className="flex justify-center gap-6 mt-6">
                                {/* Social Icons simplified */}
                                <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 shadow-sm border border-gray-100"><i className="material-symbols-outlined text-lg">mail</i></span>
                                <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 shadow-sm border border-gray-100"><i className="material-symbols-outlined text-lg">call</i></span>
                            </div>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
