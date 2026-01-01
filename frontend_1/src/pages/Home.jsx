import React from 'react';
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

const Home = () => {
    return (
        <ScrollWrapper>
            <Hero />

            <ScrollReveal>
                <Projects />
            </ScrollReveal>

            <ScrollReveal>
                <About />
            </ScrollReveal>

            <ScrollReveal>
                <Services />
            </ScrollReveal>

            <ScrollReveal>
                <WhyChooseUs />
            </ScrollReveal>

            <ScrollReveal>
                <Reviews />
            </ScrollReveal>

            <ScrollReveal>
                <ContactUs />
            </ScrollReveal>

            <ScrollReveal>
                <Footer />
            </ScrollReveal>
        </ScrollWrapper>
    );
};

export default Home;
