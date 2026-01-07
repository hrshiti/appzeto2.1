import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    // Check for logged in user
    useEffect(() => {
        const checkLoggedIn = async () => {
            const token = localStorage.getItem('adminToken');

            if (token) {
                try {
                    const { data } = await api.get('/auth/me');
                    setUser(data.data);
                } catch (err) {
                    console.error('Auth Check Failed:', err);
                    localStorage.removeItem('adminToken');
                    localStorage.removeItem('appzeto_admin_user');
                    setUser(null);
                }
            }
            setLoading(false);
        };
        checkLoggedIn();
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await api.post('/auth/login', { email, password });

            // Set User and Token
            localStorage.setItem('adminToken', data.token);
            // We store user too just for ease, but relying on /me is better. 
            // However, /me is async, so storing user helps with instant feedback.
            localStorage.setItem('appzeto_admin_user', JSON.stringify(data.user));

            setUser(data.user);
            return data.user;
        } catch (err) {
            throw new Error(err.response?.data?.error || 'Login failed');
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('appzeto_admin_user');
        navigate('/admin/login');
    };

    const hasPermission = (requiredRole) => {
        if (!user) return false;
        if (user.role === 'ADMIN') return true;
        return user.role === requiredRole;
    };

    return (
        <AdminAuthContext.Provider value={{ user, login, logout, isLoading: loading, hasPermission }}>
            {!loading && children}
        </AdminAuthContext.Provider>
    );
};

export const useAdminAuth = () => useContext(AdminAuthContext);

export const ProtectedAdminRoute = ({ children, requiredRole }) => {
    const { user, isLoading } = useAdminAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!isLoading && !user) {
            navigate('/admin/login', { state: { from: location } });
        }

        if (!isLoading && user && requiredRole && user.role !== requiredRole && user.role !== 'ADMIN') {
            if (user.role === 'HR') {
                navigate('/hr/dashboard');
            } else {
                navigate('/admin/dashboard');
            }
        }
    }, [user, isLoading, navigate, location, requiredRole]);

    if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-400">Loading...</div>;

    if (!user) return null;

    if (requiredRole && user.role !== requiredRole && user.role !== 'ADMIN') return null;

    return children;
};
