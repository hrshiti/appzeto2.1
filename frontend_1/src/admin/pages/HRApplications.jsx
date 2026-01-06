import React, { useState } from 'react';
import AdminTable from '../components/AdminTable';
import { useToast } from '../context/ToastContext';
import { Eye, CheckCircle, XCircle, Settings, List, Briefcase } from 'lucide-react';
import Modal from '../components/ui/Modal';
import AdminFormBuilder from '../components/AdminFormBuilder';

const HRApplications = () => {
    const { addToast } = useToast();
    const [pageTab, setPageTab] = useState('applications');

    // -- State --
    const [applications, setApplications] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', position: 'Senior Frontend Developer', status: 'Review', date: '2025-01-04' },
        { id: 2, name: 'Alice Smith', email: 'alice@example.com', position: 'Marketing Intern', status: 'Interview', date: '2025-01-03' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', position: 'Senior Frontend Developer', status: 'Rejected', date: '2025-01-02' },
    ]);

    const [selectedApp, setSelectedApp] = useState(null);

    // -- Handlers --
    const handleView = (app) => {
        setSelectedApp(app);
    };

    const updateStatus = (status) => {
        setApplications(prev => prev.map(app => app.id === selectedApp.id ? { ...app, status } : app));
        setSelectedApp(prev => ({ ...prev, status }));
        addToast(`Application marked as ${status}`, 'success');
    };

    // -- Render --
    const columns = [
        { header: 'Candidate Name', accessor: 'name' },
        { header: 'Position', accessor: 'position' },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => (
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${row.status === 'Hired' ? 'bg-emerald-100 text-emerald-600' :
                    row.status === 'Rejected' ? 'bg-red-100 text-red-600' :
                        row.status === 'Interview' ? 'bg-purple-100 text-purple-600' : 'bg-amber-100 text-amber-600'
                    }`}>
                    {row.status}
                </span>
            )
        },
        { header: 'Date', accessor: 'date' },
    ];

    const renderActions = (row) => (
        <div className="flex items-center justify-end gap-2">
            <button
                onClick={() => handleView(row)}
                className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                title="View Application"
            >
                <Eye size={16} />
            </button>
        </div>
    );

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-200">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Job Applications</h1>
                    <p className="text-slate-500 mt-1">Manage incoming candidate applications and form settings.</p>
                </div>

                {/* Page Tab Switcher */}
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
                        <Settings size={16} /> Form Settings
                    </button>
                </div>
            </div>

            {pageTab === 'settings' ? (
                <AdminFormBuilder
                    formName="Job Application"
                    initialFields={[
                        { id: 1, label: 'Full Name', type: 'text', placeholder: 'Candidate Name', required: true },
                        { id: 2, label: 'Email Address', type: 'email', placeholder: 'email@example.com', required: true },
                        { id: 3, label: 'Phone Number', type: 'phone', placeholder: '+1...', required: true },
                        { id: 4, label: 'Resume / CV', type: 'file', placeholder: 'Upload PDF', required: true },
                        { id: 5, label: 'Portfolio URL', type: 'text', placeholder: 'https://...', required: false },
                        { id: 6, label: 'Cover Letter', type: 'textarea', placeholder: 'Why are you a good fit?', required: false },
                    ]}
                />
            ) : (
                <div className="animate-fade-in-up">
                    <AdminTable
                        title="Applications"
                        subtitle="Track and manage candidate applications."
                        columns={columns}
                        data={applications}
                        customActions={renderActions}
                    />

                    <Modal
                        isOpen={!!selectedApp}
                        onClose={() => setSelectedApp(null)}
                        title="Application Details"
                    >
                        {selectedApp && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-xl font-bold text-slate-500">
                                        {selectedApp.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">{selectedApp.name}</h3>
                                        <p className="text-sm text-slate-500">{selectedApp.email}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-slate-400">Position</label>
                                        <p className="font-medium text-slate-800">{selectedApp.position}</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-slate-400">Applied On</label>
                                        <p className="font-medium text-slate-800">{selectedApp.date}</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Current Status</label>
                                    <div className="flex flex-wrap gap-2">
                                        {['Review', 'Interview', 'Hired', 'Rejected'].map(status => (
                                            <button
                                                key={status}
                                                onClick={() => updateStatus(status)}
                                                className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${selectedApp.status === status
                                                    ? 'bg-slate-800 text-white border-slate-800'
                                                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
                                                    }`}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-100">
                                    <div className="bg-slate-50 p-4 rounded-xl text-center">
                                        <p className="text-sm text-slate-500">Resume/CV Preview would appear here.</p>
                                        <button className="mt-2 text-primary font-bold text-sm">Download Resume</button>
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
