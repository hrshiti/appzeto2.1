import React, { useState, useEffect } from 'react';
import {
    Users,
    Briefcase,
    Globe,
    ArrowUpRight,
    Eye,
} from 'lucide-react';
import { dataService } from '../services/dataService';
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
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        leads: 0,
        applications: 0,
        views: 124592, // Static for now
        global: 18 // Static for now
    });
    const [recentLeads, setRecentLeads] = useState([]);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [leads, applications] = await Promise.all([
                    dataService.getLeads(),
                    dataService.getApplications()
                ]);

                // Update Stats
                setStats(prev => ({
                    ...prev,
                    leads: leads?.length || 0,
                    applications: applications?.length || 0
                }));

                // Recent Leads (Sort by Date DESC, Take 5)
                const sortedLeads = [...(leads || [])]
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 5);
                setRecentLeads(sortedLeads);

                // Prepare Chart Data (Leads by Service)
                const serviceCounts = (leads || []).reduce((acc, lead) => {
                    // Normalize service name if needed
                    const svc = lead.service || 'Other';
                    acc[svc] = (acc[svc] || 0) + 1;
                    return acc;
                }, {});

                const labels = Object.keys(serviceCounts);
                const data = Object.values(serviceCounts);

                // Colors for chart
                const colors = ['#05A4A7', '#6366f1', '#f59e0b', '#ef4444', '#8b5cf6', '#10b981'];

                setChartData({
                    labels,
                    datasets: [{
                        data,
                        backgroundColor: colors.slice(0, labels.length),
                        borderWidth: 0
                    }]
                });

                setLoading(false);
            } catch (error) {
                console.error("Dashboard data load error:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // CHART DATA (Static Fallbacks / Dynamic)
    const sourceData = chartData || {
        labels: ['No Data'],
        datasets: [
            {
                data: [1],
                backgroundColor: ['#e2e8f0'],
                borderWidth: 0,
            },
        ],
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
                <p className="text-slate-500 mt-1">Real-time analytics and performance metrics.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StatCard
                    title="Job Applications"
                    value={stats.applications.toLocaleString()}
                    change="Total Received"
                    trend="up"
                    icon={Users}
                    color="bg-violet-500"
                />
                <StatCard
                    title="Total Leads"
                    value={stats.leads.toLocaleString()}
                    change="All Time"
                    trend="up"
                    icon={Briefcase}
                    color="bg-emerald-500"
                />
            </div>


        </div>
    );
};

export default AdminDashboard;
