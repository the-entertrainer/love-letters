'use client';

import React, { useState, useCallback } from 'react';
import { getAllLetters } from '../lib/lettersData';
import LetterSection from './LetterSection';
import ParticleField, { triggerHeartBurst } from './ParticleField';
import { useLenis } from '../hooks/useLenis';
import { useKeyboardNav } from '../hooks/useKeyboardNav';
import { useSongState } from '../hooks/useSongState';
import { toast } from 'sonner';

// The new advanced "Love Letters" experience.
// 3D liquid letters, premium cinematic panels, Lenis + physics scroll,
// Tamil/Malayalam/English songs that start with the letter, rich VFX,
// keyboard navigation, and a true journey feel.
// Replaces the old simple glass accordion + CSS-only effects.

const letters = getAllLetters();

export default function LoveLetters() {
  const [openId, setOpenId] = useState<string | null>(null);
  const { currentId: playingSongId, stop: stopSong } = useSongState();

  // Premium smooth scroll with Lenis (cinematic momentum)
  const { scrollTo } = useLenis({ 
    lerp: 0.078, 
    duration: 1.25, 
    smoothTouch: true, 
    snap: true 
  });

  const currentIndex = openId ? letters.findIndex(l => l.id === openId) : -1;

  const openLetter = useCallback((id: string) => {
    // Close song when switching letters
    if (playingSongId && playingSongId !== id) {
      stopSong();
    }
    setOpenId(id);
    
    // Scroll the section into nice position (Lenis accepts selector or offset)
    const selector = `#letter-${id}`;
    scrollTo(selector, { offset: -40, duration: 1.1 });
    
    // Subtle VFX on open
    setTimeout(() => triggerHeartBurst(), 280);
  }, [playingSongId, stopSong, scrollTo]);

  const closeLetter = useCallback(() => {
    stopSong();
    setOpenId(null);
  }, [stopSong]);

  const toggleLetter = useCallback((id: string) => {
    if (openId === id) {
      closeLetter();
    } else {
      openLetter(id);
    }
  }, [openId, openLetter, closeLetter]);

  const goToNext = useCallback(() => {
    const next = (currentIndex + 1) % letters.length;
    openLetter(letters[next].id);
  }, [currentIndex, openLetter]);

  const goToPrev = useCallback(() => {
    const prev = (currentIndex - 1 + letters.length) % letters.length;
    openLetter(letters[prev].id);
  }, [currentIndex, openLetter]);

  const jumpTo = useCallback((idx: number) => {
    if (idx >= 0 && idx < letters.length) {
      openLetter(letters[idx].id);
    }
  }, [openLetter]);

  // Advanced keyboard UX (arrows, j/k, 1-9, space, esc)
  useKeyboardNav({
    onNext: goToNext,
    onPrev: goToPrev,
    onToggle: () => {
      if (openId) closeLetter();
      else if (currentIndex >= 0) openLetter(letters[currentIndex].id);
    },
    onClose: closeLetter,
    onJump: jumpTo,
  });

  // Global ambient particles + occasional romantic bursts
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.86 && !openId) {
        triggerHeartBurst();
      }
    }, 5200);
    return () => clearInterval(interval);
  }, [openId]);

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden bg-[#050507] text-white">
      {/* Ambient romantic particle field (canvas + confetti bursts) */}
      <ParticleField />

      {/* Subtle fixed journey header */}
      <div className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
        <div className="flex justify-center pt-4">
          <div className="px-4 py-1 rounded-full bg-black/40 backdrop-blur text-[10px] tracking-[3px] text-white/45 border border-white/10">
            A CINEMATIC JOURNEY FOR JOSEPHINE
          </div>
        </div>
      </div>

      {/* The vertical journey - 9 rich sections with 3D + songs */}
      <div className="snap-container relative z-10 pt-10 pb-20">
        {letters.map((letterData, index) => (
          <div 
            key={letterData.id} 
            id={`letter-${letterData.id}`}
            className="letter-section"
          >
            <LetterSection
              data={letterData}
              isOpen={openId === letterData.id}
              onToggle={() => toggleLetter(letterData.id)}
              index={index}
            />
          </div>
        ))}

        {/* Beautiful cinematic finale */}
        <div className="min-h-[72vh] flex flex-col items-center justify-center px-6 text-center relative z-10">
          <div className="max-w-md space-y-6">
            <div className="text-6xl tracking-[-3.5px] font-serif text-white/95">Forever Yours</div>
            <p className="text-white/65 text-[15px] leading-relaxed">
              Every letter, every song, every glance — all of it is for you.<br /> 
              Swipe up, tap a letter, let the music play. I’m not going anywhere.
            </p>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setTimeout(() => {
                  openLetter(letters[0].id);
                  triggerHeartBurst();
                  toast.success('The journey begins again', { description: 'For Josephine, always.' });
                }, 420);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/30 hover:bg-white/5 active:bg-white/10 transition text-sm tracking-[1.5px]"
            >
              RESTART THE LETTERS
            </button>
          </div>
        </div>
      </div>

      {/* Interactive progress HUD (tap to jump) */}
      <div className="journey-progress">
        {letters.map((l, idx) => (
          <button
            key={l.id}
            onClick={() => jumpTo(idx)}
            className={`progress-dot ${openId === l.id ? 'active' : ''}`}
            aria-label={`Go to letter ${l.letter}`}
            title={l.letter}
          />
        ))}
      </div>

      {/* Subtle persistent hint (only when nothing open) */}
      {!openId && (
        <div className="pointer-events-none fixed bottom-20 left-1/2 -translate-x-1/2 text-[10px] tracking-[3.2px] text-white/25 font-medium z-10">
          SWIPE • TAP A LETTER • USE ARROWS OR 1-9
        </div>
      )}
    </div>
  );
}
