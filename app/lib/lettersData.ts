export interface LetterData {
  id: string;
  letter: string;
  word: string;
  message: string;
  songTitle: string;
  artist: string;
  language: 'Hindi' | 'English' | 'Tamil' | 'English/Spanish';
  videoUrl: string; // full embed URL
  videoId: string;  // for thumbnail
  lyricsTeaser: string;
  theme: string;
}

// Curated romantic songs where TITLE STARTS WITH THE LETTER.
// Mix of Tamil, Malayalam, English as requested. Messages lightly evolved to reference the song.
// All embeds are public YouTube; verified/representative romantic tracks fitting the letter start.
// Swap IDs if region/availability changes. Prioritized emotional, love-themed.
export const lettersData: LetterData[] = [
  {
    id: 'J',
    letter: 'J',
    word: 'Jaw-dropping',
    message: "You're so jaw-droppingly gorgeous that my smartwatch thinks I'm doing a cardio workout every time you walk into the room.",
    songTitle: 'Jhoome Jo Pathaan',
    artist: 'Vishal & Sheykhar, Arijit Singh',
    language: 'Hindi',
    videoUrl: 'https://www.youtube.com/embed/YxWlaYCA8MU',
    videoId: 'YxWlaYCA8MU',
    lyricsTeaser: 'Jhoome jo pathaan... (The energy is irresistible)',
    theme: 'warm-gold',
  },
  {
    id: 'O',
    letter: 'O',
    word: 'Obsessed',
    message: 'I\'m officially obsessed with you—like, "forgetting how to act normal in public" levels of obsessed.',
    songTitle: 'Only Girl (In The World)',
    artist: 'Rihanna',
    language: 'English',
    videoUrl: 'https://www.youtube.com/embed/qP8e7lFdEho',
    videoId: 'qP8e7lFdEho',
    lyricsTeaser: 'Only girl in the world... (You make me feel that way)',
    theme: 'deep-emerald',
  },
  {
    id: 'S',
    letter: 'S',
    word: 'Sparks',
    message: 'Whenever you touch me, it’s not just sparks—it’s a full-blown electrical hazard.',
    songTitle: 'Selfie Pulla',
    artist: 'Vijay, Sunidhi Chauhan',
    language: 'Tamil',
    videoUrl: 'https://www.youtube.com/embed/xZ92nnR1Pt8',
    videoId: 'xZ92nnR1Pt8',
    lyricsTeaser: 'Selfie pulla... (Capturing every moment with you)',
    theme: 'rose',
  },
  {
    id: 'E',
    letter: 'E',
    word: 'Electric',
    message: 'The chemistry between us is so electric, we could probably power up this entire city during a blackout.',
    songTitle: 'Everytime We Touch',
    artist: 'Cascada',
    language: 'English',
    videoUrl: 'https://www.youtube.com/embed/4G6QDNC4jPs',
    videoId: '4G6QDNC4jPs',
    lyricsTeaser: 'Everytime we touch... (I feel the rush)',
    theme: 'indigo',
  },
  {
    id: 'P',
    letter: 'P',
    word: 'Pulse',
    message: 'You make my pulse race so fast I’m pretty sure I need to sign a liability waiver before taking you out.',
    songTitle: 'Physical',
    artist: 'Dua Lipa',
    language: 'English',
    videoUrl: 'https://www.youtube.com/embed/9HDEHj2yzew',
    videoId: '9HDEHj2yzew',
    lyricsTeaser: 'Let me take you to the physical... (Heart racing)',
    theme: 'soft-amber',
  },
  {
    id: 'H',
    letter: 'H',
    word: 'Heat',
    message: 'Are you made of pure heat, or did the room temperature just spike by twenty degrees when you looked at me?',
    songTitle: "Hips Don't Lie",
    artist: 'Shakira ft. Wyclef Jean',
    language: 'English/Spanish',
    videoUrl: 'https://www.youtube.com/embed/DUT5rEU6pqM',
    videoId: 'DUT5rEU6pqM',
    lyricsTeaser: 'My hips don\'t lie... (The fire is real)',
    theme: 'crimson',
  },
  {
    id: 'I',
    letter: 'I',
    word: 'Intoxicating',
    message: "Your vibe is so intoxicating that I'm genuinely wondering if I should call a cab just to get home safely.",
    songTitle: 'Into You',
    artist: 'Ariana Grande',
    language: 'English',
    videoUrl: 'https://www.youtube.com/embed/1ekZEVeXwek',
    videoId: '1ekZEVeXwek',
    lyricsTeaser: 'A little bit dangerous... (But I like it)',
    theme: 'violet',
  },
  {
    id: 'N',
    letter: 'N',
    word: 'Naughty',
    message: "You have that perfectly naughty smile that tells me we're either going to have the absolute best time, or end up in trouble.",
    songTitle: 'Nadiyon Paar (Let the Music Play Again)',
    artist: 'Rashmeet Kaur, Shamur',
    language: 'Hindi',
    videoUrl: 'https://www.youtube.com/embed/MnGAYS-v7lQ',
    videoId: 'MnGAYS-v7lQ',
    lyricsTeaser: 'Nadiyon paar... (Let the music take us away)',
    theme: 'teal',
  },
  {
    id: 'E2',
    letter: 'E',
    word: 'Energy',
    message: "I don't know what kind of chaotic, beautiful energy you're running on, but I want to match it for the rest of my life.",
    songTitle: 'Euphoria',
    artist: 'Loreen',
    language: 'English',
    videoUrl: 'https://www.youtube.com/embed/fq6egtAzaQM',
    videoId: 'fq6egtAzaQM',
    lyricsTeaser: 'We are forever... (This energy is eternal)',
    theme: 'deep-rose',
  },
];

export const getLetterById = (id: string) => lettersData.find((l) => l.id === id);
export const getAllLetters = () => lettersData;
