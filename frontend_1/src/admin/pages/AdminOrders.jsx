import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, ShoppingBag, CreditCard, Calendar, User, Mail, Phone, Download } from 'lucide-react';
import { useToast } from '../context/ToastContext';
// import { format } from 'date-fns'; // Use built-in Intl if date-fns not available

const AdminOrders = () => {
    const { addToast } = useToast();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/payments`);
            setOrders(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching orders", error);
            addToast("Failed to fetch orders", "error");
            setLoading(false);
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            (order.name && order.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (order.email && order.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (order.productName && order.productName.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (order.razorpayPaymentId && order.razorpayPaymentId.includes(searchTerm));

        const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Transaction History</h1>
                    <p className="text-sm text-slate-500">View and manage all purchase attempts and successful orders.</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={fetchOrders} className="p-2 text-slate-600 hover:bg-white rounded-lg transition-colors" title="Refresh">
                        <span className="material-symbols-outlined">refresh</span>
                    </button>
                    {/* Placeholder for future Export button */}
                    {/* <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50">
                        <Download size={16} /> Export
                    </button> */}
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name, email, product or ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#05A4A7]/20 focus:border-[#05A4A7] transition-all"
                    />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                    {['all', 'paid', 'pending', 'failed'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all whitespace-nowrap ${filterStatus === status
                                ? 'bg-slate-800 text-white border-slate-800'
                                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Date & Order ID</th>
                                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Customer</th>
                                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Product / Service</th>
                                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Plan & Amount</th>
                                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="p-10 text-center text-slate-400">Loading transactions...</td>
                                </tr>
                            ) : filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-10 text-center text-slate-400">No transactions found matching your criteria.</td>
                                </tr>
                            ) : (
                                filteredOrders.map((order) => (
                                    <tr key={order._id} className="hover:bg-slate-50/80 transition-colors group">
                                        <td className="p-4 align-top">
                                            <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                                                <Calendar size={14} className="text-slate-400" />
                                                {formatDate(order.createdAt)}
                                            </div>
                                            <div className="mt-1 font-mono text-[10px] text-slate-400">ID: {order.razorpayOrderId}</div>
                                            {order.razorpayPaymentId && (
                                                <div className="mt-0.5 font-mono text-[10px] text-emerald-600/80 shrink-0">Pay ID: {order.razorpayPaymentId}</div>
                                            )}
                                        </td>
                                        <td className="p-4 align-top">
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 font-bold text-xs">
                                                    {order.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-800 text-sm">{order.name}</div>
                                                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                                                        <Mail size={12} /> {order.email}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                                                        <Phone size={12} /> {order.phone}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 align-top">
                                            <div className="flex items-center gap-2">
                                                <ShoppingBag size={16} className="text-slate-400" />
                                                <span className="font-medium text-slate-700">{order.productName || 'Not Recorded'}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 align-top">
                                            <div className="font-bold text-slate-800 text-sm">
                                                ₹{order.amount.toLocaleString('en-IN')}
                                            </div>
                                            <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-slate-100 text-slate-600">
                                                <CreditCard size={10} />
                                                {order.paymentPlan === 'one-time' ? 'One Time' : 'EMI'}
                                            </div>
                                        </td>
                                        <td className="p-4 align-top">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border ${order.status === 'paid'
                                                ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                                : order.status === 'failed'
                                                    ? 'bg-red-50 text-red-700 border-red-100'
                                                    : 'bg-amber-50 text-amber-700 border-amber-100'
                                                }`}>
                                                {order.status === 'paid' && <span className="material-symbols-outlined text-[14px]">check_circle</span>}
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;
