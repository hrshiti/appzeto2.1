import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Products from '../components/Products';
import About from '../components/About';
import MarqueeSection from '../components/MarqueeSection';
import Services from '../components/Services';
import Technologies from '../components/Technologies';

const Home = () => {
    return (
        <div className="min-h-screen w-full bg-[#f2f2f2] font-sans selection:bg-[#D33C1D] selection:text-white flex flex-col">
            <Navbar />
            <main className="flex-1 w-full">
                <Hero />
                <Products />
                <About />
                <MarqueeSection />
                <Services />
                <Technologies />
            </main>
        </div>
    );
};

export default Home;
