'use client';

import { useEffect } from 'react';

interface UseKeyboardNavOptions {
  onNext: () => void;
  onPrev: () => void;
  onToggle: () => void;
  onClose: () => void;
  onJump?: (index: number) => void; // 1-9
}

export function useKeyboardNav({ onNext, onPrev, onToggle, onClose, onJump }: UseKeyboardNavOptions) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'j' || e.key === 'J') {
        e.preventDefault();
        onNext();
      }
      if (e.key === 'ArrowUp' || e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        onPrev();
      }
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        onToggle();
      }
      if (e.key.toLowerCase() === 'escape') {
        onClose();
      }
      // Direct jump 1-9
      const num = parseInt(e.key);
      if (!isNaN(num) && num >= 1 && num <= 9 && onJump) {
        onJump(num - 1);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onNext, onPrev, onToggle, onClose, onJump]);
}
