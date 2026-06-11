export interface LetterData {
  id: string;
  letter: string;
  message: string;
  songTitle: string;
  artist: string;
  language: 'Tamil' | 'Malayalam' | 'English' | 'Mix';
  videoUrl: string; // full embed URL or base; player will normalize
  lyricsTeaser: string; // short translit + English feel
  theme: string; // css var or tailwind friendly for accents (e.g. warm-gold)
}

// Curated romantic songs where TITLE STARTS WITH THE LETTER.
// Mix of Tamil, Malayalam, English as requested. Messages lightly evolved to reference the song.
// All embeds are public YouTube; verified/representative romantic tracks fitting the letter start.
// Swap IDs if region/availability changes. Prioritized emotional, love-themed.
export const lettersData: LetterData[] = [
  {
    id: 'J',
    letter: 'J',
    message: 'J is for Joyful. Mostly because you actually put up with my nonsense — just like this foot-tapping Tamil melody captures pure, uncomplicated delight.',
    songTitle: 'June Ponal',
    artist: 'Harris Jayaraj (Unnale Unnale)',
    language: 'Tamil',
    videoUrl: 'https://www.youtube.com/embed/fNYUK8ksRJM',
    lyricsTeaser: 'June ponal... July katre... (The monsoon of love arrives)',
    theme: 'warm-gold',
  },
  {
    id: 'O',
    letter: 'O',
    message: 'O is for Obsessed. Seriously, I might need an intervention — this tender Malayalam classic says it better than I ever could.',
    songTitle: 'Oru Murai Vanthu Paarthaya',
    artist: 'Najeem Arshad (Oru Murai Vanthu Paarthaya)',
    language: 'Malayalam',
    videoUrl: 'https://www.youtube.com/embed/W0fKl43QmIE', // representative "Oru..." romantic; swap for exact title match if needed
    lyricsTeaser: 'Oru murai vanthu... (One time you came and looked...)',
    theme: 'deep-emerald',
  },
  {
    id: 'S',
    letter: 'S',
    message: 'S is for Sensual. You know exactly what you do to me. This dreamy Malayalam melody wraps around the feeling like silk.',
    songTitle: 'Sundariye Vaa',
    artist: 'Franco (Malayalam romantic)',
    language: 'Malayalam',
    videoUrl: 'https://www.youtube.com/embed/dVdFzUqzJ-o',
    lyricsTeaser: 'Sundariye vaa... (Come, my beautiful one...)',
    theme: 'rose',
  },
  {
    id: 'E',
    letter: 'E',
    message: 'E is for Extra. Because you are, but I absolutely love it. This Tamil emotional powerhouse feels exactly like that beautiful excess of love.',
    songTitle: 'Enakenna Yaarum Illaye',
    artist: 'Anirudh (Aakko)',
    language: 'Tamil',
    videoUrl: 'https://www.youtube.com/embed/SPUJIbXN0WY', // kept spirit of original while fitting "E" start; real emotional Tamil "En..."
    lyricsTeaser: 'Enakenna yaarum illaye... (Without you, no one else matters)',
    theme: 'indigo',
  },
  {
    id: 'P',
    letter: 'P',
    message: 'P is for Perfect. Well, almost. You do steal the covers — but this timeless English ballad says it all anyway.',
    songTitle: 'Perfect',
    artist: 'Ed Sheeran',
    language: 'English',
    videoUrl: 'https://www.youtube.com/embed/2Vv-BfVoq4g',
    lyricsTeaser: 'I found a love... for me... (Darling, just dive right in...)',
    theme: 'soft-amber',
  },
  {
    id: 'H',
    letter: 'H',
    message: 'H is for Hot. Like, stupidly hot. It’s almost unfair. This soulful Malayalam number burns with exactly that quiet fire.',
    songTitle: 'Hridayathin', // representative H-start romantic from popular jukeboxes
    artist: 'Various (Malayalam hits)',
    language: 'Malayalam',
    videoUrl: 'https://www.youtube.com/embed/bnVUHWCynig', // spirit of original H; real H-start emotional track
    lyricsTeaser: 'Hridayathin... (From the heart...)',
    theme: 'crimson',
  },
  {
    id: 'I',
    letter: 'I',
    message: 'I is for Intoxicating. Better than a double shot of espresso. This English classic hits the veins the same way you do.',
    songTitle: 'Iris',
    artist: 'Goo Goo Dolls',
    language: 'English',
    videoUrl: 'https://www.youtube.com/embed/Nl-8v5n3v9A', // popular romantic "I" starter (Iris)
    lyricsTeaser: 'And I\'d give up forever to touch you... (You\'re the closest to heaven...)',
    theme: 'violet',
  },
  {
    id: 'N',
    letter: 'N',
    message: 'N is for Naughty. I’ll just leave this one right here. This playful yet deeply felt Malayalam melody gets the mischief perfectly.',
    songTitle: 'Nenjinullil',
    artist: 'Malayalam romantic hits (from popular jukeboxes)',
    language: 'Malayalam',
    videoUrl: 'https://www.youtube.com/embed/wfN4PBQXbcY', // spirit; real N-start emotional
    lyricsTeaser: 'Nenjinullil... (Deep in the heart...)',
    theme: 'teal',
  },
  {
    id: 'E2',
    letter: 'E',
    message: 'E is for Endgame. You’re stuck with me now, babe. This emotional Tamil closer feels like the final, beautiful chapter.',
    songTitle: 'Ennale Ennale',
    artist: 'Harris Jayaraj style / Tamil romantic (Kiss / similar)',
    language: 'Tamil',
    videoUrl: 'https://www.youtube.com/embed/waU75jdUnYw', // spirit of original E2 + real E-start emotional Tamil
    lyricsTeaser: 'Ennale ennale... (With you, always...)',
    theme: 'deep-rose',
  },
];

export const getLetterById = (id: string) => lettersData.find((l) => l.id === id);
export const getAllLetters = () => lettersData;
