import React, { useState } from 'react';
import { Plus, Trash2, Save, Move, Edit2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const AdminFormBuilder = ({ formName, initialFields = [], onSave }) => {
    const { addToast } = useToast();

    // Default Fields based on form type if initial is empty
    const defaultFields = initialFields.length > 0 ? initialFields : [
        { id: 1, label: 'Full Name', type: 'text', placeholder: 'Enter your name', required: true },
        { id: 2, label: 'Email Address', type: 'email', placeholder: 'Enter your email', required: true },
        { id: 3, label: 'Message', type: 'textarea', placeholder: 'Your message here...', required: true },
    ];

    const [fields, setFields] = useState(defaultFields);
    const [submitButtonText, setSubmitButtonText] = useState('Submit Request');

    const [editingField, setEditingField] = useState(null); // ID of field being edited

    const addField = () => {
        const newField = {
            id: Date.now(),
            label: 'New Field',
            type: 'text',
            placeholder: 'Enter detail...',
            required: false
        };
        setFields([...fields, newField]);
        setEditingField(newField.id);
    };

    const removeField = (id) => {
        setFields(fields.filter(f => f.id !== id));
    };

    const updateField = (id, key, value) => {
        setFields(fields.map(f => f.id === id ? { ...f, [key]: value } : f));
    };

    const handleSave = () => {
        if (onSave) {
            onSave({ fields, submitButtonText });
        } else {
            // Fallback
            console.log(`Saving ${formName} configuration:`, { fields, submitButtonText });
            addToast(`${formName} form updated successfully`, 'success');
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-bold text-slate-800">Form Configuration</h3>
                    <p className="text-sm text-slate-500">Customize the inputs and appearance of the {formName} form.</p>
                </div>
                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-primary hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                >
                    <Save size={16} /> Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Editor Column */}
                <div className="space-y-6">
                    <div className="space-y-3">
                        {fields.map((field, index) => (
                            <div
                                key={field.id}
                                className={`p-4 rounded-xl border-2 transition-all ${editingField === field.id ? 'border-primary bg-primary/5' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">#{index + 1}</span>
                                        <h4 className="font-bold text-slate-700">{field.label}</h4>
                                        {field.required && <span className="text-xs text-red-500 font-bold">*Req</span>}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => setEditingField(editingField === field.id ? null : field.id)}
                                            className="p-1.5 text-slate-400 hover:text-primary rounded-lg"
                                        >
                                            <Edit2 size={14} />
                                        </button>
                                        <button
                                            onClick={() => removeField(field.id)}
                                            className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>

                                {/* Edit Mode Controls */}
                                {editingField === field.id && (
                                    <div className="grid grid-cols-2 gap-4 animate-fade-in text-sm">
                                        <div className="col-span-2">
                                            <label className="block text-xs font-bold text-slate-500 mb-1">Label</label>
                                            <input
                                                type="text"
                                                value={field.label}
                                                onChange={(e) => updateField(field.id, 'label', e.target.value)}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 mb-1">Input Type</label>
                                            <select
                                                value={field.type}
                                                onChange={(e) => updateField(field.id, 'type', e.target.value)}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary bg-white"
                                            >
                                                <option value="text">Text (Single Line)</option>
                                                <option value="email">Email</option>
                                                <option value="phone">Phone Number</option>
                                                <option value="textarea">Text Area (Long)</option>
                                                <option value="select">Dropdown</option>
                                                <option value="file">File Upload</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 mb-1">Placeholder</label>
                                            <input
                                                type="text"
                                                value={field.placeholder}
                                                onChange={(e) => updateField(field.id, 'placeholder', e.target.value)}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2 pt-2">
                                            <input
                                                type="checkbox"
                                                id={`req-${field.id}`}
                                                checked={field.required}
                                                onChange={(e) => updateField(field.id, 'required', e.target.checked)}
                                                className="rounded text-primary focus:ring-primary"
                                            />
                                            <label htmlFor={`req-${field.id}`} className="text-slate-600 font-medium">Required Field</label>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={addField}
                        className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 font-bold hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                    >
                        <Plus size={18} /> Add Form Field
                    </button>

                    <div className="pt-6 border-t border-slate-100">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Submit Button Text</label>
                        <input
                            type="text"
                            value={submitButtonText}
                            onChange={(e) => setSubmitButtonText(e.target.value)}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary font-medium"
                        />
                    </div>
                </div>

                {/* Preview Column */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 h-fit sticky top-6">
                    <h4 className="text-xs font-bold uppercase text-slate-400 mb-4 tracking-wider">Live Preview</h4>
                    <form className="space-y-4 pointer-events-none opacity-80" onSubmit={(e) => e.preventDefault()}>
                        {fields.map((field) => (
                            <div key={field.id} className="space-y-1">
                                <label className="block text-sm font-bold text-slate-700">
                                    {field.label} {field.required && <span className="text-red-500">*</span>}
                                </label>
                                {field.type === 'textarea' ? (
                                    <textarea
                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg resize-none min-h-[100px]"
                                        placeholder={field.placeholder}
                                    />
                                ) : field.type === 'select' ? (
                                    <select className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg">
                                        <option>Select Option...</option>
                                    </select>
                                ) : field.type === 'file' ? (
                                    <div className="w-full px-4 py-3 bg-white border border-dashed border-slate-300 rounded-lg text-center text-slate-400 text-sm">
                                        Click to upload
                                    </div>
                                ) : (
                                    <input
                                        type={field.type}
                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg"
                                        placeholder={field.placeholder}
                                    />
                                )}
                            </div>
                        ))}
                        <button className="w-full py-3 bg-[#05A4A7] text-white font-bold rounded-lg shadow-lg mt-4">
                            {submitButtonText}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminFormBuilder;
