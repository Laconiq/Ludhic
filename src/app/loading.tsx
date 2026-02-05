export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-2 border-gray-700" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--primary-blue)] animate-spin" />
        </div>
        <p className="text-white/70 font-gaming text-sm tracking-wider">
          CHARGEMENT...
        </p>
      </div>
    </div>
  );
}
