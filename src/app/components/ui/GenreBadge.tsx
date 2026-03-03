import Link from 'next/link';

interface GenreBadgeProps {
  genre: string;
  variant: 'card' | 'detail';
  showHash?: boolean;
  href?: string;
}

export default function GenreBadge({ genre, variant, showHash = true, href }: GenreBadgeProps) {
  if (variant === 'card') {
    return (
      <span className="bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--text-primary)] font-gaming font-medium text-[0.7rem] uppercase tracking-[0.05em] px-3 py-1 rounded-full">
        {showHash ? '#' : ''}{genre}
      </span>
    );
  }

  const className = `font-gaming bg-black/50 backdrop-blur-sm rounded-full border border-cyan-400/30 text-cyan-400 text-xs px-2 py-0.5 sm:text-base sm:px-3 sm:py-1${
    href ? ' cursor-pointer hover:border-cyan-400 hover:bg-black/70 transition-colors' : ''
  }`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {genre}
      </Link>
    );
  }

  return (
    <span className={className}>
      {genre}
    </span>
  );
}
