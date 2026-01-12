import React, { useState } from 'react';
import AdminTable from '../components/AdminTable';
import Modal from '../components/ui/Modal';
import { useToast } from '../context/ToastContext';
import { Edit, Trash2, Linkedin } from 'lucide-react';

const AdminTeam = () => {
    const { addToast } = useToast();

    // -- State --
    const [members, setMembers] = useState([
        { id: 1, name: 'Sarah Connor', role: 'CEO', department: 'Executive', status: 'Active' },
        { id: 2, name: 'Kyle Reese', role: 'CTO', department: 'Engineering', status: 'Active' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentMember, setCurrentMember] = useState({ id: '', name: '', role: '', department: '', status: 'Active' });

    // -- Handlers --
    const openAddModal = () => {
        setIsEditMode(false);
        setCurrentMember({ id: '', name: '', role: '', department: '', status: 'Active' });
        setIsModalOpen(true);
    };

    const openEditModal = (member) => {
        setIsEditMode(true);
        setCurrentMember({ ...member });
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Remove team member?')) {
            setMembers(prev => prev.filter(m => m.id !== id));
            addToast('Team member removed', 'success');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditMode) {
            setMembers(prev => prev.map(m => m.id === currentMember.id ? { ...currentMember } : m));
            addToast('Profile updated', 'success');
        } else {
            const newMember = {
                ...currentMember,
                id: Date.now()
            };
            setMembers(prev => [newMember, ...prev]);
            addToast('New team member added', 'success');
        }
        setIsModalOpen(false);
    };

    // -- Render --
    const columns = [
        { header: 'Name', accessor: 'name' },
        { header: 'Role', accessor: 'role' },
        { header: 'Department', accessor: 'department' },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => (
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${row.status === 'Active' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                    {row.status}
                </span>
            )
        },
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
                title="Team Management"
                columns={columns}
                data={members}
                onAdd={openAddModal}
                customActions={renderActions}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={isEditMode ? 'Edit Profile' : 'Add Team Member'}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            required
                            value={currentMember.name}
                            onChange={(e) => setCurrentMember({ ...currentMember, name: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Role/Title</label>
                            <input
                                type="text"
                                required
                                value={currentMember.role}
                                onChange={(e) => setCurrentMember({ ...currentMember, role: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Department</label>
                            <select
                                value={currentMember.department}
                                onChange={(e) => setCurrentMember({ ...currentMember, department: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                            >
                                <option value="">Select Dept</option>
                                <option value="Executive">Executive</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Sales">Sales</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Status</label>
                        <select
                            value={currentMember.status}
                            onChange={(e) => setCurrentMember({ ...currentMember, status: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                        >
                            <option value="Active">Active</option>
                            <option value="On Leave">On Leave</option>
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
                            {isEditMode ? 'Update Profile' : 'Add Member'}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default AdminTeam;
