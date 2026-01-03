import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollWrapper from '../components/ScrollWrapper';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate login
        setTimeout(() => setIsLoading(false), 2000);
    };

    return (
        <ScrollWrapper>
            <div className="bg-[#f8fafc] min-h-screen font-sans text-slate-900 overflow-x-hidden selection:bg-primary selection:text-white">
                <Navbar />

                <main className="w-full flex flex-col relative px-0">
                    {/* Background Decorative Elements */}
                    <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] -z-10 animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] -z-10" />

                    {/* Full Width Unified Container */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-full relative min-h-[700px] lg:h-[85vh] flex items-stretch overflow-hidden"
                    >
                        {/* Background Image Layer */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop"
                                alt="Modern Office"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
                        </div>

                        {/* Content Grid */}
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 w-full max-w-[1400px] mx-auto h-full">
                            {/* Left Side: Welcome Text */}
                            <div className="hidden lg:flex flex-col justify-center p-12 text-white">
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <p className="text-primary font-black uppercase tracking-[0.6em] text-[10px] mb-4">Welcome Back</p>
                                    <h2 className="text-6xl lg:text-8xl font-black uppercase italic tracking-tighter leading-[0.8] drop-shadow-2xl">
                                        Access <br />
                                        <span className="text-primary italic">Your</span> <br />
                                        World.
                                    </h2>
                                    <p className="mt-8 text-white/80 max-w-sm font-bold italic text-sm leading-relaxed border-l-4 border-primary/50 pl-6">
                                        Manage your projects, track progress, and collaborate in real-time. Your dashboard awaits.
                                    </p>
                                </motion.div>
                            </div>

                            {/* Right Side: Login Form */}
                            <div className="flex items-center justify-center p-4 lg:p-8 h-full">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-white/95 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-10 w-full max-w-md shadow-[0_40px_80px_rgba(0,0,0,0.15)] border border-white/50"
                                >
                                    <div className="mb-8 text-center lg:text-left">
                                        <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tight">Login</h2>
                                        <p className="text-slate-500 text-[10px] mt-1 font-bold uppercase tracking-widest">
                                            Don't have an account? <Link to="/contact" className="text-primary hover:underline">Get Access</Link>
                                        </p>
                                    </div>

                                    <form onSubmit={handleLogin} className="space-y-5">
                                        <div className="space-y-1.5">
                                            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-3">Email Address</label>
                                            <input
                                                required
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="you@appzeto.com"
                                                className="w-full bg-slate-50/80 border border-slate-100 p-4 rounded-2xl focus:border-primary focus:bg-white outline-none transition-all placeholder:text-slate-300 text-sm font-bold italic text-slate-800"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-3">Password</label>
                                            <input
                                                required
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="••••••••"
                                                className="w-full bg-slate-50/80 border border-slate-100 p-4 rounded-2xl focus:border-primary focus:bg-white outline-none transition-all placeholder:text-slate-300 text-sm font-bold italic text-slate-800"
                                            />
                                        </div>

                                        <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 px-2">
                                            <label className="flex items-center gap-2 cursor-pointer hover:text-slate-800 transition-colors">
                                                <input type="checkbox" className="rounded text-primary focus:ring-primary/20 bg-slate-100 border-slate-200" />
                                                <span className="uppercase tracking-wider">Remember me</span>
                                            </label>
                                            <a href="#" className="uppercase tracking-wider hover:text-primary transition-colors">Forgot Password?</a>
                                        </div>

                                        <button
                                            disabled={isLoading}
                                            className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-3 text-xs shadow-xl mt-4 ${isLoading ? 'bg-slate-100 text-slate-400 animate-pulse' : 'bg-primary text-white hover:scale-[1.02] active:scale-[0.98]'
                                                }`}
                                        >
                                            {isLoading ? 'Signing In...' : <>Sign In <span className="material-icons text-sm">login</span></>}
                                        </button>
                                    </form>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </main>

                <Footer />
            </div>
        </ScrollWrapper>
    );
};

export default Login;
