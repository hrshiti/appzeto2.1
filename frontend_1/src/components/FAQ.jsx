import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
    {
        question: "How much time does it take for a project?",
        answer: "Project timelines vary based on complexity. A typical web application takes 6-12 weeks, while a simpler website might take 3-4 weeks. We provide a detailed project roadmap during the discovery phase."
    },
    {
        question: "What technologies do you use?",
        answer: "We specialize in modern technologies including React, Next.js, Node.js, Python for AI/ML, and Flutter for mobile apps. Our tech stack is chosen based on the specific performance and scalability needs of your project."
    },
    {
        question: "Do you provide post-launch support?",
        answer: "Yes, we offer comprehensive maintenance and support plans to ensure your product remains up-to-date, secure, and performant. This includes bug fixes, security updates, and performance optimization."
    },
    {
        question: "How do you handle project communication?",
        answer: "Transparency is key. We use tools like Slack, Jira, and weekly video calls to keep you updated on progress. You'll have a dedicated project manager throughout the journey."
    }
];

const FAQItem = ({ question, answer, isOpen, toggle }) => {
    return (
        <div className="mb-4">
            <button
                onClick={toggle}
                className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 flex justify-between items-center bg-white/5 backdrop-blur-md ${isOpen ? 'border-[#cdbdae] ring-1 ring-[#cdbdae]/30 shadow-lg' : 'border-gray-200 dark:border-white/10 hover:border-[#cdbdae]/50'}`}
            >
                <span className="text-lg font-bold text-gray-900 dark:text-white">{question}</span>
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`material-symbols-outlined text-[#cdbdae]`}
                >
                    expand_more
                </motion.span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 text-gray-500 dark:text-gray-400 leading-relaxed font-sans">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="bg-white dark:bg-[#023638] py-24 relative overflow-hidden font-serif">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="text-center mb-16"
                >
                    <p className="text-[#cdbdae] font-medium tracking-widest uppercase mb-2">Knowledge Base</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">Frequently Asked Questions</h2>
                    <div className="w-24 h-1 bg-[#cdbdae] mx-auto rounded-full" />
                </motion.div>

                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            toggle={() => setOpenIndex(openIndex === index ? -1 : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
