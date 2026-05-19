import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const UKFlag = () => (
  <svg className="w-4 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30">
    <path fill="#012169" d="M0 0h60v30H0z"/>
    <path stroke="#fff" strokeWidth="6" d="M0 0l60 30m0-30L0 30"/>
    <path stroke="#c8102e" strokeWidth="4" d="M0 0l60 30m0-30L0 30"/>
    <path stroke="#fff" strokeWidth="10" d="M30 0v30M0 15h60"/>
    <path stroke="#c8102e" strokeWidth="6" d="M30 0v30M0 15h60"/>
  </svg>
);

const ESFlag = () => (
  <svg className="w-4 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 500">
    <path fill="#c60b1e" d="M0 0h750v500H0z"/>
    <path fill="#f1bf00" d="M0 125h750v250H0z"/>
  </svg>
);

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('es') ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const navItems = [
    { key: 'about', id: 'about' },
    { key: 'experience', id: 'experience' },
    { key: 'stack', id: 'tech' },
    { key: 'projects', id: 'projects' },
    { key: 'contact', id: 'contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4 sm:px-6 py-4 flex justify-between items-center ${
          scrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-4 sm:py-6'
        }`}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="text-red-primary font-display text-2xl sm:text-3xl md:text-4xl leading-none tracking-wider">
            IHS
          </div>
          <button
            onClick={toggleTheme}
            className="text-gray-400 hover:text-red-primary transition-colors cursor-pointer focus:outline-none p-1.5 rounded-full hover:bg-white/5"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <div className="hidden md:flex space-x-8 text-sm tracking-widest">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
              className="relative group hover:text-red-primary transition-colors duration-300 uppercase"
            >
              {t(`Navbar.${item.key}`)}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-red-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3 sm:gap-6 md:gap-8">
          <button
            onClick={toggleLanguage}
            className="text-xs sm:text-sm tracking-widest font-mono uppercase text-gray-400 hover:text-white transition-all cursor-pointer focus:outline-none flex gap-2 sm:gap-3 items-center group"
          >
            <div className="flex items-center gap-1.5 border border-white/10 px-2 py-1 rounded-sm group-hover:border-red-primary/50 transition-colors bg-white/5">
              <span className={`flex items-center gap-1.5 ${i18n.language.startsWith('en') ? 'text-red-primary font-bold' : 'opacity-40'}`}>
                <UKFlag /> EN
              </span>
              <span className="opacity-20 text-[10px]">|</span>
              <span className={`flex items-center gap-1.5 ${i18n.language.startsWith('es') ? 'text-red-primary font-bold' : 'opacity-40'}`}>
                ES <ESFlag />
              </span>
            </div>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white hover:text-red-primary transition-colors focus:outline-none cursor-pointer p-1"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center md:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="text-2xl font-display tracking-widest uppercase text-white hover:text-red-primary transition-colors"
                >
                  {t(`Navbar.${item.key}`)}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
