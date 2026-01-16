import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import {
    LayoutDashboard,
    Briefcase,
    CreditCard,
    FileText,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    Layers,
    MessageSquare,
    Globe,
    UserPlus,
    HelpCircle,
    Mail,
    Package,
    Tv,
    GraduationCap,
    Handshake,
    Search,
    Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.png';

const SidebarItem = ({ to, icon: Icon, label, onClick }) => (
    <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm group relative isolate ${isActive
                ? 'text-white'
                : 'text-slate-400/80 hover:text-white hover:bg-white/5'
            }`
        }
    >
        {({ isActive }) => (
            <>
                {isActive && (
                    <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary rounded-xl -z-10 shadow-lg shadow-primary/20"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                )}
                <Icon size={20} className={`transition-all duration-300 ${isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]' : 'group-hover:scale-110'}`} />
                <span className="tracking-wide">{label}</span>
                {isActive && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-3 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_white]"
                    />
                )}
            </>
        )}
    </NavLink>
);

const SectionLabel = ({ label }) => (
    <div className="px-4 py-4 mt-2 first:mt-0 flex items-center gap-3">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500/60 flex-none">{label}</span>
        <div className="h-[1px] w-full bg-slate-700/30"></div>
    </div>
);

const AdminLayout = () => {
    const { user, logout } = useAdminAuth();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Close mobile menu on route change
    React.useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    if (!user) return null;

    return (
        <div className="h-screen w-full bg-[#F6F8F8] flex font-sans overflow-hidden">
            {/* Sidebar - Desktop */}
            <aside
                className="hidden lg:flex w-64 flex-col bg-[#012829] text-white shadow-2xl z-50 flex-none h-full"
            >
                {/* Logo Area */}
                <div className="h-24 flex items-center justify-center px-6 border-b border-slate-700/50 flex-none bg-[#001E1F]">
                    <img src={logo} alt="Appzeto" className="h-10 w-auto object-contain" />
                </div>

                {/* Navigation - Ultra Compact & Flattened */}
                <div className="flex-1 overflow-y-auto no-scrollbar py-4 px-3 space-y-0.5">
                    {/* Common Links for all roles */}
                    <SidebarItem to="/admin/dashboard" icon={LayoutDashboard} label="Dashboard" />

                    {/* ADMIN ONLY LINKS */}
                    {user.role === 'ADMIN' && (
                        <>
                            <SidebarItem to="/admin/projects" icon={Briefcase} label="Projects" />
                            <SidebarItem to="/admin/blogs" icon={FileText} label="Blogs" />
                            <SidebarItem to="/admin/messages" icon={MessageSquare} label="Inquiries" />
                            <SidebarItem to="/admin/orders" icon={CreditCard} label="Transactions" />
                            <SidebarItem to="/admin/payments" icon={Settings} label="Payment Config" />
                            <SidebarItem to="/admin/leads" icon={Handshake} label="Sales Leads" />
                            <SidebarItem to="/hr/applications" icon={Users} label="Applications" />
                            <SidebarItem to="/admin/users" icon={UserPlus} label="Admin Users" />
                            <SidebarItem to="/admin/settings" icon={Settings} label="Settings" />
                        </>
                    )}

                    {/* HR SPECIFIC LINKS */}
                    {(user.role === 'HR' || user.role === 'ADMIN') && (
                        <>
                            {user.role === 'HR' && (
                                <SidebarItem to="/hr/dashboard" icon={LayoutDashboard} label="Dashboard" />
                            )}
                            <SidebarItem to="/hr/jobs" icon={Briefcase} label="Jobs" />
                            <SidebarItem to="/hr/internships" icon={GraduationCap} label="Internships" />
                        </>
                    )}
                </div>

                {/* Separator */}
                <div className="px-6 flex-none h-[1px] bg-slate-700/20" />

                {/* User Info & Logout (Ultra Compact) */}
                <div className="p-4 flex-none bg-[#012829]/30 backdrop-blur-md">
                    <div className="px-3 py-3 rounded-xl bg-white/5 border border-white/5 mb-3 group/user relative isolate">
                        <div className="flex items-center gap-3">
                            <img
                                src={user.avatar || `https://ui-avatars.com/api/?name=Admin&background=05A4A7&color=fff`}
                                alt="User"
                                className="w-8 h-8 rounded-lg shadow-sm"
                            />
                            <div className="overflow-hidden">
                                <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${user.role === 'ADMIN' ? 'bg-primary/20 text-primary' : 'bg-indigo-500/20 text-indigo-400'}`}>
                                    {user.role} Account
                                </span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={logout}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 text-[11px] font-black uppercase tracking-wider group"
                    >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay (Drawer) */}
            <div className={`fixed inset-0 z-50 lg:hidden pointer-events-none ${isMobileMenuOpen ? 'pointer-events-auto' : ''}`}>
                <div
                    className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                <aside
                    className={`absolute left-0 top-0 bottom-0 w-72 bg-[#012829] text-white shadow-2xl transition-transform duration-300 flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
                >
                    <div className="h-20 flex items-center justify-between px-6 border-b border-slate-700/30 flex-none bg-[#001E1F]">
                        <img src={logo} alt="Appzeto" className="h-8 w-auto object-contain" />
                        <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:text-white transition-colors"><X size={24} /></button>
                    </div>

                    <div className="flex-1 overflow-y-auto no-scrollbar py-4 px-4 space-y-0.5">
                        <SidebarItem to="/admin/dashboard" icon={LayoutDashboard} label="Dashboard" onClick={() => setIsMobileMenuOpen(false)} />
                        {user.role === 'ADMIN' && (
                            <>
                                <SidebarItem to="/admin/projects" icon={Briefcase} label="Projects" onClick={() => setIsMobileMenuOpen(false)} />
                                <SidebarItem to="/admin/blogs" icon={FileText} label="Blogs" onClick={() => setIsMobileMenuOpen(false)} />
                                <SidebarItem to="/admin/messages" icon={MessageSquare} label="Inquiries" onClick={() => setIsMobileMenuOpen(false)} />
                                <SidebarItem to="/admin/leads" icon={Handshake} label="Sales Leads" onClick={() => setIsMobileMenuOpen(false)} />
                                <SidebarItem to="/hr/applications" icon={Users} label="Applications" onClick={() => setIsMobileMenuOpen(false)} />
                                <SidebarItem to="/admin/users" icon={UserPlus} label="Admin Users" onClick={() => setIsMobileMenuOpen(false)} />
                                <SidebarItem to="/admin/settings" icon={Settings} label="Settings" onClick={() => setIsMobileMenuOpen(false)} />
                            </>
                        )}
                        {(user.role === 'HR' || user.role === 'ADMIN') && (
                            <>
                                {user.role === 'HR' && (
                                    <SidebarItem to="/hr/dashboard" icon={LayoutDashboard} label="Dashboard" onClick={() => setIsMobileMenuOpen(false)} />
                                )}
                                <SidebarItem to="/hr/jobs" icon={Briefcase} label="Jobs" onClick={() => setIsMobileMenuOpen(false)} />
                                <SidebarItem to="/hr/internships" icon={GraduationCap} label="Internships" onClick={() => setIsMobileMenuOpen(false)} />
                            </>
                        )}
                    </div>

                    <div className="p-4 border-t border-slate-700/30 flex-none">
                        <button
                            onClick={logout}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 text-xs font-bold"
                        >
                            <LogOut size={18} /> <span>Sign Out</span>
                        </button>
                    </div>
                </aside>
            </div>

            {/* Right Side Content Area */}
            <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-[#F6F8F8]">
                {/* STICKY HEADER */}
                <header className="pt-[env(safe-area-inset-top)] bg-[#012829] border-b border-slate-700/50 sticky top-0 z-40 flex-none">
                    <div className="h-20 flex items-center justify-between px-6 lg:px-10">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="p-2.5 -ml-2 text-slate-300 hover:bg-white/10 rounded-xl lg:hidden transition-colors"
                            >
                                <Menu size={24} />
                            </button>

                            <div className="hidden sm:block">
                                <h2 className="text-xl font-black text-white tracking-tight leading-none mb-1">
                                    Admin Dashboard
                                </h2>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                                    Managing Appzeto Ecosystem
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            {/* User Summary Pill */}
                            <div className="flex items-center gap-3 bg-white/5 pl-4 pr-1 py-1 rounded-2xl border border-white/10 shadow-sm">
                                <div className="text-right hidden sm:block">
                                    <p className="text-xs font-bold text-white leading-none mb-1">{user.email}</p>
                                    <p className="text-[9px] font-black text-primary uppercase tracking-widest">{user.role} Authorization</p>
                                </div>
                                <img
                                    src={user.avatar || `https://ui-avatars.com/api/?name=Admin&background=05A4A7&color=fff`}
                                    alt="User"
                                    className="w-10 h-10 rounded-xl border-2 border-[#012829] shadow-md"
                                />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto no-scrollbar p-4 lg:p-6 relative isolate">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/[0.02] rounded-full blur-[100px] pointer-events-none -z-10" />

                    <div className="max-w-7xl mx-auto relative z-10">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
