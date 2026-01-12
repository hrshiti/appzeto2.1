import React, { useState } from 'react';
import AdminTable from '../components/AdminTable';
import { useToast } from '../context/ToastContext';
import {
    Mail,
    Trash2,
    ArrowRight,
    MessageSquare,
    Clock,
    Filter,
    Settings,
    List,
    HelpCircle
} from 'lucide-react';
import Modal from '../components/ui/Modal';
import AdminFormBuilder from '../components/AdminFormBuilder';

const AdminQueries = () => {
    const { addToast } = useToast();
    const [pageTab, setPageTab] = useState('submissions');

    // -- Mock Data for Queries --
    const [queries, setQueries] = useState([
        {
            id: 1,
            name: 'Sarah Connor',
            email: 'sarah@skynet.com',
            subject: 'Technical Support',
            date: '2025-01-08',
            status: 'New',
            message: 'I cannot access the dashboard from my mobile device.',
            notes: ["Checked logs, no errors found"],
        },
        {
            id: 2,
            name: 'Kyle Reese',
            email: 'kyle@tech.com',
            subject: 'Billing Question',
            date: '2025-01-07',
            status: 'Resolved',
            message: 'I was double charged for the last invoice.',
            notes: ["Refund processed"],
        },
    ]);

    const [selectedQuery, setSelectedQuery] = useState(null);
    const [replyMode, setReplyMode] = useState(false);
    const [inputText, setInputText] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    // -- Handlers (Simplified for brevity) --
    const handleView = (q) => { setSelectedQuery(q); setReplyMode(false); };
    const handleDelete = (id) => {
        if (window.confirm('Delete this query?')) {
            setQueries(prev => prev.filter(q => q.id !== id));
            addToast('Query deleted', 'error');
            if (selectedQuery?.id === id) setSelectedQuery(null);
        }
    };
    const updateStatus = (newStatus) => {
        setQueries(prev => prev.map(q => q.id === selectedQuery.id ? { ...q, status: newStatus } : q));
        setSelectedQuery(prev => ({ ...prev, status: newStatus }));
        addToast(`Marked as ${newStatus}`, 'success');
        addSystemNote(`Status -> ${newStatus}`);
    };
    const addSystemNote = (text) => {
        const entry = `${text} - ${new Date().toLocaleString()}`;
        setQueries(prev => prev.map(q => q.id === selectedQuery.id ? { ...q, notes: [...(q.notes || []), entry] } : q));
        setSelectedQuery(prev => ({ ...prev, notes: [...(prev.notes || []), entry] }));
    };
    const handleAction = (e) => {
        e.preventDefault();
        addToast(replyMode === 'reply' ? 'Reply sent' : 'Note added', 'success');
        addSystemNote(replyMode === 'reply' ? `Replied: ${inputText}` : `Note: ${inputText}`);
        setInputText('');
        setReplyMode(false);
    };

    const getStatusColor = (s) => s === 'New' ? 'bg-blue-100 text-blue-600' : s === 'Resolved' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500';

    const columns = [
        { header: 'User', accessor: 'name', render: (r) => <div><p className="font-bold text-slate-800">{r.name}</p><p className="text-xs text-slate-500">{r.email}</p></div> },
        { header: 'Subject', accessor: 'subject' },
        { header: 'Status', accessor: 'status', render: (r) => <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${getStatusColor(r.status)}`}>{r.status}</span> },
        { header: 'Date', accessor: 'date' }
    ];

    const actions = (row) => (
        <div className="flex gap-2 justify-end">
            <button onClick={() => handleView(row)} className="p-1.5 text-slate-400 hover:text-primary rounded-lg transition-colors"><ArrowRight size={16} /></button>
            <button onClick={() => handleDelete(row.id)} className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg transition-colors"><Trash2 size={16} /></button>
        </div>
    );

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <div className="flex p-1 bg-white border border-slate-200 rounded-xl">
                    <button onClick={() => setPageTab('submissions')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${pageTab === 'submissions' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>
                        <List size={16} /> Queries
                    </button>
                    <button onClick={() => setPageTab('settings')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${pageTab === 'settings' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>
                        <Settings size={16} /> Settings
                    </button>
                </div>
            </div>

            {pageTab === 'settings' ? (
                <AdminFormBuilder
                    formName="Query / Support"
                    initialFields={[
                        { id: 1, label: 'Name', type: 'text', placeholder: 'Your Name', required: true },
                        { id: 2, label: 'Email', type: 'email', placeholder: 'Your Email', required: true },
                        { id: 3, label: 'Issue Type', type: 'select', placeholder: 'Select issue...', required: true },
                        { id: 4, label: 'Description', type: 'textarea', placeholder: 'Describe your issue...', required: true },
                    ]}
                />
            ) : (
                <div className="animate-fade-in-up">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm"><p className="text-xs font-bold text-slate-500 uppercase">Total</p><p className="text-2xl font-black text-slate-800 mt-1">{queries.length}</p></div>
                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm"><p className="text-xs font-bold text-slate-500 uppercase">Open</p><p className="text-2xl font-black text-blue-500 mt-1">{queries.filter(q => q.status === 'New').length}</p></div>
                    </div>

                    <AdminTable title="User Queries" columns={columns} data={queries} customActions={actions} />

                    <Modal isOpen={!!selectedQuery} onClose={() => setSelectedQuery(null)} title="Query Details">
                        {selectedQuery && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                                    <div><h3 className="text-xl font-bold text-slate-900">{selectedQuery.subject}</h3><p className="text-sm text-slate-500">From: {selectedQuery.name} ({selectedQuery.email})</p></div>
                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${getStatusColor(selectedQuery.status)}`}>{selectedQuery.status}</span>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100"><p className="text-sm text-slate-700 italic">"{selectedQuery.message}"</p></div>

                                <div className="space-y-2">
                                    <h4 className="text-xs font-bold uppercase text-slate-400">Actions</h4>
                                    <div className="flex gap-2">
                                        {['New', 'In Progress', 'Resolved', 'Closed'].map(st => (
                                            <button key={st} onClick={() => updateStatus(st)} className={`px-3 py-1 text-xs font-bold border rounded-lg ${selectedQuery.status === st ? 'bg-slate-800 text-white' : 'bg-white text-slate-500'}`}>{st}</button>
                                        ))}
                                    </div>
                                </div>

                                {replyMode ? (
                                    <form onSubmit={handleAction} className="mt-4"><textarea className="w-full border p-2 rounded-lg text-sm" rows="3" placeholder="Type reply..." value={inputText} onChange={e => setInputText(e.target.value)} autoFocus /><button className="mt-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold w-full">Send</button></form>
                                ) : (
                                    <button onClick={() => setReplyMode('reply')} className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-lg mt-4 flex justify-center gap-2"><Mail size={16} /> Reply to User</button>
                                )}
                            </div>
                        )}
                    </Modal>
                </div>
            )}
        </>
    );
};

export default AdminQueries;
