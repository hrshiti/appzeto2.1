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
import Process from '../components/Process';
import Stats from '../components/Stats';

import ProjectShowcase from '../components/ProjectShowcase';

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
                <ProjectShowcase />
            </ScrollReveal>

            <ScrollReveal>
                <Process />
            </ScrollReveal>

            <ScrollReveal>
                <Stats />
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
