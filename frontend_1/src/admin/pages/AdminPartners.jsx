import React, { useState, useEffect } from 'react';
import AdminTable from '../components/AdminTable';
import { useToast } from '../context/ToastContext';
import { Handshake, Trash2, Eye } from 'lucide-react';
import Modal from '../components/ui/Modal';
import { dataService } from '../services/dataService';

const AdminPartners = () => {
    const { addToast } = useToast();

    const [partners, setPartners] = useState([]);
    const [selectedPartner, setSelectedPartner] = useState(null);

    useEffect(() => {
        loadPartners();
    }, []);

    const loadPartners = async () => {
        try {
            const data = await dataService.getPartners();
            setPartners(data || []);
        } catch (err) {
            console.error("Failed to load partner inquiries", err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete inquiry?')) {
            try {
                await dataService.deletePartner(id);
                setPartners(prev => prev.filter(m => m._id !== id));
                addToast('Partner inquiry deleted', 'success');
            } catch (err) {
                addToast('Failed to delete inquiry', 'error');
            }
        }
    };

    const handleView = (p) => {
        setSelectedPartner(p);
    };

    const columns = [
        { header: 'Company', accessor: 'companyName' },
        { header: 'Contact Person', accessor: 'contactPerson' },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => (
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${row.status === 'New' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500'}`}>
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
                title="Channel Partners"
                columns={columns}
                data={partners}
                customActions={renderActions}
            />

            <Modal isOpen={!!selectedPartner} onClose={() => setSelectedPartner(null)} title="Partner Inquiry Details">
                {selectedPartner && (
                    <div className="space-y-4">
                        <div className="border-b border-slate-100 pb-2 mb-4">
                            <p className="font-bold text-lg">{selectedPartner.companyName}</p>
                            <p className="text-sm text-slate-500">Person: {selectedPartner.contactPerson}</p>
                            <p className="text-sm text-slate-500">Email: {selectedPartner.email}</p>
                            <p className="text-sm text-slate-500">Phone: {selectedPartner.phone}</p>
                            <p className="text-sm text-slate-500">Type: {selectedPartner.businessType}</p>
                            <p className="text-xs text-slate-400 mt-2">{new Date(selectedPartner.createdAt).toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-xs font-black uppercase text-slate-400 mb-2">Message:</p>
                            <p className="text-slate-800 bg-slate-50 p-4 rounded-lg text-sm">{selectedPartner.message || "No message provided."}</p>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default AdminPartners;
