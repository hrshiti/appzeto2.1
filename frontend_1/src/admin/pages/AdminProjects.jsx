import React, { useState, useEffect } from 'react';
import AdminTable from '../components/AdminTable';
import Modal from '../components/ui/Modal';
import { useToast } from '../context/ToastContext';
import { Edit, Trash2, X, Upload } from 'lucide-react';
import { dataService } from '../services/dataService';
import api from '../services/api';

const AdminProjects = () => {
    const { addToast } = useToast();

    // -- State --
    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const [currentProject, setCurrentProject] = useState({
        summary: '', // Legacy field if needed, but we use description
        description: '', // Main short text
        fullDescription: '',
        thumbnail: '',
        coverImage: '',
        images: [],
        tags: '', // string for input
        challenge: '',
        solution: '',
        features: '',
        results: '',
        testimonial: {
            text: '',
            author: '',
            role: ''
        },
        active: true
    });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const data = await dataService.getProjects();
            setProjects(data || []);
        } catch (err) {
            console.error(err);
            addToast('Failed to load projects', 'error');
        }
    };

    const openAddModal = () => {
        setIsEditMode(false);
        setCurrentProject({
            _id: '', title: '', slug: '', subtitle: '', category: '', industry: '', client: '',
            year: new Date().getFullYear().toString(), description: '', fullDescription: '',
            thumbnail: '', coverImage: '', images: [], tags: '', challenge: '', solution: '',
            features: '', results: '',
            testimonial: { text: '', author: '', role: '' },
            active: true
        });
        setIsModalOpen(true);
    };

    const openEditModal = (p) => {
        setIsEditMode(true);
        setCurrentProject({
            ...p,
            _id: p._id,
            tags: (p.tags || []).join(', '),
            features: (p.features || []).join(', '),
            results: (p.results || []).join(', '),
            testimonial: p.testimonial || { text: '', author: '', role: '' }
        });
        setIsModalOpen(true);
    };

    const uploadFileHandler = async (e, isGallery = false) => {
        const files = e.target.files;
        const formData = new FormData();

        setUploading(true);
        try {
            // const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            // Let axios/browser set the content type with boundary automatically
            // We must explicitly unset the default application/json
            const config = { headers: { 'Content-Type': undefined } };

            if (isGallery) {
                // Multiple upload logic if backend supports it, else loop
                for (let i = 0; i < files.length; i++) {
                    const fd = new FormData();
                    fd.append('image', files[i]);
                    const { data } = await api.post('/upload', fd, config);
                    setCurrentProject(prev => ({
                        ...prev,
                        images: [...prev.images, data.url]
                    }));
                }
                addToast(`${files.length} images added to gallery`, 'success');
            } else {
                formData.append('image', files[0]);
                const { data } = await api.post('/upload', formData, config);
                setCurrentProject({ ...currentProject, thumbnail: data.url });
                addToast('Thumbnail uploaded', 'success');
            }
        } catch (error) {
            addToast('Upload failed', 'error');
        } finally {
            setUploading(false);
        }
    };

    const removeGalleryImage = (index) => {
        const newImages = [...currentProject.images];
        newImages.splice(index, 1);
        setCurrentProject({ ...currentProject, images: newImages });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this project?')) {
            try {
                await dataService.deleteProject(id);
                setProjects(prev => prev.filter(p => p._id !== id));
                addToast('Project deleted', 'success');
            } catch (err) {
                addToast('Failed to delete project', 'error');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Construct payload
        const payload = {
            ...currentProject,
            tags: typeof currentProject.tags === 'string' ? currentProject.tags.split(',').map(s => s.trim()).filter(Boolean) : currentProject.tags,
            features: typeof currentProject.features === 'string' ? currentProject.features.split(',').map(s => s.trim()).filter(Boolean) : currentProject.features,
            results: typeof currentProject.results === 'string' ? currentProject.results.split(',').map(s => s.trim()).filter(Boolean) : currentProject.results,
        };

        // If coverImage is empty, use thumbnail
        if (!payload.coverImage) payload.coverImage = payload.thumbnail;

        // If slug is empty, remove it so backend generates it from title
        if (!payload.slug) delete payload.slug;
        delete payload._id;
        delete payload.uploading; // Remove UI state if present

        try {
            if (isEditMode) {
                await dataService.updateProject(currentProject._id, payload);
                addToast('Project updated', 'success');
            } else {
                await dataService.createProject(payload);
                addToast('Project created', 'success');
            }
            await loadProjects();
            setIsModalOpen(false);
        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.error || 'Operation failed';
            addToast(msg, 'error');
        }
    };

    const columns = [
        { header: 'Project Name', accessor: 'title' },
        { header: 'Client', accessor: 'client' },
        { header: 'Category', accessor: 'category' },
        { header: 'Year', accessor: 'year' }
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
                <form onSubmit={handleSubmit} className="space-y-6 max-h-[80vh] overflow-y-auto px-1 custom-scrollbar">
                    {/* Basic Info Group */}
                    <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 space-y-4">
                        <label className="block text-xs font-black uppercase text-primary tracking-widest">Project Identity</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Project Title</label>
                                <input
                                    type="text"
                                    required
                                    value={currentProject.title}
                                    onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-primary"
                                    placeholder="Neon Banking"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Subtitle (Hero Text)</label>
                                <input
                                    type="text"
                                    value={currentProject.subtitle}
                                    onChange={(e) => setCurrentProject({ ...currentProject, subtitle: e.target.value })}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-primary"
                                    placeholder="Redefining the digital banking experience"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Category</label>
                                <input
                                    type="text"
                                    required
                                    value={currentProject.category}
                                    onChange={(e) => setCurrentProject({ ...currentProject, category: e.target.value })}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl"
                                    placeholder="FINTECH"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Industry</label>
                                <input
                                    type="text"
                                    value={currentProject.industry}
                                    onChange={(e) => setCurrentProject({ ...currentProject, industry: e.target.value })}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl"
                                    placeholder="Digital Banking"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Client</label>
                                <input
                                    type="text"
                                    value={currentProject.client}
                                    onChange={(e) => setCurrentProject({ ...currentProject, client: e.target.value })}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl"
                                    placeholder="Neon Inc."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Year</label>
                                <input
                                    type="text"
                                    value={currentProject.year}
                                    onChange={(e) => setCurrentProject({ ...currentProject, year: e.target.value })}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Media Group */}
                    <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 space-y-6">
                        <label className="block text-xs font-black uppercase text-primary tracking-widest">Visual Assets</label>

                        {/* Thumbnail */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Main Thumbnail (Cover)</label>
                            <div className="flex items-center gap-4">
                                {currentProject.thumbnail && (
                                    <img
                                        src={currentProject.thumbnail.startsWith('/uploads') ? `http://localhost:5000${currentProject.thumbnail}` : currentProject.thumbnail}
                                        className="w-24 h-24 object-cover rounded-2xl shadow-lg"
                                        alt="Thumbnail"
                                    />
                                )}
                                <div className="flex-1 space-y-2">
                                    <div className="relative">
                                        <input type="file" onChange={(e) => uploadFileHandler(e, false)} className="hidden" id="thumb-upload" />
                                        <label htmlFor="thumb-upload" className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-primary transition-all">
                                            <Upload size={18} className="text-primary" />
                                            <span className="text-xs font-bold text-slate-600">Upload Cover Image</span>
                                        </label>
                                    </div>
                                    <input
                                        type="text"
                                        value={currentProject.thumbnail}
                                        onChange={(e) => setCurrentProject({ ...currentProject, thumbnail: e.target.value })}
                                        className="w-full px-3 py-1 border border-slate-200 rounded-lg text-[10px]"
                                        placeholder="Or paste image URL"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Gallery */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Project Gallery (Slideshow)</label>
                            <div className="grid grid-cols-4 md:grid-cols-6 gap-3 mb-4">
                                {currentProject.images.map((img, idx) => (
                                    <div key={idx} className="relative group aspect-square">
                                        <img
                                            src={img && img.startsWith('/uploads') ? `http://localhost:5000${img}` : img}
                                            className="w-full h-full object-cover rounded-xl shadow-md"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeGalleryImage(idx)}
                                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                                <div className="relative aspect-square">
                                    <input type="file" multiple onChange={(e) => uploadFileHandler(e, true)} className="hidden" id="gallery-upload" />
                                    <label htmlFor="gallery-upload" className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-primary hover:bg-white transition-all">
                                        <Upload size={20} className="text-primary mb-1" />
                                        <span className="text-[8px] font-bold text-slate-400 uppercase">Add More</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Group */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Full Overview Description</label>
                                <textarea
                                    required
                                    value={currentProject.fullDescription}
                                    onChange={(e) => setCurrentProject({ ...currentProject, fullDescription: e.target.value })}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl h-40 resize-none"
                                    placeholder="A comprehensive look at the project..."
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">The Challenge</label>
                                    <textarea
                                        value={currentProject.challenge}
                                        onChange={(e) => setCurrentProject({ ...currentProject, challenge: e.target.value })}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl h-24 resize-none bg-slate-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">The Solution</label>
                                    <textarea
                                        value={currentProject.solution}
                                        onChange={(e) => setCurrentProject({ ...currentProject, solution: e.target.value })}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl h-24 resize-none bg-emerald-50"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Tech Stack (comma separated)</label>
                                <textarea
                                    value={currentProject.tags}
                                    onChange={(e) => setCurrentProject({ ...currentProject, tags: e.target.value })}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl h-16 resize-none"
                                    placeholder="React, Node.js, Stripe, AWS..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Key Features (comma separated)</label>
                                <textarea
                                    value={currentProject.features}
                                    onChange={(e) => setCurrentProject({ ...currentProject, features: e.target.value })}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl h-24 resize-none"
                                    placeholder="Biometric Login, Real-time Analytics, Cross-border Payments..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Results/Stats (comma separated)</label>
                                <textarea
                                    value={currentProject.results}
                                    onChange={(e) => setCurrentProject({ ...currentProject, results: e.target.value })}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl h-20 resize-none"
                                    placeholder="1M+ TRANSACTIONS, 4.9 APP RATING, 40% GROWTH..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Testimonial */}
                    <div className="p-6 bg-primary/5 rounded-[2rem] border border-primary/10">
                        <label className="block text-xs font-black uppercase text-primary tracking-[0.2em] mb-4">Client Testimonial</label>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <input
                                type="text"
                                placeholder="Author Name"
                                value={currentProject.testimonial.author}
                                onChange={(e) => setCurrentProject({ ...currentProject, testimonial: { ...currentProject.testimonial, author: e.target.value } })}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white"
                            />
                            <input
                                type="text"
                                placeholder="Role (e.g. CEO at Neon)"
                                value={currentProject.testimonial.role}
                                onChange={(e) => setCurrentProject({ ...currentProject, testimonial: { ...currentProject.testimonial, role: e.target.value } })}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white"
                            />
                        </div>
                        <textarea
                            placeholder="The testimonial quote..."
                            value={currentProject.testimonial.text}
                            onChange={(e) => setCurrentProject({ ...currentProject, testimonial: { ...currentProject.testimonial, text: e.target.value } })}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl h-24 resize-none bg-white font-medium italic"
                        />
                    </div>

                    <div className="pt-8 flex justify-end gap-3 sticky bottom-0 bg-white py-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-6 py-3 text-slate-500 font-black uppercase tracking-widest text-xs hover:bg-slate-50 rounded-xl transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={uploading}
                            className={`px-8 py-3 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-xl transition-all shadow-xl shadow-primary/20 ${uploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#048a8d]'}`}
                        >
                            {uploading ? 'Processing Assets...' : (isEditMode ? 'Update Portfolio' : 'Publish Project')}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default AdminProjects;
