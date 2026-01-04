import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ServicesFullPage from '../components/ServicesFullPage';
import ScrollWrapper from '../components/ScrollWrapper';
import ScrollReveal from '../components/ScrollReveal';

const ServicesPage = () => {
    return (
        <ScrollWrapper>
            <div className="bg-white min-h-screen font-sans">
                <Navbar />
                <ServicesFullPage />
                <ScrollReveal>
                    <Footer />
                </ScrollReveal>
            </div>
        </ScrollWrapper>
    );
};

export default ServicesPage;
