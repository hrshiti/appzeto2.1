import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import {
    LayoutDashboard,
    Briefcase,
    FileText,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    Layers,
    MessageSquare,
    Globe,
    UserPlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.png';

const SidebarItem = ({ to, icon: Icon, label, onClick }) => (
    <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm group ${isActive
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
            }`
        }
    >
        <Icon size={18} className="transition-transform group-hover:scale-110" />
        <span>{label}</span>
    </NavLink>
);

const SectionLabel = ({ label }) => (
    <div className="px-4 py-2 mt-4 mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
        {label}
    </div>
);

const AdminLayout = () => {
    const { user, logout } = useAdminAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

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

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">

                    {/* ADMIN LINKS */}
                    {user.role === 'ADMIN' && (
                        <>
                            <SectionLabel label="Overview" />
                            <SidebarItem to="/admin/dashboard" icon={LayoutDashboard} label="Dashboard" />

                            <SectionLabel label="Content Management" />
                            <SidebarItem to="/admin/services" icon={Layers} label="Services" />
                            <SidebarItem to="/admin/projects" icon={Briefcase} label="Projects" />
                            <SidebarItem to="/admin/blogs" icon={FileText} label="Blogs" />
                            <SectionLabel label="Sales & CRM" />
                            <SidebarItem to="/admin/leads" icon={Users} label="Leads Pipeline" />
                            <SidebarItem to="/admin/messages" icon={MessageSquare} label="Inbox" />

                            <SectionLabel label="Organization" />
                            <SidebarItem to="/admin/team" icon={Users} label="Team" />
                            <SidebarItem to="/admin/users" icon={UserPlus} label="Admin Users" />

                            <SectionLabel label="System" />
                            <SidebarItem to="/admin/settings" icon={Settings} label="Global Settings" />
                        </>
                    )}

                    {/* HR LINKS */}
                    {(user.role === 'HR' || user.role === 'ADMIN') && (
                        <>
                            <SectionLabel label="Recruitment (HR)" />
                            {user.role === 'HR' && (
                                <SidebarItem to="/hr/dashboard" icon={LayoutDashboard} label="Dashboard" />
                            )}
                            <SidebarItem to="/hr/jobs" icon={Briefcase} label="Job Openings" />
                            <SidebarItem to="/hr/applications" icon={Users} label="Applications" />
                        </>
                    )}
                </div>

                {/* User Info & Logout (Fixed at bottom of sidebar) */}
                <div className="p-4 border-t border-slate-700/50 flex-none bg-[#012829]">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 mb-4">
                        <p className="text-xs text-slate-400 font-medium mb-1">Signed in as</p>
                        <p className="font-bold text-sm truncate">{user.email}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${user.role === 'ADMIN' ? 'bg-primary/20 text-primary' : 'bg-indigo-500/20 text-indigo-400'}`}>
                                {user.role}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all text-sm font-medium group"
                    >
                        <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay (Drawer) */}
            <div className={`fixed inset-0 z-50 lg:hidden pointer-events-none ${isMobileMenuOpen ? 'pointer-events-auto' : ''}`}>
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Sidebar Content */}
                <aside
                    className={`absolute left-0 top-0 bottom-0 w-72 bg-[#012829] text-white shadow-2xl transition-transform duration-300 flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
                >
                    <div className="h-24 flex items-center justify-between px-6 border-b border-slate-700/50 flex-none bg-[#001E1F]">
                        <img src={logo} alt="Appzeto" className="h-10 w-auto object-contain" />
                        <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:text-white transition-colors"><X size={24} /></button>
                    </div>

                    <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
                        {/* SAME LINKS AS DESKTOP - Duplicated for cleaner DOM separation in this approach (or extract to Component) */}
                        {/* ADMIN LINKS */}
                        {user.role === 'ADMIN' && (
                            <>
                                <SectionLabel label="Overview" />
                                <SidebarItem to="/admin/dashboard" icon={LayoutDashboard} label="Dashboard" onClick={() => setIsMobileMenuOpen(false)} />

                                <SectionLabel label="Content Management" />
                                <SidebarItem to="/admin/services" icon={Layers} label="Services" onClick={() => setIsMobileMenuOpen(false)} />
                                <SidebarItem to="/admin/projects" icon={Briefcase} label="Projects" onClick={() => setIsMobileMenuOpen(false)} />
                                <SidebarItem to="/admin/blogs" icon={FileText} label="Blogs" onClick={() => setIsMobileMenuOpen(false)} />
                                <SidebarItem to="/admin/messages" icon={MessageSquare} label="Messages" onClick={() => setIsMobileMenuOpen(false)} />

                                <SectionLabel label="Organization" />
                                <SidebarItem to="/admin/team" icon={Users} label="Team" onClick={() => setIsMobileMenuOpen(false)} />
                                <SidebarItem to="/admin/users" icon={UserPlus} label="Admin Users" onClick={() => setIsMobileMenuOpen(false)} />

                                <SectionLabel label="System" />
                                <SidebarItem to="/admin/settings" icon={Settings} label="Global Settings" onClick={() => setIsMobileMenuOpen(false)} />
                            </>
                        )}
                        {/* HR LINKS */}
                        {(user.role === 'HR' || user.role === 'ADMIN') && (
                            <>
                                <SectionLabel label="Recruitment (HR)" />
                                {user.role === 'HR' && (
                                    <SidebarItem to="/hr/dashboard" icon={LayoutDashboard} label="Dashboard" onClick={() => setIsMobileMenuOpen(false)} />
                                )}
                                <SidebarItem to="/hr/jobs" icon={Briefcase} label="Job Openings" onClick={() => setIsMobileMenuOpen(false)} />
                                <SidebarItem to="/hr/applications" icon={Users} label="Applications" onClick={() => setIsMobileMenuOpen(false)} />
                            </>
                        )}
                    </div>

                    <div className="p-4 border-t border-slate-700/50 flex-none">
                        <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all text-sm font-medium">
                            <LogOut size={18} /> <span>Sign Out</span>
                        </button>
                    </div>
                </aside>
            </div>

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col h-full relative overflow-hidden">
                {/* Mobile Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:hidden flex-none z-30">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                        >
                            <Menu size={24} />
                        </button>
                        <img src={logo} alt="Appzeto" className="h-8 w-auto object-contain" />
                    </div>
                    <img src={user.avatar} alt="User" className="w-8 h-8 rounded-full bg-slate-200" />
                </header>

                {/* Scrollable Content Area */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-[#F6F8F8]">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
