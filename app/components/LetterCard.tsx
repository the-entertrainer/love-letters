'use client';

import React, { useState, useEffect, useContext, createContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Types
export interface LetterData {
  id: string;
  letter: string;
  message: string;
  videoUrl: string;
}

// Accordion context for state manager (coordinates the "only one open" behavior)
interface AccordionContextValue {
  openId: string | null;
  setOpenId: (id: string | null) => void;
}

export const AccordionContext = createContext<AccordionContextValue>({
  openId: null,
  setOpenId: () => {},
});

const springTransition = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 15,
  mass: 0.75,
};

interface LetterCardProps {
  data: LetterData;
}

export default function LetterCard({ data }: LetterCardProps) {
  const { id, letter, message, videoUrl } = data;
  const { openId, setOpenId } = useContext(AccordionContext);

  // Each letter is an independent Client Component with local state `isExpanded`
  // strictly initialized to false (per spec).
  const [isExpanded, setIsExpanded] = useState(false);

  // Sync local state with the global accordion manager.
  // When any other letter opens, this one smoothly closes via the layout animation.
  useEffect(() => {
    const shouldExpand = openId === id;
    if (shouldExpand !== isExpanded) {
      setIsExpanded(shouldExpand);
    }
  }, [openId, id, isExpanded]);

  const toggle = () => {
    const next = !isExpanded;
    setIsExpanded(next); // local state update
    setOpenId(next ? id : null); // tell manager — closes any previously open letter
  };

  // Clean YouTube embed with allowed features (no app jump)
  const embedSrc = `${videoUrl}?rel=0&modestbranding=1&color=white`;

  return (
    <motion.div
      layout
      transition={springTransition}
      className={`glass-card motion-card w-full max-w-[420px] mx-auto select-none ${
        isExpanded ? 'expanded tracing' : ''
      }`}
    >
      {/* Multi-layer glass structure is handled almost entirely via globals.css */}

      {/* Persistent glare layer (Aceternity/Linear inspired) */}
      <div className="glare-layer" />

      {/* Top specular shine */}
      <div className="glass-top-shine" />

      {/* Always-visible header with the big letter */}
      <div
        onClick={toggle}
        className="letter-header relative flex items-center justify-center px-8 py-9 md:py-10"
      >
        <div className="big-letter tabular-nums tracking-[-0.07em]">{letter}</div>

        {/* Gentle close affordance only visible when expanded */}
        <AnimatePresence>
          {isExpanded && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => {
                e.stopPropagation();
                toggle();
              }}
              className="close-btn"
              aria-label="Close letter"
            >
              <X size={15} strokeWidth={3} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Expanded content: message + YouTube embed */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ ...springTransition, opacity: { duration: 0.18 } }}
            className="overflow-hidden border-t border-white/8"
          >
            <div className="px-7 pb-7 pt-5 space-y-5">
              {/* Message - casual, fun, highly readable */}
              <p className="message-text px-1 tracking-[-0.006em]">
                {message}
              </p>

              {/* YouTube embed - borderless, rounded, clean inside glass */}
              <div className="video-frame">
                <iframe
                  src={embedSrc}
                  title={`Letter ${letter} — YouTube`}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              {/* Subtle footer hint */}
              <div className="px-1 pt-1 text-[10px] uppercase tracking-[3px] text-white/35 font-medium">
                For Josephine
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
