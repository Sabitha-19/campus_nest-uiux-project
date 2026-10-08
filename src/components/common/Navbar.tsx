import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Scale } from 'lucide-react';
import { CampusNestLogo } from './CampusNestLogo';
import { useApp } from '../../context/AppContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const { compareIds } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 40);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / totalHeight) * 100)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Explore', path: '/explore' },
    {
      name: 'Compare',
      path: '/compare',
      badge: compareIds.length > 0 ? compareIds.length : null
    },
    { name: 'Roommates', path: '/roommates' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'About', path: '/about' },
    { name: 'Help', path: '/contact' }
  ];

  return (
    <>
      {/* Top scroll-progress bar (thin terracotta line) */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-[#B85C52] z-50 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={scrollProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-2.5 bg-[#F7F1E8]/90 backdrop-blur-md border-b border-[#D99A8F]/60 shadow-[0_4px_20px_rgba(45,36,33,0.06)]'
            : 'py-4 sm:py-5 bg-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D99A8F] rounded-lg">
            <CampusNestLogo variant="horizontal" size={isScrolled ? 'sm' : 'md'} />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[15px] font-medium text-[#2D2421]">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={`relative py-1 transition-colors duration-200 hover:text-[#B85C52] ${
                    isActive ? 'text-[#B85C52] font-semibold' : 'text-[#2D2421]'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {link.name}
                    {link.badge && (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold bg-[#B85C52] text-[#FFFDF9]">
                        {link.badge}
                      </span>
                    )}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 inset-x-0 h-[2px] bg-[#B85C52] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Actions: Login Link + CTA Button */}
          <div className="hidden lg:flex items-center gap-5">
            <Link
              to="/login"
              className="text-[15px] font-medium text-[#2D2421] hover:text-[#B85C52] transition-colors py-2 px-1"
            >
              Login
            </Link>

            <Link
              to="/explore"
              className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-[#B85C52] text-[#FFFDF9] font-medium text-sm tracking-wide shadow-sm hover:bg-[#D99A8F] hover:text-[#2D2421] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200"
            >
              Find Accommodation
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#2D2421] hover:bg-[#FFFDF9] border border-transparent hover:border-[#D99A8F] transition-colors"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#2D2421]" /> : <Menu className="w-6 h-6 text-[#2D2421]" />}
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-[#F7F1E8] flex flex-col justify-between p-6 overflow-y-auto lg:hidden"
          >
            <div className="flex items-center justify-between pb-6 border-b border-[#D99A8F]/50">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                <CampusNestLogo variant="horizontal" size="sm" />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full border border-[#D99A8F] bg-[#FFFDF9] text-[#2D2421]"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-4 py-8">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 + 0.1, duration: 0.3 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between text-2xl font-serif py-2 ${
                      location.pathname === link.path ? 'text-[#B85C52] font-bold' : 'text-[#2D2421]'
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="text-xs bg-[#B85C52] text-[#FFFDF9] px-2.5 py-0.5 rounded-full font-sans">
                        {link.badge} selected
                      </span>
                    )}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="pt-4 border-t border-[#D99A8F]/40"
              >
                <Link
                  to="/saved"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-lg font-serif py-2 text-[#2D2421]"
                >
                  <span>Saved Accommodations</span>
                </Link>
                <Link
                  to="/list-property"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-lg font-serif py-2 text-[#2D2421]"
                >
                  <span>List Your Property</span>
                </Link>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-lg font-serif py-2 text-[#2D2421]"
                >
                  <span>Login / Sign Up</span>
                </Link>
              </motion.div>
            </nav>

            <div className="pt-6 border-t border-[#D99A8F]/50">
              <Link
                to="/explore"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center h-[52px] rounded-full bg-[#B85C52] text-[#FFFDF9] font-medium text-base shadow-md active:scale-98 transition-all"
              >
                Find Accommodation
              </Link>
              <p className="text-center text-xs text-[#756762] mt-4">
                Safe • Affordable • Student-friendly
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
