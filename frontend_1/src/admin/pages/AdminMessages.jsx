import React, { useState, useEffect } from 'react';
import AdminTable from '../components/AdminTable';
import { useToast } from '../context/ToastContext';
import { Mail, Trash2, Eye, Settings } from 'lucide-react';
import AdminFormBuilder from '../components/AdminFormBuilder';
import Modal from '../components/ui/Modal';
import { dataService } from '../services/dataService';

const AdminMessages = () => {
    const { addToast } = useToast();
    const [pageTab, setPageTab] = useState('submissions'); // 'submissions' or 'settings'

    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    // Form Config State
    const [formConfig, setFormConfig] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [msgs, config] = await Promise.all([
                dataService.getMessages(),
                dataService.getFormConfig('contact')
            ]);
            setMessages(msgs || []);
            // Map backend config to builder format if exists, else defaults
            if (config && config.fields) {
                setFormConfig(config.fields);
            }
        } catch (err) {
            console.error("Failed to load data", err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete message?')) {
            try {
                await dataService.deleteMessage(id);
                setMessages(prev => prev.filter(m => m._id !== id));
                addToast('Message deleted', 'success');
            } catch (err) {
                addToast('Failed to delete message', 'error');
            }
        }
    };

    const handleView = (msg) => {
        setSelectedMessage(msg);
    };

    const updateStatus = async (id, newStatus) => {
        try {
            await dataService.updateMessage(id, { status: newStatus });
            setMessages(prev => prev.map(m => m._id === id ? { ...m, status: newStatus } : m));
            if (selectedMessage && selectedMessage._id === id) {
                setSelectedMessage(prev => ({ ...prev, status: newStatus }));
            }
            addToast('Status updated', 'success');
        } catch (err) {
            addToast('Failed to update status', 'error');
        }
    };

    const handleSaveForm = async (configData) => {
        try {
            await dataService.updateFormConfig('contact', configData);
            setFormConfig(configData.fields);
            addToast('Contact Form updated successfully', 'success');
        } catch (err) {
            console.error(err);
            addToast('Failed to update form', 'error');
        }
    };

    // Filter Logic
    const getFilteredMessages = () => {
        let result = messages;
        if (statusFilter !== 'All') {
            result = result.filter(m => m.status === statusFilter);
        }
        if (searchTerm) {
            const lower = searchTerm.toLowerCase();
            result = result.filter(m =>
                (m.name && m.name.toLowerCase().includes(lower)) ||
                (m.email && m.email.toLowerCase().includes(lower)) ||
                (m.reason && m.reason.toLowerCase().includes(lower))
            );
        }
        return result;
    };

    const columns = [
        { header: 'From', accessor: 'name' },
        {
            header: 'Subject/Reason',
            accessor: 'reason',
            render: (row) => row.reason || row.subject || 'No Subject'
        },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => (
                <select
                    value={row.status || 'New'}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => updateStatus(row._id, e.target.value)}
                    className={`px-2 py-1 rounded text-[10px] font-bold uppercase border-none cursor-pointer focus:ring-2 focus:ring-primary/20 ${row.status === 'New' ? 'bg-red-100 text-red-600' :
                        row.status === 'Read' ? 'bg-blue-100 text-blue-600' :
                            'bg-emerald-100 text-emerald-600'
                        }`}
                >
                    <option value="New">New</option>
                    <option value="Read">Read</option>
                    <option value="Replied">Replied</option>
                </select>
            )
        },
        {
            header: 'Date',
            accessor: 'createdAt',
            render: (row) => new Date(row.createdAt).toLocaleDateString()
        },
    ];

    const renderActions = (row) => (
        <div className="flex items-center justify-end gap-2">
            <button onClick={() => handleView(row)} className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg">
                <Eye size={16} />
            </button>
            <button onClick={() => handleDelete(row._id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
                <Trash2 size={16} />
            </button>
        </div>
    );

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-200">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">General Inquiries</h1>
                    <p className="text-slate-500 mt-1">Consolidated messages from Contact Us & ChitChat.</p>
                </div>

                <div className="flex p-1 bg-white border border-slate-200 rounded-xl mt-4 md:mt-0">
                    <button
                        onClick={() => setPageTab('submissions')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${pageTab === 'submissions' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        <Mail size={16} /> Messages
                    </button>
                    <button
                        onClick={() => setPageTab('settings')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${pageTab === 'settings' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        <Settings size={16} /> Form Settings
                    </button>
                </div>
            </div>

            {pageTab === 'settings' ? (
                <AdminFormBuilder
                    formName="Contact Us"
                    initialFields={formConfig || [
                        { id: 1, label: 'Name', type: 'text', placeholder: 'Your Name', required: true },
                        { id: 2, label: 'Email', type: 'email', placeholder: 'you@email.com', required: true },
                        { id: 3, label: 'Phone', type: 'phone', placeholder: '+91 0000...', required: true },
                        { id: 4, label: 'Reason', type: 'select', placeholder: 'Select reason', required: true },
                        { id: 5, label: 'Message', type: 'textarea', placeholder: 'How can we help?', required: true },
                    ]}
                    onSave={handleSaveForm}
                />
            ) : (
                <>
                    {/* Filter Bar */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        {/* Search is handled by AdminTable partially, but here we can add explicit status filter */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-2">
                            <span className="text-xs font-bold text-slate-400 uppercase mr-2">Filter:</span>
                            {['All', 'New', 'Read', 'Replied'].map(status => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${statusFilter === status
                                        ? 'bg-slate-800 text-white'
                                        : 'bg-white border border-slate-200 text-slate-500 hover:border-slate-400'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    <AdminTable
                        title="Messages"
                        subtitle="All general inquiries"
                        columns={columns}
                        data={getFilteredMessages()}
                        customActions={renderActions}
                        onSearch={(term) => setSearchTerm(term)}
                    />
                </>
            )}

            <Modal isOpen={!!selectedMessage} onClose={() => setSelectedMessage(null)} title="Message Details">
                {selectedMessage && (
                    <div className="space-y-4">
                        <div className="border-b border-slate-100 pb-4 mb-4">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <p className="font-bold text-lg">{selectedMessage.reason}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${(selectedMessage.status || 'New') === 'New' ? 'bg-red-100 text-red-700' :
                                            (selectedMessage.status || 'New') === 'Read' ? 'bg-blue-100 text-blue-700' :
                                                'bg-emerald-100 text-emerald-700'
                                            }`}>
                                            {selectedMessage.status || 'New'}
                                        </span>
                                    </div>
                                </div>
                                <select
                                    value={selectedMessage.status || 'New'}
                                    onChange={(e) => updateStatus(selectedMessage._id, e.target.value)}
                                    className="text-xs font-bold border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-primary bg-slate-50 hover:bg-white transition-colors cursor-pointer"
                                >
                                    <option value="New">Mark as New</option>
                                    <option value="Read">Mark as Read</option>
                                    <option value="Replied">Mark as Replied</option>
                                </select>
                            </div>

                            <div className="space-y-1 mt-4">
                                <p className="text-sm text-slate-500">From: {selectedMessage.name} &lt;{selectedMessage.email}&gt;</p>
                                <p className="text-sm text-slate-500">Phone: {selectedMessage.phone}</p>
                                <p className="text-xs text-slate-400 pt-2">{new Date(selectedMessage.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                        <p className="text-slate-800 bg-slate-50 p-4 rounded-lg text-sm whitespace-pre-wrap">{selectedMessage.message}</p>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default AdminMessages;
