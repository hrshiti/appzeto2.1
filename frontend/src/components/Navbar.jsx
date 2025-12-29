import React from 'react';
import { ChevronDown, ArrowUpRight } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between px-8 py-4 w-full max-w-[1600px] mx-auto overflow-hidden">
            {/* Logo */}
            <div id="nav-logo" className="text-2xl font-bold tracking-tight text-gray-900 opacity-0 -translate-y-full">
                APPZETO
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
                <a href="#" className="nav-item hover:text-gray-900 transition-colors opacity-0 -translate-y-full">Home</a>
                <a href="#" className="nav-item hover:text-gray-900 transition-colors opacity-0 -translate-y-full">About</a>
                <a href="#" className="nav-item hover:text-gray-900 transition-colors opacity-0 -translate-y-full">Service</a>
                <a href="#" className="nav-item hover:text-gray-900 transition-colors opacity-0 -translate-y-full">Portfolio</a>
                <div className="nav-item flex items-center gap-1 hover:text-gray-900 cursor-pointer transition-colors group relative opacity-0 -translate-y-full">
                    <span>Pages</span>
                    <ChevronDown className="w-4 h-4" />
                </div>
                <a href="#" className="nav-item hover:text-gray-900 transition-colors opacity-0 -translate-y-full">Work</a>
            </div>

            {/* CTA Button */}
            <button id="nav-cta" className="bg-[#D33C1D] hover:bg-[#b03218] text-white px-6 py-3 rounded-none font-medium text-sm flex items-center gap-2 transition-colors opacity-0 -translate-y-full">
                Start A Project
                <ArrowUpRight className="w-4 h-4" />
            </button>
        </nav>
    );
};

export default Navbar;
