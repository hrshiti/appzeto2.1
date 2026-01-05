import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { Save } from 'lucide-react';

const AdminSettings = () => {
    const { addToast } = useToast();
    const [settings, setSettings] = useState({
        siteTitle: 'Appzeto | Software Company',
        contactEmail: 'contact@appzeto.com',
        maintenanceMode: false,
        seoDescription: 'Leading software development company.'
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addToast('Settings saved successfully', 'success');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Global Settings</h1>
                <p className="text-slate-500 mt-1 text-sm">Configure system-wide variables.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">

                <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">General Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Combined Site Title</label>
                        <input
                            name="siteTitle"
                            type="text"
                            value={settings.siteTitle}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Contact Email</label>
                        <input
                            name="contactEmail"
                            type="email"
                            value={settings.contactEmail}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                        />
                    </div>
                </div>

                <div className="pt-2">
                    <label className="block text-sm font-bold text-slate-700 mb-1">SEO Meta Description</label>
                    <textarea
                        name="seoDescription"
                        rows="3"
                        value={settings.seoDescription}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                    />
                </div>

                <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 pt-4">System Status</h3>
                <div className="flex items-center gap-3">
                    <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                        <input
                            type="checkbox"
                            name="maintenanceMode"
                            id="toggle"
                            checked={settings.maintenanceMode}
                            onChange={handleChange}
                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                            style={{
                                right: settings.maintenanceMode ? '0' : 'auto',
                                left: settings.maintenanceMode ? 'auto' : '0',
                                borderColor: settings.maintenanceMode ? '#05A4A7' : '#E2E8F0'
                            }}
                        />
                        <label
                            htmlFor="toggle"
                            className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${settings.maintenanceMode ? 'bg-primary' : 'bg-slate-200'}`}
                        ></label>
                    </div>
                    <label htmlFor="toggle" className="text-sm font-bold text-slate-700">Enable Maintenance Mode</label>
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-end">
                    <button
                        type="submit"
                        className="bg-primary hover:bg-[#048a8d] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 transition-all"
                    >
                        <Save size={18} />
                        Save Configuration
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminSettings;
