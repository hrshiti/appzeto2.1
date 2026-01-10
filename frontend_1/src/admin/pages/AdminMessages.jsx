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
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${row.status === 'New' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
                    {row.status}
                </span>
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
                        <div className="border-b border-slate-100 pb-2 mb-4">
                            <p className="font-bold text-lg">{selectedMessage.reason}</p>
                            <p className="text-sm text-slate-500">From: {selectedMessage.name} &lt;{selectedMessage.email}&gt;</p>
                            <p className="text-sm text-slate-500">Phone: {selectedMessage.phone}</p>
                            <p className="text-xs text-slate-400">{new Date(selectedMessage.createdAt).toLocaleString()}</p>
                        </div>
                        <p className="text-slate-800 bg-slate-50 p-4 rounded-lg text-sm">{selectedMessage.message}</p>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default AdminMessages;
