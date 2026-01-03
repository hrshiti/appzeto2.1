import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 w-full bg-white dark:bg-surface-dark border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/">
                            <img alt="Appzeto Logo" className="h-10 w-auto" src={logo} />
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center h-full">
                        {[
                            {
                                title: "Home",
                                path: "/",
                                description: "Return to our starting point and core information.",
                                items: ["Overview", "Welcome", "Highlights"]
                            },
                            {
                                title: "Services",
                                path: "/services",
                                description: "End-to-end development and specialized services.",
                                items: [
                                    { label: "Website", link: "/services" },
                                    { label: "Web App", link: "/services" },
                                    { label: "Mobile Application", link: "/services" },
                                    { label: "UI/UX Design", link: "/services" },
                                    { label: "Maintenance", link: "/services" },
                                    { label: "Digital Marketing", link: "/services" },
                                    { label: "SEO Services", link: "/services" },
                                    { label: "Logo Design", link: "/services" },
                                    { label: "Graphic Design", link: "/services" }
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
                        ]
                            .map((navItem, index) => (
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
                                        <span className="material-icons text-sm transition-transform duration-200 group-hover:-rotate-180">expand_more</span>
                                    </Link>
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
                                                        View Details <span className="material-icons text-sm ml-1">arrow_forward</span>
                                                    </Link>
                                                </div>
                                                <div className="w-3/4 pl-8">
                                                    <div className="grid grid-cols-3 gap-y-4 gap-x-8">
                                                        {navItem.items.map((subItem, subIndex) => (
                                                            <a
                                                                key={subIndex}
                                                                href={typeof subItem === 'object' ? subItem.link : "#"}
                                                                className="group/item mobile:block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                                                onClick={(e) => {
                                                                    if (typeof subItem === 'object' && subItem.link.includes('#')) {
                                                                        const id = subItem.link.split('#')[1];
                                                                        if (window.location.pathname === '/contact' || window.location.pathname === '/career') {
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
                                                                        <span className="material-icons text-gray-400 group-hover/item:text-primary transition-colors">chevron_right</span>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover/item:text-primary transition-colors">
                                                                            {typeof subItem === 'object' ? subItem.label : subItem}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        <div className="pl-4 ml-2 border-l border-gray-200 dark:border-gray-700 h-10 flex items-center">
                            <Link className="bg-[#F1FC88] hover:bg-[#EAF576] text-gray-900 px-6 py-2.5 rounded-full font-bold transition-all shadow-lg shadow-[#F0FF35]/20" to="/chit-chat">
                                Let's Chit Chat
                            </Link>
                        </div>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button className="text-gray-600 dark:text-gray-300 hover:text-primary focus:outline-none">
                            <span className="material-icons text-3xl">menu</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
