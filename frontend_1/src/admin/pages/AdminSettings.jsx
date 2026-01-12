import React, { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import { Save, Plus, Trash2, MapPin, Globe, Mail, Phone, Hash } from 'lucide-react';
import { dataService } from '../services/dataService';

const AdminSettings = () => {
    const { addToast } = useToast();

    // Initial State Structure
    const [settings, setSettings] = useState({
        siteTitle: 'Appzeto | Software Company',
        seoDescription: 'Leading software development company.',
        maintenanceMode: false,

        // Contact Info
        contactEmail: 'contact@appzeto.com',
        contactPhone: '+91 888 234 5678',
        contactAddress: 'Bangalore, India',

        // Social Media
        social: {
            linkedin: 'https://linkedin.com/company/appzeto',
            instagram: 'https://instagram.com/appzeto',
            twitter: 'https://x.com/appzeto',
            github: 'https://github.com/appzeto'
        },

        // Office Locations (Dynamic Array)
        offices: []
    });

    // Load Settings on Mount
    useEffect(() => {
        const loadSettings = async () => {
            try {
                const loadedSettings = await dataService.getSettings();
                if (loadedSettings) {
                    // Normalize offices keys
                    const normalizedOffices = (loadedSettings.offices || []).map(o => ({
                        ...o,
                        id: o._id || o.id || Date.now() + Math.random()
                    }));

                    setSettings(prev => ({
                        ...prev,
                        ...loadedSettings,
                        offices: normalizedOffices
                    }));
                }
            } catch (error) {
                console.error("Failed to load settings:", error);
            }
        };
        loadSettings();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSocialChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({
            ...prev,
            social: { ...prev.social, [name]: value }
        }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dataService.saveSettings(settings);
            addToast('Global configuration saved successfully', 'success');
        } catch (error) {
            console.error(error);
            addToast('Failed to save settings', 'error');
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-10">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-lg font-bold text-[#012829]">System Configuration</h1>
                </div>
                <button
                    onClick={handleSubmit}
                    className="bg-primary hover:bg-[#048a8d] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-xl shadow-primary/20 transition-all hover:-translate-y-1"
                >
                    <Save size={20} />
                    Save Changes
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">

                {/* 1. General & SEO */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                    <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4 mb-6 flex items-center gap-2">
                        <Globe size={20} className="text-primary" /> General & SEO
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Website Title</label>
                            <input
                                name="siteTitle"
                                type="text"
                                value={settings.siteTitle}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-primary font-medium"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Meta Description (SEO)</label>
                            <textarea
                                name="seoDescription"
                                rows="3"
                                value={settings.seoDescription}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-primary font-medium resize-none"
                            />
                        </div>
                        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 md:col-span-2">
                            <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                                <input
                                    type="checkbox"
                                    name="maintenanceMode"
                                    id="toggle"
                                    checked={settings.maintenanceMode}
                                    onChange={handleChange}
                                    className="peer absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                />
                                <label
                                    htmlFor="toggle"
                                    className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${settings.maintenanceMode ? 'bg-amber-500' : 'bg-slate-300'}`}
                                ></label>
                                <div className={`absolute top-0 left-0 w-6 h-6 rounded-full bg-white border-2 transition-transform duration-200 ${settings.maintenanceMode ? 'translate-x-6 border-amber-500' : 'translate-x-0 border-slate-300'}`}></div>
                            </div>
                            <div>
                                <label htmlFor="toggle" className="text-sm font-bold text-slate-700 cursor-pointer">Maintenance Mode</label>
                                <p className="text-xs text-slate-500">Enable this to show a "Coming Soon" page to visitors.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Contact & Social */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                    <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4 mb-6 flex items-center gap-2">
                        <Hash size={20} className="text-primary" /> Contact & Social
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2"><Mail size={12} className="inline mr-1" /> Support Email</label>
                            <input
                                name="contactEmail"
                                type="email"
                                value={settings.contactEmail}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-primary font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2"><Phone size={12} className="inline mr-1" /> Phone Number</label>
                            <input
                                name="contactPhone"
                                type="text"
                                value={settings.contactPhone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-primary font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2"><MapPin size={12} className="inline mr-1" /> HQ Address (Short)</label>
                            <input
                                name="contactAddress"
                                type="text"
                                value={settings.contactAddress}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-primary font-medium"
                            />
                        </div>
                    </div>

                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-t border-slate-100 pt-6">Social Media Links</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {['linkedin', 'instagram', 'twitter', 'github'].map((platform) => (
                            <div key={platform}>
                                <label className="block text-xs font-bold text-slate-500 capitalize mb-2">{platform} URL</label>
                                <input
                                    name={platform}
                                    type="text"
                                    value={settings.social[platform]}
                                    onChange={handleSocialChange}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-primary font-medium text-sm text-slate-600"
                                    placeholder={`https://${platform}.com/...`}
                                />
                            </div>
                        ))}
                    </div>
                </div>



            </form>
        </div>
    );
};

export default AdminSettings;
