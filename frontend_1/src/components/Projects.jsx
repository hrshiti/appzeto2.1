
import React, { useState, useEffect, useRef } from 'react';

// --- Mock UI Components for "Homepages" ---

const TaxiAppUI = () => (
    <div className="w-full h-full bg-gray-100 relative overflow-hidden flex flex-col font-sans">
        <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop")' }}></div>
        <div className="absolute top-0 w-full p-4 pt-12 flex justify-between items-center z-10 pointer-events-none">
            <div className="bg-white/90 p-2 rounded-full shadow-md pointer-events-auto"><span className="material-symbols-outlined text-gray-800">menu</span></div>
            <div className="bg-white/90 px-4 py-2 rounded-full shadow-md font-bold text-gray-800 text-sm pointer-events-auto">Offline</div>
        </div>

        {/* Scrollable Bottom Sheet Container */}
        <div className="mt-auto bg-white rounded-t-3xl shadow-2xl z-10 relative h-[60%] flex flex-col">
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-4 mb-2 flex-shrink-0"></div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto px-6 pb-20 no-scrollbar">
                <h3 className="text-xl font-bold text-gray-800 mb-4 sticky top-0 bg-white py-2">Where to?</h3>

                {/* Recent Locations */}
                <div className="flex flex-col gap-3 mb-6">
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors">
                        <div className="p-2 bg-gray-200 rounded-full"><span className="material-symbols-outlined text-gray-600">work</span></div>
                        <div>
                            <p className="font-bold text-gray-800 text-sm">Office</p>
                            <p className="text-gray-500 text-xs">24, Tech Park, Sector 5</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors">
                        <div className="p-2 bg-gray-200 rounded-full"><span className="material-symbols-outlined text-gray-600">home</span></div>
                        <div>
                            <p className="font-bold text-gray-800 text-sm">Home</p>
                            <p className="text-gray-500 text-xs">102, Green Valley</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors">
                        <div className="p-2 bg-gray-200 rounded-full"><span className="material-symbols-outlined text-gray-600">history</span></div>
                        <div>
                            <p className="font-bold text-gray-800 text-sm">Gym</p>
                            <p className="text-gray-500 text-xs">FitPro Center, Main Rd</p>
                        </div>
                    </div>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-3 sticky top-10 bg-white py-2 z-10">Ride Options</h3>
                <div className="h-[200px] overflow-hidden relative">
                    <div className="animate-scroll-vertical">
                        {[
                            { type: 'Economy', price: '$12.50', time: '3 min', icon: 'local_taxi' },
                            { type: 'Premium', price: '$24.00', time: '5 min', icon: 'directions_car' },
                            { type: 'Electric', price: '$14.20', time: '4 min', icon: 'electric_car' },
                            { type: 'Van', price: '$32.00', time: '8 min', icon: 'airport_shuttle' },
                            { type: 'Bike', price: '$8.50', time: '2 min', icon: 'two_wheeler' },
                            // Duplicated for seamless loop
                            { type: 'Economy', price: '$12.50', time: '3 min', icon: 'local_taxi' },
                            { type: 'Premium', price: '$24.00', time: '5 min', icon: 'directions_car' },
                            { type: 'Electric', price: '$14.20', time: '4 min', icon: 'electric_car' },
                            { type: 'Van', price: '$32.00', time: '8 min', icon: 'airport_shuttle' },
                            { type: 'Bike', price: '$8.50', time: '2 min', icon: 'two_wheeler' },
                        ].map((ride, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-primary/50 cursor-pointer mb-3">
                                <div className="flex items-center gap-4">
                                    <span className="material-symbols-outlined text-3xl text-gray-700">{ride.icon}</span>
                                    <div>
                                        <p className="font-bold text-gray-800">{ride.type}</p>
                                        <p className="text-xs text-gray-500">{ride.time} away</p>
                                    </div>
                                </div>
                                <span className="font-bold text-gray-900">{ride.price}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const FoodAppUI = () => (
    <div className="w-full h-full bg-white flex flex-col font-sans overflow-hidden">
        <div className="p-6 pt-12 bg-white sticky top-0 z-20">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Delivering to</p>
            <div className="flex items-center gap-1 text-[#05A4A7]">
                <span className="text-lg font-black text-gray-800">Home • 12th Street</span>
                <span className="material-symbols-outlined text-sm">expand_more</span>
            </div>
            <div className="mt-4 flex items-center gap-2 bg-gray-100 p-3 rounded-xl text-gray-400">
                <span className="material-symbols-outlined">search</span>
                <span className="text-sm font-medium">Pizza, Burger, Sushi...</span>
            </div>
        </div>
        <div className="flex-1 overflow-hidden px-6 pb-20 relative">
            <div className="animate-scroll-vertical">
                {/* Content Block */}
                <div className="pb-8">
                    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
                        {['Pizza', 'Burger', 'Asian', 'Vegan'].map((cat, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 min-w-[70px]">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${i === 0 ? 'bg-[#05A4A7] text-white' : 'bg-gray-100 text-gray-600'}`}>
                                    <span className="material-symbols-outlined">{cat === 'Pizza' ? 'local_pizza' : cat === 'Burger' ? 'lunch_dining' : 'ramen_dining'}</span>
                                </div>
                                <span className="text-xs font-bold text-gray-700">{cat}</span>
                            </div>
                        ))}
                    </div>
                    <h3 className="font-black text-gray-800 text-lg mt-4 mb-3">Featured</h3>
                    <div className="flex flex-col gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-full rounded-2xl overflow-hidden shadow-sm border border-gray-100 shrink-0">
                                <div className="h-32 bg-gray-200 bg-cover bg-center" style={{ backgroundImage: i % 2 === 0 ? 'url("https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=500&auto=format&fit=crop")' : 'url("https://images.unsplash.com/photo-1561758033-d8f3c665b156?q=80&w=500&auto=format&fit=crop")' }}></div>
                                <div className="p-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-bold text-gray-800">{i % 2 === 0 ? 'Italian Delight' : 'Burger King'}</h4>
                                            <p className="text-xs text-gray-500">{i % 2 === 0 ? 'Italian • Pasta' : 'American • Burgers'} • $$</p>
                                        </div>
                                        <div className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs font-bold">4.{8 - (i % 3)}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* DUPLICATE Content Block */}
                <div className="pb-8">
                    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
                        {['Pizza', 'Burger', 'Asian', 'Vegan'].map((cat, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 min-w-[70px]">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${i === 0 ? 'bg-[#05A4A7] text-white' : 'bg-gray-100 text-gray-600'}`}>
                                    <span className="material-symbols-outlined">{cat === 'Pizza' ? 'local_pizza' : cat === 'Burger' ? 'lunch_dining' : 'ramen_dining'}</span>
                                </div>
                                <span className="text-xs font-bold text-gray-700">{cat}</span>
                            </div>
                        ))}
                    </div>
                    <h3 className="font-black text-gray-800 text-lg mt-4 mb-3">Featured</h3>
                    <div className="flex flex-col gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-full rounded-2xl overflow-hidden shadow-sm border border-gray-100 shrink-0">
                                <div className="h-32 bg-gray-200 bg-cover bg-center" style={{ backgroundImage: i % 2 === 0 ? 'url("https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=500&auto=format&fit=crop")' : 'url("https://images.unsplash.com/photo-1561758033-d8f3c665b156?q=80&w=500&auto=format&fit=crop")' }}></div>
                                <div className="p-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-bold text-gray-800">{i % 2 === 0 ? 'Italian Delight' : 'Burger King'}</h4>
                                            <p className="text-xs text-gray-500">{i % 2 === 0 ? 'Italian • Pasta' : 'American • Burgers'} • $$</p>
                                        </div>
                                        <div className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs font-bold">4.{8 - (i % 3)}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const ShopAppUI = () => (
    <div className="w-full h-full bg-gray-50 flex flex-col font-sans">
        <div className="px-6 pt-12 pb-4 bg-white flex justify-between items-center z-10">
            <span className="material-symbols-outlined text-gray-800">menu</span>
            <span className="font-black text-xl text-gray-900">SHOP.</span>
            <span className="material-symbols-outlined text-gray-800">shopping_bag</span>
        </div>
        <div className="flex-1 overflow-hidden pb-20 no-scrollbar relative">
            <div className="pb-8">
                <div className="relative w-full h-64 bg-gray-900 flex items-center justify-center text-center p-6 mb-6">
                    <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=500&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-60" alt="" />
                    <div className="relative z-10 text-white">
                        <p className="text-xs font-bold uppercase tracking-widest mb-2">New Season</p>
                        <h2 className="text-3xl font-black mb-4">Summer <br />Collection</h2>
                        <button className="px-6 py-2 bg-white text-black font-bold text-sm">Shop Now</button>
                    </div>
                </div>
                <div className="px-6">
                    <div className="flex justify-between items-end mb-4">
                        <h3 className="font-bold text-xl text-gray-900">Popular</h3>
                        <span className="text-xs text-gray-500 font-bold">See All</span>
                    </div>

                    {/* Two Column Grid with ALTERNATING SCROLL DIRECTION */}
                    <div className="flex gap-4 h-[400px] overflow-hidden">
                        {/* Column 1: Scrolls UP (Standard) */}
                        <div className="flex-1 overflow-hidden relative">
                            <div className="animate-scroll-vertical flex flex-col gap-4">
                                {[1, 3, 5, 7, 1, 3, 5, 7].map((i, idx) => (
                                    <div key={idx} className="flex flex-col gap-2 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                                        <div className="aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden relative group">
                                            <img src={`https://images.unsplash.com/photo-${i % 4 === 0 ? '1515886657613-9f3515b0c78f' : i % 4 === 1 ? '1529139574466-a30232743491' : i % 4 === 2 ? '1503342217505-b0215e948416' : '1542291026-7eec264c27ff'}?q=80&w=300&auto=format&fit=crop`} className="w-full h-full object-cover" alt="" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800 text-sm">$129.00</p>
                                            <p className="text-xs text-gray-500">Urban Jacket</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Column 2: Scrolls DOWN (Reverse) */}
                        <div className="flex-1 overflow-hidden relative">
                            <div className="animate-scroll-vertical-reverse flex flex-col gap-4">
                                {[2, 4, 6, 8, 2, 4, 6, 8].map((i, idx) => (
                                    <div key={idx} className="flex flex-col gap-2 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                                        <div className="aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden relative group">
                                            <img src={`https://images.unsplash.com/photo-${i % 4 === 0 ? '1515886657613-9f3515b0c78f' : i % 4 === 1 ? '1529139574466-a30232743491' : i % 4 === 2 ? '1503342217505-b0215e948416' : '1542291026-7eec264c27ff'}?q=80&w=300&auto=format&fit=crop`} className="w-full h-full object-cover" alt="" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800 text-sm">$89.00</p>
                                            <p className="text-xs text-gray-500">Casual Tee</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
);

const HealthAppUI = () => (
    <div className="w-full h-full bg-[#f8fcfc] flex flex-col font-sans">
        <div className="px-6 pt-12 pb-6 bg-white rounded-b-3xl shadow-sm z-10">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <p className="text-gray-400 text-xs font-bold uppercase">Hello,</p>
                    <p className="text-2xl font-black text-gray-800">Sarah Jones</p>
                </div>
                <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
                </div>
            </div>
            <div className="bg-[#05A4A7] rounded-2xl p-4 text-white shadow-lg shadow-teal-200">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-xs font-medium opacity-80">Next Appointment</p>
                    <span className="material-symbols-outlined text-white">more_horiz</span>
                </div>
                <h3 className="font-bold text-lg mb-1">Dr. Michael Smith</h3>
                <p className="text-sm opacity-90 mb-3">Cardiologist • City Hospital</p>
                <div className="flex gap-4">
                    <div className="bg-white/20 px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1"><span className="material-symbols-outlined text-xs">event</span> Mon, 12 Oct</div>
                    <div className="bg-white/20 px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1"><span className="material-symbols-outlined text-xs">schedule</span> 09:30 AM</div>
                </div>
            </div>
        </div>
        <div className="p-6 flex-1 overflow-y-auto">
            <h3 className="font-bold text-gray-800 mb-4">Categories</h3>
            <div className="grid grid-cols-3 gap-y-6 gap-x-4 mb-8">
                {['Doctor', 'Medicine', 'Reports', 'Hospital', 'Ambulance', 'More'].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${i === 0 ? 'bg-blue-100 text-blue-600' : i === 1 ? 'bg-red-100 text-red-600' : 'bg-white text-gray-500'}`}>
                            <span className="material-symbols-outlined">{item === 'Doctor' ? 'stethoscope' : item === 'Medicine' ? 'pill' : item === 'Reports' ? 'description' : item === 'Hospital' ? 'local_hospital' : item === 'Ambulance' ? 'ambulance' : 'grid_view'}</span>
                        </div>
                        <p className="text-xs font-bold text-gray-600">{item}</p>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800">Top Doctors</h3>
                <span className="text-xs text-[#05A4A7] font-bold">See All</span>
            </div>
            <div className="h-[400px] overflow-hidden relative">
                <div className="animate-scroll-vertical flex flex-col gap-4">
                    {[1, 2, 3, 4, 1, 2, 3, 4].map((i, idx) => ( // Duplicated
                        <div key={idx} className="flex gap-4 p-3 bg-white rounded-xl shadow-sm border border-gray-100 shrink-0">
                            <div className="w-16 h-16 rounded-lg bg-gray-200 overflow-hidden">
                                <img src={`https://randomuser.me/api/portraits/med/men/${i + 10}.jpg`} className="w-full h-full object-cover" alt="" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800 text-sm">Dr. Robert Fox</h4>
                                <p className="text-xs text-gray-500 mb-1">Neurologist • St. Mary</p>
                                <div className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs text-yellow-400">star</span>
                                    <span className="text-xs font-bold text-gray-700">4.9</span>
                                    <span className="text-xs text-gray-400">(120 Reviews)</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const CRMAppUI = () => (
    <div className="w-full h-full bg-[#1e1e2e] flex flex-col font-sans text-white">
        <div className="p-6 pt-12 flex justify-between items-center">
            <span className="material-symbols-outlined text-gray-400">menu</span>
            <span className="font-bold text-lg">Dashboard</span>
            <span className="material-symbols-outlined text-gray-400">notifications</span>
        </div>
        <div className="px-6 pb-6">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <p className="text-white/70 text-sm font-medium">Total Revenue</p>
                    <h2 className="text-3xl font-black mt-1">$48,294.00</h2>
                    <div className="flex items-center gap-1 mt-2 text-green-300 text-sm font-bold">
                        <span className="material-symbols-outlined text-sm">trending_up</span> +12.5%
                    </div>
                </div>
                <div className="absolute right-0 bottom-0 opacity-20"><span className="material-symbols-outlined text-9xl">bar_chart</span></div>
            </div>
        </div>
        <div className="flex-1 bg-white rounded-t-3xl p-6 text-gray-900 overflow-hidden relative">
            <div className="animate-scroll-vertical">
                {/* Content Block */}
                <div className="pb-8">
                    <h3 className="font-bold text-lg mb-4">Analytics</h3>
                    <div className="flex items-end justify-between h-32 gap-3 mb-8 px-2 border-b border-gray-100 pb-4">
                        {[40, 70, 50, 90, 60, 80, 55].map((h, i) => (
                            <div key={i} className="w-full bg-indigo-500 rounded-t-lg relative group transition-all hover:bg-indigo-600" style={{ height: `${h}%` }}>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-4 mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">A</div>
                            <div className="flex-1">
                                <p className="font-bold text-sm">Active Users</p>
                                <div className="w-full h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                                    <div className="w-[70%] h-full bg-orange-500 rounded-full"></div>
                                </div>
                            </div>
                            <span className="font-bold text-sm">70%</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">N</div>
                            <div className="flex-1">
                                <p className="font-bold text-sm">New Sales</p>
                                <div className="w-full h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                                    <div className="w-[45%] h-full bg-blue-500 rounded-full"></div>
                                </div>
                            </div>
                            <span className="font-bold text-sm">45%</span>
                        </div>
                    </div>

                    <h3 className="font-bold text-lg mb-4">Recent Transactions</h3>
                    <div className="flex flex-col gap-3">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                        <span className="material-symbols-outlined text-sm">shopping_cart</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800 text-sm">Order #{20230 + i}</p>
                                        <p className="text-xs text-gray-500">2 min ago</p>
                                    </div>
                                </div>
                                <span className="font-bold text-gray-900 text-sm">+$12{i}.00</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* DUPLICATED Content Block */}
                <div className="pb-8">
                    <h3 className="font-bold text-lg mb-4">Analytics</h3>
                    <div className="flex items-end justify-between h-32 gap-3 mb-8 px-2 border-b border-gray-100 pb-4">
                        {[40, 70, 50, 90, 60, 80, 55].map((h, i) => (
                            <div key={i} className="w-full bg-indigo-500 rounded-t-lg relative group transition-all hover:bg-indigo-600" style={{ height: `${h}%` }}>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-4 mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">A</div>
                            <div className="flex-1">
                                <p className="font-bold text-sm">Active Users</p>
                                <div className="w-full h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                                    <div className="w-[70%] h-full bg-orange-500 rounded-full"></div>
                                </div>
                            </div>
                            <span className="font-bold text-sm">70%</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">N</div>
                            <div className="flex-1">
                                <p className="font-bold text-sm">New Sales</p>
                                <div className="w-full h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                                    <div className="w-[45%] h-full bg-blue-500 rounded-full"></div>
                                </div>
                            </div>
                            <span className="font-bold text-sm">45%</span>
                        </div>
                    </div>

                    <h3 className="font-bold text-lg mb-4">Recent Transactions</h3>
                    <div className="flex flex-col gap-3">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                        <span className="material-symbols-outlined text-sm">shopping_cart</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800 text-sm">Order #{20230 + i}</p>
                                        <p className="text-xs text-gray-500">2 min ago</p>
                                    </div>
                                </div>
                                <span className="font-bold text-gray-900 text-sm">+$12{i}.00</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// --- Main Projects Component ---

const projects = [
    {
        title: "Appzeto Taxi",
        tags: ["Mobile App", "Flutter"],
        description: "A seamless ride-booking experience featuring real-time driver tracking, secure in-app payments, and an intuitive user interface.",
        UI: TaxiAppUI
    },
    {
        title: "Appzeto Food",
        tags: ["React Native", "Redux"],
        description: "Vibrant food delivery platform connecting users with local culinary favorites, featuring live order status and smart recommendations.",
        UI: FoodAppUI
    },
    {
        title: "Appzeto Shop",
        tags: ["Next.js", "Stripe"],
        description: "A highly scalable e-commerce dashboard designed for high-volume sales, inventory management, and customer analytics.",
        UI: ShopAppUI
    },
    {
        title: "Appzeto Health",
        tags: ["Angular", "HIPAA Compliant"],
        description: "Comprehensive patient management system streamlining appointments, records, and telemedicine consultations securely.",
        UI: HealthAppUI
    },
    {
        title: "Appzeto CRM",
        tags: ["Vue.js", "Analytics"],
        description: "Powerful customer relationship management tool with advanced data visualization and predictive sales analytics.",
        UI: CRMAppUI
    }
];

const Projects = () => {
    const [activeProject, setActiveProject] = useState(0);
    const containerRef = useRef(null);
    const isScrolling = useRef(false);

    useEffect(() => {
        const handleWheel = (e) => {
            if (isScrolling.current) return;

            // Check if we are inside the section visually
            const rect = containerRef.current.getBoundingClientRect();

            // "Screen puri aa jaaye": Check if section is fully visible
            // If top is positive but small (e.g., 0 to 50px), it means we are JUST arriving. 
            // If top is negative, we have scrolled past it.

            // 1. DOCKING LOGIC: If we are close to alignment, snap to it first.
            const isAlmostAligned = Math.abs(rect.top) < 30; // Within 30px of top
            const isFullyVisible = rect.top >= -5 && rect.bottom <= window.innerHeight + 5;

            // If we are scrolling DOWN and section is visible but not perfectly docked yet?
            // Actually, natural scroll handles arrival. We need to TRAP when it arrives.

            if (!isAlmostAligned) return; // Allow natural scroll until we hit the header

            // Logic to move between projects - STANDARD DIRECTION
            if (e.deltaY > 0) {
                // Scrolling DOWN
                if (activeProject < projects.length - 1) {
                    // We have slides left. LOCK THE SCREEN.
                    e.preventDefault();

                    // Force precise alignment if not already 0 to ensure "Sticky" feel
                    if (Math.abs(rect.top) > 2) {
                        window.scrollTo({
                            top: window.scrollY + rect.top,
                            behavior: 'instant'
                        });
                    }

                    if (!isScrolling.current) {
                        isScrolling.current = true;
                        setActiveProject(prev => prev + 1);
                        setTimeout(() => isScrolling.current = false, 700);
                    }
                }
                // Else: User is at Last Project -> Release Lock (Allow default scroll)
            } else {
                // Scrolling UP
                if (activeProject > 0) {
                    // We have slides before. LOCK THE SCREEN.
                    e.preventDefault();

                    // Force precise alignment
                    if (Math.abs(rect.top) > 2) {
                        window.scrollTo({
                            top: window.scrollY + rect.top,
                            behavior: 'instant'
                        });
                    }

                    if (!isScrolling.current) {
                        isScrolling.current = true;
                        setActiveProject(prev => prev - 1);
                        setTimeout(() => isScrolling.current = false, 700);
                    }
                }
                // Else: User is at First Project -> Release Lock (Allow default scroll UP)
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false });
        }
        return () => {
            if (container) {
                container.removeEventListener('wheel', handleWheel);
            }
        };
    }, [activeProject]);

    return (
        <div className="bg-[#012829] dark:bg-background-dark text-white font-display overflow-x-hidden antialiased">

            {/* Full Screen Section: Exactly 100vh Height */}
            <div ref={containerRef} className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">

                {/* Increased Gap: gap-12 lg:gap-24 for separation */}
                {/* Increased Gap: gap-12 lg:gap-24 for separation */}
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 h-full py-4">

                    {/* Left: Text Content - Vertically Centered */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center h-full gap-6 order-2 lg:order-1 relative z-20 items-start text-left">
                        {/* Static Header Label */}
                        <div className="text-primary font-bold text-sm uppercase tracking-widest opacity-80">
                            Featured Projects
                        </div>

                        {/* Dynamic Content with Staggered Animation */}
                        <div key={activeProject} className="flex flex-col gap-6 items-start">
                            {/* Tags: Slide In from LEFT */}
                            <div className="flex flex-wrap gap-2 opacity-0 animate-slide-in-left justify-start" style={{ animationDelay: '0ms' }}>
                                {projects[activeProject].tags.map((tag, i) => (
                                    <span key={i} className="px-4 py-1.5 bg-primary/10 rounded-full text-primary text-sm md:text-base font-bold border border-primary/20">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Title: Slide In from RIGHT + Color Fill Effect */}
                            {/* We use bg-gradient-to-r from-white to-white (solid fill) but start with width 0 and animate text-fill */}
                            <h2 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white bg-no-repeat leading-[0.95] tracking-tight opacity-0 animate-slide-in-right"
                                style={{
                                    animationDelay: '100ms',
                                    animationFillMode: 'forwards',
                                    animationName: 'slideInRight, textFill' // Run both animations
                                }}>
                                {projects[activeProject].title}
                            </h2>

                            {/* Description: Slide In from LEFT (as requested "jo paragraph hai wh left se aaye") */}
                            <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed max-w-2xl font-light opacity-0 animate-slide-in-left text-left" style={{ animationDelay: '200ms' }}>
                                {projects[activeProject].description}
                            </p>

                            <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                                <button className="flex items-center gap-3 px-8 py-4 bg-[#F1FC88] text-gray-900 rounded-xl font-bold text-lg hover:bg-[#EAF576] transform hover:-translate-y-1 transition-all duration-300 group w-fit shadow-lg shadow-[#F0FF35]/20 mt-4">
                                    View Case Study
                                    <span className="material-symbols-outlined text-2xl transition-transform group-hover:translate-x-1">arrow_forward</span>
                                </button>
                            </div>
                        </div>

                        {/* Progress Indicators - Height and Width Adjusted for better visibility */}
                        <div className="flex gap-3 mt-8">
                            {projects.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveProject(idx)}
                                    // Height increased to h-4 (approx 16px) for visibility
                                    // Default width increased slightly to w-6
                                    className={`h-4 rounded-full transition-all duration-500 ease-out cursor-pointer hover:bg-primary/50 ${idx === activeProject ? 'w-24 bg-primary shadow-[0_0_15px_#05A4A7]' : 'w-6 bg-gray-700/50'}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right: Sticky Phone - Maximized Height within Viewport */}
                    {/* Centered Alignment: justify-center instead of justify-end */}
                    <div className="w-full lg:w-1/2 flex justify-center items-center h-full order-1 lg:order-2 py-[2vh] lg:py-[5vh]">
                        {/* Phone Dimensions preserved, position slightly adjusted by flex */}
                        {/* ANIMATED PHONE CONTAINER: Added key and animation class */}
                        {/* Added stopPropagation to allow scrolling INSIDE the phone without switching projects */}
                        <div
                            key={activeProject}
                            onWheel={(e) => e.stopPropagation()}
                            className="relative h-[85vh] w-auto aspect-[1/2] max-h-[900px] border-[1vh] border-gray-900 rounded-[4vh] overflow-hidden bg-black shadow-2xl ring-1 ring-white/10 z-10 transform transition-transform duration-500 animate-slide-in-right"
                        >
                            {/* Phone Notch */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[25%] h-[3.5%] bg-black rounded-b-[2vh] z-40 flex items-center justify-center gap-2">
                                <div className="w-[40%] h-[20%] bg-gray-900/50 rounded-full"></div>
                            </div>

                            {/* Inner Screen */}
                            <div className="relative w-full h-full bg-[#10221f]">
                                {projects.map((project, index) => {
                                    const UIComponent = project.UI;
                                    // Only render the active project to avoid stacking and let parent animation handle entry
                                    if (activeProject !== index) return null;

                                    return (
                                        <div
                                            key={index}
                                            className="absolute inset-0 w-full h-full"
                                        >
                                            {/* STATUS BAR MOCK */}
                                            <div className="absolute top-0 w-full px-[5%] py-[3%] flex justify-between items-center z-50 text-[1.2vh] font-bold pointer-events-none mix-blend-difference text-white">
                                                <span>9:41</span>
                                                <div className="flex gap-1">
                                                    <span className="material-symbols-outlined text-[1.4vh]">signal_cellular_alt</span>
                                                    <span className="material-symbols-outlined text-[1.4vh]">wifi</span>
                                                    <span className="material-symbols-outlined text-[1.4vh]">battery_full</span>
                                                </div>
                                            </div>

                                            <UIComponent />

                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Decorative Background Elements */}
                        <div className="absolute top-1/2 right-0 w-[90vh] h-[90vh] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none z-0 mix-blend-screen"></div>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default Projects;
