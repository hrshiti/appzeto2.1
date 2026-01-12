import React, { useState, useEffect } from 'react';
import AdminTable from '../components/AdminTable';
import { useToast } from '../context/ToastContext';
import { Briefcase, Trash2, Eye, ChevronDown } from 'lucide-react';
import Modal from '../components/ui/Modal';
import { dataService } from '../services/dataService';

const AdminApplications = () => {
    const { addToast } = useToast();

    const [applications, setApplications] = useState([]);
    const [selectedApp, setSelectedApp] = useState(null);

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {
        try {
            const data = await dataService.getApplications();
            setApplications(data || []);
        } catch (err) {
            console.error("Failed to load applications", err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete application?')) {
            try {
                await dataService.deleteApplication(id);
                setApplications(prev => prev.filter(m => m._id !== id));
                addToast('Application deleted', 'success');
            } catch (err) {
                addToast('Failed to delete application', 'error');
            }
        }
    };

    const handleView = (app) => {
        setSelectedApp(app);
    };

    const [searchTerm, setSearchTerm] = useState('');

    const getFilteredApplications = () => {
        let result = applications;
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

    const columns = [
        { header: 'Applicant', accessor: 'name' },
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
            <button onClick={() => handleView(row)} className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg">
                <Eye size={16} />
            </button>
            <button onClick={() => handleDelete(row._id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
                <Trash2 size={16} />
            </button>
        </div>
    );

    return (
        <>
            <AdminTable
                title="Career Applications"
                subtitle="Job and Internship applications."
                columns={columns}
                data={getFilteredApplications()}
                customActions={renderActions}
                onSearch={setSearchTerm}
            />

            <Modal isOpen={!!selectedApp} onClose={() => setSelectedApp(null)} title="Application Details">
                {selectedApp && (
                    <div className="space-y-4">
                        <div className="border-b border-slate-100 pb-4 mb-4">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <p className="font-bold text-lg">{selectedApp.jobTitle}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${(selectedApp.status || 'Pending') === 'Pending' ? 'bg-orange-100 text-orange-700' :
                                            (selectedApp.status || 'Pending') === 'Accepted' ? 'bg-emerald-100 text-emerald-700' :
                                                (selectedApp.status || 'Pending') === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                    'bg-blue-100 text-blue-700'
                                            }`}>
                                            {selectedApp.status || 'Pending'}
                                        </span>
                                    </div>
                                </div>
                                <select
                                    value={selectedApp.status || 'Pending'}
                                    onChange={(e) => updateStatus(selectedApp._id, e.target.value)}
                                    className="text-xs font-bold border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-primary bg-slate-50 hover:bg-white transition-colors cursor-pointer"
                                >
                                    <option value="Pending">Mark as Pending</option>
                                    <option value="Reviewed">Mark as Reviewed</option>
                                    <option value="Accepted">Mark as Accepted</option>
                                    <option value="Rejected">Mark as Rejected</option>
                                </select>
                            </div>

                            <div className="space-y-1 mt-4">
                                <p className="text-sm font-medium text-slate-800">Applicant: {selectedApp.name}</p>
                                <p className="text-sm text-slate-500">Email: {selectedApp.email}</p>
                                <p className="text-sm text-slate-500">Phone: {selectedApp.phone}</p>
                                {selectedApp.portfolio && (
                                    <p className="text-sm text-blue-500 underline truncate">
                                        <a href={selectedApp.portfolio} target="_blank" rel="noopener noreferrer">Portfolio Link</a>
                                    </p>
                                )}
                                <p className="text-xs text-slate-400 pt-2">{new Date(selectedApp.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-black uppercase text-slate-400 mb-2">Cover Letter / Note:</p>
                            <p className="text-slate-800 bg-slate-50 p-4 rounded-lg text-sm whitespace-pre-wrap">{selectedApp.coverLetter || "No cover letter provided."}</p>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default AdminApplications;
