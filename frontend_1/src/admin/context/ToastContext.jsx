import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, X, Info } from 'lucide-react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'success') => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => removeToast(id), 3000);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed bottom-6 right-6 z-[70] flex flex-col gap-3 pointer-events-none">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, y: 20, x: 20 }}
                            animate={{ opacity: 1, y: 0, x: 0 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            layout
                            className={`min-w-[300px] pointer-events-auto p-4 rounded-xl shadow-lg border flex items-start gap-3 ${toast.type === 'success' ? 'bg-white border-emerald-100' :
                                    toast.type === 'error' ? 'bg-white border-red-100' : 'bg-white border-blue-100'
                                }`}
                        >
                            <div className={`mt-0.5 ${toast.type === 'success' ? 'text-emerald-500' :
                                    toast.type === 'error' ? 'text-red-500' : 'text-blue-500'
                                }`}>
                                {toast.type === 'success' && <CheckCircle size={20} />}
                                {toast.type === 'error' && <AlertCircle size={20} />}
                                {toast.type === 'info' && <Info size={20} />}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold text-slate-800">
                                    {toast.type === 'success' ? 'Success' : toast.type === 'error' ? 'Error' : 'Info'}
                                </p>
                                <p className="text-xs text-slate-500 font-medium mt-0.5">{toast.message}</p>
                            </div>
                            <button onClick={() => removeToast(toast.id)} className="text-slate-400 hover:text-slate-600">
                                <X size={16} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
