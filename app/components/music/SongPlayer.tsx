'use client';

import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Play, Pause, ExternalLink } from 'lucide-react';
import { useSongState } from '../../hooks/useSongState';
import { triggerHeartBurst } from '../ParticleField';

interface SongPlayerProps {
  videoUrl: string;
  videoId: string;
  songTitle: string;
  artist: string;
  language: string;
  letterId: string;
  onPlayChange?: (playing: boolean) => void;
}

export default function SongPlayer({ videoUrl, videoId, songTitle, artist, language, letterId, onPlayChange }: SongPlayerProps) {
  const { currentId, isPlaying, toggle, setIsPlaying } = useSongState();
  const isCurrent = currentId === letterId;
  const [showPlayer, setShowPlayer] = useState(false);

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const handlePlay = () => {
    if (window.innerWidth < 768) {
      // Mobile: open YouTube for best experience
      window.open(videoUrl.replace('/embed/', '/watch?v='), '_blank');
      return;
    }

    // Desktop: toggle inline player
    const nextPlaying = !isCurrent || !isPlaying;
    toggle(letterId);
    setShowPlayer(nextPlaying);

    if (nextPlaying) {
      triggerHeartBurst();
    }
    onPlayChange?.(nextPlaying);
  };

  const handleClosePlayer = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPlayer(false);
    setIsPlaying(false);
  };

  return (
    <div className="music-frame w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40">
      {/* Thumbnail area - always visible until play */}
      {!showPlayer || !isCurrent ? (
        <div 
          onClick={handlePlay}
          className="relative aspect-video w-full cursor-pointer overflow-hidden group"
          style={{
            backgroundImage: `url(${thumbnailUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
          
          {/* Play overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-white/90 p-4 shadow-2xl backdrop-blur-sm transition-all group-hover:scale-110 group-active:scale-95">
              <Play className="h-8 w-8 text-black ml-1" />
            </div>
          </div>

          {/* Song info on thumbnail */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
            <div className="text-[10px] tracking-[2px] text-white/70 mb-0.5">NOW PLAYING</div>
            <div className="font-semibold text-lg leading-tight tracking-[-0.3px] text-white truncate">{songTitle}</div>
            <div className="text-xs text-white/70 truncate">{artist} • {language}</div>
          </div>

          <div className="absolute top-3 right-3 px-2 py-0.5 text-[9px] bg-black/70 rounded text-white/80">YT</div>
        </div>
      ) : (
        /* Player area */
        <div className="relative aspect-video w-full bg-black">
          <ReactPlayer
            url={videoUrl}
            width="100%"
            height="100%"
            playing={isCurrent && isPlaying}
            controls={true}
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
              setShowPlayer(false);
              onPlayChange?.(false);
              triggerHeartBurst();
            }}
            config={{
              youtube: {
                // @ts-expect-error
                playerVars: { 
                  modestbranding: 1, 
                  rel: 0, 
                  color: 'white',
                  fs: 1 
                }
              }
            }}
          />
          
          <button 
            onClick={handleClosePlayer}
            className="absolute top-2 right-2 z-10 px-3 py-1 text-xs bg-black/70 hover:bg-black text-white rounded-full"
          >
            Close
          </button>
        </div>
      )}

      {/* Bottom controls */}
      <div className="flex items-center justify-between p-3 bg-black/60 border-t border-white/10">
        <div className="min-w-0 flex-1 pr-2">
          <div className="font-medium text-sm tracking-tight truncate">{songTitle}</div>
          <div className="text-[11px] text-white/60 truncate">{artist} • {language}</div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePlay}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 hover:bg-white text-black shadow transition-all active:scale-95"
            aria-label={isCurrent && isPlaying ? 'Pause' : 'Play'}
          >
            {isCurrent && isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
          </button>

          <a
            href={videoUrl.replace('/embed/', '/watch?v=')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition-colors border border-white/20"
            title="Open on YouTube"
          >
            <ExternalLink size={15} />
          </a>
        </div>
      </div>
    </div>
  );
}
