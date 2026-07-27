'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Play } from 'lucide-react';

interface HeroProps {
  id: number;
  title: string;
  overview: string;
  backdropPath: string | null;
  mediaType: 'movie' | 'tv';
  tagline?: string;
}

export default function Hero({ id, title, overview, backdropPath, mediaType, tagline }: HeroProps) {
  const backdropUrl = backdropPath ? `https://image.tmdb.org/t/p/original${backdropPath}` : '/placeholder.svg';

  return (
    <div className="relative w-full h-screen md:h-[600px] overflow-hidden group">
      <Image src={backdropUrl} alt={title} fill className="object-cover" priority sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end md:justify-center p-6 md:p-12 max-w-2xl">
        {tagline && <p className="text-cyan-400 text-sm md:text-base font-semibold mb-2 uppercase tracking-wider">{tagline}</p>}
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white leading-tight">{title}</h1>
        <p className="text-sm md:text-lg text-gray-300 mb-8 line-clamp-3 max-w-xl">{overview}</p>
        <div className="flex gap-4 flex-wrap">
          <Link href={`/${mediaType}/${id}`}>
            <button className="flex items-center gap-3 px-6 md:px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-lg transition-all duration-300 hover:shadow-glow-lg transform hover:scale-105">
              <Play className="w-5 h-5 fill-current" />
              Play Now
            </button>
          </Link>
          <Link href={`/${mediaType}/${id}`}>
            <button className="px-6 md:px-8 py-3 glass-dark hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-300">Learn More</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
