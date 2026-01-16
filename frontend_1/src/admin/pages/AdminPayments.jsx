import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CreditCard, CalendarClock, Save, DollarSign } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const AdminPayments = () => {
    const { addToast } = useToast();
    const [prices, setPrices] = useState({
        oneTimePrice: '',
        monthlyEmiPrice: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [settingsId, setSettingsId] = useState(null);

    // Fetch existing pricing settings
    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/settings`);
            if (res.data.success) {
                const setting = res.data.data;
                setSettingsId(setting._id);
                if (setting.pricing) {
                    setPrices({
                        oneTimePrice: setting.pricing.oneTimePrice,
                        monthlyEmiPrice: setting.pricing.monthlyEmiPrice
                    });
                }
            }
        } catch (error) {
            console.error("Error fetching settings", error);
            addToast("Failed to load current prices", "error");
        }
    };

    const handleChange = (e) => {
        setPrices({ ...prices, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const updateUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/settings`;
            // We need to send the existing structure but with updated pricing
            // Since the update endpoint in backend replaces/patches, we should be careful.
            // The controller uses findByIdAndUpdate with req.body. 
            // So we need to construct the 'pricing' object.

            const payload = {
                pricing: {
                    oneTimePrice: Number(prices.oneTimePrice),
                    monthlyEmiPrice: Number(prices.monthlyEmiPrice)
                }
            };

            const res = await axios.put(updateUrl, payload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('adminToken')}` // Assuming auth needed
                }
            });

            if (res.data.success) {
                addToast('Pricing updated successfully!', 'success');
            } else {
                throw new Error('Update failed');
            }

        } catch (error) {
            console.error(error);
            addToast(error.response?.data?.message || 'Failed to update pricing', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-slate-800">Payment Configuration</h1>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                <div className="flex items-start gap-4 mb-8">
                    <div className="w-12 h-12 bg-blue-50 text-[#1D4ED8] rounded-xl flex items-center justify-center shrink-0">
                        <DollarSign size={24} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">Global Pricing Settings</h2>
                        <p className="text-slate-500 text-sm mt-1">
                            Set the amounts for the "One-Time Payment" and "Monthly EMI" plans.
                            These values will be legally binding and displayed to all users initiating a purchase.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleUpdate} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* One Time Price Input */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                <CreditCard size={18} className="text-[#1D4ED8]" />
                                One-Time Payment Amount
                            </label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-[#1D4ED8] transition-colors">₹</span>
                                <input
                                    type="number"
                                    name="oneTimePrice"
                                    required
                                    min="0"
                                    value={prices.oneTimePrice}
                                    onChange={handleChange}
                                    className="w-full pl-8 pr-4 py-4 rounded-xl border border-slate-200 focus:border-[#1D4ED8] focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-slate-50 focus:bg-white font-mono text-xl font-bold text-slate-800"
                                    placeholder="0.00"
                                />
                            </div>
                            <p className="text-xs text-slate-400 pl-1">Full access price billed once.</p>
                        </div>

                        {/* EMI Price Input */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                <CalendarClock size={18} className="text-[#1D4ED8]" />
                                Monthly EMI Amount
                            </label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-[#1D4ED8] transition-colors">₹</span>
                                <input
                                    type="number"
                                    name="monthlyEmiPrice"
                                    required
                                    min="0"
                                    value={prices.monthlyEmiPrice}
                                    onChange={handleChange}
                                    className="w-full pl-8 pr-4 py-4 rounded-xl border border-slate-200 focus:border-[#1D4ED8] focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-slate-50 focus:bg-white font-mono text-xl font-bold text-slate-800"
                                    placeholder="0.00"
                                />
                            </div>
                            <p className="text-xs text-slate-400 pl-1">Monthly installment amount.</p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-[#1D4ED8] hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <>Saving...</>
                            ) : (
                                <>
                                    <Save size={20} />
                                    Update Prices
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminPayments;
