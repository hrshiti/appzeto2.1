import React, { useState } from 'react';
import AdminTable from '../components/AdminTable';
import Modal from '../components/ui/Modal';
import { useToast } from '../context/ToastContext';
import { Edit, Trash2 } from 'lucide-react';

const AdminProjects = () => {
    const { addToast } = useToast();

    // -- State --
    const [projects, setProjects] = useState([
        { id: 1, name: 'Appzeto Food', client: 'Internal', category: 'Product', status: 'Live', updated: '1 week ago' },
        { id: 2, name: 'EcoTracker App', client: 'Green Solutions', category: 'Mobile App', status: 'In Progress', updated: '1 day ago' },
        { id: 3, name: 'Finance Dash', client: 'FinCorp', category: 'Web App', status: 'Completed', updated: '3 weeks ago' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentProject, setCurrentProject] = useState({ id: '', name: '', client: '', category: '', status: 'In Progress' });

    // -- Handlers --
    const openAddModal = () => {
        setIsEditMode(false);
        setCurrentProject({ id: '', name: '', client: '', category: '', status: 'In Progress' });
        setIsModalOpen(true);
    };

    const openEditModal = (project) => {
        setIsEditMode(true);
        setCurrentProject({ ...project });
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this project?')) {
            setProjects(prev => prev.filter(p => p.id !== id));
            addToast('Project deleted', 'error');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditMode) {
            setProjects(prev => prev.map(p => p.id === currentProject.id ? { ...currentProject, updated: 'Just now' } : p));
            addToast('Project updated', 'success');
        } else {
            const newProject = {
                ...currentProject,
                id: Date.now(),
                updated: 'Just now'
            };
            setProjects(prev => [newProject, ...prev]);
            addToast('Project created', 'success');
        }
        setIsModalOpen(false);
    };

    // -- Render --
    const columns = [
        { header: 'Project Name', accessor: 'name' },
        { header: 'Client', accessor: 'client' },
        { header: 'Category', accessor: 'category' },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => (
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${row.status === 'Live' || row.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' :
                        row.status === 'In Progress' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                    {row.status}
                </span>
            )
        },
        { header: 'Last Updated', accessor: 'updated' },
    ];

    const renderActions = (row) => (
        <div className="flex items-center justify-end gap-2">
            <button
                onClick={() => openEditModal(row)}
                className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"
                title="Edit"
            >
                <Edit size={16} />
            </button>
            <button
                onClick={() => handleDelete(row.id)}
                className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete"
            >
                <Trash2 size={16} />
            </button>
        </div>
    );

    return (
        <>
            <AdminTable
                title="Projects"
                subtitle="Manage portfolio and client projects."
                columns={columns}
                data={projects}
                onAdd={openAddModal}
                customActions={renderActions}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={isEditMode ? 'Edit Project' : 'Add New Project'}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Project Name</label>
                        <input
                            type="text"
                            required
                            value={currentProject.name}
                            onChange={(e) => setCurrentProject({ ...currentProject, name: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Client</label>
                            <input
                                type="text"
                                required
                                value={currentProject.client}
                                onChange={(e) => setCurrentProject({ ...currentProject, client: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Category</label>
                            <input
                                type="text"
                                required
                                value={currentProject.category}
                                onChange={(e) => setCurrentProject({ ...currentProject, category: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                                placeholder="Web / Mobile / AI"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Status</label>
                        <select
                            value={currentProject.status}
                            onChange={(e) => setCurrentProject({ ...currentProject, status: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                        >
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Live">Live</option>
                            <option value="On Hold">On Hold</option>
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
                            {isEditMode ? 'Save Changes' : 'Create Project'}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default AdminProjects;
