import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import About from '../components/About';
import Services from '../components/Services';
import Reviews from '../components/Reviews';
import ContactUs from '../components/ContactUs';
import WhyChooseUs from '../components/WhyChooseUs';
import Footer from '../components/Footer';
import ScrollWrapper from '../components/ScrollWrapper';
import ScrollReveal from '../components/ScrollReveal';
import Process from '../components/Process';
import Stats from '../components/Stats';
import ChannelPartners from '../components/ChannelPartners';
import EntrySplash from '../components/EntrySplash'; // Import Splash

import ProjectShowcase from '../components/ProjectShowcase';

// Global variable to track splash screen state in memory
// This resets on page reload (Refresh) but persists on Back Navigation (Client-side routing)
let hasShownSplashInSession = false;

const Home = () => {
    const [showSplash, setShowSplash] = useState(!hasShownSplashInSession);

    useEffect(() => {
        if (showSplash) {
            const timer = setTimeout(() => {
                setShowSplash(false);
                hasShownSplashInSession = true;
            }, 3000); // Display for 3 seconds

            return () => clearTimeout(timer);
        } else {
            // Ensure flag is set if we skipped it (though logic above handles it, good for robustness)
            hasShownSplashInSession = true;
        }
    }, [showSplash]);

    return (
        <ScrollWrapper>
            <EntrySplash isVisible={showSplash} />

            <Hero />


            <ScrollReveal>
                <About />
            </ScrollReveal>

            <ScrollReveal>
                <Services />
            </ScrollReveal>

            <ChannelPartners />

            <ScrollReveal>
                <ProjectShowcase />
            </ScrollReveal>

            <ScrollReveal>
                <Process />
            </ScrollReveal>

            <ScrollReveal>
                <Stats />
            </ScrollReveal>

            <ScrollReveal>
                <Projects />
            </ScrollReveal>

            <ScrollReveal>
                <WhyChooseUs />
            </ScrollReveal>

            <ScrollReveal>
                <Reviews />
            </ScrollReveal>

            <ScrollReveal>
                <ContactUs isHomePage={true} />
            </ScrollReveal>

            <ScrollReveal>
                <Footer />
            </ScrollReveal>
        </ScrollWrapper>
    );
};

export default Home;
