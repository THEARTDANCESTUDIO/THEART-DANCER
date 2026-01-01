
import React, { useState } from 'react';
import { Language } from '../types';

interface NavbarProps {
  isAdmin: boolean;
  toggleAdmin: () => void;
  currentLang: Language;
  setLang: (lang: Language) => void;
  t: any;
}

export const Navbar: React.FC<NavbarProps> = ({ isAdmin, toggleAdmin, currentLang, setLang, t }) => {
  const [showLangMenu, setShowLangMenu] = useState(false);

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'ko', label: '한국어' },
    { code: 'ja', label: '日本語' },
    { code: 'zh', label: '中文' }
  ];

  const currentLangLabel = languages.find(l => l.code === currentLang)?.label;

  const handleLogoClick = () => {
    window.location.href = 'https://theartdancestudio1120.netlify.app';
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center">
      <div 
        onClick={handleLogoClick}
        className="text-xl font-black tracking-tighter cursor-pointer select-none hover:text-red-500 transition-colors"
      >
        THEART
      </div>
      
      <div className="hidden md:flex space-x-8 text-xs font-bold uppercase tracking-widest">
        <a href="#" className="text-red-500">{t.nav.dancers}</a>
        <a href="#" className="hover:text-red-500 transition-colors">{t.nav.classes}</a>
        <a href="#" className="hover:text-red-500 transition-colors">{t.nav.store}</a>
      </div>

      <div className="flex items-center space-x-4 md:space-x-6 text-[10px] font-bold uppercase">
        {/* Only show the button when Admin is already active to allow exiting */}
        {isAdmin && (
          <button 
            onClick={toggleAdmin}
            className="px-3 py-1 rounded border bg-red-600 border-red-600 text-white animate-pulse"
          >
            {t.nav.exitAdmin}
          </button>
        )}
        
        <div className="relative group">
          <button 
            onMouseEnter={() => setShowLangMenu(true)}
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center space-x-1 border border-white/10 px-2 py-1 rounded hover:bg-white/5 transition-colors"
          >
            <span>{currentLangLabel}</span>
            <svg className={`w-3 h-3 transition-transform ${showLangMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {showLangMenu && (
            <div 
              className="absolute right-0 mt-2 w-32 bg-zinc-900 border border-white/10 rounded-lg shadow-2xl py-2 overflow-hidden"
              onMouseLeave={() => setShowLangMenu(false)}
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLang(lang.code);
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white transition-colors ${currentLang === lang.code ? 'text-red-500' : ''}`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button className="md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </nav>
  );
};
