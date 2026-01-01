import React from 'react';
import { motion } from 'framer-motion';

const ScrollReveal = ({ children, delay = 0, y = 100 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
                duration: 1.2,
                delay: delay,
                ease: [0.22, 1, 0.36, 1]
            }}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
