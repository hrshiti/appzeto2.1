import React from 'react';

const MarqueeSection = () => {
    const line1 = [
        "ARTIFICIAL INTELLIGENCE", "——", "MACHINE LEARNING", "——", "WEB DEVELOPMENT", "——", "MOBILE APPS", "——",
        "ARTIFICIAL INTELLIGENCE", "——", "MACHINE LEARNING", "——", "WEB DEVELOPMENT", "——", "MOBILE APPS", "——"
    ];

    const line2 = [
        "CLOUD COMPUTING", "——", "UI/UX DESIGN", "——", "DATA ANALYTICS", "——", "CYBER SECURITY", "——",
        "CLOUD COMPUTING", "——", "UI/UX DESIGN", "——", "DATA ANALYTICS", "——", "CYBER SECURITY", "——"
    ];

    return (
        <div className="w-full bg-[#f2f2f2] text-[#1a1a1a] py-20 overflow-hidden font-sans">

            {/* Line 1 - Scrolling Left */}
            <div className="flex whitespace-nowrap overflow-hidden mb-4">
                <div className="animate-marquee flex items-center">
                    {line1.map((item, index) => (
                        <React.Fragment key={index}>
                            {item === "——" ? (
                                <div className="w-24 h-[2px] bg-gray-400 mx-4 self-center"></div>
                            ) : (
                                <span className="text-[8vw] md:text-[6vw] font-bold uppercase tracking-tighter leading-none mx-4 text-[#1a1a1a]">
                                    {item}
                                </span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Line 2 - Scrolling Right (Reverse) */}
            <div className="flex whitespace-nowrap overflow-hidden">
                <div className="animate-marquee-reverse flex items-center">
                    {line2.map((item, index) => (
                        <React.Fragment key={index}>
                            {item === "——" ? (
                                <div className="w-24 h-[2px] bg-gray-400 mx-4 self-center"></div>
                            ) : (
                                <span
                                    className="text-[8vw] md:text-[6vw] font-bold uppercase tracking-tighter leading-none mx-4 text-transparent stroke-text"
                                    style={{ WebkitTextStroke: "2px #1a1a1a" }}
                                >
                                    {item}
                                </span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default MarqueeSection;
