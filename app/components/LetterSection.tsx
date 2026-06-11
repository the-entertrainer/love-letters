'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { LetterData } from '../lib/lettersData';
import Letter3D from './three/Letter3D';
import SongPlayer from './music/SongPlayer';
import { triggerLetterOpenVFX } from './ParticleField';

interface LetterSectionProps {
  data: LetterData;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

export default function LetterSection({ data, isOpen, onToggle, index }: LetterSectionProps) {
  const { letter, message, songTitle, artist, language, videoUrl, videoId, lyricsTeaser, theme } = data;

  // Theme accent mapping
  const accent = 
    theme === 'warm-gold' ? '#f4d35e' : 
    theme === 'deep-emerald' ? '#34d399' : 
    theme === 'rose' ? '#f472b6' : 
    theme === 'indigo' ? '#818cf8' : 
    theme === 'soft-amber' ? '#fbbf24' : 
    theme === 'crimson' ? '#f87171' : 
    theme === 'violet' ? '#a78bfa' : '#5eead4';

  return (
    <div className="letter-section w-full max-w-[min(100%,520px)] px-3">
      <motion.div
        layout
        onClick={onToggle}
        className={`cinematic-panel w-full cursor-pointer select-none overflow-hidden ${isOpen ? 'expanded' : ''}`}
        whileHover={{ scale: isOpen ? 1 : 1.005 }}
        transition={{ type: 'spring', stiffness: 120, damping: 22 }}
      >
        {/* 3D Letter Hero - the new premium centerpiece (replaces old flat big-letter box) */}
        <div className="relative h-[42vh] min-h-[260px] w-full bg-[#050507]">
          <Letter3D 
            letter={letter} 
            themeColor={accent} 
            className="absolute inset-0" 
          />
          
          {/* Elegant overlay info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-[11px] tracking-[3px] text-white/50 mb-0.5">LETTER {index + 1} OF 9</div>
                <div className="text-6xl md:text-7xl font-serif tracking-[-4.5px] text-white/95 leading-none">{letter}</div>
              </div>
              <div className="text-right text-xs text-white/60 max-w-[46%] leading-tight">
                {songTitle}
              </div>
            </div>
          </div>

          {/* Close affordance - only when expanded */}
          <AnimatePresence>
            {isOpen && (
              <motion.button
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                onClick={(e) => { e.stopPropagation(); onToggle(); }}
                className="absolute top-4 right-4 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white/70 backdrop-blur hover:bg-black/80 hover:text-white border border-white/10"
                aria-label="Close letter"
              >
                <X size={16} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Expanded Content - rich UX (message + song + lyrics) */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="expanded-content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: 'spring', stiffness: 90, damping: 18, mass: 0.8 }}
              className="overflow-hidden border-t border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-7 space-y-6">
                {/* Message - evolved with song reference */}
                <div>
                  <p className="message-text leading-relaxed tracking-[-0.1px]">
                    {message}
                  </p>
                </div>

                {/* Song Player - advanced, VFX triggering, language badge */}
                <div>
                  <div className="flex items-center gap-2 mb-2.5 pl-0.5">
                    <span className="text-[10px] tracking-[2px] text-white/45">NOW PLAYING</span>
                    <span className={`lang-badge lang-${language.toLowerCase()}`}>{language}</span>
                  </div>
                  <SongPlayer
                    videoUrl={videoUrl}
                    videoId={videoId}
                    songTitle={songTitle}
                    artist={artist}
                    language={language}
                    letterId={data.id}
                    onPlayChange={(playing) => {
                      if (playing) triggerLetterOpenVFX();
                    }}
                  />
                </div>

                {/* Lyrics Teaser */}
                <div className="pl-0.5">
                  <div className="text-[10px] uppercase tracking-[2.5px] text-white/40 mb-1.5">LYRICS ECHO</div>
                  <p className="lyrics-teaser">{lyricsTeaser}</p>
                </div>

                <div className="pt-1 text-[10px] text-white/30 tracking-[1.5px] flex items-center gap-2">
                  FOR JOSEPHINE <span className="block h-px flex-1 bg-white/10" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
