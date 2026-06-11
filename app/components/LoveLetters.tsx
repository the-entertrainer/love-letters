'use client';

import React, { useState } from 'react';
import { getAllLetters } from '../lib/lettersData';
import { Letter } from './Letter';
import { Particles } from './Particles';
import type { LetterData } from '../lib/lettersData';

// Strict vertical reactive scroll experience inspired by the "for-you" reference.
// - Nothing but the big letter is visible initially in each full-height snap section.
// - Scroll is vertical with snap + subtle reactive typography on the letters.
// - Only tapping a letter reveals its content (message + song + 3D visual) below it.
// - Accordion: only one expanded at a time.

const letters: LetterData[] = getAllLetters();

export default function LoveLetters() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="snap-container relative h-dvh w-screen overflow-y-auto bg-[#050507]">
      {/* Global subtle particles (like the reference) - always present but non-intrusive */}
      <Particles />

      {/* Minimal elegant fixed header */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 text-[10px] tracking-[4px] text-white/40 backdrop-blur-xl bg-black/10 border-b border-white/10">
        <div>LOVE LETTERS</div>
        <div className="text-lg tracking-[-1px] text-white/60">&lt;3</div>
        <div>JOSEPHINE</div>
      </div>

      {/* Vertical stack of letters - each section is a full viewport snap point */}
      <div className="pt-16">
        {letters.map((item, index) => (
          <Letter
            key={item.id}
            item={item}
            index={index}
            isExpanded={activeIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>

      {/* Elegant, non-distracting navigation hint - only when nothing expanded */}
      {activeIndex === null && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur text-[9px] tracking-[2.5px] text-white/25 border border-white/10 pointer-events-none select-none">
          TAP THE LETTER TO REVEAL  •  SWIPE VERTICALLY
        </div>
      )}
    </div>
  );
}
