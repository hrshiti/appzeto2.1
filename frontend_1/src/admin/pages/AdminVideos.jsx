import React, { useState, useEffect } from 'react';
import AdminTable from '../components/AdminTable';
import Modal from '../components/ui/Modal';
import { useToast } from '../context/ToastContext';
import { Edit, Trash2, Video } from 'lucide-react';
import { dataService } from '../services/dataService';
import api from '../services/api';

const AdminVideos = () => {
    const { addToast } = useToast();

    const [videos, setVideos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const [currentVideo, setCurrentVideo] = useState({
        _id: '',
        title: '',
        url: '',
        visibility: 'Public',
        featured: false
    });
    const [isUploading, setIsUploading] = useState(false);

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
        setCurrentVideo({ _id: '', title: '', url: '', thumbnail: '', description: '', visibility: 'Public', featured: false });
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
                        <label className="block text-sm font-bold text-slate-700 mb-1">Video File (Upload Only)</label>
                        <div className="space-y-4 p-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                            {currentVideo.url ? (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between p-2 bg-emerald-50 border border-emerald-100 rounded-lg">
                                        <div className="flex items-center gap-2 overflow-hidden">
                                            <span className="material-symbols-outlined text-emerald-500 text-lg">check_circle</span>
                                            <span className="text-[11px] text-emerald-700 font-medium truncate max-w-[200px]">{currentVideo.url}</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setCurrentVideo({ ...currentVideo, url: '' })}
                                            className="p-1 hover:bg-emerald-100 rounded-md text-emerald-600 transition-colors"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-2">
                                    <input
                                        type="file"
                                        id="video-upload"
                                        className="hidden"
                                        accept="video/mp4,video/webm"
                                        onChange={async (e) => {
                                            const file = e.target.files[0];
                                            if (!file) return;
                                            const formData = new FormData();
                                            formData.append('video', file);
                                            try {
                                                setIsUploading(true);
                                                addToast('Uploading video...', 'info');
                                                const { data } = await api.post('/upload/video', formData, {
                                                    headers: { 'Content-Type': undefined }
                                                });
                                                setCurrentVideo(prev => ({ ...prev, url: data.url }));
                                                addToast('Video uploaded successfully', 'success');
                                            } catch (err) {
                                                addToast('Video upload failed', 'error');
                                            } finally {
                                                setIsUploading(false);
                                            }
                                        }}
                                    />
                                    <label
                                        htmlFor="video-upload"
                                        className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
                                    >
                                        <span className="material-symbols-outlined">upload_file</span>
                                        Choose Video File
                                    </label>
                                    <p className="mt-2 text-[10px] text-slate-400 font-medium uppercase tracking-wider">MP4 or WEBM files only</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Thumbnail (Image)</label>
                        <div className="flex items-center gap-4">
                            {currentVideo.thumbnail && (
                                <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-slate-200">
                                    <img
                                        src={currentVideo.thumbnail.startsWith('/uploads') ? `http://localhost:5000${currentVideo.thumbnail}` : currentVideo.thumbnail}
                                        className="w-full h-full object-cover"
                                        alt="Preview"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setCurrentVideo({ ...currentVideo, thumbnail: '' })}
                                        className="absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-bl-lg"
                                    >
                                        <Trash2 size={12} />
                                    </button>
                                </div>
                            )}
                            <input
                                type="file"
                                onChange={async (e) => {
                                    const file = e.target.files[0];
                                    if (!file) return;
                                    const formData = new FormData();
                                    formData.append('image', file);
                                    try {
                                        setIsUploading(true);
                                        const { data } = await api.post('/upload', formData, {
                                            headers: { 'Content-Type': undefined }
                                        });
                                        setCurrentVideo(prev => ({ ...prev, thumbnail: data.url }));
                                        addToast('Thumbnail uploaded', 'success');
                                    } catch (err) {
                                        addToast('Upload failed', 'error');
                                    } finally {
                                        setIsUploading(false);
                                    }
                                }}
                                className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                            />
                        </div>
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

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="featured"
                            checked={currentVideo.featured}
                            onChange={(e) => setCurrentVideo({ ...currentVideo, featured: e.target.checked })}
                            className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
                        />
                        <label htmlFor="featured" className="text-sm font-bold text-slate-700">Set as Featured (Hero Demo)</label>
                    </div>

                    <div className="pt-4 flex justify-end gap-2 border-t border-slate-100 mt-6">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-500 font-bold hover:bg-slate-50 rounded-lg">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isUploading || !currentVideo.url || !currentVideo.title}
                            className={`px-4 py-2 font-bold rounded-lg transition-all shadow-lg ${isUploading || !currentVideo.url || !currentVideo.title
                                ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                                : 'bg-primary text-white hover:bg-[#048a8d] shadow-primary/20'
                                }`}
                        >
                            {isUploading ? 'Uploading...' : (isEditMode ? 'Save Changes' : 'Add Video')}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default AdminVideos;
