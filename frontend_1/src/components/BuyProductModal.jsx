import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, CreditCard, CalendarClock } from 'lucide-react';
import { createPortal } from 'react-dom';
import axios from 'axios';

const BuyProductModal = ({ isOpen, onClose, productTitle }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        paymentMode: 'one-time' // 'one-time' | 'emi'
    });
    const [prices, setPrices] = useState({
        oneTimePrice: 0,
        monthlyEmiPrice: 0
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetchPrices();
        }
    }, [isOpen]);

    const fetchPrices = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL || 'https://api.appzeto.com'}/api/settings`);
            if (res.data.success && res.data.data.pricing) {
                setPrices({
                    oneTimePrice: res.data.data.pricing.oneTimePrice,
                    monthlyEmiPrice: res.data.data.pricing.monthlyEmiPrice
                });
            }
        } catch (error) {
            console.error("Failed to fetch product prices", error);
        }
    };

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePaymentModeChange = (mode) => {
        setFormData({ ...formData, paymentMode: mode });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Calculate Amount based on selection
            const amount = formData.paymentMode === 'one-time' ? prices.oneTimePrice : prices.monthlyEmiPrice;

            if (!amount || amount <= 0) {
                alert("Invalid pricing configuration. Please contact support.");
                return;
            }

            // 1. Create Order
            const orderUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/payments/create-order`;
            console.log("Creating Order for:", productTitle, "Amount:", amount);
            const { data } = await axios.post(orderUrl, {
                ...formData,
                amount: amount,
                paymentPlan: formData.paymentMode,
                productName: productTitle || 'Custom Product'
            });

            if (!data.success) {
                throw new Error('Order creation failed');
            }

            const { order } = data;

            // 2. Open Razorpay
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "Appzeto",
                description: `Payment for ${productTitle} (${formData.paymentMode === 'one-time' ? 'One Time' : 'EMI'})`,
                order_id: order.id,
                handler: async function (response) {
                    try {
                        const verifyUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/payments/verify`;
                        const verifyRes = await axios.post(verifyUrl, {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        });

                        if (verifyRes.data.success) {
                            setIsSuccess(true);
                            setTimeout(() => {
                                setIsSuccess(false);
                                onClose();
                                setFormData({ name: '', email: '', phone: '', paymentMode: 'one-time' });
                            }, 3000);
                        } else {
                            alert("Payment Verification Failed");
                        }
                    } catch (error) {
                        console.error(error);
                        alert("Payment Processing Error");
                    }
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone
                },
                theme: {
                    color: "#1D4ED8"
                }
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();

        } catch (error) {
            console.error("Submission failed", error);
            alert("Failed to initiate payment. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="bg-[#1D4ED8] p-6 text-white flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-medium opacity-90 mb-1">Purchase Inquiry via Appzeto</h3>
                                <h2 className="text-2xl font-bold leading-tight">{productTitle}</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                            {isSuccess ? (
                                <div className="flex flex-col items-center justify-center text-center py-10">
                                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                                        <CheckCircle size={40} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Request Received!</h3>
                                    <p className="text-slate-600 max-w-xs mx-auto">
                                        Thank you for your interest. Our sales team will contact you shortly.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {/* Personal Details */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-slate-50 focus:bg-white"
                                                placeholder="Enter your name"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-slate-50 focus:bg-white"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-1">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    required
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-slate-50 focus:bg-white"
                                                    placeholder="+91 98765 43210"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Plan Options */}
                                    <div className="pt-2">
                                        <label className="block text-sm font-bold text-slate-800 mb-3">Select Payment Plan</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {/* One Time */}
                                            <div
                                                onClick={() => handlePaymentModeChange('one-time')}
                                                className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all duration-200 hover:shadow-md ${formData.paymentMode === 'one-time' ? 'border-[#1D4ED8] bg-blue-50/50 relative overflow-hidden' : 'border-slate-200 bg-white'}`}
                                            >
                                                {formData.paymentMode === 'one-time' && (
                                                    <div className="absolute top-0 right-0 bg-[#1D4ED8] text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">SELECTED</div>
                                                )}
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${formData.paymentMode === 'one-time' ? 'bg-[#1D4ED8] text-white' : 'bg-slate-100 text-slate-500'}`}>
                                                    <CreditCard size={20} />
                                                </div>
                                                <span className={`font-bold text-sm ${formData.paymentMode === 'one-time' ? 'text-[#1D4ED8]' : 'text-slate-700'}`}>One-Time Payment</span>
                                                <div className="text-lg font-black text-slate-800 mt-1">₹{prices.oneTimePrice.toLocaleString()}</div>
                                                <span className="text-xs text-slate-500">Best Value</span>
                                            </div>

                                            {/* EMI */}
                                            <div
                                                onClick={() => handlePaymentModeChange('emi')}
                                                className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all duration-200 hover:shadow-md ${formData.paymentMode === 'emi' ? 'border-[#1D4ED8] bg-blue-50/50 relative overflow-hidden' : 'border-slate-200 bg-white'}`}
                                            >
                                                {formData.paymentMode === 'emi' && (
                                                    <div className="absolute top-0 right-0 bg-[#1D4ED8] text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">SELECTED</div>
                                                )}
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${formData.paymentMode === 'emi' ? 'bg-[#1D4ED8] text-white' : 'bg-slate-100 text-slate-500'}`}>
                                                    <CalendarClock size={20} />
                                                </div>
                                                <span className={`font-bold text-sm ${formData.paymentMode === 'emi' ? 'text-[#1D4ED8]' : 'text-slate-700'}`}>Monthly EMI</span>
                                                <div className="text-lg font-black text-slate-800 mt-1">₹{prices.monthlyEmiPrice.toLocaleString()}</div>
                                                <span className="text-xs text-slate-500">Flexible Plans</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full mt-4 bg-[#1D4ED8] hover:bg-blue-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>Processing Payment...</>
                                        ) : (
                                            <>
                                                Proceed to Pay <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default BuyProductModal;
