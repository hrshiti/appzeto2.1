import React from 'react';

// Importing ALL logos
import aapreecLogo from '../assets/logos/aapreec_logo.jpg';
import autoRideLogo from '../assets/logos/auto_ride.jpg';
import beeyouLogo from '../assets/logos/beeyou.jpg';
import bookMyTempoLogo from '../assets/logos/book_my_tempo.jpg';
import createBharatLogo from '../assets/logos/create_bharat.jpg';
import dailyHisabLogo from '../assets/logos/daily_hisab.jpg';
import doctorOnHomeLogo from '../assets/logos/doctor_on_home.jpg';
import fixflyLogo from '../assets/logos/fixfly_logo.jpg';
import rentYatraLogo from '../assets/logos/rent_yatra.jpg';
import blueRideLogo from '../assets/logos/blue_ride.jpg';
import brnCabs from '../assets/logos/BRN Cabs.jpg';
import boonCabs from '../assets/logos/Boon Cabs.jpg';
import cabReady from '../assets/logos/Cab Ready.jpg';
import chaloSawari from '../assets/logos/Chalo Sawari.jpg';
import conApp from '../assets/logos/Con App.jpg';
import coolie from '../assets/logos/Coolie.jpg';
import dhakadSnazzy from '../assets/logos/Dhakad Snazzy.jpg';
import dhairyaCab from '../assets/logos/Dhairya Cab.jpg';
import apsaraStores from '../assets/logos/Apsara Stores.jpg';
import chandniNX from '../assets/logos/Chandni NX.jpg';
import decorry from '../assets/logos/Decorry.jpg';
import denishComforts from '../assets/logos/Denish Comforts.jpg';
import bonfire from '../assets/logos/bonfire.jpg';

const uniqueLogos = [
    aapreecLogo, autoRideLogo, beeyouLogo, bookMyTempoLogo,
    createBharatLogo, dailyHisabLogo, doctorOnHomeLogo, fixflyLogo,
    rentYatraLogo, blueRideLogo, brnCabs, boonCabs,
    cabReady, chaloSawari, conApp, coolie,
    dhakadSnazzy, dhairyaCab, apsaraStores, chandniNX,
    decorry, denishComforts, bonfire
];

// Further reducing count for VERY SPACED OUT look
// 16 items ensures large gaps between each logo
const targetCount = 16;
const logos = [];
while (logos.length < targetCount) {
    logos.push(...uniqueLogos);
}
// Trim to exact
logos.length = targetCount;

const InfinityBrandLoop = () => {
    // Path
    const pathString = "M 450 130 C 570 130 600 30 700 30 C 810 30 880 75 880 130 C 880 185 810 230 700 230 C 600 230 570 130 450 130 C 330 130 300 230 200 230 C 90 230 20 185 20 130 C 20 75 90 30 200 30 C 300 30 330 130 450 130 Z";

    // Duration 35s to keep them moving at a nice pace despite the gaps
    const duration = 35;

    // Styles
    const style = `
        @keyframes orbitInfinity {
            0% { offset-distance: 0%; }
            100% { offset-distance: 100%; }
        }
        .infinity-item {
            offset-path: path("${pathString}");
            animation: orbitInfinity ${duration}s linear infinite;
            position: absolute;
            top: 0;
            left: 0;
            offset-anchor: 50% 50%;
            will-change: offset-distance;
            offset-rotate: 0deg; 
        }
    `;

    return (
        <section className="relative py-24 bg-white overflow-hidden w-full flex justify-center -mt-8 mb-8">
            <style>{style}</style>

            <div className="relative w-full max-w-[900px] aspect-[900/260] mx-auto select-none pointer-events-none scale-90 md:scale-100">

                {/* Visual Track - Kept visible so the structure is clear */}
                <svg viewBox="0 0 900 260" className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                        <linearGradient id="trackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#00F2FE" stopOpacity="0" />
                            <stop offset="50%" stopColor="#082F30" stopOpacity="0.05" />
                            <stop offset="100%" stopColor="#00F2FE" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path
                        d={pathString}
                        fill="none"
                        stroke="url(#trackGradient)"
                        strokeWidth="12"
                    />
                    <path
                        d={pathString}
                        fill="none"
                        stroke="#082F30"
                        strokeWidth="2"
                        opacity="0.1"
                        strokeDasharray="6 8"
                    />
                </svg>

                {/* Logos */}
                <div className="absolute inset-0 transform-gpu">
                    {logos.map((logo, i) => {
                        const delay = -1 * (duration / targetCount) * i;

                        return (
                            <div
                                key={i}
                                // Increased size slightly to 80px (w-20)
                                className="infinity-item w-20 h-20 bg-white rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.1)] flex items-center justify-center p-2 border border-slate-50 z-10 overflow-hidden"
                                style={{
                                    animationDelay: `${delay}s`,
                                }}
                            >
                                <img
                                    src={logo}
                                    alt="brand"
                                    className="w-full h-full object-contain rounded-full hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
};

export default InfinityBrandLoop;
