import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Assuming logo exists here based on Hero.jsx
import Navbar from '../components/Navbar';

const AboutUs = () => {
    return (
        <div className="bg-white font-body text-gray-800 selection:bg-primary selection:text-white">
            {/* Navigation - Duplicated/Adapted from Hero.jsx for consistency but can be refactored */}
            <Navbar />

            {/* Hero Section */}
            <header className="relative w-full h-[60vh] flex items-center justify-center bg-gray-900 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
                        alt="Office"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 font-display">ABOUT US</h1>
                    <p className="text-lg md:text-xl font-light text-gray-200 tracking-wide mb-6">
                        Innovating for those who demand excellence, not just solutions.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-primary font-medium">About Us</span>
                    </div>
                </div>
            </header>

            {/* We Are Appzeto Section */}
            <section className="py-24 px-4 md:px-10 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6 font-display tracking-tight">WE ARE APPZETO</h2>
                            <blockquote className="text-xl text-gray-500 italic border-l-4 border-primary pl-4 mb-6">
                                "Technology is best when it brings people together."
                            </blockquote>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Appzeto is a forward-thinking IT solutions provider dedicated to transforming businesses through digital innovation. We specialize in robust Web Development, cutting-edge Mobile Apps, and intelligent AI & ML solutions.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Our philosophy is simple: we don't just build software; we engineer ecosystems. Reliability, scalability, and user-centric design are at the core of everything we create. We partner with you to turn complex challenges into seamless opportunities.
                            </p>
                        </div>

                        <div className="pt-4">
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">LEADERSHIP</p>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Signature_sample.svg" alt="Signature" className="h-12 opacity-60" />
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden relative group">
                            <img
                                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
                                alt="CEO"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
                                <p className="text-white text-xl font-bold">Alex Morgan</p>
                                <p className="text-primary text-sm font-medium">Founder & CEO</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 md:px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 relative">
                            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                                    alt="Team Collaboration"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-xl shadow-xl hidden md:block">
                                <p className="text-4xl font-bold text-primary mb-1">100+</p>
                                <p className="text-gray-500 font-medium">Successful Projects</p>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 space-y-10">
                            <div>
                                <h2 className="text-4xl font-bold text-gray-900 mb-4 font-display">WHY CHOOSE US</h2>
                                <p className="text-gray-600">
                                    We combine technical expertise with business acumen to deliver solutions that actually work.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                                {/* Feature 1 */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <span className="material-icons">lightbulb</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-2">Innovative Strategy</h3>
                                        <p className="text-sm text-gray-500 leading-relaxed">Forward-thinking approaches to solve modern problems.</p>
                                    </div>
                                </div>
                                {/* Feature 2 */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <span className="material-icons">tune</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-2">Easy Customization</h3>
                                        <p className="text-sm text-gray-500 leading-relaxed">Flexible solutions tailored to your specific needs.</p>
                                    </div>
                                </div>
                                {/* Feature 3 */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <span className="material-icons">headset_mic</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-2">24/7 Support</h3>
                                        <p className="text-sm text-gray-500 leading-relaxed">Always here to ensure your operations run smoothly.</p>
                                    </div>
                                </div>
                                {/* Feature 4 */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <span className="material-icons">rocket_launch</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-2">Performance First</h3>
                                        <p className="text-sm text-gray-500 leading-relaxed">Optimized for speed, efficiency, and scalability.</p>
                                    </div>
                                </div>
                                {/* Feature 5 */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <span className="material-icons">security</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-2">Top-Tier Security</h3>
                                        <p className="text-sm text-gray-500 leading-relaxed">Enterprise-grade protection for your data.</p>
                                    </div>
                                </div>
                                {/* Feature 6 */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <span className="material-icons">code</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-2">Clean Development</h3>
                                        <p className="text-sm text-gray-500 leading-relaxed">Maintainable, high-quality code standards.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Meet Our Team */}
            <section className="py-24 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="h-[2px] w-8 bg-primary"></div>
                            <h2 className="text-3xl font-bold text-gray-900 uppercase tracking-widest font-display">MEET OUR TEAM</h2>
                            <div className="h-[2px] w-8 bg-primary"></div>
                        </div>
                        <p className="text-gray-500">The minds behind the magic</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Team Member 1 */}
                        <div className="group relative">
                            <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" alt="Member" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <div className="absolute bottom-0 left-0 w-full bg-white p-6 shadow-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-xl font-bold text-gray-900">David Chen</h3>
                                <p className="text-primary text-sm font-medium mb-3">Lead Developer</p>
                                <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <a href="#" className="text-gray-400 hover:text-primary"><span className="material-icons text-sm">link</span></a>
                                    <a href="#" className="text-gray-400 hover:text-primary"><span className="material-icons text-sm">mail</span></a>
                                </div>
                            </div>
                        </div>

                        {/* Team Member 2 (Center Highlight) */}
                        <div className="group relative md:-mt-8">
                            <div className="aspect-[3/4] overflow-hidden bg-gray-100 shadow-2xl relative z-10">
                                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" alt="Member" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <div className="relative z-20 bg-white mx-4 -mt-12 p-6 shadow-xl text-center border-b-4 border-primary">
                                <h3 className="text-2xl font-bold text-gray-900">Sarah Johnson</h3>
                                <p className="text-primary font-medium mb-4">Project Manager</p>
                                <div className="flex justify-center gap-4">
                                    <a href="#" className="text-gray-400 hover:text-primary"><i className="material-icons text-base">public</i></a>
                                    <a href="#" className="text-gray-400 hover:text-primary"><i className="material-icons text-base">email</i></a>
                                </div>
                            </div>
                        </div>

                        {/* Team Member 3 */}
                        <div className="group relative">
                            <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                                <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop" alt="Member" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <div className="absolute bottom-0 left-0 w-full bg-white p-6 shadow-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-xl font-bold text-gray-900">Michael Ross</h3>
                                <p className="text-primary text-sm font-medium mb-3">AI Specialist</p>
                                <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <a href="#" className="text-gray-400 hover:text-primary"><span className="material-icons text-sm">link</span></a>
                                    <a href="#" className="text-gray-400 hover:text-primary"><span className="material-icons text-sm">mail</span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Page Footer */}
            <footer className="bg-gray-900 text-white pt-20 pb-10">
                <div className="max-w-7xl mx-auto px-4 md:px-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-gray-800 pb-12">
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center gap-2 mb-6">
                                <img src={logo} alt="Logo" className="h-8 brightness-0 invert" />
                                <span className="font-bold text-xl tracking-tight">Appzeto</span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                We are a global IT solutions company. We bring thought and creativity to everyday items through original design.
                            </p>
                            <div className="flex items-start gap-3 text-sm text-gray-400 mb-2">
                                <span className="material-icons text-primary text-base">location_on</span>
                                <span>1001 Innovation Blvd, Tech City, CA</span>
                            </div>
                            <div className="flex items-start gap-3 text-sm text-gray-400">
                                <span className="material-icons text-primary text-base">call</span>
                                <span>+1 (800) 123-4567</span>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-primary font-bold mb-6 border-l-2 border-primary pl-3">OPENING TIME</h4>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li className="flex justify-between"><span>Mon - Fri:</span> <span>8AM - 10PM</span></li>
                                <li className="flex justify-between"><span>Sat:</span> <span>9AM - 8PM</span></li>
                                <li className="flex justify-between"><span>Sun:</span> <span className="text-red-400">Closed</span></li>
                                <li className="pt-2 text-xs italic">We Work All The Holidays</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-primary font-bold mb-6 border-l-2 border-primary pl-3">ABOUT</h4>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                                <li><a href="#" className="hover:text-white transition-colors">Delivery Information</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Our Store</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-primary font-bold mb-6 border-l-2 border-primary pl-3">ACCOUNT</h4>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">My Account</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Wishlist</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Order Tracking</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Return Policy</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="text-center text-gray-600 text-xs">
                        <p>&copy; 2024 Appzeto. All rights reserved. Designed with precision.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AboutUs;
