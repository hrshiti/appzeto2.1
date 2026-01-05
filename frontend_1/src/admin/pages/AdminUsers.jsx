import React, { useState } from 'react';
import AdminTable from '../components/AdminTable';
import { useToast } from '../context/ToastContext';
import { User, Trash2, Shield } from 'lucide-react';
import Modal from '../components/ui/Modal';

const AdminUsers = () => {
    const { addToast } = useToast();

    // -- State --
    const [users, setUsers] = useState([
        { id: 1, name: 'Super Admin', email: 'admin@appzeto.com', role: 'ADMIN', status: 'Active' },
        { id: 2, name: 'HR Manager', email: 'hr@appzeto.com', role: 'HR', status: 'Active' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', role: 'HR', password: '' });

    // -- Handlers --
    const handleDelete = (id) => {
        if (id === 1) {
            addToast('Cannot delete Super Admin', 'error');
            return;
        }
        if (window.confirm('Revoke access for this user?')) {
            setUsers(prev => prev.filter(u => u.id !== id));
            addToast('User access revoked', 'success');
        }
    };

    const handleInvite = (e) => {
        e.preventDefault();
        const user = {
            id: Date.now(),
            ...newUser,
            status: 'Active'
        };
        setUsers(prev => [...prev, user]);
        addToast(`Invite sent to ${newUser.email}`, 'success');
        setIsModalOpen(false);
        setNewUser({ name: '', email: '', role: 'HR', password: '' });
    };

    // -- Render --
    const columns = [
        { header: 'Name', accessor: 'name' },
        { header: 'Email', accessor: 'email' },
        {
            header: 'Role',
            accessor: 'role',
            render: (row) => (
                <div className="flex items-center gap-2">
                    {row.role === 'ADMIN' ? <Shield size={14} className="text-primary" /> : <User size={14} className="text-indigo-500" />}
                    <span className="font-bold text-sm text-slate-700">{row.role}</span>
                </div>
            )
        },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => (
                <span className="px-2 py-1 rounded text-[10px] bg-emerald-100 text-emerald-600 font-bold uppercase">
                    {row.status}
                </span>
            )
        },
    ];

    const renderActions = (row) => (
        <div className="flex items-center justify-end gap-2">
            <button
                onClick={() => handleDelete(row.id)}
                className={`p-1.5 rounded-lg transition-colors ${row.role === 'ADMIN' ? 'text-slate-200 cursor-not-allowed' : 'text-slate-400 hover:text-red-500 hover:bg-red-50'}`}
                title="Revoke Access"
                disabled={row.role === 'ADMIN'}
            >
                <Trash2 size={16} />
            </button>
        </div>
    );

    return (
        <>
            <AdminTable
                title="Admin Users"
                subtitle="Manage internal users and role access."
                columns={columns}
                data={users}
                onAdd={() => setIsModalOpen(true)}
                customActions={renderActions}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Invite New User"
            >
                <form onSubmit={handleInvite} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            required
                            value={newUser.name}
                            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            required
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                            placeholder="colleague@appzeto.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Role</label>
                        <select
                            value={newUser.role}
                            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                        >
                            <option value="HR">HR Manager</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Temporary Password</label>
                        <input
                            type="password"
                            required
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                        />
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
                            Send Invite
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default AdminUsers;
