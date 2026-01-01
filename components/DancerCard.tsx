
import React from 'react';
import { Dancer } from '../types';

interface DancerCardProps {
  dancer: Dancer;
  isAdmin: boolean;
  onEdit: (dancer: Dancer) => void;
  onDelete: (id: string) => void;
  t: any;
}

export const DancerCard: React.FC<DancerCardProps> = ({ dancer, isAdmin, onEdit, onDelete, t }) => {
  return (
    <div className="group relative flex flex-col items-center">
      <div className="relative w-full aspect-square overflow-hidden rounded-full bg-zinc-900 border-2 border-transparent group-hover:border-red-500 transition-all duration-500 shadow-2xl">
        <img 
          src={dancer.imageUrl} 
          alt={dancer.name} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
        />
        
        {isAdmin && (
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center space-y-3 p-4">
            <button 
              onClick={(e) => { 
                e.preventDefault();
                e.stopPropagation(); 
                onEdit(dancer); 
              }}
              className="w-24 bg-white text-black py-2 rounded-full text-[11px] font-black uppercase tracking-wider hover:bg-red-500 hover:text-white transition-all transform active:scale-95"
            >
              {t.admin.edit}
            </button>
            <button 
              onClick={(e) => { 
                e.preventDefault();
                e.stopPropagation(); 
                onDelete(dancer.id); 
              }}
              className="w-24 bg-red-600 text-white py-2 rounded-full text-[11px] font-black uppercase tracking-wider hover:bg-red-700 transition-all transform active:scale-95 shadow-lg shadow-red-900/40"
            >
              {t.admin.delete}
            </button>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-center">
        <div className="text-sm font-black tracking-widest uppercase mb-1">{dancer.name}</div>
        <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">{dancer.role}</div>
      </div>
    </div>
  );
};
