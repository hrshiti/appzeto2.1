import React, { useState, useEffect } from 'react';
import AdminTable from '../components/AdminTable';
import { useToast } from '../context/ToastContext';
import { Eye, List, Settings, Trash2, ChevronDown } from 'lucide-react';
import Modal from '../components/ui/Modal';
import AdminFormBuilder from '../components/AdminFormBuilder';
import { dataService } from '../services/dataService';

const HRApplications = () => {
    const { addToast } = useToast();
    const [pageTab, setPageTab] = useState('applications');
    const [applications, setApplications] = useState([]);
    const [selectedApp, setSelectedApp] = useState(null);
    const [loading, setLoading] = useState(true);

    const [formConfig, setFormConfig] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [apps, config] = await Promise.all([
                dataService.getApplications(),
                dataService.getFormConfig('career')
            ]);
            setApplications(apps || []);
            if (config && config.fields) {
                setFormConfig(config.fields);
            }
        } catch (err) {
            console.error("Failed to load data", err);
            addToast('Failed to load data', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveForm = async (configData) => {
        try {
            await dataService.updateFormConfig('career', configData);
            setFormConfig(configData.fields);
            addToast('Application Form updated successfully', 'success');
        } catch (err) {
            console.error(err);
            addToast('Failed to update form', 'error');
        }
    };

    const handleView = (app) => {
        setSelectedApp(app);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this application?')) {
            try {
                await dataService.deleteApplication(id);
                setApplications(prev => prev.filter(app => app._id !== id));
                addToast('Application deleted', 'success');
            } catch (err) {
                addToast('Delete failed', 'error');
            }
        }
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const getFilteredApplications = () => {
        let result = applications;
        if (statusFilter !== 'All') {
            result = result.filter(app => app.status === statusFilter);
        }
        if (searchTerm) {
            const lower = searchTerm.toLowerCase();
            result = result.filter(app =>
                (app.name && app.name.toLowerCase().includes(lower)) ||
                (app.email && app.email.toLowerCase().includes(lower)) ||
                (app.jobTitle && app.jobTitle.toLowerCase().includes(lower))
            );
        }
        return result;
    };

    const updateStatus = async (id, newStatus) => {
        try {
            await dataService.updateApplication(id, { status: newStatus });
            setApplications(prev => prev.map(a => a._id === id ? { ...a, status: newStatus } : a));
            if (selectedApp && selectedApp._id === id) {
                setSelectedApp(prev => ({ ...prev, status: newStatus }));
            }
            addToast('Status updated', 'success');
        } catch (err) {
            addToast('Failed to update status', 'error');
        }
    };

    // -- Render --
    const columns = [
        { header: 'Candidate', accessor: 'name' },
        { header: 'Position', accessor: 'jobTitle' },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => {
                const status = row.status || 'Pending';
                const colorClass =
                    status === 'Pending' ? 'bg-orange-100 text-orange-700 ring-1 ring-orange-200' :
                        status === 'Accepted' ? 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200' :
                            status === 'Rejected' ? 'bg-red-100 text-red-700 ring-1 ring-red-200' :
                                'bg-blue-100 text-blue-700 ring-1 ring-blue-200';

                return (
                    <div className="relative w-full max-w-[130px]">
                        <select
                            value={status}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => updateStatus(row._id, e.target.value)}
                            className={`w-full appearance-none pl-3 pr-8 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wider border-0 cursor-pointer outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm ${colorClass}`}
                        >
                            <option value="Pending" className="bg-white text-slate-600 py-1">Pending</option>
                            <option value="Reviewed" className="bg-white text-slate-600 py-1">Reviewed</option>
                            <option value="Accepted" className="bg-white text-slate-600 py-1">Accepted</option>
                            <option value="Rejected" className="bg-white text-slate-600 py-1">Rejected</option>
                        </select>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-current opacity-70">
                            <ChevronDown size={14} strokeWidth={2.5} />
                        </div>
                    </div>
                );
            }
        },
        {
            header: 'Date',
            accessor: 'createdAt',
            render: (row) => new Date(row.createdAt).toLocaleDateString()
        },
    ];

    const renderActions = (row) => (
        <div className="flex items-center justify-end gap-2">
            <button
                onClick={() => handleView(row)}
                className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                title="View Details"
            >
                <Eye size={16} />
            </button>
            <button
                onClick={() => handleDelete(row._id)}
                className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete"
            >
                <Trash2 size={16} />
            </button>
        </div>
    );

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <div className="flex p-1 bg-white border border-slate-200 rounded-xl">
                    <button
                        onClick={() => setPageTab('applications')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${pageTab === 'applications' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        <List size={16} /> Applications
                    </button>
                    <button
                        onClick={() => setPageTab('settings')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${pageTab === 'settings' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        <Settings size={16} /> Config
                    </button>
                </div>
            </div>

            {pageTab === 'settings' ? (
                <AdminFormBuilder
                    formName="Job Application"
                    initialFields={formConfig || [
                        { id: 1, label: 'Name', type: 'text', placeholder: 'John Doe', required: true },
                        { id: 2, label: 'Email', type: 'email', placeholder: 'john@example.com', required: true },
                        { id: 3, label: 'Phone', type: 'tel', placeholder: '+91 ...', required: true },
                        { id: 4, label: 'Portfolio', type: 'url', placeholder: 'https://...', required: false },
                        { id: 5, label: 'Cover Letter', type: 'textarea', placeholder: 'Tell us...', required: true },
                    ]}
                    onSave={handleSaveForm}
                />
            ) : (
                <div className="animate-fade-in-up">
                    {/* Status Filter Bar */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                            <span className="text-xs font-bold text-slate-400 uppercase mr-2">Filter:</span>
                            {['All', 'Pending', 'Reviewed', 'Accepted', 'Rejected'].map(status => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${statusFilter === status
                                        ? 'bg-slate-800 text-white'
                                        : 'bg-white border border-slate-200 text-slate-500 hover:border-slate-400'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    <AdminTable
                        title="Career Applications"
                        columns={columns}
                        data={getFilteredApplications()}
                        customActions={renderActions}
                        loading={loading}
                        onSearch={setSearchTerm}
                    />

                    <Modal
                        isOpen={!!selectedApp}
                        onClose={() => setSelectedApp(null)}
                        title="Application Details"
                    >
                        {selectedApp && (
                            <div className="space-y-6">
                                <div className="border-b border-slate-100 pb-4">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-xl font-bold text-white uppercase shadow-lg shadow-slate-200">
                                                {selectedApp.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 text-lg">{selectedApp.name}</h3>
                                                <p className="text-sm text-slate-500">{selectedApp.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <span className="text-xs font-bold text-slate-500 uppercase">Current Status:</span>
                                        <div className="relative w-40">
                                            <select
                                                value={selectedApp.status || 'Pending'}
                                                onChange={(e) => updateStatus(selectedApp._id, e.target.value)}
                                                className="w-full appearance-none pl-3 pr-8 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide border border-slate-200 bg-white hover:border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer transition-all outline-none"
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Reviewed">Reviewed</option>
                                                <option value="Accepted">Accepted</option>
                                                <option value="Rejected">Rejected</option>
                                            </select>
                                            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                <ChevronDown size={14} strokeWidth={2} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm font-bold">
                                    <div className="bg-slate-50 p-3 rounded-xl border border-transparent hover:border-slate-100 transition-colors">
                                        <label className="block text-[10px] uppercase text-slate-400 mb-1">Position</label>
                                        <p className="text-slate-800">{selectedApp.jobTitle}</p>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-xl border border-transparent hover:border-slate-100 transition-colors">
                                        <label className="block text-[10px] uppercase text-slate-400 mb-1">Phone</label>
                                        <p className="text-slate-800">{selectedApp.phone}</p>
                                    </div>
                                </div>

                                {selectedApp.portfolio && (
                                    <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                                        <label className="block text-[10px] font-bold uppercase text-blue-400 mb-1">Portfolio/LinkedIn</label>
                                        <a href={selectedApp.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 truncate block underline">
                                            {selectedApp.portfolio}
                                        </a>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Cover Note / Letter</label>
                                    <div className="bg-slate-50 p-4 rounded-xl text-sm border border-slate-100 max-h-40 overflow-y-auto">
                                        {selectedApp.coverLetter || selectedApp.cover_letter || "No note provided."}
                                    </div>
                                </div>
                            </div>
                        )}
                    </Modal>
                </div>
            )}
        </>
    );
};

export default HRApplications;
