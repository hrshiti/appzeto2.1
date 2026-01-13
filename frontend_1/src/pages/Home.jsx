import React from 'react';
import Hero from '../components/Hero';

import About from '../components/About';
import Services from '../components/Services';
import Reviews from '../components/Reviews';
import ContactUs from '../components/ContactUs';
import WhyChooseUs from '../components/WhyChooseUs';
import ProductOrbitSection from '../components/ProductOrbitSection';
import AppzetoPartners from '../components/AppzetoPartners';
import Footer from '../components/Footer';
import ScrollWrapper from '../components/ScrollWrapper';
import ScrollReveal from '../components/ScrollReveal';
import Process from '../components/Process';

import ProjectShowcase from '../components/ProjectShowcase';
import HappyClientsBar from '../components/HappyClientsBar';

const Home = () => {

    return (
        <ScrollWrapper>


            <Hero />




            <ScrollReveal>
                <Services />
            </ScrollReveal>

            <ScrollReveal viewport={{ once: true, amount: 0.1 }}>
                <ProjectShowcase />
            </ScrollReveal>

            <ScrollReveal>
                <About />
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
                <ProductOrbitSection />
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
