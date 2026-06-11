'use client';

import React, { useState } from 'react';
import LetterCard, { LetterData, AccordionContext } from './LetterCard';

// Exact content data map as specified
const lettersData: LetterData[] = [
  {
    id: 'J',
    letter: 'J',
    message: 'J is for Joyful. Mostly because you actually put up with my nonsense.',
    videoUrl: 'https://www.youtube.com/embed/LjhCEhWiKXk',
  },
  {
    id: 'O',
    letter: 'O',
    message: 'O is for Obsessed. Seriously, I might need an intervention.',
    videoUrl: 'https://www.youtube.com/embed/viimfQi_pUw',
  },
  {
    id: 'S',
    letter: 'S',
    message: 'S is for Sensual. You know exactly what you do to me.',
    videoUrl: 'https://www.youtube.com/embed/Pkh8UtuejGw',
  },
  {
    id: 'E',
    letter: 'E',
    message: 'E is for Extra. Because you are, but I absolutely love it.',
    videoUrl: 'https://www.youtube.com/embed/SPUJIbXN0WY',
  },
  {
    id: 'P',
    letter: 'P',
    message: 'P is for Perfect. Well, almost. You do steal the covers.',
    videoUrl: 'https://www.youtube.com/embed/2Vv-BfVoq4g',
  },
  {
    id: 'H',
    letter: 'H',
    message: 'H is for Hot. Like, stupidly hot. It’s almost unfair.',
    videoUrl: 'https://www.youtube.com/embed/bnVUHWCynig',
  },
  {
    id: 'I',
    letter: 'I',
    message: 'I is for Intoxicating. Better than a double shot of espresso.',
    videoUrl: 'https://www.youtube.com/embed/1ekZEVeXwek',
  },
  {
    id: 'N',
    letter: 'N',
    message: 'N is for Naughty. I’ll just leave this one right here.',
    videoUrl: 'https://www.youtube.com/embed/wfN4PBQXbcY',
  },
  {
    id: 'E2',
    letter: 'E',
    message: 'E is for Endgame. You’re stuck with me now, babe.',
    videoUrl: 'https://www.youtube.com/embed/waU75jdUnYw',
  },
];

export default function LoveLetters() {
  // Central accordion state manager.
  // When one letter expands, the manager forces all others closed.
  const [openId, setOpenId] = useState<string | null>(null);

  const contextValue = { openId, setOpenId };

  return (
    <AccordionContext.Provider value={contextValue}>
      {/* 
        The main container:
        - Strictly 100dvh / 100vw (prevents mobile browser chrome clipping)
        - CSS scroll snap y mandatory for fluid vertical swiping
        - overflow-y-auto
      */}
      <div className="snap-container relative">
        {/* Animated Dark Glassy Liquid background (shifting radials) */}
        <div className="liquid-bg" aria-hidden="true" />

        {/* 
          Stacked letters — only these are visible on load.
          Vertically centered in spirit via generous padding + snap.
          All motion handled by Framer layout + spring physics (stiffness ~100, damping ~15).
        */}
        <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center py-12 md:py-16 px-4 gap-3.5">
          {lettersData.map((letterData) => (
            <div key={letterData.id} className="letter-section w-full flex justify-center">
              <LetterCard data={letterData} />
            </div>
          ))}
        </div>

        {/* Very subtle bottom affordance — does not break "only letters" rule visually */}
        <div className="pointer-events-none fixed bottom-5 left-1/2 -translate-x-1/2 text-[10px] tracking-[3.5px] text-white/25 font-medium z-10">
          SWIPE • TAP A LETTER
        </div>
      </div>
    </AccordionContext.Provider>
  );
}
