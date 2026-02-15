export default function SkeletonCard() {
  return (
    <div className="gaming-card h-full flex flex-col overflow-hidden animate-pulse">
      <div className="relative w-full h-48 flex-shrink-0 bg-[var(--bg-tertiary)]">
        <div className="shimmer absolute inset-0" />
        <div className="absolute top-2 right-2 w-12 h-6 bg-[var(--border-primary)] rounded-full" />
        <div className="absolute bottom-2 left-2 w-16 h-8 bg-[var(--border-primary)] rounded" />
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <div className="h-6 w-3/4 bg-[var(--bg-tertiary)] rounded mb-3">
          <div className="shimmer h-full w-full rounded" />
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          <div className="h-6 w-16 bg-[var(--bg-tertiary)] rounded-full" />
          <div className="h-6 w-20 bg-[var(--bg-tertiary)] rounded-full" />
          <div className="h-6 w-12 bg-[var(--bg-tertiary)] rounded-full" />
        </div>
        <div className="space-y-2 flex-grow">
          <div className="h-4 w-full bg-[var(--bg-tertiary)] rounded" />
          <div className="h-4 w-full bg-[var(--bg-tertiary)] rounded" />
          <div className="h-4 w-2/3 bg-[var(--bg-tertiary)] rounded" />
        </div>
      </div>
    </div>
  );
}
