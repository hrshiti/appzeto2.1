import React, { useState, useEffect } from 'react';
import AdminTable from '../components/AdminTable';
import Modal from '../components/ui/Modal';
import { useToast } from '../context/ToastContext';
import { Edit, Trash2 } from 'lucide-react';
import { dataService } from '../services/dataService';

const AdminProducts = () => {
    const { addToast } = useToast();

    // -- State --
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const [currentProduct, setCurrentProduct] = useState({
        _id: '',
        name: '',
        description: '',
        images: '', // UI string
        features: '', // UI string
        status: 'Active'
    });

    // -- Load Data --
    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await dataService.getProducts();
            setProducts(data || []);
        } catch (err) {
            console.error("Failed to load products", err);
            addToast("Failed to load products", "error");
        }
    };

    const openAddModal = () => {
        setIsEditMode(false);
        setCurrentProduct({
            _id: '',
            name: '',
            description: '',
            images: '',
            features: '',
            status: 'Active'
        });
        setIsModalOpen(true);
    };

    const openEditModal = (product) => {
        setIsEditMode(true);
        setCurrentProduct({
            ...product,
            _id: product._id,
            images: (product.images || []).join(', '),
            features: (product.features || []).join(', '),
            status: product.active ? 'Active' : 'Inactive'
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this product?')) {
            try {
                await dataService.deleteProduct(id);
                setProducts(prev => prev.filter(p => p._id !== id));
                addToast('Product deleted', 'success');
            } catch (err) {
                addToast('Failed to delete product', 'error');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...currentProduct,
            images: currentProduct.images.split(',').map(s => s.trim()).filter(Boolean),
            features: currentProduct.features.split(',').map(s => s.trim()).filter(Boolean),
            active: currentProduct.status === 'Active'
        };
        delete payload._id;
        delete payload.status;

        if (payload.images.length > 0) payload.image = payload.images[0];

        try {
            if (isEditMode) {
                await dataService.updateProduct(currentProduct._id, payload);
                addToast('Product updated', 'success');
            } else {
                await dataService.createProduct(payload);
                addToast('Product created', 'success');
            }
            loadProducts();
            setIsModalOpen(false);
        } catch (err) {
            console.error(err);
            addToast('Operation failed', 'error');
        }
    };

    const columns = [
        { header: 'Product Name', accessor: 'name' },
        { header: 'Features Count', accessor: 'features', render: (row) => row.features?.length || 0 },
        {
            header: 'Status',
            accessor: 'active',
            render: (row) => (
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${row.active ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                    {row.active ? 'Active' : 'Inactive'}
                </span>
            )
        }
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
                title="Products Management"
                columns={columns}
                data={products}
                onAdd={openAddModal}
                customActions={renderActions}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={isEditMode ? 'Edit Product' : 'Add New Product'}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Product Name</label>
                        <input
                            type="text"
                            required
                            value={currentProduct.name}
                            onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Description</label>
                        <textarea
                            required
                            value={currentProduct.description}
                            onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary h-24 resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Image URLs <span className="text-xs font-normal text-slate-400">(Comma separated)</span></label>
                        <input
                            type="text"
                            value={currentProduct.images}
                            onChange={(e) => setCurrentProduct({ ...currentProduct, images: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                            placeholder="https://example.com/img1.jpg, ..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Features <span className="text-xs font-normal text-slate-400">(Comma separated)</span></label>
                        <input
                            type="text"
                            value={currentProduct.features}
                            onChange={(e) => setCurrentProduct({ ...currentProduct, features: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                            placeholder="Feature 1, Feature 2..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Status</label>
                        <select
                            value={currentProduct.status}
                            onChange={(e) => setCurrentProduct({ ...currentProduct, status: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="pt-4 flex justify-end gap-2 border-t border-slate-100 mt-6">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-500 font-bold hover:bg-slate-50 rounded-lg">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-primary text-white font-bold rounded-lg hover:bg-[#048a8d] shadow-lg shadow-primary/20">
                            {isEditMode ? 'Save Changes' : 'Create Product'}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default AdminProducts;
