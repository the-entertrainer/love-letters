'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SongPlayer from './music/SongPlayer';
import Letter3D from './three/Letter3D';
import type { LetterData } from '../lib/lettersData';

interface LetterProps {
  item: LetterData;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

const LIQUID_SPRING = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 15,
  mass: 1,
};

export function Letter({ item, index, isExpanded, onToggle }: LetterProps) {
  const [localExpanded, setLocalExpanded] = useState(false);
  const letterRef = useRef<HTMLButtonElement>(null);

  // Sync local with parent accordion
  useEffect(() => {
    setLocalExpanded(isExpanded);
  }, [isExpanded]);

  // Scroll-reactive typography (font variation width + optical size) - from the for-you reference
  useEffect(() => {
    const handleScroll = () => {
      if (!letterRef.current) return;
      const scrollY = window.scrollY;
      const rect = letterRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const distance = Math.abs(scrollY - sectionTop);
      const intensity = Math.max(0, Math.min(1, distance / 280));

      const wdth = 100 - intensity * 9;
      const opsz = 82 - intensity * 14;
      letterRef.current.style.fontVariationSettings = `"wght" 700, "wdth" ${wdth}, "opsz" ${opsz}`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTap = () => {
    // Light haptic on supported devices
    if (typeof navigator !== 'undefined' && (navigator as any).vibrate) {
      (navigator as any).vibrate(30);
    }
    onToggle();
  };

  const accent = item.theme === 'warm-gold' ? '#f4d35e' : 
                 item.theme === 'deep-emerald' ? '#34d399' : 
                 item.theme === 'rose' ? '#f472b6' : 
                 item.theme === 'indigo' ? '#818cf8' : '#a78bfa';

  return (
    <div className="letter-section relative h-dvh flex items-center justify-center">
      <div className="w-full max-w-[440px] px-6">
        {/* ONLY the letter is visible when collapsed. Pure, big, reactive. */}
        <motion.button
          ref={letterRef}
          onClick={handleTap}
          className="letter block w-full text-center focus:outline-none"
          aria-expanded={localExpanded}
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.97 }}
          transition={LIQUID_SPRING}
        >
          {item.letter}
        </motion.button>

        {/* Everything else reveals ONLY after tap - inside the glass panel */}
        <AnimatePresence>
          {localExpanded && (
            <motion.div
              layout
              initial={{ opacity: 0, height: 0, y: 18 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: 8 }}
              transition={LIQUID_SPRING}
              className="mt-5"
            >
              <div className="glass-panel expanded relative p-6 text-left">
                <div className="glowing-border" />

                <div className="relative z-10 space-y-5">
                  {/* Optional nice 3D reveal of the letter inside the expanded content (advanced but only visible after tap) */}
                  <div className="h-40 w-full -mx-1 mb-1 rounded-xl overflow-hidden border border-white/10">
                    <Letter3D letter={item.letter} themeColor={accent} />
                  </div>

                  <p className="expanded-text text-white/90 tracking-[-0.01em] leading-snug">
                    {item.message}
                  </p>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] tracking-[3px] text-white/50">SONG FOR {item.letter}</span>
                      <span className={`lang-badge lang-${item.language.toLowerCase()}`}>{item.language}</span>
                    </div>

                    <SongPlayer
                      videoUrl={item.videoUrl}
                      songTitle={item.songTitle}
                      artist={item.artist}
                      language={item.language}
                      letterId={item.id}
                    />
                  </div>

                  {item.lyricsTeaser && (
                    <div className="pt-1 border-t border-white/10 text-[13px] text-white/60 italic tracking-[-0.1px]">
                      {item.lyricsTeaser}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
