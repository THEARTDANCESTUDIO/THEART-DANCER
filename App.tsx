
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { DancerCard } from './components/DancerCard.tsx';
import { EditModal } from './components/EditModal.tsx';
import { ConfirmModal } from './components/ConfirmModal.tsx';
import { Footer } from './components/Footer.tsx';
import { INITIAL_DANCERS } from './constants.ts';
import { Dancer, Language } from './types.ts';
import { translations } from './i18n.ts';

const App: React.FC = () => {
  // Update version to v4 to force sync INITIAL_DANCERS on user's browsers after reordering
  const STORAGE_KEY = 'theart_dancers_v4';

  const [dancers, setDancers] = useState<Dancer[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('LocalStorage load error:', e);
    }
    return INITIAL_DANCERS;
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editingDancer, setEditingDancer] = useState<Dancer | null>(null);
  const [dancerToDelete, setDancerToDelete] = useState<string | null>(null);
  const [currentLang, setCurrentLang] = useState<Language>('ko');

  const t = useMemo(() => translations[currentLang] || translations.ko, [currentLang]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dancers));
    } catch (e) {
      console.error('LocalStorage save error:', e);
    }
  }, [dancers]);

  const handleToggleAdmin = useCallback(() => {
    setIsAdmin(prev => !prev);
  }, []);

  const handleAddDancer = useCallback(() => {
    setEditingDancer(null);
    setIsModalOpen(true);
  }, []);

  const handleEditDancer = useCallback((dancer: Dancer) => {
    setEditingDancer(dancer);
    setIsModalOpen(true);
  }, []);

  const handleDeleteClick = useCallback((id: string) => {
    setDancerToDelete(id);
    setIsConfirmOpen(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (dancerToDelete) {
      setDancers(prev => prev.filter(d => d.id !== dancerToDelete));
      setDancerToDelete(null);
    }
  }, [dancerToDelete]);

  const handleSaveDancer = useCallback((dancer: Dancer) => {
    setDancers(prev => {
      const index = prev.findIndex(d => d.id === dancer.id);
      if (index !== -1) {
        const next = [...prev];
        next[index] = dancer;
        return next;
      }
      return [dancer, ...prev];
    });
    setIsModalOpen(false);
    setEditingDancer(null);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-500 selection:text-white">
      <Navbar 
        isAdmin={isAdmin} 
        toggleAdmin={handleToggleAdmin} 
        currentLang={currentLang}
        setLang={setCurrentLang}
        t={t}
      />

      <main className="pt-32 pb-20">
        <header className="px-6 text-center mb-16">
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-none mb-4">
            {t.header?.title}
          </h1>
          <div className="text-[10px] font-bold tracking-[0.5em] uppercase text-zinc-500">
            {t.header?.subtitle}
          </div>
        </header>

        {isAdmin && (
          <div className="flex justify-center mb-16">
            <button 
              onClick={handleAddDancer}
              className="group flex items-center space-x-3 bg-white text-black px-8 py-3 rounded-full font-black uppercase tracking-tighter text-sm hover:bg-red-600 hover:text-white transition-all transform hover:scale-105 shadow-xl shadow-white/10"
            >
              <span>{t.admin?.add}</span>
              <span className="text-lg">+</span>
            </button>
          </div>
        )}

        <div className="px-6 md:px-12 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16 lg:gap-x-12 lg:gap-y-24">
            {dancers.map((dancer) => (
              <DancerCard 
                key={dancer.id} 
                dancer={dancer} 
                isAdmin={isAdmin}
                onEdit={handleEditDancer}
                onDelete={handleDeleteClick}
                t={t}
              />
            ))}
          </div>
        </div>

        <section className="mt-40 border-y border-white/10 py-24 bg-zinc-900/30">
          <div className="px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-8">
              {t.schedule?.title}
            </h2>
            <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-16">
              <div 
                onClick={() => window.location.href = 'https://stupendous-shortbread-e6c2e2.netlify.app'}
                className="border border-white/5 p-12 hover:border-red-500/50 transition-colors cursor-pointer group rounded-2xl bg-black/50 min-w-[280px]"
              >
                <div className="text-6xl font-black mb-4 group-hover:text-red-500 transition-colors">FAQ</div>
                <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-500">
                  {t.schedule?.faqSub}
                </div>
              </div>
              <div 
                onClick={() => window.location.href = 'https://vocal-fairy-ef3f8a.netlify.app'}
                className="border border-white/5 p-12 hover:border-red-500/50 transition-colors cursor-pointer group rounded-2xl bg-black/50 min-w-[280px]"
              >
                <div className="text-6xl font-black mb-4 group-hover:text-red-500 transition-colors">CONTACT</div>
                <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-500">
                  {t.schedule?.contactSub}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer t={t} toggleAdmin={handleToggleAdmin} />

      {isModalOpen && (
        <EditModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSaveDancer}
          initialDancer={editingDancer}
          t={t}
        />
      )}

      {isConfirmOpen && (
        <ConfirmModal 
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={confirmDelete}
          message={t.admin?.confirmDelete}
          t={t}
        />
      )}
    </div>
  );
};

export default App;
