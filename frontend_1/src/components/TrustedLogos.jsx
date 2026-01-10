import React from 'react';
import aapreecLogo from '../assets/logos/aapreec_logo.jpg';
import autoRideLogo from '../assets/logos/auto_ride.jpg';
import beeyouLogo from '../assets/logos/beeyou.jpg';
import bookMyTempoLogo from '../assets/logos/book_my_tempo.jpg';
import createBharatLogo from '../assets/logos/create_bharat.jpg';
import dailyHisabLogo from '../assets/logos/daily_hisab.jpg';
import doctorOnHomeLogo from '../assets/logos/doctor_on_home.jpg';
import fixflyLogo from '../assets/logos/fixfly.jpg';
import rentYatraLogo from '../assets/logos/rent_yatra.jpg';
import blueRideLogo from '../assets/logos/blue_ride.jpg';

const TrustedLogos = () => {
    const logos = [
        aapreecLogo, autoRideLogo, beeyouLogo, bookMyTempoLogo,
        createBharatLogo, dailyHisabLogo, doctorOnHomeLogo,
        fixflyLogo, rentYatraLogo, blueRideLogo
    ];

    return (
        <section className="bg-white py-8 border-y border-slate-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 text-center mb-6">
                <span className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">
                    Trusted by industry leaders
                </span>
            </div>
            <div className="flex animate-scroll whitespace-nowrap group">
                {[...logos, ...logos].map((logo, index) => (
                    <div key={index} className="mx-8 sm:mx-12 opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0">
                        <img src={logo} alt="Partner" className="h-8 sm:h-10 w-auto object-contain rounded-lg" />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TrustedLogos;
