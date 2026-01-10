import React, { useState, useEffect } from 'react';
import AdminTable from '../components/AdminTable';
import Modal from '../components/ui/Modal';
import { useToast } from '../context/ToastContext';
import { Edit, Trash2 } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/editor.css';
import { dataService } from '../services/dataService';
import api from '../services/api';

const AdminServices = () => {
    const { addToast } = useToast();

    // -- State --
    const [services, setServices] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Expanded State Model
    const [currentService, setCurrentService] = useState({
        _id: '',
        title: '', // Heading
        shortDescription: '', // Paragraph
        features: '', // Bullet Points (comma separated)
        image: '', // Image URL
        category: 'Development',
        status: 'Active'
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
            shortDescription: '',
            features: '',
            image: '',
            category: 'Development',
            status: 'Active'
        });
        setIsModalOpen(true);
    };

    const openEditModal = (service) => {
        setIsEditMode(true);
        setCurrentService({
            ...service,
            _id: service._id,
            features: (service.features || []).join(', '),
            status: service.active ? 'Active' : 'Inactive',
            image: service.image || ''
        });
        setIsModalOpen(true);
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: { 'Content-Type': undefined },
            };

            const { data } = await api.post('/upload', formData, config);
            setCurrentService({ ...currentService, image: data.url });
            setUploading(false);
            addToast('Image uploaded successfully', 'success');
        } catch (error) {
            console.error(error);
            setUploading(false);
            addToast('Image upload failed', 'error');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Client-side Validation
        if (!currentService.title?.trim()) return addToast('Title is required', 'error');
        if (!currentService.shortDescription?.trim()) return addToast('Short description is required', 'error');

        const payload = {
            title: (currentService.title || '').trim(),
            shortDescription: (currentService.shortDescription || '').trim(),
            features: (currentService.features || '').split(',').map(f => f.trim()).filter(Boolean),
            image: (currentService.image || '').trim(),
            active: currentService.status === 'Active',
            category: currentService.category,
            fullDescription: (currentService.shortDescription || '').trim() // Syncing full with short for simplicity
        };

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
            const errorMsg = err.response?.data?.error || 'Operation failed';
            addToast(errorMsg, 'error');
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
                <form onSubmit={handleSubmit} className="space-y-4 font-sans">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1 caps">Heading (Service Title)</label>
                        <input
                            type="text"
                            required
                            value={currentService.title}
                            onChange={(e) => setCurrentService({ ...currentService, title: e.target.value })}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#05A4A7] transition-all"
                            placeholder="e.g. Web Development"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Paragraph (Description)</label>
                        <textarea
                            required
                            value={currentService.shortDescription}
                            onChange={(e) => setCurrentService({ ...currentService, shortDescription: e.target.value })}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#05A4A7] transition-all h-24 resize-none"
                            placeholder="Write a small paragraph about this service..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Bullet Points (Features)</label>
                        <input
                            type="text"
                            value={currentService.features}
                            onChange={(e) => setCurrentService({ ...currentService, features: e.target.value })}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#05A4A7] transition-all"
                            placeholder="e.g. SEO, Responsive, Next.js (comma separated)"
                        />
                        <p className="text-[10px] text-slate-400 mt-1">Add features separated by commas.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Service Image</label>
                        <div className="flex flex-col gap-2">
                            {currentService.image && (
                                <div className="w-20 h-20 rounded-lg overflow-hidden border border-slate-200">
                                    <img
                                        src={`http://localhost:5000${currentService.image}`}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.src = 'https://placehold.co/100x100?text=Error'; }}
                                    />
                                </div>
                            )}
                            <input
                                type="file"
                                onChange={uploadFileHandler}
                                className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#05A4A7]/10 file:text-[#05A4A7] hover:file:bg-[#05A4A7]/20"
                            />
                            {uploading && <p className="text-[10px] text-[#05A4A7] animate-pulse">Uploading image...</p>}
                            <input
                                type="text"
                                value={currentService.image}
                                onChange={(e) => setCurrentService({ ...currentService, image: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#05A4A7] text-[10px]"
                                placeholder="Or paste image URL directly"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Category</label>
                            <select
                                value={currentService.category}
                                onChange={(e) => setCurrentService({ ...currentService, category: e.target.value })}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#05A4A7] appearance-none bg-white"
                            >
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
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#05A4A7] appearance-none bg-white"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-6 flex justify-end gap-3 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-6 py-2.5 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-2.5 bg-[#05A4A7] text-white font-bold rounded-xl hover:bg-[#048a8d] transition-all shadow-lg shadow-[#05A4A7]/20"
                        >
                            {isEditMode ? 'Update Service' : 'Create Service'}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default AdminServices;
