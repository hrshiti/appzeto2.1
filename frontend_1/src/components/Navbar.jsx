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
                                title: "Solutions",
                                description: "Comprehensive tech solutions for enterprise growth.",
                                items: ["Enterprise AI", "Cloud Infrastructure", "Data Analytics", "Cybersecurity", "IoT Ecosystem"]
                            },
                            {
                                title: "Services",
                                description: "End-to-end development and specialized services.",
                                items: ["Custom Software", "Mobile Development", "UI/UX Design", "QA & Testing", "DevOps Services"]
                            },
                            {
                                title: "Portfolio",
                                description: "Explore our success stories and impact.",
                                items: ["Success Stories", "Case Studies", "Client Testimonials"]
                            },
                            {
                                title: "Careers",
                                description: "Join our team of innovators and creators.",
                                items: ["Open Positions", "Life at Appzeto", "Internships"]
                            },
                            {
                                title: "Contact Us",
                                description: "Get in touch with our global team.",
                                items: ["Sales Inquiry", "Technical Support", "Office Locations"]
                            }
                        ].map((navItem, index) => (
                            <div key={index} className="group static h-full flex items-center px-4">
                                <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-primary font-medium transition-colors focus:outline-none h-full border-b-2 border-transparent group-hover:border-primary">
                                    <span>{navItem.title}</span>
                                    <span className="material-icons text-sm transition-transform duration-200 group-hover:-rotate-180">expand_more</span>
                                </button>
                                <div className="absolute top-20 left-0 w-full bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-700 transform origin-top -translate-y-10 group-hover:translate-y-0 z-50">
                                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                                        <div className="flex">
                                            <div className="w-1/4 pr-8 border-r border-gray-100 dark:border-gray-800 transform opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out delay-100">
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{navItem.title}</h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                                    {navItem.description}
                                                </p>
                                                <a href="#" className="inline-flex items-center mt-4 text-sm font-semibold text-primary hover:text-teal-600">
                                                    View Overview <span className="material-icons text-sm ml-1">arrow_forward</span>
                                                </a>
                                            </div>
                                            <div className="w-3/4 pl-8">
                                                <div className="grid grid-cols-3 gap-y-4 gap-x-8">
                                                    {navItem.items.map((subItem, subIndex) => (
                                                        <a
                                                            key={subIndex}
                                                            href="#"
                                                            className="group/item mobile:block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                                        >
                                                            <div
                                                                className="flex items-start space-x-3 transform opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out"
                                                                style={{ transitionDelay: `${subIndex * 150 + 300}ms` }}
                                                            >
                                                                <div className="flex-shrink-0">
                                                                    <span className="material-icons text-gray-400 group-hover/item:text-primary transition-colors">chevron_right</span>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover/item:text-primary transition-colors">{subItem}</p>
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
                            <a className="bg-primary hover:bg-teal-600 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg shadow-primary/30" href="#">
                                Let's Chit Chat
                            </a>
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
