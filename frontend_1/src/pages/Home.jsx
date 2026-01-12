import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';

import About from '../components/About';
import Services from '../components/Services';
import Reviews from '../components/Reviews';
import ContactUs from '../components/ContactUs';
import WhyChooseUs from '../components/WhyChooseUs';
import AppzetoPartners from '../components/AppzetoPartners';
import Footer from '../components/Footer';
import ScrollWrapper from '../components/ScrollWrapper';
import ScrollReveal from '../components/ScrollReveal';
import Process from '../components/Process';
import EntrySplash from '../components/EntrySplash';
import ProjectShowcase from '../components/ProjectShowcase';
import HappyClientsBar from '../components/HappyClientsBar';

let hasShownSplashInSession = false;

const Home = () => {
    const [showSplash, setShowSplash] = useState(!hasShownSplashInSession);

    useEffect(() => {
        if (showSplash) {
            const timer = setTimeout(() => {
                setShowSplash(false);
                hasShownSplashInSession = true;
            }, 3000);

            return () => clearTimeout(timer);
        } else {
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

            <ScrollReveal viewport={{ once: true, amount: 0.1 }}>
                <ProjectShowcase />
            </ScrollReveal>

            <ScrollReveal>
                <HappyClientsBar />
            </ScrollReveal>

            <ScrollReveal>
                <Process />
            </ScrollReveal>

            <ScrollReveal>
                <WhyChooseUs />
            </ScrollReveal>

            <ScrollReveal>
                <AppzetoPartners />
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
