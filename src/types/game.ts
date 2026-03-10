export type JsonLdValue = string | number | boolean | null | JsonLdSchema | JsonLdValue[];

export interface JsonLdSchema {
  '@context'?: string;
  '@type'?: string;
  [key: string]: JsonLdValue | undefined;
}

export interface Credit {
  firstName: string;
  lastName: string;
  roles: string[];
}

export interface GameData {
  id: number;
  title: string;
  longDescription: string;
  genres: string[];
  year: number;
  contentFolder: string;
  imageCount: number;
  hasVideo: boolean;
  youtubeUrl?: string;
  customButton: {
    enabled: boolean;
    name: string;
    link: string;
  };
  credits: Credit[];
  featured: boolean;
}
