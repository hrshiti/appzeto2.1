import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const HeroAnimation = ({ src, className }) => {
    return (
        <DotLottieReact
            src={src}
            loop
            autoplay
            className={className}
        />
    );
};

export default HeroAnimation;
