import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
    // Mouse position state
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth spring animation for the cursor
    const springConfig = { damping: 25, stiffness: 400 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    // State for cursor styling
    const [cursorText, setCursorText] = useState("");
    const [cursorVariant, setCursorVariant] = useState("default"); // default, button, text
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX - 10); // Offset to center the 20px cursor
            cursorY.set(e.clientY - 10);

            if (!isVisible) setIsVisible(true);
        };

        const handleMouseDown = () => setCursorVariant("click");
        const handleMouseUp = () => setCursorVariant("default");

        const handleMouseOver = (e) => {
            const target = e.target;

            // Text cursor trigger
            const textTrigger = target.closest("[data-cursor-text]");
            if (textTrigger) {
                setCursorText(textTrigger.getAttribute("data-cursor-text"));
                setCursorVariant("text");
                return;
            } else {
                setCursorText("");
            }

            // Button/Link hover trigger
            const buttonTrigger = target.closest("button, a, .cursor-pointer, [role='button']");
            if (buttonTrigger) {
                setCursorVariant("button");
                return;
            }

            setCursorVariant("default");
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    const variants = {
        default: {
            height: 20,
            width: 20,
            backgroundColor: "#05A4A7", // Primary teal
            mixBlendMode: "normal",
            border: "1px solid rgba(255,255,255,0)",
        },
        button: {
            height: 60,
            width: 60,
            backgroundColor: "rgba(5, 164, 167, 0.1)",
            border: "1px solid rgba(5, 164, 167, 0.5)",
            mixBlendMode: "normal",
        },
        text: {
            height: 100,
            width: 100,
            backgroundColor: "rgba(255, 255, 255, 1)",
            mixBlendMode: "difference",
            border: "none",
        },
        click: {
            height: 15,
            width: 15,
            backgroundColor: "#05A4A7",
        }
    };

    if (typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return null; // Don't render on mobile to avoid UX issues
    }

    return (
        <motion.div
            className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center rounded-full backdrop-blur-[1px]"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                opacity: isVisible ? 1 : 0,
            }}
            variants={variants}
            animate={cursorVariant}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
        >
            <motion.span
                className={`text-[10px] uppercase font-bold tracking-widest text-center leading-none ${cursorVariant === 'text' ? 'text-black' : 'text-white'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: cursorText ? 1 : 0 }}
            >
                {cursorText}
            </motion.span>
        </motion.div>
    );
};

export default CustomCursor;
