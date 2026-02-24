interface GenreBadgeProps {
  genre: string;
  variant: 'card' | 'detail';
  showHash?: boolean;
}

export default function GenreBadge({ genre, variant, showHash = true }: GenreBadgeProps) {
  if (variant === 'card') {
    return (
      <span className="bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--text-primary)] font-['PixelifySans',monospace] font-medium text-[0.7rem] uppercase tracking-[0.05em] px-3 py-1 rounded-full">
        {showHash ? '#' : ''}{genre}
      </span>
    );
  }

  return (
    <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-black/50 backdrop-blur-sm rounded-full text-cyan-300 border border-cyan-400/30 font-gaming text-xs sm:text-base">
      {genre}
    </span>
  );
}
