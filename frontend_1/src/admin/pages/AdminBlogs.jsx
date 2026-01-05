import React, { useState } from 'react';
import AdminTable from '../components/AdminTable';
import Modal from '../components/ui/Modal';
import { useToast } from '../context/ToastContext';
import { Edit, Trash2 } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/editor.css';

const AdminBlogs = () => {
    const { addToast } = useToast();

    // -- State --
    const [blogs, setBlogs] = useState([
        { id: 101, title: 'The Future of AI', author: 'John Doe', status: 'Published', date: '2025-01-10', views: 1200, content: '<p>AI is changing the world...</p>' },
        { id: 102, title: 'Web Development Trends', author: 'Jane Smith', status: 'Draft', date: '2025-01-12', views: 0, content: '<h1>React 19 is coming</h1>' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentBlog, setCurrentBlog] = useState({ id: '', title: '', author: '', status: 'Draft', content: '' });

    // -- Handlers --
    const openAddModal = () => {
        setIsEditMode(false);
        setCurrentBlog({ id: '', title: '', author: '', status: 'Draft', content: '' });
        setIsModalOpen(true);
    };

    const openEditModal = (blog) => {
        setIsEditMode(true);
        setCurrentBlog({ ...blog });
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            setBlogs(prev => prev.filter(b => b.id !== id));
            addToast('Blog post deleted successfully', 'success');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Note: Quill handles its own state, but wrapped form submission needs this.

        if (isEditMode) {
            setBlogs(prev => prev.map(b => b.id === currentBlog.id ? { ...currentBlog, date: new Date().toISOString().split('T')[0] } : b));
            addToast('Blog post updated', 'success');
        } else {
            const newBlog = {
                ...currentBlog,
                id: Date.now(),
                date: new Date().toISOString().split('T')[0],
                views: 0
            };
            setBlogs(prev => [newBlog, ...prev]);
            addToast('Blog post created', 'success');
        }
        setIsModalOpen(false);
    };

    // Quill Toolbar Modules
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    // -- Render --
    const columns = [
        { header: 'Title', accessor: 'title' },
        { header: 'Author', accessor: 'author' },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => (
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${row.status === 'Published' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'
                    }`}>
                    {row.status}
                </span>
            )
        },
        { header: 'Date', accessor: 'date' },
        { header: 'Views', accessor: 'views' },
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

                    {/* Rich Text Editor */}
                    <div className="pb-12"> {/* Extra padding for toolbar */}
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
