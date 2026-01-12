import React, { useState, useEffect } from 'react';
import AdminTable from '../components/AdminTable';
import { useToast } from '../context/ToastContext';
import { Edit, Trash2 } from 'lucide-react';
import Modal from '../components/ui/Modal';
import { dataService } from '../services/dataService';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/editor.css';

const HRJobs = () => {
    const { addToast } = useToast();

    // -- State --
    const [jobs, setJobs] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    // Expanded State
    const [currentJob, setCurrentJob] = useState({
        _id: '',
        title: '',
        department: '',
        type: 'Full Time',
        location: 'Remote',
        status: 'Open',
        description: '', // HTML
        requirements: '', // HTML
        applicants: 0
    });

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {
        try {
            const data = await dataService.getJobs();
            setJobs(data || []);
        } catch (err) {
            console.error(err);
            addToast("Failed to load jobs", "error");
        }
    };

    const openAddModal = () => {
        setIsEditMode(false);
        setCurrentJob({
            _id: '',
            title: '',
            department: '',
            type: 'Full Time',
            location: 'Remote',
            status: 'Open',
            description: '',
            requirements: '',
            applicants: 0
        });
        setIsModalOpen(true);
    };

    const openEditModal = (job) => {
        setIsEditMode(true);
        setCurrentJob({
            ...job,
            _id: job._id,
            status: job.active ? 'Open' : 'Closed'
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Remove this job opening?')) {
            try {
                await dataService.deleteJob(id);
                setJobs(prev => prev.filter(j => j._id !== id));
                addToast('Job opening removed', 'success');
            } catch (err) {
                addToast('Failed to remove job', 'error');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...currentJob,
            active: currentJob.status === 'Open'
        };
        delete payload._id;
        delete payload.status;
        delete payload.applicants;

        try {
            if (isEditMode) {
                await dataService.updateJob(currentJob._id, payload);
                addToast('Job updated', 'success');
            } else {
                await dataService.createJob(payload);
                addToast('New Job posted', 'success');
            }
            loadJobs();
            setIsModalOpen(false);
        } catch (err) {
            console.error(err);
            addToast('Operation failed', 'error');
        }
    };

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'bullet' }],
            ['clean']
        ],
    };

    const columns = [
        { header: 'Job Title', accessor: 'title' },
        { header: 'Department', accessor: 'department' },
        { header: 'Type', accessor: 'type' },
        { header: 'Location', accessor: 'location' },
        {
            header: 'Status',
            accessor: 'active',
            render: (row) => (
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${row.active ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                    {row.active ? 'Open' : 'Closed'}
                </span>
            )
        },
        { header: 'Applicants', accessor: 'applicants', render: () => 0 }, // Mock applicants for now
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
                onClick={() => handleDelete(row._id)}
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
                    <div className="grid grid-cols-2 gap-4">
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
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Department</label>
                            <input
                                type="text"
                                required
                                value={currentJob.department}
                                onChange={(e) => setCurrentJob({ ...currentJob, department: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Type</label>
                            <select
                                value={currentJob.type}
                                onChange={(e) => setCurrentJob({ ...currentJob, type: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                            >
                                <option value="Full Time">Full Time</option>
                                <option value="Part Time">Part Time</option>
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

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Job Description</label>
                        <ReactQuill
                            theme="snow"
                            value={currentJob.description}
                            onChange={(content) => setCurrentJob({ ...currentJob, description: content })}
                            modules={modules}
                            className="bg-white rounded-lg"
                        />
                    </div>



                    <div className="pt-4 flex justify-end gap-2 border-t border-slate-100">
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
            </Modal >
        </>
    );
};

export default HRJobs;
