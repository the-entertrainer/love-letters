import LoveLetters from './components/LoveLetters';

// Server Component (per spec). The interactive stack is a Client Component.
export default function LoveLettersPage() {
  return (
    <main className="relative">
      {/* Pure Love Letters experience — only the J-O-S-E-P-H-I-N-E stack is displayed */}
      <LoveLetters />
    </main>
  );
}
