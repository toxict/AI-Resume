import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Moon, Sun } from 'lucide-react';

const Navbar = ({ onMenuClick }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check URL override first
    const params = new URLSearchParams(window.location.search);
    const themeParam = params.get('theme');
    
    if (themeParam === 'dark' || themeParam === 'light') {
      localStorage.setItem('aptitude-theme', themeParam);
      if (themeParam === 'dark') {
          setIsDark(true);
          document.documentElement.classList.add('dark');
      } else {
          setIsDark(false);
          document.documentElement.classList.remove('dark');
      }
      return;
    }

    // Fallback to saved theme
    const savedTheme = localStorage.getItem('aptitude-theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('aptitude-theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('aptitude-theme', 'dark');
    }
    setIsDark(!isDark);
  };

  return (
    <nav className="h-16 bg-white dark:bg-[#0d0a15] border-b border-slate-200 dark:border-white/10 flex justify-between items-center px-4 md:px-8 sticky top-0 z-50 transition-colors duration-300">
      <div className="flex items-center gap-3">
        <button
          onClick={() => { console.log("Navbar Button Clicked"); onMenuClick(); }}
          className="p-2 md:hidden rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
        >
          <Menu size={20} />
        </button>
        <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          Zen<span className="text-[#9d4edd]">Code</span> Hub
        </span>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300 transition-all">
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <Link to="/" className="text-slate-600 dark:text-slate-300 hover:text-[#9d4edd] dark:hover:text-[#9d4edd] font-bold text-sm uppercase tracking-tighter transition-colors">Home</Link>
      </div>
    </nav>
  );
};

export default Navbar;