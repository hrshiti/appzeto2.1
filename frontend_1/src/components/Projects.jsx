
import React from 'react';

const Projects = () => {
    return (
        <div className="bg-[#012829] dark:bg-background-dark text-white dark:text-white font-display overflow-x-hidden antialiased transition-colors duration-300">
            {/* Navbar */}


            {/* Main Content */}
            <main className="flex flex-col items-center w-full min-h-screen pb-20">
                {/* Header Section */}
                <div className="w-full max-w-7xl px-4 md:px-10 pt-16 pb-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="max-w-2xl">
                            <p className="text-primary font-bold text-sm uppercase tracking-wider mb-2">Our Portfolio</p>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-white dark:text-white leading-tight mb-4">
                                Transforming Ideas into <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-400">Digital Reality</span>
                            </h1>
                            <p className="text-gray-300 dark:text-gray-400 text-lg">
                                Explore our featured projects showcasing our expertise in mobile apps, web platforms, and enterprise solutions.
                            </p>
                        </div>
                        {/* Filter Chips */}
                        <div className="flex flex-wrap gap-2 md:justify-end">
                            <button className="px-4 py-2 rounded-full bg-primary text-gray-900 font-semibold text-sm shadow-sm transition-transform hover:-translate-y-0.5">All</button>
                            <button className="px-4 py-2 rounded-full bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-medium text-sm hover:border-primary hover:text-primary transition-colors">Mobile Apps</button>
                            <button className="px-4 py-2 rounded-full bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-medium text-sm hover:border-primary hover:text-primary transition-colors">Web Platforms</button>
                            <button className="px-4 py-2 rounded-full bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-medium text-sm hover:border-primary hover:text-primary transition-colors">AI Solutions</button>
                        </div>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="w-full max-w-7xl px-4 md:px-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {/* Project 1: Appzeto Taxi (Featured - Full Width) */}
                        <div className="md:col-span-2 group @container">
                            <div className="flex flex-col @3xl:flex-row items-stretch rounded-2xl bg-white dark:bg-[#023638] shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/30">
                                <div className="w-full @3xl:w-3/5 relative h-64 @3xl:h-auto overflow-hidden">
                                    <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10"></div>
                                    <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="Map interface on a smartphone showing a taxi route" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBXaBVtWvG_CBwWKgaWV9i4YHP_4Z56JnbeZGuLr08MnyzACzlsHE1MTosiTGatYzLa7e145lTA_Nnj4gdIOeIxdGNpD16sO5hda0zpmBepTYx4y0FTOKUAhKFxjdeJr26Yg4y-DHuYJ5F9xjqTQjGjBt0_vL1Y6XCQSOB8JpptkcO5cw5_5MJFt_1OOgxgMDzzXCzRSE2MW1lmSXvCB0kqt5siRUBOyvlIkqh85xabo9IuKOVHPSMc16VLHco43aijL5Cxs-VannZL")' }}>
                                    </div>
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className="bg-white/90 dark:bg-black/80 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-white uppercase tracking-wide">Mobile App</span>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center p-6 @3xl:p-10 w-full @3xl:w-2/5 gap-4">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-xl">flutter_dash</span>
                                        <p className="text-primary font-semibold text-sm">Flutter &amp; Google Maps API</p>
                                    </div>
                                    <h3 className="text-2xl @3xl:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">Appzeto Taxi</h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                                        A seamless ride-booking experience featuring real-time driver tracking, secure in-app payments, and an intuitive user interface for both drivers and passengers.
                                    </p>
                                    <div className="pt-4 flex items-center gap-4">
                                        <button className="flex items-center gap-2 text-gray-900 dark:text-white font-bold text-sm hover:text-primary transition-colors group/btn">
                                            View Case Study
                                            <span className="material-symbols-outlined text-lg transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Project 2: Appzeto Food */}
                        <div className="group flex flex-col rounded-2xl bg-white dark:bg-[#023638] shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                            <div className="w-full h-64 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-60"></div>
                                <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" data-alt="Colorful food delivery app interface on mobile screens" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDOX-NGTc2YgtLTYoYhLs7ng9Bzs2utNwtEhImOiyJg1I_LPxOjNTMHlSBH7c3Ouc9wNR_yfCXzlpXfuDH-VGevygKflySC6i0Hs6EsGfrkR15JJbI7jsvVxyh8SBAvcbsqPr_8WENiL77Y6fbLp_w7afGm6LNCZCpKdsf_u-UB0PMJ4Kj_rhXM8bhGRUwU88AUw-TNb3KIjW1eICN2YXI504IId8sWDoKDy_2JcYxeT7Q6X2WZ2flx-U_ADotOax3fUesDkw4RE8vz")' }}>
                                </div>
                                <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                                    <span className="bg-primary/90 text-gray-900 text-xs font-bold px-2.5 py-1 rounded-md">React Native</span>
                                    <span className="bg-black/60 text-white backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-md">Redux</span>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-1 gap-3">
                                <h3 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">Appzeto Food</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-1">
                                    Vibrant food delivery platform connecting users with local culinary favorites, featuring live order status and smart recommendations.
                                </p>
                                <a className="inline-flex items-center text-sm font-semibold text-primary mt-2" href="#">
                                    Explore Details <span className="material-symbols-outlined text-sm ml-1">open_in_new</span>
                                </a>
                            </div>
                        </div>

                        {/* Project 3: Appzeto E-commerce */}
                        <div className="group flex flex-col rounded-2xl bg-white dark:bg-[#023638] shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                            <div className="w-full h-64 relative overflow-hidden">
                                <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" data-alt="Sleek e-commerce dashboard on a laptop screen" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA15q0rQ9lPA_eYUgbNngOcDNBdM0voYfwMsTyLbCm22yqYsanq7Cgl6gxX8t0Oh3SuKut9lvp8v2wU8pFqKO_lJ1xhhyYJqfhnyiPaZXaoHIslMv8LNS7QYCOKn9l1DxpHGbM6bSRoOFgSkVuOQQu2nxx58CPVORh70F3XSx3rTvDoTDPArAOHsxvD7pP0FaQQcfiX55_XiqgL9Mn52ax7REf6731bYTKzdH1gbNqde5f_xoauq8pejSTWCOUSipe9GBsLNVzSK8o7")' }}>
                                </div>
                                <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                                    <span className="bg-primary/90 text-gray-900 text-xs font-bold px-2.5 py-1 rounded-md">Next.js</span>
                                    <span className="bg-black/60 text-white backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-md">Stripe</span>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-1 gap-3">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">Appzeto Shop</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-1">
                                    A highly scalable e-commerce dashboard designed for high-volume sales, inventory management, and customer analytics.
                                </p>
                                <a className="inline-flex items-center text-sm font-semibold text-primary mt-2" href="#">
                                    Explore Details <span className="material-symbols-outlined text-sm ml-1">open_in_new</span>
                                </a>
                            </div>
                        </div>

                        {/* Project 4: Appzeto Hospital */}
                        <div className="group flex flex-col rounded-2xl bg-white dark:bg-[#023638] shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                            <div className="w-full h-64 relative overflow-hidden">
                                <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" data-alt="Clean medical software interface with blue tones on a tablet" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD3EQOBJCmYz46tvx_O2PS7kf1zESzAQppGJ3RZwdsrfYdbQi70e-FGKbJQsnyGFLK-tpcbXf3lDPhJNbgcbb1YCpYoBC2Ca-BnQFj1nHe9AuhTO5AJC0HraU9SpSi9O2_rYu8il0gbdS5mVjf9BCxm5xyHN8fBfiLyLcnsNV2zYIuKL3yoegcwMsRIRPaRxblxGwTokNJBCekULCuJLrkb10lHSDvCQ_1DOzFFRpWwx7LI0b6XQQOw4owqshdIjbEXEOV6Gegq2x9Y")' }}>
                                </div>
                                <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                                    <span className="bg-primary/90 text-gray-900 text-xs font-bold px-2.5 py-1 rounded-md">Angular</span>
                                    <span className="bg-black/60 text-white backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-md">HIPAA Compliant</span>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-1 gap-3">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">Appzeto Health</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-1">
                                    Comprehensive patient management system streamlining appointments, records, and telemedicine consultations securely.
                                </p>
                                <a className="inline-flex items-center text-sm font-semibold text-primary mt-2" href="#">
                                    Explore Details <span className="material-symbols-outlined text-sm ml-1">open_in_new</span>
                                </a>
                            </div>
                        </div>

                        {/* Project 5: Appzeto CRM */}
                        <div className="group flex flex-col rounded-2xl bg-white dark:bg-[#023638] shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                            <div className="w-full h-64 relative overflow-hidden">
                                <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" data-alt="Data visualization dashboard with charts and graphs" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCJM1bafxYeqkmHHu3-2Vq1SXQCpiUmufI4gmhIok-aToyKuVO_iAHFkDxGbeXSeu4RMqzF6975HFSpknA0YUF_v7I0Gg1EjN0TQIL0EdkgL0U8UGZ3XiAdHhEIf1t-fViP3JGss_LMyS5M2N7SVPD2MAg8iUFDGDtdk0vVdo-KxPxUi-dc-nmHpN_D1j6a5LpORRuTEr-ukMb4jgwuSw2j9M7IMIQIPuFodQhSxDOoOaBX_Q_Svgr04spoj83ra8G4PJvIaIFvIkpB")' }}>
                                </div>
                                <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                                    <span className="bg-primary/90 text-gray-900 text-xs font-bold px-2.5 py-1 rounded-md">Vue.js</span>
                                    <span className="bg-black/60 text-white backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-md">D3.js</span>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-1 gap-3">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">Appzeto CRM</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-1">
                                    Powerful customer relationship management tool with advanced data visualization and predictive sales analytics.
                                </p>
                                <a className="inline-flex items-center text-sm font-semibold text-primary mt-2" href="#">
                                    Explore Details <span className="material-symbols-outlined text-sm ml-1">open_in_new</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>


            </main>

            {/* Footer */}

        </div>
    );
};

export default Projects;
