import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, Moon, Sun, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

interface Props {
  onSearchOpen: () => void;
}

export default function Navbar({ onSearchOpen }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toggleCart, totalItems } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'Início', to: '/' },
    { label: 'Catálogo', to: '/catalog' },
    { label: 'Sobre', to: '/#about' },
  ];

  const isTransparent = isHome && !scrolled && !mobileOpen;

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isTransparent
            ? 'bg-transparent'
            : 'bg-white/90 dark:bg-neutral-950/90 bg-blur-glass border-b border-nude-100/50 dark:border-neutral-800/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex flex-col leading-none">
              <span className={`font-display text-xl font-light tracking-[0.25em] uppercase transition-colors duration-300 ${
                isTransparent ? 'text-white' : 'text-neutral-900 dark:text-neutral-100'
              }`}>
                Clean
              </span>
              <span className={`font-display text-xs font-light tracking-[0.5em] uppercase transition-colors duration-300 ${
                isTransparent ? 'text-white/70' : 'text-nude-500'
              }`}>
                Beauty
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`nav-link transition-colors duration-200 ${
                    isTransparent
                      ? 'text-white/80 hover:text-white'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                  } ${location.pathname === link.to ? (isTransparent ? 'text-white' : 'text-nude-600 dark:text-nude-400') : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={onSearchOpen}
                className={`p-2 transition-colors duration-200 ${
                  isTransparent ? 'text-white/80 hover:text-white' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                }`}
                aria-label="Buscar"
              >
                <Search size={18} />
              </button>

              <button
                onClick={toggleTheme}
                className={`p-2 transition-colors duration-200 ${
                  isTransparent ? 'text-white/80 hover:text-white' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                }`}
                aria-label="Alternar tema"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <button
                onClick={toggleCart}
                className={`relative p-2 transition-colors duration-200 ${
                  isTransparent ? 'text-white/80 hover:text-white' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                }`}
                aria-label="Carrinho"
              >
                <ShoppingBag size={18} />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      key="badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-nude-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <button
                onClick={() => setMobileOpen(p => !p)}
                className={`md:hidden p-2 transition-colors duration-200 ${
                  isTransparent ? 'text-white' : 'text-neutral-700 dark:text-neutral-300'
                }`}
                aria-label="Menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white dark:bg-neutral-950 border-b border-nude-100 dark:border-neutral-800 shadow-luxury"
          >
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={link.to}
                    className="nav-link text-neutral-700 dark:text-neutral-300 hover:text-nude-700 dark:hover:text-nude-400"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
