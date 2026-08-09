import type { ComponentChildren, JSX } from 'preact';

type ButtonOnlyProps = JSX.HTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
  external?: never;
};

type LinkProps = {
  href: string;
  external?: boolean;
  className?: string;
  children?: ComponentChildren;
};

type GamingButtonProps = (ButtonOnlyProps | LinkProps) & {
  size?: 'sm' | 'md' | 'lg';
};

const SIZES = { sm: 'px-5 py-2', md: 'px-6 py-3', lg: 'px-8 py-4 text-lg' };

const BASE = [
  'relative overflow-hidden cursor-pointer rounded-lg',
  'bg-[linear-gradient(135deg,var(--bg-tertiary)_0%,var(--bg-secondary)_100%)]',
  'border border-[var(--border-primary)]',
  'text-[var(--text-primary)] font-gaming uppercase',
  'transition-all duration-300',
  'hover:border-[var(--primary-blue)] hover:shadow-[0_0_20px_rgba(49,70,128,0.3)] hover:text-[var(--primary-blue)] hover:-translate-y-0.5',
  "before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full",
  'before:bg-[linear-gradient(90deg,transparent,rgba(45,66,126,0.2),transparent)]',
  'before:transition-[left] before:duration-500',
  'hover:before:left-full',
].join(' ');

// Variante Preact de GamingButton.astro : nécessaire dans les îlots (FilterBar,
// GameGrid) qui utilisent `onClick`, impossible à exprimer dans un composant
// .astro purement serveur.
export default function GamingButton({ href, external, size, className = '', children, ...props }: GamingButtonProps) {
  const classes = [BASE, size && SIZES[size], className].filter(Boolean).join(' ');

  if (href) {
    return (
      <a href={href} class={classes} {...(external && { target: '_blank', rel: 'noopener noreferrer' })}>
        {children}
      </a>
    );
  }

  return (
    <button class={classes} {...(props as JSX.HTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
