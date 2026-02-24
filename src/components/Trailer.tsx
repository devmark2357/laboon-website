'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Play } from 'lucide-react';
import { TRAILER_YOUTUBE_ID } from '@/lib/constants';

export function Trailer() {
  const t = useTranslations('trailer');
  const [isPlaying, setIsPlaying] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const thumbnailUrl = `https://img.youtube.com/vi/${TRAILER_YOUTUBE_ID}/maxresdefault.jpg`;
  const fallbackThumbnail = `https://img.youtube.com/vi/${TRAILER_YOUTUBE_ID}/sddefault.jpg`;

  return (
    <section
      id="trailer"
      ref={ref}
      className="py-20 md:py-28 bg-background"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-heading text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16"
        >
          {t('title')}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden bg-surface-elevated border border-white/10 shadow-2xl"
        >
          {isPlaying ? (
            <iframe
              src={`https://www.youtube.com/embed/${TRAILER_YOUTUBE_ID}?autoplay=1`}
              title="REALMATE Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <>
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${thumbnailUrl}), url(${fallbackThumbnail})`,
                }}
              />
              <div className="absolute inset-0 bg-black/40 hover:bg-black/30 transition-colors" />
              <button
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 flex items-center justify-center group"
                aria-label="Play trailer"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-accent flex items-center justify-center shadow-glow-lg group-hover:shadow-glow transition-shadow"
                >
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
                </motion.div>
              </button>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
