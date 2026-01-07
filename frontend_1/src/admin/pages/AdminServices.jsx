import React, { useState, useEffect } from 'react';
import AdminTable from '../components/AdminTable';
import Modal from '../components/ui/Modal';
import { useToast } from '../context/ToastContext';
import { Edit, Trash2 } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/editor.css';
import { dataService } from '../services/dataService';

const AdminServices = () => {
    const { addToast } = useToast();

    // -- State --
    const [services, setServices] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    // Expanded State Model
    const [currentService, setCurrentService] = useState({
        _id: '',
        title: '',
        slug: '',
        category: '',
        status: 'Active',
        shortDescription: '',
        fullDescription: '', // HTML content
        icon: '',
        features: '' // comma separated string for input
    });

    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = async () => {
        try {
            const data = await dataService.getServices();
            setServices(data || []);
        } catch (err) {
            console.error("Failed to load services", err);
            addToast("Failed to load services", "error");
        }
    };

    const openAddModal = () => {
        setIsEditMode(false);
        setCurrentService({
            _id: '',
            title: '',
            slug: '',
            category: '',
            status: 'Active',
            shortDescription: '',
            fullDescription: '',
            icon: '',
            features: ''
        });
        setIsModalOpen(true);
    };

    const openEditModal = (service) => {
        setIsEditMode(true);
        setCurrentService({
            ...service,
            _id: service._id,
            slug: service.slug,
            features: (service.features || []).join(', '),
            status: service.active ? 'Active' : 'Inactive'
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...currentService,
            features: currentService.features.split(',').map(f => f.trim()).filter(Boolean),
            slug: currentService.slug || undefined,
            active: currentService.status === 'Active'
        };

        delete payload._id;
        delete payload.status;

        try {
            if (isEditMode) {
                await dataService.updateService(currentService._id, payload);
                addToast('Service updated successfully', 'success');
            } else {
                await dataService.createService(payload);
                addToast('New service added successfully', 'success');
            }
            loadServices();
            setIsModalOpen(false);
        } catch (err) {
            console.error(err);
            addToast('Operation failed', 'error');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                await dataService.deleteService(id);
                setServices(prev => prev.filter(s => s._id !== id));
                addToast('Service deleted successfully', 'success');
            } catch (err) {
                addToast('Failed to delete service', 'error');
            }
        }
    }

    const modules = {
        toolbar: [
            [{ 'header': [false, 1, 2, 3] }],
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
            accessor: 'active', // Use active boolean for render logic
            render: (row) => (
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${row.active ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                    {row.active ? 'Active' : 'Inactive'}
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
                title="Edit"
            >
                <Edit size={16} />
            </button>
            <button
                onClick={() => handleDelete(row._id)}
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
                            <label className="block text-sm font-bold text-slate-700 mb-1">ID (Slug)</label>
                            <input
                                type="text"
                                value={currentService.slug}
                                onChange={(e) => setCurrentService({ ...currentService, slug: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                                placeholder="Auto-generated if empty"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
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
                                <option value="AI">AI</option>
                                <option value="Operations">Operations</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Short Description</label>
                        <textarea
                            value={currentService.shortDescription}
                            onChange={(e) => setCurrentService({ ...currentService, shortDescription: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary h-20 resize-none"
                        />
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
                        <label className="block text-sm font-bold text-slate-700 mb-1">Full Detailed Content</label>
                        <ReactQuill
                            theme="snow"
                            value={currentService.fullDescription}
                            onChange={(content) => setCurrentService({ ...currentService, fullDescription: content })}
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
