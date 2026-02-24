'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { LanguageToggle } from './LanguageToggle';

export function Navbar() {
  const t = useTranslations('nav');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: t('about') },
    { href: '#features', label: t('features') },
    { href: '#roadmap', label: t('roadmap') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <nav className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link
          href="/"
          className="font-heading font-bold text-lg tracking-[0.2em] text-text hover:text-accent transition-colors"
        >
          {t('logo')}
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-muted hover:text-text transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-6">
          <LanguageToggle />
          <a
            href="#cta"
            className="px-5 py-2.5 rounded-lg bg-gradient-accent text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-glow"
          >
            {t('comingSoon')}
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-text"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass mt-2 mx-4 rounded-lg overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-text-muted hover:text-text py-2"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <LanguageToggle />
                <a
                  href="#cta"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gradient-accent text-white font-semibold text-sm"
                >
                  {t('comingSoon')}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
