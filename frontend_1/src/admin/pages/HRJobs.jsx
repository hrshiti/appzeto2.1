import React, { useState } from 'react';
import AdminTable from '../components/AdminTable';
import { useToast } from '../context/ToastContext';
import { Edit, Trash2 } from 'lucide-react';
import Modal from '../components/ui/Modal';

const HRJobs = () => {
    const { addToast } = useToast();

    // -- State --
    const [jobs, setJobs] = useState([
        { id: 1, title: 'Senior Frontend Developer', type: 'Full-time', location: 'Remote', status: 'Open', applicants: 12 },
        { id: 2, title: 'Marketing Intern', type: 'Internship', location: 'New York', status: 'Closed', applicants: 45 },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentJob, setCurrentJob] = useState({ id: '', title: '', type: 'Full-time', location: 'Remote', status: 'Open' });

    // -- Handlers --
    const openAddModal = () => {
        setIsEditMode(false);
        setCurrentJob({ id: '', title: '', type: 'Full-time', location: 'Remote', status: 'Open' });
        setIsModalOpen(true);
    };

    const openEditModal = (job) => {
        setIsEditMode(true);
        setCurrentJob({ ...job });
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Remove this job opening?')) {
            setJobs(prev => prev.filter(j => j.id !== id));
            addToast('Job opening removed', 'success');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditMode) {
            setJobs(prev => prev.map(j => j.id === currentJob.id ? { ...currentJob } : j));
            addToast('Job updated', 'success');
        } else {
            const newJob = {
                ...currentJob,
                id: Date.now(),
                applicants: 0
            };
            setJobs(prev => [newJob, ...prev]);
            addToast('New Job posted', 'success');
        }
        setIsModalOpen(false);
    };

    // -- Render --
    const columns = [
        { header: 'Job Title', accessor: 'title' },
        { header: 'Type', accessor: 'type' },
        { header: 'Location', accessor: 'location' },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => (
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${row.status === 'Open' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                    {row.status}
                </span>
            )
        },
        { header: 'Applicants', accessor: 'applicants' },
    ];

    const renderActions = (row) => (
        <div className="flex items-center justify-end gap-2">
            <button
                onClick={() => openEditModal(row)}
                className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"
                title="Edit details"
            >
                <Edit size={16} />
            </button>
            <button
                onClick={() => handleDelete(row.id)}
                className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove Job"
            >
                <Trash2 size={16} />
            </button>
        </div>
    );

    return (
        <>
            <AdminTable
                title="Job Openings"
                subtitle="Manage recruitment and job posts."
                columns={columns}
                data={jobs}
                onAdd={openAddModal}
                customActions={renderActions}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={isEditMode ? 'Edit Job Opening' : 'Post New Job'}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Job Title</label>
                        <input
                            type="text"
                            required
                            value={currentJob.title}
                            onChange={(e) => setCurrentJob({ ...currentJob, title: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Type</label>
                            <select
                                value={currentJob.type}
                                onChange={(e) => setCurrentJob({ ...currentJob, type: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                            >
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Location</label>
                            <input
                                type="text"
                                required
                                value={currentJob.location}
                                onChange={(e) => setCurrentJob({ ...currentJob, location: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Status</label>
                        <select
                            value={currentJob.status}
                            onChange={(e) => setCurrentJob({ ...currentJob, status: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                        >
                            <option value="Open">Open (Accepting)</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>
                    <div className="pt-4 flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 text-slate-500 font-bold hover:bg-slate-50 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-primary text-white font-bold rounded-lg hover:bg-[#048a8d] transition-colors shadow-lg shadow-primary/20"
                        >
                            {isEditMode ? 'Update Job' : 'Post Job'}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default HRJobs;
