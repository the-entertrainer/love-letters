'use client';

import React from 'react';
import ReactPlayer from 'react-player';
import { Play, Pause, ExternalLink } from 'lucide-react';
import { useSongState } from '../../hooks/useSongState';
import { triggerHeartBurst } from '../ParticleField';

interface SongPlayerProps {
  videoUrl: string;
  songTitle: string;
  artist: string;
  language: string;
  letterId: string;
  onPlayChange?: (playing: boolean) => void;
}

export default function SongPlayer({ videoUrl, songTitle, artist, language, letterId, onPlayChange }: SongPlayerProps) {
  const { currentId, isPlaying, toggle, setIsPlaying } = useSongState();
  const isCurrent = currentId === letterId;

  const handlePlayPause = () => {
    toggle(letterId);
    if (!isCurrent || !isPlaying) {
      // Fire romantic VFX when starting this letter's song
      triggerHeartBurst();
    }
    onPlayChange?.(!isPlaying);
  };

  const handleProgress = (state: any) => {
    // Could drive lyric highlight or 3D intensity here
    if (state?.played > 0.92 && isCurrent) {
      // near end - gentle burst
      if (Math.random() > 0.7) triggerHeartBurst();
    }
  };

  return (
    <div className="music-frame w-full">
      <div className="flex items-center justify-between px-4 py-3 bg-black/60 border-b border-white/10">
        <div className="min-w-0 pr-3">
          <div className="font-medium text-sm tracking-tight truncate">{songTitle}</div>
          <div className="text-[11px] text-white/55 truncate">{artist} • {language}</div>
        </div>

        <button
          onClick={handlePlayPause}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 transition-all border border-white/20"
          aria-label={isCurrent && isPlaying ? 'Pause song' : 'Play song'}
        >
          {isCurrent && isPlaying ? (
            <Pause size={15} />
          ) : (
            <Play size={15} className="ml-0.5" />
          )}
        </button>

        <a
          href={videoUrl.replace('/embed/', '/watch?v=')}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/50 hover:text-white/80 transition-colors"
          title="Open on YouTube"
        >
          <ExternalLink size={14} />
        </a>
      </div>

      <div className="relative w-full aspect-video bg-black">
        <ReactPlayer
          url={videoUrl}
          width="100%"
          height="100%"
          playing={isCurrent && isPlaying}
          controls={false}
          light={false}
          onPlay={() => {
            setIsPlaying(true);
            onPlayChange?.(true);
          }}
          onPause={() => {
            setIsPlaying(false);
            onPlayChange?.(false);
          }}
          onEnded={() => {
            setIsPlaying(false);
            onPlayChange?.(false);
            triggerHeartBurst(); // beautiful close
          }}
          onProgress={handleProgress}
          config={{
            youtube: {
              // @ts-expect-error - playerVars accepted at runtime for YouTube
              playerVars: { 
                modestbranding: 1, 
                rel: 0, 
                color: 'white',
                fs: 1 
              }
            }
          }}
        />
      </div>
    </div>
  );
}
