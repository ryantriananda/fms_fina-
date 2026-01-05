
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export const ConfirmationModal: React.FC<Props> = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100">
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-red-500 shadow-sm border border-red-100">
            <AlertTriangle size={32} />
          </div>
          <h3 className="text-[16px] font-black text-black uppercase tracking-tight mb-2">{title}</h3>
          <p className="text-[12px] font-medium text-gray-500 leading-relaxed px-4">{message}</p>
        </div>
        <div className="px-8 pb-8 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-3 bg-gray-50 text-gray-500 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-gray-100 hover:text-black transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={() => { onConfirm(); onClose(); }}
            className="flex-1 py-3 bg-red-500 text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-lg shadow-red-500/30"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
