import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './SplashScreen.css';

// Main Hero Image - Matches the one in Hero.jsx
const HERO_IMAGE = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";

const SplashScreen = () => {
    const lettersRef = useRef([]);
    const boxRef = useRef(null);
    const imageRef = useRef(null);
    const containerRef = useRef(null);
    const extraImagesRef = useRef([]);

    useEffect(() => {
        // Prevent scrolling during animation
        document.body.style.overflow = 'hidden';

        const imagesToCycle = extraImagesRef.current.slice(0, 3);

        // Ensure Hero Image is loaded/available before finalizing
        const tl = gsap.timeline({
            defaults: { ease: "expo.inOut" },
        });

        // 1. Initial State: Letters hidden, box 0 width

        // 2. Animate Letters Up
        tl.to(lettersRef.current, {
            yPercent: -100,
            stagger: 0.05,
            duration: 1.2,
        });

        // 3. Box Expands Width (Between App and Zeto)
        tl.to(boxRef.current, {
            width: "20vw",
            duration: 1.2,
        }, "<");

        // 4. Image Inside Box Expands
        tl.to(imageRef.current, {
            width: "100%",
            duration: 1.2,
        }, "<");

        // 5. Image Cycling
        if (imagesToCycle.length > 0) {
            tl.to(imagesToCycle, {
                opacity: 1,
                duration: 0
            }, "<");

            // Cycle them by fading out one by one
            tl.to(imagesToCycle, {
                opacity: 0,
                duration: 0.15,
                stagger: 0.25,
                ease: "none"
            }, ">-0.5");
        }

        // 6. Box Expands to Full Screen 
        tl.to(boxRef.current, {
            width: "100vw",
            height: "100vh",
            borderRadius: 0,
            duration: 1.2,
            delay: 0.1,
            ease: "power3.inOut"
        });

        // 7. Image Expands to Full Screen
        tl.to(imageRef.current, {
            width: "100vw",
            height: "100vh",
            duration: 1.2,
            ease: "power3.inOut"
        }, "<");

        // 8. Text Fades Out
        tl.to(lettersRef.current, {
            yPercent: -250,
            opacity: 0,
            duration: 0.8,
        }, "<");

        // 9. THE SEAMLESS TRANSITION -> Move into Hero Section
        tl.add(() => {
            const heroImg = document.getElementById('hero-main-image');

            if (heroImg) {
                const rect = heroImg.getBoundingClientRect();

                // IMPORTANT: Fix for "Blink" Effect
                // The Hero Image has a CSS transition class (duration-700) which causes a lag when opacity changes.
                // We MUST disable that transition temporarily to make the swap instant.
                gsap.set(heroImg, { transition: 'none' });

                // Animate the Splash Box to the Hero Image position
                gsap.to(boxRef.current, {
                    top: rect.top,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height,
                    duration: 1.5,
                    ease: "expo.out",
                    onComplete: () => {
                        // 1. Reveal real hero image INSTANTLY (no reflow blink)
                        gsap.set(heroImg, { opacity: 1 });

                        // 2. Hide splash completely
                        gsap.set(containerRef.current, { display: 'none' });

                        // --- NAVBAR ANIMATIONS ---
                        const navTl = gsap.timeline();

                        // Nav Logo
                        navTl.to('#nav-logo', {
                            y: 0,
                            opacity: 1,
                            duration: 0.8,
                            ease: "power3.out"
                        });

                        // Nav Items (Staggered)
                        navTl.to('.nav-item', {
                            y: 0,
                            opacity: 1,
                            duration: 0.6,
                            stagger: 0.1,
                            ease: "power3.out"
                        }, "-=0.6");

                        // Nav CTA
                        navTl.to('#nav-cta', {
                            y: 0,
                            opacity: 1,
                            duration: 0.6,
                            ease: "power3.out"
                        }, "-=0.4");


                        // --- HERO CONTENT ANIMATIONS (Sequential) ---
                        const heroTl = gsap.timeline({ delay: 0.2 }); // Start slightly after nav starts

                        // A. Header "APPZETO" (From Top)
                        heroTl.to('#hero-heading', {
                            y: 0,
                            opacity: 1,
                            duration: 1,
                            ease: "power3.out"
                        });

                        // B. Info Grid (Below Header)
                        heroTl.to('#hero-info-grid', {
                            y: 0,
                            opacity: 1,
                            duration: 0.8,
                            ease: "power3.out"
                        }, "-=0.6");

                        // C. Service List (Left Sidebar - From Left)
                        heroTl.to('#hero-service-list', {
                            x: 0,
                            opacity: 1,
                            duration: 1,
                            ease: "power3.out"
                        }, "-=0.4");

                        // D. Description (Right - From Right)
                        heroTl.to('#hero-desc', {
                            x: 0,
                            opacity: 1,
                            duration: 1,
                            ease: "power3.out"
                        }, "-=0.6");


                        // 4. Unlock Scroll
                        document.body.style.overflow = '';
                    }
                });

                // Ensure internal image matches box size
                gsap.to(imageRef.current, {
                    width: '100%',
                    height: '100%',
                    duration: 1.5,
                    ease: "expo.out"
                });
            } else {
                // Fallback
                gsap.to(containerRef.current, {
                    opacity: 0,
                    duration: 1,
                    onComplete: () => {
                        document.body.style.overflow = '';
                        gsap.set(containerRef.current, { display: 'none' });
                    }
                });
            }
        });

    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[9999] bg-[#f4f4f4] text-[#201d1d] flex items-center justify-center overflow-hidden">

            {/* The expanding box in the center */}
            <div
                ref={boxRef}
                className="absolute bg-white overflow-hidden flex items-center justify-center rounded-xl"
                style={{
                    height: '10vw',
                    width: 0,
                    zIndex: 10
                }}
            >
                {/* Base Hero Image (Final - The one that matches Hero) */}
                <div
                    ref={imageRef}
                    className="absolute inset-0 bg-cover bg-center grayscale-[20%]"
                    style={{ backgroundImage: `url(${HERO_IMAGE})` }}
                />

                {/* Extra Images for Cycling (Overlaid) */}
                <img ref={el => (extraImagesRef.current[0] = el)} src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&w=800&q=80" className="absolute inset-0 w-full h-full object-cover opacity-0" alt="" />
                <img ref={el => (extraImagesRef.current[1] = el)} src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&w=800&q=80" className="absolute inset-0 w-full h-full object-cover opacity-0" alt="" />
                <img ref={el => (extraImagesRef.current[2] = el)} src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&w=800&q=80" className="absolute inset-0 w-full h-full object-cover opacity-0" alt="" />
            </div>

            {/* Text Container */}
            <div className="relative z-20 flex font-['Fredoka'] font-semibold text-[#00A99D] text-[13vw] leading-none tracking-tight items-center justify-center w-full">

                {/* Left Side "App" */}
                <div className="flex overflow-hidden items-center justify-end w-[35%] pr-[4vw]">
                    {['A', 'p', 'p'].map((char, i) => (
                        <span key={`l-${i}`} ref={el => (lettersRef.current[i] = el)} className="inline-block translate-y-full origin-top">
                            {char}
                        </span>
                    ))}
                </div>

                {/* Right Side "zeto" */}
                <div className="flex overflow-hidden items-center justify-start w-[35%] pl-[4vw]">
                    {['z', 'e', 't', 'o'].map((char, i) => (
                        <span key={`r-${i}`} ref={el => (lettersRef.current[i + 3] = el)} className="inline-block translate-y-full origin-top">
                            {char}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SplashScreen;
