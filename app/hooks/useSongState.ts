'use client';

import { useState, useCallback } from 'react';

// Simple one-at-a-time song player state.
// Fires callbacks for VFX / confetti / toasts on play/end.
// Extend with valtio or global store for deeper 3D sync if needed.
export function useSongState() {
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = useCallback((id: string) => {
    setCurrentId(id);
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const stop = useCallback(() => {
    setCurrentId(null);
    setIsPlaying(false);
  }, []);

  const toggle = useCallback((id: string) => {
    if (currentId === id && isPlaying) {
      pause();
    } else {
      play(id);
    }
  }, [currentId, isPlaying, play, pause]);

  return {
    currentId,
    isPlaying,
    play,
    pause,
    stop,
    toggle,
    setIsPlaying, // for player events
  };
}
