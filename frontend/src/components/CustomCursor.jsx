import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const [isHovered, setIsHovered] = useState(false);
    const [cursorText, setCursorText] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    // Smooth physics for the follower (3D gradient effect)
    const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    // Tighter spring for the main dot so it stays responsive
    const dotSpringConfig = { damping: 30, stiffness: 300, mass: 0.2 };
    const dotX = useSpring(mouseX, dotSpringConfig);
    const dotY = useSpring(mouseY, dotSpringConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e) => {
            const target = e.target;

            // Check for interactive elements or custom data attribute
            const isClickable = target.closest('a, button, [role="button"], input, select, textarea, .cursor-hover');
            const customText = target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');

            if (customText) {
                setCursorText(customText);
                setIsHovered(true);
            } else if (isClickable) {
                setCursorText("");
                setIsHovered(true);
            } else {
                setCursorText("");
                setIsHovered(false);
            }
        };

        const handleMouseOut = () => {
            // Reset is handled by mouseover usually, but good for safety
            // Logic in mouseOver covers bubbling events well enough for global listener
        };

        // Hide cursor when leaving window
        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [mouseX, mouseY, isVisible]);

    return (
        <div
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999] overflow-hidden"
            style={{ display: isVisible ? 'block' : 'none' }}
        >
            {/* 3D Gradient Follower */}
            <motion.div
                className="absolute w-12 h-12 rounded-full opacity-80 backdrop-blur-sm"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                    background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)', // Vibrant gradient
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)', // 3D shadow
                }}
                animate={{
                    scale: isHovered ? 2.5 : 1,
                    rotate: isHovered ? 180 : 0
                }}
                transition={{ duration: 0.3 }}
            >
                {/* 3D Inner Depth Effect */}
                <div className="w-full h-full rounded-full bg-gradient-to-br from-white/30 to-transparent blur-sm" />
            </motion.div>

            {/* Main Black Dot */}
            <motion.div
                className="absolute w-3 h-3 bg-black rounded-full border border-white/50"
                style={{
                    x: dotX,
                    y: dotY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovered ? 0 : 1 // Hide dot when hovered/expanded, or keep it? 
                    // User said "simple and a black dot on the cursor". 
                    // Maybe keep it but color shift? Let's hide it to show text better or keep it small.
                    // Let's keep it visible but maybe smaller or blended.
                }}
            />

            {/* Hover Text */}
            <AnimatePresence>
                {isHovered && cursorText && (
                    <motion.div
                        className="absolute text-[10px] font-bold uppercase tracking-widest text-white text-center flex items-center justify-center w-32"
                        style={{
                            x: cursorX,
                            y: cursorY,
                            translateX: '-50%',
                            translateY: '-50%',
                        }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                    >
                        {cursorText}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CustomCursor;
