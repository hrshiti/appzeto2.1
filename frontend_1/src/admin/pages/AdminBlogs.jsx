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
import { getMediaUrl } from '../../utils/getMediaUrl';

const AdminBlogs = () => {
    const { addToast } = useToast();

    // -- State --
    const [blogs, setBlogs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const [currentBlog, setCurrentBlog] = useState({
        _id: '',
        title: '',
        tag: 'GENERAL',
        publishDate: new Date().toISOString().split('T')[0],
        excerpt: '',
        content: '',
        featuredImage: '',
        status: 'Draft',
        author: 'Admin',
        stats: [
            { label: '', subtext: '' },
            { label: '', subtext: '' },
            { label: '', subtext: '' }
        ]
    });
    const [uploading, setUploading] = useState(false);

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
            tag: 'GENERAL',
            publishDate: new Date().toISOString().split('T')[0],
            excerpt: '',
            content: '',
            featuredImage: '',
            status: 'Draft',
            author: 'Admin',
            stats: [
                { label: '', subtext: '' },
                { label: '', subtext: '' },
                { label: '', subtext: '' }
            ]
        });
        setIsModalOpen(true);
    };

    const openEditModal = (blog) => {
        setIsEditMode(true);
        setCurrentBlog({
            ...blog,
            _id: blog._id,
            status: blog.active ? 'Published' : 'Draft',
            publishDate: blog.publishDate ? new Date(blog.publishDate).toISOString().split('T')[0] : '',
            stats: blog.stats && blog.stats.length > 0 ? blog.stats : [
                { label: '', subtext: '' },
                { label: '', subtext: '' },
                { label: '', subtext: '' }
            ]
        });
        setIsModalOpen(true);
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            // const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const config = { headers: { 'Content-Type': undefined } };
            const { data } = await api.post('/upload', formData, config);
            setCurrentBlog({ ...currentBlog, featuredImage: data.url });
            setUploading(false);
            addToast('Image uploaded', 'success');
        } catch (error) {
            setUploading(false);
            addToast('Upload failed', 'error');
        }
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
            active: currentBlog.status === 'Published',
            stats: currentBlog.stats.filter(s => s.label.trim() !== '')
        };

        delete payload._id;
        delete payload.status;

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
                <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto px-1 custom-scrollbar">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 sm:col-span-1">
                            <label className="block text-sm font-bold text-slate-700 mb-1">Heading (Main Title)</label>
                            <input
                                type="text"
                                required
                                value={currentBlog.title}
                                onChange={(e) => setCurrentBlog({ ...currentBlog, title: e.target.value })}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#05A4A7]"
                                placeholder="THE BONFIRE NIGHT"
                            />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label className="block text-sm font-bold text-slate-700 mb-1">Badge Tag</label>
                            <input
                                type="text"
                                required
                                value={currentBlog.tag}
                                onChange={(e) => setCurrentBlog({ ...currentBlog, tag: e.target.value })}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#05A4A7]"
                                placeholder="WINTER VIBES"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Publish Date</label>
                            <input
                                type="date"
                                value={currentBlog.publishDate}
                                onChange={(e) => setCurrentBlog({ ...currentBlog, publishDate: e.target.value })}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#05A4A7]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Status</label>
                            <select
                                value={currentBlog.status}
                                onChange={(e) => setCurrentBlog({ ...currentBlog, status: e.target.value })}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#05A4A7] bg-white"
                            >
                                <option value="Draft">Draft</option>
                                <option value="Published">Published</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Excerpt (Intro Quote)</label>
                        <textarea
                            value={currentBlog.excerpt}
                            onChange={(e) => setCurrentBlog({ ...currentBlog, excerpt: e.target.value })}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#05A4A7] h-24 resize-none italic"
                            placeholder="Warmed by a bright bonfire..."
                        />
                    </div>

                    {/* Image Section */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Featured Image</label>
                        <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                            {currentBlog.featuredImage && (
                                <img
                                    src={getMediaUrl(currentBlog.featuredImage)}
                                    className="w-20 h-20 object-cover rounded-lg shadow-sm"
                                    alt="Preview"
                                />
                            )}
                            <div className="flex-1">
                                <input type="file" onChange={uploadFileHandler} className="text-xs mb-2 block" />
                                <input
                                    type="text"
                                    value={currentBlog.featuredImage}
                                    onChange={(e) => setCurrentBlog({ ...currentBlog, featuredImage: e.target.value })}
                                    className="w-full px-2 py-1 border border-slate-200 rounded text-[10px]"
                                    placeholder="Or paste URL"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                        <label className="block text-xs font-bold uppercase text-slate-400">Premium Stats / Highlights (Max 3)</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {currentBlog.stats.map((stat, index) => (
                                <div key={index} className="space-y-2">
                                    <input
                                        type="text"
                                        placeholder="Label (e.g. 50+)"
                                        value={stat.label}
                                        onChange={(e) => {
                                            const newStats = [...currentBlog.stats];
                                            newStats[index].label = e.target.value;
                                            setCurrentBlog({ ...currentBlog, stats: newStats });
                                        }}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold text-[#05A4A7]"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Subtext (e.g. STORIES)"
                                        value={stat.subtext}
                                        onChange={(e) => {
                                            const newStats = [...currentBlog.stats];
                                            newStats[index].subtext = e.target.value;
                                            setCurrentBlog({ ...currentBlog, stats: newStats });
                                        }}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[10px]"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Rich Text Editor */}
                    <div className="pb-12">
                        <label className="block text-sm font-bold text-slate-700 mb-1">Full Blog Content</label>
                        <ReactQuill
                            theme="snow"
                            value={currentBlog.content}
                            onChange={(content) => setCurrentBlog({ ...currentBlog, content })}
                            modules={modules}
                            className="bg-white rounded-lg h-60"
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
