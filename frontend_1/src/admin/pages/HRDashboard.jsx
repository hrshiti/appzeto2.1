import React, { useState } from 'react';
import {
    Users,
    Award,
    MapPin,
    Clock,
    Filter,
    Search,
    Plus
} from 'lucide-react';

const HRDashboard = () => {
    const [filter, setFilter] = useState('active');

    const stats = [
        { label: 'Open Positions', value: '12', color: 'text-blue-600', bg: 'bg-blue-100' },
        { label: 'Total Applications', value: '1,432', color: 'text-violet-600', bg: 'bg-violet-100' },
        { label: 'Interviews Scheduled', value: '8', color: 'text-orange-600', bg: 'bg-orange-100' },
        { label: 'Hired This Month', value: '3', color: 'text-emerald-600', bg: 'bg-emerald-100' },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-lg font-bold text-[#012829]">Recruitment Dashboard</h1>
                </div>
                <button className="bg-primary hover:bg-[#048a8d] text-white px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-primary/20">
                    <Plus size={18} />
                    Post New Job
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">{stat.label}</p>
                        <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Application Pipeline */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <h2 className="font-bold text-slate-800 text-lg">Recent Applications</h2>
                            <div className="flex items-center gap-2">
                                <Search className="w-4 h-4 text-slate-400" />
                                <Filter className="w-4 h-4 text-slate-400" />
                            </div>
                        </div>

                        <div className="divide-y divide-slate-100">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                                    <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm">
                                        JS
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-800 text-sm group-hover:text-primary transition-colors">Jane Smith {i}</h3>
                                        <p className="text-slate-500 text-xs">Senior React Developer • Mumbai</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="inline-block px-2 py-1 rounded-md bg-yellow-50 text-yellow-600 text-[10px] font-bold uppercase tracking-wide">
                                            Screening
                                        </span>
                                        <p className="text-slate-400 text-[10px] mt-1">Applied 2d ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border-t border-slate-100 text-center">
                            <button className="text-sm font-bold text-primary hover:text-[#048a8d]">View All Applications</button>
                        </div>
                    </div>
                </div>

                {/* Active Jobs Widget */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-bold text-slate-800 text-lg">Active Listings</h2>
                            <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded">12 Live</span>
                        </div>

                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="p-4 rounded-xl border border-slate-100 hover:border-primary/30 transition-all cursor-pointer">
                                    <h3 className="font-bold text-slate-800 text-sm mb-2">Frontend Developer</h3>
                                    <div className="flex items-center gap-3 text-xs text-slate-500">
                                        <div className="flex items-center gap-1">
                                            <MapPin size={12} /> Remote
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock size={12} /> Full-time
                                        </div>
                                    </div>
                                    <div className="mt-3 flex items-center justify-between text-xs">
                                        <span className="font-medium text-slate-400">45 Applicants</span>
                                        <span className="text-primary font-bold">View</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HRDashboard;
