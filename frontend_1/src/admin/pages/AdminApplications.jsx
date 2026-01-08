import React, { useState, useEffect } from 'react';
import AdminTable from '../components/AdminTable';
import { useToast } from '../context/ToastContext';
import { Briefcase, Trash2, Eye } from 'lucide-react';
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

    const columns = [
        { header: 'Applicant', accessor: 'name' },
        { header: 'Position', accessor: 'jobTitle' },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => (
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${row.status === 'Pending' ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-500'}`}>
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
                data={applications}
                customActions={renderActions}
            />

            <Modal isOpen={!!selectedApp} onClose={() => setSelectedApp(null)} title="Application Details">
                {selectedApp && (
                    <div className="space-y-4">
                        <div className="border-b border-slate-100 pb-2 mb-4">
                            <p className="font-bold text-lg">{selectedApp.jobTitle}</p>
                            <p className="text-sm text-slate-500">Applicant: {selectedApp.name}</p>
                            <p className="text-sm text-slate-500">Email: {selectedApp.email}</p>
                            <p className="text-sm text-slate-500">Phone: {selectedApp.phone}</p>
                            {selectedApp.portfolio && (
                                <p className="text-sm text-blue-500 underline truncate">
                                    <a href={selectedApp.portfolio} target="_blank" rel="noopener noreferrer">Portfolio Link</a>
                                </p>
                            )}
                            <p className="text-xs text-slate-400 mt-2">{new Date(selectedApp.createdAt).toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-xs font-black uppercase text-slate-400 mb-2">Cover Letter / Note:</p>
                            <p className="text-slate-800 bg-slate-50 p-4 rounded-lg text-sm">{selectedApp.coverLetter || "No cover letter provided."}</p>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default AdminApplications;
