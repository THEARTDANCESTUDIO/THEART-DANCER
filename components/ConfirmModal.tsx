
import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  t: any;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, message, t }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
      <div className="bg-zinc-900 border border-red-500/30 w-full max-w-sm rounded-2xl p-8 shadow-[0_0_50px_rgba(220,38,38,0.15)] text-center">
        <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h3 className="text-lg font-black uppercase tracking-tighter mb-2 text-white">Warning</h3>
        <p className="text-zinc-400 text-sm leading-relaxed mb-8 break-keep">
          {message}
        </p>
        
        <div className="flex space-x-3">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-zinc-800 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-zinc-700 transition-colors"
          >
            {t.admin.cancel}
          </button>
          <button 
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 px-4 py-3 bg-red-600 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20"
          >
            {t.admin.delete}
          </button>
        </div>
      </div>
    </div>
  );
};
