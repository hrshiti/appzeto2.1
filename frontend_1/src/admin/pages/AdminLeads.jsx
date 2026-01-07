import React, { useState, useEffect } from 'react';
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
    List
} from 'lucide-react';
import Modal from '../components/ui/Modal';
import AdminFormBuilder from '../components/AdminFormBuilder';
import { dataService } from '../services/dataService';

const AdminLeads = () => {
    const { addToast } = useToast();
    const [pageTab, setPageTab] = useState('submissions'); // 'submissions' or 'settings'

    // -- CRM State --
    const [leads, setLeads] = useState([]);

    useEffect(() => {
        loadLeads();
    }, []);

    const loadLeads = async () => {
        try {
            const data = await dataService.getLeads();
            setLeads(data || []);
        } catch (err) {
            console.error("Failed to load leads", err);
        }
    };

    const [selectedLead, setSelectedLead] = useState(null);
    const [replyMode, setReplyMode] = useState(false); // 'reply', 'note'
    const [inputText, setInputText] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    // -- Handlers --

    const handleView = (lead) => {
        setSelectedLead(lead);
        setReplyMode(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this submission permanently?')) {
            try {
                await dataService.deleteLead(id);
                setLeads(prev => prev.filter(l => l._id !== id));
                addToast('Submission deleted', 'success');
                if (selectedLead?._id === id) setSelectedLead(null);
            } catch (err) {
                addToast('Failed to delete lead', 'error');
            }
        }
    };

    const updateStatus = async (newStatus) => {
        const updatedLead = { ...selectedLead, status: newStatus };
        setSelectedLead(updatedLead);
        setLeads(prev => prev.map(l => l._id === selectedLead._id ? updatedLead : l));

        try {
            await dataService.updateLead(selectedLead._id, { status: newStatus });
            addToast(`Status updated to: ${newStatus}`, 'success');
            addSystemNote(`Status changed to ${newStatus}`);
        } catch (err) {
            console.error(err);
            addToast("Failed to update status", "error");
        }
    };

    const addSystemNote = async (text) => {
        const timestamp = new Date().toLocaleString();
        const noteEntry = `${text} - ${timestamp}`;
        const updatedNotes = [...(selectedLead.notes || []), noteEntry];

        setSelectedLead(prev => ({ ...prev, notes: updatedNotes }));
        setLeads(prev => prev.map(l => l._id === selectedLead._id ? { ...l, notes: updatedNotes } : l));

        try {
            await dataService.updateLead(selectedLead._id, { notes: updatedNotes });
        } catch (err) {
            console.error(err);
        }
    };

    const handleActionSubmit = (e) => {
        e.preventDefault();
        if (replyMode === 'reply') {
            addToast(`Email sent to ${selectedLead.email}`, 'success');
            addSystemNote(`Replied via Email: "${inputText.substring(0, 30)}..."`);
        } else if (replyMode === 'note') {
            addToast('Internal note added', 'success');
            addSystemNote(`Note: ${inputText}`);
        }
        setInputText('');
        setReplyMode(false);
    };

    // -- Helpers --
    const getStatusColor = (status) => {
        switch (status) {
            case 'New': return 'bg-blue-100 text-blue-600';
            case 'Contacted': return 'bg-purple-100 text-purple-600';
            case 'In Negotiation': return 'bg-amber-100 text-amber-600';
            case 'Converted': return 'bg-emerald-100 text-emerald-600';
            case 'Lost': return 'bg-slate-100 text-slate-500';
            default: return 'bg-slate-100 text-slate-500';
        }
    };

    const filteredLeads = filterStatus === 'All' ? leads : leads.filter(l => l.status === filterStatus);

    const columns = [
        {
            header: 'Name & Company',
            accessor: 'name',
            render: (row) => (
                <div>
                    <p className="font-bold text-slate-800">{row.name}</p>
                    <p className="text-xs text-slate-500">{row.company}</p>
                </div>
            )
        },
        {
            header: 'Project Type',
            accessor: 'service',
            render: (row) => <span className="text-slate-700 font-medium text-sm">{row.service}</span>
        },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => (
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${getStatusColor(row.status)}`}>
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
            <button
                onClick={() => handleView(row)}
                className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                title="View Details"
            >
                <ArrowRight size={16} />
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
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-200">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Contact Us Management</h1>
                    <p className="text-slate-500 mt-1">Manage contact form submissions and settings.</p>
                </div>

                <div className="flex p-1 bg-white border border-slate-200 rounded-xl mt-4 md:mt-0">
                    <button
                        onClick={() => setPageTab('submissions')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${pageTab === 'submissions' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        <List size={16} /> Submissions
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
                    initialFields={[
                        { id: 1, label: 'Full Name', type: 'text', placeholder: 'Enter full name', required: true },
                        { id: 2, label: 'Email Address', type: 'email', placeholder: 'Enter email', required: true },
                        { id: 3, label: 'Phone Number', type: 'phone', placeholder: 'Enter phone', required: false },
                        { id: 4, label: 'Company', type: 'text', placeholder: 'Company name', required: false },
                        { id: 5, label: 'Subject', type: 'text', placeholder: 'Topic', required: true },
                        { id: 6, label: 'Message', type: 'textarea', placeholder: 'Tell us about your project...', required: true },
                    ]}
                />
            ) : (
                <div className="animate-fade-in-up">
                    {/* Stats Overview */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                            <p className="text-xs font-bold text-slate-500 uppercase">Total Submissions</p>
                            <p className="text-2xl font-black text-slate-800 mt-1">{leads.length}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                            <p className="text-xs font-bold text-slate-500 uppercase">New</p>
                            <p className="text-2xl font-black text-blue-500 mt-1">{leads.filter(l => l.status === 'New').length}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                            <p className="text-xs font-bold text-slate-500 uppercase">Followed Up</p>
                            <p className="text-2xl font-black text-purple-500 mt-1">{leads.filter(l => l.status === 'Contacted').length}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                            <p className="text-xs font-bold text-slate-500 uppercase">Conversion Rate</p>
                            <p className="text-2xl font-black text-emerald-500 mt-1">12%</p>
                        </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                        <Filter size={16} className="text-slate-400 mr-2" />
                        {['All', 'New', 'Contacted', 'In Negotiation', 'Converted', 'Lost'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${filterStatus === status
                                    ? 'bg-slate-800 text-white'
                                    : 'bg-white border border-slate-200 text-slate-500 hover:border-slate-400'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>

                    <AdminTable
                        title="Contact Submissions"
                        subtitle="View and manage messages from the Contact Us form."
                        columns={columns}
                        data={filteredLeads}
                        customActions={renderActions}
                    />

                    {/* CRM Details Modal */}
                    <Modal
                        isOpen={!!selectedLead}
                        onClose={() => setSelectedLead(null)}
                        title="Submission Details"
                    >
                        {selectedLead && (
                            <div className="flex flex-col h-[70vh]">
                                {/* Header Section */}
                                <div className="pb-6 border-b border-slate-100 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-800">{selectedLead.name}</h2>
                                        <p className="text-slate-500 font-medium">{selectedLead.company}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold uppercase mb-1 ${getStatusColor(selectedLead.status)}`}>
                                            {selectedLead.status}
                                        </span>
                                        <p className="text-sm font-bold text-slate-400">{new Date(selectedLead.createdAt).toLocaleString()}</p>
                                    </div>
                                </div>

                                {/* Pipeline Progress */}
                                <div className="mb-6 overflow-x-auto">
                                    <div className="flex bg-slate-100 p-1 rounded-xl min-w-[500px]">
                                        {['New', 'Contacted', 'In Negotiation', 'Converted', 'Lost'].map((step, idx) => {
                                            const isCurrent = selectedLead.status === step;
                                            const isComplete = ['New', 'Contacted', 'In Negotiation', 'Converted', 'Lost'].indexOf(selectedLead.status) > idx;

                                            return (
                                                <button
                                                    key={step}
                                                    onClick={() => updateStatus(step)}
                                                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${isCurrent ? 'bg-white shadow text-slate-800' :
                                                        isComplete ? 'text-slate-400' : 'text-slate-400 opacity-50'
                                                        }`}
                                                >
                                                    {step}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Main Interaction Area */}
                                <div className="flex-1 overflow-y-auto px-1 space-y-6 custom-scrollbar">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-xl">
                                            <h4 className="flex items-center gap-2 text-xs font-bold uppercase text-slate-400 mb-3">
                                                <Mail size={14} /> Contact Details
                                            </h4>
                                            <div className="space-y-2">
                                                <p className="text-sm font-medium text-slate-700">{selectedLead.email}</p>
                                                <p className="text-sm font-medium text-slate-700">{selectedLead.phone || 'No phone'}</p>
                                                <p className="text-xs text-slate-400 mt-2">Budget: {selectedLead.budget || '-'}</p>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-xl">
                                            <h4 className="flex items-center gap-2 text-xs font-bold uppercase text-slate-400 mb-3">
                                                <MessageSquare size={14} /> Project
                                            </h4>
                                            <p className="text-sm font-bold text-slate-800 mb-1">{selectedLead.service}</p>
                                            <p className="text-sm text-slate-600 italic leading-relaxed">{/* No message field in Lead yet */}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="flex items-center gap-2 text-xs font-bold uppercase text-slate-400 mb-3">
                                            <Clock size={14} /> Activity & Notes
                                        </h4>
                                        <div className="space-y-3 pl-4 border-l-2 border-slate-100">
                                            {(!selectedLead.notes || selectedLead.notes.length === 0) ? (
                                                <p className="text-sm text-slate-400">No notes yet.</p>
                                            ) : (
                                                selectedLead.notes.map((note, idx) => (
                                                    <div key={idx} className="relative">
                                                        <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-slate-200 border-2 border-white"></div>
                                                        <p className="text-sm text-slate-600 bg-white p-2 rounded-lg border border-slate-50">{note}</p>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 mt-4 border-t border-slate-100">
                                    {replyMode ? (
                                        <form onSubmit={handleActionSubmit} className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <label className="text-sm font-bold text-slate-700">
                                                    {replyMode === 'reply' ? `Emailing ${selectedLead.name}` : 'Adding Internal Note'}
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={() => setReplyMode(false)}
                                                    className="text-xs text-slate-400 hover:text-slate-600 font-bold"
                                                >
                                                    CANCEL
                                                </button>
                                            </div>
                                            <textarea
                                                rows="3"
                                                required
                                                value={inputText}
                                                onChange={(e) => setInputText(e.target.value)}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary text-sm"
                                                placeholder={replyMode === 'reply' ? "Write your email message..." : "Add observation or call notes..."}
                                                autoFocus
                                            />
                                            <div className="flex justify-end">
                                                <button
                                                    type="submit"
                                                    className="bg-primary hover:bg-[#048a8d] text-white px-6 py-2 rounded-xl font-bold text-sm shadow-lg shadow-primary/20"
                                                >
                                                    {replyMode === 'reply' ? 'Send Email' : 'Save Note'}
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <div className="flex gap-2 justify-end">
                                            <button
                                                onClick={() => setReplyMode('note')}
                                                className="px-4 py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold rounded-xl text-sm flex-1"
                                            >
                                                + Add Note
                                            </button>
                                            <button
                                                onClick={() => setReplyMode('reply')}
                                                className="px-4 py-3 bg-primary hover:bg-[#048a8d] text-white font-bold rounded-xl text-sm flex-[2] shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                                            >
                                                <Mail size={16} />
                                                Reply to Lead
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </Modal>
                </div>
            )}
        </>
    );
};

export default AdminLeads;
