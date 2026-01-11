import React from 'react';
import aapreecLogo from '../assets/logos/aapreec_logo.jpg';
import autoRideLogo from '../assets/logos/auto_ride.jpg';
import decorryLogo from '../assets/logos/Decorry.jpg';
import bookMyTempoLogo from '../assets/logos/book_my_tempo.jpg';
import createBharatLogo from '../assets/logos/create_bharat.jpg';
import dailyHisabLogo from '../assets/logos/daily_hisab.jpg';
import doctorOnHomeLogo from '../assets/logos/doctor_on_home.jpg';
import rentYatraLogo from '../assets/logos/rent_yatra.jpg';
import blueRideLogo from '../assets/logos/blue_ride.jpg';
import projectFoodLogo from '../assets/projects/appzeto-food-1.jpg';
import projectDevLogo from '../assets/projects/appdeveloment.png';

const HappyClientsBar = () => {
    const clients = [
        { name: "Aapreec", logo: aapreecLogo },
        { name: "AutoRide", logo: autoRideLogo },
        { name: "Decorry", logo: decorryLogo },
        { name: "Book My Tempo", logo: bookMyTempoLogo },
        { name: "Create Bharat", logo: createBharatLogo },
        { name: "Daily Hisab", logo: dailyHisabLogo },
        { name: "Doctor on Home", logo: doctorOnHomeLogo },
        { name: "Appzeto Food", logo: projectFoodLogo },
        { name: "App Development", logo: projectDevLogo },
        { name: "Rent Yatra", logo: rentYatraLogo },
        { name: "Blue Ride", logo: blueRideLogo },
    ];

    return (
        <section className="relative border-y border-emerald-900 bg-emerald-950 py-4 overflow-hidden">
            {/* PREMIUM WATERMARK OVERLAY */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <span className="text-white font-black uppercase tracking-[0.3em] text-4xl sm:text-7xl lg:text-8xl opacity-[0.12] select-none">
                    HAPPY CLIENTS
                </span>
            </div>

            <div className="flex animate-scroll-fast whitespace-nowrap group relative z-10">
                {/* Double the list for seamless marquee */}
                {[...clients, ...clients].map((client, index) => (
                    <div key={index} className="flex flex-row items-center gap-2 sm:gap-3 mx-6 sm:mx-8 cursor-pointer hover:scale-105 transition-transform duration-300">
                        <div className="h-8 w-8 sm:h-10 sm:w-10 bg-white rounded-full shadow-sm border border-emerald-900 overflow-hidden relative p-0.5 shrink-0">
                            <img
                                src={client.logo}
                                alt={client.name}
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                        <span className="font-bold text-[10px] sm:text-[11px] text-emerald-100/90 uppercase tracking-widest whitespace-nowrap">{client.name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HappyClientsBar;
