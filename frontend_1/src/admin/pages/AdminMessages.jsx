import React, { useState, useEffect } from 'react';
import AdminTable from '../components/AdminTable';
import { useToast } from '../context/ToastContext';
import { Mail, Trash2, Eye } from 'lucide-react';
import Modal from '../components/ui/Modal';
import { dataService } from '../services/dataService';

const AdminMessages = () => {
    const { addToast } = useToast();

    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        loadMessages();
    }, []);

    const loadMessages = async () => {
        try {
            const data = await dataService.getMessages();
            setMessages(data || []);
        } catch (err) {
            console.error("Failed to load messages", err);
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
            <AdminTable
                title="General Inquiries"
                subtitle="Consolidated messages from: Office Details Page, Contact Us Page (Main Form), and ChitChat Page."
                columns={columns}
                data={messages}
                customActions={renderActions}
            />

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
