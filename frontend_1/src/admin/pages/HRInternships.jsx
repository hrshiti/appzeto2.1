import React, { useState, useEffect } from 'react';
import AdminTable from '../components/AdminTable';
import Modal from '../components/ui/Modal';
import { useToast } from '../context/ToastContext';
import { Edit, Trash2 } from 'lucide-react';
import { dataService } from '../services/dataService';

const HRInternships = () => {
    const { addToast } = useToast();

    const [internships, setInternships] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const [currentInternship, setCurrentInternship] = useState({
        _id: '',
        title: '',
        duration: '',
        stipend: '',
        description: '',
        eligibility: '',
        status: 'Open'
    });

    useEffect(() => {
        loadInternships();
    }, []);

    const loadInternships = async () => {
        try {
            const data = await dataService.getInternships();
            setInternships(data || []);
        } catch (err) {
            console.error("Failed to load internships", err);
            addToast("Failed to load internships", "error");
        }
    };

    const saveToStorage = (updated) => {
        setInternships(updated);
        // dataService.saveInternships(updated); // Sync methods removed
    };

    const openAddModal = () => {
        setIsEditMode(false);
        setCurrentInternship({ _id: '', title: '', duration: '', stipend: '', description: '', eligibility: '', status: 'Open' });
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        setIsEditMode(true);
        setCurrentInternship({
            ...item,
            _id: item._id,
            stipend: item.salary || '', // Map salary -> stipend
            eligibility: item.requirements || '', // Map requirements -> eligibility
            status: item.active ? 'Open' : 'Closed'
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this internship?')) {
            try {
                await dataService.deleteJob(id); // Use deleteJob (it deletes from Jobs collection)
                setInternships(prev => prev.filter(i => i._id !== id));
                addToast('Internship deleted', 'success');
            } catch (err) {
                addToast('Failed to delete internship', 'error');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...currentInternship,
            type: 'Internship', // Enforce type
            salary: currentInternship.stipend,
            requirements: currentInternship.eligibility,
            active: currentInternship.status === 'Open'
        };
        // Clean
        delete payload._id;
        delete payload.stipend;
        delete payload.eligibility;
        delete payload.status;

        try {
            if (isEditMode) {
                await dataService.updateJob(currentInternship._id, payload); // Use updateJob
                addToast('Internship updated', 'success');
            } else {
                await dataService.createJob(payload); // Use createJob
                addToast('Internship added', 'success');
            }
            loadInternships();
            setIsModalOpen(false);
        } catch (err) {
            console.error(err);
            addToast('Operation failed', 'error');
        }
    };

    const columns = [
        { header: 'Title', accessor: 'title' },
        { header: 'Duration', accessor: 'duration' },
        { header: 'Stipend', accessor: 'salary', render: (row) => row.salary || '-' }, // Show salary as stipend
        {
            header: 'Status', accessor: 'active', render: (row) => (
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${row.active ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                    {row.active ? 'Open' : 'Closed'}
                </span>
            )
        }
    ];

    const renderActions = (row) => (
        <div className="flex items-center justify-end gap-2">
            <button onClick={() => openEditModal(row)} className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors">
                <Edit size={16} />
            </button>
            <button onClick={() => handleDelete(row._id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 size={16} />
            </button>
        </div>
    );

    return (
        <>
            <AdminTable
                title="Internships Management"
                columns={columns}
                data={internships}
                onAdd={openAddModal}
                customActions={renderActions}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={isEditMode ? 'Edit Internship' : 'Add New Internship'}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Internship Title</label>
                        <input
                            type="text"
                            required
                            value={currentInternship.title}
                            onChange={(e) => setCurrentInternship({ ...currentInternship, title: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Duration</label>
                            <input
                                type="text"
                                required
                                value={currentInternship.duration}
                                onChange={(e) => setCurrentInternship({ ...currentInternship, duration: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                                placeholder="e.g. 6 Months"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Stipend</label>
                            <input
                                type="text"
                                value={currentInternship.stipend}
                                onChange={(e) => setCurrentInternship({ ...currentInternship, stipend: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                                placeholder="e.g. Unpaid / $500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Description</label>
                        <textarea
                            required
                            value={currentInternship.description}
                            onChange={(e) => setCurrentInternship({ ...currentInternship, description: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary h-24 resize-none"
                        />
                    </div>



                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Status</label>
                        <select
                            value={currentInternship.status}
                            onChange={(e) => setCurrentInternship({ ...currentInternship, status: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                        >
                            <option value="Open">Open</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>

                    <div className="pt-4 flex justify-end gap-2 border-t border-slate-100 mt-6">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-500 font-bold hover:bg-slate-50 rounded-lg">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-primary text-white font-bold rounded-lg hover:bg-[#048a8d] shadow-lg shadow-primary/20">
                            {isEditMode ? 'Save Changes' : 'Create Internship'}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default HRInternships;
