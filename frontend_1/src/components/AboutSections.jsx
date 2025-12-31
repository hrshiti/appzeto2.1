import React from 'react';

const AboutSections = () => {
    return (
        <div className="bg-[#FFFCF8] py-24">
            <div className="max-w-7xl mx-auto px-4 md:px-10">
                {/* Section 1: Top Dual Column */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">

                    {/* Left Column: Image with Overlays */}
                    <div className="relative">
                        <div className="rounded-[2.5rem] overflow-hidden shadow-xl aspect-[4/3] relative">
                            <img
                                src="https://images.unsplash.com/photo-1573167101669-476636b96cea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
                                alt="Founder Working"
                                className="w-full h-full object-cover"
                            />
                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Floating Quote Card */}
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl p-6 shadow-xl w-64 text-center">
                            <p className="font-bold text-gray-900 text-sm mb-1">"Building digital futures, together"</p>
                            <p className="text-xs text-gray-500">CEO, Appzeto</p>
                        </div>
                    </div>

                    {/* Right Column: Text Content */}
                    <div className="lg:pl-8 mt-12 lg:mt-0">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                            We empower businesses with future-ready tech
                        </h2>

                        <p className="text-gray-500 leading-relaxed mb-8">
                            At Appzeto, we don't just write code; we architect solutions. Our mission is to bridge the gap between complex technology and tangible business growth. By leveraging the latest in AI, cloud computing, and user-centric design, we turn your ambitious visions into robust, scalable realities.
                        </p>

                        <div className="bg-[#FFF8E7] border-l-4 border-[#FCD34D] p-6 rounded-r-xl">
                            <p className="text-sm font-medium text-gray-700 italic">
                                "Technology is the catalyst, but human ingenuity is the driver. We combine both to deliver excellence that matters."
                            </p>
                        </div>
                    </div>
                </div>


                {/* Section 2: Bottom Features */}
                <div className="text-center relative">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-10 text-gray-400">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle></svg>
                    </div>
                    <div className="absolute top-10 left-20 text-gray-400">
                        <span className="text-xl">✨</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 max-w-2xl mx-auto">
                        We help startups scale faster and smarter
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto mb-16">
                        From MVP to enterprise-grade systems, our holistic approach ensures every milestone is met with precision and quality.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-[#FDE68A] rounded-full flex items-center justify-center mb-6">
                                <span className="material-icons text-gray-900 text-2xl">person_outline</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Engineering</h3>
                            <p className="text-sm text-gray-500 text-center max-w-xs leading-relaxed">
                                Our team consists of industry veterans and coding prodigies dedicated to clean, efficient, and maintainable code.
                            </p>
                            <div className="mt-4 flex items-center text-gray-900 font-bold text-sm cursor-pointer hover:underline">
                                <span className="mr-1">↗</span> Visit site
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-[#FDE68A] rounded-full flex items-center justify-center mb-6">
                                <span className="material-icons text-gray-900 text-2xl">track_changes</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Result Driven</h3>
                            <p className="text-sm text-gray-500 text-center max-w-xs leading-relaxed">
                                We focus on KPIs that matter—user retention, load times, and conversion rates—to ensure tangible ROI.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="flex flex-col items-center relative">
                            {/* Decorative sparkle */}
                            <div className="absolute -top-4 right-10 text-black">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                            </div>
                            <div className="w-16 h-16 bg-[#FDE68A] rounded-full flex items-center justify-center mb-6">
                                <span className="material-icons text-gray-900 text-2xl">poll</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Success Guarantee</h3>
                            <p className="text-sm text-gray-500 text-center max-w-xs leading-relaxed">
                                We stand by our work. Our agile process includes rigorous testing and post-launch support to guarantee success.
                            </p>
                        </div>
                    </div>

                    {/* Floating icons decoration */}
                    <div className="absolute bottom-0 right-0 hidden md:block opacity-50">
                        <span className="material-icons text-4xl">open_in_full</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSections;
