'use client';

import { useRouter } from 'next/navigation';
import GameModal from './GameModal';

interface GameData {
  id: number;
  title: string;
  longDescription: string;
  genres: string[];
  year: number;
  contentFolder: string;
  imageCount: number;
  hasVideo: boolean;
  customButton: {
    enabled: boolean;
    name: string;
    link: string;
  };
  credits: Array<{
    firstName: string;
    lastName: string;
    roles: string[];
  }>;
  featured: boolean;
}

interface GamePageModalProps {
  game: GameData;
}

export default function GamePageModal({ game }: GamePageModalProps) {
  const router = useRouter();

  const handleClose = () => {
    router.push('/');
  };

  return (
    <GameModal
      isOpen={true}
      game={game}
      onClose={handleClose}
    />
  );
} 