import React from 'react';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import About from '../components/About';
import Services from '../components/Services';
import ContactUs from '../components/ContactUs';

const Home = () => {
    return (
        <>
            <Hero />
            <Projects />
            <About />
            <Services />
            <ContactUs />
        </>
    );
};

export default Home;
