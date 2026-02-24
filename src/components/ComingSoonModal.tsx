'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  autoCloseMs?: number;
}

export function ComingSoonModal({
  isOpen,
  onClose,
  autoCloseMs = 3000,
}: ComingSoonModalProps) {
  const t = useTranslations('storeModal');

  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(onClose, autoCloseMs);
    return () => clearTimeout(timer);
  }, [isOpen, autoCloseMs, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative pointer-events-auto w-full max-w-md mx-4 p-8 rounded-2xl bg-surface-elevated border-2 border-accent/50 shadow-[0_0_40px_rgba(139,92,246,0.3)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg text-text-muted hover:text-text hover:bg-white/5 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="text-center">
                <h3 className="font-heading text-3xl md:text-4xl font-bold text-accent mb-3">
                  Coming Soon
                </h3>
                <p className="text-text-muted">{t('subtitle')}</p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
