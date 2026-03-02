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

  const className = `px-2 py-0.5 sm:px-3 sm:py-1 bg-[var(--bg-tertiary)]/50 backdrop-blur-sm rounded-full text-[var(--primary-blue)] border border-[var(--primary-blue)]/30 font-gaming text-xs sm:text-base${
    href ? ' cursor-pointer hover:border-[var(--primary-blue)] hover:bg-[var(--bg-tertiary)]/70 transition-colors' : ''
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
