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
    const [filterType, setFilterType] = useState('All');

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

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await dataService.updateLead(id, { status: newStatus });
            setLeads(prev => prev.map(l => l._id === id ? { ...l, status: newStatus } : l));
            if (selectedLead?._id === id) {
                setSelectedLead(prev => ({ ...prev, status: newStatus }));
            }
            addToast(`Status updated to ${newStatus}`, 'success');
        } catch (err) {
            console.error(err);
            addToast("Failed to update status", "error");
        }
    };

    const addSystemNote = async (text) => {
        if (!selectedLead) return;
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

    const filteredLeads = leads.filter(l => {
        const matchesStatus = filterStatus === 'All' || l.status === filterStatus;
        const matchesType = filterType === 'All' || (l.leadType || 'Sales') === filterType;
        return matchesStatus && matchesType;
    });

    const columns = [
        {
            header: 'Type',
            accessor: 'leadType',
            render: (row) => (
                <span className={`px-2 py-0.5 rounded-[4px] text-[9px] font-bold uppercase ${row.leadType === 'Partner' ? 'bg-indigo-100 text-indigo-600 border border-indigo-200' : 'bg-blue-100 text-blue-600 border border-blue-200'
                    }`}>
                    {row.leadType || 'Sales'}
                </span>
            )
        },
        {
            header: 'Name & Company',
            accessor: 'name',
            render: (row) => (
                <div>
                    <p className="font-bold text-slate-800">{row.name}</p>
                    <p className="text-xs text-slate-500 font-medium">{row.company}</p>
                </div>
            )
        },
        {
            header: 'Inquiry / Project',
            accessor: 'service',
            render: (row) => <span className="text-slate-700 font-bold text-sm tracking-tight">{row.service}</span>
        },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => (
                <select
                    value={row.status}
                    onChange={(e) => handleStatusUpdate(row._id, e.target.value)}
                    className={`px-2 py-1 rounded text-[10px] font-bold uppercase outline-none border-none cursor-pointer transition-colors ${row.status === 'New' ? 'bg-blue-100 text-blue-600' :
                        row.status === 'Contacted' ? 'bg-purple-100 text-purple-600' :
                            row.status === 'In Negotiation' ? 'bg-amber-100 text-amber-600' :
                                row.status === 'Converted' ? 'bg-emerald-100 text-emerald-600' :
                                    'bg-slate-100 text-slate-500'
                        }`}
                >
                    {['New', 'Contacted', 'In Negotiation', 'Converted', 'Lost'].map(s => (
                        <option key={s} value={s} className="bg-white text-slate-800 font-sans">{s}</option>
                    ))}
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
            <div className="flex justify-between items-center mb-6">
                <div className="flex p-1 bg-white border border-slate-200 rounded-xl">
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
                    <div className="flex flex-col gap-4 mb-6">
                        <div className="flex items-center gap-2 overflow-x-auto pb-1">
                            <span className="text-[10px] font-black uppercase text-slate-400 mr-2 flex-none">Type:</span>
                            {['All', 'Sales', 'Partner'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setFilterType(type)}
                                    className={`px-3 py-1 rounded-full text-[10px] font-bold whitespace-nowrap transition-colors ${filterType === type
                                        ? 'bg-primary text-white'
                                        : 'bg-white border border-slate-200 text-slate-500 hover:border-slate-400'
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 overflow-x-auto pb-2">
                            <Filter size={14} className="text-slate-400 mr-2 flex-none" />
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
                    </div>

                    <AdminTable
                        title="Project Submission Leads"
                        columns={columns}
                        data={filteredLeads}
                        customActions={renderActions}
                    />

                    {/* CRM Details Modal - Simplified Data View */}
                    <Modal
                        isOpen={!!selectedLead}
                        onClose={() => setSelectedLead(null)}
                        title="Submission Details"
                    >
                        {selectedLead && (
                            <div className="space-y-3 max-h-[70vh] overflow-y-auto custom-scrollbar pr-1">
                                {/* Core Info - Compact Grid */}
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                        <p className="text-[9px] font-black uppercase text-slate-400 leading-none mb-1">Full Name</p>
                                        <p className="font-bold text-slate-800 text-sm">{selectedLead.name}</p>
                                    </div>
                                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                        <p className="text-[9px] font-black uppercase text-slate-400 leading-none mb-1">Company</p>
                                        <p className="font-bold text-slate-800 text-sm truncate">{selectedLead.company || 'N/A'}</p>
                                    </div>
                                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                        <p className="text-[9px] font-black uppercase text-slate-400 leading-none mb-1">Email</p>
                                        <p className="font-bold text-slate-800 text-sm break-all">{selectedLead.email}</p>
                                    </div>
                                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                        <p className="text-[9px] font-black uppercase text-slate-400 leading-none mb-1">Phone</p>
                                        <p className="font-bold text-slate-800 text-sm">{selectedLead.phone || 'N/A'}</p>
                                    </div>
                                </div>

                                {/* Project/Service Details - Compact */}
                                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                    <div className="flex justify-between items-center mb-2">
                                        <div>
                                            <p className="text-[9px] font-black uppercase text-slate-400 leading-none mb-0.5">Service/Inquiry</p>
                                            <p className="font-black text-primary text-base leading-tight">{selectedLead.service}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[9px] font-black uppercase text-slate-400 leading-none mb-0.5">Budget</p>
                                            <p className="font-bold text-slate-800 text-sm">{selectedLead.budget || 'N/A'}</p>
                                        </div>
                                    </div>

                                    <div className="mt-2 pt-2 border-t border-slate-200/60">
                                        <p className="text-[9px] font-black uppercase text-slate-400 leading-none mb-1.5">Message</p>
                                        <div className="bg-white p-2.5 rounded-md border border-slate-100 text-xs text-slate-600 leading-relaxed whitespace-pre-wrap italic shadow-sm">
                                            {selectedLead.message || "No additional details provided."}
                                        </div>
                                    </div>
                                </div>

                                {/* Metadata - Very Compact */}
                                <div className="flex justify-between items-center text-[8px] font-bold text-slate-400 uppercase tracking-widest px-1">
                                    <span>Date: {new Date(selectedLead.createdAt).toLocaleString()}</span>
                                    <span>#{selectedLead._id?.substring(0, 8)}</span>
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
