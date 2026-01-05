import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Check local storage for existing session
        const storedUser = localStorage.getItem('appzeto_admin_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Mock Login Logic
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === 'admin@appzeto.com' && password === 'admin123') {
                    const adminUser = {
                        id: '1',
                        name: 'Super Admin',
                        email: 'admin@appzeto.com',
                        role: 'ADMIN',
                        avatar: 'https://ui-avatars.com/api/?name=Super+Admin&background=05A4A7&color=fff'
                    };
                    setUser(adminUser);
                    localStorage.setItem('appzeto_admin_user', JSON.stringify(adminUser));
                    resolve(adminUser);
                } else if (email === 'hr@appzeto.com' && password === 'hr123') {
                    const hrUser = {
                        id: '2',
                        name: 'HR Manager',
                        email: 'hr@appzeto.com',
                        role: 'HR',
                        avatar: 'https://ui-avatars.com/api/?name=HR+Manager&background=6366f1&color=fff'
                    };
                    setUser(hrUser);
                    localStorage.setItem('appzeto_admin_user', JSON.stringify(hrUser));
                    resolve(hrUser);
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 1000);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('appzeto_admin_user');
        navigate('/admin/login');
    };

    const hasPermission = (requiredRole) => {
        if (!user) return false;
        if (user.role === 'ADMIN') return true; // Admin has all permissions
        return user.role === requiredRole;
    };

    return (
        <AdminAuthContext.Provider value={{ user, login, logout, isLoading: loading, hasPermission }}>
            {!loading && children}
        </AdminAuthContext.Provider>
    );
};

export const useAdminAuth = () => useContext(AdminAuthContext);

// Protected Route Component
export const ProtectedAdminRoute = ({ children, requiredRole }) => {
    const { user, isLoading } = useAdminAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!isLoading && !user) {
            navigate('/admin/login', { state: { from: location } });
        }

        // If specific role required and user doesn't have it (and is not ADMIN)
        if (!isLoading && user && requiredRole && user.role !== requiredRole && user.role !== 'ADMIN') {
            // Redirect HR to their dashboard if they try to access admin pages
            if (user.role === 'HR') {
                navigate('/hr/dashboard');
            } else {
                navigate('/admin/dashboard');
            }
        }
    }, [user, isLoading, navigate, location, requiredRole]);

    if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-400">Loading...</div>;

    if (!user) return null; // Will redirect via useEffect

    // Role check for render
    if (requiredRole && user.role !== requiredRole && user.role !== 'ADMIN') return null;

    return children;
};
