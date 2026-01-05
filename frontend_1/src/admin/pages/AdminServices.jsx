import React, { useState } from 'react';
import AdminTable from '../components/AdminTable';
import Modal from '../components/ui/Modal';
import { useToast } from '../context/ToastContext';
import { Edit, Trash2 } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/editor.css';

const AdminServices = () => {
    const { addToast } = useToast();

    // -- State --
    const [services, setServices] = useState([
        {
            id: 1,
            title: 'Web Development',
            category: 'Development',
            status: 'Active',
            updated: '2 days ago',
            description: 'Full stack web development services...',
            icon: 'language',
            features: ['Responsive', 'SEO Friendly', 'Fast']
        },
        {
            id: 2,
            title: 'UI/UX Design',
            category: 'Design',
            status: 'Active',
            updated: '5 days ago',
            description: 'User interface design...',
            icon: 'brush',
            features: ['Prototyping', 'Wireframing']
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    // Expanded State Model
    const [currentService, setCurrentService] = useState({
        id: '',
        title: '',
        category: '',
        status: 'Active',
        description: '', // HTML content
        icon: '',
        features: '' // comma separated string for input
    });

    const openAddModal = () => {
        setIsEditMode(false);
        setCurrentService({ id: '', title: '', category: '', status: 'Active', description: '', icon: '', features: '' });
        setIsModalOpen(true);
    };

    const openEditModal = (service) => {
        setIsEditMode(true);
        setCurrentService({
            ...service,
            features: service.features ? service.features.join(', ') : ''
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const servicePayload = {
            ...currentService,
            features: currentService.features.split(',').map(f => f.trim()).filter(f => f !== '')
        };

        if (isEditMode) {
            setServices(prev => prev.map(s => s.id === currentService.id ? { ...servicePayload, updated: 'Just now' } : s));
            addToast('Service updated successfully', 'success');
        } else {
            const newService = {
                ...servicePayload,
                id: Date.now(),
                updated: 'Just now'
            };
            setServices(prev => [newService, ...prev]);
            addToast('New service added successfully', 'success');
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            setServices(prev => prev.filter(s => s.id !== id));
            addToast('Service deleted successfully', 'success');
        }
    }

    const modules = {
        toolbar: [
            [{ 'header': [false] }],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['clean']
        ],
    };

    const columns = [
        { header: 'Service Title', accessor: 'title' },
        { header: 'Category', accessor: 'category' },
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
        { header: 'Icon Code', accessor: 'icon', render: (row) => <code className="text-xs bg-slate-100 px-1 rounded">{row.icon}</code> },
    ];

    const renderActions = (row) => (
        <div className="flex items-center justify-end gap-2">
            <button
                onClick={() => openEditModal(row)}
                className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"
            >
                <Edit size={16} />
            </button>
            <button
                onClick={() => handleDelete(row.id)}
                className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
                <Trash2 size={16} />
            </button>
        </div>
    );

    return (
        <>
            <AdminTable
                title="Services Management"
                subtitle="Manage website service offerings."
                columns={columns}
                data={services}
                onAdd={openAddModal}
                customActions={renderActions}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={isEditMode ? 'Edit Service' : 'Add New Service'}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Service Title</label>
                            <input
                                type="text"
                                required
                                value={currentService.title}
                                onChange={(e) => setCurrentService({ ...currentService, title: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Google Icon Name</label>
                            <input
                                type="text"
                                required
                                value={currentService.icon}
                                onChange={(e) => setCurrentService({ ...currentService, icon: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                                placeholder="e.g. smartphone"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Category</label>
                            <select
                                value={currentService.category}
                                onChange={(e) => setCurrentService({ ...currentService, category: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                            >
                                <option value="">Select Category</option>
                                <option value="Development">Development</option>
                                <option value="Design">Design</option>
                                <option value="Marketing">Marketing</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Status</label>
                            <select
                                value={currentService.status}
                                onChange={(e) => setCurrentService({ ...currentService, status: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                            >
                                <option value="Active">Active</option>
                                <option value="Draft">Draft</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Features <span className="text-xs font-normal text-slate-400">(Comma separated)</span></label>
                        <input
                            type="text"
                            value={currentService.features}
                            onChange={(e) => setCurrentService({ ...currentService, features: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                            placeholder="SEO, Responsive, Mobile Ready"
                        />
                    </div>

                    <div className="pb-12">
                        <label className="block text-sm font-bold text-slate-700 mb-1">Detailed Description</label>
                        <ReactQuill
                            theme="snow"
                            value={currentService.description}
                            onChange={(content) => setCurrentService({ ...currentService, description: content })}
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
                            {isEditMode ? 'Save Changes' : 'Create Service'}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default AdminServices;
