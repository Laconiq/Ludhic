import SkeletonGrid from '@/app/components/ui/SkeletonGrid';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <div className="h-12 w-80 mx-auto bg-[var(--bg-tertiary)] rounded animate-pulse" />
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <SkeletonGrid count={8} />
        </div>
      </div>
    </div>
  );
}
