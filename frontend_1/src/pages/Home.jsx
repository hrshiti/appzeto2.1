import React from 'react';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import About from '../components/About';
import Services from '../components/Services';
import ContactUs from '../components/ContactUs';
import WhyChooseUs from '../components/WhyChooseUs';
import Footer from '../components/Footer';

import ScrollWrapper from '../components/ScrollWrapper';

const Home = () => {
    return (
        <ScrollWrapper>
            <Hero />
            <Projects />
            <About />
            <Services />
            <WhyChooseUs />
            <ContactUs />
            <Footer />
        </ScrollWrapper>
    );
};

export default Home;
