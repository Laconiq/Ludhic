import GamePageContent from './GamePageContent';

interface Game {
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

interface GamePageWrapperProps {
  game: Game;
}

export default function GamePageWrapper({ game }: GamePageWrapperProps) {
  return <GamePageContent game={game} />;
} 