import React, { useState } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import logo from '../../assets/logo.png';
import api from '../services/api';

const AdminSignup = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await api.post('/auth/register', {
                name,
                email,
                password,
                role: 'ADMIN'
            });
            setSuccess('Admin account created successfully! Redirecting to login...');
            setTimeout(() => {
                navigate('/admin/login');
            }, 2000);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#012829] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[100px]" />
                <div className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[100px]" />
            </div>

            <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-10 shadow-2xl relative z-10">
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-white/5 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-primary/20 backdrop-blur-sm border border-white/10">
                        <img src={logo} alt="Appzeto Logo" className="w-12 h-12 object-contain" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Create Admin</h1>
                    <p className="text-slate-400 text-sm">Register a new administrator.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium text-center animate-pulse">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium text-center">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Full Name</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Admin Name"
                                required
                                className="w-full bg-slate-900/50 border border-slate-700/50 text-white rounded-xl py-4 pl-12 pr-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Email ID</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@appzeto.com"
                                required
                                className="w-full bg-slate-900/50 border border-slate-700/50 text-white rounded-xl py-4 pl-12 pr-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                minLength={6}
                                className="w-full bg-slate-900/50 border border-slate-700/50 text-white rounded-xl py-4 pl-12 pr-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-[#048a8d] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group mt-4"
                    >
                        {loading ? (
                            'Creating...'
                        ) : (
                            <>
                                Register Custom Admin
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate('/admin/login')}
                        className="w-full text-slate-400 hover:text-white text-sm font-medium transition-colors"
                    >
                        Back to Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminSignup;
