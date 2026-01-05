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
import EntrySplash from '../components/EntrySplash'; // Import Splash

import ProjectShowcase from '../components/ProjectShowcase';

const Home = () => {
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 3000); // Display for 3 seconds

        return () => clearTimeout(timer);
    }, []);

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
