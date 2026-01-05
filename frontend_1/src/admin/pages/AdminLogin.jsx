import React, { useState } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import logo from '../../assets/logo.png';

const AdminLogin = () => {
    const { login } = useAdminAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const user = await login(email, password);
            if (user.role === 'ADMIN') {
                navigate('/admin/dashboard');
            } else {
                navigate('/hr/dashboard');
            }
        } catch (err) {
            setError('Invalid credentials. Please try again.');
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
                    <h1 className="text-3xl font-bold text-white mb-2">Internal Access</h1>
                    <p className="text-slate-400 text-sm">Welcome back. Please authorize yourself.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium text-center animate-pulse">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Email ID</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
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
                            'Verifying...'
                        ) : (
                            <>
                                Access Dashboard
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-xs text-slate-500">
                        Authorized Personnel Only • Appzeto Internal System
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
