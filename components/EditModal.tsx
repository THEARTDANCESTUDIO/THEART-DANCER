
import React, { useState, useEffect } from 'react';
import { Dancer } from '../types';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dancer: Dancer) => void;
  initialDancer?: Dancer | null;
  t: any;
}

export const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, onSave, initialDancer, t }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (initialDancer) {
      setName(initialDancer.name);
      setRole(initialDancer.role);
      setImageUrl(initialDancer.imageUrl);
    } else {
      setName('');
      setRole('');
      setImageUrl('');
    }
  }, [initialDancer, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: initialDancer?.id || Date.now().toString(),
      name,
      role,
      imageUrl
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="bg-zinc-900 border border-white/10 w-full max-w-md rounded-2xl p-8 shadow-2xl">
        <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">
          {initialDancer ? t.modal.editTitle : t.modal.addTitle}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">{t.modal.name}</label>
            <input 
              required
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors text-white"
              placeholder={t.modal.placeholderName}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">{t.modal.role}</label>
            <input 
              required
              type="text" 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors text-white"
              placeholder={t.modal.placeholderRole}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">{t.modal.image}</label>
            <div className="space-y-4">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-zinc-400
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-xs file:font-semibold
                  file:bg-zinc-800 file:text-zinc-300
                  hover:file:bg-zinc-700"
              />
              <div className="text-center text-[9px] text-zinc-600 uppercase font-black tracking-widest">{t.modal.orUrl}</div>
              <input 
                type="text" 
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition-colors text-white"
                placeholder="https://..."
              />
            </div>
            {imageUrl && (
              <div className="mt-4 flex justify-center">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-red-500 shadow-lg shadow-red-500/20">
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              </div>
            )}
          </div>
          <div className="flex space-x-4 pt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors"
            >
              {t.admin.cancel}
            </button>
            <button 
              type="submit"
              className="flex-1 px-4 py-3 bg-red-600 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-colors"
            >
              {t.admin.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
