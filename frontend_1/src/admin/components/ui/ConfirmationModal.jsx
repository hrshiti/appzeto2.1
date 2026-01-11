import React from 'react';
import Modal from './Modal';
import { AlertTriangle } from 'lucide-react';

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirm Action",
    message = "Are you sure you want to proceed?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    isDangerous = false
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div className="flex flex-col gap-6">
                {/* Icon & Message */}
                <div className="flex items-start gap-4">
                    {isDangerous && (
                        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                            <AlertTriangle className="text-red-500" size={24} />
                        </div>
                    )}
                    <p className="text-slate-600 leading-relaxed text-sm md:text-base pt-1">
                        {message}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors text-sm"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`px-6 py-2 rounded-lg text-white font-bold text-sm shadow-md transition-all active:scale-95 flex items-center gap-2
                            ${isDangerous
                                ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20'
                                : 'bg-[#05A4A7] hover:bg-[#049497] shadow-[#05A4A7]/20'
                            }`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;
