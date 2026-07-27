'use client';

import { useRef, useEffect } from 'react';
import { TMDBMovie, TMDBTVShow } from '@/lib/tmdb';
import { Card } from './Card';
import { useRouter } from 'next/navigation';

interface CarouselProps {
  title: string;
  items: (TMDBMovie | TMDBTVShow)[];
  mediaType: 'movie' | 'tv';
}

export function Carousel({ title, items, mediaType }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleCardPlay = (id: number) => {
    router.push(`/${mediaType}/${id}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Scroll left"
          >
            ←
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Scroll right"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollBehavior: 'smooth' }}
      >
        {items.map((item) => (
          <div key={item.id} className="flex-shrink-0 w-48">
            <Card media={item} mediaType={mediaType} onPlay={handleCardPlay} />
          </div>
        ))}
      </div>
    </div>
  );
}
