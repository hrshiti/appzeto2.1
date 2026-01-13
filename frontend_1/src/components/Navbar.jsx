import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';
import { dataService } from '../admin/services/dataService';

const NAV_ITEMS = [
    {
        title: "Home",
        path: "/",
        description: "Return to our starting point and core information.",
        items: []
    },
    {
        title: "Services",
        path: "/services",
        description: "End-to-end development and specialized services.",
        items: [
            { label: "Web Development", link: "/services#web-dev" },
            { label: "App Development", link: "/services#app-dev" },
            { label: "AI & Machine Learning", link: "/services#ai-ml" },
            { label: "DevOps & Cloud", link: "/services#devops" }
        ]
    },
    {
        title: "Products",
        path: "/appzeto-food",
        description: "Ready-to-deploy white-label solutions for your business.",
        items: [
            { label: "Food Delivery", link: "/appzeto-food" },
            { label: "Taxi Booking", link: "/appzeto-taxi" },
            { label: "Ecommerce", link: "/appzeto-ecommerce" },
            { label: "Hospital Management", link: "/appzeto-hospital" }
        ]
    },
    {
        title: "Projects",
        path: "/projects",
        description: "A showcase of our most ambitious digital transformations.",
        items: []
    },
    {
        title: "Blogs",
        path: "/blogs",
        description: "Insights, updates, and articles from our expert team.",
        items: []
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
        title: "About Us",
        path: "/about",
        description: "Discover our story, mission, and the team behind the technology.",
        items: [
            { label: "Who We Are", link: "/about#we-are-appzeto" },
            { label: "Leadership", link: "/about#meet-our-team" },
            { label: "Global Offices", link: "/about#offices" },
            { label: "Contact Us", link: "/contact#contact-form" }
        ]
    }
];

// -- Animations --
const menuContainerVars = {
    initial: {
        x: '100%',
    },
    animate: {
        x: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    },
    exit: {
        x: '100%',
        transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
            staggerChildren: 0.05,
            staggerDirection: -1
        }
    }
};

const mobileLinkVars = {
    initial: {
        y: 30,
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    },
    exit: {
        y: 30,
        opacity: 0,
        transition: {
            duration: 0.3
        }
    }
};

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isBlasting, setIsBlasting] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeMobileSubmenu, setActiveMobileSubmenu] = useState(null);
    const [dynamicItems, setDynamicItems] = useState(NAV_ITEMS);

    useEffect(() => {
        loadDynamicData();
    }, []);

    const loadDynamicData = async () => {
        try {
            const [services, products, projects, blogs] = await Promise.all([
                dataService.getServices(),
                dataService.getProducts(),
                dataService.getProjects(),
                dataService.getBlogs()
            ]);

            const updatedNav = NAV_ITEMS.map(item => {
                // Dynamically update Services
                if (item.title === "Services" && services) {
                    return {
                        ...item,
                        items: services.map(s => ({ label: s.title, link: `/services#${s.slug}` }))
                    };
                }
                // Dynamically update Products
                if (item.title === "Products" && products && products.length > 0) {
                    return {
                        ...item,
                        items: products.map(p => ({
                            label: p.title,
                            link: p.slug ? `/appzeto-${p.slug}` : `/appzeto-food` // Fallback or strict slug usage
                        }))
                    };
                }
                // Skip Projects and Blogs -> they remain static (empty for direct links)
                return item;
            });

            setDynamicItems(updatedNav);
        } catch (err) {
            console.error("Failed to load navbar dynamic data", err);
        }
    };

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none'; // Safer for iOS
        } else {
            document.body.style.overflow = 'unset';
            document.body.style.touchAction = 'auto';
            setActiveMobileSubmenu(null);
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.touchAction = 'auto';
        };
    }, [isMobileMenuOpen]);

    const handleChitChat = (e) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        setIsBlasting(true);
        setTimeout(() => {
            navigate('/chit-chat#chitchat-form');
            setIsBlasting(false);
        }, 500);
    };

    const handleLinkClick = (path) => {
        setIsMobileMenuOpen(false);
        if (!path) return;

        if (window.location.pathname === path.split('#')[0]) {
            if (path.includes('#')) {
                const id = path.split('#')[1];
                setTimeout(() => {
                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                }, 300);
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } else {
            navigate(path);
        }
    };

    const toggleMobileSubmenu = (index) => {
        setActiveMobileSubmenu(activeMobileSubmenu === index ? null : index);
    };

    return (
        <>
            <nav className="sticky top-0 z-50 w-full bg-transparent md:bg-white/95 md:dark:bg-[#023638]/95 backdrop-blur-md border-b border-transparent md:border-gray-200 md:dark:border-gray-800 transition-all duration-300 pt-[env(safe-area-inset-top)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center relative group/logo isolate z-[70]">
                            <Link to="/" className="relative z-10 block" onClick={() => handleLinkClick("/")}>
                                <img alt="Appzeto Logo" className="h-7 md:h-10 w-auto" src={logo} />
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center h-full">
                            {dynamicItems.map((navItem, index) => (
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
                                        <div className="absolute top-20 left-0 w-full bg-white dark:bg-[#023638] border-t border-gray-100 dark:border-gray-800 shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-500 transform origin-top -translate-y-4 group-hover:translate-y-0 z-50">
                                            <div className="absolute -top-4 left-0 w-full h-4 bg-transparent" />
                                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                                                <div className="flex">
                                                    <div className="w-1/4 pr-8 border-r border-gray-100 dark:border-gray-800 transform opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out delay-100">
                                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{navItem.title}</h3>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                                            {navItem.description}
                                                        </p>

                                                    </div>
                                                    <div className="w-3/4 pl-8">
                                                        <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                                            {navItem.items.map((subItem, subIndex) => (
                                                                <Link
                                                                    key={subIndex}
                                                                    to={typeof subItem === 'object' ? subItem.link : "#"}
                                                                    className="group/item mobile:block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                                                                    onClick={() => handleLinkClick(typeof subItem === 'object' ? subItem.link : "#")}
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
                            <div className="pl-4 ml-2 border-l border-gray-200 dark:border-gray-700 h-12 flex items-center relative group/btn">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative p-[2px] rounded-xl overflow-hidden shadow-lg shadow-[#05A4A7]/20"
                                >
                                    {/* Moving Border Beam (Fixed All-Side Flow) */}
                                    <div className="absolute inset-0 z-0">
                                        <motion.div
                                            animate={{ rotate: [360, 0] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600%] h-[600%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_340deg,#05A4A7_355deg,#05A4A7_360deg)] opacity-100 blur-[1px]"
                                        />
                                    </div>

                                    <Link
                                        className="relative z-10 flex items-center justify-center px-6 py-2 bg-gradient-to-r from-[#05A4A7] to-[#037A7C] text-white font-black rounded-[10px] overflow-hidden whitespace-nowrap"
                                        to="/chit-chat#chitchat-form"
                                        onClick={handleChitChat}
                                    >
                                        Let's Chit Chat
                                    </Link>
                                </motion.div>
                            </div>
                        </div>

                        {/* Mobile Menu Button - PREMIUM Animated Icon */}
                        <div className="md:hidden flex items-center z-[70] gap-3">
                            <Link
                                to="/contact"
                                className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20"
                            >
                                Inquiry
                            </Link>
                            <button
                                className="text-gray-900 dark:text-white hover:text-primary focus:outline-none p-1.5 relative w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/10"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                <div className="flex flex-col justify-center items-center w-6 h-6 gap-[5px]">
                                    <motion.span
                                        animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                                        className="w-6 h-0.5 bg-current rounded-full origin-center transition-all duration-300"
                                    />
                                    <motion.span
                                        animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                                        className="w-4 h-0.5 bg-current rounded-full origin-center transition-all duration-300"
                                    />
                                    <motion.span
                                        animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                                        className="w-6 h-0.5 bg-current rounded-full origin-center transition-all duration-300"
                                    />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>


            {/* Mobile Menu Overlay - Portal to Body for Reliability */}
            {createPortal(
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            variants={menuContainerVars}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="fixed inset-0 z-[9999] bg-[#f6f8f8] dark:bg-[#012829] flex flex-col md:hidden overflow-hidden"
                            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh' }}
                        >
                            {/* Background Accent */}
                            <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
                            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

                            {/* Mobile Header with Close Button */}
                            <div className="flex-shrink-0 pt-[env(safe-area-inset-top)] border-b border-gray-200/50 dark:border-gray-700/50 relative z-20 bg-white/50 dark:bg-black/20 backdrop-blur-md">
                                <div className="h-20 px-4 sm:px-6 flex items-center justify-between">
                                    <img alt="Appzeto Logo" className="h-8 w-auto" src={logo} />
                                    <button
                                        className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-600 dark:text-white"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <span className="material-symbols-outlined">close</span>
                                    </button>
                                </div>
                            </div>

                            {/* Mobile Navigation List */}
                            <motion.div className="flex-1 overflow-y-auto px-6 py-2 space-y-2 relative z-10 custom-scrollbar">
                                {dynamicItems.map((item, index) => (
                                    <motion.div key={index} variants={mobileLinkVars} className="border-b border-gray-200/50 dark:border-gray-700/50 last:border-0 pb-2">
                                        <div
                                            className="flex items-center justify-between py-2 cursor-pointer group"
                                            onClick={() => item.items.length > 0 ? toggleMobileSubmenu(index) : handleLinkClick(item.path)}
                                        >
                                            <div className="flex flex-col">
                                                <span className={`text-lg font-sans font-bold transition-colors ${activeMobileSubmenu === index || location.pathname === item.path ? 'text-primary' : 'text-gray-800 dark:text-gray-100 group-hover:text-primary'}`}>
                                                    {item.title}
                                                </span>
                                                {activeMobileSubmenu === index && (
                                                    <motion.p
                                                        initial={{ opacity: 0, y: -5 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="text-xs text-gray-500 mt-0.5 dark:text-gray-400"
                                                    >
                                                        {item.description}
                                                    </motion.p>
                                                )}
                                            </div>
                                            {item.items.length > 0 && (
                                                <div className={`w-7 h-7 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center transition-all duration-300 ${activeMobileSubmenu === index ? 'bg-primary border-primary text-white rotate-180' : 'text-gray-400 group-hover:border-primary group-hover:text-primary'}`}>
                                                    <span className="material-symbols-outlined text-sm">expand_more</span>
                                                </div>
                                            )}
                                        </div>

                                        <AnimatePresence>
                                            {activeMobileSubmenu === index && item.items.length > 0 && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden pl-4 mt-2 space-y-1 border-l-2 border-primary/20"
                                                >
                                                    {item.items.map((subItem, subIndex) => (
                                                        <motion.div
                                                            key={subIndex}
                                                            initial={{ x: -10, opacity: 0 }}
                                                            animate={{ x: 0, opacity: 1 }}
                                                            transition={{ delay: subIndex * 0.05 }}
                                                        >
                                                            <Link
                                                                to={subItem.link}
                                                                className="block py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary transition-all flex items-center gap-2"
                                                                onClick={() => handleLinkClick(subItem.link)}
                                                            >
                                                                <span className="w-1 h-1 bg-primary rounded-full opacity-50" />
                                                                {subItem.label}
                                                            </Link>
                                                        </motion.div>
                                                    ))}
                                                    <Link
                                                        to={item.path}
                                                        className="block py-2 mt-1 text-xs font-bold text-primary flex items-center gap-2 uppercase tracking-wide"
                                                        onClick={() => handleLinkClick(item.path)}
                                                    >
                                                        Explore All {item.title} <span className="material-symbols-outlined text-[10px]">arrow_forward</span>
                                                    </Link>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Mobile Footer Area */}
                            <motion.div
                                variants={mobileLinkVars}
                                className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-black/20 backdrop-blur-lg mt-auto relative z-20"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="relative p-[2px] rounded-xl overflow-hidden shadow-xl"
                                >
                                    {/* Moving Border Beam (Fixed All-Side Flow) */}
                                    <div className="absolute inset-0 z-0">
                                        <motion.div
                                            animate={{ rotate: [360, 0] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600%] h-[600%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_340deg,#05A4A7_355deg,#05A4A7_360deg)] opacity-100 blur-[1px]"
                                        />
                                    </div>

                                    <Link
                                        to="/chit-chat#chitchat-form"
                                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#05A4A7] to-[#037A7C] py-3 rounded-[10px] text-white font-black uppercase tracking-wide relative z-10 text-sm"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleLinkClick("/chit-chat#chitchat-form");
                                            handleChitChat(e);
                                        }}
                                    >
                                        Let's Chit Chat
                                        <span className="material-symbols-outlined text-lg">chat</span>
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
};

export default Navbar;
