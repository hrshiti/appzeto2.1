import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Eye, Filter, Loader2, Image as ImageIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { dataService } from '../services/dataService';
import { useToast } from '../context/ToastContext';
import ConfirmationModal from '../components/ui/ConfirmationModal';

const AdminProjects = () => {
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);

    // Fetch Projects
    const fetchProjects = async () => {
        try {
            setIsLoading(true);
            const data = await dataService.getProjects(); // Use public API for now (returns array)
            // Backend returns { success: true, count: N, data: [] } - dataService.getProjects returns response.data.data
            // If dataService handles .data.data then `data` is the array.
            setProjects(data || []);
        } catch (error) {
            console.error('Fetch Projects Error:', error);
            addToast('Failed to load projects', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDeleteClick = (project) => {
        setProjectToDelete(project);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!projectToDelete) return;
        try {
            await dataService.deleteProject(projectToDelete._id || projectToDelete.id);
            addToast('Project deleted successfully', 'success');
            fetchProjects();
        } catch (error) {
            addToast('Failed to delete project', 'error');
        } finally {
            setIsDeleteModalOpen(false);
            setProjectToDelete(null);
        }
    };

    // Filtering
    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-lg font-bold text-[#012829]">Projects</h1>
                </div>
                <Link to="/admin/projects/add">
                    <button className="flex items-center gap-2 bg-[#05A4A7] text-white px-5 py-2.5 rounded-xl font-bold font-sans hover:bg-[#048a8d] transition-colors shadow-lg shadow-[#05A4A7]/20 active:scale-95">
                        <Plus size={20} />
                        Add New Project
                    </button>
                </Link>
            </div>

            {/* Controls */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#05A4A7]/20 focus:border-[#05A4A7] transition-all"
                    />
                </div>
                <button title="Filter" className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors">
                    <Filter size={20} />
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                {isLoading ? (
                    <div className="h-64 flex items-center justify-center text-slate-400">
                        <Loader2 size={32} className="animate-spin" />
                    </div>
                ) : filteredProjects.length === 0 ? (
                    <div className="h-64 flex flex-col items-center justify-center text-slate-400">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                            <Briefcase size={32} className="opacity-50" />
                        </div>
                        <p>No projects found</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#012829] text-[10px] uppercase text-slate-200 font-bold tracking-widest">
                                    <th className="px-6 py-3">Thumbnail</th>
                                    <th className="px-6 py-3">Project Info</th>
                                    <th className="px-6 py-3">Category</th>
                                    <th className="px-6 py-3 text-center">Featured</th>
                                    <th className="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {filteredProjects.map((project) => (
                                    <tr key={project._id || project.id} className="hover:bg-slate-50/80 transition-colors group">
                                        <td className="px-6 py-4 w-24">
                                            <div className="w-16 h-10 rounded-lg bg-slate-200 overflow-hidden relative border border-slate-100">
                                                {project.thumbnail ? (
                                                    <img src={project.thumbnail} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full text-slate-400"><ImageIcon size={16} /></div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <h3 className="font-bold text-slate-800">{project.title}</h3>
                                            <span className="text-xs text-slate-500 font-mono">{project.slug}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-600 font-bold text-xs uppercase tracking-wide">
                                                {project.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {project.isFeatured ? (
                                                <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
                                            ) : (
                                                <span className="inline-block w-2.5 h-2.5 rounded-full bg-slate-300" />
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => window.open(`/projects/${project.slug}`, '_blank')}
                                                    className="p-2 text-slate-400 hover:text-[#05A4A7] hover:bg-[#05A4A7]/10 rounded-lg transition-colors"
                                                    title="View Live"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                <Link to={`/admin/projects/edit/${project._id || project.id}`}>
                                                    <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                                                        <Edit size={18} />
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteClick(project)}
                                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Delete Modal */}
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Project?"
                message={`Are you sure you want to delete "${projectToDelete?.title}"? This action cannot be undone.`}
                confirmText="Delete Project"
                isDangerous={true}
            />
        </div>
    );
};

// Simple Icon Import Placeholder for missing Briefcase if needed
const Briefcase = ({ size, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
);

export default AdminProjects;
