import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollWrapper from '../components/ScrollWrapper';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <ScrollWrapper>
            <Navbar />
            <div className="bg-slate-50 min-h-screen pt-32 pb-20">
                <div className="max-w-4xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-100"
                    >
                        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 uppercase tracking-tight">
                            Legal <span className="text-[#05A4A7]">Policies</span>
                        </h1>

                        <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:uppercase prose-a:text-[#05A4A7] prose-strong:text-slate-800">

                            {/* PRIVACY POLICY */}
                            <section id="privacy" className="mb-12 scroll-mt-32">
                                <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-800 border-b pb-4 mb-6">
                                    <span className="text-2xl">🔐</span> Privacy Policy
                                </h2>
                                <p className="text-sm text-slate-500 font-bold mb-4 uppercase tracking-wider">Last Updated: January 2026</p>
                                <p>At Appzeto, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect your data when you use our website, services, or digital products.</p>

                                <h3 className="text-lg mt-6">1. Information We Collect</h3>
                                <p>We may collect the following information:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Name, email address, phone number</li>
                                    <li>Business or company details</li>
                                    <li>Payment and billing information</li>
                                    <li>Project or service requirements</li>
                                    <li>Usage data such as pages visited and interactions</li>
                                </ul>

                                <h3 className="text-lg mt-6">2. How We Use Your Information</h3>
                                <p>Your information is used to:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Provide IT services and digital products</li>
                                    <li>Process payments and EMI transactions</li>
                                    <li>Communicate about projects, updates, and support</li>
                                    <li>Improve our services and website experience</li>
                                    <li>Meet legal and compliance requirements</li>
                                </ul>

                                <h3 className="text-lg mt-6">3. Payment & EMI Information</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>All online payments are processed through secure payment gateways</li>
                                    <li>EMI options are available for selected digital products</li>
                                    <li>Appzeto does not store sensitive payment details like card numbers</li>
                                    <li>EMI terms depend on the selected plan and payment conditions</li>
                                </ul>

                                <h3 className="text-lg mt-6">4. Data Security</h3>
                                <p>We take reasonable technical and organizational measures to protect your data from unauthorized access, misuse, or loss.</p>

                                <h3 className="text-lg mt-6">5. User Responsibility</h3>
                                <p>Users are responsible for:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Providing accurate information</li>
                                    <li>Keeping login credentials confidential</li>
                                    <li>Using services lawfully and fairly</li>
                                </ul>

                                <h3 className="text-lg mt-6">6. Sharing of Information</h3>
                                <p>We do not sell or rent personal data. Information is shared only when required for:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Payment processing</li>
                                    <li>Legal compliance</li>
                                    <li>Service delivery</li>
                                </ul>

                                <h3 className="text-lg mt-6">7. Updates to Privacy Policy</h3>
                                <p>Appzeto may update this policy from time to time. Continued use of our services means you accept the updated policy.</p>
                            </section>

                            <hr className="my-12 border-slate-200" />

                            {/* REFUND POLICY */}
                            <section id="refund" className="mb-12 scroll-mt-32">
                                <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-800 border-b pb-4 mb-6">
                                    <span className="text-2xl">💰</span> Refund & Return Policy
                                </h2>
                                <p>At Appzeto, we focus on transparency and fairness for all IT services and digital products.</p>

                                <h3 className="text-lg mt-6">1. IT Services (Projects & Custom Work)</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Refunds are not guaranteed once project work has started</li>
                                    <li>Refund eligibility depends on: Project stage, Work delivered, and Resources allocated</li>
                                    <li>Any approved refund will be calculated after deducting completed work costs</li>
                                </ul>

                                <h3 className="text-lg mt-6">2. Digital Products</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Digital products are delivered electronically</li>
                                    <li>Once access is provided, returns are not applicable</li>
                                    <li>Refunds are considered only if: The product is not delivered, or there is a proven technical issue that cannot be resolved</li>
                                </ul>

                                <h3 className="text-lg mt-6">3. EMI Payments</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>EMI payments are non-refundable once processed</li>
                                    <li>Refunds, if approved, will follow EMI provider rules</li>
                                    <li>Any cancellation does not cancel EMI obligations automatically</li>
                                </ul>

                                <h3 className="text-lg mt-6">4. Refund Processing</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Approved refunds are processed to the original payment method</li>
                                    <li>Processing time may vary based on payment mode</li>
                                </ul>

                                <h3 className="text-lg mt-6">5. Fair Usage</h3>
                                <p>Refund requests made with false claims or misuse may be rejected.</p>
                            </section>

                            <hr className="my-12 border-slate-200" />

                            {/* CANCELLATION POLICY */}
                            <section id="cancellation" className="mb-12 scroll-mt-32">
                                <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-800 border-b pb-4 mb-6">
                                    <span className="text-2xl">❌</span> Cancellation Policy
                                </h2>
                                <p>This policy explains how cancellations work for services and digital products at Appzeto.</p>

                                <h3 className="text-lg mt-6">1. Service Cancellation</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Clients may request cancellation before project execution begins</li>
                                    <li>Once development has started, cancellation may Incur partial charges and Not qualify for a refund</li>
                                    <li>Charges depend on work completed and resources used</li>
                                </ul>

                                <h3 className="text-lg mt-6">2. Project-Based Cancellation</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Milestone-based projects follow milestone payment terms</li>
                                    <li>Cancellation after milestone approval will not refund completed milestones</li>
                                    <li>Custom software work is non-transferable</li>
                                </ul>

                                <h3 className="text-lg mt-6">3. Digital Product Cancellation</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Digital products cannot be canceled after access is granted</li>
                                    <li>Subscription-based products may be canceled for future billing cycles</li>
                                    <li>Past usage fees are non-refundable</li>
                                </ul>

                                <h3 className="text-lg mt-6">4. EMI Cancellation Terms</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>EMI plans cannot be canceled once activated</li>
                                    <li>Cancellation of a product does not cancel EMI payments</li>
                                    <li>EMI terms remain binding as per selected payment agreement</li>
                                </ul>

                                <h3 className="text-lg mt-6">5. Appzeto’s Right to Cancel</h3>
                                <p>Appzeto reserves the right to cancel services if:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>There is misuse of services</li>
                                    <li>Payment obligations are not met</li>
                                    <li>False or misleading information is provided</li>
                                </ul>
                            </section>

                            {/* CONTACT CTA */}
                            <div className="mt-16 bg-slate-900 rounded-2xl p-8 text-center text-white">
                                <div className="text-4xl mb-4">📞</div>
                                <h3 className="text-2xl font-bold mb-2">Need Help or Want to Cancel?</h3>
                                <p className="text-slate-400 mb-6">Our support team is here to assist you with any questions regarding our policies.</p>
                                <a
                                    href="/contact#contact-form"
                                    className="inline-block px-8 py-3 bg-[#05A4A7] hover:bg-[#048a8d] text-white font-bold rounded-full transition-all shadow-lg hover:shadow-[#05A4A7]/30"
                                >
                                    Contact Support
                                </a>
                            </div>

                            <div className="mt-12 p-6 bg-slate-50 rounded-xl border border-slate-200 text-center">
                                <h4 className="font-bold text-slate-900 mb-2">✅ FINAL NOTES</h4>
                                <ul className="text-sm text-slate-600 space-y-1">
                                    <li>All services and products are delivered digitally</li>
                                    <li>No physical items are shipped</li>
                                    <li>Policies apply to all users unless stated otherwise</li>
                                </ul>
                            </div>

                        </div>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </ScrollWrapper>
    );
};

export default PrivacyPolicy;
