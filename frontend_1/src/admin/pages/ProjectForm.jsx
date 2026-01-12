import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, Image as ImageIcon, Plus, Trash2, Code, Video, Link as LinkIcon, Info } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { dataService } from '../services/dataService';
import { useToast } from '../context/ToastContext';

// --- Reusable Components for Form ---

const Section = ({ title, children, isOpen = true }) => (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">{title}</h3>
        </div>
        <div className="p-6">{children}</div>
    </div>
);

const InputGroup = ({ label, children, required, helpText }) => (
    <div className="mb-4">
        <label className="block text-sm font-bold text-slate-700 mb-2">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        {children}
        {helpText && <p className="text-xs text-slate-400 mt-1">{helpText}</p>}
    </div>
);

const FileUpload = ({ label, onUpload, currentUrl, type = "image" }) => {
    const [uploading, setUploading] = useState(false);

    const handleFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append(type === "video" ? "video" : "image", file); // key must match backend route

        try {
            const res = type === "video" ? await dataService.uploadVideo(formData) : await dataService.uploadImage(formData);
            if (res && res.url) {
                onUpload(res.url);
            }
        } catch (error) {
            console.error("Upload failed", error);
            alert("Upload failed trying to upload " + type);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 hover:bg-slate-50 transition-colors text-center relative group">
            <input
                type="file"
                accept={type === 'video' ? "video/*" : "image/*"} // Accepts correct types
                onChange={handleFile}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                disabled={uploading}
            />

            {uploading ? (
                <div className="flex flex-col items-center justify-center h-40 gap-2">
                    <div className="w-6 h-6 border-2 border-[#05A4A7] border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm text-[#05A4A7] font-medium">Uploading...</span>
                </div>
            ) : currentUrl ? (
                <div className="relative h-40 w-full rounded-lg overflow-hidden bg-slate-100">
                    {type === "video" ? (
                        <video src={currentUrl} className="w-full h-full object-cover" controls muted />
                    ) : (
                        <img src={currentUrl} alt="Preview" className="w-full h-full object-cover" />
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white font-medium text-sm flex items-center gap-2">
                            <ImageIcon size={16} /> Change {type}
                        </span>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-40 gap-2 text-slate-400">
                    {type === "video" ? <Video size={32} /> : <ImageIcon size={32} />}
                    <span className="text-sm font-medium">Click to upload {type}</span>
                </div>
            )}
        </div>
    );
};

// --- Main Form Component ---

const initialFormState = {
    title: '',
    slug: '',
    category: '',
    industry: '',
    // Listing Data
    thumbnail: '',
    shortDescription: '',
    techTags: [], // strings
    isFeatured: false,
    orderIndex: 0,
    // Hero
    hero: {
        title: '',
        subtitle: '',
        coverImage: '',
        videoUrl: ''
    },
    // Info
    info: {
        client: '',
        year: new Date().getFullYear().toString(),
        duration: '',
        technologies: [] // { name, icon }
    },
    // Overview
    overview: {
        text: '',
        mediaUrl: '',
        mediaType: 'image'
    },
    // Challenge & Solution
    challenge: { description: '', points: [] },
    solution: { description: '', points: [] },
    // Custom Media Showcase Section
    mediaShowcase: {
        mediaUrl: '',
        mediaType: 'image',
        items: [] // { label, icon }
    },
    // Showcase (Old logic, keeping for data compatibility)
    showcase: { images: [], videos: [] },
    // Features
    features: [], // { label, icon }
    // Results
    results: [], // { label, value }
    // Testimonial
    testimonial: { text: '', author: '', role: '', avatar: '' },
    // CTA
    cta: { title: 'Want a project like this?', buttonLabel: 'Start a Project', buttonLink: '/contact' }
};

const ProjectForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToast } = useToast();
    const isEditMode = !!id;

    const [formData, setFormData] = useState(initialFormState);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Load Data if Edit Mode
    useEffect(() => {
        if (isEditMode) {
            const fetchProject = async () => {
                try {
                    setIsLoading(true);
                    const data = await dataService.getProject(id);
                    if (data) {
                        // Ensure optional fields exist to avoid null errors
                        const safeData = {
                            ...initialFormState, // Defaults
                            ...data, // Overwrite with server data
                            mediaShowcase: {
                                ...initialFormState.mediaShowcase,
                                ...(data.mediaShowcase || {})
                            }
                        };
                        setFormData(safeData);
                    }
                } catch (error) {
                    addToast('Failed to load project data', 'error');
                    navigate('/admin/projects');
                } finally {
                    setIsLoading(false);
                }
            };
            fetchProject();
        }
    }, [id, isEditMode, navigate, addToast]);

    // Handle generic field changes
    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNestedChange = (parent, field, value) => {
        setFormData(prev => ({
            ...prev,
            [parent]: { ...prev[parent], [field]: value }
        }));
    };

    // Arrays (Strings) Helper - for techTags, challenge.points, solution.points
    const handleArrayChange = (fieldPath, index, value) => {
        // fieldPath e.g. "techTags" or "challenge.points"
        const keys = fieldPath.split('.');
        setFormData(prev => {
            const newState = { ...prev };
            let target = newState;
            // Navigate to parent
            for (let i = 0; i < keys.length - 1; i++) {
                target = target[keys[i]];
            }
            const lastKey = keys[keys.length - 1];
            const newArray = [...target[lastKey]];
            newArray[index] = value;
            target[lastKey] = newArray;
            return newState;
        });
    };

    const addArrayItem = (fieldPath) => {
        const keys = fieldPath.split('.');
        setFormData(prev => {
            const newState = { ...prev };
            let target = newState;
            for (let i = 0; i < keys.length - 1; i++) {
                target = target[keys[i]];
            }
            const lastKey = keys[keys.length - 1];
            target[lastKey] = [...(target[lastKey] || []), ""];
            return newState;
        });
    };

    const removeArrayItem = (fieldPath, index) => {
        const keys = fieldPath.split('.');
        setFormData(prev => {
            const newState = { ...prev };
            let target = newState;
            for (let i = 0; i < keys.length - 1; i++) {
                target = target[keys[i]];
            }
            const lastKey = keys[keys.length - 1];
            target[lastKey] = target[lastKey].filter((_, i) => i !== index);
            return newState;
        });
    };

    // Deep Object Arrays Helper (Stats, Technologies, Features)
    const handleObjArrayChange = (parentField, index, key, value) => {
        setFormData(prev => {
            const newArr = [...prev[parentField]];
            newArr[index] = { ...newArr[index], [key]: value };
            return { ...prev, [parentField]: newArr };
        });
    };

    const addObjArrayItem = (parentField, template) => {
        setFormData(prev => ({
            ...prev,
            [parentField]: [...(prev[parentField] || []), template]
        }));
    };

    const removeObjArrayItem = (parentField, index) => {
        setFormData(prev => ({
            ...prev,
            [parentField]: prev[parentField].filter((_, i) => i !== index)
        }));
    };

    // --- Helpers for Media Showcase Items ---
    const handleShowcaseItemChange = (index, key, value) => {
        setFormData(prev => {
            const newItems = [...prev.mediaShowcase.items];
            newItems[index] = { ...newItems[index], [key]: value };
            return {
                ...prev,
                mediaShowcase: {
                    ...prev.mediaShowcase,
                    items: newItems
                }
            };
        });
    };

    const addShowcaseItem = () => {
        setFormData(prev => ({
            ...prev,
            mediaShowcase: {
                ...prev.mediaShowcase,
                items: [...(prev.mediaShowcase.items || []), { label: '', icon: 'CheckCircle' }]
            }
        }));
    };

    const removeShowcaseItem = (index) => {
        setFormData(prev => ({
            ...prev,
            mediaShowcase: {
                ...prev.mediaShowcase,
                items: prev.mediaShowcase.items.filter((_, i) => i !== index)
            }
        }));
    };


    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clean up data before sending: remove empty items
        const cleanedData = {
            ...formData,
            results: formData.results.filter(item => item.label && item.label.trim() !== ''),
            features: formData.features.filter(item => item.label && item.label.trim() !== ''),
            techTags: formData.techTags.filter(tag => tag.trim() !== ''),
            // Clean challenge/solution points
            challenge: {
                ...formData.challenge,
                points: formData.challenge.points.filter(p => p.trim() !== '')
            },
            solution: {
                ...formData.solution,
                points: formData.solution.points.filter(p => p.trim() !== '')
            },
            mediaShowcase: {
                ...formData.mediaShowcase,
                items: formData.mediaShowcase.items.filter(i => i.label && i.label.trim() !== '')
            },
            // Ensure testimonial strings are not null
            testimonial: {
                text: formData.testimonial?.text || '',
                author: formData.testimonial?.author || '',
                role: formData.testimonial?.role || '',
                avatar: formData.testimonial?.avatar || ''
            }
        };

        try {
            setIsSaving(true);
            if (isEditMode) {
                await dataService.updateProject(id, cleanedData);
                addToast('Project updated successfully', 'success');
            } else {
                await dataService.createProject(cleanedData);
                addToast('Project created successfully', 'success');
            }
            navigate('/admin/projects');
        } catch (error) {
            console.error('Save Project Error:', error);
            addToast(error.response?.data?.message || 'Failed to save project', 'error');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div className="p-10 flex justify-center"><div className="animate-spin w-8 h-8 border-2 border-slate-900 border-t-transparent rounded-full" /></div>;

    return (
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto pb-20">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button type="button" onClick={() => navigate('/admin/projects')} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
                        <ArrowLeft size={20} className="text-slate-600" />
                    </button>
                    <div>
                        <h1 className="text-lg font-bold text-[#012829]">{isEditMode ? 'Edit Project' : 'Create New Project'}</h1>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button type="button" onClick={() => navigate('/admin/projects')} className="px-5 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="px-6 py-2.5 bg-[#012829] text-white rounded-xl font-bold hover:bg-[#023131] transition-colors shadow-lg shadow-slate-900/10 flex items-center gap-2 disabled:opacity-70"
                    >
                        {isSaving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={18} />}
                        {isEditMode ? 'Update Project' : 'Publish Project'}
                    </button>
                </div>
            </div>

            {/* A. BASIC INFO */}
            <Section title="Basic Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup label="Project Title" required>
                        <input type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#05A4A7]/20"
                            value={formData.title} onChange={e => handleChange('title', e.target.value)} required />
                    </InputGroup>
                    <InputGroup label="Category" required helpText="e.g. Fintech, Healthcare, E-commerce">
                        <input type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#05A4A7]/20"
                            value={formData.category} onChange={e => handleChange('category', e.target.value)} required />
                    </InputGroup>
                    <InputGroup label="Industry">
                        <input type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#05A4A7]/20"
                            value={formData.industry} onChange={e => handleChange('industry', e.target.value)} />
                    </InputGroup>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-3 cursor-pointer p-4 border border-slate-200 rounded-lg w-full hover:bg-slate-50">
                            <input type="checkbox" className="w-5 h-5 accent-[#05A4A7]"
                                checked={formData.isFeatured} onChange={e => handleChange('isFeatured', e.target.checked)} />
                            <span className="font-bold text-slate-700">Mark as Featured</span>
                        </label>
                    </div>
                </div>
            </Section>

            {/* B. LISTING PAGE DATA */}
            <Section title="Listing Page Appearance">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <InputGroup label="Card Thumbnail" required>
                            <FileUpload
                                currentUrl={formData.thumbnail}
                                onUpload={(url) => handleChange('thumbnail', url)}
                            />
                        </InputGroup>
                    </div>
                    <div className="md:col-span-2 space-y-4">
                        <InputGroup label="Short Description" required helpText="Max 150 chars, shown on card.">
                            <textarea className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#05A4A7]/20 h-24 resize-none"
                                value={formData.shortDescription} onChange={e => handleChange('shortDescription', e.target.value)} maxLength={150} required />
                        </InputGroup>
                        <InputGroup label="Tech Tags (Comma separated)">
                            <input type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#05A4A7]/20"
                                placeholder="React, Node.js, AWS..."
                                value={formData.techTags.join(', ')}
                                onChange={e => handleChange('techTags', e.target.value.split(',').map(s => s.trim()))}
                            />
                        </InputGroup>
                    </div>
                </div>
            </Section>

            {/* C. HERO SECTION */}
            <Section title="Detail Page: Hero Section">
                <div className="grid md:grid-cols-2 gap-6">
                    <InputGroup label="Hero Title" helpText="If different from project title">
                        <input type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                            value={formData.hero.title} onChange={e => handleNestedChange('hero', 'title', e.target.value)} />
                    </InputGroup>
                    <InputGroup label="Hero Subtitle">
                        <input type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                            value={formData.hero.subtitle} onChange={e => handleNestedChange('hero', 'subtitle', e.target.value)} />
                    </InputGroup>
                </div>
                <div className="mt-4 grid md:grid-cols-2 gap-6">
                    <InputGroup label="Hero Cover Image">
                        <FileUpload currentUrl={formData.hero.coverImage} onUpload={url => handleNestedChange('hero', 'coverImage', url)} />
                    </InputGroup>
                    <InputGroup label="Hero Video (Optional)">
                        <FileUpload currentUrl={formData.hero.videoUrl} type="video" onUpload={url => handleNestedChange('hero', 'videoUrl', url)} />
                    </InputGroup>
                </div>
            </Section>

            {/* D. PROJECT INFO */}
            <Section title="Project Metadata">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <InputGroup label="Client Name">
                        <input type="text" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                            value={formData.info.client} onChange={e => handleNestedChange('info', 'client', e.target.value)} />
                    </InputGroup>
                    <InputGroup label="Year">
                        <input type="text" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                            value={formData.info.year} onChange={e => handleNestedChange('info', 'year', e.target.value)} />
                    </InputGroup>
                    <InputGroup label="Duration">
                        <input type="text" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                            value={formData.info.duration} onChange={e => handleNestedChange('info', 'duration', e.target.value)} />
                    </InputGroup>
                </div>
                {/* Tech Stack - Nested Array */}
                <div className="mt-4">
                    <label className="text-sm font-bold text-slate-700 block mb-2">Technologies Used</label>
                    <div className="space-y-2">
                        {formData.info.technologies.map((tech, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <input type="text" placeholder="Tech Name (e.g. React)" className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                                    value={tech.name} onChange={e => {
                                        const newTechs = [...formData.info.technologies];
                                        newTechs[i].name = e.target.value;
                                        handleNestedChange('info', 'technologies', newTechs);
                                    }}
                                />
                                <input type="text" placeholder="Icon Name (Lucide)" className="w-40 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                                    value={tech.icon} onChange={e => {
                                        const newTechs = [...formData.info.technologies];
                                        newTechs[i].icon = e.target.value;
                                        handleNestedChange('info', 'technologies', newTechs);
                                    }}
                                />
                                <button type="button" onClick={() => {
                                    const newTechs = formData.info.technologies.filter((_, idx) => idx !== i);
                                    handleNestedChange('info', 'technologies', newTechs);
                                }} className="p-2 text-red-400 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                            </div>
                        ))}
                        <button type="button" onClick={() => {
                            handleNestedChange('info', 'technologies', [...formData.info.technologies, { name: '', icon: 'Code' }]);
                        }} className="text-sm text-[#05A4A7] font-bold mt-2 flex items-center gap-1">+ Add Technology</button>
                    </div>
                </div>
            </Section>

            {/* E. OVERVIEW */}
            <Section title="Overview Section">
                <InputGroup label="Overview Text" required>
                    <textarea className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg h-32"
                        value={formData.overview.text} onChange={e => handleNestedChange('overview', 'text', e.target.value)} />
                </InputGroup>

                {/* ADDED: Media Type Selection */}
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                    <div>
                        <InputGroup label="Overview Media Type">
                            <div className="flex gap-4 mb-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="mediaType"
                                        value="image"
                                        checked={formData.overview.mediaType !== 'video'}
                                        onChange={() => handleNestedChange('overview', 'mediaType', 'image')}
                                        className="accent-[#05A4A7]"
                                    />
                                    <span className="text-sm font-medium text-slate-700">Image</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="mediaType"
                                        value="video"
                                        checked={formData.overview.mediaType === 'video'}
                                        onChange={() => handleNestedChange('overview', 'mediaType', 'video')}
                                        className="accent-[#05A4A7]"
                                    />
                                    <span className="text-sm font-medium text-slate-700">Video</span>
                                </label>
                            </div>
                        </InputGroup>
                        <InputGroup label={`Overview ${formData.overview.mediaType === 'video' ? 'Video' : 'Image'}`}>
                            <FileUpload
                                currentUrl={formData.overview.mediaUrl}
                                type={formData.overview.mediaType === 'video' ? 'video' : 'image'}
                                onUpload={url => handleNestedChange('overview', 'mediaUrl', url)}
                            />
                        </InputGroup>
                    </div>
                </div>
            </Section>

            {/* F. CHALLENGE & SOLUTION (Parallel Lists) */}
            <Section title="Challenge & Solution">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Challenge */}
                    <div>
                        <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><Info size={16} /> The Challenge</h4>
                        <textarea className="w-full mb-3 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg h-20" placeholder="Main description..."
                            value={formData.challenge.description} onChange={e => handleNestedChange('challenge', 'description', e.target.value)} />

                        <label className="text-xs font-bold text-slate-500 mb-2 block">Bullet Points</label>
                        {formData.challenge.points.map((pt, i) => (
                            <div key={i} className="flex gap-2 mb-2">
                                <input className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                    value={pt} onChange={e => handleArrayChange('challenge.points', i, e.target.value)} />
                                <button type="button" onClick={() => removeArrayItem('challenge.points', i)} className="text-slate-400 hover:text-red-500"><Trash2 size={14} /></button>
                            </div>
                        ))}
                        <button type="button" onClick={() => addArrayItem('challenge.points')} className="text-xs text-[#05A4A7] font-bold">+ Add Point</button>
                    </div>

                    {/* Solution */}
                    <div>
                        <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2 text-[#05A4A7]"><Code size={16} /> The Solution</h4>
                        <textarea className="w-full mb-3 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg h-20" placeholder="Main description..."
                            value={formData.solution.description} onChange={e => handleNestedChange('solution', 'description', e.target.value)} />

                        <label className="text-xs font-bold text-slate-500 mb-2 block">Bullet Points</label>
                        {formData.solution.points.map((pt, i) => (
                            <div key={i} className="flex gap-2 mb-2">
                                <input className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                    value={pt} onChange={e => handleArrayChange('solution.points', i, e.target.value)} />
                                <button type="button" onClick={() => removeArrayItem('solution.points', i)} className="text-slate-400 hover:text-red-500"><Trash2 size={14} /></button>
                            </div>
                        ))}
                        <button type="button" onClick={() => addArrayItem('solution.points')} className="text-xs text-[#05A4A7] font-bold">+ Add Point</button>
                    </div>
                </div>
            </Section>

            {/* G. NEW MEDIA SHOWCASE */}
            <Section title="Media Showcase">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Left: Media File */}
                    <div>
                        <InputGroup label="Showcase Media Type">
                            <div className="flex gap-4 mb-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="showcaseMediaType"
                                        value="image"
                                        checked={formData.mediaShowcase.mediaType !== 'video'}
                                        onChange={() => setFormData(prev => ({
                                            ...prev,
                                            mediaShowcase: { ...prev.mediaShowcase, mediaType: 'image' }
                                        }))}
                                        className="accent-[#05A4A7]"
                                    />
                                    <span className="text-sm font-medium text-slate-700">Image</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="showcaseMediaType"
                                        value="video"
                                        checked={formData.mediaShowcase.mediaType === 'video'}
                                        onChange={() => setFormData(prev => ({
                                            ...prev,
                                            mediaShowcase: { ...prev.mediaShowcase, mediaType: 'video' }
                                        }))}
                                        className="accent-[#05A4A7]"
                                    />
                                    <span className="text-sm font-medium text-slate-700">Video</span>
                                </label>
                            </div>
                        </InputGroup>
                        <InputGroup label="Showcase Media File">
                            <FileUpload
                                currentUrl={formData.mediaShowcase.mediaUrl}
                                type={formData.mediaShowcase.mediaType}
                                onUpload={url => setFormData(prev => ({
                                    ...prev,
                                    mediaShowcase: { ...prev.mediaShowcase, mediaUrl: url }
                                }))}
                            />
                        </InputGroup>
                    </div>

                    {/* Right: Features List */}
                    <div>
                        <label className="text-sm font-bold text-slate-700 block mb-3">Key Features (Right Side)</label>
                        <div className="space-y-3">
                            {formData.mediaShowcase.items.map((item, i) => (
                                <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-3">
                                    <div className="flex-1">
                                        <input
                                            placeholder="Label (e.g. Real-Time Analytics)"
                                            className="w-full bg-transparent border-none text-sm font-medium focus:ring-0 px-0"
                                            value={item.label}
                                            onChange={e => handleShowcaseItemChange(i, 'label', e.target.value)}
                                        />
                                    </div>
                                    <input
                                        placeholder="Icon Name (e.g. Activity)"
                                        className="w-32 bg-white border border-slate-200 rounded px-2 py-1 text-xs"
                                        value={item.icon}
                                        onChange={e => handleShowcaseItemChange(i, 'icon', e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeShowcaseItem(i)}
                                        className="text-slate-400 hover:text-red-500"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                            {formData.mediaShowcase.items.length < 4 && (
                                <button
                                    type="button"
                                    onClick={addShowcaseItem}
                                    className="w-full py-2 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 text-xs font-bold hover:border-[#05A4A7] hover:text-[#05A4A7] transition-all"
                                >
                                    + Add Feature Item
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </Section>

            {/* I. RESULTS & RESULTS (Moved up for layout balance) */}
            <Section title="Results & Impact">
                <p className="text-sm text-slate-500 mb-4">Add key stats like "300% Growth" or "2M Users".</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {formData.results.map((stat, i) => (
                        <div key={i} className="p-3 border border-slate-200 rounded-lg bg-slate-50 relative group">
                            <input placeholder="Label (e.g. Growth)" className="w-full mb-2 bg-transparent border-b border-transparent focus:border-[#05A4A7] focus:outline-none text-xs font-bold uppercase text-slate-500"
                                value={stat.label} onChange={e => handleObjArrayChange('results', i, 'label', e.target.value)} />
                            <input placeholder="Value (e.g. +300%)" className="w-full bg-transparent focus:outline-none text-lg font-bold text-slate-800"
                                value={stat.value} onChange={e => handleObjArrayChange('results', i, 'value', e.target.value)} />
                            <button type="button" onClick={() => removeObjArrayItem('results', i)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-400"><Trash2 size={14} /></button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addObjArrayItem('results', { label: '', value: '' })} className="border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center p-4 text-slate-400 hover:bg-slate-50 hover:border-[#05A4A7] hover:text-[#05A4A7] transition-all">
                        <Plus size={20} />
                        <span className="text-xs font-bold">Add Stat</span>
                    </button>
                </div>
            </Section>

            {/* Testimonial */}
            <Section title="Client Testimonial">
                <InputGroup label="Quote Text">
                    <textarea className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg h-20"
                        value={formData.testimonial?.text || ''} onChange={e => handleNestedChange('testimonial', 'text', e.target.value)} />
                </InputGroup>
                <div className="grid md:grid-cols-3 gap-4">
                    <InputGroup label="Author Name">
                        <input className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                            value={formData.testimonial?.author || ''} onChange={e => handleNestedChange('testimonial', 'author', e.target.value)} />
                    </InputGroup>
                    <InputGroup label="Role">
                        <input className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                            value={formData.testimonial?.role || ''} onChange={e => handleNestedChange('testimonial', 'role', e.target.value)} />
                    </InputGroup>
                </div>
            </Section>

        </form>
    );
};

export default ProjectForm;
