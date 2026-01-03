import Navbar from '../components/Navbar';
import ContactUs from '../components/ContactUs';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';
import ScrollWrapper from '../components/ScrollWrapper';

const Contact = () => {
    return (
        <ScrollWrapper>
            <Navbar />
            <ScrollReveal>
                <ContactUs />
            </ScrollReveal>

            <ScrollReveal>
                <Footer />
            </ScrollReveal>
        </ScrollWrapper>
    );
};

export default Contact;
