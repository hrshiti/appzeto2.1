import React, { useState } from 'react';
import AdminTable from '../components/AdminTable';
import { useToast } from '../context/ToastContext';
import { Mail, Trash2, Eye } from 'lucide-react';
import Modal from '../components/ui/Modal';

const AdminMessages = () => {
    const { addToast } = useToast();

    // Simple Contact Form Data
    const [messages, setMessages] = useState([
        { id: 1, name: 'Alice Brown', email: 'alice@test.com', subject: 'General Question', date: '2025-01-08', status: 'Unread', message: 'Do you work with non-profits?' },
        { id: 2, name: 'Bob Wilson', email: 'bob@test.com', subject: 'Bug Report', date: '2025-01-07', status: 'Read', message: 'Found a typo on your home page.' },
    ]);

    const [selectedMessage, setSelectedMessage] = useState(null);

    const handleDelete = (id) => {
        if (window.confirm('Delete message?')) {
            setMessages(prev => prev.filter(m => m.id !== id));
            addToast('Message deleted', 'success');
        }
    };

    const handleView = (msg) => {
        setSelectedMessage(msg);
        if (msg.status === 'Unread') {
            setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, status: 'Read' } : m));
        }
    };

    const columns = [
        { header: 'From', accessor: 'name' },
        { header: 'Subject', accessor: 'subject' },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => (
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${row.status === 'Unread' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
                    {row.status}
                </span>
            )
        },
        { header: 'Date', accessor: 'date' },
    ];

    const renderActions = (row) => (
        <div className="flex items-center justify-end gap-2">
            <button onClick={() => handleView(row)} className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg">
                <Eye size={16} />
            </button>
            <button onClick={() => handleDelete(row.id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
                <Trash2 size={16} />
            </button>
        </div>
    );

    return (
        <>
            <AdminTable
                title="Inbox"
                subtitle="General contact form inquiries."
                columns={columns}
                data={messages}
                customActions={renderActions}
            />

            <Modal isOpen={!!selectedMessage} onClose={() => setSelectedMessage(null)} title="Message Details">
                {selectedMessage && (
                    <div className="space-y-4">
                        <div className="border-b border-slate-100 pb-2 mb-4">
                            <p className="font-bold text-lg">{selectedMessage.subject}</p>
                            <p className="text-sm text-slate-500">From: {selectedMessage.name} &lt;{selectedMessage.email}&gt;</p>
                            <p className="text-xs text-slate-400">{selectedMessage.date}</p>
                        </div>
                        <p className="text-slate-800 bg-slate-50 p-4 rounded-lg text-sm">{selectedMessage.message}</p>
                        <div className="flex justify-end pt-2">
                            <button
                                onClick={() => {
                                    addToast('Reply functionality moved to leads for now.', 'info');
                                    setSelectedMessage(null);
                                }}
                                className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold"
                            >
                                Reply (Simulated)
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default AdminMessages;
