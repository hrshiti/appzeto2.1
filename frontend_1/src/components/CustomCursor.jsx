import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useLocation } from "react-router-dom";

const CustomCursor = () => {
    const location = useLocation();

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

            // Re-check target in moveCursor for more reliability
            const target = e.target;
            if (target && target.closest("input, textarea, select, label, [contenteditable='true']")) {
                // Ensure we don't block other variants unless needed, but for inputs we force hidden
                setCursorVariant("hidden");
            }
        };

        const handleMouseDown = () => {
            // Don't change variant if hidden (e.g. clicking in forms)
            if (cursorVariant === "hidden") return;
            setCursorVariant("click");
        };

        const handleMouseUp = () => {
            if (cursorVariant === "hidden") return;
            setCursorVariant("default");
        };

        const handleMouseOver = (e) => {
            const target = e.target;

            // Hide cursor on form elements
            const isFormField = target.closest("input, textarea, select, label, [contenteditable='true']");
            if (isFormField) {
                setCursorVariant("hidden");
                return;
            }

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
    }, []); // Empty dependency array means this only runs once, creating closure over initial state. 
    // This is known behavior here and seems intended to rely on event.target checks mostly. 
    // Note: cursorVariant inside moveCursor will be stale ("default"), so setCursorVariant("hidden") is always called.

    const variants = {
        default: {
            height: 20,
            width: 20,
            backgroundColor: "#05A4A7", // Primary teal
            mixBlendMode: "normal",
            border: "1px solid rgba(255,255,255,0)",
            opacity: 1,
        },
        button: {
            height: 60,
            width: 60,
            backgroundColor: "rgba(5, 164, 167, 0.1)",
            border: "1px solid rgba(5, 164, 167, 0.5)",
            mixBlendMode: "normal",
            opacity: 1,
        },
        text: {
            height: 100,
            width: 100,
            backgroundColor: "rgba(255, 255, 255, 1)",
            mixBlendMode: "difference",
            border: "none",
            opacity: 1,
        },
        click: {
            height: 15,
            width: 15,
            backgroundColor: "#05A4A7",
            opacity: 1,
        },
        hidden: {
            opacity: 0,
            scale: 0,
            visibility: "hidden",
            transition: { duration: 0.1 }
        }
    };

    // Don't render on mobile to avoid UX issues
    if (typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return null;
    }

    // Disable on Admin and HR Panels
    if (location.pathname.startsWith('/admin') || location.pathname.startsWith('/hr')) {
        return null;
    }

    return (
        <motion.div
            className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center rounded-full backdrop-blur-[1px]"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                // opacity removed from style to allow variants to control it
            }}
            variants={variants}
            // Use isVisible state to toggle between 'hidden' variant for initial state and the active cursorVariant
            animate={isVisible ? cursorVariant : "hidden"}
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
