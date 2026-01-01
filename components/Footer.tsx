
import React, { useState, useRef } from 'react';

interface FooterProps {
  t: any;
  toggleAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ t, toggleAdmin }) => {
  const [clickCount, setClickCount] = useState(0);
  const lastClickTime = useRef<number>(0);

  // Secret admin trigger: Click large Footer logo 5 times quickly
  const handleSecretTrigger = () => {
    const now = Date.now();
    if (now - lastClickTime.current < 500) {
      const newCount = clickCount + 1;
      if (newCount >= 5) {
        toggleAdmin();
        setClickCount(0);
      } else {
        setClickCount(newCount);
      }
    } else {
      setClickCount(1);
    }
    lastClickTime.current = now;
  };

  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-zinc-500">{t.footer.class}</h4>
          <ul className="space-y-3 text-xs font-bold uppercase tracking-widest">
            <li className="cursor-pointer hover:text-red-500">{t.footer.schedule}</li>
            <li className="cursor-pointer hover:text-red-500">{t.nav.dancers}</li>
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-zinc-500">{t.footer.info}</h4>
          <ul className="space-y-3 text-xs font-bold uppercase tracking-widest">
            <li className="cursor-pointer hover:text-red-500">{t.footer.about}</li>
            <li className="cursor-pointer hover:text-red-500">{t.footer.faq}</li>
            <li className="cursor-pointer hover:text-red-500">{t.footer.contact}</li>
          </ul>
        </div>
      </div>

      <div className="text-center mb-16">
        <h2 
          onClick={handleSecretTrigger}
          className="text-6xl font-black tracking-tighter mb-4 cursor-default select-none active:scale-95 transition-transform"
        >
          THEART
        </h2>
        <p className="text-xs font-bold tracking-[0.4em] uppercase text-zinc-400">DANCE STUDIO SEOUL</p>
        <p className="text-xs font-bold mt-2 text-zinc-300">+82 2 123 4567</p>
        <p className="text-xs font-bold text-zinc-300">INFO@THEARTDANCE.COM</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center text-[9px] text-zinc-600 font-bold border-t border-white/5 pt-8 space-y-4 md:space-y-0">
        <div>© 2024 THEART Dance Studio. All Rights Reserved.</div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-white uppercase">{t.footer.terms}</a>
          <a href="#" className="hover:text-white uppercase">{t.footer.privacy}</a>
        </div>
        <div className="flex space-x-4">
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black cursor-pointer transition-colors">YT</div>
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black cursor-pointer transition-colors">IG</div>
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black cursor-pointer transition-colors">TK</div>
        </div>
      </div>
    </footer>
  );
};
