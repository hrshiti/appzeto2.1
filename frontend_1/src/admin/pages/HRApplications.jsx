import React, { useState, useEffect } from 'react';
import AdminTable from '../components/AdminTable';
import { useToast } from '../context/ToastContext';
import { Eye, List, Settings, Trash2 } from 'lucide-react';
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

    const getFilteredApplications = () => {
        if (!searchTerm) return applications;
        const lower = searchTerm.toLowerCase();
        return applications.filter(app =>
            (app.name && app.name.toLowerCase().includes(lower)) ||
            (app.email && app.email.toLowerCase().includes(lower)) ||
            (app.jobTitle && app.jobTitle.toLowerCase().includes(lower))
        );
    };

    // -- Render --
    const columns = [
        { header: 'Candidate', accessor: 'name' },
        { header: 'Position', accessor: 'jobTitle' },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => (
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${row.status === 'Accepted' ? 'bg-emerald-100 text-emerald-600' :
                    row.status === 'Rejected' ? 'bg-red-100 text-red-600' :
                        row.status === 'Reviewed' ? 'bg-purple-100 text-purple-600' : 'bg-amber-100 text-amber-600'
                    }`}>
                    {row.status}
                </span>
            )
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
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-200">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Recruitment Hub</h1>
                    <p className="text-slate-500 mt-1">Manage incoming candidate applications.</p>
                </div>

                <div className="flex p-1 bg-white border border-slate-200 rounded-xl mt-4 md:mt-0">
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
                    <AdminTable
                        title="Career Applications"
                        subtitle="Candidate applications from the 'Careers & Opportunities' page."
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
                                <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-xl font-bold text-white uppercase">
                                        {selectedApp.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">{selectedApp.name}</h3>
                                        <p className="text-sm text-slate-500">{selectedApp.email}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm font-bold">
                                    <div className="bg-slate-50 p-3 rounded-xl">
                                        <label className="block text-[10px] uppercase text-slate-400 mb-1">Position</label>
                                        <p className="text-slate-800">{selectedApp.jobTitle}</p>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-xl">
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
