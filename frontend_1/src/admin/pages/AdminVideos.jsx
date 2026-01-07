import React, { useState, useEffect } from 'react';
import AdminTable from '../components/AdminTable';
import Modal from '../components/ui/Modal';
import { useToast } from '../context/ToastContext';
import { Edit, Trash2, Video } from 'lucide-react';
import { dataService } from '../services/dataService';

const AdminVideos = () => {
    const { addToast } = useToast();

    const [videos, setVideos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const [currentVideo, setCurrentVideo] = useState({
        _id: '',
        title: '',
        url: '',
        thumbnail: '',
        description: '',
        visibility: 'Public'
    });

    useEffect(() => {
        loadVideos();
    }, []);

    const loadVideos = async () => {
        try {
            const data = await dataService.getVideos();
            setVideos(data || []);
        } catch (err) {
            console.error("Failed to load videos", err);
            addToast("Failed to load videos", "error");
        }
    };

    const openAddModal = () => {
        setIsEditMode(false);
        setCurrentVideo({ _id: '', title: '', url: '', thumbnail: '', description: '', visibility: 'Public' });
        setIsModalOpen(true);
    };

    const openEditModal = (video) => {
        setIsEditMode(true);
        setCurrentVideo({ ...video, _id: video._id });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this video?')) {
            try {
                await dataService.deleteVideo(id);
                setVideos(prev => prev.filter(v => v._id !== id));
                addToast('Video deleted', 'success');
            } catch (err) {
                addToast('Failed to delete video', 'error');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = { ...currentVideo };
        delete payload._id;

        try {
            if (isEditMode) {
                await dataService.updateVideo(currentVideo._id, payload);
                addToast('Video updated', 'success');
            } else {
                await dataService.createVideo(payload);
                addToast('Video added', 'success');
            }
            loadVideos();
            setIsModalOpen(false);
        } catch (err) {
            console.error(err);
            addToast('Operation failed', 'error');
        }
    };

    const columns = [
        { header: 'Video Title', accessor: 'title' },
        {
            header: 'Visibility', accessor: 'visibility', render: (row) => (
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${row.visibility === 'Public' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                    {row.visibility}
                </span>
            )
        },
        { header: 'URL', accessor: 'url', render: (row) => <a href={row.url} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline text-xs truncate max-w-[150px] block">{row.url}</a> }
    ];

    const renderActions = (row) => (
        <div className="flex items-center justify-end gap-2">
            <button onClick={() => openEditModal(row)} className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors">
                <Edit size={16} />
            </button>
            <button onClick={() => handleDelete(row._id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 size={16} />
            </button>
        </div>
    );

    return (
        <>
            <AdminTable
                title="Watch Demo Management"
                subtitle="Manage video content and demos."
                columns={columns}
                data={videos}
                onAdd={openAddModal}
                customActions={renderActions}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={isEditMode ? 'Edit Video' : 'Add New Video'}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Video Title</label>
                        <input
                            type="text"
                            required
                            value={currentVideo.title}
                            onChange={(e) => setCurrentVideo({ ...currentVideo, title: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Video URL / Embed</label>
                        <input
                            type="text"
                            required
                            value={currentVideo.url}
                            onChange={(e) => setCurrentVideo({ ...currentVideo, url: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                            placeholder="https://www.youtube.com/embed/..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Thumbnail URL</label>
                        <input
                            type="text"
                            value={currentVideo.thumbnail}
                            onChange={(e) => setCurrentVideo({ ...currentVideo, thumbnail: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Description</label>
                        <textarea
                            value={currentVideo.description}
                            onChange={(e) => setCurrentVideo({ ...currentVideo, description: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary h-20 resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Visibility</label>
                        <select
                            value={currentVideo.visibility}
                            onChange={(e) => setCurrentVideo({ ...currentVideo, visibility: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                        >
                            <option value="Public">Public</option>
                            <option value="Private">Private</option>
                        </select>
                    </div>

                    <div className="pt-4 flex justify-end gap-2 border-t border-slate-100 mt-6">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-500 font-bold hover:bg-slate-50 rounded-lg">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-primary text-white font-bold rounded-lg hover:bg-[#048a8d] shadow-lg shadow-primary/20">
                            {isEditMode ? 'Save Changes' : 'Add Video'}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default AdminVideos;
