import React, { useState, useEffect } from 'react';
import AdminTable from '../components/AdminTable';
import Modal from '../components/ui/Modal';
import { useToast } from '../context/ToastContext';
import { Edit, Trash2 } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/editor.css';
import { dataService } from '../services/dataService';

const AdminBlogs = () => {
    const { addToast } = useToast();

    // -- State --
    const [blogs, setBlogs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const [currentBlog, setCurrentBlog] = useState({
        _id: '',
        title: '',
        author: '',
        status: 'Draft',
        content: '',
        thumbnail: '',
        seoTitle: '',
        seoDesc: '',
        views: 0,
        date: ''
    });

    useEffect(() => {
        loadBlogs();
    }, []);

    const loadBlogs = async () => {
        try {
            const data = await dataService.getBlogs();
            setBlogs(data || []);
        } catch (err) {
            console.error(err);
            addToast("Failed to load blogs", "error");
        }
    };

    const openAddModal = () => {
        setIsEditMode(false);
        setCurrentBlog({
            _id: '',
            title: '',
            author: '',
            status: 'Draft',
            content: '',
            thumbnail: '',
            seoTitle: '',
            seoDesc: '',
            views: 0,
            date: ''
        });
        setIsModalOpen(true);
    };

    const openEditModal = (blog) => {
        setIsEditMode(true);
        setCurrentBlog({
            ...blog,
            _id: blog._id,
            status: blog.active ? 'Published' : 'Draft'
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await dataService.deleteBlog(id);
                setBlogs(prev => prev.filter(b => b._id !== id));
                addToast('Blog post deleted successfully', 'success');
            } catch (err) {
                addToast('Failed to delete blog', 'error');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...currentBlog,
            active: currentBlog.status === 'Published'
        };

        delete payload._id;
        delete payload.status;
        delete payload.views;
        delete payload.date;

        try {
            if (isEditMode) {
                await dataService.updateBlog(currentBlog._id, payload);
                addToast('Blog post updated', 'success');
            } else {
                await dataService.createBlog(payload);
                addToast('Blog post created', 'success');
            }
            loadBlogs();
            setIsModalOpen(false);
        } catch (err) {
            console.error(err);
            addToast('Operation failed', 'error');
        }
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const columns = [
        { header: 'Title', accessor: 'title' },
        { header: 'Author', accessor: 'author' },
        {
            header: 'Status',
            accessor: 'active', // Derived
            render: (row) => (
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${row.active ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'
                    }`}>
                    {row.active ? 'Published' : 'Draft'}
                </span>
            )
        },
        { header: 'Views', accessor: 'views' },
        {
            header: 'Date',
            accessor: 'createdAt',
            render: (row) => row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '-'
        }
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
                title="Blog Management"
                subtitle="Create, edit, and publish blog content."
                columns={columns}
                data={blogs}
                onAdd={openAddModal}
                customActions={renderActions}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={isEditMode ? 'Edit Blog Post' : 'New Blog Post'}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Title</label>
                        <input
                            type="text"
                            required
                            value={currentBlog.title}
                            onChange={(e) => setCurrentBlog({ ...currentBlog, title: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Author</label>
                            <input
                                type="text"
                                required
                                value={currentBlog.author}
                                onChange={(e) => setCurrentBlog({ ...currentBlog, author: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Status</label>
                            <select
                                value={currentBlog.status}
                                onChange={(e) => setCurrentBlog({ ...currentBlog, status: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                            >
                                <option value="Draft">Draft</option>
                                <option value="Published">Published</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Thumbnail URL</label>
                        <input
                            type="text"
                            value={currentBlog.thumbnail}
                            onChange={(e) => setCurrentBlog({ ...currentBlog, thumbnail: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                            placeholder="https://..."
                        />
                    </div>

                    {/* SEO Section */}
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <label className="block text-xs font-bold uppercase text-slate-400 mb-3">SEO Settings (Optional)</label>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1">SEO Title</label>
                                <input
                                    type="text"
                                    value={currentBlog.seoTitle}
                                    onChange={(e) => setCurrentBlog({ ...currentBlog, seoTitle: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                    placeholder="Meta Title"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1">Meta Description</label>
                                <textarea
                                    value={currentBlog.seoDesc}
                                    onChange={(e) => setCurrentBlog({ ...currentBlog, seoDesc: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm h-16 resize-none"
                                    placeholder="Brief summary for search engines..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Rich Text Editor */}
                    <div className="pb-12">
                        <label className="block text-sm font-bold text-slate-700 mb-1">Content</label>
                        <ReactQuill
                            theme="snow"
                            value={currentBlog.content}
                            onChange={(content) => setCurrentBlog({ ...currentBlog, content })}
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
                            {isEditMode ? 'Update Post' : 'Publish Post'}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default AdminBlogs;
