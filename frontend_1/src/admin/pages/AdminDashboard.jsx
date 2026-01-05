import React, { useState } from 'react';
import {
    Users,
    Briefcase,
    Globe,
    ArrowUpRight,
    Eye,
} from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const StatCard = ({ title, value, change, icon: Icon, color, trend }) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${trend === 'up' ? 'text-emerald-600 bg-emerald-50' : 'text-red-500 bg-red-50'}`}>
                {change}
                {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <div className="w-3 h-3 rotate-180"><ArrowUpRight /></div>}
            </div>
        </div>
        <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
    </div>
);

const AdminDashboard = () => {

    // CHART DATA
    const trafficData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Site Visits',
                data: [1200, 1900, 3000, 5000, 2400, 3000, 3800],
                borderColor: '#05A4A7',
                backgroundColor: 'rgba(5, 164, 167, 0.1)',
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const sourceData = {
        labels: ['Organic', 'Social Media', 'Direct', 'Referral'],
        datasets: [
            {
                data: [35, 25, 20, 20],
                backgroundColor: ['#05A4A7', '#6366f1', '#f59e0b', '#ef4444'],
                borderWidth: 0,
            },
        ],
    };

    const leadData = {
        labels: ['Website', 'LinkedIn', 'Referral', 'Events'],
        datasets: [
            {
                label: 'Leads Generated',
                data: [45, 25, 15, 10],
                backgroundColor: '#6366f1',
                borderRadius: 4,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { font: { size: 10 } }
            },
            y: {
                grid: { color: '#f1f5f9' },
                ticks: { font: { size: 10 } }
            }
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
                <p className="text-slate-500 mt-1">Analytics and performance metrics.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Site Views"
                    value="124,592"
                    change="+12.5%"
                    trend="up"
                    icon={Eye}
                    color="bg-blue-500"
                />
                <StatCard
                    title="Job Applications"
                    value="1,482"
                    change="+8.2%"
                    trend="up"
                    icon={Users}
                    color="bg-violet-500"
                />
                <StatCard
                    title="Total Leads"
                    value="156"
                    change="+24%"
                    trend="up"
                    icon={Briefcase}
                    color="bg-emerald-500"
                />
                <StatCard
                    title="Global Reach"
                    value="18 Countries"
                    change="+2"
                    trend="up"
                    icon={Globe}
                    color="bg-orange-500"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Graph */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h2 className="font-bold text-slate-800 text-lg mb-6">Traffic Overview</h2>
                    <div className="h-64">
                        <Line options={chartOptions} data={trafficData} />
                    </div>
                </div>

                {/* Sources Pie Chart */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h2 className="font-bold text-slate-800 text-lg mb-6">Traffic Sources</h2>
                    <div className="h-48 flex justify-center">
                        <Doughnut
                            data={sourceData}
                            options={{
                                plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, usePointStyle: true } } }
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Lead Sources Bar */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-bold text-slate-800 text-lg">Lead Generation Channels</h2>
                    </div>
                    <div className="h-56">
                        <Bar options={chartOptions} data={leadData} />
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h2 className="font-bold text-slate-800 text-lg mb-4">Quick Actions</h2>
                    <div className="space-y-3">
                        <button className="w-full text-left px-4 py-3 rounded-xl bg-slate-50 hover:bg-primary/10 hover:text-primary transition-all text-sm font-medium flex items-center justify-between group">
                            <span>Add New Blog Post</span>
                            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                        <button className="w-full text-left px-4 py-3 rounded-xl bg-slate-50 hover:bg-primary/10 hover:text-primary transition-all text-sm font-medium flex items-center justify-between group">
                            <span>Review New Leads</span>
                            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                        <button className="w-full text-left px-4 py-3 rounded-xl bg-slate-50 hover:bg-primary/10 hover:text-primary transition-all text-sm font-medium flex items-center justify-between group">
                            <span>Check Applications</span>
                            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
