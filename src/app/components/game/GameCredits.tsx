import { Credit } from '@/types/game';

interface GameCreditsProps {
  credits: Credit[];
}

export default function GameCredits({ credits }: GameCreditsProps) {
  return (
    <div className="mb-16">
      <h3 className="text-lg font-gaming text-cyan-400 mb-8 tracking-wider">
        ÉQUIPE DE DÉVELOPPEMENT
      </h3>
      <div className="bg-[var(--bg-tertiary)]/30 backdrop-blur-sm rounded-lg p-6 border border-[var(--border-primary)]">
        {credits.map((member, index) => (
          <div key={index} className="flex flex-wrap items-baseline gap-2 mb-2">
            <span className="font-semibold text-white text-sm md:text-base">
              {member.firstName} {member.lastName}
            </span>
            <span className="text-cyan-300 text-xs md:text-sm">
              {member.roles.length > 0 ? member.roles.join(', ') : 'Contributeur'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
