export interface GameData {
  id: number;
  title: string;
  longDescription: string;
  genres: string[];
  imageFolder: string;
  imageCount: number;
  year: number;
  customButton: {
    enabled: boolean;
    name: string;
    link: string;
  };
  video: {
    enabled: boolean;
    link: string;
  };
  credits: Array<{
    firstName: string;
    lastName: string;
    roles: string[];
  }>;
  featured: boolean;
} 