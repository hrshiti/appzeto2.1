import React, { Suspense, useEffect, useState } from 'react';

// Lazy load the Lottie player to reduce initial bundle size
// This separates the heavy Lottie JS application from the main thread during initial load
const DotLottiePlayer = React.lazy(() =>
    import('@lottiefiles/dotlottie-react').then(module => ({
        default: module.DotLottieReact
    }))
);

const HeroAnimation = ({ src, className }) => {
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
        // Delay loading slightly to prioritize FCP/LCP
        // requestIdleCallback is ideal for non-essential visual enhancements
        if ('requestIdleCallback' in window) {
            const handle = requestIdleCallback(() => {
                setShouldLoad(true);
            });
            return () => cancelIdleCallback(handle);
        } else {
            // Fallback for browsers without requestIdleCallback
            const timer = setTimeout(() => setShouldLoad(true), 200);
            return () => clearTimeout(timer);
        }
    }, []);

    // Placeholder while loading chunk or waiting for idle
    const placeholder = (
        <div className={`animate-pulse bg-gray-100/50 dark:bg-gray-800/50 rounded-full ${className}`}></div>
    );

    if (!shouldLoad) return placeholder;

    return (
        <Suspense fallback={placeholder}>
            <DotLottiePlayer
                src={src}
                loop
                autoplay
                className={className}
            // Optimization: reduced motion preference check could be added here
            />
        </Suspense>
    );
};

export default HeroAnimation;
