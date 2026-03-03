import Image from 'next/image';
import { getMainImageUrl, getLogoUrl } from '@/lib/images';

interface GameHeroProps {
  title: string;
  contentFolder: string;
}

export default function GameHero({ title, contentFolder }: GameHeroProps) {
  return (
    <div className="relative w-full h-48 md:h-64 overflow-hidden">
      <Image
        src={getMainImageUrl(contentFolder)}
        alt={title}
        fill
        className="object-cover blur-lg scale-110"
        sizes="100vw"
        priority
        quality={90}
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-600/10" />
      <div className="absolute inset-0 flex items-center justify-center px-4 py-6 md:py-10">
        <Image
          src={getLogoUrl(contentFolder)}
          alt={`${title} Logo`}
          width={1800}
          height={400}
          className="max-h-full w-auto max-w-full object-contain drop-shadow-2xl"
          sizes="(max-width: 768px) 600px, 1800px"
          priority
          quality={95}
        />
      </div>
    </div>
  );
}
