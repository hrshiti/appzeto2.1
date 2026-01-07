import React, { useState, useEffect } from 'react';
import AdminTable from '../components/AdminTable';
import Modal from '../components/ui/Modal';
import { useToast } from '../context/ToastContext';
import { Edit, Trash2 } from 'lucide-react';
import { dataService } from '../services/dataService';

const AdminProjects = () => {
    const { addToast } = useToast();

    // -- State --
    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const [currentProject, setCurrentProject] = useState({
        _id: '',
        title: '',
        slug: '',
        subtitle: '',
        category: '',
        description: '', // Short summary
        fullDescription: '', // Long description
        thumbnail: '',
        coverImage: '',
        images: '', // string for input
        tags: '', // map to technologies
        client: '',
        industry: '',
        year: new Date().getFullYear().toString(),
        challenge: '',
        solution: '',
        features: '', // string
        results: '', // string
        testimonialText: '',
        testimonialAuthor: '',
        testimonialRole: ''
    });

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
            _id: '', title: '', slug: '', subtitle: '', category: '', description: '', fullDescription: '',
            thumbnail: '', coverImage: '', images: '', tags: '', client: '', industry: '', year: new Date().getFullYear().toString(),
            challenge: '', solution: '', features: '', results: '',
            testimonialText: '', testimonialAuthor: '', testimonialRole: ''
        });
        setIsModalOpen(true);
    };

    const openEditModal = (p) => {
        setIsEditMode(true);
        setCurrentProject({
            ...p,
            _id: p._id,
            images: (p.images || []).join(', '),
            tags: (p.technologies || []).join(', '),
            features: (p.features || []).join(', '),
            results: (p.results || []).join(', '),
            testimonialText: p.testimonial?.text || '',
            testimonialAuthor: p.testimonial?.author || '',
            testimonialRole: p.testimonial?.role || ''
        });
        setIsModalOpen(true);
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
            technologies: currentProject.tags.split(',').map(s => s.trim()).filter(Boolean),
            images: currentProject.images.split(',').map(s => s.trim()).filter(Boolean),
            features: currentProject.features.split(',').map(s => s.trim()).filter(Boolean),
            results: currentProject.results.split(',').map(s => s.trim()).filter(Boolean),
            testimonial: {
                text: currentProject.testimonialText,
                author: currentProject.testimonialAuthor,
                role: currentProject.testimonialRole
            }
        };

        // Clean up UI-only fields
        delete payload.tags;
        delete payload.testimonialText;
        delete payload.testimonialAuthor;
        delete payload.testimonialRole;
        delete payload._id;

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
            addToast('Operation failed', 'error');
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
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Project Title</label>
                            <input
                                type="text"
                                required
                                value={currentProject.title}
                                onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Slug (URL)</label>
                            <input
                                type="text"
                                placeholder="Auto-generated if empty"
                                value={currentProject.slug}
                                onChange={(e) => setCurrentProject({ ...currentProject, slug: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Client</label>
                            <input
                                type="text"
                                value={currentProject.client}
                                onChange={(e) => setCurrentProject({ ...currentProject, client: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Category</label>
                            <input
                                type="text"
                                value={currentProject.category}
                                onChange={(e) => setCurrentProject({ ...currentProject, category: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                            />
                        </div>
                    </div>

                    {/* Descriptions */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Short Summary</label>
                        <textarea
                            value={currentProject.description}
                            onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg h-20 resize-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Full Description</label>
                        <textarea
                            value={currentProject.fullDescription}
                            onChange={(e) => setCurrentProject({ ...currentProject, fullDescription: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg h-32 resize-none"
                        />
                    </div>

                    {/* Arrays */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Tech Stack (comma sep)</label>
                            <input
                                type="text"
                                value={currentProject.tags}
                                onChange={(e) => setCurrentProject({ ...currentProject, tags: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                                placeholder="React, Node.js..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Features (comma sep)</label>
                            <input
                                type="text"
                                value={currentProject.features}
                                onChange={(e) => setCurrentProject({ ...currentProject, features: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                                placeholder="Feat 1, Feat 2..."
                            />
                        </div>
                    </div>

                    {/* Images */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Thumbnail URL</label>
                        <input
                            type="text"
                            value={currentProject.thumbnail}
                            onChange={(e) => setCurrentProject({ ...currentProject, thumbnail: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Gallery Images (comma sep)</label>
                        <textarea
                            value={currentProject.images}
                            onChange={(e) => setCurrentProject({ ...currentProject, images: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg h-20 resize-none"
                            placeholder="url1, url2, url3..."
                        />
                    </div>

                    {/* Testimonial */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Client Testimonial</label>
                        <div className="grid grid-cols-2 gap-4 mb-2">
                            <input
                                type="text"
                                placeholder="Author Name"
                                value={currentProject.testimonialAuthor}
                                onChange={(e) => setCurrentProject({ ...currentProject, testimonialAuthor: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                            />
                            <input
                                type="text"
                                placeholder="Role"
                                value={currentProject.testimonialRole}
                                onChange={(e) => setCurrentProject({ ...currentProject, testimonialRole: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                            />
                        </div>
                        <textarea
                            placeholder="Quote..."
                            value={currentProject.testimonialText}
                            onChange={(e) => setCurrentProject({ ...currentProject, testimonialText: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg h-20 resize-none"
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
                            {isEditMode ? 'Save Changes' : 'Create Project'}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default AdminProjects;
